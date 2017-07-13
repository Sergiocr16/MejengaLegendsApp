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

import FadeInView from 'react-native-fade-in-view';
export default class Header extends Component {
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
      <View >
      <View >
        <View style={styles.ligaBar}>
         <Text style={styles.white}>Header</Text>
        </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centerItems:{
     alignItems:'center',
     justifyContent:'center',
    flex:1
  },

})
