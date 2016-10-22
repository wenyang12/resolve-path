/**
 * 替换指定匹配的资源路径为绝对路径，相对于资源根目录
 * @author luoying
 */

'use strict';

const path = require('path');
const getMatchs = require('@tools/matchs');

// 匹配HTTP协议
const REG_HTTP = /^(http[s]?|\/\/|mailto:)/;
// 匹配锚点(#anchor)
const REG_ANCHOR = /^#/;
// 匹配javascript:起始的js code
const REG_JS = /^javascript:/;

module.exports = (content, dirname, root, regExp) => {
  let matchs = getMatchs(content, regExp);

  // 当跟目录非以/结尾，强制补上
  if (!/(\/|\\)$/.test(root)) root = root + path.sep;

  matchs.forEach((match) => {
    let st = match[1];

    if (path.isAbsolute(st) ||
      REG_HTTP.test(st) ||
      REG_ANCHOR.test(st) ||
      REG_JS.test(st)) {
      return;
    }

    st = path.resolve(dirname, st).replace(root, path.sep).replace(/\\/g, '/');
    content = content.replace(match[1], st);
  });

  return content;
};
