const host = "http://localhost:8091/api"
import axios from 'axios'


export const getDailySummarySaleReportService = (first, last) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(host + `/getSaleSummaryReportDaily?timeInterval=${first},${last}`, config)
}

export const getCurrentStockReportService = (name,category) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(host + `/getCurrentStockReport?&name=${name}&category=${category}&pageNumber=1&pageSize=10&orderBy=&orderAs=`, config)
}

export const getSales = (first, last) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(host + `/getSales?timeInterval=${first},${last}&pageNumber=1&pageSize=10&orderBy=&orderAs=`, config)
}
