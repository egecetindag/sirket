

import {pHost, host} from './config'
import axios from 'axios'

export const finishSaleService = (basket) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.post(pHost + `/createSale`, basket, config)
  }
  