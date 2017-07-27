import React, {Component} from 'react'
import Player from '../../services/player'
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
export default class Menu extends Component {
  constructor(props){
    super(props)
    this.state = {
      scene: 'buttons',
      menuScene: 'partido'
    }
      this.setSceneButtons = this.setSceneButtons.bind(this)
      this.setScenePartido = this.setScenePartido.bind(this)
      this.setSceneJugadores = this.setSceneJugadores.bind(this)
      this.setSceneEquipos = this.setSceneEquipos.bind(this)
      this.setSceneContratos = this.setSceneContratos.bind(this)
  }

  setSceneButtons(){
   this.setState({scene:'buttons'})
  }
  setScenePartido(){
   this.setState({menuScene:'partido'})
  }
  setSceneJugadores(){
   this.setState({menuScene:'jugadores'})
  }
  setSceneEquipos(){
   this.setState({menuScene:'equipos'})
  }
  setSceneContratos(){
   this.setState({menuScene:'contratos'})
  }

  activeMainButton(option) {
    switch (this.state.menuScene) {
      case option: return {
        paddingVertical:5,
        paddingHorizontal:5,
        marginHorizontal:15,
        marginVertical:10,
        flex:1,
        backgroundColor:'blue',
        borderRadius:8,
        height:30
      }
      break;
      default: return {
        paddingVertical:5,
        paddingHorizontal:5,
        marginHorizontal:15,
        marginVertical:10,
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
        color:'blue'
      }
    }
  }
  mainButtons(){
    return(<View style={{flex:1}}>
      <View style={styles.mainButtonsContainer}>
      <TouchableOpacity style={this.activeMainButton('partido')} onPress={this.setScenePartido}>
       <Text style={this.activeMainText('partido')}>PARTIDO</Text>
      </TouchableOpacity>
      <TouchableOpacity style={this.activeMainButton('equipos')} onPress={this.setSceneEquipos}>
       <Text style={this.activeMainText('equipos')} >EQUIPOS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={this.activeMainButton('jugadores')} onPress={this.setSceneJugadores}>
       <Text style={this.activeMainText('jugadores')}>JUGADORES</Text>
      </TouchableOpacity>
      <TouchableOpacity style={this.activeMainButton('contratos')} onPress={this.setSceneContratos}>
       <Text style={this.activeMainText('contratos')}>CONTRATOS</Text>
      </TouchableOpacity>
      </View>
      <View style={{flex:6}}>
      {this.showMenuScene()}
      </View>
</View>
    )
  }


  menuEquipoScene(){
    return(<FadeInView duration={300} style={styles.partidoScene}>
              <View style={styles.row}>
                <View style={styles.flex1}>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:6}]}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'https://3a1133d325f0c8a50c77eb21-lapelotonasas.netdna-ssl.com/wp-content/uploads/2017/01/James-Rodr%C3%ADguez-Real-Madrid.jpg'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"globe"}  size={30} color="blue" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonBigTitle}>Equipos</Text>
                    <Text style={styles.buttonSubtitle}>Equipos de todo el mundo</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:3}]}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://cdn-mf0.heartyhosting.com/sites/mensfitness.com/files/soccer-kick-strength-main-1280.jpg'}}>
                    <View style={styles.circularSmallIcon}>
                       <Icon name={"shield"}  size={20} color="blue" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonBigTitle}>Ligas</Text>
                    <Text style={styles.buttonSubtitle}>¿En cual quieres estar?</Text>
                  </View>
                </TouchableOpacity>
                </View>
                <View style={styles.flex1}>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:6}]}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://www.centrocampista.com/wp-content/uploads/2012/06/Spain-football-team-full-hd-wallpaper-uefa-euro-2012-e1341082560542.jpg'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"users"}  size={30} color="blue" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonBigTitle}>Mis equipos</Text>
                    <Text style={styles.buttonSubtitle}>Visualiza tus equipos</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:3}]}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://www.unimexsoccerleague.com/wp-content/uploads/2015/03/Awesome-Soccer-Wallpaper.jpg'}}>
                    <View style={styles.circularSmallIcon}>
                       <Icon name={"trophy"}  size={20} color="blue" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonSmallTitle}>Mejores equipos</Text>
                    <Text style={styles.buttonSubtitle}>Los mejores equipos del momento</Text>
                  </View>
                </TouchableOpacity>
                </View>
              </View>
          </FadeInView>)
  }

  menuJugadoresScene(){
    return(<FadeInView duration={300} style={styles.partidoScene}>
              <View style={styles.row}>
                <View style={styles.flex1}>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:6}]}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'https://static01.nyt.com/images/2017/02/16/sports/16ISRAELSOCCER3/16ISRAELSOCCER3-superJumbo.jpg'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"globe"}  size={30} color="blue" />
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
                       <Icon name={"handshake-o"}  size={30} color="blue" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonBigTitle}>Cancha completa</Text>
                    <Text style={styles.buttonSubtitle}>Tu equipo VS Tus amigos</Text>
                  </View>
                </TouchableOpacity>
                </View>
                <View style={styles.flex1}>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:6}]}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'https://s-media-cache-ak0.pinimg.com/originals/e8/87/44/e88744ba3d249bab71a5a405931c8502.jpg'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"user"}  size={30} color="blue" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonSmallTitle}>Mi perfil</Text>
                    <Text style={styles.buttonSubtitle}>Visualiza tus estadísticas</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:3}]}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm_j9Bg4EtA_h6PvWo0UJrU_VowW6OGFbnnsCtBD9njCysiGC8'}}>
                    <View style={styles.circularSmallIcon}>
                       <Icon name={"trophy"}  size={20} color="blue" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonSmallTitle}>Mejores Jugadores</Text>
                    <Text style={styles.buttonSubtitle}>Mejores jugadores del momento</Text>
                  </View>
                </TouchableOpacity>
                </View>
              </View>
          </FadeInView>)
  }

  menuContratoScene(){
    return(<FadeInView duration={300}style={styles.partidoScene}>
              <View style={styles.row}>
                <View style={styles.flex1}>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:6}]}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://insider.ticketmaster.com/wp-content/uploads/2014/06/soccer-play-ball.png'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"globe"}  size={30} color="blue" />
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
                       <Icon name={"handshake-o"}  size={30} color="blue" />
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
                       <Icon name={"newspaper-o"}  size={20} color="blue" />
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
                       <Icon name={"futbol-o"}  size={20} color="blue" />
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
                       <Icon name={"futbol-o"}  size={20} color="blue" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonSmallTitle}>RETO</Text>
                    <Text style={styles.buttonSubtitle}>Tu euipo VS El mundo</Text>
                  </View>
                </TouchableOpacity>
                </View>
              </View>
          </FadeInView>)
  }

  menuPartidoScene(){
    return(<FadeInView duration={300} style={styles.partidoScene}>
              <View style={styles.row}>
                <View style={styles.flex1}>
                <TouchableOpacity style={[styles.buttonMainMenu,{flex:6}]}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://insider.ticketmaster.com/wp-content/uploads/2014/06/soccer-play-ball.png'}}>
                    <View style={styles.circularIcon}>
                       <Icon name={"globe"}  size={30} color="blue" />
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
                       <Icon name={"handshake-o"}  size={30} color="blue" />
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
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'https://www.thestar.com/content/dam/thestar/sports/soccer/2017/05/29/team-canada-veteran-jose-blanger-retires-from-competitive-soccer/belanger-file.jpg'}}>
                    <View style={styles.circularSmallIcon}>
                       <Icon name={"newspaper-o"}  size={20} color="blue" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonSmallTitle}>Mis partidos</Text>
                    <Text style={styles.buttonSubtitle}>Visualiza tus partidos</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMainMenu}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://www.hdwallpaperspulse.com/wp-content/uploads/2017/04/09/soccer-field-night-image.jpg'}}>
                    <View style={styles.circularSmallIcon}>
                       <Icon name={"futbol-o"}  size={20} color="blue" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonSmallTitle}>RETO</Text>
                    <Text style={styles.buttonSubtitle}>Tu equipo VS El mundo</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonMainMenu}>
                  <Image style={styles.buttonImage} borderTopLeftRadius={20} borderBottomLeftRadius={20} source={{uri: 'http://www.hdwallpaperspulse.com/wp-content/uploads/2017/04/09/soccer-field-night-image.jpg'}}>
                    <View style={styles.circularSmallIcon}>
                       <Icon name={"futbol-o"}  size={20} color="blue" />
                   </View>
                  </Image>
                  <View style={styles.textAreaButton}>
                    <Text style={styles.buttonSmallTitle}>RETO</Text>
                    <Text style={styles.buttonSubtitle}>Tu equipo VS El mundo</Text>
                  </View>
                </TouchableOpacity>
                </View>
              </View>
          </FadeInView>)
  }
  showMenuScene(){
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
      default:
        return(this.menuPartidoScene())
    }

  }
  menuButtons(){
    return(
      <View style={{marginTop:35,flex:1}}>
        {this.mainButtons()}
      </View>
    )
  }
  showScene(){
    switch (this.state.scene) {
      case 'buttons':
        return this.menuButtons();
        break;
      default:

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
    color:'blue',
    textAlign:'center',
    fontSize:17
  },
  buttonSmallTitle:{
    color:'blue',
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
    backgroundColor:'blue',
    borderRadius:8,
    height:30
  },
  blueFont:{
    color:'blue',
    textAlign:'center'
  },
  whiteFont:{
    color:'white',
    textAlign:'center'
  },
  mainButtonsContainer:{
    flexDirection:'row',
    flex:1,
    height:30
  },
  bgImage:{
    flex:1,
  },
  mainTitle:{
    color:"black",
    fontSize:50
  },
  initButton:{
    marginTop:90,
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
