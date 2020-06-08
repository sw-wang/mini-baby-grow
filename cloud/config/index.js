const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const config = await db.collection('config').get()
    return {
        code: 200,
        msg: 'ok',
        data: config
    }
}
