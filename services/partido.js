import * as firebase from 'firebase'
import FirebaseBasicService from '../lib/firebaseBasicService'
import Entities from '../lib/fireBaseEntities'
class PartidoService {

    static crearPartidoApartirDeReto(cancha,partidos,callback){
      FirebaseBasicService.newWithKey(Entities.MATCHES,cancha.canchaGUID,partidos);
    }
}


module.exports = PartidoService
