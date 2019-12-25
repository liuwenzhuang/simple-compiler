import tokenizer from './tokenizer';
import parser from './parser';
import transformer from './transformer';
import generator from './generator';

export default function compiler(input: string) {
  const tokens = tokenizer(input);
  const originalAst = parser(tokens as any);
  const newAst = transformer(originalAst);
  const output = generator(newAst);

  return output;
}
