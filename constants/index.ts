import { CardIndex, Color, Number } from '@/types'

/* ========== カード ========== */

export const CARDS = {
  1: { label: '①' },
  2: { label: '②' },
  3: { label: '③' },
  4: { label: '④' },
  5: { label: '⑤' },
} as const satisfies Record<CardIndex, { label: string }>

/* ========== 色情報 ========== */

export const ColorLabel: Record<Color, string> = {
  red: 'あか',
  blue: 'あお',
  yellow: 'きいろ',
  green: 'みどり',
  white: 'しろ',
}
export const ColorStyle: Record<Color, string> = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  yellow: 'text-yellow-500',
  green: 'text-green-500',
  white: 'text-gray-500',
}

/* ========== 数字情報 ========== */

export const NumberLabel: Record<Number, string> = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
}
