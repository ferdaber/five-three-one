import useLambda from 'hooks'
import React from 'react'

interface Props {
  path?: string
}

export function Home(_: Props) {
  const firebasedb = useLambda<any[]>('firebasedb', 'GET')
  return (
    <div>
      Welcome to the app!
      <button
        onClick={async () => {
          const response = await firebasedb()
          console.log(response)
        }}
      >
        Debug lambda
      </button>
    </div>
  )
}
