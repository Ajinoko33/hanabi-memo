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

export interface BaseKnowledgeAction {
  key: string
  targets: CardIndex[]
}
export interface ColorAction extends BaseKnowledgeAction {
  type: 'color'
  color: Color
}
export interface NumberAction extends BaseKnowledgeAction {
  type: 'number'
  number: Number
}
export interface RemovalAction {
  key: string
  type: 'removal'
  target: CardIndex
}
export type KnowledgeAction = ColorAction | NumberAction
export type Action = KnowledgeAction | RemovalAction

export default function Home() {
  const [actions, setActions] = useState<Action[]>([])

  const addAction = (action: Action) => {
    setActions((pre) => [...pre, action])
  }

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

      <ActionForm addAction={addAction} />
    </main>
  )
}
