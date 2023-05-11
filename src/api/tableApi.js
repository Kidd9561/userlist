import request from './http'

const SearchUser = (query) => {
    return request({
        url: '/SearchUser',
        method: 'get',
        params: query
    })
}

const CreateUser = (query) => {
    return request({
        url: '/CreateUser',
        method: 'get',
        params: query
    })
}

const ModifyPasswd = (query) => {
    return request({
        url: '/ModifyPasswd',
        method: 'get',
        params: query
    })
}

const ResetBound = (query) => {
    return request({
        url: '/ResetBound',
        method: 'get',
        params: query
    })
}

const ExtendValidity = (query) => {
    return request({
        url: '/ExtendValidity',
        method: 'get',
        params: query
    })
}


export {SearchUser, CreateUser, ModifyPasswd, ResetBound, ExtendValidity}
