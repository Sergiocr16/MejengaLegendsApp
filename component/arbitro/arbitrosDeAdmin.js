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
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
import Loader from '../app/loading';
import SoundManager from '../../services/soundManager';
import Icon from 'react-native-vector-icons/FontAwesome';
import Arbitro from '../../services/arbitro';
import CreateArbitro from '../arbitro/createArbitro';
export default class ArbitrosDeAdmin extends Component {
  constructor(props){
    super(props)
    this.state = {
        scene:'loading',
        arbitros : [],
        currentAdmin:{}
    }
  }
  componentDidMount() {
    Arbitro.getArbitrosByComplejo(this.props.complejo.uid,(arbitros)=>{
      this.setState({arbitros,scene:'showArbitros'})
    },()=>{   this.setState({scene:'noAbitros'})})
  }
  setSceneArbitrosMenu =()=>{
    SoundManager.playBackBtn();
    this.setState({scene:'showArbitros'})
  }
  setSceneCreateArbitro = ()=>{
    SoundManager.playPushBtn()
     this.setState({scene:'createArbitro'})
  }
  setSceneAdminDetail = ()=>{
    SoundManager.playPushBtn()
     this.setState({scene:'adminDetail'})
  }

  showScene = () => {
    switch (this.state.scene) {
      case 'loading':
        return <Loader/>
        break;
      case 'showArbitros':
        return this.allAbitros()
        break;
        case 'noAbitros':
          return this.noAbitros()
          break;
        case 'createArbitro':
          return <CreateArbitro arbitros={this.state.arbitros} complejo={this.props.complejo} back={()=>{this.setSceneArbitrosMenu()}} showBackButton={true}  />
          break;
          case 'adminDetail':
            return <AdminDetail user={this.state.currentAdmin} back={()=>{this.setSceneAdminsMenu()}}  />
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
noAbitros(){
  return (
    <FadeInView style={styles.container}>
    <FadeInView style={styles.infoContainer} duration={300}>
    <View style={styles.mainName}><Text style={styles.whiteFont}>Arbitros del complejo</Text></View>
    <View style={styles.subtitle}><Text style={[styles.blueFont,{textAlign:'center'}]}>Control de árbitros</Text></View>
     <View style={styles.basicInfo}>
     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
     <Text style={{textAlign:'center',fontSize:18}} >No existen árbitros registrados aún</Text>
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
     <TouchableOpacity style={styles.button} onPress={this.setSceneCreateArbitro} ><Text style={styles.textButton}><Icon name="plus" size={15} color="#FFFFFF"/> Crear árbitro</Text></TouchableOpacity>
     </View>
    </View>
    </FadeInView>
  )
}
allAbitros = () => {
  let administradores =  this.state.arbitros.map( (val, key) => {
    if(val.nombre!==undefined){
          return <TouchableOpacity onPress={()=> { this.setState({currentAdmin:val}); this.setSceneAdminDetail();   }}
                 key={key} style={{flexDirection:'row', justifyContent:'center',backgroundColor:'#EEEEEE',borderRadius:5,marginBottom:5,padding:5}}>
                  <Text style={{flex:1,borderRightWidth:1,borderColor:'#9E9E9E',textAlign:'center'}}>{val.nombre +" "+val.primerApellido}</Text>
                  <Text style={{flex:1,borderRightWidth:1,borderColor:'#9E9E9E' ,textAlign:'center'}}>{val.cedula}</Text>
                  <Text style={{flex:1,textAlign:'center'}}>{val.complejoNombre}</Text>
                 </TouchableOpacity>
               }
      });
      return (
          <FadeInView style={styles.container}>
            <FadeInView style={styles.infoContainer} duration={300}>
          <View style={styles.mainName}><Text style={styles.whiteFont}>Árbitros del complejo</Text></View>
          <View style={[styles.subtitle,{flexDirection:'row'}]}>
                <Text style={[styles.blueFont,{flex:1,textAlign:'center'}]}>Nombre completo</Text>
                <Text style={[styles.blueFont,{flex:1,textAlign:'center'}]}>Cédula</Text>
                <Text style={[styles.blueFont,{flex:1,textAlign:'center'}]}>Complejo</Text>
          </View>
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
                  <TouchableOpacity style={styles.button} onPress={this.setSceneCreateArbitro} ><Text style={styles.textButton}><Icon name="plus" size={15} color="#FFFFFF"/> Crear árbitro</Text></TouchableOpacity>
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
