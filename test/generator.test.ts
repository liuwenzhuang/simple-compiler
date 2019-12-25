import generator from '../src/generator';

test('generator should take ast into code string', () => {
  const ast = {
    type: 'Program',
    body: [{
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'add',
        },
        arguments: [{
          type: 'NumberLiteral',
          value: 2,
        }, {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'subtract',
          },
          arguments: [{
            type: 'NumberLiteral',
            value: 4,
          }, {
            type: 'NumberLiteral',
            value: 2,
          }],
        }],
      },
    }],
  };
  expect(generator(ast)).toEqual('add(2, subtract(4, 2));');
});
