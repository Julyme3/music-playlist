import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAAFC79uVfbCiZthe1ON6ZTCzrTuPayQwQ",
  authDomain: "music-playlist-8b7ff.firebaseapp.com",
  projectId: "music-playlist-8b7ff",
  storageBucket: "music-playlist-8b7ff.appspot.com",
  messagingSenderId: "68170853470",
  appId: "1:68170853470:web:4de8a594437fe83df2d8cf",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
