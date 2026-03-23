'use client'

import { Button, Checkbox, Col, Divider, Radio, Row } from 'antd'
import { useState } from 'react'
import { ActionRow } from './_components/ActionRow'
import {
  InfoCircleOutlined,
  InfoCircleTwoTone,
  ToTopOutlined,
} from '@ant-design/icons'
import { CardIndex, Color, Number } from '@/types'
import clsx from 'clsx'
import { ColorName, ColorStyle } from '@/constants'

const titles = ['①', '②', '③', '④', '⑤']

export interface ColorAction {
  key: string
  type: 'color'
  color: Color
  targets: CardIndex[]
}
export interface NumberAction {
  key: string
  type: 'number'
  number: Number
  targets: CardIndex[]
}
export interface RemoveAction {
  key: string
  type: 'remove'
  index: CardIndex
}
export type Action = ColorAction | NumberAction | RemoveAction

export default function Home() {
  const [actions, setActions] = useState<Action[]>([
    {
      key: '1',
      type: 'color',
      color: 'red',
      targets: [1, 2],
    },
    {
      key: '2',
      type: 'color',
      color: 'blue',
      targets: [1, 2],
    },
    {
      key: '3',
      type: 'color',
      color: 'yellow',
      targets: [1, 2],
    },
    {
      key: '4',
      type: 'color',
      color: 'green',
      targets: [1, 2],
    },
    {
      key: '5',
      type: 'color',
      color: 'white',
      targets: [1, 2],
    },
    {
      key: '6',
      type: 'number',
      number: 2,
      targets: [3, 4],
    },
    {
      key: '7',
      type: 'remove',
      index: 5,
    },
  ])

  return (
    <main className='flex flex-col items-center flex-1 p-4 bg-white'>
      <div className='w-96 border-r'>
        {/* title */}
        <Row className='w-full'>
          {titles.map((value) => {
            return (
              <Col
                key={value}
                flex={1}
                className='border-t border-b-2 border-l'
              >
                <div className='flex justify-center'>{value}</div>
              </Col>
            )
          })}
        </Row>

        {/* content */}
        {actions.map((action) => {
          return (
            <ActionRow
              key={action.key}
              action={action}
            />
          )
        })}
      </div>

      <Divider style={{ borderColor: '#ccc' }} />

      <div className='w-full max-w-96 p-2 border flex flex-col items-stretch'>
        <div className='flex flex-col items-stretch space-y-2'>
          <div className='border rounded-md px-2 flex items-center space-x-1 self-start'>
            {/* <InfoCircleOutlined /> */}
            <InfoCircleTwoTone />
            <div>情報</div>
          </div>
          <div className='flex flex-col space-y-2 items-stretch'>
            <div className='flex flex-col items-center space-y-2'>
              <div className=''>
                <Checkbox.Group options={titles} />
              </div>
              <div className='font-bold'>だけ</div>
              <div className=''>
                <Radio.Group optionType='default'>
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
                      <div
                        className={clsx('font-semibold', ColorStyle['blue'])}
                      >
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
                      <div
                        className={clsx('font-semibold', ColorStyle['green'])}
                      >
                        {ColorName['green']}
                      </div>
                    </Radio.Button>
                    <Radio.Button value='white'>
                      <div
                        className={clsx('font-semibold', ColorStyle['white'])}
                      >
                        {ColorName['white']}
                      </div>
                    </Radio.Button>
                  </div>
                </Radio.Group>
              </div>
            </div>
            <div className='self-end'>
              <Button type='primary'>登録</Button>
            </div>
          </div>
        </div>
        <Divider style={{ borderColor: '#ccc' }} />
        <div className='flex flex-col items-stretch space-y-2'>
          <div className='border rounded-md px-2 flex items-center space-x-1 self-start'>
            <ToTopOutlined />
            <div>プレイ・捨てる</div>
          </div>
          <div className='flex flex-col space-y-2 items-stretch'>
            <div className='flex flex-col items-center space-y-2'>
              <div className=''>
                <Checkbox.Group options={titles} />
              </div>
              <div className='font-bold'>を プレイ・捨てる</div>
            </div>
            <div className='self-end'>
              <Button type='primary'>登録</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
