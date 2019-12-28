import React from 'react'
import CloseIcon from '..'
import { create } from 'react-test-renderer'

describe('CloseIcon', () => {
  it('should render without error', () => {
    const CloseIconRender = create(<CloseIcon />).toJSON()
    expect(CloseIconRender).toMatchSnapshot()
  })
})
