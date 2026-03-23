'use client'

import { CardLabel } from '@/constants'
import { CardIndex, Color, Number } from '@/types'
import { Col, Divider, Row } from 'antd'
import { useState } from 'react'
import { ActionForm } from './_components/ActionForm'
import { ActionRow } from './_components/ActionRow'

const titles = [
  CardLabel[1],
  CardLabel[2],
  CardLabel[3],
  CardLabel[4],
  CardLabel[5],
]

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

      <ActionForm />
    </main>
  )
}
