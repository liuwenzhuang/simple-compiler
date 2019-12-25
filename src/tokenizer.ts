/**
 * 词汇分析 lexical analysis
 */
import { isParenthesis, isBlank, isNumber, isQuote, isName } from './utils/identifier';

export default function(input: string) {
  let cursor: number = 0;
  const tokens = [];
  while (cursor < input.length) {
    const char = input[cursor];
    if (isParenthesis(char)) {
      tokens.push({
        type: 'parenthesis',
        value: char,
      });
      cursor++;
      continue;
    }

    if (isBlank(char)) {
      cursor++;
      continue;
    }

    if (isNumber(char)) {
      // 数字可以是多位的
      let value = char;
      while (isNumber(input[++cursor])) {
        value += input[cursor];
      }
      tokens.push({
        type: 'number',
        value: parseInt(value, 10),
      });
      continue;
    }

    if (isQuote(char)) {
      // 字符串的起始
      let value = '';
      while (!isQuote(input[++cursor])) {
        value += input[cursor];
      }
      cursor ++;
      tokens.push({
        type: 'string',
        value,
      });
      continue;
    }

    if (isName(char)) {
      // name可以多位
      let value = char;
      while (isName(input[++cursor])) {
        value += input[cursor];
      }
      tokens.push({
        type: 'name',
        value,
      });
      continue;
    }
    throw new Error(`not support currently: ${char}`);
  }
  return tokens;
}
