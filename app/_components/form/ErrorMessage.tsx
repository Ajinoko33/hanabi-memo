import { FC } from 'react'

interface ErrorMessageProps {
  message: string
}

export const ErrorMessage: FC<ErrorMessageProps> = (props) => {
  const { message } = props
  return <p className='text-red-600'>{message}</p>
}
