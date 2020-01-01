import React from 'react'
import { SearchBox } from '../SearchBox'
import { create, act } from 'react-test-renderer'

import { useQuery } from '@apollo/react-hooks'
jest.mock('@apollo/react-hooks')

const mockedUseQuery = useQuery as jest.Mock<unknown>

import { useDispatch } from 'react-redux'
jest.mock('react-redux')

const mockedUseDispatch = useDispatch as jest.Mock<unknown>

describe('SearchBox', () => {
  afterEach(() => jest.resetAllMocks())
  const data = {
    cities: [
      {
        name: 'London'
      },
      {
        name: 'Manchester'
      },
      {
        name: 'Leeds'
      }
    ]
  }
  it('should handle loading state', () => {
    mockedUseQuery.mockImplementation(() => ({ loading: true }))
    mockedUseDispatch.mockImplementation(() => jest.fn())
    const SearchBoxRender = create(<SearchBox />).toJSON()
    expect(SearchBoxRender).toMatchSnapshot()
  })
  it('should handle error state', () => {
    mockedUseQuery.mockImplementation(() => ({ error: true }))
    mockedUseDispatch.mockImplementation(() => jest.fn())
    const SearchBoxRender = create(
      <SearchBox url="https://test-api.com" />
    ).toJSON()
    expect(SearchBoxRender).toMatchSnapshot()
  })
  it('should list all cities options when onFocus event is triggered and data is fetched', () => {
    mockedUseQuery.mockImplementation(() => ({
      loading: false,
      error: false,
      data
    }))
    mockedUseDispatch.mockImplementation(() => jest.fn())
    const SearchBoxRender = create(<SearchBox />)

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
    mockedUseQuery.mockImplementation(() => ({
      loading: false,
      error: false,
      data
    }))
    const dispatch = jest.fn()
    mockedUseDispatch.mockImplementation(() => dispatch)
    const SearchBoxRender = create(<SearchBox />)

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
