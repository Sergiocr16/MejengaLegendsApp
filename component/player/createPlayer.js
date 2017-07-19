import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Image,
  ToastAndroid,
  ScrollView
} from 'react-native'
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
import Player from '../../services/player';
var t = require('tcomb-form-native');
var Form = t.form.Form;

var Gender = t.enums({
  Hombre: 'Hombre',
  Mujer: 'Mujer'
});
var foot = t.enums({
  Derecho: 'Derecho',
  Izquierdo: 'Izquierdo'
});


var NewPlayer = t.struct({
  nombre: t.String,
  PrimerApellido: t.String,
  SegundoApellido: t.String,     // a required string// an optional string
  FechaDeNacimiento: t.Date,               // a required number
  Fichable: t.Boolean,
  gender: Gender,
  PieDominante: foot,
  firstTime: t.Boolean
});
var defaultValues = {
  firstTime: false,
};
var formOptions = {
auto: 'placeholders',
fields: {
    gender: {
      nullOption: {value: '', text: 'Selecciona tu genero'},
      order: 'asc'
    },
    PieDominante: {
      nullOption: {value: '', text: 'Selecciona tu pie dominante'},
      order: 'asc'
    },
    firstTime:{
      hidden:true
    }
  }};

export default class CreatePlayer extends Component {
  constructor(props){
    super(props)
    this.state = {
      player: ''
    }
  }

 submit(player){
    if (player) { // if validation fails, value will be null
     Player.update(firebase.auth().currentUser.uid,player)
    }
 }
  render(){
    return (
    <FadeInView style={styles.container} duration={30}>
    <Text>Bienvenido a Mejenga Legends</Text>
      <Text>Crea tu perfil de jugador</Text>
    <ScrollView>
    <Form ref="form" type={NewPlayer} options={formOptions}/>
      <TouchableHighlight style={styles.button} value={defaultValues} onPress={()=>{this.submit(this.refs.form.getValue())}} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
        </ScrollView>
      </FadeInView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
     justifyContent: 'center',
     padding: 20,
     backgroundColor: '#ffffff',
     flex:1
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
