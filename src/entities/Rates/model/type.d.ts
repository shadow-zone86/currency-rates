export type Currency = {
  ID: string
  NumCode: string
  CharCode: string
  Nominal: number
  Name: string
  Value: number
  Previous: number
}

export interface RatesData {
  Date: string
  PreviousDate: string
  PreviousURL: string
  Timestamp: string
  Valute: Currency
}

export interface RatesList {
  currency: string
  details: Currency
}

export interface RatesState {
  rates: RatesList[]
}
