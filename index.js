'use strict'

const add = require('vadd')
const neach = require('neach')
const sbo = require('sbo')
const vfn = require('vfn')

module.exports = sbo(vfn({arg: 1, oo: true}, (base, iters, cb, options = {}) => {
  neach(...iters, (...xs) => add.all(base, cb(...xs), options))
  return base
}))
