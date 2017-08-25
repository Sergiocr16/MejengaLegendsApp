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
import FadeInView from 'react-native-fade-in-view';
import Loader from '../app/loading';
import SoundManager from '../../services/soundManager';
import Icon from 'react-native-vector-icons/FontAwesome';
import Admin from '../../services/admin';
import CreateAdministrador from '../administrador/createAdministrador';

export default class AdminMenuDeSuperAdmin extends Component {
  constructor(props){
    super(props)
    this.state = {
        scene:'loading',
        admins : [],
        currentAdmin:{}
    }
  }
  componentDidMount() {
    Admin.getAll((admins)=>{
      this.setState({admins,scene:'showAdmins'})
    },()=>{   this.setState({scene:'noPlayers'})})
  }
  setSceneAdminsMenu =()=>{
    SoundManager.playBackBtn();
    this.setState({scene:'administradoresMenu'})
  }
  setSceneCreateAdmin = ()=>{
    SoundManager.playPushBtn()
     this.setState({scene:'createAdmin'})
  }
  showScene = () => {
    switch (this.state.scene) {
      case 'loading':
        return <Loader/>
        break;
      case 'showAdmins':
        return this.allAdminstrators()
        break;
        case 'noPlayers':
          return this.noPlayers()
          break;
        case 'createAdmin':
          return <CreateAdministrador back={()=>{this.setSceneAdminsMenu()}} showBackButton={true}  />
          break;
      default:

    }
  }
centerNoText = (jugadores) => {
  if(jugadores.length==0){
    return {flex:5,flexDirection:'row',paddingHorizontal:10,alignItems:'center',justifyContent:'center'}
  }
  return {flex:5,flexDirection:'row',paddingHorizontal:10}
}
noPlayers(){
  return (
    <FadeInView style={styles.container}>
    <FadeInView style={styles.infoContainer} duration={300}>
    <View style={styles.mainName}><Text style={styles.whiteFont}>Administradores de complejos</Text></View>
    <View style={styles.subtitle}><Text style={[styles.blueFont,{textAlign:'center'}]}>Control de administradores</Text></View>
     <View style={styles.basicInfo}>
     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
     <Text style={{textAlign:'center',fontSize:18}} >No existen administradores registrados aún</Text>
     </View>
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
     <View style={{flex:1, alignItems:'flex-end'}}>
     <TouchableOpacity style={styles.button} onPress={this.setSceneCreateAdmin} ><Text style={styles.textButton}><Icon name="plus" size={15} color="#FFFFFF"/> Crear administrador</Text></TouchableOpacity>
     </View>
    </View>
    </FadeInView>
  )
}
allAdminstrators = () => {
  let administradores =  this.state.admins.map( (val, key) => {
    if(val.nombre!==undefined){
          return <TouchableOpacity onPress={()=> { this.setState({currentPlayer:val}); this.setScenePlayerProfile();   }}
                 key={key} style={{flexDirection:'row', justifyContent:'center',alignItems:'center',backgroundColor:'#EEEEEE',borderRadius:5,marginBottom:5,padding:5}}>
                  <Text style={{flex:1,borderRightWidth:1,paddingHorizontal:4,borderColor:'#9E9E9E'}}>{val.nombre +" "+ val.primerApellido+" "+val.segundoApellido}</Text>
                  <Text style={{flex:1,borderRightWidth:1,paddingHorizontal:10,borderColor:'#9E9E9E'}}>{val.cedula}</Text>
                  <Text style={{flex:1,borderRightWidth:1,paddingHorizontal:10,borderColor:'#9E9E9E' }}>{val.telefono}</Text>
                  <Text style={{flex:1,paddingHorizontal:10 }}>{val.email}</Text>
                 </TouchableOpacity>
               }
      });
      return (
          <FadeInView style={styles.container}>
            <FadeInView style={styles.infoContainer} duration={300}>
          <View style={styles.mainName}><Text style={styles.whiteFont}>Administradores de complejos</Text></View>
          <View style={[styles.subtitle,{flexDirection:'row'}]}><Text style={[styles.blueFont,{flex:1,marginHorizontal:4}]}>Nombre completo</Text><Text style={[styles.blueFont,{flex:1}]}>Cédula</Text><Text style={[styles.blueFont,{flex:1}]}>Teléfono</Text><Text style={[styles.blueFont,{flex:1}]}>Email</Text></View>
            <View style={{flex:1,padding:10}}>
                <ScrollView>
                {administradores}
               </ScrollView>
              </View>
              </FadeInView>
              <View style={{flex:1,flexDirection:'row'}}>
                  <TouchableOpacity onPress={()=>{this.setState({scene:'loading'});
                       this.props.back()}} style={{flex:1, alignItems:'flex-start'}}>
                      <View style={styles.buttonBackPadre}>
                      <View style={styles.buttonBackHijo}/>
                          <Text style={{ backgroundColor: 'transparent',fontSize: 16,color:'white'}}>
                              <Icon name="chevron-left" size={15} color="#FFFFFF"/> Atrás
                          </Text>
                      </View>
                  </TouchableOpacity>
                  <View style={{flex:1, alignItems:'flex-end'}}>
                  <TouchableOpacity style={styles.button} onPress={this.setSceneCreateAdmin} ><Text style={styles.textButton}><Icon name="plus" size={15} color="#FFFFFF"/> Crear administrador</Text></TouchableOpacity>
                  </View>
              </View>
              </FadeInView>
      )
}
  isEmpty = (val) => {
    if(this.state.submitted){
      if(val===""){
        return '#F44336';
      }else{
        return '#9E9E9E';
      }
    } else{
      return '#9E9E9E';
    }
  }


showResults = (jugadores) => {
  if(jugadores.length==0){
    return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>No tiene ninguna cancha registrada.</Text></View>
  }else{
    return jugadores;
  }
}
  render(){

    return (
      <View style={{flex:1}}>
      {this.showScene()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  circularIcon:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:60,
    height:60,
    backgroundColor:'#EEEEEE',
    borderRadius:100,
  },
  inputText: {
    height: 31,
    paddingHorizontal: 20,
    paddingVertical:1,
    color: 'grey',
    textAlign:'center',
    borderWidth: 1,
    margin: 5,
    borderRadius:4,
  },
  resultadoBusqueda:{
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginRight: 5,
    borderRadius:4,
  },
  jugadoresSeleccionados:{
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginLeft: 5,
    borderRadius:4,
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
  infoContainer:{
    flex:10,
    backgroundColor:'white',
    borderRadius:10,
    margin:20
  },
  mainName:{
    backgroundColor:'#1565C0',
    padding:7,
   borderTopLeftRadius:10,
   borderTopRightRadius:10
  },
  position:{
   backgroundColor:'#388E3C',
   padding:5,
   borderRadius:5,
   borderWidth:1,
   borderColor:'white',
   flex:1,
   color:'white',
   paddingHorizontal:10,
   fontWeight:'bold',
   textAlign:'center'
 },
  score:{
    backgroundColor:'#FDD835',
    padding:3,
    borderRadius:5,
    borderWidth:1,
    borderColor:'white',
    color:'white',
    margin:3,
    height:20,
    fontWeight:'bold',
    textAlign:'center'
  },
  subtitle:{
    backgroundColor:'#BBDEFB',
    padding:8
  },
  blueFont:{
    color:'#1A237E',
  },
  whiteFont:{
    color:'white',
    fontWeight:'bold',
    textAlign:'center'
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
 basicInfo:{
   flex:1,
   flexDirection:'row',
   padding:20
 },
 container:{
   flex:1,
   borderRadius:20,
 },
   title: {
     fontSize: 30,
     alignSelf: 'center',
     marginBottom: 30
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
   buttonBuscarJugador: {
     height: 31,
     backgroundColor: '#689F38',
     borderRadius: 8,
     margin: 5,
     alignSelf: 'stretch',
     justifyContent: 'center'
   }
})
