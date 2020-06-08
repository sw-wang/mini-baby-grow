const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = event.openid || wxContext.OPENID
    const userResult = await db.collection('users').where({
        openid
    }).get()
    const { nickName } = userResult.data[0]
    const nowDate = event.date ? event.date : new Date().getFullYear() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getDate()
    const notes = await db.collection('note').where({
        openid,
        'date': nowDate
    }).get()
    if (notes.data.length > 0) {
        let data = {
            ...notes.data[0],
            nickName,
            nowDate
        }
        if (wxContext.OPENID === notes.data[0].openid) {
            data.creator = true
        }
        return {
            code: 200,
            msg: 'ok',
            data: {
                ...data,
                nickName,
                nowDate
            }
        }
    } else {
        return {
            code: 200,
            msg: 'ok',
            data: {
                nickName, nowDate
            }
        }
    }


}