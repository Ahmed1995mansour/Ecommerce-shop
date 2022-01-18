// Import the functions you need from the SDKs you need
// import * as firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import * as firebase from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDLBTzd_ld-L5t7-jNyEtc8H1BK7VDJDLQ',
  authDomain: 'shop-3b1fd.firebaseapp.com',
  projectId: 'shop-3b1fd',
  storageBucket: 'shop-3b1fd.appspot.com',
  messagingSenderId: '343177141681',
  appId: '1:343177141681:web:0c0d18a665b4a4d24f7190',
};

// Initialize Firebase

initializeApp(firebaseConfig);

// export
export const auth = firebase.getAuth();
export const sendSignInLinkToEmail = firebase.sendSignInLinkToEmail;
export const signInWithEmailLink = firebase.signInWithEmailLink;
export const updatePassword = firebase.updatePassword;
export const signOut = firebase.signOut;
export const signInWithEmailAndPassword = firebase.signInWithEmailAndPassword;
export const GoogleAuthProvider = firebase.GoogleAuthProvider;
export const signInWithPopup = firebase.signInWithPopup;
export const sendPasswordResetEmail = firebase.sendPasswordResetEmail;
