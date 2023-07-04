import { ethers } from 'ethers'
import React, { useEffect } from 'react'
import useMetamask from './useMetamask'
import { AbiContractToken, readName, readNonces, writePermit, writeTransferFrom } from 'src/abi/common.abi'
import { NETWORKS } from 'src/constants/metamask.constants'
import ERC20_ABI_TOKEN from 'src/abi/ERC20_ABI_TOKEN.json'
import ERC20_ABI_STAKING from 'src/abi/ERC20_ABI_STAKING.json'

function getTimestampInSeconds() {
  // returns current timestamp in seconds
  return Math.floor(Date.now() / 1000)
}

export default function useEIP2612() {
  const { contractToken, contractStaking, wallet, signer } = useMetamask()

  const signature = async () => {
    try {
      // get a provider instance
      const provider = new ethers.providers.StaticJsonRpcProvider(NETWORKS.sepoliaTestnet.rpcUrls[0])

      // get the network chain id
      const chainId = (await provider.getNetwork()).chainId

      // create a signer instance with the token owner
      const tokenOwner = await new ethers.Wallet(import.meta.env.VITE_PRIVATE_KEY_ACCOUNT_1, provider)

      // create a signer instance with the token receiver
      const tokenReceiver = new ethers.Contract(import.meta.env.VITE_CONTRACT_STAKING, ERC20_ABI_STAKING, provider)

      // get the MyToken contract factory and deploy a new instance of the contract
      const myToken = new ethers.Contract(import.meta.env.VITE_CONTRACT_TOKEN_COWELL, ERC20_ABI_TOKEN, provider)

      let tokenOwnerBalance = (await myToken.balanceOf(tokenOwner.address)).toString()
      let tokenReceiverBalance = (await myToken.balanceOf(tokenReceiver.address)).toString()

      console.log(`Starting tokenOwner balance: ${tokenOwnerBalance}`)
      console.log(`Starting tokenReceiver balance: ${tokenReceiverBalance}`)

      // set token value and deadline
      const value = ethers.utils.parseEther('1')
      const deadline = getTimestampInSeconds() + 4200

      // get the current nonce for the deployer address
      const nonces = await myToken.nonces(tokenOwner.address)

      // set the domain parameters
      const domain = {
        name: await myToken.name(),
        version: '1',
        chainId: chainId,
        verifyingContract: myToken.address
      }

      // set the Permit type parameters
      const types = {
        Permit: [
          {
            name: 'owner',
            type: 'address'
          },
          {
            name: 'spender',
            type: 'address'
          },
          {
            name: 'value',
            type: 'uint256'
          },
          {
            name: 'nonce',
            type: 'uint256'
          },
          {
            name: 'deadline',
            type: 'uint256'
          }
        ]
      }

      // set the Permit type values
      const values = {
        owner: tokenOwner.address,
        spender: tokenReceiver.address,
        value: value,
        nonce: nonces,
        deadline: deadline
      }

      // sign the Permit type data with the deployer's private key
      const signature = await tokenOwner._signTypedData(domain, types, values)

      // split the signature into its components
      const sig = ethers.utils.splitSignature(signature)

      // verify the Permit type data with the signature
      const recovered = ethers.utils.verifyTypedData(domain, types, values, sig)
      console.log('recovered', recovered)

      // get network gas price
      const gasPrice = await provider.getGasPrice()
      console.log('gasPrice', gasPrice)
      // permit the tokenReceiver address to spend tokens on behalf of the tokenOwner
      let tx = await myToken
        .connect(tokenOwner)
        .permit(tokenOwner.address, tokenReceiver.address, value, deadline, sig.v, sig.r, sig.s, {
          gasPrice: gasPrice,
          gasLimit: 80000 //hardcoded gas limit; change if needed
        })

      await tx.wait(2) //wait 2 blocks after tx is confirmed

      // check that the tokenReceiver address can now spend tokens on behalf of the tokenOwner
      console.log(
        `Check allowance of tokenReceiver: ${await myToken.allowance(tokenOwner.address, tokenReceiver.address)}`
      )

      // Get ending balances
      tokenOwnerBalance = (await myToken.balanceOf(tokenOwner.address)).toString()
      tokenReceiverBalance = (await myToken.balanceOf(tokenOwner.address)).toString()

      console.log(`Ending tokenOwner balance: ${tokenOwnerBalance}`)
      console.log(`Ending tokenReceiver balance: ${tokenReceiverBalance}`)

      // const name = await readName(contractToken as ethers.Contract & AbiContractToken)
      // const nonces2 = await readNonces(myToken, tokenOwner.address)
      // const domain = {
      //   name: name,
      //   version: '1',
      //   chainId: (await provider.getNetwork()).chainId,
      //   verifyingContract: (contractToken as ethers.Contract & AbiContractToken).address
      // }

      // console.log('domain=>', domain)
      // // set the Permit type parameters
      // const types = {
      //   Permit: [
      //     {
      //       name: 'owner',
      //       type: 'address'
      //     },
      //     {
      //       name: 'spender',
      //       type: 'address'
      //     },
      //     {
      //       name: 'value',
      //       type: 'uint256'
      //     },
      //     {
      //       name: 'nonce',
      //       type: 'uint256'
      //     },
      //     {
      //       name: 'deadline',
      //       type: 'uint256'
      //     }
      //   ]
      // }
      // // set the Permit type values
      // const values = {
      //   owner: wallet.accounts[0], // address ví của người đặt cược
      //   spender: contractStaking?.address, // address ví của tk nhận
      //   value: value,
      //   nonce: nonces,
      //   deadline: deadline
      // }
      // console.log('values', values)
      // // sign the Permit type data with the deployer's private key
      // const signature = await signer?._signTypedData(domain, types, values)
      // console.log('signature=>', signature)

      // // split the signature into its components
      // const sig = ethers.utils.splitSignature(signature as string)
      // console.log('sig=>', sig)

      // const recovered = ethers.utils.verifyTypedData(domain, types, value, signature as string)
      // console.log('recovered=>', recovered)

      // get network gas price
      // const gasPrice = await provider.getGasPrice()
      // console.log('gasPrice', gasPrice)

      // permit the tokenReceiver address to spend tokens on behalf of the tokenOwner

      // let tx = await writePermit(
      //   contractToken as ethers.Contract & AbiContractToken,
      //   wallet.accounts[0],
      //   import.meta.env.VITE_CONTRACT_STAKING,
      //   value,
      //   deadline,
      //   sig.v,
      //   sig.r,
      //   sig.s,
      //   {
      //     gasPrice: gasPrice,
      //     gasLimit: 80000 //hardcoded gas limit; change if needed
      //   }
      // )

      // await tx?.wait(2) //wait 2 blocks after tx is confirmed

      // check that the tokenReceiver address can now spend tokens on behalf of the tokenOwner
      // console.log(
      //   `Check allowance of tokenReceiver: ${await (contractToken as ethers.Contract & AbiContractToken).allowance(
      //     wallet.accounts[0],
      //     contractStaking?.address
      //   )}`
      // )
      // transfer tokens from the tokenOwner to the tokenReceiver address
      // tx = await writeTransferFrom(
      //   contractToken as ethers.Contract & AbiContractToken,
      //   wallet.accounts[0],
      //   import.meta.env.VITE_CONTRACT_STAKING,
      //   value,
      //   {
      //     gasPrice: gasPrice,
      //     gasLimit: 80000 //hardcoded gas limit; change if needed
      //   }
      // )
    } catch (error) {
      console.error(error)
    }
  }

  return {
    signature
  }
}
