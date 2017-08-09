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
import Icon from 'react-native-vector-icons/FontAwesome';
import FadeInView from 'react-native-fade-in-view';
import Player from '../../services/player';
var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class EditPlayer extends Component {
  constructor(props){
    super(props)
      var years = parseInt(moment(new Date()).format('YYYY')) - parseInt(moment(this.props.player.fechaNacimiento).format('YYYY'));
    this.state = {
      nombre: this.props.player.nombre,
      fechaNacimiento: this.props.player.fechaNacimiento,
      years: years,
      altura:this.props.player.altura,
      primerApellido:this.props.player.primerApellido,
      segundoApellido:this.props.player.segundoApellido,
      genero:this.props.player.genero,
      posicionPrincipal:this.props.player.posicionPrincipal,
      pieDominante:this.props.player.pieDominante,
      posicionSecundaria:this.props.player.posicionSecundaria,
      genders:['Masculino','Femenino'],
      positions:['Portero','Delantero','Defensa','Libero','Medio Campista'],
      feet:['Derecho','Izquiero','Ambidiestro']
    }
  }
  openDatePicker = async () =>{
     try {
       var yearSet = parseInt(moment(new Date()).format('YYYY')) - 15
       var maxYear = parseInt(moment(new Date()).format('YYYY')) - 5
       const {action, year, month, day} =  await DatePickerAndroid.open({
         date: new Date("01/01/"+yearSet),
         maxDate: new Date("01/01/"+maxYear),
         mode: 'default',
       });
      if (action !== DatePickerAndroid.dismissedAction) {
          // Selected year, month (0-11), day
          var newFinal = new Date(year,month,day);
          var years = parseInt(moment(new Date()).format('YYYY')) - parseInt(moment(newFinal).format('YYYY'));
         this.setState({fechaNacimiento: newFinal,years})
        }
     } catch ({code, message}) {
       console.warn('Cannot open date picker', message);
     }
   }
 submit = () =>{
   // if validation fails, value will be null
   var player = {};
   player.firstTime = false;
   player.nombre = this.state.nombre;
   player.primerApellido = this.state.primerApellido;
   player.segundoApellido = this.state.segundoApellido;
   player.genero = this.state.genero;
   player.pieDominante = this.state.pieDominante;
   player.posicionPrincipal = this.state.posicionPrincipal;
   player.posicionSecundaria = this.state.posicionSecundaria;
   player.fechaNacimiento = this.state.fechaNacimiento;
   player.score = this.props.player.score;
   player.liga = this.props.player.liga;
   player.fichable = this.props.player.fichable;
   player.altura = this.state.altura;
   player.username = this.props.player.username
   Player.update(firebase.auth().currentUser.uid,player)
   this.props.back()
 }

  render(){
    let genderPicker = this.state.genders.map( (s, i) => {
       return <Picker.Item  key={i} value={s} label={s} />
     });
   let feetPicker = this.state.feet.map( (s, i) => {
      return <Picker.Item  key={i} value={s} label={s} />
    });
    let positionPicker = this.state.positions.map( (s, i) => {
       return <Picker.Item  key={i} value={s} label={s} />
     });
    return (
   <View style={styles.container}>
  <FadeInView style={styles.infoContainer} duration={300}>
  <View style={styles.mainName}><Text style={styles.whiteFont}>{this.props.player.nombre.toUpperCase()+" "+this.props.player.primerApellido.toUpperCase()}</Text></View>
  <View style={styles.subtitle}><Text style={styles.whiteFont2}>Edita tu perfil de jugador</Text></View>
    <View style={{flex:1,padding:20}}>
    <ScrollView>
    <View style={{flexDirection:'row'}}>
    <TextInput
    underlineColorAndroid='#42A5F5'
    placeholderTextColor="grey"
    placeholder="Nombre"
    autocapitalize={true}
    disableFullscreenUI={true}
    style={[styles.inputText,{flex:1}]}
    value={this.state.nombre}
    onChangeText={(nombre) => this.setState({nombre})}
    />
    <TextInput
    underlineColorAndroid='#42A5F5'
    placeholderTextColor="grey"
    placeholder="Primer Apellido"
    disableFullscreenUI={true}
    style={[styles.inputText,{flex:1}]}
    value={this.state.primerApellido}
    onChangeText={(primerApellido) => this.setState({primerApellido})}
    />
    <TextInput
    underlineColorAndroid='#42A5F5'
    placeholderTextColor="grey"
    placeholder="Segundo Apellido"
    disableFullscreenUI={true}
    style={[styles.inputText,{flex:1}]}
    value={this.state.segundoApellido}
    onChangeText={(segundoApellido) => this.setState({segundoApellido})}
    />
   </View>
   <View style={{flexDirection:'column',marginVertical:20}}>
   <View style={{flex:1,marginBottom:25}}>
    <Text style={styles.bold}>Selecciona tu género</Text>
   <Picker style={styles.androidPicker} selectedValue={this.state.genero}
     onValueChange={ (genero) => (this.setState({genero})) } >
     {genderPicker}
     </Picker>

   </View>
   <View style={{flex:1,marginBottom:25}}>
   <Text style={styles.bold}>Define tu Altura</Text>
   <TextInput
     value={this.state.altura.toString()}
     underlineColorAndroid='#42A5F5'
     placeholderTextColor="grey"
     placeholder="en (cm)"
     keyboardType='numeric'
     disableFullscreenUI={true}
     style={styles.inputText}
     onChangeText={(altura) => this.setState({altura})}
   />
    </View>
   <View style={{flex:1,marginBottom:25}}>
  <Text style={styles.bold}>Define tu Edad</Text>
  <TouchableOpacity style={styles.btnAge} onPress={this.openDatePicker}>
  <Text style={styles.ageText}>{this.state.years}</Text>
  </TouchableOpacity>

  </View>
  <View style={{flex:1,marginBottom:25}}>
   <Text style={styles.bold}>Selecciona tu pie dominante</Text>
  <Picker style={styles.androidPicker} selectedValue={this.state.pieDominante}
    onValueChange={ (pieDominante) => (this.setState({pieDominante})) } >
    {feetPicker}
    </Picker>

  </View>
  <View style={{flex:1,marginBottom:25}}>
   <Text style={styles.bold}>Selecciona tu posición principal</Text>
  <Picker style={styles.androidPicker} selectedValue={this.state.posicionPrincipal}
    onValueChange={ (posicionPrincipal) => (this.setState({posicionPrincipal})) } >
    {positionPicker}
    </Picker>

  </View>
  <View style={{flex:1,marginBottom:25}}>
   <Text style={styles.bold}>Selecciona tu posición secundaria</Text>
  <Picker style={styles.androidPicker} selectedValue={this.state.posicionSecundaria}
    onValueChange={ (posicionSecundaria) => (this.setState({posicionSecundaria})) } >
    {positionPicker}
    </Picker>

  </View>
   </View>
      <TouchableOpacity style={styles.button}  onPress={this.submit} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>¡Listo!</Text>
        </TouchableOpacity>
        </ScrollView>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonBackPadre: {
  width: 150,
  height: 50,
  overflow: 'hidden',
  backgroundColor: 'transparent',
  position: 'relative',
  paddingVertical:4,
  paddingHorizontal:15,
 },
 infoContainer:{
   flex:10,
   backgroundColor:'white',
   borderRadius:10,
   margin:20
 },
 buttonBackHijo:{
   width: 120,
   height: 140,
   position: 'absolute',
   right: 40,
   top: -30,
   backgroundColor: '#2962FF',
   transform: [{
     rotate: '138deg',
   }]
 },
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
    textAlign:'left'
  },
  whiteFont:{
    color:'white',
    textAlign:'center'
  },
  container: {
      flex:1,
      borderRadius:20
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
