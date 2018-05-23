'use strict'

const assert = require('assert')
const concatEach = require('.')
const isArrayWith = require('is-array-with')

const isOdd = n => n % 2 === 1

describe('concatEach()', function () {
  it('should concatenate array map result arrays', function () {
    assert(isArrayWith(concatEach([], [1, 2, 3], n => isOdd(n) ? [n] : []), 1, 3))
  })

  it('should concatenate array map result values', function () {
    assert(isArrayWith(concatEach([], [1, 2, 3], n => isOdd(n) ? n : []), 1, 3))
  })

  it('should concatenate onto a Set', function () {
    assert(isArrayWith(Array.from(concatEach(new Set(), [1, 2, 3], n => isOdd(n) ? [n] : [])), 1, 3))
  })

  it('should concatenate onto a WeakSet', function () {
    const obj1 = {}
    const obj2 = {}
    const ws = concatEach(new WeakSet(), [obj1, obj2], obj => [obj])
    assert(ws.has(obj1))
    assert(ws.has(obj2))
  })

  it('should not concatenate existing values if `unique` is true', function () {
    assert(isArrayWith(concatEach([1, 2], [1, 3, 2], n => [n], {unique: true}), 1, 2, 3))
  })

  it('should loop through multiple arrays', function () {
    assert(isArrayWith(concatEach([], ['a', 'b'], ['1', '2'], (l, n) => [l + n]), 'a1', 'a2', 'b1', 'b2'))
  })
})
