import CryptoJs from 'crypto-js'
/* 加密、解密 */
export default {
  /**
   * 加密
   * @param {String} word: 加密信息
   */
  encrypt(word) {
    const key = CryptoJs.enc.Utf8.parse('0102030405060708')
    const srcs = CryptoJs.enc.Utf8.parse(word)
    const encrypted = CryptoJs.AES.encrypt(srcs, key, {
      iv: key,
      mode: CryptoJs.mode.CBC
    })
    return encrypted.toString()
  },

  /**
   * 解密
   * @param {String} word: 加密信息
   */
  decrypt(word) {
    const key = CryptoJs.enc.Utf8.parse('0102030405060708')
    const decrypt = CryptoJs.AES.decrypt(word, key, {
      // mode: CryptoJs.mode.ECB,
      // padding: CryptoJs.pad.Pkcs7
      iv: key,
      mode: CryptoJs.mode.CBC
    })
    return CryptoJs.enc.Utf8.stringify(decrypt).toString()
  }

}
