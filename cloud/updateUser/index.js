const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const userResult = await db.collection('users').where({
        'openid': wxContext.OPENID
    }).get()
    const {
        avatarUrl,
        city,
        country,
        gender,
        language,
        nickName,
        province
    } = event
    if (userResult.data.length > 0) {
        //   更新
        let _id = userResult.data[0]._id
        await db.collection('users').doc(_id).update({
            data: {
                avatarUrl,
                city,
                country,
                gender,
                language,
                nickName,
                province,
                lastTime: new Date()
            }
        })
    } else {
        //   新增
        await db.collection('users').add({
            data: {
                avatarUrl,
                city,
                country,
                gender,
                language,
                nickName,
                province,
                lastTime: new Date(),
                firstTime: new Date(),
                openid: wxContext.OPENID
            }
        })
    }
    return {
        code: 200,
        msg: 'ok',
        data: null
    }
}
