import { COLORS, NUMBERS } from '@/constants'
import {
  BackwardOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Button, Checkbox, Col, Radio, Row } from 'antd'
import clsx from 'clsx'
import { FC } from 'react'

const titles = ['1', '2', '3', '4', '5']

interface ActionFormV2Props {}

export const ActionFormV2: FC<ActionFormV2Props> = (props) => {
  const {} = props

  return (
    <form className='flex flex-col items-stretch space-y-8'>
      <div className='flex flex-col'>
        <div className='w-96 my-4'>
          <Row className='w-full'>
            {titles.map((value) => {
              return (
                <Col
                  key={value}
                  flex={1}
                >
                  <div className='flex justify-center'>
                    <BackwardOutlined
                      rotate={90}
                      style={{ fontSize: '32px' }}
                    />
                  </div>
                </Col>
              )
            })}
          </Row>
        </div>

        <div className='w-96'>
          <Row className='w-full border-r'>
            {titles.map((value) => {
              return (
                <Col
                  key={value}
                  flex={1}
                  className='border-t border-b border-l'
                >
                  <div className='flex justify-center py-1'>
                    <Checkbox />
                  </div>
                </Col>
              )
            })}
          </Row>
        </div>
      </div>

      <div className='grid grid-cols-2 divide-dashed'>
        <div className='col-span-2 flex flex-col items-center space-y-6 pb-6 border-b'>
          <div>
            <Radio.Group
              optionType='default'
              className='space-y-1'
            >
              <div className='flex justify-center'>
                <Radio.Button value='number-1'>{NUMBERS[1].label}</Radio.Button>
                <Radio.Button value='number-2'>{NUMBERS[2].label}</Radio.Button>
                <Radio.Button value='number-3'>{NUMBERS[3].label}</Radio.Button>
                <Radio.Button value='number-4'>{NUMBERS[4].label}</Radio.Button>
                <Radio.Button value='number-5'>{NUMBERS[5].label}</Radio.Button>
              </div>
              <div className='flex justify-center'>
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
                  <div className={clsx('font-semibold', COLORS.yellow.style)}>
                    {COLORS.yellow.label}
                  </div>
                </Radio.Button>
                <Radio.Button value='color-green'>
                  <div className={clsx('font-semibold', COLORS.green.style)}>
                    {COLORS.green.label}
                  </div>
                </Radio.Button>
                <Radio.Button value='color-white'>
                  <div className={clsx('font-semibold', COLORS.white.style)}>
                    {COLORS.white.label}
                  </div>
                </Radio.Button>
              </div>
            </Radio.Group>
          </div>
          <Button
            type='primary'
            icon={<InfoCircleOutlined />}
          >
            情報を登録
          </Button>
        </div>

        <div className='flex justify-center py-6 border-r'>
          <Button
            type='primary'
            icon={<CheckCircleOutlined />}
          >
            プレイ
          </Button>
        </div>
        <div className='flex justify-center py-6'>
          <Button
            type='primary'
            icon={<StopOutlined />}
          >
            捨てる
          </Button>
        </div>
      </div>
    </form>
  )
}
