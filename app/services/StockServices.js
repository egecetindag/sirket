const host = "http://localhost:8091/api"
import axios from 'axios'

export const retrieveStocksService = (name, barcode) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(host + `/getStocks?barcode=${barcode ? barcode : ''}&name=${name}&description=&category=&pageNumber=1&pageSize=10&orderBy=&orderAs=`, config)
}
export const retrieveStockByBarcodeService = (barcode) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(host + `/getStocks?barcode=${barcode}&name=&description=&category=&pageNumber=1&pageSize=10&orderBy=&orderAs=`, config)
}
export const createStockService = (dataToSend) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.post(host + "/createStock", dataToSend, config)
}
export const updateStockService = (dataToSend) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.post(host + "/updateStock", dataToSend, config)
}
export const deleteStockService = (id) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(host + `/deleteStocks?ids=${id}`, config)
}
export const retrieveStocksCategoriesService = () => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(host + `/retrieveCategories`, config)
}