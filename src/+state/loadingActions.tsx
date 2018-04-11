export const startLoading = (id: any, text: string) => {
  return {
    type: 'START_LOADING',
    id,
    text
  }
}

export const endLoading = (id?: any) => {
  return {
    type: 'END_LOADING',
    id
  }
}
