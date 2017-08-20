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
import SoundManager from '../../services/soundManager';
export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      response: ''
    }
    this.login = this.login.bind(this)
  }

  async login() {
      SoundManager.playPushBtn();
    try {
      await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    } catch(error){
       switch (error.message) {
          case 'The email address is badly formatted.':
ToastAndroid.show("La correo electrónico esta mal formateado.", ToastAndroid.LONG);
          break;
          case 'The password is invalid or the user does not have a password.':
ToastAndroid.show("La contraseña es incorrecta.", ToastAndroid.LONG);
          break;
          case 'There is no user record corresponding to this identifier. The user may have been deleted.':
ToastAndroid.show("No existe ningún usuario registrado con ese correo.", ToastAndroid.LONG);
          break;
         default:

       }

    }
  }

  render(){
    return (
      <FadeInView  duration={300}>
      <View style={styles.containerInputs}>
      <TextInput
      underlineColorAndroid='rgba(255,255,255, 0.4)'
      placeholderTextColor="rgba(255,255,255, 0.7)"
      placeholder="Email"
      disableFullscreenUI={true}
      autoCorrect={false}
      keyboardType="email-address"
      returnKeyType='next'
      autocapitalize='none'
      onSubmitEditing={()=> this.passwordInput.focus()}
      style={styles.inputText}
      onChangeText={(email) => this.setState({email})}
      />
      <TextInput
      underlineColorAndroid='rgba(255,255,255, 0.4)'
      placeholderTextColor="rgba(255,255,255, 0.7)"
      placeholder="Contraseña"
      disableFullscreenUI={true}
      autoCorrect={false}
      style={styles.inputText}
      secureTextEntry={true}
      password={true}
      ref={(input)=> this.passwordInput = input}
      returnKeyType='go'
      onChangeText={(password) => this.setState({password})}
      />
      </View>
      <View  style={styles.buttonContainer}>
      <TouchableOpacity
      onPress={this.login}
      style={[styles.loginButton, styles.button]}
      >
      <Text
      style={[styles.whiteFont,styles.textButton]}
      >Login</Text>
      </TouchableOpacity>
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
