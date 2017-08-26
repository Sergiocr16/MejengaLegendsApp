import FirebaseBasicService from '../lib/firebaseBasicService'
import * as firebase from 'firebase'
import Entities from '../lib/fireBaseEntities'
class Arbitro {
    static new(key,object){
      FirebaseBasicService.newWithKey('users/arbitros/',key, object)
    }
    static newWithCallback(key,objeto,callback){
      FirebaseBasicService.newWithCallback('users/arbitros/',key,objeto,callback);
    }
    static newArbitrosByComplejo(objeto,uid){
      FirebaseBasicService.newWithKey(Entities.ARBITROSBYCOMPLEJO,uid,objeto);
    }
    static getArbitrosByComplejo(complejoGUID,callBack,error){
      FirebaseBasicService.findActiveByIdOnce(Entities.ARBITROSBYCOMPLEJO,complejoGUID,callBack,error)
    }
}

module.exports = Arbitro
