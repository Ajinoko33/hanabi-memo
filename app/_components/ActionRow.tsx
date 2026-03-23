import { Action, ColorAction, NumberAction, RemoveAction } from '@/app/page'
import { ColorName, ColorStyle } from '@/constants'
import { CardIndex } from '@/types'
import { ToTopOutlined } from '@ant-design/icons'
import { Row } from 'antd'
import { FC } from 'react'
import { ActionCol, ActionColProps } from './ActionCol'

type ColPropsArray = [
  ActionColProps | undefined,
  ActionColProps | undefined,
  ActionColProps | undefined,
  ActionColProps | undefined,
  ActionColProps | undefined,
]

/* ========== Col Props 生成 (色情報の場合) ========== */

const resolveColPropsOnColor = (index: CardIndex, action: ColorAction) => {
  return action.targets.includes(index)
    ? {
        content: ColorName[action.color],
        style: {
          textColor: ColorStyle[action.color],
        },
      }
    : undefined
}
const createColPropsArrayOnColor = (action: ColorAction): ColPropsArray => {
  return [
    resolveColPropsOnColor(1, action),
    resolveColPropsOnColor(2, action),
    resolveColPropsOnColor(3, action),
    resolveColPropsOnColor(4, action),
    resolveColPropsOnColor(5, action),
  ]
}

/* ========== Col Props 生成 (数字情報の場合) ========== */

const resolveColPropsOnNumber = (index: CardIndex, action: NumberAction) => {
  return action.targets.includes(index)
    ? {
        content: action.number,
      }
    : undefined
}
const createColPropsArrayOnNumber = (action: NumberAction): ColPropsArray => {
  return [
    resolveColPropsOnNumber(1, action),
    resolveColPropsOnNumber(2, action),
    resolveColPropsOnNumber(3, action),
    resolveColPropsOnNumber(4, action),
    resolveColPropsOnNumber(5, action),
  ]
}

/* ========== Col Props 生成 (除外の場合) ========== */

const resolveColPropsOnRemove = (index: CardIndex, action: RemoveAction) => {
  return action.index === index
    ? {
        content: <ToTopOutlined />,
      }
    : undefined
}
const createColPropsArrayOnRemove = (action: RemoveAction): ColPropsArray => {
  return [
    resolveColPropsOnRemove(1, action),
    resolveColPropsOnRemove(2, action),
    resolveColPropsOnRemove(3, action),
    resolveColPropsOnRemove(4, action),
    resolveColPropsOnRemove(5, action),
  ]
}

/* ========== 補助部品 ========== */

const createColPropsArray = (action: Action): ColPropsArray => {
  switch (action.type) {
    case 'color':
      return createColPropsArrayOnColor(action)
    case 'number':
      return createColPropsArrayOnNumber(action)
    case 'remove':
      return createColPropsArrayOnRemove(action)
  }
}

/* ========== コンポーネント ========== */

interface ActionRowProps {
  action: Action
}

export const ActionRow: FC<ActionRowProps> = (props) => {
  const { action } = props

  const colPropsArray = createColPropsArray(action)

  return (
    <Row className='w-full'>
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
