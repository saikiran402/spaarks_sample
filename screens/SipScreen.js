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

export default class SipScreen extends React.Component {


//   constructor(props) {
//     super(props);
//     this.state =
//     {
//       status: 'disconnected',
//       session: null,
//       incomingSession: null,
//       number: '',
//       username: '',
//       password: '',
//       callState: 'none'
//     };

//     // Mounted flag
//     this._mounted = false;
//     // JsSIP.UA instance
//     this._ua = null;
//     this.currentCallId = uuid.v4();
//     this.RNCallKeepData = {}
//     this.session = {}
//     this.callAnswered = ''

//   }

//   callKeepSetup = () => {
//     const options = {
//       ios: {
//         appName: 'CallApp',
//         imageName: 'sim_icon',
//         supportsVideo: false,
//         maximumCallGroups: '1',
//         maximumCallsPerCallGroup: '1',
//       },
//       android: {
//         alertTitle: 'Permissions Required',
//         alertDescription:
//           'This application needs to access your phone calling accounts to make calls',
//         cancelButton: 'Cancel',
//         okButton: 'ok',
//         imageName: 'sim_icon'
//       },
//     };

//     try {
//       RNCallKeep.setup(options).then((accepted) => {
//         console.log('callkeep registered');
//       });

//       if (Platform.OS === 'android') {
//         RNCallKeep.setAvailable(true);
//       }

//       RNCallKeep.addEventListener('answerCall', this.onAnswerCallAction);

//       RNCallKeep.addEventListener('endCall', this.onEndCallAction);

//       RNCallKeep.addEventListener('didLoadWithEvents', this.didLoadWithEvents);

//     } catch (err) {
//       console.error('initializeCallKeep error:', err.message);
//     }
//   };

//   onAnswerCallAction = async (data) => {
//     let { callUUID } = data;
//     this.callAnswered = 'answered'
//     setTimeout(() => {
//       this.handleAnswerIncoming()
//     }, 1000)
//   };

//   onEndCallAction = (data) => {
//     let { callUUID } = data;

//     this.hangupCall();

//     this.currentCallId = null;
//   };

//   didLoadWithEvents = (events) => {
//     console.log('didLoadWithEvents:', events)
//     if (!events || !Array.isArray(events) || events.length < 1) {
//       return;
//     }

//     for (let voipPushEvent of events) {
//       let { name, data } = voipPushEvent;
//       let { callUUID } = data;

//       if (name === 'RNCallKeepPerformAnswerCallAction') {
//         RNCallKeep.rejectCall(callUUID);
//         this.onAnswerCallAction(data)
//       }
//     }
//   }

//   useEffect = () => {
//     console.log('handleAnswerIncoming()::');
//     let session
//     if (Platform.OS === 'android') {
//       session = this.state.incomingSession;
//     } else {
//       session = this.RNCallKeepData.session
//     }
//     console.log('Sessions', session)
//     if (session !== undefined) {
//       if (session !== null) {
//         // RNCallKeep.answerIncomingCall('11edc52b-2918-4d71-9058-f7285e29d894')
//         // this.RNCallKeepData.session.answer()
//         console.log('handleAnswerIncominghandleAnswerIncominghandleAnswerIncoming', session)
//         this.session.answer(
//           {
//             pcConfig: {
//               rtcpMuxPolicy: 'negotiate',
//               bundlePolicy: 'max-bundle',
//               iceServers:
//                 [
//                   //{ urls: [ 'stun:stun.l.google.com:19302'] },
//                   { urls: ['stun:stun.ososweb.com:3478'] }
//                 ]
//             },
//             mediaConstraints:
//             {
//               audio: true,
//               video: false
//             },
//             rtcOfferConstraints:
//             {
//               offerToReceiveAudio: 1,
//               offerToReceiveVideo: 0,
//             }
//           }
//         );

        
//       }
//     }
//   }

//   onChangeText = (number) => {
//     this.setState({ number })
//   }

//   onChangeTextUsername = (username) => {
//     this.setState({ username })
//   }
//   onChangeTextPassword = (password) => {
//     this.setState({ password })
//   }


//   hangupCall = () => {
//     console.log("Endinggg")
//     this.setState({ callState: 'none' })

//     console.log('sessionttt', this.session, this.state.session)
//     // this.session.terminate(
//     // 	{
//     // 		'status_code'   : 486,
//     // 		'reason_phrase' : 'Busy Here'
//     // 	});

//     // 	return;
//     RNCallKeep.endAllCalls();
//     // if(this.state.session){
//     this.state.session.terminate();
//     // } else if(this.RNCallKeepData.session!==undefined){
//     //     this.RNCallKeepData.session.terminate();
//     // }else{
//     // 	console.log('No sessions available')
//     // }
//   }


//   handleConnect = (u, p) => {
//     try {
//       const socket = new JsSIP.WebSocketInterface('ws://103.27.86.24:3006');
//       this._ua = new JsSIP.UA(
//         // {
//         // 	uri                   : 'sip:800855126s@103.27.86.24:3005',
//         // 	password              : 'qMvo0LTwXC',
//         // 	'display_name'        : 'Saikiran',
//         // 	sockets               : [ socket ],
//         // 	'registrar_server'    : '103.27.86.24:3005',
//         // 	// 'contact_uri'         : 'sip:800855126s@103.27.86.24',
//         // 	// 'contact_uri':null,
//         // 	'authorization_user'  : '800855126s',
//         // 	'instance_id'         : null,
//         // 	'session_timers'      : false,
//         // 	'use_preloaded_route' : true
//         // }
//         {
//           uri: `sip:${this.state.username}@103.27.86.24:3006`,
//           password: this.state.password,
//           sockets: [socket],
//           'registrar_server': '103.27.86.24:3006',
//           // 'contact_uri'         : 'sip:5002@103.27.86.24',
//           // 'contact_uri':null,
//           'authorization_user': this.state.username,
//           'instance_id': null,
//           'session_timers': false,
//           'use_preloaded_route': false,
//           with_react_native: true
//         }
//       );

//       this._ua.on('connecting', () => {
//         console.log('connecting');
//       });

//       this._ua.on('connected', () => {
//         console.log('connected');
//       });

//       this._ua.on('disconnected', () => {
//         console.log('disconnected');
//       });

//       this._ua.on('registered', () => {
//         console.log('registered');
//       });

//       this._ua.on('unregistered', () => {
//         console.log('UA "unregistered" event');

//       });

//       this._ua.on('newRTCSession', (data) => {
//         // TODO: For testing.
//         console.log('in newRTCSession')

//         if (data.originator === 'local')
//           return;

//         const state = this.state;
//         let session = data.session;
//         session.media = data.request.headers.Callmedia
//         // session.media = 'audio'
//         console.log('incomming RTC')
//         console.log('State', state)
//         console.log('Data', data)
//         console.log('sessionsssss', session)
//         this.session = session;
//         this.setState({ session: session })
//         if (state.session || state.incomingSession) {
//           console.log('incoming call replied with 486 "Busy Here"');
//           session.terminate(
//             {
//               'status_code': 486,
//               'reason_phrase': 'Busy Here'
//             });

//           return;
//         }

//         //audioPlayer.play('ringing');
//         if (session) {
//           let data = { session: session, number: session.remote_identity._uri._user.substring(1) }
//           this.RNCallKeepData = data

//           RNCallKeep.displayIncomingCall(
//             '11edc52b-2918-4d71-9058-f7285e29d894',
//             session.remote_identity._uri._user.substring(1),
//           );
//           // if(Platform.OS === 'ios'){
//           // 	if (VoipPushNotification.wakeupByPush) {
//           // 		console.log('this.callAnswered:::',this.callAnswered)
//           // 		if(this.callAnswered==='answered'){
//           // 			this.callAnswered = ''
//           // 			this.handleAnswerIncoming();
//           // 		}
//           // 		VoipPushNotification.wakeupByPush = false;
//           // 	}else{
//           // 		RNCallKeep.displayIncomingCall(
//           // 			'11edc52b-2918-4d71-9058-f7285e29d894',
//           // 			session.remote_identity._uri._user.substring(1),
//           // 		);
//           // 	}

//           // }
//         }


//         session.on('failed', () => {
//           console.log('call failed.')
//           // VoipPushNotification.wakeupByPush = false;

//           if (isIOS) {
//             this.RNCallKeepData = {}
//             // RNCallKeep.rejectCall(this.currentCallId);
//             RNCallKeep.endAllCalls();
//           }

//           this.setState(
//             {
//               session: null,
//               incomingSession: null
//             });

//         });

//         session.on('muted', (data) => {
//           console.log('session mute event', data);

//         })

//         session.on('unmuted', (data) => {
//           console.log('session unmuted event', data);
//         })

//         session.on('ended', () => {
//           console.log('call ended [dialer]')

//           if (isIOS) {
//             console.log('checking call end', this.currentCallId)
//             this.RNCallKeepData = {}
//             // RNCallKeep.rejectCall(this.currentCallId);
//             RNCallKeep.endAllCalls();
//           }

//           this.setState(
//             {
//               session: null,
//               incomingSession: null
//             });
//         });

//         session.on('accepted', () => {
//           console.log('call accepted')
//           if (Platform.OS === 'android') {

//             this.setState(
//               {
//                 session: session,
//                 incomingSession: null
//               });
//           } else {
//             let data = this.RNCallKeepData
//             data.session = session
//             this.RNCallKeepData = data
//             this.setState({ session: session })
//             // RNCallKeep.isCallActive(this.getCurrentCallId());
//           }

//         });
//       });

//       // TODO: For testing.
//       window.UA = this._ua;
//       this._ua.start();
//     } catch (error) {
//       console.log(error);
//     }


//   }


//   handleOutgoingCall = () => {
// try{
//     console.log('handleOutgoingCall:::=>')

//     const num = `${this.state.number}@103.27.86.24:3006`;
//     console.log('Calling', num)
//     if (num.length === 0) {
//       return;
//     }
//     var media = ''
//     const session = this._ua.call(num, {
//       // extraHeaders: [ 'X-Foo: foo', 'CallMedia:'+media ],
//       pcConfig: {
//         rtcpMuxPolicy: 'negotiate',
//         iceServers:
//           [
//             // { urls: ['stun:stun.l.google.com:19302', 'stun:stun.ososweb.com'] },
//             // { urls: [ 'stun:stun.ososweb.com' ] }
//           ]
//       },
//       mediaConstraints:
//       {
//         audio: true,
//         video: false
//       },
//       rtcOfferConstraints:
//       {
//         offerToReceiveAudio: 1,
//         offerToReceiveVideo: 0,
//       }
//     });
//     // const session = this._ua.call(num,options)
//     session.on('connecting', () => {
//       console.log('connecting')
//       var numToDisplay = 'Spaarks'
//       if (isIOS) {
//         this.setState({ session })
//         // .startCall
//         RNCallKeep.startCall('11edc52b-2918-4d71-9058-f7285e29d894', num, 'Saikiran', 'number', false)
//         this.setState({ callState: 'going' })
//         // RNCallKeep.startCall(num, "unknown", "generic", media==='audio');
//       }

//     });

//     session.on('progress', () => {
//       console.log('progress call')

//     });

//     session.on('failed', (data) => {
//       RNCallKeep.endAllCalls();
//       // RNCallKeep.endCall(this.currentCallId)
//       session.terminate(
//         {
//           'status_code': 486,
//           'reason_phrase': 'Busy Here'
//         });

//       return;
//       this.setState({ session: null });

//     });

//     session.on('muted', (data) => {
//       console.log('session mute event', data);
//     })

//     session.on('unmuted', (data) => {
//       console.log('session unmuted event', data);

//     })

//     session.on('ended', () => {
//       // RNCallKeep.endCall(this.getCurrentCallId())
//       RNCallKeep.endAllCalls();
//       this.state.session.terminate(
//         {
//           'status_code': 486,
//           'reason_phrase': 'Busy Here'
//         });

//       // return;
//       this.setState({ session: null });

//     });

//     session.on('accepted', () => {
//       console.log(':::call accepted:::')

//     });

//   }catch(err){
//     console.log('Error',err)
//   }

//   }

//   async handleAPNs() {
//     // VoipPushNotification.requestPermissions(); // --- optional, you can use another library to request permissions
//     VoipPushNotification.registerVoipToken(); // --- required

//     VoipPushNotification.addEventListener('register', async (token) => {
//       // --- send token to your apn provider server
//       console.log("::::::::VOIP TOKEN:::", token)

//     });

//     VoipPushNotification.addEventListener('localNotification', (notification) => {
//       // --- when user click local push
//       console.log('::::::::::::::localVOIPNotification', notification)
//     });

//     VoipPushNotification.addEventListener('notification', (notification) => {
//       console.log(':::::::::::::::RemoteVOIPNotification', notification)

//       // this.currentCallId = notification.getData().uuid
//       setTimeout(() => {
//         let isActive = this.RNCallKeepData.session
//         if (!isActive) {
//           RNCallKeep.rejectCall(this.currentCallId);
//           RNCallKeep.endAllCalls();
//         }
//       }, 5000)


//       if (VoipPushNotification.wakeupByPush) {
//         // this.doSomething()
//         // --- remember to set this static variable back to false
//         // --- since the constant are exported only at initialization time, and it will keep the same in the whole app
//         // VoipPushNotification.wakeupByPush = false;

//       }



//       // --- This  is a boolean constant exported by this module
//       // --- you can use this constant to distinguish the app is launched by VoIP push notification or not



//       // --- optionally, if you `addCompletionHandler` from the native side, once you have done the js jobs to initiate a call, call `completion()`
//       VoipPushNotification.onVoipNotificationCompleted(notification.getData().uuid);


//       /**
//        * Local Notification Payload
//        *
//        * - `alertBody` : The message displayed in the notification alert.
//        * - `alertAction` : The "action" displayed beneath an actionable notification. Defaults to "view";
//        * - `soundName` : The sound played when the notification is fired (optional).
//        * - `category`  : The category of this notification, required for actionable notifications (optional).
//        * - `userInfo`  : An optional object containing additional notification data.
//        */
//       // VoipPushNotification.presentLocalNotification({
//       //     alertBody: "Unified TeleKom! " + notification.getMessage()
//       // });
//     });


//   }

//   async componentDidMount() {

//     this.callKeepSetup();
//     this.handleAPNs()

//     // const socket = new JsSIP.WebSocketInterface('wss://dev-pbx.rivernetworks.com:8089/ws');





//   }





  render() {
    // let state = this.state
    return (
      <View style={styles.container}>

        {/* {state.callState == 'none' ?  */}
        <View>
          <Text style={{ textAlign: "center" }}>800855126s</Text>
          <TextInput

            style={styles.input}
            onChangeText={this.onChangeTextUsername}
            placeholder="username"
            value={state.username}
          />
          <TextInput

            style={styles.input}
            onChangeText={this.onChangeTextPassword}
            placeholder="password"
            value={state.password}
          />
          <Button title="Connect" onPress={this.handleConnect} />
          <TextInput

            style={styles.input}
            onChangeText={this.onChangeText}

            value={state.number}
          />


          <Button title="Call" onPress={this.handleOutgoingCall} />
        </View>


        <Button title="End" onPress={this.hangupCall} />

      </View>


      // 				 <View style={{flex:1,textAlign:'center'}}>
      // 					 <Image source={require('../assets/caller.png')} style={{height:150,width:150,marginLeft:130,marginTop:150}}></Image>
      // 					 <Text style={{textAlign:'center',marginTop:50,fontWeight:'bold',fontSize:30}}>Apoorva</Text>
      // 					 <Text style={{textAlign:'center',fontWeight:'200',marginTop:20}}>Spaarks Incoming Call</Text>
      // 					 <View
      //   style={{
      //     borderBottomColor: '#C7C7CD',
      //     borderBottomWidth: 1,
      // 	margin:30
      //   }}
      // />
      // <View style={{flexDirection:'row'}}>
      // <View style={{flex:1}}>
      // 	</View>
      // <View style={{flex:1}}>
      // <Image source={require('../assets/mute.png')} style={{height:60,width:60}}></Image>
      // <Text style={{color:'#908F9D',marginTop:10,marginLeft:10}}>Mute</Text>
      // </View>
      // <View style={{flex:1}}>
      // 	</View>
      // 	<View style={{flex:1}}>
      // 	<Image source={require('../assets/speaker.png')} style={{height:60,width:60}}></Image>
      // 	<Text style={{color:'#908F9D',marginTop:10}}>Speaker</Text>
      // 	</View>
      // 	<View style={{flex:1}}>
      // 	</View>

      // 	</View>
      // 	<View style={{flexDirection:'row'}}>
      // 		<TouchableOpacity onPress={()=>{this.hangupCall}}>
      // 		<View style={{flex:1}}>
      // 	<Image source={require('../assets/call-btn-1.png')}  style={{height:60,width:60}}/>
      // 		</View>		
      // 		</TouchableOpacity>
      // 		</View>		


      // 					 </View>
      // 				}
      // 			</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
})