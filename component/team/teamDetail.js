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
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditTeam from './editTeam';
import SoundManager from '../../services/soundManager';

import PlayersByTeam from '../team/playersByTeam';
export default class TeamDetail extends Component {
  constructor(props){
    super(props)
    this.state ={
      scene: 'teamDetail'
    }
  }
 setSceneTeamDetail =()=>{
   SoundManager.playBackBtn();
   this.setState({scene:'teamDetail'})
 }
 setScenePlayersByTeam = ()=>{
   SoundManager.playPushBtn()
    this.setState({scene:'jugadoresPorEquipo'})
 }
  showScene = () => {
    switch (this.state.scene) {
      case 'teamDetail':
        return this.showTeamDetail()
        break;
      case 'editTeam':
        return <EditTeam myTeams={this.props.myTeams} team={this.props.team} user={this.props.user} back={()=>{this.setSceneTeamDetail()}} />
        break;
      case 'jugadoresPorEquipo':
        return (<PlayersByTeam showAddPlayerButton={true} addPlayers={()=> this.setSceneAddPlayerToTeam()} teamPositions={()=> this.setSceneTeamPositions()}  back={()=> this.setSceneTeamDetail()}  team={this.props.team}/>);
        break;
      default:

    }
  }
  showImage = () => {
    if(this.props.team.image !== undefined){
     return   <Image style={styles.profileImage} borderRadius={10} source={{uri: this.props.team.image}}>
       </Image>
    }else{
    return    <Image style={styles.profileImage} borderRadius={10} source={{uri: 'http://www.dendrocopos.com/wp-content/themes/invictus/images/dummy-image.jpg'}}>
      </Image>
  }
  }
  showEdit = () => {
    if(this.props.team.fundador.jugadorGUID === firebase.auth().currentUser.uid && this.props.showEditButton){
    return <TouchableOpacity style={[styles.button,{marginRight:5,marginBottom:5}]} onPress={()=>{
      SoundManager.playPushBtn();
      this.setState({scene:'editTeam'})}}><Text style={styles.textButton}><Icon name="pencil" size={15} color="#FFFFFF"/> Editar</Text></TouchableOpacity>
  }
  return null;
  }

  showBackButton= () =>{
    if(this.props.showBackButton == true){
      return (
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
     {this.showEdit()}
    </View>
    </View>
  )
    }
    return null;
  }
  showLema = (lema) =>{
    if(lema==""){
      return "No definido";
    }else{
      return '"'+lema+'"';
    }
  }
  showTeamDetail = () => {
    return (
      <FadeInView style={styles.container} duration={600}>
        <View style={styles.infoContainer}>
          <View style={styles.mainName}>
              <Text style={styles.whiteFont}>{this.props.team.nombre}</Text>
          </View>
          <View style={styles.subtitle}>
              <Text style={styles.whiteFont2}>Estadisticas e información básica</Text>
          </View>

         <View style={styles.basicInfo}>
            <View style={{flex:1,alignItems:'center'}}>
               {this.showImage()}
              <View style={[styles.circularIcon,{margin:-30}]}>
                   <Icon name={"shield"}  size={40} color="#424242" />
              </View>
               <Text style={[styles.boldFont,{marginTop:30,color:'#FFB300'}]}>{this.props.team.copas} <Icon name="trophy" size={20} color="#FFB300" /> </Text>
              <TouchableOpacity style={[styles.button,{marginTop:10, paddingVertical:7}]} onPress={()=>this.setScenePlayersByTeam()} ><Text style={styles.textButton}><Icon name="user" size={15} color="#FFFFFF"/> Ver jugadores</Text></TouchableOpacity>

            </View>
            <View style={{flex:3,padding:10}}>
              <ScrollView>
                  <View style={styles.info}>
                     <Text style={[styles.flexStart,{flex:1}]}>Lema</Text>
                     <Text style={[styles.flexEnd,{flex:5}]}>{this.showLema(this.props.team.lema)}</Text>
                  </View>
                  <View style={styles.info}>
                     <Text style={[styles.flexStart,{flex:3}]}>Cantidad jugadores</Text>
                     <Text style={[styles.flexEnd,{flex:3}]}>{this.props.team.cantidadJugadores}</Text>
                  </View>
                  <View style={styles.info}>
                     <Text style={styles.flexStart}>Liga</Text>
                     <Text style={styles.flexEnd}>{this.props.team.liga}</Text>
                  </View>
                  <View style={styles.info}>
                     <Text style={styles.flexStart}>Copas</Text>
                     <Text style={styles.flexEnd}>{this.props.team.copas}</Text>
                  </View>
                  <View style={styles.info}>
                     <Text style={styles.flexStart}>Género</Text>
                     <Text style={styles.flexEnd}>{this.props.team.genero}</Text>
                  </View>
                  <View style={styles.info}>
                     <Text style={styles.flexStart}>Goles marcados</Text>
                     <Text style={styles.flexEnd}>{this.props.team.golesMarcados}</Text>
                  </View>
                  <View style={styles.info}>
                     <Text style={styles.flexStart}>Goles recibidos</Text>
                     <Text style={styles.flexEnd}>{this.props.team.golesRecibidos}</Text>
                  </View>
                  <View style={styles.info}>
                     <Text style={styles.flexStart}>Mayor puntaje de la historia</Text>
                     <Text style={styles.flexEnd}>{this.props.team.mayorPuntajeDeLaHistoria}</Text>
                  </View>
                  <View style={styles.info}>
                     <Text style={styles.flexStart}>Racha de victorias</Text>
                     <Text style={styles.flexEnd}>{this.props.team.rachaVictorias}</Text>
                  </View>
                </ScrollView>
              </View>
          </View>
  </View>
       {this.showBackButton()}

      </FadeInView>
    )
  }
      render(){
        return (
          <View style={styles.container}>
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
   profileImage:{   height:110,
      width:130,
     borderWidth:2,
     borderColor:'white'
   },
   whiteFont:{
     color:'white',
     textAlign:'center'
   },
   buttonEdit:{
     marginRight:5,
     marginBottom:5,
     paddingHorizontal:10,
     paddingVertical:4,
     alignItems:'center',
     justifyContent:'center',
     borderRadius:9,
     backgroundColor:'#F4511E',
     flex:3,
   },
   button:{
     alignItems:'center',
     justifyContent:'center',
     paddingHorizontal:10,
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
