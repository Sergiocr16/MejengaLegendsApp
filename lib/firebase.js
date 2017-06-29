import * as firebase from 'firebase'

class Firebase {
    static init(){
        firebase.initializeApp({
            apiKey: "AIzaSyC57BGCDLISl9FLkuFqeokqnMUeuLzdjEw",
            authDomain: "mejengalegends-c5146.firebaseapp.com/",
            databaseURL: "https://mejengalegends-c5146.firebaseio.com/",
        });
    }
}

module.exports = Firebase
