import FirebaseBasicService from '../lib/firebaseBasicService'
import * as firebase from 'firebase'

class Notification {
  static getMyNotifications(callBack,error){
    FirebaseBasicService.findActiveById(Entities.PLAYERNOTIFICATIONS,firebase.auth().currentUser.uid,callBack,error)
  }
  static getNotificationsByPlayer(uid,callBack,error){
    FirebaseBasicService.findActiveById(Entities.PLAYERNOTIFICATIONS,uid,callBack,error)
  }
  static deleteNotification(position,callBack,error){
    FirebaseBasicService.deleteForever(Entities.PLAYERNOTIFICATIONS+"/active/"+firebase.auth().currentUser.uid+"/",position)
  }

}

module.exports = Notification
