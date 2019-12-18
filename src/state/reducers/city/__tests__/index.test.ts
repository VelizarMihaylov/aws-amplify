import city from '../index'

describe('city', () => {
  const initialState = ''
  it('should update the state with a city when called with ADD_CITY action and payload', () => {
    expect(city(initialState, { type: 'ADD_CITY', payload: 'London' })).toBe(
      'London'
    )
  })
})
