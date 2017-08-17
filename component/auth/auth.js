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
import SignUp from './signUp'
import Login from './login'
import RecoverPassword from './recoverPassword'
import FadeInView from 'react-native-fade-in-view';
import SoundManager from '../../services/soundManager';
export default class Auth extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      response: '',
      scene: 'login'
    }
    this.setLoginScene = this.setLoginScene.bind(this)
    this.setRegisterScene = this.setRegisterScene.bind(this)
    this.setRecoverPasswordScene = this.setRecoverPasswordScene.bind(this)
  }

  setLoginScene(){
    SoundManager.playSwitchClick();
    this.setState({scene:'login'})
  }
  setRegisterScene(){
    SoundManager.playSwitchClick();
    this.setState({scene:'register'})
  }
  setRecoverPasswordScene(){
    SoundManager.playSwitchClick();
    this.setState({scene:'recoverPassword'})
  }

  active(option) {
    switch (this.state.scene) {
      case option: return {
        width: 100,
        marginHorizontal:2,
        marginTop: 15,
        marginLeft:25,
        borderBottomWidth: 1,
        borderBottomColor: '#FF8A65',
      }
      break;
      default: return {
        width: 100,
        marginHorizontal:2,
        marginTop: 15,
        marginLeft:25,
      }
    }
  }
  showMenuBar(){
    if(this.state.scene !== 'recoverPassword'){
      return(  <FadeInView  duration={300} style={styles.menuContainer}><TouchableOpacity onPress={this.setLoginScene} style={this.active('login')}><Text style={[styles.whiteFont,styles.whiteBorder,styles.textButton]}>Login</Text></TouchableOpacity>
      <TouchableOpacity onPress={this.setRegisterScene} style={this.active('register')}><Text  style={[styles.whiteFont,styles.whiteBorder,styles.textButton]}>Registrarse</Text></TouchableOpacity></FadeInView>)
    }else{
      return(<FadeInView  duration={300} style={styles.menuContainer}>
        <TouchableOpacity onPress={this.setLoginScene} style={this.active('recoverPassword')}><Text style={[styles.whiteFont,styles.whiteBorder,styles.textButton]}>Atrás</Text></TouchableOpacity>
        </FadeInView>)
      }
    }
    showScene(){
      switch (this.state.scene) {
        case 'register':
        return <SignUp/>
        break;
        case 'login':
        return <Login/>
        break;
        case 'recoverPassword':
        return <RecoverPassword/>
        break;
        default: return <Login/>
      }
    }
    showRecoverPasswordButton(){
      if(this.state.scene==='login'){
        return( <TouchableOpacity
          onPress={this.setRecoverPasswordScene}
          >
          <Text
          style={[styles.whiteFont,styles.textButton,styles.forgetPassButton]}
          >¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>)
        }
      }
      render(){
        return (
          <FadeInView style={styles.container} duration={600}>
          <Image style={styles.bgImage} source={{uri: 'http://www.hdwallpaperspulse.com/wp-content/uploads/2017/04/09/soccer-field-night-image.jpg'}}>
          <View style={styles.maintCointainer}>
          {this.showMenuBar()}
          {this.showScene()}
          {this.showRecoverPasswordButton()}
          </View>
          </Image>
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
        flex:1,
        justifyContent: 'center',
        paddingHorizontal:30
      },
      maintCointainer:{
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        borderRadius:7,
        height:270,
      },
      forgetPassButton:{
        marginBottom:20
      },
      menuContainer:{
        flexDirection:'row',
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
