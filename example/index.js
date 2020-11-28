/**
 * 直接运行此文件, 可以看到表格和本地字典文件对比差异, 并将结果生成json文件存储
 */

const xlsSource = './assets/i18n.xls'
const cn = require('./i18n/cn.json');
const en = require('./i18n/en.json');
const {
  getCols,
  runTest: $runTest,
  writeJson,
  unusedRowErrorTest,
  unMapKeyErrorTest,
  repeatRowErrorTest,
  repeatKeyErrorTest,
} = require('../index')

const LOG_ERROR = true;   // 是否打印详细测试结果
const WRITE_FILE = true;  // 是否将测试结果写入文件


const RESULT = {};
const runTest = (...args) => RESULT[args[0]] = $runTest(...args)

let [cnRows, enRows] = getCols(xlsSource, {start: 2, index: [1, 2]})

runTest('中文表格中多余翻译(文件中未使用)', () => unusedRowErrorTest(cnRows, cn), LOG_ERROR)
runTest('英文表格中多余翻译(文件中未使用)', () => unusedRowErrorTest(enRows, en), LOG_ERROR)

runTest('中文 表格缺失部分', () => unMapKeyErrorTest(cnRows, cn), LOG_ERROR)
runTest('英文 表格缺失部分', () => unMapKeyErrorTest(enRows, en), LOG_ERROR)

runTest('中文表格中重复项', () => repeatRowErrorTest(cnRows), LOG_ERROR)
runTest('英文表格中重复项', () => repeatRowErrorTest(enRows), LOG_ERROR)

runTest('中文 文件中重复项', () => repeatKeyErrorTest(cn), LOG_ERROR)
runTest('英文 文件中重复项', () => repeatKeyErrorTest(en), LOG_ERROR)

WRITE_FILE && writeJson('./log.json', RESULT, error => console.log(`写入文件 ${ error ? '失败' : '成功' }`))
