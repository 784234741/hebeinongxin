const user = require('./system/user')
const params = require('./system/config/params')
const menu = require('./system/config/menu')
const role = require('./system/role')

const allApi = [...user, ...params, ...menu, ...role]

module.exports = allApi
