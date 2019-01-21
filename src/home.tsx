import useRequest from 'hooks'
import React, { useEffect } from 'react'

interface Props {
  path?: string
}

export function Home(_: Props) {
  const testLambda = useRequest('/.netlify/functions/test-lambda', 'GET')
  useEffect(() => {
    testLambda().then(response => console.log((response as any).text))
  }, [])
  return <div>Welcome to the app!</div>
}
