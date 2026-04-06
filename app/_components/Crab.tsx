import clsx from 'clsx'
import { FC } from 'react'

const animationClasses = {
  'to-right-1': 'animate-slide-to-right-1',
  'to-right-2': 'animate-slide-to-right-2',
  'to-right-3': 'animate-slide-to-right-3',
  'to-left-1': 'animate-slide-to-left-1',
} as const

type CrabType = keyof typeof animationClasses

interface CrabProps {
  type: CrabType
}

export const Crab: FC<CrabProps> = (props) => {
  const { type } = props

  return (
    <div
      className={clsx(
        'absolute top-1 left-0 inline-block',
        animationClasses[type],
      )}
    >
      🦀
    </div>
  )
}
