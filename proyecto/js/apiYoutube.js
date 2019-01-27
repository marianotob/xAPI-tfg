var player;
var timer; // Timer interval 
var tiempo;
var idVideo= 'reRK_O1Vyp8';
var velocidad;
var tiempo_visto;
var mute;
var volumen;
var URL;
var calidad;
var peso;
var duracion;



// 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


  params = { allowScriptAccess: 'always' };
  atts = { allowScriptAccess: 'always' };
  swfobject.embedSWF("https://www.youtube.com/v/" +'reRK_O1Vyp8' + "?enablejsapi=1&playerapiid=ytplayer&version=3",
  "ytapiplayer",
  "800", "500", //initial width and height of player
  "8.0.0",null, null, params, atts);

  // 3. This function creates an <iframe> (and YouTube player) after the API code downloads.


  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '360',
      width: '640',
      videoId: 'reRK_O1Vyp8',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
        'onError': onPlayerError
      }
    });        
  }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // 6. The API will call this function when the video player is onPlaybackQualityChange.
    function onPlayerPlaybackQualityChange(event) {
        console.log('cambio configuración');
        }

    // 7. The API will call this function when the video player is onError.
    function onPlayerError(event) {
    console.log('ERROR');
    }

  // 5. The API calls this function when the player's state changes.

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        console.log('playing');
        videoStarted();
          //define the xapi statement being sent  
  var statement = {  
    "actor": {  
        "mbox": "ngavchxhrgkmvhk8cu902a",  
        "name": "User",  
        "objectType": "Agent"  
    },  
    "verb": {  
        "id": "http://example.com/xapi/interacted",  
        "display": {"en-US": "interacted"}  
    },  
    "object": {  
        "id": "http://example.com/button_example",  
        "definition": {  
            "name": {"en-US": "Button example"},  
            "description": {"en-US": "Example xAPI Button"}  
        },  
        "objectType": "Activity"  
    }  
}; //end statement definition  
console.log(statement);
        timer = setInterval(getProgress,1000);
    }
    if (event.data == YT.PlayerState.PAUSED) {
        clearInterval(timer);
      console.log('paused');
    }
    if (event.data == YT.PlayerState.ENDED) {
        clearInterval(timer);
        console.log('ended');
        getData();
        ModificarVisualizado(tiempo_visto);
        //guardarVisualizado(idVideo,velocidad,tiempo_visto);
        //videoEnded();
    }
    if (event.data == YT.PlayerState.CUED) {
      console.log('cued');
    }
    if (event.data == YT.PlayerState.BUFFERING) {
      console.log('buffering ');
    } 
    if (event.data == YT.PlayerState.UNSTARTED) {
      console.log('unstarted');
    }
    lastPlayerTime = player.getCurrentTime();
    lastPlayerState = event.data;
  } 

/*video statements*/


function videoStarted(){
  //tinCan.sendstatement ('played',false,false);
  var tincan = new TinCan ({
    recordStores: [
        {
            endpoint: "https://cloud.scorm.com/tc/public/",
            username: "<Test User>",
            password: "<Test User's Password>",
            allowFail: false
        }]});
  tincan.sendStatement({
    actor: {
        mbox: "mailto:info@tincanapi.com"
    },
    verb: {
        id: "http://adlnet.gov/expapi/verbs/attempted"
    },
    target: {
        id: "http://rusticisoftware.github.com/TinCanJS"
    }});
    console.log('Mariano');
    console.log(tincan);
}
function videoPaused(){
sendstatement ('paused',false,false);
}
function videoEnded(){
sendstatement ('terminated',false,false);
}
/*     function videoWatched(start, finish) {//start and finish in seconds
  sendstatement ('watched',seconds2time(parseInt(start)),seconds2time(parseInt(finish)));
} */
function videoSkipped(start, finish) {//start and finish in seconds
sendstatement ('skipped',seconds2time(start),seconds2time(finish));
}  







function send_statement(){  
  var conf = {  
       "endpoint" : "https://lrs.adlnet.gov/xapi/",  
       "auth" : "Basic " + toBase64("xapi-tools:xapi-tools")  
       };  

  ADL.XAPIWrapper.changeConfig(conf);  
     
  //define the xapi statement being sent  
  var statement = {  
      "actor": {  
          "mbox": "mailto:Tester@example.com",  
          "name": "Your Name Here",  
          "objectType": "Agent"  
      },  
      "verb": {  
          "id": "http://example.com/xapi/interacted",  
          "display": {"en-US": "interacted"}  
      },  
      "object": {  
          "id": "http://example.com/button_example",  
          "definition": {  
              "name": {"en-US": "Button example"},  
              "description": {"en-US": "Example xAPI Button"}  
          },  
          "objectType": "Activity"  
      }  
  }; //end statement definition  

  // Dispatch the statement to the LRS  
  var result = ADL.XAPIWrapper.sendStatement(statement);  
  }  





  //algoritmos

  //porcentaje de visionado de vídeo de YouTube
  function getProgress(){
    progress = Math.round(player.getCurrentTime() / player.getDuration() * 100);
    getTimestamp ();
    console.log(progress);
    }


function getData(){
    velocidad=player.getPlaybackRate();
    tiempo_visto=player.getCurrentTime();
    mute=player.isMuted();
    volumen=player.getVolume();
    URL=player.getVideoUrl();
    calidad=player.getPlaybackQuality();
    peso=player.getVideoLoadedFraction();
    duration = player.getDuration();
}



function getTimestamp () {
    var hours, minutes, seconds, milliseconds,
      timestamp = new Date(Date.now());

    hours = (timestamp.getHours() > 9 ? timestamp.getHours() : '0' + timestamp.getHours());
    minutes = (timestamp.getMinutes() > 9 ? timestamp.getMinutes() : '0' + timestamp.getMinutes());
    seconds = (timestamp.getSeconds() > 9 ? timestamp.getSeconds() : '0' + timestamp.getSeconds());
    milliseconds = (
      timestamp.getMilliseconds().toString().length > 1 ?
        (
          timestamp.getMilliseconds().toString().length > 2 ?
            timestamp.getMilliseconds() :
            '0' + timestamp.getMilliseconds()
        ) :
        '00' + timestamp.getMilliseconds()
    );
        console.log(hours + ':' + minutes + ':' + seconds + ':' + milliseconds);
    return hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}
