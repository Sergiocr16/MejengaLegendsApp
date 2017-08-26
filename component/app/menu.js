import React, {Component} from 'react'
import Player from '../../services/player'
import TeamMenu from '../team/teamMenu'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import FadeInView from 'react-native-fade-in-view';
import Account from '../account/account';
import Profile from '../player/profile';
import BestPlayers from '../player/bestPlayers';
import Players from '../player/players';
import Teams from '../team/teams';
import ComplejoService from '../../services/complejo';
import BestTeams from '../team/bestTeams';
import ComplejoDetail from '../complejo/complejoDetail';
import MyTeamsReto from '../reto/myTeamsReto.js';
import ArbitrosDeAdmin from '../arbitro/arbitrosDeAdmin';
import NextMatches from '../partido/misProximosPartidos';
import MyTeamsReto from '../reto/myTeamsReto.js'
import ComplejoMenu from '../complejo/complejoMenu';
import ComplejosPartidos from '../complejo/complejoPartidos';
import Ligas from '../team/ligas';
import EncuentrosDeHoy from '../arbitro/encuentrosDeHoy';

import AdminMenuDeSuperAdmin from '../administrador/adminMenuDeSuperAdmin';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import SoundManager from '../../services/soundManager'
export default class Menu extends Component {
  constructor(props){
    super(props)
    this.state = {
      scene: 'buttons',
      gestureName: 'none',
      menuScene: this.props.initView,
      complejo: ''
    }

}

  setSceneButtons = () => {
  SoundManager.playBackBtn();
   this.setState({scene:'buttons'})
  }
  setSceneProfile = () => {
    SoundManager.playPushBtn();
   this.setState({scene:'profile'})
  }
  setSceneBestPlayers = () => {
      SoundManager.playPushBtn();
   this.setState({scene:'bestPlayers'})
  }
  setSceneMyTeamsReto = () => {
    SoundManager.playPushBtn();
   this.setState({scene:'myTeamsReto'})
  }

  setSceneBestTeams = () => {
      SoundManager.playPushBtn();
   this.setState({scene:'bestTeams'})
  }

  setSceneComplejos = () => {
    SoundManager.playPushBtn();
    this.setState({scene:'complejos'})
   }
   setSceneMiComplejo = () => {
     SoundManager.playPushBtn();
     this.setState({scene:'miComplejo'})
    }
    setEncuentrosHoy = () => {
      SoundManager.playPushBtn();
      this.setState({scene:'encuentrosHoy'})
     }
   setSceneAdministradores= () =>{
    SoundManager.playPushBtn()
    this.setState({scene:'administradores'})
   }
   setSceneArbitrosDeAdmin= () =>{
    SoundManager.playPushBtn()
    this.setState({scene:'arbitrosMenu'})
   }
  setSceneAllJugadores = () => {
      SoundManager.playPushBtn();
   this.setState({scene:'allPlayers'})
  }
  setSceneAllTeams = () => {
      SoundManager.playPushBtn();
   this.setState({scene:'allTeams'})
  }
  setSceneNextMatches= () => {
    SoundManager.playPushBtn();
 this.setState({scene:'nextMatches'})
  }
 //SCENES

 //END SCENES


  //MENU SCENE BUTTONS
  setScenePartido = () => {
    SoundManager.playSwitchClick()
   this.setState({menuScene:'partido'})
  }
  setSceneJugadores = () => {
    SoundManager.playSwitchClick()
    this.setState({menuScene:'jugadores'})
  }
  setSceneEquipos =() => {
    SoundManager.playSwitchClick();
   this.setState({menuScene:'equipos'})
  }
  setSceneContratos= () =>{
    SoundManager.playSwitchClick()
   this.setState({menuScene:'contratos'})
  }
  setSceneSuperAdmin= () =>{
      SoundManager.playSwitchClick()
   this.setState({menuScene:'superAdmin'})
  }
  setSceneArbitro= () =>{
      SoundManager.playSwitchClick()
   this.setState({menuScene:'arbitro'})
  }
  setSceneMenuMisEquipos = () => {
      SoundManager.playPushBtn()
   this.setState({scene:'menuMisEquipos'})
  }
  setScenePartidosComplejos = () => {
    SoundManager.playSwitchClick()
    this.setState({scene:'partidosComplejos'})
  }
  setSceneLigas = () => {
    SoundManager.playSwitchClick()
    this.setState({scene:'ligas'})
  }

  activeMainButton(option) {
    switch (this.state.menuScene) {
      case option: return {
        paddingVertical:5,
        paddingHorizontal:5,
        marginHorizontal:15,
        marginVertical:10,
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        backgroundColor:'#1565C0',
        borderRadius:8,
        height:30
      }
      break;
      default: return {
        paddingVertical:5,
        paddingHorizontal:5,
        marginHorizontal:15,
        marginVertical:10,
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        backgroundColor:'white',
        borderRadius:8,
        height:30
      }
    }
  }
  activeMainText(option) {
    switch (this.state.menuScene) {
      case option: return {
        textAlign:'center',
        color:'white'
      }
      break;
      default: return {
        textAlign:'center',
        color:'#1565C0'
      }
    }
  }


defineMainButtons = () => {

  // <TouchableOpacity style={this.activeMainButton('contratos')}activeOpacity={1}   onPress={this.setSceneContratos}>
  //  <Text style={this.activeMainText('contratos')}>CONTRATOS</Text>
  // </TouchableOpacity>

  switch (this.props.user.rol) {
    case "player":
    return <View style={styles.mainButtonsContainer}>
    <TouchableOpacity style={this.activeMainButton('partido')} activeOpacity={1}  onPress={this.setScenePartido}>
     <Text style={this.activeMainText('partido')}>PARTIDO</Text>
    </TouchableOpacity>
    <TouchableOpacity style={this.activeMainButton('equipos')} activeOpacity={1}  onPress={this.setSceneEquipos}>
     <Text style={this.activeMainText('equipos')} >EQUIPOS</Text>
    </TouchableOpacity>
    <TouchableOpacity style={this.activeMainButton('jugadores')} activeOpacity={1}   onPress={this.setSceneJugadores}>
     <Text style={this.activeMainText('jugadores')}>JUGADORES</Text>
    </TouchableOpacity>
    </View>
      break;
    case "superAdmin":
    break;
    case "admin":
    break;
    case "arbitro":
    break;
    return null
      break;
    default:

  }
}

  mainButtons(){
    return(<View style={{flex:1}}>
        {this.defineMainButtons()}
        <View style={{flex:6}}>
        {this.showMenuScene()}
        </View>
      </View>
    )
  }

  menuComplejosScene(){
    const config = {
     velocityThreshold: 0.3,
     directionalOffsetThreshold: 80
   };
    return(<GestureRecognizer config={config} style={styles.superAdminScene}>
              <View style={styles.row}>
                <View style={styles.row}>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:6}]} onPress={this.setSceneComplejos}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://stadiumdb.com/pictures/stadiums/jpn/kashima_soccer_stadium/kashima_soccer_stadium14.jpg'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"bank"}  size={30} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonBigTitle}>Complejos deportivos</Text>
                    <Text style={styles.buttonSubtitle}>Visualiza todos los complejos</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:6}]} onPress={this.setSceneAdministradores}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'https://cdn23.merca20.com/wp-content/uploads/2017/02/bigstock-144060173.jpg'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"pie-chart"}  size={30} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonBigTitle}>Administradores de Complejos deportivos</Text>
                    <Text style={styles.buttonSubtitle}>Visualiza todos los administradores</Text>
                  </View>
                </TouchableOpacity>
                </View>
              </View>
          </GestureRecognizer>)
  }
  menuAdminViewScene(){

    const config = {
     velocityThreshold: 0.3,
     directionalOffsetThreshold: 80
   };
    return(<GestureRecognizer config={config} style={styles.superAdminScene}>
              <View style={styles.row}>
                <View style={styles.row}>
                    <View style={{flex:6,flexDirection:'column'}}>
                      <TouchableOpacity style={[styles.buttonMainMenu,{flex:1}]} onPress={this.setSceneMiComplejo}>
                        <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://blog.anytimefitness.com/wp-content/uploads/2015/06/SoccerStadium.jpg'}}>
                          <View style={styles.circularIcon}>
                             <Icon name={"bank"}  size={30} color="#1565C0" />
                         </View>
                        </Image>
                        <View style={styles.textAreaButton}>
                          <Text style={styles.buttonBigTitle}>{this.props.user.complejoNombre}</Text>
                          <Text style={styles.buttonSubtitle}>Tu complejo</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.buttonMainMenu,{flex:1}]} onPress={this.setSceneComplejos}>
                        <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'https://static01.nyt.com/images/2017/02/16/sports/16ISRAELSOCCER3/16ISRAELSOCCER3-superJumbo.jpg'}}>
                          <View style={styles.circularIcon}>
                             <Icon name={"futbol-o"}  size={30} color="#1565C0" />
                         </View>
                        </Image>
                        <View style={styles.textAreaButton}>
                          <Text style={styles.buttonBigTitle}>Agenda</Text>
                          <Text style={styles.buttonSubtitle}>Visualiza los futuros encuentros</Text>
                        </View>
                      </TouchableOpacity>
                  </View>

                    <TouchableOpacity style={[styles.buttonMainMenu,{flex:6}]} onPress={this.setSceneArbitrosDeAdmin}>
                      <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://www.bluemaize.net/im/mens-clothing/soccer-referee-0.jpg'}}>
                        <View style={styles.circularIcon}>
                           <Icon name={"flag"}  size={30} color="#1565C0" />
                       </View>
                      </Image>
                      <View style={styles.textAreaButton}>
                        <Text style={styles.buttonBigTitle}>Arbitros del complejo</Text>
                        <Text style={styles.buttonSubtitle}>Visualiza todos los arbitros</Text>
                      </View>
                    </TouchableOpacity>

                </View>
              </View>
          </GestureRecognizer>)
  }
  menuArbitroViewScene(){

    const config = {
     velocityThreshold: 0.3,
     directionalOffsetThreshold: 80
   };
    return(<GestureRecognizer config={config} style={styles.superAdminScene}>
              <View style={styles.row}>
                <View style={styles.row}>
                    <View style={{flex:6,flexDirection:'column'}}>
                      <TouchableOpacity style={[styles.buttonMainMenu,{flex:1}]} onPress={this.setEncuentrosHoy}>
                        <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://blog.anytimefitness.com/wp-content/uploads/2015/06/SoccerStadium.jpg'}}>
                          <View style={styles.circularIcon}>
                             <Icon name={"bank"}  size={30} color="#1565C0" />
                         </View>
                        </Image>
                        <View style={styles.textAreaButton}>
                          <Text style={styles.buttonBigTitle}>Encuentros de hoy</Text>
                          <Text style={styles.buttonSubtitle}>Arbitra un partido</Text>
                        </View>
                      </TouchableOpacity>

                  </View>

                  

                </View>
              </View>
          </GestureRecognizer>)
  }
  menuEquipoScene(){
    const config = {
     velocityThreshold: 0.3,
     directionalOffsetThreshold: 80
   };
    return(<GestureRecognizer config={config} style={styles.partidoScene} onSwipeRight={this.setScenePartido} onSwipeLeft={this.setSceneJugadores}>
              <View style={styles.row}>
                <View style={styles.flex1}>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:6}]} onPress={this.setSceneAllTeams}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'https://i.cbc.ca/1.2464498.1452886323!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/neymar.jpg'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"globe"}  size={30} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonBigTitle}>Equipos</Text>
                    <Text style={styles.buttonSubtitle}>Equipos de todo el mundo</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:3}]} onPress={this.setSceneLigas}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://cdn-mf0.heartyhosting.com/sites/mensfitness.com/files/soccer-kick-strength-main-1280.jpg'}}>
                    <View style={styles.circularSmallIcon}>
                       <Icon name={"shield"}  size={20} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonBigTitle}>Ligas</Text>
                    <Text style={styles.buttonSubtitle}>¿En cual quieres estar?</Text>
                  </View>
                </TouchableOpacity>
                </View>
                <View style={styles.flex1}>
                <TouchableOpacity onPress={this.setSceneMenuMisEquipos} style={[styles.buttonMainMenu,{flex:6}]}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://www.centrocampista.com/wp-content/uploads/2012/06/Spain-football-team-full-hd-wallpaper-uefa-euro-2012-e1341082560542.jpg'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"users"}  size={30} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonBigTitle}>Mis equipos</Text>
                    <Text style={styles.buttonSubtitle}>Visualiza tus equipos</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:3}]} onPress={this.setSceneBestTeams}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://www.unimexsoccerleague.com/wp-content/uploads/2015/03/Awesome-Soccer-Wallpaper.jpg'}}>
                    <View style={styles.circularSmallIcon}>
                       <Icon name={"trophy"}  size={20} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonSmallTitle}>Mejores equipos</Text>
                    <Text style={styles.buttonSubtitle}>Los mejores equipos del momento</Text>
                  </View>
                </TouchableOpacity>
                </View>
              </View>
          </GestureRecognizer>)
  }

  menuJugadoresScene(){
    const config = {
     velocityThreshold: 0.3,
     directionalOffsetThreshold: 80
   };
    return(<GestureRecognizer config={config} style={styles.partidoScene}  onSwipeLeft={this.setSceneContratos} onSwipeRight={this.setSceneEquipos}>
              <View style={styles.row}>
                <View style={styles.flex1}>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:6}]} onPress={this.setSceneAllJugadores}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'https://static01.nyt.com/images/2017/02/16/sports/16ISRAELSOCCER3/16ISRAELSOCCER3-superJumbo.jpg'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"globe"}  size={30} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonBigTitle}>Jugadores</Text>
                    <Text style={styles.buttonSubtitle}>Jugadores del mundo</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:3}]}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://www.hdwallpaperspulse.com/wp-content/uploads/2017/04/09/soccer-field-night-image.jpg'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"handshake-o"}  size={30} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonBigTitle}>Cancha completa</Text>
                    <Text style={styles.buttonSubtitle}>Tu equipo VS Tus amigos</Text>
                  </View>
                </TouchableOpacity>
                </View>
                <View style={styles.flex1}>
                <TouchableOpacity onPress={this.setSceneProfile} style={[styles.buttonMainMenu,{flex:6}]}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'https://s-media-cache-ak0.pinimg.com/originals/e8/87/44/e88744ba3d249bab71a5a405931c8502.jpg'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"user"}  size={30} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonSmallTitle}>Mi perfil</Text>
                    <Text style={styles.buttonSubtitle}>Visualiza tus estadísticas</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:3}]} onPress={this.setSceneBestPlayers}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm_j9Bg4EtA_h6PvWo0UJrU_VowW6OGFbnnsCtBD9njCysiGC8'}}>
                    <View style={styles.circularSmallIcon}>
                       <Icon name={"trophy"}  size={20} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonSmallTitle}>Mejores Jugadores</Text>
                    <Text style={styles.buttonSubtitle}>Mejores jugadores del momento</Text>
                  </View>
                </TouchableOpacity>
                </View>
              </View>
          </GestureRecognizer>)
  }

  menuContratoScene(){
    const config = {
     velocityThreshold: 0.3,
     directionalOffsetThreshold: 80
   };
    return(<GestureRecognizer config={config} style={styles.partidoScene} onSwipeLeft={this.setScenePartido}  onSwipeRight={this.setSceneJugadores}>
              <View style={styles.row}>
                <View style={styles.flex1}>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:6}]} >
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://insider.ticketmaster.com/wp-content/uploads/2014/06/soccer-play-ball.png'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"globe"}  size={30} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonBigTitle}>Reto</Text>
                    <Text style={styles.buttonSubtitle}>Tu equipo VS El mundo</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:3}]}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://www.hdwallpaperspulse.com/wp-content/uploads/2017/04/09/soccer-field-night-image.jpg'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"handshake-o"}  size={30} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonBigTitle}>Cancha completa</Text>
                    <Text style={styles.buttonSubtitle}>Tu equipo VS Tus amigos</Text>
                  </View>
                </TouchableOpacity>
                </View>
                <View style={styles.flex1}>
                <TouchableOpacity style={styles.buttonMainMenu}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://www.hdwallpaperspulse.com/wp-content/uploads/2017/04/09/soccer-field-night-image.jpg'}}>
                    <View style={styles.circularSmallIcon}>
                       <Icon name={"newspaper-o"}  size={20} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonSmallTitle}>Mis partidos</Text>
                    <Text style={styles.buttonSubtitle}></Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMainMenu}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://www.hdwallpaperspulse.com/wp-content/uploads/2017/04/09/soccer-field-night-image.jpg'}}>
                    <View style={styles.circularSmallIcon}>
                       <Icon name={"futbol-o"}  size={20} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonSmallTitle}>RETO</Text>
                    <Text style={styles.buttonSubtitle}>Tu euipo VS El mundo</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMainMenu}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://www.hdwallpaperspulse.com/wp-content/uploads/2017/04/09/soccer-field-night-image.jpg'}}>
                    <View style={styles.circularSmallIcon}>
                       <Icon name={"futbol-o"}  size={20} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonSmallTitle}>RETO</Text>
                    <Text style={styles.buttonSubtitle}>Tu euipo VS El mundo</Text>
                  </View>
                </TouchableOpacity>
                </View>
              </View>
          </GestureRecognizer>)
  }

  menuPartidoScene(){
    const config = {
     velocityThreshold: 0.3,
     directionalOffsetThreshold: 80
   };
    return(<GestureRecognizer config={config} style={styles.partidoScene} onSwipeRight={this.setSceneContratos} onSwipeLeft={this.setSceneEquipos}>
              <View style={styles.row}>
                <View style={styles.flex1}>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:6}]} onPress={this.setSceneMyTeamsReto}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://insider.ticketmaster.com/wp-content/uploads/2014/06/soccer-play-ball.png'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"globe"}  size={30} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonBigTitle}>Reto</Text>
                    <Text style={styles.buttonSubtitle}>Tu equipo VS El mundo</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:3}]}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://www.hdwallpaperspulse.com/wp-content/uploads/2017/04/09/soccer-field-night-image.jpg'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"handshake-o"}  size={30} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonBigTitle}>Cancha completa</Text>
                    <Text style={styles.buttonSubtitle}>Tu equipo VS Tus amigos</Text>
                  </View>
                </TouchableOpacity>
                </View>
                <View style={styles.flex1}>
                <TouchableOpacity style={styles.buttonMainMenu} onPress={this.setSceneNextMatches}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'https://www.thestar.com/content/dam/thestar/sports/soccer/2017/05/29/team-canada-veteran-jose-blanger-retires-from-competitive-soccer/belanger-file.jpg'}}>
                    <View style={styles.circularSmallIcon}>
                       <Icon name={"newspaper-o"}  size={20} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonSmallTitle}>Mis próximos partidos</Text>
                    <Text style={styles.buttonSubtitle}>Visualiza tus partidos</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMainMenu}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'https://static01.nyt.com/images/2016/07/03/sports/03EUROICELANDWEB6/03EUROICELANDWEB1-1467392458174-master768.jpg'}}>
                    <View style={styles.circularSmallIcon}>
                       <Icon name={"futbol-o"}  size={20} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonSmallTitle}>Historial de partidos</Text>
                    <Text style={styles.buttonSubtitle}>Visualiza tu partido</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMainMenu} onPress={this.setScenePartidosComplejos}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://www.hdwallpaperspulse.com/wp-content/uploads/2017/04/09/soccer-field-night-image.jpg'}}>
                    <View style={styles.circularSmallIcon}>
                       <Icon name={"futbol-o"}  size={20} color="#1565C0" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonSmallTitle}>Complejos</Text>
                    <Text style={styles.buttonSubtitle}>Mis escenarios de juego</Text>
                  </View>
                </TouchableOpacity>
                </View>
              </View>
          </GestureRecognizer>)
  }

  showMenuScene(){
    console.log(this.state.menuScene)
    switch (this.state.menuScene) {
      case 'partido':
         return(this.menuPartidoScene())
        break;
      case 'equipos':
         return(this.menuEquipoScene())
        break;
      case 'jugadores':
         return(this.menuJugadoresScene())
        break;
      case 'contratos':
        return(this.menuContratoScene())
       break;
       case 'superAdmin':
         return(this.menuComplejosScene())
        break;
      case 'partidosComplejos':
      return(this.menuComplejosScene())
      break;
        case 'admin':
          return(this.menuAdminViewScene())
         break;
         case 'arbitro':
           return(this.menuArbitroViewScene())
          break;
      default:
        return(this.menuPartidoScene())
    }
  }
  menuButtons(){
    return(
      <View style={{flex:1}}>
        {this.mainButtons()}
      </View>
    )
  }


  showScene(){
    switch (this.state.scene) {
      case 'buttons':
        return this.menuButtons();
        break;
      case 'menuMisEquipos':
        return (<TeamMenu showFieldViewImg={this.props.showFieldViewImg} hideFieldViewImg={this.props.hideFieldViewImg} back={()=>this.setSceneButtons()} user={this.props.user} style={{flex:1}}/>);
      case 'profile':
        return <Profile back={()=> this.setSceneButtons()} user={this.props.user}/>;
        break;
      case 'bestPlayers':
        return <BestPlayers back={()=> this.setSceneButtons()}/>;
        break;
      case 'allPlayers':
        return <Players back={()=> this.setSceneButtons()}/>;
        break;
      case 'allTeams':
        return <Teams back={()=> this.setSceneButtons()}/>;
        break;
      case 'bestTeams':
        return <BestTeams back={()=> this.setSceneButtons()}/>;
        break;
      case 'nextMatches':
        return <NextMatches user={this.props.user} back={()=> this.setSceneButtons()}/>;
        break;
      case 'myTeamsReto':
        return <MyTeamsReto back={()=> this.setSceneButtons()}/>;
        break;
      case 'complejos':
        return <ComplejoMenu user={this.props.user} back={()=> this.setSceneButtons()}/>;
        break;
      case 'partidosComplejos':
        return <ComplejosPartidos user={this.props.user} back={()=> this.setSceneButtons()}/>;
        break;
        case 'encuentrosHoy':
        return (<EncuentrosDeHoy back={()=>{this.setSceneButtons(); SoundManager.playBackBtn()}} complejo={this.props.complejo}/>);
          break;
        case 'miComplejo':
        return (<ComplejoDetail back={()=>{this.setSceneButtons(); SoundManager.playBackBtn()}} complejo={this.props.complejo}/>);
          break;
      case 'administradores':
        return <AdminMenuDeSuperAdmin back={()=> this.setSceneButtons()}/>;
        break;
      case 'arbitrosMenu':
        return <ArbitrosDeAdmin complejo={this.props.complejo} back={()=> this.setSceneButtons()}/>;
        break;
      default:
      case 'ligas':
        return <Ligas back={()=> this.setSceneButtons()}/>;
        break;
        return this.menuButtons();
    }
  }
  render(){
    return (
      <FadeInView style={{flex:1}} duration={300}>
      {this.showScene()}
      </FadeInView>
    )
  }
}

const styles = StyleSheet.create({
  circularSmallIcon:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:40,
    height:40,
    backgroundColor:'#fff',
    borderRadius:100,
  },
  circularIcon:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:60,
    height:60,
    backgroundColor:'#fff',
    borderRadius:100,
  },
  textAreaButton:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:3
  },
  centerItems:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonBigTitle:{
    color:'#1565C0',
    textAlign:'center',
    fontSize:17
  },
  buttonSmallTitle:{
    color:'#1565C0',
    textAlign:'center',
    fontSize:15
  },
  buttonSubtitle:{
    color:'grey',
   textAlign:'center',
   fontSize:10
 },
  partidoScene:{
    flex:1,
    paddingHorizontal:30
  },
  superAdminScene:{
    flex:1,
    padding:30
  },
  buttonMainMenu:{
    flex:1,
    marginBottom:10,
    borderRadius:20,
    marginHorizontal:10,
    overflow: 'hidden',
    flexDirection:'row',
    backgroundColor:'white'
  },
  buttonImage:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  maintButton:{
    paddingVertical:5,
    paddingHorizontal:5,
    marginHorizontal:15,
    marginVertical:10,
    flex:1,
    backgroundColor:'white',
    borderRadius:8,
    height:30
  },
  selectedMaintButton:{
    paddingVertical:5,
    paddingHorizontal:5,
    marginHorizontal:15,
    marginVertical:10,
    flex:1,
    backgroundColor:'#1565C0',
    borderRadius:8,
    height:30
  },
  blue:{
    color:'#1565C0',
    textAlign:'center'
  },
  whiteFont:{
    color:'white',
    textAlign:'center'
  },
  mainButtonsContainer:{
    flexDirection:'row',
    flex:1,
  },
  bgImage:{
    flex:1,
  },
  mainTitle:{
    color:"black",
    fontSize:50
  },
  initButton:{
    borderColor:'rgba(56, 45, 45,0.5)',
    backgroundColor:'rgba(255,255,255,0.5)',
    borderWidth: 6,
    height:80,
    width:80,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center'
  },
  row:{
    flex:1,
    flexDirection:"row"
  },
  flex1:{
    flex:1,
    flexDirection:'column'
  }
})
