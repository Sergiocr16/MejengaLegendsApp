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
import CreateCancha from './createCancha';
import Complejo from '../../services/complejo'
import Loader from '../app/loading';
import SoundManager from '../../services/soundManager';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class CanchasMenu extends Component {
  constructor(props){
    super(props)
    this.state = {
      complejo: this.props.complejo,
      canchas: [],
      currentField: '',
      scene:"loading"
    }
  }


componentDidMount(){
Complejo.getCanchasByComplejo(this.props.complejo.uid,(canchas)=>{
  console.log(canchas)
  this.setState({scene:'allFields',canchas})
},()=>{
  this.setState({scene:'allFields'})
})
}

setSceneRegistrarCancha = () => {
  SoundManager.playPushBtn();
  this.setState({scene:'createCancha'})
}

showScene =() =>{
  switch (this.state.scene) {
    case 'allFields':
      return this.showSearchingScene()
      break;
    case 'loading':
      return <Loader/>
      break;
    case 'canchaDetail':
     return <TeamDetail team={this.state.currentTeam} showEditButton={false} back={()=>{ this.setState({scene:"searching"}); SoundManager.playBackBtn() }} showBackButton={true}/>
      break;
      case 'createCancha':
       return <CreateCancha canchas={this.state.canchas} complejo={this.props.complejo} back={()=>{ this.setState({scene:"allFields"}); SoundManager.playBackBtn() }}/>
        break;
    default:

  }
}


showSearchingScene = () => {
  let canchas =  this.state.canchas.map( (val, key) => {
        return <View key={key} style={{flex:1}}>
        <TouchableOpacity onPress={()=> { this.setState({currentTeam:val,scene:'fieldDetail'});SoundManager.playPushBtn();}}
               key={key} style={{flexDirection:'row', height:80, justifyContent:'center',alignItems:'center',backgroundColor:'#EEEEEE',borderRadius:4,marginBottom:5,padding:5}}>
               <View style={{flex:3}}>
                {this.showImage(val)}
               </View>
                  <View style={{flex:4,borderRightWidth:1,marginRight:5,borderColor:'#9E9E9E' }}>
                      <Text style={{textAlign:'center',fontWeight:'bold'}}>Cancha número: {val.numero}</Text>
                  </View>
                  <Text style={{flex:3,textAlign:'center'}}>Techada:    {val.techo}</Text>
                <Text style={styles.score}>{val.gramilla}</Text>
               </TouchableOpacity>
        </View>
  });

  return (
<FadeInView style={styles.container}>
  <FadeInView style={styles.infoContainer} duration={300}>
<View style={styles.mainName}><Text style={styles.whiteFont}>CANCHAS DE {this.props.complejo.nombre.toUpperCase()}</Text></View>
<View style={styles.subtitle}><Text style={styles.whiteFont2}>Listado de canchas del complejo</Text></View>
  <View style={{flex:1,padding:10}}>
         <View style={{flex:5,flexDirection:'row',paddingHorizontal:10,justifyContent:'center',alignItems:'center'}}>
            <ScrollView style={{flex:1}}>
            {this.showResults(canchas)}
            </ScrollView>
         </View>
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
        <TouchableOpacity style={styles.button} onPress={this.setSceneRegistrarCancha} ><Text style={styles.textButton}><Icon name="plus" size={15} color="#FFFFFF"/> Crear cancha</Text></TouchableOpacity>
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


  showImage = (val) => {
    if(val.image !== undefined){
     return <Image style={{flex:1, alignItems:'center',marginRight:10,borderColor:'white'}} borderRadius={5}   source={{uri: val.image}}></Image>

    }else{
    return <Image style={{flex:1, alignItems:'center',marginRight:10,borderColor:'white'}} borderRadius={5}   source={{uri: 'http://www.regionlalibertad.gob.pe/ModuloGerencias/assets/img/unknown_person.jpg'}}></Image>
  }
}

showResults = (canchas) => {
  if(canchas.length==0){
    return <View style={{flex:1,alignItems:'center',justifyContent:'center',alignItems:'center'}}><Text>No tiene ninguna cancha registrada.</Text></View>
  }else{
    return canchas;
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
  score:{
    backgroundColor:'#388E3C',
    padding:5,
    borderRadius:5,
    borderWidth:1,
    borderColor:'white',
    flex:2,
    color:'white',
    paddingHorizontal:10,
    fontWeight:'bold',
    textAlign:'center'
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
