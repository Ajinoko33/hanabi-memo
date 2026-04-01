import { Color } from '@/types'
import { FC } from 'react'
import { ColorRow, RowValues } from './ColorRow'

const colors = [
  'red',
  'blue',
  'yellow',
  'green',
  'white',
] as const satisfies Color[]

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CountMatrixProps {}

export const CountMatrix: FC<CountMatrixProps> = (props) => {
  const {} = props

  const values: Record<Color, RowValues> = {
    red: {
      1: [true, false, false],
      2: [true, false],
      3: [false, true],
      4: [true, true],
      5: [false],
    },
    blue: {
      1: [true, false, false],
      2: [true, false],
      3: [false, true],
      4: [true, true],
      5: [false],
    },
    yellow: {
      1: [true, false, false],
      2: [true, false],
      3: [false, true],
      4: [true, true],
      5: [false],
    },
    green: {
      1: [true, false, false],
      2: [true, false],
      3: [false, true],
      4: [true, true],
      5: [false],
    },
    white: {
      1: [true, false, false],
      2: [true, false],
      3: [false, true],
      4: [true, true],
      5: [false],
    },
  }

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
            />
          )
        })}
      </div>
    </div>
  )
}
