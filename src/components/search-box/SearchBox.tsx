import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { MagnifyingGlassIcon } from './icon'
import styled from '@emotion/styled'
import { spinner, gridUnits, colours } from 'mixins'

import { useQuery } from '@apollo/react-hooks'
import { GET_CITIES } from 'graph-ql'

const SearchBoxContainer = styled.div`
  width: 100%;
  position: relative;
  height: ${gridUnits(2.5)}rem;
`

const SearchBoxForm = styled.form`
  position: absolute;
  z-index: 999;
  margin-left: 50%;
  transform: translateX(-50%);
  width: ${gridUnits(20)}rem;
  height: ${gridUnits(2.5)}rem;
  border: ${gridUnits(0.2)}rem solid grey;
  border-radius: ${gridUnits(0.75)}rem;
  background: ${colours.white};
`

const SearchBoxInput = styled.input`
  position: absolute;
  top: 0;
  left: ${gridUnits(3)}rem;
  right: 0;
  font-size: ${gridUnits(1)}rem;
  line-height: ${gridUnits(2.5)}rem;
  background: none;
  width: ${gridUnits(16.5)}rem;
  height: ${gridUnits(2.5)}rem;
  border: none;
  appearance: none;
  outline: none;

  &::placeholder {
    color: ${colours.black};
  }
`

const SearchBoxDatalist = styled.ul`
  position: absolute;
  top: ${gridUnits(2)}rem;
  width: ${gridUnits(18.5)}rem;
  margin-left: 50%;
  transform: translateX(-50%);
  max-height: ${gridUnits(10)}rem;
  overflow-y: scroll;
  list-style: none;
  background: white;
  border: ${gridUnits(0.2)}rem solid grey;
  border-top: none;
  border-radius: 0 0 ${gridUnits(0.5)}rem ${gridUnits(0.5)}rem;
  z-index: 998;

  & li {
    width: 100%;
    padding: ${gridUnits(1.5)}rem 0 ${gridUnits(0.75)}rem 0;
    text-align: center;
    cursor: pointer;
  }

  & li:hover {
    background: ${colours.grey};
  }
`

const StyledMagnifyingGlassIcon = styled(MagnifyingGlassIcon)`
  position: absolute;
  top: ${gridUnits(0.5)}rem;
  left: ${gridUnits(0.75)}rem;
  height: ${gridUnits(1.5)}rem;
  width: ${gridUnits(1.5)}rem;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  fill: ${colours.grey};
  outline: none !important;
`
const SearchBoxIconSpinner = styled.div`
  ${spinner({
    border: `2px solid ${colours.grey}`,
    topBorder: `2px solid ${colours.white}`,
    width: 1.5,
    height: 1.5
  })};
  position: absolute;
  top: ${gridUnits(0.5)}rem;
  left: ${gridUnits(0.75)}rem;
  padding: 0;
  margin: 0;
  background: none;
  outline: none !important;
`

type QueryDataResponse = {
  cities: {
    name: string
  }[]
}
export const SearchBox: React.FC = (): React.ReactElement => {
  const { data, loading, error } = useQuery<QueryDataResponse>(GET_CITIES)
  const dispatch = useDispatch()
  const [dataList, setDataList] = useState<QueryDataResponse['cities']>([])
  const [selection, setSelection] = useState('')
  const [showList, setShowList] = useState(false)
  if (error) return <h1>Oops something went wrong!</h1>
  const { cities } = data || { cities: [] }
  return (
    <SearchBoxContainer>
      <SearchBoxForm data-puppet="search-box-form">
        {loading ? <SearchBoxIconSpinner /> : <StyledMagnifyingGlassIcon />}
        <SearchBoxInput
          data-puppet="search-box-input"
          disabled={loading}
          className="SearchBox--input"
          autoComplete="off"
          name="cities"
          placeholder={loading ? undefined : 'Enter city name...'}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setDataList(
              cities.filter(({ name }) =>
                name.match(RegExp(event.target.value, 'i'))
              )
            )
            setSelection(event.target.value)
          }}
          onBlur={(): void => setShowList(false)}
          onFocus={(): void => {
            if (!dataList.length) setDataList(cities)
            setShowList(true)
          }}
          value={selection}
        />
      </SearchBoxForm>
      <SearchBoxDatalist
        style={{
          display: showList ? 'block' : 'none'
        }}
      >
        {dataList.map(({ name }) => (
          <li
            data-puppet="search-box-list-element"
            key={name}
            onMouseDown={(): void => {
              setSelection(name)
              dispatch({ type: 'ADD_CITY', payload: name })
            }}
          >
            {name}
          </li>
        ))}
      </SearchBoxDatalist>
    </SearchBoxContainer>
  )
}
