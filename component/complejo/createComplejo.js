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
import SoundManager from '../../services/soundManager';
import Icon from 'react-native-vector-icons/FontAwesome';

import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
var ImagePicker = require('react-native-image-picker')
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const fs = RNFetchBlob.fs

export default class CreateComplejo extends Component {
  constructor(props){
    super(props)
    this.state = {
      provinciaList: ['Alajuela', 'Cartago', 'Guanacaste', 'Heredia', 'Limon', 'Puntarenas', 'San José'],
      cantonList:  ["Aserrí","Coronado","Curridabat","Desamparados","Dota","Escazú", "Montes de Oca","Mora",
      "Moravia","San José Central","Perez Zeledón","Santa Ana","Alajuelita","Tarrazú","Tibás"],
      // Estados del constructor
      uid: null,
      nombre: '',
      provincia: 'San José',
      canton: 'Aserrí',
      comodidadesDefault: [{nombre:"Parqueo",icono:"car",selected:false},
                           {nombre:"Se aceptan tarjetas",icono:"credit-card-alt",selected:false},
                           {nombre:"Restaurante",icono:"cutlery",selected:false},
                           {nombre:"Vestidores",icono:"black-tie",selected:false},
                           {nombre:"Duchas",icono:"shower",selected:false},
                           {nombre:"Cajero Automático",icono:"money",selected:false},
                           {nombre:"Wifi gratis",icono:"wifi",selected:false},
                           {nombre:"Cafetería",icono:"coffee",selected:false},
                           {nombre:"Graderías",icono:"tty",selected:false}],
      // Objeto para registrar y editar
      newComplejo: {
          uid: null,
          nombre: '',
          provincia: '',
          canton: '',
          comodidades: [],
          noAdmin:true,
          administrador: {nombre:null, jugadorGUID:null}
      },
      imagePath: null,
      imageHeight: null,
      imageWidth: null,
      source:'none',
      scene:'createComplejo',
      submitted:false
    }
  }

  handleProvinciaChange(idProv){
    this.setState({provincia: idProv})
    switch (idProv) {
        case 'San José':
            this.setState({cantonList : ["Aserrí","Coronado","Curridabat","Desamparados","Dota","Escazú", "Montes de Oca","Mora",
            "Moravia","San José Central","Perez Zeledón","Santa Ana","Alajuelita","Tarrazú","Tibás"]})
            break;
        case 'Alajuela':
            this.setState({cantonList :['Alajuela','San Ramón','Grecia','San Mateo','Atenas','Naranjo','Palmares',
            'Poás','Orotina','San Carlos','Zarcero','Valverde Vega','Upala','Los Chiles','Guatuzo','Rio Cuarto']})
            break;
        case 'Cartago':
            this.setState({cantonList : ["Cartago","Paraíso","La Unión","Jiménez","Turrialba","Alvarado","Oreamuno","El Guarco"]})
            break;
        case 'Guanacaste':
            this.setState({cantonList : ['Liberia','Nicoya','Santa Cruz','Bagaces','Carrillo',
            'Cañas','Abangares','Tilarán','Nandayure','La Cruz','Hojancha']})
            break;
        case 'Heredia':
            this.setState({cantonList : ['Heredia','Barva','Santo Domingo','Santa Bárbara',
            'San Rafael','San Isidro','Belén','Flores','San Pablo','Sarapiquí']})
            break;
        case 'Limon':
            this.setState({cantonList : ['Limón','Pococí','Siquirres','Talamanca','Matina','Guácimo']})
            break;
        case 'Puntarenas':
            this.setState({cantonList : ['Puntarenas','Esparza','Buenos Aires','Montes de Oro',
            'Osa','Quepos','Golfito','Cotobrus','Parrita','Corredores','Garabito']})
            break;
        default:
    }
  }

  handleCantonChange(idCanton){
      this.setState({canton: {idCanton}})
  }
  componentDidMount() {
    this.setMyComplejoMenu();
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
           this.state.newComplejo.image = url;
           ComplejoService.newWithKey(this.state.newComplejo)
           this.props.back();
           resolve(url)
       })
       .catch((error) => {
         reject(error)
       })
   })
  }
  setMyComplejoMenu = ()=>{
    this.setState({scene:'createComplejo'})
  }
  showScene = () => {
    switch (this.state.scene) {
    case 'createComplejo':
      return this.showCreateComplejo()
      break;
    case 'loading':
      return <Loader/>
      break;
    default:
    }
  }

  defineComodidades = () => {
    var comodidades = []
    this.state.comodidadesDefault.map((val)=>{
      if(val.selected){
        comodidades.push({nombre:val.nombre,icono:val.icono})
      }
    })
    return comodidades;
  }
  seleccionaComodidad = (key) => {
    SoundManager.playBackBtn()
    var updatedArray = this.state.comodidadesDefault;
    updatedArray[key].selected = !updatedArray[key].selected;
    this.setState({comodidadesDefault:updatedArray})
  }
  showComodidades = () => {
    return this.state.comodidadesDefault.map( (val, key) => {
      if(!val.selected){
        return <TouchableOpacity key={key} onPress={()=>{this.seleccionaComodidad(key)}}>
        <View style={{margin:3,padding:2,backgroundColor:"#E0E0E0",borderRadius:5,justifyContent:'center',alignItems:'center'}}>
        <Icon name={val.icono} size={25} color="#9E9E9E"/>
        <Text style={{textAlign:'center',color:"#9E9E9E",textAlign:'center'}}>{val.nombre}</Text>
        </View>
        </TouchableOpacity>
      }else{
        return (<TouchableOpacity key={key} onPress={()=>{this.seleccionaComodidad(key)}}>
        <View style={{margin:3,padding:2,backgroundColor:"#E0E0E0",borderRadius:5,justifyContent:'center',alignItems:'center'}}>
        <Icon name={val.icono} size={25} color="#1565C0"/>
        <Text style={{textAlign:'center',color:"#1565C0",textAlign:'center'}}>{val.nombre}</Text>
        </View>
        </TouchableOpacity>)
    }
    });
  }

  showCreateComplejo = () => {
    let provinciaPicker = this.state.provinciaList.map( (s, i) => {
      return <Picker.Item  key={i} value={s} label={s} />
    });

    let cantonPicker = this.state.cantonList.map( (s, i) => {
      return <Picker.Item  key={i} value={s} label={s} />
  });

  return (
    <FadeInView style={styles.container} duration={600}>
      <View style={styles.infoContainer}>
        <View style={styles.mainName}>
            <Text style={styles.whiteFont}>Crea un complejo</Text>
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
         <View style={{flexDirection:'row',flex:3}}>
           <TextInput
           underlineColorAndroid={this.isEmpty(this.state.nombre)}
           placeholderTextColor="grey"
           placeholder="Nombre del complejo"
           autocapitalize={true}
           disableFullscreenUI={true}
           style={[styles.inputText,{flex:1}]}
           onChangeText={(nombre) => this.setState({nombre})}
           />
        </View>
        <View style={{flexDirection:'column',marginVertical:20}}>
          <View style={{flex:1}}>
             <Text style={styles.bold}>Selecciona la provincia</Text>
             <Picker style={styles.androidPicker} ref='provincia' label='Provincia' style={{backgroundColor: 'rgba(0, 0, 0, 0.0)'}}
                selectedValue = {this.state.provincia} value = {this.state.provincia}
                onValueChange={this.handleProvinciaChange.bind(this)} >
                {provinciaPicker}
             </Picker>
          <Text style={styles.bold}>Selecciona el cantón</Text>
          <Picker style={styles.androidPicker} ref='canton' label='Canton' style={{backgroundColor: 'rgba(0, 0, 0, 0.0)'}}
                            options={this.state.cantonList}
                            value ={this.state.canton} selectedValue = {this.state.canton}
                            onChange={this.handleCantonChange.bind(this)}
            onValueChange={ (canton) => (this.setState({canton})) } >
            {cantonPicker}
          </Picker>
        </View>
        <View style={{flex:1}}>
        <Text style={styles.bold,{marginBottom:8}}>Selecciona las comodidades</Text>
          <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            {this.showComodidades()}
          </View>
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
          title: 'Selecciona la foto de tu complejo deportivo',
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
   this.state.newComplejo.uid = Date.now();
   this.state.newComplejo.nombre = this.state.nombre;
   this.state.newComplejo.provincia = this.state.provincia;
   this.state.newComplejo.canton = this.state.canton;
   this.state.newComplejo.comodidades = this.defineComodidades();
   this.state.newComplejo.administrador = {};
   SoundManager.playPushBtn();
   this.setState({submitted:true})
    if(this.isValid()){
        this.setState({scene:'loading'})
     if(this.state.source=='none'){
      ComplejoService.newWithKey(this.state.newComplejo)
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
