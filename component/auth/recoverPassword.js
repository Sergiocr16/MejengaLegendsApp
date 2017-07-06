import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Image,
  ToastAndroid
} from 'react-native'
import * as firebase from 'firebase'
import FadeInView from 'react-native-fade-in-view';
export default class RecoverPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      response: ''
    }
    this.recoverPassword = this.recoverPassword.bind(this)
  }
  async sendVerification() {
    try {
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email sent.
        ToastAndroid.show('Se ha enviado un correo en tu email para que verifiques tu cuenta', ToastAndroid.LONG);
      }, function(error) {
        // An error happened.
      });
    } catch(error){
      this.setState({
        response: error.toString()
      })
    }
  }

  async recoverPassword() {
    try {
      await firebase.auth().sendPasswordResetEmail(this.state.email)
      ToastAndroid.show('Verifica tu correo electrónico para restaurar tu contraseña', ToastAndroid.LONG);
    } catch(error){
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  }

  render(){
    return (
    <FadeInView  duration={300}>
      <View style={styles.containerInputs}>
      <Text style={[styles.whiteFont,styles.textButton]}>Digita tu email registrado en Mejenga Legends y se te enviará un correo para reestablecer tu contraseña.</Text>

      <TextInput
      underlineColorAndroid='rgba(255,255,255, 0.4)'
      placeholderTextColor="rgba(255,255,255, 0.7)"
      placeholder="Email"
      disableFullscreenUI={true}
      autoCorrect={false}
      keyboardType="email-address"
      style={styles.inputText}
      onChangeText={(email) => this.setState({email})}
      />
      </View>
      <View  style={styles.buttonContainer}>
      <TouchableHighlight
      onPress={this.recoverPassword}
      style={[styles.loginButton, styles.button]}
      >
      <Text
      style={[styles.whiteFont,styles.textButton]}
      >Recuperar contraseña</Text>
      </TouchableHighlight>
      </View>
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
