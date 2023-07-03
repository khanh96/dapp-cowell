import { ethers } from 'ethers'
import React, { useEffect } from 'react'
import useMetamask from './useMetamask'
import { AbiContractToken, readName, readNonces, writePermit, writeTransferFrom } from 'src/abi/common.abi'

function getTimestampInSeconds() {
  // returns current timestamp in seconds
  return Math.floor(Date.now() / 1000)
}

export default function useEIP2612() {
  const { contractToken, contractStaking, wallet, signer, provider } = useMetamask()
  // set token value and deadline
  console.log(provider)

  const signature = async () => {
    try {
      const value = ethers.utils.parseEther('1')
      const deadline = getTimestampInSeconds() + 4200
      const name = await readName(contractToken as ethers.Contract & AbiContractToken)
      const nonces = await readNonces(contractToken as ethers.Contract & AbiContractToken, wallet.accounts[0])
      const domain = {
        name: name,
        version: '1',
        chainId: (await provider.getNetwork()).chainId,
        verifyingContract: (contractToken as ethers.Contract & AbiContractToken).address
      }

      console.log('domain=>', domain)
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
        owner: wallet.accounts[0], // address ví của người đặt cược
        spender: contractStaking?.address, // address ví của tk nhận
        value: value,
        nonce: nonces,
        deadline: deadline
      }
      console.log('values', values)
      // sign the Permit type data with the deployer's private key
      const signature = await signer?._signTypedData(domain, types, values)
      console.log('signature=>', signature)

      // split the signature into its components
      const sig = ethers.utils.splitSignature(signature as string)
      console.log('sig=>', sig)

      const recovered = ethers.utils.verifyTypedData(domain, types, value, signature as string)
      console.log('recovered=>', recovered)

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
