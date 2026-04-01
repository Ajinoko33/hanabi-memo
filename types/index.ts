export type Color = 'red' | 'blue' | 'yellow' | 'green' | 'white'
export type CardNumber = 1 | 2 | 3 | 4 | 5
export type CardIndex = 1 | 2 | 3 | 4 | 5

/* ========== Action ========== */

interface BaseAction<TType extends string> {
  key: string
  type: TType
}
interface BaseKnowledgeAction<TType extends string> extends BaseAction<TType> {
  targets: CardIndex[]
}

export interface ColorAction extends BaseKnowledgeAction<'color'> {
  color: Color
}
export interface NumberAction extends BaseKnowledgeAction<'number'> {
  number: CardNumber
}
export interface PlayAction extends BaseAction<'play'> {
  target: CardIndex
}
export interface RemovalAction extends BaseAction<'removal'> {
  target: CardIndex
}

export type KnowledgeAction = ColorAction | NumberAction
export type Action = KnowledgeAction | PlayAction | RemovalAction

/* ========== Local Storage Key ========== */

export type LocalStorageKey = 'input-logs'
