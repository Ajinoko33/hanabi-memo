'use client'

import { CARDS } from '@/constants'
import { useModalManipulation } from '@/hooks/useModalManipulation'
import { DeleteOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Modal, Row } from 'antd'
import { ActionRow } from './_components/ActionRow'
import { ActionForm } from './_components/form/ActionForm'
import { useActionLog } from './_hooks/useActionLog'
import { useCheckIsStale } from './_hooks/useCheckIstale'

const titles = [CARDS[1], CARDS[2], CARDS[3], CARDS[4], CARDS[5]].map(
  (card) => card.label,
)

export default function Home() {
  const { logs, add, undo, redo, hasPrev, hasNext, clear } = useActionLog()
  const isStale = useCheckIsStale(logs)
  const { isOpen, open, handleOk, handleCancel } = useModalManipulation(clear)

  return (
    <main className='flex flex-col items-center flex-1 px-4 pb-4 bg-white'>
      <div className='w-96'>
        {/* title */}
        <div className='w-full sticky top-0 pt-4 bg-white z-10'>
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
