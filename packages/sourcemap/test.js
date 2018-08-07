var fs = require('fs'),
  path = require('path'),
  sourceMap = require('source-map')

var GENERATED_FILE = path.join(
  '/Users/xuxin/www/work/vue2_update/test_env/static/js',
  '21',
  '21.40cca96c5ae196560388.js.map'
)

async function parse() {
  var rawSourceMap = fs.readFileSync(GENERATED_FILE).toString();

  var consumer = await new sourceMap.SourceMapConsumer(rawSourceMap);

  // consumer.eachMapping(function (m) { console.log(m); })

  var sm = consumer.originalPositionFor({
    line: 1,  // 压缩后的行数
    column: 23298,  // 压缩后的列数
  });


  var sources = consumer.sources;

  var smIndex = sources.indexOf(sm.source);

  var smContent = consumer.sourcesContent[smIndex];

  const rawLines = smContent.split(/\r?\n/g);

  console.log(rawLines[sm.line - 1]);
  // console.log(smContent)
}

parse()
