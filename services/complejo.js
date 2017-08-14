import * as firebase from 'firebase'
import FirebaseBasicService from '../lib/firebaseBasicService'
import Entities from '../lib/fireBaseEntities'
class ComplejoService {

    static getAll(callBack){
      FirebaseBasicService.getAll(Entities.COMPLEJOS,function(result){
          callBack(result);
      })
    }
    static newWithCallback(objeto,callback){
      FirebaseBasicService.newWithCallback(Entities.COMPLEJOS,objeto,callback);
    }

    static new(objeto){
      FirebaseBasicService.new(Entities.COMPLEJOS,objeto);
    }
    static update(key, complejo){
        FirebaseBasicService.update('complejo/complejos/',key, player)
    }
    static newCanchaByComplejo(objeto){
      FirebaseBasicService.newWithKey(Entities.CANCHASBYCOMPLEJO,firebase.auth().currentUser.uid,objeto);
    }
    static findTopComplejos(callback,error){
      FirebaseBasicService.orderByAttribute('complejos/active/','canton',callback,error)
    }
    static getCanchasByComplejo(callBack,error){
      FirebaseBasicService.findActiveById(Entities.CANCHASBYCOMPLEJO,firebase.auth().currentUser.uid,callBack,error)
    }
    static newCanchaByComplejo(objeto){
      FirebaseBasicService.newWithKey(Entities.CANCHASBYCOMPLEJO,firebase.auth().currentUser.uid,objeto);
    }
}


module.exports = ComplejoService