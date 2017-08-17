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
    console.log(AppState.currentState)
  }
   componentDidMount(){
     SoundManager.playAmbienteEstadio()
   }
  render(){
    return (
      <FadeInView style={{flex:1,backgroundColor:'white'}} duration={300}>
      <Image style={styles.bgImage} source={{uri: 'https://i.ytimg.com/vi/qe1CxIA-65A/maxresdefault.jpg'}}>
     <View style={styles.centerItems}>
      <Text style={styles.mainTitle}>Mejenga Legends</Text>
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
}

const styles = StyleSheet.create({
  centerItems:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
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
    marginTop:90,
    borderColor:'rgba(56, 45, 45,0.5)',
    backgroundColor:'rgba(255,255,255,0.5)',
    borderWidth: 6,
    height:80,
    width:80,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center'
  }
})
