const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
const fresh = require('./date')

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const userResult = await db.collection('users').where({
        'openid': wxContext.OPENID
    }).get()
    const crrMonth = new Date().format('yyyy.MM')
    const child = await db.collection('childs').where({
        'openids': wxContext.OPENID
    }).get()
    const openids = child.data[0].openids
    let _res = {
        crrMonth,
        user: []
    }
    const init = (openid, date) => {
        return new Promise((res, rej) => {
            const notes = await db.collection('note').where({
                openid
            }).get()
            res(notes)
        })
    }
    openids.forEach((item, index) => {
         init(item, crrMonth).then(res => {
            _res.user[index] = res
        })
    })
    return _res

    // return [
    //     {
    //         date: '2019.02',
    //         user: [
    //             {
    //                 nickName: 'momo',
    //                 avatarUrl: 'img url',
    //                 notes: [
    //                     {
    //                         day: '9',
    //                         test: 'xxx',
    //                         time: '03:23'
    //                     },
    //                     ...
    //                 ]

    //             },
    //             ...
    //         ]
    //     },
    //     ...
    // ]
}