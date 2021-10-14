import React, { useEffect, setState, useRef, useState } from "react";
import { TabRouter, useTheme } from "@react-navigation/native";
import {
  Share,
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
} from "react-native";
import Modal from 'react-native-modal';
import { Image,} from 'react-native-elements';
import Textarea from "react-native-textarea";
import FbGrid from "react-native-fb-image-grid";
import RNLocation from 'react-native-location';
import RNCallKeep from 'react-native-callkeep';
import axios from "axios";
import { client, xml } from "@xmpp/client";
import debug from "@xmpp/debug";
import JsSIP from 'jssip'
import { Rating, AirbnbRating, Divider } from "react-native-elements";
import { canPost } from '../screens/authGuard'
import { connect, useDispatch, useReducer } from "react-redux";
import { connectXMPP,setXMPP, addListeners, getRosterMain, setMess,testing,getRosterFromXMPP,setPresence, disconnect,confirmlogout } from '../screens/xmpp';
import chatReducers from "../reducers/chatReducers";
import { callKeepSetup,  handleConnect } from '../screens/OutGoingCallScreen'
import Star from 'react-native-star-view';
import ImagesGrid from './ImagesGrid';
LogBox.ignoreAllLogs();
// import { Video, AVPlaybackStatus } from 'expo-av';
import moment from "moment";
// import 'moment/locale/es'

import Carousel from 'react-native-snap-carousel';
import { Text, BottomSheet, ListItem } from "react-native-elements";
const isIOS = Platform.OS === 'ios';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
  Chip,
} from "react-native-paper";
import Dialog from "react-native-dialog";
import Snackbar from 'react-native-snackbar';
import RBSheet from "react-native-raw-bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatSpecificScreen from "../screens/ChatSpecificScreen";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import Hyperlink from 'react-native-hyperlink'
import RNUrlPreview from 'react-native-url-preview';
import Video from 'react-native-video';
import InCallManager from 'react-native-incall-manager';
import Sound from 'react-native-sound';
import { stat } from "react-native-fs";
import ImageViewScreen from "../screens/ImageViewScreen";
import AsyncStorage from "@react-native-community/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';
import { log } from "react-native-reanimated";
import I18n from '../src/i18n';


// import {xmpp} from './xmpp'
const GLOBAL = require('../Globals');
const f =  ({ navigation,token,Userpreferences,parentClick,isConnected,filterContent,item,index,banners,allMapPosts,bookmarked,userId,pendingWorks,pendingRatings,chat_roster_main  }) => {
 
  const [currentCard,setCurrentCard] = useState(item)
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const [changeText, onChangeText] = useState('Write Review');
  const [spinner, setSpinner]= useState(false);
  const [spinnerText, setSpinnerText]= useState('Loading');

  
  const indexes = [4, 8, 12, 16, 20, 24]
global.postcurrent = ['0'];
global.navigation = null
global.type = 'within';
global.token = 'null';
global.chat_roster_main = [];
global.Chatdispatcherss = null;
global.apnToken = null;
const Chatdispatcher = useDispatch(chatReducers);
const refRBSheet = useRef();
const deleteMyPost = useRef();
const refRBSheets = useRef();
const refRBSheetss = useRef();
const refCallSpaarksCall = useRef() 
const Login = useRef();



function updateText(a) {
  setContent(a);
}

// async function showSnackBlock() {

//   refRBSheet.current.close()
//   Snackbar.show({
//     text: 'Blocked Saikiran Succesfully',
//     duration: Snackbar.LENGTH_LONG,
//     action: {
//       text: 'UNDO',
//       textColor: 'white',
//       onPress: () => { /* Do something. */ },
//     },
//   });
// }

async  function selectedPostMap(post,type){
  allMapPosts.splice(0, 0, post);
  const key = '_id';
  const arrayUniqueByKey = [...new Map(allMapPosts.map(item =>
    [item[key], item])).values()]
  Chatdispatcher({type:'SETSHOWNOW',allMapPosts:arrayUniqueByKey})
  navigation.navigate("MapScreen")
  // if(type=="within"){
    
  // }else{
  //     allMapPosts.splice(0, 0, post);
  //     Chatdispatcher({type:'SETSHOWNOW',allMapPosts:allMapPosts})
  //     navigation.navigate("MapScreen")
  // }
    
}
async function blockUser(currentPost){
  console.log(`${GLOBAL.BASE_URL}user/blockuser/post`)
  console.log(currentPost)
  console.log({
    userId:currentPost.userId,
    jid:currentPost.jid,
    mjid:1,
    featureName: currentPost.featureName,
    postId: currentPost._id})
  var jwt = await AsyncStorage.getItem('token');
  await axios.post(
    `${GLOBAL.BASE_URL}user/blockuser/post`,
    {
      userId:currentPost.userId,
      jid:currentPost.jid,
      mjid:1,
      featureName: currentPost.featureName,
      postId: currentPost._id

    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
        'Bearer '+jwt
      },
    }
  ).then((resp) => {
    console.log("succesfully blocked")
    console.log("blockuserdata", resp.data)
   showBlockReason(resp.data.message)
  }).catch((err) => {
    console.log("blockerror",err)
   showBlockReason('You have already blocked this user')
    
  })
}

async function ignoreRating(){
  console.log("ignore ratinggggg")
  console.log(`${GLOBAL.BASE_URL}market/ignorerating`)
  console.log(currentRating.ratingId)
  var jwt = await AsyncStorage.getItem('token');

  await axios.post(
    `${GLOBAL.BASE_URL}market/ignorerating`,
    {
     id: currentRating.ratingId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
        'Bearer '+jwt
      },
    }
  ).then((resp) => {
    console.log("succesfully ignored")
    
  
  }).catch((err) => {
    console.log("ignorerating error",err)
   
    
  })
}


async function clickedChat(l) {
if(isConnected){
  setSpinner(true)
  setSpinnerText('Connecting')
  var token = await AsyncStorage.getItem('token');
var canposts = await canPost() 
var found =false;
var jid = await AsyncStorage.getItem('jid_main');

if(l.jid == jid){
  setSpinner(false)
  alert('This is your Post')
}else{
  if(canposts){
    chat_roster_main.forEach(list=>{
      console.log('sdsdsd',list.jid,l.jid)
      if(list.jid == l.jid){
          found = true;
      }
    })
setTimeout(async () => {
  if(found){
    setSpinner(false)
    navigation.navigate("ChatSpecificScreen", {
      name: l.uservisibility.name.substr(0, 15),
      profilePic: l.uservisibility.profilePic,
      jid: l.jid,
      xmpp: null,
      connection:[l.featureName],
      messages: [],
      media: []
    });
  }else{
    console.log({
      mjid:1,
      jid:l.jid,
      featureName:l.featureName,
      name:l.uservisibility.name,
      profilePic:l.uservisibility.profilePic
     })
     console.log(GLOBAL.BASE_URL+'user/addtoroster')
   await axios.post(GLOBAL.BASE_URL+'user/addtoroster',
   {
    mjid:1,
    jid:l.jid,
    featureName:l.featureName,
    name:l.uservisibility.name,
    profilePic:l.uservisibility.profilePic
   },
   {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer '+token
          },
    }).then((resp)=>{
      // alert('Success')
      console.log('resprespresp',resp.data)
      var mymes = {
        content: `Click to send Message`,
        text: `Click to send Message`,
        messageType:'huhuuu',
        createdAt: Date.now(),
        _id: Date.now()* Math.random(),
        unique: Date.now()* Math.random(),
        messageId: Date.now()* Math.random(),
        type: "chat",
        user: {
          _id: 2,
          name: l.uservisibility.name,
          avatar:l.uservisibility.profilePic
        },
      };

      var eachuser = {
        _id: l._id,
        aid: l.aid,
        blocked: false,
        blockedMe: false,
        canResume: false,
        chatExit: false,
        chatExitMe: false,
        clearChat: -1,
        contactMe: true,
        connection:[l.featureName],
        jid: l.jid,
        name: l.uservisibility.name,
        message:`Click to send Message`,
        messages:[],
        offline_count: 0,
        profilePic: l.uservisibility.profilePic,
        userId: l.uservisibility._id,
        updatedAt: Date.now(),
      };
        eachuser.messages.push(mymes);
        
      Chatdispatcher({
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
        messages:eachuser.messages,
        message : eachuser.message,
        offline_count: eachuser.offline_count,
        profilePic: eachuser.profilePic,
        userId: eachuser.userId,
        updatedAt: Date.now(),
      });
      setSpinner(false)
      navigation.navigate("ChatSpecificScreen", {
        name: l.uservisibility.name.substr(0, 15),
        profilePic: l.uservisibility.profilePic,
        jid: l.jid,
        connection:[l.featureName],
        xmpp: null,
        messages: [],
        media: []
      });
    }).catch((err)=>{
      setSpinner(false)
      alert('Error')
      console.log('Error',err)
    })
    
  }
}, 1000);


    // return (<LoginToAccessScreen></LoginToAccessScreen>)
  } else {
    Login.current.open();
  }
}

}else{
  Snackbar.show({
    text: I18n.t('Check your internet'),
    duration: Snackbar.LENGTH_LONG
  });
}

}


const WhatsAppShare = async (post) => {
  try {
    console.log('---------------------')
    console.log(post)
    console.log(post.questionNo)
    console.log('---------------------')
    if (post.questionNo == '1') {
      if(post.tags.length>0){
        var a = `${post.tags[0].name}\n${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
        *Connect*  to your local area wherever you go.`;
      }else{
        var a = `*Announcement* \n${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app\n*Connect*  to your local area wherever you go.`;
      }

    }

    if (post.questionNo == '2') {
      var a = `${post.tags[0].name}\n${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
      *Connect*  to your local area wherever you go.`;
    }

    if (post.questionNo == '3') {
      var a = `${post.tags[0].name}\n*Name*:${post.uservisibility.name.substr(0, 15)}\n*Content:*\n${post.content}\n\n*Post Link:*\n${post.uservisibility.share}\n\n *Apni Services Dijiye. Apni income badaiye. Free to use.*\n *Download Spaarks App :*\nhttps://cutt.ly/Spaarks-app\n\nJahan jaayein, apne local area se connect karein. Free app.`;
    }//Done

    if (post.questionNo == '4') {
      var a = `${post.tags[0].name}\n*Name*:${post.uservisibility.name.substr(0, 15)}\n*Content:*\n${post.content}\n\n*Post Link:*\n${post.uservisibility.share}\n\n *Kuch bhi sell karien. Apne aas paas. Ghar baithe. Easy.*\n *Download Spaarks App :*\nhttps://cutt.ly/Spaarks-app\n\nJahan jaayein, apne local area se connect karein. Free app.`;
    }//Done

    if (post.questionNo == '5') {
      var a = `${post.tags[0].name} ${post.tags[1].name}\n*Content:*\n${post.content}\n\n*Post Link:*\n${post.uservisibility.share}\n\n *Apne aas pass, Service dene wale ko connect karien. Free. Easy.*\n *Download Spaarks App :*\nhttps://cutt.ly/Spaarks-app\n\nJahan jaayein, apne local area se connect karein. Free app.`;
    }//Done

    if (post.questionNo == '6') {
      var a = `${post.tags[0].name}\n*Content:*\n${post.content.substr(0, 150)}\n\n*Post Link:*\n${post.uservisibility.share}\n\n *Vacancy ko post karien. Staff payein. Ghar baithe. Free to use.*\n *Download Spaarks App :*\nhttps://cutt.ly/Spaarks-app\n\nJahan jaayein, apne local area se connect karein. Free app.`;
    }

    if (post.questionNo == '7') {
      var a = `${post.tags[0].name}\n*Content:*${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
      *Connect*  to your local area wherever you go.`;
    }

    if (post.questionNo == 'Find a Job') {
      var a = `*JOB*${post.tags[0].name}\n*Content:*${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
      *Connect*  to your local area wherever you go.`;
    }



    let url = "whatsapp://send?text=" + a;
    Linking.openURL(url)
    // const result = await Share.share({
    //   message: `${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
    //       Connect to your local area wherever you go.`,
    // });
    // if (result.action === Share.sharedAction) {
    //   if (result.activityType) {
    //     // shared with activity type of result.activityType
    //   } else {
    //     // shared
    //   }
    // } else if (result.action === Share.dismissedAction) {
    //   // dismissed
    // }
  } catch (error) {
    alert(error.message);
  }
};

function onCall(l) {
  if (String(userToken).length > 24) {
    // navigation.navigate('ChatSpecificScreenFinal',{name:l.uservisibility.name,profilePic:l.uservisibility.profilePic,jid:l.jid_main})
    // return (<LoginToAccessScreen></LoginToAccessScreen>)
  } else {
    Login.current.open();
  }
}

async function renderImageLoader(){
  return(
    <ActivityIndicator />
  )
}

async function reportUser(post) {

  var jwt = await AsyncStorage.getItem('token');
  await axios.post(
    `${GLOBAL.BASE_URL}${item.featureName}/report/post`,
    {
      "featureId": item._id,
      "reason": "Info Reported"
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
        'Bearer '+jwt
      },
    }
  ).then((resp) => {
    showSnackReport(resp.data.message)
  }).catch((error) => {
    console.log(error)
    if(error.response.status== 401){
      confirmlogout(Chatdispatcher,navigation)
    }
    showSnackReport('You have already reported this content')
  })
  // showSnackReport('You have already reported this content')
}

async function showSnackReport(reason) {
  refRBSheet.current.close()
  Snackbar.show({
    text: reason,
    duration: Snackbar.LENGTH_LONG,
    // action: {
    //   text: 'UNDO',
    //   textColor: 'white',
    //   onPress: () => { /* Do something. */ },
    // },
  });
}
async function showBlockReason(reason){
  refRBSheet.current.close()
  Snackbar.show({
    text: reason,
    duration: Snackbar.LENGTH_LONG,
    // action: {
    //   text: 'UNDO',
    //   textColor: 'white',
    //   onPress: () => { /* Do something. */ },
    // },
  });
}
async function deleteSpaark1(){
  Alert.alert(
    "Confirmation",
    "Are you sure you want to delete Spaark?",
    [
      {
        text:"Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Delete", onPress: () => deleteSpaark() }
    ]
  );
}
async function deleteSpaark(i,type){
  var jwt = await AsyncStorage.getItem('token');
          await axios.delete(GLOBAL.BASE_URL+`${item.featureName}/post/${item._id}`, {
            headers: {
              Authorization:
              'Bearer '+jwt
            },
          })
          .then(async (resp) => {
            // const newDataSourceWithin = dataSourceWithin.filter((item) => item._id !== dataSourceWithin[Number(global.postcurrent[0])]._id);
            // setDataSourceWithin([...newDataSourceWithin])
            alert('deleting')
            setCurrentCard(null)
            deleteMyPost.current.close();
            Snackbar.show({
              text: 'Spaark Deleted Succesfully',
              duration: Snackbar.LENGTH_LONG
            });
          }).catch((error)=>{
            if(error.response.status== 401){
              confirmlogout(Chatdispatcher,navigation)
            }
          })
        }




async function makeSpaarksCall(){
if(isConnected){

  var jwt = await AsyncStorage.getItem('token');
  await axios.post(GLOBAL.BASE_URL+`user/addtologs/logs/${item.aid}/${item.userId}`,{
    "name":item.uservisibility.name,
    "profilePic":item.uservisibility.profilePic
  },
  {
    headers: {
      "Content-Type": "application/json",
      Authorization:
      'Bearer '+jwt
    },
  }).then((resp)=>{
    console.log(resp.data);
    // getData()
    if(String(jwt) != "null"){
      refCallSpaarksCall.current.close()
      normalCallOption()
      navigation.navigate('OutGoingCallScreen',{aid:item.aid,name:item.uservisibility.name,profilePic:item.uservisibility.profilePic,callerId:item.aid+'@103.27.86.24'})  
    }else{
      refCallSpaarksCall.current.close()
      Login.current.open()
    }
  
    // navigation.navigate('OutGoingCallScreen',{aid:call.aid,name:call.name,profilePic:call.profilePic})
  }).catch((error)=>{
    // if(error.response.status== 401){
    //   confirmlogout(Chatdispatcher,navigation)
    // }
  })




 



}else{
  Snackbar.show({
    text: I18n.t('Check your internet'),
    duration: Snackbar.LENGTH_LONG
  });
}

  }
  async function makeNormalCall(){
if(isConnected){
    var jwt = await AsyncStorage.getItem('token');
    if(String(jwt) != "null"){
    refCallSpaarksCall.current.close()
    normalCallOption()
    Linking.openURL(`tel:${item.mobileNumber}`);
  }else{
    refCallSpaarksCall.current.close()
    Login.current.open()
  }

}else{
  Snackbar.show({
    text: I18n.t('Check your internet'),
    duration: Snackbar.LENGTH_LONG
  });
}
  // navigation.navigate('OutGoingCallScreen',{aid:item.aid,name:item.uservisibility.name,profilePic:item.uservisibility.profilePic,callerId:call+'@103.27.86.24'})
  }

async function handleOutgoingCall (call,navigation,item){
  if(isConnected){
  // navigation.navigate('OutGoingCallScreen',{aid:'NZkt19fFlD',name:'item.uservisibility.name',profilePic:'item.uservisibility.profilePic'})
          var canposts = await canPost()
        if(canposts){
          refCallSpaarksCall.current.open()
                // navigation.navigate('OutGoingCallScreen',{aid:call,name:item.uservisibility.name,profilePic:item.uservisibility.profilePic,callerId:call+'@103.27.86.24'})
        }else{
          Login.current.open()
        }

      }else{
        Snackbar.show({
          text: I18n.t('Check your internet'),
          duration: Snackbar.LENGTH_LONG
        });
      }

}



function onLogin(phone) {
  if(isConnected){
  console.log("phoness", phone)
  Login.current.close();
  navigation.navigate('VerifyOtpScreen', { phone: phone })
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
}


async function submitRating(){
  
  if(isConnected){
  console.log( GLOBAL.BASE_URL + "market/giveRating")
    var jwt = await AsyncStorage.getItem('token');
    console.log({
      "rating": rating,
      "description" : content,
      "postId": currentRating.ratingId,
      "ratingId": currentRating._id
     })
    await axios.post(
      GLOBAL.BASE_URL + "market/giveRating",
      {
        "rating": rating,
        "description" : content,
        "postId": currentRating.id,
        "ratingId": currentRating._id, 
        "userId":currentRating.uid._id
       },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
          'Bearer '+jwt
        },
      }
    )
      .then((responseJson) => {
        setModalVisible(false)
        console.log('ratingggggg', responseJson.data)
        var pendingRatingsnew  = pendingRatings.filter((rating)=> {return rating._id != currentRating._id})
        setCurrentPendingWorks(pendingRatingsnew)
        // setBookmark(true)
      })
      .catch((error) => {
        if(error.response.status== 401){
          confirmlogout(Chatdispatcher,navigation)
        }
        console.error(error);
      });

    }else{
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }
   
}


async function openDots(i, type) {
if(isConnected){
  var userIdd = await AsyncStorage.getItem('userId');
  // var canposts = await canPost()
  console.log('tokentokentokentokentokentoken',token)
  // alert(canposts)
  var tokens = await AsyncStorage.getItem('token')
  // alert(tokens)
  if(tokens!="null"){
    // alert('LoggedIn')
    if(type == 'within'){
      if(userIdd == item.userId){
        global.postcurrent[0] = String(i);
        global.type = type;
        deleteMyPost.current.open()
      }else{
        global.postcurrent[0] = String(i);
        global.type = type;
        console.log(global.postcurrent[0])
        refRBSheet.current.open()
      }
    }else{
      if(userIdd == item.userId){
        global.postcurrent[0] = String(i);
        global.type = type;
        deleteMyPost.current.open()
      }else{
        global.postcurrent[0] = String(i);
        global.type = type;
        console.log(global.postcurrent[0])
        refRBSheet.current.open()
      }
    }
   
      
    

  }else{
    // alert('Login')
    Login.current.open()
  }
}else{
  Snackbar.show({
    text: I18n.t('Check your internet'),
    duration: Snackbar.LENGTH_LONG
  });
}
 


  
}

async function clickAction(item){
  // console.log("userid", item.userId)
  // console.log("item info",item)
  navigation.navigate('UserProfileDynamic',{userId:item.userId})
}

  // This is to send Job and Want Work as Search preference
  async function  clickedPredefined(category,subCategory,Userpreferences){
    console.log('UserpreferencesUserpreferencesUserpreferencesUserpreferencesUserpreferencessss',Userpreferences);
    if(isConnected){
      console.log(category,subCategory)
      // parentClick()
    const newPre = {
      category:category,
      subCategory:subCategory,
      selected:true,
      fromSearch:true
    };
    const newPre1 = {
      category:'All',
      subCategory:'All',
      selected:false,
      fromSearch:true
    }
    console.log('NewDataNewDataNewDataNewData',Userpreferences,Userpreferences.length)
    if(Userpreferences && Userpreferences.length>0){
      Userpreferences.shift();
      Userpreferences.splice(0,0,newPre1)
      Userpreferences.splice(1,0,newPre)
      
      Chatdispatcher({type:'SETPREFERENCES',preferences:Userpreferences})
      Chatdispatcher({type:'SETSELECTEDPREFERENCE',selectedPreference:subCategory,category:category,subCategory:subCategory})
      await AsyncStorage.setItem('prefernces', JSON.stringify(Userpreferences));
      navigation.navigate('Market')
      // if(parentClick()){
      //   parentClick()
      //   navigation.navigate('Market')
      // }else{
      //   navigation.navigate('Market')
      // }

    }else{
      var Userpreferences = [];
      Userpreferences.push(newPre1)
      Userpreferences.push(newPre);
      Chatdispatcher({type:'SETPREFERENCES',preferences:Userpreferences})
      Chatdispatcher({type:'SETSELECTEDPREFERENCE',selectedPreference:subCategory,category:category,subCategory:subCategory})
      await AsyncStorage.setItem('prefernces', JSON.stringify(Userpreferences));
      navigation.navigate('Market')
      // if(parentClick()){
      //   parentClick()
      //   navigation.navigate('Market')
      // }else{
      //   navigation.navigate('Market')
      // }

    }

  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
  
  }
const [liked,setLiked]= useState(item.Iliked)
const [likedCount,setLikedCount]= useState(item.likes && item.likes.length)
const [bookmark, setBookmark]=useState(bookmarked)

async function onbookmark(){
  if(isConnected){
    var jwt = await AsyncStorage.getItem('token');
    if(String(jwt)!="null"){
      if(bookmark){
        setBookmark(false)
        Snackbar.show({
          text: 'Bookmarked removed',
          duration: Snackbar.LENGTH_LONG
        });
    
      await axios.post(
        GLOBAL.BASE_URL + "user/removebookmark/post",
        {
          postId: item._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
            'Bearer '+jwt
          },
        }
      )
        .then((responseJson) => {
         
          console.log('responseJsonssssssss', responseJson.data)
          // setBookmark(true)
        })
        .catch((error) => {
          if(error.response.status== 401){
            confirmlogout(Chatdispatcher,navigation)
          }
          console.error(error);
        });
      }else{
          setBookmark(true)
          Snackbar.show({
            text: 'Bookmarked succesfully',
            duration: Snackbar.LENGTH_LONG
          });
    
      await axios.post(
        GLOBAL.BASE_URL + "user/bookmark/post",
        {
          postId: item._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
            'Bearer '+jwt
          },
        }
      )
        .then((responseJson) => {
         
          console.log('responseJsonssssssss', responseJson.data)
          // setBookmark(true)
        })
        .catch((error) => {
          if(error.response.status== 401){
            confirmlogout(Chatdispatcher,navigation)
          }
          console.error(error);
        });
      }
    }else{
      Login.current.open()
    }
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
 
  

}
async function onLike(i,type){
  // console.log("post infor", item.reviews[0])
  if(isConnected){
    var jwt = await AsyncStorage.getItem('token');
    if(String(jwt) != "null"){
      setLiked(!liked)
    // if(likedCount == 0){
    // }else{
    //   // setLikedCount(likedCount-1)
    // }

            await axios.get(GLOBAL.BASE_URL+item.featureName+'/post/'+item._id+'/like',{
                          headers: {
                            "Content-Type": "application/json",
                            Authorization:
                              'Bearer '+jwt
                          }
            }).then((resp)=>{
              // alert('')
              // alert(resp.data.message)
              if(item.Iliked){
                item.Iliked = false;
                var ndsw = item.likes.filter((list)=>{return list != 'userIID'})
                item.likes = ndsw;
                if(likedCount == 0){
                }else{
                  setLikedCount(likedCount-1)
                }
              
              }else{
                item.Iliked = true;
                item.likes.push('userIID')
                setLikedCount(likedCount+1)
              }
              setCurrentCard(item)
            }).catch((err)=>{
              // alert('onlike error')
              setLiked(!liked)
              if(err.response.status== 401){
                
                confirmlogout(Chatdispatcher,navigation)
              }
              console.log("onlikeerror", err)
            })
   
  
    }else{
        Login.current.open()
    }
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
  // alert('In Like')

}
const [rating,setRating] = useState(1)
async function ratingCompleted(value){
  // alert(value)
  setRating(value)
}
const Ratings =  () =>{
  return(
      <View style={{textAlign:'center',justifyContent:'center',marginLeft:60}}>
<AirbnbRating
count={5}
onFinishRating={ratingCompleted}
// reviews={["Terrible", "Bad","OK", "Good","Very Good",]}
defaultRating={5}
size={16}

/>
</View>
  )
}

const onShare = async (post) => {
  try {
    const result = await Share.share({
      message: `${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
          Connect to your local area wherever you go.`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

async function normalCallOption(){
  // alert('In Like')
  console.log(GLOBAL.BASE_URL+"user/contactMe/"+item._id+"/"+item.userId)
  var jwt = await AsyncStorage.getItem('token');
  if(String(jwt) != "null"){
          await axios.get(GLOBAL.BASE_URL+"user/contactMe/"+item._id+"/"+item.userId,{
                        headers: {
                          "Content-Type": "application/json",
                          Authorization:
                            'Bearer '+jwt
                        }
          }).then((resp)=>{
           console.log("normal call option",  resp.data)
           

          }).catch((err)=>{
            alert('err')
          })
 

  }else{
      Login.current.open()
  }
}

async function makeCalls(l){
  var jwt = await AsyncStorage.getItem('token')
  if(String(jwt) != "null"){
    var jid = await AsyncStorage.getItem('jid_main');
  if(l.jid == jid){
    alert('This is your Post')
  }else{
  refCallSpaarksCall.current.open()
  }
  } else {
    Login.current.open()
  }
  

  
}

const [currentRating,setCurrentRating] = useState(null)
async function showPendingRatingDialog(item, response){
  console.log(item)
  setCurrentRating(item)
  setModalVisible(true)
}


// useEffect(()=>{
//   getData()
// },[])
const [currentWorkstatus,setWorkStatus] = useState(pendingWorks)
const [currentPendingsWorks,setCurrentPendingWorks] = useState(pendingRatings)
const [currentWork,setWork] = useState(null)
// if(pendingWorks.length){
//   setWorkStatus(pendingWorks)

// }else{
//   setWorkStatus([])
// }


async function collectReview(item, response){
  var token  = await  AsyncStorage.getItem('token');
  console.log(GLOBAL.BASE_URL+"market/confirm/work/"+item._id+"/"+item.uid._id+"/"+response)
  await axios.get(GLOBAL.BASE_URL+"market/confirm/work/"+item._id+"/"+item.uid._id+"/"+response,{
    headers: {
      "Content-Type": "application/json",
      Authorization:
      'Bearer '+token
    },
  }).then((resp) => {
    var pendingWorkss  = currentWorkstatus.filter((work)=> {return work._id != item._id})
    setWorkStatus(pendingWorkss)
    console.log('collect',resp.data);
   
  }).catch((err)=>{
        console.log(err)
       
      })
}
_renderItemPending =({item}) =>{

  return (
                    <View style={{flexDirection:'row',backgroundColor:'#fff', borderRadius: 20, borderColor:"#AEAEAE",opactiy:0.1, borderWidth:1, marginLeft:10, marginBottom:15,marginTop:10, paddingRight:0,height:150,  }}>
                      
            <View>
            <Image source={{ uri: item.uid.profilePic }} style={{ height: 50, width: 50,marginTop:10,borderRadius:30}} placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader} />
            </View>
           
            <View style={{backgroundColor:'#fff',height:80,margin:0,marginTop:0,padding:5,textAlign:'center', width: Dimensions.get('window').width-100}}> 
              <Text style={{color:'#A1A4B2',fontWeight:'bold'}}>Collect Review</Text>
                                <Text style={{fontWeight:'bold'}}>Did you complete your work with </Text>
                                <Text style={{fontWeight:'bold'}}>{item.uid.name}?</Text>
                                <Text style={{fontWeight:'bold'}}>{item.category} - {item.subCategory}</Text>
                                <View style={{flexDirection:'row' , marginRight: 30}}>
                                <TouchableOpacity  onPress={()=>{collectReview(item, "IGN")}}>
                                    <View style={{borderWidth:2,borderColor:'#4B84F1',borderRadius:10,margin:5 , marginVertical : 10}}>
                                      <Text style={{color:'#4B84F1',padding:5}}>Ignore</Text>
                                    </View>
                                    </TouchableOpacity>
                                <TouchableOpacity  onPress={()=>{collectReview(item, "STG")}}>
                                    
                                    <View style={{borderWidth:2,borderColor:'#4B84F1',borderRadius:10,margin:5 , marginVertical : 10}}>
                                      <Text style={{color:'#4B84F1',padding:5}}>Not yet</Text>
                                    </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity  onPress={()=>{collectReview(item, "CMPT")}}>

                                    <View style={{borderWidth:2,borderColor:'#4B84F1',backgroundColor:'#4B84F1',borderRadius:10,margin:5 , marginVertical : 10}}>
                                        <Text style={{color:'#fff',padding:5}}>Completed</Text>
                                    </View>
                                    </TouchableOpacity>

                                </View>
            </View>
            
            </View>
  )
}

_renderItemRating =({item}) =>{
  return (
                <TouchableOpacity  onPress={()=>{showPendingRatingDialog(item,navigation)}}>
                {/* <TouchableOpacity> */}
                  <View style={{flexDirection:'row',backgroundColor:'#fff',padding:10,margin:10,height:150 }}>

          <View>
          <Image source={{ uri: item.uid.profilePic }} style={{ height: 50, width: 50,marginTop:10,borderRadius:30}} placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}/>
          </View>
          <View style={{backgroundColor:'#fff',height:80,margin:5,marginTop:0,padding:10,textAlign:'center'}}> 
            <Text style={{color:'#A1A4B2',fontWeight:'bold'}}>Rate service provider / seller</Text>
                              <Text style={{fontWeight:'bold'}}>{item.uid.name}- {item.subCategory}</Text>
                            
                              {/* <Chip
                                            style={{
                                              alignSelf: 'flex-start',
                                              borderColor: '#F30E5C',
                                              borderWidth:1,
                                              backgroundColor:'#fff'
                                            }}
                                          >
                                            <Text
                                              style={{
                                                color: "#000",
                                                marginTop: 0,
                                                fontSize: 10,
                                              }}
                                            >
                                          {item.subCategory}
                                            </Text>
                                          </Chip> */}
                              <View style={{flexDirection:'row'}}>

                            <Image source={require('../assets/rating_image.png')} style={{height:30,width:150}}placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}/>
                              </View>
          </View>

          </View>
          </TouchableOpacity>
  
  
  )
}


async function startedPlaying(){
  alert('Playing')
}


return(
  <>
  <Spinner
          visible={spinner}
          textContent={spinnerText}
          textStyle={styles.spinnerTextStyle}
        />
  {
    currentCard != null?
  <>
    {
      currentRating!=null?
    //   <Modal isVisible={modalVisible} style={{height:50}}>
    //   <View style={styles.centeredView}>
    //         <View style={styles.modalView}>
    //           <Text style={{
    //               marginBottom: 10,
    //               textAlign: "center", color:"#A1A4B2"
    //             }}>Rate service Provider/Seller</Text>
  
    //           <View style={{borderColor:"#D7D7D7", borderWidth: 0.4, width: 300,margin:10}}/>
    //           <Image
    //                   source={{uri:currentRating.uid.profilePic}}
    //                   style={{
    //                       height: 80,
    //                       width: 80,
    //                       marginLeft: 0,
    //                       borderRadius: 40,
    //                   }}
    //                   ></Image>
                      
                      
    //           <Text style={{fontWeight:"700", marginTop: 10}}>
    //           {currentRating.uid.name}
    //           </Text>
    //           <Text style={{fontSize: 10}}>
    //            {currentRating.subCategory}
    //           </Text>
              
    //            <Ratings />
    //            <TextInput
    //       style={styles.input}
    //       onChangeText={onChangeText}
    //       value={changeText}
    //     />
  
    //           <Pressable
    //             style={{borderRadius: 10,
    //               padding: 10,
    //               elevation: 2, backgroundColor: "#2196F3", marginTop: 20}}
    //             onPress={() => submitRating()}
    //           > 
    //             <Text style={styles.textStyle}>SUBMIT</Text>
    //           </Pressable>
  
             
    //           <Pressable
    //             style={{borderRadius: 10,
    //               padding: 10,
    //               elevation: 2}}
    //               onPress={() =>setModalVisible(false)}
    //           > 
    //             <Text style={{
    //   color: "#9B9B9B",
    //   fontWeight: "bold",
    //   textAlign: "center"
    // }}>CLOSE</Text>
    //           </Pressable>
    //         </View>
    //       </View>
    //     </Modal>
  <View style={styles.centeredView}>

    <Modal isVisible={modalVisible} style={{height:50}} onBackdropPress={()=>setModalVisible(false)}>
      <View style={styles.centeredView}>
            <View style={styles.modalView}>
               <Text style={{
                  // marginBottom: 10,
                  textAlign: "center", color:"#A1A4B2"
                }}>Rate service provider/ seller</Text>
  
              <View style={{borderColor:"#D7D7D7", borderWidth: 0.4, width: 300,margin:10}}/>
              <Image
                      source={{uri:currentRating.uid.profilePic}}
                      style={{
                          height: 80,
                          width: 80,
                          marginLeft: 0,
                          borderRadius: 40,
                      }}
                      ></Image>
                      
                      
              <Text style={{fontWeight:"700", marginTop: 10, fontSize: 15}}>
              {currentRating.uid.name}
              </Text>
              <View style={{ borderColor:"#F30E5C",borderWidth:1, borderRadius: 10,marginTop:10}}>
              <Text style={{fontSize: 11, color: "#F30E5C",padding:5}}>
               {currentRating.subCategory}
              </Text>
              </View>
              <View style={{right: 23}}>
               <Ratings />
               </View>
               {/* <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={changeText}
        /> */}
<View style={{backgroundColor:'#f2f2f2',width:'100%',height:110}}>




<Textarea
               
                maxLength={250}
                value={content}
                onChangeText={updateText}
                placeholder={"Write a review"}
                placeholderTextColor={"#c7c7c7"}
                underlineColorAndroid={"transparent"}
               
              />
</View>
  
  <View style={{marginTop:20}}>
    <View style={{flexDirection:"row", padding: 15}}>
              <Pressable
                style={{borderRadius: 10,
                  padding: 10,
                  elevation: 2, backgroundColor: "#2196F3", marginTop: 0}}
                onPress={() => submitRating()}
              > 
              
                <Text style={styles.textStyle}>SUBMIT</Text>
              </Pressable>
  
             
              <Pressable
                style={{borderRadius: 10,
                  padding: 10,
                  elevation: 2}}
                  onPress={() =>setModalVisible(false)}
              >
                <Text style={{
      color: "#9B9B9B",
      fontWeight: "bold",
      textAlign: "center"
    }}>LATER</Text>
              </Pressable>
              </View>
              {currentRating.count > 3?
            
               <Pressable
               style={{borderRadius: 10,
                
                 elevation: 2, paddingHorizontal:25, }}
               onPress={() => ignoreRating()}
             >
               
             
               <Text style={{
      color: "#2196F3",
      fontWeight: "bold",
      textAlign: "center"
    }}>IGNORE</Text>
             </Pressable> 
            :
             <></>
            }
             
              </View>
            </View>
          </View>
  </Modal>
  </View>


     
      :
      <></>
    }

  


  
                        <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        height={item.featureName != "greet"?290:200}
                        borderRadius={10}
                        closeDuration={100}
                        customStyles={{
                          draggableIcon: {
                            backgroundColor: "#000",
                          },
                          container: {
                            borderRadius: 30,
                          },
                        }}
                      >
                        <View style={{ backgroundColor: "#fff", height: 200 }}>
                          <View>
                            <View>
                              {
                                item.featureName != "greet"?
                                <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <View style={{ color: "#000", flex: 2, marginLeft: 20 }}>
                                  <Image
                                    cache="force-cache"
                                    source={require("../assets/icons/share22.png")}
                                    style={{ height: 40, width: 40 }}
                                    placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                                  ></Image>
                                </View>
                                <View style={{ color: "#000", flex: 12, height: 60 }}>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 16,
                                      margin: 0,
                                      fontWeight: "bold",
                                      paddingLeft: 10,
                                    }}
                                    onPress={() => onShare(item)}
                                  >
                                    {I18n.t("Share post")}
                                </Text>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      flex: 70,
                                      paddingLeft: 10,
                                      fontWeight:"300"
                                    }}
                                  >
                                    {I18n.t("Share_this_post_with_your_friends")}
                                </Text>
                                  {/* line */}
                                  <View
                                    style={{
                                      marginTop: 0,
                                      marginLeft: 0,
                                      marginRight: 0,
                                      borderBottomColor: "#D7D7D7",
                                      borderBottomWidth: 1,
                                    }}
                                  />
                                </View>
                              </View>
:
<></>
                              }
                       
                              <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <View style={{ color: "#000", flex: 2, marginLeft: 20 }}>
                                  <Image
                                    cache="force-cache"
                                    source={require("../assets/icons/bottomsheet/1.png")}
                                    style={{ height: 26, width: 26 }}
                                    placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                                  ></Image>
                                </View>
                                <View style={{ color: "#000", flex: 12, height: 60 }}>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 16,
                                      margin: 0,
                                      fontWeight: "bold",
                                      paddingLeft: 10,

                                    }}
                                    onPress={() => { reportUser(Number(global.postcurrent[0])) }}
                                  >
                                    {I18n.t("Report Spaark")}
                                </Text>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      flex: 70,
                                      paddingLeft: 10,
                                      fontWeight:"300"
                                    }}
                                  >
                                    {I18n.t("Please_report_if_you_find_this_content_inappropriate")}
                                </Text>
                                  {/* line */}
                                  <View
                                    style={{
                                      marginTop: 0,
                                      marginLeft: 0,
                                      marginRight: 0,
                                      borderBottomColor: "#D7D7D7",
                                      borderBottomWidth: 1,
                                    }}
                                  />
                                </View>
                              </View>
                              <View style={{ flexDirection: "row", marginTop: 20 }} >
                                <View style={{ color: "#000", flex: 2, marginLeft: 20 }}>
                                  <Image
                                    cache="force-cache"
                                    source={require("../assets/icons/bottomsheet/2.png")}
                                    style={{ height: 26, width: 26 }}
                                    placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                                  ></Image>
                                </View>
                                <View style={{ color: "#000", flex: 12, height: 60 }}>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 16,
                                      margin: 0,
                                      fontWeight: "bold",
                                      paddingLeft: 10,
                                    }}
                                    onPress={() => { blockUser(item) }}
                                  >
                                    <Text style={{ color: '#000' }}>{I18n.t("Block")}{" "}{item.uservisibility.name}</Text>
                                  </Text>

                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      flex: 70,
                                      paddingLeft: 10,
                                      fontWeight:"300"
                                    }}
                                  >
                                    {I18n.t("If_you_dont_want_to_receive_updates_from")} {item.uservisibility.name}
                                </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>


                      </RBSheet>
                      {/* Login to access */}
                      <RBSheet
                        ref={Login}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        height={380}
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
                        <View style={{ backgroundColor: "#fff", height: 200 }}>
                          <View>
                            <View>
                              <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <View style={{ color: "#000", flex: 13, height: 60 }}>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 16,
                                      margin: 0,
                                      fontWeight: "bold",
                                      paddingLeft: 0,
                                      textAlign: "center",
                                    }}
                                  >
                                    {I18n.t("Login to access this feature")}
                                </Text>

                                  <View
                                    style={{
                                      marginTop: 10,
                                      marginLeft: 10,
                                      marginRight: 10,
                                      borderBottomColor: "#D7D7D7",
                                      borderBottomWidth: 1,
                                    }}
                                  />
                                </View>
                              </View>
                              <View style={{ flexDirection: "row", marginTop: 0 }}>
                                <View style={{ color: "#000", flex: 13, height: 60, justifyContent:'center', alignItems:'center', top: 30 }}>
                                  <Image source={require('../assets/icons/login_continue.png')} style={{ height: 150, width: 150 }}placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}></Image>
                                </View>
                              </View>
                              <View style={{ flexDirection: "row", marginTop: 0 }}>
                                <View style={{ color: "#000", flex: 13, height: 160, justifyContent:'center', alignItems:'center' }}>


                                  {/* line */}
                                  <Button
                                    mode="contained"
                                    color="#FA5805"
                                    style={{
                                      height: 40,
                                      width: 230,
                                      margin: 10,
                                      marginTop: 90,
                                      
                                    }}
                                    onPress={() => onLogin()}
                                  >
                                    {I18n.t("Login to access this feature")}
                                    
                                </Button>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>


                      </RBSheet>
                      {/* Spaarks Call disabled */}
                      <RBSheet
                        ref={refRBSheets}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        height={240}
                        borderRadius={10}
                        closeDuration={100}
                        customStyles={{
                          draggableIcon: {
                            backgroundColor: "#000",
                          },
                          container: {
                            borderRadius: 30,
                          },
                        }}
                      >
                        <View style={{ backgroundColor: "#fff", height: 200 }}>
                        
                        {
                            item.uservisibility.phoneCall?
                            <View>
                            <View>
                              <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <View style={{ color: "#000", flex: 4, marginLeft: 20 }}>
                                  <Image
                                    source={require("../assets/bottomCard/call_message.png")}
                                    style={{ height: 100, width: 100 }}
                                    placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                                  ></Image>
                                </View>
                                <View
                                   style={{
                                    color: "#000",
                                    flex: 10,
                                    height: 80,
                                    paddingLeft: 10,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 16,
                                      margin: 0,
                                      fontWeight: "bold",
                                      paddingLeft: 10,
                                    }}
                                  >
                                   {I18n.t("Spaarks call")}
                                </Text>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 8,
                                      flex: 70,
                                      paddingLeft: 10,
                                    }}
                                  >
                                    {I18n.t("Note_call")}
                                </Text>
                                  {/* line */}
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 0,
                                      flex: 60,
                                      paddingLeft: 10,
                                    }}
                                  >
                                {I18n.t("while posting a spaark")}
                                </Text>
                                </View>
                                <View style={{ flex: 3 }}></View>
                              </View>
                            </View>
                          </View>
                            :
                            <View>
                            <View>
                              <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                                  <Image
                                    source={require("../assets/bottomCard/call_message.png")}
                                    style={{ height: 100, width: 100 }}
                                    placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                                  ></Image>
                                </View>
                                <View
                                  style={{
                                    color: "#000",
                                    flex: 13,
                                    height: 80,
                                    paddingLeft: 45,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 16,
                                      margin: 0,
                                      fontWeight: "bold",
                                      paddingLeft: 40,
                                    }}
                                  >
                                   {I18n.t("Normal call")}
                                </Text>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 8,
                                      flex: 70,
                                      paddingLeft: 40,
                                    }}
                                  >
                                   Make call from your personal number.
                                </Text>
                                  {/* line */}
                                  {/* <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 0,
                                      flex: 60,
                                      paddingLeft: 40,
                                    }}
                                  >
                                    while posting a spaark.
                                </Text> */}
                                </View>
                                <View style={{ flex: 3 }}></View>
                              </View>
                            </View>
                          </View>
 
                        }
                      
                      
                          <View>
                            <View>
                              <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                                  <Image
                                    source={require("../assets/bottomCard/call_message.png")}
                                    style={{ height: 100, width: 100 }}
                                    placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                                  ></Image>
                                </View>
                                <View
                                  style={{
                                    color: "#000",
                                    flex: 13,
                                    height: 80,
                                    paddingLeft: 45,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 16,
                                      margin: 0,
                                      fontWeight: "bold",
                                      paddingLeft: 40,
                                    }}
                                  >
                                    Owner of this Spaark disabled Call Phone option.
                                </Text>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 8,
                                      flex: 70,
                                      paddingLeft: 40,
                                    }}
                                  >
                                  {I18n.t("Note_call")}
                                </Text>
                                  {/* line */}
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 0,
                                      flex: 60,
                                      paddingLeft: 40,
                                    }}
                                  >
                                {I18n.t("while posting a spaark")}
                                </Text>
                                </View>
                                <View style={{ flex: 3 }}></View>
                              </View>
                            </View>
                          </View>
                      


                      
                        </View>
                  
                  
                  
                      </RBSheet>
                                    {/* Spaarks call and normal call disabled */}
                      <RBSheet
                        ref={refCallSpaarksCall}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        height={240}
                        borderRadius={10}
                        closeDuration={100}
                        customStyles={{
                          draggableIcon: {
                            backgroundColor: "#000",
                          },
                          container: {
                            borderRadius: 30,
                          },
                        }}
                      >
             <View style={{ backgroundColor: "#fff", height: 200 }}>
                        
                        {
                            item.uservisibility.phoneCall?
                            <TouchableOpacity  onPress={()=>makeSpaarksCall()
                            }>

                            <View>
                            <View>
                              <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <View style={{ color: "#000", flex: 2, marginLeft: 20 }}>
                                  <Image
                                    source={require("../assets/spaarkscall.png")}
                                    style={{ height: 50, width: 50 }}
                                    placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                                  ></Image>
                                </View>
                                <View
                                  style={{
                                    color: "#000",
                                    flex: 10,
                                    height: 80,
                                    paddingLeft: 25,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 16,
                                      margin: 0,
                                      fontWeight: "bold",
                                      paddingLeft: 10,
                                    }}
                                  >
                               {I18n.t("Spaarks call")}
                                </Text>
                               
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 8,
                                      flex: 70,
                                      paddingLeft: 10,
                                    }}
                                  >
                                    {I18n.t("Note_call")} {I18n.t("while posting a spaark")}
                                </Text>
                                  {/* line */}
                                  {/* <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 0,
                                      paddingTop:0,
                                      flex: 60,
                                      paddingLeft: 10,
                                    }}
                                  >
                                    while posting a spaark
                                </Text> */}
                                </View>
                                <View style={{ flex: 3 }}></View>
                              </View>
                            </View>
                          </View>
                          </TouchableOpacity>
                            :
                           

                            <View>
                            <View>
                              <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <View style={{ color: "#000", flex: 2, marginLeft: 20 }}>
                                  <Image
                                    source={require("../assets/icons/spaarksdisabled.png")}
                                    style={{ height: 50, width: 50 }}
                                    placeholderStyle={{backgroundColor:'#fff'}}
                                    PlaceholderContent={renderImageLoader}
                                  ></Image>
                                </View>
                                <View
                                  style={{
                                    color: "#000",
                                    flex: 10,
                                    height: 80,
                                    paddingLeft: 25,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 16,
                                      margin: 0,
                                      fontWeight: "bold",
                                      paddingLeft: 10,
                                    }}
                                  >
                                    {I18n.t("owner_string")}
                                </Text>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 8,
                                      flex: 70,
                                      paddingLeft: 10,
                                    }}
                                  >
                                    {I18n.t("Note_call")} {I18n.t("while posting a spaark")}
                                </Text>
                                  {/* line */}
                                  {/* <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 0,
                                      flex: 60,
                                      paddingLeft: 40,
                                    }}
                                  >
                                    while posting a spaark.
                                </Text> */}
                                </View>
                                <View style={{ flex: 3 }}></View>
                              </View>
                            </View>
                          </View>
                          // </TouchableOpacity>
 
                        }
                      
                      
                      <View
              style={{
                marginTop: 5,
                marginLeft: 5,
                marginRight: 0,
                margin:10,
                borderBottomColor: "#f2f2f2",
                width:'95%',
                borderBottomWidth: 1,
              }}
            />
{item.mobileNumber != "NA"?
                            <TouchableOpacity  onPress={()=>makeNormalCall()}>

                          <View>
                            <View>
                              <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <View style={{ color: "#000", flex: 2, marginLeft: 20 }}>
                                  <Image
                                    source={require("../assets/normalcall.png")}
                                    style={{ height: 50, width: 50 }}
                                    placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                                  ></Image>
                                </View>
                                <View
                                  style={{
                                    color: "#000",
                                    flex: 10,
                                    height: 80,
                                    paddingLeft: 25,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 16,
                                      margin: 0,
                                      fontWeight: "bold",
                                      paddingLeft: 10,
                                    }}
                                  >
                                    {I18n.t("Normal call")}
                                </Text>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 8,
                                      flex: 70,
                                      paddingLeft: 10,
                                    }}
                                  >
                                    Make call from your personal number.
                                </Text>
                                  {/* line */}
                                  {/* <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 0,
                                      flex: 60,
                                      paddingLeft: 40,
                                    }}
                                  >
                                    while posting a spaark.
                                </Text> */}
                                </View>
                                <View style={{ flex: 3 }}></View>
                              </View>
                            </View>
                          </View>
                          </TouchableOpacity>
                          :
                          <>
                           <TouchableOpacity>
                           <View>
                            <View>
                              <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <View style={{ color: "#000", flex: 2, marginLeft: 20 }}>
                                  <Image
                                    source={require("../assets/icons/normaldisabled.png")}
                                    style={{ height: 50, width: 50 }}
                                    placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                                  ></Image>
                                </View>
                                <View
                                  style={{
                                    color: "#000",
                                    flex: 10,
                                    height: 80,
                                    paddingLeft: 25,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 16,
                                      margin: 0,
                                      fontWeight: "bold",
                                      paddingLeft: 10,
                                    }}
                                  >
                                    {I18n.t("owner_string")}
                                </Text>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 8,
                                      flex: 70,
                                      paddingLeft: 10,
                                    }}
                                  >
                                     {I18n.t("Note_call")} {I18n.t("while posting a spaark")}
                                </Text>
                                  {/* line */}
                                  {/* <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 0,
                                      flex: 60,
                                      paddingLeft: 40,
                                    }}
                                  >
                                    while posting a spaark.
                                </Text> */}
                                </View>
                                <View style={{ flex: 3 }}></View>
                              </View>
                            </View>
                          </View>
                          </TouchableOpacity>
                          </>
                          
                          }
                      

                      
                      
                        </View>   
                    
                      </RBSheet>
                      {/* Spaarks Chat disabled */}
                      <RBSheet
                        ref={refRBSheetss}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        height={170}
                        borderRadius={10}
                        closeDuration={100}
                        customStyles={{
                          draggableIcon: {
                            backgroundColor: "#000",
                          },
                          container: {
                            borderRadius: 30,
                          },
                        }}
                      >
                        <View style={{ backgroundColor: "#fff", height: 200 }}>
                          <View>
                            <View>
                              <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <View style={{ color: "#000", flex: 2, marginLeft: 20 }}>
                                  <Image
                                    source={require("../assets/bottomCard/chat_message.png")}
                                    style={{ height: 45, width: 45,marginTop:10,marginLeft:10 }}
                                    placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                                  ></Image>
                                </View>
                                <View
                                  style={{
                                    color: "#000",
                                    flex: 8,
                                    height: 80,
                                    paddingLeft: 25,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 16,
                                      margin: 0,
                                      fontWeight: "bold",
                                      paddingLeft: 10,
                                    }}
                                  >
                                 {I18n.t("owner_stringc")}
                                </Text>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 8,
                                      flex: 70,
                                      paddingLeft: 10,
                                    }}
                                  >
                                    {I18n.t("Note_chat")}
                                </Text>
                                  {/* line */}
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 0,
                                      flex: 60,
                                      paddingLeft: 10,
                                    }}
                                  >
                                    {I18n.t("while posting a spaark")}
                                </Text>
                                </View>
                                <View style={{ flex: 3 }}></View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </RBSheet>
                      <RBSheet
                    ref={deleteMyPost}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    height={190}
                    borderRadius={10}
                    closeDuration={100}
                    customStyles={{
                      draggableIcon: {
                        backgroundColor: "#000",
                      },
                      container: {
                        borderRadius: 30,
                      },
                    }}
                  >
        <View style={{ backgroundColor: "#fff" }}>
          <View>
            <View>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 2,  }}>
                  <Image
                    source={require("../assets/icons/pro1.png")}
                    style={{ height: 50, width: 50, left:15 }}
                    placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                  ></Image>
                </View>

                <View style={{ color: "#000", flex: 10, height: 60 }}>
                  <TouchableOpacity
                    onPress={() =>deleteSpaark1()}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        margin: 0,
                        fontWeight: "bold",
                        paddingLeft: 10,
                      }}
                    >
                      Delete Spaark
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 14,
                      flex: 70,
                      paddingLeft: 10,
                    }}
                  >
                    {I18n.t("Click Here to delete the spaark selected")}
                  </Text>
                  {/* line */}
                 
                </View>
              </View>

              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={{ color: "#000", flex: 2,  }}>
                  <Image
                    source={require("../assets/icons/share22.png")}
                    style={{ height: 40, width: 40, left:15 }}
                    placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                  ></Image>
                </View>

                <View style={{ color: "#000", flex: 10, height: 60 }}>
                  <TouchableOpacity
                    onPress={() =>onShare(item)}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        margin: 0,
                        fontWeight: "bold",
                        paddingLeft: 10,
                      }}
                    >
                      Share Spaark
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 14,
                      flex: 70,
                      paddingLeft: 10,
                    }}
                  >
                    Click Here to share the spaark selected
                  </Text>
                  {/* line */}
                 
                </View>
              </View>
          
           
            </View>
          </View>
        </View>
      </RBSheet>
                   
          
  {
    indexes.includes(index) ?
              
    index/4 == 1 && pendingWorks && pendingWorks.length>0 && token!=null?
    <>
    <Text style={{fontWeight:'bold',padding:10,paddingBottom:0,color:'#000'}}>Submit your work status ({currentWorkstatus.length})</Text>
    <Carousel
                  ref={(c) => { _carousel = c; }}
                  data={currentWorkstatus}
                  renderItem={_renderItemPending}
                  autoplay={true}
                  // layout={'stack'}
                  loop={true}
                  autoplayInterval={2000}
                  sliderWidth={Dimensions.get('window').width-10}
                  itemWidth={Dimensions.get('window').width-10}
                />
    </>
      : index/4 == 2 && pendingRatings && pendingRatings.length>0 && token!=null?
    <>
         <View
              style={{
                marginTop: 5,
                marginLeft: 5,
                marginRight: 5,
                margin:10,
                borderBottomColor: "#D7D7D7",
                width:'90%',
                borderBottomWidth: 1,
              }}
            />
            
    <Text style={{fontWeight:'bold',padding:10,paddingBottom:0,color:'#000'}}>Please help us Rate your service provider</Text>
    <Carousel
                  ref={(c) => { _carousel = c; }}
                  data={currentPendingsWorks}
                  renderItem={_renderItemRating}
                  autoplayInterval={2000}
                  sliderWidth={Dimensions.get('window').width}
                  itemWidth={Dimensions.get('window').width-20}
                />

          <View
              style={{
                marginTop: 5,
                marginLeft: 5,
                marginRight: 5,
                margin:10,
                borderBottomColor: "#D7D7D7",
                width:'90%',
                borderBottomWidth: 1,
              }}
            />
    </>

  
  :<View style={{margin:0}}>
    {
      banners[index/4] == "" || banners[index/4] == undefined?
<></>
      :
<Image source={{ uri: banners[index/4] }} style={{ height: 170, width: Dimensions.get('window').width,resizeMode: 'contain' }}placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}></Image>
 
    }
 </View>
   :


    item.featureName == "market" ? (
      indexes.includes(index) ?
      <Image source={{ uri: "https://static-content.spaarksweb.com/images/images/market/m2.png" }} style={{ height: 170, width: 360, margin: 10, resizeMode: 'contain' }}placeholderStyle={{backgroundColor:'#fff'}}
      PlaceholderContent={renderImageLoader}></Image> :

        <Card style={styles.eachCard}>

          <View>
          {
            item.isProvider && item.reviews && item.reviews[0].posts.length - 1 > 1?
            <View>
              {/* <Text style={{fontSize:14,padding:10,fontWeight:'300'}}>View <Text style={{fontWeight:'bold'}}>{item.isProvider && item.reviews && item.reviews[0].posts.length - 1}</Text> More spaarks 
              {
                item.subCategory?
                <>
                {" "}in <Text style={{fontWeight:'bold',color:'#6FA4E9'}} onPress={()=>navigation.navigate("SellerProfile", {
                  userId: item.userId,
                  post: item,
                })}>{item.subCategory}</Text> 
                </>
                :  
              <></>
              }{" "}from {item.uservisibility.name}</Text> */}
              {
                item.aboveCard !=undefined?
                <>
{
  item.aboveCard.includes("More Spaarks")?
//   <TouchableOpacity
//   onPress={() =>
//     navigation.navigate("SellerProfile", {
//       userId: item.userId,
//       post: item,
//     })
//   }
//   style={{ backgroundColor: "#fff" }}
// >
  <Text style={{fontSize:14,padding:10,fontWeight:'bold'}}>{item.aboveCard}</Text>
//   </TouchableOpacity>

  :
  <Text style={{fontSize:14,padding:10,fontWeight:'bold'}}>{item.aboveCard}</Text>
}
               
                <View
                style={{
                  marginTop: 5,
                  marginLeft: 0,
                  marginRight: 0,
                  borderBottomColor: "#f2f2f2",
                  borderBottomWidth: 1,
                }}
              />
              </>
              :<></>
              }
               
            </View>
            
            :
            <></>
          }
            <View style={{ flexDirection: "row", marginBottom: 0,width:Dimensions.get('window').width -80}}>
              <View
                style={{ flex: 4, paddingLeft: 20, paddingTop: 20 }}
              >
                <View>
                  <View style={{ flex: 3 }}>
                    <Image
                      source={{ uri: item.uservisibility.profilePic }}
                      style={{
                        height: 40,
                        width: 40,
                        paddingLeft: 0,
                        borderRadius: 20,
                      }}
                      placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 20,
                  width:Dimensions.get('window').width,
                  paddingLeft: 10,
                  paddingTop: 20,
                  fontSize: 20,
                }}
              >
                  {/* <TouchableOpacity onPress={()=>
                    // clickAction(item)
                    navigation.navigate('UserProfileDynamic',{userId:item.userId,})
                    // console.log(item.userId)
                    // console.log("currenttttttttt",currentCard.uservisibility)
                    // 
                    }> */}
                <Text style={{ fontWeight: "bold",fontSize:16,color:'#6FA4E9' }}>
                {item.uservisibility.name.charAt(0).toUpperCase() +item.uservisibility.name.slice(1)}
                </Text>
                {/* </TouchableOpacity> */}
                <Text style={{ marginTop:0,fontSize:10,color:'#989898' }}>
                            {moment(item.createdAt).fromNow()}</Text>
                  {/* {moment(item.createdAt).fromNow()}</Text> */}
                <View style={{ flexDirection: "row" }}>
                  {item.isProvider == true ? (
                    <>
                      <View style={{ flex: 8,flexDirection:'row' }}>
                        <Star score={item.reviews && item.reviews[0].rating} style={{width: 100,
                          height: 20,
                          marginBottom: 20,}} />
                           {/* <Text
                          style={{
                            marginTop: 5,
                            fontSize: 10,
                            fontWeight: "300",
                            color: "#6FA4E9",
                          }}
                        >
                          ({item.reviews && item.reviews[0].count})
                        </Text> */}
                    
                      </View>
                      <View>
                    
                      </View>
                      <View style={{position: 'absolute', top: 20}}>
                      {/* <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PostSpecificScreensFeed", { post: item })
                  }
                  style={{ backgroundColor: "#fff" }}
                >          */}
                  <Text style={{ color: "#989898",fontSize:10}}>{item.reviews && item.reviews[0].count} {I18n.t("reviews")}<Image 
                  source={require("../assets/icons/eye.png")} 
                  style={{height:9, width: 22}}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}/>{item.viewedUsers && item.viewedUsers.length} {I18n.t("views")}</Text>

                {/* </TouchableOpacity> */}
                </View>
                    </>
                  ) : (

                  <View style={{flexDirection:'row',marginTop:5}}>  

                  <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PostSpecificScreensFeed", { post: item })
                  }
                  style={{ backgroundColor: "#fff" }}
                >
                  <View>
                  <Text style={{ color: "#989898",fontSize:10}}>
                  <Image 
                  source={require("../assets/icons/eye.png")} 
                  style={{height:9, width: 22}}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}/>
                    {item.viewedUsers && item.viewedUsers.length} Views</Text>
                    </View>  
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                    onPress={() =>
                      selectedPostMap(item,'within')
                    }
                    
                   
                  >
                    <View style={{flexDirection:'row'}}>
                    <Image 
                    source={require('../assets/bottomCard/distance.png')}
                  style={{height:12, width: 22}}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}/>
                    <Text style={{ color: "#6FA4E9",fontSize:10}}>
                    {item.distance && item.distance.toFixed(0)} m</Text>
                    </View>
                </TouchableOpacity> */}

                    </View> 
                    // <View style={{ flexDirection: 'row' }}>
                    //   {
                    //      item.tags != undefined ?
                    //        item.tags.map((list, i) =>
                    //     <View style={{borderColor: list.color,borderWidth:1,padding:5,margin:5,borderRadius:20}}>
                    //     <Text style={{textAlign:'center',color:list.color,fontSize:10,marginTop: 0}}>{list.name}</Text>
                    //     </View>

                    //        ) : <></>
                    //    }


                    // </View>

                  )}
                </View>
              </View>
              <View style={{ marginRight: 10 }}>
                {/* <TouchableOpacity
                  onPress={() => {
                    return openDots(item, 'within');
                  }}
                > */}
                  <Image
                    source={require("../assets/icons/horizontaldots.png")}
                    style={{
                      height: 12,
                      width: 25,
                      paddingLeft: 10,
                      marginTop: 10,
                    }
                  }
                  placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                  />
                {/* </TouchableOpacity> */}
                {/* <TouchableOpacity
                onPress={() => onbookmark(index, 'within')}
              >
                 */}
                {
                  bookmark?
                  <Image 
                  source={require("../assets/icons/savedbookmark.png")} 
                  style={{height:20, width: 16, right:0, marginTop: 10 ,marginLeft : 4 }}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}/>
                  :
                  <Image 
                  source={require("../assets/icons/bookmark.png")} 
                  style={{height:22, width: 13, right:0, marginTop: 10 ,marginLeft : 4.25}}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}/>
                }
             
               
              
              
              {/* </TouchableOpacity> */}

              </View>
            </View>
            {/* Profile Tag and content */}
            <View
              style={{
                paddingLeft: 10,
                marginBottom: 0,
                width:Dimensions.get('window').width-80,
                flexDirection: "column",
              }}
            >
              {item.isProvider == true ? (
                <>
                 
                       <View
              style={{
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
              }}
            />


                   <View style={{ flexDirection:'row',marginTop:0,justifyContent:'space-evenly' }}>
                     <View style={{flex:5}}>
                       {/* <TouchableOpacity onPress={()=>clickedPredefined(item.category,item.subCategory,Userpreferences)}> */}
  <View style={{paddingTop:0,justifyContent:'center'}}>
                    
                        <View style={{borderColor: '#6FA4E9',borderWidth:1,padding:5,margin:5,borderRadius:20}}>
                        <Text style={{textAlign:'center',color:'#6FA4E9',fontSize:10,marginTop: 0}}>{item.subCategory}</Text>
                        </View>

                      
                      </View>  
                      {/* </TouchableOpacity>                   */}
                      </View>
                      <View style={{marginTop:8,flex:1}}>
                        <Text style={{color:'#f2f2f2',fontWeight:'bold'}}>|</Text>
                      </View>
                      


                      
                      <View style={{flexDirection:'row',flex:4}}>
                      <View style={{flexDirection:'row'}}>
                                  <Image
     source={require('../assets/bottomCard/distance.png')}
                                  style={styles.map} placeholderStyle={{backgroundColor:'#fff'}}
                                  PlaceholderContent={renderImageLoader}
                                ></Image>
                                  <Text style={{fontSize: 12,marginTop:10, color:'#6FA4E9' }}>{Math.floor(Math.random() * 10) + 1} {I18n.t("Km")}</Text></View>
                                    
                      </View>
                      {/* <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("SellerProfile", {
                        userId: item.userId,
                        post: item,
                      })
                    }
                    style={{ backgroundColor: "#fff" }}
                  > */}
     
                      <View style={{ justifyContent: 'center', alignItems: 'center',flexDirection:'row',flex:3,marginRight:10}}>
                      <Image source={require('../assets/marketProfile.png')} style={{height:20,width:20,marginTop:0}}placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}/>
                       <Text
                         style={{ fontSize: 10, color: "#6FA4E9",marginLeft:0,marginTop:2 }}
                       >
                        
                        {I18n.t('Market Profile')}
                       </Text>
                       </View>
                       {/* </TouchableOpacity> */}



                       
                     </View>
                     <View
              style={{
                marginTop: 5,
                marginLeft: 0,
                marginRight: 0,
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
              }}
            />
                
                </>
             
             
             ) : (
              <>
                 
              <View
     style={{
       marginTop: 0,
       marginLeft: 0,
       marginRight: 0,
       borderBottomColor: "#f2f2f2",
       borderBottomWidth: 1,
     }}
   />


          <View style={{ flexDirection:'row',marginTop:0}}>
          <View style={{flex:5}}>
                       <TouchableOpacity onPress={()=>clickedPredefined(item.category,item.subCategory,Userpreferences)}>
  <View style={{paddingTop:0,justifyContent:'center',flexDirection:'row'}}>
                      {
                         item.tags != undefined ?
                           item.tags.map((list, i) =>
                        <View style={{borderColor: list.color,borderWidth:1,padding:5,margin:5,borderRadius:20}}>
                        <Text style={{textAlign:'center',color:list.color,fontSize:10,marginTop: 0}}>{list.name}</Text>
                        </View>

                           ) : <></>
                       }
                       
                      </View>  
                      </TouchableOpacity>                  
                      </View>

             <View style={{marginTop:8,flex:1}}>
               <Text style={{color:'#f2f2f2',fontWeight:'bold'}}>|</Text>
             </View>
             


             
             <View style={{flexDirection:'row',flex:2}}>
               {
                       item.uservisibility.location?
                       <>
                      <TouchableOpacity
           onPress={() =>
             selectedPostMap(item,'within')
           }
           
          
         >
                      
                     {
                         item.distance && item.distance != undefined?
                     item.distance && item.distance.toFixed(2) < 1000 ?
                     <View style={{flexDirection:'row'}}>
                     <Image
source={require('../assets/bottomCard/distance.png')}
                     style={styles.map} placeholderStyle={{backgroundColor:'#fff'}}
                     PlaceholderContent={renderImageLoader}
                   ></Image>
                         <Text style={{fontSize: 12,marginTop:10, color:'#6FA4E9' }}>{item.distance.toFixed(0)} m</Text></View> :
                          <View style={{flexDirection:'row'}}>
                         <Image
source={require('../assets/bottomCard/distance.png')}
                         style={styles.map} placeholderStyle={{backgroundColor:'#fff'}}
                         PlaceholderContent={renderImageLoader}
                       ></Image>
                         <Text style={{fontSize: 12,marginTop:10, color:'#6FA4E9' }}>{(item.distance / 1000).toFixed(1)} Km</Text></View>
                     :<></>
                     }
                     </TouchableOpacity>
                     </>
                     :
                     <>

                   </>
               }
                           
             </View>  
            </View>
            <View
     style={{
       marginTop: 5,
       marginLeft: 0,
       marginRight: 0,
       borderBottomColor: "#f2f2f2",
       borderBottomWidth: 1,
     }}
   />
       
       </>
              )}
              <View style={{ flex: 2  }}>
              <Text style={{ fontSize: 13, paddingTop: 0 }} >
                      {item.content}
                    </Text>
{/* {
            
            item.content.length>100?
            <Text style={{color:'#fff', fontWeight:'500'}}>
            {item.content.substr(0,100)}....
            </Text>
            :<></>
            }

              {
                    filterContent?
                    <View style={{ flex: 0 }}>
                    <Hyperlink linkDefault={ true } linkStyle={{color:'#6FA4E9'}}>
                    <Text style={{ fontSize: 15, paddingTop: 0 }} numberOfLines={3}>
                      {item.content}
                    </Text>
                    </Hyperlink>
                    {item.content.length > 100 ? (
                      <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("PostSpecificScreensFeed", {
                          post: item,
                        })
                      }
                      style={{ backgroundColor: "#fff" }}
                    >
                      <Text style={{ color: "#989898",fontSize:12 }}>
                      {I18n.t("View more")}
                      </Text>
                     </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                  </View>
                  :
                  <View style={{ flex: 2 }}>
                  <Hyperlink linkDefault={ true } linkStyle={{color:'#6FA4E9'}}>
                  <Text style={{ fontSize: 15, paddingTop: 10 }} >
                    {item.content}
                  </Text>
                  </Hyperlink>
            
                </View>
                }
          <RNUrlPreview text={item.content}/> */}
              </View>
            </View>
          </View>

          {

          item.photo && item.photo.length > 0?

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center',  width:Dimensions.get('window').width-80}}>

                {
                  item.video.length>0?
                  <FlatList
                  data={[item.video, ...item.photo]}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, i }) => (
                    <View style={{   
                   }}>
                      {
                        String(item).substr(String(item).length - 3) == 'mp4'?
                        <>
                        
                        <Video source={{uri: String(item)}}   // Can be a URL or a local file.
                        ref={(ref) => {
                          player = ref
                          // ref.presentFullscreenPlayer();
                        }}     
                        onFullscreenPlayerWillPresent={()=>startedPlaying}

                        resizeMode="cover"  
                        // onMagicTap={()=>startedPlaying()}
                        // onAccessibilityTap={()=>startedPlaying()}    
                        // onPlaybackResume ={()=>startedPlaying()}    
                        // onExternalPlaybackChange={()=>startedPlaying()}    
                        paused={true}       
            
                        controls={true}
                        fullscreen={true}
                        // style={{height:480,width:Dimensions.get('window').width}}
                        /> 
                        </>
                        :
                        // <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: currentCard.photos,content:currentCard.content,name:currentCard.uservisibility.name,profilePic:currentCard.uservisibility.profilePic, time:currentCard.createdAt,post:currentCard, showHeader: true }) }}>
                        <Image source={{ uri: item }} cache="force-cache" style={{
                          width: Dimensions.get('window').width-80,
                          height: 200,
                          resizeMode: "cover",
                        }}placeholderStyle={{backgroundColor:'#fff'}}
                        PlaceholderContent={renderImageLoader}></Image>
                    //   </TouchableOpacity>
                      }
                      
                    </View>
                  )}
                />

                :
                <FlatList
                data={[...item.photo]}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, i }) => (
                  <View style={{width:Dimensions.get('window').width -80}}>
                    {
                      String(item).substr(String(item).length - 3) == 'mp4'?

                      <Video source={{uri: String(item)}}   // Can be a URL or a local file.
                      ref={(ref) => {
                        player = ref
                      }}          
                      paused={true}          
                      controls={true}
                      fullscreen={true}
                      resizeMode="cover"  


                      style={{height:200,width:Dimensions.get('window').width-80}}
                      />
                      :
                    //   <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: currentCard.photos,content:currentCard.content,name:currentCard.uservisibility.name,profilePic:currentCard.uservisibility.profilePic, time:currentCard.createdAt,post:currentCard, showHeader: true}) }}>
                      <Image source={{ uri: item }} cache="force-cache" style={{
                          width:Dimensions.get('window').width-80,
                        height: 200,
                        resizeMode: "cover",
                      }}placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}></Image>
                    // </TouchableOpacity>
                    }
                    
                  </View>
                )}
              />

                }
              


              </View>
              :item.video.length>0?
              <>

              <View style={{ marginRight: 10 }}>

                <Video source={{uri: item.video[0]}}   // Can be a URL or a local file.
                ref={(ref) => {
                  player = ref
                }}          
                paused={true}          
                fullscreen={true}
                resizeMode="cover"  

                controls={true}
                style={{height:200,width:Dimensions.get('window').width-80}}
                />
                
            </View>
            </>
            :<></>

          }
{/* <Text>{item.video.length}</Text> */}
{/* <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: currentCard.photos,content:currentCard.content,name:currentCard.uservisibility.name,profilePic:currentCard.uservisibility.profilePic, time:currentCard.createdAt,post:currentCard, showHeader: true}) }}> */}
{/* <View style={{width:Dimensions.get('window').width -80}}>
<ImagesGrid images={[...item.photo]} video={[...item.video]} navigation={navigation}/>
</View> */}
{/* </TouchableOpacity> */}


          
          <View style={{ backgroundColor: "#fff", height: "auto" }}>
          <View style={{ flexDirection: "row", marginTop:0 }}>
              
            </View>
       
            <View
              style={{
                marginTop: 5,
                marginLeft: 10,
                width:'95%',
                marginRight: 0,
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
              }}
            />
 {/* icon starts */}
            <View
              style={{ flex: 0, flexDirection: "row", left: -15, justifyContent:'center',justifyContent:'space-between',width:Dimensions.get('window').width-150 ,paddingBottom :-5}}

            >
              {/* likes */}
             <View style={{ flexDirection: 'column' }}>
              {/* <TouchableOpacity
                onPress={() => onLike(index, 'within')}
              > */}
                
                {
                  liked?
                  <Image
                  source={require('../assets/bottomCard/liked.png')}

                  style={{ height: 20,width: 20,margin: 23,marginTop:3 }}
                  PlaceholderContent={<ActivityIndicator />}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}></Image>
                  :
                  <Image
                  source={require('../assets/bottomCard/disliked.png')}
                  style={{ height: 20,width: 20,margin: 23,marginTop:3}}
                  placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}></Image>
                }
             
                <Text style={{ position: 'absolute', top: 22, left: 31, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>{currentCard.likes && currentCard.likes.length}</Text> 
              
              
              {/* </TouchableOpacity> */}

              </View>
              
              {/* Comments */}
              
              <View style={{ flexDirection: 'column' }}>
              {
                item.subposts? 
             <>
              {/* <TouchableOpacity
              onPress={() =>
                navigation.navigate("PostSpecificScreensFeed", {
                  post: item,
                  naviga:'Market'
                })
               
              }
              style={{ backgroundColor: "#fff" }}
            > */}
              <Image 
                    source={require("../assets/icons/comment.png")}
                  style={{ height: 21,width: 21,margin: 23,marginTop:3}}
                  placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}
                    />
              <Text style={{ position: 'absolute', top: 22, left: 32, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>
                {item.subposts.length}
             </Text>
            {/* </TouchableOpacity> */}
            </>
              :
              <>
               {/* <TouchableOpacity
              onPress={() =>
                navigation.navigate("PostSpecificScreensFeed", {
                  post: item,
                  naviga:'Market'
                })
                
              }
              style={{ backgroundColor: "#fff" }}
             > */}
               
              <Text style={{ color: "#6FA4E9", paddingLeft: 10,fontSize:12 }}>
                {item.subposts.length} 
             </Text>

            {/* </TouchableOpacity> */}
            </>
              }
              </View>


              {/* Phone call */} 
              <View style={{flexDirection: 'column'}}>
              

                {/* <TouchableOpacity onPress={() => { makeCalls(item) }}> */}
                <Image
                  
                   source={require("../assets/icons/call.png")}
                
                 style={{ height: 20,width: 20,margin: 23,marginTop:3}}placeholderStyle={{backgroundColor:'#fff'}}
                 PlaceholderContent={renderImageLoader}
                ></Image>
                 <Text style={{ position: 'absolute', top: 22, left: 29, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>{I18n.t("Call")}</Text> 

              {/* </TouchableOpacity> */}
              
           </View>
              

              {/* Chat */}
           <View style={{flexDirection: 'column'}}>

              {
                item.uservisibility.chat?
                <>
                {/* // <TouchableOpacity onPress={() => clickedChat(item)}> */}
                <Image
                  source={require("../assets/icons/chat.png")}

                  style={{ height: 20,width: 20,margin: 23,marginTop:3,marginLeft:30}}
                  placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                ></Image>
                <Text style={{ position: 'absolute', top: 22, left: 33, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>{I18n.t("Chat")}</Text> 

            {/* //   </TouchableOpacity> */}
            </>
              :
              <>
              {/* <TouchableOpacity onPress={() => refRBSheetss.current.open()}> */}
              <Image
                    source={require("../assets/icons/chatdisable.png")}
                    // source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.39_PM_upsvxi.png' }}
                style={{ height: 20,width: 20,margin: 23,marginTop:3}}placeholderStyle={{backgroundColor:'#fff'}}
                PlaceholderContent={renderImageLoader}
              ></Image>
                 <Text style={{ position: 'absolute', top: 22, left: 23, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>{I18n.t("Chat")}</Text> 

              {/* </TouchableOpacity> */}
              </>
                
              }

              </View>
              
          
              {/* WhatsApp Share */}
           <View style={{flexDirection: 'column'}}>

              {/* <TouchableOpacity onPress={() => WhatsAppShare(item)}> */}
              <View style={{flexDirection:'row'}}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png' }}
                style={{ height: 20,width: 20,margin: 23,marginTop:3}}placeholderStyle={{backgroundColor:'#fff'}}
                PlaceholderContent={renderImageLoader}
              ></Image>
                   {
                 item.myshares && item.myshares.length>0 ?
                 <Text style={{ position: 'absolute', top: 22, left: 29, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>{item.myshares[0].shares}</Text> :
                 <Text style={{ position: 'absolute', top: 22, left: 29, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>0</Text>
                }
                </View>
              {/* </TouchableOpacity> */}
           </View >
             
            </View>

          </View>
     {/* icon end */}


        </Card>


    
   ) : item.featureName == "showtime" ? (

        <Card style={styles.eachCard}>

          <View>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              <View
                style={{ flex: 4, paddingLeft: 20, paddingTop: 20 }}
              >
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flex: 3 }}>
                    <Image
                      cache="force-cache"
                      source={{ uri: item.uservisibility.profilePic }}
                      style={{
                        height: 55,
                        width: 55,
                        paddingLeft: 20,
                        borderRadius: 30,
                      }}placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 20,
                  paddingLeft: 10,
                  paddingTop: 20,
                  fontSize: 20,
                }}
              >
                  <TouchableOpacity onPress={()=>
                  // clickAction(item)
                    navigation.navigate('UserProfileDynamic',{userId:item.userId})
                    // console.log("currenttttttttt",currentCard)
                    }>
                <Text style={{ fontWeight: "bold",fontSize:16,color:'#6FA4E9' }}>
                {item.uservisibility.name.charAt(0).toUpperCase() +item.uservisibility.name.slice(1)}
                </Text>
                </TouchableOpacity>
                <Text style={{ marginTop:0,fontSize:10,color:'#989898' }}>
                  {/* {moment(item.createdAt).fromNow()} */}
                  {moment(item.createdAt).fromNow()}
                </Text>
                {/* <View style={{flexDirection:'row'}}>
                <Text style={{color: "#989898",fontSize:13}}>
                  <Image 
                  source={require("../assets/icons/eye.png")} placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}
                  style={{height:9, width: 20,fontSize:10}}/>
                  {item.viewedUsers && item.viewedUsers.length} Views</Text>
                  <Text>
                 
                          {
                                item.uservisibility.location?
                                <>
                               <TouchableOpacity
                    onPress={() =>
                      selectedPostMap(item,'within')
                    }
                    
                   
                  >
                               
                            {
                              item.distance != undefined?
                              item.distance && item.distance.toFixed(2) < 1000 ?
                              <View style={{flexDirection:'row'}}>
                              <Image
                              source={require('../assets/bottomCard/distance.png')}
                              style={{height: 22, width: 22}} placeholderStyle={{backgroundColor:'#fff'}}
                              PlaceholderContent={renderImageLoader}
                            ></Image>
                                  <Text style={{fontSize: 12,marginTop:4, color:'#6FA4E9' }}>{item.distance.toFixed(0)} {I18n.t("m")}</Text></View> :
                                   <View style={{flexDirection:'row'}}>
                                  <Image
                                      source={require('../assets/bottomCard/distance.png')}
                                  style={{height: 22, width: 22}} placeholderStyle={{backgroundColor:'#fff'}}
                                  PlaceholderContent={renderImageLoader}
                                ></Image>
                                  <Text style={{fontSize: 12,marginTop:4, color:'#6FA4E9' }}>{(item.distance / 1000).toFixed(1)} {I18n.t("Km")}</Text></View>
                              :<></>
                            }
                              </TouchableOpacity>
                              </>
                              :
                              <>

                            </>
                        }
                  
                  </Text>
                  </View> */}
<View style={{flexDirection:'row'}}>
<View style={{position: 'absolute', top:5}}>
                  



                  <View style={{flexDirection:'row'}}>  

                  <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PostSpecificScreensFeed", { post: item })
                  }
                  style={{ backgroundColor: "#fff" }}
                >
                  <View>
                  <Text style={{ color: "#989898",fontSize:10}}>
                  <Image 
                  source={require("../assets/icons/eye.png")} 
                  style={{height:9, width: 22}}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}/>
                    {item.viewedUsers && item.viewedUsers.length} Views</Text>
                    </View>  
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() =>
                      selectedPostMap(item,'within')
                    }
                    
                   
                  >
                    <View style={{flexDirection:'row'}}>
                    <Image 
                    source={require('../assets/bottomCard/distance.png')}
                  style={{height:12, width: 22}}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}/>
                    <Text style={{ color: "#6FA4E9",fontSize:10}}>
                    {item.distance && item.distance.toFixed(0)} m</Text>
                    </View>
                </TouchableOpacity>

                    </View> 

         
                </View>
                </View>
              </View>
              <View style={{ marginRight: 10 }}>
              <TouchableOpacity
                  onPress={() => {
                    return openDots(item, 'within');
                  }}
                >
                  <Image
                    source={require("../assets/icons/horizontaldots.png")}
                    style={{
                      height: 12,
                      width: 25,
                      paddingLeft: 10,
                      marginTop: 10,
                    }}placeholderStyle={{backgroundColor:'#fff'}}
                    PlaceholderContent={renderImageLoader}
                  />
                </TouchableOpacity>
              
                
                 <TouchableOpacity
                onPress={() => onbookmark(index, 'within')}
              >
                
                {
                  bookmark?
                  <Image 
                  source={require("../assets/icons/savedbookmark.png")} 
                  style={{height:22, width: 13, right:0, marginTop: 10}}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}/>
                  :
                  <Image 
                  source={require("../assets/icons/bookmark.png")} 
                  style={{height:22, width: 13, right:0, marginTop: 10}}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}/>
                }
             
                
              
              </TouchableOpacity>

               
              </View>

            </View>

<View
              style={{
                marginTop: 2,
                marginLeft: 0,
                marginRight: 0,
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
              }}
            />
           
            {/* Profile Tag and content */}
            <View
              style={{
                paddingLeft: 10,
                marginBottom: 0,
                flexDirection: "column",
              }}
            >

              <View style={{ flex: 2 }}>
                <Paragraph style={{ fontSize: 15 }}>

{         
            item.content.length>100?
            
            <Text style={{color:'#fff', fontWeight:'500' , padding :10}}>
            {item.content.substr(0,100)}....
            </Text>
            :
          
            <></>
            
            }
                {
                    filterContent?
                    <View style={{ flex: 2 }}>
                    <Hyperlink linkDefault={ true } linkStyle={{color:'#6FA4E9'}}>
                    <Text style={{ fontSize: 15, padding: 10 }} numberOfLines={5}>
                      {item.content}
                    </Text>
                    </Hyperlink>
                    {item.content.length > 100 ? (
                      <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("PostSpecificScreensFeed", {
                          post: item,
                        })
                      }
                      style={{ backgroundColor: "#fff" }}
                    >
                      <Text style={{ color: "#989898" }}>
                      {I18n.t("View more")}
                      </Text>
                                </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                  </View>
                  :
                  <View style={{ flex: 2 }}>
                  <Hyperlink linkDefault={ true } linkStyle={{color:'#6FA4E9'}}>
                  <Text style={{ fontSize: 15, padding: 10 }} >
                    {item.content}
                  </Text>
                  </Hyperlink>
            
                </View>
                }
                  
        
                </Paragraph>
                                <RNUrlPreview text={item.content}/>
              </View>
            </View>
          </View>

{/* 
                                {

item.photo && item.photo.length > 0?

<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>

{
item.video.length>0?
<FlatList
data={[item.video, ...item.photo]}
horizontal={true}
showsHorizontalScrollIndicator={false}
renderItem={({ item, i }) => (
<View style={{ marginRight: 10 }}>
{
String(item).substr(String(item).length - 3) == 'mp4'?
<>
<Text>Hiiis</Text>
<Video source={{uri: String(item)}}   
ref={(ref) => {
player = ref
}}     
// onFullscreenPlayerWillPresent={()=>startedPlaying} 
// onMagicTap={()=>startedPlaying()}
// onAccessibilityTap={()=>startedPlaying()}         
paused={true}          
controls={true}
fullscreen={true}
resizeMode="cover"  

style={{height:480,width:Dimensions.get('window').width}}
/>
</>
:
<TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: currentCard.photos,content:currentCard.content,name:currentCard.uservisibility.name,profilePic:currentCard.uservisibility.profilePic, time:currentCard.createdAt,post:currentCard,showHeader: true }) }}>
<Image source={{ uri: item }} cache="force-cache" style={{
width:Dimensions.get('window').width,
height: 480,
resizeMode: "cover",
}}placeholderStyle={{backgroundColor:'#fff'}}
PlaceholderContent={renderImageLoader}></Image>
</TouchableOpacity>
}

</View>
)}
/>

:
<FlatList
data={[...item.photo]}
horizontal={true}
showsHorizontalScrollIndicator={false}
renderItem={({ item, i }) => (
<View style={{ marginRight: 10 }}>
{
String(item).substr(String(item).length - 3) == 'mp4'?

<Video source={{uri: String(item)}}   // Can be a URL or a local file.
ref={(ref) => {
player = ref
}}          
paused={true}          
controls={true}
fullscreen={true}
resizeMode="cover"  

style={{height:480,width:Dimensions.get('window').width}}
/>
:
<TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: currentCard.photos,content:currentCard.content,name:currentCard.uservisibility.name,profilePic:currentCard.uservisibility.profilePic, time:currentCard.createdAt,post:currentCard, showHeader: true}) }}>
<Image source={{ uri: item }} cache="force-cache" style={{
width:Dimensions.get('window').width,
height: 480,
resizeMode: "cover",
}}placeholderStyle={{backgroundColor:'#fff'}}
PlaceholderContent={renderImageLoader}></Image>
</TouchableOpacity>
}

</View>
)}
/>

}



</View>
:item.video.length>0?
<View style={{ marginRight: 10 }}>

<Video source={{uri: item.video[0]}}   // Can be a URL or a local file.
ref={(ref) => {
player = ref
}}          
paused={true}          
controls={true}
fullscreen={true}
resizeMode="cover"  

style={{height:480,width:Dimensions.get('window').width}}
/>

</View>
:<></>

} */}
<TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: currentCard.photos,content:currentCard.content,name:currentCard.uservisibility.name,profilePic:currentCard.uservisibility.profilePic, time:currentCard.createdAt,post:currentCard, showHeader: true}) }}>
<ImagesGrid images={[...item.photo]} video={[...item.video]} navigation={navigation}/>
</TouchableOpacity>
<View style={{ backgroundColor: "#fff", height: "auto" }}>
          <View style={{ flexDirection: "row", marginTop: 0 }}>
              
            </View>
   
            <View
              style={{
                marginTop: 5,
                marginLeft: 10,
                width:'95%',
                marginRight: 0,
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
              }}
            />
{/* icons start? */}
<View
              style={{ flex: 0, flexDirection: "row", magin: 0,justifyContent:'center',justifyContent:'space-between' }}

            >
              {/* likes */}
             <View style={{ flexDirection: 'column' }}>
              <TouchableOpacity
                onPress={() => onLike(index, 'within')}
              >
                
                {
                  liked?
                  <Image
                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.17_PM_gudcen.png' }}
                  style={{ height: 25,width: 25,margin: 23,marginTop:7}}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}
                ></Image>
                  :
                  <Image
                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044952/Screenshot_2021-05-26_at_9.31.09_PM_qsntda.png' }}
                  style={{ height: 25,width: 25,margin: 23,marginTop:7}}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}
                ></Image>
                }
             
                <Text style={{ position: 'absolute', top: 33, left: 31, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>{currentCard.likes && currentCard.likes.length}</Text> 
              
              
              </TouchableOpacity>

              </View>
              
              {/* Comments */}
              
              <View style={{ flexDirection: 'column' }}>
              {
                item.subposts? 
             
              <TouchableOpacity
              onPress={() =>
                navigation.navigate("PostSpecificScreensFeed", {
                  post: item,
                  naviga:'Market'
                })
               
              }
              style={{ backgroundColor: "#fff" }}
            >
              <Image 
                    source={require("../assets/icons/comment.png")}
                  style={{ height: 25,width: 25,margin: 23,marginTop:6}}
                  placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}
                    />
              <Text style={{ position: 'absolute', top: 33, left: 32, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>
                {item.subposts.length}
             </Text>
            </TouchableOpacity>
              :
               <TouchableOpacity
              onPress={() =>
                navigation.navigate("PostSpecificScreensFeed", {
                  post: item,
                  naviga:'Market'
                })
                
              }
              style={{ backgroundColor: "#fff" }}
             >
              <Text style={{ color: "#6FA4E9", paddingLeft: 10,fontSize:12 }}>
                {item.subposts.length} 
             </Text>

            </TouchableOpacity>
              }
              </View>


              {/* Phone call */}
              <View style={{flexDirection: 'column'}}>

              <TouchableOpacity onPress={() => {makeCalls(item)}}>
                <Image
                  source={require("../assets/icons/call.png")}
                
                  style={{ height: 23,width: 23,margin: 23,marginTop:9}}
                  placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                ></Image>
                 <Text style={{ position: 'absolute', top: 33, left: 29, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}> {I18n.t('Call')}</Text> 

              </TouchableOpacity>

           </View>
              

              {/* Chat */}
           <View style={{flexDirection: 'column'}}>

              {
                item.uservisibility.chat?
                
                <TouchableOpacity onPress={() => clickedChat(item)}>
                <Image
                  source={require("../assets/icons/chat.png")}

                  style={{ height: 23,width: 23,margin: 23,marginTop:9,marginLeft:30}}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}
                ></Image>
                <Text style={{ position: 'absolute', top: 33, left: 33, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>{I18n.t('Chat')}</Text> 

              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => refRBSheetss.current.open()}>
              <Image
                     source={require("../assets/icons/chatdisable.png")}
                     // source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.39_PM_upsvxi.png' }}
                 style={{ height: 23,width: 23,margin: 23,marginTop:9}}placeholderStyle={{backgroundColor:'#fff'}}
                 PlaceholderContent={renderImageLoader}
              ></Image>
                 <Text style={{ position: 'absolute', top: 33, left: 23, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>{I18n.t('Chat')}</Text> 

              </TouchableOpacity>
                
              }

              </View>
              
          
              {/* WhatsApp Share */}
           <View style={{flexDirection: 'column'}}>

              <TouchableOpacity onPress={() => WhatsAppShare(item)}>
              <View style={{flexDirection:'row'}}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png' }}
                style={{ height: 25,width: 25,margin: 23,marginTop:8}}placeholderStyle={{backgroundColor:'#fff'}}
                PlaceholderContent={renderImageLoader}
              ></Image>
                   {
                 item.myshares && item.myshares.length>0 ?
                 <Text style={{ position: 'absolute', top: 22, left: 30, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>{item.myshares[0].shares}</Text> :
                 <Text style={{ position: 'absolute', top: 22, left: 30, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>0</Text>
                }
                </View>
              </TouchableOpacity>
           </View >
             
            </View>

          </View>

            {/* icons end */}
          
                </Card>

    ) : item.featureName == "greet" ? (
     
        <Card style={styles.eachCard}>

          <View>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              <View
                style={{ flex: 4, paddingLeft: 20, paddingTop: 20 }}
              >
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flex: 3 }}>
                    <Image
                      cache="force-cache"
                      source={{ uri: item.uservisibility.profilePic }}
                      style={{
                        height: 55,
                        width: 55,
                        paddingLeft: 20,
                        borderRadius: 30,
                      }}placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 20,
                  paddingLeft: 10,
                  paddingTop: 15,
                  fontSize: 20,
                }}
              >
                <Text style={{ fontWeight: "bold"}}>
                {item.uservisibility.name.charAt(0).toUpperCase() +item.uservisibility.name.slice(1)}
                </Text>
                <Text style={{ marginTop:0,fontSize:10,color:'#989898' }}>
                  {/* {moment(item.createdAt).fromNow()} */}
                  {moment(item.createdAt).fromNow()}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PostSpecificScreensFeed", {
                      post: item,
                      naviga:'All'
                    })
                  }
                  style={{ backgroundColor: "#fff" }}
                >
                 
             
                 <View style={{flexDirection:'row',marginTop:5}}>  
                  <View>
                  <Text style={{ color: "#989898",fontSize:10}}>
                  <Image 
                  source={require("../assets/icons/eye.png")} 
                  style={{height:9, width: 22}}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}/>
                    {item.viewedUsers && item.viewedUsers.length} Views</Text>
                    </View>  
                    </View>
                  </TouchableOpacity>
              </View>
              <View style={{ marginRight: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    return openDots(item, 'within');
                  }}
                >
                  <Image
                    cache="force-cache"
                    source={require("../assets/icons/horizontaldots.png")}
                    style={{
                      height: 12,
                      width: 25,
                      paddingLeft: 10,
                      marginTop: 10,
                    }}placeholderStyle={{backgroundColor:'#fff'}}
                    PlaceholderContent={renderImageLoader}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity  onPress={() =>
                       alert('not yet implemented')
                      }>
                <Image 
                  source={require("../assets/icons/bookmark.png")} 
                  style={{height:22, width: 13, right:0, marginTop: 10}}/>
                </TouchableOpacity> */}

                <TouchableOpacity
                onPress={() => onbookmark(index, 'within')}
              >
                
                {
                  bookmark?
                  <Image 
                  source={require("../assets/icons/savedbookmark.png")} 
                  style={{height:22, width: 13, right:0, marginTop: 10}}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}/>
                  :
                  <Image 
                  source={require("../assets/icons/bookmark.png")} 
                  style={{height:22, width: 13, right:0, marginTop: 10}}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}/>
                }
             
               
              </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                paddingLeft: 10,
                marginBottom: 0,
                flexDirection: "column",
              }}
            >
              <View style={{ flex: 2 }}>

{
            
            item.content.length>100?
            <Text style={{color:'#fff', fontWeight:'500'}}>
            {item.content.substr(0,100)}....
            </Text>
            :
          
            <>
           
           </>
            
            }
                <Paragraph style={{ fontSize: 15 }}>
                  <Hyperlink linkDefault={ true } linkStyle={{color:'#6FA4E9'}}>
                  <Text numberOfLines={5}>
                    {item.content}
                  </Text>
            </Hyperlink>
                </Paragraph>
                                <RNUrlPreview text={item.content}/>
                {item.content.length > 100 ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("PostSpecificScreensFeed", {
                        post: item,
                      })
                    }
                    style={{ backgroundColor: "#fff" }}
                  >
                    <Text style={{ color: "#989898" }}>{I18n.t("View more")}</Text>
                  </TouchableOpacity>
                ) : (
                  <Text></Text>
                )}
              </View>
            </View>
          </View>
          {

item.photo && item.photo.length > 0?

<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>

{
item.video && item.video.length>0?
<FlatList
data={[item.video, ...item.photo]}
horizontal={true}
showsHorizontalScrollIndicator={false}
renderItem={({ item, i }) => (
<View style={{ marginRight: 10 }}>
{
String(item).substr(String(item).length - 3) == 'mp4'?

<Video source={{uri: String(item)}}   // Can be a URL or a local file.
ref={(ref) => {
player = ref
}}          
paused={true}          
controls={true}
fullscreen={true}
resizeMode="cover"  

style={{height:480,width:Dimensions.get('window').width-150}}
/>
:
<TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: currentCard.photos,content:currentCard.content,name:currentCard.uservisibility.name,profilePic:currentCard.uservisibility.profilePic, time:currentCard.createdAt,post:currentCard,showHeader: true }) }}>
<Image source={{ uri: item }} cache="force-cache" style={{
width:Dimensions.get('window').width,
height: 480,
resizeMode: "cover",
}}placeholderStyle={{backgroundColor:'#fff'}}
PlaceholderContent={renderImageLoader}></Image>
</TouchableOpacity>
}

</View> 
)}
/>

:
<FlatList
data={[...item.photo]}
horizontal={true}
showsHorizontalScrollIndicator={false}
renderItem={({ item, i }) => (
<View style={{ marginRight: 10 }}>
{
String(item).substr(String(item).length - 3) == 'mp4'?

<Video source={{uri: String(item)}}   
ref={(ref) => {
player = ref
}}          
paused={true}          
fullscreen={true}
resizeMode="cover"  

controls={true}
style={{height:480,width:Dimensions.get('window').width-150}}
/>
:
<TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: currentCard.photos,content:currentCard.content,name:currentCard.uservisibility.name,profilePic:currentCard.uservisibility.profilePic, time:currentCard.createdAt,post:currentCard,showHeader: true }) }}>
<Image source={{ uri: item }} cache="force-cache" style={{
width:Dimensions.get('window').width,
height: 480,
resizeMode: "cover",
}}placeholderStyle={{backgroundColor:'#fff'}}
PlaceholderContent={renderImageLoader}></Image>
</TouchableOpacity>
}

</View>
)}
/>
}



</View>
:item.video &&  item.video.length>0?
<View style={{ marginRight: 10 }}>

<Video source={{uri: item.video[0]}}   // Can be a URL or a local file.
ref={(ref) => {
player = ref
}}          
paused={true}       
fullscreen={true}   
controls={true}
resizeMode="cover"  

style={{height:480,width:Dimensions.get('window').width-150}}
/>

</View>
:<></>

}
          <View style={{ backgroundColor: "#fff", height: "auto" }}>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              
            </View>
            <View
              style={{
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                borderBottomColor: "#D7D7D7",
                borderBottomWidth: 0.5,
                flex: 5,
              }}
            />
            <View
              style={{
                flex: 0,
                flexDirection: "row",

               
              }}
            >
              <View style={{ flex: 0, marginLeft: 10 }}>

              <View
style={{flexDirection: "row"}}
>

{/* <View style={{ flexDirection: 'column',flex:0,left:Dimensions.get('window').width/2 }}> */}
<View >
<TouchableOpacity
                onPress={() => onLike(index, 'within')}
              >
                
                {
                  liked?
                  <Image
                  source={require('../assets/bottomCard/liked.png')}

                  style={{ height: 25,width: 25,margin: 15,marginTop:7}}
                  PlaceholderContent={<ActivityIndicator />}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}></Image>
                  :
                  <Image
                  source={require('../assets/bottomCard/disliked.png')}
                  style={{ height: 25,width: 25,margin: 15,marginTop:7}}
                  placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}placeholderStyle={{backgroundColor:'#fff'}}
                  PlaceholderContent={renderImageLoader}></Image>
                }
             
                <Text style={{ position: 'absolute', top: 33, left: 24, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>{currentCard.likes && currentCard.likes.length}</Text> 
              
              
              </TouchableOpacity>
</View>

{/* </View> */}
<View >
{
    item.userId == userId?
    <TouchableOpacity onPress={() => { 
       alert('This is your Post')
        }}>
        <Text style={{marginTop:15,color:'#6FA4E9',marginLeft:200}}>Request to Chat</Text>
        </TouchableOpacity>
    :
    <TouchableOpacity onPress={() => { 
        navigation.navigate("PostSpecificScreensFeed", {
        post: item,
        naviga:'Market'
        })
        }}>
        <Text style={{marginTop:15,color:'#6FA4E9',marginLeft:200}}>Request to Chat</Text>
        </TouchableOpacity>
}



</View>



</View>
              </View>




            </View>
          </View>
       
       
        </Card>

    ) : (
      <></>
    )
}


</>
:<></>
}
</>
)

}


const styles = StyleSheet.create({
  spinnerTextStyle: { 
    color: '#FFF',
    fontSize:16
  },
  centeredView: {
  flex: 1,
  // justifyContent:'center',
  alignItems:'center',
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
map:{
  height: 25,
  width: 25,
  marginTop: 6
  
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
  elevation:0,
  marginTop: 0,
  height:'auto'
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
  backgroundColor: '#ffff',
  borderRadius: 4,
  flexDirection: 'row',
  borderRadius: 10,
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: '#6FA4E9',
  alignItems: 'center',
},
btnText: {
  color: '#6FA4E9',
  fontSize: 15,
  textAlign: 'center',
},
centeredView: {
  flex: 1,
  marginTop: 22
},
modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 20,
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
input: {
  height: 40,
  margin: 12,
  borderWidth: 1,
},



});


const mapStatetoProps = (state) => {
  // const { }=state
  return {
    chat_roster_main: state.chatss.chat_roster_main,
    allMapPosts:state.chatss.allMapPosts,
    token:state.chatss.token,
    chat_password: state.chatss.chat_password,
    jid_main: state.chatss.jid_main,
    token: state.chatss.token,
    userId:state.chatss.userId,
    refreshAfterPost:state.chatss.refreshAfterPost,
    isConnected:state.chatss.isConnected,
    Userpreferences:state.chatss.preferences
  };
};

// exports.finalXMPP = finalXMPP;
export default connect(mapStatetoProps)(f);