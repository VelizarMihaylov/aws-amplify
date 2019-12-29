import React from 'react'
import { PageSection, Grid, SearchBox, ListLocations } from 'components'
import { useSelector } from 'react-redux'

export const AirQuality = (): React.ReactElement => {
  const { city } = useSelector(({ city }: { city: string }) => ({ city }))
  return (
    <>
      <PageSection>
        <Grid>
          <SearchBox />
        </Grid>
      </PageSection>
      <PageSection>
        {city.length > 0 && <ListLocations city={city} />}
      </PageSection>
    </>
  )
}
