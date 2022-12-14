import { getToken } from '@/utils/auth'
/**
 * 公共方法*/
/**
 * 解析时间到字符串
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach((v) => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

// 判断数据类型
export const whatType = (param) => {
  return Object.prototype.toString.call(param).split(' ')[1].slice(0, -1)
}

// 判断是否为 空 空对象 空数组 空字符等
export const commonBlank = (params) => {
  if (params === null || params === undefined) {
    return true
  }
  const type = Object.prototype.toString.call(params).split(' ')[1].slice(0, -1)
  if (type === 'String') {
    return params === '' || params.trim().length === 0
  }
  if (type === 'Object') {
    for (const key in params) {
      return false
    }
    return true
  }
  if (type === 'Array') {
    return params.length === 0
  }
  if (type === 'Null') {
    return true
  }
  if (type === 'Undefined') {
    return true
  }
  if (type === 'Number') {
    return params <= 0
  }
}

/**
 * 多行数据拼写报文的方法
 * @param dataArr	选择行的数组
 * @param attrArr  放置的参数数组
 */
export const arrChoices = (dataArr, attrArr) => {
  var jsonArr = []
  for (var i = 0; i < dataArr.length; i++) {
    var jsonObj = {}
    for (var j = 0; j < attrArr.length; j++) {
      var name = attrArr[j]
      jsonObj[name] = dataArr[i][name]
    }
    jsonArr.push(jsonObj)
  }
  return jsonArr
}

/**
 * 导出xlsx表格
 * @param header	表头数据
 * @param data  表格数据
 * @param filename  文件名称
 */
export const exportXlsx = (header, data, filename) => {
  import('@/components/Vendor/Export2Excel').then((excel) => {
    excel.export_json_to_excel({
      header,
      data,
      filename
    })
  })
}

/**
 * print打印页面
 * @param html
 */
export const printHtml = (html) => {
  const content = html
  const blob = new Blob([content], {
    type: 'text/html;charset=utf-8'
  })
  // const date = new Date().getTime()
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.style.pageBreakBefore = 'always'
  // iframe.setAttribute('id', `printPdf${date}`)
  // iframe.setAttribute('name', `printPdf${date}`)
  iframe.src = window.URL.createObjectURL(blob)
  document.body.appendChild(iframe)
  iframe.contentWindow.print()
  window.URL.revokeObjectURL(iframe.src) // 释放URL对象
  setTimeout(() => {
    document.body.removeChild(iframe)
  }, 100)
}

/**
 * 通用表单提交方法
 * @param {*} path      接口请求地址:地址没传时采用默认的地址/system/fileController/fileDownload.do；若有其它地址可在方法中传入
 * @param {*} jsonArr   传入表单参数arr
 */
export const commonFormDataCommit = (jsonArr, path) => {
  path = process.env.VUE_APP_BASE_API + '/' + path
  // const form = document.createElement('form')
  // document.getElementsByTagName('body')[0].appendChild(form)
  console.log('path', path)

  const form = document.getElementById('uploadForm')
  console.log(form)
  form.setAttribute('style', 'display:none')
  form.setAttribute('target', '')
  form.setAttribute('method', 'post')
  form.setAttribute('action', path) // 下载文件的请求路径
  jsonArr.forEach((tmp) => {
    const singleName = tmp.name
    const singleValue = tmp.value
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('name', singleName)
    input.setAttribute('value', singleValue)
    form.appendChild(input)
  })
  form.submit()
  form.innerHTML = ''
  form.removeAttribute('style')
  form.removeAttribute('target')
  form.removeAttribute('method')
  form.removeAttribute('action')
  console.log(form)
}

/**
 * @method 通用报表导出
 * @param fileName(String)-保存到本地的文件名
 * @param formatInfo(String)-服务器文件路径（包括文件名）
 * @param headerInfo(String)-导出表格表头
 * @param dataInfo(String)-导出表格表头对应的字段
 * @param path(String)-下载文件的请求路径
 */
export const commonReportExport = (
  fileName,
  formatInfo,
  headerInfo,
  dataInfo,
  path
) => {
  const fileNameJson = { name: 'fileName', value: fileName }
  const formatInfoJson = { name: 'formatInfo', value: formatInfo }
  const headerInfoJson = { name: 'headerInfo', value: headerInfo }
  const dataInfoJson = { name: 'dataInfo', value: dataInfo }
  const paramArr = [fileNameJson, formatInfoJson, headerInfoJson, dataInfoJson]

  commonFormDataCommit(paramArr, path)
}
