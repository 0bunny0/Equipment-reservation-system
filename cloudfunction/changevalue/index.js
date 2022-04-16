const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection(event.name).doc(event._id).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        value:event.value
      }
    })
  } catch (e) {
    console.error(e)
  }
}