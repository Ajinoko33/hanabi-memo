import { COLORS } from '@/constants'
import { Color } from '@/types'
import { Col } from 'antd'
import clsx from 'clsx'
import { FC, ReactNode } from 'react'

export interface ActionColProps {
  content?: ReactNode
  textColor?: Color
  isGrayOut?: boolean
}
export const ActionCol: FC<ActionColProps> = (props) => {
  const { content, textColor, isGrayOut } = props

  return (
    <Col className='border-b border-l w-1/5'>
      {/* min-height は1行分のため、line-height と一致させる*/}
      <div
        className={clsx(
          'flex justify-center min-h-[1.5em] font-semibold',
          textColor ? COLORS[textColor].style : undefined,
          isGrayOut ? 'bg-gray-300' : undefined,
        )}
      >
        {content}
      </div>
    </Col>
  )
}
