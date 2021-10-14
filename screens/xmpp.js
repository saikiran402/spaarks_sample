import { client, xml } from "@xmpp/client";
import React, { useEffect, setState, useRef,useState } from "react";
import debug from "@xmpp/debug";
import axios from "axios";
import { connect, useDispatch, useReducer } from "react-redux";
import chatReducers from "../reducers/chatReducers";
import ReceivedXMPP from './ReceivedXMPP'
import {setRecMes} from './AllFeaturesScreen'
import AsyncStorage from "@react-native-community/async-storage";
const GLOBAL = require('../Globals');
import Snackbar from 'react-native-snackbar';
import moment from "moment";
import RNRestart from 'react-native-restart';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import I18n from '../src/i18n';
global.xmpp = null;

import {setOnlineStatus} from '../components/ChatCard'
var chat_password;
var jid_main;
// import {setMessages} from './ExploreScreen'
// await AsyncStorage.getItem('chatpassword', String(resp.data.chatpassword));
// await AsyncStorage.setItem('callpassword', String(resp.data.callpassword));
// await AsyncStorage.setItem('jid_main', String(resp.data.jid_main));
// const xmpp = client({
//   service: "wss://chat.spaarksweb.com:5280/websocket",
//   domain: "chat.spaarksweb.com",
//   resource: 'example',
//   username: "6094e7b46e8d967dd5fc5fff",
//   password: "rEJQ1QvDN1",
// });





async function setXMPP(){
  // console.log('SETTED',GLOBAL.JID_MAIN)
  // console.log('SETTED',GLOBAL.CHAT_PASSWORD)
  const xmpp = client({
    service: "wss://chat.spaarksweb.com:5280/websocket",
    domain: "chat.spaarksweb.com",
    resource: Date.now*1000,
    username: GLOBAL.JID_MAIN._W,
    password: GLOBAL.CHAT_PASSWORD._W
  });
  global.xmpp = xmpp; 

  // console.log('{{{}}}}{{{{}}}}')
  // console.log(global.xmpp)
  
}

async function setXMPPs(cid,cpd){
  // console.log('SETTED',cid)
  // console.log('SETTED',cpd)
  const xmpp = client({
    service: "wss://chat.spaarksweb.com:5280/websocket",
    domain: "chat.spaarksweb.com",
    resource: Date.now*1000,
    username: cid,
    password: cpd
  });
  global.xmpp = xmpp; 

  // console.log('{{{}}}}{{{{}}}}')
  // console.log(global.xmpp)
  
}



async function confirmlogout(Chatdispatcher,navigation){
  // setSpinner(true)
  // setSpinnerText('Connecting')
  Snackbar.show({
    text: I18n.t('Session Expired Loggin you out'),
    duration: 10000,
  });
  disconnect()
  Chatdispatcher({type:'SETMYMESSAGEMAIN',chat_roster_main:[]})
  Chatdispatcher({type:'SETPROFILEPIC',profilePic:'https://static-content.spaarksweb.com/images/userprofile.png'})
  Chatdispatcher({type:'SETTOKEN',token:null,name:'Loading',userId:null,jid_main:null,chat_password:null})
  await AsyncStorage.setItem('name', "Loading...");
  await AsyncStorage.setItem('onBoarded', "true");
  await AsyncStorage.setItem('callDomain', String(null));
  await AsyncStorage.setItem('chatDomain', String(null));
  await AsyncStorage.setItem('chatpassword', String(null));
  await AsyncStorage.setItem('callpassword', String(null));
  await AsyncStorage.setItem('jid_main', String(null));
  await AsyncStorage.setItem('profilePic', String('https://static-content.spaarksweb.com/images/userprofile.png'));
  await AsyncStorage.setItem('token', String(null));
  await AsyncStorage.setItem('isProfileCompleted', String(true));
  // setSpinner(false)
  // navigation.navigate('All')
  // signOut()
}


async function confirmlogoutApp(){
  // setSpinner(true)
  // setSpinnerText('Connecting')
  Snackbar.show({
    text: 'Session Expired Loggin you out',
    duration: 10000,
  });
  disconnect()
  await AsyncStorage.setItem('name', "Loading...");
  await AsyncStorage.setItem('onBoarded', "true");
  await AsyncStorage.setItem('callDomain', String(null));
  await AsyncStorage.setItem('chatDomain', String(null));
  await AsyncStorage.setItem('chatpassword', String(null));
  await AsyncStorage.setItem('callpassword', String(null));
  await AsyncStorage.setItem('jid_main', String(null));
  await AsyncStorage.setItem('profilePic', String('https://static-content.spaarksweb.com/images/userprofile.png'));
  await AsyncStorage.setItem('token', String(null));
  await AsyncStorage.setItem('isProfileCompleted', String(true));
  RNRestart.Restart();
  // setSpinner(false)
  // navigation.navigate('All')
  // signOut()
}

// jai 601529574c91aa34f9b04b61 SYVBm2XRuq
async function addListners(){

  debug(xmpp, true);
}
// useEffect(() => {
//     const Chatdispatcher = useDispatch(chatReducers);
//     return () => {
        
//     }
// }, [])

// xmpp.on("stanza", async (stanza) => {
//   console.log('-------------------------');
//   console.log(stanza);
//   console.log('-------------------------');
//   console.log("In stanzas old", stanza);
//   console.log("In stanzas from", stanza.attrs.from); // from
//   console.log("In stanzas to", stanza.attrs.to); // to
//   console.log("In stanzas Message", stanza.children[2].children[0]);
//   console.log("chat_roster_mainnn",chat_roster_main)
//   setRecMes(stanza.attrs.from,stanza.attrs.to,JSON.parse(stanza.children[2].children[0]).content,JSON.parse(stanza.children[2].children[0]).unique,JSON.parse(stanza.children[2].children[0]).type)
//   // alert(JSON.parse(stanza.children[2].children[0]).content)
//   // return(<ReceivedXMPP from={stanza.attrs.from} to={stanza.attrs.to} content={JSON.parse(stanza.children[2].children[0]).content} createdAt={JSON.parse(stanza.children[2].children[0]).unique} />)
//   // if (chat_roster_main.length > 0) {
//   //   chat_roster_main.forEach((list) => {
//   //     if (list.jid == stanza.attrs.from.substr(0, 44)) {
//   //       list.messages.splice(0, 0, {
//   //         content: stanza.children[2].children[0].content,
//   //         text: stanza.children[2].children[0].content,
//   //         createdAt: stanza.children[2].children[0].createdAt,
//   //         _id: Date.now() * Math.random(),
//   //         unique: Date.now(),
//   //         type: "chat",
//   //         user: {
//   //           _id: 1,
//   //         },
//   //       });
//   //       list.updatedAt = Date.now();
//   //     }
//   //   });
//   //   Chatdispatcher({
//   //     type: "SETMYMESSAGEMAIN",
//   //     chat_roster_main: chat_roster_main,
//   //   });
//   // }
// });
// xmpp.on("stanza", (stanza) => {
//   console.log(stanza.toString());
//   if (!stanza.is("message")) return;

//   const message = stanza.clone();
//   message.attrs.to = stanza.attrs.from;
//   xmpp.send(message);
// });


async function addListenerssss(){

}

async function addListeners(chat_roster_main,Chatdispatchers) {
  // alert('Received')

    // console.log("Added-SETTED")
    var jid_main = await AsyncStorage.getItem('jid_main')
    var chat_roster_main = chat_roster_main;
    global.xmpp.on("stanza", async (stanza) => {
      console.log('-------------------------xmpp');
      console.log(stanza);
      console.log('-------------------------');
      // console.log("In stanzas old", stanza);
      // console.log("In stanzas from", stanza.attrs.from); // from
      // console.log("In stanzas to", stanza.attrs.to); // to
      // global.xmpp.send(xml("presence", { type: "available" }));
      // console.log("In stanzas Message", stanza.children[2].children[0]);
      // if(String(stanza.children[2].children[0]).includes('content')){
      if(stanza.name != 'message'){
        // setOnlineStatus(stanza.attrs.from.substr(0,44))
        // Chatdispatchers({type:'SETONLINE',from:stanza.attrs.from.substr(0,44)})
      //   Chatdispatchers({type:"SETMAINMESSAGE",
      //   from:stanza.attrs.from.substr(0,44),
      //   to:stanza.attrs.to,
      //   message:'ONLINE',
      //   createdAt:Date.now(),
      //   types:'chat',
      //   unique:Date.now()
      // })
        // alert(stanza.name+stanza.attrs.from.substr(0,44)+' online')
      
      }else{
        // if(stanza.attrs.from.substr(0,44) == jid_main){
        //   console.log('from',stanza.attrs.from)
        //   console.log('CHATROSTERMAIN',chat_roster_main)
        //   alert('Received CC')
        //   // console.log(stanza.children[0].children[0].name) // forwarded
        //         // console.log(stanza.children[0].children[0].children[0].name) // message
        //   console.log("to",stanza.children[0].children[0].children[0].attrs.to)
        //   console.log("Carbon Message Received",stanza.children[0].children[0].children[0].children[2].children)
          
        //   Chatdispatchers({type:"SETMAINMESSAGECARBON",
        //   from:stanza.children[0].children[0].children[0].attrs.from,
        //   to:stanza.children[0].children[0].children[0].attrs.to,
        //   message:JSON.parse(stanza.children[0].children[0].children[0].children[2].children[0]).content,
        //   createdAt:JSON.parse(stanza.children[0].children[0].children[0].children[2].children[0]).unique,
        //   types:JSON.parse(stanza.children[0].children[0].children[0].children[2].children[0]).type,
        //   unique:JSON.parse(stanza.children[0].children[0].children[0].children[2].children[0]).unique
        // })
        // }else{
          Chatdispatchers({type:"SETMAINMESSAGE",
          from:stanza.attrs.from.substr(0,44),
          to:stanza.attrs.to,
          message:JSON.parse(stanza.children[2].children[0]).content,
          createdAt:JSON.parse(stanza.children[2].children[0]).unique,
          types:JSON.parse(stanza.children[2].children[0]).type,
          unique:JSON.parse(stanza.children[2].children[0]).unique
        })
        // console.log('asasa',stanza.children[0].children[0].children[0].attrs.from)
        // alert(stanza.children.length)
        // if(stanza.children.length == 3){


        //   Chatdispatchers({type:"SETMAINMESSAGECARBON",
        //   from:stanza.attrs.from.substr(0,44),
        //   to:stanza.attrs.to,
        //   message:JSON.parse(stanza.children[2].children[0]).content,
        //   createdAt:JSON.parse(stanza.children[2].children[0]).unique,
        //   types:JSON.parse(stanza.children[2].children[0]).type,
        //   unique:JSON.parse(stanza.children[2].children[0]).unique,
        //   jid:jid_main
        // })
                    
         
        // }else{
        //   Chatdispatchers({type:"SETMAINMESSAGECARBON",
        //   from:stanza.children[0].children[0].children[0].attrs.from,
        //   to:stanza.children[0].children[0].children[0].attrs.to,
        //   message:JSON.parse(stanza.children[0].children[0].children[0].children[2].children[0]).content,
        //   createdAt:JSON.parse(stanza.children[0].children[0].children[0].children[2].children[0]).unique,
        //   types:JSON.parse(stanza.children[0].children[0].children[0].children[2].children[0]).type,
        //   unique:JSON.parse(stanza.children[0].children[0].children[0].children[2].children[0]).unique,
        //   jid:jid_main
        // })     
        // }
       
       
      }
      // console.log("chat_roster_mainnn",chat_roster_main)
     

      // Chatdispatcher({type:"SETMAINMESSAGE",from:stanza.attrs.from.substr(0,44),message:JSON.parse(stanza.children[2].children[0]).content})
      //   await PushNotificationIOS.addNotificationRequest({
    //     id:String(Date.now()),
    //     title:'You Have a New Message',
    //     subtitle:'',
    //     body:'',
    //     userInfo:{
    //       messageFrom:stanza.attrs.from.substr(0,44),
    //       apnType:'ChatSpecificScreen',
    //       local:true,
    //       name:this_chat.name,
    //       profilePic:this_chat.profilePic
    //     }
    //  })

      // from,to,message,createdAt,type,chat_roster_mains,Chatdispatchers,unique
     
     
      // setRecMes(stanza.attrs.from,stanza.attrs.to,JSON.parse(stanza.children[2].children[0]).content,JSON.parse(stanza.children[2].children[0]).unique,JSON.parse(stanza.children[2].children[0]).type,chat_roster_main,Chatdispatchers,JSON.parse(stanza.children[2].children[0]).unique)

    });
    // global.xmpp.on("subscribe", async (stanza) => {
    //  alert('subscribed')
    // });
}

function setMess() {
  Chatdispatcher;
  // setMessages()
}

async function getRosterMain(chat_roster_main, addMain, addAnnonymous) {
  // console.log("chat_roster_main", chat_roster_main);
  addMain();
  //   var rosterListAnonymous = await axios.post(
  //     "http://103.27.86.34:3005/api/v2.0/user/chatRoster",
  //     {
  //       mjid: 2,
  //       data: [],
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTUyOTU3NGM5MWFhMzRmOWIwNGI2MSIsImlhdCI6MTYxMzAyMTA1MSwiZXhwIjoxNjIwNzk3MDUxfQ.0DAt-DZsKJKwU_xKhM7HG9z77rZaceMrAca2-zmwkRI",
  //       },
  //     }
  //   );
  //   var rosterListMain = await axios.post(
  //     "http://103.27.86.34:3005/api/v2.0/user/chatRoster",
  //     {
  //       mjid: 1,
  //       data: [],
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTUyOTU3NGM5MWFhMzRmOWIwNGI2MSIsImlhdCI6MTYxMzAyMTA1MSwiZXhwIjoxNjIwNzk3MDUxfQ.0DAt-DZsKJKwU_xKhM7HG9z77rZaceMrAca2-zmwkRI",
  //       },
  //     }
  //   );
  //   rosterListMain.data.forEach((list) => {
  //     addMain('a');
  //   });
  //   rosterListAnonymous.data.forEach((list) => {
  //     addAnnonymous();
  //   });
}



async function connectXMPP(chat_roster_main,Chatdispatcher) {
  // console.log("SETTEDSSS");
  // console.log('SETTED',GLOBAL.JID_MAIN)
  // console.log('SETTED',GLOBAL.CHAT_PASSWORD)
  // if(GLOBAL.JID_MAIN._W != "null" && GLOBAL.CHAT_PASSWORD._W != "null"){
    // alert('in connecting')
    global.xmpp.start().catch(console.error);
    global.xmpp.on("online", (address) => {
      console.log("Now onlines", address.toString());
    //       Snackbar.show({
    //   text: I18n.t('You are Now Online'),
    //   duration: Snackbar.LENGTH_LONG,
    //   // action: {
    //   //   text: 'UNDO',
    //   //   textColor: 'white',
    //   //   onPress: () => { /* Do something. */ },
    //   // },
    // });
      
      // alert("online-xmpp");
    });
    addListeners(chat_roster_main,Chatdispatcher);
  // }else{
  //   Snackbar.show({
  //     text: 'Could not connect to server please try later',
  //     duration: Snackbar.LENGTH_LONG,
  //     // action: {
  //     //   text: 'UNDO',
  //     //   textColor: 'white',
  //     //   onPress: () => { /* Do something. */ },
  //     // },
  //   });
  // }
  // setPresence(GLOBAL.JID_MAIN._W)
}


async function disconnect(){
  // alert('disconnecting...')
 

  global.xmpp.stop().catch(console.error);
}


export const setPresence = async(to) => {
  try{
    global.xmpp.send(xml("presence"));


    var jid_main = await AsyncStorage.getItem('jid_main');

    var q = global.xmpp.send(xml("iq", { id: 'enable1', type: "set",from:jid_main }, xml("enable", {xmlns:'urn:xmpp:carbons:2'})))
    .catch(console.error);
    // alert('enabled carbons')
//     <iq xmlns='jabber:client'
//     from='romeo@montague.example/garden'
//     id='enable1'
//     type='set'>
//   <enable xmlns='urn:xmpp:carbons:2'/>
// </iq>
  }catch(err){

  }
  // setXMPP()
  // connectXMPP([],'Chatdispatcher')
  //Responsible fro sending messages
  // console.log("In XMPP", message, jid);
  // message.forEach(list=>{
  //   var mess = JSON.stringify(list);
  
  // if(GLOBAL.JID_MAIN._W != "null" && GLOBAL.CHAT_PASSWORD._W != "null"){

  // }
  // var stanza = new Stanza('presence', { to: to, type: 'subscribed' });
  // conn.send(stanza); 

};

export const sendMessage = (message, jid) => {
  //Responsible fro sending messages
  // console.log("In XMPP", message, jid);
  message.forEach(list=>{
    // console.log('global.xmpp',global.xmpp)
    if(global.xmpp){
      var mess = JSON.stringify(list);
      var q = global.xmpp.send(xml("message", { to: jid, type: "chat" }, xml("body", {}, mess)))
        .catch(console.error);
    }else{
      alert('Not Online')
    }
   
  })

};

const mapStatetoProps = (state) => {
  // const { }=state
  // console.log("xmppStates", state);
  return {
    chat_roster_main: state.chatss.chat_roster_main,
    chat_roster_anonymous: state.chatss.chat_roster_anonymous,
    messages: state.chatss.messages,
    chatLoading: state.chatss.chatLoading,
    chat_password: state.chatss.chat_password,
    jid_main: state.chatss.jid_main,
    chatRoster:state.chat.chat_roster_main
  };
};



const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    setMessage: (a) => dispatch({ type: "SENDMESSAGE", data: a }),
    addAnnonymous: () => dispatch(addAnnonymous()),
  };
};

async function getRosterFromXMPP(dispatch,token) {
  dispatch({ type: "SETMYMESSAGEMAININIT",chat_roster_main:[], main_loading: false });
  var jwt = await AsyncStorage.getItem('token');
  if(jwt){
    await axios.post(
      GLOBAL.BASE_URL+"user/chatRoster",
      {
        mjid: 1,
        data: [],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
          'Bearer '+jwt
        },
      }
    ).then((rosterListMain)=>{
      var chats = [];
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
          unread:0,
          messages:[],
          offline_count: user.offline_count,
          profilePic: user.profilePic,
          userId: user.userId,
          updatedAt: Date.now(),
          photos:[],
          amIAnonymous:user.amIAnonymous,
          isOtherAnonymous:user.isOtherAnonymous,
          isOnline:false,
          isTyping:false
        }
        var userIID = await AsyncStorage.getItem('jid_main');
                  
        if(true){
          var mymes = {
            content: `Start your conversation. Wave 👋 at `+eachuser.name,
            text: `Start your conversation. Wave 👋 at `+eachuser.name,
            createdAt: Date.now(),
            messageType:'chat',
            _id: Date.now()* Math.random(),
            unique: Date.now()* Math.random(),
            messageId: Date.now()* Math.random(),
            type: "chat",
            user: {
              _id: 2,
              name: eachuser.name,
              avatar: eachuser.profilePic,
            },
          };
          eachuser.messages.push(mymes);
          eachuser.message = `Click to send Message`;
        }
        if(eachuser.clearChat  == -1){
          await axios
          .get(
            `http://103.27.86.24:3005/getmessages/${userIID.substr(0,24)}/${eachuser.userId}`
          )
          .then((resp) => {
           
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
                  var newImage = {
                    url:message.content
                    };
                  eachuser.photos.push(newImage)
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
                  var newImage = {
                    url:message.content
                    };
                  eachuser.photos.push(newImage)
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
        }else{
          await axios
          .post(
            `http://103.27.86.24:3005/getmessagesbytime/${userIID.substr(0,24)}/${eachuser.userId}`,{
              from:String(moment(eachuser.clearChat/1000).local().format('YYYY-MM-DD HH:mm:ss')),
              to:String(moment(Date.now()).local().format('YYYY-MM-DD HH:mm:ss')),
            }
          )
          .then((resp) => {
 
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
                  var newImage = {
                    url:message.content
                    };
                  eachuser.photos.push(newImage)
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
                  var newImage = {
                  url:message.content
                  };
                eachuser.photos.push(newImage)
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
              // if(message.type == "block"){
              //   eachuser.message = "Chat can't be replied anymore";
              // }
              // if(message.type == "exit"){
              //   eachuser.message = "Chat can't be replied anymore";
              // }
              if (message.type == "clear") {
      
                if(list.xml.includes(`from='${eachuser.userId}`)){
                  // var mymes = {
                  //   content: message.content,
                  //   messageType:message.type,
                  //   text: message.content,
                  //   createdAt: list.created_at,
                  //   _id: Date.now()* Math.random(),
                  //   unique: message.unique,
                  //   messageId: message.unique,
                  //   type: "chat",
                  //   user: {
                  //     _id: 1,
                  //     name: eachuser.name,
                  //     avatar: eachuser.profilePic,
                  //   },
                  //   system:true
                  // };
                  // eachuser.messages.splice(0, 0, mymes);
                  // eachuser.message = 'This message is deleted';
                }else{
                  var mymes = {
                    content: message.content,
                    messageType:message.type,
                    text: 'Chat Cleared',
                    createdAt: list.created_at,
                    _id: Date.now()* Math.random(),
                    unique: message.unique,
                    messageId: message.unique,
                    // sent: true,
                    // received: true,
                    system:true,
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
        }      
        chats.push(eachuser)
        // dispatch({
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
        //   messages:eachuser.messages,
        //   message : eachuser.message,
        //   offline_count: eachuser.offline_count,
        //   profilePic: eachuser.profilePic,
        //   userId: eachuser.userId,
        //   updatedAt: Date.now(),
        //   photos:eachuser.photos,
        //   amIAnonymous:eachuser.amIAnonymous,
        //   isOtherAnonymous:eachuser.isOtherAnonymous
        // });
      // }
      });
      dispatch({ type: "SETMYMESSAGEMAININIT",chat_roster_main:chats, main_loading: false });
    })
  
  }



  var stringed = JSON.stringify(chat_roster_main)
  await AsyncStorage.setItem('chat_roster_main',stringed)
}

exports.connectXMPP = connectXMPP;
// exports.addListenerssss = addListenerssss;
exports.getRosterMain = getRosterMain;
exports.setMess = setMess;
// exports.sendMessage = (message,jid)=>{sendMessage};
exports.xmpp = global.xmpp;
exports.setXMPP = setXMPP;
exports.setXMPPs = setXMPPs;
exports.setPresence = setPresence;
exports.getRosterFromXMPP = getRosterFromXMPP;
exports.disconnect = disconnect;
exports.confirmlogout = confirmlogout;
exports.confirmlogoutApp = confirmlogoutApp;

export default connect(mapStatetoProps, mapDispatchToProps)(addListeners);
