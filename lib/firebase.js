import * as firebase from 'firebase'

class Firebase {
    static init(){
      if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyC57BGCDLISl9FLkuFqeokqnMUeuLzdjEw",
            authDomain: "mejengalegends-c5146.firebaseapp.com/",
            databaseURL: "https://mejengalegends-c5146.firebaseio.com/",
            storageBucket: "mejengalegends-c5146.appspot.com",
        });
      }
    }
}

module.exports = Firebase
