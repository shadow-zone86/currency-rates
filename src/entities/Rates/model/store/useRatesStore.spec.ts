import { describe, it, vi, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRatesStore } from './useRatesStore'

const mockApiResponse = {
  data: {
    Valute: {
      USD: {
        ID: 'R01235',
        NumCode: '840',
        CharCode: 'USD',
        Nominal: 1,
        Name: 'Доллар США',
        Value: 92.2914,
        Previous: 92.366,
      },
      EUR: {
        ID: 'R01239',
        NumCode: '978',
        CharCode: 'EUR',
        Nominal: 1,
        Name: 'Евро',
        Value: 100.5423,
        Previous: 100.4527,
      },
    },
  },
}

describe('RatesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('filterRates should filter by currency code', () => {
    const store = useRatesStore()
    store.rates = [
      {
        currency: 'USD',
        details: mockApiResponse.data.Valute.USD,
      },
      {
        currency: 'EUR',
        details: mockApiResponse.data.Valute.EUR,
      },
    ]

    const filtered = store.filterRates('US')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].currency).toBe('USD')
  })

  it('filterRates should filter by NumCode', () => {
    const store = useRatesStore()
    store.rates = [
      {
        currency: 'USD',
        details: mockApiResponse.data.Valute.USD,
      },
      {
        currency: 'EUR',
        details: mockApiResponse.data.Valute.EUR,
      },
    ]

    const filtered = store.filterRates('840')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].currency).toBe('USD')
  })

  it('filterRates should return all rates when search string is empty', () => {
    const store = useRatesStore()
    store.rates = [
      {
        currency: 'USD',
        details: mockApiResponse.data.Valute.USD,
      },
      {
        currency: 'EUR',
        details: mockApiResponse.data.Valute.EUR,
      },
    ]

    const filtered = store.filterRates('')
    expect(filtered).toHaveLength(2)
  })

  it('filterRates should return empty array when no matches found', () => {
    const store = useRatesStore()
    store.rates = [
      {
        currency: 'USD',
        details: mockApiResponse.data.Valute.USD,
      },
      {
        currency: 'EUR',
        details: mockApiResponse.data.Valute.EUR,
      },
    ]

    const filtered = store.filterRates('XXX')
    expect(filtered).toHaveLength(0)
  })

  it('fetchRates should transform API response correctly', async () => {
    const store = useRatesStore()
    vi.mock('../api/fetchRatesService', () => ({
      default: {
        fetchRatesService: () => Promise.resolve(mockApiResponse),
      },
    }))

    await store.fetchRates()
    expect(store.rates).toHaveLength(2)
    expect(store.rates[0].currency).toBe('USD')
    expect(store.rates[0].details.Value).toBe(92.2914)
    expect(store.rates[1].currency).toBe('EUR')
    expect(store.rates[1].details.Value).toBe(100.5423)
  })
})
