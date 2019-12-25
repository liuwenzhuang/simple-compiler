/**
 * 利用traverser对AST进行转换
 */
import traverser from './traverser';

export default function transformer(ast: any) {
  const newAst: any = {
    type: 'Program',
    body: [],
  };
  // 将新AST的body引用给ast，在使用traverser遍历时可利用parent对新AST直接处理
  ast._context = newAst.body;

  traverser(ast, {
    NumberLiteral: {
      enter(node: any, parent: any) {
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value,
        });
      },
    },
    StringLiteral: {
      enter(node: any, parent: any) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value,
        });
      },
    },
    CallExpression: {
      enter(node: any, parent: any) {
        let expression: any = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        };

        // 遍历子节点时，可使用parent._context为arguments设置值
        node._context = expression.arguments;

        if (parent.type !== 'CallExpression') {
          expression = {
            type: 'ExpressionStatement',
            expression,
          };
        }

        parent._context.push(expression);
      },
    },
  });

  return newAst;
}
