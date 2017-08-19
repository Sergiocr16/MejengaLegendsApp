import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
  KeyboardAvoidingView,
  AppState
} from 'react-native'
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
import FirebaseBasicService from '../../lib/firebaseBasicService'
import CreatePlayer from '../player/createPlayer'
import NotificationsByPlayer from '../notification/notificationsByPlayer';
import Account from '../account/account'
import TeamService from '../../services/team';
import Notification from '../../services/notification';
import Header from './header'
import Loader from './loading'
import Menu from './menu'
import SoundManager from '../../services/soundManager'

export default class App extends Component {
  constructor(props){
        super(props)

    this.state = {
      user: {},
      scene:'loading',
      notifications:[],
      backImg:'http://madisonvasoccer.com/wordpress/media/soccer-field-grass.jpg',
      player:{},
      appState: AppState.currentState

    }

  }



    componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
      if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!')
        this.setState({scene:'menu'})
        SoundManager.playBackgroundMusic();
      }else{
        console.log('App has come to the background!')
        SoundManager.pauseBackgroundMusic();
      }
      this.setState({appState: nextAppState});
    }


  componentDidMount() {
      AppState.addEventListener('change', this._handleAppStateChange);
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
    //  var notificationsafaf = [{equipoGUID:'1502971810816',jugadorGUID:'PcLNztdnI7eERNrQxVXuAl8hjt22',titulo:'Invitación a unirte a equipo',message:'unete al equoo',tipo:'1',nombreEquipo:'Barcelona'}]
     //
    //  firebase.database().ref('playerNotifications/active/PcLNztdnI7eERNrQxVXuAl8hjt22/').set(notificationsafaf)
     Notification.getMyNotifications((notifications)=>{
       if(notifications){
         this.setState({notifications:notifications})
       }
     },()=>{
     })

      SoundManager.startBackgroundMusic();
  }


  setSceneAccount = () =>{
    SoundManager.playSwitchClick();
   this.setState({scene:'account'})
  }

  setSceneMenu = () =>{
    SoundManager.playSwitchClick();
   this.setState({scene:'menu'})
  }
  setSceneNotifications = () =>{
   this.setState({scene:'notifications'})

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
    case 'notifications':
        return(<NotificationsByPlayer user={this.state.player} estadoNotification={this.state.estadoNotification} back={()=>this.setSceneMenu()} notifications={this.state.notifications} />)
        break;
    default:
  }
 }
showHeader = () => {
  if(this.state.player.firstTime!==true || this.state.superAdmin!==undefined){
    return  <View style={{flex:1}}>
            <Header user={this.state.player} notifications={this.state.notifications} setSceneAccount={()=>this.setSceneAccount()} setSceneNotifications={()=>this.setSceneNotifications()} setSceneMenu={()=>this.setSceneMenu()} />
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
