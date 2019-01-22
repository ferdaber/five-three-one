import { Handler, APIGatewayEvent } from 'aws-lambda'

declare module 'aws-lambda' {
  export interface ClientContext {
    identity: {
      url: string
      token: string
    }
    user: {
      app_metadata: {
        provider: 'string'
      }
      email: string
      exp: number
      sub: string
      user_metadata: {
        full_name: string
      }
    }
  }
}

interface LambdaResponse {
  isBase64Encoded: boolean
  statusCode: number
  headers: Record<string, string>
  body: any
}

declare global {
  interface Lambda extends Handler<APIGatewayEvent, LambdaResponse> {}
}
