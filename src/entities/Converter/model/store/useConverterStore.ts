import { defineStore } from 'pinia'
import type { RatesList } from '../type'

export const useConverterStore = defineStore('converterStore', {
  state: () => ({}),
  getters: {},
  actions: {
    calculate(
      fromAmount: number,
      fromCurrency: string,
      toCurrency: string,
      rates: RatesList[]
    ) {
      const { Nominal: fromNominal, Value: fromRate } = rates.find(
        (i) => i.currency === fromCurrency
      )?.details || { Nominal: 1, Value: 1 }

      const { Nominal: toNominal, Value: toRate } = rates.find(
        (i) => i.currency === toCurrency
      )?.details || { Nominal: 1, Value: 1 }

      const result =
        (((fromAmount * fromRate) / toRate) * toNominal) / fromNominal
      return Number(result.toFixed(2))
    },
  },
})
