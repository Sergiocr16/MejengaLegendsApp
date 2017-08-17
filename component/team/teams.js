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
import Team from '../../services/team';
import TeamService from '../../services/team';
import TeamDetail from './teamDetail';
import SoundManager from '../../services/soundManager';
var t = require('tcomb-form-native');
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Teams extends Component {
  constructor(props){
    super(props)

    this.state = {
      teamName: '',
      teams: [],
      currentTeam: '',
      submitted:false,
      scene:"searching"
    }
  }

showScene =() =>{
  switch (this.state.scene) {
    case 'searching':
      return this.showSearchingScene()
      break;
    case 'teamDetail':
     return <TeamDetail team={this.state.currentTeam} showEditButton={false} back={()=>{ this.setState({scene:"searching"}); SoundManager.playBackBtn() }} showBackButton={true}/>
      break;
    default:

  }
}


showSearchingScene = () => {
  let teams =  this.state.teams.map( (val, key) => {
    if(val.nombre!==undefined){
        return <ScrollView key={key} style={{flex:1}}>
        <TouchableOpacity onPress={()=> { this.setState({currentTeam:val,scene:'teamDetail'});SoundManager.playPushBtn();}}
               key={key} style={{flexDirection:'row', height:80, justifyContent:'center',alignItems:'center',backgroundColor:'#EEEEEE',borderRadius:4,marginBottom:5,padding:5}}>
               <View style={{flex:3}}>
                {this.showImage(val)}
               </View>
                  <View style={{flex:4,borderRightWidth:1,marginRight:5,borderColor:'#9E9E9E' }}>
                      <Text style={{textAlign:'center'}}>{val.nombre}</Text>
                        <Text style={{textAlign:'center',fontSize:10}}>{val.lema}</Text>
                  </View>
                  <Text style={{flex:3}}>{val.liga}</Text>
                <Text style={styles.score}><Icon name="trophy" size={16} color="yellow" /> {val.copas}</Text>
               </TouchableOpacity>

        </ScrollView>
    }
  });

  return (
<FadeInView style={styles.container}>
  <FadeInView style={styles.infoContainer} duration={300}>
<View style={styles.mainName}><Text style={styles.whiteFont}>Equipos del mundo</Text></View>
<View style={styles.subtitle}><Text style={styles.whiteFont2}>Busca equipos por su nombre</Text></View>
  <View style={{flex:1,padding:10}}>
        <View style={{flex:1,flexDirection:'row',paddingHorizontal:90,marginBottom:10}}>
            <TextInput
            underlineColorAndroid='white'
            placeholderTextColor="grey"
            placeholder="Nombre de equipo"
            autocapitalize={true}
            disableFullscreenUI={true}
            style={[styles.inputText,{flex:2,borderColor:this.isEmpty(this.state.teamName)}]}
            onChangeText={(teamName) => this.setState({teamName})}
            />
            <TouchableOpacity style={[styles.buttonBuscarJugador,{flex:1,alignItems:'flex-end'}]}  onPress={this.getPlayers} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}><Icon name="search" size={13} color="#FFFFFF"/> Buscar</Text>
            </TouchableOpacity>
         </View>
         <View style={{flex:5,flexDirection:'row',paddingHorizontal:10}}>
            <View style={{flex:1}}>
            {this.showResults(teams)}
            </View>
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

  isValid = () => {
    var toValidate = [this.state.teamName]
    var invalidItems = 0;
   toValidate.map((val)=>{
     if(val===""){
       invalidItems++;
     }
   })
   if(invalidItems==0){
     return true;
   }else{
     ToastAndroid.show('Por favor digita un nombre de equipo para tu busqueda', ToastAndroid.LONG);
     return false;
   }
  }

  getPlayers = ()=>{
    SoundManager.playPushBtn()
   this.setState({submitted:true,areTeams:false})
   if(this.isValid()){
    TeamService.findTeamsByTeamName(this.state.teamName,(teams)=>{
      this.setState({teams,areTeams:true});
    },()=>{
      this.setState({areTeams:false});
    });
   }
  }
  showImage = (val) => {
    if(val.image !== undefined){
     return <Image style={{flex:1, alignItems:'center',marginRight:10,borderColor:'white'}} borderRadius={5}   source={{uri: val.image}}></Image>

    }else{
    return <Image style={{flex:1, alignItems:'center',marginRight:10,borderColor:'white'}} borderRadius={5}   source={{uri: 'http://www.regionlalibertad.gob.pe/ModuloGerencias/assets/img/unknown_person.jpg'}}></Image>
  }
}

showResults = (teams) => {
  if(!this.state.areTeams && this.state.submitted){
    return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>No se encontro ningun resultado.</Text></View>
  }else if(this.state.areTeams){
    return teams;
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
    backgroundColor:'#FDD835',
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
   buttonText: {
     fontSize: 15,
     color: 'white',
     alignSelf: 'center'
   },
   button: {
     flex: 1,
     marginTop:10,
     height: 30,
     width: 200,
     backgroundColor: '#48BBEC',
     borderRadius: 8,
     alignSelf: 'stretch',
     justifyContent: 'center'
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
