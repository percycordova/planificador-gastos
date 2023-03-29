export const formatAmount = (amount: string) => {
  return Number(amount).toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN',
  })
}

export const generateId = (): string => {
  const random = Math.random().toString(36).substring(2, 11)
  const date = Date.now().toString(36)
  return random + date
}

export const firstCapitalLetter = (word: string): string => {
  if (word) {
    return word[0].toUpperCase() + word.substring(1)
  }
  return word
}

export const formatDate = (date: any): string => {
  const newDate = new Date(date)
  newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset())
  return newDate.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })
}
