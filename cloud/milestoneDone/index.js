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
        type,
        doneDate,
        remark,
        child
    } = event
    // check is my
    const myC = await db.collection('childs').where({
        openids: wxContext.OPENID
    }).get()
    if(myC.data[0]._id !== child){
        return {
            code: 401,
            msg: '权限不足',
            data: null
        }
    }
    if (_id) {
        // edit
        await db.collection('milestone').where({
            _id
        }).update({
            data: {
                doneDate,
                remark,
                lastDate: new Date()
            }
        })
    } else {
        // add
        await db.collection('milestone').add({
            data: {
                type,
                doneDate,
                remark,
                child,
                insertDate: new Date(),
                lastDate: new Date()
            }
        })
    }

    return {
        code: 200,
        msg: 'ok',
        data: null
    }
}