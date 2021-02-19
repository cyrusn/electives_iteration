const _ = require('lodash')
const preferences = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const students = [
  { id: 'lp01', preferences: _.shuffle(preferences) },
  { id: 'lp02', preferences: _.shuffle(preferences) },
  { id: 'lp03', preferences: _.shuffle(preferences) },
  { id: 'lp04', preferences: _.shuffle(preferences) },
  { id: 'lp05', preferences: _.shuffle(preferences) },
  { id: 'lp06', preferences: _.shuffle(preferences) },
  { id: 'lp07', preferences: _.shuffle(preferences) },
  { id: 'lp08', preferences: _.shuffle(preferences) },
  { id: 'lp09', preferences: _.shuffle(preferences) },
  { id: 'lp10', preferences: _.shuffle(preferences) },
  { id: 'lp11', preferences: _.shuffle(preferences) },
  { id: 'lp12', preferences: _.shuffle(preferences) },
  { id: 'lp13', preferences: _.shuffle(preferences) },
  { id: 'lp14', preferences: _.shuffle(preferences) }
]

const rank = {
  overall: _(students)
    .shuffle()
    .map('id')
    .value(),
  combinations: _.range(9).map(n =>
    _(students)
      .shuffle()
      .map('id')
      .value()
  )
}
const combination = [
  'BIO-CHEM',
  'BIO-HIST',
  'BIO-ECON',
  'CHIST-CHEM',
  'CHIST-HIST',
  'CHIST-ECON',
  'BAFS-CHEM',
  'BAFS-HIST',
  'BAFS-ECON'
]

const fs = require('fs')

fs.writeFileSync('./example/student.json', JSON.stringify(students))
fs.writeFileSync('./example/rank.json', JSON.stringify(rank))
fs.writeFileSync('./example/combination.json', JSON.stringify(combination))
