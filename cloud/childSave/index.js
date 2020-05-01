const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const {
        _id,
        gender,
        name,
        birthday,
        headUrl
    } = event

    const userResult = await db.collection('childs').where({
        openids: wxContext.OPENID
    }).get()
    const childs = userResult.data && userResult.data[0] || false

    if (childs) {
        // 编辑
        await db.collection('childs').where({
            _id,
            openids: wxContext.OPENID
        }).update({
            data: {
                gender,
                name,
                birthday,
                headUrl,
                lastDate: new Date()
            }
        })
    } else {
        // 新增
        await db.collection('childs').add({
            data: {
                gender,
                name,
                birthday,
                headUrl,
                insertDate: new Date(),
                lastDate: new Date(),
                openids: [wxContext.OPENID]
            }
        })
    }

    return {
        code: 200,
        msg: 'ok',
        data: null
    }
}