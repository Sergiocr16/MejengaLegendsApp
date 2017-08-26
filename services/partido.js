import * as firebase from 'firebase'
import FirebaseBasicService from '../lib/firebaseBasicService'
import Entities from '../lib/fireBaseEntities'
class PartidoService {

    static crearPartidoApartirDeReto(cancha,partidos){
      FirebaseBasicService.newWithKey(Entities.MATCHES,cancha.canchaGUID,partidos);
    }
    static agregarPartidoAJugadores(playerUID,partidos){
      FirebaseBasicService.newWithKey(Entities.MATCHESBYPLAYER,playerUID,partidos);
    }
    static getPartidosByPlayer(idPlayer, callback,error){
      FirebaseBasicService.findActiveByIdOnce(Entities.MATCHESBYPLAYER,idPlayer,callback,error)
    }
    static getPartidosByCurrentPlayer(idPlayer, callback,error){
      FirebaseBasicService.findActiveById(Entities.MATCHESBYPLAYER,idPlayer,callback,error)
    }


}


module.exports = PartidoService
