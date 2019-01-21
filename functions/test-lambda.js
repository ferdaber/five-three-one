/**
 *
 * @param {import('aws-lambda').APIGatewayEvent} event
 * @param {import('aws-lambda').Context} context
 * @param {import('aws-lambda').Callback} callback
 */
function handler(event, context, callback) {
  return callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: process.env.TEST_ENV,
    }),
  })
}
