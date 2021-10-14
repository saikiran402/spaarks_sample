import React, { useEffect, setState, useRef } from "react";
import _ from "lodash";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  StatusBar,
  ScrollView,
  ActivityIndicator
} from "react-native";
const GLOBAL = require('../Globals');
import {
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
  TextInput,
} from "react-native-paper";
import { Chip } from "react-native-paper";
import chatReducers from "../reducers/chatReducers";
import { connect, useDispatch, useReducer } from "react-redux";
import { connectXMPP, addListenerssss, getRosterMain, setMess, xmpp } from './xmpp'
  const MyChatsScreen = ({
    navigation,
    chat_roster_main,
    chat_roster_anonymous,
    messages,
    chatLoading
  }) => {
    // const [state, dispatch] = React.useReducer(
    //   chatReducers
    // );
    var a = 0;

    const dispatch = useDispatch(chatReducers);
    // console.log("Test1",state)
    var messss = [];
    // xmpp.on("chat", async function (from, message) {
    //   console.log("In Chat Out");
    //   console.log(from, message);
    // });
    // xmpp.on("message", async function (from, message) {
    //   console.log("In Chat Out");
    //   console.log(from, message);
    // });
    xmpp.on("stanza", async (stanza) => {
      console.log('-------------------------explore');
      console.log(stanza);
      console.log('-------------------------');
      console.log("In stanzas old", stanza);
      console.log("In stanzas from", stanza.attrs.from); // from
      console.log("In stanzas to", stanza.attrs.to); // to
      console.log("In stanzas Message", stanza.children[2].children[0]);
      console.log("chat_roster_mainnn", chat_roster_main)
      setRecMes(stanza.attrs.from, stanza.attrs.to, JSON.parse(stanza.children[2].children[0]).content, JSON.parse(stanza.children[2].children[0]).unique, JSON.parse(stanza.children[2].children[0]).type)
      // alert(JSON.parse(stanza.children[2].children[0]).content)
      // return(<ReceivedXMPP from={stanza.attrs.from} to={stanza.attrs.to} content={JSON.parse(stanza.children[2].children[0]).content} createdAt={JSON.parse(stanza.children[2].children[0]).unique} />)
      // if (chat_roster_main.length > 0) {
      //   chat_roster_main.forEach((list) => {
      //     if (list.jid == stanza.attrs.from.substr(0, 44)) {
      //       list.messages.splice(0, 0, {
      //         content: stanza.children[2].children[0].content,
      //         text: stanza.children[2].children[0].content,
      //         createdAt: stanza.children[2].children[0].createdAt,
      //         _id: Date.now() * Math.random(),
      //         unique: Date.now(),
      //         type: "chat",
      //         user: {
      //           _id: 1,
      //         },
      //       });
      //       list.updatedAt = Date.now();
      //     }
      //   });
      //   Chatdispatcher({
      //     type: "SETMYMESSAGEMAIN",
      //     chat_roster_main: chat_roster_main,
      //   });
      // }
    });

    function addListeners() {
      // xmpp.on("message", async function (from, message) {
      //   console.log("In Chat Out");
      //   console.log(from, message);
      // });
      //     xmpp.on("stanza", async (stanza) => {
      //       console.log("In stanzas old", stanza);
      //       console.log(
      //         "In stanzas from",
      //         stanza.attrs.from
      //       ); // from
      //       console.log(
      //         "In stanzas to",
      //         stanza.attrs.to
      //       ); // to
      //       console.log(
      //         "In stanzas Message",
      //         stanza.children[2].children[0]
      //       );

      // if(chat_roster_main.length>0){
      //       chat_roster_main.forEach(list=>{
      //         if(list.jid == stanza.attrs.from.substr(0,44)){
      //           list.messages.splice(0, 0,{
      //             content:stanza.children[2].children[0].content,
      //             text:stanza.children[2].children[0].content,
      //             createdAt:stanza.children[2].children[0].createdAt,
      //             _id:Date.now() * Math.random(),
      //             unique:Date.now(),
      //             type:'chat',
      //             user:{
      //               "_id": 1,
      //             }
      //           })
      //           list.updatedAt = Date.now();
      //         }
      //       })
      //       dispatch({type:'SETMYMESSAGEMAIN',chat_roster_main:chat_roster_main})
      //     }
      //       // if (
      //       //   stanza.children[0].children[0].children[0].attrs.from != "undefined" ||
      //       //   stanza.children[0].children[0].children[0].attrs.from != undefined
      //       // ) {
      //       //   // var me = {
      //       //   //   from:stanza.children[0].children[0].children[0].attrs.from,
      //       //   //   to:stanza.children[0].children[0].children[0].attrs.to,
      //       //   //   type:stanza.children[0].children[0].children[0].attrs.type,
      //       //   //   message:JSON.parse(stanza.children[0].children[0].children[0].children[2].children[0])
      //       //   // }
      //       //   // if(stanza.attrs.from == '601529574c91aa34f9b04b61@chat.spaarksweb.com' && stanza.attrs.to.substr(0,44) == '601529574c91aa34f9b04b61@chat.spaarksweb.com'){
      //       //   //     console.log("Carbon Copy")
      //       //   // }else{
      //       //   var newm = {
      //       //     from: stanza.attrs.from,
      //       //     to: stanza.attrs.to,
      //       //     content: JSON.parse(
      //       //       stanza.children[2].children[0]
      //       //     ).content,
      //       //     text: JSON.parse(
      //       //       stanza.children[2].children[0]
      //       //     ).content,
      //       //     createdAt: JSON.parse(
      //       //       stanza.children[2].children[0]
      //       //     ).unique,
      //       //     _id: Date.now()* Math.random(),
      //       //     unique: JSON.parse(
      //       //       stanza.children[2].children[0]
      //       //     ).unique,
      //       //     type: JSON.parse(
      //       //       stanza.children[2].children[0]
      //       //     ).type,
      //       //     user: {
      //       //       _id: 1,
      //       //     },
      //       //   };
      //       //   messss.push(newm);
      //       //   console.log("messss", messss);
      //       //   dispatch({ type: "SETMAMMESSAGES", messages: messss });
      //       //   // }
      //       // }

      //       //    if(stanza.children[0].children[0].children[0].attrs.from != 'undefined' || stanza.children[0].children[0].children[0].attrs.from != undefined){
      //       //      console.log("Inside not undefined",stanza.children[0].children[0].children[0].attrs.from)
      //       //    if(stanza.children[0].children[0].children[0].attrs.type =='chat'){
      //       //     console.log("Inside chat",stanza.children[0].children[0].children[0].attrs.type)
      //       //     if(stanza.children[0].children[0].children[0].attrs.from.substr(0,44) == '60152a454c91aa34f9b04b65@chat.spaarksweb.com'){
      //       //       console.log("chat_roster_main",chat_roster_main)
      //       //       console.log("Inside my messages mam",stanza.children[0].children[0].children[0].attrs.from.substr(0,44))
      //       //       var messages = JSON.parse(stanza.children[0].children[0].children[0].children[2].children[0])
      //       //       var this_chat = chat_roster_main.find(item => item.jid == stanza.children[0].children[0].children[0].attrs.to.substr(0,44));
      //       //       chat_roster_main = chat_roster_main.filter((item) => item.jid !== stanza.children[0].children[0].children[0].attrs.to.substr(0,24));
      //       //       this_chat.messages.splice(0, 0,{
      //       //         content:messages.content,
      //       //         text:messages.content,
      //       //         createdAt:messages.unique,
      //       //         _id:Date.now(),
      //       //         unique:messages.unique,
      //       //         type:'chat',
      //       //         user:{
      //       //           "_id": 2,
      //       //         }
      //       //       })
      //       //       this_chat.updatedAt = messages.unique;
      //       //       // console.log("Deleted",chat_roster_main)
      //       //       chat_roster_main.splice(0, 0,this_chat)
      //       //       dispatch({type:'SETMYMESSAGEMAIN',chat_roster_main:chat_roster_main})
      //       //     }else{
      //       //       console.log("chat_roster_main_else",chat_roster_main)
      //       //       console.log("Inside other messages mam",stanza.children[0].children[0].children[0].attrs.from.substr(0,44))
      //       //       var messages = JSON.parse(stanza.children[0].children[0].children[0].children[2].children[0])
      //       //       // var this_chat = chat_roster_main.find(item => String(item.jid) == String(stanza.children[0].children[0].children[0].attrs.from.substr(0,44)));
      //       //       // chat_roster_main = chat_roster_main.filter((item) => item.jid !== stanza.children[0].children[0].children[0].attrs.from.substr(0,24));
      //       //       // console.log("this_chat",this_chat)
      //       //       chat_roster_main[0].messages.splice(0, 0,{
      //       //         content:messages.content,
      //       //         text:messages.content,
      //       //         createdAt:messages.unique,
      //       //         _id:Date.now(),
      //       //         unique:messages.unique,
      //       //         type:'chat',
      //       //         user:{
      //       //           "_id": 1,
      //       //         }
      //       //       })
      //       //       chat_roster_main[0].updatedAt = messages.unique;
      //       //       // console.log("Deleted",chat_roster_main)
      //       //       // chat_roster_main.splice(0, 0,this_chat)
      //       //       dispatch({type:'SETMYMESSAGEMAIN',chat_roster_main:chat_roster_main})
      //       //     }

      //       //   }
      //       //   // if(stanza.children[0].children[0].children[0].attrs.from != 'undefined' || stanza.children[0].children[0].children[0].attrs.from != undefined){
      //       //   //   var msg = JSON.parse(stanza.children[0].children[0].children[0].children[2].children[0])

      //       //   //   dispatch({type:"SETMAINMESSAGE",from:stanza.children[0].children[0].children[0].attrs.from,message_type:msg.type,content:msg.content})
      //       //   // }

      //       //   // console.log("Datas",stanza.children[2].children[0])
      //       //   // var rec = JSON.parse(stanza.children[2].children[0]);
      //       //                         // var receivedMessage =  {
      //       //                         //           _id: Math.random(),
      //       //                         //           text: rec.content,
      //       //                         //           // text: "Received",
      //       //                         //           createdAt: new Date(),
      //       //                         //           user: {
      //       //                         //             _id: 2,
      //       //                         //             name: 'React Native',
      //       //                         //             avatar: 'https://placeimg.com/140/140/any',
      //       //                         //           },
      //       //                         // }
      //       // // console.log("Messages",receivedMessage);
      //       //   }
      //     });

      // xmpp.on("chat", async function (from, message) {
      //   console.log("In Chat Out");
      //   console.log(from, message);
      // });
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



    // async function getRoster() {
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

    //   console.log("POST", rosterListMain.data);
    //   rosterListMain.data.forEach((list) => {
    //     dispatch({
    //       type: "ADDTOROSTERMAIN",
    //       _id: list._id,
    //       aid: list.aid,
    //       blocked: list.blocked,
    //       blockedMe: list.blockedMe,
    //       canResume: list.canResume,
    //       chatExit: list.chatExit,
    //       chatExitMe: list.chatExitMe,
    //       clearChat: list.clearChat,
    //       contactMe: list.contactMe,
    //       jid: list.jid,
    //       name: list.name,
    //       offline_count: list.offline_count,
    //       profilePic: list.profilePic,
    //       userId: list.userId,
    //       updatedAt: Date.now(),
    //     });
    //   });
    //   rosterListAnonymous.data.forEach((list) => {
    //     dispatch({
    //       type: "ADDTOROSTERANONYMOUS",
    //       _id: list._id,
    //       aid: list.aid,
    //       blocked: list.blocked,
    //       blockedMe: list.blockedMe,
    //       canResume: list.canResume,
    //       chatExit: list.chatExit,
    //       chatExitMe: list.chatExitMe,
    //       clearChat: list.clearChat,
    //       contactMe: list.contactMe,
    //       jid: list.jid,
    //       name: list.name,
    //       offline_count: list.offline_count,
    //       profilePic: list.profilePic,
    //       userId: list.userId,
    //     });
    //   });
    //   dispatch({ type: "SETLOADING", chatLoading: false });
    //   //  xmpp.start().catch(console.error);
    //   //   xmpp.on("online", (address) => {
    //   //     console.log("online", address.toString());
    //   //   });
    //   //  addListeners()
    //   //  dispatch({ type: "SETANONYMOUSROSTER", chat_anonymous: rosterListAnonymous.data });
    // }
    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoading, setLoading] = React.useState(true);
    const [requestsReceived, setRequestsReceived] = React.useState(true);
    const [requestsSent, setRequestsSent] = React.useState(true);


    async function getRosterRefresh() {
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
            GLOBAL.TOKEN._W
          },
        }
      );
      console.log("rosterListMain", rosterListMain)
      if (chat_roster_main.length > 0) {
        rosterListMain.data.forEach(list => {
          chat_roster_main.forEach(old => {
            if (old.jid == list.jid) {
              old.blocked = list.blocked;
              old.blockedMe = list.blockedMe;
              old.canResume = list.canResume;
              old.chatExit = list.chatExit;
              old.chatExitMe = list.chatExitMe;
              old.clearChat = list.clearChat;
              old.contactMe = list.contactMe;
              old.offline_count = list.offline_count;
              old.profilePic = list.profilePic;
            }
          })
        })
      }

      dispatch({ type: 'SETMYMESSAGEMAIN', chat_roster_main: chat_roster_main })


    }
    const wait = (timeout) => {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    };

    const onRefresh = React.useCallback(async () => {
      // setRefreshing(true);
      getRosterRefresh()
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
    return (
      <View style={{ backgroundColor: "#f2f2f2" }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{ flexDirection: "row" }}>
            {/* <TouchableOpacity onPress={() => startxmpp(chat_roster_main)}> */}
            <TouchableOpacity onPress={() => connectXMPP()}>
              <Chip
                mode={"outlined"}
                style={{ margin: 3, marginBottom: 5, backgroundColor: "#6FA4E9" }}
              >
                <Text style={{ color: "#fff" }}>
                  Chat as Saikiran {chat_roster_main.length}
                </Text>
              </Chip>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => getoldMessages()}> */}
            {/* <TouchableOpacity onPress={() => getRosterMain()}> */}

            <Chip mode={"outlined"} style={{ margin: 3, marginBottom: 5 }}>
              <Text style={{ color: "#000" }}>
                Chat as Anonymous {chat_roster_anonymous.length}{" "}
                {messages.length}
              </Text>
            </Chip>
            {/* </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={() => setMessages()}> */}
            {/* <Chip mode={"outlined"} style={{ margin: 3, marginBottom: 5 }}>
              <Text style={{ color: "#000" }}>
                Set Messages {chat_roster_anonymous.length} {messages.length}
              </Text>
            </Chip> */}
            {/* </TouchableOpacity> */}
          </View>

          <Text style={{ color: "#9A9A9A", fontSize: 13, padding: 5 }}>
            You chatted with these users using your name visible to them
          </Text>
          <View>
            <View>
              {chat_roster_main.map((l, i) => (
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    margin: 10,
                  }}
                >
                  <View style={{ flex: 10, padding: 5 }}>

                    <Image
                      source={{ uri: l.profilePic }}
                      style={{ height: 80, width: 80, borderRadius: 30 }}
                    ></Image>

                    <View
                      style={{
                        position: "absolute",
                        top: 70,
                        backgroundColor: colors[Math.random() < 0.5 ? 1 : 2],
                        left: 15,
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ color: "#fff", padding: 5, fontSize: 10 }}>
                        Market +
                      </Text>
                    </View>
                  </View>

                  <View style={{ flex: 30 }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ChatSpecificScreen", {
                          name: l.name,
                          profilePic: l.profilePic,
                          jid: l.jid,
                          xmpp: xmpp,
                          messages: l.messages,
                          media: []
                        })
                      }
                    >
                      <View style={{ flexDirection: "column" }}>
                        <Text
                          style={{
                            color: "#000",
                            fontSize: 18,
                            fontWeight: "bold",
                            margin: 4,
                            marginLeft: 10,
                            marginTop: 20,
                          }}
                        >
                          {l.name}
                        </Text>
                        <Text
                          style={{ color: "#6FA4E9", margin: 0, marginLeft: 10 }}
                        >
                          {l.message.length > 0 ? (

                            l.message > 55 ?
                              l.messages[0].user._id == 2 ? <Text style={{ color: '#848484' }} numberOfLines={2}>Me: {l.message.substr(0, 55)}...</Text> :
                                <Text style={{ color: '#848484' }} numberOfLines={2}>{l.message.substr(0, 55)}</Text>
                              :
                              l.messages[0].user._id == 2 ? <Text style={{ color: '#848484' }} numberOfLines={2}>Me: {l.message}</Text> :
                                <Text style={{ color: '#848484' }} numberOfLines={2}>{l.message.substr(0, 30)}</Text>

                          ) : (
                            <>
                              <Text>Click to send message</Text>
                            </>
                          )}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flex: 8 }}>
                    <Text
                      style={{
                        marginTop: 20,
                        marginRight: 5,
                        fontSize: 12,
                        color: "#848484",
                      }}
                    >
                      {l.messages.length > 0 ?
                        moment(l.messages[0].createdAt).format("LT")
                        : <></>}
                    </Text>
                    {/* <Chip
                      mode={"outlined"}
                      style={{
                        marginTop: 3,
                        marginBottom: 5,
                        backgroundColor: "#6FA4E9",
                        height: 30,
                        width: 30,
                      }}
                    >
                      
                    </Chip> */}
                    {l.messages.length > 99 ? (
                      <View
                        style={{
                          backgroundColor: "#6FA4E9",
                          width: 35,
                          padding: 5,
                          paddingLeft: 9,
                          borderRadius: 15,
                          marginLeft: 15,
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            flexWrap: "wrap",
                            textAlign: "center",
                            fontSize: 10,
                          }}
                        >
                          99+
                        </Text>
                      </View>
                    ) : l.messages.length == 0 ? (
                      <></>
                    ) : (
                      <View
                        style={{
                          backgroundColor: "#6FA4E9",
                          width: 25,
                          padding: 5,
                          borderRadius: 15,
                          marginLeft: 25,
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            flexWrap: "wrap",
                            textAlign: "center",
                            fontSize: 10,
                          }}
                        >
                          {l.messages.length}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>


              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };


  const mapStatetoProps = (state) => {
    // const { }=state
    
    return {
      chat_roster_main: state.chatss.chat_roster_main,
      chat_roster_anonymous: state.chatss.chat_roster_anonymous,
      messages: state.chatss.messages,
      chatLoading: state.chatss.chatLoading
    };
  };
  export default connect(mapStatetoProps)(MyChatsScreen);