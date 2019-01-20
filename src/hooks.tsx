import produce from 'immer'
import React, { createContext, ReactNode, useReducer, Dispatch, useContext } from 'react'
import { tuple } from 'util'

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
      return tuple(useContext(State), useContext(Updater))
    },
  }
}
