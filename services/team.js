import * as firebase from 'firebase'
import FirebaseBasicService from '../lib/firebaseBasicService'
import Player from '../services/player'
import Entities from '../lib/fireBaseEntities'
class TeamService {
  static findTeamsByTeamName(filterData,callback,error){
    FirebaseBasicService.filterByAttribute('teams/active/','nameToQuery',filterData.toLowerCase(),callback,error)
  }
    static getAll(callBack){
      FirebaseBasicService.getAll(Entities.TEAMS,function(result){
          callBack(result);
      })
    }
    static newWithCallback(objeto,callback){
      FirebaseBasicService.newWithCallback(Entities.TEAMS,objeto,callback);
    }

    static update(userKey,key,teams,team){
      FirebaseBasicService.update(Entities.TEAMS,key, team);
      var i = 0;
     teams.map((val)=>{
      if(val.uid===team.uid){
          FirebaseBasicService.updateWithoutActive(Entities.TEAMSBYPLAYER+"/active/"+userKey+"/",i, team)
      }
      i++;
    })
    }

    static new(objeto){
      FirebaseBasicService.newWithKey(Entities.TEAMS,objeto);
    }
    static newWithKey(objeto,key){
      FirebaseBasicService.newWithKey(Entities.TEAMS,objeto,key);
    }
    static newTeamsByPlayer(objeto){
      FirebaseBasicService.newWithKey(Entities.TEAMSBYPLAYER,firebase.auth().currentUser.uid,objeto);
    }

    static newTeamsByPlayer(objeto,uid){
      FirebaseBasicService.newWithKey(Entities.TEAMSBYPLAYER,uid,objeto);
    }
    static newPlayersByTeam(equipoGUID,objeto){
      FirebaseBasicService.newWithKey(Entities.PLAYERSBYTEAM,equipoGUID,objeto);
    }
    static findTopTeams(callback,error){
      FirebaseBasicService.orderByAttribute('teams/active/','copas',callback,error)
    }
    static getTeam(teamUID,callBack,error){
    FirebaseBasicService.findActiveById(Entities.TEAMS,teamUID,callBack,error)
    }
    static getTeamsByPlayer(callBack,error){
      FirebaseBasicService.findActiveByIdOnce(Entities.TEAMSBYPLAYER,firebase.auth().currentUser.uid,callBack,error)
    }
    static getTeamsByEspecificPlayer(jugadorGUID,callBack,error){
      FirebaseBasicService.findActiveByIdOnce(Entities.TEAMSBYPLAYER,jugadorGUID,callBack,error)
    }
    static getPlayersByTeam(equipoGUID,callBack,error){
      FirebaseBasicService.findActiveByIdOnce(Entities.PLAYERSBYTEAM,equipoGUID,callBack,error)
    }
    static getMyNotifications(callBack,error){
      FirebaseBasicService.findActiveById(Entities.PLAYERNOTIFICATIONS,firebase.auth().currentUser.uid,callBack,error)
    }
    static getNotificationsByPlayer(uid,callBack,error){
      FirebaseBasicService.findActiveById(Entities.PLAYERNOTIFICATIONS,uid,callBack,error)
    }
    static sendNotificationToPlayers(uid,notifications){
       FirebaseBasicService.newWithKey(Entities.PLAYERNOTIFICATIONS,uid,notifications);
    }
    static newPlayerByTeams(objeto){
      FirebaseBasicService.newWithKey(Entities.PLAYERSBYTEAM,firebase.auth().currentUser.uid,objeto);
    }
}


module.exports = TeamService
