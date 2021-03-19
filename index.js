const _ = require('lodash')
const Allocation = require('./allocation')

const fs = require('fs')
const { Parser } = require('json2csv')

const RANKS = require('./data/rank.js')
const SUBJECT_QUOTA = require('./data/subject_quota.json')
const STUDENTS = require('./data/student.json')
const COMBINATIONS = require('./data/combination.json').map(str =>
  str.split('-')
)

console.log('total:', STUDENTS.length)
const allocation = new Allocation(STUDENTS, RANKS, COMBINATIONS, SUBJECT_QUOTA)
const {
  result,
  failures,
  full,
  SUBJECT_PLACES,
  STUDENTS: students,
  iterate,
  startLogging
} = allocation

startLogging()
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
fs.writeFileSync('./output/result.csv', csv, 'utf8')
fs.writeFileSync('./output/result.json', JSON.stringify(result), 'utf8')
