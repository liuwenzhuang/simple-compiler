/**
 * 转换经./transformer.ts转换后的ast，并生成新的代码
 */
export default function generator(node: any): any {
  switch (node.type) {
    case 'Program':
      return node.body.map(generator).join('\n');
    case 'ExpressionStatement':
      return (
        generator(node.expression) +
        ';'
      );
    case 'CallExpression':
      return (
        generator(node.callee) +
        '(' +
        node.arguments.map(generator).join(', ') +
        ')'
      );
    case 'Identifier':
      return node.name;
    case 'NumberLiteral':
      return node.value;
    case 'StringLiteral':
      return `"${node.value}"`;
    default:
      throw new TypeError(node.type);
  }
}
