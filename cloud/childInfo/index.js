const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
const fresh = require('./date')

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const userResult = await db.collection('childs').where({
        openids: wxContext.OPENID
    }).get()
    let childs = userResult.data || false
    if (!childs) {
        return {
            code: 404,
            msg: 'not fount child',
            data: null
        }
    }
    childs = childs.map(item => {
        item.days = fresh(item.birthday)
        return item
    })

    return {
        code: 200,
        msg: 'ok',
        data: childs
    }
}