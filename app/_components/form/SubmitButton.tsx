import { Button, ButtonProps } from 'antd'
import { FC } from 'react'

type SubmitButtonProps = ButtonProps

export const SubmitButton: FC<SubmitButtonProps> = (props) => {
  return (
    <Button
      type='primary'
      htmlType='submit'
      {...props}
    >
      登録
    </Button>
  )
}
