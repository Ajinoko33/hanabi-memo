import { Col } from 'antd'
import clsx from 'clsx'
import { FC, ReactNode } from 'react'

export interface ActionColProps {
  content?: ReactNode
  style?: {
    textColor?: string
    backgroundColor?: string
  }
}
export const ActionCol: FC<ActionColProps> = (props) => {
  const { content, style } = props

  return (
    <Col className='border-b border-l w-1/5'>
      {/* min-height は1行分のため、line-height と一致させる*/}
      <div
        className={clsx(
          'flex justify-center min-h-[1.5em] font-semibold',
          style?.textColor,
          style?.backgroundColor,
        )}
      >
        {content}
      </div>
    </Col>
  )
}
