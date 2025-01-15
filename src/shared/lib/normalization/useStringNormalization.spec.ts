import { describe, it, expect } from 'vitest'
import { useStringNormalization } from './useStringNormalization'

describe('useStringNormalization', () => {
  it('should normalize a string by converting to lowercase and trimming', () => {
    expect(useStringNormalization('  HELLO WORLD  ')).toBe('hello world')
  })

  it('should handle empty string', () => {
    expect(useStringNormalization('')).toBe('')
  })

  it('should handle string with only spaces', () => {
    expect(useStringNormalization('   ')).toBe('')
  })

  it('should return undefined for null input', () => {
    expect(useStringNormalization(null)).toBe(undefined)
  })

  it('should return undefined for undefined input', () => {
    expect(useStringNormalization(undefined)).toBe(undefined)
  })

  it('should return undefined for number input', () => {
    expect(useStringNormalization(123)).toBe(undefined)
  })

  it('should return undefined for object input', () => {
    expect(useStringNormalization({})).toBe(undefined)
  })

  it('should return undefined for array input', () => {
    expect(useStringNormalization([])).toBe(undefined)
  })

  it('should handle mixed case string with special characters', () => {
    expect(useStringNormalization('  HeLLo@WoRLD!  ')).toBe('hello@world!')
  })
})
