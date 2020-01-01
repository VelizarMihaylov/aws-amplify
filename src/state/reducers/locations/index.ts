export type Locations = Array<{
  city: string
  location: string
  lastUpdated: string
  measurements: {
    parameter: string
    value: number
    unit: string
  }[]
}>

type Action =
  | {
      type: 'ADD_LOCATIONS'
      payload: Locations
    }
  | {
      type: 'REMOVE_LOCATION'
      payload: string
    }

const locations = (
  store: [] | Locations = [],
  action: Action
): [] | Locations => {
  switch (action.type) {
    case 'ADD_LOCATIONS':
      return action.payload
    case 'REMOVE_LOCATION':
      return [...store.filter(({ location }) => location !== action.payload)]
    default:
      return store
  }
}

export default locations
