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
import AddPlayersToTeam from '../team/addPlayersToTeam';
import TeamService from '../../services/team';
import Loader from '../app/loading';
import RenderIf from '../app/renderIf';


export default class PlayersByTeam extends Component {
  constructor(props){
    super(props)
    this.state = {
      scene: 'loading',
    }
  }
  componentDidMount() {
    this.props.showFieldViewImg();

  }

  render(){
    return (
      <FadeInView style={styles.container} duration={30}>
          <View style={styles.myTeamsList}>

              <View style={{flex:1,flexDirection:'row',alignItems:'stretch'}}>

              </View>

          </View>
          <View style={{flex:1,flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>{this.setState({scene:'loading'}); this.props.hideFieldViewImg(); this.props.back()}} style={{flex:1, alignItems:'flex-start'}}>
                <View style={styles.buttonBackPadre}>
                  <View style={styles.buttonBackHijo}/>
                    <Text style={{ backgroundColor: 'transparent',fontSize: 16,color:'white'}}>
                        <Icon name="chevron-left" size={15} color="#FFFFFF"/> Atrás
                    </Text>
                </View>
             </TouchableOpacity>
             <View style={{flex:1, alignItems:'flex-end'}}>
              <TouchableOpacity style={styles.button} onPress={this.setSceneRegistrarEquipo} ><Text style={styles.textButton}><Icon name="pencil" size={15} color="#FFFFFF"/> Agregar jugadores</Text></TouchableOpacity>
            </View>
         </View>
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


})
