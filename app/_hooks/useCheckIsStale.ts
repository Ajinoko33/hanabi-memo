import { Action, CardIndex } from '@/types'
import { useCallback, useMemo } from 'react'

const isRemoved = (action: Action) =>
  action.type === 'play' || action.type === 'removal'

export const useCheckIsStale = (actions: Action[]) => {
  const lastRemovedIndex: { [key in CardIndex]?: number } = useMemo(() => {
    // カードインデックスごとに、最後に手札から無くなったアクションの位置を記録
    const lastRemovedIndex: { [key in CardIndex]?: number } = {}

    actions.forEach((action, index) => {
      if (isRemoved(action)) {
        lastRemovedIndex[action.target] = index
      }
    })

    return lastRemovedIndex
  }, [actions])

  const isStale = useCallback(
    (key: string, target: CardIndex) => {
      const lastRemoved = lastRemovedIndex[target]
      if (lastRemoved === undefined) {
        // まだそのカードインデックスは手札から無くなっていない
        return false
      }

      const actionIndex = actions.findIndex((action) => action.key === key)
      if (actionIndex === -1) {
        // アクションが見つからない（通常は起こらないはず）
        return false
      }

      return lastRemoved >= actionIndex
    },
    [lastRemovedIndex, actions],
  )

  return isStale
}
