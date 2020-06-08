import mpx from '@mpxjs/core'
import mpxFetch from '@mpxjs/fetch'
import { toast } from './tools'
import api from '../config/api'

mpx.use(mpxFetch)

//请求拦截器
mpx.xfetch.interceptors.request.use(function(config) {
    console.log('config', config)
    return new Promise((resolve, reject) => {
        config.data['token'] = 'xxxxx'
        resolve(config)
    })
})

//请求成功拦截器
mpx.xfetch.interceptors.response.use(function(res) {
    if (res.statusCode != 200) {
        toast('fail', '系统错误')
        return Promise.reject()
    }
    return res
})

const http = {
    done(url, data = {}, type = 'get') {
        url = url.indexOf('https') === -1 ? Config.apiUrl + url : url
        return mpx.xfetch.fetch({
            url: url,
            method: type,
            data: data
        })
    },
    post(url, data = {}) {
        return http.done(url, data, 'POST')
    },
    get(url, data = {}) {
        return http.done(url, data, 'GET')
    }
}

export { http, api }
