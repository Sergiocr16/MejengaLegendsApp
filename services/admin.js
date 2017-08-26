import FirebaseBasicService from '../lib/firebaseBasicService'
import * as firebase from 'firebase'
import Entities from '../lib/fireBaseEntities'
class Admin {
    static new(key,object){
      FirebaseBasicService.newWithKey('users/admins/',key, object)
    }
    static getAll(callback,error){
      FirebaseBasicService.getAll('users/'+Entities.ADMINS,callback,error)
    }
}

module.exports = Admin
