import { CARDS } from '@/constants'
import { CardIndex } from '@/types'
import { Radio } from 'antd'
import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { RemovalValues } from './ActionForm'

interface RemovalActionFormContentProps {
  control: Control<RemovalValues>
}

export const RemovalActionFormContent: FC<RemovalActionFormContentProps> = (
  props,
) => {
  const { control } = props

  return (
    <div className='flex flex-col items-center space-y-2'>
      <div>
        <Controller
          control={control}
          name='target'
          render={({ field }) => {
            return (
              <Radio.Group
                value={field.value}
                options={([1, 2, 3, 4, 5] satisfies CardIndex[]).map(
                  (value) => ({
                    value,
                    label: CARDS[value].label,
                  }),
                )}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )
          }}
        />
      </div>
      <div className='font-bold'>を プレイ・捨てる</div>
    </div>
  )
}
