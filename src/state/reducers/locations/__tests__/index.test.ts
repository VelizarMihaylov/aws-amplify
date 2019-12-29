import locations from '../index'
import { locationsMock } from '../__mocks__'

describe('city', () => {
  const initialState: [] = []
  it('should update the store with locations when called with ADD_LOCATIONS action and payload', () => {
    expect(
      locations(initialState, { type: 'ADD_LOCATIONS', payload: locationsMock })
    ).toEqual(locationsMock)
  })
  it('should remove a location from the store when called with REMOVE_LOCATION action and location name as payload', () => {
    const store = locations(locationsMock, {
      type: 'REMOVE_LOCATION',
      payload: 'Manchester Piccadilly'
    })
    expect(store).toHaveLength(2)
  })
})
