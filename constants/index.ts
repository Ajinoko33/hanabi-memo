import { CardIndex, Color, Number } from '@/types'

/* ========== カード位置 ========== */

export const CardLabel: Record<CardIndex, string> = {
  1: '①',
  2: '②',
  3: '③',
  4: '④',
  5: '⑤',
}

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
