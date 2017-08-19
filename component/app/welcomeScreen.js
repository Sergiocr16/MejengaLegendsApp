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
      scene: 'blackScreen'
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
      <FadeInView style={{flex:1,backgroundColor:'black'}} duration={700}>
      <Image style={styles.bgImage} source={{uri: 'http://i.imgur.com/oBCPBYS.jpg'}}>
     <View style={styles.centerItems}>
     <TouchableOpacity style={styles.initButton} onPress={()=>{
       SoundManager.playInitClickSound()
      SoundManager.stopAmbienteEstadio()
       this.props.showInitialView()}}>
     </TouchableOpacity>
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
    borderColor:'rgba(56, 45, 45,0.5)',
    backgroundColor:'rgba(255,255,255,0.5)',
    borderWidth: 6,
    height:90,
    width:90,
    borderRadius:100,
    marginRight:50,
    marginBottom:20,
    justifyContent:'center',
    alignItems:'flex-end'
  }
})
