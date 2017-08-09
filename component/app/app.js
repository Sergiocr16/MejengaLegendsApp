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
import Account from '../account/account'
import Header from './header'
import Loader from './loading'
import Menu from './menu'

export default class App extends Component {
  constructor(props){
        super(props)
    FirebaseBasicService.findActiveById("users/players",firebase.auth().currentUser.uid,(player)=>{
      console.log(player)
        if(player.firstTime===true){
          this.setState({scene:"firstTime"})
        }else{
          this.setState({scene:"account"})
        }
        this.setState({player})
     })
    this.state = {
      user: {},
      scene:'loading',
      player:{nombre:''}
    }

  }



  setSceneAccount = () =>{
   this.setState({scene:'account'})
  }

  setSceneMenu = () =>{
   this.setState({scene:'menu'})
  }

 showView(){
  switch (this.state.scene) {
    case 'firstTime':
      return(<CreatePlayer/>)
      break;
    case 'menu':
      return(<Menu user={this.state.player}/>)
      break;
    case 'loading':
        return(<Loader/>)
        break;
    case 'account':
        return(<Account user={this.state.player}/>)
        break;
    default:
  }
 }

  render(){
    return (
      <FadeInView style={styles.column} duration={600}>
        <Image style={{flex:1}} source={{uri: 'http://madisonvasoccer.com/wordpress/media/soccer-field-grass.jpg'}}>
        <Header setSceneAccount={()=>this.setSceneAccount()} setSceneMenu={()=>this.setSceneMenu()} />
        {this.showView()}
        </Image>
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
    flex:1
 },
 flex1:{
   flex:1,
   flexDirection:"column",
 }
})
