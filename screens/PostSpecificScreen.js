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
  FlatList,
  DevSettings,
  Pressable,
  TextInput,
  Alert,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import PostCard from "../components/PostCard";
import Star from 'react-native-star-view';
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
import I18n from '../src/i18n';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatSpecificScreen from "./ChatSpecificScreen";
import OnBoardingScreen from "./OnBoardingScreen";
import { Chip } from "react-native-paper";
import moment from "moment";
import { connect, useDispatch, useReducer } from "react-redux";
import chatReducers from "../reducers/chatReducers";
import Video from 'react-native-video';
import Spinner from 'react-native-loading-spinner-overlay';



const PostSpecificScreen = ({ navigation, route, allMapPosts, token, chat_roster_main, userId, isConnected, bookmarked }) => {
  // const video = React.useRef(null);
  const rating = 5;
  const initialState = {
    comments: [],
    commentContent: "",
    commentsPhotos: [],
  };

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


    if (token != null) {
      var found = false;
      chat_roster_main.forEach(list => {
        //console.log('sdsdsd',list.jid,l.jid)
        if (list.jid == l.jid) {
          found = true;
        }
      })

      if (found) {
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
      } else {
        alert('Sorry')
      }

      // return (<LoginToAccessScreen></LoginToAccessScreen>)
    } else {
      Login.current.open();
    }
  }
  async function handleOutgoingCall(call, navigation, item) {

    if (token != null) {
      navigation.navigate('OutGoingCallScreen', { aid: call, name: 'Saikiran', profilePic: 'https://wallpaperaccess.com/full/2213426.jpg' })
    } else {
      Login.current.open()
    }

  }

  global.commenttobereported = null;
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



  async function reportUser(post) {
    // var post = DashboardState.posts[Number(global.postcurrent[0])]
    // //console.log('postpostpostpostpostpost',post)
    // alert('Reporting Post')
    await axios.post(
      `${GLOBAL.BASE_URL}${post.featureName}/report/post`,
      {
        "featureId": post._id,
        "reason": "Info Reported"
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            token
        },
      }
    ).then((resp) => {
      showSnackReport(resp.data.message)
    }).catch((err) => {
      //console.log(err)
      showSnackReport('You have already reported this content')
    })
    // showSnackReport('You have already reported this content')
  }

  async function reportComment(post) {

    // alert('Reporting Comment')
    // var post = DashboardState.posts[Number(global.postcurrent[0])]
    console.log('COMMENT REPORTED', global.commenttobereported)
    await axios.post(
      `${GLOBAL.BASE_URL}${route.params.post.featureName}/report/subpost`,
      {
        "featureId": global.commenttobereported,
        "reason": "Reported users sub post",
        "featureName": route.params.post.featureName,
        "originalName": route.params.post.originalName
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            token
        },
      }
    ).then((resp) => {
      refRBSheetsComment.current.close()
      showSnackReport(resp.data.message)
      console.log(resp.data)
    }).catch((err) => {
      //console.log(err)
      refRBSheetsComment.current.close()
      showSnackReport('You have already reported this content')
    })
    // showSnackReport('You have already reported this content')
  }



  async function showSnackBlock() {

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
  async function blockUser() {
    showSnackBlock()
  }


  async function selectedPostMap(post) {
    allMapPosts.splice(0, 0, post);
    Chatdispatcher({ type: 'SETSHOWNOW', allMapPosts: allMapPosts })
    navigation.navigate("MapScreen")
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
  const [canPosts, setCanPost] = useState(true);
  const [isFriend, setIsFriend] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [requested, setRequested] = useState(false);
  const [alreadyRequestedFromOther, setAlreadyRequestedFromOther] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [commentContent, setcommentContent] = useState("");
  // const [bookmark, setBookmark]=useState(bookmarked)


  const [myId, setMyId] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  async function getData() {

    var userIdds = await AsyncStorage.getItem('userId');
    setMyId(userIdds)
    console.log('iiiiiiiiiiiii',route.params.post)
    if (route.params.post.featureName != "greet") {
      var jwt = await AsyncStorage.getItem('token');
      if(String(jwt)!="null"){
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      if(String(jwt)!="null"){
        setCanPost(true)
      } else {
        setCanPost(false)
      }
      await axios
        .get(GLOBAL.BASE_URL + `${route.params.post.featureName}/comments/` +route.params.post._id)
        .then((resp) => {
          console.log(resp.data);
          dispatch({ type: "SETCOMMENTS", comments: resp.data });
          route.params.post.subposts = resp.data;
          setComments(resp.data);
        });
    } else {




      var jwt = await AsyncStorage.getItem('token');
      if(String(jwt)!="null"){
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }

      var userToken = await AsyncStorage.getItem('userToken');
      setUserToken(userToken)

      if (String(jwt) != "null") {
        await axios
          .get(
            GLOBAL.BASE_URL + `${route.params.post.featureName}/post/${route.params.post._id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  'Bearer ' + jwt
              },
            })
          .then((resp) => {
            console.log('GREEEEEETTTTTTT', resp.data)
            setIsFriend(resp.data.isFriend)
            setAccepted(resp.data.accepted)
            setRequested(resp.data.requested)
            setAlreadyRequestedFromOther(resp.data.alreadyRequestedFromOther)
          });
      } else {

        setIsFriend(false)

      }
    }


  }

  const [CommentsState, dispatch] = React.useReducer(
    CommentsReducer,
    initialState
  );

  async function clickedRequest(type) {
    if (type == 'requested') {
      // alert('Already Requested')
      Snackbar.show({
        text: I18n.t('You already requested to chat with this person'),
        duration: Snackbar.LENGTH_LONG
      });
    }
    if (type == 'request') {
      navigation.navigate("SendChatRequest", {
        name: route.params.post.uservisibility.name.substr(0, 15),
        profilePic: route.params.post.uservisibility.profilePic,
        jid: route.params.post.jid_main,
        post: route.params.post
      })
    }
    if (type == 'accepted') {
      // alert('Already Connected')
      Snackbar.show({
        text: I18n.t('You are already friend with this person please check chats'),
        duration: Snackbar.LENGTH_LONG
      });
    }

  }

  const [spinner, setSpinner] = useState(false);
  const [spinnerText, setSpinnerText] = useState('Loading');
  const Chatdispatcher = useDispatch(chatReducers);
  const HandleFormSubmit = async () => {

    if (commentContent.trim().length > 0) {
      setSpinner(true)
      setSpinnerText(I18n.t('Posting Comment'))
      const formData = new FormData();
      var photoss = [];
      images.forEach(list => {
        var photo = {
          uri: list.path,
          type: 'image/jpg',
          name: "image.jpg",
        };
        photoss.push(photo);
      })
      console.log('photossphotossphotossphotoss', photoss)
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
          // route.params.post.subposts.push();
          //console.log(resp.data.message);

          setImages([])
          setcommentContent("");
          getData();
          setSpinner(false)
          route.params.IncreaseCountOnComment()
          // navigation.navigate("PostSpecificScreens", {
          //   post: route.params.post,
          // })
        })
        .catch((err) => {
          //console.log(err);
        });
    } else {
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

  async function onbookmark() {
    // if(isConnected){
    var jwt = await AsyncStorage.getItem('token');
    if (String(jwt) != "null") {
      if (bookmark) {
        setBookmark(false)
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
            console.error(error);
          });
      }
    } else {
      Login.current.open()
    }
    // }else{
    //   Snackbar.show({
    //     text: I18n.t('Check your internet'),
    //     duration: Snackbar.LENGTH_LONG
    //   });
    // }



  }

  async function getMeorNot() {
    var a = await AsyncStorage.getItem('jid_main');
    var userIds = a.substr(0, 24)
    setUserId(userIds)
  }


  async function deleteImage(path) {
    const newImages = images.filter((item) => item.path !== path);
    setImages(newImages)
  }


  // async function onLike(i, type) {
  //   // console.log("post infor", route.params.post.reviews)
  //   // alert("liked")
  //   //console.log('token',token)
  //   var jwt  = await AsyncStorage.getItem('token');
  //   if (token != null) {

  //     await axios.get(GLOBAL.BASE_URL + route.params.post.featureName + '/post/' + route.params.post._id + '/like', {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization:
  //           'Bearer '+jwt
  //       }
  //     }).then((resp) => {
  //       if (resp.data.message == "Liked This Spaark") {
  //         setLiked(true)
  //       } else {
  //         setLiked(false)
  //       }
  //       console.log(resp.data)
  //       // if(        setLiked(true))
  //     }).catch((err) => {
  //       alert('err')
  //     })
  //     if (route.params.post.Iliked) {
  //       route.params.post.Iliked = false;
  //       var ndsw = route.params.post.likes.filter((list) => { return list != 'userIID' })
  //       route.params.post.likes = ndsw;
  //     } else {
  //       route.params.post.Iliked = true;
  //       route.params.post.likes.push('userIID')
  //     }
  //     // setDataSourceWithin([...dataSourceWithin])
  //   } else {
  //     Login.current.open();
  //   }

  // }




  const [likedCount, setLikedCount] = useState(route.params.post.likes && route.params.post.likes.length)

  async function onLike(i, type) {
    // console.log("post infor", item.reviews[0])
    if (isConnected) {
      var jwt = await AsyncStorage.getItem('token');
      if (String(jwt) != "null") {
        setLiked(!liked)
        // if(likedCount == 0){
        // }else{
        //   // setLikedCount(likedCount-1)
        // }

        await axios.get(GLOBAL.BASE_URL + route.params.post.featureName + '/post/' + route.params.post._id + '/like', {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              'Bearer ' + jwt
          }
        }).then((resp) => {
          // alert('')
          // alert(resp.data.message)
          if (route.params.post.Iliked) {
            // alert('already liked')
            route.params.post.Iliked = false;
            var ndsw = route.params.post.likes.filter((list) => { return list != route.params.post.userId })
            // var ndsw = item.likes.shift();
            route.params.post.likes = ndsw;
            if (likedCount == 0) {
              // console.log('if')
            } else {
              // console.log('else')
              var as = likedCount;
              setLikedCount(as - 1)
            }

          } else {
            route.params.post.Iliked = true;
            route.params.post.likes.push(route.params.post.userId)
            var as = likedCount;
            setLikedCount(as + 1)
          }
          setCurrentCard(route.params.post)
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
        text: 'Check your internet connection',
        duration: Snackbar.LENGTH_LONG
      });
    }
    // alert('In Like')

  }
  // async function deleteSpaark(i,type){

  //         if(token!=null){
  //           await axios
  //           .delete(GLOBAL.BASE_URL+`${route.params.post.featureName}/post/${route.params.post._id}`, {
  //             headers: {
  //               Authorization:
  //               token
  //             },
  //           })
  //           .then(async (resp) => {
  //            navigation.goBack()
  //           });
  //         }


  // }

  async function deleteSpaark() {
    alert('Deleting')
    console.log(GLOBAL.BASE_URL + `${route.params.post.featureName}/post/${route.params.post._id}`)
    var jwt = await AsyncStorage.getItem('token');
    await axios.delete(GLOBAL.BASE_URL + `${route.params.post.featureName}/post/${route.params.post._id}`, {
      headers: {
        Authorization:
          'Bearer ' + jwt
      },
    })
      .then(async (resp) => {

        // setCurrentCard(null)
        deleteMyPost.current.close();
        Snackbar.show({
          text: I18n.t('Spaark Deleted Succesfully'),
          duration: Snackbar.LENGTH_LONG
        });
      }).catch((err) => {
        console.log('ERr', err)
      })
  }



  useEffect(() => {
    getData();
    // var a =  AsyncStorage.getItem('jid_main');
    // alert(a)
    // var userIds = a.substr(0,24)
    // setUserId(userIds)
  }, []);

  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  const imagess = [
    "https://res.cloudinary.com/spaarks/image/upload/v1615808340/Screenshot_2021-03-15_at_5.08.56_PM_iurdtp.png",
    "https://res.cloudinary.com/spaarks/image/upload/v1615808318/Screenshot_2021-03-15_at_5.08.34_PM_l2pvwt.png",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  ];

  const Login = useRef();
  const refRBSheet = useRef();
  const refRBSheets = useRef();
  const refRBSheetsComment = useRef();
  const refRBSheetss = useRef();
  const KeyBoard = useRef();
  const deleteMyPost = useRef();
  const RightContent = (props) => (

    <Text style={{ marginRight: 15 }}>
      <Image></Image>
      {route.params.post.distance.toFixed(1)}m
    </Text>
  );
  const [refreshing, setRefreshing] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const onRefresh = React.useCallback(async () => {
    await getData();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [liked, setLiked] = useState(route.params.post.Iliked)
  const [bookmark, setBookmark] = useState(false)
  async function openDots() {

    var userIdd = await AsyncStorage.getItem('userId');
    if (userIdd == route.params.post.userId) {
      deleteMyPost.current.open()
    } else {
      if (token != null) {
        refRBSheet.current.open();
      } else {
        Login.current.open();
      }
    }
  }

  async function openDotsForComment(commentId) {
    global.commenttobereported = commentId;
    var userIdd = await AsyncStorage.getItem('userId');
    // if(userIdd == route.params.post.userId){
    //   deleteMyPost.current.open()
    // }else{
    if (token != null) {
      refRBSheetsComment.current.open();
    } else {
      Login.current.open();
    }
    // }   
  }




  const keyboardVerticalOffset = Platform.OS === 'ios' ? 200 : 0
  async function addImages() {
    //  await ImagePicker.openPicker({
    //   multiple: true,
    //   maxSize:2
    // }).then(images => {
    //   //console.log(images);
    // });
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [I18n.t("Cancel"), I18n.t("Camera"), I18n.t("Photo Library")],
        // destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: "light",
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          await ImagePicker.openCamera({
            multiple: false,
            hideCropBottomControls: false
          }).then(images => {
            setImages(images)
          });
        } else if (buttonIndex === 2) {
          await ImagePicker.openPicker({
            multiple: false,
            maxSize: 1,
            hideCropBottomControls: true
          }).then(images => {
            //console.log(images);
            setImages(images)
          });
        } else {

        }
      }
    );
  }

  function onLogin() {
    // //console.log("phoness",phone)
    Login.current.close();
    navigation.navigate("VerifyOtpScreen");
  }

  async function renderImageLoader() {
    return (
      <ActivityIndicator />
    )
  }

  // if(isLo){
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }



  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : null}
    //   keyboardVerticalOffset={Platform.OS === "ios" ? 190 : 0}>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

<Spinner
        visible={spinner}
        textContent={spinnerText}
        textStyle={styles.spinnerTextStyle}
      />
        <RBSheet
          ref={deleteMyPost}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={90}
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
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <View style={{ color: "#000", flex: 2, }}>
                    <Image
                      source={require("../assets/icons/pro1.png")}
                      style={{ height: 50, width: 50, left: 15 }}
                      placeholderStyle={{ backgroundColor: '#fff' }}
                      PlaceholderContent={renderImageLoader}
                    ></Image>
                  </View>

                  <View style={{ color: "#000", flex: 10, height: 60 }}>
                    <TouchableOpacity
                      onPress={() => deleteSpaark()}
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
                        {I18n.t("Delete Spaark")}
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

                {/* <View style={{ flexDirection: "row", marginTop: 10 }}>
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
                    onPress={() =>onShare()}
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
                 
                 
                </View>
              </View> */}


              </View>
            </View>
          </View>
        </RBSheet>




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
                  <View style={{ color: "#000", flex: 13, height: 60, justifyContent: "center", alignItems: 'center', top: 30 }}>
                    <Image source={require('../assets/icons/login_continue.png')} style={{ height: 150, width: 150, }} placeholderStyle={{ backgroundColor: '#fff' }}
                      PlaceholderContent={renderImageLoader}></Image>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 0 }}>
                  <View style={{ color: "#000", flex: 13, height: 160, justifyContent: "center", alignItems: 'center' }}>


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
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={route.params.post.featureName != "greet" ? 290 : 200}
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
                  route.params.post.featureName != "greet" ?
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
                    :
                    <></>
                }

                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ color: "#000", flex: 2, marginLeft: 20 }}>
                    <Image
                      cache="force-cache"
                      source={require("../assets/icons/bottomsheet/1.png")}
                      style={{ height: 26, width: 26 }}
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
                <View style={{ flexDirection: "row", marginTop: 20 }} >
                  <View style={{ color: "#000", flex: 2, marginLeft: 20 }}>
                    <Image
                      cache="force-cache"
                      source={require("../assets/icons/bottomsheet/2.png")}
                      style={{ height: 26, width: 26 }}
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
                      onPress={() => { blockUser(item) }}
                    >
                      <Text style={{ color: '#000' }}>{I18n.t("Block")}{" "}{route.params.post.uservisibility.name}</Text>
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
                      {I18n.t("If_you_dont_want_to_receive_updates_from")} {route.params.post.uservisibility.name}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>


        </RBSheet>
        {/* Login to access */}

        <RBSheet
          ref={refRBSheetsComment}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={220}
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
                  <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                    <Image
                      cache="force-cache"
                      source={require("../assets/icons/bottomsheet/1.png")}
                      style={{ height: 40, width: 40 }}
                      placeholderStyle={{ backgroundColor: '#fff' }}
                      PlaceholderContent={renderImageLoader}
                    ></Image>
                  </View>
                  <View style={{ color: "#000", flex: 13, height: 60 }}>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        margin: 0,
                        fontWeight: "bold",
                        paddingLeft: 45,
                      }}
                      onPress={() => { reportComment(route.params.post) }}
                    >
                      {I18n.t("Report Comment")}
                    </Text>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 12,
                        flex: 70,
                        paddingLeft: 45,
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
                        borderBottomColor: "#C0C0C0",
                        borderBottomWidth: 1,
                      }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }} onPress={() => { blockUser(route.params.post) }}>
                  <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                    <Image
                      cache="force-cache"
                      source={require("../assets/icons/bottomsheet/2.png")}
                      style={{ height: 40, width: 40 }}
                      placeholderStyle={{ backgroundColor: '#fff' }}
                      PlaceholderContent={renderImageLoader}
                    ></Image>
                  </View>
                  <View style={{ color: "#000", flex: 13, height: 60 }}>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        margin: 0,
                        fontWeight: "bold",
                        paddingLeft: 40,
                      }}
                    >
                      <Text style={{ color: '#000' }}>Block{" "}</Text>
                    </Text>

                    <Text
                      style={{
                        color: "#000",
                        fontSize: 14,
                        flex: 70,
                        paddingLeft: 40,
                      }}
                    >
                      {I18n.t("If you dont want to receive updates")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>


        </RBSheet>









        <View style={{ backgroundColor: "#fff" ,zIndex:-1 }}>
          <View style={{ marginBottom:"100%" , zIndex:100 }}>
            <Card style={styles.eachCard}>
              {
                route.params.post.featureName == 'greet' ?
                  <View>
                    <Card style={styles.eachCard}>
                      <View>
                        <View style={{ flexDirection: "row", marginBottom: 20 }}>
                          <View
                            style={{ flex: 3, paddingLeft: 20, paddingTop: 20 }}
                          >
                            <View style={{ flexDirection: "column" }}>
                              <View style={{ flex: 2 }}>
                                <Image
                                  cache="force-cache"
                                  source={{ uri: route.params.post.uservisibility.profilePic }}
                                  style={{
                                    height: 55,
                                    width: 55,
                                    paddingLeft: 20,
                                    borderRadius: 30,
                                  }} placeholderStyle={{ backgroundColor: '#fff' }}
                                  PlaceholderContent={renderImageLoader}
                                />
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              flex: 20,
                              paddingLeft: 40,
                              paddingTop: 20,
                              fontSize: 20,
                            }}
                          >
                            <Text style={{ fontWeight: "bold" }}>
                              {route.params.post.uservisibility.name.substr(0, 15)}
                            </Text>
                            <Text style={{ marginTop: 0, fontSize: 12 }}>
                              {moment(route.params.post.createdAt).fromNow()}
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("PostSpecificScreensFeed", {
                                  post: route.params.post,
                                  naviga: 'All'
                                })
                              }
                              style={{ backgroundColor: "#fff" }}
                            >


                              <Text style={{ color: "#989898", fontSize: 13 }}><Image
                                source={require("../assets/icons/eye.png")}
                                style={{ height: 9, width: 22 }} />{route.params.post.viewedUsers.length} Views
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{ marginRight: 10 }}>
                            <TouchableOpacity
                              onPress={() => {
                                return openDots();
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
                                }} placeholderStyle={{ backgroundColor: '#fff' }}
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
                              onPress={() => onbookmark()}
                            >

                              {
                                bookmark ?
                                  <Image
                                    source={require("../assets/icons/savedbookmark.png")}
                                    style={{ height: 22, width: 13, right: 0, marginTop: 10, marginLeft: 2 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader} />
                                  :
                                  <Image
                                    source={require("../assets/icons/bookmark.png")}
                                    style={{ height: 22, width: 13, right: 0, marginTop: 10, marginLeft: 2 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader} />
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
                            <Paragraph style={{ fontSize: 15 }}>
                              <Hyperlink linkDefault={true} linkStyle={{ color: '#6FA4E9' }}>
                                <Text>
                                 {route.params.post.content}
                                </Text>
                              </Hyperlink>
                            </Paragraph>
                            <RNUrlPreview text={route.params.post.content} />
                            {/* {route.params.post.content.length > 200 ? (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate("PostSpecificScreensFeed", {
                                    post: route.params.post,
                                  })
                                }
                                style={{ backgroundColor: "#fff" }}
                              >
                                <Text style={{ color: "#6FA4E9" }}>View more.</Text>
                              </TouchableOpacity>
                            ) : (
                              <Text></Text>
                            )} */}
                          </View>
                        </View>
                      </View>
                      {

                        route.params.post.photo && route.params.post.photo.length > 0 ?

                          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>

                            {
                              route.params.post.video && route.params.post.video.length > 0 ?
                                <FlatList
                                  data={[route.params.post.video, ...route.params.post.photo]}
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
                                            style={{ height: 480, width: Dimensions.get('window').width }}
                                          />
                                          :
                                          <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: item.photos, showHeader: false }) }}>
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
                                  data={[...route.params.post.photo]}
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
                                            controls={true}
                                            style={{ height: 480, width: Dimensions.get('window').width }}
                                          />
                                          :
                                          <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: currentCard.photos, showHeader: false }) }}>
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
                          : route.params.post.video && route.params.post.video.length > 0 ?
                            <View style={{ marginRight: 10 }}>

                              <Video source={{ uri: route.params.post.video[0] }}   // Can be a URL or a local file.
                                ref={(ref) => {
                                  player = ref
                                }}
                                paused={true}
                                controls={true}
                                style={{ height: 480, width: Dimensions.get('window').width }}
                              />

                            </View>
                            : <></>

                      }
                      <View style={{ backgroundColor: "#fff" }}>
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
                                  onPress={() => onLike()}
                                >

                                  {
                                    liked ?
                                      <Image
                                        source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.17_PM_gudcen.png' }}
                                        style={{ height: 25, width: 25, margin: 10 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                        PlaceholderContent={renderImageLoader}
                                      ></Image>
                                      :
                                      <Image
                                        source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044952/Screenshot_2021-05-26_at_9.31.09_PM_qsntda.png' }}
                                        style={{ height: 25, width: 25, margin: 10 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                        PlaceholderContent={renderImageLoader}
                                      ></Image>
                                  }
                                  <Text style={{ position: 'absolute', top: 33, left: 20, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{route.params.post.likes && route.params.post.likes.length}</Text>
                                </TouchableOpacity>
                              </View>

                              {/* </View> */}
                              <View >

                                {
                                  isLoggedIn ?
                                    isFriend ?
                                      <TouchableOpacity onPress={() => {
                                        alert('You are already connected')
                                      }}>
                                        <Text style={{ marginTop: 15, color: '#6FA4E9', marginLeft: 205 }}>Request to Chat</Text>
                                      </TouchableOpacity>
                                      : requested ?
                                        <TouchableOpacity onPress={() => {
                                          alert('You have already sent a request to this post')
                                        }}>
                                          <Text style={{ marginTop: 15, color: '#6FA4E9', marginLeft: 205 }}>Request to Chat</Text>
                                        </TouchableOpacity> :
                                        alreadyRequestedFromOther ?

                                          <TouchableOpacity onPress={() => {
                                            alert('You already requested to this user from other post')
                                          }}>
                                            <Text style={{ marginTop: 15, color: '#6FA4E9', marginLeft: 205 }}>Request to Chat</Text>
                                          </TouchableOpacity>
                                          : route.params.post.userId == userId ?
                                            <TouchableOpacity onPress={() => {
                                              alert('This is your Post')
                                            }}>
                                              <Text style={{ marginTop: 15, color: '#6FA4E9', marginLeft: 205 }}>Request to Chat</Text>
                                            </TouchableOpacity>
                                            :

                                            <TouchableOpacity onPress={() => {
                                              navigation.navigate("SendChatRequest", {
                                                post: route.params.post,
                                                naviga: 'Market'
                                              })
                                            }}>
                                              <Text style={{ marginTop: 15, color: '#6FA4E9', marginLeft: 205 }}>Request to Chat</Text>
                                            </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => Login.current.open()}>
                                      <Text style={{ marginTop: 15, color: '#6FA4E9', marginLeft: 205 }}>Request to Chat</Text>
                                    </TouchableOpacity>
                                }


                              </View>



                            </View>
                          </View>




                        </View>
                      </View>
                    </Card>
                  </View>
                  :


                  // <PostCard item={route.params.post} index={1} banners={[]} navigation={navigation} filterContent={false} />
                  <PostCard
                  item={route.params.post} 
                  index={1} 
                  bookmarked={route.params.post.bookmarked} 
                  banners={[]} 
                  filterContent={false}
                  pendingRatings={[]}
                  pendingWorks={[]}
                  showBanner={true}
                  navigation={navigation}
                  />



              }


              <View style={{ backgroundColor: "#f2f2f2" }}>

                {route.params.post.featureName == "market" && route.params.post.isProvider &&
                  route.params.post.reviews && route.params.post.reviews[0].count ?
                  <>
                    <Text h5 style={{ fontWeight: "bold", margin: 10 }}>
                      Ratings & Reviews
                    </Text>

                    <View
                      style={{
                        backgroundColor: "#f2f2f2",
                        padding: 10,
                        paddingLeft: 0,
                      }}
                    >
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                      >
                        {route.params.post.reviews[0].reviews.map((reviews, i) => (
                          <View
                            style={{
                              marginTop: 0,
                              backgroundColor: "#fff",
                              borderRadius: 8,
                              marginLeft: 10,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                width: 310,
                                borderRadius: 8,
                              }}
                            >
                              <View
                                style={{
                                  flex: 8,
                                  backgroundColor: "#fff",
                                  borderRadius: 8,
                                }}
                              >
                                <Image
                                  source={{ uri: reviews.profilePic }}
                                  style={{
                                    height: 75,
                                    width: 75,
                                    padding: 10,
                                    borderRadius: 30,
                                    margin: 10,
                                  }}
                                ></Image>
                              </View>
                              <View style={{ flex: 15 }}>
                                <View style={{ flexDirection: 'row' }}>


                                  <Text style={{ marginTop: 10, margin: 5, fontWeight: 'bold' }}>{reviews.rating}/5</Text>
                                  <View style={{ flex: 8, flexDirection: 'row' }}>
                                    <Star score={route.params.post.reviews && route.params.post.reviews[0].rating} style={{
                                      width: 100,
                                      height: 20,
                                      marginBottom: 20, top: 8
                                    }} />
                                    {/* <Text
                                          style={{
                                            marginTop: 5,
                                            fontSize: 10,
                                            fontWeight: "300",
                                            color: "#6FA4E9",
                                            top:8
                                          }}
                                        >
                                          ({route.params.post.reviews && route.params.post.reviews[0].count})
                                        </Text> */}
                                  </View>
                                </View>

                                <Text
                                  style={{
                                    margin: 5,
                                    marginTop: 10,
                                    color: "#7B8794",
                                    flexShrink: 1,
                                  }}
                                  numberOfLines={2}
                                >

                                  {/* {reviews.content} */}
                                  {reviews.content}
                                </Text>
                                <Text style={{
                                  margin: 5,
                                  marginTop: 0,
                                  fontSize: 15,
                                  color: "#000",
                                  flexShrink: 1,
                                  fontWeight: 'bold'
                                }}
                                  numberOfLines={2}
                                >
                                  -{reviews.name}
                                  <Text style={{ fontSize: 13, color: '#7B8794', fontWeight: '200' }}>  {moment(reviews.createdAT).format("MMM Do YY")}</Text>
                                </Text>
                                <Text
                                  h5
                                  style={{ fontWeight: "bold", margin: 10 }}
                                >

                                </Text>

                              </View>

                              <View style={{ flex: 1 }}>
                                {/* <Image
                                        source={require("../assets/icons/nextIcon.png")}
                                        style={{
                                          height: 15,
                                          width: 15,
                                          padding: 10,
                                          borderRadius: 30,
                                          margin: 10,
                                        }}
                                      ></Image> */}
                              </View>
                            </View>
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  </>
                  : (
                    <></>
                  )}



<View>
 
                {
                      !route.params.post.published?
                  route.params.post.featureName != 'greet' ?
                    <Text h5 style={{ fontWeight: "bold", margin: 10 }}>
                      {I18n.t("Comments")} ({route.params.post.subposts.length})
                    </Text> :
                    <></>
                    :
                    <></>
                }

                <View style={{ backgroundColor: "#fff" }}>

                  {
                        !route.params.post.published?
                    route.params.post.featureName != 'greet' ?
                      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                          {
                            canPosts ?
                              userId == route.params.post.userId ?
                                <Text style={{ textAlign: 'center', padding: 10 }}>{I18n.t("You Cannot Comment on your post")}</Text>
                                :
                                <View style={{ flexDirection: "row" }}>
                                  <TouchableOpacity onPress={() => addImages()}>
                                    {
                                      images.length != 2 ?
                                        <View style={{ flex: 0, marginLeft: 5, marginTop: 7 }}>
                                          <Image
                                            source={require("../assets/icons/camera.png")}
                                            style={{ height: 35, width: 35 }}
                                          ></Image>
                                        </View>
                                        : <></>
                                    }

                                  </TouchableOpacity>

                                  <KeyboardAvoidingView
                                    behavior={Platform.OS === "ios" ? "padding" : "height"}

                                  >
                                    <View style={{ flex: 15 }}>
                                      <TextInput
                                        style={{
                                          height: 40,
                                          width: Dimensions.get('window').width - 100,
                                          borderColor: "#D7D7D7",
                                          color: "#848484",
                                          borderWidth: 0.5,
                                          borderRadius: 20,
                                          paddingLeft: 15,
                                          margin: 10,
                                          fontSize: 18,
                                        }}
                                        // Adding hint in TextInput using Placeholder option.
                                        placeholder={I18n.t("Add your Comments")}
                                        // editable={false}
                                        // Making the Under line Transparent.
                                        value={commentContent}
                                        onChangeText={createComment}
                                        underlineColorAndroid="transparent"
                                      />
                                    </View>
                                  </KeyboardAvoidingView>


                                  <View style={{ flex: 0, marginLeft: 5, marginTop: 7 }}>
                                    <TouchableOpacity
                                      onPress={HandleFormSubmit}
                                      style={{ backgroundColor: "#fff" }}
                                    >
                                      <Image
                                        source={require("../assets/icons/send_icon.png")}
                                        style={{ height: 30, width: 30, top: 6, right: 3 }}
                                      ></Image>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              :
                              route.params.post.featureName != 'greet' ?
                                <TouchableOpacity onPress={() => Login.current.open()}><Text style={{ textAlign: 'center', padding: 10 }}><Text style={{ color: 'blue' }}>Login</Text> To Post Comment</Text></TouchableOpacity>
                                : <></>
                          }
                        </View>



                      </TouchableWithoutFeedback>
                      : <></>
                      :
                      <></>

                  }
</View>


                  {
                    images.length > 0 ? <Text style={{ fontWeight: 'bold', paddingLeft: 10 }}>Media Selected</Text> : <></>
                  }

                  {/* <Image source={{uri:'/private/var/mobile/Containers/Data/Application/0806A1E3-913F-44CB-AE75-4A10AD050801/tmp/ImageCropPicker/4881BC21-5D3E-419C-BA53-3CA32EAE04CEIMG_2373.jpg'}} style={{height:90,width:90}}/> */}

                  <FlatList
                    data={images}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, i }) => (
                      <TouchableOpacity onPress={() => deleteImage()}>
                        <View style={{ margin: 15 }}>
                          <Image
                            source={{ uri: item.path }}
                            style={{ height: 90, width: 90 }}
                          />
                          <Pressable onPress={() => deleteImage(item.path)}>

                            <Image
                              source={{ uri: 'https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/38-512.png' }}
                              style={{ height: 20, width: 20, position: 'absolute', left: 80, top: -5 }}
                              onPress={() => deleteImage()}
                            />
                          </Pressable>
                          {/* </TouchableOpacity> */}
                        </View>
                      </TouchableOpacity>
                    )} />


                  <View>
                    {CommentsState.comments
                      .filter((com) => com.isRating == false)
                      .reverse()
                      .map((comment, i) => (
                        <View style={{backgroundColor:"#fff"}}>

                          <View
                            style={{
                              flex: 0,
                              flexDirection: "row",
                              marginTop: 5,
                              margin: 10,
                            }}
                          >
                            <View style={{ flex: 2 }}>
                              <Image
                                source={{ uri: comment.userId && comment.userId.profilePic }}
                                style={{
                                  height: 50,
                                  width: 50,
                                  paddingLeft: 20,
                                  borderRadius: 30,
                                }}
                              ></Image>
                            </View>
                            <View
                              style={{
                                flex: 10,
                                backgroundColor: "#f2f2f2",
                                padding: 10,
                                borderRadius: 10,
                              }}
                            >
                              <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 15 }}>
                                  <TouchableOpacity onPress={()=> navigation.navigate('UserProfileDynamic', { userId: comment.userId._id, })}>
                                  <Text
                                    style={{ fontWeight: "bold", fontSize: 14 }}
                                  >
                                    {comment.userId && comment.userId.name}
                                  </Text>
                                  </TouchableOpacity>
                                  <Text
                                    style={{ color: "#7B8794", fontSize: 12 }}
                                  >
                                    {moment(comment.createdAt)
                                      .fromNow()}
                                  </Text>
                                </View>
{
  comment.userId._id != myId?
  <View style={{ flex: 2 }}>
  <TouchableOpacity onPress={() => openDotsForComment(comment._id, i)}>
    <Image
      source={require("../assets/icons/dotscomment.png")}
      style={{
        height: 23,
        width: 8,
        marginTop: 10,
        marginRight: 10,
        // paddingRight: 50
      }}
    />
  </TouchableOpacity>
</View>
:
<></>
}
                          
                              </View>

                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate("RepliesScreen", {
                                    comment: comment,
                                    replies: comment.comments,
                                    featureName: route.params.post.featureName,
                                  })
                                }
                              >
                                <Hyperlink linkDefault={true} linkStyle={{ color: '#6FA4E9' }}>
                                  <Text
                                    style={{
                                      paddingTop: 5,
                                      fontSize: 14,
                                      color: "#0F0F10",
                                    }}
                                  >

                                    {comment.content}
                                  </Text>
                                </Hyperlink>
                              </TouchableOpacity>
                              <View style={{ backgroundColor: '#f2f2f2' }}>
                                <RNUrlPreview text={comment.content} />
                              </View>

                              <View style={{ flexDirection: 'row' }}>
                                <View style={{ padding: 5 }}>
                                  <FlatList
                                    data={comment.photo}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, i }) => (

                                      <View style={{ margin: 0 }}>
                                        <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: [{ "_id": "60d44371e8e1a44f53279011", "height": "1280", "showOverlay": false, "url": comment.photo[0], "width": "720" }], showHeader: false }) }}>

                                          <Image
                                            source={{ uri: item }}
                                            style={{ height: 150, width: 280, resizeMode: 'cover' }}
                                          />
                                        </TouchableOpacity>
                                      </View>
                                    )} />

                                </View>


                              </View>
                              <View style={{ flexDirection: "row" }}>
                                <View></View>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("RepliesScreen", {
                                      comment: comment,
                                      replies: comment.comments,
                                      featureName: route.params.post.featureName,
                                    })
                                  }
                                >
                                  <View>
                                    <Text
                                      style={{
                                        fontWeight: "500",
                                        fontSize: 12,
                                        paddingTop: 10,
                                      }}
                                    >
                                      {("Reply")} ({comment.comments.length})
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>

                        </View>
                      ))}
                  </View>
                </View>
              </View>
              {/* <View style={{flexDirection:'row',height:'100%'}}>
  <View style={{flex:80}}>
            <TextInput
  style={{ height: 40, width: "95%", borderColor: '#D7D7D7',color:'#848484', borderWidth: 0.5, borderRadius: 20,padding:15,margin:10, fontSize: 18 }}
  // Adding hint in TextInput using Placeholder option.
  placeholder="Add your Comment"
  // Making the Under line Transparent.
  underlineColorAndroid="transparent"

/>

</View>
    <View style={{flex:0,marginLeft:5,marginTop:7}}>
                                    <Image source={require('../assets/icons/image_upload.png')} style={{height:40,width:40}}></Image>
    </View>






</View> */}
            </Card>



          </View>
        </View>
      </ScrollView>

  );
};




const mapStatetoProps = (state) => {
  // const { }=state
  //
  return {
    chat_roster_main: state.chat.chat_roster_main,
    allMapPosts: state.chatss.allMapPosts,
    token: state.chatss.token,
    userId: state.chatss.userId,
    isConnected:state.chatss.isConnected

  };
};
export default connect(mapStatetoProps)(PostSpecificScreen);

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 16
  },
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
});
