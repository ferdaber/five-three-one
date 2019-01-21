import produce from 'immer'
import React, { createContext, Dispatch, ReactNode, useReducer } from 'react'
import { tuple } from 'utils'
import { useIdentityUser } from 'auth'

export function createStore<TStore>(initialState: TStore) {
  interface Producer {
    (state: TStore): TStore | void
  }
  const State = createContext(initialState)
  const Updater = createContext<Dispatch<Producer>>(() => {
    if (process.env.NODE_ENV === 'development')
      throw new Error('store dispatcher called without an enclosing provider context.')
  })

  return {
    Provider({ children }: { children: ReactNode }) {
      const [state, dispatch] = useReducer<TStore, Producer>(produce, initialState)
      return (
        <Updater.Provider value={dispatch}>
          <State.Provider value={state}>{children}</State.Provider>
        </Updater.Provider>
      )
    },
    hook() {
      return tuple(React.useContext(State), React.useContext(Updater))
    },
  }
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export default function useRequest(url: string, method: Method, body?: any) {
  const user = useIdentityUser()
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${user!.token!.access_token}`,
  }
  const init: RequestInit = {
    headers,
    method,
  }
  if (body) {
    headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(body)
  }
  return async function request(): Promise<unknown> {
    const response = await fetch(url, init)
    return response.status === 200 && response.headers['Content-Type'] === 'application/json'
      ? response.json()
      : response
  }
}
