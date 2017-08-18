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
  Picker,
  Platform,
  Alert
} from 'react-native'
var moment = require('moment');
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
//import Cancha from '../../services/cancha';
import ComplejoService from '../../services/complejo';
import Loader from '../app/loading';
var t = require('tcomb-form-native');
var Form = t.form.Form;

import Icon from 'react-native-vector-icons/FontAwesome';

import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
var ImagePicker = require('react-native-image-picker')
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const fs = RNFetchBlob.fs

export default class EditCancha extends Component {
  constructor(props){
    super(props)
    this.state = {
      techoOptions: ["Si","No"],
      source:'none',
      scene:'EditCancha',
      submitted:false,
       // Estados del constructor
       nombre: this.props.cancha.nombre,
       gramilla: this.props.cancha.gramilla,
       capacidad : this.props.cancha.capacidad,
       numero: this.props.cancha.numero,
       techo: this.props.cancha.techo
    }   
  }

  isEmpty = (val) => {
    if(this.state.submitted){
      if(val===""){
        return '#F44336';
      }else{
        return '#42A5F5';
      }
    } else{
      return '#42A5F5';
    }
  }

  isValid = () => {
   if(this.state.nombre===""){
     ToastAndroid.show('Por favor verifica el formulario', ToastAndroid.LONG);
     return false;
   }else{
     return true;
   }
  }

  setMyCanchaMenu = ()=>{
    this.setState({scene:'EditCancha'})
  }

  showScene = () => {
    switch (this.state.scene) {
    case 'EditCancha':
      return this.showEditCancha()
      break;
    case 'loading':
      return <Loader/>
      break;
    default:
    }
  }

  showEditCancha = () => {
    let techoPicker = this.state.techoOptions.map( (s, i) => {
      return <Picker.Item  key={i} value={s} label={s} />
    });


  return (
    <FadeInView style={styles.container} duration={600}>
      <View style={styles.infoContainer}>
        <View style={styles.mainName}>
            <Text style={styles.whiteFont}>Editar cancha</Text>
        </View>
       <View style={{padding:20,flex:1}}>
       <ScrollView>
          <View style={{flexDirection:'row',flex:3}}>
            <TextInput
            underlineColorAndroid={this.isEmpty(this.state.nombre)}
            placeholderTextColor="grey"
            placeholder="Nombre de la cancha"
            value={this.state.nombre}
            autocapitalize={true}
            disableFullscreenUI={true}
            style={[styles.inputText,{flex:1}]}
            onChangeText={(nombre) => this.setState({nombre})}
            />
          </View>
          <View style={{flexDirection:'row',flex:3}}>
            <TextInput
            underlineColorAndroid={this.isEmpty(this.state.capacidad)}
            placeholderTextColor="grey"
            placeholder="Capacidad de la cancha"
            value={this.state.capacidad}
            autocapitalize={true}
            disableFullscreenUI={true}
            keyboardType={'numeric'}
            style={[styles.inputText,{flex:1}]}
            onChangeText={(capacidad) => this.setState({capacidad})}
            />
            </View>
          <View style={{flexDirection:'row',flex:3}}>           
            <TextInput
            underlineColorAndroid={this.isEmpty(this.state.numero)}
            placeholderTextColor="grey"
            placeholder="Numero de la cancha"
            value={this.state.numero}
            autocapitalize={true}
            disableFullscreenUI={true}
            keyboardType={'numeric'}
            style={[styles.inputText,{flex:1}]}
            onChangeText={(numero) => this.setState({numero})}
            />
            </View>
            <View style={{flexDirection:'column',marginVertical:20}}>
            <Text style={styles.bold}>Bajo techo</Text>
            <Picker style={styles.androidPicker} ref='techo' label='Techo' style={{backgroundColor: 'rgba(0, 0, 0, 0.0)'}}
                selectedValue = {this.state.techo} value ={this.state.techo} options={this.state.techoOptions}                              
                onValueChange={(techo) => this.setState({techo:techo})} >
                {techoPicker} 
             </Picker>
             </View>
       <TouchableOpacity style={styles.button2}  onPress={this.submit} underlayColor='#99d9f4'>
           <Text style={styles.buttonText2}>¡Listo!</Text>
       </TouchableOpacity>
     </ScrollView>
        </View>
    </View>
    <View style={{flex:1,flexDirection:'row'}}>
      <TouchableOpacity onPress={this.props.back} style={{flex:1, alignItems:'flex-start'}}>
        <View style={styles.buttonBackPadre}>
          <View style={styles.buttonBackHijo}/>
            <Text style={{ backgroundColor: 'transparent',fontSize: 16,color:'white'}}>
                <Icon name="chevron-left" size={15} color="#FFFFFF"/> Atrás
            </Text>
        </View>
     </TouchableOpacity>
     <View style={{flex:1, alignItems:'flex-end'}}>
            <TouchableOpacity style={styles.button} onPress={()=>{this.deleteCancha()}}><Text style={styles.textButton}><Icon name="pencil" size={15} color="#FFFFFF"/> Eliminar</Text></TouchableOpacity>
    </View>
    </View>
    </FadeInView>
  )
 }

 deleteCancha(){
    this.setState({scene:'loading'})
    ComplejoService.deleteCancha(this.props.cancha.uid);
    this.props.back();
 }

 submit = () =>{
   this.props.cancha.nombre = this.state.nombre;
   this.props.cancha.gramilla = this.state.gramilla;
   this.props.cancha.capacidad = this.state.capacidad;
   this.props.cancha.numero = this.state.numero;
   this.props.cancha.techo = this.state.techo;

   this.setState({submitted:true})

    if(this.isValid()){
        this.setState({scene:'loading'})
        ComplejoService.updateCancha(this.props.cancha.uid, this.props.cancha);
        this.props.back();
  }
 }

  render(){
      return(<View style={{flex:1}}>
       {this.showScene()}
      </View>

    )
  }
}

const styles = StyleSheet.create({
  buttonText2: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  profileImage:{
    height:100,
    width:150,
    borderWidth:2,
    borderColor:'white'
  },
  button2: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
info:{
borderBottomWidth:1,
borderBottomColor:'#9E9E9E',
margin:5,
flexDirection:'row',
},
flexStart:{
textAlign:'left',
color:'black',
flex:1
},
flexEnd:{
textAlign:'right',
flex:1
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
boldFont:{
fontWeight:'bold',
fontSize:20,
},
basicInfo:{
flex:1,
flexDirection:'row',
padding:10
},
container:{
flex:1,
borderRadius:20,
},
mainName:{
backgroundColor:'#1565C0',
padding:7
},
subtitle:{
backgroundColor:'#42A5F5',
padding:8
},
whiteFont2:{
color:'#1A237E',
},
whiteFont:{
color:'white',
textAlign:'left'
},
infoContainer:{
flex:10,
backgroundColor:'white',
borderRadius:10,
margin:20
},
title:{
fontSize:20,
color:'white',
marginVertical:10
},
subTitle:{
fontSize:15,
color:'white',
},
whiteFont:{
color:'white',
textAlign:'center'
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
circularIcon:{
borderWidth:1,
borderColor:'rgba(0,0,0,0.2)',
alignItems:'center',
justifyContent:'center',
width:50,
height:50,
backgroundColor:'#EEEEEE',
borderRadius:100,
},
redButton:{
margin:10,
backgroundColor:'red',
paddingVertical:5,
paddingHorizontal:10,
borderRadius:20
}

})
