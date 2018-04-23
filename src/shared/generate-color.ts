export function getRandomColor() {
  let length = 6
  const chars = '0123456789ABCDEF'
  let hex = '#'
  // tslint:disable-next-line:no-bitwise
  while (length--) { hex += chars[(Math.random() * 16) | 0] }
  return hex
}
