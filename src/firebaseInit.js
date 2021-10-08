import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
const firebaseApp = firebase.initializeApp(firebaseConfig);

// utils
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

// collections ref
const usersCollection = db.collection('users');

export { db, auth, usersCollection };
