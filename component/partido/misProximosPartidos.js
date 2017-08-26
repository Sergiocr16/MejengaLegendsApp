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
import * as firebase from 'firebase';
import Loader from '../app/loading';
import FadeInView from 'react-native-fade-in-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Team from '../../services/team';
import Partido from '../../services/partido';
import Reto from '../../services/reto';
import MatchDetail from './partidoDetail';
import SoundManager from '../../services/soundManager';
// import TeamDetail from './teamDetail';
// import TeamProfile from './playerProfile'
export default class NextMatches extends Component {
  constructor(props){
    super(props)
    this.state = {
      teams : [],
      scene: 'loading',
      currentMatch:{},
      matches:[]
    }

  }
  componentDidMount() {
    var recorrido=0;
     Partido.getPartidosByCurrentPlayer(this.props.user.uid,(matches)=>{
       console.log(matches)
       var newMatches = [];
       matches.map((match)=>{
        Team.getTeam(match.equipo1.equipoGUID,(equipo1)=>{
          match.equipo1=equipo1;
          Team.getTeam(match.equipo2.equipoGUID,(equipo2)=>{
            match.equipo2=equipo2;
            newMatches.push(match)
            recorrido++;
            if(recorrido===matches.length){
                this.setState({matches:newMatches,scene:'bestTeams'})
                setTimeout(()=>{
                  if(this.props.redirect){
                    this.state.matches.map((match)=>{
                      if(match.uid==this.props.selectedMatch.matchGUID){
                        this.setState({currentMatch:match,scene:'matchDetail'})
                      }
                    })
                  }else{
                    this.setState({scene:'bestTeams'})
                  }
                },200)

            }
          },()=>{})
        },()=>{})
       })
     },()=>{
      this.setState({scene:'noTeams',matches:[]})
     })
  }
  setSceneTeams = () => {
    SoundManager.playBackBtn()
    this.setState({scene:'bestTeams'})
  }
  setScenePlayerProfile = () => {
    SoundManager.playPushBtn();
    this.setState({scene:'teamProfile'})
  }
  showScene(){
    switch (this.state.scene) {
      case 'loading':
        return <Loader/>
        break;
      case 'bestTeams':
        return this.showMatches()
        break;
        case 'noTeams':
          return this.noTeams()
          break;
      case 'matchDetail':
        return <MatchDetail reto={this.state.currentMatch} back={()=>{this.setSceneTeams()}} user={this.state.currentMatch}/>
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



  noTeams(){
    return (
      <FadeInView style={styles.container}>
      <FadeInView style={styles.infoContainer} duration={300}>
      <View style={styles.mainName}><Text style={styles.whiteFont}>Mis Partidos</Text></View>
      <View style={styles.subtitle}><Text style={styles.whiteFont2}>Jugando próximamente</Text></View>
       <View style={styles.basicInfo}>
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       <Text style={{textAlign:'center',fontSize:18}} >No tienes ningún partido próximo</Text>
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
  showImage = (val) => {
    if(val.image !== undefined){
     return   <Image style={styles.profileImage2} borderRadius={10} source={{uri: val.image}}>
       </Image>
    }else{
    return    <Image style={styles.profileImage2} borderRadius={10} source={{uri: 'http://www.dendrocopos.com/wp-content/themes/invictus/images/dummy-image.jpg'}}>
      </Image>
  }
  }
  showMatches(){
    let matches =  this.state.matches.map( (val, key) => {
      // if(val.estaVacio!==true){
            return <TouchableOpacity onPress={()=> { this.setState({currentMatch:val,scene:'matchDetail'});SoundManager.playPushBtn()}}
                   key={key} style={{flexDirection:'row', justifyContent:'center',alignItems:'center',backgroundColor:'#EEEEEE',borderRadius:5,marginBottom:5,padding:5,height:120}}>
                   <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    {this.showImage(val.equipo1)}
                    <Text style={{fontSize:18}}>{val.equipo1.nombre}</Text>
                   </View>
                   <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                   <Image style={styles.imageVS} borderRadius={10} source={{uri: 'https://userscontent2.emaze.com/images/12385dc1-2370-4411-a3cd-4003f24a88cf/9bf191e90aa3928848849406d236da99.png'}}>
                   </Image>
                   <Text>{val.complejoNombre}</Text>
                    <Text>{moment(val.fecha).format('LL hh:mm a')}</Text>
                   </View>
                   <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                   {this.showImage(val.equipo2)}
                   <Text style={{fontSize:18}}>{val.equipo2.nombre}</Text>
                   </View>
                   </TouchableOpacity>
                //  }
        });
    return (
      <FadeInView style={styles.container}>
      <FadeInView style={styles.infoContainer} duration={300}>
      <View style={styles.mainName}><Text style={styles.whiteFont}>Mis Partidos</Text></View>
      <View style={styles.subtitle}><Text style={styles.whiteFont2}>Jugando próximamente</Text></View>
       <View style={styles.basicInfo}>
       <ScrollView>
       {matches}
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
   profileImage2:{
     height:70,
      width:80,
     borderWidth:2,
     borderColor:'white'
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
         textAlign:'center'
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
   imageVS:{
    height:50,
    width:50,
   },
   redButton:{
     margin:10,
     backgroundColor:'red',
     paddingVertical:5,
     paddingHorizontal:10,
     borderRadius:20
   }

    })
