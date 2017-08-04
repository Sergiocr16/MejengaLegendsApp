import React, {Component} from 'react'
import Player from '../../services/player'
import Icon from 'react-native-vector-icons/FontAwesome';
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
export default class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
       scene:'loading',
       player:{ nombre: '',liga:'',PrimerApellido:'',score:0}
    }
   Player.getCurrentPlayer((player)=>{
    this.setState({player})
   })

  }

  render(){
    return (
      <View>
      <View style={styles.row}>
        <View style={styles.ligaBar}>
         <Text style={styles.ligaBarText}> <Icon name="diamond" size={16} color="#00BCD4" /> {this.state.player.liga}</Text>
         <Text style={styles.ligaBarText}><Icon name="trophy" size={16} color="yellow" /> {this.state.player.score}</Text>
        </View>
        <View style={styles.accountnfoBox}>
         <TouchableOpacity  style={styles.home} onPress={this.props.setSceneMenu}><Icon name="home" size={22} color="#BDBDBD" /></TouchableOpacity>
         <TouchableOpacity style={styles.notifications}><Icon name="bell" size={18} color="#BDBDBD" /></TouchableOpacity>
         <TouchableOpacity style={styles.accountButton} onPress={this.props.setSceneAccount}>
         <Text style={styles.accountButtonText}><Icon name="user" size={15} color="#FFFFFF"/> {this.state.player.nombre}</Text>
         </TouchableOpacity>
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
  },
  notifications:{
    flex:2,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    paddingVertical:5,
    borderRadius:50,
    marginRight:10,
    marginLeft:5
  },
  home:{
    flex:2,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    borderRadius:50,
    paddingVertical:5,
    marginRight:5,
    marginLeft:10
  },
  ligaBarText:{
    color:'white',
    borderRightColor:'gray',
    borderWidth:1,
    flex:1,
    textAlign:'center',
  },
  ligaBar:{
    flex:6,
    backgroundColor:'black',
    height:30,
    alignItems:'center',
    justifyContent:'center',
    borderTopRightRadius:9,
    borderBottomRightRadius:9,
    flexDirection:'row',
  },
  accountButton:{
    marginRight:15,
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:9,
    backgroundColor:'#64DD17',
    flex:3,

  },
  accountButtonText:{
    color:'white',
    textAlign:'center'
  },
  accountnfoBox:{
    height:30,
    flex:5,
    flexDirection:'row'
  },
  white:{
    color:'white'
  },
  row:{
    flexDirection:'row',
    flex:1,
    height:30,
    paddingTop:2
  }

})
