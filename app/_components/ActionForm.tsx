import { CardLabel, ColorName, ColorStyle } from '@/constants'
import { InfoCircleOutlined, ToTopOutlined } from '@ant-design/icons'
import { Button, Checkbox, Radio, Segmented } from 'antd'
import clsx from 'clsx'
import { FC, useState } from 'react'

interface ActionFormProps {
  dummy?: string
}
export const ActionForm: FC<ActionFormProps> = (props) => {
  const {} = props
  const [formSegment, setFormSegment] = useState<'knowledge' | 'remove'>(
    'knowledge',
  )

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
              value: 'remove',
              icon: <ToTopOutlined />,
            },
          ]}
          shape='round'
          value={formSegment}
          onChange={setFormSegment}
        />
      </div>

      <div className=''>
        {formSegment === 'knowledge' && (
          <div className='flex flex-col items-center space-y-2'>
            <div className=''>
              <Checkbox.Group
                options={[
                  CardLabel[1],
                  CardLabel[2],
                  CardLabel[3],
                  CardLabel[4],
                  CardLabel[5],
                ]}
              />
            </div>
            <div className='font-bold'>だけ</div>
            <div className=''>
              <Radio.Group
                optionType='default'
                className='space-y-1'
              >
                <div className='flex'>
                  <Radio.Button value='1'>1</Radio.Button>
                  <Radio.Button value='2'>2</Radio.Button>
                  <Radio.Button value='3'>3</Radio.Button>
                  <Radio.Button value='4'>4</Radio.Button>
                  <Radio.Button value='5'>5</Radio.Button>
                </div>
                <div className='flex'>
                  <Radio.Button value='red'>
                    <div className={clsx('font-semibold', ColorStyle['red'])}>
                      {ColorName['red']}
                    </div>
                  </Radio.Button>
                  <Radio.Button value='blue'>
                    <div className={clsx('font-semibold', ColorStyle['blue'])}>
                      {ColorName['blue']}
                    </div>
                  </Radio.Button>
                  <Radio.Button value='yellow'>
                    <div
                      className={clsx('font-semibold', ColorStyle['yellow'])}
                    >
                      {ColorName['yellow']}
                    </div>
                  </Radio.Button>
                  <Radio.Button value='green'>
                    <div className={clsx('font-semibold', ColorStyle['green'])}>
                      {ColorName['green']}
                    </div>
                  </Radio.Button>
                  <Radio.Button value='white'>
                    <div className={clsx('font-semibold', ColorStyle['white'])}>
                      {ColorName['white']}
                    </div>
                  </Radio.Button>
                </div>
              </Radio.Group>
            </div>
          </div>
        )}
        {formSegment === 'remove' && (
          <div className='flex flex-col items-center space-y-2'>
            <div className=''>
              <Checkbox.Group
                options={[
                  CardLabel[1],
                  CardLabel[2],
                  CardLabel[3],
                  CardLabel[4],
                  CardLabel[5],
                ]}
              />
            </div>
            <div className='font-bold'>を プレイ・捨てる</div>
          </div>
        )}
      </div>

      <div className='self-center'>
        <Button type='primary'>登録</Button>
      </div>
    </div>
  )
}
