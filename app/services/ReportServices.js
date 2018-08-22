const host ="http://localhost:8091/api"
import axios from 'axios'
const token = localStorage.getItem('userToken')
const config = {
  headers: {
  'Authorization': 'Bearer ' + token
}
}

export const getDailySummarySaleReportService = (first,last) =>{
    return axios.get(host +`/getSaleSummaryReportDaily?timeInterval=${first},${last}`,config)
}

export const getCurrentStockReportService = (barcode,name,category) =>{
  return axios.get(host +`/api/getCurrentStockReport?barcode=${barcode}&name=${name}&category=${category}&pageNumber=1&pageSize=10&orderBy=&orderAs=`,config)
}

export const getSales = (first,last) =>{
  return axios.get(host +`/getSales?timeInterval=${first},${last}&pageNumber=1&pageSize=10&orderBy=&orderAs=`,config)
}
