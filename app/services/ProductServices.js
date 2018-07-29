const host ="http://localhost:8091"
import axios from 'axios'

export const retrieveProductsService = () =>{
    return axios.get(host +"/getProducts?barcode=&name=&description=&category=&pageNumber=1&pageSize=10&orderBy=&orderAs=")
}
export const createProductService = (dataToSend) =>{
    return axios.post(host+"/createProduct",dataToSend)
}