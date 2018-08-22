'use strict'

const Express = require('express')
const BodyParser = require('body-parser')
const HTTP_PORT = process.env.HTTP_PORT || 3001

module.exports = () => {
  const app = Express()
  app
    .use(BodyParser.json())
    .get('/bc', (req, res) => {})
    .get('/an/:port', (req, res) => {})
    .get('/spawn/:member', (req, res) => {})
    .listen(HTTP_PORT, () => {
      console.log(`http server up [${HTTP_PORT}]`)
    })
}
