const babel = require("@babel/core");

const result = babel.transform("const result = 1 + 2 + 3;",{
  plugins:[
    require("./plugin")
  ]
});

console.log(result.code); // const result = 3;