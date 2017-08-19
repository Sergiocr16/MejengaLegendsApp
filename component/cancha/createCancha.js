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

import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
import CanchaService from '../../services/cancha';
import Loader from '../app/loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob';
import SoundManager from '../../services/soundManager';
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
      gramilla: 'Sintética',
      capacidad: '',
      techo: 'No',
      numero: '',
      // Objeto para registrar y editar
      cancha: {
      },
      canchas : this.props.canchas,
      ///
      techoOptions: ["Si","No"],
      gramillaOptions: ["Sintética","Natural","Híbrida"],
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
      if(val==="" || this.numberExist()){
        return '#F44336';
      }else{
        return '#42A5F5';
      }
    } else{
      return '#42A5F5';
    }
  }
  numberExist = () => {
    var exist = false;
    this.props.canchas.map((val)=>{
      if(this.state.numero == val.numero){
        exist = true
      }
    })
    return exist;
  }
  isValid = () => {
  if(this.state.numero===""){
     ToastAndroid.show('Por favor verifica el formulario', ToastAndroid.LONG);
     return false;
   }else if(this.numberExist()){
     ToastAndroid.show('Ya existe una cancha registrada con ese número', ToastAndroid.LONG);
     return false;
   }else {
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
           this.state.cancha.image = url;
           var nuevoEstado = this.props.canchas;
           nuevoEstado.push(this.state.cancha)
           CanchaService.createCancha(nuevoEstado,this.props.complejo.uid,(cancha)=>{
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
    let gramillaPicker = this.state.gramillaOptions.map( (s, i) => {
      return <Picker.Item  key={i} value={s} label={s} />
    });


  return (
    <FadeInView style={styles.container} duration={600}>
      <View style={styles.infoContainer}>
        <View style={styles.mainName}>
            <Text style={styles.whiteFont}>Crea una cancha en {this.props.complejo.nombre}</Text>
        </View>
        <View style={styles.subtitle}>
            <Text style={styles.whiteFont2}>Información básica de cancha</Text>
        </View>
       <View style={{padding:20,flex:1}}>
       <ScrollView>
       <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',margin:15}}>
        <View style={{flex:4,alignItems:'center',justifyContent:'center'}}>
        {this.showImage()}
        </View>
        <TouchableOpacity onPress={this._takePicture} style={{padding:5,borderRadius:5,backgroundColor:'#1565C0',margin:5,flex:1}}>
        <Text style={{color:'white',textAlign:'center'}}>Subir imagen</Text>
        </TouchableOpacity>
       </View>
       <View style={{flexDirection:'row',flex:3}}>
         <TextInput
         underlineColorAndroid={this.isEmpty(this.state.numero)}
         placeholderTextColor="grey"
         placeholder="Número de la cancha"
         autocapitalize={true}
         disableFullscreenUI={true}
         style={[styles.inputText,{flex:1}]}
         onChangeText={(numero) => this.setState({numero})}
         />
      </View>
        <View style={{flexDirection:'column',marginTop:15}}>
        <Text style={styles.bold}>Tipo de  gramilla</Text>
        <Picker style={styles.androidPicker} ref='techo' label='Techo' style={{backgroundColor: 'rgba(0, 0, 0, 0.0)'}}
            selectedValue = {this.state.gramilla} value = {this.state.gramilla} options={this.state.gramillaOptions}
            onValueChange={(gramilla) => this.setState({gramilla})} >
            {gramillaPicker}
         </Picker>
         </View>
         <View style={{flexDirection:'column',marginVertical:5}}>
         <Text style={styles.bold}>¿Se encuentra bajo techo?</Text>
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
   SoundManager.playPushBtn();
       const cam_options = {
         mediaType: 'photo',
         maxWidth: 1000,
         maxHeight: 1000,
         quality: 1,
         noData: true,
       };
       var options = {
          title: 'Selecciona la foto de la cancha',
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
       return  <Image style={styles.profileImage} borderRadius={10} source={{uri: 'http://www.dendrocopos.com/wp-content/themes/invictus/images/dummy-image.jpg'}}></Image>
     }
     }

 submit = () =>{
   SoundManager.playPushBtn();
   this.state.cancha.numero = this.state.numero;
   this.state.cancha.gramilla = this.state.gramilla;
   this.state.cancha.techo = this.state.techo;
   this.state.cancha.canton = this.props.complejo.canton;
   this.state.cancha.provincia = this.props.complejo.provincia;
   this.state.cancha.uid = Date.now();
   this.state.cancha.complejo = {complejoGUID:this.props.complejo.uid,nombre: this.props.complejo.nombre};
   this.setState({submitted:true})
    if(this.isValid()){
        this.setState({scene:'loading'})
    if(this.state.source=='none'){
      var nuevoEstado = this.props.canchas;
      console.log(this.props.canchas)
      nuevoEstado.push(this.state.cancha)
      CanchaService.createCancha(nuevoEstado,this.props.complejo.uid,(cancha)=>{
        this.props.back();
      });
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
