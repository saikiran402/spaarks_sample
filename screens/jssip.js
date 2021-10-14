import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Platform,
  Image,
  TouchableOpacity
} from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import JsSIP from 'jssip'
import uuid from 'react-native-uuid';
import VoipPushNotification from 'react-native-voip-push-notification';


const isIOS = Platform.OS === 'ios';

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

    var mounted = false;
    // JsSIP.UA instance
    var ua = null;
    var currentCallId = uuid.v4();
    var RNCallKeepData = {}
    var session = {}
    var callAnswered = ''



    async function callKeepSetup () {
        const options = {
          ios: {
            appName: 'CallApp',
            imageName: 'sim_icon',
            supportsVideo: false,
            maximumCallGroups: '1',
            maximumCallsPerCallGroup: '1',
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
          RNCallKeep.setup(options).then((accepted) => {
            console.log('callkeep registered');
          });
    
          if (Platform.OS === 'android') {
            RNCallKeep.setAvailable(true);
          }
    
          RNCallKeep.addEventListener('answerCall', this.onAnswerCallAction);
    
          RNCallKeep.addEventListener('endCall', this.onEndCallAction);
    
          RNCallKeep.addEventListener('didLoadWithEvents', this.didLoadWithEvents);
    
        } catch (err) {
          console.error('initializeCallKeep error:', err.message);
        }
      };
    
      async function  onAnswerCallAction (data) {
        let { callUUID } = data;
        callAnswered = 'answered'
        setTimeout(() => {
          handleAnswerIncoming()
        }, 1000)
      };
    
      async function onEndCallAction(data){
        let { callUUID } = data;
    
        hangupCall();
    
        currentCallId = null;
      };
    
      async function didLoadWithEvents (events) {
        console.log('didLoadWithEvents:', events)
        if (!events || !Array.isArray(events) || events.length < 1) {
          return;
        }
    
        for (let voipPushEvent of events) {
          let { name, data } = voipPushEvent;
          let { callUUID } = data;
    
          if (name === 'RNCallKeepPerformAnswerCallAction') {
            RNCallKeep.rejectCall(callUUID);
            onAnswerCallAction(data)
          }
        }
      }
    
      async function handleAnswerIncoming (){
        console.log('handleAnswerIncoming()::');
        let session
        if (Platform.OS === 'android') {
          session = state.incomingSession;
        } else {
          session = RNCallKeepData.session
        }
        console.log('Sessions', session)
        if (session !== undefined) {
          if (session !== null) {
            // RNCallKeep.answerIncomingCall('11edc52b-2918-4d71-9058-f7285e29d894')
            // this.RNCallKeepData.session.answer()
            console.log('handleAnswerIncominghandleAnswerIncominghandleAnswerIncoming', session)
            session.answer(
              {
                pcConfig: {
                  rtcpMuxPolicy: 'negotiate',
                  bundlePolicy: 'max-bundle',
                  iceServers:
                    [
                      //{ urls: [ 'stun:stun.l.google.com:19302'] },
                      { urls: ['stun:stun.ososweb.com:3478'] }
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
          }
        }
      }
    
      async function onChangeText(number) {
        // setState({ number })
        state.number = number;
      }
    
      async function onChangeTextUsername (username){
        // setState({ username })
        state.username = username;
      }
      async function onChangeTextPassword (password){
        // setState({ password })
        state.password = password;
      }
    
    
      async function hangupCall (){
        console.log("Endinggg")
        // this.setState({ callState: 'none' })
        state.callState = 'none';
    
        console.log('sessionttt', state.session)
        // this.session.terminate(
        // 	{
        // 		'status_code'   : 486,
        // 		'reason_phrase' : 'Busy Here'
        // 	});
    
        // 	return;
        RNCallKeep.endAllCalls();
        // if(this.state.session){
        state.session.terminate();
        // } else if(this.RNCallKeepData.session!==undefined){
        //     this.RNCallKeepData.session.terminate();
        // }else{
        // 	console.log('No sessions available')
        // }
      }
    
    
    async function handleConnect (u, p) {
        try {
          const socket = new JsSIP.WebSocketInterface('ws://103.27.86.24:3006');
          _ua = new JsSIP.UA(
            // {
            // 	uri                   : 'sip:800855126s@103.27.86.24:3005',
            // 	password              : 'qMvo0LTwXC',
            // 	'display_name'        : 'Saikiran',
            // 	sockets               : [ socket ],
            // 	'registrar_server'    : '103.27.86.24:3005',
            // 	// 'contact_uri'         : 'sip:800855126s@103.27.86.24',
            // 	// 'contact_uri':null,
            // 	'authorization_user'  : '800855126s',
            // 	'instance_id'         : null,
            // 	'session_timers'      : false,
            // 	'use_preloaded_route' : true
            // }
            {
              uri: `sip:${u}@103.27.86.24:3006`,
              password: p,
              sockets: [socket],
              'registrar_server': '103.27.86.24:3006',
              // 'contact_uri'         : 'sip:5002@103.27.86.24',
              // 'contact_uri':null,
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
            console.log('connected');
          });
    
          _ua.on('disconnected', () => {
            console.log('disconnected');
          });
    
          _ua.on('registered', () => {
            console.log('registered');
          });
    
          _ua.on('unregistered', () => {
            console.log('UA "unregistered" event');
    
          });
    
          _ua.on('newRTCSession', (data) => {
            // TODO: For testing.
            console.log('in newRTCSession')
    
            if (data.originator === 'local')
              return;
    
            const states = state;
            let session = data.session;
            session.media = data.request.headers.Callmedia
            // session.media = 'audio'
            console.log('incomming RTC')
            console.log('State', state)
            console.log('Data', data)
            console.log('sessionsssss', session)
            session = session;
            // this.setState({ session: session })
            if (states || states.incomingSession) {
                console.log('incoming call replied with 486 "Busy Here"');
                session.terminate(
                  {
                    'status_code': 486,
                    'reason_phrase': 'Busy Here'
                  });
      
                return;
              }
            state.session = session;

            console.log('Session Available',session)
            RNCallKeep.displayIncomingCall(
                '11edc52b-2918-4d71-9058-f7285e29d894',
                session.remote_identity._uri._user.substring(1),
              );
    
            //audioPlayer.play('ringing');
            if (session) {
                console.log('Session Available',session)
              let data = { session: session, number: session.remote_identity._uri._user.substring(1) }
              RNCallKeepData = data
    
              RNCallKeep.displayIncomingCall(
                '11edc52b-2918-4d71-9058-f7285e29d894',
                session.remote_identity._uri._user.substring(1),
              );
              // if(Platform.OS === 'ios'){
              // 	if (VoipPushNotification.wakeupByPush) {
              // 		console.log('this.callAnswered:::',this.callAnswered)
              // 		if(this.callAnswered==='answered'){
              // 			this.callAnswered = ''
              // 			this.handleAnswerIncoming();
              // 		}
              // 		VoipPushNotification.wakeupByPush = false;
              // 	}else{
              // 		RNCallKeep.displayIncomingCall(
              // 			'11edc52b-2918-4d71-9058-f7285e29d894',
              // 			session.remote_identity._uri._user.substring(1),
              // 		);
              // 	}
    
              // }
            }
    
    
            session.on('failed', () => {
              console.log('call failed.')
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
              console.log('session mute event', data);
    
            })
    
            session.on('unmuted', (data) => {
              console.log('session unmuted event', data);
            })
    
            session.on('ended', () => {
              console.log('call ended [dialer]')
    
              if (isIOS) {
                console.log('checking call end', this.currentCallId)
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
    
            session.on('accepted', () => {
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
          });
    
          // TODO: For testing.
          window.UA = _ua;
          _ua.start();
        } catch (error) {
          console.log(error);
        }
    
    
      }
    
    
     async function handleOutgoingCall (call){
    try{
        console.log('handleOutgoingCall:::=>')
    
        const num = `${call}@103.27.86.24:3006`;
        console.log('Calling', num)
        if (num.length === 0) {
          return;
        }
        var media = ''
        const session = _ua.call(num, {
          // extraHeaders: [ 'X-Foo: foo', 'CallMedia:'+media ],
          pcConfig: {
            rtcpMuxPolicy: 'negotiate',
            iceServers:
              [
                // { urls: ['stun:stun.l.google.com:19302', 'stun:stun.ososweb.com'] },
                // { urls: [ 'stun:stun.ososweb.com' ] }
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
        });




        console.log('Sessiom',session)
        // const session = this._ua.call(num,options)
        session.on('connecting', () => {
          console.log('connecting')
          var numToDisplay = 'Spaarks'
          if (isIOS) {
            // this.setState({ session })
            state.session = session;
            // .startCall
            console.log('Callingggggs')
            // RNCallKeep.startCall('11edc52b-2918-4d71-9058-f7285e29d894', numToDisplay, 'Saikiran', 'number', false)
            RNCallKeep.startCall('11edc52b-2918-4d71-9058-f7285e29d894', num, 'Saikiran', 'number', false)
            // RNCallKeep.startCall(currentCallId, '8008551266', 'Spaarks', 'number', false);
            // this.setState({ callState: 'going' })
            state.callState = 'going';
            // this.props.navigation.navigate('OutGoingCallScreen',{name:'Saikiran',profilePic:'https://wallpaperaccess.com/full/2213426.jpg'})
            // RNCallKeep.startCall(num, "unknown", "generic", media==='audio');
          }
    
        });
    
        session.on('progress', () => {
          console.log('progress call')
        });
    
        session.on('failed', (data) => {
          RNCallKeep.endAllCalls();
          // RNCallKeep.endCall(this.currentCallId)
          session.terminate(
            {
              'status_code': 486,
              'reason_phrase': 'Busy Here'
            });
    
          return;
          this.setState({ session: null });
    
        });
    
        session.on('muted', (data) => {
          console.log('session mute event', data);
        })
    
        session.on('unmuted', (data) => {
          console.log('session unmuted event', data);
    
        })
    
        session.on('ended', () => {
          // RNCallKeep.endCall(this.getCurrentCallId())
          RNCallKeep.endAllCalls();
          state.session.terminate(
            {
              'status_code': 486,
              'reason_phrase': 'Busy Here'
            });



    
          // return;
        //   this.setState({ session: null });
    
          state.session = null
        });
    
        session.on('accepted', () => {
          console.log(':::call accepted:::')
    
        });
    
      }catch(err){
        console.log('Error',err)
      }
    
      }
    
      async function handleAPNs() {
        // VoipPushNotification.requestPermissions(); // --- optional, you can use another library to request permissions
        VoipPushNotification.registerVoipToken(); // --- required
    
        VoipPushNotification.addEventListener('register', async (token) => {
          // --- send token to your apn provider server
          console.log("::::::::VOIP TOKEN:::", token)
    
        });
    
        VoipPushNotification.addEventListener('localNotification', (notification) => {
          // --- when user click local push
          console.log('::::::::::::::localVOIPNotification', notification)
        });
    
        VoipPushNotification.addEventListener('notification', (notification) => {
          console.log(':::::::::::::::RemoteVOIPNotification', notification)
    
          // this.currentCallId = notification.getData().uuid
          setTimeout(() => {
            let isActive = this.RNCallKeepData.session
            if (!isActive) {
              RNCallKeep.rejectCall(this.currentCallId);
              RNCallKeep.endAllCalls();
            }
          }, 5000)
    
    
          if (VoipPushNotification.wakeupByPush) {
            // this.doSomething()
            // --- remember to set this static variable back to false
            // --- since the constant are exported only at initialization time, and it will keep the same in the whole app
            // VoipPushNotification.wakeupByPush = false;
    
          }
    
    
    
          // --- This  is a boolean constant exported by this module
          // --- you can use this constant to distinguish the app is launched by VoIP push notification or not
    
    
    
          // --- optionally, if you `addCompletionHandler` from the native side, once you have done the js jobs to initiate a call, call `completion()`
          VoipPushNotification.onVoipNotificationCompleted(notification.getData().uuid);
    
    
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
          //     alertBody: "Unified TeleKom! " + notification.getMessage()
          // });
        });
    
    
      }
    
    //   async componentDidMount() {
    
    //     this.callKeepSetup();
    //     this.handleAPNs()
    
    //     // const socket = new JsSIP.WebSocketInterface('wss://dev-pbx.rivernetworks.com:8089/ws');
    
    
    
    
    
    //   }
    
    
    
    
    



exports.callKeepSetup = callKeepSetup;
exports.handleAPNs = handleAPNs;
exports.handleConnect = handleConnect;
exports.handleOutgoingCall = handleOutgoingCall;

// export default connect(mapStatetoProps, mapDispatchToProps)(JsSIPs);
