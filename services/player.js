import FirebaseBasicService from '../lib/firebaseBasicService'
import * as firebase from 'firebase'

class Player {
    static new(key){
      player = {firstTime: true, rol: "player", score:0, uid:key,cantidadEquipos:0 }
      FirebaseBasicService.newWithKey('users/players/',key, player)
    }
    static update(key, player){
      FirebaseBasicService.update('users/players/',key, player)
    }
    static findPlayerByUsername(filterData,callback,error){
      FirebaseBasicService.filterByAttribute('users/players/active/','username',filterData,callback,error)
    }
    static findPlayerByUsername(filterData,callback,error){
      FirebaseBasicService.filterByAttribute('users/players/active/','username',filterData,callback,error)
    }
    static getCurrentPlayer(callback){
      FirebaseBasicService.findActiveById('users/players/',firebase.auth().currentUser.uid,callback)
    }
    static findTopPlayers(callback,error){
      FirebaseBasicService.orderByAttribute('users/players/active/','score',callback,error)
    }
}

module.exports = Player
