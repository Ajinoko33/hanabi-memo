import { CardIndex, Color, Number } from '@/types'

/* ========== カード ========== */

export const CARDS = {
  1: { label: '①' },
  2: { label: '②' },
  3: { label: '③' },
  4: { label: '④' },
  5: { label: '⑤' },
} as const satisfies Record<CardIndex, { label: string }>

/* ========== 色 ========== */

export const COLORS = {
  red: { label: 'あか', style: 'text-red-500' },
  blue: { label: 'あお', style: 'text-blue-500' },
  yellow: { label: 'きいろ', style: 'text-yellow-500' },
  green: { label: 'みどり', style: 'text-green-500' },
  white: { label: 'しろ', style: 'text-gray-500' },
} as const satisfies Record<Color, { label: string; style: string }>

/* ========== 数字情報 ========== */

export const NumberLabel: Record<Number, string> = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
}
