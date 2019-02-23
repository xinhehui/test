// https://github.com/Selection-Translator/translation.js/
const { youdao, baidu, google } = require('translation.js')

google.translate('test').then(result => {
  console.log(result) // result 的数据结构见下文
})