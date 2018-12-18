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

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
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
    player.addEventListener("onStateChange","onPlayerStateChange");
  }

  // 5. The API calls this function when the player's state changes.

  var tiempo;
  var idVideo= 'reRK_O1Vyp8';
  var velocidad;
  var tiempo_visto;

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      console.log('playing');
      velocidad=player.getPlaybackRate();
      tiempo_visto=player.getCurrentTime();
      sonido=player.isMuted();
      volumen=player.getVolume();
      URL=player.getVideoUrl();
      calidad=player.getPlaybackQuality();
      peso=player.getVideoLoadedFraction();
      //videoStarted();
    }
    if (event.data == YT.PlayerState.PAUSED) {
      //if (lastPlayerState == YT.PlayerState.PLAYING) {
        //videoWatched(lastPlayerTime, player.getCurrentTime());
      //} 
/*         else if (lastPlayerState == YT.PlayerState.PAUSED) {
        console.log('HOLA SEXY');
        videoSkipped(lastPlayerTime, player.getCurrentTime());
      } */
      console.log('paused');
      //videoPaused();
    }
    if (event.data == YT.PlayerState.ENDED) {
      console.log('ended');
      duracion=player.getDuration();
      console.log('velocidad:'+ velocidad);
      console.log('duracion:'+ duracion);
      console.log('sonido:'+ sonido);
      console.log('volumen:'+ volumen);
      console.log('calidad:'+ calidad);
      guardarVisualizado(idVideo,velocidad,tiempo_visto);
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


  // 6. The API will call this function when the video player is onPlaybackQualityChange.
  function onPlayerPlaybackQualityChange(event) {
    console.log('cambio configuración');
  }

  // 7. The API will call this function when the video player is onError.
  function onPlayerError(event) {
    console.log('ERROR');
  }



/*   var statement = new TinCan.Statement({
      actor: {
          mbox: "mailto:info@tincanapi.com"
      },
      verb: {
          id: "http://adlnet.gov/expapi/verbs/experienced"
      },
      target: {
          id: "http://rusticisoftware.github.com/TinCanJS"
      }
  }); */

/* function videoWatched(start, finish) {//start and finish in seconds
  window.tincan.sendStatement({
      actor: Cards.getActor(),
      verb: {
          id: "http://activitystrea.ms/schema/1.0/watch",
          display: {'en-US': 'watched'}
      },
      target: {
          id: 'http://www.youtube.com/watch?v=' + 'reRK_O1Vyp8',
          definition: {
              name: { "en-US": videoTitle + " from " + timeString(start) + " to " + timeString(finish) },
              extensions: {
                  "http://demo.watershedlrs.com/tincan/extensions/start_point": timeString(start),
                  "http://demo.watershedlrs.com/tincan/extensions/end_point": timeString(finish)
              }
          }
      }          
  });
} */

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