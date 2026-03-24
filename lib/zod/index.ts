import z, { ZodLiteral } from 'zod'
import { $ZodCheckMinLength } from 'zod/v4/core'

z.config({
  customError: (issue) => {
    if (issue.code === 'invalid_value') {
      if (issue.inst instanceof ZodLiteral) {
        return '不正な値です。'
      }
    }
    if (issue.code === 'too_small') {
      if (
        issue.inst instanceof $ZodCheckMinLength &&
        issue.origin === 'array' &&
        issue.inclusive
      ) {
        return `少なくとも${issue.minimum}つは選択してください。`
      }
    }
    return undefined
  },
})

export default z
