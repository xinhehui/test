// index.js
if ( process.env.NODE_ENV === 'development' ) {
  console.log('我是程序员xuxin');
}

if ( process.env['NODE_' + 'ENV'] === 'development' ) {
  console.log('我是程序员xuxin');
}
