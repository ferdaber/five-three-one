const firebase = require('firebase')

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_PROJECT_ID + '.firebaseapp.com',
  databaseURL: 'https://' + process.env.FIREBASE_PROJECT_ID + '.firebaseio.com',
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_PROJECT_ID + '.appspot.com',
  messagingSenderId: '192610615089',
}

const app = firebase.initializeApp(config)
const db = app.firestore()

module.exports = {
  /** @type {Lambda} */
  async handler(event, context) {
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
