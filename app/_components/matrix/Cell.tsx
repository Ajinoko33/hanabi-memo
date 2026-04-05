import { ColValue } from '@/hooks/useCountMatrix'
import { Checkbox, CheckboxProps } from 'antd'
import clsx from 'clsx'
import { FC } from 'react'

interface Value {
  bgClassName: string | undefined
  styles: CheckboxProps['styles']
  checked: CheckboxProps['checked']
}

const values = {
  0: {
    bgClassName: undefined,
    styles: undefined,
    checked: false,
  },
  1: {
    bgClassName: 'bg-gray-300',
    styles: {
      icon: {
        borderColor: 'grey',
        backgroundColor: 'grey',
      },
    },
    checked: true,
  },
  2: {
    bgClassName: 'bg-sky-300',
    styles: undefined,
    checked: true,
  },
} as const satisfies Record<ColValue, Value>

interface CellProps extends Pick<CheckboxProps, 'onClick'> {
  value: ColValue
}

export const Cell: FC<CellProps> = (props) => {
  const { onClick, value } = props

  return (
    <div
      className={clsx(
        'border-r border-b flex items-center justify-center py-1',
        values[value].bgClassName,
      )}
    >
      <Checkbox
        styles={values[value].styles}
        onClick={onClick}
        checked={values[value].checked}
      />
    </div>
  )
}
