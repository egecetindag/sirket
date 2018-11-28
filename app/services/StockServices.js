import {pHost, host} from './config'
import axios from 'axios'

export const retrieveStocksService = (obj) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(pHost + `/getStocks?barcode=${obj.barcode ? obj.barcode : ''}&name=${obj.name ? obj.name :''}&description=&category=${obj.category ? obj.category :''}&isFavorite=${obj.isFavorite ? obj.isFavorite :''}&pageNumber=&pageSize=&orderBy=&orderAs=`, config)
}
export const retrieveStockByBarcodeService = (barcode) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(pHost + `/getStocks?barcode=${barcode}&name=&description=&category=&pageNumber=1&pageSize=&orderBy=&orderAs=`, config)
}
export const createStockService = (dataToSend) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.post(pHost + "/createStock", dataToSend, config)
}

export const setFavoriteProduct = (productId,isFavorite) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(pHost + `/setFavoriteProduct?productId=${productId}&isFavorite=${isFavorite}`, config)
}

export const updateStockService = (dataToSend) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.post(pHost + "/updateStock", dataToSend, config)
}
export const deleteStockService = (id) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(pHost + `/deleteStocks?ids=${id}`, config)
}
export const retrieveStocksCategoriesService = () => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(pHost + `/retrieveCategories`, config)
}
