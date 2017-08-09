import FirebaseBasicService from '../lib/firebaseBasicService'
import * as firebase from 'firebase'

class Player {
    static new(key){
      player = {firstTime: true, rol: "player", score:0 }
      FirebaseBasicService.newWithKey('users/players/',key, player)
    }
    static update(key, player){
      FirebaseBasicService.update('users/players/',key, player)
    }

    static getCurrentPlayer(callback){
      FirebaseBasicService.findActiveById('users/players/',firebase.auth().currentUser.uid,callback)
    }

    static findTopPlayers(callback){
      FirebaseBasicService.orderByAttribute('users/players/active/','score',callback)
    }
}

module.exports = Player
