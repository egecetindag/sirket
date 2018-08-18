const host ="http://localhost:8091"
import axios from 'axios'

export const retrieveProductsService = (name,barcode) =>{
    return axios.get(host +`/getProducts?barcode=${barcode ? barcode :''}&name=${name}&description=&category=&pageNumber=1&pageSize=10&orderBy=&orderAs=`)
}

export const createProductService = (dataToSend) =>{
    return axios.post(host+"/createProduct",dataToSend)
}
export const updateProductService = (dataToSend) =>{
    return axios.post(host+"/updateProduct",dataToSend)
}
export const deleteProductService = (id) =>{
    return axios.get(host+`/deleteProducts?ids=${id}`)
}
