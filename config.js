import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyCXzQjLlWbvHjJh7oIdUXH7MPTHNn_wNEE",
  authDomain: "story-hub-36d7b.firebaseapp.com",
  projectId: "story-hub-36d7b",
  storageBucket: "story-hub-36d7b.appspot.com",
  messagingSenderId: "884658044052",
  appId: "1:884658044052:web:27d92ce587cf214a430881",
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
