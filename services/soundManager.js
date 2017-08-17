var Sound = require('react-native-sound');
Sound.setCategory('Playback');
var songsQuantity = 5;
var backgroundMusic;
var songs = [];
songs.push(new Sound(require("../android/app/src/main/res/sound/music/whereareunow.mp3"),Sound.MAIN_BUNDLE, (error) => {
}))
songs.push(new Sound(require("../android/app/src/main/res/sound/music/thunder.mp3"),Sound.MAIN_BUNDLE, (error) => {
}))
songs.push(new Sound(require("../android/app/src/main/res/sound/music/unforgettable.mp3"),Sound.MAIN_BUNDLE, (error) => {
}))
songs.push(new Sound(require("../android/app/src/main/res/sound/music/keeptogether.mp3"),Sound.MAIN_BUNDLE, (error) => {
}))
songs.push(new Sound(require("../android/app/src/main/res/sound/music/nothingholdingmeback.mp3"),Sound.MAIN_BUNDLE, (error) => {
}))


// CLIKCS
var initClick = new Sound(require("../android/app/src/main/res/sound/clicks/initSound.mp3"),Sound.MAIN_BUNDLE, (error) => {
})
var ambienteEstadio = new Sound("https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3",Sound.MAIN_BUNDLE, (error) => {
})
var notification = new Sound(require("../android/app/src/main/res/sound/clicks/notifications.mp3"),Sound.MAIN_BUNDLE, (error) => {
})
var switchBtn = new Sound(require("../android/app/src/main/res/sound/clicks/switch.mp3"),Sound.MAIN_BUNDLE, (error) => {
})

var pushBtn = new Sound(require("../android/app/src/main/res/sound/clicks/push.mp3"),Sound.MAIN_BUNDLE, (error) => {
})
// CLIKCS

class SoundManager {
    static startBackgroundMusic(){
      playSong = (position) => {
      backgroundMusic = songs[position];
      var newPosition  = Math.round(Math.random() * (songsQuantity - 0) + 0)
     if(newPosition === position){
       newPosition = Math.round(Math.random() * (songsQuantity - 0) + 0)
     }
      songs[position].play((success)=>{
          if(success){
            playSong(newPosition)
          }else{
            console.log("AA")
          }
        })
        songs[position].setVolume(0.3);
      }
      playSong(Math.round(Math.random() * (songsQuantity - 0) + 0));
  }

    static playBackgroundMusic(){
      playSong = (position) => {
      backgroundMusic = songs[position];
      var newPosition  = Math.round(Math.random() * (songsQuantity - 0) + 0)
     if(newPosition === position){
       newPosition = Math.round(Math.random() * (songsQuantity - 0) + 0)
     }
      songs[position].play((success)=>{
          if(success){
            playSong(newPosition)
          }else{
            console.log("AA")
          }
        })
        songs[position].setVolume(0.3);
      }
      backgroundMusic.play((success) => {
        if (success) {
          playSong(Math.round(Math.random() * (songsQuantity - 0) + 0))
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }

    static pauseBackgroundMusic(){
      console.log("PAUSING")
      backgroundMusic.pause();
    }
    static releaseBackgroundMusic(){
       backgroundMusic.release();
    }
    static playInitClickSound(){
      initClick.play((succes)=>{

      })
    }
    static playAmbienteEstadio(){
      playAmbiente= ()=>{
        ambienteEstadio.play((success)=>{
          if(success){
          setTimeout(()=>{
            playAmbiente()
          },15000)
        }
        })
       ambienteEstadio.setVolume(0.3);
      }
playAmbiente();
      // ambienteEstadio.setNumberOfLoops(-1);
    }
    static stopAmbienteEstadio(){
      ambienteEstadio.stop()
    }

    static playNotificationsSound(){
     notification.play();
    }

    static playSwitchClick(){
     switchBtn.play();
    }
    static playPushBtn(){
     pushBtn.play();
    }
}

module.exports = SoundManager
