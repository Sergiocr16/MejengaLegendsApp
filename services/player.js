import FirebaseBasicService from '../lib/firebaseBasicService'

class Player {
    static new(key){
      player = {firstTime: true, rol: "player" }
      FirebaseBasicService.newWithKey('users/players/',key, player)
    }
}

module.exports = Player
