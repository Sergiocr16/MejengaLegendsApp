import React, {Component} from 'react'
import Player from '../../services/player'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Image,
  ToastAndroid
} from 'react-native'
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
export default class CreatePlayer extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      response: ''
    }
  }


  render(){
    return (
    <FadeInView style={{flex:1}} duration={30}>
      <Text>Formulario de jugador</Text>
      </FadeInView>
    )
  }
}

const styles = StyleSheet.create({
  row:{
    flexDirection:"row",
    flex:1
  },
  ligaBar:{
    backgroundColor:'black',
    borderRadius:30
  },
  white:{
    color:"white"
  },
  column:{
    flexDirection:"column",
    flex:1
  },
  flex1:{
    flex:1
  }
})
