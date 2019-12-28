import reducers from './reducers'

import { createStore } from 'redux'

const store = createStore(reducers)

export type ReduxStore = typeof store

export default store
