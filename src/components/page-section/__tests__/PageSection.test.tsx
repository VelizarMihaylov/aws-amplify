import React from 'react'
import { create } from 'react-test-renderer'

import { PageSection } from '../PageSection'

describe('PageSection', () => {
  it('should render without throwing an error', () => {
    const renderer = create(<PageSection />)

    expect(renderer.toJSON()).toMatchSnapshot()
  })
})
