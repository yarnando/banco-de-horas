import firebase from 'firebase'
import '@firebase/firestore'
import ReduxSagaFirebase from 'redux-saga-firebase'

const config = {
    apiKey: "AIzaSyCp5eDtCcqRQ0VndOj7ggUJM5xxSl-rsIk",
    authDomain: "comptime-28c72.firebaseapp.com",
    databaseURL: "https://comptime-28c72.firebaseio.com",
    projectId: "comptime-28c72",
    storageBucket: "",
    messagingSenderId: "579179215063",
    appId: "1:579179215063:web:3ed5370b9393ff350f5892"
  };

  
const reduxSagaFirebase = new ReduxSagaFirebase(firebase.initializeApp(config))

export default reduxSagaFirebase