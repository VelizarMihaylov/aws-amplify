import React from 'react'
import { LocationCard } from '..'
import { create } from 'react-test-renderer'

import dayjs from 'dayjs'
jest.mock('dayjs')

describe('LocationCard', () => {
  dayjs.mockImplementation(() => ({
    extend: jest.fn(),
    utc: () => ({
      fromNow: () => '5 hours ago'
    })
  }))

  const measurements = [
    {
      parameter: 'no2',
      value: 37,
      lastUpdated: '2019-10-13T08:00:00.000Z',
      unit: 'µg/m³',
      sourceName: 'DEFRA',
      averagingPeriod: {
        value: 1,
        unit: 'hours'
      }
    },
    {
      parameter: 'so2',
      value: 3,
      lastUpdated: '2019-10-13T08:00:00.000Z',
      unit: 'µg/m³',
      sourceName: 'DEFRA',
      averagingPeriod: {
        value: 0.25,
        unit: 'hours'
      }
    },
    {
      parameter: 'pm25',
      value: 4,
      lastUpdated: '2019-10-13T08:00:00.000Z',
      unit: 'µg/m³',
      sourceName: 'DEFRA',
      averagingPeriod: {
        value: 24,
        unit: 'hours'
      }
    },
    {
      parameter: 'o3',
      value: 9,
      lastUpdated: '2019-10-13T08:00:00.000Z',
      unit: 'µg/m³',
      sourceName: 'DEFRA',
      averagingPeriod: {
        value: 8,
        unit: 'hours'
      }
    }
  ]
  it('should render with city, location and measurement props', () => {
    const LocationCardRender = create(
      <LocationCard
        city="Manchester"
        location="Manchester Piccadilly"
        measurements={measurements}
      />
    ).toJSON()
    expect(LocationCardRender).toMatchSnapshot()
  })
  it('should dispatch REMOVE_LOCATION action with the location prop set as a payload on onClick event', () => {
    const LocationCardRender = create(
      <LocationCard
        city="Manchester"
        location="Manchester Piccadilly"
        measurements={measurements}
        dispatch={jest.fn()}
      />
    ).root
    const CloseIcon = LocationCardRender.find(
      element =>
        element.type === 'svg' &&
        element.props.className === 'LocationCard--icon__close'
    )
    CloseIcon.props.onClick()
    expect(LocationCardRender.props.dispatch).toHaveBeenCalledWith({
      type: 'REMOVE_LOCATION',
      payload: 'Manchester Piccadilly'
    })
  })
})
