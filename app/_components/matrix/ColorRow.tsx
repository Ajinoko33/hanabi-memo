import { COLORS } from '@/constants'
import { CardNumber, Color } from '@/types'
import { FC, Fragment } from 'react'
import { Cell } from './Cell'

export type RowValues = {
  [K in CardNumber]: K extends 1
    ? [boolean, boolean, boolean]
    : K extends 5
      ? [boolean]
      : [boolean, boolean]
}

const CardNumbers = [1, 2, 3, 4, 5] satisfies CardNumber[]

interface ColorRowProps {
  color: Color
  values: RowValues
}

export const ColorRow: FC<ColorRowProps> = (props) => {
  const { color, values } = props

  return (
    <>
      <div className='col-start-1 col-end-3 border-r border-b flex items-center justify-center font-semibold py-1'>
        <span className={COLORS[color].style}>{COLORS[color].label}</span>
      </div>
      {CardNumbers.map((number) => {
        const [v1, v2, v3] = values[number]
        return (
          <Fragment key={number}>
            <Cell checked={v1} />
            {v2 !== undefined && <Cell checked={v2} />}
            {v3 !== undefined && <Cell checked={v3} />}
          </Fragment>
        )
      })}
    </>
  )
}
