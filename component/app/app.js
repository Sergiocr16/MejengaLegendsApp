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

    this.state = {
      user: {},
      scene:'loading',
      player:{},
      backImg:'http://madisonvasoccer.com/wordpress/media/soccer-field-grass.jpg'
    }

  }
  componentDidMount() {
    FirebaseBasicService.findActiveById("users/players",firebase.auth().currentUser.uid,(player)=>{
        if(player.firstTime===true){
          this.setState({scene:"firstTime"})
        }else{
          this.setState({scene:"menu",initView:"partido"})
        }
        this.setState({player})
     },()=>{
       this.setState({initView:"superAdmin"})
       FirebaseBasicService.findActiveById("users/superAdmin",firebase.auth().currentUser.uid,(superAdmin)=>{
             this.setState({scene:"menu"})
             this.setState({player:superAdmin})
        },()=>{
        })
     })
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
      return(<Menu user={this.state.player} initView={this.state.initView} showFieldViewImg={()=>this.setState({backImg:'https://previews.123rf.com/images/darrenwhi/darrenwhi1005/darrenwhi100500047/6931190-Ilustraci-n-de-una-cancha-de-f-tbol-desde-arriba--Foto-de-archivo.jpg'})} hideFieldViewImg={()=>this.setState({backImg:'http://madisonvasoccer.com/wordpress/media/soccer-field-grass.jpg'})} sceneParent={this.state.scene} user={this.state.player}/>)
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
showHeader = () => {
  if(this.state.player.firstTime!==true || this.state.superAdmin!==undefined){
    return  <View style={{flex:1}}>
            <Header user={this.state.player} setSceneAccount={()=>this.setSceneAccount()} setSceneMenu={()=>this.setSceneMenu()} />
            </View>
  }
  return null;
}
  render(){
    return (
      <FadeInView style={styles.column} duration={600}>
        <Image style={{flex:1}} source={{uri: this.state.backImg}}>
        {this.showHeader()}
        <View style={{flex:12}}>
        {this.showView()}
        </View>
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
