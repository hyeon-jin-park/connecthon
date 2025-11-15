export function isNumeric(value: string) {
  return /^\d+$/.test(value)
}

export function isPostalCode(value: string) {
  return /^\d{3,10}$/.test(value)
}

export function isCardNumber(value: string) {
  const digits = value.replace(/\s+/g, '')
  return /^\d{13,19}$/.test(digits)
}

export function isExpiry(value: string) {
  return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value)
}

export function isCVC(value: string) {
  return /^\d{3,4}$/.test(value)
}
