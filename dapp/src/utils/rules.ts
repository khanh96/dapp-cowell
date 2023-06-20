import * as yup from 'yup'

function testAmountMax(this: yup.TestContext<yup.AnyObject>) {
  const { amount } = this.parent as { amount: string }
  const { maxStake } = this.options.context as { maxStake: string }

  if (amount !== '' && maxStake !== '') {
    return Number(maxStake) >= Number(amount)
  }
  return amount !== '' || maxStake !== ''
}

function testAllowanceStake(this: yup.TestContext<yup.AnyObject>) {
  const { stake } = this.parent as { stake: string }
  const { stakeAllow } = this.options.context as { stakeAllow: string }
  console.log('stakeAllow', stakeAllow)
  console.log('stake', stake)
  if (stake !== '' && stakeAllow !== '') {
    return Number(stakeAllow) >= Number(stake)
  }
  return stake !== '' || stakeAllow !== ''
}

export const stakingSchema = yup.object({
  amount: yup.string().required('Amount is required').test({
    name: 'amount-not-allowed',
    message: 'Vui lòng điền khoảng stake phù hợp',
    test: testAmountMax
  }),
  stake: yup
    .string()
    .required('Stake is required')
    .test((value, { options }) => {
      const { stakeAllow } = options.context as { stakeAllow: string }
      console.log('allow', stakeAllow)
      return {
        name: 'amount-not-allowed',
        message: `Vui lòng điền stake nho hơn ${stakeAllow}`,
        test: testAllowanceStake
      }
    })
})

export const validAmountSchema = stakingSchema.pick(['amount'])
export type ValidAmountSchemaType = yup.InferType<typeof validAmountSchema>

export const validStakeSchema = stakingSchema.pick(['stake'])
export type ValidStakeSchemaType = yup.InferType<typeof validStakeSchema>
