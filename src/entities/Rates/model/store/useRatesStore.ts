import { defineStore } from 'pinia'
import FetchRatesService from '../api/fetchRatesService'
import type { RatesState } from '../type'

export const useRatesStore = defineStore('ratesStore', {
  state: (): RatesState => ({
    rates: [],
  }),
  getters: {
    filterRates(state: RatesState) {
      return (str = '') => {
        const rates = state.rates.filter((i) => {
          return (
            i.currency.includes(str.toUpperCase()) ||
            i.details.NumCode.includes(str.toLowerCase()) ||
            str === ''
          )
        })
        return rates
      }
    },
  },
  actions: {
    async fetchRates(): Promise<void> {
      try {
        const { data } = await FetchRatesService.fetchRatesService()
        const dataRaw = data?.Valute || {}
        const dataArr = Object.keys(dataRaw).map((i) => ({
          currency: i,
          details: dataRaw[i as keyof typeof dataRaw] as unknown as {
            ID: string
            NumCode: string
            CharCode: string
            Nominal: number
            Name: string
            Value: number
            Previous: number
          },
        }))
        this.rates = dataArr
      } catch (e) {
        console.log('axios:', e)
      }
    },
  },
})
