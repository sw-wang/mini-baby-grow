const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const mileTypes = await db.collection('milestoneType')
        .where({
            openid: _.or(_.eq(wxContext.OPENID), _.eq(null))
        }).orderBy('time', 'asc').get()
    return {
        code: 200,
        msg: 'ok',
        data: mileTypes
    }
}