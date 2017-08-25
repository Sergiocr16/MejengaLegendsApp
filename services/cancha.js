import * as firebase from 'firebase'
import FirebaseBasicService from '../lib/firebaseBasicService'
import Entities from '../lib/fireBaseEntities'
class CanchaService {

    static createCancha(canchas,complejoUID){
      FirebaseBasicService.newWithKey(Entities.CANCHASBYCOMPLEJO,complejoUID,canchas);
    }

    static updateCancha(canchas,cancha,complejoUID){
      updatedCanchas = [];
      canchas.map((val)=>{
        var canchaNueva = val;
        if(val.uid === cancha.uid){
          canchaNueva = cancha;
        }
        updatedCanchas.push(canchaNueva)
      })
      FirebaseBasicService.newWithKey(Entities.CANCHASBYCOMPLEJO,complejoUID,updatedCanchas);
    }

    static replace(canchas,complejoUID){
      FirebaseBasicService.newWithKey(Entities.CANCHASBYCOMPLEJO,complejoUID,canchas);
    }

    static delete(canchas,cancha,complejoUID){
      updatedCanchas = [];
      canchas.map((val)=>{
        var canchaNueva = val;
        if(val.uid !== cancha.uid){
            updatedCanchas.push(canchaNueva)
        }
      })
      FirebaseBasicService.newWithKey(Entities.CANCHASBYCOMPLEJO,complejoUID,updatedCanchas);
    }


}


module.exports = CanchaService
