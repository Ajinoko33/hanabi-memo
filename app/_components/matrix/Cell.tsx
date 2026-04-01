import { Checkbox, CheckboxProps } from 'antd'
import clsx from 'clsx'
import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CellProps extends Pick<CheckboxProps, 'onChange' | 'checked'> {}

export const Cell: FC<CellProps> = (props) => {
  const { onChange, checked } = props

  return (
    <div
      className={clsx(
        'border-r border-b flex items-center justify-center py-1',
        checked && 'bg-gray-300',
      )}
    >
      <Checkbox
        styles={
          checked
            ? {
                icon: {
                  borderColor: 'grey',
                  backgroundColor: 'grey',
                },
              }
            : undefined
        }
        onChange={onChange}
        checked={checked}
      />
    </div>
  )
}
