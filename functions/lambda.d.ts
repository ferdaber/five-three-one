import { Handler, APIGatewayEvent } from 'aws-lambda'

interface LambdaResponse {
  isBase64Encoded: boolean
  statusCode: number
  headers: Record<string, string>
  body: any
}

declare global {
  interface Lambda extends Handler<APIGatewayEvent, LambdaResponse> {}
}
