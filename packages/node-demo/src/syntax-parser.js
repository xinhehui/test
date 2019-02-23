const  sytaxParser = require('syntax-parser')

const  { createLexer, chain, createParser, many, matchTokenType } = sytaxParser

const myLexer = createLexer([
  {
    type: 'whitespace',
    regexes: [/^(\s+)/],
    ignore: true
  },
  {
    type: 'word',
    regexes: [/^([a-zA-Z0-9]+)/] // 解析数字
  },
  {
    type: 'operator',
    regexes: [
      /^(\(|\))/, // 解析 ( )
      /^(\+|\-|\*|\/)/ // 解析 + - * /
    ]
  }
]);

// console.log(myLexer('1 + 2 - 3 * b / (x + y)'))


const root = () => chain(term, many(addOp, root))(parseTermAst);
const term = () => chain(factor, many(mulOp, root))(parseTermAst);
const mulOp = () => chain(['*', '/'])(ast => ast[0].value);
const addOp = () => chain(['+', '-'])(ast => ast[0].value);

const factor = () => chain([
    chain('(', root, ')')(ast => ast[1]),
    chain(matchTokenType('word'))(ast => ast[0].value)
])(ast => ast[0]);

const parseTermAst = () =>
  ast[1]
    ? ast[1].reduce(
        (obj, next) =>
          next[0]
            ? {
                operator: next[0],
                left: obj || ast[0],
                right: next[1]
              }
            : {
                operator: next[1] && next[1].operator,
                left: obj || ast[0],
                right: next[1] && next[1].right
              },
        null
      )
    : ast[0];

const myParser = createParser(
  root, // Root grammar.
  myLexer // Created in lexer example.
);

const result = myParser('1 + 2 - (3 - 4 + 5) * 6 / 7');
console.log(result.ast)
