import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useConverterStore } from './useConverterStore'

const mockRates = [
  {
    currency: 'USD',
    details: {
      Nominal: 1,
      Value: 92.2914,
    },
  },
  {
    currency: 'EUR',
    details: {
      Nominal: 1,
      Value: 100.5423,
    },
  },
  {
    currency: 'JPY',
    details: {
      Nominal: 100,
      Value: 61.7231,
    },
  },
]

describe('ConverterStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should correctly convert between currencies with same nominal', () => {
    const store = useConverterStore()
    const result = store.calculate(100, 'USD', 'EUR', mockRates)
    expect(result).toBe(91.79)
  })

  it('should correctly convert when nominal is different', () => {
    const store = useConverterStore()
    const result = store.calculate(100, 'USD', 'JPY', mockRates)
    expect(result).toBe(14952.49)
  })

  it('should handle conversion with non-existent currencies', () => {
    const store = useConverterStore()
    const result = store.calculate(100, 'XXX', 'YYY', mockRates)
    expect(result).toBe(100)
  })

  it('should handle conversion with empty rates array', () => {
    const store = useConverterStore()
    const result = store.calculate(100, 'USD', 'EUR', [])
    expect(result).toBe(100)
  })

  it('should handle zero amount conversion', () => {
    const store = useConverterStore()
    const result = store.calculate(0, 'USD', 'EUR', mockRates)
    expect(result).toBe(0)
  })

  it('should handle conversion from same currency to same currency', () => {
    const store = useConverterStore()
    const result = store.calculate(100, 'USD', 'USD', mockRates)
    expect(result).toBe(100)
  })
})
