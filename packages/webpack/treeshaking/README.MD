webpack 负责对代码进行标记，把 import & export 标记为 3 类：

所有 import 标记为 / harmony import /

被使用过的 export 标记为 / harmony export ([type]) /，其中 [type] 和 webpack 内部有关，可能是 binding, immutable 等等。

没被使用过的 import 标记为 / harmony export [FuncName] /，其中 [FuncName] 为 export 的方法名称

之后在 Uglifyjs (或者其他类似的工具) 步骤进行代码精简，把没用的都删除


webpack tree shaking 只处理顶层内容，例如类和对象内部都不会再被分别处理。

这主要也是由于 JS 的动态语言特性所致。如果把 bye() 删除，考虑如下代码：

// index.js
import Util from './util'
let util = new Util()
let result1 = util[Math.random() > 0.5 ? 'hello', 'bye']()
console.log(result1)