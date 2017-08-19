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
import PlayerProfile from './playerProfile';
import SoundManager from '../../services/soundManager';
var t = require('tcomb-form-native');
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Players extends Component {
  constructor(props){
    super(props)

    this.state = {
      username: '',
      players: [],
      currentPlayer: '',
      submitted:false
    }
  }

  isEmpty = (val) => {
    if(this.state.submitted){
      if(val===""){
        console.log("SIII")
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

  getPlayers = ()=>{
  SoundManager.playPushBtn();
   this.setState({submitted:true})
   if(this.isValid()){
    Player.findPlayerByUsername(this.state.username.trim(),(players)=>{
      this.setState({players,arePlayers:true});
    },()=>{
      this.setState({arePlayers:false});
    });
   }
  }
  showImage = (val) => {
    if(val.image !== undefined){
     return <Image style={{flex:1, alignItems:'center',marginRight:10,borderColor:'white'}} borderRadius={5}   source={{uri: val.image}}></Image>

    }else{
    return <Image style={{flex:1, alignItems:'center',marginRight:10,borderColor:'white'}} borderRadius={5}   source={{uri: 'http://www.regionlalibertad.gob.pe/ModuloGerencias/assets/img/unknown_person.jpg'}}></Image>
  }
}

showResults = (players) => {
  if(!this.state.arePlayers && this.state.submitted){
    return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:16}}>No se encontraron resultados.</Text></View>
  }else if(this.state.arePlayers){
    return players;
  }
}
  render(){
    let players =  this.state.players.map( (val, key) => {
      if(val.nombre!==undefined){
          return <ScrollView key={key} style={{flex:1,marginTop:10}}><PlayerProfile user={val} showBackButton={false}/></ScrollView>
      }
    });

    return (
  <FadeInView style={styles.container}>
    <FadeInView style={styles.infoContainer} duration={300}>
  <View style={styles.mainName}><Text style={styles.whiteFont}>Jugadores del mundo</Text></View>
  <View style={styles.subtitle}><Text style={styles.whiteFont2}>Busca jugadores por nombre de usuario</Text></View>
    <View style={{flex:1,padding:10}}>
          <View style={{flex:1,flexDirection:'row',paddingHorizontal:90}}>
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
                <Text style={styles.buttonText}><Icon name="search" size={13} color="#FFFFFF"/> Buscar</Text>
              </TouchableOpacity>
           </View>
           <View style={{flex:5,flexDirection:'row'}}>
              <View style={{flex:1}}>
              {this.showResults(players)}
              </View>
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
     fontSize: 15,
     color: 'white',
     alignSelf: 'center'
   },
   button: {
     flex: 1,
     marginTop:10,
     height: 30,
     width: 200,
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
