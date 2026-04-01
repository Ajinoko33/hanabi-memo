import { CardNumber, Color } from '@/types'
import { useCallback, useState } from 'react'

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
  const [values, setValues] = useState<Record<Color, RowValues>>(defaultValues)

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
    [],
  )

  return [values, flip] as const
}
