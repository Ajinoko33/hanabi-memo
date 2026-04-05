import { COLORS } from '@/constants'
import { RowValues } from '@/hooks/useCountMatrix'
import { CardNumber, Color } from '@/types'
import { FC, Fragment } from 'react'
import { Cell } from './Cell'

const CardNumbers = [1, 2, 3, 4, 5] satisfies CardNumber[]

interface ColorRowProps {
  color: Color
  values: RowValues
  forward: (color: Color, cardNumber: CardNumber, index: number) => void
}

export const ColorRow: FC<ColorRowProps> = (props) => {
  const { color, values, forward } = props

  return (
    <>
      <div className='col-start-1 col-end-3 border-r border-b flex items-center justify-center font-semibold py-1'>
        <span className={COLORS[color].style}>{COLORS[color].label}</span>
      </div>
      {CardNumbers.map((number) => {
        const [v1, v2, v3] = values[number]
        return (
          <Fragment key={number}>
            <Cell
              onClick={() => forward(color, number, 0)}
              value={v1}
            />
            {v2 !== undefined && (
              <Cell
                onClick={() => forward(color, number, 1)}
                value={v2}
              />
            )}
            {v3 !== undefined && (
              <Cell
                onClick={() => forward(color, number, 2)}
                value={v3}
              />
            )}
          </Fragment>
        )
      })}
    </>
  )
}
