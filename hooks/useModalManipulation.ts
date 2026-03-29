import { useCallback, useState } from 'react'

export const useModalManipulation = (onOk: () => void) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleOk = useCallback(() => {
    onOk()
    close()
  }, [onOk, close])

  const handleCancel = useCallback(() => {
    close()
  }, [close])

  return { isOpen, open, handleOk, handleCancel } as const
}
