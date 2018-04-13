export const startLoading = (id: any, text: string, hideSpinner?: boolean) => {
  return {
    type: 'START_LOADING',
    id,
    text,
    hideSpinner: hideSpinner ? true : false
  }
}

export const endLoading = (id?: any) => {
  return {
    type: 'END_LOADING',
    id
  }
}
