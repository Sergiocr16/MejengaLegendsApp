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
export default class AccountEditInfo extends Component {
  constructor(props){
    super(props)
  }
      render(){
        return (
          <FadeInView style={styles.container} duration={600}>
             <Text>Account edit Info</Text>
          </FadeInView>
        )
      }
    }

    const styles = StyleSheet.create({

    })
