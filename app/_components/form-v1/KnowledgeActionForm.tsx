import { ALL_CARD_INDEX, CARDS, COLORS, NUMBERS } from '@/constants'
import z from '@/lib/zod'
import { Action, CardIndex, KnowledgeAction } from '@/types'
import { generateKey } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox, Radio } from 'antd'
import clsx from 'clsx'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SubmitButton } from './SubmitButton'

const allKnowledgeOptions = [
  'number-1',
  'number-2',
  'number-3',
  'number-4',
  'number-5',
  'color-red',
  'color-blue',
  'color-yellow',
  'color-green',
  'color-white',
] as const
type KnowledgeOption = (typeof allKnowledgeOptions)[number]

interface KnowledgeValues {
  targets: CardIndex[]
  knowledge: KnowledgeOption
}

const schema = z.object({
  targets: z.array(z.literal(ALL_CARD_INDEX)).min(1).max(5),
  knowledge: z.literal(allKnowledgeOptions),
})

const createKnowledgeAction = (data: KnowledgeValues): KnowledgeAction => {
  const base: Pick<KnowledgeAction, 'key' | 'targets'> = {
    key: generateKey(),
    targets: data.targets,
  }
  switch (data.knowledge) {
    case 'number-1':
      return {
        ...base,
        type: 'number',
        number: 1,
      }
    case 'number-2':
      return {
        ...base,
        type: 'number',
        number: 2,
      }
    case 'number-3':
      return {
        ...base,
        type: 'number',
        number: 3,
      }
    case 'number-4':
      return {
        ...base,
        type: 'number',
        number: 4,
      }
    case 'number-5':
      return {
        ...base,
        type: 'number',
        number: 5,
      }
    case 'color-red':
      return {
        ...base,
        type: 'color',
        color: 'red',
      }
    case 'color-blue':
      return {
        ...base,
        type: 'color',
        color: 'blue',
      }
    case 'color-yellow':
      return {
        ...base,
        type: 'color',
        color: 'yellow',
      }
    case 'color-green':
      return {
        ...base,
        type: 'color',
        color: 'green',
      }
    case 'color-white':
      return {
        ...base,
        type: 'color',
        color: 'white',
      }
  }
}

interface KnowledgeActionFormProps {
  addAction: (action: Action) => void
}

export const KnowledgeActionForm: FC<KnowledgeActionFormProps> = (props) => {
  const { addAction } = props

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<KnowledgeValues>({
    defaultValues: {
      targets: [],
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = handleSubmit((data) => {
    addAction(createKnowledgeAction(data))
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
            name='targets'
            render={({ field }) => (
              <Checkbox.Group<CardIndex>
                value={field.value}
                options={([1, 2, 3, 4, 5] satisfies CardIndex[]).map(
                  (value) => ({
                    value,
                    label: CARDS[value].label,
                  }),
                )}
                onChange={(checkedValue) => field.onChange(checkedValue)}
              />
            )}
          />
        </div>
        <div className='font-bold'>だけ</div>
        <div>
          <Controller
            control={control}
            name='knowledge'
            render={({ field }) => (
              <Radio.Group
                optionType='default'
                className='space-y-1'
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              >
                <div className='flex justify-center'>
                  <Radio.Button value='number-1'>
                    {NUMBERS[1].label}
                  </Radio.Button>
                  <Radio.Button value='number-2'>
                    {NUMBERS[2].label}
                  </Radio.Button>
                  <Radio.Button value='number-3'>
                    {NUMBERS[3].label}
                  </Radio.Button>
                  <Radio.Button value='number-4'>
                    {NUMBERS[4].label}
                  </Radio.Button>
                  <Radio.Button value='number-5'>
                    {NUMBERS[5].label}
                  </Radio.Button>
                </div>
                <div className='flex justify-center'>
                  <Radio.Button value='color-red'>
                    <div className={clsx('font-semibold', COLORS.red.style)}>
                      {COLORS.red.label}
                    </div>
                  </Radio.Button>
                  <Radio.Button value='color-blue'>
                    <div className={clsx('font-semibold', COLORS.blue.style)}>
                      {COLORS.blue.label}
                    </div>
                  </Radio.Button>
                  <Radio.Button value='color-yellow'>
                    <div className={clsx('font-semibold', COLORS.yellow.style)}>
                      {COLORS.yellow.label}
                    </div>
                  </Radio.Button>
                  <Radio.Button value='color-green'>
                    <div className={clsx('font-semibold', COLORS.green.style)}>
                      {COLORS.green.label}
                    </div>
                  </Radio.Button>
                  <Radio.Button value='color-white'>
                    <div className={clsx('font-semibold', COLORS.white.style)}>
                      {COLORS.white.label}
                    </div>
                  </Radio.Button>
                </div>
              </Radio.Group>
            )}
          />
        </div>
      </div>

      <SubmitButton disabled={!isValid} />
    </form>
  )
}
