import request from './http'
import axios from 'axios';

const GetValidateCode = (query) => {
    return request({
        url: '/GetValidateCode',
        method: 'get',
        params: query
    })
}
const LogIn = (query) => {
    return request({
        url: '/Login',
        method: 'get',
        params: query
    })
}

export { GetValidateCode, LogIn }
