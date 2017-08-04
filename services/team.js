import * as firebase from 'firebase'
import FirebaseBasicService from '../lib/firebaseBasicService'
import Entities from '../lib/fireBaseEntities'
class TeamService {

    static getAll(callBack){
      FirebaseBasicService.getAll(Entities.TEAMS,function(result){
          callBack(result);
      })
    }

    static new(objeto){
      FirebaseBasicService.new(Entities.TEAMS,objeto);
    }
    static getTeamsByPlayer(callBack){
      FirebaseBasicService.findActiveById("playersByTeam",'KSRKw0p4P7Vnip26wwAtmF4bRrg2',callBack)
    }
    static newPlayerByTeams(objeto){
      FirebaseBasicService.newWithKey(Entities.PLAYERSBYTEAM,'KSRKw0p4P7Vnip26wwAtmF4bRrg2',objeto);
    }
}


module.exports = TeamService
