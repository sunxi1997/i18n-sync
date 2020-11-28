
const xlsx = require("node-xlsx");

module.exports = {
  getCols,
}


/**
 * 获取表格指定列的所有行
 * @param {string} source                   - 表格文件路径
 * @param {Object} [option]                 - 可选, 配置参数
 * @param {number} [option.start = 0]       - 开始行
 * @param {number | Array} [option.index]   - 要获取的列的序号集合
 *                                              默认返回从左到右所有列的集合
 *                                              若为数字, 则只获取一列
 *                                              若为数组, 则获取对应数字的列,  如 [2, 3] 则返回 [第二列, 第三列]
 */
function getCols(source, option = {}) {
  let {start = 0, index: indexList = []} = option;
  const rows = getTable(source).slice(start)

  if (!Array.isArray(indexList)) {
    indexList = [indexList]
  }
  const returnAll = indexList.length === 0;

  const result = indexList.map(() => {
    return []
  });

  rows.forEach(row => {
    if (returnAll) {
      row.forEach((col, index) => {
        result[index] = result[index] || [];
        result[index].push(col);
      })
    } else
      indexList.forEach((colIndex, index) => result[index].push(row[colIndex]))
  })

  return result;
}

function getTable(source) {
  return xlsx.parse(source)[0].data;
}
