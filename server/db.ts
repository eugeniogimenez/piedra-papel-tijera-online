console.log("process.env.DATABASE_URL: ", process.env.DATABASE_URL);

import * as admin from "firebase-admin";
import * as firebaseKey from "../key.json";

admin.initializeApp({
  credential: admin.credential.cert(firebaseKey as any),
  databaseURL: process.env.DATABASE_URL,
});

const firestore = admin.firestore();
const rtdb = admin.database();

export { firestore, rtdb };

// const serviceAccount = {
//   type: "service_account",
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY,
//   client_email: process.env.FIREBASE_CLIENT_MAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
// };

// admin.initializeApp({
//   credential: admin.credential.cert(firebaseKey as any),
//   databaseURL: process.env.DATABASE_URL,
// });
