import React from 'react'
import { create } from 'react-test-renderer'

import { LocationCard } from '..'

import { CloseIcon } from '../icon'

import { useDispatch } from 'react-redux'
jest.mock('react-redux')

const mockedUseDispatch = useDispatch as jest.Mock<unknown>

const dayjs = jest.genMockFromModule('dayjs') as jest.Mock

describe('LocationCard', () => {
  dayjs.mockImplementation(() => ({
    extend: jest.fn(),
    utc: (): {} => ({
      fromNow: (): string => '5 hours ago'
    })
  }))
  const measurements = [
    {
      parameter: 'pm25',
      value: 10,
      unit: 'µg/m³'
    },
    {
      parameter: 'so2',
      value: 11,
      unit: 'µg/m³'
    },
    {
      parameter: 'no2',
      value: 22,
      unit: 'µg/m³'
    },
    {
      parameter: 'o3',
      value: 17,
      unit: 'µg/m³'
    }
  ]
  it('should render with city, location and measurement props', () => {
    mockedUseDispatch.mockImplementation(() => jest.fn())
    const LocationCardRender = create(
      <LocationCard
        city="Manchester"
        location="Manchester Piccadilly"
        measurements={measurements}
        lastUpdated="2019-12-28T08:00:00.000Z"
      />
    ).toJSON()
    expect(LocationCardRender).toMatchSnapshot()
  })
  it('should dispatch REMOVE_LOCATION action with the location prop set as a payload on onClick event', () => {
    const dispatch = jest.fn()
    mockedUseDispatch.mockImplementation(() => dispatch)
    const LocationCardRender = create(
      <LocationCard
        city="Manchester"
        location="Manchester Piccadilly"
        measurements={measurements}
        lastUpdated="2019-12-28T08:00:00.000Z"
      />
    ).root

    const CloseIconRenderer = LocationCardRender.findByType(CloseIcon)
    CloseIconRenderer.props.onClick()
    expect(dispatch).toHaveBeenCalledWith({
      type: 'REMOVE_LOCATION',
      payload: 'Manchester Piccadilly'
    })
  })
})
