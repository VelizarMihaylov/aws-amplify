import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { gridUnits, spinner, colours, desktop } from 'mixins'
import styled from '@emotion/styled'

import { useQuery } from '@apollo/react-hooks'
import { LATEST_MEASUREMENTS } from 'graph-ql'

import { LocationCard } from 'components'
import { Locations } from 'state/reducers/locations'

const StyledListLocations = styled.div`
  min-height: ${gridUnits(30)}rem;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-flow: column wrap;

  ${desktop(`
      flex-flow: row wrap;
  `)}

  padding: ${gridUnits(1.5)}rem;

  > * {
    flex: 0 0 45%;
    margin: ${gridUnits(1.5)}rem 0 ${gridUnits(1.5)}rem 0;
  }
`
const ListLocationSpinner = styled.div`
  ${spinner({
    border: `8px solid ${colours.white}`,
    topBorder: '8px solid #5B5CAE',
    width: 1.5,
    height: 1.5
  })};
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 0;
  margin-top: -${gridUnits(1.5)}rem;
  margin-left: -${gridUnits(1.5)}rem;
  background: none;
  outline: none !important;
`
type QueryDataResponse = {
  latestMeasurements: {
    location: string
    lastUpdated: string
    measurements: {
      parameter: string
      value: number
      unit: string
    }[]
  }[]
}
type ListLocationsProps = {
  city: string
}
export const ListLocations: React.FC<ListLocationsProps> = ({
  city
}): React.ReactElement => {
  const { locations } = useSelector(
    ({ locations }: { locations: Locations }) => ({
      locations
    }),
    shallowEqual
  )
  const { data, loading, error } = useQuery<QueryDataResponse>(
    LATEST_MEASUREMENTS,
    {
      variables: { city }
    }
  )

  const dispatch = useDispatch()
  useEffect(() => {
    const { latestMeasurements } = data || { latestMeasurements: [] }
    console.log('LATEST ', latestMeasurements)
    dispatch({
      type: 'ADD_LOCATIONS',
      payload: latestMeasurements.map(measurements => ({
        city,
        ...measurements
      }))
    })
  }, [city, data, dispatch])
  if (error) return <h1>Oops something went wrong!</h1>
  return (
    <StyledListLocations>
      {loading ? (
        <ListLocationSpinner />
      ) : (
        locations.map(({ city, location, lastUpdated, measurements }, i) => (
          <LocationCard
            key={`${i}-location`}
            city={city}
            location={location}
            measurements={measurements}
            lastUpdated={lastUpdated}
          />
        ))
      )}
    </StyledListLocations>
  )
}

ListLocations.propTypes = {
  city: PropTypes.string.isRequired
}
