/**
 * 遍历AST，使用vistor处理特定节点的enter和exit
 */
export default function traverser(ast: object, visitor: any) {
  function traverseArray(array: any[], parent: any) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }

  function traverseNode(node: any, parent: any) {
    const methods = visitor[node.type];
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node);
        break;
      case 'CallExpression':
        traverseArray(node.params, node);
        break;
      // 没有子节点遍历，退出
      case 'NumberLiteral':
      case 'StringLiteral':
        break;
      default:
        throw new TypeError(node.type);
    }

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  traverseNode(ast, null);
}
