type Action = {
  type: 'ADD_CITY'
  payload: string
}

const city = (store = '', action: Action): Action['payload'] | '' => {
  switch (action.type) {
    case 'ADD_CITY':
      return action.payload
    default:
      return store
  }
}

export default city
