import FirebaseBasicService from '../lib/firebaseBasicService'
import * as firebase from 'firebase'

class Notification {
  static getMyNotifications(callBack,error){
    FirebaseBasicService.findActiveById(Entities.PLAYERNOTIFICATIONS,firebase.auth().currentUser.uid,callBack,error)
  }
  static getNotificationsByPlayer(uid,callBack,error){
    FirebaseBasicService.findActiveByIdOnce(Entities.PLAYERNOTIFICATIONS,uid,callBack,error)
  }
  static deleteNotification(notifications){
    firebase.database().ref(Entities.PLAYERNOTIFICATIONS+'/active/'+firebase.auth().currentUser.uid+'/').set(notifications)
  }
}

module.exports = Notification
