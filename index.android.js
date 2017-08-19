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
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
  Image
} from 'react-native';
import * as firebase from 'firebase'
import Auth from './component/auth/auth'
import App from './component/app/app'
import Logo from './component/app/logo'
import Welcome from './component/app/welcomeScreen'
import Firebase from './lib/firebase'
import SoundManager from './services/soundManager'

// import TeamComponent from './component/team/teamCmp'
import FirebaseBasicService from './lib/firebaseBasicService'
import Entities from './lib/fireBaseEntities'

export default class MejengaLegendsApp extends Component {

  constructor(props){
    super(props)
    Firebase.init()
    this.state = {
      initialView : 'Logo',
      userLoaded: false
    }
    console.ignoredYellowBox = [ 'Setting a timer' ]
    console.disableYellowBox = true;
    this.getInitialView = this.getInitialView.bind(this)
    this.showInitialView = this.showInitialView.bind(this)
    SoundManager.loadSounds();
      SoundManager.playLogoSound()
  }

  componentDidMount() {
    setTimeout(()=>{
     SoundManager.playLogoSound()
    },20)
      setTimeout(()=>{this.setState({initialView:'Welcome'})
       SoundManager.playAmbienteEstadio()
    },3000)
  }
  async getInitialView(){
     await firebase.auth().onAuthStateChanged( async (user) => {
      let newInitialView = 'Login';
      if(user){
        if (!user.emailVerified) {
          ToastAndroid.show('Verifica tu cuenta en tu correo para poder inciar sesión', ToastAndroid.LONG);
          firebase.auth().signOut().then(function() {
            newInitialView = 'Login'
          }, function(error) {
            // An error happened.
          });
        }else{
           newInitialView = 'App'
        }
      }else{
        initialView = 'Login'
      }
      this.setState({
        userLoaded: true,
        initialView: newInitialView
      })

    })
  }

  showInitialView(){
    switch (this.state.initialView) {
      case 'App':
      return (<App/>)
      break;
      case 'Login':
      return (<Auth/>)
      break;
      case 'Logo':
      return (<Logo showInitialView={()=>{this.setState({initialView:"Welcome"})}}/>)
      break;
      case 'Welcome':
      return (<Welcome showInitialView={()=>this.getInitialView()}/>)
      break;
      default:
    }
  }
  render() {
    return (
      <View style={{flexDirection:'column',flex:1,backgroundColor:'#EEEEEE'}}>
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
    flex: 4,
    padding:10,
    backgroundColor: 'white',
  },
  teamContainer: {


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
