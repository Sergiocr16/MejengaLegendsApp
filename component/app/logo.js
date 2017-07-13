import React, {Component} from 'react'
import Player from '../../services/player'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid
} from 'react-native'

import FadeInView from 'react-native-fade-in-view';
export default class Logo extends Component {
  constructor(props){
    super(props)
  }


  render(){
    return (
      <FadeInView style={{flex:1}} duration={300}>
      <TouchableOpacity style={{flex:1}} onPress={()=>this.props.showInitialView()}>
      <FadeInView style={styles.centerItems} duration={600}>
      <Image style={styles.bgImage} source={{uri: 'http://logonoid.com/images/firefly-logo.png'}}>
      </Image>
      </FadeInView>
      </TouchableOpacity>
      </FadeInView>
    )
  }
}

const styles = StyleSheet.create({
  centerItems:{
     flex:1,
     padding:120
  },
  bgImage:{
    flex:1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
})
