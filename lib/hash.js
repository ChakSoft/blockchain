'use strict'

const Crypto = require('crypto')

module.exports = ({ timestamp, data, index, previous }) => {
  return Crypto.createHash('SHA256')
    .update(`${timestamp}${data}${index}${previous}`)
    .digest('hex')
}
