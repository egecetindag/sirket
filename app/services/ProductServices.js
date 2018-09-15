const host = "http://localhost:8091/api"
import axios from 'axios'

export const retrieveProductsService = (name, barcode) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.get(host + `/getProducts?barcode=${barcode ? barcode : ''}&name=${name}&description=&category=&pageNumber=1&pageSize=&orderBy=&orderAs=`, config)
}

export const createProductService = (dataToSend) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.post(host + "/createProduct", dataToSend, config)
}
export const updateProductService = (dataToSend) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.post(host + "/updateProduct", dataToSend, config)
}
export const deleteProductService = (id) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.get(host + `/deleteProducts?ids=${id}`, config)
}

export const retrieveProductService = (id) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.get(host + `/getProductById?id=${id}`, config)
}
