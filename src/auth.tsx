import { ReactNode, useEffect } from 'react'
import Identity from 'netlify-identity-widget'
import { createStore } from 'hooks'

Identity.init()

const store = createStore(Identity.currentUser())

export function useIdentityUser() {
  return store.hook()[0]
}

export function Authenticate({ children }: { children: ReactNode }) {
  const [user, updateUser] = store.hook()
  useEffect(() => {
    if (!user) {
      Identity.open('login')
      Identity.on('login', user => {
        Identity.close()
        updateUser(() => user)
      })
    } else {
      Identity.on('logout', () => {
        updateUser(() => null)
      })
    }
  }, [user])
  return user ? (children as JSX.Element) : null
}

Authenticate.Provider = store.Provider
