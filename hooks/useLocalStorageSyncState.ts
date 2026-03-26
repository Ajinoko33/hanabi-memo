'use client'

import { LocalStorageKey } from '@/types'
import { useEffect, useState } from 'react'

const STORAGE_TEST = '__storage_test__'

const isNowAvailableStorage = (): boolean => {
  try {
    const storage = window['localStorage']
    storage.setItem(STORAGE_TEST, STORAGE_TEST)
    storage.removeItem(STORAGE_TEST)
    return true
  } catch {
    return false
  }
}

const safeParse = <Value>(raw: string): Value | undefined => {
  try {
    return JSON.parse(raw) as Value
  } catch {
    return undefined
  }
}

const safeStringify = (value: unknown): string | undefined => {
  try {
    return JSON.stringify(value)
  } catch {
    return undefined
  }
}

const safeSet = (key: string, value: string): boolean => {
  if (!isNowAvailableStorage()) {
    return false
  }

  try {
    localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

type Result<Value> =
  | {
      success: true
      value: Value
    }
  | {
      success: false
    }

const tryGet = <Value>(key: LocalStorageKey): Result<Value> => {
  if (isNowAvailableStorage()) {
    const raw = localStorage.getItem(key)
    if (raw === null) {
      // 値が存在しないので終了
      return { success: false }
    }

    // 値が存在する
    const parsedValue = safeParse<Value>(raw)
    if (parsedValue !== undefined) {
      return { success: true, value: parsedValue }
    }
  }

  return { success: false }
}

const trySet = <Value>(key: LocalStorageKey, value: Value): boolean => {
  const stringifiedValue = safeStringify(value)
  if (stringifiedValue === undefined) {
    return false
  }

  return safeSet(key, stringifiedValue)
}

/**
 * LocalStorage と同期する State.
 *
 * 初期値は以下の優先順位.
 * LocalStorage の値(あれば) > initialState
 *
 */
export const useLocalStorageSyncState = <Value>(
  key: LocalStorageKey,
  initialState: Value | (() => Value),
) => {
  const [value, setValue] = useState(initialState)

  useEffect(() => {
    const result = tryGet<Value>(key)
    if (result.success) {
      setValue(result.value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    trySet(key, value)
  }, [key, value])

  return [value, setValue] as const
}
