// import React, { useEffect, setState, useRef, useCallback, useState } from "react";
// import { TabRouter, useTheme } from "@react-navigation/native";
// import { useScrollToTop } from '@react-navigation/native';

// import {
//   Share,
//   Image,
//   Platform,
//   TouchableOpacity,
//   ActivityIndicator,
//   RefreshControl,
//   Colors,
//   ScrollView,
//   Pressable,
//   ImageBackground,
//   SafeAreaView,
//   View,
//   StyleSheet,
//   StatusBar,
//   DevSettings,
//   TextInput,
//   Alert,
//   Dimensions,
//   TouchableHighlight,
//   LogBox,
//   Linking,
//   FlatList,
//   Platforms,
//   Modal,
//   Animated
// } from "react-native";
// // import { Slider } from 'react-native-elements';
// import Slider from '@react-native-community/slider';
// // import BackgroundTask from 'react-native-background-task'
// import RNLocation from 'react-native-location';
// import RNCallKeep from 'react-native-callkeep';
// import axios from "axios";
// import { client, xml } from "@xmpp/client";
// import debug from "@xmpp/debug";
// import JsSIP from 'jssip'
// import ViewShot from "react-native-view-shot";
// import { Rating, AirbnbRating, Divider } from "react-native-elements";
// import { canPost } from './authGuard'
// import { connect, useDispatch, useReducer } from "react-redux";
// import { connectXMPP, setXMPP, addListeners, getRosterMain, setMess, testing, getRosterFromXMPP, setPresence, confirmlogout } from './xmpp';
// import chatReducers from "../reducers/chatReducers";
// import chatReducersactual from "../reducers/chatReducersactual";
// import { callKeepSetup, handleConnect } from './OutGoingCallScreen'
// import Star from 'react-native-star-view';
// LogBox.ignoreAllLogs();
// // import { Video, AVPlaybackStatus } from 'expo-av';
// import moment from "moment";
// import Carousel from 'react-native-snap-carousel';
// import { Text, BottomSheet, ListItem } from "react-native-elements";
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";
// import { checkNotifications } from 'react-native-permissions';
// import AsyncStorage from "@react-native-community/async-storage";
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification from "react-native-push-notification";
// import VoipPushNotification from 'react-native-voip-push-notification';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import I18n from '../src/i18n';


// // import RangeSlider from 'react-native-range-slider'
// // import RangeSlider from 'rn-range-slider';
// // import Slider from "@react-native-community/slidfer";

// const isIOS = Platform.OS === 'ios';
// import {
//   Avatar,
//   Button,
//   Card,
//   Title,
//   Paragraph,
//   Searchbar,
//   Chip,
//   RadioButton,

// } from "react-native-paper";
// import Dialog from "react-native-dialog";
// import Snackbar from 'react-native-snackbar';
// import RBSheet from "react-native-raw-bottom-sheet";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import ChatSpecificScreen from "./ChatSpecificScreen";
// import OnBoardingScreen from "./OnBoardingScreen";
// import Hyperlink from 'react-native-hyperlink'
// import RNUrlPreview from 'react-native-url-preview';
// import Video from 'react-native-video';
// import InCallManager from 'react-native-incall-manager';
// import Sound from 'react-native-sound';
// import { stat } from "react-native-fs";
// import ImageViewScreen from "./ImageViewScreen";
// import PostCard from "../components/PostCard";
// import SpaarksHeading from "../components/SpaarksHeading"
// import IncomingCallScreen from "./IncomingCallScreen";
// // import {xmpp} from './xmpp'
// const GLOBAL = require('../Globals');
// const Stack = createStackNavigator();
// const wait = (timeout) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, timeout);
//   });
// };



// const indexes = [4, 8, 12, 16, 20, 24]
// global.postcurrent = ['0'];
// global.navigation = null
// global.type = 'within';
// global.token = 'null';
// global.chat_roster_main = [];
// global.Chatdispatcherss = null;
// global.apnToken = null;
// async function updateChat(chat_roster_mains) {

//   global.Chatdispatcherss({
//     type: "SETMYMESSAGEMAIN",
//     chat_roster_main: chat_roster_mains,
//   });

// }

// PushNotificationIOS.requestPermissions().then(
//   (data) => {
//     console.log("PushNotificationIOS.requestPermissions", data);
//   },
//   (data) => {
//     console.log("PushNotificationIOS.requestPermissions failed", data);
//   }
// );


// async function sendRegistrationToken() {
//   var jwt = await AsyncStorage.getItem('token');
//   var iosToken = await AsyncStorage.getItem('iosToken');
//   var iosVoipToken = await AsyncStorage.getItem('iosVoipToken');



//   console.log('iosTokeniosTokeniosTokeniosTokeniosTokeniosToken', iosToken)
//   console.log('iosVoipTokeniosVoipTokeniosVoipTokeniosVoipTokenwewewewe', iosVoipToken)
//   await axios.post(GLOBAL.BASE_URL + 'user/saveregistrationtoken', {
//     registrationToken: iosToken
//   }, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:
//         'Bearer ' + jwt
//     },
//   }
//   ).then((resp) => {
//     //  alert('Token Sent')
//   }).catch(err => {
//     console.log('ikikikikikikikikikikiki')
//     console.log(err)
//   })

//   await axios.post(GLOBAL.BASE_URL + 'user/saveregistrationtokeniOS', {
//     registrationToken: iosVoipToken
//   }, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:
//         'Bearer ' + jwt
//     },
//   }
//   ).then((resp) => {
//     console.log('lplplplplplplplplplp')
//     console.log(resp.data)
//     // alert(resp.data.message)
//   }).catch(err => {
//     console.log('ikikikikikikikikikikiki')
//     console.log(err)
//   })


//   //   await axios.post(GLOBAL.BASE_URL+'user/sendfcm',{
//   //   jid:'6094e7b46e8d967dd5fc5fff@chat.spaarksweb.com'
//   //  },{
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //     Authorization:
//   //     token
//   //   },
//   // }
//   // ).then((resp)=>{
//   //   alert(resp.data.message)
//   // }).catch(err=>{
//   //   console.log(err)
//   // })




// }

// async function setRecMes(from, to, message, createdAt, type, chat_roster_mains, Chatdispatchers, unique) {

//   // alert(`received-${message}`)
//   // var chat_roster_mainsssss = await AsyncStorage.getItem('chat_roster_main')
//   // var chat_roster_main_parsed = JSON.parse(chat_roster_mainsssss);
//   global.Chatdispatcherss({ type: "SETMAINMESSAGE", from: from, message: message.content })
//   alert('Received')
//   console.log('UNIQUEUNIQUEUNIQUEUNIQUEUNIQUEUNIQUEUNIQUEUNIQUE', unique)
//   console.log('chat_roster_mainsMAIN', global.chat_roster_main)
//   console.log('ijijijij', chat_roster_main)
//   var d = global.chat_roster_main;
//   console.log("In ChatSpecific setRecMes", from, to, message, createdAt, type, global.chat_roster_main)
//   // console.log('chat_roster_mainss',chat_roster_mains)
//   if (global.chat_roster_main.length > 0) {
//     var b = global.chat_roster_main;
//     var this_chat = b.find(item => item.jid == from.substr(0, 44));
//     if (this_chat) {
//       console.log('this_chatthis_chatthis_chat', this_chat);
//       var a = global.chat_roster_main;
//       chat_roster_mainss = a.filter((item) => item.jid !== from.substr(0, 44));
//       if (type == 'block') {
//         this_chat.blockedMe = true;
//         this_chat.message = `Chat can't be replied anymore`
//       }
//       else if (type == 'unblock') {
//         this_chat.blockedMe = false;
//         this_chat.message = `Click to send Message`
//       }
//       else if (type == 'exit') {
//         this_chat.exitMe = true;
//         this_chat.message = `Chat can't be replied anymore`
//       }
//       else if (type == 'resume') {
//         this_chat.exitMe = false;
//         this_chat.message = `Click to send Message`
//       }
//       else if (type == 'chat') {
//         this_chat.messages.splice(0, 0, {
//           content: message,
//           text: message,
//           messageType: type,
//           createdAt: Date.now(),
//           _id: Date.now() * Math.random(),
//           unique: Date.now(),
//           messageId: unique,
//           type: "chat",
//           user: {
//             _id: 1,
//           },
//         });
//         this_chat.message = message,
//           this_chat.unread++;
//       }
//       else if (type == 'image') {
//         this_chat.messages.splice(0, 0, {
//           content: message,
//           image: message,
//           messageType: type,
//           createdAt: Date.now(),
//           _id: Date.now() * Math.random(),
//           unique: Date.now(),
//           messageId: unique,
//           type: "chat",
//           user: {
//             _id: 1,
//           },
//         });
//         this_chat.message = message,
//           this_chat.unread++;
//       }
//       else if (type == 'file') {
//         this_chat.messages.splice(0, 0, {
//           content: message,
//           document: message,
//           messageType: type,
//           text: message,
//           createdAt: Date.now(),
//           _id: Date.now() * Math.random(),
//           unique: Date.now(),
//           messageId: unique,
//           type: "chat",
//           user: {
//             _id: 1,
//           },
//         });
//         this_chat.message = 'DOCUMENT',
//           this_chat.unread++;

//       } else if (type == 'deleteforboth') {
//         var foundIndex = null;
//         var i = 0;
//         var setted = false


//         if (this_chat.messages[0].messageId == unique) {

//           i = 0;
//           setted = true;
//           this_chat.messages[0].text = 'This message is deleted';
//           this_chat.messages[0].content = 'This message is deleted';
//           this_chat.messages[0].messageType = 'deleteforboths';
//           this_chat.message = 'This message is deleted';

//         } else {

//           this_chat.messages.forEach(list => {
//             console.log(list.messageId, unique, list.content)
//             if (list.messageId == unique) {

//               setted = true;
//               this_chat.messages[0].text = 'This message is deleted';
//               this_chat.messages[0].content = 'This message is deleted';
//               this_chat.messages[0].messageType = 'deleteforboths';
//               this_chat.message = 'This message is deleted';
//             } else {
//               i++;
//             }
//           })
//         }

//         // if(i==0){
//         //   isLatest = true;
//         //   chat_roster_main.forEach(list=>{
//         //     if(list.jid == route.params.jid){
//         //       list.messages = this_chat.messages;
//         //       list.message = 'This message is deleted';
//         //     }
//         //   })
//         // }

//         // this_chat.messages.forEach(list=>{
//         //   console.log(list.messageId,unique,list.content)
//         //   if(list.messageId == unique && setted == false ){
//         //     // alert(list.content)
//         //     // alert(unique)
//         //     setted = true;
//         //     list.text = message;
//         //     list.content = message;
//         //   }else{
//         //     i++;
//         //   }
//         // })
//         // if(foundIndex == 0){
//         //   alert('deleteforboth-first')
//         //   this_chat.message = message
//         // }
//       } else {

//       }
//       if (type == 'deleteforboth') {

//         setTimeout(() => {
//           this_chat.updatedAt = Date.now();
//           chat_roster_mainss.splice(0, 0, this_chat)
//           global.Chatdispatcherss({
//             type: "SETMYMESSAGEMAIN",
//             chat_roster_main: chat_roster_mainss,
//           });
//         }, 2000);
//       } else {

//         await PushNotificationIOS.addNotificationRequest({
//           id: String(Date.now()),
//           title: 'New Message from ' + this_chat.name,
//           subtitle: '',
//           body: '',
//           userInfo: {
//             messageFrom: from.substr(0, 44),
//             apnType: 'ChatSpecificScreen',
//             local: true,
//             name: this_chat.name,
//             profilePic: this_chat.profilePic
//           }
//         })

//         this_chat.updatedAt = Date.now();
//         chat_roster_mainss.splice(0, 0, this_chat)
//         global.Chatdispatcherss({
//           type: "SETMYMESSAGEMAIN",
//           chat_roster_main: chat_roster_mainss,
//         });
//       }
//     } else {
//       await axios.post(GLOBAL.BASE_URL + 'user/getchatdata', {
//         mjid: 1,
//         jid: from.substr(0, 44)
//       },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization:
//               global.token
//           },
//         }
//       ).then((resp) => {
//         console.log('New ChatNew ChatNew ChatNew Chat', resp.data)
//         var mymes = {
//           content: message,
//           text: message,
//           messageType: type,
//           createdAt: Date.now(),
//           _id: Date.now() * Math.random(),
//           unique: Date.now(),
//           messageId: unique,
//           type: "chat",
//           user: {
//             _id: 1,
//           },
//         };
//         var eachuser = {
//           _id: resp.data[0]._id,
//           aid: resp.data[0].aid,
//           blocked: resp.data[0].blocked,
//           blockedMe: resp.data[0].blockedMe,
//           canResume: resp.data[0].canResume,
//           chatExit: resp.data[0].chatExit,
//           chatExitMe: resp.data[0].chatExitMe,
//           clearChat: resp.data[0].clearChat,
//           contactMe: resp.data[0].contactMe,
//           connection: resp.data[0].connection,
//           jid: resp.data[0].jid,
//           name: resp.data[0].name,
//           message: message,
//           messages: [],
//           offline_count: 0,
//           profilePic: resp.data[0].profilePic,
//           userId: resp.data[0].userId,
//           updatedAt: Date.now(),
//         };
//         eachuser.messages.push(mymes);

//         Chatdispatcherss({
//           type: "ADDTOROSTERMAIN",
//           _id: eachuser._id,
//           aid: eachuser.aid,
//           blocked: eachuser.blocked,
//           blockedMe: eachuser.blockedMe,
//           canResume: eachuser.canResume,
//           chatExit: eachuser.chatExit,
//           chatExitMe: eachuser.chatExitMe,
//           clearChat: eachuser.clearChat,
//           contactMe: eachuser.contactMe,
//           connection: eachuser.connection,
//           jid: eachuser.jid,
//           name: eachuser.name,
//           messages: eachuser.messages,
//           message: eachuser.message,
//           unread: 1,
//           offline_count: eachuser.offline_count,
//           profilePic: eachuser.profilePic,
//           userId: eachuser.userId,
//           updatedAt: Date.now(),
//         });
//       })
//     }



//   }
//   global.chat_roster_main = d;
//   // alert(d.length)
//   // chatDis()


// }




// async function showIncoming(aid, name, profilePic) {
//   // alert(aid)
//   // return(
//   //   <>
//   //     <IncomingCallScreen aid={aid} name={name} profilePic={profilePic}/>
//   //   </>
//   // )
//   global.navigation.navigate('IncomingCallScreen', { aid: aid, name: name, profilePic: profilePic })
// }

// var whoosh = new Sound('sound.mp3', Sound.MAIN_BUNDLE, (error) => {
//   if (error) {
//     console.log('failed to load the sound', error);
//     return;
//   }
//   // loaded successfully
//   // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

//   // Play the sound with an onEnd callback

// });




// const notSelected = [
//   {

//     type: "partner",
//     image: require("../assets/partner/1.png"),
//   },
//   {
//     type: "partner",
//     image: require("../assets/partner/2.png"),
//   },
//   {
//     type: "partner",
//     image: require("../assets/partner/3.png"),
//   },
//   {
//     type: "rewards",
//     image: require("../assets/rewards/1.png"),
//   },
//   {
//     type: "rewards",
//     image: require("../assets/rewards/2.png"),
//   },

// ];
// const selected = [

//   {

//     type: "partner",
//     image: require("../assets/partner/selected/1.png"),
//   },
// ];



// VoipPushNotification.addEventListener('register', async (token) => {
//   // --- send token to your apn provider server
//   console.log("::::::::VOIP TOKEN:::w", token)

// });
// // VoipPushNotification.requestPermissions(); // --- optional, you can use another library to request permissions
// VoipPushNotification.registerVoipToken(); // --- required

// VoipPushNotification.addEventListener('register', async (token) => {
//   // --- send token to your apn provider server
//   // global.apnToken = token;
//   console.log("::::::::VOIP TOKEN:::q", token)

// });

// VoipPushNotification.addEventListener('localNotification', (notification) => {
//   // --- when user click local push
//   console.log('::::::::::::::localVOIPNotification', notification)
// });

// VoipPushNotification.addEventListener('notification', async (notification) => {
//   console.log(':::::::::::::::RemoteVOIPNotification', notification)
//   // await axios.get('http://103.27.86.33:3016/trysomething0').then((resp)=>{

//   // })
//   console.log('OnNotoficationClick', notification.getData())
//   // this.currentCallId = notification.getData().uuid
//   // setTimeout(() => {
//   //   let isActive = this.RNCallKeepData.session
//   //   if (!isActive) {
//   //     RNCallKeep.rejectCall(this.currentCallId);
//   //     RNCallKeep.endAllCalls();
//   //   }
//   // }, 5000)


//   if (VoipPushNotification.wakeupByPush) {
//     // this.doSomething()
//     // --- remember to set this static variable back to false
//     // --- since the constant are exported only at initialization time, and it will keep the same in the whole app
//     // VoipPushNotification.wakeupByPush = false;
//     // await axios.get('http://103.27.86.33:3016/trysomething1').then((resp)=>{

//     // })

//   }
//   // VoipPushNotification.onVoipNotificationCompleted(
//   //   await axios.get('http://103.27.86.33:3016/trysomething2').then((resp)=>{

//   //   })
//   // );


//   /**
//    * Local Notification Payload
//    *
//    * - `alertBody` : The message displayed in the notification alert.
//    * - `alertAction` : The "action" displayed beneath an actionable notification. Defaults to "view";
//    * - `soundName` : The sound played when the notification is fired (optional).
//    * - `category`  : The category of this notification, required for actionable notifications (optional).
//    * - `userInfo`  : An optional object containing additional notification data.
//    */
//   // VoipPushNotification.presentLocalNotification({
//   //     alertBody: "Unified TeleKom! " + notification.getMessage()
//   // });
// });



// async function handleAPNs() {
//   // VoipPushNotification.requestPermissions(); // --- optional, you can use another library to request permissions
//   VoipPushNotification.registerVoipToken(); // --- required

//   VoipPushNotification.addEventListener('register', async (token) => {
//     // --- send token to your apn provider server
//     global.apnToken = token;
//     console.log("::::::::VOIP TOKEN:::s", token)
//     await AsyncStorage.setItem('iosVoipToken', token)

//   });

//   VoipPushNotification.addEventListener('localNotification', (notification) => {
//     // --- when user click local push
//     console.log('::::::::::::::localVOIPNotification', notification)
//   });

//   VoipPushNotification.addEventListener('notification', async (notification) => {
//     console.log(':::::::::::::::RemoteVOIPNotification', notification)
//     await axios.get('http://103.27.86.33:3016/trysomething0').then((resp) => {

//     })
//     console.log('OnNotoficationClick', notification.getData())
//     // this.currentCallId = notification.getData().uuid
//     // setTimeout(() => {
//     //   let isActive = this.RNCallKeepData.session
//     //   if (!isActive) {
//     //     RNCallKeep.rejectCall(this.currentCallId);
//     //     RNCallKeep.endAllCalls();
//     //   }
//     // }, 5000)


//     if (VoipPushNotification.wakeupByPush) {
//       // this.doSomething()
//       // --- remember to set this static variable back to false
//       // --- since the constant are exported only at initialization time, and it will keep the same in the whole app
//       // VoipPushNotification.wakeupByPush = false;
//       await axios.get('http://103.27.86.33:3016/trysomething1').then((resp) => {

//       })

//     }
//     VoipPushNotification.onVoipNotificationCompleted(
//       await axios.get('http://103.27.86.33:3016/trysomething2').then((resp) => {

//       })
//     );


//     /**
//      * Local Notification Payload
//      *
//      * - `alertBody` : The message displayed in the notification alert.
//      * - `alertAction` : The "action" displayed beneath an actionable notification. Defaults to "view";
//      * - `soundName` : The sound played when the notification is fired (optional).
//      * - `category`  : The category of this notification, required for actionable notifications (optional).
//      * - `userInfo`  : An optional object containing additional notification data.
//      */
//     // VoipPushNotification.presentLocalNotification({
//     //     alertBody: "Unified TeleKom! " + notification.getMessage()
//     // });
//   });




// }



// const xmpp = client({
//   // service: "wss://chat.spaarksweb.com:5280/websocket",
//   // domain: "chat.spaarksweb.com",
//   // resource: 'example',
//   // username: "6094e7b46e8d967dd5fc5fff",
//   // password: "rEJQ1QvDN1",

//   // service: "wss://chat.spaarksweb.com:5280/websocket",
//   // domain: "chat.spaarksweb.com",
//   // resource: 'example',
//   // username: GLOBAL.JID_MAIN._W,
//   // password: GLOBAL.CHAT_PASSWORD._W

//   service: "wss://chat.spaarksweb.com:5280/websocket",
//   domain: "chat.spaarksweb.com",
//   resource: 'example',
//   username: GLOBAL.JID_MAIN._W,
//   password: GLOBAL.CHAT_PASSWORD._W
// });








// const AllFeaturesScreen = ({ navigation, askName, Userpreferences, chat_roster_main, allMapPosts, token, chat_password, jid_main, userId, refreshAfterPost, distance, sortBy, isConnected, isActive }) => {
//   // PushNotification.popInitialNotification(notification => {
//   //   console.log('okokokokokokokoko',notification)
//   //   navigation.navigate('NotificationScreen')
//   // })

//   // if(!isConnected){
//   //   alert('No Internet')
//   // }

//   const data = [
//     {
//       label: 'Sorted by distance from you',
//       text: 'Sorted by distance from you'
//     },
//     {
//       label: 'Sorted by time of posting',
//       text: 'Sorted by time of posting'
//     }
//   ];

//   global.navigation = navigation;
//   global.token = token;
//   global.chat_roster_main = chat_roster_main;



//   const refRBSheet = useRef();
//   const deleteMyPost = useRef();
//   const refRBSheets = useRef();
//   const refRBsheettt = useRef();
//   const refRBSheetss = useRef();
//   const Login = useRef();

//   const [loading, setLoading] = useState(true);
//   const [dataSourceWithin, setDataSourceWithin] = useState([]);
//   const [dataSourceBeyond, setDataSourceBeyond] = useState([]);
//   const [offsetBeyond, setOffsetBeyond] = useState(1);
//   const [offsetWithin, setOffsetWithin] = useState(1);
//   const [pendingRatings, setPendingRatings] = useState([]);
//   const [pendingWorks, setPendingWorks] = useState([]);
//   const [banners, setBanners] = useState(["https://static-content.spaarksweb.com/images/images/commons/c1.png", "https://static-content.spaarksweb.com/images/images/commons/c2.png", "https://static-content.spaarksweb.com/images/images/commons/c3.png", "https://static-content.spaarksweb.com/images/images/commons/c4.png", "https://api.spaarksweb.com/images/commons/c5.png"]);
//   const [callp, setCallPassword] = useState(null)
//   const [callid, setCallId] = useState(null)
//   const [showCreating, setShowCreating] = useState(false)
//   const [sortedDistance, setsortedDistance] = useState(5);
//   const ref = React.useRef(null);
//   useScrollToTop(ref);



//   const [checked, setChecked] = useState('first');
//   const [isSelected, setSelection] = useState(false);
//   const Chatdispatcher = useDispatch(chatReducers);
//   const ActualChatdispatcher = useDispatch(chatReducersactual);
//   async function showCount() {
//     global.chat_roster_main = chat_roster_main;
//     global.Chatdispatcherss = Chatdispatcher;

//   }
//   global.Chatdispatcherss = Chatdispatcher;



//   async function getData(navigation) {
//     global.navigation = navigation;
//     var tokenJWT = await AsyncStorage.getItem('token');
//     var jid_main = await AsyncStorage.getItem('jid_main')
//     var chat_password = await AsyncStorage.getItem('chatpassword')
//     var userIdDB = await AsyncStorage.getItem('jid_main')
//     var name = await AsyncStorage.getItem('name')


//     console.log('asasasasasasasasasasasassss', tokenJWT)



//     var latitudes = await AsyncStorage.getItem('latitude');
//     var longitudes = await AsyncStorage.getItem('longitude');

//     //   var a = await axios.post(
//     //   GLOBAL.BASE_URL+"user/post/static",
//     //   {
//     //     "latitude": Number(latitudes),
//     //     "longitude": Number(longitudes),
//     //     "radius":10000,
//     //     "category":'all',
//     //   }
//     // );
//     // console.log('Bannerssssss',a.data.data.banner)
//     // // setBanners(a.data.data.banner)

//     // var finalPosts = [];
//     // var total = 30;
//     // var remaining = 30 - a.data.data.post.slice(0, 30).length;

//     // if(remaining > 0){
//     //   finalPosts = [...a.data.data.post.slice(0, 30),...a.data.data.postBeyond.slice(0,remaining)]
//     // }

//     // if(a.data.data.post.length)
//     // setallPostsPage(a.data.data.post.slice(30))
//     // dispatch({ type: "SETPOSTS",allPosts:a.data.data.post, posts: a.data.data.post,postBeyond: a.data.data.postBeyond,banners: a.data.data.banner});
//     // Chatdispatcher({type:'SETALLPOSTS',allPosts:a.data.data.post,postBeyond: a.data.data.postBeyond,banners: a.data.data.banner})
//     if (String(tokenJWT) != "null") {
//       // Chatdispatcher({ type: 'SETMAPPOSTSALL',whatToShow:finalPosts,allMapPosts:finalPosts})
//       // console.log('In NOt Null')
//       Chatdispatcher({ type: 'SETTOKEN', token: 'Bearer ' + tokenJWT, name: name, userId: userIdDB.substr(0, 24), jid_main: jid_main, chat_password: chat_password })

//     } else {
//       // Chatdispatcher({ type: 'SETMAPPOSTSALL',whatToShow:finalPosts,allMapPosts:finalPosts})
//       Chatdispatcher({ type: 'SETTOKEN', token: null, name: 'Loading', userId: userIdDB.substr(0, 24), jid_main: jid_main, chat_password: chat_password })
//       // Chatdispatcher({type:'SETPROFILEPIC',profilePic:'https://static-content.spaarksweb.com/images/userprofile.png'})
//     }


//   }


//   async function getLinkingURI() {

//     const url = await Linking.getInitialURL();
//     console.log('------------------------------------------------s')
//     console.log('url', url.substr(15, url.length))
//     console.log('Detected', dataSourceWithin)
//     console.log('------------------------------------------------')
//   }






//   async function getProfilePic() {
//     // alert('1')
//     var tokenJWT = await AsyncStorage.getItem('token');
//     var callpassword = await AsyncStorage.getItem('callpassword');
//     var callid = await AsyncStorage.getItem('aid');
//     var name = await AsyncStorage.getItem('name');
//     var phone = await AsyncStorage.getItem('phone');

//     setCallPassword(callpassword)
//     setCallId(callid)
//     await axios.get(
//       GLOBAL.BASE_URL + "user/getprofilepic",
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             'Bearer ' + tokenJWT
//         },
//       }
//     ).then((resp) => {
//       setProfilePic(resp.data.profilePic)
//       console.log('000000000000000lll')
//       console.log(resp.data.profilePic)
//       Chatdispatcher({ type: 'SETPROFILEPIC', profilePic: resp.data.profilePic, phone: phone, name: name })
//     })
//   }


//   const [isPartner, setIsPartner] = useState(false)

//   async function registerCalls() {
//     global.navigation = navigation;
//     var jwts = await AsyncStorage.getItem('token');
//     if (jwts != "null") {
//       var isPartners = await AsyncStorage.getItem('isPartner');
//       setIsPartner(isPartners)
//       callKeepSetup()
//       handleAPNs()
//       var callpassword = await AsyncStorage.getItem('callpassword');
//       var callid = await AsyncStorage.getItem('aid');
//       handleConnect(callid, callpassword)
//     }

//   }



//   useEffect(() => {
//     global.navigation = navigation;
//     registerCalls()
//     PushNotification.configure({

//       // (optional) Called when Token is generated (iOS and Android)
//       onRegister: async function (token) {

//         // alert(token.token)
//         console.log("TOKEN:", token);
//         global.apnToken = token;
//         await AsyncStorage.setItem('iosToken', token.token)
//         // sendRegistrationToken()
//       },

//       // (required) Called when a remote is received or opened, or local notification is opened
//       onNotification: async function (notification) {
//         console.log("NOTIFICATIONINAPP:", notification);

//         // process the notification
//         if (notification.userInteraction) {
//           // alert('1')
//           if (notification.data.apnType == 'PostSpecificScreen') {
//             // alert('PostSpecificScreen')
//             console.log(GLOBAL.BASE_URL + notification.data.featureName + '/post/' + notification.data.postId)
//             await axios.get(GLOBAL.BASE_URL + notification.data.featureName + '/post/' + notification.data.postId).then((resp) => {
//               // console.log(resp)
//               navigation.navigate("PostSpecificScreensFeed", {
//                 post: resp.data,
//                 naviga: 'Market'
//               })

//             }).catch((err) => {
//               console.log(err)
//             })
//             // global.navigation.navigate('NotificationScreen')


//           } else if (notification.data.apnType == 'ChatSpecificScreen') {


//             navigation.navigate("ChatSpecificScreen", {
//               name: notification.data.name,
//               profilePic: notification.data.profilePic,
//               jid: notification.data.messageFrom,
//               connection: ['Market'],
//               xmpp: null,
//               messages: [],
//               media: [],
//               item: {
//                 _id: notification.data.messageFrom.substr(0, 24),
//                 aid: 'NA',
//                 blocked: false,
//                 blockedMe: false,
//                 canResume: false,
//                 chatExit: false,
//                 chatExitMe: false,
//                 clearChat: -1,
//                 contactMe: true,
//                 connection: ["Market"],
//                 jid: notification.data.messageFrom,
//                 name: notification.data.name,
//                 offline_count: 0,
//                 profilePic: notification.data.profilePic,
//                 userId: notification.data.messageFrom.substr(0, 24),
//                 messages: [],
//                 message: "",
//                 unread: 0,
//                 photos: [],
//                 amIAnonymous: false,
//                 isOtherAnonymous: false
//               }
//             });

//             setSpinner(false)

//           } else if (notification.data.apnType == 'HelpScreen') {
//             navigation.navigate("HelpScreen");
//           } else if (notification.data.apnType == 'PartnerScreen') {
//             navigation.navigate("spaarksPartnerScreen0");
//           } else if (notification.data.apnType == 'Greetings') {
//             navigation.navigate("GreetingsScreen");
//           } else {

//           }
//         }




//         // global.navigation.navigate('NotificationScreen')

//         // (required) Called when a remote is received or opened, or local notification is opened
//         // notification.finish(PushNotificationIOS.FetchResult.NoData);
//       },

//       // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
//       onAction: function (notification) {
//         console.log("ACTION:", notification.action);
//         console.log("NOTIFICATIONINACTION:", notification);

//         // process the action
//       },

//       // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
//       onRegistrationError: function (err) {
//         console.error(err.message, err);
//       },

//       // IOS ONLY (optional): default: all - Permissions to register.
//       permissions: {
//         alert: true,
//         badge: true,
//         sound: true,
//       },

//       // Should the initial notification be popped automatically
//       // default: true
//       popInitialNotification: true,

//       /**
//        * (optional) default: true
//        * - Specified if permissions (ios) and token (android and ios) will requested or not,
//        * - if not, you must call PushNotificationsHandler.requestPermissions() later
//        * - if you are not using remote notification or do not have Firebase installed, use this:
//        *     requestPermissions: Platform.OS === 'ios'
//        */
//       requestPermissions: true,
//     });
//     PushNotificationIOS.getInitialNotification();
//     PushNotificationIOS.setNotificationCategories([
//       {
//         id: 'userAction',
//         actions: [
//           { id: 'open', title: 'Open', options: { foreground: true } },
//           {
//             id: 'ignore',
//             title: 'Desruptivessss',
//             options: { foreground: true, destructive: true },
//           },
//           {
//             id: 'text',
//             title: 'Text Input',
//             options: { foreground: true },
//             textInput: { buttonTitle: 'Send' },
//           },
//         ],
//       },
//     ]);
//     getProfilePic()
//     getData(navigation)
//     getDataWithin()
//     getDataBeyond()
//     getRosterFromXMPP(ActualChatdispatcher, token)
//     getPendingRatings()
//     getPendingWorks()
//     setTimeout(() => {
//       callforXMPP()
//       sendRegistrationToken()
//       showCount()
//       global.chat_roster_main = chat_roster_main
//     }, 15000)

//   }, []);

//   async function callforXMPP() {
//     // alert('In Main')
//     var jwt = await AsyncStorage.getItem('token');
//     if (String(jwt) != "null") {
//       setXMPP()
//       handleConnect(callid, callp)
//       connectXMPP(chat_roster_main, ActualChatdispatcher)
//       // alert(chat_roster_main.length)
//       handleConnect(callid, callp)
//       setTimeout(() => {
//         if (GLOBAL.JID_MAIN._W != null) {
//           setPresence(GLOBAL.JID_MAIN._W)
//         }
//       }, 2000);
//     }
//   }
//   async function getPendingRatings() {
//     try {
//       var jwt = await AsyncStorage.getItem('token');
//       await axios.get(
//         `${GLOBAL.BASE_URL}market/pendingRatings`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization:
//               'Bearer ' + jwt
//           },
//         }
//       ).then((resp) => {
//         console.log('getPendingRatingswwww', resp.data.data)
//         setPendingRatings(resp.data.data)
//         // setRequestsReceived(resp.data)
//       })
//     } catch (err) {
//       console.log('--------')
//       console.log('err', err)
//       console.log('--------')
//     }

//   }

//   async function getPendingWorks() {
//     try {
//       var jwt = await AsyncStorage.getItem('token');
//       await axios.get(
//         `${GLOBAL.BASE_URL}market/pendingRatings`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization:
//               'Bearer ' + jwt
//           },
//         }
//       ).then((resp) => {
//         console.log('getPendingWorksssssssss', resp.data.data)
//         setPendingWorks(resp.data.work)
//         // if(resp.data.work.length>0){
//         //   setVisible(true);
//         // }
//       })
//     } catch (err) {
//       console.log('--------')
//       console.log('err', err)
//       console.log('--------')
//     }

//   }
//   const [showLoadMoreWithin, setLoadMoreWithin] = useState(true)
//   const [showLoadMoreBeyond, setLoadMoreBeyond] = useState(true)
//   const getDataWithin = async () => {
//     if (isConnected) {
//       setLoading(true);
//       // alert(offsetWithin)

//       var latitudes = await AsyncStorage.getItem('latitude');
//       var longitudes = await AsyncStorage.getItem('longitude');

//       var jwt = await AsyncStorage.getItem('token');
//       console.log('gtygygygygyg', jwt)
//       // alert(jwt)
//       if (String(jwt) != "null") {

//         await axios.post(
//           GLOBAL.BASE_URL + "user/post/static/within",
//           {
//             "latitude": Number(latitudes),
//             "longitude": Number(longitudes),
//             "category": 'all',
//             "page": offsetWithin,
//             "radius": sortedDistance,
//             "sortBy": sortByString
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization:
//                 'Bearer ' + jwt
//             },
//           }
//         )
//           .then(async (responseJson) => {
//             //Successful response from the API Call
//             // if(responseJson.data.data.post.length == 0){
//             //   setStopFetching(true)
//             // }
//             await axios.post(
//               GLOBAL.BASE_URL + "user/post/static/within",
//               {
//                 "latitude": Number(latitudes),
//                 "longitude": Number(longitudes),
//                 "category": 'all',
//                 "page": offsetWithin + 1,
//                 "radius": sortedDistance,
//                 "sortBy": sortByString
//               },
//               {
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization:
//                     'Bearer ' + jwt
//                 },
//               }
//             )
//               .then((responseJson) => {
//                 if (responseJson.data.data.post.length == 0) {
//                   setLoadMoreWithin(false)
//                 }

//               });

//             setOffsetWithin(offsetWithin + 1);
//             console.log('responseJsonssssssss', responseJson.data.data.post)
//             //After the response increasing the offset for the next API call.
//             setDataSourceWithin([...dataSourceWithin, ...responseJson.data.data.post]);
//             setLoading(false);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       } else {
//         // alert('In')
//         await axios.post(
//           GLOBAL.BASE_URL + "user/post/static/within",
//           {
//             "latitude": Number(latitudes),
//             "longitude": Number(longitudes),
//             "category": 'all',
//             "page": offsetWithin,
//             "radius": distance,
//             "sortBy": sortByString
//           }
//         )
//           .then(async (responseJson) => {
//             // if(responseJson.data.data.post.length == 0){
//             //   setStopFetching(true)
//             // }
//             await axios.post(
//               GLOBAL.BASE_URL + "user/post/static/within",
//               {
//                 "latitude": Number(latitudes),
//                 "longitude": Number(longitudes),
//                 "category": 'all',
//                 "page": offsetWithin + 1,
//                 "radius": sortedDistance,
//                 "sortBy": sortByString
//               }
//             )
//               .then((responseJson) => {
//                 if (responseJson.data.data.post.length == 0) {
//                   setLoadMoreWithin(false)
//                 }

//               });
//             //Successful response from the API Call
//             setOffsetWithin(offsetWithin + 1);
//             console.log('responseJsonssssssss', responseJson.data.data.post)
//             //After the response increasing the offset for the next API call.
//             setDataSourceWithin([...dataSourceWithin, ...responseJson.data.data.post]);
//             setLoading(false);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       }



//     } else {
//       Snackbar.show({
//         text: I18n.t('Check your internet'),
//         duration: Snackbar.LENGTH_LONG
//       });
//     }

//   };

//   const getDataWithinOnRefresh = async () => {
//     if (isConnected) {
//       var latitudes = await AsyncStorage.getItem('latitude');
//       var longitudes = await AsyncStorage.getItem('longitude');
//       var jwt = await AsyncStorage.getItem('token');
//       setLoading(true);
//       if (String(jwt) != "null") {
//         await axios.post(
//           GLOBAL.BASE_URL + "user/post/static/within",
//           {
//             "latitude": Number(latitudes),
//             "longitude": Number(longitudes),
//             "category": "all",
//             "page": 1,
//             "radius": sortedDistance,
//             "sortBy": sortByString

//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization:
//                 'Bearer ' + jwt
//             },
//           }
//         ).then((responseJson) => {
//           //Successful response from the API Call
//           setOffsetWithin(2);
//           if (responseJson.data.data.post.length == 0) {
//             setLoadMoreWithin(false)
//           }
//           console.log('responseJson', responseJson.data.data.post)
//           //After the response increasing the offset for the next API call.
//           setDataSourceWithin([...responseJson.data.data.post]);
//           setLoading(false);
//         })
//           .catch((error) => {
//             console.error(error);
//           });
//       } else {
//         await axios.post(
//           GLOBAL.BASE_URL + "user/post/static/within",
//           {
//             "latitude": Number(latitudes),
//             "longitude": Number(longitudes),
//             "category": "all",
//             "page": 1,
//             "radius": distance,
//             "sortBy": sortByString
//           }
//         ).then((responseJson) => {
//           //Successful response from the API Call
//           setOffsetWithin(2);
//           if (responseJson.data.data.post.length == 0) {
//             setLoadMoreWithin(false)
//           }
//           console.log('responseJson', responseJson.data.data.post)
//           //After the response increasing the offset for the next API call.
//           setDataSourceWithin([...responseJson.data.data.post]);
//           setLoading(false);
//         })
//           .catch((error) => {
//             console.error(error);
//           });
//       }

//     } else {
//       Snackbar.show({
//         text: I18n.t('Check your internet'),
//         duration: Snackbar.LENGTH_LONG
//       });
//     }

//   };
//   const [currentPageBeyondLength, setCurrentPageBeyondLength] = useState(0);
//   const [currentpageWithinLength, setCurrentPageWithinLength] = useState(1);
//   const getDataBeyondOnRefresh = async () => {

//     if (isConnected) {
//       var latitudes = await AsyncStorage.getItem('latitude');
//       var longitudes = await AsyncStorage.getItem('longitude');
//       var jwt = await AsyncStorage.getItem('token');
//       if (String(jwt) != "null") {
//         setLoading(true);
//         await axios.post(
//           GLOBAL.BASE_URL + "user/post/static/beyond",
//           {
//             "latitude": Number(latitudes),
//             "longitude": Number(longitudes),
//             "category": 'all',
//             "page": 1,
//             "radius": sortedDistance,
//             "sortBy": sortByString
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization:
//                 'Bearer ' + jwt
//             },
//           }
//         )
//           .then((responseJson) => {
//             //Successful response from the API Call
//             setOffsetBeyond(1);
//             if (responseJson.data.data.post.length == 0) {
//               setLoadMoreBeyond(false)
//             }
//             console.log('responseJson', responseJson.data.data.post)
//             //After the response increasing the offset for the next API call.
//             setDataSourceBeyond([...responseJson.data.data.post]);
//             setLoading(false);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       } else {
//         setLoading(true);
//         await axios.post(
//           GLOBAL.BASE_URL + "user/post/static/beyond",
//           {
//             "latitude": Number(latitudes),
//             "longitude": Number(longitudes),
//             "category": 'all',
//             "page": offsetBeyond,
//             "radius": distance,
//             "sortBy": sortByString
//           }
//         )
//           .then((responseJson) => {
//             //Successful response from the API Call
//             setOffsetBeyond(1);
//             if (responseJson.data.data.post.length == 0) {
//               setLoadMoreBeyond(false)
//             }
//             console.log('responseJson', responseJson.data.data.post)
//             //After the response increasing the offset for the next API call.
//             setDataSourceBeyond([...responseJson.data.data.post]);
//             setLoading(false);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       }

//     } else {
//       Snackbar.show({
//         text: I18n.t('Check your internet'),
//         duration: Snackbar.LENGTH_LONG
//       });
//     }

//   };


//   const getDataBeyond = async () => {
//     if (isConnected) {
//       setLoading(true);
//       var latitudes = await AsyncStorage.getItem('latitude');
//       var longitudes = await AsyncStorage.getItem('longitude');
//       var jwt = await AsyncStorage.getItem('token');
//       if (String(jwt) != "null") {
//         await axios.post(
//           GLOBAL.BASE_URL + "user/post/static/beyond",
//           {
//             "latitude": Number(latitudes),
//             "longitude": Number(longitudes),
//             "category": 'all',
//             "page": offsetBeyond,
//             "radius": sortedDistance,
//             "sortBy": sortByString
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization:
//                 'Bearer ' + jwt
//             },
//           }
//         )
//           .then(async (responseJson) => {
//             await axios.post(
//               GLOBAL.BASE_URL + "user/post/static/within",
//               {
//                 "latitude": Number(latitudes),
//                 "longitude": Number(longitudes),
//                 "category": 'all',
//                 "page": offsetBeyond + 1,
//                 "radius": sortedDistance,
//                 "sortBy": sortByString
//               },
//               {
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization:
//                     'Bearer ' + jwt
//                 },
//               }
//             )
//               .then((responseJson) => {
//                 if (responseJson.data.data.post.length == 0) {
//                   setLoadMoreWithin(false)
//                 }

//               });
//             setCurrentPageBeyondLength(responseJson.data.data.post.length)
//             //Successful response from the API Call
//             setOffsetBeyond(offsetBeyond + 1);
//             console.log('responseJson', responseJson.data.data.post)
//             //After the response increasing the offset for the next API call.
//             setDataSourceBeyond([...dataSourceBeyond, ...responseJson.data.data.post]);
//             setLoading(false);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       } else {
//         await axios.post(
//           GLOBAL.BASE_URL + "user/post/static/beyond",
//           {
//             "latitude": Number(latitudes),
//             "longitude": Number(longitudes),
//             "category": 'all',
//             "page": offsetBeyond,
//             "radius": distance,
//             "sortBy": sortByString
//           }
//         )
//           .then(async (responseJson) => {
//             await axios.post(
//               GLOBAL.BASE_URL + "user/post/static/beyond",
//               {
//                 "latitude": Number(latitudes),
//                 "longitude": Number(longitudes),
//                 "category": 'all',
//                 "page": offsetBeyond + 1,
//                 "radius": sortedDistance,
//                 "sortBy": sortByString
//               }
//             )
//               .then((responseJson) => {
//                 if (responseJson.data.data.post.length == 0) {
//                   setLoadMoreBeyond(false)
//                 }

//               });
//             setCurrentPageBeyondLength(responseJson.data.data.post.length)
//             //Successful response from the API Call
//             setOffsetBeyond(offsetBeyond + 1);
//             console.log('responseJson', responseJson.data.data.post)
//             //After the response increasing the offset for the next API call.
//             setDataSourceBeyond([...dataSourceBeyond, ...responseJson.data.data.post]);
//             setLoading(false);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       }

//     } else {
//       Snackbar.show({
//         text: I18n.t('Check your internet'),
//         duration: Snackbar.LENGTH_LONG
//       });
//     }

//   };


//   function onLogin(phone) {
//     console.log("phoness", phone)
//     Login.current.close();
//     navigation.navigate('VerifyOtpScreen', { phone: phone })
//   }
//   const renderPostCard = ({ item, index }) => {
//     return (
//       <PostCard
//         item={item}
//         index={index}
//         bookmarked={item.bookmarked}
//         banners={banners}
//         filterContent={true}
//         pendingRatings={pendingRatings}
//         pendingWorks={pendingWorks}
//         showBanner={true}
//         navigation={navigation} />
//     )
//   }
//   const renderFooterWithin = () => {
//     return (
//       //Footer View with Load More button
//       <>

//         {
//           showLoadMoreWithin ?
//             <View style={styles.footer}>

//               <TouchableOpacity
//                 activeOpacity={0.9}
//                 onPress={getDataWithin}
//                 //On Click of button calling getData function to load more data
//                 style={styles.loadMoreBtn}>
//                 <Text style={styles.btnText}>Load More</Text>
//                 {loading ? (
//                   <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
//                 ) : null}
//               </TouchableOpacity>

//             </View>
//             : <>
//               <View style={{ justifyContent: 'center' }}>
//                 {/* <Text style={{textAlign:'center'}}>No Spaarks available within</Text> */}
//               </View>
//             </>
//         }


//       </>
//     );
//   };

//   const renderFooterBeyond = () => {
//     return (
//       //Footer View with Load More button
//       <>
//         {
//           showLoadMoreBeyond ?
//             <View style={styles.footer}>
//               <TouchableOpacity
//                 activeOpacity={0.9}
//                 onPress={getDataBeyond}
//                 //On Click of button calling getData function to load more data
//                 style={styles.loadMoreBtn}>
//                 <Text style={styles.btnText}>Load More</Text>
//                 {loading ? (
//                   <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
//                 ) : null}
//               </TouchableOpacity>
//             </View>
//             : <>
//               <View style={{ justifyContent: 'center', backgroundColor: '#f2f2f2' }}>
//                 <Text style={{ textAlign: 'center' }}>{I18n.t("No Spaarks beyond")}</Text>
//               </View>
//             </>
//         }
//       </>
//     );
//   };

//   const [sortBys, setSortBy] = useState(true)
//   const [sortByString, setSortByString] = useState('Distance')
//   async function setSortBys(a) {
//     if (a) {
//       setSortBy(true)
//       setSortByString('Distance')
//     } else {
//       setSortBy(false)
//       setSortByString('Time')
//     }

//   }





//   async function sortNow() {
//     if (isConnected) {
//       // alert('Sorting')
//       refRBsheettt.current.close()
//       setOffsetWithin(2)
//       setOffsetBeyond(2)
//       setDataSourceWithin([])
//       setDataSourceBeyond([])
//       getDataWithinOnRefresh()
//       getDataBeyondOnRefresh()

//       Chatdispatcher({ type: "SETSORTBY", distance: sortedDistance, sortBy: sortByString, sortApplied: true })

//       setTimeout(() => {
//         Chatdispatcher({ type: 'SETSORTCHANGED', sortApplied: false })
//       }, 1000);

//     } else {
//       Snackbar.show({
//         text: I18n.t('Check your internet'),
//         duration: Snackbar.LENGTH_LONG
//       });
//     }
//   }


//   async function carouselRewards() {

//     var jwt = await AsyncStorage.getItem('token');
//     if (String(jwt) != "null") {
//       navigation.navigate('KnowMoreRewardsScreen')
//     } else {

//       Login.current.open()
//     }


//   }
//   async function carouselPartner() {

//     var jwt = await AsyncStorage.getItem('token');
//     if (String(jwt) != "null") {
//       navigation.navigate('spaarksPartnerScreen0')
//     } else {

//       Login.current.open()
//     }


//   }

//   const _carouselViewTop = ({ item }) => {

//     return (
//       <View style={{ margin: 0 }}>
//         {
//           item.type == 'partner' ?
//             // <TouchableOpacity onPress={()=>navigation.push('spaarksPartnerScreen0')}>
//             <TouchableOpacity onPress={() => carouselPartner()}>

//               <Image source={item.image} style={{ height: 130, width: Dimensions.get('window').width, resizeMode: 'contain', justifyContent: "center", alignItems: "center" }} placeholderStyle={{ backgroundColor: '#fff' }}
//               ></Image>
//             </TouchableOpacity>
//             :
//             // <TouchableOpacity onPress={()=>navigation.navigate('RewardsScreen')}>
//             <TouchableOpacity onPress={() => carouselRewards()}>

//               <Image source={item.image} style={{ height: 130, width: Dimensions.get('window').width, resizeMode: 'contain', justifyContent: "center", alignItems: "center" }} placeholderStyle={{ backgroundColor: '#fff' }}
//               ></Image>
//             </TouchableOpacity>
//         }

//       </View>
//     )
//   }






//   async function openFilter() {
//     registerCalls()
//     showCount()
//     refRBsheettt.current.open()
//   }
//   const [visible, setVisible] = useState(false);




//   async function onSearch() {
//     registerCalls()
//     showCount()
//     navigation.navigate('SearchScreen')
//     // navigation.navigate('GreetingsScreen')

//   }




//   async function showCreat() {
//     setTimeout(() => {
//       setShowCreating(false)
//     }, 2000);
//   }
//   if (refreshAfterPost) {
//     Chatdispatcher({ type: 'REFRESHAFTERPOSTING', refreshAfterPost: false })
//     setTimeout(() => {
//       setShowCreating(true)
//       getDataWithinOnRefresh()
//       showCreat()
//       // setRefreshAfterPosts(false)
//     }, 2000);

//   }
//   const onRefresh = React.useCallback(async () => {
//     // setRefreshing(true);
//     // getData()
//     getDataWithinOnRefresh()
//     getDataBeyondOnRefresh()
//     getPendingRatings()
//     getPendingWorks()
//     wait(2000).then(() => setRefreshing(false));
//   }, []);



//   const [refreshing, setRefreshing] = React.useState(false);
//   return (
//     <SafeAreaView>
// <ScrollView ref={ref}
// refreshControl={
//   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
// }
// >
// <View style={{ backgroundColor: "#f2f2f2" }}>
//   <RBSheet
//     ref={refRBsheettt}
//     closeOnDragDown={true}
//     closeOnPressMask={true}
//     height={350}
//     borderRadius={0}
//     closeDuration={100}
//     customStyles={{
//       draggableIcon: {
//         backgroundColor: "#000",
//       },
//       container: {
//         borderRadius: 0,
//       },
//     }}
//   >
//     <View style={{ backgroundColor: "#fff", height: 330 }}>

//       <Text style={{ marginLeft: 20, fontWeight: '500', fontSize: 20, paddingBottom: 14 }}>{I18n.t("Filter Spaarks by")}
//         <Text style={{ color: '#6FA4E9' }}> {sortedDistance.toFixed(0)}Km
//         </Text></Text>

//       <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingRight: 10, paddingLeft: 10 }}>
//         <View style={{ flex: 1, justifyContent: 'center', marginTop: 10 }}>


//           <Slider
//             style={{ width: 350, height: 30 }}
//             minimumValue={1}
//             value={sortedDistance}
//             onValueChange={setsortedDistance}
//             maximumValue={5}
//             minimumTrackTintColor="#6FA4E9"
//             maximumTrackTintColor="#9597A1"
//             step='1'
//           />


//         </View>

//       </View>
//       <View style={{ marginTop: 10 }}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, paddingRight: 9, paddingLeft: 9, margin: 10 }}>
//           <Text>1km</Text>
//           <Text>2km</Text>
//           <Text>3km</Text>
//           <Text>4km</Text>
//           <Text>5km</Text>

//         </View>
//         <View
//           style={{
//             borderBottomColor: '#C0C0C0',
//             borderBottomWidth: 1,
//             width: 370,
//             marginLeft: 10,
//             marginRight: 10,
//           }}
//         />

//       </View>


//       <View>

//         <View style={{ flexDirection: 'column', padding: 10 }}>
//           <View style={{ flexDirection: 'row' }}>
//             <View style={{ flex: 4 }} >
//               <Text style={{ fontWeight: '500', fontSize: 16, left: 15 }}>{I18n.t("Nearest Spaarks")}</Text>
//               <Text style={{ fontSize: 14, color: '#A1A4B2', left: 15, top: 6, fontWeight: '400' }}>{I18n.t("Spaarks are sorted by distance from you")}</Text>
//             </View>
//             <View style={{ flex: 1 }}>
//               <TouchableOpacity onPress={() => setSortBys(1)}>
//                 {
//                   sortBys ?
//                     <Image source={require('../assets/checked.png')} style={{ height: 40, width: 40 }} /> :
//                     <Image source={require('../assets/unchecked.png')} style={{ height: 40, width: 40 }} />
//                 }


//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* <View
//                     style={{
//                       borderBottomColor: '#C0C0C0',
//                       borderBottomWidth: 1,
//                       width: 370, 
//                       marginLeft: 10,
//                       marginRight: 10,
//                       margin:10
//                     }}
//                   /> */}
//           <View
//             style={{
//               borderBottomColor: '#C0C0C0',
//               borderBottomWidth: 1,
//               width: 370,
//               marginLeft: 10,
//               marginRight: 10,
//               margin: 10
//             }}
//           />
//           <View style={{ flexDirection: 'row' }}>
//             <View style={{ flex: 4 }} >
//               <Text style={{ fontWeight: '500', fontSize: 16, left: 15 }}>{I18n.t("Latest Spaarks")}</Text>
//               <Text style={{ fontSize: 14, color: '#A1A4B2', left: 15, top: 6, fontWeight: '400' }}>{I18n.t("Spaarks are sorted by time of posting")}</Text>
//             </View>
//             <View style={{ flex: 1 }}>
//               <TouchableOpacity onPress={() => setSortBys(0)}>
//                 {
//                   sortBys ?
//                     <Image source={require('../assets/unchecked.png')} style={{ height: 40, width: 40 }} /> :
//                     <Image source={require('../assets/checked.png')} style={{ height: 40, width: 40 }} />
//                 }
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>




//       </View>



//       {/* <View>

//                 <Text style={{marginLeft: 20, fontWeight:'300', fontSize: 18}}>Time</Text>
//                 <View style={{flexDirection:'row', top: 10}}>
//                 <Text style={{marginLeft: 20, fontWeight:'200', fontSize: 14}}>Your Spaarks feed is sorted by time of posting{'      '}</Text>
//                 <BouncyCheckbox
//                   size={25}
//                   fillColor="#6FA4E9"
//                   unfillColor="#FFFFFF"
//                   iconStyle={{ borderColor: "blue"}}
//                   // textStyle={{ fontFamily: "JosefinSans-Regular" }}

//                   />
//                   </View> 

//               </View> */}


//       <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//         <TouchableOpacity onPress={() => sortNow()}>
//           <Button
//             mode="contained"
//             color="#6FA4E9"
//             style={{
//               height: 40,
//               width: 300,
//               margin: 10,
//               marginTop: 10,

//               marginBottom: 20
//             }}

//           >
//             <Text style={{ color: '#fff' }}>{I18n.t("SORT")}</Text>
//           </Button>
//         </TouchableOpacity>
//       </View>
//     </View>


//   </RBSheet>

// </View>

// <View style={{ backgroundColor: '#f2f2f2', padding: showCreating ? 10 : 0 }}>
//   <TouchableOpacity>

//     {
//       showCreating ?
//         <View style={{ flexDirection: 'row' }}>
//           <Image source={require('../assets/uploading.gif')} style={{ height: 60, width: 60 }} />
//           <Text h6 style={{ fontWeight: "bold", marginTop: 15 }}>
//             Your Spaark is being created hold tight...
//           </Text>
//         </View>

//         : <></>
//     }
//   </TouchableOpacity>
// </View>
// <View style={{ backgroundColor: '#f2f2f2' }}>

//   <Carousel
//     ref={(c) => { _carousel = c; }}
//     data={isPartner == "true" ? selected : notSelected}

//     renderItem={_carouselViewTop}
//     autoplay={true}
//     layout={'default'}
//     loop={true}
//     autoplayInterval={2000}
//     sliderWidth={Dimensions.get('window').width}
//     // sliderHeight={170}
//     itemWidth={Dimensions.get('window').width}
//   />
// </View>
// <View style={{ backgroundColor: '#f2f2f2' }}>
//   <View style={{ flexDirection: 'row' }}>
//     {/* <SpaarksHeading within={true}/> */}
//     {
//       true ?
//         <View style={{ flexDirection: "row" }}>
//           <Text style={{ fontWeight: "bold", margin: 0, fontSize: 16, padding: 10 }}>{'  '}{I18n.t('Spaarks')} within <Text style={{ color: '#6FA4E9' }}>{distance.toFixed(0)}Km</Text></Text>
//           <View>

//             <TouchableOpacity onPress={() => openFilter()}>
//               <Image source={require('../assets/filter.png')} style={{ height: 25, width: 25, marginTop: 5 }}></Image>
//             </TouchableOpacity>
//           </View>



//         </View>
//         :
//         <View>
//           <Text style={{ fontWeight: "bold", margin: 0, fontSize: 16 }}> {'  '}{I18n.t('Spaarks')} beyond <Text style={{ color: '#6FA4E9' }}>{distance.toFixed(0)}Km</Text></Text>
//         </View>

//     }
//     <TouchableOpacity onPress={() => onSearch()}>

//       <View style={{ flex: 0, marginLeft: 10, marginTop: 0, left: Dimensions.get('window').width / 2 - 80 }}>
//         <Image
//           source={require("../assets/search-bg.png")}
//           style={{ height: 30, width: 30 }}
//         ></Image>
//       </View>
//       {/* <View style={{ flex: 0, marginLeft: 10, marginTop: 0,left:10 }}>
// <Text>Show on Map</Text>
// </View> */}
//     </TouchableOpacity>
//   </View>
// </View>





// <View style={{ backgroundColor: "#f2f2f2" }}>
//   <FlatList
//     data={dataSourceWithin}
//     keyExtractor={(item, index) => index.toString()}
//     // enableEmptySections={true}
//     renderItem={renderPostCard}
//     ListFooterComponent={renderFooterWithin}
//   />
// </View>
// <View style={{ backgroundColor: '#f2f2f2', paddingTop: 0 }}>
//   <View style={{ flexDirection: 'row' }}>
//     <SpaarksHeading within={false} />
//   </View>
// </View>
// <View style={{ backgroundColor: "#f2f2f2" }}>
//   <FlatList
//     data={dataSourceBeyond}
//     keyExtractor={(item, index) => index.toString()}
//     // enableEmptySections={true}
//     renderItem={renderPostCard}
//     ListFooterComponent={renderFooterBeyond}
//   />
// </View>
// </ScrollView>

//     </SafeAreaView>
//   );
// };


// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center"
//   },
//   searchBox: {
//     position: "relative",
//     marginTop: Platform.OS === "ios" ? 5 : 20,
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     width: "100%",
//     alignSelf: "center",
//     borderColor: "#d7d7d7",
//     borderRadius: 20,
//     padding: 10,
//     shadowColor: "#ccc",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.5,
//     shadowRadius: 5,
//   },
//   chats: {
//     height: 30,
//     width: 30,
//     margin: 23,
//   },
//   chatss: {
//     height: 30,
//     width: 30,
//     margin: 32,
//   },
//   eachCard: {
//     padding: 0,
//     backgroundColor: "#fff",
//     marginBottom: 10,
//     marginTop: 0
//   },
//   BottomNav: {
//     flex: 0,
//     flexDirection: "row",
//     backgroundColor: "#63CDFF",
//   },
//   LoginComponent: {
//     height: 500,
//     width: 100,
//     margin: 50,
//   },
//   container: {

//     backgroundColor: "#f2f2f2",
//   },

//   input: {
//     width: 200,
//     height: 44,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "black",
//     marginBottom: 10,
//   },
//   tinyLogo: {
//     flex: 0,
//     height: 120,
//     width: 120,
//     margin: 20,
//   },
//   rows1: {
//     flex: 0,
//     flexDirection: "row",
//   },
//   image: {
//     resizeMode: "cover",
//     justifyContent: "center",
//   },
//   bgimage: {
//     resizeMode: "repeat",
//     justifyContent: "center",
//   },
//   rows2: {
//     flex: 0,
//     flexDirection: "row",
//   },
//   scrollView: {},
//   engine: {
//     position: "absolute",
//     right: 0,
//   },
//   body: {
//     height: 1000,
//     backgroundColor: "#f2f2f2",
//   },
//   sectionContainercol: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//     width: 200,
//     height: 100,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     padding: 8,
//     textAlign: "center",
//     fontSize: 24,
//     fontWeight: "600",
//     color: "#ffffff",
//     fontWeight: "700",
//   },
//   sectionDescription: {
//     textAlign: "center",
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: "400",
//     color: "#ffffff",
//   },

//   sectionDescriptions: {
//     textAlign: "center",
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: "400",
//   },
//   highlight: {
//     fontWeight: "700",
//   },
//   footer: {
//     fontSize: 12,
//     fontWeight: "600",
//     padding: 4,
//     paddingRight: 12,
//     justifyContent: 'center',
//     textAlign: "right",
//   },

//   buttonSelected: {
//     opacity: 1,
//     color: "red",
//   },
//   customSlide: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   customImage: {
//     width: 390,
//     height: 500,
//     resizeMode: "cover",
//   },
//   chip: {
//     backgroundColor: "#FA6E5A",
//     margin: 0,
//     height: 25,
//     width: 80,
//   },
//   chips: {
//     backgroundColor: "#6FA4E9",
//     margin: 2,
//     height: 30,
//     width: 100,
//   },
//   chipText: {
//     color: "#fff",
//   },
//   chipTexts: {
//     color: "#000",
//   },
//   video: {
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     marginTop: 140,
//     width: 360,
//     height: 250,
//     resizeMode: "contain"
//   },
//   separator: {
//     height: 0.5,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   text: {
//     fontSize: 15,
//     color: 'black',
//   },
//   footer: {
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   loadMoreBtn: {
//     padding: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnText: {
//     color: '#6FA4E9',
//     fontSize: 15,
//     textAlign: 'center',
//   },



// });


// const mapStatetoProps = (state) => {
//   // const { }=state
//   return {
//     chat_roster_main: state.chatss.chat_roster_main,
//     allMapPosts: state.chatss.allMapPosts,
//     token: state.chatss.token,
//     chat_password: state.chatss.chat_password,
//     jid_main: state.chatss.jid_main,
//     userId: state.chatss.userId,
//     refreshAfterPost: state.chatss.refreshAfterPost,
//     distance: state.chatss.distance,
//     sortBy: state.chatss.sortBy,
//     Userpreferences: state.chatss.preferences,
//     askName: state.chatss.askName,
//     isConnected: state.chatss.isConnected
//   };
// };
// exports.setRecMes = setRecMes;
// exports.showIncoming = showIncoming;
// exports.updateChat = updateChat;
// // exports.finalXMPP = finalXMPP;
// export default connect(mapStatetoProps)(AllFeaturesScreen);






import React, { useEffect, setState, useRef, useCallback, useState } from "react";
import { TabRouter, useTheme } from "@react-navigation/native";
import { useScrollToTop } from '@react-navigation/native';

import {
  Share,
  Image,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Colors,
  ScrollView,
  Pressable,
  ImageBackground,
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  DevSettings,
  TextInput,
  Alert,
  Dimensions,
  TouchableHighlight,
  LogBox,
  Linking,
  FlatList,
  Platforms,
  Modal,
  Animated
} from "react-native";
// import { Slider } from 'react-native-elements';
import Slider from '@react-native-community/slider';
// import BackgroundTask from 'react-native-background-task'
import RNLocation from 'react-native-location';
import RNCallKeep from 'react-native-callkeep';
import axios from "axios";
import { client, xml } from "@xmpp/client";
import debug from "@xmpp/debug";
import JsSIP from 'jssip'
import ViewShot from "react-native-view-shot";
import { Rating, AirbnbRating, Divider } from "react-native-elements";
import { canPost } from './authGuard'
import { connect, useDispatch, useReducer } from "react-redux";
import { connectXMPP, setXMPP, addListeners, getRosterMain, setMess, testing, getRosterFromXMPP, setPresence, confirmlogout } from './xmpp';
import chatReducers from "../reducers/chatReducers";
import chatReducersactual from "../reducers/chatReducersactual";
import { callKeepSetup, handleConnect } from './OutGoingCallScreen'
import Star from 'react-native-star-view';
LogBox.ignoreAllLogs();
// import { Video, AVPlaybackStatus } from 'expo-av';
import moment from "moment";
import Carousel from 'react-native-snap-carousel';
import { Text, BottomSheet, ListItem } from "react-native-elements";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { checkNotifications } from 'react-native-permissions';
import AsyncStorage from "@react-native-community/async-storage";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from "react-native-push-notification";
import VoipPushNotification from 'react-native-voip-push-notification';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from '../src/i18n';


// import RangeSlider from 'react-native-range-slider'
// import RangeSlider from 'rn-range-slider';
// import Slider from "@react-native-community/slidfer";

const isIOS = Platform.OS === 'ios';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
  Chip,
  RadioButton,

} from "react-native-paper";
import Dialog from "react-native-dialog";
import Snackbar from 'react-native-snackbar';
import RBSheet from "react-native-raw-bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatSpecificScreen from "./ChatSpecificScreen";
import OnBoardingScreen from "./OnBoardingScreen";
import Hyperlink from 'react-native-hyperlink'
import RNUrlPreview from 'react-native-url-preview';
import Video from 'react-native-video';
import InCallManager from 'react-native-incall-manager';
import Sound from 'react-native-sound';
import { stat } from "react-native-fs";
import ImageViewScreen from "./ImageViewScreen";
import PostCard from "../components/PostCard";
import SpaarksHeading from "../components/SpaarksHeading"
import IncomingCallScreen from "./IncomingCallScreen";
// import {xmpp} from './xmpp'
const GLOBAL = require('../Globals');
const Stack = createStackNavigator();
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};



const indexes = [4, 8, 12, 16, 20, 24]
global.postcurrent = ['0'];
global.navigation = null
global.type = 'within';
global.token = 'null';
global.chat_roster_main = [];
global.Chatdispatcherss = null;
global.apnToken = null;
async function updateChat(chat_roster_mains) {

  global.Chatdispatcherss({
    type: "SETMYMESSAGEMAIN",
    chat_roster_main: chat_roster_mains,
  });

}

PushNotificationIOS.requestPermissions().then(
  (data) => {
    console.log("PushNotificationIOS.requestPermissions", data);
  },
  (data) => {
    console.log("PushNotificationIOS.requestPermissions failed", data);
  }
);


async function sendRegistrationToken() {
  var jwt = await AsyncStorage.getItem('token');
  var iosToken = await AsyncStorage.getItem('iosToken');
  var iosVoipToken = await AsyncStorage.getItem('iosVoipToken');



  console.log('iosTokeniosTokeniosTokeniosTokeniosTokeniosToken', iosToken)
  console.log('iosVoipTokeniosVoipTokeniosVoipTokeniosVoipTokenwewewewe', iosVoipToken)
  await axios.post(GLOBAL.BASE_URL + 'user/saveregistrationtoken', {
    registrationToken: iosToken
  }, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        'Bearer ' + jwt
    },
  }
  ).then((resp) => {
    //  alert('Token Sent')
  }).catch(err => {
    console.log('ikikikikikikikikikikiki')
    console.log(err)
  })

  await axios.post(GLOBAL.BASE_URL + 'user/saveregistrationtokeniOS', {
    registrationToken: iosVoipToken
  }, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        'Bearer ' + jwt
    },
  }
  ).then((resp) => {
    console.log('lplplplplplplplplplp')
    console.log(resp.data)
    // alert(resp.data.message)
  }).catch(err => {
    console.log('ikikikikikikikikikikiki')
    console.log(err)
  })


  //   await axios.post(GLOBAL.BASE_URL+'user/sendfcm',{
  //   jid:'6094e7b46e8d967dd5fc5fff@chat.spaarksweb.com'
  //  },{
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization:
  //     token
  //   },
  // }
  // ).then((resp)=>{
  //   alert(resp.data.message)
  // }).catch(err=>{
  //   console.log(err)
  // })




}

async function setRecMes(from, to, message, createdAt, type, chat_roster_mains, Chatdispatchers, unique) {

  // alert(`received-${message}`)
  // var chat_roster_mainsssss = await AsyncStorage.getItem('chat_roster_main')
  // var chat_roster_main_parsed = JSON.parse(chat_roster_mainsssss);
  global.Chatdispatcherss({ type: "SETMAINMESSAGE", from: from, message: message.content })
  alert('Received')
  console.log('UNIQUEUNIQUEUNIQUEUNIQUEUNIQUEUNIQUEUNIQUEUNIQUE', unique)
  console.log('chat_roster_mainsMAIN', global.chat_roster_main)
  console.log('ijijijij', chat_roster_main)
  var d = global.chat_roster_main;
  console.log("In ChatSpecific setRecMes", from, to, message, createdAt, type, global.chat_roster_main)
  // console.log('chat_roster_mainss',chat_roster_mains)
  if (global.chat_roster_main.length > 0) {
    var b = global.chat_roster_main;
    var this_chat = b.find(item => item.jid == from.substr(0, 44));
    if (this_chat) {
      console.log('this_chatthis_chatthis_chat', this_chat);
      var a = global.chat_roster_main;
      chat_roster_mainss = a.filter((item) => item.jid !== from.substr(0, 44));
      if (type == 'block') {
        this_chat.blockedMe = true;
        this_chat.message = `Chat can't be replied anymore`
      }
      else if (type == 'unblock') {
        this_chat.blockedMe = false;
        this_chat.message = `Click to send Message`
      }
      else if (type == 'exit') {
        this_chat.exitMe = true;
        this_chat.message = `Chat can't be replied anymore`
      }
      else if (type == 'resume') {
        this_chat.exitMe = false;
        this_chat.message = `Click to send Message`
      }
      else if (type == 'chat') {
        this_chat.messages.splice(0, 0, {
          content: message,
          text: message,
          messageType: type,
          createdAt: Date.now(),
          _id: Date.now() * Math.random(),
          unique: Date.now(),
          messageId: unique,
          type: "chat",
          user: {
            _id: 1,
          },
        });
        this_chat.message = message,
          this_chat.unread++;
      }
      else if (type == 'image') {
        this_chat.messages.splice(0, 0, {
          content: message,
          image: message,
          messageType: type,
          createdAt: Date.now(),
          _id: Date.now() * Math.random(),
          unique: Date.now(),
          messageId: unique,
          type: "chat",
          user: {
            _id: 1,
          },
        });
        this_chat.message = message,
          this_chat.unread++;
      }
      else if (type == 'file') {
        this_chat.messages.splice(0, 0, {
          content: message,
          document: message,
          messageType: type,
          text: message,
          createdAt: Date.now(),
          _id: Date.now() * Math.random(),
          unique: Date.now(),
          messageId: unique,
          type: "chat",
          user: {
            _id: 1,
          },
        });
        this_chat.message = 'DOCUMENT',
          this_chat.unread++;

      } else if (type == 'deleteforboth') {
        var foundIndex = null;
        var i = 0;
        var setted = false


        if (this_chat.messages[0].messageId == unique) {

          i = 0;
          setted = true;
          this_chat.messages[0].text = 'This message is deleted';
          this_chat.messages[0].content = 'This message is deleted';
          this_chat.messages[0].messageType = 'deleteforboths';
          this_chat.message = 'This message is deleted';

        } else {

          this_chat.messages.forEach(list => {
            console.log(list.messageId, unique, list.content)
            if (list.messageId == unique) {

              setted = true;
              this_chat.messages[0].text = 'This message is deleted';
              this_chat.messages[0].content = 'This message is deleted';
              this_chat.messages[0].messageType = 'deleteforboths';
              this_chat.message = 'This message is deleted';
            } else {
              i++;
            }
          })
        }

        // if(i==0){
        //   isLatest = true;
        //   chat_roster_main.forEach(list=>{
        //     if(list.jid == route.params.jid){
        //       list.messages = this_chat.messages;
        //       list.message = 'This message is deleted';
        //     }
        //   })
        // }

        // this_chat.messages.forEach(list=>{
        //   console.log(list.messageId,unique,list.content)
        //   if(list.messageId == unique && setted == false ){
        //     // alert(list.content)
        //     // alert(unique)
        //     setted = true;
        //     list.text = message;
        //     list.content = message;
        //   }else{
        //     i++;
        //   }
        // })
        // if(foundIndex == 0){
        //   alert('deleteforboth-first')
        //   this_chat.message = message
        // }
      } else {

      }
      if (type == 'deleteforboth') {

        setTimeout(() => {
          this_chat.updatedAt = Date.now();
          chat_roster_mainss.splice(0, 0, this_chat)
          global.Chatdispatcherss({
            type: "SETMYMESSAGEMAIN",
            chat_roster_main: chat_roster_mainss,
          });
        }, 2000);
      } else {

        await PushNotificationIOS.addNotificationRequest({
          id: String(Date.now()),
          title: 'New Message from ' + this_chat.name,
          subtitle: '',
          body: '',
          userInfo: {
            messageFrom: from.substr(0, 44),
            apnType: 'ChatSpecificScreen',
            local: true,
            name: this_chat.name,
            profilePic: this_chat.profilePic
          }
        })

        this_chat.updatedAt = Date.now();
        chat_roster_mainss.splice(0, 0, this_chat)
        global.Chatdispatcherss({
          type: "SETMYMESSAGEMAIN",
          chat_roster_main: chat_roster_mainss,
        });
      }
    } else {
      await axios.post(GLOBAL.BASE_URL + 'user/getchatdata', {
        mjid: 1,
        jid: from.substr(0, 44)
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              global.token
          },
        }
      ).then((resp) => {
        console.log('New ChatNew ChatNew ChatNew Chat', resp.data)
        var mymes = {
          content: message,
          text: message,
          messageType: type,
          createdAt: Date.now(),
          _id: Date.now() * Math.random(),
          unique: Date.now(),
          messageId: unique,
          type: "chat",
          user: {
            _id: 1,
          },
        };
        var eachuser = {
          _id: resp.data[0]._id,
          aid: resp.data[0].aid,
          blocked: resp.data[0].blocked,
          blockedMe: resp.data[0].blockedMe,
          canResume: resp.data[0].canResume,
          chatExit: resp.data[0].chatExit,
          chatExitMe: resp.data[0].chatExitMe,
          clearChat: resp.data[0].clearChat,
          contactMe: resp.data[0].contactMe,
          connection: resp.data[0].connection,
          jid: resp.data[0].jid,
          name: resp.data[0].name,
          message: message,
          messages: [],
          offline_count: 0,
          profilePic: resp.data[0].profilePic,
          userId: resp.data[0].userId,
          updatedAt: Date.now(),
        };
        eachuser.messages.push(mymes);

        Chatdispatcherss({
          type: "ADDTOROSTERMAIN",
          _id: eachuser._id,
          aid: eachuser.aid,
          blocked: eachuser.blocked,
          blockedMe: eachuser.blockedMe,
          canResume: eachuser.canResume,
          chatExit: eachuser.chatExit,
          chatExitMe: eachuser.chatExitMe,
          clearChat: eachuser.clearChat,
          contactMe: eachuser.contactMe,
          connection: eachuser.connection,
          jid: eachuser.jid,
          name: eachuser.name,
          messages: eachuser.messages,
          message: eachuser.message,
          unread: 1,
          offline_count: eachuser.offline_count,
          profilePic: eachuser.profilePic,
          userId: eachuser.userId,
          updatedAt: Date.now(),
        });
      })
    }



  }
  global.chat_roster_main = d;
  // alert(d.length)
  // chatDis()


}




async function showIncoming(aid, name, profilePic) {
  // alert(aid)
  // return(
  //   <>
  //     <IncomingCallScreen aid={aid} name={name} profilePic={profilePic}/>
  //   </>
  // )
  global.navigation.navigate('IncomingCallScreen', { aid: aid, name: name, profilePic: profilePic })
}

var whoosh = new Sound('sound.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

  // Play the sound with an onEnd callback

});




const notSelected = [
  {

    type: "partner",
    image: require("../assets/partner/1.png"),
  },
  {
    type: "partner",
    image: require("../assets/partner/2.png"),
  },
  {
    type: "partner",
    image: require("../assets/partner/3.png"),
  },
  {
    type: "rewards",
    image: require("../assets/rewards/1.png"),
  },
  {
    type: "rewards",
    image: require("../assets/rewards/2.png"),
  },

];
const selected = [

  {

    type: "partner",
    image: require("../assets/partner/selected/1.png"),
  },
];



VoipPushNotification.addEventListener('register', async (token) => {
  // --- send token to your apn provider server
  console.log("::::::::VOIP TOKEN:::w", token)

});
// VoipPushNotification.requestPermissions(); // --- optional, you can use another library to request permissions
VoipPushNotification.registerVoipToken(); // --- required

VoipPushNotification.addEventListener('register', async (token) => {
  // --- send token to your apn provider server
  // global.apnToken = token;
  console.log("::::::::VOIP TOKEN:::q", token)

});

VoipPushNotification.addEventListener('localNotification', (notification) => {
  // --- when user click local push
  console.log('::::::::::::::localVOIPNotification', notification)
});

VoipPushNotification.addEventListener('notification', async (notification) => {
  console.log(':::::::::::::::RemoteVOIPNotification', notification)
  // await axios.get('http://103.27.86.33:3016/trysomething0').then((resp)=>{

  // })
  console.log('OnNotoficationClick', notification.getData())
  // this.currentCallId = notification.getData().uuid
  // setTimeout(() => {
  //   let isActive = this.RNCallKeepData.session
  //   if (!isActive) {
  //     RNCallKeep.rejectCall(this.currentCallId);
  //     RNCallKeep.endAllCalls();
  //   }
  // }, 5000)


  if (VoipPushNotification.wakeupByPush) {
    // this.doSomething()
    // --- remember to set this static variable back to false
    // --- since the constant are exported only at initialization time, and it will keep the same in the whole app
    // VoipPushNotification.wakeupByPush = false;
    // await axios.get('http://103.27.86.33:3016/trysomething1').then((resp)=>{

    // })

  }
  // VoipPushNotification.onVoipNotificationCompleted(
  //   await axios.get('http://103.27.86.33:3016/trysomething2').then((resp)=>{

  //   })
  // );


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



async function handleAPNs() {
  // VoipPushNotification.requestPermissions(); // --- optional, you can use another library to request permissions
  VoipPushNotification.registerVoipToken(); // --- required

  VoipPushNotification.addEventListener('register', async (token) => {
    // --- send token to your apn provider server
    global.apnToken = token;
    console.log("::::::::VOIP TOKEN:::s", token)
    await AsyncStorage.setItem('iosVoipToken', token)

  });

  VoipPushNotification.addEventListener('localNotification', (notification) => {
    // --- when user click local push
    console.log('::::::::::::::localVOIPNotification', notification)
  });

  VoipPushNotification.addEventListener('notification', async (notification) => {
    console.log(':::::::::::::::RemoteVOIPNotification', notification)
    await axios.get('http://103.27.86.33:3016/trysomething0').then((resp) => {

    })
    console.log('OnNotoficationClick', notification.getData())
    // this.currentCallId = notification.getData().uuid
    // setTimeout(() => {
    //   let isActive = this.RNCallKeepData.session
    //   if (!isActive) {
    //     RNCallKeep.rejectCall(this.currentCallId);
    //     RNCallKeep.endAllCalls();
    //   }
    // }, 5000)


    if (VoipPushNotification.wakeupByPush) {
      // this.doSomething()
      // --- remember to set this static variable back to false
      // --- since the constant are exported only at initialization time, and it will keep the same in the whole app
      // VoipPushNotification.wakeupByPush = false;
      await axios.get('http://103.27.86.33:3016/trysomething1').then((resp) => {

      })

    }
    VoipPushNotification.onVoipNotificationCompleted(
      await axios.get('http://103.27.86.33:3016/trysomething2').then((resp) => {

      })
    );


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



const xmpp = client({
  // service: "wss://chat.spaarksweb.com:5280/websocket",
  // domain: "chat.spaarksweb.com",
  // resource: 'example',
  // username: "6094e7b46e8d967dd5fc5fff",
  // password: "rEJQ1QvDN1",

  // service: "wss://chat.spaarksweb.com:5280/websocket",
  // domain: "chat.spaarksweb.com",
  // resource: 'example',
  // username: GLOBAL.JID_MAIN._W,
  // password: GLOBAL.CHAT_PASSWORD._W

  service: "wss://chat.spaarksweb.com:5280/websocket",
  domain: "chat.spaarksweb.com",
  resource: 'example',
  username: GLOBAL.JID_MAIN._W,
  password: GLOBAL.CHAT_PASSWORD._W
});








const AllFeaturesScreen = ({ navigation, askName, Userpreferences, chat_roster_main, allMapPosts, token, chat_password, jid_main, userId, refreshAfterPost, distance, sortBy, isConnected, isActive }) => {
  // PushNotification.popInitialNotification(notification => {
  //   console.log('okokokokokokokoko',notification)
  //   navigation.navigate('NotificationScreen')
  // })

  // if(!isConnected){
  //   alert('No Internet')
  // }

  const data = [
    {
      label: 'Sorted by distance from you',
      text: 'Sorted by distance from you'
    },
    {
      label: 'Sorted by time of posting',
      text: 'Sorted by time of posting'
    }
  ];

  global.navigation = navigation;
  global.token = token;
  global.chat_roster_main = chat_roster_main;



  const refRBSheet = useRef();
  const deleteMyPost = useRef();
  const refRBSheets = useRef();
  const refRBsheettt = useRef();
  const refRBSheetss = useRef();
  const Login = useRef();

  const [loading, setLoading] = useState(true);
  const [dataSourceWithin, setDataSourceWithin] = useState([]);
  const [dataSourceBeyond, setDataSourceBeyond] = useState([]);
  const [offsetBeyond, setOffsetBeyond] = useState(1);
  const [offsetWithin, setOffsetWithin] = useState(1);
  const [pendingRatings, setPendingRatings] = useState([]);
  const [pendingWorks, setPendingWorks] = useState([]);
  const [banners, setBanners] = useState(["https://static-content.spaarksweb.com/images/images/commons/c1.png", "https://static-content.spaarksweb.com/images/images/commons/c2.png", "https://static-content.spaarksweb.com/images/images/commons/c3.png", "https://static-content.spaarksweb.com/images/images/commons/c4.png", "https://api.spaarksweb.com/images/commons/c5.png"]);
  const [callp, setCallPassword] = useState(null)
  const [callid, setCallId] = useState(null)
  const [showCreating, setShowCreating] = useState(false)
  const [sortedDistance, setsortedDistance] = useState(5);
  const ref = React.useRef(null);
  useScrollToTop(ref);



  const [checked, setChecked] = useState('first');
  const [isSelected, setSelection] = useState(false);
  const Chatdispatcher = useDispatch(chatReducers);
  const ActualChatdispatcher = useDispatch(chatReducersactual);
  async function showCount() {
    global.chat_roster_main = chat_roster_main;
    global.Chatdispatcherss = Chatdispatcher;

  }
  global.Chatdispatcherss = Chatdispatcher;



  async function getData(navigation) {
    global.navigation = navigation;
    var tokenJWT = await AsyncStorage.getItem('token');
    var jid_main = await AsyncStorage.getItem('jid_main')
    var chat_password = await AsyncStorage.getItem('chatpassword')
    var userIdDB = await AsyncStorage.getItem('jid_main')
    var name = await AsyncStorage.getItem('name')


    console.log('asasasasasasasasasasasassss', tokenJWT)



    var latitudes = await AsyncStorage.getItem('latitude');
    var longitudes = await AsyncStorage.getItem('longitude');

    //   var a = await axios.post(
    //   GLOBAL.BASE_URL+"user/post/static",
    //   {
    //     "latitude": Number(latitudes),
    //     "longitude": Number(longitudes),
    //     "radius":10000,
    //     "category":'all',
    //   }
    // );
    // console.log('Bannerssssss',a.data.data.banner)
    // // setBanners(a.data.data.banner)

    // var finalPosts = [];
    // var total = 30;
    // var remaining = 30 - a.data.data.post.slice(0, 30).length;

    // if(remaining > 0){
    //   finalPosts = [...a.data.data.post.slice(0, 30),...a.data.data.postBeyond.slice(0,remaining)]
    // }

    // if(a.data.data.post.length)
    // setallPostsPage(a.data.data.post.slice(30))
    // dispatch({ type: "SETPOSTS",allPosts:a.data.data.post, posts: a.data.data.post,postBeyond: a.data.data.postBeyond,banners: a.data.data.banner});
    // Chatdispatcher({type:'SETALLPOSTS',allPosts:a.data.data.post,postBeyond: a.data.data.postBeyond,banners: a.data.data.banner})
    if (String(tokenJWT) != "null") {
      // Chatdispatcher({ type: 'SETMAPPOSTSALL',whatToShow:finalPosts,allMapPosts:finalPosts})
      // console.log('In NOt Null')
      Chatdispatcher({ type: 'SETTOKEN', token: 'Bearer ' + tokenJWT, name: name, userId: userIdDB.substr(0, 24), jid_main: jid_main, chat_password: chat_password })

    } else {
      // Chatdispatcher({ type: 'SETMAPPOSTSALL',whatToShow:finalPosts,allMapPosts:finalPosts})
      Chatdispatcher({ type: 'SETTOKEN', token: null, name: 'Loading', userId: userIdDB.substr(0, 24), jid_main: jid_main, chat_password: chat_password })
      // Chatdispatcher({type:'SETPROFILEPIC',profilePic:'https://static-content.spaarksweb.com/images/userprofile.png'})
    }


  }


  async function getLinkingURI() {

    const url = await Linking.getInitialURL();
    console.log('------------------------------------------------s')
    console.log('url', url.substr(15, url.length))
    console.log('Detected', dataSourceWithin)
    console.log('------------------------------------------------')
  }






  async function getProfilePic() {
    // alert('1')
    var tokenJWT = await AsyncStorage.getItem('token');
    var callpassword = await AsyncStorage.getItem('callpassword');
    var callid = await AsyncStorage.getItem('aid');
    var name = await AsyncStorage.getItem('name');
    var phone = await AsyncStorage.getItem('phone');

    setCallPassword(callpassword)
    setCallId(callid)
    await axios.get(
      GLOBAL.BASE_URL + "user/getprofilepic",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            'Bearer ' + tokenJWT
        },
      }
    ).then((resp) => {
      setProfilePic(resp.data.profilePic)
      console.log('000000000000000lll')
      console.log(resp.data.profilePic)
      Chatdispatcher({ type: 'SETPROFILEPIC', profilePic: resp.data.profilePic, phone: phone, name: name })
    })
  }


  const [isPartner, setIsPartner] = useState(false)

  async function registerCalls() {
    global.navigation = navigation;
    var jwts = await AsyncStorage.getItem('token');
    if (jwts != "null") {
      var isPartners = await AsyncStorage.getItem('isPartner');
      setIsPartner(isPartners)
      callKeepSetup()
      handleAPNs()
      var callpassword = await AsyncStorage.getItem('callpassword');
      var callid = await AsyncStorage.getItem('aid');
      handleConnect(callid, callpassword)
    }

  }



  useEffect(() => {
    global.navigation = navigation;
    registerCalls()
    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: async function (token) {

        // alert(token.token)
        console.log("TOKEN:", token);
        global.apnToken = token;
        await AsyncStorage.setItem('iosToken', token.token)
        // sendRegistrationToken()
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: async function (notification) {
        console.log("NOTIFICATIONINAPP:", notification);

        // process the notification
        if (notification.userInteraction) {
          // alert('1')
          if (notification.data.apnType == 'PostSpecificScreen') {
            // alert('PostSpecificScreen')
            console.log(GLOBAL.BASE_URL + notification.data.featureName + '/post/' + notification.data.postId)
            await axios.get(GLOBAL.BASE_URL + notification.data.featureName + '/post/' + notification.data.postId).then((resp) => {
              // console.log(resp)
              navigation.navigate("PostSpecificScreensFeed", {
                post: resp.data,
                naviga: 'Market'
              })

            }).catch((err) => {
              console.log(err)
            })
            // global.navigation.navigate('NotificationScreen')


          } else if (notification.data.apnType == 'ChatSpecificScreen') {


            navigation.navigate("ChatSpecificScreen", {
              name: notification.data.name,
              profilePic: notification.data.profilePic,
              jid: notification.data.messageFrom,
              connection: ['Market'],
              xmpp: null,
              messages: [],
              media: [],
              item: {
                _id: notification.data.messageFrom.substr(0, 24),
                aid: 'NA',
                blocked: false,
                blockedMe: false,
                canResume: false,
                chatExit: false,
                chatExitMe: false,
                clearChat: -1,
                contactMe: true,
                connection: ["Market"],
                jid: notification.data.messageFrom,
                name: notification.data.name,
                offline_count: 0,
                profilePic: notification.data.profilePic,
                userId: notification.data.messageFrom.substr(0, 24),
                messages: [],
                message: "",
                unread: 0,
                photos: [],
                amIAnonymous: false,
                isOtherAnonymous: false
              }
            });

            setSpinner(false)

          } else if (notification.data.apnType == 'HelpScreen') {
            navigation.navigate("HelpScreen");
          } else if (notification.data.apnType == 'PartnerScreen') {
            navigation.navigate("spaarksPartnerScreen0");
          } else if (notification.data.apnType == 'Greetings') {
            navigation.navigate("GreetingsScreen");
          } else {

          }
        }




        // global.navigation.navigate('NotificationScreen')

        // (required) Called when a remote is received or opened, or local notification is opened
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATIONINACTION:", notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
    PushNotificationIOS.getInitialNotification();
    PushNotificationIOS.setNotificationCategories([
      {
        id: 'userAction',
        actions: [
          { id: 'open', title: 'Open', options: { foreground: true } },
          {
            id: 'ignore',
            title: 'Desruptivessss',
            options: { foreground: true, destructive: true },
          },
          {
            id: 'text',
            title: 'Text Input',
            options: { foreground: true },
            textInput: { buttonTitle: 'Send' },
          },
        ],
      },
    ]);
    getProfilePic()
    getData(navigation)
    getDataWithin()
    getDataBeyond()
    getRosterFromXMPP(ActualChatdispatcher, token)
    getPendingRatings()
    getPendingWorks()
    setTimeout(() => {
      callforXMPP()
      sendRegistrationToken()
      showCount()
      global.chat_roster_main = chat_roster_main
    }, 15000)

  }, []);

  async function callforXMPP() {
    // alert('In Main')
    var jwt = await AsyncStorage.getItem('token');
    if (String(jwt) != "null") {
      setXMPP()
      handleConnect(callid, callp)
      connectXMPP(chat_roster_main, ActualChatdispatcher)
      // alert(chat_roster_main.length)
      handleConnect(callid, callp)
      setTimeout(() => {
        if (GLOBAL.JID_MAIN._W != null) {
          setPresence(GLOBAL.JID_MAIN._W)
        }
      }, 2000);
    }
  }
  async function getPendingRatings() {
    try {
      var jwt = await AsyncStorage.getItem('token');
      await axios.get(
        `${GLOBAL.BASE_URL}market/pendingRatings`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              'Bearer ' + jwt
          },
        }
      ).then((resp) => {
        console.log('getPendingRatingswwww', resp.data.data)
        setPendingRatings(resp.data.data)
        // setRequestsReceived(resp.data)
      })
    } catch (err) {
      console.log('--------')
      console.log('err', err)
      console.log('--------')
    }

  }

  async function getPendingWorks() {
    try {
      var jwt = await AsyncStorage.getItem('token');
      await axios.get(
        `${GLOBAL.BASE_URL}market/pendingRatings`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              'Bearer ' + jwt
          },
        }
      ).then((resp) => {
        console.log('getPendingWorksssssssss', resp.data.data)
        setPendingWorks(resp.data.work)
        // if(resp.data.work.length>0){
        //   setVisible(true);
        // }
      })
    } catch (err) {
      console.log('--------')
      console.log('err', err)
      console.log('--------')
    }

  }
  const [showLoadMoreWithin, setLoadMoreWithin] = useState(true)
  const [showLoadMoreBeyond, setLoadMoreBeyond] = useState(true)
  const getDataWithin = async () => {
    if (isConnected) {
      setLoading(true);
      // alert(offsetWithin)

      var latitudes = await AsyncStorage.getItem('latitude');
      var longitudes = await AsyncStorage.getItem('longitude');

      var jwt = await AsyncStorage.getItem('token');
      console.log('gtygygygygyg', jwt)
      // alert(jwt)
      if (String(jwt) != "null") {

        await axios.post(
          GLOBAL.BASE_URL + "user/post/static/within",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": 'all',
            "page": offsetWithin,
            "radius": sortedDistance,
            "sortBy": sortByString
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                'Bearer ' + jwt
            },
          }
        )
          .then(async (responseJson) => {
            //Successful response from the API Call
            // if(responseJson.data.data.post.length == 0){
            //   setStopFetching(true)
            // }
            await axios.post(
              GLOBAL.BASE_URL + "user/post/static/within",
              {
                "latitude": Number(latitudes),
                "longitude": Number(longitudes),
                "category": 'all',
                "page": offsetWithin + 1,
                "radius": sortedDistance,
                "sortBy": sortByString
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    'Bearer ' + jwt
                },
              }
            )
              .then((responseJson) => {
                if (responseJson.data.data.post.length == 0) {
                  setLoadMoreWithin(false)
                }

              });

            setOffsetWithin(offsetWithin + 1);
            console.log('responseJsonssssssss', responseJson.data.data.post)
            //After the response increasing the offset for the next API call.
            setDataSourceWithin([...dataSourceWithin, ...responseJson.data.data.post]);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // alert('In')
        await axios.post(
          GLOBAL.BASE_URL + "user/post/static/within",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": 'all',
            "page": offsetWithin,
            "radius": distance,
            "sortBy": sortByString
          }
        )
          .then(async (responseJson) => {
            // if(responseJson.data.data.post.length == 0){
            //   setStopFetching(true)
            // }
            await axios.post(
              GLOBAL.BASE_URL + "user/post/static/within",
              {
                "latitude": Number(latitudes),
                "longitude": Number(longitudes),
                "category": 'all',
                "page": offsetWithin + 1,
                "radius": sortedDistance,
                "sortBy": sortByString
              }
            )
              .then((responseJson) => {
                if (responseJson.data.data.post.length == 0) {
                  setLoadMoreWithin(false)
                }

              });
            //Successful response from the API Call
            setOffsetWithin(offsetWithin + 1);
            console.log('responseJsonssssssss', responseJson.data.data.post)
            //After the response increasing the offset for the next API call.
            setDataSourceWithin([...dataSourceWithin, ...responseJson.data.data.post]);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }



    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }

  };

  const getDataWithinOnRefresh = async () => {
    if (isConnected) {
      var latitudes = await AsyncStorage.getItem('latitude');
      var longitudes = await AsyncStorage.getItem('longitude');
      var jwt = await AsyncStorage.getItem('token');
      setLoading(true);
      if (String(jwt) != "null") {
        await axios.post(
          GLOBAL.BASE_URL + "user/post/static/within",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": "all",
            "page": 1,
            "radius": sortedDistance,
            "sortBy": sortByString

          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                'Bearer ' + jwt
            },
          }
        ).then((responseJson) => {
          //Successful response from the API Call
          setOffsetWithin(2);
          if (responseJson.data.data.post.length == 0) {
            setLoadMoreWithin(false)
          }
          console.log('responseJson', responseJson.data.data.post)
          //After the response increasing the offset for the next API call.
          setDataSourceWithin([...responseJson.data.data.post]);
          setLoading(false);
        })
          .catch((error) => {
            console.error(error);
          });
      } else {
        await axios.post(
          GLOBAL.BASE_URL + "user/post/static/within",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": "all",
            "page": 1,
            "radius": distance,
            "sortBy": sortByString
          }
        ).then((responseJson) => {
          //Successful response from the API Call
          setOffsetWithin(2);
          if (responseJson.data.data.post.length == 0) {
            setLoadMoreWithin(false)
          }
          console.log('responseJson', responseJson.data.data.post)
          //After the response increasing the offset for the next API call.
          setDataSourceWithin([...responseJson.data.data.post]);
          setLoading(false);
        })
          .catch((error) => {
            console.error(error);
          });
      }

    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }

  };
  const [currentPageBeyondLength, setCurrentPageBeyondLength] = useState(0);
  const [currentpageWithinLength, setCurrentPageWithinLength] = useState(1);
  const getDataBeyondOnRefresh = async () => {

    if (isConnected) {
      var latitudes = await AsyncStorage.getItem('latitude');
      var longitudes = await AsyncStorage.getItem('longitude');
      var jwt = await AsyncStorage.getItem('token');
      if (String(jwt) != "null") {
        setLoading(true);
        await axios.post(
          GLOBAL.BASE_URL + "user/post/static/beyond",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": 'all',
            "page": 1,
            "radius": sortedDistance,
            "sortBy": sortByString
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                'Bearer ' + jwt
            },
          }
        )
          .then((responseJson) => {
            //Successful response from the API Call
            setOffsetBeyond(1);
            if (responseJson.data.data.post.length == 0) {
              setLoadMoreBeyond(false)
            }
            console.log('responseJson', responseJson.data.data.post)
            //After the response increasing the offset for the next API call.
            setDataSourceBeyond([...responseJson.data.data.post]);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setLoading(true);
        await axios.post(
          GLOBAL.BASE_URL + "user/post/static/beyond",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": 'all',
            "page": offsetBeyond,
            "radius": distance,
            "sortBy": sortByString
          }
        )
          .then((responseJson) => {
            //Successful response from the API Call
            setOffsetBeyond(1);
            if (responseJson.data.data.post.length == 0) {
              setLoadMoreBeyond(false)
            }
            console.log('responseJson', responseJson.data.data.post)
            //After the response increasing the offset for the next API call.
            setDataSourceBeyond([...responseJson.data.data.post]);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }

    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }

  };


  const getDataBeyond = async () => {
    if (isConnected) {
      setLoading(true);
      var latitudes = await AsyncStorage.getItem('latitude');
      var longitudes = await AsyncStorage.getItem('longitude');
      var jwt = await AsyncStorage.getItem('token');
      if (String(jwt) != "null") {
        await axios.post(
          GLOBAL.BASE_URL + "user/post/static/beyond",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": 'all',
            "page": offsetBeyond,
            "radius": sortedDistance,
            "sortBy": sortByString
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                'Bearer ' + jwt
            },
          }
        )
          .then(async (responseJson) => {
            await axios.post(
              GLOBAL.BASE_URL + "user/post/static/within",
              {
                "latitude": Number(latitudes),
                "longitude": Number(longitudes),
                "category": 'all',
                "page": offsetBeyond + 1,
                "radius": sortedDistance,
                "sortBy": sortByString
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    'Bearer ' + jwt
                },
              }
            )
              .then((responseJson) => {
                if (responseJson.data.data.post.length == 0) {
                  setLoadMoreWithin(false)
                }

              });
            setCurrentPageBeyondLength(responseJson.data.data.post.length)
            //Successful response from the API Call
            setOffsetBeyond(offsetBeyond + 1);
            console.log('responseJson', responseJson.data.data.post)
            //After the response increasing the offset for the next API call.
            setDataSourceBeyond([...dataSourceBeyond, ...responseJson.data.data.post]);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        await axios.post(
          GLOBAL.BASE_URL + "user/post/static/beyond",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": 'all',
            "page": offsetBeyond,
            "radius": distance,
            "sortBy": sortByString
          }
        )
          .then(async (responseJson) => {
            await axios.post(
              GLOBAL.BASE_URL + "user/post/static/beyond",
              {
                "latitude": Number(latitudes),
                "longitude": Number(longitudes),
                "category": 'all',
                "page": offsetBeyond + 1,
                "radius": sortedDistance,
                "sortBy": sortByString
              }
            )
              .then((responseJson) => {
                if (responseJson.data.data.post.length == 0) {
                  setLoadMoreBeyond(false)
                }

              });
            setCurrentPageBeyondLength(responseJson.data.data.post.length)
            //Successful response from the API Call
            setOffsetBeyond(offsetBeyond + 1);
            console.log('responseJson', responseJson.data.data.post)
            //After the response increasing the offset for the next API call.
            setDataSourceBeyond([...dataSourceBeyond, ...responseJson.data.data.post]);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }

    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }

  };


  function onLogin(phone) {
    console.log("phoness", phone)
    Login.current.close();
    navigation.navigate('VerifyOtpScreen', { phone: phone })
  }
  const renderPostCard = ({ item, index }) => {
    return (
      <PostCard
        item={item}
        index={index}
        bookmarked={item.bookmarked}
        banners={banners}
        filterContent={true}
        pendingRatings={pendingRatings}
        pendingWorks={pendingWorks}
        showBanner={true}
        navigation={navigation} />
    )
  }
  const renderFooterWithin = () => {
    return (
      //Footer View with Load More button
      <>

        {
          showLoadMoreWithin ?
            <View style={styles.footer}>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={getDataWithin}
                //On Click of button calling getData function to load more data
                style={styles.loadMoreBtn}>
                <Text style={styles.btnText}>{I18n.t("Load More")}</Text>
                {loading ? (
                  <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
                ) : null}
              </TouchableOpacity>

            </View>
            : <>
              <View style={{ justifyContent: 'center' }}>
                {/* <Text style={{textAlign:'center'}}>No Spaarks available within</Text> */}
              </View>
            </>
        }


      </>
    );
  };

  const renderFooterBeyond = () => {
    return (
      //Footer View with Load More button
      <>
        {
          showLoadMoreBeyond ?
            <View style={styles.footer}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={getDataBeyond}
                //On Click of button calling getData function to load more data
                style={styles.loadMoreBtn}>
                <Text style={styles.btnText}>{I18n.t("Load More")}</Text>
                {loading ? (
                  <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
                ) : null}
              </TouchableOpacity>
            </View>
            : <>
              <View style={{ justifyContent: 'center', backgroundColor: '#f2f2f2' }}>
                <Text style={{ textAlign: 'center' }}>{I18n.t("No Spaarks beyond")}</Text>
              </View>
            </>
        }
      </>
    );
  };

  const [sortBys, setSortBy] = useState(true)
  const [sortByString, setSortByString] = useState('Distance')
  async function setSortBys(a) {
    if (a) {
      setSortBy(true)
      setSortByString('Distance')
    } else {
      setSortBy(false)
      setSortByString('Time')
    }

  }





  async function sortNow() {
    if (isConnected) {
      // alert('Sorting')
      refRBsheettt.current.close()
      setOffsetWithin(2)
      setOffsetBeyond(2)
      setDataSourceWithin([])
      setDataSourceBeyond([])
      getDataWithinOnRefresh()
      getDataBeyondOnRefresh()

      Chatdispatcher({ type: "SETSORTBY", distance: sortedDistance, sortBy: sortByString, sortApplied: true })

      setTimeout(() => {
        Chatdispatcher({ type: 'SETSORTCHANGED', sortApplied: false })
      }, 1000);

    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }
  }


  async function carouselRewards() {

    var jwt = await AsyncStorage.getItem('token');
    if (String(jwt) != "null") {
      navigation.navigate('KnowMoreRewardsScreen')
    } else {

      Login.current.open()
    }


  }
  async function carouselPartner() {

    var jwt = await AsyncStorage.getItem('token');
    if (String(jwt) != "null") {
      navigation.navigate('spaarksPartnerScreen0')
    } else {

      Login.current.open()
    }


  }

  const _carouselViewTop = ({ item }) => {

    return (
      <View style={{ margin: 0 }}>
        {
          item.type == 'partner' ?
            // <TouchableOpacity onPress={()=>navigation.push('spaarksPartnerScreen0')}>
            <TouchableOpacity onPress={() => carouselPartner()}>

              <Image source={item.image} style={{ height: 130, width: Dimensions.get('window').width, resizeMode: 'contain', justifyContent: "center", alignItems: "center" }} placeholderStyle={{ backgroundColor: '#fff' }}
              ></Image>
            </TouchableOpacity>
            :
            // <TouchableOpacity onPress={()=>navigation.navigate('RewardsScreen')}>
            <TouchableOpacity onPress={() => carouselRewards()}>

              <Image source={item.image} style={{ height: 130, width: Dimensions.get('window').width, resizeMode: 'contain', justifyContent: "center", alignItems: "center" }} placeholderStyle={{ backgroundColor: '#fff' }}
              ></Image>
            </TouchableOpacity>
        }

      </View>
    )
  }






  async function openFilter() {
    registerCalls()
    showCount()
    refRBsheettt.current.open()
  }
  const [visible, setVisible] = useState(false);




  async function onSearch() {
    registerCalls()
    showCount()
    navigation.navigate('SearchScreen')
    // navigation.navigate('GreetingsScreen')

  }




  async function showCreat() {
    setTimeout(() => {
      setShowCreating(false)
    }, 2000);
  }
  if (refreshAfterPost) {
    Chatdispatcher({ type: 'REFRESHAFTERPOSTING', refreshAfterPost: false })
    setTimeout(() => {
      setShowCreating(true)
      getDataWithinOnRefresh()
      showCreat()
      // setRefreshAfterPosts(false)
    }, 2000);

  }
  const onRefresh = React.useCallback(async () => {
    // setRefreshing(true);
    // getData()
    getDataWithinOnRefresh()
    getDataBeyondOnRefresh()
    getPendingRatings()
    getPendingWorks()
    wait(2000).then(() => setRefreshing(false));
  }, []);



  const [refreshing, setRefreshing] = React.useState(false);
  return (
    <SafeAreaView>
<ScrollView ref={ref}
refreshControl={
  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
}
>
<View style={{ backgroundColor: "#f2f2f2" }}>
  <RBSheet
    ref={refRBsheettt}
    closeOnDragDown={true}
    closeOnPressMask={true}
    height={350}
    borderRadius={0}
    closeDuration={100}
    customStyles={{
      draggableIcon: {
        backgroundColor: "#000",
      },
      container: {
        borderRadius: 0,
      },
    }}
  >
    <View style={{ backgroundColor: "#fff", height: 330 }}>

      <Text style={{ marginLeft: 20, fontWeight: '500', fontSize: 20, paddingBottom: 14 }}>{I18n.t("Filter Spaarks by")}
        <Text style={{ color: '#6FA4E9' }}> {sortedDistance.toFixed(0)}Km
        </Text></Text>

      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingRight: 10, paddingLeft: 10 }}>
        <View style={{ flex: 1, justifyContent: 'center', marginTop: 10 }}>


          <Slider
            style={{ width: 350, height: 30 }}
            minimumValue={1}
            value={sortedDistance}
            onValueChange={setsortedDistance}
            maximumValue={5}
            minimumTrackTintColor="#6FA4E9"
            maximumTrackTintColor="#9597A1"
            step='1'
          />


        </View>

      </View>
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, paddingRight: 9, paddingLeft: 9, margin: 10 }}>
          <Text>1km</Text>
          <Text>2km</Text>
          <Text>3km</Text>
          <Text>4km</Text>
          <Text>5km</Text>

        </View>
        <View
          style={{
            borderBottomColor: '#C0C0C0',
            borderBottomWidth: 1,
            width: 370,
            marginLeft: 10,
            marginRight: 10,
          }}
        />

      </View>


      <View>

        <View style={{ flexDirection: 'column', padding: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 4 }} >
              <Text style={{ fontWeight: '500', fontSize: 16, left: 15 }}>{I18n.t("Nearest Spaarks")}</Text>
              <Text style={{ fontSize: 14, color: '#A1A4B2', left: 15, top: 6, fontWeight: '400' }}>{I18n.t("Spaarks are sorted by distance from you")}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => setSortBys(1)}>
                {
                  sortBys ?
                    <Image source={require('../assets/checked.png')} style={{ height: 40, width: 40 }} /> :
                    <Image source={require('../assets/unchecked.png')} style={{ height: 40, width: 40 }} />
                }


              </TouchableOpacity>
            </View>
          </View>

          {/* <View
                    style={{
                      borderBottomColor: '#C0C0C0',
                      borderBottomWidth: 1,
                      width: 370, 
                      marginLeft: 10,
                      marginRight: 10,
                      margin:10
                    }}
                  /> */}
          <View
            style={{
              borderBottomColor: '#C0C0C0',
              borderBottomWidth: 1,
              width: 370,
              marginLeft: 10,
              marginRight: 10,
              margin: 10
            }}
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 4 }} >
              <Text style={{ fontWeight: '500', fontSize: 16, left: 15 }}>{I18n.t("Latest Spaarks")}</Text>
              <Text style={{ fontSize: 14, color: '#A1A4B2', left: 15, top: 6, fontWeight: '400' }}>{I18n.t("Spaarks are sorted by time of posting")}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => setSortBys(0)}>
                {
                  sortBys ?
                    <Image source={require('../assets/unchecked.png')} style={{ height: 40, width: 40 }} /> :
                    <Image source={require('../assets/checked.png')} style={{ height: 40, width: 40 }} />
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>




      </View>



      {/* <View>

                <Text style={{marginLeft: 20, fontWeight:'300', fontSize: 18}}>Time</Text>
                <View style={{flexDirection:'row', top: 10}}>
                <Text style={{marginLeft: 20, fontWeight:'200', fontSize: 14}}>Your Spaarks feed is sorted by time of posting{'      '}</Text>
                <BouncyCheckbox
                  size={25}
                  fillColor="#6FA4E9"
                  unfillColor="#FFFFFF"
                  iconStyle={{ borderColor: "blue"}}
                  // textStyle={{ fontFamily: "JosefinSans-Regular" }}

                  />
                  </View> 

              </View> */}


      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => sortNow()}>
          <Button
            mode="contained"
            color="#6FA4E9"
            style={{
              height: 40,
              width: 300,
              margin: 10,
              marginTop: 10,

              marginBottom: 20
            }}

          >
            <Text style={{ color: '#fff' }}>{I18n.t("SORT")}</Text>
          </Button>
        </TouchableOpacity>
      </View>
    </View>


  </RBSheet>

</View>

<View style={{ backgroundColor: '#f2f2f2', padding: showCreating ? 10 : 0 }}>
  <TouchableOpacity>

    {
      showCreating ?
        <View style={{ flexDirection: 'row' }}>
          <Image source={require('../assets/uploading.gif')} style={{ height: 60, width: 60 }} />
          <Text h6 style={{ fontWeight: "bold", marginTop: 15 }}>
            Your Spaark is being created hold tight...
          </Text>
        </View>

        : <></>
    }
  </TouchableOpacity>
</View>
<View style={{ backgroundColor: '#f2f2f2' }}>

  <Carousel
    ref={(c) => { _carousel = c; }}
    data={isPartner == "true" ? selected : notSelected}

    renderItem={_carouselViewTop}
    autoplay={true}
    layout={'default'}
    loop={true}
    autoplayInterval={2000}
    sliderWidth={Dimensions.get('window').width}
    // sliderHeight={170}
    itemWidth={Dimensions.get('window').width}
  />
</View>
<View style={{ backgroundColor: '#f2f2f2' }}>
  <View style={{ flexDirection: 'row' }}>
    {/* <SpaarksHeading within={true}/> */}
    {
      true ?
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", margin: 0, fontSize: 16, padding: 10 }}>{'  '}{I18n.t('Spaarks')} within <Text style={{ color: '#6FA4E9' }}>{distance.toFixed(0)}Km</Text></Text>
          <View>

            <TouchableOpacity onPress={() => openFilter()}>
              <Image source={require('../assets/filter.png')} style={{ height: 25, width: 25, marginTop: 5 }}></Image>
            </TouchableOpacity>
          </View>



        </View>
        :
        <View>
          <Text style={{ fontWeight: "bold", margin: 0, fontSize: 16 }}> {'  '}{I18n.t('Spaarks')} beyond <Text style={{ color: '#6FA4E9' }}>{distance.toFixed(0)}Km</Text></Text>
        </View>

    }
    <TouchableOpacity onPress={() => onSearch()}>

      <View style={{ flex: 0, marginLeft: 10, marginTop: 0, left: Dimensions.get('window').width / 2 - 80 }}>
        <Image
          source={require("../assets/search-bg.png")}
          style={{ height: 30, width: 30 }}
        ></Image>
      </View>
      {/* <View style={{ flex: 0, marginLeft: 10, marginTop: 0,left:10 }}>
<Text>Show on Map</Text>
</View> */}
    </TouchableOpacity>
  </View>
</View>





<View style={{ backgroundColor: "#f2f2f2" }}>
  <FlatList
    data={dataSourceWithin}
    keyExtractor={(item, index) => index.toString()}
    // enableEmptySections={true}
    renderItem={renderPostCard}
    ListFooterComponent={renderFooterWithin}
  />
</View>
<View style={{ backgroundColor: '#f2f2f2', paddingTop: 0 }}>
  <View style={{ flexDirection: 'row' }}>
    <SpaarksHeading within={false} />
  </View>
</View>
<View style={{ backgroundColor: "#f2f2f2" }}>
  <FlatList
    data={dataSourceBeyond}
    keyExtractor={(item, index) => index.toString()}
    // enableEmptySections={true}
    renderItem={renderPostCard}
    ListFooterComponent={renderFooterBeyond}
  />
</View>
</ScrollView>

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  searchBox: {
    position: "relative",
    marginTop: Platform.OS === "ios" ? 5 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    alignSelf: "center",
    borderColor: "#d7d7d7",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  chats: {
    height: 30,
    width: 30,
    margin: 23,
  },
  chatss: {
    height: 30,
    width: 30,
    margin: 32,
  },
  eachCard: {
    padding: 0,
    backgroundColor: "#fff",
    marginBottom: 10,
    marginTop: 0
  },
  BottomNav: {
    flex: 0,
    flexDirection: "row",
    backgroundColor: "#63CDFF",
  },
  LoginComponent: {
    height: 500,
    width: 100,
    margin: 50,
  },
  container: {

    backgroundColor: "#f2f2f2",
  },

  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  tinyLogo: {
    flex: 0,
    height: 120,
    width: 120,
    margin: 20,
  },
  rows1: {
    flex: 0,
    flexDirection: "row",
  },
  image: {
    resizeMode: "cover",
    justifyContent: "center",
  },
  bgimage: {
    resizeMode: "repeat",
    justifyContent: "center",
  },
  rows2: {
    flex: 0,
    flexDirection: "row",
  },
  scrollView: {},
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    height: 1000,
    backgroundColor: "#f2f2f2",
  },
  sectionContainercol: {
    marginTop: 32,
    paddingHorizontal: 24,
    width: 200,
    height: 100,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    padding: 8,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    fontWeight: "700",
  },
  sectionDescription: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: "#ffffff",
  },

  sectionDescriptions: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    justifyContent: 'center',
    textAlign: "right",
  },

  buttonSelected: {
    opacity: 1,
    color: "red",
  },
  customSlide: {
    alignItems: "center",
    justifyContent: "center",
  },
  customImage: {
    width: 390,
    height: 500,
    resizeMode: "cover",
  },
  chip: {
    backgroundColor: "#FA6E5A",
    margin: 0,
    height: 25,
    width: 80,
  },
  chips: {
    backgroundColor: "#6FA4E9",
    margin: 2,
    height: 30,
    width: 100,
  },
  chipText: {
    color: "#fff",
  },
  chipTexts: {
    color: "#000",
  },
  video: {
    backgroundColor: '#000',
    justifyContent: 'center',
    marginTop: 140,
    width: 360,
    height: 250,
    resizeMode: "contain"
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#6FA4E9',
    fontSize: 15,
    textAlign: 'center',
  },



});


const mapStatetoProps = (state) => {
  // const { }=state
  return {
    chat_roster_main: state.chatss.chat_roster_main,
    allMapPosts: state.chatss.allMapPosts,
    token: state.chatss.token,
    chat_password: state.chatss.chat_password,
    jid_main: state.chatss.jid_main,
    userId: state.chatss.userId,
    refreshAfterPost: state.chatss.refreshAfterPost,
    distance: state.chatss.distance,
    sortBy: state.chatss.sortBy,
    Userpreferences: state.chatss.preferences,
    askName: state.chatss.askName,
    isConnected: state.chatss.isConnected
  };
};
exports.setRecMes = setRecMes;
exports.showIncoming = showIncoming;
exports.updateChat = updateChat;
// exports.finalXMPP = finalXMPP;
export default connect(mapStatetoProps)(AllFeaturesScreen);







import React , {useState}from "react";
import { View, Text, StatusBar, Dimensions, SafeAreaView ,Image, TouchableOpacity } from "react-native";
import RNPoll, { IChoice } from "react-native-poll";
import RNAnimated from "react-native-animated-component";
import Poll from "./components/poll";
const { width: ScreenWidth } = Dimensions.get("window");

var choices = [
  { id: 1, choice: "messi", votes: 17 },
  { id: 2, choice: "ronaldo", votes: 7 },
  { id: 3, choice: "neymar", votes: 1 },
  { id: 4, choice: "suarez", votes: 5 },
];

var votess = choices.reduce(function(a, b){
	return a = a+b.votes;
},0);


const App = () => {
  return(
    <Poll question="who is your favorite player?" options={choices} votess={votess}/>
  )
 
};

export default App;