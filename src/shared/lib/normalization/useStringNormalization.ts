import { isString } from 'lodash'

const useStringNormalization = (value: any): string | undefined => {
  if (isString(value)) {
    return value.toLowerCase().trim()
  }

  return undefined
}

export { useStringNormalization }
