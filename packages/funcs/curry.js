// https://juejin.im/post/5b8350246fb9a019c372d26d?utm_source=gold_browser_extension
function sub_curry(fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
      return fn.apply(this, args.concat([].slice.call(arguments)));
  };
}

function curry (fn, len) {
  let length = len || fn.length

  var slice = Array.prototype.slice

  return function () {
    if (arguments.length < length) {
      var combined = [fn].concat(slice.call(arguments));
      // 不会最终执行， 需要返回一个包含fn的执行函数
      return curry(sub_curry.apply(this, combined), length - arguments.length)
    } else {
      return fn.apply(this, arguments)
    }
  }
}
