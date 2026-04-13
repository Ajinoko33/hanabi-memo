import { ALL_CARD_INDEX, COLORS, NUMBERS } from '@/constants'
import z from '@/lib/zod'
import {
  Action,
  CardIndex,
  KnowledgeAction,
  PlayAction,
  RemovalAction,
} from '@/types'
import { generateKey } from '@/utils'
import {
  BackwardOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Col, Radio, Row } from 'antd'
import clsx from 'clsx'
import { FC } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'

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

interface KnowledgeFormValues {
  type: 'knowledge'
  targets: CardIndex[]
  knowledge: KnowledgeOption
}
interface PlayFormValues {
  type: 'play'
  targets: CardIndex[]
}
interface RemovalFormValues {
  type: 'removal'
  targets: CardIndex[]
}
type FormValues = KnowledgeFormValues | PlayFormValues | RemovalFormValues

const schema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('knowledge'),
    targets: z.array(z.literal(ALL_CARD_INDEX)).min(1).max(5),
    knowledge: z.literal(allKnowledgeOptions),
  }),
  z.object({
    type: z.literal('play'),
    targets: z.array(z.literal(ALL_CARD_INDEX)).length(1),
  }),
  z.object({
    type: z.literal('removal'),
    targets: z.array(z.literal(ALL_CARD_INDEX)).length(1),
  }),
])

const createKnowledgeAction = (data: KnowledgeFormValues): KnowledgeAction => {
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

const createPlayAction = (data: PlayFormValues): PlayAction => {
  return {
    key: generateKey(),
    type: 'play',
    target: data.targets[0],
  }
}

const createRemovalAction = (data: RemovalFormValues): RemovalAction => {
  return {
    key: generateKey(),
    type: 'removal',
    target: data.targets[0],
  }
}

const createAction = (data: FormValues): Action => {
  switch (data.type) {
    case 'knowledge':
      return createKnowledgeAction(data)
    case 'play':
      return createPlayAction(data)
    case 'removal':
      return createRemovalAction(data)
  }
}

interface ActionFormV2Props {
  addAction: (action: Action) => void
}

export const ActionFormV2: FC<ActionFormV2Props> = (props) => {
  const { addAction } = props

  const { control, handleSubmit, reset, setValue } = useForm<FormValues>({
    defaultValues: {
      targets: [],
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = handleSubmit((data) => {
    addAction(createAction(data))
    reset()
  })

  const handleClick = (type: FormValues['type']) => {
    setValue('type', type)
  }

  const values = useWatch({ control })

  return (
    <form
      className='flex flex-col items-stretch space-y-8'
      onSubmit={onSubmit}
    >
      <div className='flex flex-col'>
        <div className='w-96 my-4'>
          <Row className='w-full'>
            {Array.from({ length: 5 }).map((_, index) => {
              return (
                <Col
                  key={index}
                  flex={1}
                >
                  <div className='flex justify-center'>
                    <BackwardOutlined
                      rotate={90}
                      style={{ fontSize: '32px' }}
                    />
                  </div>
                </Col>
              )
            })}
          </Row>
        </div>

        <div className='w-96'>
          <Row className='w-full border-r'>
            <Controller
              control={control}
              name='targets'
              render={({ field }) => (
                <>
                  {ALL_CARD_INDEX.map((value) => {
                    return (
                      <Col
                        key={value}
                        flex={1}
                        className='border-t border-b border-l'
                      >
                        <div className='flex justify-center py-1'>
                          <Checkbox
                            checked={field.value.includes(value)}
                            onChange={(e) => {
                              const checked = e.target.checked
                              if (checked) {
                                field.onChange([...field.value, value])
                              } else {
                                field.onChange(
                                  field.value.filter((v) => v !== value),
                                )
                              }
                            }}
                          />
                        </div>
                      </Col>
                    )
                  })}
                </>
              )}
            />
          </Row>
        </div>
      </div>

      <div className='grid grid-cols-2 divide-dashed'>
        <div className='col-span-2 flex flex-col items-center space-y-6 pb-6 border-b'>
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
                      <div
                        className={clsx('font-semibold', COLORS.yellow.style)}
                      >
                        {COLORS.yellow.label}
                      </div>
                    </Radio.Button>
                    <Radio.Button value='color-green'>
                      <div
                        className={clsx('font-semibold', COLORS.green.style)}
                      >
                        {COLORS.green.label}
                      </div>
                    </Radio.Button>
                    <Radio.Button value='color-white'>
                      <div
                        className={clsx('font-semibold', COLORS.white.style)}
                      >
                        {COLORS.white.label}
                      </div>
                    </Radio.Button>
                  </div>
                </Radio.Group>
              )}
            />
          </div>
          <Button
            type='primary'
            htmlType='submit'
            icon={<InfoCircleOutlined />}
            onClick={() => handleClick('knowledge')}
            disabled={
              !schema.safeParse({
                ...values,
                type: 'knowledge',
              } satisfies Partial<FormValues>).success
            }
          >
            情報を登録
          </Button>
        </div>

        <div className='flex justify-center py-6 border-r'>
          <Button
            type='primary'
            htmlType='submit'
            icon={<CheckCircleOutlined />}
            onClick={() => handleClick('play')}
            disabled={
              !schema.safeParse({
                ...values,
                type: 'play',
              } satisfies Partial<FormValues>).success
            }
          >
            プレイ
          </Button>
        </div>
        <div className='flex justify-center py-6'>
          <Button
            type='primary'
            htmlType='submit'
            icon={<StopOutlined />}
            onClick={() => handleClick('removal')}
            disabled={
              !schema.safeParse({
                ...values,
                type: 'removal',
              } satisfies Partial<FormValues>).success
            }
          >
            捨てる
          </Button>
        </div>
      </div>
    </form>
  )
}
