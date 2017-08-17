import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
var moment = require('moment');
import * as firebase from 'firebase'
import EditPlayer from './editPlayer';
import Loader from '../app/loading';
import FadeInView from 'react-native-fade-in-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Player from '../../services/player'
import PlayerProfile from './playerProfile'
import SoundManager from '../../services/soundManager';
export default class BestPlayers extends Component {
  constructor(props){
    super(props)
    this.state = {
      players : [],
      scene: 'loading',
      currentPlayer:{}
    }

  }
  componentDidMount() {
    Player.findTopPlayers((players)=>{
      this.setState({players,scene:'bestPlayers'})
    },()=>{
      this.setState({scene:'noPlayers'})
    })
  }
  setScenePlayers = () => {
      SoundManager.playBackBtn();
    this.setState({scene:'bestPlayers'})
  }
  setScenePlayerProfile = () => {
    SoundManager.playPushBtn();
    this.setState({scene:'playerProfile'})
  }
  showScene(){
    switch (this.state.scene) {
      case 'loading':
        return <Loader/>
        break;
      case 'bestPlayers':
        return this.showPlayers()
        break;
      case 'noPlayers':
        return this.noPlayers()
        break;
      case 'playerProfile':
        return <PlayerProfile back={()=>{this.setScenePlayers()}} showBackButton={true}  user={this.state.currentPlayer}/>
        break;
      default:

    }
  }

  textColor(option) {
    switch (option) {
      case 1: return {
        color:'white'
      }
      case 2: return {
        color:'white'
      }
      case 3: return {
      color:'white'
      }
      break;
      default: return {

      }
    }
  }

  positionColor(option) {
    switch (option) {
      case 1: return {
        borderRadius:5,
        paddingVertical:3,
        paddingHorizontal:5,
        textAlign:'center',
        marginHorizontal:15,
        backgroundColor:'#FFD700',
        fontWeight:'bold',
        color:'white',
      }
      case 2: return {
        borderRadius:5,
        paddingVertical:3,
        paddingHorizontal:5,
        textAlign:'center',
        marginHorizontal:15,
        backgroundColor:'#c0c0c0',
        fontWeight:'bold',
        color:'white',
      }
      case 3: return {
        borderRadius:5,
        paddingVertical:3,
        paddingHorizontal:5,
        textAlign:'center',
        marginHorizontal:15,
       backgroundColor:'#cd7f32',
       fontWeight:'bold',
       color:'white',
      }
      break;
      default: return {
        borderRadius:5,
        paddingVertical:3,
        paddingHorizontal:5,
        textAlign:'center',
        marginHorizontal:15,
        fontWeight:'bold',
        backgroundColor:'#E1F5FE'
      }
    }
  }

  noPlayers(){
    return (
      <FadeInView style={styles.container}>
      <FadeInView style={styles.infoContainer} duration={300}>
      <View style={styles.mainName}><Text style={styles.whiteFont}>MEJORES JUGADORES</Text></View>
      <View style={styles.subtitle}><Text style={styles.whiteFont2}>Mejores jugadores actualmente</Text></View>
       <View style={styles.basicInfo}>
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       <Text style={{textAlign:'center',fontSize:18}} >No existen jugadores registrados aún</Text>
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
  showPlayers(){
    let players =  this.state.players.map( (val, key) => {
      if(val.nombre!==undefined){
            return <TouchableOpacity onPress={()=> { this.setState({currentPlayer:val}); this.setScenePlayerProfile();   }}
                   key={key} style={{flexDirection:'row', justifyContent:'center',alignItems:'center',backgroundColor:'#EEEEEE',borderRadius:5,marginBottom:5,padding:5}}>
                   <View style={{flex:2}}>
                   <Text style={this.positionColor(key+1)}>{key+1}</Text>
                   </View>
                    <Text style={{flex:6}}>{val.nombre +" "+ val.primerApellido+" "+val.segundoApellido}</Text>
                      <Text style={{flex:3}}>{val.posicionPrincipal}</Text>
                    <Text style={styles.score}><Icon name="trophy" size={20} color="yellow" /> {val.score}</Text>
                   </TouchableOpacity>
                 }
        });
    return (
      <FadeInView style={styles.container}>
      <FadeInView style={styles.infoContainer} duration={300}>
      <View style={styles.mainName}><Text style={styles.whiteFont}>MEJORES JUGADORES</Text></View>
      <View style={styles.subtitle}><Text style={styles.whiteFont2}>Mejores jugadores actualmente</Text></View>
       <View style={styles.basicInfo}>
       <ScrollView>
       {players}
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
      </FadeInView>
    )
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
    info:{
     borderBottomWidth:1,
     borderBottomColor:'#9E9E9E',
     margin:5,
     flexDirection:'row',
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
   button:{
     marginRight:20,
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
     fontWeight:'bold'
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
   mainName:{
     backgroundColor:'#1565C0',
     padding:7
   },
   subtitle:{
     backgroundColor:'#BBDEFB',
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
   profileImage:{
     height:100,
     width:100,
     borderWidth:2,
     borderColor:'white'
   },
   whiteFont:{
     color:'white',
     textAlign:'center'
   },
   redButton:{
     margin:10,
     backgroundColor:'red',
     paddingVertical:5,
     paddingHorizontal:10,
     borderRadius:20
   }

    })
