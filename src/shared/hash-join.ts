export const hashJoin = (...params: any[]) => {
  let result = ''

  params.forEach((item, index) => {
    if (index === params.length - 1) {
      result += item
    } else {
      result += `${item}_`
    }
  })

  return result
}
