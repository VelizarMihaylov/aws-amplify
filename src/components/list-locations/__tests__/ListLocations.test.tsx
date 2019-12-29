import React from 'react'
import { ListLocations } from '..'
import { create, act } from 'react-test-renderer'

import { locations, store } from '../__mocks__'

import { useQuery } from '@apollo/react-hooks'
jest.mock('@apollo/react-hooks')

const mockedUseQuery = useQuery as jest.Mock<unknown>

import { useDispatch, useSelector } from 'react-redux'
jest.mock('react-redux')

const mockedUseDispatch = useDispatch as jest.Mock<unknown>
const mockedUseSelector = useSelector as jest.Mock<unknown>

describe('ListLocations', () => {
  afterEach(() => jest.clearAllMocks())

  it('should handle loading state', () => {
    mockedUseQuery.mockImplementation(() => ({ loading: true }))
    mockedUseDispatch.mockImplementation(() => jest.fn())
    mockedUseSelector.mockImplementation(() => ({
      locations: []
    }))
    const ListLocationsRender = create(
      <ListLocations city="Manchester" />
    ).toJSON()
    expect(ListLocationsRender).toMatchSnapshot()
  })
  it('should handle error state', () => {
    mockedUseQuery.mockImplementation(() => ({ error: true }))
    mockedUseDispatch.mockImplementation(() => jest.fn())
    mockedUseSelector.mockImplementation(() => ({
      locations: []
    }))
    const ListLocationsRender = create(
      <ListLocations city="Manchester" />
    ).toJSON()
    expect(ListLocationsRender).toMatchSnapshot()
  })
  it('should render locations when not in loading or error state and locations are set in the store', () => {
    const { locations } = store
    mockedUseQuery.mockImplementation(() => ({
      loading: false,
      error: false
    }))
    mockedUseDispatch.mockImplementation(() => jest.fn())
    mockedUseSelector.mockImplementation(() => ({
      locations
    }))
    const ListLocationsRender = create(
      <ListLocations city="Manchester" />
    ).toJSON()
    expect(ListLocationsRender).toMatchSnapshot()
  })

  it('should dispatch ADD_LOCATIONS action with the locations received as data', () => {
    mockedUseQuery.mockImplementation(() => ({
      loading: false,
      error: false,
      data: locations
    }))
    const dispatch = jest.fn()
    mockedUseDispatch.mockImplementation(() => dispatch)
    mockedUseSelector.mockImplementation(() => ({
      locations: []
    }))
    const ListLocationsRender = create(<ListLocations city="Manchester" />)

    act(() => ListLocationsRender.update(<ListLocations city="Manchester" />))
    expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_LOCATIONS',
      payload: store.locations
    })
  })
})
