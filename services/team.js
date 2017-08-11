import * as firebase from 'firebase'
import FirebaseBasicService from '../lib/firebaseBasicService'
import Entities from '../lib/fireBaseEntities'
class TeamService {

    static getAll(callBack){
      FirebaseBasicService.getAll(Entities.TEAMS,function(result){
          callBack(result);
      })
    }
    static newWithCallback(objeto,callback){
      FirebaseBasicService.newWithCallback(Entities.TEAMS,objeto,callback);
    }

    static new(objeto){
      FirebaseBasicService.new(Entities.TEAMS,objeto);
    }

    static newTeamsByPlayer(objeto){
      FirebaseBasicService.newWithKey(Entities.TEAMSBYPLAYER,firebase.auth().currentUser.uid,objeto);
    }
    static findTopTeams(callback,error){
      FirebaseBasicService.orderByAttribute('teams/active/','copas',callback,error)
    }
    static getTeamsByPlayer(callBack,error){
      FirebaseBasicService.findActiveById(Entities.TEAMSBYPLAYER,firebase.auth().currentUser.uid,callBack,error)
    }
    static newPlayerByTeams(objeto){
      FirebaseBasicService.newWithKey(Entities.PLAYERSBYTEAM,firebase.auth().currentUser.uid,objeto);
    }
}


module.exports = TeamService
