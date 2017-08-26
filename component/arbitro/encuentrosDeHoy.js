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
import Team from '../../services/team';
import Icon from 'react-native-vector-icons/FontAwesome';
import CanchaService from '../../services/cancha';
import ComplejoService from '../../services/complejo';
import DetalleEncuentro from '../arbitro/detalleEncuentro';
export default class EncuentrosDeHoy extends Component {
  constructor(props){
    super(props)
    this.state = {
      encuentrosDeHoy:[],
      players:[],
      scene: 'encuentrosDeHoy',
      currentMatch:''
    }
  }

  componentDidMount() {


    ComplejoService.getCanchasByComplejoOnce(this.props.complejo.uid, (canchas)=>{
      canchas.map( (cancha, key) => {
        var recorrido=0
        CanchaService.getMatchesByCancha(cancha.uid,(matches)=>{
          var newMatches = [];
          matches.map((match)=>{
           Team.getTeam(match.equipo1.equipoGUID,(equipo1)=>{
             match.equipo1=equipo1;
             Team.getTeam(match.equipo2.equipoGUID,(equipo2)=>{
               match.equipo2=equipo2;
               newMatches.push(match)
               recorrido++;
               if(recorrido===matches.length){
                   this.setState({encuentrosDeHoy:newMatches})
               }
             },()=>{})
           },()=>{})
          })


        },()=>{})
      });

    },()=>{})
  }
  setSceneEncuentrosDeHoy =()=>{
    SoundManager.playBackBtn();
    this.setState({scene:'encuentrosDeHoy'})
  }

  showScene = () => {
    switch (this.state.scene) {
      case 'encuentrosDeHoy':
        return this.showEncuentros()
        break;
      case 'detalleEncuentro':
            return <DetalleEncuentro reto={this.state.currentMatch} back={()=>{this.setSceneEncuentrosDeHoy()}} user={this.state.currentMatch}/>
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
showEncuentros = () => {
        let matches =  this.state.encuentrosDeHoy.map( (val, key) => {
      // if(val.estaVacio!==true){
      return <TouchableOpacity onPress={()=> { this.setState({currentMatch:val,scene:'detalleEncuentro'});SoundManager.playPushBtn()}}
      key={key} style={{flexDirection:'row', justifyContent:'center',alignItems:'center',backgroundColor:'#EEEEEE',borderRadius:5,marginBottom:5,padding:5,height:120}}>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      {this.showImage(val.equipo1)}
      <Text style={{fontSize:18}}>{val.equipo1.nombre}</Text>
      </View>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Image style={styles.imageVS} borderRadius={10} source={{uri: 'https://userscontent2.emaze.com/images/12385dc1-2370-4411-a3cd-4003f24a88cf/9bf191e90aa3928848849406d236da99.png'}}>
      </Image>
      <Text>{val.complejoNombre}</Text>
      <Text>{moment(val.fecha).format('LL hh:mm a')}</Text>
      </View>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      {this.showImage(val.equipo2)}
      <Text style={{fontSize:18}}>{val.equipo2.nombre}</Text>
      </View>
      </TouchableOpacity>
      //  }
      });

      return (
          <FadeInView style={styles.container}>
            <FadeInView style={styles.infoContainer} duration={300}>
          <View style={styles.mainName}><Text style={styles.whiteFont}>{this.props.complejo.nombre}</Text></View>
          <View style={styles.subtitle}><Text style={styles.whiteFont2}>Encuentros a disputar</Text></View>
            <View style={{flex:1,padding:10}}>
              <View style={this.centerNoText(matches)}>
                 <ScrollView style={{flex:1}}>
                 {this.showResults(matches)}
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

              </View>
              </FadeInView>
      )
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
       return   <Image style={styles.profileImage2} borderRadius={10} source={{uri: val.image}}>
         </Image>
      }else{
      return    <Image style={styles.profileImage2} borderRadius={10} source={{uri: 'http://www.dendrocopos.com/wp-content/themes/invictus/images/dummy-image.jpg'}}>
        </Image>
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
  imageVS:{
    height:50,
    width:50,
   },
   profileImage2:{
     height:70,
      width:80,
     borderWidth:2,
     borderColor:'white'
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
