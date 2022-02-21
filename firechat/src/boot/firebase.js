import { boot } from 'quasar/wrappers'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA2SSiEmNU0MjtQUH5MTAWOpjzjMGpE4eg",
  authDomain: "chatapp-eb11c.firebaseapp.com",
  projectId: "chatapp-eb11c",
  storageBucket: "chatapp-eb11c.appspot.com",
  messagingSenderId: "2759662452",
  appId: "1:2759662452:web:6369f8ed543cea846dea21"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { db, auth, timestamp };



// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
})
