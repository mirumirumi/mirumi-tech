export const today = () => {
  return new Date().toISOString()
}

export const round = (value: number, base = 6): number => {
  return Math.round(value * (10**base)) / (10**base)
}

export const delay = (msec: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, msec)
  })
}

export const toBool = (data: string): boolean => {
  return data.toLowerCase() === "true"
}

export const zeroPadding = (input: number, precision: number): string => {
	return (Array(precision).join("0") + input).slice(-precision)
}

export const friendlyDatetime = (isoformat: string): string => {
  const date = new Date(isoformat)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}
