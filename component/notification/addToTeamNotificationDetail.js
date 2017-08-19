import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid
} from 'react-native'
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
import TeamService from '../../services/team';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AddToTeamNotificationDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
          team:{},
          ownTeams: [],
    }
  }
  componentDidMount() {
    TeamService.getTeamsByPlayer((teams)=>{
      if(teams){
        this.state.ownTeams = teams;
      }
    },()=>{
      this.state.ownTeams = [];
    })

    TeamService.getTeam(this.props.notification.equipoGUID,(team)=>{
         this.setState({team:team})
        this.showTeamDetail();
    },()=>{})

  }
  showImage = () => {
    if(this.state.team.image !== undefined){
     return   <Image style={styles.profileImage} borderRadius={10} source={{uri: this.state.team.image}}>
       </Image>
    }else{
      return    <Image style={styles.profileImage} borderRadius={10} source={{uri: 'http://www.dendrocopos.com/wp-content/themes/invictus/images/dummy-image.jpg'}}>
        </Image>
    }
    }

      acceptInvitation = () => {
          var equiposDelJugador = {};
          equiposDelJugador = this.state.ownTeams;
          equiposDelJugador.push(this.state.team);
          TeamService.newTeamsByPlayer(equiposDelJugador);
          this.props.deleteNotification();
          this.props.back();
          ToastAndroid.show('¡Felicidades ahora eres parte del equipo ' + this.state.team.nombre +'!!', ToastAndroid.LONG);

      }
      showTeamDetail(){
        return (
          <FadeInView style={styles.container} duration={600}>
            <View style={styles.infoContainer}>
              <View style={styles.mainName}>
                  <Text style={styles.whiteFont}>¡{this.state.team.nombre} desea que seas parte de su equipo!</Text>
              </View>
              <View style={[styles.subtitle,{flexDirection:'row',paddingHorizontal:10}]}>
                  <View style={{flex:4}}>
                      <Text style={styles.whiteFont2}>¿Deseas aceptar la invitación a unirte a este equipo?</Text>
                  </View>
                  <View style={{flex:1}}>
                  <TouchableOpacity style={[styles.buttonAceptDecline,{backgroundColor:'#D32F2F' }]} onPress={()=>{this.setState({scene:'editInfo'})}}><Text style={styles.textButton}><Icon name="times" size={15} color="#FFFFFF"/> Denegar</Text></TouchableOpacity>

                  </View>
                  <View style={{flex:1}}>
                  <TouchableOpacity style={[styles.buttonAceptDecline,{backgroundColor:'#43A047'}]} onPress={()=>{this.acceptInvitation()}}><Text style={styles.textButton}><Icon name="check" size={15} color="#FFFFFF"/> Aceptar</Text></TouchableOpacity>

                  </View>
              </View>

             <View style={styles.basicInfo}>
                <View style={{flex:1,alignItems:'center'}}>
                   {this.showImage()}
                  <View style={[styles.circularIcon,{margin:-30}]}>
                       <Icon name={"shield"}  size={40} color="#424242" />
                  </View>
                  <Text style={[styles.boldFont,{marginTop:30,color:'#FFB300'}]}>{this.state.team.copas} <Icon name="trophy" size={20} color="#FFB300" /> </Text>
                  <TouchableOpacity style={[styles.button,{marginTop:3, paddingVertical:7}]} onPress={this.props.playersByTeam} ><Text style={styles.textButton}><Icon name="user" size={15} color="#FFFFFF"/> Ver jugadores</Text></TouchableOpacity>

                </View>
                <View style={{flex:3,padding:10}}>
                  <ScrollView>
                      <View style={styles.info}>
                         <Text style={[styles.flexStart,{flex:1}]}>Lema</Text>
                         <Text style={[styles.flexEnd,{flex:5}]}>"{this.state.team.lema}"</Text>
                      </View>
                      <View style={styles.info}>
                         <Text style={styles.flexStart}>Liga</Text>
                         <Text style={styles.flexEnd}>{this.state.team.liga}</Text>
                      </View>
                      <View style={styles.info}>
                         <Text style={styles.flexStart}>Copas</Text>
                         <Text style={styles.flexEnd}>{this.state.team.copas}</Text>
                      </View>
                      <View style={styles.info}>
                         <Text style={styles.flexStart}>Género</Text>
                         <Text style={styles.flexEnd}>{this.state.team.genero}</Text>
                      </View>
                      <View style={styles.info}>
                         <Text style={styles.flexStart}>Goles marcados</Text>
                         <Text style={styles.flexEnd}>{this.state.team.golesMarcados}</Text>
                      </View>
                      <View style={styles.info}>
                         <Text style={styles.flexStart}>Goles recibidos</Text>
                         <Text style={styles.flexEnd}>{this.state.team.golesRecibidos}</Text>
                      </View>
                      <View style={styles.info}>
                         <Text style={styles.flexStart}>Mayor puntaje de la historia</Text>
                         <Text style={styles.flexEnd}>{this.state.team.mayorPuntajeDeLaHistoria}</Text>
                      </View>
                      <View style={styles.info}>
                         <Text style={styles.flexStart}>Racha de victorias</Text>
                         <Text style={styles.flexEnd}>{this.state.team.rachaVictorias}</Text>
                      </View>
                    </ScrollView>
                  </View>
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

          </View>
          </FadeInView>
        )
      }
      render(){
        return (
          <FadeInView style={{flex:1}} duration={600}>
              {this.showTeamDetail()}
          </FadeInView>
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
     padding:10,

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
     paddingVertical:8,
    justifyContent:'center',
    alignItems:'center',
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
     height:110,
     width:130,
     borderWidth:2,
     borderColor:'white'
   },
   whiteFont:{
     color:'white',
     textAlign:'center'
   },
   button:{
     alignItems:'center',
     justifyContent:'center',
     paddingHorizontal:10,
     borderRadius:9,
     backgroundColor:'#F4511E',
     flex:3,
   },
   buttonAceptDecline:{
     alignItems:'center',
     marginRight:5,
     paddingVertical:6,
     borderRadius:9,
     backgroundColor:'#F4511E',
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
