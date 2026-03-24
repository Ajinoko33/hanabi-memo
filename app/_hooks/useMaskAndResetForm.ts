import { useState } from 'react'

export const useMaskAndReset = (duration: number) => {
  const [isMask, setIsMask] = useState<boolean>(false)

  const mask = (onFinish?: () => void) => {
    setIsMask(true)

    setTimeout(() => {
      setIsMask(false)
      onFinish?.()
    }, duration)
  }

  return [isMask, mask] as const
}
