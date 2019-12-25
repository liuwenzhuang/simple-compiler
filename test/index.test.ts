import compiler from '../src';

test('compiler could convert source code to desired code', () => {
  const input = '(add 2 (subtract 4 2))';
  expect(compiler(input)).toEqual('add(2, subtract(4, 2));');
});
