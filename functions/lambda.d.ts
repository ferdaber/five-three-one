type LambdaResponse = {
  isBase64Encoded: boolean
  statusCode: number
  headers: Record<string, string>
  body: any
}

type Lambda = import('aws-lambda').Handler<import('aws-lambda').APIGatewayEvent, LambdaResponse>
