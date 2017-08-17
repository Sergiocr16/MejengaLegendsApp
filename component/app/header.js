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
import RenderIf from '../app/renderIf';
import FadeInView from 'react-native-fade-in-view';
export default class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
       scene:'loading',
       player:{ nombre: '',liga:'',PrimerApellido:'',score:0}
    }
  }
 componentDidMount(){
   Player.getCurrentPlayer((player)=>{
    this.setState({player})
   })
 }
  render(){
    return (
      <View style={{flex:1}}>
      <View style={styles.row}>
        <View style={styles.ligaBar}>
         <Text style={[styles.ligaBarText,{borderWidth:1}]}> <Icon name="diamond" size={16} color="#00BCD4" /> {this.state.player.liga}</Text>
         <Text style={styles.ligaBarText}><Icon name="trophy" size={16} color="yellow" /> {this.state.player.score}</Text>
        </View>
        <View style={styles.accountnfoBox}>
         <TouchableOpacity  style={styles.home} onPress={this.props.setSceneMenu}><Icon name="home" size={22} color="#BDBDBD" /></TouchableOpacity>


        {RenderIf(this.props.notificationsQuantity==0,
             <TouchableOpacity style={[styles.notifications,{alignItems:'center'}]}><Icon name="bell" size={18} color="#BDBDBD" /></TouchableOpacity>
         )}
        {RenderIf(this.props.notificationsQuantity!==0,
           <TouchableOpacity onPress={this.props.setSceneNotifications} style={[styles.notifications,{flexDirection:'row'}]}>
              <View style={styles.notificationsBellIcon}>
                  <Text style={{textAlign:'center'}}>
                      <Icon name="bell" size={20} color="#1565C0"/>
                  </Text>
              </View>
              <View style={styles.notificationsQuantity}>
                  <Text style={styles.notificationText}>{this.props.notifications.length}</Text>
              </View>
           </TouchableOpacity>
         )}

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
    backgroundColor:'white',
    borderRadius:50,
    marginRight:10,
    marginLeft:5,
    justifyContent:'center',
  },
  notificationsQuantity:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#1565C0',
    flex:1,
    padding:2,
    borderTopRightRadius:50,
      borderBottomRightRadius:50,
  },
  notificationsBellIcon:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    flex:2,
    padding:2,
    borderTopLeftRadius:50,
    borderBottomLeftRadius:50,
  },
  notificationText:{
    color:'white',
    fontWeight:'bold',
    textAlign:'center',
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

    flex:1,
    textAlign:'center',
  },
  ligaBar:{
    flex:6,
    backgroundColor:'black',
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
    backgroundColor:'#388E3C',
    flex:3,
    justifyContent:'center',
    alignItems:'center'
  },
  accountButtonText:{
    color:'white',
    textAlign:'center',

  },
  accountnfoBox:{
    flex:5,
    flexDirection:'row'
  },
  white:{
    color:'white'
  },
  row:{
    flexDirection:'row',
    flex:1,
    paddingTop:2
  }

})
