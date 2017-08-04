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
import Icon from 'react-native-vector-icons/FontAwesome';
import FadeInView from 'react-native-fade-in-view';
export default class Loader extends Component {
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
    <FadeInView style={styles.centerItems} duration={30}>
    <Icon name="circle-o-notch" size={50} color="white" />
    </FadeInView>
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
