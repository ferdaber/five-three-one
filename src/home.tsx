import React, { useRef, useEffect } from 'react'
import { useIdentityUser } from 'auth'

interface Props {
  path?: string
}

export function Home(_: Props) {
  const didReportUser = useRef(false)
  const user = useIdentityUser()
  useEffect(() => {
    if (didReportUser.current) return
    if (user) {
      didReportUser.current = true
      console.log(user)
    }
  }, [user])
  return <div>Welcome to the app!</div>
}
