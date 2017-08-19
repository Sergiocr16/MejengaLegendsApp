import * as firebase from 'firebase'
import FirebaseBasicService from '../lib/firebaseBasicService'
import Entities from '../lib/fireBaseEntities'
class ComplejoService {

    static getAll(callBack,error){
      FirebaseBasicService.getAll(Entities.COMPLEJOS,callBack,error)
    }
    static newWithCallback(objeto,callback){
      FirebaseBasicService.newWithCallback(Entities.COMPLEJOS,objeto,callback);
    }

    static newWithKey(objeto){
      FirebaseBasicService.newWithKey(Entities.COMPLEJOS, objeto.uid,objeto);
    }

    static update(complejo){
        FirebaseBasicService.update(Entities.COMPLEJOS,complejo.uid, complejo)
    }

    static delete(key){
      FirebaseBasicService.deleteForever(Entities.COMPLEJOS + '/active/',key)
      FirebaseBasicService.deleteForever(Entities.CANCHASBYCOMPLEJO + '/active/',key)
    }

    static updateCancha(key, cancha){
      FirebaseBasicService.update(Entities.CANCHASBYCOMPLEJO,key, cancha)
    }

    static deleteCancha(key){
      FirebaseBasicService.deleteForever(Entities.CANCHASBYCOMPLEJO + '/active/',key)
    }

    static newCanchaByComplejo(objeto){
      FirebaseBasicService.newWithKey(Entities.CANCHASBYCOMPLEJO,objeto.uid,objeto);
    }
    static findTopComplejos(callback,error){
      FirebaseBasicService.orderByAttribute('complejos/active/','canton',callback,error)
    }

    static getCanchasByComplejo(idComplejo, callback,error){
      FirebaseBasicService.findActiveById(Entities.CANCHASBYCOMPLEJO,idComplejo,callback,error)
    }
    static getCanchasByComplejoOnce(idComplejo, callback,error){
      FirebaseBasicService.findActiveByIdOnce(Entities.CANCHASBYCOMPLEJO,idComplejo,callback,error)
    }
}


module.exports = ComplejoService
