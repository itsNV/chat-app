import axios from 'axios'


const axiosInstace = axios.create({})

export const apiconnector = (method,url,bodyData,headers,params) => {
    
    console.log('bodyData', bodyData)
    console.log('url',url)
    return axiosInstace({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params : params ? params : null
    })
}