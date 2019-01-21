module.exports = {
  /** @type {Lambda} */
  handler(event, context, callback) {
    return callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: process.env.TEST_ENV,
        ...context.clientContext,
      }),
    })
  },
}
