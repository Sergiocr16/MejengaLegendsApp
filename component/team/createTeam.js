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
import Team from '../../services/team';
var t = require('tcomb-form-native');
var Form = t.form.Form;

var Gender = t.enums({
  Masculino: 'Masculino',
  Femenino: 'Femenino'
});

const NewPlayer = t.struct({
  nombre: t.String,
  lema: t.String, // a required string// an optional string
  fechaCreacion: t.Date,
  gender: Gender,
});


var formOptions = {
auto: 'placeholders',
fields: {
    gender: {
      nullOption: {value: '', text: 'Selecciona el género del equipo'},
      order: 'asc'
    },
    fechaCreacion:{
      hidden:true
    }
  }};

export default class CreateTeam extends Component {
  constructor(props){
    super(props)
    this.state = {
      team: ''
  }
  }
 submit(team){
    if (team) {
    Team.new(team);
   }
 }
  render(){
    return (
    <FadeInView style={styles.container} duration={30}>
      <Text>Registra un equipo</Text>
    <ScrollView>
    <Form ref="form" type={NewPlayer} options={formOptions}/>
      <TouchableHighlight style={styles.button}  onPress={()=>{this.submit(this.refs.form.getValue())}} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Registrar equipo</Text>
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
