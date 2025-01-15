import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { RatesData } from '../type'

export default class FetchRatesService {
  static async fetchRatesService(): Promise<AxiosResponse<RatesData>> {
    return axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
  }
}
