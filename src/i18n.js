const {flattenJson, jsonToMap} = require('./util.js')

module.exports = {
  getUnusedRowErrors,
  getUnMapKeyErrors,
  getRepeatRowErrors,
  getRepeatKeyErrors,
}

/**
 * 找到表格中有的, 但i18n文件中未使用的
 */
function getUnusedRowErrors(rows, i18n) {

  let json = flattenJson(i18n);
  let valKeyMap = jsonToMap(json, true);
  let errorLine = [];

  rows.forEach((value, index) =>
    !valKeyMap.get(value) && errorLine.push({index, value}))

  return errorLine;
}

/**
 * 找到 i18n 文件中有的, 但未映射在表格的
 */
function getUnMapKeyErrors(rows, i18n) {
  let json = flattenJson(i18n);

  let valIndexMap = jsonToMap(rows, true);
  let errorLine = [];

  Object.entries(json).forEach(([key, value]) =>
    !valIndexMap.get(value) && errorLine.push({key, value}))

  return errorLine;
}

/**
 * 找到表格中重复的行
 */
function getRepeatRowErrors(rows) {
  return getRepeatErrors(rows);
}

/**
 * 找到i18n文件中重复的值
 */
function getRepeatKeyErrors(i18n) {

  i18n = flattenJson(i18n);

  return getRepeatErrors(i18n);

}

/**
 * 找到对象中值重复的键
 */
function getRepeatErrors(obj) {

  let errorLine = [];
  let whiteSet = new Set();

  Object.entries(obj).forEach(([key, value], index, arr) => {
    if (whiteSet.has(index))
      return

    let keys = [];

    arr.slice(index + 1).forEach(([k, v], i) => {
      i += index + 1;
      // 重复了
      if (v === value) {
        whiteSet.add(i);
        keys.push(k);
      }
    })

    keys.length && errorLine.push({
      key,
      count: keys.length,
      repeatKeys: keys,
      value
    })
  });

  return errorLine;
}
