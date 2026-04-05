import { RowValues } from '@/hooks/useCountMatrix'
import { CardNumber, Color } from '@/types'
import { FC } from 'react'
import { ColorRow } from './ColorRow'

const colors = [
  'red',
  'blue',
  'yellow',
  'green',
  'white',
] as const satisfies Color[]

interface CountMatrixProps {
  values: Record<Color, RowValues>
  forward: (color: Color, cardNumber: CardNumber, index: number) => void
}

export const CountMatrix: FC<CountMatrixProps> = (props) => {
  const { values, forward } = props

  return (
    <div className='w-full'>
      <div className='grid grid-cols-12 border-t border-l'>
        {/* number header */}
        <div className='col-start-1 col-end-3 border-r border-b'></div>
        <div className='col-start-3 col-end-6 border-r border-b flex items-center justify-center'>
          1
        </div>
        <div className='col-start-6 col-end-8 border-r border-b flex items-center justify-center'>
          2
        </div>
        <div className='col-start-8 col-end-10 border-r border-b flex items-center justify-center'>
          3
        </div>
        <div className='col-start-10 col-end-12 border-r border-b flex items-center justify-center'>
          4
        </div>
        <div className='col-start-12 col-end-13 border-r border-b flex items-center justify-center'>
          5
        </div>

        {colors.map((color) => {
          return (
            <ColorRow
              key={color}
              color={color}
              values={values[color]}
              forward={forward}
            />
          )
        })}
      </div>
    </div>
  )
}
