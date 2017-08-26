import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ScrollView,
  DatePickerAndroid,
  Picker
} from 'react-native'
var moment = require('moment');
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
import Player from '../../services/player';
import TeamService from '../../services/team';
import Notification from '../../services/notification';
var t = require('tcomb-form-native');
import RenderIf from '../app/renderIf';
import Icon from 'react-native-vector-icons/FontAwesome';
import SoundManager from '../../services/soundManager';
export default class AddPlayersToTeam extends Component {
  constructor(props){
    super(props)

    this.state = {
      username: '',
      players: [],
      playersSelected: [],
      notificationsByPLayer: [],
      currentPlayer: '',
      seEncontroJugador: 1,
      hayJugadoresSeleccionados: 1,
      submitted:false,
      estadoJugadorAInvitar:0
    }
  }
    containsObject = (obj, list)=> {
      var i;
      for (i = 0; i < list.length; i++) {
        if (list[i].uid === obj.uid) {
            return true;
        }
      }
      return false;
  }
  existeElId = (id, list)=> {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].equipoGUID === id) {
          return true;
      }
    }
    return false;
}
existeElIdEnEquipos = (id, list)=> {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].uid === id) {
        return true;
    }
  }
  return false;
}
  sendRequestToPlayers = ()=>{
    if(this.state.playersSelected.length==0){
          ToastAndroid.show('Debes seleccionar almenos un jugador', ToastAndroid.LONG);
    }else{
    var fecha = moment().format('DD/MM/YYYY');Z
    var notificationsTemporal = {};
    this.state.playersSelected.map((val, key) => {
        var temporalNotification = {equipoGUID:this.props.team.uid,jugadorGUID:val.uid,nombreEquipo:this.props.team.nombre,message:'¡'+this.props.team.nombre + 'quiere que seas parte de su equipos!', titulo: "Invitación a unirte a equipo",tipo:1,fecha:fecha};
        if(this.state.notificationsByPLayer[key].length!==0){
          notificationsTemporal = this.state.notificationsByPLayer[key];
          notificationsTemporal.push(temporalNotification);
          TeamService.sendNotificationToPlayers(val.uid,notificationsTemporal);
          this.props.back();
          ToastAndroid.show('Se ha enviado una invitación de unión a los jugadores seleccionados', ToastAndroid.LONG);
        } else {
           var firstNotification = [{equipoGUID:this.props.team.uid,jugadorGUID:val.uid,nombreEquipo:this.props.team.nombre,message:'¡'+this.props.team.nombre + 'quiere que seas parte de su equipos!', titulo: "Invitación a unirte a equipo",tipo:1,fecha:fecha}];
            TeamService.sendNotificationToPlayers(val.uid,firstNotification);
            this.props.back();
            ToastAndroid.show('Se ha enviado una invitación de unión a los jugadores seleccionados', ToastAndroid.LONG);
        }
    })
  }

  }

  isInNotification = (val)=>{
    Notification.getNotificationsByPlayer(val.uid,(notifications)=>{
        if(notifications &&!this.existeElId(this.props.team.uid,notifications)){
          if(!this.containsObject(val,this.state.playersSelected)){
            this.setState({playersSelected:[...this.state.playersSelected,val]});
            this.setState({hayJugadoresSeleccionados:2})
            this.setState({notificationsByPLayer:[...this.state.notificationsByPLayer,notifications]});
          };
        }else {
             ToastAndroid.show('Ya invitaste a ' + val.nombre + ' ' + val.primerApellido + ' a este equipo', ToastAndroid.LONG);
        }
    },()=>{
      this.setState({playersSelected:[...this.state.playersSelected,val]});
      this.setState({hayJugadoresSeleccionados:2})
      this.setState({notificationsByPLayer:[...this.state.notificationsByPLayer,[]]});
    })
  }
    isInTeam = (val)=>{
      TeamService.getTeamsByEspecificPlayer(val.uid,(teams)=>{
        if(teams &&this.existeElIdEnEquipos(this.props.team.uid,teams)){
             ToastAndroid.show('El jugador ' + val.nombre + ' ' + val.primerApellido + ' ya pertenece a este equipo', ToastAndroid.LONG);

        }else{
          this.isInNotification(val);
        }
      },()=>{
          this.isInNotification(val);
      })
    }


  addPlayers = (val)=>{
    if(this.containsObject(val,this.state.playersSelected)){
          ToastAndroid.show('Ya seleccionaste a este jugador', ToastAndroid.LONG);
    }else{
      if(val.uid==firebase.auth().currentUser.uid){
          ToastAndroid.show('Ya perteneces a este equipo', ToastAndroid.LONG);
      }else{
        if(val.cantidadEquipos<5){
          this.isInTeam(val)
        } else {
             ToastAndroid.show('Este jugador ya pertenece a 5 equipos, limite alcanzado', ToastAndroid.LONG);
        }
      }
      }
  }
  deletePlayers = (key)=>{
    this.state.playersSelected.splice(key,1);
    this.setState({playersSelected: this.state.playersSelected });
    if(this.state.playersSelected.length==0){
          this.setState({hayJugadoresSeleccionados:1})
    }
  }
  getPlayers = ()=>{
    SoundManager.playPushBtn();
     this.setState({submitted:true})
     if(this.isValid()){
       Player.findPlayerByUsername(this.state.username.trim(),(players)=>{
         this.setState({players});
         if(this.state.players!==[]){
             this.setState({seEncontroJugador:2})
         }
       },()=>{
         this.setState({seEncontroJugador:3})
       });
     }



  }
  isEmpty = (val) => {
    if(this.state.submitted){
      if(val===""){
        return '#F44336';
      }else{
        return '#9E9E9E';
      }
    } else{
      return '#9E9E9E';
    }
  }
  isValid = () => {
    var toValidate = [this.state.username]
    var invalidItems = 0;
   toValidate.map((val)=>{
     if(val===""){
       invalidItems++;
     }
   })
   if(invalidItems==0){
     return true;
   }else{
     ToastAndroid.show('Por favor digita un nombre de usuario para tu busqueda', ToastAndroid.LONG);
     return false;
   }
  }

  showImage = (val) => {
    if(val.image !== undefined){
     return <Image style={{flex:1, alignItems:'center',marginRight:10}} borderRadius={5}   source={{uri: val.image}}></Image>

    }else{
    return <Image style={{flex:1, alignItems:'center',marginRight:10}} borderRadius={5}   source={{uri: 'http://www.regionlalibertad.gob.pe/ModuloGerencias/assets/img/unknown_person.jpg'}}></Image>
  }
  }
  render(){

    let players =  this.state.players.map( (val, key) => {
      if(val.nombre!==undefined){
          return <View  key={key} val={val} style={{flexDirection:'row', flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#EEEEEE',borderRadius:4,padding:5}}>
                 <View style={{flex:3}}>
                  {this.showImage(val)}
                 </View>
                    <View style={{flex:4,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:20,flex:1}}>{val.nombre +" "+ val.primerApellido}</Text>
                        <Text style={{flex:1}}>{val.posicionPrincipal}</Text>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                          <Text style={styles.score}><Icon name="trophy" size={16} color="yellow" /> {val.score}</Text>
                        </View>
                        <TouchableOpacity onPress={()=> { this.setState({currentPlayer:val}); this.addPlayers(val)}}  style={[styles.button,{marginHorizontal:10,flex:1,backgroundColor:'#F4511E'}]} underlayColor='#99d9f4'>
                          <Text style={styles.buttonText}>Agregar jugador</Text>
                        </TouchableOpacity>
                   </View>

                 </View>
               }
    });

    let playersSelected =  this.state.playersSelected.map( (val, key) => {
      if(val.nombre!==undefined){
          return <TouchableOpacity onPress={()=> {this.deletePlayers(key)}}
                 key={key} style={{flexDirection:'row', height:60, justifyContent:'center',alignItems:'center',backgroundColor:'#EEEEEE',borderRadius:4,marginBottom:5,padding:5}}>
                 <View style={{flex:3}}>
                     {this.showImage(val)}
                 </View>
                    <View style={{flex:4,borderRightWidth:1,marginRight:5,borderColor:'#9E9E9E' }}>
                        <Text>{val.nombre +" "+ val.primerApellido}</Text>
                    </View>

                  <Text style={{flex:3}}>{val.posicionPrincipal}</Text>
                  <Text style={styles.score}><Icon name="trophy" size={16} color="yellow" /> {val.score}</Text>
                 </TouchableOpacity>
               }
    });
    return (
  <FadeInView style={styles.container}>
    <FadeInView style={styles.infoContainer} duration={300}>
  <View style={styles.mainName}><Text style={styles.whiteFont}>Agrega jugadores y arma tu equipo!</Text></View>
  <View style={styles.subtitle}><Text style={styles.whiteFont2}>Buscar jugador por nombre de usuario</Text></View>
    <View style={{flex:1,padding:10}}>
          <View style={{flex:1,flexDirection:'row',paddingHorizontal:90,marginBottom:20}}>
              <TextInput
              underlineColorAndroid='white'
              placeholderTextColor="grey"
              placeholder="Nombre de usuario"
              autocapitalize={true}
              disableFullscreenUI={true}
              style={[styles.inputText,{flex:2,borderColor:this.isEmpty(this.state.username)}]}
              onChangeText={(username) => this.setState({username})}
              />
              <TouchableOpacity style={[styles.buttonBuscarJugador,{flex:1,alignItems:'flex-end'}]}  onPress={this.getPlayers} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}><Icon name="search" size={16} color="#FFFFFF"/> Buscar</Text>
              </TouchableOpacity>
           </View>
           <View style={{flex:5,flexDirection:'row',paddingHorizontal:10}}>
               {RenderIf(this.state.seEncontroJugador==1,
                 <View style={[styles.resultadoBusqueda,{flex:1,justifyContent:'center',alignItems:'center'}]}>
                    <Text style={[{fontSize:16}]}><Icon name="warning" size={12} color="#FFFFFF"/>Resultado de busqueda</Text>
                 </View>
               )}
               {RenderIf(this.state.seEncontroJugador==3,
                 <View style={[styles.resultadoBusqueda,{flex:1,justifyContent:'center',alignItems:'center'}]}>
                    <Text style={[{fontSize:16}]}><Icon name="warning" size={12} color="#FFFFFF"/> No se encontraron resultados</Text>
                 </View>
               )}
               {RenderIf(this.state.seEncontroJugador==2,
                  <View style={[styles.resultadoBusqueda,{flex:1,justifyContent:'center',alignItems:'center'}]}>
                   {players}
                 </View>

               )}


              {RenderIf(this.state.hayJugadoresSeleccionados==1,
                <View style={[styles.resultadoBusqueda,{flex:1,justifyContent:'center',alignItems:'center'}]}>
                   <Text style={[{fontSize:16}]}><Icon name="warning" size={12} color="#FFFFFF"/> Jugadores seleccionados</Text>
                </View>
              )}
              {RenderIf(this.state.hayJugadoresSeleccionados==2,
                    <ScrollView style={[styles.jugadoresSeleccionados,{flex:1}]}>
                    {playersSelected}
                      </ScrollView>
                )}


           </View>
           <View style={{flexDirection:'row'}}>
               <TouchableOpacity style={[styles.button]}  onPress={this.sendRequestToPlayers} underlayColor='#99d9f4'>
                 <Text style={styles.buttonText}><Icon name="envelope" size={18} color="#FFFFFF"/> Enviar invitación a jugadores</Text>
               </TouchableOpacity>
       </View>
      </View>
      </FadeInView>
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
}

const styles = StyleSheet.create({
  inputText: {
    height: 31,
    paddingHorizontal: 20,
    paddingVertical:1,
    color: 'grey',
    textAlign:'center',
    borderWidth: 1,
    margin: 5,
    borderColor: '#9E9E9E',
    borderRadius:4,
  },
  resultadoBusqueda:{
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginRight: 5,
    borderRadius:4,
  },
  jugadoresSeleccionados:{
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginLeft: 5,
    borderRadius:4,
  },

  boldSmall:{
    color:'#42A5F5',
    fontSize:10,
    textAlign:'center',
  },
  bold:{
      color:'#42A5F5',
      textAlign:'center',
      fontWeight:'bold'
  },
  infoContainer:{
    flex:10,
    backgroundColor:'white',
    borderRadius:10,
    margin:20
  },
  mainName:{
    backgroundColor:'#1565C0',
    padding:7,
   borderTopLeftRadius:10,
   borderTopRightRadius:10
  },
  score:{
    backgroundColor:'#FDD835',
    padding:5,
    borderRadius:5,
    borderWidth:1,
    borderColor:'white',
    flex:2,
    color:'white',
    paddingHorizontal:10,
    fontWeight:'bold',
    textAlign:'center'
  },
  subtitle:{
    backgroundColor:'#BBDEFB',
    padding:8
  },
  whiteFont2:{
    color:'#1A237E',
    textAlign:'center'
  },
  whiteFont:{
    color:'white',
    fontWeight:'bold',
    textAlign:'center'
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
 container:{
   flex:1,
   borderRadius:20,
 },
   title: {
     fontSize: 30,
     alignSelf: 'center',
     marginBottom: 30
   },
   buttonText: {
     fontSize: 17,
     color: 'white',
     alignSelf: 'center'
   },
   button: {
     flex: 1,
     marginTop:10,
     height: 30,
     backgroundColor: '#48BBEC',
     borderRadius: 8,
     alignSelf: 'stretch',
     justifyContent: 'center'
   },
   buttonBuscarJugador: {
     height: 31,
     backgroundColor: '#689F38',
     borderRadius: 8,
     margin: 5,
     alignSelf: 'stretch',
     justifyContent: 'center'
   }
})
