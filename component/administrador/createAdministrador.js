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
import FadeInView from 'react-native-fade-in-view';
import Admin from '../../services/admin';
import Player from '../../services/player';
import Loader from '../app/loading';
import ComplejoService from '../../services/complejo';
var t = require('tcomb-form-native');
import SoundManager from '../../services/soundManager';
import Icon from 'react-native-vector-icons/FontAwesome';
var Form = t.form.Form;
import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
var ImagePicker = require('react-native-image-picker')
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const fs = RNFetchBlob.fs

var secondaryApp;
export default class CreateAdministrador extends Component {
  constructor(props){
    super(props)
    this.state = {
      admin: {
        nombre: '',
        primerApellido:'',
        segundoApellido:'',
        cedula: '',
        email: '',
        telefono: '',
        complejo:'',
        image:'',
        rol:''

      },
      nombre: '',
      primerApellido:'',
      segundoApellido:'',
      cedula: '',
      email: '',
      complejo:'',
      password: '116140419',
      telefono: '',
      source:'none',
      scene:'createInfo',
      submitted:false,
      complejosArray:[],
    }
    this.signUp = this.signUp.bind(this)
  }
  componentDidMount() {
    var config = {apiKey: "AIzaSyC57BGCDLISl9FLkuFqeokqnMUeuLzdjEw",
        authDomain: "mejengalegends-c5146.firebaseapp.com/",
        databaseURL: "https://mejengalegends-c5146.firebaseio.com/"}

      secondaryApp  = firebase.initializeApp(config, "Secundary");
      ComplejoService.getAll((complejos)=>{
          this.setState({complejosArray:complejos,complejo:complejos[0]})

          },()=>{
             this.setState({scene:"noComplejos",complejosArray:[]})
          }
      )
  }

  componentWillUnmount(){
    secondaryApp.delete()
  }
  isValid = () => {
    var toValidate = [this.state.nombre,this.state.primerApellido,this.state.segundoApellido,this.state.cedula,this.state.telefono,this.state.email]
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
  onChangedOnlyNumbersCedula(text){
     var newText = '';
     var numbers = '0123456789';
     if(text.length < 1){
       this.setState({ cedula: '' });
     }
     for (var i=0; i < text.length; i++) {
          if(numbers.indexOf(text[i]) > -1 ) {
               newText = newText + text[i];
          }
          this.setState({ cedula: newText });
      }
  }

  onChangedOnlyNumbersTelefono(text){
     var newText = '';
     var numbers = '0123456789';
     if(text.length < 1){
       this.setState({ telefono: '' });
     }
     for (var i=0; i < text.length; i++) {
          if(numbers.indexOf(text[i]) > -1 ) {
               newText = newText + text[i];
          }
          this.setState({ telefono: newText });
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
           this.state.admin.image = url;
           this.signUp();
           resolve(url)
       })
       .catch((error) => {
         reject(error)
       })
   })
 }

 showScene = () => {
   switch (this.state.scene) {
     case 'createInfo':
       return this.showCreateInfo()
       break;
     case 'loading':
       return <Loader/>
       break;
     default:

   }
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
   this.state.admin.nombre = this.state.nombre;
   this.state.admin.primerApellido = this.state.primerApellido;
   this.state.admin.segundoApellido = this.state.segundoApellido;
   this.state.admin.username = this.state.email.split("@")[0]
   this.state.admin.cedula = this.state.cedula;
   this.state.admin.telefono = this.state.telefono;
   this.state.admin.rol = 'admin'
   this.state.admin.email = this.state.email.trim();
   this.state.admin.complejo = { nombre: this.state.complejo.nombre ,complejoGUID:this.state.complejo.uid};
   this.setState({submitted:true})
   if(this.isValid()){
   if(this.state.source=='none'){
     this.signUp();
   }else{
   this.uploadImage(this.state.source)
}
}

 }
 async sendVerification(user) {
   try {
     user.sendEmailVerification().then(function() {
     }, function(error) {
       // An error happened.
     });
   } catch(error){
     this.setState({
       response: error.toString()
     })
   }
 }
 async signUp() {
     SoundManager.playPushBtn();
     await secondaryApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.cedula).then((user)=>{
       this.setState({scene:'loading'})
       var admin = this.state.admin;
       admin.uid = user.uid;
       Admin.new(user.uid,admin)
       if(this.state.complejo.noAdmin){
         ComplejoService.update(this.state.complejo.uid,{noAdmin:false})
       }
       this.sendVerification(user)
        secondaryApp.auth().signOut();

      }).catch((error)=>{
        console.log(error.message)
        switch (error.message) {

           case 'The email address is badly formatted.':
           ToastAndroid.show("El correo electrónico contiene un formato invalido.", ToastAndroid.LONG);
           break;
           case 'The password must be 6 characters long or more.':
            ToastAndroid.show("La contraseña debe de tener al menos 6 carácteres", ToastAndroid.LONG);
           break;
           case 'The email address is already in use by another account.':
            ToastAndroid.show("El correo electrónico ya está en uso por otra cuenta.", ToastAndroid.LONG);
           break;
           break;
           case 'Password should be at least 6 characters':
            ToastAndroid.show("La contraseña debe de tener al menos 6 carácteres", ToastAndroid.LONG);
           break;

          default:

        }
      });

 }
showCreateInfo = () => {
  let complejos = this.state.complejosArray.map( (complejo, key) => {
     return <Picker.Item  key={key} value={complejo} label={complejo.nombre} />
   });
  return (
    <FadeInView style={styles.container} duration={600}>
      <View style={styles.infoContainer}>
        <View style={styles.mainName}>
            <Text style={styles.whiteFont}>Crear un administrador</Text>
        </View>
        <View style={styles.subtitle}>
            <Text style={styles.whiteFont2}>Información básica</Text>
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
       <View style={{flexDirection:'row',flex:3,marginVertical:30}}>
       <TextInput
       underlineColorAndroid={this.isEmpty(this.state.nombre)}
       placeholderTextColor="grey"
       placeholder="Nombre"
       autocapitalize={true}
       disableFullscreenUI={true}
       style={[styles.inputText,{flex:1}]}
       onChangeText={(nombre) => this.setState({nombre})}
       />
       <TextInput
       underlineColorAndroid={this.isEmpty(this.state.primerApellido)}
       placeholderTextColor="grey"
       placeholder="Primer Apellido"
       disableFullscreenUI={true}
       style={[styles.inputText,{flex:1}]}
       onChangeText={(primerApellido) => this.setState({primerApellido})}
       />

      </View>
      <View style={{flexDirection:'row',flex:3,marginVertical:30}}>
      <TextInput
      underlineColorAndroid={this.isEmpty(this.state.segundoApellido)}
      placeholderTextColor="grey"
      placeholder="Segundo Apellido"
      disableFullscreenUI={true}
      style={[styles.inputText,{flex:1}]}
      onChangeText={(segundoApellido) => this.setState({segundoApellido})}
      />
      <TextInput
      underlineColorAndroid={this.isEmpty(this.state.cedula)}
      placeholderTextColor="grey"
      placeholder="Número cédula"
      autocapitalize={true}
      disableFullscreenUI={true}
      style={[styles.inputText,{flex:1}]}
      onChangeText={(cedula) => this.onChangedOnlyNumbersCedula(cedula)}
      />


     </View>
     <View style={{flexDirection:'row',flex:3,marginVertical:30}}>
     <TextInput
     underlineColorAndroid={this.isEmpty(this.state.telefono)}
     placeholderTextColor="grey"
     placeholder="Número teléfono"
     disableFullscreenUI={true}
     style={[styles.inputText,{flex:1}]}
     onChangeText={(telefono) => this.onChangedOnlyNumbersTelefono(telefono)}
     />
     <TextInput
     underlineColorAndroid={this.isEmpty(this.state.email)}
     placeholderTextColor="grey"
     placeholder="Correo electrónico"
     autocapitalize={true}
     disableFullscreenUI={true}
     style={[styles.inputText,{flex:1}]}
       onChangeText={(email) => this.setState({email})}
     />


    </View>
     <View style={{flexDirection:'column',marginVertical:20}}>
         <View style={{flex:1,marginBottom:25}}>
          <Text style={styles.bold}>Selecciona el complejo deportivo</Text>
         <Picker style={styles.androidPicker} selectedValue={this.state.complejo}
           onValueChange={ (complejo) => (this.setState({complejo}))}>
           {complejos}
           </Picker>

         </View>
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

    </View>
    </View>
    </FadeInView>

  )
}
  render(){
   return ( <View style={{flex:1}}>
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
  textAlign:'center'
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
  whiteFont2:{
    color:'#1A237E',
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
