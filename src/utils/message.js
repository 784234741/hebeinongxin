/* 所有提示信息*/
// import { Notification } from 'element-ui'
/**
 * 提示框： 成功
 * @param {String} message
 * @param {Object} that
 */
export function commonMsgSuccess(message, that) {
  that.$notify({
    title: '提示',
    message: message,
    type: 'success',
    duration: 2000
  })
}
/**
 * 提示框： 失败
 * @param {String} message
 * @param {Object} that
 */
export function commonMsgError(message, that) {
  that.$notify.error({
    title: '提示',
    message: message
  })
}
/**
 * 提示框： 警告
 * @param {String} message
 * @param {Object} that
 */
export function commonMsgWarn(message, that) {
  that.$notify({
    title: '警告',
    message: message,
    type: 'warning'
  })
}

/**
 * 提示框： confirm
 * @param {String} message
 * @param {Object} that
 */
export function commonMsgConfirm(message, that, callBack) {
  if (callBack) {
    that
      .$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // })
        if (callBack) {
          return callBack(true)
        }
      })
      .catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
        if (callBack) {
          return callBack(false)
        }
      })
  }
}

/**
 * 提示框： 提示性信息
 * @param {String} message
 * @param {Object} that
 */
export function commonMsgInfo(message, that, callback) {
  that.$alert(message, '提示', {
    confirmButtonText: '确定',
    callback: (action) => {
      if (callback) {
        return callback
      }
    }
  })
}
