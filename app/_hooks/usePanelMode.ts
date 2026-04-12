import { useCallback, useState } from 'react'

type PanelMode = 'form' | 'matrix'
type FormVersion = '1' | '2'

export const usePanelMode = () => {
  const [currentMode, setCurrentMode] = useState<PanelMode>('form')
  const [formVersion, setFormVersion] = useState<FormVersion>('1')

  const toggleMode = useCallback(() => {
    setCurrentMode((prev) => {
      if (prev === 'form') {
        return 'matrix'
      }
      return 'form'
    })
  }, [])

  const toggleFormVersion = useCallback(() => {
    setFormVersion((prev) => {
      if (prev === '1') {
        return '2'
      }
      return '1'
    })
  }, [])

  return {
    currentMode,
    toggleMode,
    formVersion,
    toggleFormVersion,
  } as const
}
