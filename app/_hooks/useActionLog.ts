import { useLocalStorageSyncState } from '@/hooks/useLocalStorageSyncState'
import { Action } from '@/types'
import { useCallback, useMemo, useState } from 'react'

/**
 * 入力ログ。ローカルストレージに保存。
 */
export const useActionLog = () => {
  // 現在指している終了位置
  const [currentEndIndex, setCurrentEndIndex] = useState<number>(0)
  const [allLogs, setAllLogs] = useLocalStorageSyncState<Action[]>(
    'input-logs',
    [],
    (result) => {
      if (result.success) {
        // ログが存在する場合は終了位置をログの数に合わせる
        setCurrentEndIndex(result.value.length)
      }
    },
  )

  // 終了位置までのログ
  const logs = useMemo(
    () => allLogs.slice(0, currentEndIndex),
    [allLogs, currentEndIndex],
  )

  // 終了位置に新しいアクションを追加する
  const add = useCallback(
    (action: Action) => {
      setAllLogs((prev) => [...prev.slice(0, currentEndIndex), action])
      setCurrentEndIndex((prev) => prev + 1)
    },
    [setAllLogs, currentEndIndex],
  )

  // 終了位置を1つ前に戻す
  const undo = useCallback(() => {
    setCurrentEndIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  // 終了位置を1つ後ろに進める
  const redo = useCallback(() => {
    setCurrentEndIndex((prev) => Math.min(prev + 1, allLogs.length))
  }, [allLogs.length])

  // ログを全て消す
  const clear = useCallback(() => {
    setAllLogs([])
    setCurrentEndIndex(0)
  }, [setAllLogs])

  const hasPrev = currentEndIndex > 0
  const hasNext = currentEndIndex < allLogs.length

  return { logs, add, undo, redo, hasPrev, hasNext, clear } as const
}
