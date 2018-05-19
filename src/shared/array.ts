export function create2DArray(rows: number): any[][] {
  const arr = []

  for (let i = 0; i < rows; i++) {
    arr[i] = []
  }

  return arr
}
