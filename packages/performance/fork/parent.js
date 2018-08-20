const child_process = require('child_process')
const fs = require('fs')

var numWorkers = require('os').cpus().length;


let env = process.argv[2]
let uidFile = process.argv[3]

if (env !== 'prod') {
  env = env || 'test7'
}

uidFile = process.argv[3] ? process.argv[3] : './uid.txt'
var str = fs.readFileSync(uidFile, 'utf8');
var arr = []
if (str.indexOf(',') > 0) {
  arr = str.replace(/\s/g, '').split(',');
} else {
  arr = str.replace(/\s+/g, ',').split(',');
}

var uidLen = arr.length

const step = Math.ceil(uidLen/numWorkers)

let children = []

const time = (new Date()).getTime()

for (let i = 0; i < numWorkers; i++) {
  var n = child_process.fork('./child.js');

  n.on('message', function (m) {
    console.log(`PARENT${i} got message:`, m);
  });

  let data = arr.slice(i * step, ((i+1) * step < uidLen) ? (i+1)*step : uidLen )

  n.send({
    time,
    env,
    uids: data
  });

  children.push(n)
}


