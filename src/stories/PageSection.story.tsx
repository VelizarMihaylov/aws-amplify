import React from 'react'
import { PageSection } from 'components/PageSection'

export default { title: 'Button' }

export const withEmoji = (): React.ReactElement => (
  <PageSection>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </PageSection>
)
