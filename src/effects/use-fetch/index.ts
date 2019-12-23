import { useReducer, useEffect, useState, Reducer } from 'react'

type Action<P> =
  | { type: 'FETCH_INIT' }
  | {
      type: 'FETCH_SUCCESS'
      payload: P
    }
  | {
      type: 'FETCH_FAILURE'
    }

type State<P> = {
  loading: boolean
  data: null | P
  error: boolean
}

const dataFetchReducer = <P>(state: State<P>, action: Action<P>): State<P> => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      throw new Error(
        `Unknown action type received 
        for dataFetchReducer.
        Please make sure you are passing
        one of the following actions:
          * FETCH_INIT
          * FETCH_SUCCESS
          * FETCH_FAILURE
          :`
      )
  }
}

type useFetchResult<P> = {
  loading: boolean
  data: null | P
  error: boolean
  reload: () => void
  retries: number
  fetchLazy: (url: string) => void
}

export const useFetch = <P>(url: undefined | string): useFetchResult<P> => {
  const initialState = {
    loading: false,
    data: null,
    error: false
  }
  const [state, dispatch] = useReducer<Reducer<State<P>, Action<P>>>(
    dataFetchReducer,
    initialState
  )

  const [reload, setReload] = useState<number>(0)
  const [link, setLink] = useState<undefined | string>(url)

  useEffect(() => {
    if (link) {
      dispatch({ type: 'FETCH_INIT' })
      fetch(link)
        .then(response => {
          return response.json()
        })
        .then((data: P) => {
          dispatch({ type: 'FETCH_SUCCESS', payload: data })
        })
        .catch(error => {
          if (error.name === 'AbortError') {
            console.log('User aborted the fetch')
          } else {
            console.log('ERROR', error.name)
            dispatch({ type: 'FETCH_FAILURE' })
          }
        })
    }
  }, [link, reload])

  return {
    ...state,
    reload: (): void => {
      setReload(reload + 1)
    },
    retries: reload,
    fetchLazy: (url: string): void => {
      setLink(url)
    }
  }
}
