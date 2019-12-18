import locations from '../index'

describe('city', () => {
  const initialState: [] = []
  it('should update the store with locations when called with ADD_LOCATIONS action and payload', () => {
    const locationsMock = [
      {
        city: 'Manchester',
        location: 'Manchester Piccadilly'
      },
      {
        city: 'Manchester',
        location: 'Salford Eccles'
      }
    ]
    expect(
      locations(initialState, { type: 'ADD_LOCATIONS', payload: locationsMock })
    ).toEqual(locationsMock)
  })
  it('should remove a location from the store when called with REMOVE_LOCATION action and payload', () => {
    const initialState = [
      {
        city: 'Manchester',
        location: 'Manchester Piccadilly'
      },
      {
        city: 'Manchester',
        location: 'Salford Eccles'
      }
    ]
    expect(
      locations(initialState, {
        type: 'REMOVE_LOCATION',
        payload: 'Manchester Piccadilly'
      })
    ).toEqual([
      {
        city: 'Manchester',
        location: 'Salford Eccles'
      }
    ])
  })
})
