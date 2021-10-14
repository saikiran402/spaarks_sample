// 40 Sec after answer

import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet,Image,TouchableOpacity,ScrollView,ImageBackground,Alert,Platform,Linking } from 'react-native';
import { TabRouter } from 'react-navigation';
import moment from 'moment'
import { Rating, AirbnbRating, Divider } from "react-native-elements";
import Snackbar from 'react-native-snackbar';
import Dialog from "react-native-dialog";
import JsSIP, { C } from 'jssip'
import uuid from 'react-native-uuid';
import { connect, useDispatch, useReducer } from "react-redux";
import RNCallKeep from 'react-native-callkeep';
import VoipPushNotification from 'react-native-voip-push-notification';
import IncomingCallScreen from './IncomingCallScreen'
import { useNavigation } from '@react-navigation/native';
import {showIncoming} from './AllFeaturesScreen';
import InCallManager from 'react-native-incall-manager';
import axios from "axios";
var Sound = require('react-native-sound');
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from "@react-native-community/async-storage";
const GLOBAL = require('../Globals');
import I18n from '../src/i18n';
global.navigationsss = null
global.name = null
global.profilePic = null
global.isInCall = false;
global.incomingCall = "null";
global.callStatus = "outgoing";
global.session = null;
global.visible = false;
global.ua = null;
const isIOS = Platform.OS === 'ios';


async function setIncoming(){
  global.isInCall = true
}
var state =
    {
      status: 'disconnected',
      session: null,
      incomingSession: null,
      number: '',
      username: '',
      password: '',
      callState: 'none'
    };

    // JsSIP.UA instance
    var currentCallId = '11edc52b-2918-4d71-9058-f7285e29d894';
    var RNCallKeepData = {}
    var session = {}
    var callAnswered = ''
    var callStatus = 'Incoming'
    var whoosh = new Sound('sounds.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        // console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
     
      // Play the sound with an onEnd callback
    
    });

    // Reduce the volume by half
whoosh.setVolume(0.5);

// Position the sound to the full right in a stereo field
whoosh.setPan(1);

// Loop indefinitely until stop() is called
// whoosh.setNumberOfLoops(-1);
    async function playSound(){
      whoosh.setPan(1);
      whoosh.play((success) => {
        if (success) {
          // console.log('successfully finished playing');
        } else {
          // console.log('playback failed due to audio decoding errors');
        }
      });
    }
    async function stopSound(){
    // Stop the sound and rewind to the beginning
    whoosh.stop(() => {
      // Note: If you want to play a sound after stopping and rewinding it,
      // it is important to call play() in a callback.
      // whoosh.play();
    });
    }
async function callKeepSetup (navigation) {
  global.navigationsss = navigation;
  const options = {
    ios: {
      appName: 'Spaarks',
      imageName: 'sim_icon',
      supportsVideo: false,
      includesCallsInRecents:false,
      maximumCallGroups: '1',
      maximumCallsPerCallGroup: '1',
      ringtoneSound: './sound.mp3'

    },
    android: {
      alertTitle: 'Permissions Required',
      alertDescription:
        'This application needs to access your phone calling accounts to make calls',
      cancelButton: 'Cancel',
      okButton: 'ok',
      imageName: 'sim_icon'
    },
  };

  

  try {
    RNCallKeep.setup(options).then(() => {
      console.log('callkeep registered');
    });

    if (Platform.OS === 'android') {
      RNCallKeep.setAvailable(true);
    }

    RNCallKeep.addEventListener('answerCall', onAnswerCallAction);

    RNCallKeep.addEventListener('endCall', onEndCallAction);

    RNCallKeep.addEventListener('didLoadWithEvents', didLoadWithEvents);

    RNCallKeep.addEventListener('didActivateAudioSession', audioSessionActivated);


  } catch (err) {
    console.error('initializeCallKeep error:', err.message);
  }
};

var count = 0;
var madeByMe = false;
    
async function  onAnswerCallAction (data) {
  try{ 
    let { callUUID } = data;
  callAnswered = 'answered'
  setTimeout(() => {
    handleAnswerIncoming()
  
  }, 1000)

  }catch(err){

  }
 
};

async function audioSessionActivated(){
  // alert('Transfer Started')
  global.isInCall = true
}

async function onEndCallAction(data){
  console.log(data)
  
  // try{
//     // alert('About to call')
//     let { callUUID } = data;
//     // alert('Call ended in onEndCallAction')
//     console.log('DATATATATTATATTAT',data)
//     // console.log('onEndCallAction')
//     // global.navigationsss.goBack()
//   // hangupCall();
//   RNCallKeep.endAllCalls()
  if( global.navigationsss){
    global.navigationsss.goBack()
    // global.navigationsss.navigate('CallLogsScreen')
  
  }else{
    global.navigationsss.goBack()
    // global.navigationsss.navigate('CallLogsScreen')
    // navigation.navigate('CallLogsScreen')
  }

  if(global.session){

      
    global.session.terminate(
      {
        'status_code'   : 486,
        'reason_phrase' : 'Busy Here'
      });

      
  }else{

   
    if(session){
      session.terminate(
        {
          'status_code'   : 486,
          'reason_phrase' : 'Busy Here'
        });
    }else{
      // alert('No session')
    }
      
  }
  


// if(callStatus == 'Outgoing'){

//   // hangupCall()
//   if(global.visible){
//     showDialog(true)
//     // global.visible = false;
//   }else{
//     RNCallKeep.endAllCalls()
//     if( global.navigationsss){
//       global.navigationsss.goBack()
//       global.navigationsss.navigate('CallLogsScreen')
    
//     }else{
//       navigation.goBack()
//       navigation.navigate('CallLogsScreen')
//     }
//   }
//   return;

// }else{
//   hangupCallIncomingCall(global.session)
// }
//   currentCallId = null;
//   }catch(err){

//   }

};

async function didPerformSetMutedCallAction(data){
  let { callUUID } = data;
  muteCall();
}
async function didLoadWithEvents (events) {
  try{
    console.log('didLoadWithEvents:', events)
    if (!events || !Array.isArray(events) || events.length < 1) {
      return;
    }
  
    for (let voipPushEvent of events) {
      let { name, data } = voipPushEvent;
      let { callUUID } = data;
  
      if (name === 'RNCallKeepPerformAnswerCallAction') {
        alert('in here')
        // RNCallKeep.rejectCall(callUUID);
        onAnswerCallAction(data)
      }
    }
  }catch(err){
console.log(err)
  }

}


async function handleCOnnectOnReceive(){
  console.log('yhtgrfedwsqazxcvbnmloikjuhytg',global.ua)
  global.ua.register()
  // global.ua.unregister()
  global.ua.register()
  global.ua.register()
  // global.ua.register()
}
async function handleConnect (u, p) {
  // if(global.ua!=null){
  //   global.ua.disconnect()
  // }
  if(global.ua){
    global.ua.unregister()
  }
  var callpassword = await AsyncStorage.getItem('callpassword');
  var callid = await AsyncStorage.getItem('aid');
// if( global.ua == null){
  try {
    const socket = new JsSIP.WebSocketInterface('wss://voip.spaarksweb.com:4443');

    _ua = new JsSIP.UA(
      // {
      //  uri                   : 'sip:800855126s@103.27.86.24:3005',
      //  password              : 'qMvo0LTwXC',
      //  'display_name'        : 'Saikiran',
      //  sockets               : [ socket ],
      //  'registrar_server'    : '103.27.86.24:3005',
      //  // 'contact_uri'         : 'sip:800855126s@103.27.86.24',
      //  // 'contact_uri':null,
      //  'authorization_user'  : '800855126s',
      //  'instance_id'         : null,
      //  'session_timers'      : false,
      //  'use_preloaded_route' : true
      // }
      {
        uri: `sip:${callid}@voip.spaarksweb.com:4443`,
        password: callpassword,
        sockets: [socket],
        'registrar_server': 'voip.spaarksweb.com:4443',
        // 'contact_uri'         : 'sip:5002@103.27.86.24',
        // 'contact_uri':null,
        register:true,
        'authorization_user': u,
        'instance_id': null,
        'session_timers': false,
        'use_preloaded_route': false,
        with_react_native: true
      }
    );

    _ua.on('connecting', () => {
      console.log('connecting in ua');
    });

    _ua.on('connected', () => {
      // setStatus('Ringing')
      console.log('connected');
    });

    _ua.on('disconnected', () => {
      // setStatus('Ended')
      console.log('disconnecteddddddd');
    });

    _ua.on('registered', () => {
      console.log('registered');
      // alert('registered for calls')
      // Snackbar.show({
      //   text: 'registered for calls',
      //   duration: Snackbar.LENGTH_LONG
      // });
    });

    _ua.on('unregistered', () => {
      console.log('UA "unregistered" event');

    });

    _ua.on('newRTCSession', async (data) => {
      // TODO: For testing.
      console.log('in newRTCSession',data)
      console.log(data)
//       var a = await RNCallKeep.getCalls();
//       alert(a.length)
// if(a.length>=1){
//   // alert('In if')
// if(global.isInCall == true){
//   data.session.terminate(
//     {
//       'status_code': 486,
//       'reason_phrase': 'SPCOT-In Another call Please call again later'
//     });
//   await PushNotificationIOS.addNotificationRequest({
//     id:String(Date.now()),
//     title:'Missed call',
//     subtitle:'',
//     body:global.name,
//     userInfo:{
//       apnType:'CallLogsScreen',
//       local:true,
//       aid:''
//     }
//  })
 
// }

  // data.session.terminate(
  //   {
  //     'status_code': 486,
  //     'reason_phrase': 'SPCOT-In Another call Please call again later'
  //   });
//     return;
// }else{

      if (data.originator === 'local')
        return;

        global.isInCall = true;
      let session = data.session;
      session.media = data.request.headers.Callmedia
      // session.media = 'audio'
      console.log('incomming RTC')
      // console.log('State', state)
      // console.log('Data', data)
      // console.log('sessionsssss', session)
      session = session;
      state.session = session;
      // this.setState({ session: session })
      // RNCallKeep.displayIncomingCall(
      //   '11edc52b-2918-4d71-9058-f7285e29d894',
      //   session.remote_identity._uri._user.substring(1),
      // );
      // console.log('Namesssss',session.remote_identity._uri._user)
      global.name = session.remote_identity._uri._user;
      global.session = session;
      var token  = await AsyncStorage.getItem('token');
      var a = GLOBAL.BASE_URL+"user/phone/"+session.remote_identity._uri._user;
       await axios.get(
         a,
         {
           headers: {
             "Content-Type": "application/json",
             Authorization:
             'Bearer '+token
           },
         }
       ).then((resp)=>{
        //  console.log('----------------ioioiooi')
        global.name = resp.data.name;
        global.profilePic = resp.data.profilePic;
        //  console.log(resp.data)
        global.incomingCall  = "Incoming";
        //  RNCallKeep.displayIncomingCall(
        //   "11edc52b-2918-4d71-9058-f7285e29d894",
        //   resp.data.name,
        // );


        // RNCallKeep.displayIncomingCall("11edc52b-2918-4d71-9058-f7285e29d894", 'Spaarks Call', localizedCallerName = resp.data.name, handleType = 'number', hasVideo = false, options = null);
        // RNCallKeep.startCall("11edc52b-2918-4d71-9058-f7285e29d894", "Spaarks App", "Test") //@ts-ignore RNCallKeep.setCurrentCallActive(callUUID);

        //  navigation.navigate('OutGoingCallScreen',{aid:handle,name:resp.data.name,profilePic:resp.data.profilePic})
        //  console.log('----------------ioioiooi')
       }).catch((err)=>{
         console.log('----------------error')
         console.log(err)
         console.log('----------------error')
       })
     
   
      // RNCallKeep.displayIncomingCall(uuid.v4(), 'SPK- 103934', 5000);
      // if (states || states.incomingSession) {
      //     console.log('incoming call replied with 486 "Busy Here"');
          // session.terminate(
          //   {
          //     'status_code': 486,
          //     'reason_phrase': 'Busy Here'
          //   });

      //     return;
      //   }
      state.session = session;

      // console.log('Session Available',session)
      // alert('Incoming')
      // RNCallKeep.displayIncomingCall(
      //   '11edc52b-2918-4d71-9058-f7285e29d894',
      //     session.remote_identity._uri._user.substring(1),
      //   );

      //audioPlayer.play('ringing');
      if (session) {
          // console.log('Session Available',session)
        let data = { session: session, number: session.remote_identity._uri._user.substring(1) }
        RNCallKeepData = data
        // RNCallKeep.displayIncomingCall(
        //   '11edc52b-2918-4d71-9058-f7285e29d894',
        //   session.remote_identity._uri._user.substring(1),
        // );
        // if(Platform.OS === 'ios'){
        //  if (VoipPushNotification.wakeupByPush) {
        //    console.log('this.callAnswered:::',this.callAnswered)
        //    if(this.callAnswered==='answered'){
        //      this.callAnswered = ''
        //      this.handleAnswerIncoming();
        //    }
        //    VoipPushNotification.wakeupByPush = false;
        //  }else{
        //    RNCallKeep.displayIncomingCall(
        //      '11edc52b-2918-4d71-9058-f7285e29d894',
        //      session.remote_identity._uri._user.substring(1),
        //    );
        //  }

        // }
      }


      session.on('failed', () => {
        // console.log('call failed.')

        // VoipPushNotification.wakeupByPush = false;

        if (isIOS) {
          RNCallKeepData = {}
          // RNCallKeep.rejectCall(this.currentCallId);
          RNCallKeep.endAllCalls();
        }

      //   this.setState(
      //     {
      //       session: null,
      //       incomingSession: null
      //     });


          state.session = null;
          state.incomingSession = null;
      });

      session.on('muted', (data) => {
        // console.log('session mute event', data);
        RNCallKeep.setMutedCall('11edc52b-2918-4d71-9058-f7285e29d894', true);

      })
      
      // onToggleMute = (data) => {
        
      //   let { muted, callUUID } = data;
      //   // Called when the system or user mutes a call
      // };
      session.on('unmuted', (data) => {
        // console.log('session unmuted event', data);
        RNCallKeep.setMutedCall('11edc52b-2918-4d71-9058-f7285e29d894', false);
      })

      session.on('ended', async() => {
        // alert('End- 462')
        global.isInCall = false
        RNCallKeep.endAllCalls();
        if(global.incomingCall == "Incoming"){
          // alert('if')
          await PushNotificationIOS.addNotificationRequest({
            id:String(Date.now()),
            title:'Missed call',
            subtitle:'',
            body:global.name,
            userInfo:{
              apnType:'CallLogsScreen',
              local:true,
              aid:''
            }
         })
        }else{
          // alert('else')
          global.incomingCall = "false"
          global.navigationsss.popToTop()
          // global.navigationsss.navigate("CallLogsScreen")

          if(global.session){

      
            global.session.terminate(
              {
                'status_code'   : 486,
                'reason_phrase' : 'Busy Here'
              });
        
              
          }else{
      
           
            if(session){
              session.terminate(
                {
                  'status_code'   : 486,
                  'reason_phrase' : 'Busy Here'
                });
            }else{
              // alert('No session')
            }
              
          }
        }
        console.log('call ended [dialer]')

        if (isIOS) {
          // RNCallKeep.rejectCall(this.currentCallId);
          RNCallKeep.endAllCalls();
        }
       


          //   this.setState(
          //     {
          //       session: null,
          //       incomingSession: null
          //     });

          state.session = null;
          state.incomingSession = null;

      });

      session.on('accepted', () => {
        global.incomingCall = "Accepted"
        console.log('call accepted')
        if (Platform.OS === 'android') {

          // this.setState(
          //   {
          //     session: session,
          //     incomingSession: null
          //   });

            state.session = null;
            state.incomingSession = null;
        } else {
          let data = RNCallKeepData
          data.session = session
          RNCallKeepData = data
          // this.setState({ session: session })
          state.session = session;
          // state.incomingSession = null;
          // RNCallKeep.isCallActive(this.getCurrentCallId());
        }

      });
    // }
   
    });

    // TODO: For testing.
    window.UA = _ua;
    global.ua = _ua
    // console.log(callid,callpassword)
    if(callid != "null" && callpassword != "null"){
        _ua.start();
    }
   
  } catch (error) {
    console.log(error);
  }
// }


}

async function hangupCallIncomingCall(gsession){
  try{
    // if(madeByMe){
    // }else{
    //   setVisible(true);
    // }
  
      // alert('ended')
      RNCallKeep.endAllCalls();
  
      console.log("Endinggg")
      state.callState = 'none';
    
      // console.log('sessionttt', session, state.session)
      if(gsession){

      
        gsession.terminate(
          {
            'status_code'   : 486,
            'reason_phrase' : 'Busy Here'
          });
    
          
      }else{
        // alert('Sorry')
      }

      // if(global.navigationsss){
      //   global.navigationsss.goBack()
      //   global.navigationsss.navigate('CallLogsScreen')
      
      // }else{
      //   navigation.goBack()
      //   navigation.navigate('CallLogsScreen')
      // }
  }catch(err){
    console.log(err)
  }
}
async function hangupCallWithRating(){
  try{
    // alert('In hangupCallWithRating')
    // if(madeByMe){
    // }else{
    //   setVisible(true);
    // }
  
      // alert('ended')
      RNCallKeep.endAllCalls();
  
      console.log("Endinggg")
      state.callState = 'none';
    
      // console.log('sessionttt', session, state.session)
      if(global.session){
        global.session.terminate(
          {
            'status_code'   : 486,
            'reason_phrase' : 'Busy Here'
          });
    
          
      }else{
  
        // alert('In hangupCallWithRating session')
        if(session){
          session.terminate(
            {
              'status_code'   : 486,
              'reason_phrase' : 'Busy Here'
            });
        }else{
          // alert('In Else hangupCallWithRating session')
        }
          
      }
  }catch(err){
    console.log(err)
  }
}

async function hangupCall () {
  // alert('Ended')
  // setVisible(true);
  // setVisible(true)
// try{
//   // if(madeByMe){
//   // }else{
//   //   setVisible(true);
//   // }

//     // alert('ended')
//     RNCallKeep.endAllCalls();

//     console.log("Endinggg")
//     state.callState = 'none';
//   // alert('hangupCall')
//     // console.log('sessionttt', session, state.session)
//     if(global.session){

//       if( global.navigationsss){
//         global.navigationsss.goBack()
//         global.navigationsss.navigate('CallLogsScreen')
      
//       }else{
//         navigation.goBack()
//         navigation.navigate('CallLogsScreen')
//       }
//       global.session.terminate(
//         {
//           'status_code'   : 486,
//           'reason_phrase' : 'Busy Here'
//         });
  
        
//     }else{

//       if( global.navigationsss){
//         global.navigationsss.goBack()
//         global.navigationsss.navigate('CallLogsScreen')
      
//       }else{
//         navigation.goBack()
//         navigation.navigate('CallLogsScreen')
//       }
//       if(session){
//         session.terminate(
//           {
//             'status_code'   : 486,
//             'reason_phrase' : 'Busy Here'
//           });
//       }
        
//     }
//     stopSound()
// }catch(err){
//   console.log(err)
// }


  // //  return;s
  // if(madeByMe){
  //     if(count>5){
  //       RNCallKeep.endAllCalls();
  //       // navigation.goBack()
  //       global.navigationsss.goBack()
  //     }else{
  //       RNCallKeep.endAllCalls();
  //       // navigation.goBack()
  //       global.navigationsss.goBack()
  //     }
  // }
  // count++;


  // navigation.popToTop()
  // navigation.navigate("CallLogsScreen")



  // navigation.navigate("CallLogsScreen")



  // if(this.state.session){
  // state.session.terminate();
  // } else if(this.RNCallKeepData.session!==undefined){
  //     this.RNCallKeepData.session.terminate();
  // }else{
  //  console.log('No sessions available')
  // }
}

const handleAnswerIncoming = async () =>{
  try{
  console.log('handleAnswerIncoming()::');
  let session
  if (Platform.OS === 'android') {
    session = state.incomingSession;
  } else {
    session = RNCallKeepData.session
  }
  console.log('RNCallKeepData.session',RNCallKeepData.session)
  console.log('Sessions', session)
  console.log('GLOBAL SESSION', session)
  global.session = session;
  if (session !== undefined) {
    if (session !== null) {
      global.isInCall = true
      console.log('handleAnswerIncominghandleAnswerIncominghandleAnswerIncoming', session)
      session.answer(
        {
          pcConfig: {
            rtcpMuxPolicy: 'negotiate',
            // bundlePolicy: 'max-bundle',
            iceServers:
              [
                // { urls: [ 'stun:stun.l.google.com:19302'] },
                // { urls: ['stun:stuns.ososweb.com:3478'] }
              ]
          },
          mediaConstraints:
          {
            audio: true,
            video: false
          },
          rtcOfferConstraints:
          {
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 0,
          }
        }
      );
      let iceCount = 0
      session.on('icecandidate', function (e) {
        e.ready();
        // console.log(">>Candidate event");
        // console.log('getting a candidate' + JSON.stringify(e));
  
        // iceCount++;
    
        // if(iceCount >= 4){
    
        //     e.ready();
        //     iceCount = 0;
        // }
      });
  
      // let iceCount = 0
      // session.on('icecandidate', function (e) {
      //   console.log(">>Candidate event");
    
      //   iceCount++;
    
      //   if(iceCount >= 10){
    
      //       e.ready();
      //       iceCount = 0;
      //   }
      // });
      // alert("Here In incoming")
      global.navigationsss.navigate('IncomingCallScreen', { aid: session.remote_identity._uri._user, name: global.name, profilePic:global.profilePic,gsession:session })
// navigation.navigate('IncomingCallScreen', { aid: session.remote_identity._uri._user, name: global.name, profilePic:global.profilePic })
      // var token  = await AsyncStorage.getItem('token');
      // global.profilePic
      // var a = GLOBAL.BASE_URL+"user/phone/"+session.remote_identity._uri._user;
      //  await axios.get(
      //    a,
      //    {
      //      headers: {
      //        "Content-Type": "application/json",
      //        Authorization:
      //        'Bearer '+token
      //      },
      //    }
      //  ).then((resp)=>{
      //    console.log('----------------ioioiooi')
      //   // global.name = resp.data.name;
      //    console.log(resp.data)
      //   //  showIncoming(session.remote_identity._uri._user,resp.data.name,resp.data.profilePic)
       
      //   //  navigation.navigate('OutGoingCallScreen',{aid:handle,name:resp.data.name,profilePic:resp.data.profilePic})
      //    console.log('----------------ioioiooi')
      //  }).catch((err)=>{
      //    console.log('----------------error')
      //    console.log(err)
      //    console.log('----------------error')
      //  })
      // if(global.navigationsss){
        
      //   showIncoming(global.name)
      //   // global.navigationsss.navigate('IncomingCallScreen',{aid:global.name,name:global.name,profilePic:'https://wallpaperaccess.com/full/2213426.jpg'})
      // }
      
      
      // alert('Incoming')
      // return(
      //   <IncomingCsallScreen/>
      // )
    }
  }

}catch(err){
  console.log(err)
}
}


// const handleAnswerIncoming = async () =>{
//   try{
//   console.log('handleAnswerIncoming()::');
//   let session
//   if (Platform.OS === 'android') {
//     session = state.incomingSession;
//   } else {
//     session = RNCallKeepData.session
//   }
//   console.log('Sessions', session)
//   console.log('GLOBAL SESSION', session)
//   // global.session = session;
//   if (global.session !== undefined) {
//     if (global.session !== null) {
//       console.log('handleAnswerIncominghandleAnswerIncominghandleAnswerIncoming', global.session)
//       global.session.answer(
//         {
//           pcConfig: {
//             rtcpMuxPolicy: 'negotiate',
//             // bundlePolicy: 'max-bundle',
//             iceServers:
//               [
//                 // { urls: [ 'stun:stun.l.google.com:19302'] },
//                 // { urls: ['stun:stuns.ososweb.com:3478'] }
//               ]
//           },
//           mediaConstraints:
//           {
//             audio: true,
//             video: false
//           },
//           rtcOfferConstraints:
//           {
//             offerToReceiveAudio: 1,
//             offerToReceiveVideo: 0,
//           }
//         }
//       );
//       let iceCount = 0
//       global.session.on('icecandidate', function (e) {
//         console.log(">>Candidate event");
//         console.log('getting a candidate' + JSON.stringify(e));
  
//         iceCount++;
    
//         if(iceCount >= 4){
    
//             e.ready();
//             iceCount = 0;
//         }
//       });
  
//       // let iceCount = 0
//       // session.on('icecandidate', function (e) {
//       //   console.log(">>Candidate event");
    
//       //   iceCount++;
    
//       //   if(iceCount >= 10){
    
//       //       e.ready();
//       //       iceCount = 0;
//       //   }
//       // });
//       // alert("Here In incoming")
//       global.navigationsss.navigate('IncomingCallScreen', { aid: global.session.remote_identity._uri._user, name: global.name, profilePic:global.profilePic })
// // navigation.navigate('IncomingCallScreen', { aid: session.remote_identity._uri._user, name: global.name, profilePic:global.profilePic })
//       // var token  = await AsyncStorage.getItem('token');
//       // global.profilePic
//       // var a = GLOBAL.BASE_URL+"user/phone/"+session.remote_identity._uri._user;
//       //  await axios.get(
//       //    a,
//       //    {
//       //      headers: {
//       //        "Content-Type": "application/json",
//       //        Authorization:
//       //        'Bearer '+token
//       //      },
//       //    }
//       //  ).then((resp)=>{
//       //    console.log('----------------ioioiooi')
//       //   // global.name = resp.data.name;
//       //    console.log(resp.data)
//       //   //  showIncoming(session.remote_identity._uri._user,resp.data.name,resp.data.profilePic)
       
//       //   //  navigation.navigate('OutGoingCallScreen',{aid:handle,name:resp.data.name,profilePic:resp.data.profilePic})
//       //    console.log('----------------ioioiooi')
//       //  }).catch((err)=>{
//       //    console.log('----------------error')
//       //    console.log(err)
//       //    console.log('----------------error')
//       //  })
//       // if(global.navigationsss){
        
//       //   showIncoming(global.name)
//       //   // global.navigationsss.navigate('IncomingCallScreen',{aid:global.name,name:global.name,profilePic:'https://wallpaperaccess.com/full/2213426.jpg'})
//       // }
      
      
//       // alert('Incoming')
//       // return(
//       //   <IncomingCsallScreen/>
//       // )
//     }
//   }

// }catch(err){
//   console.log(err)
// }
// }
// RNCallKeep.addEventListener('didActivateAudioSession', this.audioSessionActivated);
RNCallKeep.addEventListener('didReceiveStartCallAction', async ({ handle,callUUID,name }) => {

  //  var token  = await AsyncStorage.getItem('token');
  //  var a = GLOBAL.BASE_URL+"user/phone/"+handle;
  // if(a.length>58){
  //   console.log(a)
  //   await axios.get(
  //     a,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization:
  //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTRlN2I0NmU4ZDk2N2RkNWZjNWZmZiIsImlzR3Vlc3QiOmZhbHNlLCJpYXQiOjE2MjE1MDM4OTksImV4cCI6MTYyOTI3OTg5OX0.Xj_W6CoME5u9lpK0u2OnVNCFPc447CbFUveu7O-_MjY'
  //       },
  //     }
  //   ).then((resp)=>{
  //     console.log('----------------ioioiooi')
  //     console.log(resp.data)
  //     navigation.navigate('OutGoingCallScreen',{aid:handle,name:resp.data.name,profilePic:resp.data.profilePic})
  //     console.log('----------------ioioiooi')
  //   }).catch((err)=>{
  //     console.log('----------------error')
  //     console.log(err)
  //     console.log('----------------error')
  //   })
  // }


});



const OutGoingCallScreen = ({navigation,route,token}) => {



  global.navigationsss = navigation;

  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('Connecting');
  const [show, setShow] = useState(1);
    // var [ringing, setRinging] = useState(null);
    // var [muteCall, setMute] = useState(true);
    async function handleOutgoingCall (call){
      try{
        // playSound()
        global.incomingCall = "Outgoing";
        global.callStatus = "outgoing"
        callStatus = "Outgoing"
        // playSound()
        console.log('handleOutgoingCall:::=>')
        const num = `${call}`;
        // console.log('Calling', num)
        if (num.length === 0){
          return;
        }
        madeByMe = true;
       
        const session = _ua.call(num, {
          // extraHeaders: [ 'X-Foo: foo', 'CallMedia:'+media ],
          pcConfig: {
            rtcpMuxPolicy: 'negotiate',
            // stun_servers: 'stun:stuns.ososweb.com:3478',
            iceServers:
              [
                //  { urls: ['stun:stun.l.google.com:19302'] }
                // { urls: [ 'stun:stuns.ososweb.com' ] }
              ]
          },
          mediaConstraints: {
            audio: true,
            video: false,
          },  
          rtcOfferConstraints: {
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 0,
          },
        }
        );


        global.session = session;
        // let iceCount = 0
        // session.on('icecandidate', function (e) {
        //   console.log(">>Candidate event");
      
        //   iceCount++;
      
        //   if(iceCount >= 10){
      
        //       e.ready();
        //       iceCount = 0;
        //   }
        // });

        let iceCount = 0
        session.on('icecandidate', function (e) {
          console.log(">>Candidate event");
          console.log('getting a candidate' + JSON.stringify(e));
    
          iceCount++;
      
          if(iceCount >= 4){
      
              e.ready();
              iceCount = 0;
          }
        });
    
        console.log('Sessiom',session)
        // const session = this._ua.call(num,options)
        session.on('connecting', () => {

          // setStatus('Connecting')
          // console.log('connecting')
          // if (isIOS) {
            // this.setState({ session })
            state.session = session;
            // .startCall
            // console.log('Callingggggs')
            RNCallKeep.startCall('11edc52b-2918-4d71-9058-f7285e29d894', route.params.aid,route.params.name, 'number', true)
            // RNCallKeep.startCall('11edc52b-2918-4d71-9058-f7285e29d894', numToDisplay, 'Saikiran', 'number', false)
            // RNCallKeep.startCall('11edc52b-2918-4d71-9058-f7285e29d894', 'Saikiran Ponnuru', 'Saikiran', 'genric', false)
            // RNCallKeep.startCall(currentCallId, '8008551266', 'Spaarks', 'number', false);
            // this.setState({ callState: 'going' })
            state.callState = 'going';
    
            // navigation.navigate('OutGoingCallScreen',{name:'Saikiran',profilePic:'https://wallpaperaccess.com/full/2213426.jpg'})
            // RNCallKeep.startCall(num, "unknown", "generic", media==='audio');
          // }
    
        });
    
        session.on('progress', () => {

          setStatus('Ringing...')
          
          console.log('progress call')
        });
    
        session.on('failed', (data) => {
          // alert('failed')
          global.isInCall = false
          console.log('FAILED======>',data)
          if(data && data.cause){
            if(data.cause == "User Denied Media Access"){
              // alert('Please allow access to microphone in settings')
              Alert.alert(
                "Alert",
              "Please allow access to microphone in settings",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "Settings", onPress: () => Linking.openURL('app-settings:') }
                ]
              );

            }
          }
         
          if(data.message && data.message.data){
           
          if(data.message.data.includes("SPCOT")){
            alert('Person you are trying to reach is on another call. Please try after sometime')
          }
        }
          stopSound()
          // RNCallKeep.checkSpeaker(false);

          // RNCallKeep.endAllCalls();
          RNCallKeep.endAllCalls();
          // if(ringing){
      
          // }
          
    
            // hangupCall()
                  clearInterval(tim)
                  setStatus('Ended')
                setVisible(false);
                // navigation.goBack()
                global.navigationsss.popToTop()
                // global.navigationsss.navigate("CallLogsScreen")
                    // RNCallKeep.endCall(this.currentCallId)
                    if(session){
                      session.terminate(
                        {
                          'status_code': 486,
                          'reason_phrase': 'Busy Here'
                        });
                    }
                    
              
                    return;
    
        });
    
        session.on('muted', (data) => {
          console.log('session mute event', data);
        })
    
        session.on('unmuted', (data) => {
          console.log('session unmuted event', data);
    
        })
    
        session.on('ended', async() => {
          global.isInCall = false
          if(global.incomingCall == "Incoming"){
            await PushNotificationIOS.addNotificationRequest({
              id:String(Date.now()),
              title:'Missed call',
              subtitle:'Saikiran',
              body:'',
              userInfo:{
                apnType:'CallLogs',
                local:true,
                aid:''
              }
           })
           global.incomingCall = "false"
          //  global.incomingCall = "false"
          }else{
            global.incomingCall = "false"
          }
          
          stopSound()
          RNCallKeep.endAllCalls();
          if(state.session){
            state.session.terminate(
              {
                'status_code': 486,
                'reason_phrase': 'Busy Here'
              });
          }
          state.session = null

        });
    
        session.on('accepted', () => {
          global.callStatus = 'accepted'
          stopSound()
          // alert('In accepted')
          
          setStatus('Connected')
          console.log(':::call accepted:::')
          let secTimer = setInterval( () => {
            // var [dt, setDt] = useState(0);
            setDt(dt++)
            setShow(0)
        },1000)
        settim(secTimer)
        return () => clearInterval(secTimer);

    
        });
    
      }catch(err){
        console.log('Error',err)
      }
    }


    var [dt, setDt] = useState(0);
    var [tim, settim] = useState(0);

    useEffect(() => {
      handleConnect()
      playSound()
      handleOutgoingCall(route.params.aid)
      global.navigation = navigation;
       
    }, []);

    function convertTime(sec) {
      try{
        var hours = Math.floor(sec/3600);
        (hours >= 1) ? sec = sec - (hours*3600) : hours = '00';
        var min = Math.floor(sec/60);
        (min >= 1) ? sec = sec - (min*60) : min = '00';
        (sec < 1) ? sec='00' : void 0;
    
        (min.toString().length == 1) ? min = '0'+ min : void 0;    
        (sec.toString().length == 1) ? sec = '0'+ sec : void 0;    
        if(hours == '00'){
            return min+':'+sec;
        }else{
            return hours+':'+min+':'+sec;
        }
      }catch(err){
        console.log(err)
      }
        
    }
    const [rating,setRating] = useState(5)
    async function ratingCompleted(value) {
      // alert(value)
      setRating(value)

    }


const Ratings =  () =>{
    return(
        <View style={{textAlign:'center',justifyContent:'center',marginLeft:60}}>
{/* <AirbnbRating
  count={5}
  reviews={["Terrible", "Bad","OK", "Good","Very Good",]}
  defaultRating={5}
  size={30}
  onFinishRating={ratingCompleted}
/> */}

<AirbnbRating
                            count={5}
                            onFinishRating={ratingCompleted()}
                            defaultRating={5}
                          />
</View>
    )
}


    

    const showDialog = () => {
      if(global.callStatus == 'accepted'){
      setVisible(true)
      global.visible = true;
      }

      hangupCallWithRating()
        clearInterval(tim)
      setStatus('Ended')
            // hangupCall()
            // alert(global.callStatus)
            // if(global.callStatus == 'accepted'){
            //   setVisible(true)
              hangupCallWithRating()
            //   clearInterval(tim)
            //   setStatus('Ended')
            // }else{
            //   hangupCall()
            //   clearInterval(tim)
            //   setStatus('Ended')
            // }
        
      
       
    };
  
    const handleCancel = () => {
      setVisible(false);
      global.navigationsss.popToTop()
      // navigation.goBack()
    };
  
    const handleSubmitRating = async () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        var jwt = await AsyncStorage.getItem('token')
        await axios.post(GLOBAL.BASE_URL+'user/callsfeedback',{
          status:'Accepted',
          content:'Nice Audio was very clear appreciate the team',
          rating:rating,
          type:'Incoming/ Outgoing'
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              'Bearer ' + jwt
          },
        }).then((resp)=>{
          setVisible(false);
          if(global.navigationsss){
            global.navigationsss.goBack()
          }else{
            navigation.popToTop()
          }

        }).catch((err)=>{
          console.log('Error',err)
          setVisible(false);
          if(global.navigationsss){
            global.navigationsss.popToTop()
          }else{
            navigation.popToTop()
          }
        })
 
        // navigation.goBack()
      };
    

const [isMuted,setIsMuted] = useState(true)
 const muteCall = () =>{
   if(isMuted){
    //  alert('Muting')
    setIsMuted(false)
    global.session.mute({audio:true,video:false})
   }else{
    // alert('Un-Muting')
    setIsMuted(true)
    global.session.unmute({audio:true,video:false})
   }
  //  alert('Not Implemented yet')

  // playSound()
  // muteCall? setMute(false):setMute(true)
  // RNCallKeep.setMutedCall(currentCallId, true)
  // RNCallKeep.setMutedCall('11edc52b-2918-4d71-9058-f7285e29d894', true);
  // RNCallKeep.setMutedCall('UUID', true);

  // RNCallKeep.setOnHold('11edc52b-2918-4d71-9058-f7285e29d894', true)
  // RNCallKeep.setMutedCall(uuid, true);
}


const speakerCall = async () =>{
  // var a = await RNCallKeep.checkSpeaker();
  // var b = await RNCallKeep.getAudioRoutes();
  alert('Comming Soon')
  // await RNCallKeep.setAudioRoute("11edc52b-2918-4d71-9058-f7285e29d894", "speaker");
  // await RNCallKeep.toggleAudioRouteSpeaker("11edc52b-2918-4d71-9058-f7285e29d894", true);
  // alert('Not Implemented yet')
  // stopSound()
  // muteCall? setMute(false):setMute(true)
  // RNCallKeep.setMutedCall(currentCallId, true)
  // RNCallKeep.setMutedCall('11edc52b-2918-4d71-9058-f7285e29d894', true);
  // RNCallKeep.setMutedCall('UUID', true);

  // RNCallKeep.setOnHold('11edc52b-2918-4d71-9058-f7285e29d894', true)
  // RNCallKeep.setMutedCall(uuid, true);
}



    return (
      <ScrollView>
         <View>

<Dialog.Container visible={visible}>
        <Dialog.Title>{I18n.t("Please rate your call Experience")}</Dialog.Title>
        <Dialog.Description>
            <Text>{I18n.t("This helps us serve you better")}</Text>
        </Dialog.Description>
        <Dialog.Description>
    <Ratings/>
        </Dialog.Description>
        <Dialog.Button label="Later" onPress={handleCancel} />
        <Dialog.Button label="Submit" onPress={handleSubmitRating} />
      </Dialog.Container>


      {
          show == 1?<Text style={{textAlign:'center',marginTop:10,fontWeight:'200'}}>{status}</Text>:
          <Text style={{textAlign:'center',marginTop:10,fontWeight:'200'}}>{status}</Text>
      }
      

{
        visible?
        <>
  <ImageBackground source={{uri:''}} style={{
    height:300,width:350,marginLeft:25}}>
                     <Image source={{uri:route.params.profilePic}} style={{height:100,width:100,borderRadius:80,marginLeft:125,marginTop:100}}></Image>
                     </ImageBackground>
        </>
        :
        <>
  <ImageBackground source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1619806483/ripples_q8stui.gif'}} style={{
    height:300,width:350,marginLeft:25}}>
                     <Image source={{uri:route.params.profilePic}} style={{height:100,width:100,borderRadius:80,marginLeft:125,marginTop:100}}></Image>
                     </ImageBackground>
        </>
}

                   
                     <Text style={{textAlign:'center',marginTop:0,fontWeight:'bold',fontSize:30}}>{route.params.name}</Text>
           <Text style={{textAlign:'center',fontWeight:'200',marginTop:0,fontSize:20}}>
                         
                         {
                        //  dt>60?
                        //  <View style={{flexDirection:'row'}}>
                        //  <Text>{dt/60}</Text><Text>{dt}</Text>
                        //  </View>:
                        //  <Text>{convertTime(dt)}</Text>
                      
                     }</Text>
           <View
  style={{
    borderBottomColor: '#C7C7CD',
    borderBottomWidth: 1,
  margin:30,
  marginTop:0
  }}
/>
<View style={{flexDirection:'row'}}>
<View style={{flex:1}}>
  </View>
 
<View style={{flex:1}}>
<TouchableOpacity onPress={()=>{muteCall()}}>
  {
    !isMuted?
    <Image source={require('../assets/unmute.png')} style={{height:60,width:60}}></Image>
    :
    <Image source={require('../assets/mute.png')} style={{height:60,width:60}}></Image>
  }
<Text style={{color:'#908F9D',marginTop:10,marginLeft:10}}>Mute</Text>

</TouchableOpacity>
</View>

<View style={{flex:1}}>
</View>
  <TouchableOpacity onPress={()=>{speakerCall()}}>
  <View style={{flex:1}}>
  <Image source={require('../assets/speaker.png')} style={{height:60,width:60}}></Image>
  <Text style={{color:'#908F9D',marginTop:10}}>Speaker</Text>
  </View>
  </TouchableOpacity>
  <View style={{flex:1}}>
  </View>

  </View>
  <View style={{flexDirection:'row'}}>
    <TouchableOpacity onPress={()=>{showDialog()}}>
    <View style={{flex:1,justifyContent:'center',textAlign:'center'}}>
  <Image source={require('../assets/call-btn-1.png')}  style={{height:60,width:60,marginLeft:170,marginTop:0}}/>
    </View>   
    </TouchableOpacity>
    </View>   


           </View>
           </ScrollView>
    );
};



async function handleAPNs() {
  // VoipPushNotification.requestPermissions(); // --- optional, you can use another library to request permissions
  VoipPushNotification.registerVoipToken(); // --- required

  VoipPushNotification.addEventListener('register', async (token) => {
    // --- send token to your apn provider server
    console.log("::::::::VOIP TOKEN:::", token)

  });

  VoipPushNotification.addEventListener('localNotification', async(notification) => {
    // --- when user click local push
    console.log('::::::::::::::localVOIPNotification', notification)
  //   await PushNotificationIOS.addNotificationRequest({
  //     id:String(Date.now()),
  //     title:'Missed call',
  //     subtitle:'',
  //     body:global.name,
  //     userInfo:{
  //       apnType:'CallLogsScreen',
  //       local:true,
  //       aid:''
  //     }
  //  })
  });

  VoipPushNotification.addEventListener('notification', (notification) => {
    console.log(':::::::::::::::RemoteVOIPNotification', notification)
    // callKeepSetup()
    // this.currentCallId = notification.getData().uuid
    // setTimeout(() => {
    //   // let isActive = this.RNCallKeepData.session
    //   // if (!isActive) {
    //     RNCallKeep.rejectCall("11edc52b-2918-4d71-9058-f7285e29d894");
    //     RNCallKeep.endAllCalls();
    //   // }
    // }, 1000)


    if (VoipPushNotification.wakeupByPush) {
      // this.doSomething()
      // --- remember to set this static variable back to false
      // --- since the constant are exported only at initialization time, and it will keep the same in the whole app
      // VoipPushNotification.wakeupByPush = false;

    }
    VoipPushNotification.onVoipNotificationCompleted();


    /**
     * Local Notification Payload
     *
     * - `alertBody` : The message displayed in the notification alert.
     * - `alertAction` : The "action" displayed beneath an actionable notification. Defaults to "view";
     * - `soundName` : The sound played when the notification is fired (optional).
     * - `category`  : The category of this notification, required for actionable notifications (optional).
     * - `userInfo`  : An optional object containing additional notification data.
     */
    // VoipPushNotification.presentLocalNotification({
    //     alertBody: "Unified TeleKom! "
    // });
  });


}



const mapStatetoProps = (state) => {
  // const { }=state
  
  return {
    chat_roster_main: state.chatss.chat_roster_main,
    chat_roster_anonymous: state.chatss.chat_roster_anonymous,
    messages: state.chatss.messages,
    chatLoading: state.chatss.chatLoading,
    token: state.chatss.token
  };
};

export default connect(mapStatetoProps)(OutGoingCallScreen);



exports.handleConnect = handleConnect;
exports.callKeepSetup = callKeepSetup;
exports.handleAPNs = handleAPNs;
exports.hangupCall = hangupCall;
exports.hangupCallIncomingCall = hangupCallIncomingCall;
exports.setIncoming = setIncoming;
exports.handleCOnnectOnReceive = handleCOnnectOnReceive;
// exports.mutecall = muteCall;
// exports.handleOutgoingCall= handleOutgoingCall;
// exports.handleConnect = handleConnect;
