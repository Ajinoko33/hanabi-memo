import { COLORS, NUMBERS } from '@/constants'
import {
  Action,
  CardIndex,
  ColorAction,
  NumberAction,
  PlayAction,
  RemovalAction,
} from '@/types'
import { CheckCircleOutlined, StopOutlined } from '@ant-design/icons'
import { Row } from 'antd'
import { FC } from 'react'
import { ActionCol, ActionColProps } from './ActionCol'

type ColProps = ActionColProps | undefined
type ColPropsArray = ColProps[]

/* ========== Col Props 生成 ========== */

const resolveColPropsOnColor = (index: CardIndex, action: ColorAction) => {
  return action.targets.includes(index)
    ? {
        content: COLORS[action.color].label,
        textColor: action.color,
      }
    : undefined
}

const resolveColPropsOnNumber = (index: CardIndex, action: NumberAction) => {
  return action.targets.includes(index)
    ? {
        content: NUMBERS[action.number].label,
      }
    : undefined
}

const resolveColPropsOnPlay = (index: CardIndex, action: PlayAction) => {
  return action.target === index
    ? {
        content: <CheckCircleOutlined />,
      }
    : undefined
}

const resolveColPropsOnRemoval = (index: CardIndex, action: RemovalAction) => {
  return action.target === index
    ? {
        content: <StopOutlined />,
      }
    : undefined
}

/* ========== 補助部品 ========== */

const createBaseColProps = (action: Action, index: CardIndex): ColProps => {
  switch (action.type) {
    case 'color':
      return resolveColPropsOnColor(index, action)
    case 'number':
      return resolveColPropsOnNumber(index, action)
    case 'play':
      return resolveColPropsOnPlay(index, action)
    case 'removal':
      return resolveColPropsOnRemoval(index, action)
  }
}

const createColProps = (
  action: Action,
  index: CardIndex,
  isStale: (key: string, target: CardIndex) => boolean,
): ColProps => {
  const base = createBaseColProps(action, index)

  return {
    ...base,
    isGrayOut: isStale(action.key, index),
  }
}

const createColPropsArray = (
  action: Action,
  isStale: (key: string, target: CardIndex) => boolean,
): ColPropsArray => {
  return [
    createColProps(action, 1, isStale),
    createColProps(action, 2, isStale),
    createColProps(action, 3, isStale),
    createColProps(action, 4, isStale),
    createColProps(action, 5, isStale),
  ]
}

/* ========== コンポーネント ========== */

interface ActionRowProps {
  action: Action
  isStale: (key: string, target: CardIndex) => boolean
}

export const ActionRow: FC<ActionRowProps> = (props) => {
  const { action, isStale } = props

  const colPropsArray = createColPropsArray(action, isStale)

  return (
    <Row className='w-full border-r'>
      {colPropsArray.map((colProps, index) => {
        return (
          <ActionCol
            key={index}
            {...colProps}
          />
        )
      })}
    </Row>
  )
}
