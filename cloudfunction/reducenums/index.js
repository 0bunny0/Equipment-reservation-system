const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
    try {
       await db.collection('shebeiliebiao').where({
        name: _.eq(event.name)
      })
        .update({
          data: {
            number: _.inc(-event.nums)
          },
        })
    } catch (e) {
      console.error(e)
    }
}