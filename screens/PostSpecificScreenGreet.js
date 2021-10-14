import React, { useEffect, setState, useRef, useState } from "react";
import { Tabroute, useTheme } from "@react-navigation/native";
import { Rating, AirbnbRating } from "react-native-elements";
import {
  Share,
  Image,
  Platform,
  TouchableOpacity,
  ActionSheetIOS,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  RefreshControl,
  Colors,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  FlatList,
  DevSettings,
  TextInput,
  Alert,
  // Modal,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import PostCard from "../components/PostCard";
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from "react-native-customized-image-picker";
import Snackbar from 'react-native-snackbar';
import Hyperlink from 'react-native-hyperlink'
import RNUrlPreview from 'react-native-url-preview';
import { canPost } from "./authGuard";
const GLOBAL = require('../Globals');
import Carousel from "react-native-snap-carousel";
// import { Video, AVPlaybackStatus } from "expo-av";
import axios from "axios";
import { Text } from "react-native-elements";
import ImageSlider from "react-native-image-slider";
import Modal from 'react-native-modal';

import LoginSuccessModal from "./LoginSuccessModal";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
} from "react-native-paper";
import chatReducersactual from "../reducers/chatReducersactual";
import RBSheet from "react-native-raw-bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatSpecificScreen from "./ChatSpecificScreen";
import OnBoardingScreen from "./OnBoardingScreen";
import { Chip } from "react-native-paper";
import moment from "moment";
// import Modal from 'react-native-modal';

import { connect, useDispatch, useReducer } from "react-redux";
import chatReducers from "../reducers/chatReducers";
import Video from 'react-native-video';
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




const PostSpecificScreenGreet = ({ navigation, route,allMapPosts,token,chat_roster_main,userId }) => {
  // const video = React.useRef(null);
  const rating = 5;
  const initialState = {
    comments: [],
    commentContent: "",
    commentsPhotos: [],
  };
  // const [modalVisible, setModalVisible] = useState(false);


  async function clickedChat(l) {
    // //console.log("userToken", String(userToken).length);
  
    // var userToken =  await AsyncStorage.getItem('userToken');
    // if(token!=null){

    //   navigation.navigate("ChatSpecificScreenFinal", {
    //     name: l.uservisibility.name,
    //     profilePic: l.uservisibility.profilePic,
    //     jid: l.jid_main,
    //   });
    //   // return (<LoginToAccessScreen></LoginToAccessScreen>)
    // } else {
    //   Login.current.open();
    // }
    if (token!=null) {
      var found =false;
      chat_roster_main.forEach(list=>{
        //console.log('sdsdsd',list.jid,l.jid)
        if(list.jid == l.jid){
            found = true;
        }
      })

      if(found){
        navigation.navigate("ChatSpecificScreen", {
          // name: l.uservisibility.name.substr(0, 15),
          // profilePic: l.uservisibility.profilePic,
          // jid: l.jid_main,

          name: l.uservisibility.name.substr(0, 15),
          profilePic: l.uservisibility.profilePic,
          jid: l.jid,
          xmpp: null,
          messages: [],
          media: []
        });
      }else{
        alert('Sorry')
      }
  
      // return (<LoginToAccessScreen></LoginToAccessScreen>)
    } else {
      Login.current.open();
    }
  }
  async function handleOutgoingCall (call,navigation,item){

  if(token!=null){
          navigation.navigate('OutGoingCallScreen',{aid:call,name:'Saikiran',profilePic:'https://wallpaperaccess.com/full/2213426.jpg'})
  }else{
    Login.current.open()
  }

}
  

  const [activeIndex, setIndex] = React.useState(null);

  _renderItem = ({ item, index }) => {
    var a = String(item);
    // //console.log(a.slice(a.length - 3))
    // //console.log(item.slice(item.length - 3))
    return (
      <View style={{ backgroundColor: "#000", width: "100%", height: 500 }}>
        {a.slice(a.length - 3) == "mp4" ? (
          <View>
            {/* <Video
              ref={video}
              style={styles.video}
              source={{
                uri: item,
              }}
              useNativeControls
              resizeMode="cover"
              isLooping
              // onPlaybackStatusUpdate={status => setStatus(() => status)}
            /> */}
            {/* <Text style={{color:'red',justifyContent:'center',width:'100%'}}>{index+1}/ 4</Text> */}
          </View>
        ) : (
          <View>
            <Image
              source={{ uri: item }}
              cache="force-cache"
              style={{ width: 390, height: 500, resizeMode: "cover" }}
            ></Image>
            {/* <Text style={{color:'red',textAlign:'center',width:'100%'}}>{index+1}/ 4</Text> */}
          </View>
        )}
      </View>
    );
  };



  async function reportUser(post){
    // var post = DashboardState.posts[Number(global.postcurrent[0])]
    // //console.log('postpostpostpostpostpost',post)
    await axios.post(
      `${GLOBAL.BASE_URL}${post.featureName}/report/post`,
      {
        "featureId": post._id,
        "reason":"Info Reported"
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
          token
        },
      }
    ).then((resp)=>{
      showSnackReport(resp.data.message)
    }).catch((err)=>{
      //console.log(err)
      showSnackReport('You have already reported this content')
    })
    // showSnackReport('You have already reported this content')
  }



  async function showSnackBlock(){
      
    refRBSheet.current.close()
    Snackbar.show({
      text: 'Blocked Saikiran Succesfully',
      duration: Snackbar.LENGTH_LONG,
      action: {
        text: 'UNDO',
        textColor: 'white',
        onPress: () => { /* Do something. */ },
      },
    });
  }
  async function blockUser(){
    showSnackBlock()
  }


      async  function selectedPostMap(post){
      allMapPosts.splice(0, 0, post);
      Chatdispatcher({type:'SETSHOWNOW',allMapPosts:allMapPosts})
      navigation.navigate("MapScreen")
    }

  async function showSnackReport(reason){
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

  const CommentsReducer = (prevState, action) => {
    switch (action.type) {
      case "SETCOMMENTS":
        return {
          ...prevState,
          comments: action.comments,
          isLoading: false,
        };
      case "SETCOMMENTCONTENT":
        return {
          ...prevState,
          comments: action.comments,
          isLoading: false,
        };
    }
  };
  const [Comments, setComments] = useState([]);
  // const [userId, setUserId] = useState(null);
  const [canPosts, setCanPost] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [requested, setRequested] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [commentContent, setcommentContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibletwo, setModalVisibletwo] = useState(false);

  const ActualChatdispatcher = useDispatch(chatReducersactual);
 async function getData() {
  if(route.params.post.featureName != "greet"){
    axios
    .get(
      GLOBAL.BASE_URL+`${route.params.post.featureName}/comments/` +
        route.params.post._id
    )
    .then((resp) => {
      //console.log(resp.data);
      dispatch({ type: "SETCOMMENTS", comments: resp.data });
      setComments(resp.data);
    });
  }
   
      console.log('RRRRRRRRRRR',route.params.request)
      
      var resp = await canPost()
      setCanPost(resp)

      var userToken =  await AsyncStorage.getItem('userToken');
      setUserToken(userToken)
var jwt = await AsyncStorage.getItem('token');
if(String(jwt) != "null"){
  await axios
  .get(
    GLOBAL.BASE_URL+`${route.params.post.featureName}/post/${route.params.post._id}`,
  {
    headers: {
      "Content-Type": "application/json",
      Authorization:
      'Bearer '+jwt
    },
  })
  .then((resp) => {
    console.log(resp.data)
    setIsFriend(resp.data.isFriend)
    setAccepted(resp.data.accepted)
    setRequested(resp.data.requested)
  });
}else{
  setIsFriend(false)
}


  }

  const [CommentsState, dispatch] = React.useReducer(
    CommentsReducer,
    initialState
  );

  async function clickedRequest(type){
    if(type == 'requested'){
        // alert('Already Requested')
        Snackbar.show({
          text: I18n.t('You already requested to chat with this person'),
          duration: Snackbar.LENGTH_LONG
        });
    }
    if(type == 'request'){
      navigation.navigate("SendChatRequest", {
        name: route.params.post.uservisibility.name.substr(0, 15),
        profilePic: route.params.post.uservisibility.profilePic,
        jid: route.params.post.jid_main,
        post: route.params.post
      })
    }
    if(type == 'accepted'){
      // alert('Already Connected')
      Snackbar.show({
        text: I18n.t('You are already friend with this person please check chats'),
        duration: Snackbar.LENGTH_LONG
      });
    }

  }

              const Chatdispatcher = useDispatch(chatReducers);
  const HandleFormSubmit = async () => {
    if(commentContent.trim().length >0 ){
    const formData = new FormData();
    var photoss = [];
    images.forEach(list=>{
      var photo = {
   uri: list.path,
   type: 'image/jpg',
   name: "image.jpg",
 };
     photoss.push(photo);
 })
  console.log('photossphotossphotossphotoss',photoss)
  if (photoss.length) {
    photoss.forEach((list) => {
      formData.append("photo", list);
    });
  }
    formData.append("content", commentContent);
    formData.append("postId", route.params.post._id);
    await axios.post(
        `${GLOBAL.BASE_URL}${route.params.post.featureName}/post/subpost`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
            token
          },
        }
      )
      .then((resp) => {
        //console.log(resp.data.message);
        setImages([])
        setcommentContent("");
        getData();
        // navigation.navigate("PostSpecificScreens", {
        //   post: route.params.post,
        // })
      })
      .catch((err) => {
        //console.log(err);
      });
    }else{
      alert(I18n.t('Please enter comment to submit'))
    }
  };

  function createComment(value) {
    //console.log(value);
    // alert(value)
    setcommentContent(value);
  }

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  async function getMeorNot(){
   var a =  await AsyncStorage.getItem('jid_main');
   var userIds = a.substr(0,24)
   setUserId(userIds)
  }


  async function deleteImage(path){
  const newImages = images.filter((item) => item.path !== path);
  setImages(newImages)
  }


  async function onLike(i,type){
    //console.log('token',token)
    if(token!=null){

      await axios.get(GLOBAL.BASE_URL+route.params.post.featureName+'/post/'+route.params.post._id+'/like',{
                    headers: {
                      "Content-Type": "application/json",
                      Authorization:
                        token
                    }
      }).then((resp)=>{

      }).catch((err)=>{
        alert('err')
      })
      if(route.params.post.Iliked){
        route.params.post.Iliked = false;
        var ndsw = route.params.post.likes.filter((list)=>{return list != 'userIID'})
        route.params.post.likes = ndsw;
      }else{
        route.params.post.Iliked = true;
        route.params.post.likes.push('userIID')
      }
      // setDataSourceWithin([...dataSourceWithin])
    }else{
      Login.current.open();
    }

  }

  async function deleteFriendRequest(){
    var token = await AsyncStorage.getItem('token');
    await axios.get(
      `${GLOBAL.BASE_URL}greet/removeRequest/${route.params.post._id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
          'Bearer '+token
        },
      }
    ).then((resp)=>{
    console.log(resp.data)
    setModalVisibletwo(!modalVisibletwo)
    navigation.navigate('GreetRequestsScreen')
    }).catch((err)=>{
      alert('error')
    })
    
  }
  const [spinner, setSpinner] = useState(false);
  async function showInChat(l){
    var messages = [];
    var found = false;
    chat_roster_main.forEach(list => {
      console.log('sdsdsd', list.jid, l.jid)
      if (list.jid == l.jid) {
        found = true;
        messages = list.messages;
      }
    })
    setTimeout(async () => {
      if (found) {
        setSpinner(false)
        navigation.navigate("ChatSpecificScreen", {
          name: l.uservisibility.name.substr(0, 15),
          profilePic: l.uservisibility.profilePic,
          jid: l.jid,
          xmpp: null,
          connection: ["Greet"],
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
            connection: ["Greet"],
            jid: l.jid,
            name: l.uservisibility.name,
            offline_count: 0,
            profilePic: l.uservisibility.profilePic,
            userId: l.userId,
            messages: [],
            message: "Click to Send Message",
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
          featureName: "Greet",
          name: l.uservisibility.name,
          profilePic: l.uservisibility.profilePic
        })
        var jwt = await AsyncStorage.getItem('token');
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
         await axios.post(GLOBAL.BASE_URL + 'user/getchatdata', {
            mjid: 1,
            jid: l.jid
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + jwt
                },
            }
        ).then((resp) => {
            // alert('Success')
            console.log('resprespresp', resp.data)
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
              message: "Click to Send Message",
              messages: [],
              offline_count: 0,
              profilePic: resp.data[0].profilePic,
              userId: resp.data[0].userId,
              updatedAt: Date.now(),
          };
            eachuser.messages.push(mymes);

            ActualChatdispatcher({
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
              connection: ["Greet"],
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
                connection: ["Greet"],
                jid: l.jid,
                name: l.uservisibility.nam,
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
          }).catch((err) => {
            setSpinner(false)
            alert('Error')
            console.log('Error', err)
          })

      }
    }, 1000);
  }

  async function acceptRequest(){
    console.log(route.params.request)
    var jwt = await AsyncStorage.getItem('token');
    console.log(`${GLOBAL.BASE_URL}greet/acceptGreetRequest`,route.params.post._id,route.params.post.userId)
    console.log(route.params.request)
    await axios.post(
      `${GLOBAL.BASE_URL}greet/acceptGreetRequest`,
      {
        "postId": route.params.request.postId,
        "uid": route.params.request.userId,
        "id":route.params.request._id
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
          'Bearer '+jwt
        },
      }
    ).then((resp)=>{
      console.log(resp.data)
      setModalVisible(!modalVisible)



      showInChat(route.params.request)
      // navigation.navigate('GreetRequestsScreen')
    }).catch((err)=>{
      console.log(err)
    })

  }


  async function rejectRequest(){
    var jwt = await AsyncStorage.getItem('token');
    console.log(`${GLOBAL.BASE_URL}greet/rejectGreetRequest`,route.params.post._id,route.params.post.userId)
    console.log(route.params.request)
    await axios.post(
      `${GLOBAL.BASE_URL}greet/rejectGreetRequest`,
      {
        "postId": route.params.request.postId,
        "uid": route.params.request.userId,
        "id":route.params.request._id
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
          'Bearer '+jwt
        },
      }
    ).then((resp)=>{
      console.log(resp.data)
      setModalVisible(!modalVisible)
      navigation.navigate('GreetRequestsScreen')
    }).catch((err)=>{
      console.log(err)
    })

  }
  
  async function deleteSpaark(i,type){

          if(token!=null){
            await axios
            .delete(GLOBAL.BASE_URL+`${route.params.post.featureName}/post/${route.params.post._id}`, {
              headers: {
                Authorization:
                token
              },
            })
            .then(async (resp) => {
             navigation.goBack()
            });
          }

    
  }



  useEffect(() => {
    getData();
    // var a =  AsyncStorage.getItem('jid_main');
    // alert(a)
    // var userIds = a.substr(0,24)
    // setUserId(userIds)
  }, []);

  const refRBSheet = useRef();

  const Login = useRef();

  const [refreshing, setRefreshing] = React.useState(false);
    const [images, setImages] = React.useState([]);
  const onRefresh = React.useCallback(async () => {
    await getData();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);






  const keyboardVerticalOffset = Platform.OS === 'ios' ? 200 : 0


  function onLogin() {
    // //console.log("phoness",phone)
    Login.current.close();
    navigation.navigate("VerifyOtpScreen");
  }
  return (
     
<KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 190 : 0}>
             <Spinner
        visible={spinner}
        textContent={"Connection"}
        textStyle={styles.spinnerTextStyle}
      />
<ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
       
<>
<View style={styles.centeredView}>
    <Modal isVisible={modalVisible} style={{height:50}}>
    <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{
                marginBottom: 10,
                textAlign: "center", color:"#A1A4B2"
              }}>Chat request details</Text>

            <View style={{borderColor:"#D7D7D7", borderWidth: 0.4, width: 300,margin:10}}/>
            <Image
                    source={{uri:route.params.request && route.params.request.uservisibility.profilePic}}
                    style={{
                        height: 80,
                        width: 80,
                        marginLeft: 0,
                        borderRadius: 40,
                    }}
                    ></Image>
            <Text style={{fontWeight:"700", marginTop: 10}}>
            {route.params.request && route.params.request.uservisibility.name}
            </Text>
            <Text style={{textAlign:'left'}}>
             {route.params.request && route.params.request.content}
            </Text>
            {
              route.params.request && route.params.request.photo[0]?
              <Image
                    source={{uri:route.params.request && route.params.request.photo[0]}}
                    style={{
                        height: 130,
                        width: 130,
                        marginLeft: 0,
                    }}
                    ></Image>
                    :
                    <></>
            }
            
            <Pressable
              style={{borderRadius: 10,
                padding: 10,
                elevation: 2, backgroundColor: "#2196F3", marginTop: 20}}
              onPress={() => acceptRequest()}
            > 
              <Text style={styles.textStyle}>ACCEPT FRIEND REQUEST</Text>
            </Pressable>

            <Pressable
              style={{borderRadius: 10,
                padding: 10,
                elevation: 2}}
                onPress={() => rejectRequest()}
            > 
              <Text style={{
    color: "#9B9B9B",
    fontWeight: "bold",
    textAlign: "center"
  }}>IGNORE FRIEND REQUEST</Text>
            </Pressable>
            <Pressable
              style={{borderRadius: 10,
                padding: 10,
                elevation: 2}}
                onPress={() =>setModalVisible(!modalVisible)}
            > 
              <Text style={{
    color: "#9B9B9B",
    fontWeight: "bold",
    textAlign: "center"
  }}>CLOSE</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>


    <View style={styles.centeredView}>
    <Modal isVisible={modalVisibletwo} style={{height:50}}>
    <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{
                marginBottom: 10,
                textAlign: "center", color:"#A1A4B2"
              }}>Chat request details</Text>

            <View style={{borderColor:"#D7D7D7", borderWidth: 0.4, width: 300,margin:10}}/>
            <Image
                    source={{uri:route.params.request && route.params.request.uservisibility.profilePic}}
                    style={{
                        height: 80,
                        width: 80,
                        marginLeft: 0,
                        borderRadius: 40,
                    }}
                    ></Image>
            <Text style={{fontWeight:"700", marginTop: 10}}>
            {route.params.request && route.params.request.uservisibility.name}
            </Text>
            <Text style={{textAlign:'left'}}>
             {route.params.request && route.params.request.content} 
            </Text>
            <Pressable
              style={{borderRadius: 10,
                padding: 10,
                elevation: 2, backgroundColor: "#2196F3", marginTop: 20}}
              onPress={() => deleteFriendRequest()}
            > 
              <Text style={styles.textStyle}>DELETE FRIEND REQUEST</Text>
            </Pressable>
            <Pressable
              style={{borderRadius: 10,
                padding: 10,
                elevation: 2, backgroundColor: "#2196F3", marginTop: 20}}
              onPress={() => setModalVisibletwo(!modalVisibletwo)}
            > 
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>

            
          </View>
        </View>
      </Modal>
    </View>
{/* Post Card */}
<PostCard 
                  item={route.params.post} 
                  index={1} 
                  bookmarked={route.params.post.bookmarked} 
                  banners={[]} 
                  filterContent={true}
                  pendingRatings={[]}
                  pendingWorks={[]}
                  showBanner={true}
                  navigation={navigation}/>

{/* Request Send and Received */}
<View style={{ backgroundColor: "#f2f2f2" }}>
                <View style={{ backgroundColor: "#fff" }}>
                {
    route.params.received?
                    
    <>
    <View style={{backgroundColor:'#f2f2f2'}}>

    <View>
                <Text
                style={{
                    fontWeight: "bold",
                    margin: 20,
                    marginBottom: 5,
                    fontSize: 20,
                }}
                >
                Chat Requests Received
                </Text>
            </View>
           <View
                style={{
                backgroundColor: "#fff",
                margin: 15,
                marginTop: 0,
                borderRadius: 10,
                }}
            >
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={{ flexDirection: "row" }}>
                
                <View style={{ margin: 10 }}>
                    <Image
                    source={{uri:route.params.request && route.params.request.uservisibility.profilePic}}
                    style={{
                        height: 80,
                        width: 80,
                        marginLeft: 0,
                        borderRadius: 10,
                    }}
                    ></Image>
                </View>

                <View style={{ flex: 1, paddingTop: 10 }}>
                    <Text style={{ color: "#7B8794" }}>{route.params.request && route.params.request.uservisibility.name}{" "}
                    

                    </Text>
                    <Text style={{ color: "#7B8794" }}>
                    {moment(route.params.post.createdAt).fromNow()}
                    </Text>
                    <Text>
                    {route.params.request && route.params.request.content}
                    </Text>
                    <View style={{ flexDirection: "row", paddingTop: 5 }}>
                    {/* <View
                        style={{
                        backgroundColor: "#FF7575",
                        borderRadius:10
                        }}
                    >
                        <Text style={{ color: "#fff", marginTop: 0, fontSize: 12,padding:5 }}>
                        {' '}Pending{' '}
                        </Text>
                    </View> */}
                                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View
                        style={{

                        borderRadius:10,
                        left: 0,
                        backgroundColor: "#6FA4E9",
                        }}
                    >   
                     
                        <Text style={{ color: "#fff", marginTop: 0, fontSize: 12,padding:5 }}>
                        {'   '}View{'   '}    
                        </Text>
                       
            
                    </View>
                    </TouchableOpacity>
                    </View>
                </View>
                </View>
                </TouchableOpacity>

      
                
            </View>
            </View>
    </>
             
             
             :
                <>
                <View style={{backgroundColor:'#f2f2f2'}}>

                <View>
                            <Text
                            style={{
                                fontWeight: "bold",
                                margin: 20,
                                marginBottom: 5,
                                fontSize: 20,
                            }}
                            >
                            Chat Requests
                            </Text>
                        </View>
                       <View
                            style={{
                            backgroundColor: "#fff",
                            margin: 15,
                            marginTop: 0,
                            borderRadius: 10,
                            }}
                        >
                            <TouchableOpacity onPress={() => setModalVisibletwo(true)}>
                            <View style={{ flexDirection: "row" }}>
                          
                            <View style={{ margin: 10 }}>
                                <Image
                                source={{uri:route.params.request.uservisibility.profilePic}}
                                style={{
                                    height: 80,
                                    width: 80,
                                    marginLeft: 0,
                                    borderRadius: 10,
                                }}
                                ></Image>
                            </View>
                            <View style={{ flex: 1, paddingTop: 10 }}>
                                <Text style={{ color: "#000" }}>{route.params.request && route.params.request.uservisibility.name}{" "}
                                <Text style={{ color: "#7B8794",fontSize:11 }}>
                            {""}{moment(route.params.post.createdAt).fromNow()}
                    </Text>
            
                                </Text>
                                
                                <Text>
                                {route.params.request && route.params.request.content}
                                </Text>
                                <View style={{ flexDirection: "row", paddingTop: 5 }}>
                                {/* <View
                                    style={{
                                    // backgroundColor: "#FF7575",
                                    // borderRadius:10
                                    }}
                                >
                                    <Text style={{ color: "#000", marginTop: 0, fontSize: 12,padding:5 }}>
                                    {' '}Pending{' '}
                                    </Text>
                                </View> */}
                               
                                <View
                                    style={{

                                    borderRadius:10,
                                    left: 0,
                                    backgroundColor: "#6FA4E9",
                                    }}
                                >   
                                 
                                    <Text style={{ color: "#fff", marginTop: 0, fontSize: 12,padding:5 }}>
                                    {'   '}View{'   '}    
                                    </Text>
                        
                                </View>
                                
                                </View>
                            </View>
                            </View>
                            </TouchableOpacity>

      
                  
                            
                        </View>
                        </View>
                </>
}



                </View>
              </View>
</>
    
      </ScrollView>
      </KeyboardAvoidingView>
 
 
 );
};




const mapStatetoProps = (state) => {
  // const { }=state
  //
  return {
    chat_roster_main: state.chatss.chat_roster_main,
    allMapPosts:state.chatss.allMapPosts,
    token:state.chatss.token,
    userId:state.chatss.userId

  };
};
export default connect(mapStatetoProps)(PostSpecificScreenGreet);

const styles = StyleSheet.create({
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
  },

  body: {},
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
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
    backgroundColor: "#000",
    justifyContent: "center",
    marginTop: 140,
    width: 360,
    height: 250,
    resizeMode: "contain",
  },
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
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 16
  },
});
