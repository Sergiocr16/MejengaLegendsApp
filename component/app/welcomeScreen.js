import React, {Component} from 'react'
import Player from '../../services/player'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
  AppState
} from 'react-native'

import FadeInView from 'react-native-fade-in-view';
import SoundManager from '../../services/soundManager'

// Load the sound file 'whoosh.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.

export default class Welcome extends Component {
  constructor(props){
    super(props)
    this.state ={
      scene: 'blackScreen',
       appState: AppState.currentState
    }
  }
  showScene = () => {
    switch (this.state.scene) {
      case 'blackScreen':
        return this.showBlackScreen();
        break;
      case 'wellcomeScreen':
        return this.showWellcomeScreen();
        break;
      default:

    }
  }
  componentDidMount(){
    AppState.addEventListener('change', this._handleAppStateChange);
}
componentWillUnmount() {
  AppState.removeEventListener('change', this._handleAppStateChange);
}

_handleAppStateChange = (nextAppState) => {
  if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    console.log('App has come to the foreground!')
    SoundManager.playAmbienteEstadio();
  }else{
    console.log('App has come to the background!')
    SoundManager.pauseAmbienteEstadio();
  }
  this.setState({appState: nextAppState});
}
  changeScene=()=>{
  setTimeout(()=>{ this.setState({scene:'wellcomeScreen'}) }, 2000);

  }
    showBlackScreen = ()=>{
      return (
        <View style={{flex:1,backgroundColor:'black'}} >
        <View duration={300}>
        {this.changeScene()}
        </View>
        </View>
      )
    }

  showWellcomeScreen = ()=>{
    return (
      <FadeInView style={{flex:1,backgroundColor:'white'}} duration={300}>
      <Image style={styles.bgImage} source={{uri: 'http://i.imgur.com/68R2RJh.jpg'}}>
     <View style={styles.centerItems}>
     <Image style={{height:80,width:80,marginRight:80,marginBottom:30}} source={{uri: 'http://www.inpris.co//wp-content/uploads/2016/07/loading-circles.gif'}}>
     <TouchableOpacity style={styles.initButton} onPress={()=>{
       SoundManager.playInitClickSound()
       SoundManager.stopAmbienteEstadio()
       this.props.showInitialView()}}>
     </TouchableOpacity>
     </Image>
     </View>
      </Image>
      </FadeInView>
    )
  }

  render(){
    return (
      <View style={{flex:1,backgroundColor:'black'}}>
        {this.showScene()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centerItems:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  bgImage:{
    flex:1,
  },
  mainTitle:{
    color:"black",
    fontSize:50
  },
  whiteFont:{
    color:'white'
  },
  initButton:{
    borderColor:'white',
    borderWidth: 4,
    height:33,
    width:33,
    marginTop:26,
    marginLeft:24,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center'
  }
})