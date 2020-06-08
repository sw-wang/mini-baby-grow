const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const {
        child
    } = event
    const Result = await db.collection('childs').doc(child).get()
    const openids = Result.data.openids.concat(wxContext.OPENID)
    //   更新
    await db.collection('childs').doc(child).update({
        data: {
            openids
        }
    })
    return {
        code: 200,
        msg: 'ok',
        data: null
    }
}
