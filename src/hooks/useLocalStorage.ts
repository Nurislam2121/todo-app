import { useEffect, useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  isValid: (value: unknown) => value is T,
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw === null) return initialValue
      const parsed: unknown = JSON.parse(raw)
      return isValid(parsed) ? parsed : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
    }
  }, [key, value])

  return [value, setValue] as const
}
