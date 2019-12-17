import React from 'react'

import { BaseStyles } from 'components/BaseStyles'
import { normalize, baseTypography } from 'mixin'
import { PageSection } from 'components/PageSection'
import { Grid } from 'components/Grid'
import { GridColumn } from 'components/GridColumn'

const App: React.FC = () => {
  return (
    <>
      <BaseStyles
        styles={`
      ${normalize}
      ${baseTypography}
    `}
      />
      <PageSection>
        <Grid>
          <GridColumn gridWeight={8}>
            <h1>One</h1>
          </GridColumn>
          <GridColumn gridWeight={12}>
            <h1>Two</h1>
          </GridColumn>
        </Grid>
      </PageSection>
    </>
  )
}

export default App
