import tokenizer from '../src/tokenizer';

test('tokenizer could do string lexical analysis', () => {
  expect(tokenizer('(add 2 (subtract 4 2))')).toEqual([{
    type: 'parenthesis',
    value: '(',
  }, {
    type: 'name',
    value: 'add',
  }, {
    type: 'number',
    value: 2,
  }, {
    type: 'parenthesis',
    value: '(',
  }, {
    type: 'name',
    value: 'subtract',
  }, {
    type: 'number',
    value: 4,
  }, {
    type: 'number',
    value: 2,
  }, {
    type: 'parenthesis',
    value: ')',
  }, {
    type: 'parenthesis',
    value: ')',
  }]);
});

test('tokenizer handle multi lines code', () => {
  const input = `(
  add(2 3)
  subtract(4 multiply(2 3))
  )`;
  console.log(tokenizer(input));
});
