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
import SoundManager from '../../services/soundManager';
export default class Logo extends Component {
  constructor(props){
    super(props)
    this.state = {
      showLogo:false
    }
  }

componentDidMount(){
  setTimeout(()=>{
    this.setState({showLogo:true})
  },1000)
}
showlogo =() => {
if(this.state.showLogo){
    return <FadeInView style={styles.centerItems} duration={600}>
    <Image style={styles.bgImage} source={{uri: 'http://logonoid.com/images/firefly-logo.png'}}>
    </Image>
    </FadeInView>
}
return null;
}
  render(){
    return (
      <FadeInView style={{flex:1,backgroundColor:'white'}} duration={300}>
      <View style={{flex:1}}>
       {this.showlogo()}
      </View>
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
