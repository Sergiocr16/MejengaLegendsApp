/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  StatusBar,
  ToastAndroid
} from 'react-native';
import * as firebase from 'firebase'
import Auth from './component/auth/auth'
import MainMenu from './component/menu/mainMenu'
import Firebase from './lib/firebase'
import FirebaseBasicService from './lib/firebaseBasicService'
import Entities from './lib/fireBaseEntities'
export default class MejengaLegendsApp extends Component {

  constructor(props){
    super(props)
    Firebase.init()
    this.state = {
      initialView : null,
      userLoaded: false
    }
    this.getInitialView()
    this.getInitialView = this.getInitialView.bind(this)
  }
  async getInitialView(){
    
    await firebase.auth().onAuthStateChanged((user) => {
      let initialView = 'Login';
      if(user){
        if (!user.emailVerified) {
          ToastAndroid.show('Verifica tu cuenta en tu correo para poder inciar sesión', ToastAndroid.LONG);
          firebase.auth().signOut().then(function() {
            initialView = 'Login'
          }, function(error) {
            // An error happened.
          });
        }else{
          initialView = 'App'
        }
      }else{
        initialView = 'Login'
      }
      this.setState({
        userLoaded: true,
        initialView
      })

    })
  }

  showInitialView(){
    switch (this.state.initialView) {
      case 'App':
      return (<MainMenu/>)
      break;
      case 'Login':
      return (<Auth/>)
      break;
      default:

    }
  }
  render() {
    return (
      <View style={{flexDirection:'column',flex:1}}>
      <StatusBar hidden={true} />
      {this.showInitialView()}
      </View>
    );
  }
}
// <View style={styles.container}>
//   <Text style={styles.welcome}>
//     Welcome to React Native with FireBase!
//   </Text>
//   <Text style={styles.instructions}>
//     To get started, edit index.android.js
//   </Text>
//   <Text style={styles.instructions}>
//     Double tap R on your keyboard to reload,{'\n'}
//     Shake or press menu button for dev menu
//   </Text>
// </View>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MejengaLegendsApp', () => MejengaLegendsApp);
