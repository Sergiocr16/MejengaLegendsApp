import FirebaseBasicService from '../lib/firebaseBasicService'
import * as firebase from 'firebase'

class SuperAdmin {
    static new(key){
      superAdmin = {rol: "superAdmin",uid:key,nombre:'Mejenga',primerApellido:'Legends'}
      FirebaseBasicService.newWithKey('users/superAdmin/',key, superAdmin)
    }
    static update(key, player){
      FirebaseBasicService.update('users/players/',key, player)
    }
    static findPlayerByUsername(filterData,callback){
      FirebaseBasicService.filterByAttribute('users/players/active/','username',filterData,callback)
    }
    static getCurrentPlayer(callback){
      FirebaseBasicService.findActiveById('users/players/',firebase.auth().currentUser.uid,callback)
    }
    static findTopPlayers(callback,error){
      FirebaseBasicService.orderByAttribute('users/players/active/','score',callback,error)
    }
}

module.exports = SuperAdmin
