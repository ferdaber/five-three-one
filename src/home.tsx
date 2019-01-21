import useLambda from 'hooks'
import React, { useEffect } from 'react'

interface Props {
  path?: string
}

export function Home(_: Props) {
  const testLambda = useLambda<{}>('test-lambda', 'GET')
  return (
    <div>
      Welcome to the app!
      <button
        onClick={async () => {
          const response = await testLambda()
          console.log(response)
        }}
      >
        Debug lambda
      </button>
    </div>
  )
}
