import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ScrollView
} from 'react-native'
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
import CreateTeam from '../team/createTeam';
import TeamDetail from '../team/teamDetail';
import TeamPositions from '../team/teamPositions';
import PlayersByTeam from '../team/playersByTeam';

import AddPlayersToTeam from '../team/addPlayersToTeam';
import TeamService from '../../services/team';
import Loader from '../app/loading';
import RenderIf from '../app/renderIf';
var t = require('tcomb-form-native');
var Form = t.form.Form;


export default class TeamMenu extends Component {
  constructor(props){
    super(props)
    this.state = {
      scene: 'loading',
      teams:[],
      currentTeam: '',
    }
  }
  componentDidMount() {
      TeamService.getTeamsByPlayer((teams)=>{
        if(teams){
          this.setState({scene:"myTeams",teams})
        }
      },()=>{
        this.setState({scene:"noTeams"})
      })
  }

  showNoTeams = () => {
    return (
            <FadeInView style={styles.container} duration={30}>
                <View style={styles.myTeamsList}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:25,color:'white',textAlign:'center'}}>No estás en ningún equipo aún</Text>
                </View>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{this.setState({scene:'loading'});
                        this.props.hideFieldViewImg(); this.props.back()}} style={{flex:1, alignItems:'flex-start'}}>
                      <View style={styles.buttonBackPadre}>
                        <View style={styles.buttonBackHijo}/>
                          <Text style={{ backgroundColor: 'transparent',fontSize: 16,color:'white'}}>
                              <Icon name="chevron-left" size={15} color="#FFFFFF"/> Atrás
                          </Text>
                      </View>
                   </TouchableOpacity>
                   <View style={{flex:1, alignItems:'flex-end'}}>
                    <TouchableOpacity style={styles.button} onPress={this.setSceneRegistrarEquipo} ><Text style={styles.textButton}><Icon name="pencil" size={15} color="#FFFFFF"/> Crear equipo</Text></TouchableOpacity>
                  </View>
               </View>
            </FadeInView>
          )
  }
  showImage = (val) => {
    if(val.image !== undefined){
     return <Image style={{flex:1,justifyContent:'flex-end', alignItems:'center'}} borderTopLeftRadius={15}  borderTopRightRadius={15} source={{uri: val.image}}>
         <View style={[styles.circularIcon,{margin:-30}]}>
            <Icon name={"shield"}  size={40} color="#424242" />
         </View>
     </Image>
    }else{
    return  <Image style={{flex:1,justifyContent:'flex-end', alignItems:'center'}} borderTopLeftRadius={15}  borderTopRightRadius={15} source={{uri: 'https://scontent.fsjo3-1.fna.fbcdn.net/v/t1.0-9/20476594_10214031690128577_3616314918798365302_n.jpg?oh=bcb06b98a71b00fbedfaceea246e0f53&oe=59EFEB80'}}>
        <View style={[styles.circularIcon,{margin:-30}]}>
           <Icon name={"shield"}  size={40} color="#424242" />
        </View>
    </Image>
  }
}
  showBorderTop = (equipo) => {
    switch (equipo.estaVacio) {
      case true: return {
        flex:1,
        borderTopWidth:1,
        margin:15,
        borderColor:'#BDBDBD'
      }
      break;
      default: return {
        flex:1,
        borderTopWidth:1,
        borderColor:'#BDBDBD',
        marginHorizontal:15,
          marginTop:38,
      }
    }
  }

  myTeams(){
    let equipos = this.state.teams.map((val, key) => {
            return <TouchableOpacity onPress={()=>{
                this.setState({scene:'detalleEquipo',currentTeam:val})}} key={key} style={styles.teamContainer}>
                  {this.showImage(val)}
                  <View style={{flex:1}}>
                  <View style={{flex:2}}>
                      <Text style={styles.teamName}>{val.nombre}</Text>
                        <Text style={[styles.score,{marginHorizontal:30}]}><Icon name="trophy" size={20} color="yellow" /> {val.copas}</Text>

                  </View>
                    <View style={this.showBorderTop(val)}>
                      <Text style={styles.ligaName}>{val.liga}</Text>
                    </View>
                    {RenderIf(val.estaVacio==false,
                        <Text style={{paddingHorizontal:10, paddingVertical:4,borderBottomLeftRadius:9,borderBottomRightRadius:9,backgroundColor:'#D32F2F',height:25}}>
                            <Text style={[styles.textButton,{fontSize:12}]}><Icon name="warning" size={12} color="#FFFFFF"/> No hay jugadores</Text>
                        </Text>
                    )}
                  </View>


              </TouchableOpacity>

        });

    return (
    <FadeInView style={styles.container} duration={30}>
        <View style={styles.myTeamsList}>
          <ScrollView horizontal={true} style={[styles.myTeamsList,{flex:1}]}>
            {equipos}

          </ScrollView>
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{this.setState({scene:'loading'});
                this.props.hideFieldViewImg(); this.props.back()}} style={{flex:1, alignItems:'flex-start'}}>
              <View style={styles.buttonBackPadre}>
                <View style={styles.buttonBackHijo}/>
                  <Text style={{ backgroundColor: 'transparent',fontSize: 16,color:'white'}}>
                      <Icon name="chevron-left" size={15} color="#FFFFFF"/> Atrás
                  </Text>
              </View>
           </TouchableOpacity>
           <View style={{flex:1, alignItems:'flex-end'}}>
            <TouchableOpacity style={styles.button} onPress={this.setSceneRegistrarEquipo} ><Text style={styles.textButton}><Icon name="pencil" size={15} color="#FFFFFF"/> Crear equipo</Text></TouchableOpacity>
          </View>
       </View>
    </FadeInView>
    )
  }
detalleEquipo
  setMyTeamsMenu = ()=>{
     this.setState({scene:'myTeams'})
  }
  setSceneDetalleEquipo = ()=>{
     this.setState({scene:'detalleEquipo'})
  }
  setSceneAddPlayerToTeam = ()=>{
     this.setState({scene:'agregarJugadoresAEquipo'})
  }
  setScenePlayersByTeam = ()=>{
     this.setState({scene:'jugadoresPorEquipo'})
  }
  setSceneRegistrarEquipo = () => {
   this.setState({scene:'registrarEquipo'})
  }
  setSceneTeamPositions = () => {
   this.setState({scene:'teamPositions'})
  }
  showScene(){
    switch (this.state.scene) {
      case 'myTeams':
        return this.myTeams();
        break;
      case 'loading':
        return (<Loader/>)
        break;
        case 'noTeams':
          return (this.showNoTeams())
          break;
      case 'registrarEquipo':
        return (<CreateTeam user={this.props.user} back={()=> this.componentDidMount()} addPlayers={()=> this.setAddPlayerToTeam()} teams={this.state.teams} style={{marginTop:35,flex:1}}/>);
        break;
      case 'detalleEquipo':
        return (<TeamDetail back={()=> this.setMyTeamsMenu()} playersByTeam={()=> this.setScenePlayersByTeam()} team={this.state.currentTeam}/>);
        break;
      case 'agregarJugadoresAEquipo':
        return (<AddPlayersToTeam back={()=> this.setScenePlayersByTeam()} team={this.state.currentTeam}/>);
        break;
      case 'jugadoresPorEquipo':
        return (<PlayersByTeam addPlayers={()=> this.setSceneAddPlayerToTeam()} teamPositions={()=> this.setSceneTeamPositions()}  back={()=> this.setSceneDetalleEquipo()}  team={this.state.currentTeam}/>);
        break;
        case 'teamPositions':
          return (<TeamPositions showFieldViewImg={this.props.showFieldViewImg} hideFieldViewImg={this.props.hideFieldViewImg} back={()=> this.setScenePlayersByTeam()}  team={this.state.currentTeam}/>);
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
  score:{
    backgroundColor:'#FDD835',
    padding:5,
    borderRadius:5,
    borderWidth:1,
    borderColor:'white',
    height:30,
    color:'white',
    paddingHorizontal:10,
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
  container: {
     justifyContent: 'center',
     flex:1,
   },
   teamContainer:{
     display:'flex',
     flex:10,
     backgroundColor:'white',
     margin:10,
     width:190,
     borderRadius:15,
      overflow: 'hidden',
   },
   menuOptions:{
     flexDirection:'row',
     flex:1,
     padding:10,
     justifyContent: 'center',

   },
   backButton:{
     backgroundColor:'#2979FF',
     paddingHorizontal:15,
     paddingVertical:5,

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
   myTeamsList:{
     flexDirection:'row',
     flex:10,

   },
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
   textButton: {
     textAlign:'center',
     color:'white',
     fontSize:15,
   },
   teamName: {
     margin:5,
     marginTop:30,
     fontSize: 21,
     alignSelf: 'center',
     color: '#0D47A1'
   },
   puntaje: {
     fontSize: 15,
     alignSelf: 'center',

   },
   ligaName: {
     margin:10,
     fontSize: 15,
     alignSelf: 'center',
     color: 'black'
   },

})
