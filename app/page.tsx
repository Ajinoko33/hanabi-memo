'use client'

import { CARDS } from '@/constants'
import { useCountMatrix } from '@/hooks/useCountMatrix'
import { useModalManipulation } from '@/hooks/useModalManipulation'
import {
  DeleteOutlined,
  FormOutlined,
  LeftOutlined,
  RightOutlined,
  TableOutlined,
} from '@ant-design/icons'
import { Button, Col, Divider, Modal, Row } from 'antd'
import { useCallback, useState } from 'react'
import { ActionRow } from './_components/ActionRow'
import { Crab } from './_components/Crab'
import { ActionForm } from './_components/form-v1/ActionForm'
import { CountMatrix } from './_components/matrix/CountMatrix'
import { useActionLog } from './_hooks/useActionLog'
import { useCheckIsStale } from './_hooks/useCheckIsStale'

const titles = [CARDS[1], CARDS[2], CARDS[3], CARDS[4], CARDS[5]].map(
  (card) => card.label,
)

export default function Home() {
  const {
    logs,
    add,
    undo,
    redo,
    hasPrev,
    hasNext,
    clear: clearLog,
  } = useActionLog()
  const isStale = useCheckIsStale(logs)
  const [currentKey, setCurrentKey] = useState<'form' | 'matrix'>('form')
  const { values, forward, clear: clearMatrix } = useCountMatrix()

  const onOk = useCallback(() => {
    clearLog()
    clearMatrix()
  }, [clearLog, clearMatrix])

  const { isOpen, open, handleOk, handleCancel } = useModalManipulation(onOk)

  return (
    <main className='flex flex-col items-center flex-1 pt-4 pl-4 pr-4 pb-8 bg-white'>
      <div className='w-96'>
        {/* title */}
        <div className='w-full sticky top-0 bg-white z-10'>
          <Row className='w-full border-r'>
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
        </div>

        {/* content */}
        {logs.map((action) => {
          return (
            <ActionRow
              key={action.key}
              action={action}
              isStale={isStale}
            />
          )
        })}
      </div>

      <Divider style={{ borderColor: '#ccc' }} />

      {currentKey === 'form' && <ActionForm addAction={add} />}
      {currentKey === 'matrix' && (
        <CountMatrix
          values={values}
          forward={forward}
        />
      )}

      <div className='w-full overflow-hidden relative'>
        <Divider style={{ borderColor: '#ccc' }} />
        <Crab type='to-right-1' />
        <Crab type='to-right-2' />
        <Crab type='to-right-3' />
        <Crab type='to-left-1' />
      </div>

      <div className='flex space-x-8'>
        <Button
          shape='circle'
          size='large'
          icon={currentKey === 'form' ? <TableOutlined /> : <FormOutlined />}
          onClick={() =>
            setCurrentKey((prev) => (prev === 'form' ? 'matrix' : 'form'))
          }
        />
        <Button
          shape='circle'
          size='large'
          icon={<LeftOutlined />}
          onClick={undo}
          disabled={!hasPrev}
        />
        <Button
          shape='circle'
          size='large'
          icon={<RightOutlined />}
          onClick={redo}
          disabled={!hasNext}
        />
        <Button
          shape='circle'
          size='large'
          icon={<DeleteOutlined style={{ color: 'red' }} />}
          onClick={open}
        />
        <Modal
          title='完全に削除しますか？🥺'
          open={isOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText='削除する'
          okButtonProps={{
            danger: true,
            type: 'default',
          }}
          cancelText='やめとく'
        >
          この操作は取り消せません。
        </Modal>
      </div>
    </main>
  )
}
