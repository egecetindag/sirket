import {pHost, host} from './config'
import axios from 'axios'


export const retrieveDealersService = (name) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.get(pHost + `/getPeople?name=${name}&pType=Tedarikçi&pageNumber=1&pageSize=10&orderBy=&orderAs=&isDropdown=`, config)
}
export const createDealerService = (dataToSend) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.post(pHost + "/createPerson", dataToSend, config)
}
export const updateDealerService = (dataToSend) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.post(pHost + "/updatePerson", dataToSend, config)
}
export const deleteDealerService = (id) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.get(pHost + `/deletePeople?ids=${id}`, config)
}
