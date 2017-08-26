import * as firebase from 'firebase'
import FirebaseBasicService from '../lib/firebaseBasicService'
import PartidoService from './partido';
import Entities from '../lib/fireBaseEntities'
class RetoService {

    static crearSolicitudReto(reto,callback){
      FirebaseBasicService.newWithCallbackWithoutUID(Entities.CHALLENGES,reto,callback);
    }

    static getAll(callback,error){
      FirebaseBasicService.getAll(Entities.CHALLENGES,callback,error);
    }

}


module.exports = RetoService
