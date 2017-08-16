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

export default class CreateCancha extends Component {
  constructor(props){
    super(props)
    this.state = {
      // Estados del constructor
      uid: null,
      nombre: '',
      gramilla: '',
      capacidad: '',
      techo: 'No',
      numero: '',
      imagen: '',
      // Objeto para registrar y editar
      newCancha: {
          uid: null,
          nombre: '',
          gramilla: '',
          capacidad: '',
          techo: false,
          imagen: '',
          numero: '',
          idComplejo: null          
      },
      ///
      techoOptions: ["Si","No"],
      cancha:{ nombre: '',capacidad:'',gramilla:'',techo: false},
      imagePath: null,
      imageHeight: null,
      imageWidth: null,
      source:'none',
      scene:'CreateCancha',
      submitted:false
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

  uploadImage = (uri, mime = 'application/octet-stream') => {
   return new Promise((resolve, reject) => {
     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : this.state.imagePath
       const sessionId = new Date().getTime()
       let uploadBlob = null
       const imageRef = firebase.storage().ref('images').child(`${sessionId}`)

       fs.readFile(uploadUri, 'base64')
       .then((data) => {
         return Blob.build(data, { type: `${mime};BASE64` })
       })
       .then((blob) => {
         uploadBlob = blob
         return imageRef.put(blob, { contentType: mime })
       })
       .then(() => {
         uploadBlob.close()
         return imageRef.getDownloadURL()
       })
       .then((url) => {
           this.state.newCancha.imagen = url;
           ComplejoService.newWithCallback(this.state.newCancha,(cancha)=>{
             //canchasDelComplejo = this.props.canchas;
             //canchasDelComplejo.push(cancha);
             //ComplejoService.newCanchasByComplejo(canchasDelComplejo);
             this.props.back();
           });
           resolve(url)
       })
       .catch((error) => {
         reject(error)
       })
   })
  }
  setMyCanchaMenu = ()=>{
    this.setState({scene:'CreateCancha'})
  }

  showScene = () => {
    switch (this.state.scene) {
    case 'CreateCancha':
      return this.showCreateCancha()
      break;
    case 'loading':
      return <Loader/>
      break;
    default:
    }
  }

  showCreateCancha = () => {
    let techoPicker = this.state.techoOptions.map( (s, i) => {
      return <Picker.Item  key={i} value={s} label={s} />
    });


  return (
    <FadeInView style={styles.container} duration={600}>
      <View style={styles.infoContainer}>
        <View style={styles.mainName}>
            <Text style={styles.whiteFont}>Agregar una cancha</Text>
        </View>
       <View style={{padding:20,flex:1}}>
       <ScrollView>
          <View style={{flexDirection:'row',flex:3}}>
            <TextInput
            underlineColorAndroid={this.isEmpty(this.state.nombre)}
            placeholderTextColor="grey"
            placeholder="Nombre de la cancha"
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
                selectedValue = {this.state.techo} value = {this.state.techo} options={this.state.techoOptions}                              
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
    </View>
    </FadeInView>
  )
 }
 _takePicture = () => {
       const cam_options = {
         mediaType: 'photo',
         maxWidth: 1000,
         maxHeight: 1000,
         quality: 1,
         noData: true,
       };
       var options = {
          title: 'Selecciona tu foto de perfil',
          takePhotoButtonTitle: "Tomar una foto...",
          chooseFromLibraryButtonTitle: "Seleccionar desde la galería...",
          cameraType:'front'
         };
       ImagePicker.showImagePicker(options, (response) => {
         if (response.didCancel) {
         }
         else if (response.error) {
         }
         else {

           this.setState({
             imagePath: response.uri,
             imageHeight: response.height,
             imageWidth: response.width,
             source:response.uri
           })
         }
       })
     }
     showImage = () => {
       if(this.state.source!=='none'){
        return <Image style={styles.profileImage} borderRadius={10} source={{uri: this.state.source}}></Image>
       }else{
       return  <Image style={styles.profileImage} borderRadius={10} source={{uri: 'http://www.regionlalibertad.gob.pe/ModuloGerencias/assets/img/unknown_person.jpg'}}></Image>
     }
     }

 submit = () =>{
  this.state.newCancha.uid = Date.now();
   this.state.newCancha.nombre = this.state.nombre;
   this.state.newCancha.numero = this.state.numero;
   this.state.newCancha.gramilla = this.state.gramilla;
   this.state.newCancha.capacidad = this.state.capacidad;
   this.state.newCancha.techo = this.state.techo;
   this.state.newCancha.imagen = this.state.imagen;
   this.state.newCancha.idComplejo = this.props.complejo.uid

   this.setState({submitted:true})

    if(this.isValid()){
        this.setState({scene:'loading'})
    if(this.state.source=='none'){
        ComplejoService.newCanchaByComplejo(this.state.newCancha);
        this.props.back();
    }else{
    this.uploadImage(this.state.source)
    }
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
