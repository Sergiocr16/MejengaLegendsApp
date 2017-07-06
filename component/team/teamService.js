import * as firebase from 'firebase'
import FirebaseBasicService from '../../lib/firebaseBasicService'
import Entities from '../../lib/fireBaseEntities'
class TeamService {

    static getAll(callBack){
      FirebaseBasicService.getAll(Entities.TEAMS,function(result){
          callBack(result);
      })
    }

    static new(objeto){
      FirebaseBasicService.new(Entities.TEAMS,objeto)
    }

}


module.exports = TeamService
