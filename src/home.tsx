import useLambda from 'hooks'
import React, { useEffect } from 'react'

interface Props {
  path?: string
}

export function Home(_: Props) {
  const testLambda = useLambda<{}>('test-lambda', 'GET')
  useEffect(() => {
    testLambda().then(response => console.log(response))
  }, [])
  return <div>Welcome to the app!</div>
}
