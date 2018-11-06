import {pHost, host} from './config'
import axios from 'axios'

export const retrieveProductsService = (name, barcode) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.get(pHost + `/getProducts?barcode=${barcode ? barcode : ''}&name=${name}&description=&category=&pageNumber=1&pageSize=&orderBy=&orderAs=`, config)
}

export const createProductService = (dataToSend) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.post(pHost + "/createProduct", dataToSend, config)
}
export const updateProductService = (dataToSend) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.post(pHost + "/updateProduct", dataToSend, config)
}
export const deleteProductService = (id) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.get(pHost + `/deleteProducts?ids=${id}`, config)
}

export const retrieveProductService = (id) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.get(pHost + `/getProductById?id=${id}`, config)
}
