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
import Player from '../../services/player';
import TeamService from '../../services/team';
import Loader from '../app/loading';
var t = require('tcomb-form-native');
var Form = t.form.Form;
import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
var ImagePicker = require('react-native-image-picker')
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const fs = RNFetchBlob.fs
export default class CreateTeam extends Component {
  constructor(props){
    super(props)

    this.state = {
      nombre: '',
      lema: '',
      genero:'Masculino',
      genders:['Masculino','Femenino'],
      player:{ nombre: '',liga:'',PrimerApellido:'',score:0},
      team:{},
      source:'none',
      scene:'createTeam'
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
           this.state.team.image = url;
           TeamService.newWithCallback(this.state.team,(equipo)=>{
             equiposDelJugador = this.props.teams;
             equiposDelJugador.push(equipo);
             TeamService.newTeamsByPlayer(equiposDelJugador);
             this.props.back();
           });
           resolve(url)
       })
       .catch((error) => {
         reject(error)
       })
   })
 }

 showScene = () => {
   switch (this.state.scene) {
     case 'createTeam':
       return this.showCreateTeam()
       break;
     case 'loading':
       return <Loader/>
       break;
     default:

   }
 }
 showCreateTeam = () => {
   let genderPicker = this.state.genders.map( (s, i) => {
      return <Picker.Item  key={i} value={s} label={s} />
    });
   return (
 <FadeInView style={styles.container} duration={30}>
 <View style={styles.mainName}><Text style={styles.whiteFont}>Crear un equipo</Text></View>
 <View style={styles.subtitle}><Text style={styles.whiteFont2}>Crea tu perfil de jugador</Text></View>
   <View style={{flex:1,padding:20}}>
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
     </FadeInView>)
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
   this.state.team.nombre = this.state.nombre;
   this.state.team.lema = this.state.lema;
   this.state.team.genero = this.state.genero;
   this.state.team.copas = 0;
   this.state.team.golesMarcados = 0;
   this.state.team.golesRecibidos = 0;
   this.state.team.rachaVictorias = 0;
   this.state.team.mayorPuntajeDeLaHistoria = 0;
   this.state.team.logo = 'shield';
   this.state.team.liga = 'Liga Amateur';
   var equiposDelJugador = {};
   this.state.team.fundador = { nombre: this.props.user.nombre + ' ' + this.props.user.primerApellido,jugadorGUID:firebase.auth().currentUser.uid};

   this.setState({scene:'loading'})
   if(this.state.source=='none'){
     TeamService.newWithCallback(this.state.team,(equipo)=>{
       equiposDelJugador = this.props.teams;
       equiposDelJugador.push(equipo);
       TeamService.newTeamsByPlayer(equiposDelJugador);
       this.props.back();
     });
   }else{
   this.uploadImage(this.state.source)
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
  androidPicker: {
    height: 40,
            alignSelf: 'stretch',
            alignItems:'center',
            justifyContent:'center',
        },
        profileImage:{
          height:100,
          width:150,
          borderWidth:2,
          borderColor:'white'
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
