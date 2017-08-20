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
  Platform
} from 'react-native'
var moment = require('moment');
import * as firebase from 'firebase'
import Icon from 'react-native-vector-icons/FontAwesome';
import FadeInView from 'react-native-fade-in-view';
import Player from '../../services/player';
import Loader from '../app/loading';
import SoundManager from '../../services/soundManager';
var ImagePicker = require('react-native-image-picker')
var t = require('tcomb-form-native');
var Form = t.form.Form;
import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const fs = RNFetchBlob.fs
export default class EditPlayer extends Component {
  constructor(props){
    super(props)
      var years = parseInt(moment(new Date()).format('YYYY')) - parseInt(moment(this.props.player.fechaNacimiento).format('YYYY'));
    this.state = {
      scene:'editInfo',
      player:{},
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
      feet:['Derecho','Izquiero','Ambidiestro'],
      source: 'none'
    }
  }

  showScene = () => {
    switch (this.state.scene) {
      case 'editInfo':
        return this.showEditInfo()
        break;
      case 'loading':
        return <Loader/>
        break;
      default:

    }
  }
  openDatePicker = async () =>{
     try {
       var yearSet = parseInt(moment(new Date()).format('YYYY')) - 15
       var maxYear = parseInt(moment(new Date()).format('YYYY')) - 5
       const {action, year, month, day} =  await DatePickerAndroid.open({
         date: new Date(this.state.fechaNacimiento),
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
          this.state.player.image = url;
          Player.update(firebase.auth().currentUser.uid,this.state.player)
          this.props.back()
          resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
 submit = () =>{
   this.state.player.firstTime = false;
   this.state.player.nombre = this.state.nombre;
   this.state.player.primerApellido = this.state.primerApellido;
   this.state.player.segundoApellido = this.state.segundoApellido;
   this.state.player.genero = this.state.genero;
   this.state.player.pieDominante = this.state.pieDominante;
   this.state.player.posicionPrincipal = this.state.posicionPrincipal;
   this.state.player.posicionSecundaria = this.state.posicionSecundaria;
   this.state.player.fechaNacimiento = this.state.fechaNacimiento;
   this.state.player.score = this.props.player.score;
   this.state.player.liga = this.props.player.liga;
   this.state.player.fichable = this.props.player.fichable;
   this.state.player.altura = this.state.altura;
   this.state.player.username = this.props.player.username;
   SoundManager.playPushBtn();
   this.setState({submitted:true})
   if(this.isValid()){
   this.setState({scene:'loading'})
   if(this.state.source=='none'){
     Player.update(firebase.auth().currentUser.uid,this.state.player)
     this.props.back()
   }else{
   this.uploadImage(this.state.source)
}
}
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
     isEmpty = (val) => {
         if(val===""){
           return '#F44336';
         }else{
           return '#42A5F5';
         }
     }

     isValid = () => {
       var toValidate = [this.state.nombre,this.state.primerApellido,this.state.segundoApellido,this.state.altura]
       var invalidItems = 0;
      toValidate.map((val)=>{
        if(val===""){
          invalidItems++;
        }
      })
      if(invalidItems==0){
        return true;
      }else{
        ToastAndroid.show('Por favor verifica el formulario', ToastAndroid.LONG);
        return false;
      }
     }
     showImage = () => {
       if(this.state.source!=='none'){
        return <Image style={styles.profileImage} borderRadius={10} source={{uri: this.state.source}}></Image>
       }else{
       if(this.props.player.image==undefined){
       return  <Image style={styles.profileImage} borderRadius={10} source={{uri: 'http://www.regionlalibertad.gob.pe/ModuloGerencias/assets/img/unknown_person.jpg'}}></Image>
       }else{
         return <Image style={styles.profileImage} borderRadius={10} source={{uri: this.props.player.image}}></Image>
       }
     }
     }

     onChangedOnlyNumbers(text){
        var newText = '';
        var numbers = '0123456789';
        if(text.length < 1){
          this.setState({ altura: '' });
        }
        for (var i=0; i < text.length; i++) {
             if(numbers.indexOf(text[i]) > -1 ) {
                  newText = newText + text[i];
             }
             this.setState({ altura: newText });
         }
     }
  showEditInfo = () => {
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
    <ScrollView style={{flex:1}}>
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
    underlineColorAndroid={this.isEmpty(this.state.nombre)}
    placeholderTextColor="grey"
    placeholder="Nombre"
    autocapitalize={true}
    disableFullscreenUI={true}
    style={[styles.inputText,{flex:1}]}
    value={this.state.nombre}
    onChangeText={(nombre) => this.setState({nombre})}
    />
    <TextInput
    underlineColorAndroid={this.isEmpty(this.state.primerApellido)}
    placeholderTextColor="grey"
    placeholder="Primer Apellido"
    disableFullscreenUI={true}
    style={[styles.inputText,{flex:1}]}
    value={this.state.primerApellido}
    onChangeText={(primerApellido) => this.setState({primerApellido})}
    />
    <TextInput
    underlineColorAndroid={this.isEmpty(this.state.segundoApellido)}
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
     underlineColorAndroid={this.isEmpty(this.state.altura)}
     placeholderTextColor="grey"
     placeholder="en (cm)"
     keyboardType='numeric'
     onChangeText={(altura) => this.onChangedOnlyNumbers(altura)}
     maxLength={3}
     disableFullscreenUI={true}
     style={styles.inputText}
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
  render(){

    return (
   <View style={styles.container}>
    {this.showScene()}
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
 profileImage:{
   height:100,
   width:100,
   borderWidth:2,
   borderColor:'white'
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
   backgroundColor: '#1565C0',
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
    backgroundColor:'#1565C0',
    padding:7,
   borderTopLeftRadius:10,
   borderTopRightRadius:10
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
