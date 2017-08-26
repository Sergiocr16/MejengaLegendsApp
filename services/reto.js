import * as firebase from 'firebase'
import FirebaseBasicService from '../lib/firebaseBasicService'
import PartidoService from './partido';
import Entities from '../lib/fireBaseEntities'
class RetoService {

    static crearSolicitudReto(reto,callback){
      FirebaseBasicService.newWithCallbackWithoutUIDRETO(Entities.CHALLENGES,reto,callback);
    }

    static getAll(callback,error){
      FirebaseBasicService.getAll(Entities.CHALLENGES,callback,error);
    }

    static getRetosByComplejo(complejoGUID, callback,error){
      FirebaseBasicService.filterByAttributeChallenges('challenges/active/','complejoGUID',complejoGUID,callback,error)
    }

    static delete(retoGUID){
      FirebaseBasicService.deleteForever('challenges/active/',retoGUID)
    }

}


module.exports = RetoService
