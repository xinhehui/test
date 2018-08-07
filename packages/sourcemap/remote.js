var   sourceMap = require('source-map')

async function parse() {
  const ret = sourceMap.SourceMapConsumer.initialize({
    "21map": "http://wap.xinhehui.com/static/js/21/21.40cca96c5ae196560388.js.map"
  });

  var consumer = await new sourceMap.SourceMapConsumer()

  console.log(consumer)
}

parse()