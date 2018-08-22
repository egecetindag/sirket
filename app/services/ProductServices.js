const host ="http://localhost:8091/api"
import axios from 'axios'
const token = localStorage.getItem('userToken')
const config = {
  headers: {
  'Authorization': 'Bearer ' + token
}
}
export const retrieveProductsService = (name,barcode) =>{
    return axios.get(host +`/getProducts?barcode=${barcode ? barcode :''}&name=${name}&description=&category=&pageNumber=1&pageSize=10&orderBy=&orderAs=`,config)
}

export const createProductService = (dataToSend) =>{
    return axios.post(host+"/createProduct",dataToSend,config)
}
export const updateProductService = (dataToSend) =>{
    return axios.post(host+"/updateProduct",dataToSend,config)
}
export const deleteProductService = (id) =>{
    return axios.get(host+`/deleteProducts?ids=${id}`,config)
}

export const retrieveProductService = (id) =>{
    return axios.get(host +`/getProductById?id=${id}`,config)
}
