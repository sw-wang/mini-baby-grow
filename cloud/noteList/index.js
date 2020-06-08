const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
const fresh = require('./date')
const totalPage = 20 // 每页输出多少条

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = event.OPENID || wxContext.OPENID
    const { page } = event
    const notes = await db.collection('note')
        .where({
            openid
        }).field({
            date: true,
            textContent: true,
            insertDate: true,
            openid
        }).orderBy('insertDate', 'desc').limit(totalPage).skip((page - 1) * totalPage).get()
    return {
        code: 200,
        msg: 'ok',
        data: notes
    }
}
