

import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import RenderIf from '../app/renderIf';
import Notification from '../../services/notification';
import AddToTeamNotificationDetail from '../notification/addToTeamNotificationDetail';

export default class NotificationsByPlayer extends Component {
  constructor(props){
    super(props)
    this.state = {
      scene: 'myNotifications',
      currentNotification: '',
      notificationKey:''
    }
  }

  deleteNotification = ()=>{
    var notifications = this.props.notifications;
    notifications.splice(this.state.notificationKey,1);
    Notification.deleteNotification(notifications);

  }
  setSceneMyNotifications = ()=>{
     this.setState({scene:'myNotifications'})


  }
    myNotifications(){
      let notifications =  this.props.notifications.map( (val, key) => {
            return (  <View key={key}>
                      {RenderIf(val.tipo==1,
                        <TouchableOpacity onPress={()=>this.setState({scene:'notificationDetail',currentNotification:val,notificationKey:key})}
                            key={key} style={{flexDirection:'row', justifyContent:'center',alignItems:'center',backgroundColor:'#EEEEEE',borderRadius:5,borderWidth:1,borderColor:'#FFCCBC',marginBottom:5,paddingVertical:8,paddingHorizontal:15}}>
                            <View style={{flex:1}}>
                              <Icon name="handshake-o" color="#F4511E" size={50}  />
                            </View>
                            <View style={{flex:4}}>
                                <Text style={{fontSize:22,fontWeight:'bold',marginBottom:10}}>{val.titulo}</Text>
                                 <Text style={{flex:6}}>{val.message}</Text>
                            </View>

                              <Text style={{flex:2,fontSize:17}}>{val.fecha}</Text>
                              <Text><Icon name="chevron-right" size={20} color={'#F4511E'} /> </Text>

                            </TouchableOpacity>

                       )}
                       {RenderIf(val.tipo==2,
                         <TouchableOpacity onPress={()=>this.setState({scene:'notificationDetail',currentNotification:val,notificationKey:key})}
                             key={key} style={{flexDirection:'row', justifyContent:'center',alignItems:'center',backgroundColor:'#EEEEEE',borderRadius:5,borderWidth:1,borderColor:'purple',marginBottom:5,paddingVertical:8,paddingHorizontal:15}}>
                             <View style={{flex:1}}>
                               <Icon name="futbol-o" color="purple" size={50}  />
                             </View>
                             <View style={{flex:4}}>
                                 <Text style={{fontSize:22,fontWeight:'bold',marginBottom:10}}>{val.titulo}</Text>
                                  <Text style={{flex:6}}>{val.message}</Text>
                             </View>
                               <Text style={{flex:2,fontSize:17}}>{val.fecha}</Text>
                               <Text><Icon name="chevron-right" size={20} color={'purple'} /> </Text>
                             </TouchableOpacity>

                        )}
                   </View>
              )
          });
      return (
        <FadeInView style={styles.container} duration={600}>
          <View style={styles.infoContainer}>
            <View style={styles.mainName}>
                <Text style={styles.whiteFont}>Notificaciones</Text>
            </View>
            {RenderIf(this.props.notifications.length>0,
              <View style={[styles.subtitle,{flexDirection:'row',paddingHorizontal:30}]}>
                  <View style={{flex:3}}>
                      <Text style={styles.whiteFont2}>Contenido</Text>
                  </View>
                  <View style={{flex:1}}>
                      <Text style={styles.whiteFont2}>Fecha</Text>
                  </View>
              </View>
             )}


           <View style={styles.basicInfo}>

              <View style={{flex:3,padding:2}}>

               {RenderIf(this.props.notifications.length==0||this.props.notifications==undefined,
                 <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                         <Text style={{fontSize:25,color:'#78909C',textAlign:'center'}}>No hay notificaciones que mostrar</Text>
                 </View>
                )}
                {RenderIf(this.props.notifications.length>0 && this.props.notifications!==undefined,
                  <ScrollView>
                    {notifications}
                    </ScrollView>
                 )}
                </View>
            </View>
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
          <TouchableOpacity onPress={this.props.back} style={{flex:1, alignItems:'flex-start'}}>
            <View style={styles.buttonBackPadre}>
              <View style={styles.buttonBackHijo}/>
                <Text style={{ backgroundColor: 'transparent',fontSize: 16,color:'white'}}>
                    <Icon name="chevron-left" size={15} color="#FFFFFF"/> Atrás
                </Text>
            </View>
         </TouchableOpacity>

        </View>
        </FadeInView>
      )
    }
    showScene(){
      switch (this.state.scene) {
        case 'myNotifications':
          return this.myNotifications();
          break;
        case 'notificationDetail':
          return  (<AddToTeamNotificationDetail user={this.props.user} deleteNotification={()=>{this.deleteNotification()}}  back={()=> this.setSceneMyNotifications()} notification={this.state.currentNotification}/>);
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
    info:{
     borderBottomWidth:1,
     borderBottomColor:'#9E9E9E',
     margin:5,
     flexDirection:'row',
   },
   flexStart:{
     textAlign:'left',
     color:'black',
     flex:1
   },
   flexEnd:{
     textAlign:'right',
     flex:1
   },
    buttonBackPadre: {
    width: 150,
    height: 50,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    position: 'relative',
    paddingVertical:4,
    paddingHorizontal:15,
   },
   buttonBackHijo:{
     width: 120,
     height: 140,
     position: 'absolute',
     right: 40,
     top: -30,
     backgroundColor: '#1565C0',
     transform: [{
       rotate: '138deg',
     }]
   },
   boldFont:{
     fontWeight:'bold',
     fontSize:20,
   },
   basicInfo:{
     flex:1,
     flexDirection:'row',
     padding:10
   },
   container:{
     flex:1,
     borderRadius:20,
   },
   mainName:{
     backgroundColor:'#1565C0',
     padding:7
   },
   subtitle:{
     backgroundColor:'#42A5F5',
     padding:8
   },
   whiteFont2:{
     color:'#1A237E',
   },
   whiteFont:{
     color:'white',
     textAlign:'left'
   },
   infoContainer:{
     flex:10,
     backgroundColor:'white',
     borderRadius:10,
     margin:20
   },
   title:{
     fontSize:20,
     color:'white',
     marginVertical:10
   },
   subTitle:{
     fontSize:15,
     color:'white',
   },
   profileImage:{
     height:130,
     width:130,
     borderWidth:2,
     borderColor:'white'
   },
   whiteFont:{
     color:'white',
     textAlign:'center'
   },
   button:{
     marginRight:5,
     marginBottom:5,
     paddingHorizontal:10,
     paddingVertical:4,
     borderRadius:9,
     backgroundColor:'#F4511E',
     flex:3,
   },
   textButton: {
     textAlign:'center',
     color:'white',
     fontSize:15,
   },
   circularIcon:{
     borderWidth:1,
     borderColor:'rgba(0,0,0,0.2)',
     alignItems:'center',
     justifyContent:'center',
     width:50,
     height:50,
     backgroundColor:'#EEEEEE',
     borderRadius:100,
   },
   redButton:{
     margin:10,
     backgroundColor:'red',
     paddingVertical:5,
     paddingHorizontal:10,
     borderRadius:20
   }

    })
