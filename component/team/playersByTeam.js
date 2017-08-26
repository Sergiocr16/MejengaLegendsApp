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
import Loader from '../app/loading';
import SoundManager from '../../services/soundManager';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddPlayersToTeam from '../team/addPlayersToTeam';
import TeamService from '../../services/team';
import PlayerProfile from '../player/playerProfile';
export default class PlayersByTeam extends Component {
  constructor(props){
    super(props)
    this.state = {
      players:[],
      scene: 'playersByTeam',
      currentPlayer:''
    }
  }

  componentDidMount() {
    TeamService.getPlayersByTeam(this.props.team.uid,(players)=>{
      if(players){
        this.setState({players});
      }

    },()=>{
    })
  }
  setScenePlayersByTeam =()=>{
    SoundManager.playBackBtn();
    this.setState({scene:'playersByTeam'})
  }
  setSceneAddPlayerToTeam = ()=>{
    SoundManager.playPushBtn()
     this.setState({scene:'addPlayersToTeam'})
  }
  showScene = () => {
    switch (this.state.scene) {
      case 'playersByTeam':
        return this.showPlayersByTeam()
        break;
      case 'addPlayersToTeam':
        return (<AddPlayersToTeam back={()=> this.setScenePlayersByTeam()} team={this.props.team}/>);
        break;
        case 'playerProfile':
          return <PlayerProfile back={()=>{this.setScenePlayersByTeam()}} showBackButton={true}  user={this.state.currentPlayer}/>
          break;
      default:

    }
  }
centerNoText = (jugadores) => {
  if(jugadores.length==0){
    return {flex:5,flexDirection:'row',paddingHorizontal:10,alignItems:'center',justifyContent:'center'}
  }
  return {flex:5,flexDirection:'row',paddingHorizontal:10}
}
showPlayersByTeam = () => {
  let jugadores =  this.state.players.map( (val, key) => {
        return <View key={key} style={{flex:1}}>
        <TouchableOpacity onPress={()=> { this.setState({currentPlayer:val,scene:'playerProfile'});SoundManager.playPushBtn();}}
               key={key} style={{flexDirection:'row', height:80, justifyContent:'center',alignItems:'center',backgroundColor:'#EEEEEE',borderRadius:4,marginBottom:5,padding:5}}>
               <View style={{flex:1}}>
                {this.showImage(val)}
               </View>
                  <View style={{flex:2,borderRightWidth:1,marginRight:1,borderColor:'#9E9E9E' }}>
                      <Text style={{textAlign:'center',fontWeight:'bold'}}>Nombre: {val.nombre} {val.primerApellido}</Text>
                  </View>
                  <View style={{flex:1,borderRightWidth:1,borderColor:'#9E9E9E' }}>
                      <Text style={{textAlign:'center'}}>{val.pieDominante}</Text>
                  </View>
                  <Text style={{flex:1,textAlign:'center'}}>{val.liga}</Text>
                  <Text style={styles.position}>{val.posicionPrincipal}</Text>
               </TouchableOpacity>
        </View>
  });

      return (
          <FadeInView style={styles.container}>
            <FadeInView style={styles.infoContainer} duration={300}>
          <View style={styles.mainName}><Text style={styles.whiteFont}>{this.props.team.nombre}</Text></View>
          <View style={styles.subtitle}><Text style={styles.whiteFont2}>Jugadores del equipo</Text></View>
            <View style={{flex:1,padding:10}}>
                   <View style={this.centerNoText(jugadores)}>
                      <ScrollView style={{flex:1}}>
                      {this.showResults(jugadores)}
                      </ScrollView>
                   </View>
              </View>
              </FadeInView>
              <View style={{flex:1,flexDirection:'row'}}>
                  <TouchableOpacity onPress={()=>{this.setState({scene:'loading'});
                       this.props.back()}} style={{flex:1, alignItems:'flex-start'}}>
                      <View style={styles.buttonBackPadre}>
                      <View style={styles.buttonBackHijo}/>
                          <Text style={{ backgroundColor: 'transparent',fontSize: 16,color:'white'}}>
                              <Icon name="chevron-left" size={15} color="#FFFFFF"/> Atrás
                          </Text>
                      </View>
                  </TouchableOpacity>
                  <View style={{flex:1, alignItems:'flex-end'}}>
                  {this.showAddPlayers()}
                  </View>
              </View>
              </FadeInView>
      )
}

showAddPlayers = () => {
  if(this.props.team.fundador.jugadorGUID === firebase.auth().currentUser.uid){
  return   <TouchableOpacity style={styles.button} onPress={this.setSceneAddPlayerToTeam} ><Text style={styles.textButton}><Icon name="plus" size={15} color="#FFFFFF"/> Agregar jugadores</Text></TouchableOpacity>
  }
  return null;
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


  showImage = (val) => {
    if(val.image !== undefined){
      return <Image style={{flex:1,justifyContent:'flex-start',flexDirection:'row'}} borderRadius={5} source={{uri: val.image}}>
            <Text style={[styles.score,{fontSize:12}]}>{val.score} <Icon name="trophy" size={12} color="yellow" /> </Text>
      </Image>

    }else{
    return <Image style={{flex:1, alignItems:'center',marginRight:6,borderColor:'white'}} borderRadius={5}   source={{uri: 'http://www.regionlalibertad.gob.pe/ModuloGerencias/assets/img/unknown_person.jpg'}}></Image>
  }
}

showResults = (jugadores) => {
  if(jugadores.length==0){
    return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>No hay ningún jugador en este equipo</Text></View>
  }else{
    return jugadores;
  }
}
  render(){

    return (
      <View style={{flex:1}}>
      {this.showScene()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  circularIcon:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:60,
    height:60,
    backgroundColor:'#EEEEEE',
    borderRadius:100,
  },
  inputText: {
    height: 31,
    paddingHorizontal: 20,
    paddingVertical:1,
    color: 'grey',
    textAlign:'center',
    borderWidth: 1,
    margin: 5,
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
  position:{
   backgroundColor:'#388E3C',
   padding:5,
   borderRadius:5,
   borderWidth:1,
   borderColor:'white',
   flex:1,
   color:'white',
   paddingHorizontal:10,
   fontWeight:'bold',
   textAlign:'center'
 },
  score:{
    backgroundColor:'#FDD835',
    padding:3,
    borderRadius:5,
    borderWidth:1,
    borderColor:'white',
    color:'white',
    margin:3,
    height:20,
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
   buttonBuscarJugador: {
     height: 31,
     backgroundColor: '#689F38',
     borderRadius: 8,
     margin: 5,
     alignSelf: 'stretch',
     justifyContent: 'center'
   }
})
