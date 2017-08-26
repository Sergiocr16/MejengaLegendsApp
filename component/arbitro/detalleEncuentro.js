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
import SoundManager from '../../services/soundManager';
// import TeamDetail from './teamDetail';
// import TeamProfile from './playerProfile'
export default class DetalleEncuentro extends Component {
  constructor(props){
    super(props)
    this.state = {
      teams : [],
      scene: 'showMatch',
      currentMatch:{},
      match:this.props.reto,
      marcadorEquipo1:0,
      marcadorEquipo2:0
    }

  }

  setSceneTeams = () => {
    SoundManager.playBackBtn()
    this.setState({scene:'showMatch'})
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
      case 'showMatch':
        return this.showMatches()
        break;
        case 'noTeams':
          return this.noTeams()
          break;
      case 'teamProfile':
        return <TeamDetail showEditButton={false} team={this.state.currentTeam} back={()=>{this.setSceneTeams()}} user={this.state.currentTeam} showBackButton={true}/>
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

  showImage = (val) => {
    if(val.image !== undefined){
     return   <Image style={styles.profileImage2} borderRadius={10} source={{uri: val.image}}>
       </Image>
    }else{
    return    <Image style={styles.profileImage2} borderRadius={10} source={{uri: 'http://www.dendrocopos.com/wp-content/themes/invictus/images/dummy-image.jpg'}}>
      </Image>
  }
  }
IniciarPartido = () =>{
  var encuentro = this.state.match;
  this.state.match.status = 'enTranscurso';
  this.setState({match:encuentro})

}
  showOptionsMarcador = () =>{
    switch (this.state.match.status) {
       case 'sinEmpezar':
        return   <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:2,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>

              <Image style={[styles.imageVS]} borderRadius={10} source={{uri: 'https://userscontent2.emaze.com/images/12385dc1-2370-4411-a3cd-4003f24a88cf/9bf191e90aa3928848849406d236da99.png'}}>
              </Image>

            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{justifyContent:'center',textAlign:'center'}}>{this.state.match.complejoNombre}</Text>
             <Text style={{justifyContent:'center',textAlign:'center'}}>{moment(this.state.match.fecha).format('LL hh:mm a')}</Text>
            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={[styles.button,{justifyContent:'center'}]} onPress={()=>{this.IniciarPartido()}} ><Text style={styles.textButton}><Icon name="user" size={15} color="#FFFFFF"/> Comenzar partido</Text></TouchableOpacity>

            </View>



        </View>
       break;
       case 'enTranscurso':
       return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <View style={{flex:2,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
         <View style={{flex:1}}>
         <TouchableOpacity onPress={()=>{this.setState({marcadorEquipo1:this.state.marcadorEquipo1+1})}} style={{flex:1}}>
             <Text style={{justifyContent:'center',textAlign:'center',fontSize:38,fontWeight:'bold'}}>+</Text>
         </TouchableOpacity>
         <View style={{flex:1}}>
             <Text style={{justifyContent:'center',textAlign:'center',fontSize:38}}>{this.state.marcadorEquipo1>0?this.state.marcadorEquipo1:0}</Text>
         </View>
         <TouchableOpacity onPress={()=>{this.setState({marcadorEquipo1:this.state.marcadorEquipo1-1})}} style={{flex:1}}>
             <Text style={{justifyContent:'center',textAlign:'center',fontSize:38,fontWeight:'bold'}}>-</Text>
         </TouchableOpacity>
         </View>
           <Image style={[styles.imageVS,{flex:1}]} borderRadius={10} source={{uri: 'https://userscontent2.emaze.com/images/12385dc1-2370-4411-a3cd-4003f24a88cf/9bf191e90aa3928848849406d236da99.png'}}>
           </Image>
           <View style={{flex:1}}>
           <TouchableOpacity onPress={()=>{this.setState({marcadorEquipo2:this.state.marcadorEquipo2+1})}} style={{flex:1}}>
               <Text style={{justifyContent:'center',textAlign:'center',fontSize:38,fontWeight:'bold'}}>+</Text>
           </TouchableOpacity>
           <View style={{flex:1}}>
               <Text style={{justifyContent:'center',textAlign:'center',fontSize:38}}>{this.state.marcadorEquipo2>0?this.state.marcadorEquipo2:0}</Text>
           </View>
           <TouchableOpacity onPress={()=>{this.setState({marcadorEquipo2:this.state.marcadorEquipo2-1})}} style={{flex:1}}>
               <Text style={{justifyContent:'center',textAlign:'center',fontSize:38,fontWeight:'bold'}}>-</Text>
           </TouchableOpacity>
           </View>
         </View>
         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <Text style={{justifyContent:'center',textAlign:'center'}}>{this.state.match.complejoNombre}</Text>
          <Text style={{justifyContent:'center',textAlign:'center'}}>{moment(this.state.match.fecha).format('LL hh:mm a')}</Text>
         </View>
         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <TouchableOpacity style={[styles.button,{justifyContent:'center',backgroundColor:'purple'}]}  ><Text style={styles.textButton}><Icon name="user" size={15} color="#FFFFFF"/> Finalizar partido</Text></TouchableOpacity>

         </View>



     </View>
       break;


      default:

    }

  }
  showMatches(){
    return (
      <FadeInView style={styles.container}>
      <FadeInView style={styles.infoContainer} duration={300}>
      <View style={styles.mainName}><Text style={styles.whiteFont}>JUGANDO EN {this.state.match.complejoNombre.toUpperCase()}</Text></View>
      <View style={styles.subtitle}><Text style={styles.whiteFont2}>{moment(this.state.match.fecha).format('LL hh:mm a')}</Text></View>
       <View style={styles.basicInfo}>
       <View style={{flex:1}}>
       <View onPress={()=> { this.setState({currentTeam:val,scene:'teamProfile'});SoundManager.playPushBtn()}}
             style={{flexDirection:'row', justifyContent:'center',alignItems:'center',backgroundColor:'#EEEEEE',borderRadius:5,marginBottom:5,padding:5,flex:1}}>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               {this.showImage(this.state.match.equipo1)}
               <Text style={{fontSize:18}}>{this.state.match.equipo1.nombre}</Text>
              </View>
                {this.showOptionsMarcador()}
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              {this.showImage(this.state.match.equipo2)}
              <Text style={{fontSize:18}}>{this.state.match.equipo2.nombre}</Text>
              </View>
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
     height:150,
      width:160,
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
