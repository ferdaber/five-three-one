const firebase = require('firebase-admin')

let { FIREBASE_PROJECT_ID, FIREBASE_ADMIN_PRIVATE_KEY } = process.env
FIREBASE_ADMIN_PRIVATE_KEY = FIREBASE_ADMIN_PRIVATE_KEY.replace(/%n/g, '\n')

const app = firebase.initializeApp({
  credential: firebase.credential.cert({
    clientEmail: `firestore@${FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`,
    privateKey: `-----BEGIN PRIVATE KEY-----\n${FIREBASE_ADMIN_PRIVATE_KEY}\n-----END PRIVATE KEY-----\n`,
    projectId: FIREBASE_PROJECT_ID,
  }),
  databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
})

const db = app.firestore()

module.exports = {
  /** @type {Lambda} */
  async handler(event, context) {
    console.log({ FIREBASE_PROJECT_ID, FIREBASE_ADMIN_PRIVATE_KEY })
    const posts = await db.collection('posts').get()
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(posts.docs.map(doc => doc.data())),
    }
  },
}
