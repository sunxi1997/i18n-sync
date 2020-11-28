const {getCols} = require('./src/table')
const {
  runTest,
  unusedRowErrorTest,
  unMapKeyErrorTest,
  repeatRowErrorTest,
  repeatKeyErrorTest,
} = require('./src/test')

const {
  writeJson
} = require('./src/util')

module.exports = {
  getCols,
  runTest,
  writeJson,
  unusedRowErrorTest,
  unMapKeyErrorTest,
  repeatRowErrorTest,
  repeatKeyErrorTest,
}
