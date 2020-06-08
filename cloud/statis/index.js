const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = event.OPENID || wxContext.OPENID
    const {
        child
    } = event
    const width = await db.collection('body')
        .where({
            child,
            type: 'width'
        }).orderBy('date', 'desc').limit(1).get()
    const height = await db.collection('body')
        .where({
            child,
            type: 'height'
        }).orderBy('date', 'desc').limit(1).get()
    const notes = await db.collection('note').where({
        openid
    }).count()
    const mile = await db.collection('milestone').where({
        child
    }).count()
    return {
        code: 200,
        msg: 'ok',
        data: {
            width: width.data && width.data[0] && width.data[0].value || 0,
            height: height.data && height.data[0] && height.data[0].value || 0,
            notes: notes && notes.total || 0,
            mile: mile && mile.total || 0
        }
    }
}
