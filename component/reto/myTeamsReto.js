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
import Team from '../../services/team';
import Complejo from '../../services/complejo';
import TeamService from '../../services/team';
import NewReto from './newReto';
import Loader from '../app/loading';
import SoundManager from '../../services/soundManager';
var t = require('tcomb-form-native');
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MyTeamsReto extends Component {
  constructor(props){
    super(props)
    this.state = {
      teams: [],
      currentTeam: '',
      complejos:[],
      submitted:false,
      scene:"loading"
    }
  }
  componentDidMount() {
      TeamService.getTeamsByPlayer((teams)=>{
        if(teams){

          var updatedTeams = [];
          teams.map((team)=>{
            if(team.fundador.jugadorGUID===firebase.auth().currentUser.uid){
              updatedTeams.push(team)
            }
          })
          this.setState({scene:"myTeams",teams:updatedTeams})
        }
      },()=>{
        this.setState({scene:"myTeams",teams:[]})
      })
  }
showScene =() =>{
  switch (this.state.scene) {
    case 'loading':
      return <Loader/>
      break;
    case 'myTeams':
      return this.showTeams()
      break;
    case 'newReto':
     return <NewReto team={this.state.currentTeam} complejos={this.state.complejos} showEditButton={false} back={()=>{ this.componentDidMount(); SoundManager.playBackBtn() }} showBackButton={true}/>
      break;
    default:
  }
}

goToNewReto = (val) => {
  SoundManager.playPushBtn();
  this.setState({scene:'loading'})
  Complejo.findComplejosByCanton(val.canton,(complejos)=>{
   var complejosConCanchas = [];
  complejos.map((val)=>{
    if(val.cantidadCanchas!==0){
      complejosConCanchas.push(val)
    }
  })
  if(complejosConCanchas.length>0){
  this.setState({complejos:complejosConCanchas,scene:'newReto',currentTeam:val})
 }else{
  this.setState({complejos:[],scene:'myTeams'})
  ToastAndroid.show("No existe ningún complejo deportivo en la zona de juego de este equipo.", ToastAndroid.LONG);
}
  },()=>{
  this.setState({complejos:[],scene:'myTeams'})
  ToastAndroid.show("No existe ningún complejo deportivo en la zona de juego de este equipo.", ToastAndroid.LONG);
  })
}

showTeams = () => {
  var lackingPlayer = 0;
  let teams =  this.state.teams.map( (val, key) => {
    if(val.cantidadJugadores>=5){
        return <View key={key} style={{flex:1,padding:2}}>
        <TouchableOpacity onPress={()=> {this.goToNewReto(val)}}
               key={key} style={{flexDirection:'row',padding:4, height:100, justifyContent:'center',alignItems:'center',backgroundColor:'#EEEEEE', borderWidth:1,borderRadius:4,borderColor:'white',marginBottom:5,padding:8}}>
               <View style={{flex:3}}>
                {this.showImage(val)}
               </View>
                  <View style={{flex:4,borderRightWidth:1,marginRight:5,borderColor:'#9E9E9E' }}>
                      <Text style={{textAlign:'center'}}>{val.nombre}</Text>
                        <Text style={{textAlign:'center',fontSize:10}}>{val.lema}</Text>
                  </View>
                  <Text style={{flex:3}}>{val.liga}</Text>
                <Text style={styles.score}><Icon name="trophy" size={16} color="yellow" /> {val.copas}</Text>
               </TouchableOpacity>
        </View>
      }else{
        lackingPlayer++;
      }
  });
  console.log(lackingPlayer)
  if(lackingPlayer==this.state.teams.length){
      teams = <View style={{flex:1,alignItems:'center',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:16}}>Necesitas al menos 5 jugadores en alguno de tus equipos para realizar un reto.</Text></View>
  }
  return (
<FadeInView style={styles.container}>
  <FadeInView style={styles.infoContainer} duration={300}>
<View style={styles.mainName}><Text style={styles.whiteFont}>Tu equipo VS El mundo</Text></View>
<View style={styles.subtitle}><Text style={styles.whiteFont2}>Selecciona el equipo con el que quieres retar a alguien</Text></View>
  <View style={{flex:1,padding:10}}>
        <View style={{flex:1,flexDirection:'row',paddingHorizontal:15,marginBottom:10}}>
         <View style={{flex:5,flexDirection:'row',paddingHorizontal:10}}>
            <View style={{flex:1}}>
            <ScrollView>
            {this.showResults(teams)}
            </ScrollView>
            </View>
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
     return <Image style={{flex:1, alignItems:'center',marginRight:10,borderColor:'white'}} borderRadius={5}   source={{uri: val.image}}></Image>

    }else{
    return <Image style={{flex:1, alignItems:'center',marginRight:10,borderColor:'white'}} borderRadius={5}   source={{uri: 'http://www.regionlalibertad.gob.pe/ModuloGerencias/assets/img/unknown_person.jpg'}}></Image>
  }
}

showResults = (teams) => {
  if(this.state.teams.length==0){
    return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:16}}>No tienes ningún equipo registrado aún.</Text></View>
  }else{
    return teams

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
