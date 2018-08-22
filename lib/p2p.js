'use strict'

const Chain = require('./block-manager')

const P2P_PORT = process.env.P2P_PORT || 11039

module.exports = function() {
  this.chain = null
  this.sockets = []

  this.closeConnection = (connection) => {
    this.sockets.splice(this.sockets.indexOf(connection), 1)
  }

  this.initConnection = (connection) => {
    this.sockets.push(connection)
    connection.on('message', (message) => {})
    connection.on('error', () => {
      this.closeConnection(connection)
    })
    connection.on('close', () => {
      this.closeConnection(connection)
    })
  }

  this.init = () => {
    this.chain = Chain.init()
    const server = new WebSocket.Server({ port : P2P_PORT })
    server.on('connection', this.initConnection)

    return {
      stats : () => this.chain.blockCount,
    }
  }

  this.createBlock = (data) => {
    this.chain.addToChain()
  }

  this.broadcast = (message) => {
    for (const node of this.sockets) {
      node.send(
        JSON.stringify({
          event : message,
        })
      )
    }
  }

  this.addPeer = (host, port) => {
    const connection = new WebSocket(`ws://${host}:${port}`)
    connection.on('error', (error) => {
      console.error(error)
    })
    connection.on('open', () => this.initConnection(connection))
  }

  return this.init()
}
