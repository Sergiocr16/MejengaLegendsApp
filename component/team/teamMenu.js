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

import TeamService from '../../services/team';
import Loader from '../app/loading';
var t = require('tcomb-form-native');
var Form = t.form.Form;


export default class TeamMenu extends Component {
  constructor(props){
    super(props)
    TeamService.getTeamsByPlayer((teams)=>{
      console.log(teams);
        this.setState({scene:"myTeams",teams})
    })
    this.state = {
      scene: 'loading',
      teams:[],
    }
      this.setSceneRegistrarEquipo = this.setSceneRegistrarEquipo.bind(this)
  }


  myTeams(){
    let equipos = this.state.teams.map( (val, key) => {
            return <TouchableOpacity key={key} style={styles.teamContainer}>
                  <Image style={{flex:1,justifyContent:'flex-end', alignItems:'center'}} borderTopLeftRadius={15}  borderTopRightRadius={15} source={{uri: 'https://scontent.fsjo3-1.fna.fbcdn.net/v/t1.0-9/20476594_10214031690128577_3616314918798365302_n.jpg?oh=bcb06b98a71b00fbedfaceea246e0f53&oe=59EFEB80'}}>
                      <View style={[styles.circularIcon,{margin:-30}]}>
                         <Icon name={"shield"}  size={40} color="#424242" />
                      </View>
                  </Image>
                  <View style={{flex:1}}>
                  <View style={{flex:2}}>
                        <Text style={styles.teamName}>{val.nombre}</Text>
                          <Text style={styles.puntaje}>{val.puntaje} puntos</Text>
                  </View>
                    <View style={{flex:1,borderTopWidth:1, margin:15, borderColor:'#BDBDBD'}}>
                      <Text style={styles.ligaName}>{val.liga.nombre}</Text>
                    </View>
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
            <TouchableOpacity onPress={this.props.back} style={{flex:1, alignItems:'flex-start'}}>
              <View style={styles.buttonBackPadre}>
                <View style={styles.buttonBackHijo}/>
                  <Text style={{ backgroundColor: 'transparent',fontSize: 16,color:'white'}}>
                      <Icon name="chevron-left" size={15} color="#FFFFFF"/> Atrás
                  </Text>
              </View>
           </TouchableOpacity>
           <View style={{flex:1, alignItems:'flex-end'}}>
            <TouchableOpacity style={styles.button} onPress={this.setSceneRegistrarEquipo}><Text style={styles.textButton}><Icon name="user" size={15} color="#FFFFFF"/> Crear equipo</Text></TouchableOpacity>
          </View>
       </View>
    </FadeInView>
    )
  }
  setSceneRegistrarEquipo(){
   this.setState({scene:'registrarEquipo'})
  }
  showScene(){
    switch (this.state.scene) {
      case 'myTeams':
        return this.myTeams();
        break;
        case 'loading':
          return (<Loader/>)
          break;
      case 'registrarEquipo':
        return (<CreateTeam style={{marginTop:35,flex:1}}/>);
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
     backgroundColor: '#2962FF',
     transform: [{
       rotate: '138deg',
     }]
   },
  container: {
     justifyContent: 'center',
     marginTop:35,
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
