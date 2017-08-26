import FirebaseBasicService from '../lib/firebaseBasicService'
import * as firebase from 'firebase'
import Entities from '../lib/fireBaseEntities'
class Admin {
    static new(key,object){
      admins = {nombre: 'Diego', primerApellido: "Martinez", segundoApellido:'Vega', telefono:'3441414',cedula:'31413413',email:'degb@eaer.com'}
      FirebaseBasicService.newWithKey('users/admins/',key, object)
    }
    static getAll(callback,error){
      FirebaseBasicService.getAll('users/'+Entities.ADMINS,callback,error)
    }
}

module.exports = Admin
