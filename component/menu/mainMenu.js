import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
  KeyboardAvoidingView
} from 'react-native'
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';

export default class MainMenu extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      response: ''
    }
    this.signOut = this.signOut.bind(this)
  }

  async signOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
  }

  render(){
    return (
      <FadeInView  duration={300}>
      <Text>Sesion iniciada y estoy en el menu</Text>
      <TouchableOpacity onPress={this.signOut}><Text>cerrarSesion</Text></TouchableOpacity>
      </FadeInView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row'
  },
  titleButton:{
    width: 100,
    marginHorizontal:2,
    marginTop: 15,
    marginLeft:25,
  },
  whiteBorder:{
    marginBottom:10
  },
  flex1:{
    flex:1
  },
  whiteFont:{
    color:'white'
  },
  logo:{
    flex:1
  },
  bgImage:{
    flex:3,
    paddingVertical:20,
    paddingHorizontal:50,
  },
  maintCointainer:{
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius:7
  },
  forgetPassButton:{
    marginBottom:20
  },
  menuContainer:{
    flexDirection:'row'
  },
  buttonContainer: {
    flexDirection:'row',
    marginHorizontal:100
  },
  inputText: {
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#ffff',
    textAlign:'center',
  },
  button: {
    backgroundColor: '#FF8A65',
    paddingVertical: 10,
    marginBottom: 10,
    flex:1
  },
  textButton: {
    textAlign: 'center'
  },
  containerInputs: {
    marginBottom: 20,
    marginTop:40,
    marginHorizontal:100,
  }
})
