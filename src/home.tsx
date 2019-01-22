import useLambda from 'hooks'
import React from 'react'

interface Props {
  path?: string
}

export function Home(_: Props) {
  const db = useLambda<any[]>('db', 'GET')
  return (
    <div>
      Welcome to the app!
      <button
        onClick={async () => {
          const response = await db()
          console.log(response)
        }}
      >
        Debug lambda
      </button>
    </div>
  )
}
