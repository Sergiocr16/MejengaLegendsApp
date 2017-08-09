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
var t = require('tcomb-form-native');
import Icon from 'react-native-vector-icons/FontAwesome';
var Form = t.form.Form;

export default class AddPlayersToTeam extends Component {
  constructor(props){
    super(props)

    this.state = {
      nombre: '',

    }
  }

 submit = () =>{
   var team = {};
   team.nombre = this.state.nombre;
   team.lema = this.state.lema;
   team.genero = this.state.genero;
   team.copas = 0;
   team.golesMarcados = 0;
   team.golesRecibidos = 0;
   team.rachaVictorias = 0;
   team.mayorPuntajeDeLaHistoria = 0;
   team.logo = 'shield';
   team.liga = 'Liga Amateur';
   var equiposDelJugador = {};
   team.fundador = { nombre: this.props.user.nombre + ' ' + this.props.user.primerApellido,jugadorGUID:firebase.auth().currentUser.uid};
   TeamService.newWithCallback(team,(equipo)=>{
     equiposDelJugador = this.props.teams;
     equiposDelJugador.push(equipo);
     TeamService.newTeamsByPlayer(equiposDelJugador);
     this.props.back;
   });
 }

  render(){
    return (
  <FadeInView style={styles.container} duration={30}>
  <View style={styles.mainName}><Text style={styles.whiteFont}>Agrega los jugadores y arma tu equipo!</Text></View>
  <View style={styles.subtitle}><Text style={styles.whiteFont2}>Buscar jugador por nombre de usuario</Text></View>
    <View style={{flex:1,padding:10}}>
          <View style={{flex:1,flexDirection:'row',paddingHorizontal:70}}>
              <TextInput
              underlineColorAndroid='white'
              placeholderTextColor="grey"
              placeholder="Nombre de usuario"
              autocapitalize={true}
              disableFullscreenUI={true}
              style={[styles.inputText,{flex:2}]}
              onChangeText={(nombre) => this.setState({nombre})}
              />
              <TouchableOpacity style={[styles.buttonBuscarJugador,{flex:1,alignItems:'flex-end'}]}  onPress={this.submit} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}><Icon name="search" size={13} color="#FFFFFF"/> Buscar</Text>
              </TouchableOpacity>
           </View>
           <View style={{flex:5,flexDirection:'row',paddingHorizontal:10}}>
              <ScrollView style={[styles.resultadoBusqueda,{flex:1}]}>
              </ScrollView>
              <ScrollView style={[styles.jugadoresSeleccionados,{flex:1}]}>
              </ScrollView>
           </View>

            <View style={{flex:1,flexDirection:'row',alignItems:'flex-end'}}>
               <TouchableOpacity style={[styles.button,{marginRight:10,backgroundColor:'#D32F2F'}]}  onPress={this.submit} underlayColor='#99d9f4'>
                 <Text style={styles.buttonText}>Regresar</Text>
               </TouchableOpacity>
               <TouchableOpacity style={[styles.button]}  onPress={this.submit} underlayColor='#99d9f4'>
                 <Text style={styles.buttonText}>Crear equipo!</Text>
               </TouchableOpacity>
            </View>
      </View>
      </FadeInView>
    )
  }
}

const styles = StyleSheet.create({
  inputText: {
    height: 26,
    paddingHorizontal: 20,
    paddingVertical:1,
    color: 'grey',
    textAlign:'center',
    borderWidth: 1,
    margin: 5,
     borderColor: '#E0E0E0',
  },
  resultadoBusqueda:{
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginRight: 5,
  },
  jugadoresSeleccionados:{
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginLeft: 5,
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

  mainName:{
    backgroundColor:'#1A237E',
    padding:7,
   borderTopLeftRadius:10,
   borderTopRightRadius:10
  },
  subtitle:{
    backgroundColor:'#42A5F5',
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
  container: {
     justifyContent: 'center',
     backgroundColor: '#ffffff',
     flex:1,
     margin:15,
     borderRadius:10
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
     height: 26,
     backgroundColor: '#689F38',
     borderRadius: 8,
     margin: 5,
     alignSelf: 'stretch',
     justifyContent: 'center'
   }
})
