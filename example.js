const _ = require('lodash')
const Allocation = require('./allocation')

const fs = require('fs')
const { Parser } = require('json2csv')

const RANKS = require('./example/rank.json')
const SUBJECT_QUOTA = require('./example/subject_quota.json')
const STUDENTS = require('./example/student.json')
let COMBINATIONS = require('./example/combination.json')
COMBINATIONS = COMBINATIONS.map(str => str.split('-'))

console.log('total:', STUDENTS.length)
const allocation = new Allocation(STUDENTS, RANKS, COMBINATIONS, SUBJECT_QUOTA)
allocation.startLogging({ filename: 'log_example.csv' })
// console.log('ranks: ', allocation.RANKS)
allocation.iterate()
const result = allocation.result
console.log('result: ', result.length)
// const stages = allocation.stages
console.log('failures: ', allocation.failures)
console.log('places: ', allocation.SUBJECT_PLACES)
console.log('full: ', allocation.full)
console.log(
  'unassigned students:',
  _.filter(allocation.STUDENTS, s => s.isConfirmed).length
)
// console.log('fillup order: ', allocation.SUBJECT_FILLED)
const parser = new Parser({
  fields: ['id', 'x1', 'x2', 'preference', 'rank', 'x1_order', 'x2_order']
})
const csv = parser.parse(result)
fs.writeFileSync('./output/example_result.csv', csv, 'utf8')
fs.writeFileSync('./output/example_result.json', JSON.stringify(result), 'utf8')
