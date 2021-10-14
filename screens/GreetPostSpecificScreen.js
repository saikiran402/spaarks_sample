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
  Modal,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import PostCard from "../components/PostCard";
import I18n from "i18n-js";
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




const GreetPostSpecificScreen = ({ navigation, route,allMapPosts,token,chat_roster_main,userId }) => {
  // const video = React.useRef(null);
  const rating = 5;
  const initialState = {
    comments: [],
    commentContent: "",
    commentsPhotos: [],
  };
  const [modalVisible, setModalVisible] = useState(false);

  async function chatRequestDetails(){
    setModalVisible(true)
    // console.log('hi is this working?')
  //   return (
  //   <View style={styles.centeredView}>
   
  //   <Pressable
  //     style={[styles.button, styles.buttonOpen]}
  //     onPress={() => setModalVisible(true)}
  //   >
  //     <Text style={styles.textStyle}>Show Modal</Text>
  //   </Pressable>
  // </View>
  //   )
  }

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
    setModalVisible(!modalVisible)
    navigation.goBack()
    }).catch((err)=>{
      alert('error')
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
<ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
<>

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
export default connect(mapStatetoProps)(GreetPostSpecificScreen);

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
    padding: 35,
    height: 400,
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
    borderRadius: 7,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    top:45
  },
  acceptFriend: {
    backgroundColor: "#2196F3",
    top:40
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textStyleClose: {
    color: "grey",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color:'grey',
    fontWeight:'bold',
    fontSize: 22,
  }
});
