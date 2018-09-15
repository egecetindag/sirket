

const host = "http://localhost:8091/api"
import axios from 'axios'

export const finishSaleService = (basket) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.post(host + `/createSale`, basket, config)
  }
  