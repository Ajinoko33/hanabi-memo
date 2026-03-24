import { CARDS, COLORS, NUMBERS } from '@/constants'
import { CardIndex } from '@/types'
import { Checkbox, Radio } from 'antd'
import clsx from 'clsx'
import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { KnowledgeValues } from './ActionForm'
import { ErrorMessage } from './ErrorMessage'

interface KnowledgeActionFormContentProps {
  control: Control<KnowledgeValues>
}

export const KnowledgeActionFormContent: FC<KnowledgeActionFormContentProps> = (
  props,
) => {
  const { control } = props

  return (
    <div className='flex flex-col items-center space-y-2'>
      <div>
        <Controller
          control={control}
          name='targets'
          render={({ field, fieldState }) => {
            return (
              <>
                <Checkbox.Group<CardIndex>
                  value={field.value}
                  options={([1, 2, 3, 4, 5] satisfies CardIndex[]).map(
                    (value) => ({
                      value,
                      label: CARDS[value].label,
                    }),
                  )}
                  onChange={(checkedValue) => field.onChange(checkedValue)}
                />
                {fieldState.error?.message && (
                  <ErrorMessage message={fieldState.error.message} />
                )}
              </>
            )
          }}
        />
      </div>
      <div className='font-bold'>だけ</div>
      <div>
        <Controller
          control={control}
          name='knowledge'
          render={({ field, fieldState }) => {
            return (
              <>
                <Radio.Group
                  optionType='default'
                  className='space-y-1'
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  <div className='flex'>
                    <Radio.Button value='number-1'>
                      {NUMBERS[1].label}
                    </Radio.Button>
                    <Radio.Button value='number-2'>
                      {NUMBERS[2].label}
                    </Radio.Button>
                    <Radio.Button value='number-3'>
                      {NUMBERS[3].label}
                    </Radio.Button>
                    <Radio.Button value='number-4'>
                      {NUMBERS[4].label}
                    </Radio.Button>
                    <Radio.Button value='number-5'>
                      {NUMBERS[5].label}
                    </Radio.Button>
                  </div>
                  <div className='flex'>
                    <Radio.Button value='color-red'>
                      <div className={clsx('font-semibold', COLORS.red.style)}>
                        {COLORS.red.label}
                      </div>
                    </Radio.Button>
                    <Radio.Button value='color-blue'>
                      <div className={clsx('font-semibold', COLORS.blue.style)}>
                        {COLORS.blue.label}
                      </div>
                    </Radio.Button>
                    <Radio.Button value='color-yellow'>
                      <div
                        className={clsx('font-semibold', COLORS.yellow.style)}
                      >
                        {COLORS.yellow.label}
                      </div>
                    </Radio.Button>
                    <Radio.Button value='color-green'>
                      <div
                        className={clsx('font-semibold', COLORS.green.style)}
                      >
                        {COLORS.green.label}
                      </div>
                    </Radio.Button>
                    <Radio.Button value='color-white'>
                      <div
                        className={clsx('font-semibold', COLORS.white.style)}
                      >
                        {COLORS.white.label}
                      </div>
                    </Radio.Button>
                  </div>
                </Radio.Group>
                {fieldState.error?.message && (
                  <ErrorMessage message={fieldState.error.message} />
                )}
              </>
            )
          }}
        />
      </div>
    </div>
  )
}
