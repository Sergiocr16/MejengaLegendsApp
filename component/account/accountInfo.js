import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native'
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
import SoundManager from '../../services/soundManager';
export default class AccountInfo extends Component {
  constructor(props){
    super(props)
  this.signOut = this.signOut.bind(this)
  }
  async signOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      SoundManager.releaseBackgroundMusic();
        SoundManager.playPushBtn();
    }, function(error) {
      // An error happened.
    });
  }
  showImage = () => {
    if(this.props.user.image==undefined){
    return  <Image style={styles.profileImage} borderRadius={100} source={{uri: 'http://www.regionlalibertad.gob.pe/ModuloGerencias/assets/img/unknown_person.jpg'}}></Image>
    }else{
      return <Image style={styles.profileImage} borderRadius={100} source={{uri: this.props.user.image}}></Image>
    }
  }

  defineRol = () => {
    if(this.props.user.rol === "player"){
      return (
        <FadeInView style={styles.container} duration={600}>
         {this.showImage()}
           <Text style={styles.title}>{this.props.user.nombre +" "+ this.props.user.primerApellido +" "+ this.props.user.segundoApellido}</Text>
           <Text style={styles.subTitle}>{this.props.user.username}</Text>
            <TouchableOpacity style={styles.redButton} onPress={this.signOut}><Text style={styles.whiteFont}>Cerrar sesión</Text></TouchableOpacity>
        </FadeInView>
      )
    }else if(this.props.user.rol==="superAdmin"){
      return (
        <FadeInView style={styles.container} duration={600}>
         {this.showImage()}
           <Text style={styles.title}>Super administrador</Text>
           <Text style={styles.subTitle}>Mejenga Legends</Text>
            <TouchableOpacity style={styles.redButton} onPress={this.signOut}><Text style={styles.whiteFont}>Cerrar sesión</Text></TouchableOpacity>
        </FadeInView>
      )
    }
  }
      render(){
        return (
          <FadeInView style={styles.container} duration={600}>
          {this.defineRol()}
          </FadeInView>
        )
      }
    }

    const styles = StyleSheet.create({
   container:{
     flex:1,
     alignItems:'center',
     justifyContent:'center'
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
     height:120,
     width:120,
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
