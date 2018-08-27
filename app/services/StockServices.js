const host ="http://localhost:8091/api"
import axios from 'axios'
const token = localStorage.getItem('userToken')
const config = {
  headers: {
  'Authorization': 'Bearer ' + token
}
}

export const retrieveStocksService = (name,barcode) =>{
    return axios.get(host +`/getStocks?barcode=${barcode? barcode:''}&name=${name}&description=&category=&pageNumber=1&pageSize=10&orderBy=&orderAs=`,config)
}
export const retrieveStockByBarcodeService = (barcode) =>{
  return axios.get(host +`/getStocks?barcode=${barcode}&name=&description=&category=&pageNumber=1&pageSize=10&orderBy=&orderAs=`,config)
}
export const createStockService = (dataToSend) =>{
    return axios.post(host+"/createStock",dataToSend,config)
}
export const updateStockService = (dataToSend) =>{
    return axios.post(host+"/updateStock",dataToSend,config)
}
export const deleteStockService = (id) =>{
  return axios.get(host+`/deleteStocks?ids=${id}`,config)
}
export const retrieveStocksCategoriesService =() =>{
  return axios.get(host+`/retrieveCategories`,config)
}