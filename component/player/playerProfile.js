import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native'
var moment = require('moment');
import * as firebase from 'firebase'
import EditPlayer from './editPlayer';
import FadeInView from 'react-native-fade-in-view';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class PlayerProfile extends Component {
  constructor(props){
    super(props)
  var years = parseInt(moment(new Date()).format('YYYY')) - parseInt(moment(this.props.user.fechaNacimiento).format('YYYY'));
    this.state = {
      years : years,
      scene: 'info'
    }
    console.log(this.props.showBackButton)
  }

  showImage = () => {
    if(this.props.user.image==undefined){
    return  <Image style={styles.profileImage} borderRadius={10} source={{uri: 'http://www.regionlalibertad.gob.pe/ModuloGerencias/assets/img/unknown_person.jpg'}}></Image>
    }else{
      return <Image style={styles.profileImage} borderRadius={10} source={{uri: this.props.user.image}}></Image>
    }
  }

  showTitle = () =>{
    if(this.props.showBackButton){
      return <View>
      <View style={styles.mainName}><Text style={styles.whiteFont}>{this.props.user.nombre.toUpperCase() +" "+ this.props.user.primerApellido.toUpperCase()}</Text></View>
      <View style={styles.subtitle}><Text style={styles.whiteFont2}>Información básica</Text></View>
      </View>
   }
     return null;
  }
  showBackButton = () =>{
    if(this.props.showBackButton==true){
      return <TouchableOpacity onPress={this.props.back} style={{flex:1, alignItems:'flex-start'}}>
        <View style={styles.buttonBackPadre}>
          <View style={styles.buttonBackHijo}/>
            <Text style={{ backgroundColor: 'transparent',fontSize: 16,color:'white'}}>
                <Icon name="chevron-left" size={15} color="#FFFFFF"/> Atrás
            </Text>
        </View>
     </TouchableOpacity>
   }
     return null;
  }
  showInfo(){
    return (
      <FadeInView style={styles.container}>
      <FadeInView style={styles.infoContainer} duration={300}>
       {this.showTitle()}
       <View style={styles.basicInfo}>
       <View style={{flex:1,alignItems:'center'}}>
        {this.showImage()}
         <Text style={styles.boldFont}>{this.props.user.nombre.toUpperCase() +" "+ this.props.user.primerApellido.toUpperCase()}</Text>
         <Text>{this.props.user.username}</Text>
       </View>
        <View style={{flex:2}}>
          <View style={styles.info}>
             <Text style={styles.flexStart}>Altura [cm]/ Edad</Text>
             <Text style={styles.flexEnd}>{this.props.user.altura} / {this.state.years}</Text>
          </View>
          <View style={styles.info}>
             <Text style={styles.flexStart}>Pie Dominante</Text>
             <Text style={styles.flexEnd}>{this.props.user.pieDominante}</Text>
          </View>
          <View style={styles.info}>
             <Text style={styles.flexStart}>Copas</Text>
             <Text style={styles.flexEnd}>{this.props.user.score}</Text>
          </View>
          <View style={styles.info}>
             <Text style={styles.flexStart}>Liga actual</Text>
             <Text style={styles.flexEnd}>{this.props.user.liga}</Text>
          </View>
          <View style={styles.info}>
             <Text style={styles.flexStart}>Posición principal</Text>
             <Text style={styles.flexEnd}>{this.props.user.posicionPrincipal}</Text>
          </View>
          <View style={styles.info}>
             <Text style={styles.flexStart}>Posición secundaria</Text>
             <Text style={styles.flexEnd}>{this.props.user.posicionSecundaria}</Text>
          </View>
          <View style={styles.info}>
             <Text style={styles.flexStart}>Fichable</Text>
             <Text style={styles.flexEnd}>{this.props.user.fichable}</Text>
          </View>
        </View>
       </View>
      </FadeInView>
      <View style={{flex:1,flexDirection:'row'}}>
    {this.showBackButton()}
      </View>
      </FadeInView>
    )
  }
      render(){
        return (
          <View style={{flex:1}}>
          {this.showInfo()}
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
   redButton:{
     margin:10,
     backgroundColor:'red',
     paddingVertical:5,
     paddingHorizontal:10,
     borderRadius:20
   }

    })
