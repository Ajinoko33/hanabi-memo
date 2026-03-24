import { ALL_CARD_INDEX } from '@/constants'
import { Action, CardIndex, KnowledgeAction, RemovalAction } from '@/types'
import { InfoCircleOutlined, ToTopOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Segmented } from 'antd'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { KnowledgeActionFormContent } from './KnowledgeActionFormContent'
import { RemovalActionFormContent } from './RemovalActionFormContent'

export interface KnowledgeValues {
  targets: CardIndex[]
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
export interface RemovalValues {
  target: CardIndex
}

const removalSchema = z.object({
  target: z.literal(ALL_CARD_INDEX, '不正な値です。'),
})

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
  const removalForm = useForm<RemovalValues>({
    defaultValues: {
      target: 1,
    },
    resolver: zodResolver(removalSchema),
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
    (selectedSegment === 'removal' &&
      removalForm.handleSubmit(onSubmitRemoval)) ||
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
          <KnowledgeActionFormContent control={knowledgeControl} />
        )}
        {selectedSegment === 'removal' && (
          <RemovalActionFormContent control={removalForm.control} />
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
