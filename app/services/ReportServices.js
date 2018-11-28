import {pHost, host} from './config'
import axios from 'axios'


export const getDailySummarySaleReportService = (first, last) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(pHost + `/getSaleSummaryReport?timeInterval=${first},${last}`, config)
}

export const getCurrentStockReportService = (name,category) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(pHost + `/getCurrentStockReport?&name=${name}&category=${category}&pageNumber=1&pageSize=10&orderBy=&orderAs=`, config)
}

export const getActivityLog = (first, last, userId) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(pHost + `/retrieveActivityLog?timeInterval=${first},${last}&userId=${userId}`, config)
}

export const getSales = (first, last) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(pHost + `/getSales?timeInterval=${first},${last}&pageNumber=1&pageSize=10&orderBy=&orderAs=`, config)
}

export const getPaymentReportService = (first, last) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(pHost + `/getPaymentReport?timeInterval=${first},${last}`, config)
}

export const getProductReportService = (first, last,name,category) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(pHost + `/getProductReport?timeInterval=${first},${last}&productName=${name}&category=${category}`, config)
}

export const getDashboardReportExcel = (first, last) => {
  const config = {
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') },
    responseType: 'blob',
  }
  return axios.get(pHost + `/getSaleSummaryReportAsExcel?timeInterval=${first},${last}`, config)
}

export const getStockReportExcel = () => {
  const config = {
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') },
    responseType: 'blob',
  }
  return axios.get(pHost + `/getCurrentStockReportAsExcel`, config)
}

export const getPaymentReportExcel = (first, last) => {
  const config = {
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') },
    responseType: 'blob',
  }
  return axios.get(pHost + `/getPaymentReportAsExcel?timeInterval=${first},${last}`, config)
}

export const getProductReportExcel = (first, last) => {
  const config = {
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') },
    responseType: 'blob',
  }
  return axios.get(pHost + `/getProductReportAsExcel?timeInterval=${first},${last}`, config)
}
