import parser from '../src/parser';
import tokenizer from '../src/tokenizer';

test('parser should return ast', () => {
  const tokens: any = tokenizer('(add 2 (subtract 4 2))');
  const ast = parser(tokens);
  const desiredAst = {
    type: 'Program',
    body: [{
      type: 'CallExpression',
      name: 'add',
      params: [{
        type: 'NumberLiteral',
        value: 2,
      }, {
        type: 'CallExpression',
        name: 'subtract',
        params: [{
          type: 'NumberLiteral',
          value: 4,
        }, {
          type: 'NumberLiteral',
          value: 2,
        }],
      }],
    }],
  };
  expect(ast).toEqual(desiredAst);
});
