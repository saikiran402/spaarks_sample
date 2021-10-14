// import { ListItem, Avatar, Alert } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { act } from "react-test-renderer";
import I18n from '../src/i18n';
import moment from "moment";
import { connect, useDispatch, useReducer } from "react-redux";
const RightContent = (props) => <Text style={{ color: "#000" }}>15:20</Text>;
import { client, xml } from "@xmpp/client";
import debug from "@xmpp/debug";
import {setRecMes} from './AllFeaturesScreen'
import RBSheet from "react-native-raw-bottom-sheet";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import React, { useEffect, setState, useRef } from "react";
import { connectXMPP, addListeners, getRosterMain, setMess,setXMPP } from './xmpp'
import _ from "lodash";
import { useScrollToTop } from '@react-navigation/native';

import ChatUsersScreen from './ChatUsersScreen'
import CallLogsScreen from './callLogsScreen'


import { FAB } from 'react-native-paper';
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




const Tab = createMaterialTopTabNavigator();
// var chats = [];

// async function setChats(chat_mainss){
//   chats = chat_mainss
// }


// async function setReceivedMessage(message,from){
//   alert('Received')
//   try{
//     chats[0].message = message
//   }catch(err){
//     console.log(err)
//   }

// }
function DetailsScreen({
  navigation,
  chat_roster_main,
  isConnected,
  chat_roster_anonymous,
  messages,
  chatLoading,
  token
}) {
  navigation.setOptions({ tabBarVisible: false });
  const dispatch = useDispatch(chatReducers);
  async function confirmlogout(){
    setSpinner(true)
    setSpinnerText('Connecting')
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
    setSpinner(false)
    navigation.navigate('All')
    // signOut()
  }

 
  useEffect(() => {
    dispatch({ type: "SETLOADING", chatLoading: false });
    // console.log("In in Effect")
    // getRoster()
    // setXMPP()
    // getRoster()
    // connectXMPP()
    getData()
  },['1']);

  async function getRoster() {
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
        latest_time : Date.now(),
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
        latest_time:eachuser.messages[0].createdAt,
        offline_count: eachuser.offline_count,
        profilePic: eachuser.profilePic,
        userId: eachuser.userId,
        updatedAt: Date.now(),
      });
    });
    dispatch({ type: "SETMAINLOADING", main_loading: false });
    var stringed = JSON.stringify(chat_roster_main)
    await AsyncStorage.setItem('chat_roster_main',stringed)
  }


  const [isLoading, setLoading] = React.useState(true);
  const [callLogs, setCallLogs] = React.useState([]);


  const [canpos, setCanPost] = React.useState(false);
  const [grouped,setGrouped] = React.useState({})
  const Login = useRef();
  function onLogin(phone) {
    Login.current.close();
    navigation.navigate('VerifyOtpScreen', { phone: phone })
  }

  const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

async function getData() {
var canp = await canPost()
setCanPost(canp)
    // await axios.get(
    //   `https://staging-api.ososweb.com/api/v2.0/user/mylogs`,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization:
    //       token
    //     },
    //   }
    // ).then((resp) => {
    //   console.log('Call Logs', resp.data)
    //   console.log('UNIQUECALLSsss', groupBy(resp.data, 'aid'))

    //   setGrouped(groupBy(resp.data, 'aid'))
    //   setCallLogs(resp.data)
    // })

}


async function confirmCall(call){
  await axios.post(GLOBAL.BASE_URL+`user/addtologs/logs/${call.aid}/${call.uid._id}`,{
    "name":call.name,
    "profilePic":call.profilePic
  },
  {
    headers: {
      "Content-Type": "application/json",
      Authorization:
      token
    },
  }).then((resp)=>{
    console.log(resp.data);
    // getData()
    navigation.navigate('OutGoingCallScreen',{aid:call.aid,name:call.name,profilePic:call.profilePic})
  })

}



async function MakeCall(call){

  if(call){
    Alert.alert(
      I18n.t("Confirmation"),
      I18n.t("Are you sure you want to call ")+call.name,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Call", onPress: () => confirmCall(call) }
      ]
    );
    
  }
  
}
const onRefresh = React.useCallback(async () => {
  // setRefreshing(true);

  // console.log("In in Effect")
  // getRoster()
  // setXMPP()
  // getRoster()
  // connectXMPP()

  getData()
}, []);

const [refreshing, setRefreshing] = React.useState(false);
function Calls() {
  const refe = React.useRef(null);
  useScrollToTop(refe);
  if(isConnected){
    return (
      <>
      
                      {
                        token!=null?
                        <>
                        
                      <View style={{position:'absolute',right:30,bottom:30,zIndex:1,backgroundColor:'#6FA4E9',padding:10,borderRadius:30}}>
                            <TouchableOpacity onPress={()=>navigation.navigate('ConnectionsScreen')}>
                  <Image source={require('../assets/contacts.png')} style={{width:40,height:40}}/>
                  </TouchableOpacity>
                  </View>
  
                          </>
                          :
                          <></>
                      }
                      
                  <ScrollView 
                    refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    ref={refe}
                  >
  
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
                                                  <View style={{ color: "#000", flex: 13, height: 60,justifyContent:"center", alignItems:'center', top: 30 }}>
                                                    {/* <Text
                                                    style={{
                                                      color: "#A1A4B2",
                                                      fontSize: 14,
                                                      flex: 70,
                                                      paddingLeft: 10,
                                                    }}
                                                  >
                                                    We will send you an{" "}
                                                    <Text style={{ color: "#7E818F", fontWeight: "bold" }}>
                                                      One Time Password
                                                    </Text>{" "}
                                                    on this mobile number.
                                                  </Text> */}
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
  
  
                                        </RBSheet>
                      <View style={{ backgroundColor: "#f2f2f2", height: Dimensions.get('window').height }}>
                      {
                          token != null?
                          callLogs.length == 0?
                          <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center",  }}>
                        <Image
                          source={require("../assets/icons/calls_screen.png")}
                          style={{ height: 80, width: 80, position:'absolute',top:(Dimensions.get('window').height/2)-190 }}
                        ></Image>
                        <Text style={{ color: "#ACB2BE", fontSize: 20, textAlign: "center",position:'absolute',top:(Dimensions.get('window').height/2)-100 }}>
                          {I18n.t("You_haven't_made_any_calls_yet")}
                        </Text>
                        </View>
                        :
                        <View>
  
                          <FlatList ref={refe}
                    // data={[...new Map(callLogs.map(item =>
                    //   [item['aid'], item])).values()]}
                    data={callLogs}
                    renderItem={({ item }) => (
                      <>
                      {
                        item.name != "" ?
                        <TouchableOpacity
                        onPress={() =>{MakeCall(item)}
                        }
                      >
                      <View
                                  style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    borderRadius: 10,
                                    margin: 5,
                                  }}
                                >
                                  <View style={{ flex: 10, padding: 5 }}>
  
                                    <Image
                                      source={{ uri: item.uid.profilePic }}
                                      style={{ height: 80, width: 80, borderRadius: 30 }}
                                      cache="force-cache"
                                    ></Image>
                                  </View>
  
                                  <View style={{ flex: 30 }}>
                                   
                                      <View style={{ flexDirection: "column",padding:8,paddingTop:0 }}>
                                        <Text
                                          style={{
                                            color: "#000",
                                            fontSize: 18,
                                            fontWeight: "500",
                                            margin: 4,
                                            marginLeft: 10,
                                            marginTop: 20,
                                          }}
                                        >
                                          {item.uid.name}
                                        </Text>
                                        <Text
                                          style={{ color: "#848484", margin: 0, marginLeft: 10 }}
                                        >
                                          
                                            <>
                                              <Text>{item.status}</Text>
                                              {/* <Text style={{marginTop:10}}>{" "}x ({grouped[item.aid].length})</Text> */}
                                            </>
                                    
                                        </Text>
                                      </View>
                            
                                  </View>
  
                                  <View style={{ flex: 8,flexDirection:'column' }}>
                                    <View>
                                    <Text
                                      style={{
                                        marginTop: 20,
                                        marginRight: 5,
                                        fontSize: 12,
                                        color: "#848484",
                                      }}
                                    >
                                
                                        {moment(item.createdAt).format("LT")}
  
                                    </Text>
                                    </View>
                                    <View>
                                      {
                                        item.status == 'Incoming'?
                                        <View style={{flexDirection:'row'}}>
                                        <Image source={require('../assets/incoming.png')} style={{height:30,width:30}}></Image>
                                        {/* <Text style={{marginTop:10}}>({grouped[item.aid].length})</Text> */}
                                        </View>
                                        
                                        :<View style={{flexDirection:'row'}}><Image source={require('../assets/outgoing.png')} style={{height:30,width:30}}></Image>
                                        {/* <Text style={{marginTop:10}}>({grouped[item.aid].length})</Text> */}
                                        </View>
                                      }
                                      </View>
                              
                                    
                                  </View>
                                </View>
                                </TouchableOpacity>
                      :<></>}
                      </>
  
                    )}/>
                    
                        
                      
                          </View>
                        
  
                          :
  
                      <View style={{ backgroundColor: "#fff", height: Dimensions.get('window').height }}>
                                            <View>
                                              <View>
  
                                                <View style={{ flexDirection: "row", marginTop: 0 }}>
                                                  <View style={{ color: "#000", flex: 13, height: 60 ,justifyContent:"center", alignItems:'center', top: 30}}>
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
                    
  
                      </ScrollView>
                  
      </>
   
   );
  }else{
    return(
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{flex:1,height:Dimensions.get('window').height/2,justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../assets/offline1.png')} style={{height:300,width:300}}/>
      </View>
      </ScrollView>
    )
  }
 
}

function requestss(){
  if(isConnected){
    return(
      <GreetRequestsScreen navigation={navigation}/>
    )
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

}


  console.log("Messages", messages);

  return (
    <Tab.Navigator screenOptions={{
        
      headerStyle: {
        backgroundColor: '#fff',
        },
        headerTintColor: '#6FA4E9',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}
    tabBarOptions={{
      labelStyle: { fontSize: 9 },
      allowFontScaling:true,
      activeTintColor:'#6FA4E9',
      inactiveTintColor:'#9A9A9A',
      indicatorStyle:{backgroundColor:'#6FA4E9',height:3}
    }}
    >
      <Tab.Screen
      
        name={I18n.t("chats")}
        style={{color:'#f2f2f2'}}
        children={() => (
          // <Chats
          //   navigation={navigation}
          //   chat_roster_main={chat_roster_main}
          //   chat_roster_anonymous={chat_roster_anonymous}
          //   messages={messages}
          //   chatLoading={chatLoading}
          //   token={token}
          // />
          <ChatUsersScreen
          // chats={chats}
          navigation={navigation}
          />
        )}
      />
      <Tab.Screen name= {I18n.t("Call")} component={CallLogsScreen} />
      <Tab.Screen name={I18n.t("Friend Requests")} component={requestss} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

const mapStatetoProps = (state) => {
  // const { }=state
  
  return {
    chat_roster_main: state.chatss.chat_roster_main,
    chat_roster_anonymous: state.chatss.chat_roster_anonymous,
    messages: state.chatss.messages,
    chatLoading: state.chatss.chatLoading,
    token: state.chatss.token,
    isConnected:state.chatss.isConnected
  };
};


// exports.setChats = setChats;
// exports.setReceivedMessage = setReceivedMessage;
export default connect(mapStatetoProps)(DetailsScreen);
