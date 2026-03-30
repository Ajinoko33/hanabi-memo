import { Action } from '@/types'
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Segmented } from 'antd'
import { FC, useState } from 'react'
import { KnowledgeActionForm } from './KnowledgeActionForm'
import { PlayActionForm } from './PlayActionForm'
import { RemovalActionForm } from './RemovalActionForm'

interface ActionFormProps {
  addAction: (action: Action) => void
}

export const ActionForm: FC<ActionFormProps> = (props) => {
  const { addAction } = props
  const [selectedSegment, setSelectedSegment] = useState<
    'knowledge' | 'play' | 'removal'
  >('knowledge')

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
              label: 'プレイ',
              value: 'play',
              icon: <CheckCircleOutlined />,
            },
            {
              label: '捨てる',
              value: 'removal',
              icon: <StopOutlined />,
            },
          ]}
          shape='round'
          value={selectedSegment}
          onChange={setSelectedSegment}
        />
      </div>

      {selectedSegment === 'knowledge' && (
        <KnowledgeActionForm addAction={addAction} />
      )}
      {selectedSegment === 'play' && <PlayActionForm addAction={addAction} />}
      {selectedSegment === 'removal' && (
        <RemovalActionForm addAction={addAction} />
      )}
    </div>
  )
}
