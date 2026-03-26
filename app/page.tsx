'use client'

import { CARDS } from '@/constants'
import { useLocalStorageSyncState } from '@/hooks/useLocalStorageSyncState'
import { Action } from '@/types'
import { Col, Divider, Row } from 'antd'
import { ActionRow } from './_components/ActionRow'
import { ActionForm } from './_components/form/ActionForm'

const titles = [CARDS[1], CARDS[2], CARDS[3], CARDS[4], CARDS[5]].map(
  (card) => card.label,
)

export default function Home() {
  const [actions, setActions] = useLocalStorageSyncState<Action[]>(
    'input-logs',
    [],
  )

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
