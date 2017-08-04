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
import AccountEditInfo from './accountEditInfo'
import AccountInfo from './accountInfo'
import FadeInView from 'react-native-fade-in-view';
export default class Account extends Component {
  constructor(props){
    super(props)
    this.state = {
      scene:'accountInfo'
    }
  }

  setAccountInfoScene = () => {
    this.setState({scene:'accountInfo'})
  }
  setAccountEditScene = () => {
    this.setState({scene:'accountEditInfo'})
  }

    showScene(){
      switch (this.state.scene) {
        case 'accountInfo':
        return <AccountInfo user={this.props.user}/>
        break;
        case 'accountEditInfo':
        return <AccountEditInfo/>
        break;
        break;
        default: return <AccountInfo/>
      }
    }

      render(){
        return (
          <FadeInView style={styles.container} duration={600}>
            {this.showScene()}
          </FadeInView>
        )
      }
    }

    const styles = StyleSheet.create({
container:{
  marginTop:35,flex:1

}
    })
