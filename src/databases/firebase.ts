import admin, { ServiceAccount } from 'firebase-admin';

import firebaseConfig from '../config/firebase';

const initFirebase = () =>
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig.cert as ServiceAccount),
    databaseURL: firebaseConfig.url,
  });

initFirebase();

const firebaseDB = admin.firestore();

export default firebaseDB;
