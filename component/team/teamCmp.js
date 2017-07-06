import React, { Component } from 'react';
import TeamService from './teamService';
import * as firebase from 'firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  TextInput,
  AutoGrowingTextInput
} from 'react-native';

export default class TeamComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      teams:[],
      equiposPrueba: [{key: "1",'name':'Barcelona'}],
    }

  }

  createTeam(){
    TeamService.new({name:"saprissa", lema:"los mejores"})
  }
  setTeams(){
    var self = this;
    var firebaseRef = firebase.database().ref("/teams/active/");
    firebaseRef.once('value')
    .then(function(dataSnapshot) {
      for(team in dataSnapshot){
      console.warn(team.val())
      }
    });
  }


  render() {
    //this.setTeams();
  //    let Teams = this.state.teams.map((val,key)=> {
    //      return <Text>
      //    {teams.val}
        // </Text>
      //  });

    return (


      <View>
        <TextInput style = {styles.input}
            underlineColorAndroid = "black"
            placeholder = "Nombre del equipo"
            placeholderTextColor = "#9a73ef"
            autoCapitalize = "none"
            onChangeText = {this.handleEmail}/>

         <TextInput style = {styles.input}
            underlineColorAndroid = "black"
            placeholder = "Lema"
            placeholderTextColor = "#9a73ef"
            autoCapitalize = "none"
            value={this.state.team.}
            onChangeText = {this.handlePassword}/>
            <TouchableOpacity onPress={this.createTeam()} style={styles.addButton}>
                <Text> Insertar equipo</Text>
            </TouchableOpacity>
       </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex:5555,
    backgroundColor: 'white',
    padding:20,
  },
  input: {
    margin: 15,
    height: 40,

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
