import React, { useContext } from 'react'
import { PageSection, Grid, SearchBox } from 'components'
import { ConfigContext } from 'context'

export const AirQuality = (): React.ReactElement => {
  const { openAQUrl } = useContext(ConfigContext)
  return (
    <PageSection>
      <Grid>
        <SearchBox url={`${openAQUrl}/v1/cities?country=GB`} />
      </Grid>
    </PageSection>
  )
}
