export function isParenthesis(char: string) {
  return char === '(' || char === ')';
}

export function isBlank(char: string) {
  return /\s/.test(char);
}

export function isNumber(char: string) {
  return /\d/.test(char);
}

export function isQuote(char: string) {
  return char === '"';
}

export function isName(char: string) {
  return char && /[a-z]/i.test(char);
}
