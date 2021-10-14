import React, {useState, useRef} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import I18n from '../src/i18n';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import StarRating from './StarRating';
import RBSheet from "react-native-raw-bottom-sheet";
import Slider from '@react-native-community/slider';
import { connect, useDispatch, useReducer } from "react-redux";
import chatReducers from "../reducers/chatReducers";
import moment from "moment";
import _ from "lodash";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { connectXMPP, addListeners, getRosterMain, setMess,setXMPP,setPresence } from './xmpp'
import {
    Avatar,
    Button,
  } from "react-native-paper";

global.setIsOnline = null
global.currentCardJid = null
  async function setOnlineStatus(from){
    if(global.setIsOnline != null){
      console.log('YHYHYHYHYHYYHHHH',from)
      if(global.currentCardJid != null){
        console.log('fromfromfromfromQQQ',from+'is now online')
        if(global.currentCardJid == from){
          console.log('fromfromfromfromQQQ',from+'is now online')
          setIsOnline(true)
        }
       }
      // alert('Settting')

    }
  }


const ChatCard = ({item,navigation,route,isConnected,unreadCounts}) => {


    const [isOnline,setIsOnline] = useState(false)

    global.setIsOnline = setIsOnline;
    global.currentCardJid = item.jid;
    const [unreadCount,setUnreadCount] = useState(item.unread)
    const [currentSeenCount,setCurrentSeenCount] = useState(unreadCount)
    const [lastSeenMessage,setLastSeenMessage] = useState(item.message)
    const [userName,setUserName] = useState(item.name)
  

    async function showNotification(){
      var myJid = await AsyncStorage.getItem('jid_main')
    
      if( item.messages[0].type == 'Block'){

      }else{
        // alert(item.messages[0].messageType)
        // console.log('CONTENT',item.messages[0])
        if( item.messages[0].messageType == 'chat' || item.messages[0].messageType == 'image' || item.messages[0].messageType == 'video'){
        if(item.messages[0].user._id == 1){
          await PushNotificationIOS.addNotificationRequest({
              id:String(Date.now()),
              title:'New Message from '+item.name,
              subtitle:'',
              body:'',
              userInfo:{
                messageFrom:item.jid,
                apnType:'ChatSpecificScreen',
                local:true,
                name:item.name,
                profilePic:item.profilePic,
              }
           })
          }
      }
    }
      
    }


    
    async function setName(name){
      // setLastSeenMessage(mess)
      item.name = name;
      setUserName(name)
    }
    async function setLastMessage(mess){
      setLastSeenMessage(mess)
      item.message = mess;
    }
    async function setLastMessageTime(time){
      // setLastSeenMessage(mess)
      item.message[0].createdAt = time;
    }
    
    async function unreadNewCount(count){
      setUnreadCount(count)
      item.unread = count;
    }

    if(item.message != lastSeenMessage ){
        setUnreadCount(item.unread)
        setLastSeenMessage(item.message)
        if(item.blocked || item.blockedMe || item.canResume || item.chatExit || item.chatExitMe){
    
        }else{
          showNotification()
        }

    }

    async function setUnreadStatus(){
        setCurrentSeenCount(item.unread)
    }

  const Chatdispatcher = useDispatch(chatReducers);
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

  const isYesterday = (currentDates) =>{
    const today = new Date()
    const lastMessageData = new Date(currentDates)

    console.log('DAAAAAA',lastMessageData.getDate() == today.getDate()-1 &&
    lastMessageData.getMonth() == today.getMonth() &&
    lastMessageData.getFullYear() == today.getFullYear())
    
    if(lastMessageData.getDate() == today.getDate()-1 &&
    lastMessageData.getMonth() == today.getMonth() &&
    lastMessageData.getFullYear() == today.getFullYear()){
      return true;
    }else{
      return false;
    }

  }

  async function setUnread(){
    setUnreadCount(0)
  }
  async function clickedChatName(item) {


          setUnreadCount(0)

console.log('unreadCount',unreadCount)
console.log('currentSeenCount',currentSeenCount)
Chatdispatcher({type:'SETUNREADCOUNT',unreadCount:unreadCounts})
var newc = item.unread;
   item.unread = 0;
    navigation.navigate("ChatSpecificScreen", {
      name: item.name,
      isOtherAnonymous: item.isOtherAnonymous,
      item:item,
      profilePic: item.profilePic,
      jid: item.jid,
      xmpp: xmpp,
      connection:_.uniq(item.connection),
      messages: item.messages,
      media: [],
      unreadSubtract:newc,
      setLastMessage:setLastMessage,
      setLastMessageTime:setLastMessageTime,
      setName:setName,
      unreadNewCount:unreadNewCount,
      setUnread:setUnread,
      setUnreadStatus:setUnreadStatus
    })
  
 
  }

  return (
    <View>
             <>
                  {
                    item.messages.length>0?
           
                  <View>

   
                  <View
                      style={{
                        flexDirection: "column",
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        margin: 5,
                      }}
                    >
{
  item.amIAnonymous?
                   <View style={{width:'100%',height:15,backgroundColor:'#6FA4E9',borderTopLeftRadius:10,borderTopRightRadius:10}}>
                   <Text style={{color:'#fff',textAlign:'center',marginBottom:2}}>{I18n.t("You are Anonymous to this user")}</Text>
                  </View>
                  :<></>
}
{/* {
  item.isOnline?
  <View style={{position:'absolute',left:65,top:-75,zIndex:1}}>
    <Image source={require('../assets/online.png')}
    
    style={{height:20,width:20,borderRadius:30,marginTop:-10}}/>                  
                        
</View>
:
<></>
} */}

<View style={{flexDirection:'row'}}>
                      <View style={{ flex: 10, padding: 5 }}>
                      <TouchableOpacity onPress={()=>{ navigation.navigate('ViewFullScreenImagesScreen', { photos: [{url:item.profilePic}], content: "currentCard.content", name: "currentCard.uservisibility.name", profilePic: "currentCard.uservisibility.profilePic", time: "currentCard.createdAt", post: "currentCard", showHeader: false })}}>

                        <Image
                          source={{ uri: item.profilePic }}
                          style={{ height: 80, width: 80, borderRadius: 30 }}
                        ></Image>
</TouchableOpacity>

                  
                        <View
                          style={{
                            position: "absolute",
                            top: 65,
                            borderWidth:1,
                            justifyContent:'center',
                            backgroundColor:'#fff',
                            borderColor: "#6FA4E9",
                            left: 20,
                            borderRadius: 20,
                          }}
                        >
                          <Text style={{ color: "#6FA4E9", padding: 5, fontSize: 10 }}>
                            {/* Market + */}
                            
                            {I18n.t(item.connection[0])}
                            {
                              item.connection.length>1?
                              <Text> +</Text>
                              :
                              <></>
                            }
                          </Text>
                         
                        </View>
                   
        
                      </View>
      
                      <View style={{ flex: 30 }}>
                        <TouchableOpacity
                          onPress={() =>
                            clickedChatName(item)
                          }
                        >
                          <View style={{ flexDirection: "column" }}>
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
                              {userName}
                              {/* {String(item.blocked)}{String(item.blocked)}{String(item.blockedMe)}{String(item.canResume)}{String(item.chatExit)}{String(item.chatExitMe)} */}
                              {/* <Text style={{fontSize:50,color:'#6FA4E9',position:'absolute'}}>.</Text> */}
                            </Text>
                            <Text
                            numberOfLines={2}

                              style={{ color: "#6FA4E9", margin: 0, marginLeft: 10 }}
                            >
                              {lastSeenMessage.length > 0 ? (
      
                                lastSeenMessage > 55 ?
                                      item.messages[0].user._id == 2 ?
                                      lastSeenMessage == "Chat can't be replied anymore" || lastSeenMessage == "Click to send Message"?
                                      <Text style={{ color: '#848484' }} numberOfLines={2}>{I18n.t("Click to send Message")}...</Text> :
                                      <Text style={{ color: '#848484' }} numberOfLines={2}>Me: {lastSeenMessage.substr(0, 55)}</Text> :
                                  <Text style={{ color: '#848484' }} numberOfLines={2}>{lastSeenMessage.substr(0, 55)}</Text>
                                  :
                                  item.messages[0].user._id == 2 ? 
                                  lastSeenMessage == "Chat can't be replied anymore" || lastSeenMessage == "Click to send Message"?
                                  <Text style={{ color: '#848484' }} numberOfLines={2}>{I18n.t("Click to send Message")}...</Text> :
                                  <Text style={{ color: '#848484' }} numberOfLines={2}>Me: {lastSeenMessage.substr(0, 55)}</Text> :
                                  <Text style={{ color: '#848484' }} numberOfLines={2}>{lastSeenMessage.substr(0, 30)}</Text>
                                 
      
                              ) : (
                                <>
                                  <Text>{I18n.t("Click to send message")}</Text>
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
                            fontSize: 10,
                            color: "#848484",
                          }}
                        >
                       {
 isToday(item.messages[0].createdAt)?
 moment(item.messages[0].createdAt).locale("en").format('LT')
 :isYesterday(item.messages[0].createdAt)?
I18n.t("Yesterday")
 :<>{moment(item.messages[0].createdAt).locale("en").format('DD/M/YY')}</>

                       }
                         
                        </Text>
                        {
                unreadCount/3 >0?
      
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
                              {/* {unreadCount-currentSeenCount} */}
                              {/* {unreadCount} */}
                              {(unreadCount/3).toFixed(0)}
                            </Text>
                          </View>
      
                :<></>
                        }
                        
                        {/* {item.messages.length > 99 ? (
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
                        ) : item.messages.length == 0 ? (
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
                              {item.messages.length}
                            </Text>
                          </View>
                        )} */}
                      </View>
                    </View>
      
                    </View>
                    </View>
                
                :
                <></>
                      }
                </>
      
    </View>
  );
};


const mapStatetoProps = (state) => {
    // const { }=state
    return {
      chat_roster_main: state.chatss.chat_roster_main,
      allMapPosts:state.chatss.allMapPosts,
      token:state.chatss.token,
      chat_password: state.chatss.chat_password,
      jid_main: state.chatss.jid_main,
      userId:state.chatss.userId,
      refreshAfterPost:state.chatss.refreshAfterPost,
      distance:state.chatss.distance,
      isConnected:state.chatss.isConnected,
      unreadCounts:state.chat.unreadCount
    };
  };
  
  // exports.finalXMPP = finalXMPP;
  export default connect(mapStatetoProps)(ChatCard);

  exports.setOnlineStatus = setOnlineStatus;
const styles = StyleSheet.create({
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
