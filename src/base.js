import Rebase from "re-base";
import firebase from "firebase";

// Initialize Firebase
// To initialize your Firebase app (assuming you already have set up a firebase console), you need the apiKey, the authDomain, and the databaseURL.
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDrXW2-on05e5GvW27JjyEsvMWjacXLX5w",
  authDomain: "catch-of-the-day-kb-ruado.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-kb-ruado.firebaseio.com"
});

//Initialize Rebase / Bind your Firebase database to Rebase
const base = Rebase.createClass(firebaseApp.database());

// This is a named export.
export { firebaseApp };

// This is a default export.
export default base;
