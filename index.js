/**
 * 替换指定匹配的资源路径为绝对路径，相对于资源根目录
 * @author luoying
 */

'use strict';

const path = require('path');
const getMatchs = require('@tools/matchs');

// 匹配HTTP协议
const REG_HTTP = /^(http[s]?|\/\/)/;

module.exports = (content, dirname, root, regExp) => {
  let matchs = getMatchs(content, regExp);

  matchs.forEach((match) => {
    let st = match[1];
    if (path.isAbsolute(st) || REG_HTTP.test(st)) return;
    st = path.resolve(dirname, st).replace(root, '/');
    content = content.replace(match[1], st);
  });

  return content;
};
