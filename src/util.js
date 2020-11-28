module.exports = {
  flattenJson,
  writeJson,
  jsonToMap
}


// , {a: {b: 1, c: { d: 2}
/**
 * 将json扁平化
 * {
 *   a: {
 *     b: 1,
 *     c: {
 *       d: 2
 *     }
 *   }
 * }
 * 将转换为
 * {
 *   'a.b': 1,
 *   'a.c.d: 2
 * }
 */
function flattenJson(json) {

  let currentKey = '';
  let newJson = {};

  flatten(json);

  function flatten(obj) {
    Object.entries(obj).forEach(([key, val]) => {
      addKey(key);
      if (typeof val === 'object')
        flatten(val);
      else
        newJson[currentKey] = val;
      delKey();
    })
  }

  function addKey(key) {
    currentKey && (currentKey += '.');
    currentKey += key;
  }

  function delKey() {
    let index = currentKey.lastIndexOf('.');
    currentKey = index > 0 ? currentKey.slice(0, index) : '';
  }

  return newJson;
}

/**
 * 写 json 文件
 */
function writeJson(filePath, jsonObj, callback) {
  const fs = require('fs');
  fs.writeFile(
    filePath,
    JSON.stringify(jsonObj, null, '  '),
    () => callback && callback()
  )
}


/**
 * 输入键值对的对象
 * 返回键值对的 map
 *
 * @param {Object} json                 - json 对象
 * @param {boolean} [reverse = false]   - 是否将对象的值改为键而非原本的键值映射
 *                                        若为true, 新 map 的键是原对象的值, 值是原对象的键
 */
function jsonToMap(json, reverse) {
  let entries = Object.entries(json)
  if (reverse)
    entries = entries.map(([k, val]) => [val, k]);

  return new Map(entries);
}
