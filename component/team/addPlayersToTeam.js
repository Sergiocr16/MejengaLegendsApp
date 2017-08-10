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
import Player from '../../services/player';
import TeamService from '../../services/team';
var t = require('tcomb-form-native');
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AddPlayersToTeam extends Component {
  constructor(props){
    super(props)

    this.state = {
      username: '',
      players: [],
      playersSelected: [],
      currentPlayer: ''
    }
  }
    containsObject = (obj, list)=> {
      var i;
      for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
      }
      return false;
  }
  addPlayers = (key,val)=>{
      if(!this.containsObject(val,this.state.playersSelected)){
          this.setState({playersSelected:[...this.state.playersSelected,val]});
      };
  }
  deletePlayers = (key)=>{
    this.state.playersSelected.splice(key,1);
    this.setState({playersSelected: this.state.playersSelected });
  }
  getPlayers = ()=>{

    Player.findPlayerByUsername(this.state.username,(players)=>{
      this.setState({players});
    });

  }
  render(){
    let players =  this.state.players.map( (val, key) => {
      if(val.nombre!==undefined){
          return <TouchableOpacity onPress={()=> { this.setState({currentPlayer:val}); this.addPlayers(key,val)}}
                 key={key} style={{flexDirection:'row', height:60, justifyContent:'center',alignItems:'center',backgroundColor:'#EEEEEE',borderRadius:4,marginBottom:5,padding:5}}>
                 <View style={{flex:3}}>
                   <Image style={{flex:1, alignItems:'center',marginRight:10}} borderRadius={5}   source={{uri: 'https://scontent.fsjo3-1.fna.fbcdn.net/v/t1.0-0/p526x296/20431520_1490013577711814_2633038823655280681_n.jpg?oh=5382b097d57358d44fba2355ec8d2a49&oe=59F3D2BD'}}>
                  </Image>
                 </View>
                    <View style={{flex:4,borderRightWidth:1,marginRight:5,borderColor:'#9E9E9E' }}>
                        <Text>{val.nombre +" "+ val.primerApellido}</Text>
                    </View>

                    <Text style={{flex:3}}>{val.posicionPrincipal}</Text>
                  <Text style={styles.score}><Icon name="trophy" size={16} color="yellow" /> {val.score}</Text>
                 </TouchableOpacity>
               }
    });
    let playersSelected =  this.state.playersSelected.map( (val, key) => {
      if(val.nombre!==undefined){
          return <TouchableOpacity onPress={()=> {this.deletePlayers(key)}}
                 key={key} style={{flexDirection:'row', height:60, justifyContent:'center',alignItems:'center',backgroundColor:'#EEEEEE',borderRadius:4,marginBottom:5,padding:5}}>
                 <View style={{flex:3}}>
                   <Image style={{flex:1, alignItems:'center',marginRight:10}} borderRadius={5}   source={{uri: 'https://scontent.fsjo3-1.fna.fbcdn.net/v/t1.0-0/p526x296/20431520_1490013577711814_2633038823655280681_n.jpg?oh=5382b097d57358d44fba2355ec8d2a49&oe=59F3D2BD'}}>
                  </Image>
                 </View>
                    <View style={{flex:4,borderRightWidth:1,marginRight:5,borderColor:'#9E9E9E' }}>
                        <Text>{val.nombre +" "+ val.primerApellido}</Text>
                    </View>

                    <Text style={{flex:3}}>{val.posicionPrincipal}</Text>
                  <Text style={styles.score}><Icon name="trophy" size={16} color="yellow" /> {val.score}</Text>
                 </TouchableOpacity>
               }
    });
    return (
  <FadeInView style={styles.container}>
    <FadeInView style={styles.infoContainer} duration={300}>
  <View style={styles.mainName}><Text style={styles.whiteFont}>Agrega los jugadores y arma tu equipo!</Text></View>
  <View style={styles.subtitle}><Text style={styles.whiteFont2}>Buscar jugador por nombre de usuario</Text></View>
    <View style={{flex:1,padding:10}}>
          <View style={{flex:1,flexDirection:'row',paddingHorizontal:90,marginBottom:20}}>
              <TextInput
              underlineColorAndroid='white'
              placeholderTextColor="grey"
              placeholder="Nombre de usuario"
              autocapitalize={true}
              disableFullscreenUI={true}
              style={[styles.inputText,{flex:2}]}
              onChangeText={(username) => this.setState({username})}
              />
              <TouchableOpacity style={[styles.buttonBuscarJugador,{flex:1,alignItems:'flex-end'}]}  onPress={this.getPlayers} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}><Icon name="search" size={13} color="#FFFFFF"/> Buscar</Text>
              </TouchableOpacity>
           </View>
           <View style={{flex:5,flexDirection:'row',paddingHorizontal:10}}>
              <ScrollView style={[styles.resultadoBusqueda,{flex:1}]}>
              {players}
              </ScrollView>
              <ScrollView style={[styles.jugadoresSeleccionados,{flex:1}]}>
              {playersSelected}
              </ScrollView>
           </View>
           <View style={{flexDirection:'row'}}>
               <TouchableOpacity style={[styles.button]}  onPress={this.submit} underlayColor='#99d9f4'>
                 <Text style={styles.buttonText}>Crear equipo!</Text>
               </TouchableOpacity>
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
    borderColor: '#9E9E9E',
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
