import axios from 'axios'
const ENDPOINT = 'https://api.coinbase.com/v2/prices/'

function get(url) {
  return axios.get(url)
}

export default {
  fetchData: async (timePeriod, currency) => {
    const result = await get(`${ENDPOINT}${currency}-EUR/historic?period=${timePeriod}`)
    return result.data.data.prices
  },
}
