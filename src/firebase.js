// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseConfig from './firebaseConfig';

// firebase init
const firebaseApp = firebase.initializeApp(firebaseConfig);

// utils
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

// collections ref
const usersCollection = db.collection('users');

export { db, auth, usersCollection };
