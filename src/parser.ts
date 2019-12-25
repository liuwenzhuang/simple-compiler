/**
 * 将从tokenizer得到的结果进行转换，得到AST
 */

interface IToken {
  type: 'number' | 'string' | 'parenthesis' | 'name';
  value: string | number;
}

export default function parser(tokens: IToken[]) {
  let cursor: number = 0;

  function visit() {
    let token = tokens[cursor];
    if (token.type === 'number') {
      cursor ++;
      // 返回AST Node
      return {
        type: 'NumberLiteral',
        value: token.value,
      };
    }

    if (token.type === 'string') {
      cursor ++;

      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }

    if (token.type === 'parenthesis' && token.value === '(') {
      // 获得括号内的数据
      token = tokens[++cursor];
      const node = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };
      token = tokens[++cursor];
      while (
        token.type !== 'parenthesis' ||
        (token.type === 'parenthesis' && token.value !== ')')
      ) {
        (node.params as any).push(visit());
        token = tokens[cursor];
      }
      cursor ++;
      return node;
    }
    throw new TypeError(token.type);
  }

  const ast = {
    type: 'Program',
    body: [],
  };
  while (cursor < tokens.length) {
    (ast.body as any).push(visit());
  }
  return ast;
}
