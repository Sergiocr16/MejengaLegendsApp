import * as firebase from 'firebase'
import FirebaseBasicService from '../lib/firebaseBasicService'
import Entities from '../lib/fireBaseEntities'
class CanchaService {

    static createCancha(canchas,complejoUID){
      FirebaseBasicService.newWithKey(Entities.CANCHASBYCOMPLEJO,complejoUID,canchas);
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
}


module.exports = CanchaService
