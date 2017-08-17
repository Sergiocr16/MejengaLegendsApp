var Sound = require('react-native-sound');
Sound.setCategory('Playback');
var songsQuantity = 5;
var backgroundMusic;
var songs = [];
var ambienteEstadio;


// CLIKCS
var initClick = new Sound("https://raw.githubusercontent.com/Sergiocr16/MejengaLegendsApp/addingSound/sound/clicks/initSound.mp3",Sound.MAIN_BUNDLE, (error) => {
  console.log(error)
})

var notification = new Sound("https://raw.githubusercontent.com/Sergiocr16/MejengaLegendsApp/addingSound/sound/clicks/notifications.mp3",Sound.MAIN_BUNDLE, (error) => {
})
var switchBtn = new Sound("https://raw.githubusercontent.com/Sergiocr16/MejengaLegendsApp/addingSound/sound/clicks/switch.mp3",Sound.MAIN_BUNDLE, (error) => {
})

var pushBtn = new Sound("https://raw.githubusercontent.com/Sergiocr16/MejengaLegendsApp/addingSound/sound/clicks/push.mp3",Sound.MAIN_BUNDLE, (error) => {
})
var backBtn = new Sound("https://raw.githubusercontent.com/Sergiocr16/MejengaLegendsApp/addingSound/sound/clicks/push.mp3",Sound.MAIN_BUNDLE, (error) => {
})
// CLIKCS

class SoundManager {

  static loadSounds = () => {
    songs.push(new Sound("https://raw.githubusercontent.com/Sergiocr16/MejengaLegendsApp/addingSound/sound/music/whereareunow.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    songs.push(new Sound("https://raw.githubusercontent.com/Sergiocr16/MejengaLegendsApp/addingSound/sound/music/thunder.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    songs.push(new Sound("https://raw.githubusercontent.com/Sergiocr16/MejengaLegendsApp/addingSound/sound/music/unforgettable.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    songs.push(new Sound("https://raw.githubusercontent.com/Sergiocr16/MejengaLegendsApp/addingSound/sound/music/keeptogether.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    songs.push(new Sound("https://raw.githubusercontent.com/Sergiocr16/MejengaLegendsApp/addingSound/sound/music/nothingholdingmeback.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    ambienteEstadio = new Sound("https://raw.githubusercontent.com/Sergiocr16/MejengaLegendsApp/addingSound/sound/music/sonidoambiente.mp3",Sound.MAIN_BUNDLE, (error) => {
    })
  }

    static startBackgroundMusic(){
      if(songs.length>0){
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
            console.log("error")
          }
        })
        songs[position].setVolume(0.3);
      }
      playSong(Math.round(Math.random() * (songsQuantity - 0) + 0));
    }
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
            console.log("error")
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

        ambienteEstadio.play((success)=>{
          if(success){

          setTimeout(()=>{
            playAmbiente()
          },15000)
        }else{
            console.log("AAA")
        }
        })

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
    static playBackBtn(){
     backBtn.play();
    }
}

module.exports = SoundManager
