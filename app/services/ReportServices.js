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

export const getActivityLog = (first, last, userId) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(host + `/retrieveActivityLog?timeInterval=${first},${last}&userId=${userId}`, config)
}

export const getSales = (first, last) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(host + `/getSales?timeInterval=${first},${last}&pageNumber=1&pageSize=10&orderBy=&orderAs=`, config)
}

export const getPaymentReportService = (first, last) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(host + `/getPaymentReport?timeInterval=${first},${last}`, config)
}

export const getProductReportService = (first, last,name,category) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(host + `/getProductReport?timeInterval=${first},${last}&productName=${name}&category=${category}`, config)
}
