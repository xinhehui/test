const path = require('path')
const dirTree = require('directory-tree');
const root = dirTree(path.resolve('../'), {
  exclude: /node_modules|package-lock.json/
});

const msgArr = []

msgArr.push(tree.name)

function printChildren (children, depth) {
  if (children) {
    let len = children.length
    children.forEach((element, index) => {
      let msg = '     '.repeat(depth) + element.name
      // let msg = '|   '.repeat(depth-1) + '└──' + element.name

      msgArr.push(msg)
      if (element.children) {
        printChildren(element.children, depth + 1)
      }
    });
  }  
}

printChildren(root.children, 1)

msgArr.forEach(msg => {
  console.log(msg)
})
