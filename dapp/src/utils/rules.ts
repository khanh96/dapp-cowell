import * as yup from 'yup'

function testAmountMax(this: yup.TestContext<yup.AnyObject>) {
  const { amount } = this.parent as { amount: string }
  const { maxStake } = this.options.context as { maxStake: string }

  if (amount !== '' && maxStake !== '') {
    console.log('maxStake=>', maxStake)
    console.log('aaa=>', Number(maxStake) >= Number(amount))
    return Number(maxStake) >= Number(amount)
  }
  return amount !== '' || maxStake !== ''
}

export const stakingSchema = yup.object({
  amount: yup.string().required('Amount is required').test({
    name: 'amount-not-allowed',
    message: 'Vui lòng điền khoảng stake phù hợp',
    test: testAmountMax
  })
})

export const validAmountSchema = stakingSchema.pick(['amount'])
export type ValidAmountSchemaType = yup.InferType<typeof validAmountSchema>
