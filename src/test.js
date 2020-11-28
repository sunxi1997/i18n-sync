const {
  getUnusedRowErrors,
  getUnMapKeyErrors,
  getRepeatRowErrors,
  getRepeatKeyErrors
} = require('./i18n')

// 测试可以外包一层此函数
function runTest(testName, testFunction, log) {
  console.log(`------------------Start Test: ${ testName }-----------------------`);
  let result = testFunction();

  logResult(result.count, log && result);

  console.log(`------------------End Test: ${ testName }-----------------------`);
  return result;
}

// 找到表格中有的, 但i18n文件中未使用的
const unusedRowErrorTest = (rows, i18n) => {
  let result = getUnusedRowErrors(rows, i18n)
  let count = result.length;
  return {
    "测试说明": "对比xls和i18n文件, 找到表格中声明,但对应语言中没有声明的行",
    "字段说明": {
      "count": "异常结果数量",
      "result": "异常结果",
      "result[].index": "在表格中的序号",
      "result[].value": "未被使用的值"
    },
    count,
    result
  }
}

// 找到 i18n 文件中有的, 但未映射在表格的
const unMapKeyErrorTest = (rows, i18n) => {
  const result = getUnMapKeyErrors(rows, i18n)
  let count = result.length;
  return {
    "测试说明": "对比xls和i18n文件, 找到i18n文件中声明, 但没有映射在xls表格中的字段",
    "字段说明": {
      "count": "异常结果数量",
      "result": "异常结果",
      "result[].key": "未整理到表格文件的文字在 i18n 模块中的键",
      "result[].value": "未整理到表格文件的文字"
    },
    count,
    result
  }
}

// 找到表格中重复的行
const repeatRowErrorTest = (rows) => {
  const result = getRepeatRowErrors(rows)
  let count = result.reduce((total, {count}) => count + total, 0)
  return {
    "测试说明": "找到表格中重复的翻译",
    "字段说明": {
      "count": "异常结果数量",
      "result": "异常结果",
      "result[].count": "该文字重复出现的次数",
      "result[].key": "重复的文字在表格中首次出现时的序号",
      "result[].repeatKeys": "重复的文字在表格中再次出现时的序号的集合",
      "result[].value": "重复的文字"
    },
    count,
    result
  }
}

// 找到i18n文件中重复的值
const repeatKeyErrorTest = (i18n) => {
  const result = getRepeatKeyErrors(i18n)
  let count = result.reduce((total, {count}) => count + total, 0)
  return {
    "测试说明": "找到i18n文件中重复的值, 并给出他们的键集合",
    "字段说明": {
      "count": "异常结果数量",
      "result": "异常结果",
      "result[].count": "该值重复出现的次数",
      "result[].key": "重复的文字在语言包中首次出现时的键",
      "result[].repeatKeys": "重复的文字在语言包中再次出现时的键的集合",
      "result[].value": "重复的文字"
    },
    count,
    result
  }
}


function logResult(count, result) {
  console.log(`共${ count }个错误`)
  if (result) {
    console.log(result);
    console.log(`共${ count }个错误`)
  }
}


module.exports = {
  runTest,
  unusedRowErrorTest,
  unMapKeyErrorTest,
  repeatRowErrorTest,
  repeatKeyErrorTest,
}
