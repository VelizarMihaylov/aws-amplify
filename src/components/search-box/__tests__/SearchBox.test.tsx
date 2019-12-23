import React from 'react'
import { SearchBox } from '../SearchBox'
import { create, act } from 'react-test-renderer'

import { useFetch } from 'effects/use-fetch'
jest.mock('effects/use-fetch')

const mockedUseFetch = useFetch as jest.Mock<unknown>

import { useDispatch } from 'react-redux'
jest.mock('react-redux')

const mockedUseDispatch = useDispatch as jest.Mock<unknown>

describe('SearchBox', () => {
  afterEach(() => jest.resetAllMocks())
  const data = {
    results: [
      {
        country: 'GB',
        name: 'London',
        city: 'London',
        count: 158120,
        locations: 3
      },
      {
        country: 'GB',
        name: 'Manchester',
        city: 'Manchester',
        count: 48890,
        locations: 1
      },
      {
        country: 'GB',
        name: 'Leeds',
        city: 'Leeds',
        count: 51077,
        locations: 1
      }
    ]
  }
  it('should handle loading state', () => {
    mockedUseFetch.mockImplementation(() => ({ loading: true }))
    mockedUseDispatch.mockImplementation(() => jest.fn())
    const SearchBoxRender = create(
      <SearchBox url="https://test-api.com" />
    ).toJSON()
    expect(SearchBoxRender).toMatchSnapshot()
  })
  it('should handle error state', () => {
    mockedUseFetch.mockImplementation(() => ({ error: true }))
    mockedUseDispatch.mockImplementation(() => jest.fn())
    const SearchBoxRender = create(
      <SearchBox url="https://test-api.com" />
    ).toJSON()
    expect(SearchBoxRender).toMatchSnapshot()
  })
  it('should list all cities options when onFocus event is triggered and data is fetched', () => {
    mockedUseFetch.mockImplementation(() => ({
      loading: false,
      error: false,
      data
    }))
    mockedUseDispatch.mockImplementation(() => jest.fn())
    const SearchBoxRender = create(<SearchBox url="https://test-api.com" />)

    const input = SearchBoxRender.root.find(element => element.type === 'input')

    act(() => {
      input.props.onFocus()
    })

    expect(
      SearchBoxRender.root.find(element => element.type === 'ul').children
        .length
    ).toBe(3)
  })

  it('should dispatch ADD_CITY action when the city list is empty and onFocus action is triggered', () => {
    mockedUseFetch.mockImplementation(() => ({
      loading: false,
      error: false,
      data
    }))
    const dispatch = jest.fn()
    mockedUseDispatch.mockImplementation(() => dispatch)
    const SearchBoxRender = create(<SearchBox url="https://test-api.com" />)

    const input = SearchBoxRender.root.find(element => element.type === 'input')

    act(() => {
      input.props.onFocus()
    })

    act(() => {
      SearchBoxRender.root
        .find(element => element.type === 'ul')
        .props.children[0].props.onMouseDown()
    })

    expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_CITY',
      payload: 'London'
    })
  })
})
