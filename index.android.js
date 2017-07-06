/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase'
import Login from './component/login'
import Firebase from './lib/firebase'
import TeamComponent from './component/team/teamCmp'
import FirebaseBasicService from './lib/firebaseBasicService'
import Entities from './lib/fireBaseEntities'
export default class MejengaLegendsApp extends Component {
  constructor(props){
  super(props)
  Firebase.init()
}
  render() {
    return (
      <View style={styles.container}>
              <ScrollView style={styles.teamContainer}>
                    <TeamComponent/>
              </ScrollView>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    padding:10,
    backgroundColor: 'white',
  },
  teamContainer: {


  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MejengaLegendsApp', () => MejengaLegendsApp);
