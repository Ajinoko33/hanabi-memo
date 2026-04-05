import { CardNumber, Color } from '@/types'
import { useCallback } from 'react'
import { useLocalStorageSyncState } from './useLocalStorageSyncState'

export type ColValue = 0 | 1 | 2

export type RowValues = {
  [K in CardNumber]: K extends 1
    ? [ColValue, ColValue, ColValue]
    : K extends 5
      ? [ColValue]
      : [ColValue, ColValue]
}

const defaultRowValue: RowValues = {
  1: [0, 0, 0],
  2: [0, 0],
  3: [0, 0],
  4: [0, 0],
  5: [0],
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

  const forward = useCallback(
    (color: Color, cardNumber: CardNumber, index: number) => {
      setValues((prev) => {
        const newValues = { ...prev }
        const newRowValues = [...newValues[color][cardNumber]]
        newRowValues[index] = ((newRowValues[index] + 1) % 3) as ColValue
        newValues[color] = { ...newValues[color], [cardNumber]: newRowValues }
        return newValues
      })
    },
    [setValues],
  )

  const clear = useCallback(() => {
    setValues(defaultValues)
  }, [setValues])

  return { values, forward, clear } as const
}
