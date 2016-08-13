/**
 * 替换指定匹配的资源路径为绝对路径，相对于资源根目录
 * @author luoying
 */

'use strict';

const path = require('path');

// 匹配HTTP协议
const REG_HTTP = /^(http[s]?|\/\/)/;

module.exports = (content, base, root, regExp) => {
  let matchs = [];
  let match = null;
  
  while ((match = regExp.exec(content))) {
    matchs.push(match);
  }

  matchs.forEach((match) => {
    let st = match[1];
    if (path.isAbsolute(st) || REG_HTTP.test(st)) return;
    st = path.resolve(base, st).replace(root, '');
    content = content.replace(match[1], st);
  });

  return content;
};
