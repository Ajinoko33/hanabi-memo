'use client'

import { CARDS } from '@/constants'
import { useModalManipulation } from '@/hooks/useModalManipulation'
import { DeleteOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Modal, Row } from 'antd'
import { ActionRow } from './_components/ActionRow'
import { ActionForm } from './_components/form/ActionForm'
import { useActionLog } from './_hooks/useActionLog'

const titles = [CARDS[1], CARDS[2], CARDS[3], CARDS[4], CARDS[5]].map(
  (card) => card.label,
)

export default function Home() {
  const { logs, add, undo, redo, hasPrev, hasNext, clear } = useActionLog()
  const { isOpen, open, handleOk, handleCancel } = useModalManipulation(clear)

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
        {logs.map((action) => {
          return (
            <ActionRow
              key={action.key}
              action={action}
            />
          )
        })}
      </div>

      <Divider style={{ borderColor: '#ccc' }} />

      <ActionForm addAction={add} />

      <Divider style={{ borderColor: '#ccc' }} />

      <div className='flex space-x-8'>
        <Button
          shape='circle'
          icon={<LeftOutlined />}
          onClick={undo}
          disabled={!hasPrev}
        />
        <Button
          shape='circle'
          icon={<RightOutlined />}
          onClick={redo}
          disabled={!hasNext}
        />
        <Button
          shape='circle'
          icon={<DeleteOutlined style={{ color: 'red' }} />}
          onClick={open}
        />
        <Modal
          title='完全に削除しますか？🥺'
          open={isOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText='削除する'
          cancelText='やめとく'
        >
          この操作は取り消せません。
        </Modal>
      </div>
    </main>
  )
}
