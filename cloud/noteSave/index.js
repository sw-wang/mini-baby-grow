const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const {
        textContent,
        address,
        weather,
        fileList,
        _id
    } = event
    const nowDate = new Date().getFullYear() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getDate()
    const notes = await db.collection('note').where({
        'openid': wxContext.OPENID,
        'date': nowDate
    }).get()
    if (notes.data.length > 0 && notes.data[0]._id !== _id) {
        return {
            code: 401,
            msg: '没有权限!',
            data: null
        }
    }
    if (_id) {
        // 编辑
        await db.collection('note').doc(_id).update({
            data: {
                textContent,
                address,
                weather,
                fileList,
                lastDate: new Date()
            }
        })
    } else {
        //   新增
        await db.collection('note').add({
            data: {
                textContent,
                address,
                weather,
                fileList,
                date: nowDate,
                insertDate: new Date(),
                lastDate: new Date(),
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