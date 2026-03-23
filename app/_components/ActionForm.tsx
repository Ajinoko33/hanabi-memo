import { CardLabel, ColorName, ColorStyle } from '@/constants'
import {
  Action,
  CardIndex,
  KnowledgeAction,
  Number,
  RemovalAction,
} from '@/types'
import { InfoCircleOutlined, ToTopOutlined } from '@ant-design/icons'
import { Button, Checkbox, Radio, Segmented } from 'antd'
import clsx from 'clsx'
import { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

interface KnowledgeValues {
  targets: Number[]
  knowledge:
    | 'number-1'
    | 'number-2'
    | 'number-3'
    | 'number-4'
    | 'number-5'
    | 'color-red'
    | 'color-blue'
    | 'color-yellow'
    | 'color-green'
    | 'color-white'
}
interface RemovalValues {
  target: Number
}

const generateKey = () => String(Math.floor(Math.random() * 100000))
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

const createRemovalAction = (data: RemovalValues): RemovalAction => {
  return {
    key: generateKey(),
    type: 'removal',
    target: data.target,
  }
}

interface ActionFormProps {
  addAction: (action: Action) => void
}

export const ActionForm: FC<ActionFormProps> = (props) => {
  const { addAction } = props
  const [selectedSegment, setSelectedSegment] = useState<
    'knowledge' | 'removal'
  >('knowledge')

  // Form State
  const { handleSubmit: handleSubmitKnowledge, control: knowledgeControl } =
    useForm<KnowledgeValues>({
      defaultValues: {
        knowledge: 'number-1',
      },
    })
  const { handleSubmit: handleSubmitRemoval, control: removalControl } =
    useForm<RemovalValues>({
      defaultValues: {
        target: 1,
      },
    })

  const onSubmitKnowledge: SubmitHandler<KnowledgeValues> = (data) => {
    addAction(createKnowledgeAction(data))
  }
  const onSubmitRemoval: SubmitHandler<RemovalValues> = (data) => {
    addAction(createRemovalAction(data))
  }

  const onSubmit =
    (selectedSegment === 'knowledge' &&
      handleSubmitKnowledge(onSubmitKnowledge)) ||
    (selectedSegment === 'removal' && handleSubmitRemoval(onSubmitRemoval)) ||
    undefined

  return (
    <div className='flex flex-col items-stretch space-y-6'>
      <div className='self-center'>
        <Segmented
          options={[
            {
              label: '情報',
              value: 'knowledge',
              icon: <InfoCircleOutlined />,
            },
            {
              label: 'プレイ・捨てる',
              value: 'removal',
              icon: <ToTopOutlined />,
            },
          ]}
          shape='round'
          value={selectedSegment}
          onChange={setSelectedSegment}
        />
      </div>

      <form
        className='flex flex-col space-y-6 items-center'
        onSubmit={onSubmit}
      >
        {selectedSegment === 'knowledge' && (
          <div className='flex flex-col items-center space-y-2'>
            <div>
              <Controller
                control={knowledgeControl}
                name='targets'
                render={({ field }) => (
                  <Checkbox.Group<CardIndex>
                    value={field.value}
                    options={([1, 2, 3, 4, 5] satisfies CardIndex[]).map(
                      (value) => ({
                        value,
                        label: CardLabel[value],
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
                control={knowledgeControl}
                name='knowledge'
                render={({ field }) => (
                  <Radio.Group
                    optionType='default'
                    className='space-y-1'
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <div className='flex'>
                      <Radio.Button value='number-1'>1</Radio.Button>
                      <Radio.Button value='number-2'>2</Radio.Button>
                      <Radio.Button value='number-3'>3</Radio.Button>
                      <Radio.Button value='number-4'>4</Radio.Button>
                      <Radio.Button value='number-5'>5</Radio.Button>
                    </div>
                    <div className='flex'>
                      <Radio.Button value='color-red'>
                        <div
                          className={clsx('font-semibold', ColorStyle['red'])}
                        >
                          {ColorName['red']}
                        </div>
                      </Radio.Button>
                      <Radio.Button value='color-blue'>
                        <div
                          className={clsx('font-semibold', ColorStyle['blue'])}
                        >
                          {ColorName['blue']}
                        </div>
                      </Radio.Button>
                      <Radio.Button value='color-yellow'>
                        <div
                          className={clsx(
                            'font-semibold',
                            ColorStyle['yellow'],
                          )}
                        >
                          {ColorName['yellow']}
                        </div>
                      </Radio.Button>
                      <Radio.Button value='color-green'>
                        <div
                          className={clsx('font-semibold', ColorStyle['green'])}
                        >
                          {ColorName['green']}
                        </div>
                      </Radio.Button>
                      <Radio.Button value='color-white'>
                        <div
                          className={clsx('font-semibold', ColorStyle['white'])}
                        >
                          {ColorName['white']}
                        </div>
                      </Radio.Button>
                    </div>
                  </Radio.Group>
                )}
              />
            </div>
          </div>
        )}
        {selectedSegment === 'removal' && (
          <div className='flex flex-col items-center space-y-2'>
            <div>
              <Controller
                control={removalControl}
                name='target'
                render={({ field }) => {
                  return (
                    <Radio.Group
                      value={field.value}
                      options={([1, 2, 3, 4, 5] satisfies CardIndex[]).map(
                        (value) => ({
                          value,
                          label: CardLabel[value],
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
        )}

        <Button
          type='primary'
          htmlType='submit'
        >
          登録
        </Button>
      </form>
    </div>
  )
}
