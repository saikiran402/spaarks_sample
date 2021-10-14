import React, { useEffect, setState, useRef, useState } from "react";
import { TabRouter, useTheme } from "@react-navigation/native";
import {
  Share,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  View,
  StyleSheet,
  Alert,
  Dimensions,
  LogBox,
  Linking,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import Modal from 'react-native-modal';
import { Image, } from 'react-native-elements';
import Textarea from "react-native-textarea";
import axios from "axios";
import { AirbnbRating} from "react-native-elements";
import { canPost } from '../screens/authGuard'
import { connect, useDispatch, useReducer } from "react-redux";
import {confirmlogout } from '../screens/xmpp';
import chatReducers from "../reducers/chatReducers";
import chatReducersactual from "../reducers/chatReducersactual";
import Star from 'react-native-star-view';
import ImagesGrid from './ImagesGrid';
import MarkersScreen from './MarkersScreen';
LogBox.ignoreAllLogs();
import moment from "moment";
import Carousel from 'react-native-snap-carousel';
import { Text} from "react-native-elements";
import QuestionsCards from '../components/QuestionsCards';
import {sendMessage} from '../screens/xmpp'
import Poll from "../components/poll";

import {
  Button,
  Card,
  Paragraph,
} from "react-native-paper";
import Snackbar from 'react-native-snackbar';
import RBSheet from "react-native-raw-bottom-sheet";
import Hyperlink from 'react-native-hyperlink'
import RNUrlPreview from 'react-native-url-preview';
import AsyncStorage from "@react-native-community/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';
import I18n from '../src/i18n';
import { FlatList } from "react-native";
import RNPoll, { IChoice } from "react-native-poll";
import RNAnimated from "react-native-animated-component";
const { width: ScreenWidth } = Dimensions.get("window");
const GLOBAL = require('../Globals');
const PostCard = ({ navigation, token, Userpreferences, parentClick, isConnected, filterContent, item, index, banners, allMapPosts, bookmarked, userId, pendingWorks, pendingRatings, chat_roster_main,from,getDataforBookmarks,flatListWithin }) => {
  const [currentCard, setCurrentCard] = useState(item)
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [spinnerText, setSpinnerText] = useState('Loading');
  const indexes = [4, 8, 12, 16, 20, 24]
  global.postcurrent = ['0'];
  global.navigation = null
  global.type = 'within';
  global.token = 'null';
  global.chat_roster_main = [];
  global.Chatdispatcherss = null;
  global.apnToken = null;
  const Chatdispatcher = useDispatch(chatReducers);
  const ActualChatdispatcher = useDispatch(chatReducersactual);
  const refRBSheet = useRef();
  const MapShowSheet = useRef();
  const deleteMyPost = useRef();
  const refRBSheets = useRef();
  const refRBSheetss = useRef();
  const refCallSpaarksCall = useRef()

  const Login = useRef();


  var choices = [
    { id: 1, choice: "messi", votes: 17 },
    { id: 2, choice: "ronaldo", votes: 7 },
    { id: 3, choice: "neymar", votes: 1 },
    { id: 4, choice: "suarez", votes: 5 },
  ];
  
  var votess = choices.reduce(function(a, b){
    return a = a+b.votes;
  },0);
  const [totVote , setTotvote] = useState(0)
  // if(item.pollPost){
  //   const [totVote , setTotvote] = useState(item.votes.length)
  // }


  function updateText(a) {
    setContent(a);
  }
  async function selectedPostMap(post, type) {
    MapShowSheet.current.open()
  }
  async function blockUser(currentPost) {
    // alert('blocking')
    setSpinner(true)
    setSpinnerText('Blocking User')
    var jwt = await AsyncStorage.getItem('token');
    await axios.post(
      `${GLOBAL.BASE_URL}user/blockuser/post`,
      {
        userId: currentPost.userId,
        jid: currentPost.jid,
        mjid: 1,
        featureName: currentPost.featureName,
        postId: currentPost._id

      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            'Bearer ' + jwt
        },
      }
    ).then(async(resp) => {
      console.log("succesfully blocked")
      console.log("blockuserdata", resp.data)
      var a = await AsyncStorage.getItem('jid_main')
      const message = [
        {
          type: "block",
          content: a
        }];
      sendMessage(message, currentPost.jid);
      Chatdispatcher({ type: 'BLOCKHIM', jid:currentPost.jid })
      setTimeout(() => {
        setSpinner(false)
      }, 2000);
      showBlockReason(resp.data.message)
    }).catch((err) => {
      setTimeout(() => {
        setSpinner(false)
      }, 2000);
      console.log("blockerror", err)
      showBlockReason('You have already blocked this user')

    })
  }
  async function ignoreRating() {
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
            'Bearer ' + jwt
        },
      }
    ).then((resp) => {
      console.log("succesfully ignored")


    }).catch((err) => {
      console.log("ignorerating error", err)


    })
  }
  const [coordinates] = useState([
    {

      latitude: 17.407839,
      longitude: 78.442420,
    },
    {
      latitude: 17.408003,
      longitude: 78.445381,
    },
  ]);
  async function clickedChat(l) {
    var jwt = await AsyncStorage.getItem('token');
    if (String(jwt) != "null") {
    if (isConnected) {
      setSpinner(true)
      setSpinnerText('Connecting')
      var token = await AsyncStorage.getItem('token');
      var canposts = await canPost()
      var found = false;
      var jid = await AsyncStorage.getItem('jid_main');

      if (l.jid == jid) {
        setSpinner(false)
        alert(I18n.t('This is your Post'))
      } else {
        if (canposts) {
          var messages = [];
          chat_roster_main.forEach(list => {
            console.log('sdsdsd', list.jid, l.jid)
            if (list.jid == l.jid) {
              found = true;
              messages = list.messages;
            }
          })
          // setTimeout(async () => {
            if (found) {
              setSpinner(false)
              navigation.navigate("ChatSpecificScreen", {
                name: l.uservisibility.name.substr(0, 15),
                profilePic: l.uservisibility.profilePic,
                jid: l.jid,
                xmpp: null,
                connection: [l.featureName],
                messages: messages,
                media: [],
                item: {
                  _id: l.userId,
                  aid: l.aid,
                  blocked: false,
                  blockedMe: false,
                  canResume: false,
                  chatExit: false,
                  chatExitMe: false,
                  clearChat: -1,
                  contactMe: true,
                  connection: ["Market"],
                  jid: l.jid,
                  name: l.uservisibility.name,
                  offline_count: 0,
                  profilePic: l.uservisibility.profilePic,
                  userId: l.userId,
                  messages: [],
                  message: "",
                  unread: 0,
                  photos: [],
                  amIAnonymous: false,
                  isOtherAnonymous: false
                }
              });
            } else {
              console.log({
                mjid: 1,
                jid: l.jid,
                featureName: l.featureName,
                name: l.uservisibility.name,
                profilePic: l.uservisibility.profilePic
              })
              console.log(GLOBAL.BASE_URL + 'user/addtoroster')
              // await axios.post(GLOBAL.BASE_URL + 'user/addtoroster',
              //   {
              //     mjid: 1,
              //     jid: l.jid,
              //     featureName: l.featureName,
              //     name: l.uservisibility.name,
              //     profilePic: l.uservisibility.profilePic
              //   },
              //   {
              //     headers: {
              //       'Content-Type': 'application/json',
              //       Authorization:
              //         'Bearer ' + token
              //     },
              //   }).then((resp) => {

                  // alert('Success')
                  // console.log('resprespresp', resp.data)
                  var mymes = {
                    content: `Click to send Message`,
                    text: `Click to send Message`,
                    messageType: 'huhuuu',
                    createdAt: Date.now(),
                    _id: Date.now() * Math.random(),
                    unique: Date.now() * Math.random(),
                    messageId: Date.now() * Math.random(),
                    type: "chat",
                    user: {
                      _id: 2,
                      name: l.uservisibility.name,
                      avatar: l.uservisibility.profilePic
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
                    connection: [l.featureName],
                    jid: l.jid,
                    name: l.uservisibility.name,
                    message: `Click to send Message`,
                    messages: [],
                    offline_count: 0,
                    profilePic: l.uservisibility.profilePic,
                    userId: l.uservisibility._id,
                    updatedAt: Date.now(),
                  };
                  eachuser.messages.push(mymes);

                  // ActualChatdispatcher({
                  //   type: "ADDTOROSTERMAIN",
                  //   _id: eachuser._id,
                  //   aid: eachuser.aid,
                  //   blocked: eachuser.blocked,
                  //   blockedMe: eachuser.blockedMe,
                  //   canResume: eachuser.canResume,
                  //   chatExit: eachuser.chatExit,
                  //   chatExitMe: eachuser.chatExitMe,
                  //   clearChat: eachuser.clearChat,
                  //   contactMe: eachuser.contactMe,
                  //   connection: eachuser.connection,
                  //   jid: eachuser.jid,
                  //   name: eachuser.name,
                  //   messages: eachuser.messages,
                  //   message: eachuser.message,
                  //   offline_count: eachuser.offline_count,
                  //   profilePic: eachuser.profilePic,
                  //   userId: eachuser.userId,
                  //   updatedAt: Date.now(),
                  // });
                  setSpinner(false)
                  navigation.navigate("ChatSpecificScreen", {
                    name: l.uservisibility.name.substr(0, 15),
                    profilePic: l.uservisibility.profilePic,
                    jid: l.jid,
                    connection: [l.featureName],
                    xmpp: null,
                    messages: [],
                    media: [],
                    item: {
                      _id: l.userId,
                      aid: l.aid,
                      blocked: false,
                      blockedMe: false,
                      canResume: false,
                      chatExit: false,
                      chatExitMe: false,
                      clearChat: -1,
                      contactMe: true,
                      connection: ["Market"],
                      jid: l.jid,
                      name: l.uservisibility.name,
                      offline_count: 0,
                      profilePic: l.uservisibility.profilePic,
                      userId: l.userId,
                      messages: [],
                      message: "",
                      unread: 0,
                      photos: [],
                      amIAnonymous: false,
                      isOtherAnonymous: false
                    }
                  });
                // }).catch((err) => {
                //   setSpinner(false)
                //   alert('Error')
                //   console.log('Error', err)
                // })

            }
          // }, 1000);


          // return (<LoginToAccessScreen></LoginToAccessScreen>)
        } else {
          Login.current.open();
        }
      }

    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }
  }else{
    Login.current.open()
  }

  }
  const WhatsAppShare = async (post) => {
    try {
      console.log('---------------------')
      console.log(post)
      console.log(post.questionNo)
      console.log('---------------------')
      if (post.questionNo == '1') {
        if (post.tags.length > 0) {
          var a = `${post.tags[0].name}\n${post.content}\n\n ${post.uservisibility.share} \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
        *Connect*  to your local area wherever you go.`;
        } else {
          var a = `*Announcement* \n${post.content}\n\n ${post.uservisibility.share} \n\n Download Spaarks app - https://cutt.ly/Spaarks-app\n*Connect*  to your local area wherever you go.`;
        }

      }

      if (post.questionNo == '2') {
        var a = `${post.tags[0].name}\n${post.content}\n\n ${post.uservisibility.share} \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
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
        var a = `${post.tags[0].name}\n*Content:*${post.content}\n\n ${post.uservisibility.share} \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
      *Connect*  to your local area wherever you go.`;
      }

      if (post.questionNo == 'Find a Job') {
        var a = `*JOB*${post.tags[0].name}\n*Content:*${post.content}\n\n ${post.uservisibility.share} \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
      *Connect*  to your local area wherever you go.`;
      }


if(a){
  let url = "whatsapp://send?text=" + a;
  Linking.openURL(url)
}else{
  alert("Can't Share this Spaark")
}
   
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
  async function renderImageLoader() {
    return (
      <ActivityIndicator />
    )
  }
  async function reportUser() {

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
            'Bearer ' + jwt
        },
      }
    ).then((resp) => {
      showSnackReport(resp.data.message)
    }).catch((error) => {
      console.log(error)
      if (error.response.status == 401) {
        confirmlogout(Chatdispatcher, navigation)
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
  async function showBlockReason(reason) {
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
  async function deleteSpaark1() {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete Spaark?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => deleteSpaark() }
      ]
    );
  }
  async function deleteSpaark(i, type) {
    var jwt = await AsyncStorage.getItem('token');
    await axios.delete(GLOBAL.BASE_URL + `${item.featureName}/post/${item._id}`, {
      headers: {
        Authorization:
          'Bearer ' + jwt
      },
    })
      .then(async (resp) => {
        // const newDataSourceWithin = dataSourceWithin.filter((item) => item._id !== dataSourceWithin[Number(global.postcurrent[0])]._id);
        // setDataSourceWithin([...newDataSourceWithin])
        // alert('deleting')
        setCurrentCard(null)
        deleteMyPost.current.close();
        Snackbar.show({
          text: I18n.t('Spaark Deleted Succesfully'),
          duration: Snackbar.LENGTH_LONG
        });
      }).catch((error) => {
        if (error.response.status == 401) {
          confirmlogout(Chatdispatcher, navigation)
        }
      })
  }

  async function confirmCall(){
    normalCallOption()
    navigation.navigate('OutGoingCallScreen', { aid: item.aid, name: item.uservisibility.name, profilePic: item.uservisibility.profilePic, callerId: item.aid + '@103.27.86.24' })
  }
  async function makeSpaarksCall() {
    if (isConnected) {

      var jwt = await AsyncStorage.getItem('token');
      await axios.post(GLOBAL.BASE_URL + `user/addtologs/logs/${item.aid}/${item.userId}`, {
        "name": item.uservisibility.name,
        "profilePic": item.uservisibility.profilePic
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              'Bearer ' + jwt
          },
        }).then((resp) => {
          console.log(resp.data);
          // getData()
          if (String(jwt) != "null") {
            refCallSpaarksCall.current.close()
            Alert.alert(
              I18n.t("Confirmation"),
            I18n.t("Are you sure you want to call "),
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "Call", onPress: () => confirmCall() }
              ]
            );
            
            

          } else {
            refCallSpaarksCall.current.close()
            Login.current.open()
          }

          // navigation.navigate('OutGoingCallScreen',{aid:call.aid,name:call.name,profilePic:call.profilePic})
        }).catch((error) => {
          alert(error.response.data.message)
          // if(error.response.status== 401){
          //   confirmlogout(Chatdispatcher,navigation)
          // }
        })








    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }

  }
  async function makeNormalCall() {
    // alert(item.mobileNumber)
    if (isConnected) {
      var jwt = await AsyncStorage.getItem('token');
      if (String(jwt) != "null") {
        refCallSpaarksCall.current.close()
        normalCallOption()
        Linking.openURL(`tel:${item.mobileNumber}`);
      } else {
        refCallSpaarksCall.current.close()
        Login.current.open()
      }

    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }
    // navigation.navigate('OutGoingCallScreen',{aid:item.aid,name:item.uservisibility.name,profilePic:item.uservisibility.profilePic,callerId:call+'@103.27.86.24'})
  }
  function onLogin(phone) {
    if (isConnected) {
      console.log("phoness", phone)
      Login.current.close();
      navigation.navigate('VerifyOtpScreen', { phone: phone })
    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }
  }
  async function submitRating() {

    if (isConnected) {
      var jwt = await AsyncStorage.getItem('token');
      await axios.post(
        GLOBAL.BASE_URL + "market/giveRating",
        {
          "rating": rating,
          "description": content,
          "postId": currentRating.id,
          "ratingId": currentRating._id,
          "userId": currentRating.uid._id
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
          setModalVisible(false)
          console.log('ratingggggg', responseJson.data)
          var pendingRatingsnew = pendingRatings.filter((rating) => { return rating._id != currentRating._id })
          setCurrentPendingWorks(pendingRatingsnew)
          // setBookmark(true)
        })
        .catch((error) => {
          if (error.response.status == 401) {
            confirmlogout(Chatdispatcher, navigation)
          }
          console.error(error);
        });

    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }

  }
  async function openDots(i, type) {
    if (isConnected) {
      var userIdd = await AsyncStorage.getItem('userId');
      // var canposts = await canPost()
      console.log('tokentokentokentokentokentoken', token)
      // alert(canposts)
      var tokens = await AsyncStorage.getItem('token')
      // alert(tokens)
      if (tokens != "null") {
        // alert('LoggedIn')
        if (type == 'within') {
          if (userIdd == item.userId) {
            global.postcurrent[0] = String(i);
            global.type = type;
            deleteMyPost.current.open()
          } else {
            global.postcurrent[0] = String(i);
            global.type = type;
            console.log(global.postcurrent[0])
            refRBSheet.current.open()
          }
        } else {
          if (userIdd == item.userId) {
            global.postcurrent[0] = String(i);
            global.type = type;
            deleteMyPost.current.open()
          } else {
            global.postcurrent[0] = String(i);
            global.type = type;
            console.log(global.postcurrent[0])
            refRBSheet.current.open()
          }
        }




      } else {
        // alert('Login')
        Login.current.open()
      }
    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }




  }
  // This is to send Job and Want Work as Search preference
  async function clickedPredefined(category, subCategory, Userpreferences) {
    console.log('UserpreferencesUserpreferencesUserpreferencesUserpreferencesUserpreferencessss', Userpreferences);
    if (isConnected) {
      console.log(category, subCategory)
      // parentClick()
      const newPre = {
        category: category,
        subCategory: subCategory,
        selected: true,
        fromSearch: true
      };
      const newPre1 = {
        category: 'All',
        subCategory: 'All',
        selected: false,
        fromSearch: true
      }
      console.log('NewDataNewDataNewDataNewData', Userpreferences, Userpreferences.length)
      if (Userpreferences && Userpreferences.length > 0) {
        Userpreferences.shift();
        Userpreferences.splice(0, 0, newPre1)
        Userpreferences.splice(1, 0, newPre)

        Chatdispatcher({ type: 'SETPREFERENCES', preferences: Userpreferences })
        Chatdispatcher({ type: 'SETSELECTEDPREFERENCE', selectedPreference: subCategory, category: category, subCategory: subCategory })
        await AsyncStorage.setItem('prefernces', JSON.stringify(Userpreferences));
        navigation.navigate('Market',{isFromPill:true})
        // navigation.navigate('SearchScreen',{content:subCategory,isFromPost:true})
        // if(parentClick()){
        //   parentClick()
        //   navigation.navigate('Market')
        // }else{
        //   navigation.navigate('Market')
        // }

      } else {
        var Userpreferences = [];
        Userpreferences.push(newPre1)
        Userpreferences.push(newPre);
        Chatdispatcher({ type: 'SETPREFERENCES', preferences: Userpreferences })
        Chatdispatcher({ type: 'SETSELECTEDPREFERENCE', selectedPreference: subCategory, category: category, subCategory: subCategory })
        await AsyncStorage.setItem('prefernces', JSON.stringify(Userpreferences));
        // navigation.navigate('SearchScreen',{content:subCategory,isFromPost:true})
        navigation.navigate('Market',{isFromPill:true})
        // if(parentClick()){
        //   parentClick()
        //   navigation.navigate('Market')
        // }else{
        //   navigation.navigate('Market')
        // }

      }

    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }

  }
  const [liked, setLiked] = useState(item.Iliked)
  const [likedCount, setLikedCount] = useState(item.likes && item.likes.length)
  const [commentsCount, setCommentsCount] = useState(item.commentsc && item.commentsc)
  const [bookmark, setBookmark] = useState(bookmarked)

  async function onbookmark() {

    if (isConnected) {
      var jwt = await AsyncStorage.getItem('token');
      if (String(jwt) != "null") {
        if (bookmark) {

          setBookmark(false)
          if(from == 'Bookmark'){
            getDataforBookmarks()
          }
          Snackbar.show({
            text: I18n.t('Bookmarked removed'),
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
                  'Bearer ' + jwt
              },
            }
          )
            .then((responseJson) => {
              console.log('responseJsonssssssss', responseJson.data)
              // setBookmark(true)
            })
            .catch((error) => {
              if (error.response.status == 401) {
                confirmlogout(Chatdispatcher, navigation)
              }
              console.error(error);
            });
        } else {
          setBookmark(true)
          Snackbar.show({
            text: I18n.t('Bookmarked succesfully'),
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
                  'Bearer ' + jwt
              },
            }
          )
            .then((responseJson) => {

              console.log('responseJsonssssssss', responseJson.data)
              // setBookmark(true)
            })
            .catch((error) => {
              if (error.response.status == 401) {
                confirmlogout(Chatdispatcher, navigation)
              }
              console.error(error);
            });
        }
      } else {
        Login.current.open()
      }
    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }



  }


  async function IncreaseCountOnComment(){
    setCommentsCount(commentsCount+1)
    // item.commentsc++;
    // currentCard.likes
  }
  async function onLike(i, type) {
    // console.log("post infor", item.reviews[0])
    if (isConnected) {
      var jwt = await AsyncStorage.getItem('token');
      if (String(jwt) != "null") {
        setLiked(!liked)
        await axios.get(GLOBAL.BASE_URL + item.featureName + '/post/' + item._id + '/like', {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              'Bearer ' + jwt
          }
        }).then((resp) => {
          // alert('')
          // alert(resp.data.message)
          if (item.Iliked) {
            // alert('already liked')
            item.Iliked = false;
            var ndsw = item.likes.filter((list) => { return list != item.userId })
            // var ndsw = item.likes.shift();
            item.likes = ndsw;
            if (likedCount == 0) {
              // console.log('if')
            } else {
              // console.log('else')
              var as = likedCount;
              setLikedCount(as - 1)
            }

          } else {
            item.Iliked = true;
            item.likes.push(item.userId)
            var as = likedCount;
            setLikedCount(as + 1)
          }
          setCurrentCard(item)
        }).catch((err) => {
          // alert('onlike error'
          console.log(err)
          setLiked(!liked)
          if (err.response.status == 401) {

            confirmlogout(Chatdispatcher, navigation)
          }
          console.log("onlikeerror", err)
        })
      } else {
        Login.current.open()
      }
    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }
    // alert('In Like')

  }
  const [rating, setRating] = useState(1)
  async function ratingCompleted(value) {
    // alert(value)
    setRating(value)
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


  var [options,setOptions] = useState([
    { id: 1, choice: "messi", votes: 17 },
    { id: 2, choice: "ronaldo", votes: 7 },
    { id: 3, choice: "neymar", votes: 1 },
    { id: 4, choice: "suarez", votes: 5 },
  ])


  async function voteNow(selectedChoice){
    console.log(selectedChoice)
    var jwt = await AsyncStorage.getItem('token')
    setTotvote(totVote+1)
    axios.post(GLOBAL.BASE_URL+"showtime/post/pollPost", {
      optionId: selectedChoice.id,
      postId:item._id
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          'Bearer ' + jwt
    }
  }).then((resp)=>{
console.log(resp)
  }).catch((err)=>{
    console.log(err)
  })
  }
  async function setPollOptions (){
    if(item.pollPost){
      setTotvote(item.votes.length)
        var i =1;
        var newOptions = [];
        item.pollOptions.forEach(list=>{
          console.log(list)
          var a = { id: list._id, choice: list.option, votes: list.votes.length };
          newOptions.push(a)
          i++;
        })
    
        setOptions(newOptions)
    }
   
  }


  async function ClickedBanner(banners){
    console.log(banners)
    if(banners.relation){
      if(banners.relation == 'createinfo'){
        if(banners.featureName == "friends"){
          navigation.navigate('newInfoStepperSayHii', { questionNo: 2, question: 'Make Friends', excluding: [], featureName: 'greet', mediaP: [], mediaV: [] })

        }else if(banners.featureName == "announce"){
          navigation.navigate('NewInfoStepperScreen', { questionNo: 1, question: I18n.t('Announce something'), excluding: [], featureName: 'showtime', mediaP: [], mediaV: [] })

        }else{
        navigation.navigate('PostSpecifics')
        }
      }
      if(banners.relation == 'sellerprofile'){
        navigation.navigate('SellerProfile')
      }
       if(banners.relation == 'userprofile'){
        navigation.navigate('UserProfileDynamic', { userId: item.userId, })
      }

      if(banners.relation == 'qrcode'){
        
        navigation.navigate('QrcodeMenuScreen')
      }
      if(banners.relation == 'explore'){
        navigation.navigate('MapScreen')
      }
      if(banners.relation == 'settings'){
        navigation.navigate('SettingsScreen')
      }
      if(banners.relation == 'calllogs'){
        navigation.navigate('CallLogsScreen')
      }
      if(banners.relation == 'partner'){
        navigation.navigate('spaarksPartnerScreen0')
      }
      if(banners.relation == 'rewards'){
        navigation.navigate('RewardsScreen')
      }
      if(banners.relation == 'whatsnew'){
        navigation.navigate('ReleaseNotesScreen')
      }
      if(banners.relation == 'help'){
        navigation.navigate('HelpScreen')
        
      }
      if(banners.relation == 'businessenquiry'){
        navigation.navigate('BusinessEnquiries')
        
      }
      if(banners.relation == 'notification'){
        navigation.navigate('Notifications')
        
      }
      if(banners.relation == 'postspecificscreen'){
        alert('Something went wrong')
        // navigation.navigate('ReleaseNotesScreen')
        
      }
      if(banners.relation == 'ratings'){
        alert('Something went wrong')
        // navigation.navigate('ReleaseNotesScreen')
        
      }
      if(banners.relation == 'search'){
        navigation.navigate('SearchScreen')
        
      }
      if(banners.relation == 'chats'){
        navigation.navigate('UserData')
        
      }
      if(banners.relation == 'requests'){
        navigation.navigate('GreetRequestsScreen')
        
      }
    }
    // navigation.navigate('PostSpecifics')
  }
  useEffect(()=>{
    setPollOptions()
  },[])
  async function normalCallOption() {
    // alert('In Like')
    console.log(GLOBAL.BASE_URL + "user/contactMe/" + item._id + "/" + item.userId)
    var jwt = await AsyncStorage.getItem('token');
    if (String(jwt) != "null") {
      await axios.get(GLOBAL.BASE_URL + "user/contactMe/" + item._id + "/" + item.userId, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            'Bearer ' + jwt
        }
      }).then((resp) => {
        console.log("normal call option", resp.data)


      }).catch((err) => {
        // alert('err')
      })


    } else {
      Login.current.open()
    }
  }
  async function makeCalls(l) {
    var jwt = await AsyncStorage.getItem('token')
    if (String(jwt) != "null") {
      var jid = await AsyncStorage.getItem('jid_main');
      if (l.jid == jid) {
        alert('This is your Post')
      } else {
        refCallSpaarksCall.current.open()
      }
    } else {
      Login.current.open()
    }



  }
  const [currentRating, setCurrentRating] = useState(null)
  async function showPendingRatingDialog(item, response) {
    console.log(item)
    setCurrentRating(item)
    setModalVisible(true)
  }
  const [currentWorkstatus, setWorkStatus] = useState(pendingWorks)
  const [currentPendingsWorks, setCurrentPendingWorks] = useState(pendingRatings)
  async function collectReview(item, response) {
    var token = await AsyncStorage.getItem('token');
    console.log(GLOBAL.BASE_URL + "market/confirm/work/" + item._id + "/" + item.uid._id + "/" + response)
    await axios.get(GLOBAL.BASE_URL + "market/confirm/work/" + item._id + "/" + item.uid._id + "/" + response, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          'Bearer ' + token
      },
    }).then((resp) => {
      var pendingWorkss = currentWorkstatus.filter((work) => { return work._id != item._id })
      setWorkStatus(pendingWorkss)
      console.log('collect', resp.data);
      Snackbar.show({
        text: 'Response recorded succesfully',
        duration: Snackbar.LENGTH_LONG
      });

    }).catch((err) => {
      console.log(err)

    })
  }


async function showProfile (item){
  MapShowSheet.current.close()
  navigation.navigate('UserProfileDynamic', { userId: item.userId, })
}

  _renderItemPending = ({ item }) => {

    return (
      <View style={{ backgroundColor: '#fff', borderRadius: 20, borderColor: "#AEAEAE", opactiy: 0.1, borderWidth: 1, marginLeft: 10, marginBottom: 15, marginTop: 10, paddingRight: 0, height: 150, alignItems: "center" }}>
        <View style={{ flexDirection: "row", top: 5 }}>
          <View style={{ left: 3 }}>
            <Image source={{ uri: item.uid.profilePic }} style={{ height: 50, width: 50, marginTop: 20, borderRadius: 30 }} placeholderStyle={{ backgroundColor: '#fff' }}
              PlaceholderContent={renderImageLoader} />
          </View>

          <View style={{ backgroundColor: '#fff', left: 15, height: 80, margin: 0, marginTop: 0, padding: 5, textAlign: 'center', width: Dimensions.get('window').width - 125 }}>
            <Text style={{ color: '#A1A4B2', fontWeight: 'bold' }}>{I18n.t("Collect Review")}</Text>
            <Text style={{ fontWeight: 'bold' }}>{I18n.t("Did you complete your work with")}</Text>
            <Text style={{ fontWeight: 'bold' }}>{item.uid.name}{" "}?</Text>
            <Text style={{ fontWeight: 'bold' }}>{item.category && I18n.t(item.category)}{item.category && "-"}{item.category && I18n.t(item.subCategory)}</Text>
            <View style={{ flexDirection: 'row', marginRight: 150 }}>
              <TouchableOpacity onPress={() => { collectReview(item, "IGN") }}>
                <View style={{ borderWidth: 2, borderColor: '#4B84F1', borderRadius: 10, margin: 5, top: 10, marginVertical: 10 }}>
                  <Text style={{ color: '#4B84F1', padding: 5 }}>{I18n.t("Ignore")}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { collectReview(item, "STG") }}>

                <View style={{ borderWidth: 2, borderColor: '#4B84F1', borderRadius: 10, margin: 5, top: 10, marginVertical: 10 }}>
                  <Text style={{ color: '#4B84F1', padding: 5 }}>{I18n.t("Not yet")}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { collectReview(item, "CMPT") }}>

                <View style={{ borderWidth: 2, borderColor: '#4B84F1', backgroundColor: '#4B84F1', top: 10, borderRadius: 10, margin: 5, marginVertical: 10 }}>
                  <Text style={{ color: '#fff', padding: 5 }}>{I18n.t("Completed")}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  _renderItemRating = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => { showPendingRatingDialog(item, navigation) }}>
        {/* <TouchableOpacity> */}
        <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderColor: "#AEAEAE", borderRadius: 20, padding: 10, borderWidth: 1, margin: 10, height: 110 }}>
          {/* <View style={{backgroundColor:'#fff',flexDirection:'row', borderRadius: 20, borderColor:"#AEAEAE",opactiy:0.1, borderWidth:1, marginLeft:10, marginBottom:15,marginTop:10, paddingRight:0,height:150,   alignItems:"center"}}> */}


          <View style={{ left: 10 }}>
            <Image source={{ uri: item.uid.profilePic }} style={{ height: 50, width: 50, marginTop: 20, borderRadius: 30 }} placeholderStyle={{ backgroundColor: '#fff' }}
              PlaceholderContent={renderImageLoader} />
          </View>
          <View style={{ backgroundColor: '#fff', height: 80, margin: 5, marginTop: 0, padding: 10, left: 10, textAlign: 'center' }}>
            <Text style={{ color: '#A1A4B2', fontWeight: 'bold' }}>Rate service provider / seller</Text>
            <Text style={{ fontWeight: 'bold', top: 10 }}>{item.uid.name}- {item.subCategory}</Text>
            <View style={{ flexDirection: 'row', top: 10 }}>

              <Image source={require('../assets/rating_image.png')} style={{ height: 30, width: 150 }} placeholderStyle={{ backgroundColor: '#fff' }}
                PlaceholderContent={renderImageLoader} />
            </View>
          </View>

        </View>
      </TouchableOpacity>


    )
  }


  return (
    <>
      <Spinner
        visible={spinner}
        textContent={spinnerText}
        textStyle={styles.spinnerTextStyle}
      />
      {
        currentCard != null ?
          <>
            {
              currentRating != null ?
                <View style={styles.centeredView}>

                  <Modal isVisible={modalVisible} style={{ height: 50, marginTop: 50 }} onBackdropPress={() => setModalVisible(false)} onRequestClose={() => {
                    setModalVisible(false);
                  }}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={{
                          textAlign: "center", color: "#A1A4B2"
                        }}>
                          Rate service provider/ seller
                          </Text>

                        <View style={{ borderColor: "#D7D7D7", borderWidth: 0.4, width: 300, margin: 10 }} />
                        <Image
                          source={{ uri: currentRating.uid.profilePic }}
                          style={{
                            height: 80,
                            width: 80,
                            marginLeft: 0,
                            borderRadius: 40,
                          }}
                        ></Image>
                        <Text style={{ fontWeight: "700", marginTop: 10, fontSize: 15 }}>
                          {currentRating.uid.name}
                        </Text>
                        <View style={{ borderColor: "#F30E5C", borderWidth: 1, borderRadius: 10, marginTop: 10 }}>
                          <Text style={{ fontSize: 11, color: "#F30E5C", padding: 5 }}>
                            {currentRating.subCategory}
                          </Text>
                        </View>
                        <View style={{ right: 0 }}>
                          <AirbnbRating
                            count={5}
                            onFinishRating={ratingCompleted}
                            defaultRating={5}
                          />
                        </View>
                        <View style={{ marginTop: 20 }}>
                          <View style={{ flexDirection: "row", padding: 15 }}>
                            <Pressable
                              style={{
                                borderRadius: 10,
                                padding: 10,
                                elevation: 2, backgroundColor: "#2196F3", marginTop: 0
                              }}
                              onPress={() => submitRating()}
                            >
                              <Text style={styles.textStyle}>SUBMIT</Text>
                            </Pressable>
                            <Pressable
                              style={{
                                borderRadius: 10,
                                padding: 10,
                                elevation: 2
                              }}
                              onPress={() => setModalVisible(false)}
                            >
                              <Text style={{
                                color: "#9B9B9B",
                                fontWeight: "bold",
                                textAlign: "center"
                              }}>LATER</Text>
                            </Pressable>
                          </View>
                          {currentRating.count > 3 ?
                            <Pressable
                              style={{
                                borderRadius: 10,

                                elevation: 2, paddingHorizontal: 25,
                              }}
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
              ref={MapShowSheet}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={450}
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
              <View style={{ backgroundColor: "#fff", height: 400 }}>
              <TouchableOpacity onPress={()=>showProfile(item)}>
                <View styel={{ padding: 10 }}>
                  <Text style={{ padding: 5, paddingTop: 0 }}>{I18n.t("Showing")} {item.uservisibility.name}'s {I18n.t("spaark location on map")}</Text>
                </View>
                </TouchableOpacity>
                {
                  item.isProvider ?
                    <View>

                      <View
                        style={{
                          paddingLeft: 10,
                          marginBottom: 0,
                          width: Dimensions.get('window').width,
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


                            <View style={{ flexDirection: 'row', marginTop: 0 }}>
                              <View style={{ flex: 5 }}>
                                <TouchableOpacity onPress={() => clickedPredefined(item.category, item.subCategory, Userpreferences)}>
                                  <View style={{ paddingTop: 0, justifyContent: 'center' }}>
                                    {
                                      item.tags != undefined ?
                                        item.tags.map((list, i) =>
                                          <View style={{ borderColor: list.color, borderWidth: 1, padding: 5, margin: 5, borderRadius: 20 }}>
                                            <Text key={i} style={{ textAlign: 'center', color: list.color, fontSize: 10, marginTop: 0 }}>{I18n.t(list.name)}</Text>
                                          </View>

                                        ) : <></>
                                    }

                                  </View>
                                </TouchableOpacity>
                              </View>
                              <View style={{ marginTop: 8, flex: 1 }}>
                                <Text style={{ color: '#f2f2f2', fontWeight: 'bold' }}>|</Text>
                              </View>




                              <View style={{ flexDirection: 'row', flex: 4 }}>
                                {
                                  item.uservisibility.location ?
                                    <>
                                      <TouchableOpacity
                                        onPress={() =>
                                          alert('You are already viewing location')
                                        }


                                      >

                                        {
                                          item.distance && item.distance != undefined ?
                                            item.distance && item.distance.toFixed(2) < 1000 ?
                                              <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                  source={require('../assets/bottomCard/distance.png')}
                                                  style={styles.distance} placeholderStyle={{ backgroundColor: '#fff' }}
                                                  PlaceholderContent={renderImageLoader}
                                                ></Image>
                                                <Text style={{ fontSize: 12, marginTop: 10, color: '#6FA4E9' }}>{item.distance.toFixed(0)} {I18n.t("m")}</Text></View>
                                              :
                                              <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                  source={require('../assets/bottomCard/distance.png')}
                                                  style={styles.distance} placeholderStyle={{ backgroundColor: '#fff' }}
                                                  PlaceholderContent={renderImageLoader}
                                                ></Image>
                                                <Text style={{ fontSize: 12, marginTop: 10, color: '#6FA4E9' }}>{(item.distance / 1000).toFixed(1)} {I18n.t("Km")}</Text></View>
                                            : <></>
                                        }
                                      </TouchableOpacity>
                                    </>
                                    :
                                    <>

                                    </>
                                }

                              </View>
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate("SellerProfile", {
                                    userId: item.userId,
                                    post: item,
                                  })
                                }
                                style={{ backgroundColor: "#fff" }}
                              >

                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 3, marginRight: 10 }}>
                                  <Image source={require('../assets/marketProfile.png')} style={{ height: 20, width: 20, marginTop: 0 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader} />
                                  <Text
                                    style={{ fontSize: 10, color: "#6FA4E9", marginLeft: 0, marginTop: 2 }}
                                  >

                                    {I18n.t('Market Profile')}
                                  </Text>
                                </View>
                              </TouchableOpacity>




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


                            <View style={{ flexDirection: 'row', marginTop: 0 }}>
                              <View style={{ flex: 5 }}>
                                <TouchableOpacity onPress={() => clickedPredefined(item.category, item.subCategory, Userpreferences)}>
                                  <View style={{ paddingTop: 0, justifyContent: 'center', flexDirection: 'row' }}>
                                    {
                                      item.tags != undefined ?
                                        item.tags.map((list, i) =>
                                          <View style={{ borderColor: list.color, borderWidth: 1, padding: 5, margin: 5, borderRadius: 20 }}>
                                            <Text style={{ textAlign: 'center', color: list.color, fontSize: 10, marginTop: 0 }}>{I18n.t(list.name)}</Text>
                                          </View>

                                        ) : <></>
                                    }

                                  </View>
                                </TouchableOpacity>
                              </View>

                              <View style={{ marginTop: 8, flex: 1 }}>
                                <Text style={{ color: '#f2f2f2', fontWeight: 'bold' }}>|</Text>
                              </View>




                              <View style={{ flexDirection: 'row', flex: 2 }}>
                                {
                                  item.uservisibility.location ?
                                    <>
                                      <TouchableOpacity
                                        onPress={() =>
                                          selectedPostMap(item, 'within')
                                        }


                                      >
                                        {
                                          item.distance && item.distance != undefined ?
                                            item.distance && item.distance.toFixed(2) < 1000 ?
                                              <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                  source={require('../assets/bottomCard/distance.png')}
                                                  style={styles.distance} placeholderStyle={{ backgroundColor: '#fff' }}
                                                  PlaceholderContent={renderImageLoader}
                                                ></Image>
                                                <Text style={{ fontSize: 12, marginTop: 10, color: '#6FA4E9' }}>{item.distance.toFixed(0)} m</Text></View> :
                                              <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                  source={require('../assets/bottomCard/distance.png')}
                                                  style={styles.distance} placeholderStyle={{ backgroundColor: '#fff' }}
                                                  PlaceholderContent={renderImageLoader}
                                                ></Image>
                                                <Text style={{ fontSize: 12, marginTop: 10, color: '#6FA4E9' }}>{(item.distance / 1000).toFixed(1)} Km</Text></View>
                                            : <></>
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

                      </View>


                    </View>

                    :
                    <></>
                }


{
  item.locationStatic.coordinates?
  <View style={{ marginTop: 0, flex: 1 }}>
  <MarkersScreen latitude={item.locationStatic.coordinates[1]} longitude={item.locationStatic.coordinates[0]} name={item.uservisibility.name} />
</View>
:
<></>
}
               


                <View style={{ flexDirection: 'row' }}>

                  {/* <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={() => Linking.openURL(`https://www.apple.com/maps/`)
             } style={{ backgroundColor: "#fff" }}>
                     <View style={{justifyContent:'center',alignItems:'center'}}>
                      <Image source={require('../assets/apple_maps.png')} style={{ height: 30, width: 30,justifyContent:'center',alignItems:'center' }} />
                      <Text>Show on Apple maps</Text>
                      </View>
                      </TouchableOpacity>
                    </View> */}

                  {/* <View style={{ marginTop: 8, flex: 0 }}>
                            <Text style={{ color: '#f2f2f2', fontWeight: 'bold' }}>|</Text>
                          </View> */}

                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${item.locationStatic.coordinates[1]},${item.locationStatic.coordinates[0]}`)
                    } style={{ backgroundColor: "#fff" }}>
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/google_maps.png')} style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} />
                        <Text>Show on Google maps</Text>
                      </View>
                    </TouchableOpacity>
                  </View>


                </View>
              </View>
            </RBSheet>


            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={item.featureName != "greet" ? 290 : 200}
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
                      item.featureName != "greet" ?
                      <TouchableOpacity
                      onPress={() => onShare(item)}
                    >
                        <View style={{ flexDirection: "row", marginTop: 20 }}>
                          <View style={{ color: "#000", flex: 2, marginLeft: 20 }}>
                            <Image
                              cache="force-cache"
                              source={require("../assets/icons/share22.png")}
                              style={{ height: 40, width: 40 }}
                              placeholderStyle={{ backgroundColor: '#fff' }}
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
                              // onPress={() => onShare(item)}
                            >
                              {I18n.t("Share post")}
                            </Text>
                            <Text
                              style={{
                                color: "#000",
                                fontSize: 14,
                                flex: 70,
                                paddingLeft: 10,
                                fontWeight: "300"
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
                        </TouchableOpacity>
                        :
                        <></>
                    }
 <TouchableOpacity
                      onPress={() => reportUser()}
                    >
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                      <View style={{ color: "#000", flex: 2, marginLeft: 20 }}>
                        <Image
                          cache="force-cache"
                          source={require("../assets/icons/bottomsheet/1.png")}
                          style={{ height: 40, width: 40 }}
                          placeholderStyle={{ backgroundColor: '#fff' }}
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
                          // onPress={() => { reportUser(Number(global.postcurrent[0])) }}
                        >
                          {I18n.t("Report Spaark")}
                        </Text>
                        <Text
                          style={{
                            color: "#000",
                            fontSize: 14,
                            flex: 70,
                            paddingLeft: 10,
                            fontWeight: "300"
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
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => blockUser(item)}
                    >
                    <View style={{ flexDirection: "row", marginTop: 20 }} >
                      <View style={{ color: "#000", flex: 2, marginLeft: 20 }}>
                        <Image
                          cache="force-cache"
                          source={require("../assets/block22.png")}
                          style={{ height: 40, width: 40 }}
                          placeholderStyle={{ backgroundColor: '#fff' }}
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
                          // onPress={() => { blockUser(item) }}
                        >
                          <Text style={{ color: '#000' }}>{I18n.t("Block")}{" "}{item.uservisibility.name}</Text>
                        </Text>

                        <Text
                          style={{
                            color: "#000",
                            fontSize: 14,
                            flex: 70,
                            paddingLeft: 10,
                            fontWeight: "300"
                          }}
                        >
                          {I18n.t("If_you_dont_want_to_receive_updates_from")} {item.uservisibility.name}
                        </Text>
                      </View>
                    </View>
                    </TouchableOpacity>
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
                      <View style={{ color: "#000", flex: 13, height: 60, justifyContent: 'center', alignItems: 'center', top: 30 }}>
                        <Image source={require('../assets/icons/login_continue.png')} style={{ height: 150, width: 150 }} placeholderStyle={{ backgroundColor: '#fff' }}
                          PlaceholderContent={renderImageLoader}></Image>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 0 }}>
                      <View style={{ color: "#000", flex: 13, height: 160, justifyContent: 'center', alignItems: 'center' }}>


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
                  item.uservisibility.phoneCall ?
                    <View>
                      <View>
                        <View style={{ flexDirection: "row", marginTop: 20 }}>
                          <View style={{ color: "#000", flex: 4, marginLeft: 20 }}>
                            <Image
                              source={require("../assets/bottomCard/call_message.png")}
                              style={{ height: 100, width: 100 }}
                              placeholderStyle={{ backgroundColor: '#fff' }}
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
                              {I18n.t("Spaarks_call_e")}
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
                              style={{ height: 150, width: 100 }}
                              placeholderStyle={{ backgroundColor: '#fff' }}
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
                             {I18n.t("Spaarks_call_d")}
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
                              {I18n.t("Make call from your personal number")}
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
                          placeholderStyle={{ backgroundColor: '#fff' }}
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
                          {I18n.t("owner_string")}
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
                  item.uservisibility.phoneCall ?
                    <TouchableOpacity onPress={() => makeSpaarksCall()
                    }>

                      <View>
                        <View>
                          <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <View style={{ color: "#000", flex: 2, marginLeft: 40 }}>
                              <Image
                                source={require("../assets/spaarkscall.png")}
                                style={{ height: 30, width: 30 }}
                                placeholderStyle={{ backgroundColor: '#fff' }}
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
                                {I18n.t("sce")}
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
                                {I18n.t("sc_e")} {/*{I18n.t("while posting a spaark")} */}
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
                        <View style={{ flexDirection: "row", marginTop: 0 }}>
                          <View style={{ color: "#000", flex: 2, marginLeft: 40 }}>
                            <Image
                              source={require("../assets/icons/spaarksdisabled.png")}
                              style={{ height: 30, width: 30 }}
                              placeholderStyle={{ backgroundColor: '#fff' }}
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
                              {I18n.t("scd")}
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
                            {I18n.t("sc_d")}
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
                    margin: 10,
                    borderBottomColor: "#f2f2f2",
                    width: '95%',
                    borderBottomWidth: 1,
                  }}
                />
                {item.mobileNumber != "NA" ?
                  <TouchableOpacity onPress={() => makeNormalCall()}>

                    <View>
                      <View>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                          <View style={{ color: "#000", flex: 2, marginLeft: 40 }}>
                            <Image
                              source={require("../assets/normalcall.png")}
                              style={{ height: 30, width: 30 }}
                              placeholderStyle={{ backgroundColor: '#fff' }}
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
                              {I18n.t("nce")}
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
                              {I18n.t("nc_e")}
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
                          <View style={{ flexDirection: "row", marginTop: 0, marginLeft: 20 }}>
                            <View style={{ color: "#000", flex: 2, marginLeft: 20 }}>
                              <Image
                                source={require("../assets/icons/normaldisabled.png")}
                                style={{ height: 30, width: 30 }}
                                placeholderStyle={{ backgroundColor: '#fff' }}
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
                                {I18n.t("ncd")}
                              </Text>
                              <Text
                                style={{
                                  color: "#000",
                                  fontSize: 14,
                                  marginTop: 0,
                                  flex: 70,
                                  paddingLeft: 10,
                                }}
                              >
                                {I18n.t("nc_d")}
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
                          style={{ height: 45, width: 45, marginTop: 10, marginLeft: 10 }}
                          placeholderStyle={{ backgroundColor: '#fff' }}
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
                  <TouchableOpacity
                          onPress={() => deleteSpaark1()}
                        >
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <View style={{ color: "#000", flex: 2}}>
                        <Image
                          source={require("../assets/icons/deleted_browser.png")}
                        
                          style={{ height: 55, width: 55, left: 8 }}
                          placeholderStyle={{ backgroundColor: '#fff' }}
                          PlaceholderContent={renderImageLoader}
                        ></Image>
                      </View>
                    

                 
                      <View style={{ color: "#000", flex: 10, height: 60,marginLeft:10  }}>
                        
                          <Text
                            style={{
                              color: "#000",
                              fontSize: 16,
                              margin: 0,
                              fontWeight: "bold",
                              paddingLeft: 10,
                            }}
                          >
                            {I18n.t("Delete Spaark")}
                          </Text>
                        
                        <Text
                          style={{
                            color: "#000",
                            fontSize: 14,
                            flex: 1,
                            paddingLeft: 10,
                          }}
                        >
                          {I18n.t("Click Here to delete the spaark selected")}
                        </Text>
                        {/* line */}

                      </View>
         
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                          onPress={() => onShare(item)}
                        >
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                      <View style={{ color: "#000", flex: 2}}>
                        <Image
                          source={require("../assets/icons/share22.png")}
                          style={{ height: 40, width: 40, left: 15 }}
                          placeholderStyle={{ backgroundColor: '#fff' }}
                          PlaceholderContent={renderImageLoader}
                        ></Image>
                      </View>

                      <View style={{ color: "#000", flex: 10, height: 60,marginLeft:10  }}>
                        
                          <Text
                            style={{
                              color: "#000",
                              fontSize: 16,
                              margin: 0,
                              fontWeight: "bold",
                              paddingLeft: 10,
                            }}
                          >
                            {I18n.t("Share Spaark")}
                          </Text>
   
                        <Text
                          style={{
                            color: "#000",
                            fontSize: 14,
                            flex: 70,
                            paddingLeft: 10,
                          }}
                        >
                          {I18n.t("Click Here to share the spaark selected")}
                        </Text>
                        {/* line */}

                      </View>
                    </View>
                    </TouchableOpacity>

                  </View>
                </View>
              </View>
            </RBSheet>
            {
              indexes.includes(index) ?

                index / 4 == 1 && pendingWorks && pendingWorks.length > 0 && token != null ?
                  <>
                    <Text style={{ fontWeight: 'bold', padding: 10, paddingBottom: 0, color: '#000' }}>{I18n.t("Submit your work status")} ({currentWorkstatus.length})</Text>
                    <Carousel
                      ref={(c) => { _carousel = c; }}
                      data={currentWorkstatus}
                      renderItem={_renderItemPending}
                      autoplay={true}
                      // layout={'stack'}
                      loop={true}
                      autoplayInterval={2000}
                      sliderWidth={Dimensions.get('window').width - 10}
                      itemWidth={Dimensions.get('window').width - 10}
                    />
                  </>
                  : 
                  index / 4 == 2 && pendingRatings && pendingRatings.length > 0 && token != null ?
                  <>
                    {
                      currentPendingsWorks.length > 0 ?
                        <>
                          <View
                            style={{
                              marginTop: 0,
                              marginLeft: 5,
                              marginRight: 5,
                              margin: 10,
                              marginTop: 0,
                              borderBottomColor: "#D7D7D7",
                              width: '90%',
                              borderBottomWidth: 1,
                            }}
                          />

                          <Text style={{ fontWeight: 'bold', padding: 10, paddingBottom: 0, color: '#000' }}>Please help us Rate your service provider</Text>
                          <Carousel
                            ref={(c) => { _carousel = c; }}
                            data={currentPendingsWorks}
                            renderItem={_renderItemRating}
                            autoplayInterval={2000}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={Dimensions.get('window').width - 20}
                          />

                          <View
                            style={{
                              marginTop: 5,
                              marginLeft: 5,
                              marginRight: 5,
                              margin: 10,
                              borderBottomColor: "#D7D7D7",
                              width: '90%',
                              borderBottomWidth: 1,
                            }}
                          />
                        </>
                        :
                        <></>
                    }
                  </>
                  :index / 4 == 3 ?
                 <>
         
  <View style={{padding:10,marginBottom:0}}>
<QuestionsCards navigation={navigation}/>
</View>
          
                   </>
                   :
                    <View style={{ margin: 0, marginTop: -20, marginBottom: -10 }}>
                      {
                        !banners && banners[index / 4] == "" || banners[index / 4] == undefined ?
                          <></>
                          :
                          <>
                          <TouchableOpacity onPress={()=>ClickedBanner(banners[index / 4])}>
                          <Image source={{ uri: banners[index / 4].image }} style={{ height: 170, width: Dimensions.get('window').width, resizeMode: 'contain' }} placeholderStyle={{ backgroundColor: '#fff' }}
                            PlaceholderContent={renderImageLoader}></Image>
</TouchableOpacity>
</>
                      }
                    </View>
                :
                item.featureName == "market" ? (
                  indexes.includes(index) ?
                    <Image source={{ uri: "https://static-content.spaarksweb.com/images/images/market/m2.png" }} style={{ height: 170, width: 360, margin: 10, resizeMode: 'contain' }} placeholderStyle={{ backgroundColor: '#fff' }}
                      PlaceholderContent={renderImageLoader}></Image> :

                    <Card style={styles.eachCard}>

                      <View>
                        {
                          item.aboveCard ?
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
                                item.aboveCard != undefined ?
                                  <>
                                    {
                                      item.aboveCard.includes("More Spaarks") ?
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate("SellerProfile", {
                                              userId: item.userId,
                                              post: item,
                                            })
                                          }
                                          style={{ backgroundColor: "#fff" }}
                                        >
                                          <Text style={{ fontSize: 14, padding: 10, fontWeight: '300' }}>{item.aboveCard}</Text>
                                        </TouchableOpacity>

                                        :
                                        <Text style={{ fontSize: 14, padding: 10, fontWeight: '300' }}>{item.aboveCard}</Text>
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
                                  : <></>
                              }

                            </View>

                            :
                            <></>
                        }
                        <View style={{ flexDirection: "row", marginBottom: 0, width: Dimensions.get('window').width }}>
                          <View
                            style={{ flex: 4, paddingLeft: 20, paddingTop: 20 }}
                          >
                            <View>
                              <View style={{ flex: 3 }}>
                               <TouchableOpacity onPress={()=>{ navigation.navigate('ViewFullScreenImagesScreen', { photos: [{url:item.uservisibility.profilePic}], content: currentCard.content, name: currentCard.uservisibility.name, profilePic: currentCard.uservisibility.profilePic, time: currentCard.createdAt, post: currentCard, showHeader: false })}}>
                                <Image
                                  source={{ uri: item.uservisibility.profilePic }}
                                  style={{
                                    height: 55,
                                    width: 55,
                                    paddingLeft: 0,
                                    borderRadius: 30,
                                  }}
                                  placeholderStyle={{ backgroundColor: '#fff' }}
                                  PlaceholderContent={renderImageLoader}
                                />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              flex: 20,
                              width: Dimensions.get('window').width,
                              paddingLeft: 10,
                              paddingTop: 20,
                              fontSize: 20,
                            }}
                          >
                            <TouchableOpacity onPress={() =>
                              // clickAction(item)
                              navigation.navigate('UserProfileDynamic', { userId: item.userId, })
                              // console.log(item.userId)
                              // console.log("currenttttttttt",currentCard.uservisibility)
                              // 
                            }>
                              <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: "bold", fontSize: 16, color: '#6FA4E9' }}>
                                  {item.uservisibility.name.charAt(0).toUpperCase() + item.uservisibility.name.slice(1)}
                                </Text>
                                {
                                  item.isVerified ?
                                    <>
                                      <Image source={require('../assets/icons/account_verified.png')} style={{ height: 15, width: 15, marginTop: 3, marginLeft: 3 }}
                                      />
                                    </>
                                    :
                                    <></>
                                }
                              </View>

                            </TouchableOpacity>
                            <Text style={{ marginTop: 0, fontSize: 10, color: '#989898' }}>
                              {moment(item.createdAt).fromNow()}</Text>
                            {/* {moment(item.createdAt).fromNow()}</Text> */}
                            <View style={{ flexDirection: "row" }}>
                              {item.isProvider == true ? (
                                <>
                                  <View style={{ flex: 8, flexDirection: 'row' }}>
                                    {
                                      item.reviews && item.reviews[0].rating == 0?
                                      <Image source={require('../assets/stars/0.png')} style={{width: 100,
                                        height: 20,marginBottom: 20}}/>
                                        :
                                        item.reviews && item.reviews[0].rating == 1?
                                      <Image source={require('../assets/stars/1.png')} style={{width: 100,
                                        height: 20,marginBottom: 20}}/>
                                        :item.reviews && item.reviews[0].rating == 2?
                                      <Image source={require('../assets/stars/2.png')} style={{width: 100,
                                        height: 20,marginBottom: 20}}/>
                                        :item.reviews && item.reviews[0].rating == 3?
                                        <Image source={require('../assets/stars/3.png')} style={{width: 100,
                                          height: 20,marginBottom: 20}}/>
                                          :item.reviews && item.reviews[0].rating == 4?
                                          <Image source={require('../assets/stars/4.png')} style={{width: 100,
                                            height: 20,marginBottom: 20}}/>
                                            :
                                            <Image source={require('../assets/stars/5.png')} style={{width: 100,
                                              height: 20,marginBottom: 20}}/>
                                    }
                                    {/* <Star score={item.reviews && item.reviews[0].rating} style={{
                                      width: 100,
                                      height: 20,
                                      marginBottom: 20,
                                    }} /> */}
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
                                  <View style={{ position: 'absolute', top: 20 }}>
                                    <TouchableOpacity
                                      onPress={() =>
                                        navigation.navigate("PostSpecificScreensFeed", { post: item,IncreaseCountOnComment:IncreaseCountOnComment })
                                      }
                                      style={{ backgroundColor: "#fff" }}
                                    >
                                      <Text style={{ color: "#989898", fontSize: 10 }}>{item.reviews && item.reviews[0].count} {I18n.t("reviews")}<Image
                                        source={require("../assets/icons/eye.png")}
                                        style={{ height: 9, width: 22 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                        PlaceholderContent={renderImageLoader} />{item.viewedUsers && item.viewedUsers.length} {I18n.t("views")}</Text>

                                    </TouchableOpacity>
                                  </View>
                                </>
                              ) : (

                                <View style={{ flexDirection: 'row', marginTop: 5 }}>

                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate("PostSpecificScreensFeed", { post: item,IncreaseCountOnComment:IncreaseCountOnComment })
                                    }
                                    style={{ backgroundColor: "#fff" }}
                                  >
                                    <View>
                                      <Text style={{ color: "#989898", fontSize: 10 }}>
                                        <Image
                                          source={require("../assets/icons/eye.png")}
                                          style={{ height: 9, width: 22 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                          PlaceholderContent={renderImageLoader} />
                                        {item.viewedUsers && item.viewedUsers.length}  {I18n.t("views")}</Text>
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
                          <View style={{ marginRight: 10,flexDirection:'column' }}>
                            <View>
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
                                }
                                }
                                placeholderStyle={{ backgroundColor: '#fff' }}
                                PlaceholderContent={renderImageLoader}
                              />
                            </TouchableOpacity>
                            </View>
                            <View style={{marginTop:10}}>
                            <TouchableOpacity
                              onPress={() => onbookmark(index, 'within')}
                            >

                              {
                                bookmark ?
                                  <Image
                                    source={require("../assets/icons/savedbookmark.png")}
                                    style={{ height: 25, width: 20, right: 0, marginTop: 10, marginLeft: 4 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader} />
                                  :
                                  <Image
                                    source={require("../assets/icons/bookmark.png")}
                                    style={{ height: 25, width: 20, right: 0, marginTop: 10, marginLeft: 4.25 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader} />
                              }
                            </TouchableOpacity>
                              </View>
                          </View>
                        </View>
                        {/* Profile Tag and content */}
                        <View
                          style={{
                            paddingLeft: 10,
                            marginBottom: 0,
                            width: Dimensions.get('window').width,
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


                              <View style={{ flexDirection: 'row', marginTop: 0 }}>
                                <View style={{ flex: 5 }}>
                                  <TouchableOpacity onPress={() => clickedPredefined(item.category, item.subCategory, Userpreferences)}>
                                    <View style={{ paddingTop: 0, justifyContent: 'center' }}>
                                      {
                                        item.tags != undefined ?
                                          item.tags.map((list, i) =>
                                            <View style={{ borderColor: list.color, borderWidth: 1, padding: 5, margin: 5, borderRadius: 20 }}>
                                              <Text style={{ textAlign: 'center', color: list.color, fontSize: 10, marginTop: 0 }}>{I18n.t(list.name)}</Text>
                                            </View>

                                          ) : <></>
                                      }

                                    </View>
                                  </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 8, flex: 1 }}>
                                  <Text style={{ color: '#f2f2f2', fontWeight: 'bold' }}>|</Text>
                                </View>




                                <View style={{ flexDirection: 'row', flex: 4 }}>
                                  {/* <Text>{String(item.uservisibility.location)}</Text> */}
                                  {
                                    item.uservisibility.location ?
                                      <>
                                        <TouchableOpacity
                                          onPress={() =>
                                            selectedPostMap(item, 'within')
                                          }


                                        >

                                          {
                                            item.distance && item.distance != undefined ?
                                              item.distance && item.distance.toFixed(2) < 1000 ?
                                                <View style={{ flexDirection: 'row' }}>
                                                  <Image
                                                    source={require('../assets/bottomCard/distance.png')}
                                                    style={styles.distance} placeholderStyle={{ backgroundColor: '#fff' }}
                                                    PlaceholderContent={renderImageLoader}
                                                  ></Image>
                                                  <Text style={{ fontSize: 12, marginTop: 10, color: '#6FA4E9' }}>{item.distance.toFixed(0)} {I18n.t("m")}</Text></View>
                                                :
                                                <View style={{ flexDirection: 'row' }}>
                                                  <Image
                                                    source={require('../assets/bottomCard/distance.png')}
                                                    style={styles.distance} placeholderStyle={{ backgroundColor: '#fff' }}
                                                    PlaceholderContent={renderImageLoader}
                                                  ></Image>
                                                  <Text style={{ fontSize: 12, marginTop: 10, color: '#6FA4E9' }}>{(item.distance / 1000).toFixed(1)} {I18n.t("Km")}</Text></View>
                                              :
                                              // <></>
                                              <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                  source={require('../assets/bottomCard/distance.png')}
                                                  style={styles.distance} placeholderStyle={{ backgroundColor: '#fff' }}
                                                  PlaceholderContent={renderImageLoader}
                                                ></Image>
                                                {/* <Text style={{ fontSize: 12, marginTop: 10, color: '#6FA4E9' }}>{(item.distance / 1000).toFixed(1)} {I18n.t("Km")}</Text> */}
                                              </View>
                                          }
                                        </TouchableOpacity>
                                      </>
                                      :
                                      <>

                                      </>
                                  }

                                </View>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("SellerProfile", {
                                      userId: item.userId,
                                      post: item,
                                    })
                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >

                                  <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 3, marginRight: 10 }}>
                                    <Image source={require('../assets/marketProfile.png')} style={{ height: 20, width: 20, marginTop: 0 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                      PlaceholderContent={renderImageLoader} />
                                    <Text
                                      style={{ fontSize: 10, color: "#6FA4E9", marginLeft: 0, marginTop: 2 }}
                                    >

                                      {I18n.t('Market Profile')}
                                    </Text>
                                  </View>
                                </TouchableOpacity>




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


                              <View style={{ flexDirection: 'row', marginTop: 0 }}>
                                <View style={{ flex: 5 }}>
                                  <TouchableOpacity onPress={() => clickedPredefined(item.category, item.subCategory, Userpreferences)}>
                                    <View style={{ paddingTop: 0, justifyContent: 'center', flexDirection: 'row' }}>
                                      {
                                        item.tags != undefined ?
                                          item.tags.map((list, i) =>
                                            <View style={{ borderColor: list.color, borderWidth: 1, padding: 5, margin: 5, borderRadius: 20 }}>
                                              <Text style={{ textAlign: 'center', color: list.color, fontSize: 10, marginTop: 0 }}>{I18n.t(list.name)}</Text>
                                            </View>

                                          ) : <></>
                                      }

                                    </View>
                                  </TouchableOpacity>
                                </View>

                                <View style={{ marginTop: 8, flex: 1 }}>
                                  <Text style={{ color: '#f2f2f2', fontWeight: 'bold' }}>|</Text>
                                </View>




                                <View style={{ flexDirection: 'row', flex: 2 }}>
                         
                                  {
                                     item.uservisibility.location ?
                                      <>
                                        <TouchableOpacity
                                          onPress={() =>
                                            selectedPostMap(item, 'within')
                                          }


                                        >

                                          {
                                            item.distance == 0?
                                            <View style={{ flexDirection: 'row' }}>
                                            <Image
                                              source={require('../assets/bottomCard/distance.png')}
                                              style={styles.distance} placeholderStyle={{ backgroundColor: '#fff' }}
                                              PlaceholderContent={renderImageLoader}
                                            ></Image>
                                            <Text style={{ fontSize: 12, marginTop: 10, color: '#6FA4E9' }}>{item.distance.toFixed(0)} m</Text></View>
                                            :
                                            item.distance && item.distance != undefined ?
                                              item.distance && item.distance.toFixed(2) < 1000 ?
                                                <View style={{ flexDirection: 'row' }}>
                                                  <Image
                                                    source={require('../assets/bottomCard/distance.png')}
                                                    style={styles.distance} placeholderStyle={{ backgroundColor: '#fff' }}
                                                    PlaceholderContent={renderImageLoader}
                                                  ></Image>
                                                  <Text style={{ fontSize: 12, marginTop: 10, color: '#6FA4E9' }}>{item.distance.toFixed(0)} m</Text></View> :
                                                <View style={{ flexDirection: 'row' }}>
                                                  <Image
                                                    source={require('../assets/bottomCard/distance.png')}
                                                    style={styles.distance} placeholderStyle={{ backgroundColor: '#fff' }}
                                                    PlaceholderContent={renderImageLoader}
                                                  ></Image>
                                                  <Text style={{ fontSize: 12, marginTop: 10, color: '#6FA4E9' }}>{(item.distance / 1000).toFixed(1)} Km</Text></View>
                                              : <></>
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
                                  marginBottom: 3,
                                  marginLeft: 0,
                                  marginRight: 0,
                                  borderBottomColor: "#f2f2f2",
                                  borderBottomWidth: 1,
                                }}
                              />

                            </>
                          )}


                          {
                            filterContent ?
                              <>
  
                                {
                                  item.content.length > 100 ?
                                    <Hyperlink linkDefault={true} linkStyle={{ color: '#6FA4E9' }}>
                                      <Text>
                                        {item.content.substr(0, 220)}....
                                      </Text>
                                    </Hyperlink>
                                    // <Text style={{color:'#000', fontWeight:'500' }}>


                                    // </Text>
                                    : <><Paragraph style={{ fontSize: 15 }}>
                                      <Hyperlink linkDefault={true} linkStyle={{ color: '#6FA4E9' }}>
                                        <Text numberOfLines={5}>
                                          {item.content}
                                        </Text>
                                      </Hyperlink>
                                    </Paragraph></>
                                }
                                {item.content.length > 220 ? (
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate("PostSpecificScreensFeed", {
                                        post: item
                                        ,IncreaseCountOnComment:IncreaseCountOnComment
                                      })
                                    }
                                    style={{ backgroundColor: "#fff" }}
                                  >
                                    <Text style={{ color: "#989898", fontSize: 12 }}>
                                      {I18n.t("View more")}
                                    </Text>
                                  </TouchableOpacity>
                                ) : (
                                  <></>
                                )}
                                {/* </View> */}
                              </>
                              :
                              <View style={{ flex: 2 }}>
                                <Hyperlink linkDefault={true} linkStyle={{ color: '#6FA4E9' }}>
                                  <Text style={{ fontSize: 15, paddingTop: 10 }} >
                                    {item.content}
                                  </Text>
                                </Hyperlink>

                              </View>
                          }
                          <RNUrlPreview text={item.content} />
                          {/* </View> */}
                        </View>
                      </View>
                      <View>
                        {
                          item.photo.length > 0 ?
                            <View style={{ marginTop: 2 }}>
                            </View> :
                            <></>
                        }
                      </View>
                      <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: currentCard.photos, content: currentCard.content, name: currentCard.uservisibility.name, profilePic: currentCard.uservisibility.profilePic, time: currentCard.createdAt, post: currentCard, showHeader: true }) }}>
                        <ImagesGrid images={[...item.photo]} overlay={[...item.photos]} video={[...item.video]} navigation={navigation} photos={currentCard.photos}  content={currentCard.content}  name={currentCard.uservisibility.name} profilePic={currentCard.uservisibility.profilePic} time={currentCard.createdAt} post={currentCard}  />
                      </TouchableOpacity>



                      <View style={{ backgroundColor: "#fff", height: "auto" }}>
                        <View style={{ flexDirection: "row", marginTop: 0 }}>

                        </View>

                        <View
                          style={{
                            marginTop: 5,
                            marginLeft: 10,
                            width: '95%',
                            marginRight: 0,
                            borderBottomColor: "#f2f2f2",
                            borderBottomWidth: 1,
                          }}
                        />
                        {/* icon starts */}
                        <View
                          style={{ flex: 0, flexDirection: "row", magin: 0, justifyContent: 'center', justifyContent: 'space-between' }}

                        >
                          {/* likes */}
                          <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity
                              onPress={() => onLike(index, 'within')}
                            >

                              {
                                liked ?
                                  <Image
                                    source={require('../assets/bottomCard/liked.png')}

                                    style={{ height: 25, width: 25, margin: 23, marginTop: 7 }}
                                    PlaceholderContent={<ActivityIndicator />} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}></Image>
                                  :
                                  <Image
                                    source={require('../assets/bottomCard/disliked.png')}
                                    style={{ height: 25, width: 25, margin: 23, marginTop: 7 }}
                                    placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}></Image>
                              }

                              <Text style={{ position: 'absolute', top: 33, left: 31, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{currentCard.likes && currentCard.likes.length}</Text>


                            </TouchableOpacity>

                          </View>

                          {/* Comments */}

                          <View style={{ flexDirection: 'column' }}>
                            {
                              item.commentsc?
                              <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: item,
                                      naviga: 'Market',
                                      IncreaseCountOnComment:IncreaseCountOnComment
                                    })

                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  <Image
                                    source={require("../assets/icons/comment.png")}
                                    style={{ height: 27, width: 27, margin: 23, marginTop: 6 }}
                                    placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}
                                  />
                                  <Text style={{ position: 'absolute', top: 33, left: 32, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>
                                    {commentsCount}
                                  </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: item,
                                      naviga: 'Market'
                                      ,IncreaseCountOnComment:IncreaseCountOnComment
                                    })

                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  <Image
                                    source={require("../assets/icons/comment.png")}
                                    style={{ height: 27, width: 27, margin: 23, marginTop: 6 }}
                                    placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}
                                  />
                                  <Text style={{ position: 'absolute', top: 33, left: 32, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>
                                    0
                                  </Text>
                                </TouchableOpacity>
                            }

                                
                            
                          </View>


                          {/* Phone call */}
                          <View style={{ flexDirection: 'column' }}>


                            <TouchableOpacity onPress={() => { makeCalls(item) }}>
                              <Image

                                source={require("../assets/icons/call.png")}

                                style={{ height: 23, width: 23, margin: 23, marginTop: 9 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                PlaceholderContent={renderImageLoader}
                              ></Image>
                              <Text style={{ position: 'absolute', top: 33, left: 25, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{I18n.t("Call")}</Text>

                            </TouchableOpacity>

                          </View>


                          {/* Chat */}
                          <View style={{ flexDirection: 'column' }}>

                            {
                              item.uservisibility.chat ?

                                <TouchableOpacity onPress={() => clickedChat(item)}>
                                  <Image
                                    source={require("../assets/icons/chat.png")}

                                    style={{ height: 23, width: 23, margin: 23, marginTop: 9, marginLeft: 30 }}
                                    placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}
                                  ></Image>
                                  <Text style={{ position: 'absolute', top: 33, left: 33, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{I18n.t("Chat")}</Text>

                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => refRBSheetss.current.open()}>
                                  <Image
                                    source={require("../assets/icons/chatdisable.png")}
                                    // source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.39_PM_upsvxi.png' }}
                                    style={{ height: 23, width: 23, margin: 23, marginTop: 9 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}
                                  ></Image>
                                  <Text style={{ position: 'absolute', top: 33, left: 23, fontSize: 10, fontWeight: 'bold', color: '#f2f2f2' }}>{I18n.t("Chat")}</Text>

                                </TouchableOpacity>

                            }

                          </View>


                          {/* WhatsApp Share */}
                          <View style={{ flexDirection: 'column' }}>

                            <TouchableOpacity onPress={() => WhatsAppShare(item)}>
                              <View style={{ flexDirection: 'row' }}>
                                <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png' }}
                                  style={{ height: 25, width: 25, margin: 23, marginTop: 9 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                  PlaceholderContent={renderImageLoader}
                                ></Image>
                               {
                                  item.myshares && item.myshares[0] && item.myshares.length > 0 ?
                                    <Text style={{ position: 'absolute', top: 32, left: 30, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{item.myshares && item.myshares[0].shares}</Text> :
                                    <Text style={{ position: 'absolute', top: 32, left: 30, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>0</Text>
                                }
                              </View>
                            </TouchableOpacity>
                          </View >

                        </View>

                      </View>
                      {/* icon end */}


                    </Card>

                ) : item.featureName == "showtime" ? (

                <>
{
  item.pollPost?
  <>
  <Card style={styles.eachCard}>

   {/* <Poll question="who is your favorite player?" options={choices} votess={votess} item={item}/> */}
   <>
      
    
        <View style={{margin:10,marginRight:5 ,backgroundColor : "#fff" , borderRadius:10}}>
          <View style={{flexDirection: "row" , marginHorizontal:5 , backgroundColor:"white" , marginBottom:0}}>
          <TouchableOpacity onPress={()=>{ navigation.navigate('ViewFullScreenImagesScreen', { photos: [{url:item.uservisibility.profilePic}], content: currentCard.content, name: currentCard.uservisibility.name, profilePic: currentCard.uservisibility.profilePic, time: currentCard.createdAt, post: currentCard, showHeader: false })}}>

          <Image
                                  source={{ uri: item.uservisibility.profilePic }}
                                  style={{
                                    height: 55,
                                    width: 55,
                                    paddingLeft: 0,
                                    borderRadius: 30,
                                  }}
                                  placeholderStyle={{ backgroundColor: '#fff' }}
                                  PlaceholderContent={renderImageLoader}
                                />
                                </TouchableOpacity>
             <View
         style={{
           flex: 20,
           paddingLeft: 10,
           paddingTop: 0,
           fontSize: 20,
         }}
       >
         <TouchableOpacity onPress={() =>
           // clickAction(item)
           navigation.navigate('UserProfileDynamic', { userId: item.userId })
           // console.log("currenttttttttt",currentCard)
         }>
           <View style={{ flexDirection: 'row' }}>
             <Text style={{ fontWeight: "bold", fontSize: 16, color: '#6FA4E9' }}>
               {item.uservisibility.name.charAt(0).toUpperCase() + item.uservisibility.name.slice(1)}
             </Text>
             {
               item.isVerified ?
                 <>
                   <Image source={require('../assets/icons/account_verified.png')} style={{ height: 15, width: 15, marginTop: 3, marginLeft: 3 }} />
                 </>
                 :
                 <></>
             }
           </View>
         </TouchableOpacity>
         <Text style={{ marginTop: 0, fontSize: 10, color: '#989898' }}>
           {/* {moment(item.createdAt).fromNow()} */}
           {/* {moment(item.createdAt).fromNow()} */}
           <Text style={{color:"grey"}}>{" "}{moment(item.createdAt).fromNow()}</Text>
         </Text>


         <View style={{ flexDirection: 'row' }}>
           <View style={{ position: 'absolute', top: 5 }}>
             <View style={{ flexDirection: 'row' }}>

               
                 <View>
                   <Text style={{ color: "#989898", fontSize: 10 }}>
                     <Image
                       source={require("../assets/icons/eye.png")}
                       style={{ height: 8, width: 20, marginLeft: 2, marginTop: 3 }} placeholderStyle={{ backgroundColor: '#fff' }}
                       PlaceholderContent={renderImageLoader} />
                     {item.viewedUsers && item.viewedUsers.length} {I18n.t("views")} </Text>
                 </View>
                 {/* <Text>{String(item.uservisibility.location )}</Text> */}
{

item.uservisibility.location ?

               <TouchableOpacity
                 onPress={() =>
                   selectedPostMap(item, 'within')
                 }


               >
                 {
                   item.distance && item.distance != undefined ?
                   item.distance && item.distance.toFixed(2) < 1000 ?
                       <View style={{ flexDirection: 'row' }}>
                         <Image
                           source={require('../assets/bottomCard/distance.png')}
                           style={styles.map} placeholderStyle={{ backgroundColor: '#fff' }}
                           PlaceholderContent={renderImageLoader}
                         ></Image>
                         <Text style={{ fontSize: 10, marginTop: 3, color: '#6FA4E9' }}>{item.distance.toFixed(0)} m</Text></View> :
                       <View style={{ flexDirection: 'row' }}>
                         <Image
                           source={require('../assets/bottomCard/distance.png')}
                           style={styles.map} placeholderStyle={{ backgroundColor: '#fff' }}
                           PlaceholderContent={renderImageLoader}
                         ></Image>
                         <Text style={{ fontSize: 12, marginTop: 3, color: '#6FA4E9' }}>{(item.distance / 1000).toFixed(1)} Km</Text></View>
                     : <></>
                 }
               </TouchableOpacity>
               :
               <></>
}
             </View>


           </View>
         </View>
       </View>
       <View style={{ marginRight: 10,flexDirection:'column' }}>
       <TouchableOpacity
             onPress={() => openDots(item, 'within')}
           >
           <View>
         
             <Image
               source={require("../assets/icons/horizontaldots.png")}
               style={{
                 height: 12,
                 width: 25,
                 paddingLeft: 10,
                 marginTop: 10,
               }
               }
               placeholderStyle={{ backgroundColor: '#fff' }}
               PlaceholderContent={renderImageLoader}
             />

           </View>
           </TouchableOpacity>
           <View>
           {/* <TouchableOpacity
             onPress={() => onbookmark(index, 'within')}
           >

             {
               bookmark ?
                 <Image
                   source={require("../assets/icons/savedbookmark.png")}
                   style={{ height: 25, width: 20, right: 0, marginTop: 10, marginLeft: 4 }} placeholderStyle={{ backgroundColor: '#fff' }}
                   PlaceholderContent={renderImageLoader} />
                 :
                 <Image
                   source={require("../assets/icons/bookmark.png")}
                   style={{ height: 25, width: 20, right: 0, marginTop: 10, marginLeft: 4.25 }} placeholderStyle={{ backgroundColor: '#fff' }}
                   PlaceholderContent={renderImageLoader} />
             }
           </TouchableOpacity> */}
             </View>
         </View>
      
            
          </View>
          <View style={{marginHorizontal:5 , backgroundColor:"white"}}>
          <Text style={{marginTop:15,fontSize: 16 , paddingHorizontal:0}}>{item.pollQuestion}</Text>
          <Text style={{marginTop:0,fontSize: 12 ,color:'#D7D7D7', paddingHorizontal:0}}>Expires {" "}{moment(item.poll_expires_on).fromNow()}</Text>
          {/* <Text style={{marginTop:0,fontSize: 12 ,color:'#D7D7D7', paddingHorizontal:0}}>{item.content}</Text> */}
          <View
            style={{
              width: ScreenWidth * 0.9, margin:0 , marginBottom :10
            }}
          >
            <RNPoll
              
              style={{paddingTop:-80,marginTop:-20 }}
              choiceTextStyle={{padding:0}}
              totalVotes={totVote}
              animationDuration={200}
              disableBuiltInIncreaseVote={false}
              hasBeenVoted={item.Ivoted?true:false}
              fillBackgroundColor="#6FA4E9"
              borderRadius={30}
              choices={options}
              PollContainer={RNAnimated}
              PollItemContainer={RNAnimated }
              choiceTextStyle={{
                fontSize: 18, color:"black"
              }}
              onChoicePress={(selectedChoice) =>
                voteNow(selectedChoice)
              }
            />
            </View>
          </View>

          <View style={{flexDirection:"row" , margin:5}}>
            <View style={{flex:1}}>
            <Text style={{color:"#000" , marginLeft:0 ,fontWeight:'600', width:"46%"}}>Total votes :<Text style={{color:"grey"}}>{totVote}</Text> </Text>
            {/* <Text style={{color:"#000",fontWeight:'600',marginTop:10,fontSize:10}}>poll expires on :<Text style={{color:"grey"}}>{moment(item.poll_expires_on).format('LTS')}</Text> </Text> */}
            </View>
      
          </View>
          <View style={{ backgroundColor: "#fff", height: "auto" }}>
                        <View style={{ flexDirection: "row", marginTop: 0 }}>

                        </View>

                        <View
                          style={{
                            marginTop: 5,
                            marginLeft: 0,
                            width: '100%',
                            marginRight: 0,
                            borderBottomColor: "#f2f2f2",
                            borderBottomWidth: 1,
                          }}
                        />
                        {/* icon starts */}
                        <View
                          style={{ flex: 0, flexDirection: "row", magin: 0, justifyContent: 'center', justifyContent: 'space-between' }}

                        >
                          {/* likes */}
                          <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity
                              onPress={() => onLike(index, 'within')}
                            >

                              {
                                liked ?
                                  <Image
                                    source={require('../assets/bottomCard/liked.png')}

                                    style={{ height: 25, width: 25, margin: 23, marginTop: 7 }}
                                    PlaceholderContent={<ActivityIndicator />} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}></Image>
                                  :
                                  <Image
                                    source={require('../assets/bottomCard/disliked.png')}
                                    style={{ height: 25, width: 25, margin: 23, marginTop: 7 }}
                                    placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}></Image>
                              }

                              <Text style={{ position: 'absolute', top: 33, left: 31, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{currentCard.likes && currentCard.likes.length}</Text>


                            </TouchableOpacity>

                          </View>

                          {/* Comments */}

                          <View style={{ flexDirection: 'column' }}>
                            {
                              item.commentsc?
                              <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: item,
                                      naviga: 'Market',
                                      IncreaseCountOnComment:IncreaseCountOnComment
                                    })

                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  <Image
                                    source={require("../assets/icons/comment.png")}
                                    style={{ height: 27, width: 27, margin: 23, marginTop: 6 }}
                                    placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}
                                  />
                                  <Text style={{ position: 'absolute', top: 33, left: 32, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>
                                    {commentsCount}
                                  </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: item,
                                      naviga: 'Market'
                                      ,IncreaseCountOnComment:IncreaseCountOnComment
                                    })

                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  <Image
                                    source={require("../assets/icons/comment.png")}
                                    style={{ height: 27, width: 27, margin: 23, marginTop: 6 }}
                                    placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}
                                  />
                                  <Text style={{ position: 'absolute', top: 33, left: 32, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>
                                    0
                                  </Text>
                                </TouchableOpacity>
                            }

                                
                            
                          </View>


                          {/* Phone call */}
                          <View style={{ flexDirection: 'column' }}>


                            <TouchableOpacity onPress={() => { makeCalls(item) }}>
                              <Image

                                source={require("../assets/icons/call.png")}

                                style={{ height: 23, width: 23, margin: 23, marginTop: 9 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                PlaceholderContent={renderImageLoader}
                              ></Image>
                              <Text style={{ position: 'absolute', top: 33, left: 25, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{I18n.t("Call")}</Text>

                            </TouchableOpacity>

                          </View>


                          {/* Chat */}
                          <View style={{ flexDirection: 'column' }}>

                            {
                              item.uservisibility.chat ?

                                <TouchableOpacity onPress={() => clickedChat(item)}>
                                  <Image
                                    source={require("../assets/icons/chat.png")}

                                    style={{ height: 23, width: 23, margin: 23, marginTop: 9, marginLeft: 30 }}
                                    placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}
                                  ></Image>
                                  <Text style={{ position: 'absolute', top: 33, left: 33, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{I18n.t("Chat")}</Text>

                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => refRBSheetss.current.open()}>
                                  <Image
                                    source={require("../assets/icons/chatdisable.png")}
                                    // source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.39_PM_upsvxi.png' }}
                                    style={{ height: 23, width: 23, margin: 23, marginTop: 9 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}
                                  ></Image>
                                  <Text style={{ position: 'absolute', top: 33, left: 23, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{I18n.t("Chat")}</Text>

                                </TouchableOpacity>

                            }

                          </View>


                          {/* WhatsApp Share */}
                          <View style={{ flexDirection: 'column' }}>

                            <TouchableOpacity onPress={() => WhatsAppShare(item)}>
                              <View style={{ flexDirection: 'row' }}>
                                <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png' }}
                                  style={{ height: 25, width: 25, margin: 23, marginTop: 9 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                  PlaceholderContent={renderImageLoader}
                                ></Image>
                               {
                                  item.myshares[0] && item.myshares.length > 0 ?
                                    <Text style={{ position: 'absolute', top: 32, left: 30, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{item.myshares && item.myshares[0].shares}</Text> :
                                    <Text style={{ position: 'absolute', top: 32, left: 30, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>0</Text>
                                }
                              </View>
                            </TouchableOpacity>
                          </View >

                        </View>

                      </View>
        </View>
    </>
 
 
 </Card>
   </>
   :
   <>
   <Card style={styles.eachCard}>

   <View>
     <View style={{ flexDirection: "row", marginBottom: 10 }}>
       <View
         style={{ flex: 4, paddingLeft: 20, paddingTop: 20 }}
       >
         <View style={{ flexDirection: "column" }}>
           <View style={{ flex: 3 }}>
           <TouchableOpacity onPress={()=>{ navigation.navigate('ViewFullScreenImagesScreen', { photos: [{url:item.uservisibility.profilePic}], content: currentCard.content, name: currentCard.uservisibility.name, profilePic: currentCard.uservisibility.profilePic, time: currentCard.createdAt, post: currentCard, showHeader: false })}}>

             <Image
               cache="force-cache"
               source={{ uri: item.uservisibility.profilePic }}
               style={{
                 height: 55,
                 width: 55,
                 paddingLeft: 20,
                 borderRadius: 30,
               }} placeholderStyle={{ backgroundColor: '#fff' }}
               PlaceholderContent={<ActivityIndicator/>}
             />
             </TouchableOpacity>
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
         <TouchableOpacity onPress={() =>
           // clickAction(item)
           navigation.navigate('UserProfileDynamic', { userId: item.userId })
           // console.log("currenttttttttt",currentCard)
         }>
           <View style={{ flexDirection: 'row' }}>
             <Text style={{ fontWeight: "bold", fontSize: 16, color: '#6FA4E9' }}>
               {item.uservisibility.name.charAt(0).toUpperCase() + item.uservisibility.name.slice(1)}
             </Text>
             {
               item.isVerified ?
                 <>
                   <Image source={require('../assets/icons/account_verified.png')} style={{ height: 15, width: 15, marginTop: 3, marginLeft: 3 }} />
                 </>
                 :
                 <></>
             }
           </View>
         </TouchableOpacity>
         <Text style={{ marginTop: 0, fontSize: 10, color: '#989898' }}>
           {/* {moment(item.createdAt).fromNow()} */}
           {moment(item.createdAt).fromNow()}
         </Text>

         <View style={{ flexDirection: 'row' }}>
           <View style={{ position: 'absolute', top: 5 }}>
             <View style={{ flexDirection: 'row' }}>

               <TouchableOpacity
                 onPress={() =>
                   navigation.navigate("PostSpecificScreensFeed", { post: item,IncreaseCountOnComment:IncreaseCountOnComment })
                 }
                 style={{ backgroundColor: "#fff" }}
               >
                 <View>
                   <Text style={{ color: "#989898", fontSize: 10 }}>
                     <Image
                       source={require("../assets/icons/eye.png")}
                       style={{ height: 9, width: 22, marginLeft: -5, marginTop: 3 }} placeholderStyle={{ backgroundColor: '#fff' }}
                       PlaceholderContent={renderImageLoader} />
                     {item.viewedUsers && item.viewedUsers.length} {I18n.t("views")} </Text>
                 </View>
               </TouchableOpacity>
{
item.uservisibility.location?

               <TouchableOpacity
                 onPress={() =>
                   selectedPostMap(item, 'within')
                 }


               >
                 {
                   item.distance && item.distance != undefined ?
                     item.distance && item.distance.toFixed(2) < 1000 ?
                       <View style={{ flexDirection: 'row' }}>
                         <Image
                           source={require('../assets/bottomCard/distance.png')}
                           style={styles.map} placeholderStyle={{ backgroundColor: '#fff' }}
                           PlaceholderContent={renderImageLoader}
                         ></Image>
                         <Text style={{ fontSize: 10, marginTop: 3, color: '#6FA4E9' }}>{item.distance.toFixed(0)} m</Text></View> :
                       <View style={{ flexDirection: 'row' }}>
                         <Image
                           source={require('../assets/bottomCard/distance.png')}
                           style={styles.map} placeholderStyle={{ backgroundColor: '#fff' }}
                           PlaceholderContent={renderImageLoader}
                         ></Image>
                         <Text style={{ fontSize: 12, marginTop: 3, color: '#6FA4E9' }}>{(item.distance / 1000).toFixed(1)} Km</Text></View>
                     : <>
                     
                     {
                       item.uservisibility.location?
                        <Image
                        source={require('../assets/bottomCard/distance.png')}
                        style={styles.map} placeholderStyle={{ backgroundColor: '#fff' }}
                        PlaceholderContent={renderImageLoader}
                      ></Image>
                      :
                      <Image
                      source={require('../assets/greymap.png')}
                      style={styles.map} placeholderStyle={{ backgroundColor: '#fff' }}
                      PlaceholderContent={renderImageLoader}
                    ></Image>
                     }
                     

                     
                     
                     
                     </>
                 }
               </TouchableOpacity>
               :
               <></>
}
             </View>


           </View>
         </View>
       </View>
       <View style={{ marginRight: 10,flexDirection:'column' }}>
           <View>
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
               }
               }
               placeholderStyle={{ backgroundColor: '#fff' }}
               PlaceholderContent={renderImageLoader}
             />
           </TouchableOpacity>
           </View>
           <View>
           <TouchableOpacity
             onPress={() => onbookmark(index, 'within')}
           >

             {
               bookmark ?
                 <Image
                   source={require("../assets/icons/savedbookmark.png")}
                   style={{ height: 25, width: 20, right: 0, marginTop: 10, marginLeft: 4 }} placeholderStyle={{ backgroundColor: '#fff' }}
                   PlaceholderContent={renderImageLoader} />
                 :
                 <Image
                   source={require("../assets/icons/bookmark.png")}
                   style={{ height: 25, width: 20, right: 0, marginTop: 10, marginLeft: 4.25 }} placeholderStyle={{ backgroundColor: '#fff' }}
                   PlaceholderContent={renderImageLoader} />
             }
           </TouchableOpacity>
             </View>
         </View>

     </View>

     <View
       style={{
         marginTop: 0,
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

       <View style={{ flex: 2,paddingTop:10 }}>
         <Paragraph style={{ fontSize: 15 }}>
           {
             filterContent ?
               <View style={{ flex: 2 }}>
                 <View style={{ padding: 5 }}>
                   {
                     item.content.length > 100 ?
                       <Hyperlink linkDefault={true} linkStyle={{ color: '#6FA4E9' }}>
                         <Text>
                           {item.content.substr(0, 220)}....
                         </Text>
                       </Hyperlink>
                       // <Text style={{color:'#000', fontWeight:'500' }}>


                       // </Text>
                       : <><Paragraph style={{ fontSize: 15 }}>
                         <Hyperlink linkDefault={true} linkStyle={{ color: '#6FA4E9' }}>
                           <Text numberOfLines={5}>
                             {item.content}
                           </Text>
                         </Hyperlink>
                       </Paragraph>
                       </>
                   }
                   {item.content.length > 220 ? (
                     <TouchableOpacity
                       onPress={() =>
                         navigation.navigate("PostSpecificScreensFeed", {
                           post: item
                           ,IncreaseCountOnComment:IncreaseCountOnComment
                         })
                       }
                       style={{ backgroundColor: "#fff" }}
                     >
                       <Text style={{ color: "#989898", top: 3 }}>
                         {I18n.t("View more")}
                       </Text>
                     </TouchableOpacity>
                   ) : (
                     <></>
                   )}
                 </View>

               </View>
               :
               <View style={{ flex: 2 }}>
                 <Hyperlink linkDefault={true} linkStyle={{ color: '#6FA4E9' }}>
                   <Text style={{ fontSize: 15, padding: 0 }} >
                     {item.content}
                   </Text>
                 </Hyperlink>

               </View>
           }


         </Paragraph>
         <RNUrlPreview text={item.content} />
       </View>
     </View>
   </View>
   {

     item.content.length == 0 ?
       <View style={{ marginTop: -23 }}>
         <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: currentCard.photos, content: currentCard.content, name: currentCard.uservisibility.name, profilePic: currentCard.uservisibility.profilePic, time: currentCard.createdAt, post: currentCard, showHeader: true }) }}>
         <ImagesGrid images={[...item.photo]} overlay={[...item.photos]} video={[...item.video]} navigation={navigation} photos={currentCard.photos}  content={currentCard.content}  name={currentCard.uservisibility.name} profilePic={currentCard.uservisibility.profilePic} time={currentCard.createdAt} post={currentCard}  />
         </TouchableOpacity>
       </View>
       :


       <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: currentCard.photos, content: currentCard.content, name: currentCard.uservisibility.name, profilePic: currentCard.uservisibility.profilePic, time: currentCard.createdAt, post: currentCard, showHeader: true }) }}>
                        <ImagesGrid images={[...item.photo]} overlay={[...item.photos]} video={[...item.video]} navigation={navigation} photos={currentCard.photos}  content={currentCard.content}  name={currentCard.uservisibility.name} profilePic={currentCard.uservisibility.profilePic} time={currentCard.createdAt} post={currentCard}  />
       </TouchableOpacity>

   }

   <View style={{ backgroundColor: "#fff", height: "auto" }}>
     <View style={{ flexDirection: "row", marginTop: 0 }}>

     </View>

     <View
       style={{
         marginTop: 5,
         marginLeft: 10,
         width: '95%',
         marginRight: 0,
         borderBottomColor: "#f2f2f2",
         borderBottomWidth: 1,
       }}
     />
     {/* icons start? */}
     <View
       style={{ flex: 0, flexDirection: "row", magin: 0, justifyContent: 'center', justifyContent: 'space-between' }}

     >
       {/* likes */}
       <View style={{ flexDirection: 'column' }}>
         <TouchableOpacity
           onPress={() => onLike(index, 'within')}
         >

           {
             liked ?
               <Image
                 source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.17_PM_gudcen.png' }}
                 style={{ height: 25, width: 25, margin: 23, marginTop: 7 }} placeholderStyle={{ backgroundColor: '#fff' }}
                 PlaceholderContent={renderImageLoader}
               ></Image>
               :
               <Image
                 source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044952/Screenshot_2021-05-26_at_9.31.09_PM_qsntda.png' }}
                 style={{ height: 25, width: 25, margin: 23, marginTop: 7 }} placeholderStyle={{ backgroundColor: '#fff' }}
                 PlaceholderContent={renderImageLoader}
               ></Image>
           }

           <Text style={{ position: 'absolute', top: 33, left: 31, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{currentCard.likes && currentCard.likes.length}</Text>


         </TouchableOpacity>

       </View>

       {/* Comments */}

       <View style={{ flexDirection: 'column' }}>
         {
           item.commentsc?

             <TouchableOpacity
               onPress={() =>
                 navigation.navigate("PostSpecificScreensFeed", {
                   post: item,
                   naviga: 'Market'
                   ,IncreaseCountOnComment:IncreaseCountOnComment
                 })

               }
               style={{ backgroundColor: "#fff" }}
             >
               <Image
                 source={require("../assets/icons/comment.png")}
                 style={{ height: 25, width: 25, margin: 23, marginTop: 6 }}
                 placeholderStyle={{ backgroundColor: '#fff' }}
                 PlaceholderContent={renderImageLoader}
               />
               <Text style={{ position: 'absolute', top: 33, left: 32, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>
                 {commentsCount}
               </Text>
             </TouchableOpacity>
             :
             <TouchableOpacity
               onPress={() =>
                 navigation.navigate("PostSpecificScreensFeed", {
                   post: item,
                   naviga: 'Market'
                   ,IncreaseCountOnComment:IncreaseCountOnComment
                 })
               }
               style={{ backgroundColor: "#fff" }}
             >
               <Image
                 source={require("../assets/icons/comment.png")}
                 style={{ height: 25, width: 25, margin: 23, marginTop: 6 }}
                 placeholderStyle={{ backgroundColor: '#fff' }}
                 PlaceholderContent={renderImageLoader}
               />
               <Text style={{ position: 'absolute', top: 33, left: 32, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>
                 0
               </Text>
             </TouchableOpacity>
         }
       </View>


       {/* Phone call */}
       <View style={{ flexDirection: 'column' }}>

         <TouchableOpacity onPress={() => { makeCalls(item) }}>
           <Image
             source={require("../assets/icons/call.png")}

             style={{ height: 23, width: 23, margin: 23, marginTop: 9 }}
             placeholderStyle={{ backgroundColor: '#fff' }}
             PlaceholderContent={renderImageLoader}
           ></Image>
           <Text style={{ position: 'absolute', top: 33, left: 25, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}> {I18n.t('Call')}</Text>

         </TouchableOpacity>

       </View>


       {/* Chat */}
       <View style={{ flexDirection: 'column' }}>

         {
           item.uservisibility.chat ?

             <TouchableOpacity onPress={() => clickedChat(item)}>
               <Image
                 source={require("../assets/icons/chat.png")}

                 style={{ height: 23, width: 23, margin: 23, marginTop: 9, marginLeft: 30 }} placeholderStyle={{ backgroundColor: '#fff' }}
                 PlaceholderContent={renderImageLoader}
               ></Image>
               <Text style={{ position: 'absolute', top: 33, left: 33, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{I18n.t('Chat')}</Text>

             </TouchableOpacity>
             :
             <TouchableOpacity onPress={() => refRBSheetss.current.open()}>
               <Image
                 source={require("../assets/icons/chatdisable.png")}
                 // source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.39_PM_upsvxi.png' }}
                 style={{ height: 23, width: 23, margin: 23, marginTop: 9 }} placeholderStyle={{ backgroundColor: '#fff' }}
                 PlaceholderContent={renderImageLoader}
               ></Image>
               <Text style={{ position: 'absolute', top: 33, left: 23, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{I18n.t('Chat')}</Text>

             </TouchableOpacity>

         }

       </View>


       {/* WhatsApp Share */}
       <View style={{ flexDirection: 'column' }}>

         <TouchableOpacity onPress={() => WhatsAppShare(item)}>
           <View style={{ flexDirection: 'row' }}>
             <Image
               source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png' }}
               style={{ height: 25, width: 25, margin: 23, marginTop: 8 }} placeholderStyle={{ backgroundColor: '#fff' }}
               PlaceholderContent={renderImageLoader}
             ></Image>
             {
               item.myshares && item.myshares.length > 0 ?
                 <Text style={{ position: 'absolute', top: 32, left: 30, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{item.myshares[0].shares}</Text> :
                 <Text style={{ position: 'absolute', top: 32, left: 30, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>0</Text>
             }
           </View>
         </TouchableOpacity>
       </View >

     </View>

   </View>

   {/* icons end */}

 </Card>
</>
}


</>
                ) : item.featureName == "greet" ? (

                  <Card style={styles.eachCard}>

                    <View>
                      <View style={{ flexDirection: "row", marginBottom: 5 }}>
                        <View
                          style={{ flex: 4, paddingLeft: 20, paddingTop: 20 }}
                        >
                          <View style={{ flexDirection: "column" }}>
                            <View style={{ flex: 3 }}>
                            <TouchableOpacity onPress={()=>{ navigation.navigate('ViewFullScreenImagesScreen', { photos: [{url:item.uservisibility.profilePic}], content: currentCard.content, name: currentCard.uservisibility.name, profilePic: currentCard.uservisibility.profilePic, time: currentCard.createdAt, post: currentCard, showHeader: false })}}>

                              <Image
                                cache="force-cache"
                                source={{ uri: item.uservisibility.profilePic }}
                                style={{
                                  height: 55,
                                  width: 55,
                                  paddingLeft: 20,
                                  borderRadius: 30,
                                }} placeholderStyle={{ backgroundColor: '#fff' }}
                                PlaceholderContent={renderImageLoader}
                              />
                              </TouchableOpacity>
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
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, color: '#000' }}>
                              {item.uservisibility.name.charAt(0).toUpperCase() + item.uservisibility.name.slice(1)}
                            </Text>
                            {
                              item.isVerified && item.uservisibility.name != "Anonymous" ?
                                <>
                                  <Image source={require('../assets/icons/account_verified.png')} style={{ height: 15, width: 15, marginTop: 2,marginLeft:5 }}
                                  />
                                </>
                                :
                                <></>
                            }
                          </View>
                          <Text style={{ marginTop: 0, fontSize: 10, color: '#989898' }}>
                            {/* {moment(item.createdAt).fromNow()} */}
                            {moment(item.createdAt).fromNow()}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("PostSpecificScreensFeed", {
                                post: item,
                                naviga: 'All'
                                ,IncreaseCountOnComment:IncreaseCountOnComment
                              })
                            }
                            style={{ backgroundColor: "#fff" }}
                          >
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                              <View>
                                <Text style={{ color: "#989898", fontSize: 10 }}>
                                  <Image
                                    source={require("../assets/icons/eye.png")}
                                    style={{ height: 9, width: 22 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader} />
                                  {item.viewedUsers && item.viewedUsers.length}  {I18n.t("views")}</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>

                        <View style={{ marginRight: 10,flexDirection:'column' }}>
                            <View>
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
                                }
                                }
                                placeholderStyle={{ backgroundColor: '#fff' }}
                                PlaceholderContent={renderImageLoader}
                              />
                            </TouchableOpacity>
                            </View>
                            <View>
                            <TouchableOpacity
                              onPress={() => onbookmark(index, 'within')}
                            >

                              {
                                bookmark ?
                                  <Image
                                    source={require("../assets/icons/savedbookmark.png")}
                                    style={{ height: 25, width: 20, right: 0, marginTop: 10, marginLeft: 4 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader} />
                                  :
                                  <Image
                                    source={require("../assets/icons/bookmark.png")}
                                    style={{ height: 25, width: 20, right: 0, marginTop: 10, marginLeft: 4.25 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader} />
                              }
                            </TouchableOpacity>
                              </View>
                          </View>
                      </View>
                      <View
                        style={{
                          paddingLeft: 10,
                          marginBottom: 0,
                          flexDirection: "column",
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          {
                            item.content.length > 100 ?
                              <Hyperlink linkDefault={true} linkStyle={{ color: '#6FA4E9' }}>
                                <Text>
                                  {item.content.substr(0, 100)}....
                                </Text>
                              </Hyperlink>
                              // <Text style={{color:'#000', fontWeight:'500' }}>


                              // </Text>
                              : <><Paragraph style={{ fontSize: 15 }}>
                                <Hyperlink linkDefault={true} linkStyle={{ color: '#6FA4E9' }}>
                                  <Text numberOfLines={5}>
                                    {item.content}
                                  </Text>
                                </Hyperlink>
                              </Paragraph></>
                          }
                          <RNUrlPreview text={item.content} />
                          {item.content.length > 100 ? (
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("PostSpecificScreensFeed", {
                                  post: item
                                  ,IncreaseCountOnComment:IncreaseCountOnComment
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

                      item.content.length == 0 ?
                        <View style={{ marginTop: -23 }}>
                          <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: currentCard.photos, content: currentCard.content, name: currentCard.uservisibility.name, profilePic: currentCard.uservisibility.profilePic, time: currentCard.createdAt, post: currentCard, showHeader: true,index:0 }) }}>
                          <ImagesGrid images={[...item.photo]} overlay={[...item.photos]} video={[...item.video]} navigation={navigation} photos={currentCard.photos}  content={currentCard.content}  name={currentCard.uservisibility.name} profilePic={currentCard.uservisibility.profilePic} time={currentCard.createdAt} post={currentCard}  />
                          </TouchableOpacity>
                        </View>
                        :


                          <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: currentCard.photos, content: currentCard.content, name: currentCard.uservisibility.name, profilePic: currentCard.uservisibility.profilePic, time: currentCard.createdAt, post: currentCard, showHeader: true,index:0 }) }}>
                        <ImagesGrid images={[...item.photo]} overlay={[...item.photos]} video={[]} navigation={navigation} photos={currentCard.photos}  content={currentCard.content}  name={currentCard.uservisibility.name} profilePic={currentCard.uservisibility.profilePic} time={currentCard.createdAt} post={currentCard}  />
                        </TouchableOpacity>

                    }
                    {/* {

                      item.photo && item.photo.length > 0 ?

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>

                          {
                            item.video && item.video.length > 0 ?
                              <FlatList
                                data={[item.video, ...item.photo]}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, i }) => (
                                  <View style={{ marginRight: 10 }}>
                                    {
                                      String(item).substr(String(item).length - 3) == 'mp4' ?

                                        <Video source={{ uri: String(item) }}   // Can be a URL or a local file.
                                          ref={(ref) => {
                                            player = ref
                                          }}
                                          paused={true}
                                          controls={true}
                                          fullscreen={true}
                                          resizeMode="cover"

                                          style={{ height: 480, width: Dimensions.get('window').width }}
                                        />
                                        :
                                        <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: currentCard.photos, content: currentCard.content, name: currentCard.uservisibility.name, profilePic: currentCard.uservisibility.profilePic, time: currentCard.createdAt, post: currentCard, showHeader: true }) }}>
                                          <Image source={{ uri: item }} cache="force-cache" style={{
                                            width: Dimensions.get('window').width,
                                            height: 480,
                                            resizeMode: "cover",
                                          }} placeholderStyle={{ backgroundColor: '#fff' }}
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
                                      String(item).substr(String(item).length - 3) == 'mp4' ?

                                        <Video source={{ uri: String(item) }}
                                          ref={(ref) => {
                                            player = ref
                                          }}
                                          paused={true}
                                          fullscreen={true}
                                          resizeMode="cover"

                                          controls={true}
                                          style={{ height: 480, width: Dimensions.get('window').width }}
                                        />
                                        :
                                        <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: currentCard.photos, content: currentCard.content, name: currentCard.uservisibility.name, profilePic: currentCard.uservisibility.profilePic, time: currentCard.createdAt, post: currentCard, showHeader: true }) }}>
                                          <Image source={{ uri: item }} cache="force-cache" style={{
                                            width: Dimensions.get('window').width,
                                            height: 480,
                                            resizeMode: "cover",
                                          }} placeholderStyle={{ backgroundColor: '#fff' }}
                                            PlaceholderContent={renderImageLoader}></Image>
                                        </TouchableOpacity>
                                    }

                                  </View>
                                )}
                              />
                          }



                        </View>
                        : item.video && item.video.length > 0 ?
                          <View style={{ marginRight: 10 }}>

                            <Video source={{ uri: item.video[0] }}   // Can be a URL or a local file.
                              ref={(ref) => {
                                player = ref
                              }}
                              paused={true}
                              fullscreen={true}
                              controls={true}
                              resizeMode="cover"

                              style={{ height: 480, width: Dimensions.get('window').width }}
                            />

                          </View>
                          : <></>

                    } */}
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
                            style={{ flexDirection: "row" }}
                          >

                            {/* <View style={{ flexDirection: 'column',flex:0,left:Dimensions.get('window').width/2 }}> */}
                            <View >
                              <TouchableOpacity
                                onPress={() => onLike(index, 'within')}
                              >

                                {
                                  liked ?
                                    <Image
                                      source={require('../assets/bottomCard/liked.png')}

                                      style={{ height: 25, width: 25, margin: 15, marginTop: 7 }}
                                      PlaceholderContent={<ActivityIndicator />} placeholderStyle={{ backgroundColor: '#fff' }}
                                      PlaceholderContent={renderImageLoader}></Image>
                                    :
                                    <Image
                                      source={require('../assets/bottomCard/disliked.png')}
                                      style={{ height: 25, width: 25, margin: 15, marginTop: 7 }}
                                      placeholderStyle={{ backgroundColor: '#fff' }}
                                      PlaceholderContent={renderImageLoader} placeholderStyle={{ backgroundColor: '#fff' }}
                                      PlaceholderContent={renderImageLoader}></Image>
                                }

                                <Text style={{ position: 'absolute', top: 33, left: 24, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{currentCard.likes && currentCard.likes.length}</Text>


                              </TouchableOpacity>
                            </View>

                            {/* </View> */}
                            <View >
                              {
                                item.userId == userId ?
                                  <TouchableOpacity onPress={() => {
                                    alert(I18n.t('This is your Post'))
                                  }}>
                                    <Text style={{ marginTop: 15, color: '#6FA4E9', marginLeft: 180 }}>{I18n.t("Request to Chat")}</Text>
                                  </TouchableOpacity>
                                  :
                                  <TouchableOpacity onPress={() => {
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: item,
                                      naviga: 'Market'
                                      ,IncreaseCountOnComment:IncreaseCountOnComment
                                    })
                                  }}>
                                    <Text style={{ marginTop: 15, color: '#6FA4E9', marginLeft: 180 }}>{I18n.t("Request to Chat")}</Text>
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
          : <></>
      }
    </>
  )

}


const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 16
  },
  centeredView: {
    flex: 1,
    // justifyContent:'center',
    alignItems: 'center',
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
  map: {
    height: 25,
    width: 25,
    marginTop: -5

  },
  distance: {
    height: 25,
    width: 25,
    marginTop: 5
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
    elevation: 0,
    marginTop: 0,
    height: 'auto'
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
    flex: 1,
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
  imagess: {
    resizeMode: "contain",
    height: 180,
    marginTop:10,
    justifyContent: "center"
  }



});


const mapStatetoProps = (state) => {
  // const { }=state
  return {
    chat_roster_main: state.chat.chat_roster_main,
    allMapPosts: state.chatss.allMapPosts,
    token: state.chatss.token,
    chat_password: state.chatss.chat_password,
    jid_main: state.chatss.jid_main,
    token: state.chatss.token,
    userId: state.chatss.userId,
    refreshAfterPost: state.chatss.refreshAfterPost,
    isConnected: state.chatss.isConnected,
    Userpreferences: state.chatss.preferences
  };
};

// exports.finalXMPP = finalXMPP;
export default connect(mapStatetoProps)(PostCard);
