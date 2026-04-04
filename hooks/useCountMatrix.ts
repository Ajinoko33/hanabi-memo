import { CardNumber, Color } from '@/types'
import { useCallback } from 'react'
import { useLocalStorageSyncState } from './useLocalStorageSyncState'

export type RowValues = {
  [K in CardNumber]: K extends 1
    ? [boolean, boolean, boolean]
    : K extends 5
      ? [boolean]
      : [boolean, boolean]
}

const defaultRowValue: RowValues = {
  1: [false, false, false],
  2: [false, false],
  3: [false, false],
  4: [false, false],
  5: [false],
}
const defaultValues: Record<Color, RowValues> = {
  red: defaultRowValue,
  blue: defaultRowValue,
  yellow: defaultRowValue,
  green: defaultRowValue,
  white: defaultRowValue,
}

export const useCountMatrix = () => {
  const [values, setValues] = useLocalStorageSyncState<
    Record<Color, RowValues>
  >('countMatrix', defaultValues)

  const flip = useCallback(
    (color: Color, cardNumber: CardNumber, index: number) => {
      setValues((prev) => {
        const newValues = { ...prev }
        const newRowValues = [...newValues[color][cardNumber]]
        newRowValues[index] = !newRowValues[index]
        newValues[color] = { ...newValues[color], [cardNumber]: newRowValues }
        return newValues
      })
    },
    [setValues],
  )

  const clear = useCallback(() => {
    setValues(defaultValues)
  }, [setValues])

  return { values, flip, clear } as const
}
