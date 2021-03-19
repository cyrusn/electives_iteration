const _ = require('lodash')
const Allocation = require('./allocation')

const fs = require('fs')
const { Parser } = require('json2csv')

const RANKS = require('./example/rank.json')
const SUBJECT_QUOTA = require('./example/subject_quota.json')
const STUDENTS = require('./example/student.json')
let COMBINATIONS = require('./example/combination.json')
COMBINATIONS = COMBINATIONS.map(str => str.split('-'))

const allocation = new Allocation(STUDENTS, RANKS, COMBINATIONS, SUBJECT_QUOTA)

const {
  result,
  failures,
  full,
  SUBJECT_PLACES,
  STUDENTS: students,
  startLogging,
  iterate
} = allocation

console.log('total:', STUDENTS.length)
startLogging({ filename: 'log_example.csv' })
iterate()
console.log('result: ', result.length)
console.log('failures: ', failures)
console.log('places: ', SUBJECT_PLACES)
console.log('full: ', full)
console.log(
  'unassigned students:',
  _.filter(students, s => s.isConfirmed).length
)
// console.log('fill-up order: ', allocation.SUBJECT_FILLED)

const parser = new Parser({
  fields: ['id', 'x1', 'x2', 'preference', 'rank', 'x1_order', 'x2_order']
})
const csv = parser.parse(result)
fs.writeFileSync('./output/example_result.csv', csv, 'utf8')
fs.writeFileSync('./output/example_result.json', JSON.stringify(result), 'utf8')
