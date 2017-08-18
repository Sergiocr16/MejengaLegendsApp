var Sound = require('react-native-sound');
Sound.setCategory('Playback');
var songsQuantity = 10;
var backgroundMusic;
var songs = [];
var ambienteEstadio;


// CLIKCS
var initClick;

var notification;
var switchBtn;
var pushBtn;
var backBtn;
var startedBackground = false;
// CLIKCS

class SoundManager {

  static loadSounds = () => {
    songs.push(new Sound("whereareunow.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    songs.push(new Sound("thunder.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    songs.push(new Sound("unforgettable.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    songs.push(new Sound("keeptogether.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    songs.push(new Sound("nothingholdingmeback.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    songs.push(new Sound("morethanuknow.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    songs.push(new Sound("onmymind.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    songs.push(new Sound("ride.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    songs.push(new Sound("kmagic.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    songs.push(new Sound("dontwannaknow.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    songs.push(new Sound("shapeofu.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    songs.push(new Sound("coldwater.mp3",Sound.MAIN_BUNDLE, (error) => {
    }))
    ambienteEstadio = new Sound("sonidoambiente.mp3",Sound.MAIN_BUNDLE, (error) => {
    })

    // CLICKS
    switchBtn = new Sound("switchsound.wav",Sound.MAIN_BUNDLE, (error) => {
    })
    pushBtn = new Sound("push.wav",Sound.MAIN_BUNDLE, (error) => {
    })
    backBtn = new Sound("back.wav",Sound.MAIN_BUNDLE, (error) => {
   })
   initClick = new Sound("initsound.mp3",Sound.MAIN_BUNDLE, (error) => {
     console.log(error)
   })
   notification = new Sound("notifications.mp3",Sound.MAIN_BUNDLE, (error) => {
   })
  }

    static startBackgroundMusic(){
      startedBackground = true;
      if(songs.length>0){
      playSong = (position) => {
      backgroundMusic = songs[position];
      var newPosition  = Math.round(Math.random() * ((songsQuantity-1) - 0) + 0)
     if(newPosition === position){
       newPosition = Math.round(Math.random() * ((songsQuantity-1) - 0) + 0)
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
      playSong(Math.round(Math.random() * ((songsQuantity-1) - 0) + 0));
    }
  }

    static playBackgroundMusic(){
      playSong = (position) => {
      backgroundMusic = songs[position];
      var newPosition  = Math.round(Math.random() * ((songsQuantity-1) - 0) + 0)
     if(newPosition === position){
       newPosition = Math.round(Math.random() * ((songsQuantity-1) - 0) + 0)
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
          playSong(Math.round(Math.random() * ((songsQuantity-1) - 0) + 0))
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
      playAmbiente = ()=>{
        ambienteEstadio.play((success)=>{
          if(success){
          setTimeout(()=>{
            if(!startedBackground){
            playAmbiente();
            }
          },15000)
        }else{
            console.log("AAA")
        }
        })
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
      switchBtn.stop(() => {
  // Note: If you want to play a sound after stopping and rewinding it,
  // it is important to call play() in a callback.
  switchBtn.play();
});

    }
    static playPushBtn(){
      pushBtn.stop(() => {
  // Note: If you want to play a sound after stopping and rewinding it,
  // it is important to call play() in a callback.
  pushBtn.play();
});
    }
    static playBackBtn(){
      backBtn.stop(() => {
  // Note: If you want to play a sound after stopping and rewinding it,
  // it is important to call play() in a callback.
  backBtn.play();
});
    }
}

module.exports = SoundManager
