import * as firebase from 'firebase'
import FirebaseBasicService from '../lib/firebaseBasicService'
import Player from '../services/player'
import Entities from '../lib/fireBaseEntities'
class LigaService {

    static findTopLigas(callback,error){
       // FirebaseBasicService.orderByAttribute('teams/active/','copas',callback,error)
       [{nombre:"Amateur",tipo:"amateur",minimoNivel:100, maximoNivel:250},
       {nombre:"Profesional;",tipo:"Profesional",minimoNivel:251, maximoNivel:400},
       {nombre:"Leyenda",tipo:"leyenda",minimoNivel:401, maximoNivel:500}]
      }
}
module.exports = LigaService