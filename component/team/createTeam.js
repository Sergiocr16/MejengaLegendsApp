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
var Form = t.form.Form;

export default class CreateTeam extends Component {
  constructor(props){
    super(props)

    this.state = {
      nombre: '',
      lema: '',
      genero:'Masculino',
      genders:['Masculino','Femenino'],
      player:{ nombre: '',liga:'',PrimerApellido:'',score:0}
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
     this.props.back();
   });
 }

  render(){
    let genderPicker = this.state.genders.map( (s, i) => {
       return <Picker.Item  key={i} value={s} label={s} />
     });
    return (
  <FadeInView style={styles.container} duration={30}>
  <View style={styles.mainName}><Text style={styles.whiteFont}>Crear un equipo</Text></View>
  <View style={styles.subtitle}><Text style={styles.whiteFont2}>Crea tu perfil de jugador</Text></View>
    <View style={{flex:1,padding:20}}>
      <ScrollView>
      <View style={{flexDirection:'row'}}>
      <TextInput
      underlineColorAndroid='#42A5F5'
      placeholderTextColor="grey"
      placeholder="Nombre del equipo"
      autocapitalize={true}
      disableFullscreenUI={true}
      style={[styles.inputText,{flex:1}]}
      onChangeText={(nombre) => this.setState({nombre})}
      />
      <TextInput
      underlineColorAndroid='#42A5F5'
      placeholderTextColor="grey"
      placeholder="Lema"
      disableFullscreenUI={true}
      style={[styles.inputText,{flex:1}]}
      onChangeText={(lema) => this.setState({lema})}
      />
   </View>
   <View style={{flexDirection:'column',marginVertical:20}}>
   <View style={{flex:1,marginBottom:25}}>
    <Text style={styles.bold}>Selecciona el género del equipo</Text>
   <Picker style={styles.androidPicker} selectedValue={this.state.genero}
     onValueChange={ (genero) => (this.setState({genero})) } >
     {genderPicker}
     </Picker>
   </View>


  </View>

      <TouchableOpacity style={styles.button}  onPress={this.submit} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>¡Listo!</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
      </FadeInView>
    )
  }
}

const styles = StyleSheet.create({
  androidPicker: {
    height: 40,
            alignSelf: 'stretch',
            alignItems:'center',
            justifyContent:'center',
        },
  inputText: {
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'grey',
    textAlign:'center',
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
  ageText:{
    color:'orange',
    fontSize:28,
    textAlign:'center',
    fontWeight:'bold',
  },
  btnAge:{
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
     fontSize: 18,
     color: 'white',
     alignSelf: 'center'
   },
   button: {
     height: 36,
     backgroundColor: '#48BBEC',
     borderColor: '#48BBEC',
     borderWidth: 1,
     borderRadius: 8,
     marginBottom: 10,
     alignSelf: 'stretch',
     justifyContent: 'center'
   }
})
