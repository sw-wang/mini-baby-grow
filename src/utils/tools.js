// 基于vant-weapp ui库，封装其常用组件，简化调用方法。

import Toast from '@vant/weapp/dist/toast/toast'
import Dialog from '@vant/weapp/dist/dialog/dialog'
// loading框 , loading('loading...')
const loading = {
    open: (title = '') => {
        Toast.loading({
            mask: true,
            message: title,
            duration: 0
        })
    },
    close: () => {
        Toast.clear()
    }
}
// 弱提示 , toast('类型', '弹出信息' , 关闭时间).关闭回调
const toast = (type, message, duration) => {
    if (!message) {
        duration = message
        message = type
        type = 'text'
    }
    duration = duration || 2000
    return new Promise(res => {
        Toast({
            type,
            message,
            duration,
            onClose: () => {
                res({ type, statu: 'ok' })
            }
        })
    })
}
// 弹框强提示 dialog.alert||confirm('标题', '信息', {其他参数}).确定回调.取消回调
const dialog = {
    alert: (title, message, opt = {}) => {
        let _opt = Object.assign(opt, { title, message })
        return new Promise(res => {
            Dialog.alert(_opt).then(() => {
                res({ type: 'alert', statu: 'ok' })
            })
        })
    },
    confirm: (title, message, opt = {}) => {
        let _opt = Object.assign(opt, { title, message })
        return new Promise((res, rej) => {
            Dialog.confirm(_opt)
                .then(() => {
                    res()
                })
                .catch(() => {
                    rej()
                })
        })
    }
}

export { loading, toast, dialog }
