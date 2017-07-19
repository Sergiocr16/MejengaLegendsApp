import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
  KeyboardAvoidingView
} from 'react-native'
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
import FirebaseBasicService from '../../lib/firebaseBasicService'
import CreatePlayer from '../player/createPlayer'
import Header from './header'
import Loader from './loading'
import Menu from './menu'

export default class App extends Component {
  constructor(props){
        super(props)
    FirebaseBasicService.findActiveById("users/players",firebase.auth().currentUser.uid,(player)=>{
        if(player.firstTime===true){
          this.setState({scene:"firstTime"})
        }else{
          this.setState({scene:"menu"})
        }
        this.setState({player})
     })
    this.state = {
      user: {},
      scene:'loading',
      player:''
    }
    this.signOut = this.signOut.bind(this)
  }

  async signOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
  }
 showView(){
  switch (this.state.scene) {
    case 'firstTime':
      return(<CreatePlayer style={{flex:10}}/>)
      break;
    case 'menu':
      return(<Menu/>)
      break;
    case 'loading':
        return(<Loader/>)
        break;
    default:
  }
 }

  render(){
    return (
      <FadeInView style={styles.flex1} duration={600}>
      <Header/>
      {this.showView()}
      <TouchableOpacity onPress={this.signOut}><Text>cerrarSesion</Text></TouchableOpacity>
     </FadeInView>
    )
  }
}

const styles = StyleSheet.create({
 row:{
   flexDirection:"row",
   flex:2
 },
 ligaBar:{
   backgroundColor:'black',
 },
 white:{
   color:"white"
 },
 column:{
   flexDirection:"column",
   flex:1
 },
 flex1:{
   flex:5
 }
})
