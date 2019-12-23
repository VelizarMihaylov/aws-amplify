import React from 'react'
import { PageSection, Grid, SearchBox } from 'components'

export const AirQuality = (): React.ReactElement => (
  <PageSection>
    <Grid>
      <SearchBox url="https://api.openaq.org/v1/cities?country=GB" />
    </Grid>
  </PageSection>
)
