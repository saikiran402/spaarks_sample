// 40 Sec after answer

import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet,Image,TouchableOpacity,ScrollView,ImageBackground,Alert,Platform } from 'react-native';
import { TabRouter } from 'react-navigation';
import moment from 'moment'
import { Rating, AirbnbRating, Divider } from "react-native-elements";
import Snackbar from 'react-native-snackbar';
import Dialog from "react-native-dialog";
import JsSIP, { C } from 'jssip'
import uuid from 'react-native-uuid';
import { connect, useDispatch, useReducer } from "react-redux";
import chatReducers from "../reducers/chatReducers";
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
import {hangupCallWithRating} from './OutGoingCallScreen';
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





const OutGoingCallScreen = ({navigation,route,token}) => {

  global.navigationsss = navigation;

  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState(I18n.t('Connected'));
  const [show, setShow] = useState(1);
    // var [ringing, setRinging] = useState(null);
    // var [muteCall, setMute] = useState(true);


    var [dt, setDt] = useState(0);
    var [tim, settim] = useState(0);


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




    


  
    const handleCancel = () => {
      setVisible(false);
      global.navigationsss.goBack()
      // navigation.goBack()
    };
  

    

const [isMuted,setIsMuted] = useState(true)
 const muteCall = () =>{
   if(isMuted){
    setIsMuted(false)
    global.session.mute({audio:true,video:false})
   }else{
    setIsMuted(true)
    global.session.unmute({audio:true,video:false})
   }
  //  alert('Not Implemented yet')

  // playSound()
  // muteCall? setMute(false):setMute(true)
  // RNCallKeep.setMutedCall(currentCallId, true)
  RNCallKeep.setMutedCall('11edc52b-2918-4d71-9058-f7285e29d894', true);
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



      {/* {
          show == 1?<Text style={{textAlign:'center',marginTop:10,fontWeight:'200'}}>{status}</Text>:
          <Text style={{textAlign:'center',marginTop:10,fontWeight:'200'}}>{status}</Text>
      } */}
      

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
    <TouchableOpacity onPress={()=>{hangupCallWithRating()}}>
    <View style={{flex:1,justifyContent:'center',textAlign:'center'}}>
  <Image source={require('../assets/call-btn-1.png')}  style={{height:60,width:60,marginLeft:170,marginTop:0}}/>
    </View>   
    </TouchableOpacity>
    </View>   


           </View>
           </ScrollView>
    );
};






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


// exports.mutecall = muteCall;
// exports.handleOutgoingCall= handleOutgoingCall;
// exports.handleConnect = handleConnect;

