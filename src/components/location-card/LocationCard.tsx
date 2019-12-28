import React from 'react'
import PropTypes from 'prop-types'

import styled from '@emotion/styled'

import { CloseIcon } from './icon'
import { gridUnits, colours, bold } from 'mixins'
import { useDispatch } from 'react-redux'

const StyledLocationCard = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding-bottom: ${gridUnits(1.5)}rem;
  background: ${colours.white};
  border-radius: ${gridUnits(1.5)}rem;
`

const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: ${gridUnits(1.5)}rem;
  right: ${gridUnits(1.5)}rem;
  width: ${gridUnits(1.5)}rem;
  height: ${gridUnits(1.5)}rem;
  fill: ${colours.black};
  cursor: pointer;
`
const LocationCardContent = styled.div`
  margin: 0 ${gridUnits(1.5)}rem 0 ${gridUnits(1.5)}rem;
  padding-top: ${gridUnits(3)}rem;

  & h3 {
    color: ${colours.purple};
    font-weight: ${bold};
  }
`

const UpdatedAt = styled.p`
  font-weight: ${bold};
  text-transform: uppercase;
`

const Values = styled.p`
  font-weight: ${bold};
`
type LocationCardProps = {
  city: string
  location: string
  lastUpdated: string
  measurements: {
    parameter: string
    value: number
    unit: string
  }[]
}
export const LocationCard: React.FC<LocationCardProps> = ({
  city,
  location,
  lastUpdated,
  measurements
}) => {
  const dispatch = useDispatch()
  return (
    <StyledLocationCard>
      <StyledCloseIcon
        onClick={(): void => {
          dispatch({ type: 'REMOVE_LOCATION', payload: location })
        }}
      />
      <LocationCardContent>
        <UpdatedAt>{`Updated ${lastUpdated}`}</UpdatedAt>
        <h3>{location}</h3>
        <p>{`in ${city}, United Kingdom`}</p>
        <Values>{`Value: ${measurements
          .map(
            ({ parameter, value, unit }) =>
              `${parameter.toUpperCase()}: ${value} ${unit}`
          )
          .join(', ')}`}</Values>
      </LocationCardContent>
    </StyledLocationCard>
  )
}

LocationCard.propTypes = {
  city: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
  measurements: PropTypes.array.isRequired
}
