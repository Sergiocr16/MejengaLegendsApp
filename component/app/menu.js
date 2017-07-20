import React, {Component} from 'react'
import Player from '../../services/player'
import CreateTeam from '../team/createTeam'
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
export default class Menu extends Component {
  constructor(props){
    super(props)
    this.state = {
      scene: 'buttons'
    }
      this.setSceneButtons = this.setSceneButtons.bind(this)
      this.setSceneCreateTeam = this.setSceneCreateTeam.bind(this)
  }

  setSceneButtons(){
   this.setState({scene:'buttons'})
  }
  setSceneCreateTeam(){
   this.setState({scene:'createTeam'})
  }
  menuButtons(){
    return(
      <View>
        <TouchableOpacity onPress={this.setSceneButtons}>
         <Text>Mi ruta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.setSceneCreateTeam}>
         <Text>Crear equipo</Text>
        </TouchableOpacity>
      </View>
    )
  }
  showScene(){
    switch (this.state.scene) {
      case 'buttons':
        return this.menuButtons();
        break;
      case 'createTeam':
        return (<CreateTeam style={{flex:10}}/>);
        break;
      default:

    }
  }
  render(){
    return (
      <FadeInView style={{flex:1}} duration={300}>
      {this.showScene()}
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
