# resolve-path

> 替换指定匹配的资源路径为绝对路径，相对于资源根目录

```js
const path = require('path');
const resolvePath = require('@tools/resolve-path');

let data = '';
let dirname = path.dirname(file.path);
resolvePath(data, dirname, '/home/user/code/demo/', /url\(([^\)]+)\)/gi);
```
