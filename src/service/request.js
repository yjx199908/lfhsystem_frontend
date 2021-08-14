let axios = require('axios')
import serviceConfig from '../config/serviceConfig'

axios.defaults.baseURL=serviceConfig.baseUrl;

export let get = axios.get
export let post = axios.post

export let toFormData = (obj)=>{
    let formData = new URLSearchParams()
    for(let item in obj){
        formData.append(item,obj[item])
    }
    return formData
}

export let regularDate = (date) => {

    let supplement = (num) => {
        return (num < 10?`0`:'') + num
    }

    let year = supplement(date.getFullYear())
    let month = supplement(date.getMonth() + 1)
    let day = supplement(date.getDate())
    let hour = supplement(date.getHours())
    let minutes = supplement(date.getMinutes())
    let second = supplement(date.getSeconds())

    return `${year}-${month}-${day} ${hour}:${minutes}:${second}`
}