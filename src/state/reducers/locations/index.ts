import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'

export type Locations = Array<{
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
      return action.payload.map(measurement => {
        dayjs.extend(utc)
        dayjs.extend(relativeTime)
        dayjs.extend(customParseFormat)
        const formattedDate = dayjs(measurement.lastUpdated)
          .utc()
          .fromNow()
        return {
          ...measurement,
          lastUpdated: formattedDate
        }
      })
    case 'REMOVE_LOCATION':
      return [...store.filter(({ location }) => location !== action.payload)]
    default:
      return store
  }
}

export default locations
