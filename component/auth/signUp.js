import React, {Component} from 'react'
import Player from '../../services/player'
import SuperAdmin from '../../services/superAdmin'
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
import SoundManager from '../../services/soundManager';
export default class SignUp extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      response: ''
    }
    this.signUp = this.signUp.bind(this)
  }
  async sendVerification() {
    try {
      firebase.auth().currentUser.sendEmailVerification().then(function() {
      }, function(error) {
        // An error happened.
      });
    } catch(error){
      this.setState({
        response: error.toString()
      })
    }
  }
  async signUp() {
      SoundManager.playPushBtn();
    try {
      await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      this.setState({
        response: 'account created!'
      })
      if(this.state.email === "mejengalegends@gmail.com"){
       SuperAdmin.new(firebase.auth().currentUser.uid)
      }else{
      Player.new(firebase.auth().currentUser.uid)
      }
      this.sendVerification()
    } catch(error){
      ToastAndroid.show(error.message, ToastAndroid.LONG);
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
      onSubmitEditing={()=> this.passwordInput.focus()}
      disableFullscreenUI={true}
      autoCorrect={false}
      keyboardType="email-address"
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
      onChangeText={(password) => this.setState({password})}
      />
      </View>
      <View  style={styles.buttonContainer}>
      <TouchableHighlight
      onPress={this.signUp}
      style={[styles.loginButton, styles.button]}
      >
      <Text
      style={[styles.whiteFont,styles.textButton]}
      >Registrarme</Text>
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
