import clsx from 'clsx'
import { FC } from 'react'

type CrabType = 'to-right-1' | 'to-right-2' | 'to-right-3' | 'to-left-1'

interface CrabProps {
  type: CrabType
}

export const Crab: FC<CrabProps> = (props) => {
  const { type } = props

  return (
    <div
      className={clsx(
        'absolute top-1 left-0 inline-block',
        `animate-slide-${type}`,
      )}
    >
      🦀
    </div>
  )
}
