import { loading, toast } from './tools'
// 错误代码
const HTTP_ERROR_CODE = {
    301: '内容重复',
    400: '请求错误(400)',
    401: '未授权，请重新登录(401)',
    403: '拒绝访问(403)',
    404: '请求出错(404)',
    406: '请求参数错误(406)',
    408: '请求超时(408)',
    500: '服务器错误(500)',
    501: '服务未实现(501)',
    502: '网络错误(502)',
    503: '服务不可用(503)',
    504: '网络超时(504)',
    505: 'HTTP版本不受支持(505)'
}
//请求成功拦截器
const interceptorsResponse = res => {
    if (res.errCode) {
        return Promise.reject()
    }
    return res
}
const f = {
    call: function(name, data = {}) {
        return new Promise((resolve, reject) => {
            wx.cloud
                .callFunction({
                    name,
                    data
                })
                .then(d => {
                    resolve(d.result)
                })
                .catch(err => {
                    loading.close()
                    toast('fail', '系统错误')
                    reject(err)
                })
        })
    },
    upload: function(cloudPath, filePath) {
        return new Promise((resolve, reject) => {
            wx.cloud
                .uploadFile({
                    cloudPath,
                    filePath
                })
                .then(d => {
                    resolve(d.fileID)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    down: function(fileID) {
        return new Promise((resolve, reject) => {
            wx.cloud
                .downloadFile({
                    fileID
                })
                .then(d => {
                    resolve(d)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    // 从云存储空间删除文件，一次最多 50 个
    delete: function(fileList) {
        return new Promise((resolve, reject) => {
            wx.cloud
                .deleteFile({
                    fileList
                })
                .then(d => {
                    resolve(d)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}
export default f
