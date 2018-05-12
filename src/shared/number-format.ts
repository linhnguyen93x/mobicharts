export const formatCurrency = (raw : number | null) => {
  if (raw === null) {
    return null
  }

  const parts = raw
    .toString()
    .split('.')

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return parts.join('.')
}
