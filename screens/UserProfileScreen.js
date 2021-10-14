import React, { useEffect, setState, useRef, useState } from "react";
import {
  View,
  Text,
  // Image,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Dimensions,
  ActionSheetIOS
} from "react-native";
const GLOBAL = require('../Globals');
import { useScrollToTop } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import ImagePicker from "react-native-customized-image-picker";
import { canPost } from './authGuard'
import { WebView } from 'react-native-webview';
import AsyncStorage from "@react-native-community/async-storage";
import { Rating, AirbnbRating, Divider, Image } from "react-native-elements";
import I18n from '../src/i18n';
import axios from "axios";
import { act } from "react-test-renderer";
import { connect, useDispatch, useReducer } from "react-redux";
// import { Video, AVPlaybackStatus } from "expo-av";
import { Chip } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import chatReducers from "../reducers/chatReducers";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Hyperlink from 'react-native-hyperlink';
import RNUrlPreview from 'react-native-url-preview';
import {checkNotifications,requestNotifications} from 'react-native-permissions';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from "react-native-push-notification";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
} from "react-native-paper";
import moment from "moment";
import Carousel from "react-native-snap-carousel";
import Video from 'react-native-video';
import PostCard from "../components/PostCard";
import { Slider } from 'react-native-elements';
// import Carousel from 'react-native-snap-carousel';




global.navigation = null;


// PushNotification.configure({
//   // (required) Called when a remote or local notification is opened or received
//   onNotification: function(notification) {
//     console.log('LOCAL NOTIFICATION ==>', notification)
//   },
 
//   onAction: function (notification) {
//     console.log("ACTION:", notification.action);
//     console.log("NOTIFICATION:", notification);
//     // process the action
//   },

//   popInitialNotification: true,
//   requestPermissions: true
// })
const UserProfileScreen = ({ navigation,isConnected, route,profilePic,token,name,userId,jid_main,chat_password,phone }) => {


  // PushNotification.configure({
  //     onRegister: function (token) {
  //       console.log("TOKENTOKENTOKENTOKENTOKENTOKEN:", token);
  //     },
  //     onNotification: function (notification) {
  //       console.log("NOTIFICATION:", notification);
  //     },
  //     permissions: {
  //       alert: true,
  //       badge: true,
  //       sound: true,
  //     },
  //     popInitialNotification: true,
  //      requestPermissions: Platform.OS === 'ios'
  //   });
  const [permissions, setPermissions] = useState({});
  const refRBsheettt = useRef();
  const [value, setValue]=useState(0);
  const [photo, setPhoto]= useState();

  const [result, setResult] = useState("🔮");
  async function changeProfilePic(){
 if(profilePic != 'https://static-content.spaarksweb.com/images/userprofile.png'){
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ["Cancel", "Camera", "Photo Library", "Delete"],
      cancelButtonIndex: 0,
      userInterfaceStyle: 'light'
    },
    async (buttonIndex) => {
      var jwt  = await  AsyncStorage.getItem('token');
      if (buttonIndex === 0) {
        // cancel action
      } else if (buttonIndex === 1) {

        await  ImagePicker.openCamera({

        }).then(image => {
          console.log(image)
          const formData = new FormData();
            var photo = {
              uri: image[0].path,
              mimetype: "image/jpeg",
              name: `image-profilePic-ios${Date.now()}.jpeg`,
            };
          formData.append("profilePic", photo);
          axios.post(GLOBAL.BASE_URL+'user/profilepic',
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization:
              'Bearer '+jwt
            },
          }
          ).then((resp)=>{
            console.log(resp.data.message)
            Chatdispatcher({type:'SETPROFILEPIC',profilePic:resp.data.message,phone:phone,name:name})
            getUserData();
          })
        });

      } else if (buttonIndex === 2) {
         await ImagePicker.openPicker({
      maxSize:1,
    }).then(images => {
      const formData = new FormData();
        var photo = {
          uri: images[0].path,
          mimetype: "image/jpeg",
          name: `image-profilePic-ios${Date.now()}.jpeg`,
        };
      formData.append("profilePic", photo);
      axios.post(GLOBAL.BASE_URL+'user/profilepic',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
          'Bearer '+jwt
        },
      }
      ).then((resp)=>{
        alert('Success')
        console.log(resp.data.message)
        Chatdispatcher({type:'SETPROFILEPICDEFAULT',profilePic:resp.data.message})
        getUserData();
      })
    });

      } else if(buttonIndex == 3){
        console.log("profilepic")
        console.log(GLOBAL.BASE_URL+"user/setdefaultprofilepic")
        var token  = await  AsyncStorage.getItem('token');
        console.log(GLOBAL.BASE_URL+"user/setdefaultprofilepic")
        await axios.get(GLOBAL.BASE_URL+"user/setdefaultprofilepic",{
          headers: {
            "Content-Type": "application/json",
            Authorization:
            'Bearer '+jwt
          },
        }).then((resp) => {
          console.log('profilepicccccc',resp.data);
      
          Chatdispatcher({type:'SETPROFILEPICDEFAULT',profilePic:'https://static-content.spaarksweb.com/images/userprofile.png'})
          getUserData()
        });
      }
    }
  );
 }else{
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ["Cancel", "Camera", "Photo Library"],
      cancelButtonIndex: 0,
      userInterfaceStyle: 'light'
    },
    async (buttonIndex) => {
      var jwt  = await  AsyncStorage.getItem('token');
      if (buttonIndex === 0) {
        // cancel action
      } else if (buttonIndex === 1) {
        await  ImagePicker.openCamera({

        }).then(image => {
          console.log(image)
          const formData = new FormData();
            var photo = {
              uri: image[0].path,
              mimetype: "image/jpeg",
              name: `image-profilePic-ios${Date.now()}.jpeg`,
            };
          formData.append("profilePic", photo);
          axios.post(GLOBAL.BASE_URL+'user/profilepic',
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization:
              token
            },
          }
          ).then((resp)=>{
            console.log(resp.data.message)
            Chatdispatcher({type:'SETPROFILEPIC',profilePic:resp.data.message,phone:phone,name:name})
            getUserData();
          })
        });

      } else if (buttonIndex === 2) {
        await ImagePicker.openPicker({
          maxSize:1,
        }).then(images => {
          const formData = new FormData();
            var photo = {
              uri: images[0].path,
              mimetype: "image/jpeg",
              name: `image-profilePic-ios${Date.now()}.jpeg`,
            };
          formData.append("profilePic", photo);
          axios.post(GLOBAL.BASE_URL+'user/profilepic',
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization:
              'Bearer '+jwt
            },
          }
          ).then((resp)=>{
            alert('Success')
            console.log(resp.data.message)
            Chatdispatcher({type:'SETPROFILEPICDEFAULT',profilePic:resp.data.message})
            getUserData();
          })
        });

      }
    }
  );
 }
   

  
  }
  // useEffect(() => {
    // PushNotificationIOS.addEventListener('notification', onRemoteNotification);
    // PushNotificationIOS.setNotificationCategories([
    //   {
    //     id: 'userAction',
    //     actions: [
    //       {id: 'open', title: 'Open', options: {foreground: true}},
    //       {
    //         id: 'ignore',
    //         title: 'Desruptive',
    //         options: {foreground: true, destructive: true},
    //       },
    //       {
    //         id: 'text',
    //         title: 'Text Input',
    //         options: {foreground: true},
    //         textInput: {buttonTitle: 'Send'},
    //       },
    //     ],
    //   },
    // ]);
  // });



  const refRBSheet = useRef();
  const Chatdispatcher = useDispatch(chatReducers);
  const refRBSheetDelete = useRef();
  const [refreshing, setRefreshing] = React.useState(false);
  const [posts, setPosts] = React.useState(null);
  const [photos, setPhotos] = React.useState([]);
  const [Loading, setLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [canp, setCanPost] = React.useState(false);
  const ref = React.useRef(null);
  useScrollToTop(ref);
async function navi(){
  refRBSheet.current.close()

  navigation.navigate("PreferncesScreen")

}
    async function sendNotifications(){
      // checkNotifications().then(({status, settings}) => {
      //   console.log(status,settings)
      // });
      // requestNotifications(['alert', 'sound']).then(({status, settings}) => {
      //   console.log(status,settings)
      // });
    //   PushNotificationIOS.checkPermissions((callback)=>{
    //     console.log('callbackcallbackcallbackcallback',callback)
    //   });
    //   PushNotification.getInitialNotification();

    // //   alert('hi')
    // var request = {
        // id:'fghjkhg',
        // title:'Hi',
        // subtitle:'Hi',
        // body:'Test'
    //   }
    //   PushNotification.addNotificationRequest(request);

    await PushNotificationIOS.addNotificationRequest({
      id:String(Date.now()),
      title:'New Message from '+'this_chat.name',
      subtitle:'',
      body:'message',
      userInfo:{
        apnType:'PostSpecificScreen',
        postId:'',
        local:true
      }
   })
      
    }
  

   function onLogin(phone) {
                console.log("phoness", phone)
                // Login.current.close();
                navigation.navigate('VerifyOtpScreen', { phone: phone })
              }

  const [profPic,setProPic] = useState(null)
  async function showWeb(){
    refRBSheet.current.close()

      navigation.navigate('WebViewScreen',{url:'https://staging-angular.ososweb.com/termsmobile'})
    }
  _renderItem = ({item, index}) => {
    var as =[]
    // console.log("Im inn",typeof item)
    // if(item.length>0){
      var a = String(item);
      // console.log("asss",a)
      // if(a == undefined){
      // }else{
        if(a){
          console.log("Empty",a)
          return (
        <View style={{backgroundColor:"#000",  width:'100%',
        height: 500}}>
          
          {
           a.slice(a.length - 3) == "mp4"?
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
        <Text style={{color:'red',justifyContent:'center',width:'100%'}}>{index+1}/ 4</Text>
        </View>
         :
         <View>
         <Image source={{uri:item}} cache="force-cache" style={{  width: 390,
          height: 480,
          resizeMode: "cover",}}placeholderStyle={{backgroundColor:'#fff'}}
          PlaceholderContent={<ActivityIndicator />}></Image>
     {/* <Text style={{color:'red',textAlign:'center',width:'100%'}}>{index+1}/ 4</Text> */}
        </View>
          } 
      </View>
      );
        }else{

        }
        // }
    // }else{

    // }
  
    // console.log(a.slice(a.length - 3))
    // console.log(item.slice(item.length - 3))
    
  }



  const notSelected = [
    {
        
        type: "partner",
        image: require("../assets/partner/1.png"),
    },
    {
      type: "partner",
      image: require("../assets/partner/2.png"),
    },
    {
      type: "partner",
      image: require("../assets/partner/3.png"),
    },
    {
      type: "rewards",
      image: require("../assets/rewards/1.png"),
    },
    {
      type: "rewards",
      image: require("../assets/rewards/2.png"),
    },
    
  ];
  const selected = [
  {
        
    type: "partner",
    image: require("../assets/partner/selected/1.png"),
  },
  ];
  const [finalName,setFinalName] = useState('Loading..')
  const [finalUserId,setFinalUserId] = useState(null)
  const [isPartners,setIsPartner] = useState(false)
  async function carouselRewards(){
               
    var jwt = await AsyncStorage.getItem('token');
    if(String(jwt) != "null"){
      navigation.navigate('RewardsScreen')
    }else{
      
      Login.current.open()
    }
 
  
}
async function carouselPartner(){
 
  var jwt = await AsyncStorage.getItem('token');
  if(String(jwt) != "null"){
    navigation.navigate('spaarksPartnerScreen0')
  }else{
    
    Login.current.open()
  }


}

const _carouselViewTop =({item})=>{

  return (
  <View style={{margin:0}}>
    {
      item.type == 'partner'?
      // <TouchableOpacity onPress={()=>navigation.push('spaarksPartnerScreen0')}>
      <TouchableOpacity onPress={()=>carouselPartner()}>

      <Image source={item.image}  style={{ height: 130, width: Dimensions.get('window').width,resizeMode: 'contain', justifyContent:"center", alignItems:"center" }}placeholderStyle={{backgroundColor:'#fff'}}
                            ></Image>
      </TouchableOpacity>
      :
      // <TouchableOpacity onPress={()=>navigation.navigate('RewardsScreen')}>
      <TouchableOpacity onPress={()=>carouselRewards()}>

      <Image source={item.image}  style={{ height: 130, width: Dimensions.get('window').width,resizeMode: 'contain', justifyContent:"center", alignItems:"center" }}placeholderStyle={{backgroundColor:'#fff'}}
                            ></Image>
      </TouchableOpacity>
    }
   
   </View>
  )
}
  // const _carouselViewTop =({item})=>{
  //   return (
  //   <View style={{margin:0}}>
  //     {
  //       item.type == 'partner'?
  //       <TouchableOpacity onPress={()=>navigation.push('spaarksPartnerScreen0')}>
  //       <Image source={item.image}  style={{ height: 130, width: Dimensions.get('window').width,resizeMode: 'contain', justifyContent:"center", alignItems:"center" }}placeholderStyle={{backgroundColor:'#fff'}}
  //                             ></Image>
  //       </TouchableOpacity>
  //       :
  //       <TouchableOpacity onPress={()=>navigation.navigate('RewardsScreen')}>
  //       <Image source={item.image}  style={{ height: 130, width: Dimensions.get('window').width,resizeMode: 'contain', justifyContent:"center", alignItems:"center" }}placeholderStyle={{backgroundColor:'#fff'}}
  //                             ></Image>
  //       </TouchableOpacity>
  //     }
     
  //    </View>
  //   )
  // }
  async function getUserData() {
    if(isConnected){
    var canp = await canPost();
    var names = await AsyncStorage.getItem('name');
    var userIIIDddd = await AsyncStorage.getItem('userId');
    setFinalName(names)
    var jwts = await AsyncStorage.getItem('token');
    var isPartnerss = await AsyncStorage.getItem('isPartner');
    setIsPartner(isPartnerss)
    if(jwts!="null"){
      var isPartnerss = await AsyncStorage.getItem('isPartner');
      setIsPartner(isPartnerss)
     
    }

    setFinalUserId(userIIIDddd)
    setCanPost(canp)
    if(token!=null){
      await axios
      .get(GLOBAL.BASE_URL+"user/getmyprofile", {
        headers: {
          Authorization:
          token
        },
      })
      .then(async (resp) => {
        // console.log('User Data',resp.data)
        console.log("Done", resp.data.photos);
        setPosts(resp.data.posts.reverse());
        setPhotos(resp.data.photos);
        setLoading(false);
        let userToken = await AsyncStorage.getItem("userToken");
        let username = await AsyncStorage.getItem("username");
        let pref = await AsyncStorage.getItem("prefernces");
        setUserToken(userToken);
      }).catch((err)=>{
        setLoading(false);
      })
    }else{
      setLoading(false);
    }
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }

  }

    async function openSettings(){
      
      refRBSheet.current.close()
      navigation.navigate('SettingsScreen')
    }

    // const onLocalNotification = (notification) => {
    //   const isClicked = notification.getData().userInteraction === 1;
    //   // Handle deeplink here from notification - done below
    // };

    // const onRegistered = (deviceToken) => {
    //   console.log("Registered For Remote Push", `Device Token: ${deviceToken}`);
    // };


  // const onRegistrationError = (error) => {
  //   console.log(`Error (${error.code}): ${error.message}`);
  // };

  // PushNotificationIOS.addEventListener("register", onRegistered);
  // PushNotificationIOS.addEventListener(
  //   "registrationError",
  //   onRegistrationError
  // );
  // PushNotificationIOS.addEventListener(
  //   "localNotification",
  //   onLocalNotification
  // ); // Handling click on notification

  // PushNotificationIOS.requestPermissions().then(
  //   (data) => {
  //     console.log("PushNotificationIOS.requestPermissions", data);
  //   },
  //   (data) => {
  //     console.log("PushNotificationIOS.requestPermissions failed", data);
  //   }
  // );
  const onRefresh = React.useCallback(async () => {
    // setRefreshing(true);
    // getData()
    setLoading(true)
    getUserData();
    // wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    getUserData();
  

    // return () => {
    //   PushNotificationIOS.removeEventListener("register");
    //   PushNotificationIOS.removeEventListener("registrationError");
    //   PushNotificationIOS.removeEventListener("notification");
    //   PushNotificationIOS.removeEventListener("localNotification");
    // };
    // PushNotification.configure({
    //   onNotification: function(notification) {
    //       const { data } = notification;
    
    //       NavigationService.navigate('Screen', { notificationData: data });
    //   }
    // });


  }, []);

  if (Loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  global.postcurrent = ['0'];
  async function onHelpScreen(){
    if(isConnected){
    refRBSheet.current.close()
    navigation.navigate("HelpScreen")
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
  }

  async function onConnectScreen(){
    if(isConnected){
    refRBSheet.current.close()
    navigation.navigate("ConnectWithUsScreen")
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
  }

  async function deleteSpaark(){
    if(token!=null){
      await axios
      .delete(GLOBAL.BASE_URL+`${posts[Number(global.postcurrent)].featureName}/post/${posts[Number(global.postcurrent)]._id}`, {
        headers: {
          Authorization:
          'Bearer '+GLOBAL.TOKEN._W
        },
      })
      .then(async (resp) => {
        getUserData();
        refRBSheetDelete.current.close();
        Snackbar.show({
          text: I18n.t('Spaark Deleted Succesfully'),
          duration: Snackbar.LENGTH_LONG
        });
        // console.log('User Data',resp.data)
        // console.log("Done", resp.data.photos);
        // setPosts(resp.data.posts);
        // setPhotos(resp.data.photos);
        // setLoading(false);
        // let userToken = await AsyncStorage.getItem("userToken");
        // let username = await AsyncStorage.getItem("username");
        // let pref = await AsyncStorage.getItem("prefernces");
        // setUserToken(userToken);
      });
    }else{
      setLoading(false);
    }
  }

  async function onFAQScreen(){
    if(isConnected){
    refRBSheet.current.close()
    navigation.navigate('FaqsScreen')
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
  }
  async function onRewardsScreen(){
    if(isConnected){
    refRBSheet.current.close()
    navigation.navigate('RewardsScreen')
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
  }

  async function onBookmarksScreen(){
    if(isConnected){
    refRBSheet.current.close()
    navigation.navigate('BookmarksScreen')
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
  }


  async function polls(){
    if(isConnected){
    refRBSheet.current.close()
    navigation.navigate('AllPollsScreen')
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
  }



async function onGuideLinesScreen(){
  if(isConnected){
    refRBSheet.current.close()
    navigation.navigate('GuidelinesScreen')
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
}
  async function onLiveScreen(){
    if(isConnected){
    refRBSheet.current.close()
    navigation.navigate('WebViewScreen',{url:'https://zoom-style-clone.herokuapp.com/room/'})
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
  }

 
  async function  businessEnquiriesScreen(){
    if(isConnected){
    refRBSheet.current.close()
    navigation.navigate('BusinessEnquiries')
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
  }

  async function onPartnerScreen(){

       
    if(isConnected){
    var tokenJWT = await AsyncStorage.getItem('token');
       await axios.get(
     GLOBAL.BASE_URL+`user/ispartner`,
     {
         headers: {
           "Content-Type": "application/json",
           Authorization:
           'Bearer '+tokenJWT
         },
       }
   ).then((resp) => {
     console.log("alllllllll"  , resp.data)
     // setReferals(resp.data.message.userReferenced)
     // dispatch({type:'SETCARDS',data:resp.data.message.userReferenced})
     console.log('THIS IS THE RESPONSE LOOK HERE')
     if(resp.data.programActive){
     if(resp.data.isApplied && resp.data.isPartner){
       //Dashboard
       refRBSheet.current.close()
       
       navigation.navigate('spaarksPartnerDashboard')

     }else if(resp.data.isApplied && !resp.data.isPartner){
       //waiting to be verified
       refRBSheet.current.close()

       navigation.navigate('spaarksPartnerScreen3', {show: true})

     }else if(!resp.data.isApplied && !resp.data.isPartner && resp.data.partnerStatus == 'Rejected'){
      //Applied and rejected
      refRBSheet.current.close()

      navigation.navigate('spaarksPartnerScreen5', {show: true,reason:resp.data.partnerRemarks})

    }else if(!resp.data.isApplied && !resp.data.isPartner){
       //notapplied not verified
       refRBSheet.current.close()

    navigation.navigate('spaarksPartnerScreen4', {show: true})

     }
    //  refRBSheet.current.close()
    //  navigation.navigate('spaarksPartnerScreen1')
    }else{
      alert('Spaarks Partnership program is currently inactive')
    }

   })
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
 }
     
 const renderPostCard = ({ item, index }) =>{
  return(
    <PostCard 
    item={item} 
    index={index} 
    banners={[]} 
    showBanner={false}
    navigation={navigation}
    />
    
  )
}

  async function openDeleteDots(post,index){
    global.postcurrent = String(index);
    // alert(global.postcurrent)
    console.log(posts[Number(global.postcurrent)])
    refRBSheetDelete.current.open()
  }

  async function isPartner() {
    try {
        var tokenJWT = await AsyncStorage.getItem('token');
       let ans = await axios.get(
        GLOBAL.BASE_URL+`user/ispartner`,
        {
            headers: {
              "Content-Type": "application/json",
              Authorization:
              'Bearer '+tokenJWT
            },
          }
      ).then((resp) => {
        console.log(resp.data.message)
        // setReferals(resp.data.message.userReferenced)
        // dispatch({type:'SETCARDS',data:resp.data.message.userReferenced})
        console.log('THIS IS THE RESPONSE LOOK HERE')
      

      })
    } catch (err) {
      console.log(err)
    }

}


async function releaseNotesScreen(){
  if(isConnected){
  refRBSheet.current.close()
  navigation.navigate('ReleaseNotesScreen')
}else{
  Snackbar.show({
    text: I18n.t('Check your internet'),
    duration: Snackbar.LENGTH_LONG
  });
}
}


if(isConnected){
  return (

    <KeyboardAvoidingView>
    <ScrollView  ref={ref} refreshControl={
                              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }>
      {/* FAQ's  */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={620}//650 with polls
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

               {/* preferences */}
          

            {/* bookmark */}
            <TouchableOpacity
                            onPress={() => onBookmarksScreen()}
                  >
            <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image placeholderStyle={{backgroundColor:'#fff'}}
                    PlaceholderContent={<ActivityIndicator />}
                    source={require("../assets/icons/pro2.png")}
                    style={{ height: 30, width: 30 }}
                  ></Image>
                </View>

                <View style={{ color: "#000", flex: 13, height: 30 }}>
                 
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        margin: 0,
                        paddingLeft: 40,
                      }}
                    >
                    {I18n.t('Bookmarks')}  
                    </Text>
            
                 
                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 0,
                      marginRight: 0,
                      marginBottom: 10,
                      borderBottomColor: "#C0C0C0",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              </View>
              </TouchableOpacity>
             
             
              {/* <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image placeholderStyle={{backgroundColor:'#fff'}}
                    PlaceholderContent={<ActivityIndicator />}
                    source={require("../assets/icons/pro2.png")}
                    style={{ height: 30, width: 30 }}
                  ></Image>
                </View>

                <View style={{ color: "#000", flex: 13, height: 30 }}>
                  <TouchableOpacity

                    onPress={() => onLiveScreen()}
                  >
                    <Text
                      style={{ 
                        color: "#000",
                        fontSize: 16,
                        margin: 0,

                        paddingLeft: 40,
                      }}
                    >
                    Live Stream 
                    </Text>
                  </TouchableOpacity>
                 
                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 0,
                      marginRight: 0,
                      marginBottom: 10,
                      borderBottomColor: "#C0C0C0",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              </View> */}


{/* <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image
                    source={require("../assets/icons/partnership.png")}
                    style={{ height: 30, width: 30 }}
                    PlaceholderContent={<ActivityIndicator />}
                    placeholderStyle={{backgroundColor:'#fff'}}
                  ></Image>
                </View>

                <View style={{ color: "#000", flex: 13, height: 30 }}>
                  <TouchableOpacity
                    onPress={() => polls()}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        margin: 0,

                        paddingLeft: 40,
                      }}
                    >
                    {I18n.t("My Polls")} 
                    </Text>
                  </TouchableOpacity>
                  
                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 0,
                      marginRight: 0,
                      // marginBottom: 10,
                      borderBottomColor: "#C0C0C0",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              </View> */}
              
             
            <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image
                    source={require("../assets/icons/partnership.png")}
                    style={{ height: 30, width: 30 }}
                    PlaceholderContent={<ActivityIndicator />}
                    placeholderStyle={{backgroundColor:'#fff'}}
                  ></Image>
                </View>

                <View style={{ color: "#000", flex: 13, height: 30 }}>
                  <TouchableOpacity
                    onPress={() => onPartnerScreen()}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        margin: 0,

                        paddingLeft: 40,
                      }}
                    >
                    {I18n.t("Spaarks Partner Program")} 
                    </Text>
                  </TouchableOpacity>
                  
                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 0,
                      marginRight: 0,
                      // marginBottom: 10,
                      borderBottomColor: "#C0C0C0",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              </View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image
                    source={require("../assets/icons/rewards.png")}
                    style={{ height: 30, width: 30 }}
                    PlaceholderContent={<ActivityIndicator />}placeholderStyle={{backgroundColor:'#fff'}}
                  ></Image>
                </View>

                <View style={{ color: "#000", flex: 13, height: 30 }}>
                  <TouchableOpacity
                    onPress={() => onRewardsScreen()}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        margin: 0,

                        paddingLeft: 40,
                      }}
                    >
                      {I18n.t("Rewards")} 
                    </Text>
                  </TouchableOpacity>
                
                  <View
                    style={{
                      marginTop:  10,
                      marginLeft: 0,
                      marginRight: 0,
                      // marginBottom: 10,
                      borderBottomColor: "#C0C0C0",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image
                    source={require("../assets/icons/pro1.png")}
                    style={{ height: 30, width: 30 }}
                    PlaceholderContent={<ActivityIndicator />}placeholderStyle={{backgroundColor:'#fff'}}
                  ></Image>
                </View>

                <View style={{ color: "#000", flex: 13, height: 30 }}>
                  <TouchableOpacity
                    onPress={() => onFAQScreen()}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        margin: 0,

                        paddingLeft: 40,
                      }}
                    >
                      {I18n.t("FAQ")} 
                    </Text>
                  </TouchableOpacity>
             
                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 0,
                      marginRight: 0,
                      borderBottomColor: "#C0C0C0",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image
                    source={require("../assets/icons/help.png")}
                    style={{ height: 30, width: 30 }}
                    PlaceholderContent={<ActivityIndicator />}placeholderStyle={{backgroundColor:'#fff'}}
                  ></Image>
                </View>

                <View style={{ color: "#000", flex: 13, height: 30 }}>
                  <TouchableOpacity
                    onPress={() => onHelpScreen()}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        margin: 0,

                        paddingLeft: 40,
                      }}
                    >
                      {I18n.t("Help")} 
                    </Text>
                  </TouchableOpacity>

                  
                
                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 0,
                      marginRight: 0,
                      borderBottomColor: "#C0C0C0",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              </View>



              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image placeholderStyle={{backgroundColor:'#fff'}}
                    PlaceholderContent={<ActivityIndicator />}
                    source={require("../assets/icons/preferences.png")}
                    style={{ height: 30, width: 30 }}
                  ></Image>
                </View>
                <View style={{ color: "#000", flex: 13, height: 30 }}>
                  <TouchableOpacity
                    onPress={() => navi()}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        margin: 0,
     
                        paddingLeft: 40, 
                      }}
                    >
                      {I18n.t("Update interests")} 
                    </Text>
                  </TouchableOpacity>
                 
                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 0,
                      marginRight: 0,
                      marginBottom: 10,
                      borderBottomColor: "#C0C0C0",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
               
              </View>
           

              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image
                    source={require("../assets/icons/pro3.png")}
                    style={{ height: 30, width: 30 }}
                    PlaceholderContent={<ActivityIndicator />}placeholderStyle={{backgroundColor:'#fff'}}
                  ></Image>
                </View>
                <View style={{ color: "#000", flex: 13, height: 30 }}>
                  <TouchableOpacity
                    onPress={() => onConnectScreen()}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        margin: 0,

                        paddingLeft: 40,
                      }}
                    >
                      {I18n.t("Connect With Us")} 
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 0,
                      marginRight: 0,
                      borderBottomColor: "#C0C0C0",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              </View>


              

              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image
                    source={require("../assets/icons/business.png")}
                    style={{ height: 30, width: 30 }}
                    PlaceholderContent={<ActivityIndicator />}placeholderStyle={{backgroundColor:'#fff'}}
                  ></Image>
                </View>

                <View style={{ color: "#000", flex: 13, height: 30 }}>
                  <TouchableOpacity
                    onPress={() => businessEnquiriesScreen()}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        margin: 0,

                        paddingLeft: 40,
                      }}
                    >
                      {I18n.t("Business Enquiries")} 
                    </Text>
                  </TouchableOpacity>

                  
                
                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 0,
                      marginRight: 0,
                      borderBottomColor: "#C0C0C0",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              </View>


              
           


              
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image
                    source={require("../assets/icons/pro4.png")}
                    style={{ height: 30, width: 30 }}
                    PlaceholderContent={<ActivityIndicator />}placeholderStyle={{backgroundColor:'#fff'}}
                  ></Image>
                </View>
               
                <View style={{ color: "#000", flex: 13, height: 30 }}>
                <TouchableOpacity onPress={()=>showWeb()}>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 16,
                      margin: 0,
                  
                      paddingLeft: 40,
                    }}
                  >
                  {I18n.t("Terms & Policies")} 
                  </Text>
                  </TouchableOpacity>
                  {/* <Text
                    style={{
                      color: "#000",
                      fontSize: 14,
                      flex: 70,
                      paddingLeft: 40,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text> */}
  
                  {/* line */}
                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 0,
                      marginRight: 0,
                      borderBottomColor: "#C0C0C0",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
       
              </View>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image
                    source={require("../assets/icons/whats_new.png")}
                    PlaceholderContent={<ActivityIndicator />}placeholderStyle={{backgroundColor:'#fff'}}
                    style={{ height: 30, width: 30 }}
                  ></Image>
                </View>
                <View style={{ color: "#000", flex: 13, height: 30 }}>
                <TouchableOpacity onPress={()=>releaseNotesScreen()}>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 16,
                      margin: 0,
                      
                      paddingLeft: 40,
                    }}
                  >
                   {I18n.t("What's New")} 
                  </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 0,
                      marginRight: 0,
                      borderBottomColor: "#C0C0C0",
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              
              </View>


              <View style={{ flexDirection: "row", marginTop: 20 }}>
             
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image
                    source={require("../assets/icons/pro5.png")}
                    PlaceholderContent={<ActivityIndicator />}placeholderStyle={{backgroundColor:'#fff'}}
                    style={{ height: 30, width: 30 }}
                  ></Image>
                </View>
                <View style={{ color: "#000", flex: 13, height: 30 }}>
                <TouchableOpacity onPress={()=>openSettings()}>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 16,
                      margin: 0,

                      paddingLeft: 40,
                    }}
                  >
                   {I18n.t("Settings")}
                  </Text>
                  </TouchableOpacity>

                </View>
              </View>


        
           
            </View>
          </View>
        </View>
   
   
   
   
      </RBSheet>


{/* temp slider */}

      <RBSheet
                        ref={refRBsheettt}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        height={250}
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
                        <View style={{ backgroundColor: "#fff", height: 250 }}>
                         <View>
                           <Text style={{marginLeft: 20, fontWeight:'bold', fontSize: 20}}>Distance</Text>
                           <Text style={{marginLeft: 20, fontWeight:'200', fontSize: 16,top:10}}>Shows spaarks within specified radius</Text>
                         </View>
                         <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', alignItems:'center', top: 25}}>
                         <View style={{ flex: 1,justifyContent: 'center' }}>
  <Slider
    value={value}
    onValueChange={setValue}
    thumbTouchSize={{width: 20, height: 20}}
    minimumTrackTintColor='#6FA4E9'
    maximumTrackTintColor='#9597A1'
    // minimumValue='1'
    // maximumValue='5'
    // step='1'
  />
  <Text>Value: {value}</Text>
</View>
               </View>

              
                         <View style={{ justifyContent:'center', alignItems:'center'}}>
                          
                          <Button
                                    mode="contained"
                                    color="#6FA4E9"
                                    style={{
                                      height: 40,
                                      width: 300,
                                      margin: 10,
                                      marginTop: 40,
                                     
                                      marginBottom: 40
                                    }}
                                   
                                  >
                                    APPLY
                                </Button>  
                                </View>                        
                        </View>


                      </RBSheet>
      <RBSheet
        ref={refRBSheetDelete}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={150}
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
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image
                    source={require("../assets/icons/pro1.png")}
                    style={{ height: 50, width: 50 }}
                    PlaceholderContent={<ActivityIndicator />}
                    placeholderStyle={{backgroundColor:'#fff'}}
                  ></Image>
                </View>

                <View style={{ color: "#000", flex: 13, height: 60 }}>
                  <TouchableOpacity
                    onPress={() =>deleteSpaark()}
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
                      Delete Spaark
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 14,
                      flex: 70,
                      paddingLeft: 40,
                    }}
                  >
                    {I18n.t("Click Here to delete the spaark selected")}
                  </Text>
                  {/* line */}
                 
                </View>
              </View>
          
           
            </View>
          </View>
        </View>
      </RBSheet>
{
   token !=null?

<View style={{ flexDirection: "column", backgroundColor: "#fff" }}>
        {/* User Data */}
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row", color: "#000" }}>
            <View style={{ flex: 10, marginLeft: 20 }}></View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <Image
                  source={require("../assets/icons/horizontaldots.png")} size={45}       
                  style={{
                    height: 40,
                    resizeMode :"contain" , 
                    width: 30,
                    paddingLeft: 10,
                    marginTop: 5,
                    transform : [{rotate : "90deg"}]
                  }}
                  PlaceholderContent={<ActivityIndicator />}
                  placeholderStyle={{backgroundColor:'#fff'}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 0,
              color: "#000",
              justifyContent: "center",
              textAlign: "center",
              alignItems:'center'
            }}
          >
                                           <TouchableOpacity onPress={()=>{ navigation.navigate('ViewFullScreenImagesScreen', { photos: [{url:profilePic}], content: "currentCard.content", name: "currentCard.uservisibility.name", profilePic: profilePic, time: "currentCard.createdAt", post: "currentCard", showHeader: false })}}>


            <Image
              source={{uri:profilePic}}
              style={{
                height: 100,
                width: 100,

                top:0,
                borderRadius: 30,
                zIndex:-1
              }}
            ></Image>
             </TouchableOpacity>
     <TouchableOpacity onPress={()=>{changeProfilePic()}}>
<Text style={{textAlign:'center',color:"#6FA4E9"}}>{I18n.t("Edit")}</Text>


            </TouchableOpacity>
          </View>
          <View style={{ flex: 0,
              color: "#000",
              justifyContent: "center",
              textAlign: "center",
              alignItems:'center' }}>
            {/* <TouchableOpacity onPress={()=>sendNotifications()}> */}
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                color:'#000',
                textAlign: "center",
                margin: 20,
                marginTop:5
              }}
            >
              {/* {posts[0].uservisibility.name && } */}
        {/* {finalName} */}
        {name}
            </Text>
            {/* </TouchableOpacity> */}
          </View>
          <View
            style={{
              flex: 0,
              color: "#000",
              textAlign: "center",
              justifyContent: "center",
              alignItems:"center"
            }}
          >
  <TouchableOpacity
  onPress={() =>
    navigation.navigate("SellerProfile", {
      userId: finalUserId,
      post: 'item',
    })
  }
  style={{ backgroundColor: "#fff" }}
>
              <Chip

                style={{
                  
                  marginTop: 0,
                  marginBottom: 10,
                  alignItems:'center',
                  textAlign: "center",
                  
                  width: 150,
                  backgroundColor: '#6FA4E9',
                  
                }}
              >
                <Text style={styles.chipTexts, { marginTop: 0,
                  marginBottom: 10,
                  alignItems:'center',
                  textAlign: "center",
                  left: 120,
                  width: 150,
                  color: '#fff', 
                  // backgroundColor: '#6FA4E9'
                  }}>{I18n.t("View Market Profile")} </Text>
              </Chip>
            </TouchableOpacity>

          </View>
        </View>
        {/* SellerProfile */}
        <View
          style={{
            margin: 10,
            borderBottomColor: "#EAEAEA",
            borderBottomWidth: 1,
          }}
        />

<View style={{ backgroundColor: '#f2f2f2' }}>
                    
                    <Carousel
                  ref={(c) => { _carousel = c; }}
                  data={isPartners == "true"? selected: notSelected}
                  renderItem={_carouselViewTop}
                  autoplay={true}
                  layout={'default'}
                  loop={true}
                  autoplayInterval={2000}
                  sliderWidth={Dimensions.get('window').width}
                  // sliderHeight={170}
                  itemWidth={Dimensions.get('window').width}
                />
                    </View>
        {/* Images Posted */}
        {
          photos.length>0 ?
        <View>
          <View style={{ flexDirection: "column" }}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: "bold", padding: 15 }}>
                {I18n.t("Images Posted")} 
              </Text>
            </View>
            <View style={{ backgroundColor: "#fff" }}>
             
              <FlatList
                style={{ margin: 5 }}
                numColumns={4} // set number of columns
                columnWrapperStyle={styles.row} // space them out evenly
                data={photos.length>8?photos.reverse().slice(0,8):photos.reverse()}
                // inverted={true}
                keyExtractor={(item, index) => item.index} 
                renderItem={({ item,index }) => (
                  <View>
                    <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ViewFullScreenImagesScreen', { photos: photos.length>8?photos.slice(0,8):photos, showHeader: false,index:index })
                    }
                    style={{ backgroundColor: "#fff" }}
                    >
                   
                    <Image
                      source={{ uri: item.url }}
                      style={{
                        height: 90,
                        width: 90,
                        margin: 3,
                        borderRadius: 10,
              
              
                      }}
                      PlaceholderContent={<ActivityIndicator />}
              placeholderStyle={{backgroundColor:'#fff'}}

                    ></Image>
                   
                    </TouchableOpacity>
                  </View>
                )}
              />
              
              <View
                style={{
                  margin: 10,
                  borderBottomColor: "#EAEAEA",
                  borderBottomWidth: 0.8,
                }}
              />
             
              {
                photos.length>8?
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ViewAll", {
                        viewType: "viewall_images",
                        photos: photos,
                        title:'Images Posted'
                      })
                      // navigation.navigate('ViewFullScreenImagesScreen', { photos: photos })
                    }
                    style={{ backgroundColor: "#fff" }}
                  >
                     <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        margin: 10,
                      }}
                    >
                      {I18n.t("View All")}
                    </Text>
                  </TouchableOpacity> :
              <></>
                }
            </View>
          </View>
        </View>
            :<></>
        }
 


        {/* Posts */}
        <View style={{backgroundColor:'#f2f2f2'}}>
     
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold", padding: 15 }}>
              {I18n.t("Spaarks Timeline")}
            </Text>
            {/* <Text style={{fontSize:10,padding: 15,paddingBottom:0,paddingTop:0,color:'#7B8794'}}>JOINED </Text>
            <Text style={{ padding: 15,paddingTop:0,color:'#7B8794'}}>
              
           {posts && posts.length>0? 
           moment(posts[0].createdAt).format('ll')
           :<></>}
            </Text> */}
          </View>
          
        {/* temp slider */}
          <FlatList
                        data={posts}
                        keyExtractor={(item, index) => item.index}
                        renderItem={renderPostCard}
                      />
        </View>
      </View>

   :   <View style={{ backgroundColor: "#fff", height: Dimensions.get('window').height }}>
                          <View>
                            <View>
                              <View style={{ flexDirection: "row", marginTop: 0 }}>
                                <View style={{ color: "#000", flex: 13, height: 60,justifyContent:"center",alignItems:"center", top: 30 }}>
                                  <Image source={require('../assets/icons/login_continue.png')} style={{ height: 150, width: 150,top:30 }}
                                    PlaceholderContent={<ActivityIndicator />}
              placeholderStyle={{backgroundColor:'#fff'}}
              ></Image>
                                </View>
                              </View>
                              <View style={{ flexDirection: "row", marginTop: 0 }}>
                                <View style={{ color: "#000", flex: 13, height: 130, justifyContent:"center",alignItems:"center" }}>

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

      
    </ScrollView>
    </KeyboardAvoidingView>
 
 
 
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

const styles = StyleSheet.create({
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
    // color: '#6FA4E9'
  },
  // chipTexts: {
  //   // color: "#000",
  //   color: '#6FA4E9'
  // },
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
  },
  eachText: {
    padding: 10,
  },
  HeadingTitle: {
    fontSize: 30,
    marginBottom: 10,
    marginTop: 50,
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
    height: 60,
    width: 40,
    margin: 15,
  },
  chatss: {
    height: 50,
    width: 60,
    margin: 20,
  },
  eachCard: {
    padding: 0,
    backgroundColor: "#fff",
    marginBottom: 10,
    marginTop: 4,
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
  bgimage: {
    resizeMode: "repeat",
    justifyContent: "center",
  },
  rows2: {
    flex: 0,
    flexDirection: "row",
  },
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
    backgroundColor: '#6FA4E9',
    color: "#fff"
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


// (Chats)
// connect(mapStatetoProps)(Chats)
const mapStatetoProps = (state) => {
  return {
    profilePic: state.chatss.profilePic,
    token: state.chatss.token,
    name:state.chatss.name,
    userId:state.chatss.userId,
    jid_main:state.chatss.jid_main,
    chat_password:state.chatss.chat_password,
    phone:state.chatss.phone,
    userId:state.chatss.userId,
    isConnected:state.chatss.isConnected
    
  };
};

export default connect(mapStatetoProps)(UserProfileScreen);


