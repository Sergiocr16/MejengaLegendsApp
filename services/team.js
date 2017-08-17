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
    static getTeam(teamUID,callBack,error){
    FirebaseBasicService.findActiveById(Entities.TEAMS,teamUID,callBack,error)
    }
    static getTeamsByPlayer(callBack,error){
      FirebaseBasicService.findActiveById(Entities.TEAMSBYPLAYER,firebase.auth().currentUser.uid,callBack,error)
    }
    static getMyNotifications(callBack,error){
      FirebaseBasicService.findActiveById(Entities.PLAYERNOTIFICATIONS,firebase.auth().currentUser.uid,callBack,error)
    }
    static getNotificationsByPlayer(uid,callBack,error){
      FirebaseBasicService.findActiveById(Entities.PLAYERNOTIFICATIONS,uid,callBack,error)
    }
    static addPlayersToTeam(uid,notifications){
       FirebaseBasicService.newWithKey(Entities.PLAYERNOTIFICATIONS,uid,notifications);
    }
    // static sendRequestToPlayers(jugadores){
    //   jugadores.map((val, key) => {
    //     console.log('entre equi');
    //
    //       FirebaseBasicService.findActiveById(Entities.PLAYERNOTIFICATIONS,'PcLNztdnI7eERNrQxVXuAl8hjt22',(notifications)=>{
    //           var temporalNotification = [{message: "El equipo Mi familia FC quiere que seas parte de ellos!"}];
    //           var notificationsTemporal = [];
    //           notificationsTemporal = notifications;
    //             console.log('/////////////////////////////////gola 2//////');
    //             console.log(notificationsTemporal);
    //             notificationsTemporal.push(temporalNotification);
    //             this.insertPlayerByTeam(temporalNotification);
    //           // FirebaseBasicService.newWithKey(Entities.PLAYERNOTIFICATIONS,'PcLNztdnI7eERNrQxVXuAl8hjt22',notificationsTemporal);
    //
    //       },()=>{
    //         var temporalNotification = [{message: "El prmer mejs"}];
    //         FirebaseBasicService.newWithKey(Entities.PLAYERNOTIFICATIONS,'PcLNztdnI7eERNrQxVXuAl8hjt22',temporalNotification);
    //       })
    //   })
    //
    // }
    static insertPlayerByTeam(notifications){
      FirebaseBasicService.newWithKey(Entities.PLAYERNOTIFICATIONS,'PcLNztdnI7eERNrQxVXuAl8hjt22',notifications);
    }
    static newPlayerByTeams(objeto){
      FirebaseBasicService.newWithKey(Entities.PLAYERSBYTEAM,firebase.auth().currentUser.uid,objeto);
    }
}


module.exports = TeamService
