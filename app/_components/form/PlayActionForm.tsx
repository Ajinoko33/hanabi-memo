import { ALL_CARD_INDEX, CARDS } from '@/constants'
import z from '@/lib/zod'
import { Action, CardIndex, PlayAction } from '@/types'
import { generateKey } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Radio } from 'antd'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SubmitButton } from './SubmitButton'

interface PlayValues {
  target: CardIndex
}

const schema = z.object({
  target: z.literal(ALL_CARD_INDEX),
})

const createPlayAction = (data: PlayValues): PlayAction => {
  return {
    key: generateKey(),
    type: 'play',
    target: data.target,
  }
}

interface PlayActionFormProps {
  addAction: (action: Action) => void
}

export const PlayActionForm: FC<PlayActionFormProps> = (props) => {
  const { addAction } = props

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<PlayValues>({
    defaultValues: {},
    resolver: zodResolver(schema),
  })

  const onSubmit = handleSubmit((data) => {
    addAction(createPlayAction(data))
    reset()
  })

  return (
    <form
      className='flex flex-col space-y-6 items-center'
      onSubmit={onSubmit}
    >
      <div className='flex flex-col items-center space-y-2'>
        <div>
          <Controller
            control={control}
            name='target'
            render={({ field }) => (
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
            )}
          />
        </div>
        <div className='font-bold'>を プレイ</div>
      </div>

      <SubmitButton disabled={!isValid} />
    </form>
  )
}
