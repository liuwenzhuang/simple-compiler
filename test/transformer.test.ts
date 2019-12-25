import transformer from '../src/transformer';

test('transformer could generate a new ast from an old one', () => {
  const oldAst = {
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

  const desiredAst = {
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
  expect(transformer(oldAst)).toEqual(desiredAst);
});
