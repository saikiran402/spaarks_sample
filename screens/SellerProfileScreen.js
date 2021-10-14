import React, { useEffect, setState, useRef,useState } from "react";
import {
  View,
  Text,
  Share,
  ActivityIndicator,

  Image,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import {
  Button
} from "react-native-paper";
import I18n from '../src/i18n';

import Hyperlink from 'react-native-hyperlink'
import RNUrlPreview from 'react-native-url-preview';
import ViewShot from "react-native-view-shot";
import ScreenBrightness from 'react-native-screen-brightness';
// import Snackbar from 'react-native-snackbar';
// import QRCode frcdom 'react-native-qrcode-svg';
import { connect, useDispatch, useReducer } from "react-redux";
import Snackbar from 'react-native-snackbar';

import chatReducers from "../reducers/chatReducers";
import Carousel from 'react-native-snap-carousel';
import { ListItem, Alert } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { act } from "react-test-renderer";
import { Rating, AirbnbRating, Divider } from "react-native-elements";
import moment from "moment";
import { Chip, Card, Title, Paragraph, Avatar } from "react-native-paper";
import Modal from 'react-native-modal';
import RBSheet from "react-native-raw-bottom-sheet";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import QRCode from 'react-native-qrcode-generator';
import Video from 'react-native-video';
import PostCard from "../components/PostCard";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const RightContent = (props) => <Text style={{ color: "#000" }}>15:20</Text>;
const GLOBAL = require('../Globals');
const list = [
  {
    name: "Amy Farha",
    avatar_url: "../assets/profilepic.png",
    subtitle: "Vice President",
    index: 1,
  },
  {
    name: "Chris Jackson",
    avatar_url: "../assets/profilepic.png",
    subtitle: "Vice Chairman",
    index: 2,
  },
  {
    name: "Amy Farha",
    avatar_url: "../assets/profilepic.png",
    subtitle: "Vice President",
    index: 3,
  },
  {
    name: "Chris Jackson",
    avatar_url: "../assets/profilepic.png",
    subtitle: "Vice Chairman",
    index: 4,
  },
  {
    name: "Amy Farha",
    avatar_url: "../assets/profilepic.png",
    subtitle: "Vice President",
    index: 5,
  },
  {
    name: "Chris Jackson",
    avatar_url: "../assets/profilepic.png",
    subtitle: "Vice Chairman",
    index: 6,
  },
  {
    name: "Amy Farha",
    avatar_url: "../assets/profilepic.png",
    subtitle: "Vice President",
    index: 7,
  },
  {
    name: "Chris Jackson",
    avatar_url: "../assets/profilepic.png",
    subtitle: "Vice Chairman",
    index: 8,
  },
];



const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const SellerProfileScreen = ({ navigation, route,userId,token,allMapPosts }) => {
  const [saveVisibility,setSaveVisibility] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);

  const [bookmark, setBookmark]=useState(false)

  const Chatdispatcher = useDispatch(chatReducers);
  const toggleModal = () => {
    ScreenBrightness.setBrightness(0.2);
    setModalVisible(!isModalVisible);
  };

  async function handleOutgoingCall (call,navigation,item){

  if(token!=null){
          navigation.navigate('OutGoingCallScreen',{aid:call,name:item.uservisibility.name,profilePic:item.uservisibility.profilePic})
  }else{
    Login.current.open()
  }

}

async function onbookmark(){
  var jwt = await AsyncStorage.getItem('token');
  if(String(jwt)!="null"){
  if(bookmark){
    setBookmark(false)
    Snackbar.show({
      text: I18n.t('Bookmarked removed'),
      duration: Snackbar.LENGTH_LONG
    });

          await axios.post(
            GLOBAL.BASE_URL + "user/removebookmark/user",
            {
              userId: route.params.userId,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization:
                'Bearer '+jwt
              },
            }
          )
            .then((responseJson) => {
            
              console.log('On removed profile bookmarked', responseJson.data.message)
              // setBookmark(true)
            })
            .catch((error) => {
              console.error(error);
            });
  }else{
      setBookmark(true)
      Snackbar.show({
        text: I18n.t('Bookmarked succesfully'),
        duration: Snackbar.LENGTH_LONG
      });

        await axios.post(
          GLOBAL.BASE_URL + "user/bookmark/user",
          {
            userId: route.params.userId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
              'Bearer '+jwt
            },
          }
        )
          .then((responseJson) => {
          
            console.log('On profile bookmarked', responseJson.data.message)
            // setBookmark(true)
          })
          .catch((error) => {
            console.error(error);
          });
        }
      } else {
        Login.current.open();
      }
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


const renderPostCard = ({ item, index }) =>{
  return(
    <PostCard 
    item={item} 
    index={index} 
    banners={[]} 
    navigation={navigation}/>
  )
}


const WhatsAppShare = async (post) => {
  try {
    console.log('---------------------')
    console.log(post)
    console.log(post.questionNo)
    console.log('---------------------')
    if (post.questionNo == '1') {
      if(post.tags.length>0){
        var a = `${post.tags[0].name}\n${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
        *Connect*  to your local area wherever you go.`;
      }else{
        var a = `*Announcement* \n${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app\n*Connect*  to your local area wherever you go.`;
      }

    }

    if (post.questionNo == '2') {
      var a = `${post.tags[0].name}\n${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
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
      var a = `${post.tags[0].name}\n*Content:*${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
      *Connect*  to your local area wherever you go.`;
    }

    if (post.questionNo == 'Find a Job') {
      var a = `*JOB*${post.tags[0].name}\n*Content:*${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
      *Connect*  to your local area wherever you go.`;
    }



    let url = "whatsapp://send?text=" + a;
    Linking.openURL(url)
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
  async function clickedChat(l) {
    var found =false;
if(token!=null){
  chat_roster_main.forEach(list=>{
    console.log('sdsdsd',list.jid,l.jid)
    if(list.jid == l.jid){
        found = true;
    }
  })

  if(found){
    navigation.navigate("ChatSpecificScreen", {
      name: l.uservisibility.name.substr(0, 15),
      profilePic: l.uservisibility.profilePic,
      jid: l.jid,
      xmpp: null,
      messages: [],
      media: []
    });
  }else{
    console.log({
      mjid:1,
      jid:l.jid,
      featureName:l.featureName,
      name:l.uservisibility.name,
      profilePic:l.uservisibility.profilePic
     })
     console.log(GLOBAL.BASE_URL+'user/addtoroster')
   await axios.post(GLOBAL.BASE_URL+'user/addtoroster',
   {
    mjid:1,
    jid:l.jid,
    featureName:l.featureName,
    name:l.uservisibility.name,
    profilePic:l.uservisibility.profilePic
   },
   {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              token
          },
    }).then((resp)=>{
      // alert('Success')
      console.log('resprespresp',resp.data)
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
          name: l.uservisibility.name,
          avatar:l.uservisibility.profilePic
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
        connection:[l.featureName],
        jid: l.jid,
        name: l.uservisibility.name,
        message:`Click to send Message`,
        messages:[],
        offline_count: 0,
        profilePic: l.uservisibility.profilePic,
        userId: l.uservisibility._id,
        updatedAt: Date.now(),
      };
        eachuser.messages.push(mymes);
        
      Chatdispatcher({
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
      navigation.navigate("ChatSpecificScreen", {
        name: l.uservisibility.name.substr(0, 15),
        profilePic: l.uservisibility.profilePic,
        jid: l.jid,
        xmpp: null,
        messages: [],
        media: []
      });
    }).catch((err)=>{
      alert('Error')
      console.log('Error',err)
    })
    
  }

  // return (<LoginToAccessScreen></LoginToAccessScreen>)
} else {
  Login.current.open();
}


}


async  function selectedPostMap(post,type){
  allMapPosts.splice(0, 0, post);
  const key = '_id';
  const arrayUniqueByKey = [...new Map(allMapPosts.map(item =>
    [item[key], item])).values()]
  Chatdispatcher({type:'SETSHOWNOW',allMapPosts:arrayUniqueByKey})
  navigation.navigate("MapScreen")
  // if(type=="within"){
    
  // }else{
  //     allMapPosts.splice(0, 0, post);
  //     Chatdispatcher({type:'SETSHOWNOW',allMapPosts:allMapPosts})
  //     navigation.navigate("MapScreen")
  // }
    
}


function onLogin(phone) {
  Login.current.close();
  navigation.navigate('VerifyOtpScreen', { phone: phone })
}
  const refRBSheet = useRef();
  const deleteMyPost = useRef();
  const refRBSheets = useRef();
  const refRBSheetss = useRef();
  const Login = useRef();
  const onShare = async (post) => {
    try {
//       const result = await Share.share({
//   //       message: `Name:${ProfileState.currentprofile.name.substr(0,15)} \nHi there checkout my seller reviews and rating at spaarks I offer different services in my neighbourhood 
//   // \nTake sometime to checkout my profile at Spaarks \nhttps://spaarks.me/market/${ProfileState.currentprofile._id}\nFor every Seller/Service Provider and every Buyer. Spaarks app.\nDownload Spaarks app - https://cutt.ly/Spaarks-app`,
//   message: `Name:${ProfileState.currentprofile.name.substr(0,15)} \n\nProfile: https://www.spaarks.me/market/${ProfileState.currentprofile._id} \n\nDownload Spaarks App:https://cutt.ly/Spaarks-app \n\nApna Business promote karein. Market Profile banayein.`,


// });
var a = `*Name*: ${ProfileState.currentprofile.name.substr(0,15)} \n\n*Profile*: https://www.spaarks.me/market/${ProfileState.currentprofile._id} \n\n*Download Spaarks App*:https://cutt.ly/Spaarks-app \n\n*Apna Business promote karein. Market Profile banayein*.`;
let url = "whatsapp://send?text=" + a;
Linking.openURL(url)
// Linking.openURL(url)
//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // shared with activity type of result.activityType
//         } else {
//           // shared
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // dismissed
//       }
    } catch (error) {
      alert(error.message);
    }
  };


  async function onChangeNumber(){

  }              
  const viewShotRef = useRef();
  const [extraThings, setExtraThings] = useState(true)
  async function showQrCode(id){
    ScreenBrightness.setBrightness(1);
    toggleModal()
    // alert(  <QRCode
    //   value={id}
    //   size={90}
    //   bgColor='black'
    //   style={{padding:15}}
    //   fgColor='white'/> )

  }

  async function onLike(i,type){
                
    var jwt = await AsyncStorage.getItem('token');
    if(String(jwt)!="null"){
  console.log(ProfileState.currentprofile.posts[i])
  console.log(GLOBAL.BASE_URL+ProfileState.currentprofile.posts[i].featureName+'/post/'+ProfileState.currentprofile.posts[i]._id+'/like')
      await axios.get(GLOBAL.BASE_URL+ProfileState.currentprofile.posts[i].featureName+'/post/'+ProfileState.currentprofile.posts[i]._id+'/like',{
                    headers: {
                      "Content-Type": "application/json",
                      Authorization:
                        token
                    }
      }).then((resp)=>{
        alert(resp.data.message)
        if(ProfileState.currentprofile.posts[i].Iliked){
          ProfileState.currentprofile.posts[i].Iliked = false;
          var ndsw = ProfileState.currentprofile.posts[i].likes.filter((list)=>{return list != 'userIID'})
          ProfileState.currentprofile.posts[i].likes = ndsw;

        }else{
          ProfileState.currentprofile.posts[i].Iliked = true;
          ProfileState.currentprofile.posts[i].likes.push('userIID')
        }
        // setCurrentProfile([...ProfileState.currentprofile]);
        // setDataSourceWithin([...ProfileState.currentprofile.posts])
        dispatch({
          type: "SETCURRENTPROFILE",
          currentprofile: ProfileState.currentprofile,
        });
      }).catch((err)=>{
        alert('err')
      })
      // if(dataSourceWithin[i].Iliked){
      //   dataSourceWithin[i].Iliked = false;
      //   var ndsw = dataSourceWithin[i].likes.filter((list)=>{return list != 'userIID'})
      //   dataSourceWithin[i].likes = ndsw;
      // }else{
      //   dataSourceWithin[i].Iliked = true;
      //   dataSourceWithin[i].likes.push('userIID')
      // }
      // setDataSourceWithin([...dataSourceWithin])
    }else{
      Login.current.open()
    }

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
          resizeMode: "cover",}}></Image>
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
  const initialState = {
    isLoading: true,
    profile: [],
    currentprofile: [],
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const [profile, setProfile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentprofile, setCurrentProfile] = React.useState(null);

  const ProfileReducer = (prevState, action) => {
    switch (action.type) {
      case "SETPROFILE":
        return {
          ...prevState,
          profile: action.profile,
          currentprofile: action.profile[0],
          isLoading: false,
        };
      case "SETCURRENTPROFILE":
        return {
          ...prevState,
          currentprofile: action.currentprofile,
          isLoading: false,
        };
    }
  };

  async function showSaveButton(){
    setSaveVisibility(true)
  }

  async function saveAboutMe(){
    //aboutcategory
    axios.post(GLOBAL.BASE_URL+'market/aboutcategory',{
      subCategory:ProfileState.currentprofile.subCategory,
      content:onChangeAbout
    },
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization':token
      }
    }).then((resp)=>{
      console.log(resp.data)
    })
    profile.forEach(list=>{
      if(list._id == ProfileState.currentprofile._id){
        list.about = onChangeAbout;
      }
    })
    dispatch({ type: "SETPROFILE",profile:profile });
    // onChangeAbout 
    setSaveVisibility(false)
  }

  const [ProfileState, dispatch] = React.useReducer(
    ProfileReducer,
    initialState
  );



  const [onChangeAbout,setOnChangeAbout] = useState(null)
  async function getSellerData() {
    var isPartners = await AsyncStorage.getItem('isPartner');
    setIsPartner(isPartners)
    try {
      var jwt = await AsyncStorage.getItem('token');
      var a = await axios.post(
        GLOBAL.BASE_URL+"market/othersRatings/" +
          route.params.userId,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
              'Bearer '+jwt
            },
          },
        {}
      );
      console.log('1')
      setBookmark(a.data.bookmarked)
      console.log('SPSPSPPSPSPOOOOOsss',a.data)
      if(a.data.finalData.active.length>0){
        console.log(a.data.finalData.active[0]);
        var fina = a.data.finalData.active.reverse()
        dispatch({ type: "SETPROFILE", profile: fina });
        setProfile(fina);
        setCurrentProfile(fina[0]);
        setOnChangeAbout(fina[0].about)
        console.log("Current", fina[0]);
        setIsLoading(false);
      }else{
        Snackbar.show({
          text: I18n.t('Market profile get created when spaarks are posted in market category'),
          duration: 3000,
          // action: {
          //   text: 'UNDO',
          //   textColor: 'white',
          //   onPress: () => { /* Do something. */ },
          // },
        });
        setTimeout(() => {
          navigation.goBack()
        }, 3000);
       
      }
      
    } catch (err) {}
  }

 

  async function setCurrentProfileStatus(index) {

    if(saveVisibility){
      if(ProfileState.currentprofile.about != onChangeAbout){
        alert('Are you sure you want to discard changes')
      }else{
        alert('Save your changes to continue')
      }
    }else{
      console.log(ProfileState.profile[index])
      console.log("Im in", index, ProfileState.profile[index].rating);
    dispatch({
      type: "SETCURRENTPROFILE",
      currentprofile: ProfileState.profile[index],
    });
    setCurrentProfile(ProfileState.profile[index]);
    setOnChangeAbout(ProfileState.profile[index].about)
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
const [isPartner,setIsPartner] = useState(false)
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

  useEffect(() => {
    getSellerData();
  }, []);

  if (ProfileState.isLoading) {
    return (
      <View style={styles.eachCards}>
        <SkeletonPlaceholder>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 60,
                height: 60,
                padding: 50,
                marginLeft: 130,
                marginTop: 20,
                borderRadius: 50,
              }}
            ></View>
          </View>
          <View>
            <View
              style={{
                marginTop: 10,
                width: 170,
                marginLeft: 100,
                height: 20,
                borderRadius: 4,
              }}
            />
            <View
              style={{
                marginTop: 10,
                width: 170,
                marginLeft: 100,
                height: 20,
                borderRadius: 4,
              }}
            />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 70,
                  height: 70,
                  padding: 50,
                  marginLeft: 20,
                  marginTop: 20,
                  borderRadius: 20,
                }}
              ></View>
              <View
                style={{
                  width: 70,
                  height: 70,
                  padding: 50,
                  marginLeft: 20,
                  marginTop: 20,
                  borderRadius: 20,
                }}
              ></View>
              <View
                style={{
                  width: 70,
                  height: 70,
                  padding: 50,
                  marginLeft: 20,
                  marginTop: 20,
                  borderRadius: 20,
                }}
              ></View>
            </View>
            {/* <View
           style={{ width: 350, height: 20, borderRadius: 4, marginTop: 10 }}
         />
 
         <View
           style={{ marginTop: 6, width: 170, height: 20, borderRadius: 4 }}
         />
         <View
           style={{ width: 350, height: 20, borderRadius: 4, marginTop: 5 }}
         />
         <View
           style={{ width: 350, height: 120, borderRadius: 4, marginTop: 5 }}
         /> */}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
            <View style={{ marginLeft: 20 }}>
              <View style={{ width: 120, height: 20, borderRadius: 4 }} />
              <View
                style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
              />
            </View>
          </View>
          <View>
            <View
              style={{ width: 350, height: 20, borderRadius: 4, marginTop: 10 }}
            />

            <View
              style={{ marginTop: 6, width: 170, height: 20, borderRadius: 4 }}
            />
            <View
              style={{ width: 350, height: 20, borderRadius: 4, marginTop: 5 }}
            />
            <View
              style={{ width: 350, height: 120, borderRadius: 4, marginTop: 5 }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
            <View style={{ marginLeft: 20 }}>
              <View style={{ width: 120, height: 20, borderRadius: 4 }} />
              <View
                style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
              />
            </View>
          </View>
          <View>
            <View
              style={{ width: 350, height: 20, borderRadius: 4, marginTop: 10 }}
            />

            <View
              style={{ marginTop: 6, width: 170, height: 20, borderRadius: 4 }}
            />
            <View
              style={{ width: 350, height: 20, borderRadius: 4, marginTop: 5 }}
            />
            <View
              style={{ width: 350, height: 120, borderRadius: 4, marginTop: 5 }}
            />
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  }

  return (
    <ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={480}
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
                    source={require("../assets/icons/pro1.png")}
                    style={{ height: 50, width: 50 }}
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
                    FAQ
                  </Text>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 14,
                      flex: 70,
                      paddingLeft: 40,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image
                    source={require("../assets/icons/pro2.png")}
                    style={{ height: 50, width: 50 }}
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
                    Help
                  </Text>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 14,
                      flex: 70,
                      paddingLeft: 40,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image
                    source={require("../assets/icons/pro3.png")}
                    style={{ height: 50, width: 50 }}
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
                    Connect With Us
                  </Text>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 14,
                      flex: 70,
                      paddingLeft: 40,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image
                    source={require("../assets/icons/pro4.png")}
                    style={{ height: 50, width: 50 }}
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
                    Terms & Policies
                  </Text>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 14,
                      flex: 70,
                      paddingLeft: 40,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image
                    source={require("../assets/icons/pro5.png")}
                    style={{ height: 50, width: 50 }}
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
                    Settings
                  </Text>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 14,
                      flex: 70,
                      paddingLeft: 40,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                  {/* line */}
                </View>
              </View>
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
                                <View style={{ color: "#000", flex: 13, height: 60,justifyContent:"center", alignItems:'center', top: 30}}>
                                  <Image source={require('../assets/icons/login_continue.png')} style={{ height: 150, width: 150,  }}></Image>
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
                      {/* Spaarks Call disabled */}
                      <RBSheet
                        ref={refRBSheets}
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
                                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                                  <Image
                                    source={require("../assets/bottomCard/call_message.png")}
                                    style={{ height: 100, width: 100 }}
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
                                    Owner of this Spaark disabled Call option.
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
                                    Note : You can also disable call
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
                                    while posting a spaark.
                                </Text>
                                </View>
                                <View style={{ flex: 3 }}></View>
                              </View>
                            </View>
                          </View>
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
                                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                                  <Image
                                    source={require("../assets/bottomCard/chat_message.png")}
                                    style={{ height: 100, width: 100 }}
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
                                    Owner of this Spaark disabled Chat option.
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
                                    Note : You can also disable chat
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
                                    while posting a spaark
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
                      {I18n.t("Delete Spaark")}
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
      
      <Modal isVisible={isModalVisible} style={{height:50}} onBackdropPress={toggleModal}>
        <View style={{flex: 0,backgroundColor:'#fff',justifyContent:'center',borderRadius:30}}>
          <Text style={{textAlign:'center',color:'grey'}}>QR</Text>
          <View
                              style={{
                               margin:10,
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 0.7,
                              }}
                            />
          <Image source={{uri:ProfileState.currentprofile.profilePic}} style={{height:70,width:70,borderRadius:30,justifyContent:'center',left:150,paddingTop:10}}/>
                              <View>
                                <View style={{backgroundColor:'#F30E5C',padding:10,borderRadius:10,marginLeft:140,marginRight:110,marginTop:10}}>
                                  <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>{ProfileState.currentprofile.subCategory}</Text>
                                </View>
                              </View>
        <View style={{justifyContent:'center',marginLeft:90,marginTop:20}}>
        <QRCode
          value={ProfileState.currentprofile._id}
          size={190}
          bgColor='black'
          style={{padding:0}}
          fgColor='white'/> 
        </View>
        <View style={{marginTop:10}}>
        <Text style={{textAlign:'center'}}>{I18n.t("Based upon your submission of status of your work for the seeker, we would be approaching seeker for the rating of your work")}</Text>
 
        </View>
      
          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>
    
    
    
      <View style={{ flexDirection: "column", backgroundColor: "#f2f2f2" }}>
        {/* User Data */}
        <View style={{ flexDirection: "column", backgroundColor: "#6FA4E9" }}>
          

                       
          {
            bookmark?
            <TouchableOpacity onPress={()=>onbookmark()}>
            <View>
            <Image
            source={require("../assets/icons/book.png")} 
            style={{height:30,width: 19,marginLeft: 355,marginTop: 10, index: -1}}/>
            </View>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=>onbookmark()}>
            <View>
            <Image
            source={require("../assets/icons/profilebookmark.png")} 
            style={{height:30,width: 20,marginLeft: 355,marginTop: 10, index: -1}}/>
            </View>
            </TouchableOpacity>
          }


          <View style={{ flexDirection: "row", color: "#000" }}>
            <View style={{ flex: 10, marginLeft: 20 }}></View>
            <View style={{ flex: 1 }}>
      
            </View>
          </View>
          <View
            style={{
              flex: 0,
              color: "#000",
              justifyContent: "center",
              textAlign: "center",
              alignItems:"center"
              
            }}
          >
            <Image
              source={{ uri: ProfileState.currentprofile.profilePic }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 30,
                
                marginTop:10
              }}
            ></Image>


          </View>
           

          <View style={{ flex: 0, color: "#000",   justifyContent: "center",
              textAlign: "center",
              alignItems:"center" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                textAlign: "center",
                margin: 20,
                color: "#fff",
              }}
            >
              {ProfileState.currentprofile.name.charAt(0).toUpperCase() +
                ProfileState.currentprofile.name.substr(1,15)}
            </Text>
       
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
            {/* temporary */}


           

            <View style={{ flexDirection: "row" }}>
              <View>
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  
                  }}
                >
                  {I18n.t("Seller")} |{" "}
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => onShare("Name")}>
                  <Image
                    source={require("../assets/icons/share.png")}
                    style={{ height: 20, width: 20, left: 6 }}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
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
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, paddingLeft: 20 }}></View>
              <View style={{ flex: 1, paddingLeft: 20 }}>
                <View
                  style={{
                    flexDirection: "column",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    {ProfileState.currentprofile.rating == "0.0"
                      // ? "N/A"
                      ? "-"
                      : ProfileState.currentprofile.rating}
                  </Text>
                  <Text style={{ color: "#fff" }}>{I18n.t("Rating")}</Text>
                </View>
              </View>
              <View style={{ flex: 2 }}>
                <Rating
                  fractions="1"
                  ratingColor="#000"
                  tintColor="#6FA4E9"
                  startingValue={ProfileState.currentprofile.rating}
                  imageSize={22}
                  style={{
                    marginTop: 0,
                    backgroundColor: "#6FA4E9",
                    marginRight: 15,
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "column",
                    textAlign: "center",
                    justifyContent: "center",
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    {ProfileState.currentprofile.count == 0
                      // ? "N/A"
                      ? "-"
                      : ProfileState.currentprofile.count}
                  </Text>
                  <Text style={{ color: "#fff" }}>{I18n.t("Reviews")}</Text>
                </View>
              </View>
              <View style={{ flex: 1, paddingLeft: 20 }}></View>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: '#f2f2f2' }}>
                    
                    <Carousel
                  ref={(c) => { _carousel = c; }}
                  data={isPartner == "true"? selected: notSelected}
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
        <View
          style={{
            margin: 0,
            borderBottomColor: "#EAEAEA",
            borderBottomWidth: 1,
          }}
        />
     
        {/* services offered */}
        <View>
          <View style={{ flexDirection: "column" }}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  padding: 15,
                  textAlign: "left",
                }}
              >
                {I18n.t("Services offered")}
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ paddingLeft: 5, flexDirection: "row" }}>
                {ProfileState.profile.length &&
                  ProfileState.profile.map((l, i) => (
                    <TouchableOpacity
                      onPress={() => 
                        setCurrentProfileStatus(i)
                      // console.log("thisdaattaaaaaaa",l.subCategoryId)
                      }
                    >
             
                      
                        <View
                        style={{
                          borderColor:ProfileState.currentprofile._id == l._id?'#6FA4E9':'#fff',
                          borderWidth:4,
                          borderRadius:13,
                          margin:2,
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                        }}
                      >

                        <View
                          style={{
                            flexDirection: "column",
                            borderColor: "#6FA4E9",
                            borderWidth: 0,
                            borderRadius: 15,
                          }}
                        >
                          
                          <View>
                            {
                                
                              l.subCategoryId != 'undefined' && l.subCategoryId != ''?
                            <Image
                              source={{ uri: `https://staging-api.ososweb.com/images/category/${l.subCategoryId.toLowerCase()}.png` }}
                            //  source={require('../assets/categories_images/' )}
                              style={{
                                height: 100,
                                width: 150,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                              }}
                            ></Image>:
                            l.categoryId != 'undefined' && l.subCategoryId != ''?
                            <Image
                            source={{ uri: `https://staging-api.ososweb.com/images/category/${l.categoryId.toLowerCase()}.png` }}
                              style={{
                                height: 100,
                                width: 150,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                              }}
                            ></Image>:
                            <Image
                            source={require('../assets/seller.png')}
                              style={{
                                height: 100,
                                width: 150,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                              }}
                            ></Image>
                        }
                            <View
                              style={{
                                flex: 0,
                                backgroundColor: "#f8f9fb",
                                borderRadius: 10,
                                position: "absolute",
                                margin: 10,
                              }}
                            >
                              <Text
                                style={{
                                  margin: 0,
                                  marginBottom: 5,
                                  fontWeight: "bold",
                                }}
                              >
                                {" "}
                                {/* {l.rating == "0.0" ? "N/A" : l.rating}{" "} */}
                                {l.rating == "0.0" ? "-" : l.rating}{" "}
                                <Image
                                  source={require("../assets/icons/ratings.png")}
                                  style={{ height: 15, width: 10 }}
                                ></Image>{" "}
                              </Text>
                            </View>
                          </View>
                          <View style={{ backgroundColor: "#fff" }}>
                            <Title>
                              {" "}
                              <Text style={{ fontSize: 15,fontWeight:'bold' }}>
                                {
                                   l.subCategoryId == 'undefined' || l.subCategoryId == ''?
                                   I18n.t("Seller"):
                                   I18n.t(l.subCategory)
                                }
                        
                              </Text>{" "}
                            </Title>
                            <Paragraph style={{ fontSize: 12,marginLeft:8 }}>
                            {l.posts.length} {I18n.t("Spaarks")}
                            {/* {l.categoryId}-{l.subCategoryId} */}
                            </Paragraph>
                          </View>
                        </View>
                      </View>
                      {
             ProfileState.currentprofile._id == l._id?
             <View>
                      <Text style={{textAlign:'center',fontWeight:'900'}}>^</Text>
                                </View>
                                :
                               <></>
}
                    </TouchableOpacity>
                    
                  ))}
              </View>
            </ScrollView>
          </View>
        </View>



                                
        {/* Images Posted */}
{
  ProfileState.currentprofile.userId == userId?
          <View
          style={{
            marginTop: 0,
            backgroundColor: "#fff",
            borderRadius: 8,
            margin: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", width: 310, borderRadius: 8 }}
          >
            <View
              style={{
                flex: 7,
                backgroundColor: "#fff",
                borderRadius: 8,
              }}
            >
              <Image
                source={require("../assets/icons/noti_web.png")}
                style={{
                  height: 75,
                  width: 75,
                  padding: 10,
                  borderRadius: 30,
                  margin: 10,
                }}
                cache="force-cache"
              ></Image>
              
      
            </View>
            <View style={{ flex: 12 }}>
            
              <Text
                style={{ margin: 10, color: "#7B8794", flexShrink: 1 }}
              >
              {I18n.t("take1")}
              </Text>
            </View>
                  <View style={{ flex: 5 }}>
                    <TouchableOpacity onPress={()=>showQrCode(ProfileState.currentprofile._id)}>
                    <Text style={{color:'#6FA4E9',fontWeight:'bold',padding:10,marginTop:15}}>{I18n.t("Show QR")}</Text>
                    </TouchableOpacity>

                            </View>    
          </View>
    </View>
    :
    <></>
  
}

        {ProfileState.currentprofile.about.trim().length > 0 || ProfileState.currentprofile.userId == userId ? (
          <View style={{ margin: 10 }}>
            <View style={{ flexDirection: "column" }}>
              <View style={{flexDirection:'row'}}>
              <View>
                <Text style={{ fontSize: 20, fontWeight: "bold", padding: 15 }}>
                  {I18n.t("About Service")}
                </Text>
              </View>
          <TouchableOpacity onPress={()=>showSaveButton()}>
                        <View>
                        {
                  ProfileState.currentprofile.userId == userId ?
                    <Image
                    // source={{ uri: posts[0].uservisibility.profilePic }}
                    source={require('../assets/edit.png')}
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 30,
                      marginTop:10,
                      zIndex:0,
                      marginLeft: 0,
                    }}
                  ></Image>:<></>
                }
                  </View>
                  </TouchableOpacity>
 
              </View>
{


   ProfileState.currentprofile.userId == userId ?
<View style={{ backgroundColor: "#fff", padding: 15 }}>

   <TextInput
        style={{ borderWidth: 0}}
        multiline={true}
        maxLength={250}
        spellCheck={true}
        dataDetectorTypes="all"
        placeholder={I18n.t("Describe your service here")}
        onChangeText={setOnChangeAbout}
        value={onChangeAbout}
        editable={saveVisibility?true:false}
        selectTextOnFocus={saveVisibility?true:false}
        // placeholder="useless placeholder"
      />
      </View>
      :<View style={{ backgroundColor: "#fff", padding: 15 }}>
      <Text>{ProfileState.currentprofile.about.trim()} </Text>
    </View>

    

    
}


<View>
{
  saveVisibility?
  <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
  <View style={{backgroundColor:'#6FA4E9',alignItems:'center',width:90,borderRadius:10}}>
  <Text style={{color:'#fff',padding:5,maginTop:90}} onPress={()=>saveAboutMe()}>{I18n.t("Save")}</Text>
  </View>
  </View>
:<></>
}
</View>
              {/* <View style={{ backgroundColor: "#fff", padding: 15 }}>
                <Text>{ProfileState.currentprofile.about.trim()} </Text>
              </View> */}
            </View>
          </View>
        ) : (
          <></>
        )}
        {ProfileState.currentprofile.photos.length > 0 ? (
          <View style={{ margin: 10 }}>
            <View style={{ flexDirection: "column" }}>
              <View>
                <Text style={{ fontSize: 20, fontWeight: "bold", padding: 15 }}>
                  {I18n.t("Service Images")}
                </Text>
              </View>
              {/* {
            ProfileState.currentprofile.photos.length > 0 ?   */}
             
                <View style={{ backgroundColor: "#fff" }}>
                  <FlatList
                    style={{ margin: 5 }}
                    numColumns={4} // set number of columns
                    columnWrapperStyle={styles.row} // space them out evenly
                    data={ProfileState.currentprofile.photos.length > 8?ProfileState.currentprofile.photos.slice(0,8):ProfileState.currentprofile.photos}
                    keyExtractor={(item, index) => item.index}
                    renderItem={({ item,index }) => (
                      <View>
                        {/* how will it work here? */}
                         <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('ViewFullScreenImagesScreen', { photos: ProfileState.currentprofile.photos.length>8?ProfileState.currentprofile.photos.slice(0,8):ProfileState.currentprofile.photos, showHeader: false,index:index })
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

                  {/* <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      margin: 10,
                    }}
                  > */}
                    {/* {ProfileState.currentprofile.photos.length > 8
                      ? "View All"
                      :<></>
                    } */}
                    {
                ProfileState.currentprofile.photos.length >8?
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ViewAll", {
                        viewType: "viewall_images",
                        photos: ProfileState.currentprofile.photos,
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
                      View All
                    </Text>
                  </TouchableOpacity> :
              <></>
                }

{ProfileState.currentprofile.photos.length == 0
                      ? "No Images to preview far"
                      :<></>
                    }


                  {/* </Text> */}
                </View>
              {/* // </TouchableOpacity> */}
              {/* //       :<Text>No Images Posted</Text>
            // } */}
            </View>
          </View>
        ) : (
          <></>
        )}
        {ProfileState.currentprofile.reviews.length > 0 ? (
          <View
            style={{
              backgroundColor: "#f2f2f2",
              padding: 10,
              paddingLeft: 0,
            }}
          >
            <View>
              <Text style={{ fontSize: 20, fontWeight: "bold", padding: 15 }}>
                {I18n.t("Ratings & Reviews")}
              </Text>
            </View>

            {ProfileState.currentprofile.reviews.reverse().slice(0,2).map((reviews, i) => (
              <View
                style={{
                  marginTop: 1,
                  backgroundColor: "#fff",

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
                        height: 100,
                        width: 100,
                        padding: 10,
                        borderRadius: 10,
                        margin: 10,
                      }}
                    ></Image>
                  </View>
                  <View style={{ flex: 15, marginLeft: 20,marginTop:10 }}>
                    <Text
                      h5
                      style={{ fontWeight: "bold", color: "#000",marginLeft:8 }}
                    >
                      {reviews.name}
                    </Text>
                  
                    <View style={{ flexDirection: "row" }}>
                      <View style={{flexDirection:'row',padding:5}}>
                      <Text style={{ fontWeight: "bold",marginTop:5,marginRight:10 }}>
                        {" "}
                        {reviews.rating}/5
                      </Text>
                        <Rating
                          fractions="1"
                          ratingColor="#fff"
                          tintColor="#fff"
                          readonly
                          startingValue={reviews.rating}
                          imageSize={22}
                          style={{
                            marginTop: 0,
                            backgroundColor: "#fff",
                    
                            marginLeft: 0,
                          }}
                        />
                      </View>
                    </View>
                    <Text
                      style={{
                        margin: 10,
                        marginTop: 0,
                        color: "#7B8794",
                        flexShrink: 1,
                      }}
                      numberOfLines={3}
                    >
                      {reviews.content}
                    </Text>
                  </View>
                </View>
                <Divider style={{ backgroundColor: "#C4C4C4" }} />
              </View>
            ))}

            {
              ProfileState.currentprofile.reviews.length>2?
                 <TouchableOpacity
                 onPress={() =>
                   navigation.navigate("ViewAll", {
                     viewType: "viewall_reviews",
                     title:'Ratings & Reviews',
                     reviews: ProfileState.currentprofile.reviews,
                   })
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
               </TouchableOpacity>
               :<></>
            }
          </View>
        ) : (
          <></>
        )}
        {/* Posts */}
        <View>
          <View>
            {/* <Image
              source={require("../assets/icons/show.png")}
              style={{
                height: 30,
                width: 30,
                position: "absolute",
                marginTop: 20,
              }}
          ></Image> */}
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                padding: 15,
                marginLeft: 0,
              }}
            >
              {I18n.t("Spaarks Timeline")}
            </Text>
{
  ProfileState.currentprofile.posts.length == 0?

  <Text style={{textAlign:'center'}}>{I18n.t("No Spaarks Found")}</Text>:
  <></>
}

<FlatList
                        data={ProfileState.currentprofile.posts}
                        keyExtractor={(item, index) => item.index}
                        renderItem={renderPostCard}
                      />
   
            {/* ProfileState */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStatetoProps = (state) => {
  return {
    profilePic: state.chatss.profilePic,
    token: state.chatss.token,
    name:state.chatss.name,
    userId:state.chatss.userId,
    allMapPosts:state.chatss.allMapPosts
    
  };
};

export default connect(mapStatetoProps)(SellerProfileScreen);


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
  },
  chipTexts: {
    color: "#000",
  },
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
  footer: {
    flex: 1,
    marginBottom: 10,
    textAlign: "center",
    justifyContent: "flex-end",
  },
  eachCards: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
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
