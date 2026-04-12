import type { CardIndex, CardNumber, Color } from '@/types'

/* ========== カード ========== */

export const CARDS = {
  1: { label: 'A' },
  2: { label: 'B' },
  3: { label: 'C' },
  4: { label: 'D' },
  5: { label: 'E' },
} as const satisfies Record<CardIndex, { label: string }>

export const ALL_CARD_INDEX = Object.keys(CARDS).map(
  Number,
) as unknown as CardIndex[]

/* ========== 色 ========== */

export const COLORS = {
  red: { label: 'あか', style: 'text-red-500' },
  blue: { label: 'あお', style: 'text-blue-500' },
  yellow: { label: 'きいろ', style: 'text-amber-500' },
  green: { label: 'みどり', style: 'text-green-500' },
  white: { label: 'しろ', style: 'text-gray-500' },
} as const satisfies Record<Color, { label: string; style: string }>

/* ========== 数字 ========== */

export const NUMBERS = {
  1: { label: '1' },
  2: { label: '2' },
  3: { label: '3' },
  4: { label: '4' },
  5: { label: '5' },
} as const satisfies Record<CardNumber, { label: string }>
