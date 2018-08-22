const host ="http://localhost:8091/api"
import axios from 'axios'
const token = localStorage.getItem('userToken')
const config = {
  headers: {
  'Authorization': 'Bearer ' + token
}
}

export const retrieveDealersService = (name) =>{
    return axios.get(host +`/getPeople?name=${name}&pType=Tedarikçi&pageNumber=1&pageSize=10&orderBy=&orderAs=&isDropdown=`,config)
}
export const createDealerService = (dataToSend) =>{
    return axios.post(host+"/createPerson",dataToSend,config)
}
export const updateDealerService = (dataToSend) =>{
    return axios.post(host+"/updatePerson",dataToSend,config)
}
export const deleteDealerService = (id) =>{
  return axios.get(host+`/deletePeople?ids=${id}`,config)
}
