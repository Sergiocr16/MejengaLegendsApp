import React, {Component} from 'react'
import Player from '../../services/player'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import SoundManager from '../../services/soundManager';
const AnimatedIcon = Animatable.createAnimatableComponent(Icon)
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
    }
  }

 componentDidMount(){
   Player.getCurrentPlayer((player)=>{
    this.setState({player})

  },()=>{})
 }
  showNotificationStyle(){
    if(this.props.notifications.length==0){return(
      <TouchableOpacity onPress={this.props.setSceneNotifications} style={[styles.notifications,{alignItems:'center'}]}><Icon name="bell" size={18} color="#BDBDBD" /></TouchableOpacity>
    )} else if(this.props.notifications.length>0){

        return(
          <TouchableOpacity activeOpacity={1}  onPress={this.props.setSceneNotifications} style={[styles.notifications,{flexDirection:'row'}]}>
             <View style={[styles.notificationsBellIcon,{backgroundColor:'#FAFAFA'}]}>
              <Image style={{height:28,width:28,marginLeft:3}} source={{uri: 'https://gifyu.com/images/ezgif.com-crop1729f.gif'}}>
           </Image>
             </View>
             <View style={styles.notificationsQuantity}>
                 <Text style={styles.notificationText}>{this.props.notifications.length}</Text>
             </View>
          </TouchableOpacity>
        )

    }



  }
defineHeader = () =>{
  if(this.props.user.rol === "player"){
    return (
      <View style={{flex:1}}>
      <View style={styles.row}>
        <View style={styles.ligaBar}>
         <Text style={[styles.ligaBarText,{borderWidth:1}]}> <Icon name="diamond" size={16} color="#00BCD4" /> {this.props.user.liga}</Text>
         <Text style={styles.ligaBarText}><Icon name="trophy" size={16} color="yellow" /> {this.props.user.score}</Text>
        </View>
        <View style={styles.accountnfoBox}>
         <TouchableOpacity  style={styles.home} onPress={this.props.setSceneMenu}><Icon name="home" size={22} color="#BDBDBD" /></TouchableOpacity>

         {this.showNotificationStyle()}

         <TouchableOpacity style={styles.accountButton} onPress={this.props.setSceneAccount}>
         <Text style={styles.accountButtonText}><Icon name="user" size={15} color="#FFFFFF"/> {this.props.user.nombre}</Text>
         </TouchableOpacity>
        </View>
        </View>
      </View>
    )
  }else if(this.props.user.rol === "superAdmin"){
    return (
      <View style={{flex:1}}>
      <View style={styles.row}>
        <View style={styles.ligaBar}>
         <Text style={[styles.ligaBarText,{borderWidth:1}]}> <Icon name="bar-chart" size={16} color="white" />  SUPER ADMIN</Text>
         <Text style={styles.ligaBarText}><AnimatedIcon animation="rotate" iterationCount="infinite" name="futbol-o" size={16} color="yellow" ></AnimatedIcon>   Mejenga Legends</Text>
        </View>
        <View style={styles.accountnfoBox}>
         <TouchableOpacity  style={styles.home} onPress={this.props.setSceneMenu}><Icon name="home" size={22} color="#BDBDBD" /></TouchableOpacity>
         <TouchableOpacity style={styles.accountButton} onPress={this.props.setSceneAccount}>
         <Text style={styles.accountButtonText}><Icon name="user" size={15} color="#FFFFFF"/> Super Admin</Text>
         </TouchableOpacity>
        </View>
        </View>
      </View>
    )
  } else if(this.props.user.rol === "admin"){
    return (
      <View style={{flex:1}}>
      <View style={styles.row}>
        <View style={styles.ligaBar}>
         <Text style={[styles.ligaBarText,{borderWidth:1}]}> <Icon name="bar-chart" size={16} color="white" /> ADMINISTRADOR</Text>
         <Text style={styles.ligaBarText}><AnimatedIcon animation="rotate" iterationCount="infinite" name="futbol-o" size={16} color="yellow" ></AnimatedIcon>   Mejenga Legends</Text>
        </View>
        <View style={styles.accountnfoBox}>
         <TouchableOpacity  style={styles.home} onPress={this.props.setSceneMenu}><Icon name="home" size={22} color="#BDBDBD" /></TouchableOpacity>
         <TouchableOpacity style={styles.accountButton} onPress={this.props.setSceneAccount}>
         <Text style={styles.accountButtonText}><Icon name="user" size={15} color="#FFFFFF"/> {this.props.user.nombre}</Text>
         </TouchableOpacity>
        </View>
        </View>
      </View>
    )
  }else if(this.props.user.rol === "arbitro"){
    return (
      <View style={{flex:1}}>
      <View style={styles.row}>
        <View style={styles.ligaBar}>
         <Text style={[styles.ligaBarText,{borderWidth:1}]}> <Icon name="bar-chart" size={16} color="white" /> ARBITRO</Text>
         <Text style={styles.ligaBarText}><AnimatedIcon animation="rotate" iterationCount="infinite" name="futbol-o" size={16} color="yellow" ></AnimatedIcon>   Mejenga Legends</Text>
        </View>
        <View style={styles.accountnfoBox}>
         <TouchableOpacity  style={styles.home} onPress={this.props.setSceneMenu}><Icon name="home" size={22} color="#BDBDBD" /></TouchableOpacity>
         <TouchableOpacity style={styles.accountButton} onPress={this.props.setSceneAccount}>
         <Text style={styles.accountButtonText}><Icon name="user" size={15} color="#FFFFFF"/> {this.props.user.nombre}</Text>
         </TouchableOpacity>
        </View>
        </View>
      </View>
    )
  }
  return null;

}
  render(){
  return(
    <View style={{flex:1}}>
     {this.defineHeader()}
   </View>)
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
