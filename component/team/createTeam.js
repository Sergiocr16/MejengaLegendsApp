import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ScrollView,
  DatePickerAndroid,
  Picker
} from 'react-native'
var moment = require('moment');
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
import Player from '../../services/player';
import TeamService from '../../services/team';
var t = require('tcomb-form-native');
var Form = t.form.Form;

import Icon from 'react-native-vector-icons/FontAwesome';
export default class CreateTeam extends Component {
  constructor(props){
    super(props)

    this.state = {
      nombre: '',
      lema: '',
      genero:'Masculino',
      genders:['Masculino','Femenino'],
      player:{ nombre: '',liga:'',PrimerApellido:'',score:0}
    }
  }

 submit = () =>{
   var team = {};
   team.nombre = this.state.nombre;
   team.lema = this.state.lema;
   team.genero = this.state.genero;
   team.copas = 0;
   team.golesMarcados = 0;
   team.golesRecibidos = 0;
   team.rachaVictorias = 0;
   team.mayorPuntajeDeLaHistoria = 0;
   team.logo = 'shield';
   team.liga = 'Liga Amateur';
   var equiposDelJugador = {};
   team.fundador = { nombre: this.props.user.nombre + ' ' + this.props.user.primerApellido,jugadorGUID:firebase.auth().currentUser.uid};
   TeamService.newWithCallback(team,(equipo)=>{
     equiposDelJugador = this.props.teams;
     equiposDelJugador.push(equipo);
     TeamService.newTeamsByPlayer(equiposDelJugador);
     this.props.back();
   });
 }

  render(){
    let genderPicker = this.state.genders.map( (s, i) => {
       return <Picker.Item  key={i} value={s} label={s} />
     });
    return (
      <FadeInView style={styles.container} duration={600}>
        <View style={styles.infoContainer}>
          <View style={styles.mainName}>
              <Text style={styles.whiteFont}></Text>
          </View>
          <View style={styles.subtitle}>
              <Text style={styles.whiteFont2}>Estadisticas e información básica</Text>
          </View>
         <View style={{padding:20}}>
         <ScrollView>
           <View style={{flexDirection:'row'}}>
             <TextInput
             underlineColorAndroid='#42A5F5'
             placeholderTextColor="grey"
             placeholder="Nombre del equipo"
             autocapitalize={true}
             disableFullscreenUI={true}
             style={[styles.inputText,{flex:1}]}
             onChangeText={(nombre) => this.setState({nombre})}
             />
             <TextInput
             underlineColorAndroid='#42A5F5'
             placeholderTextColor="grey"
             placeholder="Lema"
             disableFullscreenUI={true}
             style={[styles.inputText,{flex:1}]}
             onChangeText={(lema) => this.setState({lema})}
             />
          </View>
          <View style={{flexDirection:'column',marginVertical:20}}>
            <View style={{flex:1,marginBottom:25}}>
               <Text style={styles.bold}>Selecciona el género del equipo</Text>
               <Picker style={styles.androidPicker} selectedValue={this.state.genero}
                  onValueChange={ (genero) => (this.setState({genero})) } >
                  {genderPicker}
               </Picker>
            </View>
         </View>
         <TouchableOpacity style={styles.button}  onPress={this.submit} underlayColor='#99d9f4'>
             <Text style={styles.buttonText}>¡Listo!</Text>
         </TouchableOpacity>
       </ScrollView>

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
       <View style={{flex:1, alignItems:'flex-end'}}>
        <TouchableOpacity style={styles.button} onPress={()=>{this.setState({scene:'editInfo'})}}><Text style={styles.textButton}><Icon name="pencil" size={15} color="#FFFFFF"/> Editar</Text></TouchableOpacity>
      </View>
      </View>
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
     backgroundColor:'#42A5F5',
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
     height:130,
     width:130,
     borderWidth:2,
     borderColor:'white'
   },
   whiteFont:{
     color:'white',
     textAlign:'center'
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
//
// const styles = StyleSheet.create({
//   androidPicker: {
//     height: 40,
//             alignSelf: 'stretch',
//             alignItems:'center',
//             justifyContent:'center',
//         },
//   inputText: {
//     height: 40,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     color: 'grey',
//     textAlign:'center',
//   },
//   boldSmall:{
//     color:'#42A5F5',
//     fontSize:10,
//     textAlign:'center',
//   },
//   bold:{
//       color:'#42A5F5',
//       textAlign:'center',
//       fontWeight:'bold'
//   },
//   ageText:{
//     color:'orange',
//     fontSize:28,
//     textAlign:'center',
//     fontWeight:'bold',
//   },
//   btnAge:{
//     height: 40,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   mainName:{
//     backgroundColor:'#1A237E',
//     padding:7,
//    borderTopLeftRadius:10,
//    borderTopRightRadius:10
//   },
//   subtitle:{
//     backgroundColor:'#42A5F5',
//     padding:8
//   },
//   whiteFont2:{
//     color:'#1A237E',
//     textAlign:'center'
//   },
//   whiteFont:{
//     color:'white',
//     fontWeight:'bold',
//     textAlign:'center'
//   },
//   infoContainer:{
//     flex:10,
//     backgroundColor:'white',
//     borderRadius:10,
//     margin:20
//   },
//   container: {
//      justifyContent: 'center',
//      backgroundColor: '#ffffff',
//      flex:1,
//      margin:15,
//      borderRadius:10
//    },
//    title: {
//      fontSize: 30,
//      alignSelf: 'center',
//      marginBottom: 30
//    },
//    buttonText: {
//      fontSize: 18,
//      color: 'white',
//      alignSelf: 'center'
//    },
//    button: {
//      height: 36,
//      backgroundColor: '#48BBEC',
//      borderColor: '#48BBEC',
//      borderWidth: 1,
//      borderRadius: 8,
//      marginBottom: 10,
//      alignSelf: 'stretch',
//      justifyContent: 'center'
//    }
// })
