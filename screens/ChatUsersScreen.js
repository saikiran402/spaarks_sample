// import { ListItem, Avatar, Alert } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { act } from "react-test-renderer";
import moment from "moment";
import { connect, useDispatch, useReducer } from "react-redux";
const RightContent = (props) => <Text style={{ color: "#000" }}>15:20</Text>;
import { client, xml } from "@xmpp/client";
import debug from "@xmpp/debug";
import {setRecMes} from './AllFeaturesScreen'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import React, { useEffect, setState, useState, useRef } from "react";
import ChatCard from '../components/ChatCard';
import chatReducersactual from "../reducers/chatReducersactual";
import { connectXMPP, addListeners, getRosterMain, setMess,setXMPP,setPresence,getRosterFromXMPP } from './xmpp'
import _ from "lodash";
import I18n from '../src/i18n';
// import 'moment/locale/es'
import { useScrollToTop } from '@react-navigation/native';
const GLOBAL = require('../Globals');
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  LogBox,
  Dimensions,
  RefreshControl,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
LogBox.ignoreAllLogs();
import {
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
  TextInput,
} from "react-native-paper";
import { Chip } from "react-native-paper";
import { canPost } from './authGuard'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import chatReducers from "../reducers/chatReducers";
import  GreetRequestsScreen  from "./GreetRequestsScreen";
import { FlatList } from "react-native-gesture-handler";
import Globals from "../Globals";
import Spinner from 'react-native-loading-spinner-overlay';

// const xmpp = client({
//   service: "wss://chat.spaarksweb.com:5280/websocket",
//   domain: "chat.spaarksweb.com",
//   resource: "example",
//   username: "601529574c91aa34f9b04b61",
//   password: "SYVBm2XRuq",
// });
// jai 601529574c91aa34f9b04b61 SYVBm2XRuq
// debug(xmpp, true);
// 601529574c91aa34f9b04b61@chat.spaarksweb.com SYVBm2XRuq
const Stack = createStackNavigator();
var colors = ["#4E5567", "#6CB28E", "#FA6E5A"];

async function setPresencess(){
  setPresence(GLOBAL.JID_MAIN._W)
}
const ChatUsersScreen = ({
    navigation,
    chat_roster_main,
    chat_roster_anonymous,
    messages,
    isConnected,
    chatLoading,
    token}) => {
      // const [crm,setcrm] = useState(chat_roster_main)
        var a = 0;
        var messss = [];
        const dispatch = useDispatch(chatReducers);

      // async function getChatsList(){
      //  var a = await AsyncStorage.getItem('chat_roster_main');
      //  console.log('qwqwqwqwqw',a)
      //   var b = JSON.parse(a)
      //   alert(b.length)
      //  dispatch({type:'SETMYMESSAGEMAIN',chat_roster_main:b})
      // }

      async function setInStorage(){
       await AsyncStorage.setItem('chatData',String(chat_roster_main))
      }
        useEffect(()=>{
          setInStorage()
          setPresencess()
            // setXMPP()
            // getChatsList()
            // getRoster()
        },[])

        async function clickedChatName(item) {
          
          // setSpinner(true)
          // setSpinnerText('Connecting')
        

         
          navigation.navigate("ChatSpecificScreen", {
            name: item.name,
            isOtherAnonymous: item.isOtherAnonymous,
            item:item,
            profilePic: item.profilePic,
            jid: item.jid,
            xmpp: xmpp,
            connection:_.uniq(item.connection),
            messages: item.messages,
            media: []
          })
        
       
        }
        const refe = React.useRef(null);
        useScrollToTop(refe);
        async function getRoster() {
            setXMPP()
            var rosterListMain = await axios.post(
              GLOBAL.BASE_URL+"user/chatRoster",
              {
                mjid: 1,
                data: [],
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                  token
                },
              }
            );
        
        
            console.log("POSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOST", rosterListMain.data);
            rosterListMain.data.forEach(async (user) => {
              // if(user.name != 'dheeraj1'){
              var eachuser = {
                _id: user._id,
                aid: user.aid,
                blocked: user.blocked,
                blockedMe: user.blockedMe,
                canResume: user.canResume,
                chatExit: user.chatExit,
                chatExitMe: user.chatExitMe,
                clearChat: user.clearChat,
                contactMe: user.contactMe,
                connection:user.connection,
                jid: user.jid,
                name: user.name,
                message:'',
                messages:[],
                offline_count: user.offline_count,
                profilePic: user.profilePic,
                userId: user.userId,
                updatedAt: Date.now(),
              }
              var userIID = await AsyncStorage.getItem('jid_main');
              await axios
              .get(
                `http://103.27.86.24:3005/getmessages/${userIID.substr(0,24)}/${eachuser.userId}`
              )
              .then((resp) => {
                console.log("Mess Data",resp.data.data)
                if(resp.data.data.length == 0){
                  alert(resp.data.data.length)
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
                      name: eachuser.name,
                      avatar:eachuser.profilePic,
                    },
                  };

                    eachuser.messages.push(mymes);
                    eachuser.message = `Click to send Message`;
                }
                resp.data.data.forEach((list) => {
                  var message = JSON.parse(list.txt);
                  if (message.type == "chat") {
                    if(list.xml.includes(`from='${eachuser.userId}`)){
                      var mymes = {
                        content: message.content,
                        text: message.content,
                        createdAt: list.created_at,
                        messageType:message.type,
                        _id: Date.now()* Math.random(),
                        unique: message.unique,
                        messageId: message.unique,
                        type: "chat",
                        user: {
                          _id: 1,
                          name: eachuser.name,
                          avatar: eachuser.profilePic,
                        },
                      };
                      eachuser.messages.splice(0, 0, mymes);
                      eachuser.message = message.content;
                    }else{
                      var mymes = {
                        content: message.content,
                        text: message.content,
                        messageType:message.type,
                        createdAt: list.created_at,
                        _id: Date.now()* Math.random(),
                        unique: message.unique,
                        messageId: message.unique,
                        type: "chat",
                        user: {
                          _id: 2,
                          name: eachuser.name,
                          avatar:eachuser.profilePic,
                        },
                      };
                      eachuser.messages.splice(0, 0, mymes);
                      eachuser.message = message.content;
                    }
        
                  }
                  if (message.type == "image") {
                    if(list.xml.includes(`from='${eachuser.userId}`)){
                      var mymes = {
                        content: message.content,
                        image: message.content,
                        messageType:message.type,
                        createdAt: list.created_at,
                        _id: Date.now()* Math.random(),
                        unique: message.unique,
                        messageId: message.unique,
                        // sent: true,
                        // received: true,
                        type: "chat",
                        user: {
                          _id: 1,
                          name: eachuser.name,
                          avatar: eachuser.profilePic,
                        },
                      };
                      eachuser.messages.splice(0, 0, mymes);
                      eachuser.message = 'IMAGE';
                    }else{
                      var mymes = {
                        content: message.content,
                        image: message.content,
                        messageType:message.type,
                        createdAt: list.created_at,
                        _id: Date.now()* Math.random(),
                        unique: message.unique,
                        messageId: message.unique,
                        // sent: true,
                        // received: true,
                        type: "chat",
                        user: {
                          _id: 2,
                          name: user.name,
                          avatar: user.profilePic,
                        },
                      };
                      eachuser.messages.splice(0, 0, mymes);
                      eachuser.message = 'IMAGE';
                    }
                  }
                  if (message.type == "video") {
        
                    if(list.xml.includes(`from='${eachuser.userId}`)){
                      var mymes = {
                        content: message.content,
                        video: message.content,
                        messageType:message.type,
                        createdAt: list.created_at,
                        _id: Date.now()* Math.random(),
                        unique: message.unique,
                        messageId: message.unique,
                        // sent: true,
                        // received: true,
                        type: "chat",
                        user: {
                          _id: 1,
                          name: eachuser.name,
                          avatar: eachuser.profilePic,
                        },
                      };
                      eachuser.messages.splice(0, 0, mymes);
                      eachuser.message = 'VIDEO';
                    }else{
                      var mymes = {
                        content: message.content,
                        video: message.content,
                        messageType:message.type,
                        createdAt: list.created_at,
                        _id: Date.now()* Math.random(),
                        unique: message.unique,
                        messageId: message.unique,
                        // sent: true,
                        // received: true,
                        type: "chat",
                        user: {
                          _id: 2,
                          name: user.name,
                          avatar: user.profilePic,
                        },
                      };
                      eachuser.messages.splice(0, 0, mymes);
                      eachuser.message = 'VIDEO';
                    }
                  }
                   if (message.type == "file") {
        
                    if(list.xml.includes(`from='${eachuser.userId}`)){
                      var mymes = {
                        content: message.content,
                        document: message.content,
                        messageType:message.type,
                        text: message.content,
                        createdAt: list.created_at,
                        _id: Date.now()* Math.random(),
                        unique: message.unique,
                        messageId: message.unique,
                        // sent: true,
                        // received: true,
                        type: "chat",
                        user: {
                          _id: 1,
                          name: eachuser.name,
                          avatar: eachuser.profilePic,
                        },
                      };
                      eachuser.messages.splice(0, 0, mymes);
                      eachuser.message = 'DOCUMENT';
                    }else{
                      var mymes = {
                        content: message.content,
                        document: message.content,
                        messageType:message.type,
                        text: message.content,
                        createdAt: list.created_at,
                        _id: Date.now()* Math.random(),
                        unique: message.unique,
                        messageId: message.unique,
                        // sent: true,
                        // received: true,
                        type: "chat",
                        user: {
                          _id: 2,
                          name: user.name,
                          avatar: user.profilePic,
                        },
                      };
                      eachuser.messages.splice(0, 0, mymes);
                      eachuser.message = 'DOCUMENT';
                    }
                  }
                  if (message.type == "deleteforboths") {
        
                    if(list.xml.includes(`from='${eachuser.userId}`)){
                      var mymes = {
                        content: message.content,
                        messageType:message.type,
                        delete: message.content,
                        text: message.content,
                        createdAt: list.created_at,
                        _id: Date.now()* Math.random(),
                        unique: message.unique,
                        messageId: message.unique,
                        // sent: true,
                        // received: true,
                        type: "chat",
                        user: {
                          _id: 1,
                          name: eachuser.name,
                          avatar: eachuser.profilePic,
                        },
                      };
                      eachuser.messages.splice(0, 0, mymes);
                      eachuser.message = 'This message is deleted';
                    }else{
                      var mymes = {
                        content: message.content,
                        messageType:message.type,
                        delete: message.content,
                        text: message.content,
                        createdAt: list.created_at,
                        _id: Date.now()* Math.random(),
                        unique: message.unique,
                        messageId: message.unique,
                        // sent: true,
                        // received: true,
                        type: "chat",
                        user: {
                          _id: 2,
                          name: user.name,
                          avatar: user.profilePic,
                        },
                      };
                      eachuser.messages.splice(0, 0, mymes);
                      eachuser.message = 'This message is deleted';
                    }
                  }
                  
                });
              }).catch((err)=>{
                console.log('ERROR in 24 Server')
              })
              console.log('BEFOREDISPATCH')
              dispatch({
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
            // }
            });
            dispatch({ type: "SETMAINLOADING", main_loading: false });
            var stringed = JSON.stringify(chat_roster_main)
            await AsyncStorage.setItem('chat_roster_main',stringed)
          }

          async function getRosterRefresh() {
            setXMPP()
            var rosterListMain = await axios.post(
              GLOBAL.BASE_URL+"user/chatRoster",
              {
                mjid: 1,
                data: [],
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                  token
                },
              }
            );
            dispatch({
              type: "CLEARROSTER"
            });
        
            console.log("POSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOST", rosterListMain.data);
            rosterListMain.data.forEach(async (user) => {
              // if(user.name != 'dheeraj1'){
                var eachuser = {
                  _id: user._id,
                  aid: user.aid,
                  blocked: user.blocked,
                  blockedMe: user.blockedMe,
                  canResume: user.canResume,
                  chatExit: user.chatExit,
                  chatExitMe: user.chatExitMe,
                  clearChat: user.clearChat,
                  contactMe: user.contactMe,
                  connection:user.connection,
                  jid: user.jid,
                  name: user.name,
                  message:'',
                  messages:[],
                  offline_count: user.offline_count,
                  profilePic: user.profilePic,
                  userId: user.userId,
                  updatedAt: Date.now(),
                }
                var userIID = await AsyncStorage.getItem('jid_main');
                await axios
                .get(
                  `http://103.27.86.24:3005/getmessages/${userIID.substr(0,24)}/${eachuser.userId}`
                )
                .then((resp) => {
                  console.log("Mess Data",resp.data.data)
                  resp.data.data.forEach((list) => {
                    var message = JSON.parse(list.txt);
                    if (message.type == "chat") {
                      if(list.xml.includes(`from='${eachuser.userId}`)){
                        var mymes = {
                          content: message.content,
                          text: message.content,
                          createdAt: list.created_at,
                          messageType:message.type,
                          _id: Date.now()* Math.random(),
                          unique: message.unique,
                          messageId: message.unique,
                          type: "chat",
                          user: {
                            _id: 1,
                            name: eachuser.name,
                            avatar: eachuser.profilePic,
                          },
                        };
                        eachuser.messages.splice(0, 0, mymes);
                        eachuser.message = message.content;
                      }else{
                        var mymes = {
                          content: message.content,
                          text: message.content,
                          messageType:message.type,
                          createdAt: list.created_at,
                          _id: Date.now()* Math.random(),
                          unique: message.unique,
                          messageId: message.unique,
                          type: "chat",
                          user: {
                            _id: 2,
                            name: eachuser.name,
                            avatar:eachuser.profilePic,
                          },
                        };
                        eachuser.messages.splice(0, 0, mymes);
                        eachuser.message = message.content;
                      }
          
                    }
                    if (message.type == "image") {
                      if(list.xml.includes(`from='${eachuser.userId}`)){
                        var mymes = {
                          content: message.content,
                          image: message.content,
                          messageType:message.type,
                          createdAt: list.created_at,
                          _id: Date.now()* Math.random(),
                          unique: message.unique,
                          messageId: message.unique,
                          // sent: true,
                          // received: true,
                          type: "chat",
                          user: {
                            _id: 1,
                            name: eachuser.name,
                            avatar: eachuser.profilePic,
                          },
                        };
                        eachuser.messages.splice(0, 0, mymes);
                        eachuser.message = 'IMAGE';
                      }else{
                        var mymes = {
                          content: message.content,
                          image: message.content,
                          messageType:message.type,
                          createdAt: list.created_at,
                          _id: Date.now()* Math.random(),
                          unique: message.unique,
                          messageId: message.unique,
                          // sent: true,
                          // received: true,
                          type: "chat",
                          user: {
                            _id: 2,
                            name: user.name,
                            avatar: user.profilePic,
                          },
                        };
                        eachuser.messages.splice(0, 0, mymes);
                        eachuser.message = 'IMAGE';
                      }
                    }
                    if (message.type == "video") {
          
                      if(list.xml.includes(`from='${eachuser.userId}`)){
                        var mymes = {
                          content: message.content,
                          video: message.content,
                          messageType:message.type,
                          createdAt: list.created_at,
                          _id: Date.now()* Math.random(),
                          unique: message.unique,
                          messageId: message.unique,
                          // sent: true,
                          // received: true,
                          type: "chat",
                          user: {
                            _id: 1,
                            name: eachuser.name,
                            avatar: eachuser.profilePic,
                          },
                        };
                        eachuser.messages.splice(0, 0, mymes);
                        eachuser.message = 'VIDEO';
                      }else{
                        var mymes = {
                          content: message.content,
                          video: message.content,
                          messageType:message.type,
                          createdAt: list.created_at,
                          _id: Date.now()* Math.random(),
                          unique: message.unique,
                          messageId: message.unique,
                          // sent: true,
                          // received: true,
                          type: "chat",
                          user: {
                            _id: 2,
                            name: user.name,
                            avatar: user.profilePic,
                          },
                        };
                        eachuser.messages.splice(0, 0, mymes);
                        eachuser.message = 'VIDEO';
                      }
                    }
                     if (message.type == "file") {
          
                      if(list.xml.includes(`from='${eachuser.userId}`)){
                        var mymes = {
                          content: message.content,
                          document: message.content,
                          messageType:message.type,
                          text: message.content,
                          createdAt: list.created_at,
                          _id: Date.now()* Math.random(),
                          unique: message.unique,
                          messageId: message.unique,
                          // sent: true,
                          // received: true,
                          type: "chat",
                          user: {
                            _id: 1,
                            name: eachuser.name,
                            avatar: eachuser.profilePic,
                          },
                        };
                        eachuser.messages.splice(0, 0, mymes);
                        eachuser.message = 'DOCUMENT';
                      }else{
                        var mymes = {
                          content: message.content,
                          document: message.content,
                          messageType:message.type,
                          text: message.content,
                          createdAt: list.created_at,
                          _id: Date.now()* Math.random(),
                          unique: message.unique,
                          messageId: message.unique,
                          // sent: true,
                          // received: true,
                          type: "chat",
                          user: {
                            _id: 2,
                            name: user.name,
                            avatar: user.profilePic,
                          },
                        };
                        eachuser.messages.splice(0, 0, mymes);
                        eachuser.message = 'DOCUMENT';
                      }
                    }
          
                    if (message.type == "deleteforboths") {
          
                      if(list.xml.includes(`from='${eachuser.userId}`)){
                        var mymes = {
                          content: message.content,
                          messageType:message.type,
                          delete: message.content,
                          text: message.content,
                          createdAt: list.created_at,
                          _id: Date.now()* Math.random(),
                          unique: message.unique,
                          messageId: message.unique,
                          // sent: true,
                          // received: true,
                          type: "chat",
                          user: {
                            _id: 1,
                            name: eachuser.name,
                            avatar: eachuser.profilePic,
                          },
                        };
                        eachuser.messages.splice(0, 0, mymes);
                        eachuser.message = 'This message is deleted';
                      }else{
                        var mymes = {
                          content: message.content,
                          messageType:message.type,
                          delete: message.content,
                          text: message.content,
                          createdAt: list.created_at,
                          _id: Date.now()* Math.random(),
                          unique: message.unique,
                          messageId: message.unique,
                          // sent: true,
                          // received: true,
                          type: "chat",
                          user: {
                            _id: 2,
                            name: user.name,
                            avatar: user.profilePic,
                          },
                        };
                        eachuser.messages.splice(0, 0, mymes);
                        eachuser.message = 'This message is deleted';
                      }
                    }
                    if(resp.data.data.length == 0){
                      alert(resp.data.data.length)
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
                          name: eachuser.name,
                          avatar:eachuser.profilePic,
                        },
                      };
  
                        eachuser.messages.push(mymes);
                        eachuser.message = `Click to send Message`;
                    }
                  });
                }).catch((err)=>{
                  console.log('ERROR in 24 Server')
                })
                console.log('BEFOREDISPATCH')
               
                dispatch({
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
              // }
              
            });
            dispatch({ type: "SETMAINLOADING", main_loading: false });
            var stringed = JSON.stringify(chat_roster_main)
            await AsyncStorage.setItem('chat_roster_main',stringed)
          }



  async function getMessagesafterLastMessage(){
    var userIID = await AsyncStorage.getItem('jid_main');
      console.log('last message',this_messages[0])
      await axios
      .post(
        `http://103.27.86.24:3005/getmessagesbytime/${userIID.substr(0,24)}/${route.params.jid.substr(0,24)}`,{
          from:String(moment(this_messages[0].unique).local().format('YYYY-MM-DD HH:mm:ss')),
          to:String(moment(Date.now()).local().format('YYYY-MM-DD HH:mm:ss')),
        }
      )
      .then((resp) => {
        console.log('FTFTFTFTFTFTF',resp.data.data)
        if(resp.data.data.length>0){
        resp.data.data.forEach((list)=>{
          var message = JSON.parse(list.txt);
          // this_chat.messages.splice(0, 0, {
          //   content: messages[0].text,
          //   text: messages[0].text,
          //   messageType: 'chat',
          //   messageId: unique,
          //   createdAt: messages[0].createdAt,
          //   _id: Date.now(),
          //   unique: unique,
          //   type: "chat",
          //   user: {
          //     _id: 2,
          //   },
          // });
          if (message.type == "chat") {
            if(list.xml.includes(`from='${route.params.jid.substr(0,24)}`)){
              var mymes = {
                content: message.content,
                text: message.content,
                createdAt: list.created_at,
                messageType:message.type,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                type: "chat",
                user: {
                  _id: 1,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = message.content;
            }else{
              var mymes = {
                content: message.content,
                text: message.content,
                messageType:message.type,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                type: "chat",
                user: {
                  _id: 2,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = message.content;
            }
  
          }
          if (message.type == "image") {
            if(list.xml.includes(`from='${route.params.jid.substr(0,24)}`)){
              var mymes = {
                content: message.content,
                image: message.content,
                messageType:message.type,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                // sent: true,
                // received: true,
                type: "chat",
                user: {
                  _id: 1,
                  name: eachuser.name,
                  avatar: eachuser.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = 'IMAGE';
              var newImage = {
                url:message.content
              };
              this_chat.photos.push(newImage)
            }else{
              var mymes = {
                content: message.content,
                image: message.content,
                messageType:message.type,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                // sent: true,
                // received: true,
                type: "chat",
                user: {
                  _id: 2,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = 'IMAGE';
              var newImage = {
              url:message.content
              };
            this_chat.photos.push(newImage)
            }
          }
          if (message.type == "video") {
  
            if(list.xml.includes(`from='${route.params.jid.substr(0,24)}`)){
              var mymes = {
                content: message.content,
                video: message.content,
                messageType:message.type,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                // sent: true,
                // received: true,
                type: "chat",
                user: {
                  _id: 1,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = 'VIDEO';
            }else{
              var mymes = {
                content: message.content,
                video: message.content,
                messageType:message.type,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                // sent: true,
                // received: true,
                type: "chat",
                user: {
                  _id: 2,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = 'VIDEO';
            }
          }
           if (message.type == "file") {
  
            if(list.xml.includes(`from='${route.params.jid.substr(0,24)}`)){
              var mymes = {
                content: message.content,
                document: message.content,
                messageType:message.type,
                text: message.content,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                // sent: true,
                // received: true,
                type: "chat",
                user: {
                  _id: 1,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = 'DOCUMENT';
            }else{
              var mymes = {
                content: message.content,
                document: message.content,
                messageType:message.type,
                text: message.content,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                // sent: true,
                // received: true,
                type: "chat",
                user: {
                  _id: 2,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = 'DOCUMENT';
            }
          }
          if (message.type == "deleteforboths") {
  
            if(list.xml.includes(`from='${route.params.jid.substr(0,24)}`)){
              var mymes = {
                content: message.content,
                messageType:message.type,
                delete: message.content,
                text: message.content,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                // sent: true,
                // received: true,
                type: "chat",
                user: {
                  _id: 1,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = 'This message is deleted';
            }else{
              var mymes = {
                content: message.content,
                messageType:message.type,
                delete: message.content,
                text: message.content,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                // sent: true,
                // received: true,
                type: "chat",
                user: {
                  _id: 2,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = 'This message is deleted';
            }
          }
        })

        this_chat.updatedAt = Date.now();
        this_chat.message = message[0].text;
        this_chat.name = route.params.name;

        dispatcher({ type: 'UPDATEMESSAGES', messages_chat: this_chat.messages })
      }
        // dispatch({
        //   type: "SETMYMESSAGEMAIN",
        //   chat_roster_main: chat_roster_main,
        // });
  
  
      }).catch((err)=>{
        console.log(err)
      })
  }
          async function setttt(){
            setXMPP();
           
          }
      
        function getoldMessages() {
          const { iqCaller } = xmpp;
          chat_roster_main.forEach((list) => {
            const response = iqCaller.request(
              xml(
                "iq",
                { type: "set" },
                xml(
                  "query",
                  "urn:xmpp:mam:2",
                  xml(
                    "field",
                    { var: "FORM_TYPE", type: "hidden" },
                    xml("value", {}, "urn:xmpp:mam:2")
                  ),
                  xml("field", { var: "with" }, xml("value", {}, list.jid)),
                  xml(
                    "field",
                    { var: "before", type: "hidden" },
                    xml("value", {}, Date.now())
                  )
                  // ,
                  // xml("set", { xmlns: "http://jabber.org/protocol/rsm"},
                  //     xml("max",{}, 20)
                  // )
                )
              ),
              30 * 1000 // 30 seconds timeout - default
            );
      
      
            const res1 = iqCaller.request(
              xml(
                "iq",
                { type: "set" },
                { id: 'enable1' },
                { from: '601529574c91aa34f9b04b61@chat.spaarksweb.com' },
                xml(
                  "enable",
                  "urn:xmpp:mam:2",
                )
              )
            );
          });
      
          // <set xmlns='http://jabber.org/protocol/rsm'>
          //   <max>10</max>
          // </set>
          // const foo = response.getChild("query", "urn:xmpp:mam:2");
          // console.log("foo",foo);
        }
      

        async function setMessages() {
          dispatch({ type: "SETLOADING", chatLoading: true });
          console.log("chat_roster_main", chat_roster_main);
          console.log("messages", messages);
          // _.uniq(messages, 'unique');
          chat_roster_main.forEach(async (user) => {
            await axios
              .get(
                `http://103.27.86.24:3005/getmessages/601529574c91aa34f9b04b61/${user.userId}`
              )
              .then((resp) => {
                resp.data.data.forEach((list) => {
                  var message = JSON.parse(list.txt);
                  if (message.type == "chat") {
                    if (list.xml.includes(`from='${user.userId}`)) {
                      var mymes = {
                        content: message.content,
                        text: message.content,
                        createdAt: list.created_at,
                        _id: Date.now() * Math.random(),
                        unique: message.unique,
                        sent: true,
                        received: true,
                        type: "chat",
                        user: {
                          _id: 1,
                          name: user.name,
                          avatar: user.profilePic,
                        },
                      };
                      user.messages.splice(0, 0, mymes);
                    } else {
                      var mymes = {
                        content: message.content,
                        text: message.content,
                        createdAt: list.created_at,
                        _id: Date.now() * Math.random(),
                        unique: message.unique,
                        sent: true,
                        received: true,
                        type: "chat",
                        user: {
                          _id: 2,
                          name: user.name,
                          avatar: user.profilePic,
                        },
                      };
                      user.messages.splice(0, 0, mymes);
                    }
      
                  }
                  if (list.type == "image") {
      
                    if (list.xml.includes(`from='${user.userId}`)) {
                      var mymes = {
                        content: message.content,
                        image: message.content,
                        createdAt: list.created_at,
                        _id: Date.now() * Math.random(),
                        unique: message.unique,
                        // sent: true,
                        // received: true,
                        type: "chat",
                        user: {
                          _id: 1,
                          name: user.name,
                          avatar: user.profilePic,
                        },
                      };
                      user.messages.splice(0, 0, mymes);
                    } else {
                      var mymes = {
                        content: message.content,
                        image: message.content,
                        createdAt: list.created_at,
                        _id: Date.now() * Math.random(),
                        unique: message.unique,
                        // sent: true,
                        // received: true,
                        type: "chat",
                        user: {
                          _id: 2,
                          name: user.name,
                          avatar: user.profilePic,
                        },
                      };
                      user.messages.splice(0, 0, mymes);
                    }
                  }
                });
              });
            // await axios
            //   .get(
            //     `http://103.27.86.24:3005/getmessages/${user.userId}/601529574c91aa34f9b04b61@chat.spaarksweb.com`
            //   )
            //   .then((resp) => {
            //     resp.data.data.forEach((list) => {
            //       var message = JSON.parse(list.txt);
            //       if (message.type == "chat") {
            //         var message = JSON.parse(list.txt);
            //         var mymes = {
            //           content: message.content,
            //           text: message.content,
            //           createdAt: list.created_at,
            //           _id: list._id,
            //           unique: message.unique,
            //           // sent: true,
            //           // received: true,
            //           type: "chat",
            //           user: {
            //             _id: 1,
            //             name: user.name,
            //             avatar: user.profilePic,
            //           },
            //         };
            //         user.messages.push(mymes);
            //       }
            //       if (list.type == "image") {
            //         var message = JSON.parse(list.txt);
            //         var mymes = {
            //           content: message.content,
            //           image: message.content,
            //           createdAt: list.created_at,
            //           _id: list._id,
            //           unique: message.unique,
            //           // sent: true,
            //           // received: true,
            //           type: "chat",
            //           user: {
            //             _id: 1,
            //             name: user.name,
            //             avatar: user.profilePic,
            //           },
            //         };
            //         user.messages.push(mymes);
            //       }
            //     });
      
            //   });
            if (user.messages.length > 0) {
              user.updatedAt = user.messages[0].createdAt;
            } else {
              user.updatedAt = -1;
            }
      
            // var this_chat = chat_roster_main.find(item => item.jid == user.jid);
            // console.log("this_chat",this_chat)
            // messages.forEach((list,i)=>{
            //   if(list.from.substr(0,44) == "601529574c91aa34f9b04b61@chat.spaarksweb.com" && list.to.substr(0,44) == user.jid){
            //    if(list.type == 'chat'){
            //     var mymes = {
            //       content:list.content,
            //       text:list.content,
            //       createdAt:Number(list.unique),
            //       _id:Date.now(),
            //       unique:list.unique,
            //       // sent: true,
            //       // received: true,
            //       type:'chat',
            //       user:{
            //         "_id": 2,
            //         name: user.name,
            //         avatar: user.profilePic,
            //       }
            //     }
            //     user.messages.push(mymes)
            //    }
            //   //  if(list.type== 'image'){
            //   //   var mymes = {
            //   //     content:list.content,
            //   //     image:list.content,
            //   //     createdAt:list.unique,
            //   //     _id:list.unique,
            //   //     unique:list.unique,
            //   //     // sent: true,
            //   //     // received: true,
            //   //     type:'image',
            //   //     user:{
            //   //       "_id": 2,
            //   //       name: user.name,
            //   //       avatar: user.profilePic,
            //   //     }
            //   //   }
            //   //   user.messages.push(mymes)
            //   //  }
            //   //  if(list.type== 'video'){
            //   //   var mymes = {
            //   //     content:list.content,
            //   //     video:list.content,
            //   //     createdAt:list.unique,
            //   //     _id:list.unique,
            //   //     unique:list.unique,
            //   //     // sent: true,
            //   //     // received: true,
            //   //     type:'video',
            //   //     user:{
            //   //       "_id": 2,
            //   //       name: user.name,
            //   //       avatar: user.profilePic,
            //   //     }
            //   //   }
            //   //   user.messages.push(mymes)
            //   //  }
            //   messages.splice(i,1)
            //   }
            //   if(list.from.substr(0,44) == user.jid  && list.to.substr(0,44) == "601529574c91aa34f9b04b61@chat.spaarksweb.com"){
            //     if(list.type == 'chat'){
            //       var mymes = {
            //         content:list.content,
            //         text:list.content,
            //         createdAt:list.unique,
            //         _id:Date.now(),
            //         unique:list.unique,
            //         // sent: true,
            //         type:'chat',
            //         user:{
            //           "_id": 1,
            //           name: user.name,
            //           avatar: user.profilePic,
            //         }
            //       }
            //       user.messages.push(mymes)
            //      }
            //     //  if(list.type== 'image'){
            //     //   var mymes = {
            //     //     content:list.content,
            //     //     image:list.content,
            //     //     createdAt:list.unique,
            //     //     _id:list.unique,
            //     //     unique:list.unique,
            //     //     // sent: true,
            //     //     type:'image',
            //     //     user:{
            //     //       "_id": 1,
            //     //       name: user.name,
            //     //       avatar: user.profilePic,
            //     //     }
            //     //   }
            //     //   user.messages.push(mymes)
            //     //  }
            //     //  if(list.type== 'video'){
            //     //   var mymes = {
            //     //     content:list.content,
            //     //     video:list.content,
            //     //     createdAt:list.unique,
            //     //     _id:list.unique,
            //     //     unique:list.unique,
            //     //     // sent: true,
            //     //     type:'video',
            //     //     user:{
            //     //       "_id": 1,
            //     //       name: user.name,
            //     //       avatar: user.profilePic,
            //     //     }
            //     //   }
            //     //   user.messages.push(mymes)
            //     //  }
            //     messages.splice(i,1)
            //   }
      
            // })
            chat_roster_main.sort((a, b) => a.updatedAt - b.updatedAt)
            dispatch({
              type: "SETMYMESSAGEMAIN",
              chat_roster_main: chat_roster_main,
            });
          });
          dispatch({ type: "SETLOADING", chatLoading: false });
        }
    
        function startxmpp() {
          dispatch({ type: "SETLOADING", chatLoading: true });
          xmpp.start().catch(console.error);
          xmpp.on("online", (address) => {
            console.log("online", address.toString());
          });
      
          // addListeners();
      
          setTimeout(() => {
            // getRoster();
          }, 2000);
      
          // setTimeout(() => {
          //   setMessages()
          // }, 5000);
        }
        
       function onLogin(phone) {
                      console.log("phoness", phone)
                      // Login.current.close();
                      navigation.navigate('VerifyOtpScreen', { phone: phone })
                    }
      
        const [refreshing, setRefreshing] = React.useState(false);
        const [spinner, setSpinner]= useState(false);
        const [spinnerText, setSpinnerText]= useState('Loading');
        const [click, setClick] = useState(false);

        const wait = (timeout) => {
          return new Promise((resolve) => {
            setTimeout(resolve, timeout);
          });
        };
      

        const isToday = (currentDates) =>{
          const today = new Date()
          const currentDate = new Date(currentDates)
   
          console.log('DAAAAAA',currentDate.getDate() == today.getDate() &&
          currentDate.getMonth() == today.getMonth() &&
          currentDate.getFullYear() == today.getFullYear())
          
          if(currentDate.getDate() == today.getDate() &&
          currentDate.getMonth() == today.getMonth() &&
          currentDate.getFullYear() == today.getFullYear()){
            return true;
          }else{
            return false;
          }
    
        }
        const ActualChatdispatcher = useDispatch(chatReducersactual);

        const onRefresh = React.useCallback(async () => {
          // setRefreshing(true);
          // getRosterRefresh()
          // getRosterFromXMPP()
   
          // var tok = await AsyncStorage.getItem('token')
          // getRosterFromXMPP(ActualChatdispatcher,tok)
          wait(2000).then(() => setRefreshing(false));
        }, []);
      
        // startxmpp()
        if (chatLoading) {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" />
            </View>
          );
        }
      if(isConnected){
        return (
          <View style={{ backgroundColor: "#f2f2f2" }}>
             <Spinner
          visible={spinner}
          textContent={spinnerText}
          textStyle={styles.spinnerTextStyle}
        />
          {
            token != null?
               <ScrollView ref={refe}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <View style={{ flexDirection: "row" }}>
                {/* <TouchableOpacity onPress={() => startxmpp(chat_roster_main)}> */}
                {/* <TouchableOpacity onPress={() => connectXMPP(chat_roster_main,null)}>
                <Chip
                  mode={"outlined"}
                  style={{ margin: 3, marginBottom: 5, backgroundColor: "#6FA4E9" }}
                >
                  <Text style={{ color: "#fff" }}>
                    Chat as Saikiran
                  </Text>
                </Chip>
                </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={() => setttt()}>
                <Chip
                  mode={"outlined"}
                  style={{ margin: 3, marginBottom: 5, backgroundColor: "#6FA4E9" }}
                >
                  <Text style={{ color: "#fff" }}>
                    Set XMPP
                  </Text>
                </Chip>
                </TouchableOpacity>
      
      
                <TouchableOpacity onPress={() => getRoster()}>
                <Chip
                  mode={"outlined"}
                  style={{ margin: 3, marginBottom: 5, backgroundColor: "#6FA4E9" }}
                >
                  <Text style={{ color: "#fff" }}>
                    Get Roster
                  </Text>
                </Chip>
                </TouchableOpacity>  */}

                {/* <TouchableOpacity onPress={() => setPresencess()}>
                <Chip
                  mode={"outlined"}
                  style={{ margin: 3, marginBottom: 5, backgroundColor: "#6FA4E9" }}
                >
                  <Text style={{ color: "#fff" }}>
                    Click here
                  </Text>
                </Chip>
                </TouchableOpacity>  */}


                
      
      
      
                
              </View>
             {/* {
                chat_roster_main.length>0?
                <Text style={{ color: "#9A9A9A", fontSize: 12, padding: 5 }} onPress={()=>setPresencess()}>
                You chatted with these users using your name visible to them
              </Text>
              :
              <></>
             } */}
             
              <View>
                {/* <Text>{chat_roster_main.length}</Text> */}
                <View>
                  {
                      chat_roster_main.length>0?
                      <>
                      <FlatList    
                      data={[...chat_roster_main
                        .sort(function(a,b){
                        return new Date(b.messages[0].createdAt) - new Date(a.messages[0].createdAt);
                      })].filter((b)=>{
                        return b.messages.length > 1
                    })} 
                      keyExtractor={(item, index) => item._id}
                      renderItem={({ item }) => (
<>
{
true?
<ChatCard item={item} navigation={navigation}/>
:
<></>
}

</>
                      )}/>
                      <FlatList    
                      data={[...chat_roster_main
                        .sort(function(a,b){
                        return new Date(b.messages[0].createdAt) - new Date(a.messages[0].createdAt);
                      })]
                    }  
                      keyExtractor={(item, index) => item._id}
                      renderItem={({ item }) => (
<>
{
item.messages.length == 1?
<ChatCard item={item} navigation={navigation}/>
:
<></>
}

</>

                      )}/>
                      </>
                      :
                      <>
                     
                         <View style={{ backgroundColor: "#f2f2f2", height: Dimensions.get('window').height }}>
                          <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>

                         <Image
                          source={require("../assets/icons/chats_screen.png")}
                          style={{ height: 70, width: 75, position:'absolute',top:(Dimensions.get('window').height/2)-190 }}
                        ></Image>
                         <Text style={{ color: "#ACB2BE", fontSize: 20, textAlign: "center", top:(Dimensions.get('window').height/2)-100}}>
                          {I18n.t("You don't have any conversations yet!")}</Text>
                          </View>
                          </View>
                          </>
                  }
                    
                </View>
              </View>
            </ScrollView>
      
            :
             <View style={{ backgroundColor: "#fff", height: Dimensions.get('window').height  }}>
                                <View>
                                  <View>
      
                                    <View style={{ flexDirection: "row", marginTop: 0 }}>
                                      <View style={{ color: "#000", flex: 13, height: 60,justifyContent:"center", alignItems:'center' , top: 30}}>
                                        <Image source={require('../assets/icons/login_continue.png')} style={{ height: 150, width: 150 }}></Image>
                                      </View>
                                    </View>
                                    <View style={{ flexDirection: "row", marginTop: 0 }}>
                                      <View style={{ color: "#000", flex: 13, height: 160,justifyContent:"center", alignItems:'center' }}>
      
      
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
         
         
         }
           
          </View>
        );
      }else{
        return(
          <ScrollView 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{flex:1,height:Dimensions.get('window').height/2,justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../assets/offline2.png')} style={{height:300,width:300}}/>
          </View>
          </ScrollView>
        )
      }
       
};

const mapStatetoProps = (state) => {
    // const { }=state
    console.log("ChatsState", state.chat_roster_main);
    return {
        chat_roster_main: state.chatss.chat_roster_main,
        chat_roster_anonymous: state.chatss.chat_roster_anonymous,
        messages: state.chatss.messages,
        chatLoading: state.chatss.chatLoading,
        token: state.chatss.token,
        isConnected:state.chatss.isConnected,
        
    };
  };
  export default connect(mapStatetoProps)(ChatUsersScreen);

const styles = StyleSheet.create({
  spinnerTextStyle: { 
    color: '#FFF',
    fontSize:16
  },
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
