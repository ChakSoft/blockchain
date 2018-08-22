'use strict'

const createHash = require('./hash')

module.exports = function() {
  this.chain = []
  this.currentBlock = null

  this.create = (last, data) => {
    const newBlock = {
      timestamp : new Date().getTime(),
      data,
      index : last.index + 1,
      previousHash : last.hash,
    }
    newBlock.hash = createHash(newBlock)
    return newBlock
  }

  this.init = () => {
    const genesisBlock = {
      index : 0,
      timestamp : new Date().getTime(),
      data : 'Initial data',
      previousHash : '-1',
    }
    genesisBlock.hash = createHash(genesisBlock)
    this.chain.push(genesisBlock)
    this.currentBlock = genesisBlock

    return {
      getLatest() {
        return this.currentBlock
      },
      get blockCount() {
        return this.chain.length
      },
      chain() {
        return this.chain
      },
    }
  }

  this.isValidHash = (block) => {
    return createHash(block) === block.hash
  }

  this.isValidBlock = (block, previous) => {
    if (previous.index + 1 !== block.index) {
      return false
    }
    if (previous.hash !== block.previousHash) {
      return false
    }
    if (!this.isValidHash(block)) {
      return false
    }
    return true
  }

  return this.init()
}
