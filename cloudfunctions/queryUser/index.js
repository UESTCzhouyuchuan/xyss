// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  return new Promise((resolve, reject) =>{
    db.collection('userList').where({
      phone: event.phone,
      _openid: event.openid
    }).get().then(res =>{
      resolve(res.data.length)
    })
  })
}