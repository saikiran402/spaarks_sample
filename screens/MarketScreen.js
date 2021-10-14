// import React, { useEffect, setState, useRef, useState } from "react";
// import { TabRouter, useTheme } from "@react-navigation/native";
// import {
//   Share,
//   Image,
//   Platform,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   RefreshControl,
//   Colors,
//   ScrollView,
//   Linking,
//   ImageBackground,
//   SafeAreaView,
//   View,
//   StyleSheet,
//   StatusBar,
//   DevSettings,
//   TextInput,
//   Alert,
//   TouchableHighlight,
// } from "react-native";
// import axios from "axios";
// import Snackbar from 'react-native-snackbar';
// import { canPost } from './authGuard'
// import chatReducers from "../reducers/chatReducers";
// import { Rating, AirbnbRating, Divider } from "react-native-elements";
// import moment from "moment";
// import { connect, useDispatch, useReducer } from "react-redux";
// // import { Video, AVPlaybackStatus } from 'expo-av';
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";
// import { Text } from "react-native-elements";
// import ImageSlider from "react-native-image-slider";
// import LoginSuccessModal from "./LoginSuccessModal";
// import AsyncStorage from "@react-native-community/async-storage";
// import * as Location from "expo-location";

// import {
//   Avatar,
//   Button,
//   Card,
//   Title,
//   Paragraph,
//   Searchbar,
// } from "react-native-paper";
// import RBSheet from "react-native-raw-bottom-sheet";
// import Carousel from 'react-native-snap-carousel';
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import ChatSpecificScreen from "./ChatSpecificScreen";
// import OnBoardingScreen from "./OnBoardingScreen";
// import { Chip } from "react-native-paper";
// import ViewShot from "react-native-view-shot";
// const Stack = createStackNavigator();
// const wait = (timeout) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, timeout);
//   });
// };
// global.postcurrent = ['0'];
// const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

// const RightContent = (props) => <Text>500m</Text>;

// const MarketScreen = ({ navigation }) => {

//   const Chatdispatcher = useDispatch(chatReducers);
//   const [extraThings, setExtraThings] = useState(true);

//   const viewShotRef = useRef();
//   const video = React.useRef(null);

//   async function captureViewShot(post) {
//     // setExtraThings(false)
//     const imageUri = await viewShotRef.current.capture();

//     await Share.share({
//       url: imageUri,
//       // message: `${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
//       // Connect to your local area wherever you go.`
//     });
//     // setExtraThings(true)
//   }



//   async function showSnackBlock() {

//     refRBSheet.current.close()
//     Snackbar.show({
//       text: 'Blocked Saikiran Succesfully',
//       duration: Snackbar.LENGTH_LONG,
//       action: {
//         text: 'UNDO',
//         textColor: 'white',
//         onPress: () => { /* Do something. */ },
//       },
//     });
//   }
//   async function blockUser() {
//     showSnackBlock()
//   }

//   const [refreshing, setRefreshing] = React.useState(false);
//   const [status, setStatus] = React.useState({});
//   const onRefresh = React.useCallback(async () => {
//     setIsLoading(true)
//     await getData();
//     wait(2000).then(() => setRefreshing(false));
//   }, []);

//   const DashboardReducer = (prevState, action) => {
//     switch (action.type) {
//       case "SETPOSTS":
//         return {
//           ...prevState,
//           posts: action.posts,
//           isLoading: false,
//         };

//       case "UPDATELOCATION":
//         return {
//           ...prevState,
//           latitude: action.latitude,
//           longitude: action.longitude,
//         };
//     }
//   };

//   const initialState = {
//     isLoading: true,
//     completed: 0,
//     pending: 0,
//     issues: 0,
//     payment: 0,
//     latitude: null,
//     longitude: null,
//     errorMsg: null,
//     userToken: null,
//     posts: [],
//   };
//   const [isLoading, setIsLoading] = React.useState(true);
//   const [longitude, setLatitude] = React.useState(null);
//   const [latitude, setLongitude] = React.useState(null);
//   const [errorMsg, setErrorMsg] = React.useState(null);
//   const [userToken, setUserToken] = React.useState(null);
//   const [posts, setPosts] = React.useState(null);
//   const [searchQuery, setSearchQuery] = React.useState("");
//   const onChangeSearch = (query) => setSearchQuery(query);
//   const [DashboardState, dispatch] = React.useReducer(
//     DashboardReducer,
//     initialState
//   );



//   async function reportUser(post) {
//     var post = DashboardState.posts[Number(global.postcurrent[0])]
//     // console.log('postpostpostpostpostpost',post)
//     await axios.post(
//       `http://103.27.86.34:3005/api/v2.0/${post.featureName}/report/post`,
//       {
//         "featureId": post._id,
//         "reason": "Info Reported"
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             GLOBAL.TOKEN,
//         },
//       }
//     ).then((resp) => {
//       showSnackReport(resp.data.message)
//     }).catch((err) => {
//       console.log(err)
//       showSnackReport('You have already reported this content')
//     })
//     // showSnackReport('You have already reported this content')
//   }

//   async function showSnackReport(reason) {
//     refRBSheet.current.close()
//     Snackbar.show({
//       text: reason,
//       duration: Snackbar.LENGTH_LONG,
//       // action: {
//       //   text: 'UNDO',
//       //   textColor: 'white',
//       //   onPress: () => { /* Do something. */ },
//       // },
//     });
//   }

//   const refRBSheet = useRef();
//   const refRBSheets = useRef();
//   const refRBSheetss = useRef();

//   function onLogin(phone, navigation) {
//     console.log("phoness", phone)
//     Login.current.close();
//     navigation.navigate('VerifyOtpScreen', { phone: phone })
//   }

//   async function onDotsClick(i) {

//     var response = await canPost()
//     console.log(response)
//     if (response) {
//       global.postcurrent[0] = String(i);
//       refRBSheet.current.open()
//     } else {
//       Login.current.open()
//     }

//   }




//   async function BottomSheet() {
//     return (
//       <View>
//         <View style={{ flexDirection: "column" }}>
//           <View style={{ flex: 1, color: "#000" }}>
//             <Text style={{ color: "#000" }}>Report Spaark</Text>
//             <Text>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//             </Text>
//           </View>
//         </View>
//       </View>
//     );
//   }
//   async function getData() {
//     try {


//       let userToken = await AsyncStorage.getItem("userToken");
//       let username = await AsyncStorage.getItem("username");

//       setUserToken(userToken);
//       var data = {
//         latitude: 17.4079,
//         longitude: 78.4437,
//         radius: 1000,
//       };
//       var a = await axios.post(
//         "http://103.27.86.34:3005/api/v2.0/market/post/static",
//         {
//           latitude: 17.4079,
//           longitude: 78.4437,
//           radius: 5000,
//           category: "all",
//         },
//         {}
//       );
//       console.log("dara", a.data.data.post);
//       dispatch({ type: "SETPOSTS", posts: a.data.data.post });
//       Chatdispatcher({ type: 'SETMAPPOSTSMARKET', marketMapPosts: a.data.data.post.slice(0, 30) })
//       setPosts(a.data.data.post.reverse());
//       setIsLoading(false);
//     } catch (e) {
//       console.log("in error", e);
//     }
//   }
//   async function sendLocation(a, b) {
//     let locationData = {
//       latitude: a,
//       longitude: b,
//     };
//     if (a != null && b != null) {
//       console.log("Server Location", locationData, DashboardState.userToken);
//       let userToken = await AsyncStorage.getItem("userToken");
//       await axios
//         .post(
//           "https://bda.ososweb.com/api/bda/updateuserlocation",
//           locationData,
//           { headers: { Authorization: "Bearer " + userToken } }
//         )
//         .then(
//           (resp) => {
//             try {
//               console.log(resp.data);
//               Alert.alert("Location Updated", "Updating the location success", [
//                 { text: "Okay" },
//               ]);
//             } catch (err) {
//               console.log(err);
//             }
//           },
//           (error) => {
//             // console.log(resp.data);
//             Alert.alert("Something Went wrong", "Updating the location", [
//               { text: "Okay" },
//             ]);
//           }
//         );
//     }
//   }
//   useEffect(() => {
//     getData();
//     const getResult = async () => {

//       let { status } = await Location.requestPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }

//       setTimeout(async () => {
//         try {
//           let location = await Location.getCurrentPositionAsync({});
//           console.log("Location in 5", location);
//           setLatitude(location.coords.latitude);
//           setLongitude(location.coords.longitude);
//         } catch (err) {
//           console.log(err);
//         }
//       }, 5000);
//     };
//   }, []);

//   let text = "Waiting..";
//   const imagess = [
//     'https://res.cloudinary.com/spaarks/image/upload/v1615808340/Screenshot_2021-03-15_at_5.08.56_PM_iurdtp.png',
//     'https://res.cloudinary.com/spaarks/image/upload/v1615808318/Screenshot_2021-03-15_at_5.08.34_PM_l2pvwt.png',
//     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
//   ];

//   if (errorMsg) {
//     text = errorMsg;
//   }
//   // if (DashboardState.isLoading) {
//   //   return (
//   //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//   //       <ActivityIndicator size="large" />
//   //     </View>
//   //   );
//   // }
//   const image1 = {
//     uri:
//       "https://res.cloudinary.com/spaarks/image/upload/v1613973414/1_c6eigo.png",
//   };
//   const image2 = {
//     uri:
//       "https://res.cloudinary.com/spaarks/image/upload/v1613973414/2_xk7z2s.png",
//   };
//   const image3 = {
//     uri:
//       "https://res.cloudinary.com/spaarks/image/upload/v1613973414/3_rz8x8b.png",
//   };
//   const image4 = {
//     uri:
//       "https://res.cloudinary.com/spaarks/image/upload/v1613973415/4_s52qvz.png",
//   };
//   const { colors } = useTheme();
//   const theme = useTheme();
//   const images = [
//     "https://placeimg.com/640/640/nature",
//     "https://placeimg.com/640/640/people",
//     "https://placeimg.com/640/640/animals",
//     "https://placeimg.com/640/640/beer",
//   ];


//   const Login = useRef();
//   function clickedChat(l) {
//     console.log("userToken", String(userToken).length);
//     if (String(userToken).length > 24) {
//       navigation.navigate("ChatSpecificScreenFinal", {
//         name: l.uservisibility.name,
//         profilePic: l.uservisibility.profilePic,
//         jid: l.jid_main,
//       });
//       // return (<LoginToAccessScreen></LoginToAccessScreen>)
//     } else {
//       Login.current.open();
//     }
//   }

//   function onCall(l) {
//     if (String(userToken).length > 24) {
//       // navigation.navigate('ChatSpecificScreenFinal',{name:l.uservisibility.name,profilePic:l.uservisibility.profilePic,jid:l.jid_main})
//       // return (<LoginToAccessScreen></LoginToAccessScreen>)
//     } else {
//       Login.current.open();
//     }
//   }
//   const HomeScreen = ({ navigation }) => {
//     return (
//       <SafeAreaView>
//         <ScrollView
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//         >
//           <RBSheet
//             ref={refRBSheet}
//             closeOnDragDown={true}
//             closeOnPressMask={true}
//             height={220}
//             borderRadius={10}
//             closeDuration={100}
//             customStyles={{
//               draggableIcon: {
//                 backgroundColor: "#000",
//               },
//               container: {
//                 borderRadius: 30
//               }
//             }}
//           >
//             <View style={{ backgroundColor: "#fff", height: 200 }}>
//               <View>
//                 <View>
//                   <View style={{ flexDirection: "row", marginTop: 20 }}>
//                     <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
//                       <Image
//                         cache="force-cache"
//                         source={require("../assets/icons/bottomsheet/1.png")}
//                         style={{ height: 26, width: 26 }}
//                       ></Image>
//                     </View>
//                     <View style={{ color: "#000", flex: 13, height: 60 }}>
//                       <Text
//                         style={{
//                           color: "#000",
//                           fontSize: 16,
//                           margin: 0,
//                           fontWeight: "bold",
//                           paddingLeft: 40,
//                         }}
//                         onPress={() => { reportUser(Number(global.postcurrent[0])) }}
//                       >
//                         Report Spaark
//                     </Text>
//                       <Text
//                         style={{
//                           color: "#000",
//                           fontSize: 14,
//                           flex: 70,
//                           paddingLeft: 40,
//                         }}
//                       >
//                         Please report if you find this content inappropriate
//                     </Text>
//                       {/* line */}
//                       <View
//                         style={{
//                           marginTop: 0,
//                           marginLeft: 0,
//                           marginRight: 0,
//                           borderBottomColor: "#C0C0C0",
//                           borderBottomWidth: 1,
//                         }}
//                       />
//                     </View>
//                   </View>
//                   <View style={{ flexDirection: "row", marginTop: 20 }} onPress={() => { blockUser(currentPost) }}>
//                     <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
//                       <Image
//                         cache="force-cache"
//                         source={require("../assets/icons/bottomsheet/2.png")}
//                         style={{ height: 26, width: 26 }}
//                       ></Image>
//                     </View>
//                     <View style={{ color: "#000", flex: 13, height: 60 }}>
//                       <Text
//                         style={{
//                           color: "#000",
//                           fontSize: 16,
//                           margin: 0,
//                           fontWeight: "bold",
//                           paddingLeft: 40,
//                         }}
//                       >
//                         <Text style={{ color: '#000' }}>Block</Text>
//                       </Text>

//                       <Text
//                         style={{
//                           color: "#000",
//                           fontSize: 14,
//                           flex: 70,
//                           paddingLeft: 40,
//                         }}
//                       >
//                         If you dont want to receive updates from Nonname
//                     </Text>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </View>



//           </RBSheet>

//           <RBSheet
//             ref={Login}
//             closeOnDragDown={true}
//             closeOnPressMask={true}
//             height={380}
//             borderRadius={0}
//             closeDuration={100}
//             customStyles={{
//               draggableIcon: {
//                 backgroundColor: "#000",
//               },
//               container: {
//                 borderRadius: 0,
//               },
//             }}
//           >
//             <View style={{ backgroundColor: "#fff", height: 200 }}>
//               <View>
//                 <View>
//                   <View style={{ flexDirection: "row", marginTop: 10 }}>
//                     <View style={{ color: "#000", flex: 13, height: 60 }}>
//                       <Text
//                         style={{
//                           color: "#000",
//                           fontSize: 16,
//                           margin: 0,
//                           fontWeight: "bold",
//                           paddingLeft: 0,
//                           textAlign: "center",
//                         }}
//                       >
//                         Login to access this feature
//           </Text>

//                       <View
//                         style={{
//                           marginTop: 10,
//                           marginLeft: 10,
//                           marginRight: 10,
//                           borderBottomColor: "#D7D7D7",
//                           borderBottomWidth: 1,
//                         }}
//                       />
//                     </View>
//                   </View>
//                   <View style={{ flexDirection: "row", marginTop: 0 }}>
//                     <View style={{ color: "#000", flex: 13, height: 60 }}>
//                       {/* <Text
//             style={{
//               color: "#A1A4B2",
//               fontSize: 14,
//               flex: 70,
//               paddingLeft: 10,
//             }}
//           >
//             We will send you an{" "}
//             <Text style={{ color: "#7E818F", fontWeight: "bold" }}>
//               One Time Password
//             </Text>{" "}
//             on this mobile number.
//           </Text> */}
//                       <Image source={require('../assets/icons/login_continue.png')} style={{ height: 150, width: 150, marginLeft: 120 }}></Image>

//                     </View>
//                   </View>
//                   <View style={{ flexDirection: "row", marginTop: 0 }}>
//                     <View style={{ color: "#000", flex: 13, height: 160 }}>


//                       {/* line */}
//                       <Button
//                         mode="contained"
//                         color="#FA5805"
//                         style={{
//                           height: 40,
//                           width: 230,
//                           margin: 10,
//                           marginTop: 90,
//                           marginLeft: 80,
//                         }}
//                         onPress={() => onLogin(0, navigation)}
//                       >
//                         Login to access this feature
//           </Button>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </View>





//           </RBSheet>

//           <RBSheet
//             ref={refRBSheets}
//             closeOnDragDown={true}
//             closeOnPressMask={true}
//             height={170}
//             borderRadius={10}
//             closeDuration={100}
//             customStyles={{
//               draggableIcon: {
//                 backgroundColor: "#000",
//               },
//               container: {
//                 borderRadius: 30,
//               },
//             }}
//           >
//             <View style={{ backgroundColor: "#fff", height: 200 }}>
//               <View>
//                 <View>
//                   <View style={{ flexDirection: "row", marginTop: 20 }}>
//                     <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
//                       <Image
//                         source={require("../assets/bottomCard/call_message.png")}
//                         style={{ height: 100, width: 100 }}
//                       ></Image>
//                     </View>
//                     <View
//                       style={{
//                         color: "#000",
//                         flex: 13,
//                         height: 80,
//                         paddingLeft: 45,
//                       }}
//                     >
//                       <Text
//                         style={{
//                           color: "#000",
//                           fontSize: 16,
//                           margin: 0,
//                           fontWeight: "bold",
//                           paddingLeft: 40,
//                         }}
//                       >
//                         Owner of this Spaark disabled Call option.
//                     </Text>
//                       <Text
//                         style={{
//                           color: "#000",
//                           fontSize: 14,
//                           marginTop: 8,
//                           flex: 70,
//                           paddingLeft: 40,
//                         }}
//                       >
//                         Note : You can also disable call
//                     </Text>
//                       {/* line */}
//                       <Text
//                         style={{
//                           color: "#000",
//                           fontSize: 14,
//                           marginTop: 0,
//                           flex: 60,
//                           paddingLeft: 40,
//                         }}
//                       >
//                         while posting a spaark.
//                     </Text>
//                     </View>
//                     <View style={{ flex: 3 }}></View>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </RBSheet>

//           <RBSheet
//             ref={refRBSheetss}
//             closeOnDragDown={true}
//             closeOnPressMask={true}
//             height={170}
//             borderRadius={10}
//             closeDuration={100}
//             customStyles={{
//               draggableIcon: {
//                 backgroundColor: "#000",
//               },
//               container: {
//                 borderRadius: 30,
//               },
//             }}
//           >
//             <View style={{ backgroundColor: "#fff", height: 200 }}>
//               <View>
//                 <View>
//                   <View style={{ flexDirection: "row", marginTop: 20 }}>
//                     <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
//                       <Image
//                         source={require("../assets/bottomCard/chat_message.png")}
//                         style={{ height: 100, width: 100 }}
//                       ></Image>
//                     </View>
//                     <View
//                       style={{
//                         color: "#000",
//                         flex: 13,
//                         height: 80,
//                         paddingLeft: 45,
//                       }}
//                     >
//                       <Text
//                         style={{
//                           color: "#000",
//                           fontSize: 16,
//                           margin: 0,
//                           fontWeight: "bold",
//                           paddingLeft: 40,
//                         }}
//                       >
//                         Owner of this Spaark disabled Chat option.
//                     </Text>
//                       <Text
//                         style={{
//                           color: "#000",
//                           fontSize: 14,
//                           marginTop: 8,
//                           flex: 70,
//                           paddingLeft: 40,
//                         }}
//                       >
//                         Note : You can also disable chat
//                     </Text>
//                       {/* line */}
//                       <Text
//                         style={{
//                           color: "#000",
//                           fontSize: 14,
//                           marginTop: 0,
//                           flex: 60,
//                           paddingLeft: 40,
//                         }}
//                       >
//                         while posting a spaark
//                     </Text>
//                     </View>
//                     <View style={{ flex: 3 }}></View>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </RBSheet>

//           <View style={{ backgroundColor: "#F2F2F2" }}>
//             <View style={{ margin: 0 }}>
//               <View style={{ margin: 10 }}>
//                 <Chip
//                   mode={"outlined"}
//                   style={{
//                     margin: 2,
//                     marginBottom: 0,
//                     padding: 0,
//                     borderRadius: 30,
//                   }}
//                   onPress={() => navigation.navigate("SearchScreen")}
//                 >
//                   <View
//                     style={{ flexDirection: "row", justifyContent: "center" }}
//                   >
//                     <View style={{ flex: 0 }}>
//                       <Image
//                         source={require("../assets/icons/filter.png")}
//                         style={{ height: 40, width: 50 }}
//                       ></Image>
//                     </View>

//                     <View style={{ flex: 0 }}>
//                       <Text
//                         style={{
//                           color: "#8f9090",
//                           fontSize: 15,
//                           marginLeft: 40,
//                           marginTop: 12,
//                         }}
//                       >
//                         Looking for something
//                     </Text>
//                     </View>

//                     <View style={{ flex: 0, marginLeft: 65, marginTop: 7 }}>
//                       <Image
//                         source={require("../assets/icons/search.png")}
//                         style={{ height: 30, width: 30 }}
//                       ></Image>
//                     </View>
//                   </View>
//                 </Chip>
//                 <View style={{ flexDirection: "row" }}>
//                   <TouchableOpacity
//                     onPress={() => navigation.navigate('SipScreen')}
//                   >
//                     <Chip mode={"outlined"} style={{ margin: 3, marginBottom: 10 }}>
//                       <Text style={styles.chipTexts}>Security Guard</Text>
//                     </Chip>
//                   </TouchableOpacity>
//                   <Chip mode={"outlined"} style={{ margin: 3, marginBottom: 10 }}>
//                     <Text style={styles.chipTexts}>Night Duty</Text>
//                   </Chip>
//                   <Chip mode={"outlined"} style={{ margin: 3, marginBottom: 10 }}>
//                     <Text style={styles.chipTexts}>Watch Man</Text>
//                   </Chip>
//                 </View>
//                 <Image
//                   source={require("../assets/icons/market_banner.png")}
//                   style={{ height: 100, width: 370, padding: 10 }}
//                 ></Image>
//               </View>
//               <Text
//                 h5
//                 style={{
//                   fontWeight: "bold",
//                   marginLeft: 20,
//                   marginTop: 10,
//                   fontSize: 20,
//                 }}
//               >
//                 Spaarks Around 5km
//             </Text>
//               {
//                 isLoading ?

//                   <ScrollView>
//                     <View style={styles.eachCards}>
//                       <SkeletonPlaceholder>
//                         <View style={{ flexDirection: "row", alignItems: "center" }}>
//                           <View style={{ width: 60, height: 60, borderRadius: 50 }} />
//                           <View style={{ marginLeft: 20 }}>
//                             <View style={{ width: 120, height: 20, borderRadius: 4 }} />
//                             <View
//                               style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
//                             />
//                           </View>
//                         </View>
//                         <View>
//                           <View
//                             style={{ width: 350, height: 20, borderRadius: 4, marginTop: 10 }}
//                           />

//                           <View
//                             style={{ marginTop: 6, width: 170, height: 20, borderRadius: 4 }}
//                           />
//                           <View
//                             style={{ width: 350, height: 20, borderRadius: 4, marginTop: 5 }}
//                           />
//                           <View
//                             style={{ width: 350, height: 120, borderRadius: 4, marginTop: 5 }}
//                           />
//                         </View>

//                         <View
//                           style={{
//                             flexDirection: "row",
//                             alignItems: "center",
//                             marginTop: 20,
//                           }}
//                         >
//                           <View style={{ width: 60, height: 60, borderRadius: 50 }} />
//                           <View style={{ marginLeft: 20 }}>
//                             <View style={{ width: 120, height: 20, borderRadius: 4 }} />
//                             <View
//                               style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
//                             />
//                           </View>
//                         </View>
//                         <View>
//                           <View
//                             style={{ width: 350, height: 20, borderRadius: 4, marginTop: 10 }}
//                           />

//                           <View
//                             style={{ marginTop: 6, width: 170, height: 20, borderRadius: 4 }}
//                           />
//                           <View
//                             style={{ width: 350, height: 20, borderRadius: 4, marginTop: 5 }}
//                           />
//                           <View
//                             style={{ width: 350, height: 120, borderRadius: 4, marginTop: 5 }}
//                           />
//                         </View>

//                         <View
//                           style={{
//                             flexDirection: "row",
//                             alignItems: "center",
//                             marginTop: 20,
//                           }}
//                         >
//                           <View style={{ width: 60, height: 60, borderRadius: 50 }} />
//                           <View style={{ marginLeft: 20 }}>
//                             <View style={{ width: 120, height: 20, borderRadius: 4 }} />
//                             <View
//                               style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
//                             />
//                           </View>
//                         </View>
//                         <View>
//                           <View
//                             style={{ width: 350, height: 20, borderRadius: 4, marginTop: 10 }}
//                           />

//                           <View
//                             style={{ marginTop: 6, width: 170, height: 20, borderRadius: 4 }}
//                           />
//                           <View
//                             style={{ width: 350, height: 20, borderRadius: 4, marginTop: 5 }}
//                           />
//                           <View
//                             style={{ width: 350, height: 120, borderRadius: 4, marginTop: 5 }}
//                           />
//                         </View>

//                       </SkeletonPlaceholder>
//                     </View>
//                   </ScrollView>

//                   : <FlatList
//                     data={DashboardState.posts.slice(0, 30)}
//                     renderItem={({ item, index }) => (
//                       <ViewShot
//                         ref={viewShotRef}
//                         options={{
//                           format: "jpg",
//                           quality: 1.0,
//                           result: "data-uri",
//                         }}
//                       >
//                         <Card style={styles.eachCard}>
//                           {!extraThings && (
//                             <Image
//                               source={require("../assets/icons/download.png")}
//                               style={{ height: 50, width: 370, marginRight: 50 }}
//                             ></Image>
//                           )}
//                           <View>
//                             <View
//                               style={{ flexDirection: "row", marginBottom: 20 }}
//                             >
//                               <View
//                                 style={{
//                                   flex: 3,
//                                   paddingLeft: 20,
//                                   paddingTop: 20,
//                                 }}
//                               >
//                                 <View style={{ flexDirection: "column" }}>
//                                   <View style={{ flex: 2 }}>
//                                     <Image
//                                       source={{
//                                         uri: item.uservisibility.profilePic,
//                                       }}
//                                       style={{
//                                         height: 55,
//                                         width: 55,
//                                         paddingLeft: 20,
//                                         borderRadius: 30,
//                                       }}
//                                     />
//                                   </View>
//                                 </View>
//                               </View>
//                               <View
//                                 style={{
//                                   flex: 20,
//                                   paddingLeft: 40,
//                                   paddingTop: 20,
//                                   fontSize: 20,
//                                 }}
//                               >
//                                 <Text style={{ fontWeight: "bold" }}>
//                                   {item.uservisibility.name}
//                                 </Text>
//                                 <Text style={{ marginTop: 5 }}>{moment(item.createdAt).fromNow()}</Text>
//                                 <View style={{ flexDirection: "row" }}>

//                                   {item.isProvider == true ? (
//                                     <>
//                                       <View style={{ flex: 1 }}>
//                                         <Text
//                                           style={{
//                                             marginTop: 5,
//                                             fontSize: 15,
//                                             fontWeight: "bold",
//                                             color: "#6FA4E9",
//                                           }}
//                                         >
//                                           {
//                                             item.reviews.length > 0 ?
//                                               <View style={{ flexDirection: 'row' }}>
//                                                 {/* <Text style={{fontWeight:'bold'}}>{item.reviews[0].rating}/5</Text> */}
//                                                 <Rating
//                                                   fractions="1"
//                                                   isDisabled={true}
//                                                   ratingColor="#f2f2f2"
//                                                   ratingBackgroundColor="#f2f2f2"
//                                                   ratingTextColor="#f2f2f2"
//                                                   startingValue={item.reviews[0].rating}
//                                                   unSelectedColor="#f2f2f2"
//                                                   imageSize={22}
//                                                   style={{
//                                                     marginTop: 0,
//                                                     backgroundColor: "#f2f2f2",
//                                                     marginRight: 15,
//                                                   }}
//                                                 />
//                                                 {
//                                                   item.reviews[0].count > 0 ?
//                                                     <Text>({item.reviews[0].count})</Text>
//                                                     : <Text>(0)</Text>
//                                                 }
//                                               </View>
//                                               : <Text style={{ fontWeight: 'bold' }}>0.0/5</Text>
//                                           }
//                                         </Text>
//                                       </View>

//                                     </>
//                                   ) : (
//                                     <View style={{ flexDirection: 'row' }}>
//                                       {
//                                         item.tags != undefined ?
//                                           item.tags.map((list, i) =>
//                                             <Chip
//                                               style={{
//                                                 alignSelf: 'flex-start',
//                                                 backgroundColor: list.color,
//                                               }}
//                                             >
//                                               <Text
//                                                 style={{
//                                                   color: "#fff",
//                                                   marginTop: 0,
//                                                   fontSize: 10,
//                                                 }}
//                                               >
//                                                 {list.name}
//                                               </Text>
//                                             </Chip>
//                                           ) : <></>

//                                       }
//                                     </View>

//                                   )}


//                                 </View>
//                               </View>
//                               <View>

//                                 <TouchableOpacity
//                                   onPress={() => onDotsClick(index)}
//                                 >
//                                   <Image
//                                     source={require("../assets/icons/dots.png")}
//                                     style={{
//                                       height: 23,
//                                       width: 8,
//                                       paddingLeft: 20,
//                                       marginTop: 10,
//                                     }}
//                                   />
//                                 </TouchableOpacity>

//                               </View>
//                             </View>

//                             <View
//                               style={{
//                                 paddingLeft: 10,
//                                 marginBottom: 0,
//                                 flexDirection: "column",
//                               }}
//                             >
//                               {item.isProvider == true ? (
//                                 <>
//                                   <TouchableOpacity
//                                     onPress={() =>
//                                       navigation.navigate("SellerProfile", {
//                                         userId: item.userId,
//                                         post: item,
//                                       })
//                                     }
//                                     style={{ backgroundColor: "#fff" }}
//                                   >
//                                     <View style={{ flex: 9 }}>
//                                       <Text
//                                         style={{ fontSize: 13, color: "#6FA4E9" }}
//                                       >
//                                         View Profile
//                                 </Text>
//                                       {
//                                         item.tags.length > 0 ?
//                                           <Chip
//                                             style={{
//                                               alignSelf: 'flex-start',
//                                               backgroundColor: '#6FA4E9',

//                                             }}
//                                           >
//                                             <Text
//                                               style={{
//                                                 color: "#fff",
//                                                 marginTop: 0,
//                                                 fontSize: 10,
//                                               }}
//                                             >
//                                               {item.tags[0].name}
//                                             </Text>
//                                           </Chip>
//                                           : <></>
//                                       }
//                                     </View>
//                                   </TouchableOpacity>
//                                 </>
//                               ) : (
//                                 <Text></Text>
//                               )}
//                               <View style={{ flex: 2 }}>
//                                 <Text style={{ fontSize: 15, paddingTop: 10 }} numberOfLines={5}>
//                                   {item.content}
//                                 </Text>
//                                 {item.content.length > 100 ? (
//                                   <Text style={{ color: "#6FA4E9" }}>
//                                     View more.
//                                   </Text>
//                                 ) : (
//                                   <></>
//                                 )}
//                               </View>
//                             </View>
//                           </View>
//                           {
//                             item.photo.length > 0 ?
//                               <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
//                                 <FlatList
//                                   data={[...item.photo]}
//                                   horizontal={true}
//                                   showsHorizontalScrollIndicator={false}
//                                   renderItem={({ item, i }) => (
//                                     <View style={{ marginRight: 10 }}>
//                                       <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: DashboardState.posts[index].photos }) }}>
//                                         <Image source={{ uri: item }} cache="force-cache" style={{
//                                           width: 390,
//                                           height: 480,
//                                           resizeMode: "cover",
//                                         }}></Image>
//                                       </TouchableOpacity>
//                                     </View>
//                                   )}
//                                 />
//                               </View>
//                               : <></>
//                           }
//                           <View
//                             style={{ backgroundColor: "#fff", height: 110 }}
//                           >
//                             <View style={{ flexDirection: "row", marginTop: 20 }}>
//                               <View style={{ flex: 1 }}>
//                                 <TouchableOpacity
//                                   onPress={() =>
//                                     navigation.navigate("PostSpecificScreensFeed", {
//                                       post: item,
//                                     })
//                                   }
//                                   style={{ backgroundColor: "#fff" }}
//                                 >
//                                   <Text
//                                     style={{ color: "#6FA4E9", paddingLeft: 10 }}
//                                   >
//                                     {item.subposts.length} Comments        {item.viewedUsers.length} Views
//               </Text>
//                                 </TouchableOpacity>
//                               </View>

//                               <View style={{ flex: 0 }}>
//                                 <TouchableOpacity
//                                   onPress={() =>
//                                     navigation.navigate("PostSpecificScreensFeed", {
//                                       post: item,
//                                     })
//                                   }
//                                   style={{ backgroundColor: "#fff" }}
//                                 >
//                                   <Text style={{ color: "#6FA4E9" }}>
//                                     {
//                                       item.reviews.length > 0 ?
//                                         <Text style={{ color: "#6FA4E9" }}>{item.reviews[0].reviews.length} Reviews</Text> : <></>
//                                     }

//                                   </Text>
//                                 </TouchableOpacity>
//                               </View>
//                             </View>

//                             <View
//                               style={{
//                                 marginTop: 5,
//                                 marginLeft: 0,
//                                 marginRight: 0,
//                                 borderBottomColor: "black",
//                                 borderBottomWidth: 0.2,
//                               }}
//                             />

//                             <View
//                               style={{ flex: 0, flexDirection: "row", magin: 0 }}
//                             >
//                               <TouchableOpacity
//                                 onPress={() => navigation.navigate('OutGoingCallScreen', { name: item.uservisibility.name, profilePic: item.uservisibility.profilePic })}>
//                                 <Image
//                                   source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.23_PM_l1kmtc.png' }}
//                                   style={styles.chats}
//                                 ></Image>
//                               </TouchableOpacity>
//                               <TouchableOpacity onPress={() => clickedChat(l)}>
//                                 <Image
//                                   source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142911/Screenshot_2021-05-04_at_9.11.18_PM_mluwe1.png' }}
//                                   style={styles.chats}
//                                 ></Image>
//                               </TouchableOpacity>
//                               {/* <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("MapScreen", {
//                 postId: item._id,
//                 lat: item.locationStatic.coordinates[1],
//                 lng: item.locationStatic.coordinates[0],
//               })
//             }
//             style={{ backgroundColor: "#fff" }}
//           >
//             <View
//               style={{ flex: 0, flexDirection: "column" }}
//             >

//               <Image
//                 source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620143423/Screenshot_2021-05-04_at_9.20.06_PM_i7ruwc.png'}}
//                 style={styles.chatss}
//               ></Image>
//             </View>
//           </TouchableOpacity> */}

//                               <Image
//                                 source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620143423/Screenshot_2021-05-04_at_9.20.06_PM_i7ruwc.png' }}
//                                 style={styles.chats}
//                               ></Image>
//                               <TouchableOpacity onPress={() => WhatsAppShare(item)}>
//                                 <Image
//                                   source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png' }}
//                                   style={styles.chats}
//                                 ></Image>
//                               </TouchableOpacity>
//                               <TouchableOpacity
//                                 onPress={() => onShare(item)}
//                               >
//                                 <Image
//                                   source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.14_PM_ancven.png' }}
//                                   style={styles.chats}
//                                 ></Image>
//                               </TouchableOpacity>
//                             </View>



//                           </View>
//                         </Card>
//                       </ViewShot>


//                     )}
//                   />
//               }

//             </View>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     );
//   };

//   const WhatsAppShare = async (post) => {
//     try {
//       console.log('---------------------')
//       console.log(post)
//       console.log(post.questionNo)
//       console.log('---------------------')
//       if (post.questionNo == '1') {
//         var a = `${post.tags[0].name}\n${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
//         *Connect*  to your local area wherever you go.`;
//       }

//       if (post.questionNo == '2') {
//         var a = `${post.tags[0].name}\n${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
//         *Connect*  to your local area wherever you go.`;
//       }

//       if (post.questionNo == '3') {
//         var a = `${post.tags[0].name}\n*Name*:${post.uservisibility.name.substr(0, 15)}\n*Content:*\n${post.content}\n\n*Post Link:*\n${post.uservisibility.share}\n\n *Apni Services Dijiye. Apni income badaiye. Free to use.*\n *Download Spaarks App :*\nhttps://cutt.ly/Spaarks-app\n\nJahan jaayein, apne local area se connect karein. Free app.`;
//       }//Done

//       if (post.questionNo == '4') {
//         var a = `${post.tags[0].name}\n*Name*:${post.uservisibility.name.substr(0, 15)}\n*Content:*\n${post.content}\n\n*Post Link:*\n${post.uservisibility.share}\n\n *Kuch bhi sell karien. Apne aas paas. Ghar baithe. Easy.*\n *Download Spaarks App :*\nhttps://cutt.ly/Spaarks-app\n\nJahan jaayein, apne local area se connect karein. Free app.`;
//       }//Done

//       if (post.questionNo == '5') {
//         var a = `${post.tags[0].name} ${post.tags[1].name}\n*Content:*\n${post.content}\n\n*Post Link:*\n${post.uservisibility.share}\n\n *Apne aas pass, Service dene wale ko connect karien. Free. Easy.*\n *Download Spaarks App :*\nhttps://cutt.ly/Spaarks-app\n\nJahan jaayein, apne local area se connect karein. Free app.`;
//       }//Done

//       if (post.questionNo == '6') {
//         var a = `${post.tags[0].name}\n*Content:*\n${post.content.substr(0, 150)}\n\n*Post Link:*\n${post.uservisibility.share}\n\n *Vacancy ko post karien. Staff payein. Ghar baithe. Free to use.*\n *Download Spaarks App :*\nhttps://cutt.ly/Spaarks-app\n\nJahan jaayein, apne local area se connect karein. Free app.`;
//       }

//       if (post.questionNo == '7') {
//         var a = `${post.tags[0].name}\n*Content:*${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
//         *Connect*  to your local area wherever you go.`;
//       }

//       if (post.questionNo == 'Find a Job') {
//         var a = `*JOB*${post.tags[0].name}\n*Content:*${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
//         *Connect*  to your local area wherever you go.`;
//       }



//       let url = "whatsapp://send?text=" + a;
//       Linking.openURL(url)
//       // const result = await Share.share({
//       //   message: `${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
//       //       Connect to your local area wherever you go.`,
//       // });
//       // if (result.action === Share.sharedAction) {
//       //   if (result.activityType) {
//       //     // shared with activity type of result.activityType
//       //   } else {
//       //     // shared
//       //   }
//       // } else if (result.action === Share.dismissedAction) {
//       //   // dismissed
//       // }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const onShare = async (post) => {
//     try {
//       const result = await Share.share({
//         message: `${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
//             Connect to your local area wherever you go.`,
//       });
//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // shared with activity type of result.activityType
//         } else {
//           // shared
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // dismissed
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };


//   const ProfileScreen = ({ navigation, route }) => {
//     navigation.setOptions({ tabBarVisible: false });
//     return (
//       <ScrollView
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         <Card style={styles.eachCard}>
//           <View>
//             <View style={{ backgroundColor: "#fff", height: "auto" }}>
//               <Card.Title
//                 title={route.params.post.uservisibility.name}
//                 subtitle={route.params.post.OriginalName}
//                 left={LeftContent}
//                 right={RightContent}
//               />
//               <Card.Content
//                 style={{ backgroundColor: "#ffffff", borderColor: "#000" }}
//               >
//                 <Title>{route.params.post.content}</Title>
//                 <Paragraph>{route.params.post.content}</Paragraph>
//                 {route.params.post.content.length > 200 ? (
//                   <Text style={{ color: "blue" }}>View more.</Text>
//                 ) : (
//                   <Text></Text>
//                 )}
//               </Card.Content>
//             </View>
//             {route.params.post.photo.length > 0 ? (
//               <ImageSlider
//                 loop
//                 autoPlayWithInterval={3000}
//                 images={route.params.post.photo}
//                 onPress={({ index }) => alert(index)}
//                 customSlide={({ index, item, style, width }) => (
//                   // It's important to put style here because it's got offset inside
//                   <View key={index} style={[style, styles.customSlide]}>
//                     <Image source={{ uri: item }} style={styles.customImage} />
//                   </View>
//                 )}
//               />
//             ) : (
//               <Text></Text>
//             )}

//             {/* 
// <Searchbar
//       placeholder="Add your Comment"
//       onChangeText={onChangeSearch}
//       value={searchQuery}
//       style={{marginBottom:15}}
      
//     /> */}

//             <View style={{ flex: 0, flexDirection: "row", marginTop: 20 }}>
//               <View style={{ flex: 2 }}>
//                 <Image
//                   source={require("../assets/Avatar.png")}
//                   style={{ height: 40, width: 40, paddingLeft: 20 }}
//                 ></Image>
//               </View>
//               <View
//                 style={{
//                   flex: 10,
//                   backgroundColor: "#f2f2f2",
//                   padding: 10,
//                   borderRadius: 10,
//                 }}
//               >
//                 <Text style={{ fontWeight: "bold" }}>Sai Kiran</Text>
//                 <Text style={{ paddingTop: 5 }}>
//                   Also understand that, as humans, design can be emotional and
//                   stimulate... see more
//                 </Text>
//                 <Text
//                   style={{ fontWeight: "600", fontSize: 13, paddingTop: 10 }}
//                 >
//                   Comment{" "}
//                   <Text
//                     style={{ fontWeight: "600", fontSize: 13, paddingTop: 10 }}
//                   >
//                     Replies (8)
//                   </Text>
//                 </Text>
//               </View>
//             </View>
//             <View
//               style={{
//                 flex: 0,
//                 flexDirection: "row",
//                 marginLeft: 70,
//                 marginTop: 20,
//               }}
//             >
//               <View style={{ flex: 2 }}>
//                 <Image
//                   source={require("../assets/Avatar.png")}
//                   style={{ height: 40, width: 40, paddingLeft: 20 }}
//                 ></Image>
//               </View>
//               <View
//                 style={{
//                   flex: 10,
//                   backgroundColor: "#f2f2f2",
//                   padding: 10,
//                   borderRadius: 10,
//                 }}
//               >
//                 <Text style={{ fontWeight: "bold" }}>Sai Kiran </Text>
//                 <Text style={{ paddingTop: 5 }}>
//                   Also understand that, as humans, design can be emotional and
//                   stimulate... see more
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </Card>
//       </ScrollView>
//     );
//   };

//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen
//         name="PostSpecifics"
//         component={ProfileScreen}
//         options={(navigation) => ({
//           // tabBarIcon: ,
//           tabBarVisible: false,
//         })}
//       />
//       <Stack.Screen
//         name="ChatSpecific"
//         component={ChatSpecificScreen}
//         options={(navigation) => ({
//           // tabBarIcon: ,
//           tabBarVisible: false,
//         })}
//       />
//       <Stack.Screen
//         name="OnBoarding"
//         component={OnBoardingScreen}
//         options={(navigation) => ({
//           // tabBarIcon: ,
//           tabBarVisible: false,
//         })}
//       />
//     </Stack.Navigator>
//   );
// };

// export default MarketScreen;

// const styles = StyleSheet.create({
//   chats: {
//     height: 30,
//     width: 30,
//     margin: 23,
//   },
//   chatss: {
//     height: 30,
//     width: 30,
//     margin: 32,
//   },
//   eachCard: {

//     padding: 0,
//     backgroundColor: "#fff",
//     marginBottom: 10,
//   },
//   eachCards: {
//     padding: 0,
//     backgroundColor: "#fff",
//     marginBottom: 10,
//   },

//   body: {},
//   BottomNav: {
//     flex: 0,
//     flexDirection: "row",
//     backgroundColor: "#63CDFF",
//   },

//   LoginComponent: {
//     height: 500,
//     width: 100,
//     margin: 50,
//   },
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   },

//   input: {
//     width: 200,
//     height: 44,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "black",
//     marginBottom: 10,
//   },
//   tinyLogo: {
//     flex: 0,
//     height: 120,
//     width: 120,
//     margin: 20,
//   },
//   rows1: {
//     flex: 0,
//     flexDirection: "row",
//   },
//   image: {
//     resizeMode: "cover",
//     justifyContent: "center",
//   },
//   rows2: {
//     flex: 0,
//     flexDirection: "row",
//   },
//   scrollView: {},
//   engine: {
//     position: "absolute",
//     right: 0,
//   },
//   body: {
//     height: 1000,
//     backgroundColor: "#f2f2f2",
//   },
//   sectionContainercol: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//     width: 200,
//     height: 100,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     padding: 8,
//     textAlign: "center",
//     fontSize: 24,
//     fontWeight: "600",
//     color: "#ffffff",
//     fontWeight: "700",
//   },
//   sectionDescription: {
//     textAlign: "center",
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: "400",
//     color: "#ffffff",
//   },

//   sectionDescriptions: {
//     textAlign: "center",
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: "400",
//   },
//   highlight: {
//     fontWeight: "700",
//   },
//   footer: {
//     fontSize: 12,
//     fontWeight: "600",
//     padding: 4,
//     paddingRight: 12,
//     textAlign: "right",
//   },

//   buttonSelected: {
//     opacity: 1,
//     color: "red",
//   },
//   customSlide: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   customImage: {
//     width: 390,
//     height: 500,
//     resizeMode: "cover",
//   },
//   chip: {
//     backgroundColor: "#FA6E5A",
//     margin: 0,
//     height: 25,
//     width: 80,
//   },
//   chips: {
//     backgroundColor: "#6FA4E9",
//     margin: 2,
//     height: 30,
//     width: 100,
//   },
//   chipText: {
//     color: "#fff",
//   },
//   chipTexts: {
//     color: "#000",
//   },
//   video: {
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     marginTop: 140,
//     width: 360,
//     height: 250,
//     resizeMode: "contain"
//   }
// });

// import React, { useEffect, setState, useRef,useState } from "react";
// import { TabRouter, useTheme } from "@react-navigation/native";
// import {
//   Share,
//   Image,
//   Platform,
//   TouchableOpacity,
//   ActivityIndicator,
//   RefreshControl,
//   Colors,
//   ScrollView,

//   ImageBackground,
//   SafeAreaView,
//   View,
//   StyleSheet,
//   StatusBar,
//   DevSettings,
//   TextInput,
//   Alert,
//   TouchableHighlight,
//   LogBox,
//   Linking,
//   FlatList,
//   Platforms
// } from "react-native";
// const GLOBAL = require('../Globals');
// import RNLocation from 'react-native-location';
// import RNCallKeep from 'react-native-callkeep';
// import axios from "axios";
// import JsSIP from 'jssip'
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import ViewShot from "react-native-view-shot";
// import { Rating, AirbnbRating, Divider } from "react-native-elements";
// import {canPost} from './authGuard'
// import { connect, useDispatch, useReducer } from "react-redux";
// import {connectXMPP,addListenerssss,getRosterMain,setMess} from './xmpp';
// import chatReducers from "../reducers/chatReducers";
// import {callKeepSetup,handleAPNs,handleConnect} from './OutGoingCallScreen'
// LogBox.ignoreAllLogs();
// // import { Video, AVPlaybackStatus } from 'expo-av';
// import moment from "moment";
// import Carousel from 'react-native-snap-carousel';
// import { Text,BottomSheet,ListItem } from "react-native-elements";
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";
// import {checkNotifications} from 'react-native-permissions';
// import AsyncStorage from "@react-native-community/async-storage";
// const isIOS = Platform.OS === 'ios';

// import {
//   Avatar,
//   Button,
//   Card,
//   Title,
//   Paragraph,
//   Searchbar,
//   Chip,
// } from "react-native-paper";
// import Snackbar from 'react-native-snackbar';
// import RBSheet from "react-native-raw-bottom-sheet";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import ChatSpecificScreen from "./ChatSpecificScreen";
// import OnBoardingScreen from "./OnBoardingScreen";
// const Stack = createStackNavigator();
// const wait = (timeout) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, timeout);
//   });
// };




// const indexes = [4,8,12,16,20,24]
// global.postcurrent = ['0'];
// function setRecMes (from,to,message,createdAt,type){
//   console.log("In ChatSpecific setRecMes",from,to,message,createdAt,type)
//   // console.log('chat_roster_mainss',chat_roster_mains)
//   if (chat_roster_mains.length > 0) {
//   var this_chat = chat_roster_mains.find(item => item.jid == from.substr(0,44));
//   chat_roster_mains = chat_roster_mains.filter((item) => item.jid !==  from.substr(0,44));
//   // alert(type)
//   if(type=='block'){
//     // this_chat.messages.splice(0, 0, {
//     //   content: `Chat can't be replied anymore`,
//     //   texts: `Chat can't be replied anymore`,
//     //   createdAt: Date.now(),
//     //   _id: Date.now() * Math.random(),
//     //   unique: Date.now(),
//     //   type: "chat",
//     //   user: {
//     //     _id: 1,
//     //   },
//     // });
//     this_chat.blockedMe = true;
//     this_chat.message = `Chat can't be replied anymore`
//   }
//   else if(type=='unblock'){
//     // this_chat.messages.splice(0, 0, {
//     //   content: `Click to send Message`,
//     //   texts: `Click to send Message`,
//     //   createdAt: Date.now(),
//     //   _id: Date.now() * Math.random(),
//     //   unique: Date.now(),
//     //   type: "chat",
//     //   user: {
//     //     _id: 1,
//     //   },
//     // });
//     this_chat.blockedMe = false;
//     this_chat.message = `Click to send Message`
//   }
//   else if(type=='exit'){
//     // this_chat.messages.splice(0, 0, {
//     //   content: `Chat can't be replied anymore`,
//     //   texts: `Chat can't be replied anymore`,
//     //   createdAt: Date.now(),
//     //   _id: Date.now() * Math.random(),
//     //   unique: Date.now(),
//     //   type: "chat",
//     //   user: {
//     //     _id: 1,
//     //   },
//     // });
//     this_chat.exitMe = true;
//     this_chat.message = `Chat can't be replied anymore`
//   }
//   else if(type=='resume'){
//     // this_chat.messages.splice(0, 0, {
//     //   content: `Click to send Message`,
//     //   texts: `Click to send Message`,
//     //   createdAt: Date.now(),
//     //   _id: Date.now() * Math.random(),
//     //   unique: Date.now(),
//     //   type: "chat",
//     //   user: {
//     //     _id: 1,
//     //   },
//     // });
//     this_chat.exitMe = false;
//     this_chat.message = `Click to send Message`
//   }
//   else if(type='chat'){
//     this_chat.messages.splice(0, 0, {
//       content: message,
//       text: message,
//       createdAt: Date.now(),
//       _id: Date.now() * Math.random(),
//       unique: Date.now(),
//       type: "chat",
//       user: {
//         _id: 1,
//       },
//     });
//     this_chat.message = message
//   }else {

//   }

//           this_chat.updatedAt = Date.now();

//           chat_roster_mains.splice(0, 0,this_chat)
//           Chatdispatchers({
//             type: "SETMYMESSAGEMAIN",
//             chat_roster_main: chat_roster_mains,
//           });
//     }
//   // chatDis()
// }

// const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
// const RightContent = (props) => <Text>500m</Text>;
// const AllFeaturesScreen =  ({ navigation,route,count,setLoading,isNew,message,showTag,chat_roster_main,preferencess,Userpreferences,main_loading,allPosts,postBeyond,allMapPosts}) => {
//   const [loadings, setLoadings] = useState(true);
//   const [dataSource, setDataSource] = useState([]);
//   const [offset, setOffset] = useState(1);
// async function handleOutgoingCall (call,navigation){
//   // navigation.navigate('OutGoingCallScreen',{aid:call,name:'Saikiran',profilePic:'https://wallpaperaccess.com/full/2213426.jpg'})
//   // navigation.navigate('SelectCategory',{question:1,question:'Want a Job',excluding:[]}) 
//   navigation.navigate('OutGoingCallScreen',{aid:call,name:'Saikiran',profilePic:'https://wallpaperaccess.com/full/2213426.jpg'})

// }
// async function handleOutgoingCalls(call,navigation){
//   // navigation.navigate('OutGoingCallScreen',{aid:call,name:'Saikiran',profilePic:'https://wallpaperaccess.com/full/2213426.jpg'})
//   // navigation.navigate('SelectCategory',{question:1,question:'Want a Job',excluding:[]}) 
//   navigation.navigate('IncomingCallScreen',{aid:call,name:'Saikiran',profilePic:'https://wallpaperaccess.com/full/2213426.jpg'})

// }
// //   async function callKeepSetup () {
// //     const options = {
// //       ios: {
// //         appName: 'CallApp',
// //         imageName: 'sim_icon',
// //         supportsVideo: false,
// //         maximumCallGroups: '1',
// //         maximumCallsPerCallGroup: '1',
// //       },
// //       android: {
// //         alertTitle: 'Permissions Required',
// //         alertDescription:
// //           'This application needs to access your phone calling accounts to make calls',
// //         cancelButton: 'Cancel',
// //         okButton: 'ok',
// //         imageName: 'sim_icon'
// //       },
// //     };

// //     try {
// //       RNCallKeep.setup(options).then((accepted) => {
// //         console.log('callkeep registered');
// //       });

// //       if (Platform.OS === 'android') {
// //         RNCallKeep.setAvailable(true);
// //       }

// //       RNCallKeep.addEventListener('answerCall', onAnswerCallAction);

// //       RNCallKeep.addEventListener('endCall', onEndCallAction);

// //       RNCallKeep.addEventListener('didLoadWithEvents', didLoadWithEvents);

// //     } catch (err) {
// //       console.error('initializeCallKeep error:', err.message);
// //     }
// //   };



// //   async function  onAnswerCallAction (data) {
// //     let { callUUID } = data;
// //     callAnswered = 'answered'
// //     setTimeout(() => {
// //       handleAnswerIncoming()
// //     }, 1000)
// //   };

// //   async function onEndCallAction(data){
// //     let { callUUID } = data;

// //     hangupCall();

// //     currentCallId = null;
// //   };

// //   async function didLoadWithEvents (events) {
// //     console.log('didLoadWithEvents:', events)
// //     if (!events || !Array.isArray(events) || events.length < 1) {
// //       return;
// //     }

// //     for (let voipPushEvent of events) {
// //       let { name, data } = voipPushEvent;
// //       let { callUUID } = data;

// //       if (name === 'RNCallKeepPerformAnswerCallAction') {
// //         RNCallKeep.rejectCall(callUUID);
// //         onAnswerCallAction(data)
// //       }
// //     }
// //   }



// //   async function handleConnect (u, p) {
// //     // var details = {
// //     //   alertBody:'Test Body',
// //     //   alertTitle:'Test Titl'
// //     // }
// //     // PushNotificationIOS.presentLocalNotifications(details);
// //     try {
// //       const socket = new JsSIP.WebSocketInterface('ws://103.27.86.24:3006');
// //       _ua = new JsSIP.UA(
// //         // {
// //         // 	uri                   : 'sip:800855126s@103.27.86.24:3005',
// //         // 	password              : 'qMvo0LTwXC',
// //         // 	'display_name'        : 'Saikiran',
// //         // 	sockets               : [ socket ],
// //         // 	'registrar_server'    : '103.27.86.24:3005',
// //         // 	// 'contact_uri'         : 'sip:800855126s@103.27.86.24',
// //         // 	// 'contact_uri':null,
// //         // 	'authorization_user'  : '800855126s',
// //         // 	'instance_id'         : null,
// //         // 	'session_timers'      : false,
// //         // 	'use_preloaded_route' : true
// //         // }
// //         {
// //           uri: `sip:${u}@103.27.86.24:3006`,
// //           password: p,
// //           sockets: [socket],
// //           'registrar_server': '103.27.86.24:3006',
// //           // 'contact_uri'         : 'sip:5002@103.27.86.24',
// //           // 'contact_uri':null,
// //           'authorization_user': u,
// //           'instance_id': null,
// //           'session_timers': false,
// //           'use_preloaded_route': false,
// //           with_react_native: true
// //         }
// //       );

// //       _ua.on('connecting', () => {
// //         console.log('connecting in ua');
// //       });

// //       _ua.on('connected', () => {
// //         console.log('connected');
// //       });

// //       _ua.on('disconnected', () => {
// //         console.log('disconnected');
// //       });

// //       _ua.on('registered', () => {
// //         console.log('registered');
// //       });

// //       _ua.on('unregistered', () => {
// //         console.log('UA "unregistered" event');

// //       });

// //       _ua.on('newRTCSession', (data) => {
// //         // TODO: For testing.
// //         console.log('in newRTCSession')

// //         if (data.originator === 'local')
// //           return;

// //         const states = state;
// //         let session = data.session;
// //         session.media = data.request.headers.Callmedia
// //         // session.media = 'audio'
// //         console.log('incomming RTC')
// //         console.log('State', state)
// //         console.log('Data', data)
// //         console.log('sessionsssss', session)
// //         session = session;
// //         // this.setState({ session: session })
// //         RNCallKeep.displayIncomingCall(
// //           '11edc52b-2918-4d71-9058-f7285e29d894',
// //           session.remote_identity._uri._user.substring(1),
// //         );
// //         // if (states || states.incomingSession) {
// //         //     console.log('incoming call replied with 486 "Busy Here"');
// //         //     session.terminate(
// //         //       {
// //         //         'status_code': 486,
// //         //         'reason_phrase': 'Busy Here'
// //         //       });

// //         //     return;
// //         //   }
// //         state.session = session;

// //         console.log('Session Available',session)
// //         RNCallKeep.displayIncomingCall(
// //             '11edc52b-2918-4d71-9058-f7285e29d894',
// //             session.remote_identity._uri._user.substring(1),
// //           );

// //         //audioPlayer.play('ringing');
// //         if (session) {
// //             console.log('Session Available',session)
// //           let data = { session: session, number: session.remote_identity._uri._user.substring(1) }
// //           RNCallKeepData = data

// //           RNCallKeep.displayIncomingCall(
// //             '11edc52b-2918-4d71-9058-f7285e29d894',
// //             session.remote_identity._uri._user.substring(1),
// //           );
// //           // if(Platform.OS === 'ios'){
// //           // 	if (VoipPushNotification.wakeupByPush) {
// //           // 		console.log('this.callAnswered:::',this.callAnswered)
// //           // 		if(this.callAnswered==='answered'){
// //           // 			this.callAnswered = ''
// //           // 			this.handleAnswerIncoming();
// //           // 		}
// //           // 		VoipPushNotification.wakeupByPush = false;
// //           // 	}else{
// //           // 		RNCallKeep.displayIncomingCall(
// //           // 			'11edc52b-2918-4d71-9058-f7285e29d894',
// //           // 			session.remote_identity._uri._user.substring(1),
// //           // 		);
// //           // 	}

// //           // }
// //         }


// //         session.on('failed', () => {
// //           console.log('call failed.')
// //           alert('Failed');
// //           // VoipPushNotification.wakeupByPush = false;

// //           if (isIOS) {
// //             RNCallKeepData = {}
// //             // RNCallKeep.rejectCall(this.currentCallId);
// //             RNCallKeep.endAllCalls();
// //           }

// //         //   this.setState(
// //         //     {
// //         //       session: null,
// //         //       incomingSession: null
// //         //     });


// //             state.session = null;
// //             state.incomingSession = null;
// //         });

// //         session.on('muted', (data) => {
// //           console.log('session mute event', data);

// //         })

// //         session.on('unmuted', (data) => {
// //           console.log('session unmuted event', data);
// //         })

// //         session.on('ended', () => {
// //           console.log('call ended [dialer]')

// //           if (isIOS) {
// //             console.log('checking call end', this.currentCallId)
// //             RNCallKeepData = {}
// //             // RNCallKeep.rejectCall(this.currentCallId);
// //             RNCallKeep.endAllCalls();
// //           }

// //         //   this.setState(
// //         //     {
// //         //       session: null,
// //         //       incomingSession: null
// //         //     });

// //             state.session = null;
// //             state.incomingSession = null;

// //         });

// //         session.on('accepted', () => {
// //           console.log('call accepted')
// //           if (Platform.OS === 'android') {

// //             // this.setState(
// //             //   {
// //             //     session: session,
// //             //     incomingSession: null
// //             //   });

// //               state.session = null;
// //               state.incomingSession = null;
// //           } else {
// //             let data = RNCallKeepData
// //             data.session = session
// //             RNCallKeepData = data
// //             // this.setState({ session: session })
// //             state.session = session;
// //             // state.incomingSession = null;
// //             // RNCallKeep.isCallActive(this.getCurrentCallId());
// //           }

// //         });
// //       });

// //       // TODO: For testing.
// //       window.UA = _ua;
// //       _ua.start();
// //     } catch (error) {
// //       console.log(error);
// //     }


// //   }



// //   async function hangupCall () {
// //     console.log("Endinggg")
// //     // this.setState({ callState: 'none' })
// //     state.callState = 'none';

// //     console.log('sessionttt', session, state.session)
// //     // this.session.terminate(
// //     // 	{
// //     // 		'status_code'   : 486,
// //     // 		'reason_phrase' : 'Busy Here'
// //     // 	});

// //     // 	return;s
// //     RNCallKeep.endAllCalls();
// //     // if(this.state.session){
// //     state.session.terminate();
// //     // } else if(this.RNCallKeepData.session!==undefined){
// //     //     this.RNCallKeepData.session.terminate();
// //     // }else{
// //     // 	console.log('No sessions available')
// //     // }
// //   }



// // //  async function handleOutgoingCall (call){
// // try{
// //     console.log('handleOutgoingCall:::=>')
// // var as = '816807260s'
// //     const num = `${call}@103.27.86.24:3006`;
// //     console.log('Calling', num)
// //     if (num.length === 0) {
// //       return;
// //     }
// //     var media = ''
// //     const session = _ua.call(num, {
// //       // extraHeaders: [ 'X-Foo: foo', 'CallMedia:'+media ],
// //       pcConfig: {
// //         rtcpMuxPolicy: 'negotiate',
// //         iceServers:
// //           [
// //             // { urls: ['stun:stun.l.google.com:19302', 'stun:stun.ososweb.com'] },
// //             // { urls: [ 'stun:stun.ososweb.com' ] }
// //           ]
// //       },
// //       mediaConstraints:
// //       {
// //         audio: true,
// //         video: false
// //       },
// //       rtcOfferConstraints:
// //       {
// //         offerToReceiveAudio: 1,
// //         offerToReceiveVideo: 0,
// //       }
// //     });




// //     console.log('Sessiom',session)
// //     // const session = this._ua.call(num,options)
// //     session.on('connecting', () => {
// //       console.log('connecting')
// //       var numToDisplay = 'Spaarks'
// //       if (isIOS) {
// //         // this.setState({ session })
// //         state.session = session;
// //         // .startCall
// //         console.log('Callingggggs')
// //         // RNCallKeep.startCall('11edc52b-2918-4d71-9058-f7285e29d894', numToDisplay, 'Saikiran', 'number', false)
// //         RNCallKeep.startCall('11edc52b-2918-4d71-9058-f7285e29d894', num, 'Saikiran', 'number', false)
// //         // RNCallKeep.startCall(currentCallId, '8008551266', 'Spaarks', 'number', false);
// //         // this.setState({ callState: 'going' })
// //         state.callState = 'going';

// //         navigation.navigate('OutGoingCallScreen',{name:'Saikiran',profilePic:'https://wallpaperaccess.com/full/2213426.jpg'})
// //         // RNCallKeep.startCall(num, "unknown", "generic", media==='audio');
// //       }

// //     });

// //     session.on('progress', () => {
// //       console.log('progress call')
// //     });

// //     session.on('failed', (data) => {
// //       alert('failed');
// //       // RNCallKeep.endAllCalls();
// //       RNCallKeep.endAllCalls();

// //       // RNCallKeep.endCall(this.currentCallId)
// //       session.terminate(
// //         {
// //           'status_code': 486,
// //           'reason_phrase': 'Busy Here'
// //         });

// //       return;
// //       this.setState({ session: null });

// //     });

// //     session.on('muted', (data) => {
// //       console.log('session mute event', data);
// //     })

// //     session.on('unmuted', (data) => {
// //       console.log('session unmuted event', data);

// //     })

// //     session.on('ended', () => {
// //       // RNCallKeep.endCall(this.getCurrentCallId())
// //       RNCallKeep.endAllCalls();
// //       state.session.terminate(
// //         {
// //           'status_code': 486,
// //           'reason_phrase': 'Busy Here'
// //         });




// //       // return;
// //     //   this.setState({ session: null });

// //       state.session = null
// //     });

// //     session.on('accepted', () => {
// //       console.log(':::call accepted:::')

// //     });

// //   }catch(err){
// //     console.log('Error',err)
// //   }

// //   }

//   var ban = 0;
//   const Chatdispatcher = useDispatch(chatReducers);
//   global.Chatdispatchers = Chatdispatcher;
//   // const { toast } = useToast()
//   const [isVisible, setIsVisible] = useState(true);
//   const list = [
//     { title: 'List Item 1' },
//     { title: 'List Item 2' },
//     {
//       title: 'Cancel',
//       containerStyle: { backgroundColor: 'red' },
//       titleStyle: { color: 'white' },
//       onPress: () => setIsVisible(false),
//     },
//   ];

// // if(route.params.isFromNew){
// //    getData();
// //   setRefreshing(true);
// // }


//   const [extraThings,setExtraThings] = useState(true)
//   const [selectedPreference,setSelectedPreference] = useState(true)
//   const [latitude,setLatitude] = useState(null)
//   const [longitude,setLongitude] = useState(null)
//   const [allPostsPage,setallPostsPage] = useState(allPosts.slice(0,30))

//   async function getLocationData(){
//   //  var latitudes = await AsyncStorage.getItem('latitude');
//   //  var  longitudes = await AsyncStorage.getItem('longitude');

//   this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
//     // alert('getLocationData',locations[0].latitude)
//     // alert('getLocationData',locations[0].longitude)
//     // setLatitude(Number(locations[0].latitude))
//     // setLongitude(Number(locations[0].longitude))
//   });


//   }
//   const viewShotRef = useRef();
//  async function captureViewShot(post){

//     const imageUri = await viewShotRef.current.capture();

//     await Share.share({
//       title:`${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
//       Connect to your local area wherever you go.`,
//       url:imageUri
//     });
//     // setExtraThings(true)
//   }

//   const [refreshing, setRefreshing] = React.useState(false);
//   const onRefresh = React.useCallback(async () => {
//     setRefreshing(true);
//     await getData('All','');
//     wait(2000).then(() => setRefreshing(false));

//   }, []);

//   const DashboardReducer = (prevState, action) => {
//     switch (action.type) {
//       case "SETPOSTS":
//         return {
//           ...prevState,
//           posts: action.posts,
//           allPosts:action.allPosts,
//           isLoading: false,
//           beyond: action.postBeyond,
//           banners:action.banners,
//           allPostsPage:action.allPosts
//         };

//       case "UPDATELOCATION":
//         return {
//           ...prevState,
//           latitude: action.latitude,
//           longitude: action.longitude,
//         };

//       case "SETPOSTSBEYOND":
//         return {
//           ...prevState,
//           beyond: action.postBeyond,
//           isLoading: false,
//         };
//       case "SETPREFERENCES":
//         return {
//             ...prevState,
//             preferences: action.preferences,
//             isLoading: false,
//           };  
//       case "SETPOSTSCOUNT":
//           return {
//                 ...prevState,
//                 postsCount: action.postsCount,
//           }; 

//           case "SETFETCHING":
//             return {
//                   ...prevState,
//                   fetching_from_server: action.fetching_from_server,
//                   allPosts:action.allPosts,
//                   page:action.page
//             };    

//             case "SETLOADINGMORE":
//               return {
//                     ...prevState,
//                     allPostsPage: action.allPostsPage
//               };    

//     }
//   };
//   // if(setLoading == "true"){
//   //   console.log("true aga")
//   //   onRefresh()
//   // }else{
//   //   console.log("Againnn fas")
//   //   // onRefresh()
//   // }
//   const initialState = {
//     isLoading: false,
//     isFromNew:false,
//     allPostsPage:allPosts.slice(30),
//     completed: 0,
//     pending: 0,
//     issues: 0,
//     payment: 0,
//     latitude: null,
//     longitude: null,
//     errorMsg: null,
//     userToken: null,
//     posts: [],
//     beyond: [],
//     banners:[],
//     page:1,
//     allPosts:allPosts,
//     fetching_from_server:false,
//     preferences:[{category:'Plumber'},{category:'Electrician'}],
//     postsCount:allPosts.length
//   };
//   const [isLoadingOnChange, setIsLoadingOnChange] = React.useState(false); 
//   const [isLoading, setIsLoading] = React.useState(true);
//   const [isLoadingg, setIsLoadingg] = React.useState(true);
//   const [errorMsg, setErrorMsg] = React.useState(null);
//   const [userToken, setUserToken] = React.useState(null);
//   const [preferences, setPreferences] = React.useState(null);
//   const [posts, setPosts] = React.useState(null);
//   const [beyond, setPostsbeyond] = React.useState(null);
//   const [searchQuery, setSearchQuery] = React.useState("");
//   const onChangeSearch = async (query) => {
//     // console.log("Inn");
//     await axios.get(GLOBAL.PLAIN_URL+"search/" + query).then((resp) => {
//       console.log(resp);
//     });
//     // console.log(query);
//     setSearchQuery(query);
//   };
//   const [DashboardState, dispatch] = React.useReducer(
//     DashboardReducer,
//     initialState
//   );
//   const [canPosts, setCanPost] = React.useState(false);
//   global.dispatch = dispatch;

//   async function callAxios(name) {
//     // console.log(name);
//     await axios.get("http://103.27.86.34:3005/search/" + name).then((resp) => {
//       // console.log(resp.data);
//     });
//   }

//   async function BottomSheet() {
//     return (
//       <View>
//         <View style={{ flexDirection: "column" }}>
//           <View style={{ flex: 1, color: "#000" }}>
//             <Text style={{ color: "#000" }}>Report Spaark</Text>
//             <Text>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//             </Text>
//           </View>
//         </View>
//       </View>
//     );
//   }
//   async function getData(category,subCategory) {
//     try {
//       // setIsLoadingOnChange(true)
//       // this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
//       //   // alert('getLocationData',locations[0].latitude)
//       //   // alert('getLocationData',locations[0].longitude)
//       //   setLatitude(Number(locations[0].latitude))
//       //   setLongitude(Number(locations[0].longitude))
//       // });
// //       RNLocation.configure({ distanceFilter: null });
// // RNLocation.getLatestLocation({ timeout: 100 })
// //   .then(latestLocation => {
// //     // Use the location here
// //     // alert('latestLocationlatestLocationlatestLocation',latestLocation)
// //     console.log('latestLocationlatestLocationlatestLocationlatestLocationlatestLocationlatestLocationlatestLocation',latestLocations)

// //   })
// // let latitudes = await AsyncStorage.getItem("latitude");
// // let longitudes = await AsyncStorage.getItem("longitude");
// // console.log('-------------------------')
// // console.log(latitudes)
// // console.log(longitudes)
// // console.log('-------------------------')
// // setLatitude(Number(latitudes))
// // setLongitude(Number(longitudes))

//       var a =  canPost();
//       setCanPost(a)
//       let userToken = await AsyncStorage.getItem("userToken");
//       let username = await AsyncStorage.getItem("username");
//       // let pref = await AsyncStorage.getItem("prefernces");
//       setUserToken(userToken);
//       // setPreferences(JSON.parse(pref));
//       // console.log("final", JSON.parse(pref));
//       var data = {
//         latitude: 17.4079,
//         longitude: 78.4437,
//         radius: 1000,
//       };
//       if(category == 'All'){
//         setSelectedPreference('All')
//         // alert(latitude)
//         // alert(longitude)
//       var a = await axios.post(
//         GLOBAL.BASE_URL+"user/post/static",
//         {
//           "latitude": 17.4079,
//           "longitude": 78.4437,
//           "radius":10000,
//           "category":'all',
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization:
//               GLOBAL.TOKEN,
//           },
//         }
//       );
//       setallPostsPage(a.data.data.post.slice(30))
//       // dispatch({ type: "SETPOSTS",allPosts:a.data.data.post, posts: a.data.data.post,postBeyond: a.data.data.postBeyond,banners: a.data.data.banner});
//       Chatdispatcher({type:'SETALLPOSTS',allPosts:a.data.data.post,postBeyond: a.data.data.postBeyond,banners: a.data.data.banner})
//       Chatdispatcher({ type: 'SETMAPPOSTSALL',whatToShow:a.data.data.post.slice(0, 30),allMapPosts:a.data.data.post.slice(0, 30)})

//       // dispatch({ type: "SETPOSTSBEYOND", postBeyond: a.data.data.postsBeyond });
//       }else{

//         var a = await axios.post(
//           GLOBAL.BASE_URL+"market/post/static",
//           {
//             latitude: latitude,
//             longitude: longitude,
//             category: category,
//             subCategory:subCategory
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization:
//                 GLOBAL.TOKEN,
//             },
//           }
//         );

//         setSelectedPreference(subCategory)
//         dispatch({ type: "SETPOSTS", posts: a.data.data.post,postBeyond: a.data.data.postBeyond });
//         // dispatch({ type: "SETPOSTSBEYOND", postBeyond: a.data.data.postBeyond });
//       }
//       setIsLoadingOnChange(false)
//       // setIsLoading(false);
//     } catch (e) {
//       console.log("in error", e);
//     }
//   }
//   async function sendLocation(a, b) {
//     let locationData = {
//       latitude: a,
//       longitude: b,
//     };
//     if (a != null && b != null) {
//       // console.log("Server Location", locationData, DashboardState.userToken);
//       let userToken = await AsyncStorage.getItem("userToken");
//       await axios
//         .post(
//           "https://bda.ososweb.com/api/bda/updateuserlocation",
//           locationData,
//           { headers: { Authorization: "Bearer " + userToken } }
//         )
//         .then(
//           (resp) => {
//             try {
//               // console.log(resp.data);
//               Alert.alert("Location Updated", "Updating the location success", [
//                 { text: "Okay" },
//               ]);
//             } catch (err) {
//               console.log(err);
//             }
//           },
//           (error) => {
//             // console.log(resp.data);
//             Alert.alert("Something Went wrong", "Updating the location", [
//               { text: "Okay" },
//             ]);
//           }
//         );
//     }
//   }
//   async function getRoster() {
//     var rosterListAnonymous = await axios.post(
//       GLOBAL.BASE_URL+"user/chatRoster",
//       {
//         mjid: 2,
//         data: [],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             GLOBAL.TOKEN,
//         },
//       }
//     );
//     var rosterListMain = await axios.post(
//       GLOBAL.BASE_URL+"user/chatRoster",
//       {
//         mjid: 1,
//         data: [],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             GLOBAL.TOKEN,
//         },
//       }
//     );

//     console.log("POST", rosterListMain.data);
//     rosterListMain.data.forEach(async (user) => {
//       var eachuser = {
//         _id: user._id,
//         aid: user.aid,
//         blocked: user.blocked,
//         blockedMe: user.blockedMe,
//         canResume: user.canResume,
//         chatExit: user.chatExit,
//         chatExitMe: user.chatExitMe,
//         clearChat: user.clearChat,
//         contactMe: user.contactMe,
//         jid: user.jid,
//         name: user.name,
//         message:'',
//         messages:[],
//         offline_count: user.offline_count,
//         profilePic: user.profilePic,
//         userId: user.userId,
//         updatedAt: Date.now(),
//       }
//       await axios
//       .get(
//         `http://103.27.86.24:3005/getmessages/6094e7b46e8d967dd5fc5fff/${eachuser.userId}`
//       )
//       .then((resp) => {
//         console.log("Mess Data",resp.data.data)
//         resp.data.data.forEach((list) => {
//           var message = JSON.parse(list.txt);
//           if (message.type == "chat") {
//             if(list.xml.includes(`from='${eachuser.userId}`)){
//               var mymes = {
//                 content: message.content,
//                 text: message.content,
//                 createdAt: list.created_at,
//                 _id: Date.now()* Math.random(),
//                 unique: message.unique,
//                 sent: true,
//                 received: true,
//                 type: "chat",
//                 user: {
//                   _id: 1,
//                   name: eachuser.name,
//                   avatar: eachuser.profilePic,
//                 },
//               };
//               eachuser.messages.splice(0, 0, mymes);
//               eachuser.message = message.content;
//             }else{
//               var mymes = {
//                 content: message.content,
//                 text: message.content,
//                 createdAt: list.created_at,
//                 _id: Date.now()* Math.random(),
//                 unique: message.unique,
//                 sent: true,
//                 received: true,
//                 type: "chat",
//                 user: {
//                   _id: 2,
//                   name: eachuser.name,
//                   avatar:eachuser.profilePic,
//                 },
//               };
//               eachuser.messages.splice(0, 0, mymes);
//               eachuser.message = message.content;
//             }

//           }
//           if (message.type == "image") {

//             if(list.xml.includes(`from='${eachuser.userId}`)){
//               var mymes = {
//                 content: message.content,
//                 image: message.content,
//                 createdAt: list.created_at,
//                 _id: Date.now()* Math.random(),
//                 unique: message.unique,
//                 // sent: true,
//                 // received: true,
//                 type: "chat",
//                 user: {
//                   _id: 1,
//                   name: eachuser.name,
//                   avatar: eachuser.profilePic,
//                 },
//               };
//               eachuser.messages.splice(0, 0, mymes);
//               eachuser.message = 'IMAGE';
//             }else{
//               var mymes = {
//                 content: message.content,
//                 image: message.content,
//                 createdAt: list.created_at,
//                 _id: Date.now()* Math.random(),
//                 unique: message.unique,
//                 // sent: true,
//                 // received: true,
//                 type: "chat",
//                 user: {
//                   _id: 2,
//                   name: user.name,
//                   avatar: user.profilePic,
//                 },
//               };
//               eachuser.messages.splice(0, 0, mymes);
//               eachuser.message = 'IMAGE';
//             }
//           }
//           if (message.type == "video") {

//             if(list.xml.includes(`from='${eachuser.userId}`)){
//               var mymes = {
//                 content: message.content,
//                 video: message.content,
//                 createdAt: list.created_at,
//                 _id: Date.now()* Math.random(),
//                 unique: message.unique,
//                 // sent: true,
//                 // received: true,
//                 type: "chat",
//                 user: {
//                   _id: 1,
//                   name: eachuser.name,
//                   avatar: eachuser.profilePic,
//                 },
//               };
//               eachuser.messages.splice(0, 0, mymes);
//               eachuser.message = 'VIDEO';
//             }else{
//               var mymes = {
//                 content: message.content,
//                 video: message.content,
//                 createdAt: list.created_at,
//                 _id: Date.now()* Math.random(),
//                 unique: message.unique,
//                 // sent: true,
//                 // received: true,
//                 type: "chat",
//                 user: {
//                   _id: 2,
//                   name: user.name,
//                   avatar: user.profilePic,
//                 },
//               };
//               eachuser.messages.splice(0, 0, mymes);
//               eachuser.message = 'VIDEO';
//             }
//           }
//         });
//       });

//       Chatdispatcher({
//         type: "ADDTOROSTERMAIN",
//         _id: eachuser._id,
//         aid: eachuser.aid,
//         blocked: eachuser.blocked,
//         blockedMe: eachuser.blockedMe,
//         canResume: eachuser.canResume,
//         chatExit: eachuser.chatExit,
//         chatExitMe: eachuser.chatExitMe,
//         clearChat: eachuser.clearChat,
//         contactMe: eachuser.contactMe,
//         jid: eachuser.jid,
//         name: eachuser.name,
//         messages:eachuser.messages,
//         message : eachuser.message,
//         offline_count: eachuser.offline_count,
//         profilePic: eachuser.profilePic,
//         userId: eachuser.userId,
//         updatedAt: Date.now(),
//       });
//     });
//     // rosterListAnonymous.data.forEach((list) => {
//     //   Chatdispatcher({
//     //     type: "ADDTOROSTERANONYMOUS",
//     //     _id: list._id,
//     //     aid: list.aid,
//     //     blocked: list.blocked,
//     //     blockedMe: list.blockedMe,
//     //     canResume: list.canResume,
//     //     chatExit: list.chatExit,
//     //     chatExitMe: list.chatExitMe,
//     //     clearChat: list.clearChat,
//     //     contactMe: list.contactMe,
//     //     jid: list.jid,
//     //     name: list.name,
//     //     offline_count: list.offline_count,
//     //     profilePic: list.profilePic,
//     //     userId: list.userId,
//     //   });
//     // });
//     // Chatdispatcher({ type: "SETLOADING", chatLoading: false });
//     Chatdispatcher({ type: "SETMAINLOADING", main_loading: false });


//   }


//   async function setMessages(chat_roster_main) {
//     Chatdispatcher({ type: "SETLOADING", chatLoading: true });
//     console.log("chat_roster_mainn", chat_roster_main);
//     // console.log("messages", messages);

//     // _.uniq(messages, 'unique');

//     chat_roster_main.forEach(async (user) => {
//       await axios
//         .get(
//           `http://103.27.86.24:3005/getmessages/6094e7b46e8d967dd5fc5fff/${user.userId}`
//         )
//         .then((resp) => {
//           resp.data.data.forEach((list) => {
//             var message = JSON.parse(list.txt);
//             if (message.type == "chat") {
//               if(list.xml.includes(`from='${user.userId}`)){
//                 var mymes = {
//                   content: message.content,
//                   text: message.content,
//                   createdAt: list.created_at,
//                   _id: Date.now()* Math.random(),
//                   unique: message.unique,
//                   sent: true,
//                   received: true,
//                   type: "chat",
//                   user: {
//                     _id: 1,
//                     name: user.name,
//                     avatar: user.profilePic,
//                   },
//                 };
//                 user.messages.splice(0, 0, mymes);
//                 user.updatedAt = list.created_at;
//                 user.message = message.content
//               }else{
//                 var mymes = {
//                   content: message.content,
//                   text: message.content,
//                   createdAt: list.created_at,
//                   _id: Date.now()* Math.random(),
//                   unique: message.unique,
//                   sent: true,
//                   received: true,
//                   type: "chat",
//                   user: {
//                     _id: 2,
//                     name: user.name,
//                     avatar: user.profilePic,
//                   },
//                 };
//                 user.messages.splice(0, 0, mymes);
//                 user.updatedAt = list.created_at;
//                 user.message = message.content
//               }

//             }
//             if (message.type == "image") {

//               console.log('In Imageeee')
//               if(list.xml.includes(`from='${user.userId}`)){
//                 var mymes = {
//                   content: message.content,
//                   image: message.content,
//                   createdAt: list.created_at,
//                   _id: Date.now()* Math.random(),
//                   unique: message.unique,
//                   // sent: true,
//                   // received: true,
//                   type: "chat",
//                   user: {
//                     _id: 1,
//                     name: user.name,
//                     avatar: user.profilePic,
//                   },
//                 };
//                 user.messages.splice(0, 0, mymes);
//                 user.updatedAt = list.created_at;
//                 user.message = 'IMAGE'
//               }else{
//                 var mymes = {
//                   content: message.content,
//                   image: message.content,
//                   createdAt: list.created_at,
//                   _id: Date.now()* Math.random(),
//                   unique: message.unique,
//                   // sent: true,
//                   // received: true,
//                   type: "chat",
//                   user: {
//                     _id: 2,
//                     name: user.name,
//                     avatar: user.profilePic,
//                   },
//                 };
//                 user.messages.splice(0, 0, mymes);
//                 user.updatedAt = list.created_at;
//                 user.message = 'IMAGE'
//               }
//             }
//             if (message.type == "video") {

//               if(list.xml.includes(`from='${user.userId}`)){
//                 var mymes = {
//                   content: message.content,
//                   video: message.content,
//                   createdAt: list.created_at,
//                   _id: Date.now()* Math.random(),
//                   unique: message.unique,
//                   // sent: true,
//                   // received: true,
//                   type: "chat",
//                   user: {
//                     _id: 1,
//                     name: user.name,
//                     avatar: user.profilePic,
//                   },
//                 };
//                 user.messages.splice(0, 0, mymes);
//                 user.updatedAt = list.created_at;
//                 user.message = 'VIDEO'
//               }else{
//                 var mymes = {
//                   content: message.content,
//                   video: message.content,
//                   createdAt: list.created_at,
//                   _id: Date.now()* Math.random(),
//                   unique: message.unique,
//                   // sent: true,
//                   // received: true,
//                   type: "chat",
//                   user: {
//                     _id: 2,
//                     name: user.name,
//                     avatar: user.profilePic,
//                   },
//                 };
//                 user.messages.splice(0, 0, mymes);
//                 user.updatedAt = list.created_at;
//                 user.message = 'VIDEO'
//               }
//             }
//           });
//         });
//       // await axios
//       //   .get(
//       //     `http://103.27.86.24:3005/getmessages/${user.userId}/6094e7b46e8d967dd5fc5fff@chat.spaarksweb.com`
//       //   )
//       //   .then((resp) => {
//       //     resp.data.data.forEach((list) => {
//       //       var message = JSON.parse(list.txt);
//       //       if (message.type == "chat") {
//       //         var message = JSON.parse(list.txt);
//       //         var mymes = {
//       //           content: message.content,
//       //           text: message.content,
//       //           createdAt: list.created_at,
//       //           _id: list._id,
//       //           unique: message.unique,
//       //           // sent: true,
//       //           // received: true,
//       //           type: "chat",
//       //           user: {
//       //             _id: 1,
//       //             name: user.name,
//       //             avatar: user.profilePic,
//       //           },
//       //         };
//       //         user.messages.push(mymes);
//       //       }
//       //       if (list.type == "image") {
//       //         var message = JSON.parse(list.txt);
//       //         var mymes = {
//       //           content: message.content,
//       //           image: message.content,
//       //           createdAt: list.created_at,
//       //           _id: list._id,
//       //           unique: message.unique,
//       //           // sent: true,
//       //           // received: true,
//       //           type: "chat",
//       //           user: {
//       //             _id: 1,
//       //             name: user.name,
//       //             avatar: user.profilePic,
//       //           },
//       //         };
//       //         user.messages.push(mymes);
//       //       }
//       //     });

//       //   });
//       if(user.messages.length>0){
//         user.updatedAt = user.messages[0].createdAt;
//       }else{
//         user.updatedAt = -1;
//       }

//       // var this_chat = chat_roster_main.find(item => item.jid == user.jid);
//       // console.log("this_chat",this_chat)
//       // messages.forEach((list,i)=>{
//       //   if(list.from.substr(0,44) == "601529574c91aa34f9b04b61@chat.spaarksweb.com" && list.to.substr(0,44) == user.jid){
//       //    if(list.type == 'chat'){
//       //     var mymes = {
//       //       content:list.content,
//       //       text:list.content,
//       //       createdAt:Number(list.unique),
//       //       _id:Date.now(),
//       //       unique:list.unique,
//       //       // sent: true,
//       //       // received: true,
//       //       type:'chat',
//       //       user:{
//       //         "_id": 2,
//       //         name: user.name,
//       //         avatar: user.profilePic,
//       //       }
//       //     }
//       //     user.messages.push(mymes)
//       //    }
//       //   //  if(list.type== 'image'){
//       //   //   var mymes = {
//       //   //     content:list.content,
//       //   //     image:list.content,
//       //   //     createdAt:list.unique,
//       //   //     _id:list.unique,
//       //   //     unique:list.unique,
//       //   //     // sent: true,
//       //   //     // received: true,
//       //   //     type:'image',
//       //   //     user:{
//       //   //       "_id": 2,
//       //   //       name: user.name,
//       //   //       avatar: user.profilePic,
//       //   //     }
//       //   //   }
//       //   //   user.messages.push(mymes)
//       //   //  }
//       //   //  if(list.type== 'video'){
//       //   //   var mymes = {
//       //   //     content:list.content,
//       //   //     video:list.content,
//       //   //     createdAt:list.unique,
//       //   //     _id:list.unique,
//       //   //     unique:list.unique,
//       //   //     // sent: true,
//       //   //     // received: true,
//       //   //     type:'video',
//       //   //     user:{
//       //   //       "_id": 2,
//       //   //       name: user.name,
//       //   //       avatar: user.profilePic,
//       //   //     }
//       //   //   }
//       //   //   user.messages.push(mymes)
//       //   //  }
//       //   messages.splice(i,1)
//       //   }
//       //   if(list.from.substr(0,44) == user.jid  && list.to.substr(0,44) == "601529574c91aa34f9b04b61@chat.spaarksweb.com"){
//       //     if(list.type == 'chat'){
//       //       var mymes = {
//       //         content:list.content,
//       //         text:list.content,
//       //         createdAt:list.unique,
//       //         _id:Date.now(),
//       //         unique:list.unique,
//       //         // sent: true,
//       //         type:'chat',
//       //         user:{
//       //           "_id": 1,
//       //           name: user.name,
//       //           avatar: user.profilePic,
//       //         }
//       //       }
//       //       user.messages.push(mymes)
//       //      }
//       //     //  if(list.type== 'image'){
//       //     //   var mymes = {
//       //     //     content:list.content,
//       //     //     image:list.content,
//       //     //     createdAt:list.unique,
//       //     //     _id:list.unique,
//       //     //     unique:list.unique,
//       //     //     // sent: true,
//       //     //     type:'image',
//       //     //     user:{
//       //     //       "_id": 1,
//       //     //       name: user.name,
//       //     //       avatar: user.profilePic,
//       //     //     }
//       //     //   }
//       //     //   user.messages.push(mymes)
//       //     //  }
//       //     //  if(list.type== 'video'){
//       //     //   var mymes = {
//       //     //     content:list.content,
//       //     //     video:list.content,
//       //     //     createdAt:list.unique,
//       //     //     _id:list.unique,
//       //     //     unique:list.unique,
//       //     //     // sent: true,
//       //     //     type:'video',
//       //     //     user:{
//       //     //       "_id": 1,
//       //     //       name: user.name,
//       //     //       avatar: user.profilePic,
//       //     //     }
//       //     //   }
//       //     //   user.messages.push(mymes)
//       //     //  }
//       //     messages.splice(i,1)
//       //   }

//       // })
//       Chatdispatcher({
//         type: "SETMYMESSAGEMAIN",
//         chat_roster_main: chat_roster_main,
//       });
//     });


//     Chatdispatcher({ type: "SETLOADING", chatLoading: false });
//     // connectXMPP(chat_roster_main,Chatdispatcher);
//   }

//   const onRemoteNotification = (notification) => {
//     const isClicked = notification.getData().userInteraction === 1;

//     if (isClicked) {
//       // Navigate user to another screen
//     } else {
//       // Do something else with push notification
//     }
//   };
//   // try{
//   //   if(route.params.preferences.length){
//   //     console.log("From Search Screen")
//   //     alert('Search Screen')
//   //     dispatch({type:'SETPREFERENCES',preferences:route.params.preferences})
//   //   }
//   //   else{

//   //   }

//   //   }catch(err){
//   //     console.log("Error",err)
//   //   }
//   useEffect(async () => {
//     // getPermissions()
//     // PushNotificationIOS.addEventListener('notification', onRemoteNotification);
//     getLocationData()
//     // var pref = JSON.parse(await AsyncStorage.getItem('prefernces'));
//     // var a = JSON.parse(pref)
//     // a.splice(0,0,{_id:"6082b89aa1c92a56e91941b2",categoryId:"C0001",category:"All",image:100,"__v":0})

//     callKeepSetup()
//     handleAPNs()
//     getData('All','');

//     // setTimeout(() => {
//     //   getData('All','');
//     // }, 2000);

//     // getRoster();
//     // setMessages(chat_roster_main);
//     // console.log('preferencesspreferencess',preferencess)
//     // console.log("From Direct")
//     // alert('Direct')

//     // Chatdispatchers({type:'SETPREFERENCES',});


//     //   const getResult = async () => {
//     //     const token = (await Notifications.getDevicePushTokenAsync()).data
//     //     console.log(token)

//     //  let { status } = await Location.requestPermissionsAsync();
//     //  if (status !== 'granted') {
//     //    setErrorMsg('Permission to access location was denied');
//     //    return;
//     //  }



//     // }
//   }, []);

//   const loadMoreData = async() => {

//         // setLoading(true);


//   await axios.post(
//       GLOBAL.BASE_URL+"market/post/static",
//     {
//      latitude: 17.4079,
//      longitude: 78.4437,
//      category:"all",
//      page:offset
// },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             GLOBAL.TOKEN,
//         },
//       }
//     ).then((response) => response.json())
//     .then((responseJson) => {
//       console.log('responseJson',responseJson)
//       //Successful response from the API Call
//       // setOffset(offset + 1);
//       // //After the response increasing the offset for the next API call.
//       // setDataSource([...dataSource, ...responseJson.results]);
//       // setLoading(false);
//     })
//     .catch((error) => {
//       console.error(error);
//     });

//     // setallPostsPage([...allPostsPage,...a.data.data.post.slice(2)])
//     // dispatch({type:'SETLOADINGMORE',allPostsPage:allPostsPage})

//     // allPosts = allPosts.slice(0,30)
//     // dispatch({type:'SETFETCHING',fetching_from_server:true,allPosts:DashboardState.allPosts.slice(0,30),page:DashboardState.page++})

//   //  setTimeout(() => {
//   //   dispatch({type:'SETFETCHING',fetching_from_server:false})
//   //  }, 2000);
//       // this.setState({ fetching_from_server: true }, () => { 
//       //   //fetch('http://aboutreact.com/demo/getpost.php?offset=' + this.offset)
//       //   fetch('https://www.doviz.com/api/v1/currencies/all/latest')
//       //       .then(response => response.json())
//       //       .then(responseJson => {
//       //        responseJson = responseJson.slice((this.offset*12),((this.offset+1)*12)-1)
//       //         console.log("offset Load : "+this.offset);
//       //       console.log(responseJson);
//       //       //Successful response from the API Call 
//       //         this.offset = this.offset + 1;

//       //         //After the response increasing the offset for the next API call.
//       //         this.setState({
//       //           //serverData: [...this.state.serverData, ...responseJson.results],
//       //           serverData: [...this.state.serverData, ...responseJson],
//       //           fetching_from_server: false,
//       //           //updating the loading state to false
//       //         });
//       //       })
//       //       .catch(error => {
//       //         console.error(error);
//       //       });
//       // });
//     };  


//     const getDatas = () => {
//       console.log('getData');
//       setLoadings(true);
//       //Service to get the data from the server to render
//       // fetch('https://aboutreact.herokuapp.com/getpost.php?offset=' + offset)
//       //   //Sending the currect offset with get request
//       //   .then((response) => response.json())
//       //   .then((responseJson) => {
//       //     //Successful response from the API Call
//       //     setOffset(offset + 1);
//       //     //After the response increasing the offset for the next API call.
//       //     setDataSource([...dataSource, ...responseJson.results]);
//       //     setLoadings(false);
//       //   })
//       //   .catch((error) => {
//       //     console.error(error);
//       //   });
//     };


//   const ItemViews = ({item}) => {
//     return (
//       // Flat List Item
//       <Text style={styles.itemStyle} onPress={() => getItem(item)}>
//         {item.id}
//         {'.'}
//         {item.title.toUpperCase()}
//       </Text>
//     );
//   };
//     const renderFooter = () => {
//       return (
//       //Footer View with {I18n.t("Load More")} button
//         // <View style={styles.footer}>
//         //   <TouchableOpacity
//         //     activeOpacity={0.9}
//         //     onPress={loadMoreData}
//         //     //On Click of button calling loadMoreData function to {I18n.t("Load More")} data
//         //     >
//         //     <Text style={styles.btnText}>{I18n.t("Load More")}</Text>
//         //     {DashboardState.fetching_from_server ? (
//         //       <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
//         //     ) : null}
//         //   </TouchableOpacity>
//         // </View>
//         <View style={styles.footer}>
//         <TouchableOpacity
//           activeOpacity={0.9}
//           onPress={getDatas}
//           //On Click of button calling getData function to {I18n.t("Load More")} data
//           style={styles.loadMoreBtn}>
//           <Text style={styles.btnText}>{I18n.t("Load More")}</Text>
//           {loadings ? (
//             <ActivityIndicator color="white" style={{marginLeft: 8}} />
//           ) : null}
//         </TouchableOpacity>
//       </View>
//       );
//     }

//     const ItemSeparatorView = () => {
//       return (
//         // Flat List Item Separator
//         <View
//           style={{
//             height: 0.5,
//             width: '100%',
//             backgroundColor: '#C8C8C8',
//           }}
//         />
//       );
//     };

//   if (!main_loading) {
//     return (
//   <ScrollView>
//   <View style={styles.eachCards}>

//      <SkeletonPlaceholder>
//       <View style={{ flexDirection: "row", alignItems: "center" }}>
//         <View style={{ width: 60, height: 60, borderRadius: 50 }} />
//         <View style={{ marginLeft: 20 }}>
//           <View style={{ width: 120, height: 20, borderRadius: 4 }} />
//           <View
//             style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
//           />
//         </View>
//       </View>
//       <View>
//         <View
//           style={{ width: 350, height: 20, borderRadius: 4, marginTop: 10 }}
//         />

//         <View
//           style={{ marginTop: 6, width: 170, height: 20, borderRadius: 4 }}
//         />
//         <View
//           style={{ width: 350, height: 20, borderRadius: 4, marginTop: 5 }}
//         />
//         <View
//           style={{ width: 350, height: 120, borderRadius: 4, marginTop: 5 }}
//         />
//       </View>

//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           marginTop: 20,
//         }}
//       >
//         <View style={{ width: 60, height: 60, borderRadius: 50 }} />
//         <View style={{ marginLeft: 20 }}>
//           <View style={{ width: 120, height: 20, borderRadius: 4 }} />
//           <View
//             style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
//           />
//         </View>
//       </View>
//       <View>
//         <View
//           style={{ width: 350, height: 20, borderRadius: 4, marginTop: 10 }}
//         />

//         <View
//           style={{ marginTop: 6, width: 170, height: 20, borderRadius: 4 }}
//         />
//         <View
//           style={{ width: 350, height: 20, borderRadius: 4, marginTop: 5 }}
//         />
//         <View
//           style={{ width: 350, height: 120, borderRadius: 4, marginTop: 5 }}
//         />
//       </View>

//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           marginTop: 20,
//         }}
//       >
//         <View style={{ width: 60, height: 60, borderRadius: 50 }} />
//         <View style={{ marginLeft: 20 }}>
//           <View style={{ width: 120, height: 20, borderRadius: 4 }} />
//           <View
//             style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
//           />
//         </View>
//       </View>
//       <View>
//         <View
//           style={{ width: 350, height: 20, borderRadius: 4, marginTop: 10 }}
//         />

//         <View
//           style={{ marginTop: 6, width: 170, height: 20, borderRadius: 4 }}
//         />
//         <View
//           style={{ width: 350, height: 20, borderRadius: 4, marginTop: 5 }}
//         />
//         <View
//           style={{ width: 350, height: 120, borderRadius: 4, marginTop: 5 }}
//         />
//       </View>

//     </SkeletonPlaceholder>
//   </View>
// </ScrollView>
//     );
//   }

// // if(DashboardState.posts.length>0){
// //   if(isLoadingg){
// //     onRefresh()
// //     setIsLoadingg(false)
// //   }

// // }


//   let text = "Waiting..";
//   if (errorMsg) {
//     text = errorMsg;
//   }

//   const image1 = {
//     uri:
//       "https://res.cloudinary.com/spaarks/image/upload/v1613973414/1_c6eigo.png",
//   };
//   const image2 = {
//     uri:
//       "https://res.cloudinary.com/spaarks/image/upload/v1613973414/2_xk7z2s.png",
//   };
//   const image3 = {
//     uri:
//       "https://res.cloudinary.com/spaarks/image/upload/v1613973414/3_rz8x8b.png",
//   };
//   const image4 = {
//     uri:
//       "https://res.cloudinary.com/spaarks/image/upload/v1613973415/4_s52qvz.png",
//   };
//   const { colors } = useTheme();
//   const theme = useTheme();
//   const images = [
//     "https://placeimg.com/640/640/nature",
//     "https://placeimg.com/640/640/people",
//     "https://placeimg.com/640/640/animals",
//     "https://placeimg.com/640/640/beer",
//   ];


//   var phones;
//   function updatePhone(phone){
//     // console.log(phone)
//     setPhone(phone)
//     // Login.current.open();
//   }
//   function updatePhones(phone){
//     // console.log(phone)
//     // setPhone(phone)
//     // Login.current.open();
//   }

//   if(!showTag){
//     // console.log("ShowTag",showTag)
//   }

//   const HomeScreen = ({ navigation }) => {
//     const [currentPost, setCurrentPost] = React.useState(0);

//     async function setPosts(post){
//       setCurrentPost(post)
//     }

//     async  function selectedPostMap(post){
//       allMapPosts.splice(0, 0, post);
//       Chatdispatcher({type:'SETSHOWNOW',allMapPosts:allMapPosts})
//       navigation.navigate("MapScreen")
//     }

//  function openDots(i){
//   console.log(i)
//   // setCurrentPost(i)
//   global.postcurrent[0] = String(i);
//   console.log(global.postcurrent[0])
//   refRBSheet.current.open()

//   // setTimeout(() => {
//   //   setPosts(post)
//   // }, 1000);
//   // setPosts(post)
//   // if(canPosts){
//   //   refRBSheet.current.open()
//   // }else{
//   //   refRBSheet.current.open()
//   // }

// }
//     // const video = React.useRef(null);
//   const [activeIndex, setIndex] = React.useState(null);
// const refRBSheet = useRef();
// const refRBSheets = useRef();
// const refRBSheetss = useRef();
// const Login = useRef();
// const [phone, setPhone] = React.useState('');



//     async function showSnackBlock(){

//       refRBSheet.current.close()
//       Snackbar.show({
//         text: 'Blocked Saikiran Succesfully',
//         duration: Snackbar.LENGTH_LONG,
//         action: {
//           text: 'UNDO',
//           textColor: 'white',
//           onPress: () => { /* Do something. */ },
//         },
//       });
//     }


//     _renderItem = ({item, index}) => {
//       var as =[]
//       // console.log("Im inn",typeof item)
//       // if(item.length>0){
//         var a = String(item);
//         // console.log("asss",a)
//         // if(a == undefined){
//         // }else{
//           if(a){
//             console.log("Empty",a)
//             return (

//           <View style={{backgroundColor:"#000",  width:'100%',
//           height: 500}}>


//             {
//              a.slice(a.length - 3) == "mp4"?
//              <View>
//           {/* <Video
//           ref={video}
//             style={styles.video}
//             source={{
//               uri: item,
//             }}
//             useNativeControls
//             resizeMode="cover"
//             isLooping
//             // onPlaybackStatusUpdate={status => setStatus(() => status)}
//           /> */}
//           <Text style={{color:'red',justifyContent:'center',width:'100%'}}>{index+1}/ 4</Text>
//           </View>
//            :
//            <View>
//            <Image source={{uri:item}} cache="force-cache" style={{  width: 390,
//             height: 480,
//             resizeMode: "cover",}}></Image>
//        {/* <Text style={{color:'red',textAlign:'center',width:'100%'}}>{index+1}/ 4</Text> */}
//           </View>
//             } 
//         </View>
//         );
//           }else{

//           }
//           // }
//       // }else{

//       // }

//       // console.log(a.slice(a.length - 3))
//       // console.log(item.slice(item.length - 3))

//     }



//     const ItemView = ({item,index}) => {
//       return (


//       indexes.includes(index)?

//       <Image source={{uri:"https://static-content.spaarksweb.com/images/images/market/m2.png"}} style={{height:170,width:360,margin:10,resizeMode:'contain'}}></Image>:

//       item.featureName == "market" ? (

//       <ViewShot ref={viewShotRef}options={{format:'jpg',quality:1.0,result:'data-uri'}}>
//       <Card style={styles.eachCard}>
//       {
// ! extraThings &&
// <Image source={require('../assets/icons/download.png')} style={{height:50,width:400}}></Image>
// }
//         <View>
//           <View style={{ flexDirection: "row", marginBottom: 20 }}>
//             <View
//               style={{ flex: 3, paddingLeft: 20, paddingTop: 20 }}
//             >
//               <View style={{ flexDirection: "column" }}>
//                 <View style={{ flex: 2 }}>
//                   <Image
//                     source={{ uri: item.uservisibility.profilePic }}
//                     style={{
//                       height: 55,
//                       width: 55,
//                       paddingLeft: 20,
//                       borderRadius: 30,
//                     }}
//                   />
//                 </View>
//               </View>
//             </View>
//             <View
//               style={{
//                 flex: 20,
//                 paddingLeft: 40,
//                 paddingTop: 20,
//                 fontSize: 20,
//               }}
//             >
//               <Text style={{ fontWeight: "bold" }}>
//                 {item.uservisibility.name.substr(0,15)}
//               </Text>
//               <Text style={{ marginTop: 5 }}>{moment(item.createdAt).fromNow()}</Text>
//               <View style={{ flexDirection: "row" }}>
//               {item.isProvider == true ? (
//       <>
//         <View style={{ flex: 0 }}>
//           <Text
//             style={{
//               marginTop: 5,
//               fontSize: 15,
//               fontWeight: "bold",
//               color: "#6FA4E9",
//             }}
//           >
// {/* 
// {
//             l.reviews.length>0?
//            l.reviews[0].rating/5
//            :<>No ratings yet</>
//             } */}
//             {
//                item.reviews.length>0?

//               <Text>{item.reviews[0].rating}/5</Text>
//             :<></>

//             }
//           </Text>
//         </View>
//         <View style={{ flex: 8 }}>
//           {/* <Image
//             source={require("../assets/icons/rating.png")}
//             style={{ height: 20, width: 80 }}
//           ></Image> */}
//           {/* <Text>No ratings yet</Text> */}
//           {
//             item.reviews.length>0?
//           <Rating
//         fractions="1"
//         ratingColor="#f2f2f2"
//         tintColor="#fff"
//         startingValue={item.reviews[0].rating}
//         imageSize={22}
//         style={{
//           marginTop: 0,
//           backgroundColor: "#fff",
//           marginRight: 15,
//         }}
//       />
//       :<Text>0.0/5</Text>
// }
//         </View>
//       </>
//     ) : (
//       <View style={{flexDirection:'row'}}>
//       {
//         item.tags != undefined || item.tags.length>0 ?
//         item.tags.map((list, i) =>
//          <Chip
//          style={{
//            alignSelf: 'flex-start',
//            backgroundColor: list.color,
//          }}
//        >
//          <Text
//            style={{
//              color: "#fff",
//              marginTop: 0,
//              fontSize: 10,
//            }}
//          >
//            {list.name}
//          </Text>
//        </Chip>
//         ):<></>

//        }
//        </View>

//    )}
//               </View>
//             </View>
//             <View>

//                 <TouchableOpacity
//                   onPress={() => {
//                       return openDots(index);
//                     }}
//                 >
//                   <Image
//                     source={require("../assets/icons/dots.png")}
//                     style={{
//                       height: 23,
//                       width: 8,
//                       paddingLeft: 20,
//                       marginTop: 10,
//                     }}
//                   />
//                 </TouchableOpacity>

//             </View>
//           </View>
//           {/* Profile Tag and content */}
//           <View
//             style={{
//               paddingLeft: 10,
//               marginBottom: 0,
//               flexDirection: "column",
//             }}
//           >
//         {item.isProvider == true ? (
//   <>
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate("SellerProfile", {
//           userId: item.userId,
//           post: item,
//         })
//       }
//       style={{ backgroundColor: "#fff" }}
//     >
//       <View style={{ flex: 9 }}>
//         <Text
//           style={{ fontSize: 13, color: "#6FA4E9" }}
//         >
//           View Profile
//         </Text>
//         {
//                   item.tags != undefined?
//                   item.tags.map((list, i) =>
//                    <Chip
//                    style={{
//                      alignSelf: 'flex-start',
//                      backgroundColor: list.color,
//                    }}
//                  >
//                    <Text
//                      style={{
//                        color: "#fff",
//                        marginTop: 0,
//                        fontSize: 10,
//                      }}
//                    >
//                      {list.name}
//                    </Text>
//                  </Chip>
//                   ):<></>

//                  }
//       </View>
//     </TouchableOpacity>
//   </>
// ) : (
//   <Text></Text>
// )}
//             <View style={{  flex: 2 }}>

//               <Paragraph style={{ fontSize: 15 }}>

//               <View style={{ flex: 2 }}>
//             <Text style={{ fontSize: 15, paddingTop: 10 }} numberOfLines={5}>
//               {item.content} - {index}
//             </Text>
//             {item.content.length > 100 ? (
//          <TouchableOpacity
//          onPress={() =>
//            navigation.navigate("PostSpecificScreensFeed", {
//              post: item,
//            })
//          }
//          style={{ backgroundColor: "#fff" }}
//        >
//               <Text style={{ color: "#6FA4E9" }}>
//                 View more.
//               </Text>
//               </TouchableOpacity>
//             ) : (
//               <></>
//             )}
//           </View>
//               </Paragraph>

//             </View>
//           </View>
//         </View>

//         {/* Images Slider goes here */}
//         {/* {l.photo.length > 0 ? (
//           <ImageSlider
//             loop
//             autoPlayWithInterval={3000}
//             images={l.photo}
//             onPress={({ index }) => alert(index)}
//             customSlide={({ index, item, style, width }) => (
//               // It's important to put style here because it's got offset inside
//               <View key={index} style={[style, styles.customSlide]}>
//                 <Image
//                   source={{ uri: item }}
//                   style={styles.customImage}
//                 />
//               </View>
//             )}
//           />
//         ) : (
//           <Text></Text>
//         )} */}
//         {

// item.photo.length > 0 ?

// <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
// {/* <Carousel
// layout={"default"}
// // ref={ref => carousel = ref}
// data={[...item.photo]}
// sliderWidth={450}
// itemWidth={450}
// renderItem={_renderItem}
// // onSnapToItem = { index => setIndex(index) }
// /> */}

// <FlatList
//    data={[...item.photo]}
//    horizontal={true}
//    showsHorizontalScrollIndicator={false} 
//    renderItem={({ item,i }) => (
// <View style={{marginRight:10}}>
// <TouchableOpacity activeOpacity={1}  onPress={()=>{navigation.navigate('ViewFullScreenImagesScreen',{photos:allPosts[index].photos})}}>
//   <Image source={{ uri: item }} cache="force-cache" style={{
//     width: 390,
//     height: 480,
//     resizeMode: "cover",
//   }}></Image>
//     </TouchableOpacity>
//   </View>
//   )}
//   />
// </View>
// :<Text></Text>
// }
//         <View style={{ backgroundColor: "#fff", height: "auto" }}>
//           <View style={{ flexDirection: "row", marginTop: 20 }}>
//             <View style={{ flex: 1 }}>
//               <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate("PostSpecificScreensFeed", {
//                     post: item,
//                   })
//                   // navigation.navigate('ViewImages')
//                 }
//                 style={{ backgroundColor: "#fff" }}
//               >
//                 <Text style={{ color: "#6FA4E9", paddingLeft: 10 }}>
//                   {item.subposts.length} Comments
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View style={{ flex: 0 }}>
//               <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate("PostSpecifics", { post: item })
//                 }
//                 style={{ backgroundColor: "#fff" }}
//               >
//                 <Text style={{ color: "#6FA4E9" }}>{item.subposts.length} Reviews</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View
//             style={{
//               marginTop: 5,
//               marginLeft: 0,
//               marginRight: 0,
//               borderBottomColor: "black",
//               borderBottomWidth: 0.2,
//             }}
//           />

//          <View
//           style={{ flex: 0, flexDirection: "row", magin: 0 }}
//         >
//                       <TouchableOpacity onPress={()=>{handleOutgoingCall(item.aid,navigation)}}>

//           <Image
//             source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.23_PM_l1kmtc.png'}}
//             style={styles.chats}
//           ></Image>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => clickedChat(l)}>
//             <Image
//               source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142911/Screenshot_2021-05-04_at_9.11.18_PM_mluwe1.png'}}
//               style={styles.chats}
//             ></Image>
//           </TouchableOpacity>
//           {/* <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("MapScreen", {
//                 postId: item._id,
//                 lat: item.locationStatic.coordinates[1],
//                 lng: item.locationStatic.coordinates[0],
//               })
//             }
//             style={{ backgroundColor: "#fff" }}
//           >
//             <View
//               style={{ flex: 0, flexDirection: "column" }}
//             >

//               <Image
//                 source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620143423/Screenshot_2021-05-04_at_9.20.06_PM_i7ruwc.png'}}
//                 style={styles.chatss}
//               ></Image>
//             </View>
//           </TouchableOpacity> */}
//            <Image
//                 source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620143423/Screenshot_2021-05-04_at_9.20.06_PM_i7ruwc.png'}}
//                 style={styles.chats}
//               ></Image>
//           <Image
//             source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png'}}
//             style={styles.chats}
//           ></Image>
//           <TouchableOpacity
//             onPress={() => captureViewShot(item)}
//           >
//             <Image
//               source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.14_PM_ancven.png'}}
//               style={styles.chats}
//             ></Image>
//           </TouchableOpacity>
//         </View>
//       </View>



//       </Card>

//     </ViewShot>
//     ) : item.featureName == "showtime" ? (
//       <ViewShot ref={viewShotRef} options={{format:'jpg',quality:1.0,result:'data-uri'}}>
//       <Card style={styles.eachCard}>
//       {
//         ! extraThings &&
//         <Image source={require('../assets/icons/download.png')} style={{height:50,width:400}}></Image>
//       }
//         <View>
//           <View style={{ flexDirection: "row", marginBottom: 20 }}>
//             <View
//               style={{ flex: 3, paddingLeft: 20, paddingTop: 20 }}
//             >
//               <View style={{ flexDirection: "column" }}>
//                 <View style={{ flex: 2 }}>
//                   <Image
//                   cache="force-cache"
//                     source={{ uri: item.uservisibility.profilePic }}
//                     style={{
//                       height: 55,
//                       width: 55,
//                       paddingLeft: 20,
//                       borderRadius: 30,
//                     }}
//                   />
//                 </View>
//               </View>
//             </View>
//             <View
//               style={{
//                 flex: 20,
//                 paddingLeft: 40,
//                 paddingTop: 20,
//                 fontSize: 20,
//               }}
//             >
//               <Text style={{ fontWeight: "bold" }}>
//                 {item.uservisibility.name.substr(0,15)}
//               </Text>
//               <Text style={{ marginTop: 5 }}>
//               {moment(item.createdAt).fromNow()}
//               </Text>
//             </View>
//             <View>
//               <TouchableOpacity
//               onPress={() => {
//                 return openDots(index);
//               }}
//               >
//                 <Image
//                 cache="force-cache"
//                   source={require("../assets/icons/dots.png")}
//                   style={{
//                     height: 23,
//                     width: 8,
//                     paddingLeft: 20,
//                     marginTop: 10,
//                   }}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//           {/* Profile Tag and content */}
//           <View
//             style={{
//               paddingLeft: 10,
//               marginBottom: 0,
//               flexDirection: "column",
//             }}
//           >

//             <View style={{ flex: 2 }}>
//               <Paragraph style={{ fontSize: 15 }}>
//               <View style={{ flex: 2 }}>
//             <Text style={{ fontSize: 15, paddingTop: 10 }} numberOfLines={5}>
//               {item.content}{index}
//             </Text>
//             {item.content.length > 100 ? (
//               <Text style={{ color: "#6FA4E9" }}>
//                 View more.
//               </Text>
//             ) : (
//               <></>
//             )}
//           </View>
//               </Paragraph>
//             </View>
//           </View>
//         </View>

//         {/* Images Slider goes here */}
//         {/* {item.photo.length > 0 ? (
//           <ImageSlider
//             loop
//             autoPlayWithInterval={3000}
//             images={item.photo}
//             onPress={({ index }) => alert(index)}
//             customSlide={({ index, item, style, width }) => (
//               // It's important to put style here because it's got offset inside
//               <View key={index} style={[style, styles.customSlide]}>
//                 <Image
//                   source={{ uri: item }}
//                   style={styles.customImage}
//                 />
//               </View>
//             )}
//           />
//         ) : (
//           <Text></Text>
//         )} */}
//         {

// item.photo.length > 0 ?

// <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
// {/* <Carousel
// layout={"default"}
// // ref={ref => carousel = ref}
// data={[...item.photo]}
// sliderWidth={450}
// itemWidth={450}
// renderItem={_renderItem}
// // onSnapToItem = { index => setIndex(index) }
// /> */}
// <FlatList
//    data={[...item.photo]}
//    horizontal={true}
//    showsHorizontalScrollIndicator={false} 
//    renderItem={({ item,i }) => (
// <View style={{marginRight:10}}>
// <TouchableOpacity activeOpacity={1}  onPress={()=>{navigation.navigate('ViewFullScreenImagesScreen',{photos:allPosts[index].photos})}}>
//   <Image source={{ uri: item }} cache="force-cache" style={{
//     width: 390,
//     height: 480,
//     resizeMode: "cover",
//   }}></Image>
//     </TouchableOpacity>
//   </View>
//   )}
//   />
// </View>
// :<Text></Text>
// }
//         <View style={{ backgroundColor: "#fff", height: "auto" }}>
//           <View style={{ flexDirection: "row", marginTop: 20 }}>
//             <View style={{ flex: 1 }}>
//               <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate("PostSpecificScreensFeed", {
//                     post: item,
//                   })
//                 }
//                 style={{ backgroundColor: "#fff" }}
//               >
//                 <Text style={{ color: "#6FA4E9", paddingLeft: 10 }}>
//                   {item.subposts.length} Comments
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View style={{ flex: 0 }}>
//             <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate("PostSpecificScreensFeed", {
//                     post: item,
//                   })
//                 }
//                 style={{ backgroundColor: "#fff" }}
//               >
//     {
//                  item.viewedUsers.length>1000?
//                  <Text style={{color:'#6FA4E9'}}>{(item.viewedUsers.length/1000).toFixed(1)}k Views</Text>:
//                  <Text style={{color:'#6FA4E9'}}>{item.viewedUsers.length} Views</Text>
//                   }
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View
//             style={{
//               marginTop: 5,
//               marginLeft: 0,
//               marginRight: 0,
//               borderBottomColor: "black",
//               borderBottomWidth: 0.2,
//             }}
//           />

//           <View style={{ flex: 0, flexDirection: "row", magin: 0 }}>
//           <Image
//                   cache="force-cache"
//             source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.23_PM_l1kmtc.png'}}
//             style={styles.chats}
//           ></Image>
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate("ChatSpecificScreenFinal", {
//                   name: item.uservisibility.name.substr(0,15),
//                   profilePic: item.uservisibility.profilePic,
//                   jid: item.jid_main,
//                 })
//               }
//             >
//              <Image
//          cache="force-cache"
//               source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142911/Screenshot_2021-05-04_at_9.11.18_PM_mluwe1.png'}}
//               style={styles.chats}
//             ></Image>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() =>
//               selectedPostMap(item)
//               }
//               style={{ backgroundColor: "#fff" }}
//             >
//               <View style={{ flex: 0, flexDirection: "column" }}>
//                 {/* <Text style={{paddingLeft:25,paddingTop:25,color:"blue"}}> 15</Text>
// <Text style={{paddingTop:5,color:"blue"}}> Comments</Text> */}

// <Image
//         cache="force-cache"
//                 source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620143423/Screenshot_2021-05-04_at_9.20.06_PM_i7ruwc.png'}}
//                 style={styles.chats}
//               ></Image>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => WhatsAppShare(item)}>
//             <Image
//         cache="force-cache"
//             source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png'}}
//             style={styles.chats}
//           ></Image>
//             </TouchableOpacity>
//   <TouchableOpacity onPress={() => onShare(l)}>
//   <Image
//     cache="force-cache"
//               source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.14_PM_ancven.png'}}
//               style={styles.chats}
//             ></Image>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Card>
//       </ViewShot>
//     ) : item.featureName == "greet" ? (
//       <ViewShot ref={viewShotRef} options={{format:'jpg',quality:1.0,result:'data-uri'}}>
//       <Card style={styles.eachCard}>
//       {
// ! extraThings &&
// <Image source={require('../assets/icons/download.png')} cache="force-cache" style={{height:50,width:400}}></Image>
// }
//         <View>
//           <View style={{ flexDirection: "row", marginBottom: 20 }}>
//             <View
//               style={{ flex: 3, paddingLeft: 20, paddingTop: 20 }}
//             >
//               <View style={{ flexDirection: "column" }}>
//                 <View style={{ flex: 2 }}>
//                   <Image
//                   cache="force-cache"
//                     source={{ uri: item.uservisibility.profilePic }}
//                     style={{
//                       height: 55,
//                       width: 55,
//                       paddingLeft: 20,
//                       borderRadius: 30,
//                     }}
//                   />
//                 </View>
//               </View>
//             </View>
//             <View
//               style={{
//                 flex: 20,
//                 paddingLeft: 40,
//                 paddingTop: 20,
//                 fontSize: 20,
//               }}
//             >
//               <Text style={{ fontWeight: "bold" }}>
//                 {item.uservisibility.name.substr(0,15)}
//               </Text>
//               <Text style={{ marginTop: 5 }}>
//               {moment(item.createdAt).fromNow()}
//               </Text>
//             </View>
//             <View>
//               <TouchableOpacity
//                 onPress={() => {
//                   return openDots(index);
//                 }}
//               >
//                 <Image
//                 cache="force-cache"
//                   source={require("../assets/icons/dots.png")}
//                   style={{
//                     height: 23,
//                     width: 8,
//                     paddingLeft: 20,
//                     marginTop: 10,
//                   }}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View
//             style={{
//               paddingLeft: 10,
//               marginBottom: 0,
//               flexDirection: "column",
//             }}
//           >
//             <View style={{ flex: 2 }}>
//               <Paragraph style={{ fontSize: 15 }}>
//                 <Text numberOfLines={5}>
//                 {item.content}{index}
//                 </Text>

//               </Paragraph>
//               {item.content.length > 200 ? (
//                 <TouchableOpacity
//                   onPress={() =>
//                     navigation.navigate("PostSpecificScreensFeed", {
//                       post: item,
//                     })
//                   }
//                   style={{ backgroundColor: "#fff" }}
//                 >
//                   <Text style={{ color: "blue" }}>View more.</Text>
//                 </TouchableOpacity>
//               ) : (
//                 <Text></Text>
//               )}
//             </View>
//           </View>
//         </View>

//         {/* Images Slider goes here */}
//         {/* {l.photo.length > 0 ? (
//           <ImageSlider
//             loop
//             autoPlayWithInterval={3000}
//             images={l.photo}
//             onPress={({ index }) => alert(index)}
//             customSlide={({ index, item, style, width }) => (
//               // It's important to put style here because it's got offset inside
//               <View key={index} style={[style, styles.customSlide]}>
//                 <Image
//                   source={{ uri: item }}
//                   style={styles.customImage}
//                 />
//               </View>
//             )}
//           />
//         ) : (
//           <Text></Text>
//         )} */}

// {

// item.photo.length > 0 ?

// <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
// {/* <Carousel
// layout={"default"}
// // ref={ref => carousel = ref}
// data={[...item.photo]}
// sliderWidth={450}
// itemWidth={450}
// renderItem={_renderItem}
// // onSnapToItem = { index => setIndex(index) }
// /> */}

// <FlatList
//    data={[...item.photo]}
//    horizontal={true}
//    showsHorizontalScrollIndicator={false} 
//    renderItem={({ item,i }) => (
// <View style={{marginRight:10}}>
// <TouchableOpacity activeOpacity={1}  onPress={()=>{navigation.navigate('ViewFullScreenImagesScreen',{photos:allPosts[index].photos})}}>
//   <Image source={{ uri: item }} cache="force-cache" style={{
//     width: 390,
//     height: 480,
//     resizeMode: "cover",
//   }}></Image>
//     </TouchableOpacity>
//   </View>
//   )}
//   />
// </View>
// :<Text></Text>
// }
//         <View style={{ backgroundColor: "#fff", height: "auto" }}>
//           <View style={{ flexDirection: "row", marginTop: 20 }}>
//             <View style={{ flex: 1 }}>
//               <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate("PostSpecificScreensFeed", {
//                     post: item,
//                   })
//                 }
//                 style={{ backgroundColor: "#fff" }}
//               >
//                 <Text
//                   style={{
//                     color: "#6FA4E9",
//                     paddingLeft: 10,
//                     textAlign: "center",
//                   }}
//                 >
//                   {
//                  item.viewedUsers.length>1000?
//                  <Text style={{color:'#6FA4E9'}}>{(item.viewedUsers.length/1000).toFixed(1)}k Views</Text>:
//                  <Text style={{color:'#6FA4E9'}}>{item.viewedUsers.length} Views</Text>
//                   }
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View
//             style={{
//               marginTop: 0,
//               marginLeft: 0,
//               marginRight: 0,
//               borderBottomColor: "#D7D7D7",
//               borderBottomWidth: 0.5,
//               flex: 5,
//             }}
//           />
//            <View
//               style={{
//                 flex: 0,
//                 flexDirection: "row",
//                 justifyContent:'center',
//                 magin: 0,
//               }}
//             >
//             <View style={{ flex: 0 }}>

//       {
//         item.requested?
//             <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("SendChatRequest", {
//                 name: item.uservisibility.name.substr(0,15),
//                 profilePic: item.uservisibility.profilePic,
//                 jid: item.jid_main,
//                 post:item
//               })
//             }
//             >
//               <Image
//                 source={require("../assets/bottomCard/request_sent.png")}
//                 cache="force-cache"
//                 style={{height: 40,
//                   width: 40,
//                   margin: 5,
//                 marginLeft:20}}
//               ></Image>
//               <Text style={{marginBottom:5,color:'#323F4B'}}>Chat Request Sent</Text>
//             </TouchableOpacity>:
//             <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("SendChatRequest", {
//                 name: item.uservisibility.name.substr(0,15),
//                 profilePic: item.uservisibility.profilePic,
//                 jid: item.jid_main,
//                 post:item
//               })
//             }
//           >
//             <Image
//               source={require("../assets/bottomCard/request_chat.png")}
//               cache="force-cache"
//               style={{height: 40,
//                 width: 40,
//                 margin: 5,
//               marginLeft:20}}
//             ></Image>
//             <Text style={{marginBottom:5,color:'#323F4B'}}>Request to Chat</Text>
//           </TouchableOpacity>

//     }
//             </View>




//           </View>
//         </View>
//       </Card>
//               </ViewShot>
//     ) : (
//       <></>
//     )
//       )
//     }


//     const ItemViewBeyond = ({item,index}) => {
//       return (


//       indexes.includes(index)?

//       <Image source={{uri:"https://static-content.spaarksweb.com/images/images/market/m2.png"}} style={{height:170,width:360,margin:10,resizeMode:'contain'}}></Image>:

//       item.featureName == "market" ? (

//       <ViewShot ref={viewShotRef}options={{format:'jpg',quality:1.0,result:'data-uri'}}>
//       <Card style={styles.eachCard}>
//       {
// ! extraThings &&
// <Image source={require('../assets/icons/download.png')} style={{height:50,width:400}}></Image>
// }
//         <View>
//           <View style={{ flexDirection: "row", marginBottom: 20 }}>
//             <View
//               style={{ flex: 3, paddingLeft: 20, paddingTop: 20 }}
//             >
//               <View style={{ flexDirection: "column" }}>
//                 <View style={{ flex: 2 }}>
//                   <Image
//                     source={{ uri: item.uservisibility.profilePic }}
//                     style={{
//                       height: 55,
//                       width: 55,
//                       paddingLeft: 20,
//                       borderRadius: 30,
//                     }}
//                   />
//                 </View>
//               </View>
//             </View>
//             <View
//               style={{
//                 flex: 20,
//                 paddingLeft: 40,
//                 paddingTop: 20,
//                 fontSize: 20,
//               }}
//             >
//               <Text style={{ fontWeight: "bold" }}>
//                 {item.uservisibility.name.substr(0,15)}
//               </Text>
//               <Text style={{ marginTop: 5 }}>{moment(item.createdAt).fromNow()}</Text>
//               <View style={{ flexDirection: "row" }}>
//               {item.isProvider == true ? (
//       <>
//         <View style={{ flex: 0 }}>
//           <Text
//             style={{
//               marginTop: 5,
//               fontSize: 15,
//               fontWeight: "bold",
//               color: "#6FA4E9",
//             }}
//           >
// {/* 
// {
//             l.reviews.length>0?
//            l.reviews[0].rating/5
//            :<>No ratings yet</>
//             } */}
//             {
//                item.reviews.length>0?

//               <Text>{item.reviews[0].rating}/5</Text>
//             :<></>

//             }
//           </Text>
//         </View>
//         <View style={{ flex: 8 }}>
//           {/* <Image
//             source={require("../assets/icons/rating.png")}
//             style={{ height: 20, width: 80 }}
//           ></Image> */}
//           {/* <Text>No ratings yet</Text> */}
//           {
//             item.reviews.length>0?
//           <Rating
//         fractions="1"
//         ratingColor="#f2f2f2"
//         tintColor="#fff"
//         startingValue={item.reviews[0].rating}
//         imageSize={22}
//         style={{
//           marginTop: 0,
//           backgroundColor: "#fff",
//           marginRight: 15,
//         }}
//       />
//       :<Text>0.0/5</Text>
// }
//         </View>
//       </>
//     ) : (
//       <View style={{flexDirection:'row'}}>
//       {
//         item.tags != undefined || item.tags.length>0 ?
//         item.tags.map((list, i) =>
//          <Chip
//          style={{
//            alignSelf: 'flex-start',
//            backgroundColor: list.color,
//          }}
//        >
//          <Text
//            style={{
//              color: "#fff",
//              marginTop: 0,
//              fontSize: 10,
//            }}
//          >
//            {list.name}
//          </Text>
//        </Chip>
//         ):<></>

//        }
//        </View>

//    )}
//               </View>
//             </View>
//             <View>

//                 <TouchableOpacity
//                   onPress={() => {
//                       return openDots(index);
//                     }}
//                 >
//                   <Image
//                     source={require("../assets/icons/dots.png")}
//                     style={{
//                       height: 23,
//                       width: 8,
//                       paddingLeft: 20,
//                       marginTop: 10,
//                     }}
//                   />
//                 </TouchableOpacity>

//             </View>
//           </View>
//           {/* Profile Tag and content */}
//           <View
//             style={{
//               paddingLeft: 10,
//               marginBottom: 0,
//               flexDirection: "column",
//             }}
//           >
//         {item.isProvider == true ? (
//   <>
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate("SellerProfile", {
//           userId: item.userId,
//           post: item,
//         })
//       }
//       style={{ backgroundColor: "#fff" }}
//     >
//       <View style={{ flex: 9 }}>
//         <Text
//           style={{ fontSize: 13, color: "#6FA4E9" }}
//         >
//           View Profile
//         </Text>
// {
// item.tags.length>0?
//         <Chip
//          style={{
//            alignSelf: 'flex-start',
//            backgroundColor: item.tags[0].color,

//          }}
//        >
//          <Text
//            style={{
//              color: "#fff",
//              marginTop: 0,
//              fontSize: 10,
//            }}
//          >
//            {item.tags[0].name}
//          </Text>
//        </Chip>
//        :<></>
// }
//       </View>
//     </TouchableOpacity>
//   </>
// ) : (
//   <Text></Text>
// )}
//             <View style={{  flex: 2 }}>

//               <Paragraph style={{ fontSize: 15 }}>

//               <View style={{ flex: 2 }}>
//             <Text style={{ fontSize: 15, paddingTop: 10 }} numberOfLines={5}>
//               {item.content} - {index}
//             </Text>
//             {item.content.length > 100 ? (
//          <TouchableOpacity
//          onPress={() =>
//            navigation.navigate("PostSpecificScreensFeed", {
//              post: item,
//            })
//          }
//          style={{ backgroundColor: "#fff" }}
//        >
//               <Text style={{ color: "#6FA4E9" }}>
//                 View more.
//               </Text>
//               </TouchableOpacity>
//             ) : (
//               <></>
//             )}
//           </View>
//               </Paragraph>

//             </View>
//           </View>
//         </View>

//         {/* Images Slider goes here */}
//         {/* {l.photo.length > 0 ? (
//           <ImageSlider
//             loop
//             autoPlayWithInterval={3000}
//             images={l.photo}
//             onPress={({ index }) => alert(index)}
//             customSlide={({ index, item, style, width }) => (
//               // It's important to put style here because it's got offset inside
//               <View key={index} style={[style, styles.customSlide]}>
//                 <Image
//                   source={{ uri: item }}
//                   style={styles.customImage}
//                 />
//               </View>
//             )}
//           />
//         ) : (
//           <Text></Text>
//         )} */}
//         {

// item.photo.length > 0 ?

// <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
// {/* <Carousel
// layout={"default"}
// // ref={ref => carousel = ref}
// data={[...item.photo]}
// sliderWidth={450}
// itemWidth={450}
// renderItem={_renderItem}
// // onSnapToItem = { index => setIndex(index) }
// /> */}

// <FlatList
//    data={[...item.photo]}
//    horizontal={true}
//    showsHorizontalScrollIndicator={false} 
//    renderItem={({ item,i }) => (
// <View style={{marginRight:10}}>
// <TouchableOpacity activeOpacity={1}  onPress={()=>{navigation.navigate('ViewFullScreenImagesScreen',{photos:postBeyond[index].photos})}}>
//   <Image source={{ uri: item }} cache="force-cache" style={{
//     width: 390,
//     height: 480,
//     resizeMode: "cover",
//   }}></Image>
//     </TouchableOpacity>
//   </View>
//   )}
//   />
// </View>
// :<Text></Text>
// }
//         <View style={{ backgroundColor: "#fff", height: "auto" }}>
//           <View style={{ flexDirection: "row", marginTop: 20 }}>
//             <View style={{ flex: 1 }}>
//               <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate("PostSpecificScreensFeed", {
//                     post: item,
//                   })
//                   // navigation.navigate('ViewImages')
//                 }
//                 style={{ backgroundColor: "#fff" }}
//               >
//                 <Text style={{ color: "#6FA4E9", paddingLeft: 10 }}>
//                   {item.subposts.length} Comments
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View style={{ flex: 0 }}>
//               <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate("PostSpecifics", { post: item })
//                 }
//                 style={{ backgroundColor: "#fff" }}
//               >
//                 <Text style={{ color: "#6FA4E9" }}>{item.subposts.length} Reviews</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View
//             style={{
//               marginTop: 5,
//               marginLeft: 0,
//               marginRight: 0,
//               borderBottomColor: "black",
//               borderBottomWidth: 0.2,
//             }}
//           />

//          <View
//           style={{ flex: 0, flexDirection: "row", magin: 0 }}
//         >
//                <TouchableOpacity
//               onPress={() => navigation.navigate('OutGoingCallScreen',{name:item.uservisibility.name,profilePic:item.uservisibility.profilePic})}>
//           <Image
//             source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.23_PM_l1kmtc.png'}}
//             style={styles.chats}
//           ></Image>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => clickedChat(l)}>
//             <Image
//               source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142911/Screenshot_2021-05-04_at_9.11.18_PM_mluwe1.png'}}
//               style={styles.chats}
//             ></Image>
//           </TouchableOpacity>
//           {/* <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("MapScreen", {
//                 postId: item._id,
//                 lat: item.locationStatic.coordinates[1],
//                 lng: item.locationStatic.coordinates[0],
//               })
//             }
//             style={{ backgroundColor: "#fff" }}
//           >
//             <View
//               style={{ flex: 0, flexDirection: "column" }}
//             >

//               <Image
//                 source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620143423/Screenshot_2021-05-04_at_9.20.06_PM_i7ruwc.png'}}
//                 style={styles.chatss}
//               ></Image>
//             </View>
//           </TouchableOpacity> */}
//            <Image
//                 source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620143423/Screenshot_2021-05-04_at_9.20.06_PM_i7ruwc.png'}}
//                 style={styles.chats}
//               ></Image>
//           <Image
//             source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png'}}
//             style={styles.chats}
//           ></Image>
//           <TouchableOpacity
//             onPress={() => captureViewShot(item)}
//           >
//             <Image
//               source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.14_PM_ancven.png'}}
//               style={styles.chats}
//             ></Image>
//           </TouchableOpacity>
//         </View>
//       </View>



//       </Card>

//     </ViewShot>
//     ) : item.featureName == "showtime" ? (
//       <ViewShot ref={viewShotRef} options={{format:'jpg',quality:1.0,result:'data-uri'}}>
//       <Card style={styles.eachCard}>
//       {
//         ! extraThings &&
//         <Image source={require('../assets/icons/download.png')} style={{height:50,width:400}}></Image>
//       }
//         <View>
//           <View style={{ flexDirection: "row", marginBottom: 20 }}>
//             <View
//               style={{ flex: 3, paddingLeft: 20, paddingTop: 20 }}
//             >
//               <View style={{ flexDirection: "column" }}>
//                 <View style={{ flex: 2 }}>
//                   <Image
//                   cache="force-cache"
//                     source={{ uri: item.uservisibility.profilePic }}
//                     style={{
//                       height: 55,
//                       width: 55,
//                       paddingLeft: 20,
//                       borderRadius: 30,
//                     }}
//                   />
//                 </View>
//               </View>
//             </View>
//             <View
//               style={{
//                 flex: 20,
//                 paddingLeft: 40,
//                 paddingTop: 20,
//                 fontSize: 20,
//               }}
//             >
//               <Text style={{ fontWeight: "bold" }}>
//                 {item.uservisibility.name.substr(0,15)}
//               </Text>
//               <Text style={{ marginTop: 5 }}>
//               {moment(item.createdAt).fromNow()}
//               </Text>
//             </View>
//             <View>
//               <TouchableOpacity
//               onPress={() => {
//                 return openDots(index);
//               }}
//               >
//                 <Image
//                 cache="force-cache"
//                   source={require("../assets/icons/dots.png")}
//                   style={{
//                     height: 23,
//                     width: 8,
//                     paddingLeft: 20,
//                     marginTop: 10,
//                   }}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//           {/* Profile Tag and content */}
//           <View
//             style={{
//               paddingLeft: 10,
//               marginBottom: 0,
//               flexDirection: "column",
//             }}
//           >

//             <View style={{ flex: 2 }}>
//               <Paragraph style={{ fontSize: 15 }}>
//               <View style={{ flex: 2 }}>
//             <Text style={{ fontSize: 15, paddingTop: 10 }} numberOfLines={5}>
//               {item.content}{index}
//             </Text>
//             {item.content.length > 100 ? (
//               <Text style={{ color: "#6FA4E9" }}>
//                 View more.
//               </Text>
//             ) : (
//               <></>
//             )}
//           </View>
//               </Paragraph>
//             </View>
//           </View>
//         </View>

//         {/* Images Slider goes here */}
//         {/* {item.photo.length > 0 ? (
//           <ImageSlider
//             loop
//             autoPlayWithInterval={3000}
//             images={item.photo}
//             onPress={({ index }) => alert(index)}
//             customSlide={({ index, item, style, width }) => (
//               // It's important to put style here because it's got offset inside
//               <View key={index} style={[style, styles.customSlide]}>
//                 <Image
//                   source={{ uri: item }}
//                   style={styles.customImage}
//                 />
//               </View>
//             )}
//           />
//         ) : (
//           <Text></Text>
//         )} */}
//         {

// item.photo.length > 0 ?

// <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
// {/* <Carousel
// layout={"default"}
// // ref={ref => carousel = ref}
// data={[...item.photo]}
// sliderWidth={450}
// itemWidth={450}
// renderItem={_renderItem}
// // onSnapToItem = { index => setIndex(index) }
// /> */}
// <FlatList
//    data={[...item.photo]}
//    horizontal={true}
//    showsHorizontalScrollIndicator={false} 
//    renderItem={({ item,i }) => (
// <View style={{marginRight:10}}>
// <TouchableOpacity activeOpacity={1}  onPress={()=>{navigation.navigate('ViewFullScreenImagesScreen',{photos:allPosts[index].photos})}}>
//   <Image source={{ uri: item }} cache="force-cache" style={{
//     width: 390,
//     height: 480,
//     resizeMode: "cover",
//   }}></Image>
//     </TouchableOpacity>
//   </View>
//   )}
//   />
// </View>
// :<Text></Text>
// }
//         <View style={{ backgroundColor: "#fff", height: "auto" }}>
//           <View style={{ flexDirection: "row", marginTop: 20 }}>
//             <View style={{ flex: 1 }}>
//               <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate("PostSpecificScreensFeed", {
//                     post: item,
//                   })
//                 }
//                 style={{ backgroundColor: "#fff" }}
//               >
//                 <Text style={{ color: "#6FA4E9", paddingLeft: 10 }}>
//                   {item.subposts.length} Comments
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View style={{ flex: 0 }}>
//             <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate("PostSpecificScreensFeed", {
//                     post: item,
//                   })
//                 }
//                 style={{ backgroundColor: "#fff" }}
//               >
//     {
//                  item.viewedUsers.length>1000?
//                  <Text style={{color:'#6FA4E9'}}>{(item.viewedUsers.length/1000).toFixed(1)}k Views</Text>:
//                  <Text style={{color:'#6FA4E9'}}>{item.viewedUsers.length} Views</Text>
//                   }
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View
//             style={{
//               marginTop: 5,
//               marginLeft: 0,
//               marginRight: 0,
//               borderBottomColor: "black",
//               borderBottomWidth: 0.2,
//             }}
//           />

//           <View style={{ flex: 0, flexDirection: "row", magin: 0 }}>
//           <Image
//                   cache="force-cache"
//             source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.23_PM_l1kmtc.png'}}
//             style={styles.chats}
//           ></Image>
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate("ChatSpecificScreenFinal", {
//                   name: item.uservisibility.name.substr(0,15),
//                   profilePic: item.uservisibility.profilePic,
//                   jid: item.jid_main,
//                 })
//               }
//             >
//              <Image
//          cache="force-cache"
//               source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142911/Screenshot_2021-05-04_at_9.11.18_PM_mluwe1.png'}}
//               style={styles.chats}
//             ></Image>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() =>
//               selectedPostMap(item)
//               }
//               style={{ backgroundColor: "#fff" }}
//             >
//               <View style={{ flex: 0, flexDirection: "column" }}>
//                 {/* <Text style={{paddingLeft:25,paddingTop:25,color:"blue"}}> 15</Text>
// <Text style={{paddingTop:5,color:"blue"}}> Comments</Text> */}

// <Image
//         cache="force-cache"
//                 source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620143423/Screenshot_2021-05-04_at_9.20.06_PM_i7ruwc.png'}}
//                 style={styles.chats}
//               ></Image>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => WhatsAppShare(item)}>
//             <Image
//         cache="force-cache"
//             source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png'}}
//             style={styles.chats}
//           ></Image>
//             </TouchableOpacity>
//   <TouchableOpacity onPress={() => onShare(l)}>
//   <Image
//     cache="force-cache"
//               source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.14_PM_ancven.png'}}
//               style={styles.chats}
//             ></Image>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Card>
//       </ViewShot>
//     ) : item.featureName == "greet" ? (
//       <ViewShot ref={viewShotRef} options={{format:'jpg',quality:1.0,result:'data-uri'}}>
//       <Card style={styles.eachCard}>
//       {
// ! extraThings &&
// <Image source={require('../assets/icons/download.png')} cache="force-cache" style={{height:50,width:400}}></Image>
// }
//         <View>
//           <View style={{ flexDirection: "row", marginBottom: 20 }}>
//             <View
//               style={{ flex: 3, paddingLeft: 20, paddingTop: 20 }}
//             >
//               <View style={{ flexDirection: "column" }}>
//                 <View style={{ flex: 2 }}>
//                   <Image
//                   cache="force-cache"
//                     source={{ uri: item.uservisibility.profilePic }}
//                     style={{
//                       height: 55,
//                       width: 55,
//                       paddingLeft: 20,
//                       borderRadius: 30,
//                     }}
//                   />
//                 </View>
//               </View>
//             </View>
//             <View
//               style={{
//                 flex: 20,
//                 paddingLeft: 40,
//                 paddingTop: 20,
//                 fontSize: 20,
//               }}
//             >
//               <Text style={{ fontWeight: "bold" }}>
//                 {item.uservisibility.name.substr(0,15)}
//               </Text>
//               <Text style={{ marginTop: 5 }}>
//               {moment(item.createdAt).fromNow()}
//               </Text>
//             </View>
//             <View>
//               <TouchableOpacity
//                 onPress={() => {
//                   return openDots(index);
//                 }}
//               >
//                 <Image
//                 cache="force-cache"
//                   source={require("../assets/icons/dots.png")}
//                   style={{
//                     height: 23,
//                     width: 8,
//                     paddingLeft: 20,
//                     marginTop: 10,
//                   }}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View
//             style={{
//               paddingLeft: 10,
//               marginBottom: 0,
//               flexDirection: "column",
//             }}
//           >
//             <View style={{ flex: 2 }}>
//               <Paragraph style={{ fontSize: 15 }}>
//                 <Text numberOfLines={5}>
//                 {item.content}{index}
//                 </Text>

//               </Paragraph>
//               {item.content.length > 200 ? (
//                 <TouchableOpacity
//                   onPress={() =>
//                     navigation.navigate("PostSpecificScreensFeed", {
//                       post: item,
//                     })
//                   }
//                   style={{ backgroundColor: "#fff" }}
//                 >
//                   <Text style={{ color: "blue" }}>View more.</Text>
//                 </TouchableOpacity>
//               ) : (
//                 <Text></Text>
//               )}
//             </View>
//           </View>
//         </View>

//         {/* Images Slider goes here */}
//         {/* {l.photo.length > 0 ? (
//           <ImageSlider
//             loop
//             autoPlayWithInterval={3000}
//             images={l.photo}
//             onPress={({ index }) => alert(index)}
//             customSlide={({ index, item, style, width }) => (
//               // It's important to put style here because it's got offset inside
//               <View key={index} style={[style, styles.customSlide]}>
//                 <Image
//                   source={{ uri: item }}
//                   style={styles.customImage}
//                 />
//               </View>
//             )}
//           />
//         ) : (
//           <Text></Text>
//         )} */}

// {

// item.photo.length > 0 ?

// <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
// {/* <Carousel
// layout={"default"}
// // ref={ref => carousel = ref}
// data={[...item.photo]}
// sliderWidth={450}
// itemWidth={450}
// renderItem={_renderItem}
// // onSnapToItem = { index => setIndex(index) }
// /> */}

// <FlatList
//    data={[...item.photo]}
//    horizontal={true}
//    showsHorizontalScrollIndicator={false} 
//    renderItem={({ item,i }) => (
// <View style={{marginRight:10}}>
// <TouchableOpacity activeOpacity={1}  onPress={()=>{navigation.navigate('ViewFullScreenImagesScreen',{photos:allPosts[index].photos})}}>
//   <Image source={{ uri: item }} cache="force-cache" style={{
//     width: 390,
//     height: 480,
//     resizeMode: "cover",
//   }}></Image>
//     </TouchableOpacity>
//   </View>
//   )}
//   />
// </View>
// :<Text></Text>
// }
//         <View style={{ backgroundColor: "#fff", height: "auto" }}>
//           <View style={{ flexDirection: "row", marginTop: 20 }}>
//             <View style={{ flex: 1 }}>
//               <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate("PostSpecificScreensFeed", {
//                     post: item,
//                   })
//                 }
//                 style={{ backgroundColor: "#fff" }}
//               >
//                 <Text
//                   style={{
//                     color: "#6FA4E9",
//                     paddingLeft: 10,
//                     textAlign: "center",
//                   }}
//                 >
//                   {
//                  item.viewedUsers.length>1000?
//                  <Text style={{color:'#6FA4E9'}}>{(item.viewedUsers.length/1000).toFixed(1)}k Views</Text>:
//                  <Text style={{color:'#6FA4E9'}}>{item.viewedUsers.length} Views</Text>
//                   }
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View
//             style={{
//               marginTop: 0,
//               marginLeft: 0,
//               marginRight: 0,
//               borderBottomColor: "#D7D7D7",
//               borderBottomWidth: 0.5,
//               flex: 5,
//             }}
//           />
//            <View
//               style={{
//                 flex: 0,
//                 flexDirection: "row",
//                 justifyContent:'center',
//                 magin: 0,
//               }}
//             >
//             <View style={{ flex: 0 }}>

//       {
//         item.requested?
//             <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("SendChatRequest", {
//                 name: item.uservisibility.name.substr(0,15),
//                 profilePic: item.uservisibility.profilePic,
//                 jid: item.jid_main,
//                 post:item
//               })
//             }
//             >
//               <Image
//                 source={require("../assets/bottomCard/request_sent.png")}
//                 cache="force-cache"
//                 style={{height: 40,
//                   width: 40,
//                   margin: 5,
//                 marginLeft:20}}
//               ></Image>
//               <Text style={{marginBottom:5,color:'#323F4B'}}>Chat Request Sent</Text>
//             </TouchableOpacity>:
//             <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("SendChatRequest", {
//                 name: item.uservisibility.name.substr(0,15),
//                 profilePic: item.uservisibility.profilePic,
//                 jid: item.jid_main,
//                 post:item
//               })
//             }
//           >
//             <Image
//               source={require("../assets/bottomCard/request_chat.png")}
//               cache="force-cache"
//               style={{height: 40,
//                 width: 40,
//                 margin: 5,
//               marginLeft:20}}
//             ></Image>
//             <Text style={{marginBottom:5,color:'#323F4B'}}>Request to Chat</Text>
//           </TouchableOpacity>

//     }
//             </View>




//           </View>
//         </View>
//       </Card>
//               </ViewShot>
//     ) : (
//       <></>
//     )
//       )
//     }

//     function clickedChat(l) {
//       console.log("userToken", String(userToken).length);
//       if (String(userToken).length > 24) {
//         navigation.navigate("ChatSpecificScreenFinal", {
//           name: l.uservisibility.name.substr(0,15),
//           profilePic: l.uservisibility.profilePic,
//           jid: l.jid_main,
//         });
//         // return (<LoginToAccessScreen></LoginToAccessScreen>)
//       } else {
//         Login.current.open();
//       }
//     }

//     function onCall(l) {
//       if (String(userToken).length > 24) {
//         // navigation.navigate('ChatSpecificScreenFinal',{name:l.uservisibility.name,profilePic:l.uservisibility.profilePic,jid:l.jid_main})
//         // return (<LoginToAccessScreen></LoginToAccessScreen>)
//       } else {
//         Login.current.open();
//       }
//     }

//     async function reportUser(post){
//       var post = allPosts[Number(global.postcurrent[0])]
//       console.log(post)
//       await axios.post(
//         `http://103.27.86.34:3005/api/v2.0/${post.featureName}/report/post`,
//         {
//           "featureId": post._id,
//           "reason":"Info Reported"
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization:
//               GLOBAL.TOKEN,
//           },
//         }
//       ).then((resp)=>{
//         showSnackReport(resp.data.message)
//       }).catch((err)=>{
//         console.log(err)
//         showSnackReport('You have already reported this content')
//       })
//       // showSnackReport('You have already reported this content')
//     }

//     async function showSnackReport(reason){
//       refRBSheet.current.close()
//       Snackbar.show({
//         text: reason,
//         duration: Snackbar.LENGTH_LONG,
//         // action: {
//         //   text: 'UNDO',
//         //   textColor: 'white',
//         //   onPress: () => { /* Do something. */ },
//         // },
//       });
//     }

//     async function blockUser(){
//       showSnackBlock()
//     }

//     function onLogin(phone){
//       console.log("phoness",phone)
//       Login.current.close();
//       navigation.navigate('VerifyOtpScreen',{phone:phone})
//     }
//     return (
//       <ScrollView
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }

//       >
//       <RBSheet
//         ref={refRBSheet}
//         closeOnDragDown={true}
//         closeOnPressMask={true}
//         height={220}
//         borderRadius={10}
//         closeDuration={100}
//         customStyles={{
//           draggableIcon: {
//             backgroundColor: "#000",
//           },
//           container: {
//             borderRadius: 30,
//           },
//         }}
//       >
//         <View style={{ backgroundColor: "#fff", height: 200 }}>
//           <View>
//             <View>
//               <View style={{ flexDirection: "row", marginTop: 20 }}>
//                 <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
//                   <Image
//                   cache="force-cache"
//                     source={require("../assets/icons/bottomsheet/1.png")}
//                     style={{ height: 26, width: 26 }}
//                   ></Image>
//                 </View>
//                 <View style={{ color: "#000", flex: 13, height: 60 }}>
//                   <Text
//                     style={{
//                       color: "#000",
//                       fontSize: 16,
//                       margin: 0,
//                       fontWeight: "bold",
//                       paddingLeft: 40,
//                     }}
//                     onPress={()=>{reportUser(Number(global.postcurrent[0]))}}
//                   >
//                     Report Spaark
//                   </Text>
//                   <Text
//                     style={{
//                       color: "#000",
//                       fontSize: 14,
//                       flex: 70,
//                       paddingLeft: 40,
//                     }}
//                   >
//                     Please report if you find this content inappropriate
//                   </Text>
//                   {/* line */}
//                   <View
//                     style={{
//                       marginTop: 0,
//                       marginLeft: 0,
//                       marginRight: 0,
//                       borderBottomColor: "#C0C0C0",
//                       borderBottomWidth: 1,
//                     }}
//                   />
//                 </View>
//               </View>
//               <View style={{ flexDirection: "row", marginTop: 20 }} onPress={()=>{blockUser(currentPost)}}>
//                 <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
//                   <Image
//                   cache="force-cache"
//                     source={require("../assets/icons/bottomsheet/2.png")}
//                     style={{ height: 26, width: 26 }}
//                   ></Image>
//                 </View>
//                 <View style={{ color: "#000", flex: 13, height: 60 }}>
//                   <Text
//                     style={{
//                       color: "#000",
//                       fontSize: 16,
//                       margin: 0,
//                       fontWeight: "bold",
//                       paddingLeft: 40,
//                     }}
//                   >
//                   {/* {

//                     allPosts[Number(global.postcurrent[0])] && allPosts[Number(global.postcurrent[0])].uservisibility.name?<Text style={{color:'#000'}}>Block {allPosts[Number(global.postcurrent[0])].uservisibility.name.substr(0,15)}</Text>:
//                   } */}
//                    <Text style={{color:'#000'}}>Block</Text> 
//                   </Text>
//                   {/* {
//                     allPosts[Number(global.postcurrent[0])] && allPosts[Number(global.postcurrent[0])].uservisibility.name?
//                     <Text
//                     style={{
//                       color: "#000",
//                       fontSize: 14,
//                       flex: 70,
//                       paddingLeft: 40,
//                     }}
//                   >
//                     If you dont want to receive updates from {allPosts[Number(global.postcurrent[0])].uservisibility.name.substr(0,15)}
//                   </Text>:<Text
//                     style={{
//                       color: "#000",
//                       fontSize: 14,
//                       flex: 70,
//                       paddingLeft: 40,
//                     }}
//                   >
//                     If you dont want to receive updates from Nonname
//                   </Text>
//                   } */}
//                   <Text
//                     style={{
//                       color: "#000",
//                       fontSize: 14,
//                       flex: 70,
//                       paddingLeft: 40,
//                     }}
//                   >
//                     If you dont want to receive updates from Nonname
//                   </Text>
//                   {/* line */}
//                   {/* <View
//                     style={{
//                       marginTop: 0,
//                       marginLeft: 0,
//                       marginRight: 0,
//                       borderBottomColor: "#C0C0C0",
//                       borderBottomWidth: 1,
//                     }}
//                   /> */}
//                 </View>
//               </View>
//               {/* <View style={{ flexDirection: "row", marginTop: 20 }}>
//                 <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
//                   <Image
//                     source={require("../assets/icons/bottomsheet/3.png")}
//                     style={{ height: 26, width: 26 }}
//                   ></Image>
//                 </View>
//                 <View style={{ color: "#000", flex: 13, height: 60 }}>
//                   <Text
//                     style={{
//                       color: "#000",
//                       fontSize: 16,
//                       margin: 0,
//                       fontWeight: "bold",
//                       paddingLeft: 40,
//                     }}
//                   >
//                     Subscribe to Tarkesh
//                   </Text>
//                   <Text
//                     style={{
//                       color: "#000",
//                       fontSize: 14,
//                       flex: 70,
//                       paddingLeft: 40,
//                     }}
//                   >
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   </Text>

//                 </View>
//               </View> */}
//             </View>
//           </View>
//         </View>


//       </RBSheet>



// {/* Login to access */}
//       <RBSheet
//         ref={Login}
//         closeOnDragDown={true}
//         closeOnPressMask={true}
//         height={380}
//         borderRadius={0}
//         closeDuration={100}
//         customStyles={{
//           draggableIcon: {
//             backgroundColor: "#000",
//           },
//           container: {
//             borderRadius: 0,
//           },
//         }}
//       >
//         <View style={{ backgroundColor: "#fff", height: 200 }}>
//           <View>
//             <View>
//               <View style={{ flexDirection: "row", marginTop: 10 }}>
//                 <View style={{ color: "#000", flex: 13, height: 60 }}>
//                   <Text
//                     style={{
//                       color: "#000",
//                       fontSize: 16,
//                       margin: 0,
//                       fontWeight: "bold",
//                       paddingLeft: 0,
//                       textAlign: "center",
//                     }}
//                   >
//                     Login to access this feature
//                   </Text>

//                   <View
//                     style={{
//                       marginTop: 10,
//                       marginLeft: 10,
//                       marginRight: 10,
//                       borderBottomColor: "#D7D7D7",
//                       borderBottomWidth: 1,
//                     }}
//                   />
//                 </View>
//               </View>
//               <View style={{ flexDirection: "row", marginTop: 0 }}>
//                 <View style={{ color: "#000", flex: 13, height: 60 }}>
//                   {/* <Text
//                     style={{
//                       color: "#A1A4B2",
//                       fontSize: 14,
//                       flex: 70,
//                       paddingLeft: 10,
//                     }}
//                   >
//                     We will send you an{" "}
//                     <Text style={{ color: "#7E818F", fontWeight: "bold" }}>
//                       One Time Password
//                     </Text>{" "}
//                     on this mobile number.
//                   </Text> */}
//                   <Image source={require('../assets/icons/login_continue.png')} style={{height:150 ,width:150,marginLeft:120}}></Image>

//                 </View>
//               </View>
//               <View style={{ flexDirection: "row", marginTop: 0 }}>
//                 <View style={{ color: "#000", flex: 13, height: 160 }}>


//                   {/* line */}
//                   <Button
//                     mode="contained"
//                     color="#FA5805"
//                     style={{
//                       height: 40,
//                       width: 230,
//                       margin: 10,
//                       marginTop:90,
//                       marginLeft: 80,
//                     }}
//                     onPress={() => onLogin()}
//                   >
//                     Login to access this feature
//                   </Button>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>


//       </RBSheet>
// {/* Spaarks Call disabled */}
//       <RBSheet
//         ref={refRBSheets}
//         closeOnDragDown={true}
//         closeOnPressMask={true}
//         height={170}
//         borderRadius={10}
//         closeDuration={100}
//         customStyles={{
//           draggableIcon: {
//             backgroundColor: "#000",
//           },
//           container: {
//             borderRadius: 30,
//           },
//         }}
//       >
//         <View style={{ backgroundColor: "#fff", height: 200 }}>
//           <View>
//             <View>
//               <View style={{ flexDirection: "row", marginTop: 20 }}>
//                 <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
//                   <Image
//                     source={require("../assets/bottomCard/call_message.png")}
//                     style={{ height: 100, width: 100 }}
//                   ></Image>
//                 </View>
//                 <View
//                   style={{
//                     color: "#000",
//                     flex: 13,
//                     height: 80,
//                     paddingLeft: 45,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color: "#000",
//                       fontSize: 16,
//                       margin: 0,
//                       fontWeight: "bold",
//                       paddingLeft: 40,
//                     }}
//                   >
//                     Owner of this Spaark disabled Call option.
//                   </Text>
//                   <Text
//                     style={{
//                       color: "#000",
//                       fontSize: 14,
//                       marginTop: 8,
//                       flex: 70,
//                       paddingLeft: 40,
//                     }}
//                   >
//                     Note : You can also disable call
//                   </Text>
//                   {/* line */}
//                   <Text
//                     style={{
//                       color: "#000",
//                       fontSize: 14,
//                       marginTop: 0,
//                       flex: 60,
//                       paddingLeft: 40,
//                     }}
//                   >
//                     while posting a spaark.
//                   </Text>
//                 </View>
//                 <View style={{ flex: 3 }}></View>
//               </View>
//             </View>
//           </View>
//         </View>
//       </RBSheet>
//    {/* Spaarks Chat disabled */}
//       <RBSheet
//         ref={refRBSheetss}
//         closeOnDragDown={true}
//         closeOnPressMask={true}
//         height={170}
//         borderRadius={10}
//         closeDuration={100}
//         customStyles={{
//           draggableIcon: {
//             backgroundColor: "#000",
//           },
//           container: {
//             borderRadius: 30,
//           },
//         }}
//       >
//         <View style={{ backgroundColor: "#fff", height: 200 }}>
//           <View>
//             <View>
//               <View style={{ flexDirection: "row", marginTop: 20 }}>
//                 <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
//                   <Image
//                     source={require("../assets/bottomCard/chat_message.png")}
//                     style={{ height: 100, width: 100 }}
//                   ></Image>
//                 </View>
//                 <View
//                   style={{
//                     color: "#000",
//                     flex: 13,
//                     height: 80,
//                     paddingLeft: 45,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color: "#000",
//                       fontSize: 16,
//                       margin: 0,
//                       fontWeight: "bold",
//                       paddingLeft: 40,
//                     }}
//                   >
//                     Owner of this Spaark disabled Chat option.
//                   </Text>
//                   <Text
//                     style={{
//                       color: "#000",
//                       fontSize: 14,
//                       marginTop: 8,
//                       flex: 70,
//                       paddingLeft: 40,
//                     }}
//                   >
//                     Note : You can also disable chat
//                   </Text>
//                   {/* line */}
//                   <Text
//                     style={{
//                       color: "#000",
//                       fontSize: 14,
//                       marginTop: 0,
//                       flex: 60,
//                       paddingLeft: 40,
//                     }}
//                   >
//                     while posting a spaark
//                   </Text>
//                 </View>
//                 <View style={{ flex: 3 }}></View>
//               </View>
//             </View>
//           </View>
//         </View>
//       </RBSheet>

//         <View style={{ backgroundColor: "#F2F2F2" }}>

//           <View style={{ margin: 0 }}>
//             <View style={{ margin: 10 }}>
//               {/* <TextInput 
//           placeholder="Looking for something"
//           placeholderTextColor="#000"
//           autoCapitalize="none"
//           style={{flex:0,padding:0}}
//           onChangeText={navigation.navigate('SearchScreen')}
//         // onFocus={}
//         /> */}
//               <Chip
//                 mode={"outlined"}
//                 style={{
//                   margin: 2,
//                   marginBottom: 0,
//                   padding: 0,
//                   borderRadius: 30,
//                 }}
//                 onPress={() => navigation.navigate("SearchScreen")}
//               >
//                 <View
//                   style={{ flexDirection: "row", justifyContent: "center" }}
//                 >
//                   <View style={{ flex: 0 }}>
//                     <Image
//                       source={require("../assets/icons/filter.png")}
//                       style={{ height: 40, width: 50 }}
//                     ></Image>
//                   </View>

//                   <View style={{ flex: 0 }}>
//                     <Text
//                       style={{
//                         color: "#8f9090",
//                         fontSize: 15,
//                         marginLeft: 40,
//                         marginTop: 12,
//                       }}
//                     >
//                       Looking for something
//                     </Text>
//                   </View>

//                   <View style={{ flex: 0, marginLeft: 65, marginTop: 7 }}>
//                     <Image
//                       source={require("../assets/icons/search.png")}
//                       style={{ height: 30, width: 30 }}
//                     ></Image>
//                   </View>
//                 </View>
//               </Chip>
//                   <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//               <View style={{ flexDirection: "row" }}>
//                 {/* {
//                   userPreferences.map(item=>{
//                         <Chip mode={'outlined'} style={{margin:3,marginBottom:10}}  >
//                                 <Text style={styles.chipTexts}>{item.name}</Text>
//                               </Chip>
//                       })
//                 } */}

//                   {/* <TouchableOpacity
//                             onPress={() => PushNotificationIOS.addNotificationRequest({alertBody:"Hi there"})}
//                           > */}



//                                     <FlatList
//                   data={Userpreferences}
//                   horizontal={true}
//                   renderItem={({ item }) =>( 
//                                     <TouchableOpacity onPress={()=>getData(item.category,item.category)}>
//                                       {
//                                         selectedPreference == item.category? 

//                                         <Chip mode={"outlined"} style={{ margin: 3, marginBottom: 10,backgroundColor:'#6FA4E9' }}>
//                                       {
//                                         item.fromSearch?
//                     <Text style={styles.chipTexts,{color:'#fff'}}>{item.subCategory}</Text>:
//                     <Text style={styles.chipTexts,{color:'#fff'}}>{item.category}</Text>
//                                       }

//                                       </Chip>

//                                       :
//                                         <Chip mode={"outlined"} style={{ margin: 3, marginBottom: 10 }}>
//                                   {
//                                         item.fromSearch?
//                     <Text style={styles.chipTexts,{color:'#000'}}>{item.subCategory}</Text>:
//                     <Text style={styles.chipTexts,{color:'#000'}}>{item.category}</Text>
//                                       }
//                                   </Chip>
//                                       }

//                                   </TouchableOpacity>
//                   )}/>

//                 {/* </TouchableOpacity>  */}
//                 {/* <Chip mode={"outlined"} style={{ margin: 3, marginBottom: 10 }}>
//                   <Text style={styles.chipTexts}>sxdcfvgg</Text>
//                 </Chip>
//                 <Chip mode={"outlined"} style={{ margin: 3, marginBottom: 10 }}>
//                   <Text style={styles.chipTexts}>xsdcfvgbh</Text>
//                 </Chip>
//                 <Chip mode={"outlined"} style={{ margin: 3, marginBottom: 10 }}>
//                   <Text style={styles.chipTexts}>werty</Text>
//                 </Chip> */}
//               </View>
//               </ScrollView>
//               <Image
//                 source={require("../assets/icons/market_banner.png")}
//                 style={{ height: 100, width: 370, padding: 10 }}
//               ></Image>
//             </View>

//             {/* <Text
//               h5
//               style={{
//                 fontWeight: "bold",
//                 marginLeft: 20,
//                 marginTop: 10,
//                 fontSize: 20,
//               }}
//             >
//               Spaarks Around 5km
//             </Text> */}
//               <TouchableOpacity onPress={()=>{handleConnect(5000,5000)}}>
//              <Text h4 style={{ fontWeight: "bold", margin: 10 }}>

//            <Image source={require('../assets/icons/show.png')} style={{height:30,width:30}}></Image>Spaarks Around 5000km
//             </Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={()=>{handleConnect(5001,5001)}}>
//              <Text h4 style={{ fontWeight: "bold", margin: 10 }}>

//            <Image source={require('../assets/icons/show.png')} style={{height:30,width:30}}></Image>Spaarks Around 5001km
//             </Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={()=>{handleConnect('NZkt19fFlD','1R90tqaiDU')}}>
//              <Text h4 style={{ fontWeight: "bold", margin: 10 }}>

//            <Image source={require('../assets/icons/show.png')} style={{height:30,width:30}}></Image>Spaarks Around NZkt19fFlD
//             </Text>
//             </TouchableOpacity>













//             <TouchableOpacity onPress={()=>{handleOutgoingCall(5000,navigation)}}>
//              <Text h4 style={{ fontWeight: "bold", margin: 10 }}>

//            <Image source={require('../assets/icons/show.png')} style={{height:30,width:30}}></Image>Call 5000
//             </Text>
//             </TouchableOpacity>



//             <TouchableOpacity onPress={()=>{handleOutgoingCall(5001,navigation)}}>
//              <Text h4 style={{ fontWeight: "bold", margin: 10 }}>s

//            <Image source={require('../assets/icons/show.png')} style={{height:30,width:30}}></Image>Call 5001
//             </Text>
//             </TouchableOpacity>


//             <TouchableOpacity onPress={()=>{navigation.navigate('testPage')}}>
//              <Text h4 style={{ fontWeight: "bold", margin: 10 }}>
//            <Image source={require('../assets/icons/show.png')} style={{height:30,width:30}}></Image>End
//             </Text>
//             </TouchableOpacity>







//             {
//               isLoadingOnChange?
//               <>
//              <View style={{justifyContent:'center'}}><Image source={{uri:'https://i.gifer.com/ZZ5H.gif'}} style={{height:20,width:20,left:190}}></Image></View> 
//               </>:<></>
//             }
//             {

// allPosts.length>0?<></>:<Text style={{textAlign:'center'}}>No Spaarks with "{selectedPreference}"</Text>
//             }
//             {/* {
//               !showTag?


//               <View style={{}}>
//               <Text style={{fontWeight:"bold",color:'green'}}>{message}</Text>
//               </View>
//               <View style={{backgroundColor:'#fff',width:'100%',borderColor:'#44BE4A',borderWidth:3,height:70,textAlign:'center',justifyContent:'center'}}>
//               <Text style={{fontWeight:"bold",marginLeft:100}}>Spaark Posted Succesfully </Text>
//               <Text style={{fontWeight:"bold",marginLeft:30}}>You can see all the other spaarks nearby below </Text>
//               </View>
//               : 


//             } */}







//             <FlatList
//             data={dataSource}
//             keyExtractor={item => item._id}
//           ItemSeparatorComponent={ItemSeparatorView}
//           enableEmptySections={true}
//           renderItem={ItemViews}
//           ListFooterComponent={renderFooter}

//         />

//             <Text h4 style={{ fontWeight: "bold", margin: 10 }}>
//            <Image source={require('../assets/icons/show.png')} style={{height:30,width:30}}></Image> Get Started
//             </Text>


//             <View
//               style={{
//                 backgroundColor: "#f2f2f2",
//                 padding: 10,
//                 paddingLeft: 0,
//               }}
//             >
//               <ScrollView
//                 horizontal={true}
//                 showsHorizontalScrollIndicator={false}
//               >
//                 <View
//                   style={{
//                     marginTop: 0,
//                     backgroundColor: "#fff",
//                     borderRadius: 8,
//                     marginLeft: 10,
//                   }}
//                 >
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       width: 310,
//                       borderRadius: 8,
//                     }}
//                   >
//                     <View style={{backgroundColor:"#000",flex:15,margin:5,height:250,borderRadius:10}}>
//     <TouchableOpacity onPress={() => navigation.navigate('SelectCategory',{question:1,question:'Want a Job',excluding:[]})
//       }>
//     <ImageBackground source={require('../assets/images-1/driver.jpg')} style={styles.image} imageStyle={{ borderRadius: 10, opacity: 0.7}}>

//     <Text h4 style={{marginTop:150,color:"#fff",fontWeight:"bold",padding:5}}>Want a Job</Text>
//     <Text h6 style={{marginTop:10,color:"#fff",fontWeight:"bold",padding:2, flexWrap: 'wrap',textAlign: 'left'}}>Maid,Teacher,Cleaner,Sweeper,Mechanic,Technician,Plumber,Electrician</Text>
//     </ImageBackground>
//     </TouchableOpacity>
//     </View>
//                   </View>
//                 </View>


//                 <View
//                   style={{
//                     marginTop: 0,
//                     backgroundColor: "#fff",
//                     borderRadius: 8,
//                     marginLeft: 10,
//                   }}
//                 >
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       width: 310,
//                       borderRadius: 8,
//                     }}
//                   >
//                     <View style={{backgroundColor:"#000",flex:15,margin:5,height:250,borderRadius:10}}>
//     <TouchableOpacity onPress={() => navigation.navigate('SelectCategory',{question:2,question:'Find a Job',excluding:[]})
//       }>
//     <ImageBackground source={require('../assets/images-1/driver.jpg')} style={styles.image} imageStyle={{ borderRadius: 10, opacity: 0.7}}>

//     <Text h4 style={{marginTop:150,color:"#fff",fontWeight:"bold",padding:5}}>Find a Job</Text>
//     <Text h6 style={{marginTop:10,color:"#fff",fontWeight:"bold",padding:2, flexWrap: 'wrap',textAlign: 'left'}}>Maid,Teacher,Cleaner,Sweeper,Mechanic,Technician,Plumber,Electrician</Text>
//     </ImageBackground>
//     </TouchableOpacity>
//     </View>
//                   </View>
//                 </View>



//                 <View
//                   style={{
//                     marginTop: 0,
//                     backgroundColor: "#fff",
//                     borderRadius: 8,
//                     marginLeft: 10,
//                   }}
//                 >
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       width: 310,
//                       borderRadius: 8,
//                     }}
//                   >
//                     <View style={{backgroundColor:"#000",flex:15,margin:5,height:250,borderRadius:10}}>
//     <TouchableOpacity onPress={() => navigation.navigate('SelectCategory',{question:3,question:'Have somethibg to sell',excluding:[]})
//       }>
//     <ImageBackground source={require('../assets/images-1/driver.jpg')} style={styles.image} imageStyle={{ borderRadius: 10, opacity: 0.7}}>

//     <Text h4 style={{marginTop:150,color:"#fff",fontWeight:"bold",padding:5}}>Have somethibg to sell</Text>
//     <Text h6 style={{marginTop:10,color:"#fff",fontWeight:"bold",padding:2, flexWrap: 'wrap',textAlign: 'left'}}>Maid,Teacher,Cleaner,Sweeper,Mechanic,Technician,Plumber,Electrician</Text>
//     </ImageBackground>
//     </TouchableOpacity>
//     </View>
//                   </View>
//                 </View>





//               </ScrollView>
//             </View>




//             {/* Spaarks Beyond 5 kms */}

//             {/* <Text
//               h5
//               style={{
//                 fontWeight: "bold",
//                 marginLeft: 20,
//                 marginTop: 10,
//                 fontSize: 20,
//               }}
//             >

//             </Text> */}

//             <Text h4 style={{ fontWeight: "bold", margin: 10 }}>
//            <Image source={require('../assets/icons/show.png')} style={{height:30,width:30}}></Image>     Spaarks Beyond 5km
//             </Text>



//             <FlatList
//             data={postBeyond.slice(0,10)}
//             keyExtractor={item => item.id}
//             scrollsToTop={false}
//             maintainVisibleContentPosition={true}
//             // onEndReached={loadMoreData}
//             // renderFooter
//             // onEndReachedThreshold ={0.1}
//             onEndReachedThreshold={0.05}
//             // onEndReached={loadMoreData}
//             ListFooterComponent={renderFooter}
//             renderItem={ItemViewBeyond}>



//             </FlatList>




//           </View>

//         </View>
//       </ScrollView>
//     );
//   };

//   const WhatsAppShare = async (post) => {
//     try {
//       console.log('---------------------')
//       console.log(post)
//       console.log(post.questionNo)
//       console.log('---------------------')
//       if(post.questionNo == '1'){
//         var a = `${post.tags[0].name}\n${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
//         *Connect*  to your local area wherever you go.`;
//       }

//       if(post.questionNo == '2'){
//         var a = `${post.tags[0].name}\n${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
//         *Connect*  to your local area wherever you go.`;
//       }

//       if(post.questionNo == '3'){
//         var a = `${post.tags[0].name}\n*Name*:${post.uservisibility.name.substr(0,15)}\n*Content:*\n${post.content}\n\n*Post Link:*\n${post.uservisibility.share}\n\n *Apni Services Dijiye. Apni income badaiye. Free to use.*\n *Download Spaarks App :*\nhttps://cutt.ly/Spaarks-app\n\nJahan jaayein, apne local area se connect karein. Free app.`;
//       }//Done

//       if(post.questionNo == '4'){
//         var a = `${post.tags[0].name}\n*Name*:${post.uservisibility.name.substr(0,15)}\n*Content:*\n${post.content}\n\n*Post Link:*\n${post.uservisibility.share}\n\n *Kuch bhi sell karien. Apne aas paas. Ghar baithe. Easy.*\n *Download Spaarks App :*\nhttps://cutt.ly/Spaarks-app\n\nJahan jaayein, apne local area se connect karein. Free app.`;
//       }//Done

//       if(post.questionNo == '5'){
//         var a = `${post.tags[0].name} ${post.tags[1].name}\n*Content:*\n${post.content}\n\n*Post Link:*\n${post.uservisibility.share}\n\n *Apne aas pass, Service dene wale ko connect karien. Free. Easy.*\n *Download Spaarks App :*\nhttps://cutt.ly/Spaarks-app\n\nJahan jaayein, apne local area se connect karein. Free app.`;
//       }//Done

//       if(post.questionNo == '6'){
//         var a = `${post.tags[0].name}\n*Content:*\n${post.content.substr(0,150)}\n\n*Post Link:*\n${post.uservisibility.share}\n\n *Vacancy ko post karien. Staff payein. Ghar baithe. Free to use.*\n *Download Spaarks App :*\nhttps://cutt.ly/Spaarks-app\n\nJahan jaayein, apne local area se connect karein. Free app.`;
//       }

//       if(post.questionNo == '7'){
//         var a = `${post.tags[0].name}\n*Content:*${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
//         *Connect*  to your local area wherever you go.`;
//       }

//       if(post.questionNo == 'Find a Job'){
//         var a = `*JOB*${post.tags[0].name}\n*Content:*${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
//         *Connect*  to your local area wherever you go.`;
//       }



//       let url = "whatsapp://send?text="+a;
//       Linking.openURL(url)
//       // const result = await Share.share({
//       //   message: `${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
//       //       Connect to your local area wherever you go.`,
//       // });
//       // if (result.action === Share.sharedAction) {
//       //   if (result.activityType) {
//       //     // shared with activity type of result.activityType
//       //   } else {
//       //     // shared
//       //   }
//       // } else if (result.action === Share.dismissedAction) {
//       //   // dismissed
//       // }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const onShare = async (post) => {
//     try {
//       const result = await Share.share({
//         message: `${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
//             Connect to your local area wherever you go.`,
//       });
//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // shared with activity type of result.activityType
//         } else {
//           // shared
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // dismissed
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen name="Home" component={HomeScreen} />

//       <Stack.Screen
//         name="ChatSpecific"
//         component={ChatSpecificScreen}
//         options={(navigation) => ({
//           // tabBarIcon: ,
//           tabBarVisible: false,
//         })}
//       />
//       <Stack.Screen
//         name="OnBoarding"
//         component={OnBoardingScreen}
//         options={(navigation) => ({
//           // tabBarIcon: ,
//           tabBarVisible: false,
//         })}
//       />
//     </Stack.Navigator>
//   );
// };

// const mapStatetoProps = (state) => {
//   // const { }=state
//   // 
//   console.log("sState Post", state.chatss.preferences);
//   global.chat_roster_mains = state.chatss.chat_roster_main
//   // global.Chatdispatcher = state.chatss.chat_roster_main
//   var Userpreferences = [{category:'All',subCategory:'All',selected:true}];
//   if(state.chatss.preferences){
//     Userpreferences = state.chatss.preferences
//   }
//   // alert(state.chatss.allPosts.length)
//   console.log('preferencessssAll',state.chatss.allPosts.length)
//   // dispatch({type:'SETPOSTSCOUNT',postsCount:state.chatss.allPosts.length})
//   return {
//     chat_roster_main: state.chatss.chat_roster_main,
//     chat_roster_anonymous: state.chatss.chat_roster_anonymous,
//     messages: state.chatss.messages,
//     chatLoading:state.chatss.chatLoading,
//     Userpreferences:[...Userpreferences],
//     main_loading:state.chatss.main_loading,
//     allPosts:[...state.chatss.allPosts],
//     postBeyond:[...state.chatss.postBeyond],
//     allMapPosts:[...state.chatss.allMapPosts],
//     count:state.chatss.count
//   };
// };


// exports.setRecMes = setRecMes;
// export default connect(mapStatetoProps)(AllFeaturesScreen);

// const styles = StyleSheet.create({
//   searchBox: {
//     position: "relative",
//     marginTop: Platform.OS === "ios" ? 5 : 20,
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     width: "100%",
//     alignSelf: "center",
//     borderColor: "#d7d7d7",
//     borderRadius: 20,
//     padding: 10,
//     shadowColor: "#ccc",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.5,
//     shadowRadius: 5,
//   },
//   chats: {
//     height: 30,
//     width: 30,
//     margin: 22,
//   },
//   chatss: {
//     height: 30,
//     width: 30,
//     margin: 32,
//   },
//   eachCard: {
//     padding: 0,
//     backgroundColor: "#fff",
//     marginBottom: 10,
//     marginTop:6
//   },
//   BottomNav: {
//     flex: 0,
//     flexDirection: "row",
//     backgroundColor: "#63CDFF",
//   },
//   LoginComponent: {
//     height: 500,
//     width: 100,
//     margin: 50,
//   },
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#000",
//   },

//   input: {
//     width: 200,
//     height: 44,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "black",
//     marginBottom: 10,
//   },
//   tinyLogo: {
//     flex: 0,
//     height: 120,
//     width: 120,
//     margin: 20,
//   },
//   rows1: {
//     flex: 0,
//     flexDirection: "row",
//   },
//   image: {
//     resizeMode: "cover",
//     justifyContent: "center",
//   },
//   bgimage: {
//     resizeMode: "repeat",
//     justifyContent: "center",
//   },
//   rows2: {
//     flex: 0,
//     flexDirection: "row",
//   },
//   scrollView: {},
//   engine: {
//     position: "absolute",
//     right: 0,
//   },
//   body: {
//     height: 1000,
//     backgroundColor: "#f2f2f2",
//   },
//   sectionContainercol: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//     width: 200,
//     height: 100,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     padding: 8,
//     textAlign: "center",
//     fontSize: 24,
//     fontWeight: "600",
//     color: "#ffffff",
//     fontWeight: "700",
//   },
//   sectionDescription: {
//     textAlign: "center",
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: "400",
//     color: "#ffffff",
//   },

//   sectionDescriptions: {
//     textAlign: "center",
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: "400",
//   },
//   highlight: {
//     fontWeight: "700",
//   },
//   footer: {
//     fontSize: 12,
//     fontWeight: "600",
//     padding: 4,
//     paddingRight: 12,
//     textAlign: "right",
//   },

//   buttonSelected: {
//     opacity: 1,
//     color: "red",
//   },
//   customSlide: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   customImage: {
//     width: 390,
//     height: 500,
//     resizeMode: "cover",
//   },
//   chip: {
//     backgroundColor: "#FA6E5A",
//     margin: 0,
//     height: 25,
//     width: 80,
//   },
//   chips: {
//     backgroundColor: "#6FA4E9",
//     margin: 2,
//     height: 30,
//     width: 100,
//   },
//   chipText: {
//     color: "#fff",
//   },
//   chipTexts: {
//     color: "#000",
//   },
//   video: {
//     backgroundColor:'#000',
//     justifyContent:'center',
//     marginTop:140,
//     width: 360,
//     height: 250,
//     resizeMode: "contain"
//   },
//   separator: {
//     height: 0.5,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   text: {
//     fontSize: 15,
//     color: 'black',
//   },
//   footer: {
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   loadMoreBtn: {
//     padding: 10,
//     backgroundColor: '#800000',
//     borderRadius: 4,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnText: {
//     color: 'white',
//     fontSize: 15,
//     textAlign: 'center',
//   },



// });


//React Native FlatList Pagination to Load More Data dynamically – Infinite List
//https://aboutreact.com/react-native-flatlist-pagination-to-load-more-data-dynamically-infinite-list/

// import React in our code
import React, { useEffect, setState, useRef, useState } from "react";
import { TabRouter, useTheme } from "@react-navigation/native";
import Hyperlink from 'react-native-hyperlink';
import RNUrlPreview from 'react-native-url-preview';
import {
  Share,
  Image,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Colors,
  ScrollView,
Pressable,
  ImageBackground,
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  DevSettings,
  TextInput,
  Alert,
  TouchableHighlight,
  LogBox,
  Linking,
  FlatList,
  Platforms,
  Modal,
  Dimensions
} from "react-native";
const GLOBAL = require('../Globals');
import RNLocation from 'react-native-location';
import RNCallKeep from 'react-native-callkeep';
import axios from "axios";
import JsSIP from 'jssip'
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import ViewShot from "react-native-view-shot";
import { Rating, AirbnbRating, Divider } from "react-native-elements";
import { canPost } from './authGuard'
import { connect, useDispatch, useReducer } from "react-redux";
import { connectXMPP, addListenerssss, getRosterMain, setMess } from './xmpp';
import chatReducers from "../reducers/chatReducers";
import { callKeepSetup, handleAPNs, handleConnect } from './OutGoingCallScreen'
LogBox.ignoreAllLogs();
import _ from "lodash";
// import { Video, AVPlaybackStatus } from 'expo-av';
import PostCard from "../components/PostCard";
import moment from "moment";
import Carousel from 'react-native-snap-carousel';
import Star from 'react-native-star-view';
import { Text, BottomSheet, ListItem } from "react-native-elements";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { checkNotifications } from 'react-native-permissions';
import AsyncStorage from "@react-native-community/async-storage";
import Video from 'react-native-video'
import I18n from '../src/i18n';
const isIOS = Platform.OS === 'ios';
import SpaarksHeading from "../components/SpaarksHeading"
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
  Chip,
} from "react-native-paper";
import Dialog from "react-native-dialog";
import Snackbar from 'react-native-snackbar';
import RBSheet from "react-native-raw-bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatSpecificScreen from "./ChatSpecificScreen";
import OnBoardingScreen from "./OnBoardingScreen";
import { useScrollToTop } from '@react-navigation/native';
import Slider from '@react-native-community/slider';


const Stack = createStackNavigator();
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};




const indexes = [4, 8, 12, 16, 20, 24]
global.postcurrent = ['0'];
global.type = 'within';
global.category = 'All';
global.subCategory = '';

const MarketScreen = ({ navigation,route,distance,sortBy,sortApplied,chat_roster_main,allMapPosts,token,Userpreferences,selectedPreference,categorySearched,subCategorySearched }) => {
              const [selectedPreferences,setSelectedPreference] = useState(selectedPreference)
              const [modalVisible, setModalVisible] = useState(false);
              const [currentRating, setCurrentRating] = useState([]); 
              const [isSearched, setIsSearched] = useState(true); 
              const viewShotRef = useRef();
              const refRBSheet = useRef();
              const refRBSheets = useRef();
              const refRBsheettt = useRef();
              var flatListWithin = useRef();
  if(selectedPreferences!=selectedPreference && isSearched){
    alert('Changed')
    getDataForPill(categorySearched,subCategorySearched)
    setTimeout(() => {
      setIsSearched(false)
    }, 3000);
    // setSelectedPreference(selectedPreference)
  }
              
              const refRBSheetss = useRef();
              const Login = useRef();
              const deleteMyPost = useRef();
              const [phone, setPhone] = React.useState('');
              const [loading, setLoading] = useState(true);
              const [dataSourceWithin, setDataSourceWithin] = useState([]);
              const [dataSourceBeyond, setDataSourceBeyond] = useState([]);
              const [dataSourceExplore, setDataSourceExplore] = useState([]);
              const [offsetBeyond, setOffsetBeyond] = useState(1);
              const [offsetexplore, setOffsetExplore] = useState(1);
              const [offsetWithin, setOffsetWithin] = useState(1);
              const [currentPageBeyondLength, setCurrentPageBeyondLength] = useState(0);
              const [currentpageWithinLength, setCurrentPageWithinLength] = useState(1);
              const [currentpageExploreLength, setCurrentPageExploreLength] = useState(1);
              const [pendingRatings, setPendingRatings] = useState([]);
              const [pendingWorks, setPendingWorks] = useState([]);
              const [extraThings, setExtraThings] = useState(true)
              const [banners, setBanners] = useState([]);
               const [currentCategory, setCurrentCategory] = useState('All')
                const [currentSubCategory, setCurrentSubCategory] = useState('')
              const Chatdispatcher = useDispatch(chatReducers);
              const ref = React.useRef(null);
              useScrollToTop(ref);
      // if(selectedPreference!=='All'){
      //   console.log('About to get Data')
      //   getDataForPill(categorySearched,subCategorySearched)
      // }

      // if(route.params.isFromPill){
      //   alert('Pill')
      // }

            async function getLinkingURI(){
              
              const url = await Linking.getInitialURL();
              console.log('------------------------------------------------s')
                  console.log('url',url.substr(15,url.length))
                    console.log('Detected',dataSourceWithin)
                  console.log('------------------------------------------------')
            }
            const [sortedDistance, setsortedDistance]= useState(5); 
            const [finalDistance, setFinalDistance] = useState(5);
            const getDataWithin = async (offsetWithins) => {
              // alert('fetching new Data')
              // alert('In Within',offsetWithin)
              console.log('currentCategorycurrentCategorycurrentCategory',currentCategory,offsetWithins)
                      // console.log('getDatagetDatagetDatagetDatagetDatagetDatagetDatagetDatas',categorySearched,subCategorySearched);
                      // setLoading(true);
                      var latitudes = await AsyncStorage.getItem('latitude');
                      var longitudes = await AsyncStorage.getItem('longitude');
                      var jwt = await AsyncStorage.getItem('token');
                      if(String(jwt) != "null"){
                          if(global.category == 'All'){
                            // alert('Page '+offsetWithins)
                                  console.log('getData');
                                  await axios.post(
                                    GLOBAL.BASE_URL + "market/post/static/within",
                                    {
                                      "latitude": Number(latitudes),
                                      "longitude": Number(longitudes),
                                      "category": 'all',
                                      "page": offsetWithins,
                                      "radius":sortedDistance,
                                      "sortBy":sortByString
                                    },
                                    {
                                      headers: {
                                        "Content-Type": "application/json",
                                        Authorization:
                                        'Bearer '+jwt
                                      },
                                    }
                                  )
                                    .then(async (responseJson) => {

                                      //Successful response from the API Call
                                      await axios.post(
                                        GLOBAL.BASE_URL + "market/post/static/within",
                                        {
                                          "latitude": Number(latitudes),
                                          "longitude": Number(longitudes),
                                          "category": 'all',
                                          "page": offsetWithins+1
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
                                          if(responseJson.data.data.post.length == 0){
                                            setLoadMoreWithin(false)
                                          }
                                          
                                        });
                                      console.log('responseJson', responseJson.data.data.post)
                                      setBanners(responseJson.data.data.bannersNew)
                                      if(responseJson.data.data.post.length>0){
                                          setOffsetWithin(offsetWithin + 1);
                                      }
                                      setCurrentPageWithinLength(responseJson.data.data.post.length)
                                      //After the response increasing the offset for the next API call.
                                      if(offsetWithins == 1){
                                          setDataSourceWithin([...responseJson.data.data.post]);
                                      }else{
                                          setDataSourceWithin([...dataSourceWithin,...responseJson.data.data.post]);
                                      }
                                    
                                      // setLoading(false);
                                    })
                                    .catch((error) => {
                                      console.error(error);
                                    });
                          }else{
                            
                                  await axios.post(
                                    GLOBAL.BASE_URL + "market/post/static/within",
                                    {
                                      "latitude": Number(latitudes),
                                      "longitude": Number(longitudes),
                                      "category": global.category,
                                      "subCategory":global.subCategory,
                                      "page": offsetWithins,
                                      "radius":sortedDistance,
                                      "sortBy":sortByString
                                    },
                                    {
                                      headers: {
                                        "Content-Type": "application/json",
                                        Authorization:
                                        'Bearer '+jwt
                                      },
                                    }
                                  )
                                    .then(async (responseJson) => {

                                      await axios.post(
                                        GLOBAL.BASE_URL + "market/post/static/within",
                                        {
                                          "latitude": Number(latitudes),
                                          "longitude": Number(longitudes),
                                          "category": 'all',
                                          "page": offsetWithins+1,
                                          "category": global.category,
                                          "subCategory":global.subCategory,
                                          "radius":sortedDistance,
                                          "sortBy":sortByString
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
                                          if(responseJson.data.data.post.length == 0){
                                            setLoadMoreWithin(false)
                                          }
                                          
                                        });
                                      //Successful response from the API Call
                                      setCurrentPageWithinLength(responseJson.data.data.post.length)
                                      
                                      console.log('responseJsonsInSearch', responseJson.data.data.post)
                                      // alert(offsetWithins)
                                      //After the response increasing the offset for the next API call.
                                      if(offsetWithins == 1){
                                          setDataSourceWithin([...responseJson.data.data.post]);
                                          // setDataSourceWithin([...responseJson.data.data.post]);
                                      }else{
                                          setDataSourceWithin([...dataSourceWithin,...responseJson.data.data.post]);
                                      }
            
                                      // setOffsetWithin(offsetWithin + 1);
                                      if(responseJson.data.data.post.length>0){
                                          setOffsetWithin(offsetWithin + 1);
                                      }
                                      if(responseJson.data.data.post.length == 0){
                                        setLoading(false);
                                      }
                                      
                                    })
                                    .catch((error) => {
                                      console.error(error);
                                    });
                          }
                      }else{
                        if(global.category == 'All'){
                          await axios.post(
                            GLOBAL.BASE_URL + "market/post/static/within",
                            {
                              "latitude": Number(latitudes),
                              "longitude": Number(longitudes),
                              "category": 'all',
                              "page": offsetWithins,
                              "radius":sortedDistance,
                              "sortBy":sortByString
                            }
                          )
                            .then(async (responseJson) => {
                              await axios.post(
                                GLOBAL.BASE_URL + "market/post/static/within",
                                {
                                  "latitude": Number(latitudes),
                                  "longitude": Number(longitudes),
                                  "category": 'all',
                                  "page": offsetWithins+1,
                                  "radius":sortedDistance,
                                  "sortBy":sortByString
                                }
                              )
                                .then((responseJson) => {
                                  if(responseJson.data.data.post.length == 0){
                                    setLoadMoreWithin(false)
                                  }
                                  
                                });
                              
                              //Successful response from the API Call
                              if(responseJson.data.data.post.length>0){
                                  setOffsetWithin(offsetWithin + 1);
                              }
                              //After the response increasing the offset for the next API call.
                              if(offsetWithins == 1){
                                  setDataSourceWithin([...responseJson.data.data.post]);
                              }else{
                                  setDataSourceWithin([...dataSourceWithin,...responseJson.data.data.post]);
                              }
                            })
                            .catch((error) => {
                              console.error(error);
                            });
                        }else{
                    
                          await axios.post(
                            GLOBAL.BASE_URL + "market/post/static/within",
                            {
                              "latitude": Number(latitudes),
                              "longitude": Number(longitudes),
                              "category": global.category,
                              "subCategory":global.subCategory,
                              "page": offsetWithins,
                              "radius":sortedDistance,
                              "sortBy":sortByString
                            }
                          )
                            .then(async (responseJson) => {

                               await axios.post(
                                        GLOBAL.BASE_URL + "market/post/static/within",
                                        {
                                          "latitude": Number(latitudes),
                                          "longitude": Number(longitudes),
                                          "category": 'all',
                                          "page": offsetWithins+1,
                                          "category": global.category,
                                          "subCategory":global.subCategory,
                                          "radius":sortedDistance,
                                          "sortBy":sortByString
                                        }
                                      )
                                        .then((responseJson) => {
                                          if(responseJson.data.data.post.length == 0){
                                            setLoadMoreWithin(false)
                                          }
                                          
                                        });
                              //Successful response from the API Call
                              //After the response increasing the offset for the next API call.
                              if(offsetWithins == 1){
                                  setDataSourceWithin([...responseJson.data.data.post]);
                              }else{
                                  setDataSourceWithin([...dataSourceWithin,...responseJson.data.data.post]);
                              }
                              // setOffsetWithin(offsetWithin + 1);
                              if(responseJson.data.data.post.length>0){
                                  setOffsetWithin(offsetWithin + 1);
                              }
                            })
                            .catch((error) => {
                              console.error(error);
                            });
                       }
                      }
            };

            const getDataExplore = async (offsetexplore) => {
              // alert('In Explore')
              // alert('fetching new Data')
              // alert('In Within',offsetWithin)
              console.log('ExploreCate',currentCategory,offsetexplore)
                      // console.log('getDatagetDatagetDatagetDatagetDatagetDatagetDatagetDatas',categorySearched,subCategorySearched);
                      // setLoading(true);
                      var latitudes = await AsyncStorage.getItem('latitude');
                      var longitudes = await AsyncStorage.getItem('longitude');
                      var jwt = await AsyncStorage.getItem('token');
                      if(String(jwt) != "null"){
                          if(global.category == 'All'){

                                  console.log('getData');
                                  // setLoading(true);
                                  // alert(offsetWithin)
                                
                      
                                  await axios.post(
                                    GLOBAL.BASE_URL + "market/post/static/explore",
                                    {
                                      "latitude": Number(latitudes),
                                      "longitude": Number(longitudes),
                                      "category": global.category,
                                      "subCategory":global.subCategory,
                                      "page": offsetexplore,
                                      "radius":sortedDistance,
                                      "sortBy":sortByString
                                    },
                                    {
                                      headers: {
                                        "Content-Type": "application/json",
                                        Authorization:
                                        'Bearer '+jwt
                                      },
                                    }
                                  )
                                    .then(async (responseJson) => {
                                      //Successful response from the API Call
                                      await axios.post(
                                        GLOBAL.BASE_URL + "market/post/static/explore",
                                        {
                                          "latitude": Number(latitudes),
                                          "longitude": Number(longitudes),
                                          "category": 'all',
                                          "page": offsetexplore+1,
                                          "radius":sortedDistance,
                                          "sortBy":sortByString
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
                                          if(responseJson.data.data.post.length == 0){
                                            setLoadMoreExplore(false)
                                          }
                                          
                                        });
                                      console.log('responseJson', responseJson.data.data.post)
                                      if(responseJson.data.data.post.length>0){
                                          setOffsetExplore(offsetexplore + 1);
                                      }
                                      setCurrentPageExploreLength(responseJson.data.data.post.length)
                                      //After the response increasing the offset for the next API call.
                                      if(offsetWithins == 1){
                                          setDataSourceExplore([...responseJson.data.data.post]);
                                      }else{
                                          setDataSourceExplore([...dataSourceExplore,...responseJson.data.data.post]);
                                      }
                                    
                                      // setLoading(false);
                                    })
                                    .catch((error) => {
                                      console.error(error);
                                    });
                          }else{
                            
                                  await axios.post(
                                    GLOBAL.BASE_URL + "market/post/static/explore",
                                    {
                                      "latitude": Number(latitudes),
                                      "longitude": Number(longitudes),
                                      "category": global.category,
                                      "subCategory":global.subCategory,
                                      "page": offsetexplore,
                                      "radius":sortedDistance,
                                      "sortBy":sortByString
                                    },
                                    {
                                      headers: {
                                        "Content-Type": "application/json",
                                        Authorization:
                                        'Bearer '+jwt
                                      },
                                    }
                                  )
                                    .then(async (responseJson) => {
                                      // alert(responseJson.data.data.post.length)

                                      await axios.post(
                                        GLOBAL.BASE_URL + "market/post/static/explore",
                                        {
                                          "latitude": Number(latitudes),
                                          "longitude": Number(longitudes),
                                          "category": 'all',
                                          "page": offsetexplore+1,
                                          "category": global.category,
                                          "subCategory":global.subCategory,
                                          "radius":sortedDistance,
                                          "sortBy":sortByString
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
                                          if(responseJson.data.data.post.length == 0){
                                            setLoadMoreExplore(false)
                                          }
                                          
                                        });
                                      //Successful response from the API Call
                                      setCurrentPageExploreLength(responseJson.data.data.post.length)
                                      
                                      console.log('responseJsonsInSearch', responseJson.data.data.post)
                                      // alert(offsetWithins)
                                      //After the response increasing the offset for the next API call.
                                      if(offsetexplore == 1){
                                          setDataSourceExplore([...responseJson.data.data.post]);
                                          // setDataSourceWithin([...responseJson.data.data.post]);
                                      }else{
                                          setDataSourceExplore([...dataSourceExplore,...responseJson.data.data.post]);
                                      }
            
                                      // setOffsetWithin(offsetWithin + 1);
                                      if(responseJson.data.data.post.length>0){
                                          setOffsetExplore(offsetexplore + 1);
                                      }
                                      if(responseJson.data.data.post.length == 0){
                                        setLoading(false);
                                      }
                                      
                                    })
                                    .catch((error) => {
                                      console.error('WRONGINEXPLORE',error);
                                    });
                          }
                      }else{
                        if(global.category == 'All'){
                          await axios.post(
                            GLOBAL.BASE_URL + "market/post/static/explore",
                            {
                              "latitude": Number(latitudes),
                              "longitude": Number(longitudes),
                              "category": 'all',
                              "page": offsetexplore,
                              "radius":sortedDistance,
                              "sortBy":sortByString
                            }
                          )
                            .then(async (responseJson) => {
                              await axios.post(
                                GLOBAL.BASE_URL + "market/post/static/explore",
                                {
                                  "latitude": Number(latitudes),
                                  "longitude": Number(longitudes),
                                  "category": 'all',
                                  "page": offsetexplore+1,
                                  "radius":sortedDistance,
                                  "sortBy":sortByString
                                }
                              )
                                .then((responseJson) => {
                                  if(responseJson.data.data.post.length == 0){
                                    setLoadMoreExplore(false)
                                  }
                                  
                                });
                              
                              //Successful response from the API Call
                              if(responseJson.data.data.post.length>0){
                                  setOffsetExplore(offsetexplore + 1);
                              }
                              //After the response increasing the offset for the next API call.
                              if(offsetWithins == 1){
                                  setDataSourceExplore([...responseJson.data.data.post]);
                              }else{
                                  setDataSourceExplore([...dataSourceExplore,...responseJson.data.data.post]);
                              }
                            })
                            .catch((error) => {
                              console.error(error);
                            });
                        }else{
                    
                          await axios.post(
                            GLOBAL.BASE_URL + "market/post/static/explore",
                            {
                              "latitude": Number(latitudes),
                              "longitude": Number(longitudes),
                              "category": global.category,
                              "subCategory":global.subCategory,
                              "page": offsetexplore,
                              "radius":sortedDistance,
                              "sortBy":sortByString
                            }
                          )
                            .then(async (responseJson) => {

                               await axios.post(
                                        GLOBAL.BASE_URL + "market/post/static/explore",
                                        {
                                          "latitude": Number(latitudes),
                                          "longitude": Number(longitudes),
                                          "category": 'all',
                                          "page": offsetexplore+1,
                                          "category": global.category,
                                          "subCategory":global.subCategory,
                                          "radius":sortedDistance,
                                          "sortBy":sortByString
                                        }
                                      )
                                        .then((responseJson) => {
                                          if(responseJson.data.data.post.length == 0){
                                            setLoadMoreExplore(false)
                                          }
                                          
                                        });
                              //Successful response from the API Call
                              //After the response increasing the offset for the next API call.
                              if(offsetexplore == 1){
                                  setDataSourceExplore([...responseJson.data.data.post]);
                              }else{
                                  setDataSourceExplore([...dataSourceExplore,...responseJson.data.data.post]);
                              }
                              // setOffsetWithin(offsetWithin + 1);
                              if(responseJson.data.data.post.length>0){
                                  setOffsetExplore(offsetexplore + 1);
                              }
                            })
                            .catch((error) => {
                              console.error(error);
                            });
                       }
                      }
            };

             const getDataBeyond = async (offsetBeyonds) => {
                  var latitudes = await AsyncStorage.getItem('latitude');
                  var longitudes = await AsyncStorage.getItem('longitude');
                  console.log('getData',offsetBeyonds,currentCategory);
                  var jwt = await AsyncStorage.getItem('token');
                  console.log('MMMMMMMMM',offsetBeyonds)
                  if(String(jwt) != "null"){
                          setLoading(true);
                          if(global.category == 'All'){
                          await axios.post(
                            GLOBAL.BASE_URL + "market/post/static/beyond",
                          {
                                        "latitude": Number(latitudes),
                                        "longitude": Number(longitudes),
                                        "category": 'all',
                                        "page": offsetBeyonds,
                                        "radius":distance,
                                        "sortBy":sortBy
                                      },
                                      {
                                        headers: {
                                          "Content-Type": "application/json",
                                          Authorization:
                                          'Bearer '+jwt
                                        },
                            }
                          )
                            .then(async (responseJson) => {
                              await axios.post(
                                GLOBAL.BASE_URL + "market/post/static/beyond",
                                {
                                  "latitude": Number(latitudes),
                                  "longitude": Number(longitudes),
                                  "category": 'all',
                                  "page": offsetBeyonds+1,
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
                                  if(responseJson.data.data.post.length == 0){
                                    setLoadMoreBeyond(false)
                                  }
                                  
                                });
                              //Successful response from the API Call
                              setCurrentPageBeyondLength(responseJson.data.data.post.length)
                              console.log('responseJson', responseJson.data.data.post)
                              //After the response increasing the offset for the next API call.
                              // setDataSourceBeyond([...dataSourceBeyond, ...responseJson.data.data.post]);
                                  if(offsetBeyonds == 1){
                                            setDataSourceBeyond([...responseJson.data.data.post]);
                                        }else{
                                            setDataSourceBeyond([...dataSourceBeyond,...responseJson.data.data.post]);
                                  }
                              // setOffsetBeyond(setOffsetBeyond + 1);
                              if(responseJson.data.data.post.length>0){
                                            setOffsetBeyond(offsetBeyonds + 1);
                                }
                              setLoading(false);
                            })
                            .catch((error) => {
                              console.error(error);
                            });

                          }else{
                                console.log('getData',offsetBeyonds);
                                    setLoading(true);
                                    // alert(offsetWithin)
                                    await axios.post(
                                      GLOBAL.BASE_URL + "market/post/static/beyond",
                                      {
                                        "latitude": Number(latitudes),
                                        "longitude": Number(longitudes),
                                        "category": global.category,
                                        "subCategory":global.subCategory,
                                        "page": offsetBeyonds
                                      },
                                      {
                                        headers: {
                                          "Content-Type": "application/json",
                                          Authorization:
                                          'Bearer '+jwt
                                        },
                                      }
                                    )
                                      .then(async (responseJson) => {
                                        await axios.post(
                                          GLOBAL.BASE_URL + "market/post/static/beyond",
                                          {
                                            "latitude": Number(latitudes),
                                            "longitude": Number(longitudes),
                                            "category": global.category,
                                            "subCategory":global.subCategory,
                                            "page": offsetBeyonds+1
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
                                            if(responseJson.data.data.post.length == 0){
                                              setLoadMoreBeyond(false)
                                            }
                                            
                                          });
                                        //Successful response from the API Call
                                                // setOffsetBeyond(offsetBeyond + 1);
                                               
                                                setCurrentPageBeyondLength(responseJson.data.data.post.length)
                                              if(offsetBeyonds == 1){
                                                setDataSourceBeyond([...responseJson.data.data.post]);
                                              
                                            }else{
                                                setDataSourceBeyond([...dataSourceBeyond,...responseJson.data.data.post]);
                                            }
                                            // setOffsetWithin(offsetWithin + 1);
                                            if(responseJson.data.data.post.length>0){
                                                setOffsetBeyond(offsetBeyonds + 1);
                                            }

                                      })
                                      .catch((error) => {
                                        console.error(error);
                                      });


                          }
                  }else{
                          setLoading(true);
                          if(currentCategory == 'All'){
                        await axios.post(
                          GLOBAL.BASE_URL + "market/post/static/beyond",
                          {
                                      "latitude": Number(latitudes),
                                      "longitude": Number(longitudes),
                                      "category": 'all',
                                      "page": offsetBeyonds
                                    }
                            )
                          .then(async (responseJson) => {
                            await axios.post(
                              GLOBAL.BASE_URL + "market/post/static/beyond",
                              {
                                "latitude": Number(latitudes),
                                "longitude": Number(longitudes),
                                "category": 'all',
                                "page": offsetBeyonds+1
                              }
                            )
                              .then((responseJson) => {
                                if(responseJson.data.data.post.length == 0){
                                  setLoadMoreBeyond(false)
                                }
                                
                              });
                            //Successful response from the API Call
                            setCurrentPageBeyondLength(responseJson.data.data.post.length)
                            console.log('responseJson', responseJson.data.data.post)
                            //After the response increasing the offset for the next API call.
                            // setDataSourceBeyond([...dataSourceBeyond, ...responseJson.data.data.post]);
                                if(offsetBeyonds == 1){
                                            setDataSourceBeyond([...responseJson.data.data.post]);
                                      }else{
                                            setDataSourceBeyond([...dataSourceBeyond,...responseJson.data.data.post]);
                                }
                            // setOffsetBeyond(setOffsetBeyond + 1);
                              if(responseJson.data.data.post.length>0){
                                          setOffsetBeyond(offsetBeyonds + 1);
                              }
                            setLoading(false);
                          })
                          .catch((error) => {
                            console.error(error);
                          });
        
                          }else{
                                console.log('getData',offsetBeyonds);
                                  setLoading(true);
                                  // alert(offsetWithin)
                                  await axios.post(
                                    GLOBAL.BASE_URL + "market/post/static/beyond",
                                      {
                                      "latitude": Number(latitudes),
                                      "longitude": Number(longitudes),
                                      "category": global.category,
                                      "subCategory":global.subCategory,
                                      "page": offsetBeyonds
                                    }
                                  )
                                    .then(async (responseJson) => {
                                      await axios.post(
                                        GLOBAL.BASE_URL + "market/post/static/beyond",
                                        {
                                          "latitude": Number(latitudes),
                                          "longitude": Number(longitudes),
                                          "category": global.category,
                                          "subCategory":global.subCategory,
                                          "page": offsetBeyonds+1
                                        }
                                      )
                                        .then((responseJson) => {
                                          if(responseJson.data.data.post.length == 0){
                                            setLoadMoreBeyond(false)
                                          }
                                          
                                        });
                                      setCurrentPageBeyondLength(responseJson.data.data.post.length)
                                      //Successful response from the API Call
                                              // setOffsetBeyond(offsetBeyond + 1);
                                              if(responseJson.data.data.post.length>0){
                                                setOffsetBeyond(offsetBeyonds + 1);
                                              } 
                                        console.log('responseJson', responseJson.data.data.post.length)
                                        //After the response increasing the offset for the next API call.
                                        // setDataSourceBeyond([...dataSourceBeyond, ...responseJson.data.data.post]);
                                          if(offsetBeyonds == 1){
                                            setDataSourceBeyond([...responseJson.data.data.post]);
                                          }else{
                                            setDataSourceBeyond([...dataSourceBeyond,...responseJson.data.data.post]);
                                          }
                                        setLoading(false);
                                    })
                                    .catch((error) => {
                                      console.error(error);
                                    });
        
        
                          }
                  }
              };






              const getDataWithinSort = async (offsetWithins,dist,sort) => {
                // alert('fetching new Data')
                // alert('In Within',offsetWithin)
                console.log('currentCategorycurrentCategorycurrentCategory',currentCategory,offsetWithins)
                        // console.log('getDatagetDatagetDatagetDatagetDatagetDatagetDatagetDatas',categorySearched,subCategorySearched);
                        // setLoading(true);
                        var latitudes = await AsyncStorage.getItem('latitude');
                        var longitudes = await AsyncStorage.getItem('longitude');
                        var jwt = await AsyncStorage.getItem('token');
                        if(String(jwt) != "null"){
                            if(global.category == 'All'){
  
                                    console.log('getData');
                                    // setLoading(true);
                                    // alert(offsetWithin)
                                    await axios.post(
                                      GLOBAL.BASE_URL + "market/post/static/within",
                                      {
                                        "latitude": Number(latitudes),
                                        "longitude": Number(longitudes),
                                        "category": 'all',
                                        "page": offsetWithins,
                                        "radius":dist,
                                        "sortBy":sort
                                      },
                                      {
                                        headers: {
                                          "Content-Type": "application/json",
                                          Authorization:
                                          'Bearer '+jwt
                                        },
                                      }
                                    )
                                      .then(async (responseJson) => {
  
                                        //Successful response from the API Call
                                        await axios.post(
                                          GLOBAL.BASE_URL + "market/post/static/within",
                                          {
                                            "latitude": Number(latitudes),
                                            "longitude": Number(longitudes),
                                            "category": 'all',
                                            "page": offsetWithins+1,
                                            "radius":dist,
                                            "sortBy":sort
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
                                            if(responseJson.data.data.post.length == 0){
                                              setLoadMoreWithin(false)
                                            }
                                            
                                          });
                                        console.log('responseJson', responseJson.data.data.post)
                                        setBanners(responseJson.data.data.bannersNew)
                                        if(responseJson.data.data.post.length>0){
                                            setOffsetWithin(offsetWithin + 1);
                                        }
                                        setCurrentPageWithinLength(responseJson.data.data.post.length)
                                        //After the response increasing the offset for the next API call.
                                        if(offsetWithins == 1){
                                            setDataSourceWithin([...responseJson.data.data.post]);
                                        }else{
                                            setDataSourceWithin([...dataSourceWithin,...responseJson.data.data.post]);
                                        }
                                      
                                        // setLoading(false);
                                      })
                                      .catch((error) => {
                                        console.error(error);
                                      });
                            }else{
                              
                                    await axios.post(
                                      GLOBAL.BASE_URL + "market/post/static/within",
                                      {
                                        "latitude": Number(latitudes),
                                        "longitude": Number(longitudes),
                                        "category": global.category,
                                        "subCategory":global.subCategory,
                                        "page": offsetWithins,
                                        "radius":dist,
                                        "sortBy":sort
                                      },
                                      {
                                        headers: {
                                          "Content-Type": "application/json",
                                          Authorization:
                                          'Bearer '+jwt
                                        },
                                      }
                                    )
                                      .then(async (responseJson) => {
  
                                        await axios.post(
                                          GLOBAL.BASE_URL + "market/post/static/within",
                                          {
                                            "latitude": Number(latitudes),
                                            "longitude": Number(longitudes),
                                            "category": 'all',
                                            "page": offsetWithins+1,
                                            "category": global.category,
                                            "subCategory":global.subCategory,
                                            "radius":dist,
                                            "sortBy":sort
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
                                            if(responseJson.data.data.post.length == 0){
                                              setLoadMoreWithin(false)
                                            }
                                            
                                          });
                                        //Successful response from the API Call
                                        setCurrentPageWithinLength(responseJson.data.data.post.length)
                                        
                                        console.log('responseJsonsInSearch', responseJson.data.data.post)
                                        // alert(offsetWithins)
                                        //After the response increasing the offset for the next API call.
                                        if(offsetWithins == 1){
                                            setDataSourceWithin([...responseJson.data.data.post]);
                                            // setDataSourceWithin([...responseJson.data.data.post]);
                                        }else{
                                            setDataSourceWithin([...dataSourceWithin,...responseJson.data.data.post]);
                                        }
              
                                        // setOffsetWithin(offsetWithin + 1);
                                        if(responseJson.data.data.post.length>0){
                                            setOffsetWithin(offsetWithin + 1);
                                        }
                                        if(responseJson.data.data.post.length == 0){
                                          setLoading(false);
                                        }
                                        
                                      })
                                      .catch((error) => {
                                        console.error(error);
                                      });
                            }
                        }else{
                          if(global.category == 'All'){
                            await axios.post(
                              GLOBAL.BASE_URL + "market/post/static/within",
                              {
                                "latitude": Number(latitudes),
                                "longitude": Number(longitudes),
                                "category": 'all',
                                "page": offsetWithins,
                                "radius":dist,
                                "sortBy":sort
                              }
                            )
                              .then(async (responseJson) => {
                                await axios.post(
                                  GLOBAL.BASE_URL + "market/post/static/within",
                                  {
                                    "latitude": Number(latitudes),
                                    "longitude": Number(longitudes),
                                    "category": 'all',
                                    "page": offsetWithins+1,
                                    "radius":dist,
                                    "sortBy":sort
                                  }
                                )
                                  .then((responseJson) => {
                                    if(responseJson.data.data.post.length == 0){
                                      setLoadMoreWithin(false)
                                    }
                                    
                                  });
                                
                                //Successful response from the API Call
                                if(responseJson.data.data.post.length>0){
                                    setOffsetWithin(offsetWithin + 1);
                                }
                                //After the response increasing the offset for the next API call.
                                if(offsetWithins == 1){
                                    setDataSourceWithin([...responseJson.data.data.post]);
                                }else{
                                    setDataSourceWithin([...dataSourceWithin,...responseJson.data.data.post]);
                                }
                              })
                              .catch((error) => {
                                console.error(error);
                              });
                          }else{
                      
                            await axios.post(
                              GLOBAL.BASE_URL + "market/post/static/within",
                              {
                                "latitude": Number(latitudes),
                                "longitude": Number(longitudes),
                                "category": global.category,
                                "subCategory":global.subCategory,
                                "page": offsetWithins,
                                "radius":dist,
                                "sortBy":sort
                              }
                            )
                              .then(async (responseJson) => {
  
                                 await axios.post(
                                          GLOBAL.BASE_URL + "market/post/static/within",
                                          {
                                            "latitude": Number(latitudes),
                                            "longitude": Number(longitudes),
                                            "category": 'all',
                                            "page": offsetWithins+1,
                                            "category": global.category,
                                            "subCategory":global.subCategory,
                                            "radius":dist,
                                        "sortBy":sort
                                          }
                                        )
                                          .then((responseJson) => {
                                            if(responseJson.data.data.post.length == 0){
                                              setLoadMoreWithin(false)
                                            }
                                            
                                          });
                                //Successful response from the API Call
                                //After the response increasing the offset for the next API call.
                                if(offsetWithins == 1){
                                    setDataSourceWithin([...responseJson.data.data.post]);
                                }else{
                                    setDataSourceWithin([...dataSourceWithin,...responseJson.data.data.post]);
                                }
                                // setOffsetWithin(offsetWithin + 1);
                                if(responseJson.data.data.post.length>0){
                                    setOffsetWithin(offsetWithin + 1);
                                }
                              })
                              .catch((error) => {
                                console.error(error);
                              });
                         }
                        }
              };
  
              const getDataExploreSort = async (offsetexplore,dist,sort) => {
                // alert('In Explore')
                // alert('fetching new Data')
                // alert('In Within',offsetWithin)
                console.log('ExploreCate',currentCategory,offsetexplore)
                        // console.log('getDatagetDatagetDatagetDatagetDatagetDatagetDatagetDatas',categorySearched,subCategorySearched);
                        // setLoading(true);
                        var latitudes = await AsyncStorage.getItem('latitude');
                        var longitudes = await AsyncStorage.getItem('longitude');
                        var jwt = await AsyncStorage.getItem('token');
                        if(String(jwt) != "null"){
                            if(global.category == 'All'){
  
                                    console.log('getData');
                                    // setLoading(true);
                                    // alert(offsetWithin)
                                  
                        
                                    await axios.post(
                                      GLOBAL.BASE_URL + "market/post/static/explore",
                                      {
                                        "latitude": Number(latitudes),
                                        "longitude": Number(longitudes),
                                        "category": global.category,
                                        "subCategory":global.subCategory,
                                        "page": offsetexplore,
                                        "radius":dist,
                                        "sortBy":sort
                                      },
                                      {
                                        headers: {
                                          "Content-Type": "application/json",
                                          Authorization:
                                          'Bearer '+jwt
                                        },
                                      }
                                    )
                                      .then(async (responseJson) => {
                                        //Successful response from the API Call
                                        await axios.post(
                                          GLOBAL.BASE_URL + "market/post/static/explore",
                                          {
                                            "latitude": Number(latitudes),
                                            "longitude": Number(longitudes),
                                            "category": 'all',
                                            "page": offsetexplore+1,
                                            "radius":dist,
                                            "sortBy":sort
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
                                            if(responseJson.data.data.post.length == 0){
                                              setLoadMoreExplore(false)
                                            }
                                            
                                          });
                                        console.log('responseJson', responseJson.data.data.post)
                                        if(responseJson.data.data.post.length>0){
                                            setOffsetExplore(offsetexplore + 1);
                                        }
                                        setCurrentPageExploreLength(responseJson.data.data.post.length)
                                        //After the response increasing the offset for the next API call.
                                        if(offsetWithins == 1){
                                            setDataSourceExplore([...responseJson.data.data.post]);
                                        }else{
                                            setDataSourceExplore([...dataSourceExplore,...responseJson.data.data.post]);
                                        }
                                      
                                        // setLoading(false);
                                      })
                                      .catch((error) => {
                                        console.error(error);
                                      });
                            }else{
                              
                                    await axios.post(
                                      GLOBAL.BASE_URL + "market/post/static/explore",
                                      {
                                        "latitude": Number(latitudes),
                                        "longitude": Number(longitudes),
                                        "category": global.category,
                                        "subCategory":global.subCategory,
                                        "page": offsetexplore,
                                        "radius":dist,
                                        "sortBy":sort
                                      },
                                      {
                                        headers: {
                                          "Content-Type": "application/json",
                                          Authorization:
                                          'Bearer '+jwt
                                        },
                                      }
                                    )
                                      .then(async (responseJson) => {
                                        alert(responseJson.data.data.post.length)
  
                                        await axios.post(
                                          GLOBAL.BASE_URL + "market/post/static/explore",
                                          {
                                            "latitude": Number(latitudes),
                                            "longitude": Number(longitudes),
                                            "category": 'all',
                                            "page": offsetexplore+1,
                                            "category": global.category,
                                            "subCategory":global.subCategory,
                                            "radius":dist,
                                            "sortBy":sort
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
                                            if(responseJson.data.data.post.length == 0){
                                              setLoadMoreExplore(false)
                                            }
                                            
                                          });
                                        //Successful response from the API Call
                                        setCurrentPageExploreLength(responseJson.data.data.post.length)
                                        
                                        console.log('responseJsonsInSearch', responseJson.data.data.post)
                                        // alert(offsetWithins)
                                        //After the response increasing the offset for the next API call.
                                        if(offsetexplore == 1){
                                            setDataSourceExplore([...responseJson.data.data.post]);
                                            // setDataSourceWithin([...responseJson.data.data.post]);
                                        }else{
                                            setDataSourceExplore([...dataSourceExplore,...responseJson.data.data.post]);
                                        }
              
                                        // setOffsetWithin(offsetWithin + 1);
                                        if(responseJson.data.data.post.length>0){
                                            setOffsetExplore(offsetexplore + 1);
                                        }
                                        if(responseJson.data.data.post.length == 0){
                                          setLoading(false);
                                        }
                                        
                                      })
                                      .catch((error) => {
                                        console.error('WRONGINEXPLORE',error);
                                      });
                            }
                        }else{
                          if(global.category == 'All'){
                            await axios.post(
                              GLOBAL.BASE_URL + "market/post/static/explore",
                              {
                                "latitude": Number(latitudes),
                                "longitude": Number(longitudes),
                                "category": 'all',
                                "page": offsetexplore,
                                "radius":dist,
                                "sortBy":sort
                              }
                            )
                              .then(async (responseJson) => {
                                await axios.post(
                                  GLOBAL.BASE_URL + "market/post/static/explore",
                                  {
                                    "latitude": Number(latitudes),
                                    "longitude": Number(longitudes),
                                    "category": 'all',
                                    "page": offsetexplore+1,
                                    "radius":dist,
                                    "sortBy":sort
                                  }
                                )
                                  .then((responseJson) => {
                                    if(responseJson.data.data.post.length == 0){
                                      setLoadMoreExplore(false)
                                    }
                                    
                                  });
                                
                                //Successful response from the API Call
                                if(responseJson.data.data.post.length>0){
                                    setOffsetExplore(offsetexplore + 1);
                                }
                                //After the response increasing the offset for the next API call.
                                if(offsetWithins == 1){
                                    setDataSourceExplore([...responseJson.data.data.post]);
                                }else{
                                    setDataSourceExplore([...dataSourceExplore,...responseJson.data.data.post]);
                                }
                              })
                              .catch((error) => {
                                console.error(error);
                              });
                          }else{
                      
                            await axios.post(
                              GLOBAL.BASE_URL + "market/post/static/explore",
                              {
                                "latitude": Number(latitudes),
                                "longitude": Number(longitudes),
                                "category": global.category,
                                "subCategory":global.subCategory,
                                "page": offsetexplore,
                                "radius":dist,
                                "sortBy":sort
                              }
                            )
                              .then(async (responseJson) => {
  
                                 await axios.post(
                                          GLOBAL.BASE_URL + "market/post/static/explore",
                                          {
                                            "latitude": Number(latitudes),
                                            "longitude": Number(longitudes),
                                            "category": 'all',
                                            "page": offsetexplore+1,
                                            "category": global.category,
                                            "subCategory":global.subCategory,
                                            "radius":dist,
                                            "sortBy":sort
                                          }
                                        )
                                          .then((responseJson) => {
                                            if(responseJson.data.data.post.length == 0){
                                              setLoadMoreExplore(false)
                                            }
                                            
                                          });
                                //Successful response from the API Call
                                //After the response increasing the offset for the next API call.
                                if(offsetexplore == 1){
                                    setDataSourceExplore([...responseJson.data.data.post]);
                                }else{
                                    setDataSourceExplore([...dataSourceExplore,...responseJson.data.data.post]);
                                }
                                // setOffsetWithin(offsetWithin + 1);
                                if(responseJson.data.data.post.length>0){
                                    setOffsetExplore(offsetexplore + 1);
                                }
                              })
                              .catch((error) => {
                                console.error(error);
                              });
                          }
                        }
              };
  
               const getDataBeyondSort = async (offsetBeyonds,dist,sort) => {
                    var latitudes = await AsyncStorage.getItem('latitude');
                    var longitudes = await AsyncStorage.getItem('longitude');
                    console.log('getData',offsetBeyonds,currentCategory);
                    var jwt = await AsyncStorage.getItem('token');
                    console.log('MMMMMMMMM',offsetBeyonds)
                    if(String(jwt) != "null"){
                            setLoading(true);
                            if(global.category == 'All'){
                            await axios.post(
                              GLOBAL.BASE_URL + "market/post/static/beyond",
                            {
                                          "latitude": Number(latitudes),
                                          "longitude": Number(longitudes),
                                          "category": 'all',
                                          "page": offsetBeyonds,
                                          "radius":dist,
                                          "sortBy":sort
                                        },
                                        {
                                          headers: {
                                            "Content-Type": "application/json",
                                            Authorization:
                                            'Bearer '+jwt
                                          },
                              }
                            )
                              .then(async (responseJson) => {
                                await axios.post(
                                  GLOBAL.BASE_URL + "market/post/static/beyond",
                                  {
                                    "latitude": Number(latitudes),
                                    "longitude": Number(longitudes),
                                    "category": 'all',
                                    "page": offsetBeyonds+1
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
                                    if(responseJson.data.data.post.length == 0){
                                      setLoadMoreBeyond(false)
                                    }
                                    
                                  });
                                //Successful response from the API Call
                                setCurrentPageBeyondLength(responseJson.data.data.post.length)
                                console.log('responseJson', responseJson.data.data.post)
                                //After the response increasing the offset for the next API call.
                                // setDataSourceBeyond([...dataSourceBeyond, ...responseJson.data.data.post]);
                                    if(offsetBeyonds == 1){
                                              setDataSourceBeyond([...responseJson.data.data.post]);
                                          }else{
                                              setDataSourceBeyond([...dataSourceBeyond,...responseJson.data.data.post]);
                                    }
                                // setOffsetBeyond(setOffsetBeyond + 1);
                                if(responseJson.data.data.post.length>0){
                                              setOffsetBeyond(offsetBeyonds + 1);
                                }
                                setLoading(false);
                              })
                              .catch((error) => {
                                console.error(error);
                              });
  
                            }else{
                                  console.log('getData',offsetBeyonds);
                                      setLoading(true);
                                      // alert(offsetWithin)
                                      await axios.post(
                                        GLOBAL.BASE_URL + "market/post/static/beyond",
                                        {
                                          "latitude": Number(latitudes),
                                          "longitude": Number(longitudes),
                                          "category": global.category,
                                          "subCategory":global.subCategory,
                                          "page": offsetBeyonds,
                                          "radius":dist,
                                          "sortBy":sort
                                        },
                                        {
                                          headers: {
                                            "Content-Type": "application/json",
                                            Authorization:
                                            'Bearer '+jwt
                                          },
                                        }
                                      )
                                        .then(async (responseJson) => {
                                          await axios.post(
                                            GLOBAL.BASE_URL + "market/post/static/beyond",
                                            {
                                              "latitude": Number(latitudes),
                                              "longitude": Number(longitudes),
                                              "category": global.category,
                                              "subCategory":global.subCategory,
                                              "page": offsetBeyonds+1,
                                              "radius":dist,
                                              "sortBy":sort
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
                                              if(responseJson.data.data.post.length == 0){
                                                setLoadMoreBeyond(false)
                                              }
                                              
                                            });
                                          //Successful response from the API Call
                                                  // setOffsetBeyond(offsetBeyond + 1);
                                                 
                                                  setCurrentPageBeyondLength(responseJson.data.data.post.length)
                                                if(offsetBeyonds == 1){
                                                  setDataSourceBeyond([...responseJson.data.data.post]);
                                                
                                              }else{
                                                  setDataSourceBeyond([...dataSourceBeyond,...responseJson.data.data.post]);
                                              }
                                              // setOffsetWithin(offsetWithin + 1);
                                              if(responseJson.data.data.post.length>0){
                                                  setOffsetBeyond(offsetBeyonds + 1);
                                              }
  
                                        })
                                        .catch((error) => {
                                          console.error(error);
                                        });
  
  
                            }
                    }else{
                            setLoading(true);
                            if(currentCategory == 'All'){
                          await axios.post(
                            GLOBAL.BASE_URL + "market/post/static/beyond",
                            {
                                        "latitude": Number(latitudes),
                                        "longitude": Number(longitudes),
                                        "category": 'all',
                                        "page": offsetBeyonds,
                                        "radius":dist,
                                        "sortBy":sort
                                      }
                              )
                            .then(async (responseJson) => {
                              await axios.post(
                                GLOBAL.BASE_URL + "market/post/static/beyond",
                                {
                                  "latitude": Number(latitudes),
                                  "longitude": Number(longitudes),
                                  "category": 'all',
                                  "page": offsetBeyonds+1,
                                  "radius":dist,
                                  "sortBy":sort
                                }
                              )
                                .then((responseJson) => {
                                  if(responseJson.data.data.post.length == 0){
                                    setLoadMoreBeyond(false)
                                  }
                                  
                                });
                              //Successful response from the API Call
                              setCurrentPageBeyondLength(responseJson.data.data.post.length)
                              console.log('responseJson', responseJson.data.data.post)
                              //After the response increasing the offset for the next API call.
                              // setDataSourceBeyond([...dataSourceBeyond, ...responseJson.data.data.post]);
                                  if(offsetBeyonds == 1){
                                              setDataSourceBeyond([...responseJson.data.data.post]);
                                        }else{
                                              setDataSourceBeyond([...dataSourceBeyond,...responseJson.data.data.post]);
                                  }
                              // setOffsetBeyond(setOffsetBeyond + 1);
                                if(responseJson.data.data.post.length>0){
                                            setOffsetBeyond(offsetBeyonds + 1);
                                }
                              setLoading(false);
                            })
                            .catch((error) => {
                              console.error(error);
                            });
          
                            }else{
                                  console.log('getData',offsetBeyonds);
                                    setLoading(true);
                                    // alert(offsetWithin)
                                    await axios.post(
                                      GLOBAL.BASE_URL + "market/post/static/beyond",
                                        {
                                        "latitude": Number(latitudes),
                                        "longitude": Number(longitudes),
                                        "category": global.category,
                                        "subCategory":global.subCategory,
                                        "page": offsetBeyonds,
                                        "radius":dist,
                                        "sortBy":sort
                                      }
                                    )
                                      .then(async (responseJson) => {
                                        await axios.post(
                                          GLOBAL.BASE_URL + "market/post/static/beyond",
                                          {
                                            "latitude": Number(latitudes),
                                            "longitude": Number(longitudes),
                                            "category": global.category,
                                            "subCategory":global.subCategory,
                                            "page": offsetBeyonds+1,
                                            "radius":dist,
                                            "sortBy":sort
                                          }
                                        )
                                          .then((responseJson) => {
                                            if(responseJson.data.data.post.length == 0){
                                              setLoadMoreBeyond(false)
                                            }
                                            
                                          });
                                        setCurrentPageBeyondLength(responseJson.data.data.post.length)
                                        //Successful response from the API Call
                                                // setOffsetBeyond(offsetBeyond + 1);
                                                if(responseJson.data.data.post.length>0){
                                                  setOffsetBeyond(offsetBeyonds + 1);
                                                } 
                                          console.log('responseJson', responseJson.data.data.post.length)
                                          //After the response increasing the offset for the next API call.
                                          // setDataSourceBeyond([...dataSourceBeyond, ...responseJson.data.data.post]);
                                            if(offsetBeyonds == 1){
                                              setDataSourceBeyond([...responseJson.data.data.post]);
                                            }else{
                                              setDataSourceBeyond([...dataSourceBeyond,...responseJson.data.data.post]);
                                            }
                                          setLoading(false);
                                      })
                                      .catch((error) => {
                                        console.error(error);
                                      });
          
          
                            }
                    }
                };
           



              async function getDataForPill(category,subCategory) {
                // var a = 1;
                setOffsetWithin(1);
                setOffsetBeyond(1);
                setOffsetExplore(1)
                setDataSourceWithin([])
                setDataSourceBeyond([])
                setDataSourceExplore([])
                setSelectedPreference(subCategory)
                setCurrentCategory(category)
                setCurrentSubCategory(subCategory)
                global.category = category;
                global.subCategory = subCategory;
                await getDataWithin(1)
                await getDataBeyond(1)
                await getDataExplore(1)
              }

             const getDataWithinTag = async (category,subCategory) => {
              var latitudes = await AsyncStorage.getItem('latitude');
              var longitudes = await AsyncStorage.getItem('longitude');
                      console.log('getData');
                      setLoading(true);
                      // alert(offsetWithin)
                      await axios.post(
                        GLOBAL.BASE_URL + "market/post/static/within",
                        {
                          "latitude": Number(latitudes),
                          "longitude": Number(longitudes),
                          "category": "all",
                          "page": offsetWithin
                        },
                        {
                          headers: {
                            "Content-Type": "application/json",
                            Authorization:
                            GLOBAL.TOKEN._W
                          },
                        }
                      )
                        .then((responseJson) => {
                          //Successful response from the API Call
                          setOffsetWithin(offsetWithin + 1);
                          console.log('responseJson', responseJson.data.data.post)
                          //After the response increasing the offset for the next API call.
                          setDataSourceWithin([...dataSourceWithin, ...responseJson.data.data.post]);
                          setLoading(false);
                        })
                        .catch((error) => {
                          console.error(error);
                        });


            };


                async function getData(){
                  // var latitudes = await AsyncStorage.getItem('latitude');
                  // var longitudes = await AsyncStorage.getItem('longitude');
                        // console.log('selectedPreferenceselectedPreference',selectedPreference)
                        // setSelectedPreference('All')
                        // Chatdispatcher({type:'SETSELECTEDPREFERENCE',selectedPreference:'All',category:'All',subCategory:''})
                                    //   var a = await axios.post(
                                    //   GLOBAL.BASE_URL+"market/post/static",
                                    //   {
                                    //     "latitude": Number(latitudes),
                                    //     "longitude": Number(longitudes),
                                    //     "radius":10000,
                                    //     "category":'all',
                                    //   }
                                    // );
                                    setBanners(a.data.data.banner)

                    // var finalPosts = [];
                    // var total = 30;
                    // var remaining = 30 - a.data.data.post.slice(0, 30).length;
                    
                    // if(remaining > 0){
                    //   finalPosts = [...a.data.data.post.slice(0, 30),...a.data.data.postBeyond.slice(0,remaining)]
                    // }
                                    // setallPostsPage(a.data.data.post.slice(30))
                                    // dispatch({ type: "SETPOSTS",allPosts:a.data.data.post, posts: a.data.data.post,postBeyond: a.data.data.postBeyond,banners: a.data.data.banner});
                                    // Chatdispatcher({type:'SETALLPOSTS',allPosts:a.data.data.post,postBeyond: a.data.data.postBeyond,banners: a.data.data.banner})
                                    // Chatdispatcher({ type: 'SETMAPPOSTSMARKET', marketMapPosts: finalPosts })
              }

              async function openFilter(){
                // registerCalls()
                // showCount()
                refRBsheettt.current.open()
              }

              async function getPreferences(){
                var pref = await AsyncStorage.getItem('prefernces');
                
                var newOBj = JSON.parse(pref);
                console.log('newOBjnewOBjnewOBjnewOBj',newOBj)
                // if(newOBj.length>0){
                //   newOBj.unshift({ category: 'All', subCategory: 'All', selected: true })
                // }
                Chatdispatcher({type:'SETPREFERENCES',preferences:newOBj})
              }
          
              useEffect(() => {
                getPreferences()
                // getData()
                getDataWithin(offsetWithin)
                getDataBeyond(offsetBeyond)
              // }
          
              // useEffect(() => {
              //   // getPreferences()
              //   // getData()
              //   // getDataWithin(offsetWithin)
              //   // getDataBeyond(offsetBeyond)
              //   callfromuseEffect()

              },[]);

          async  function selectedPostMap(post,type){
            allMapPosts.splice(0, 0, post);
                const key = '_id';
                const arrayUniqueByKey = [...new Map(allMapPosts.map(item =>
                  [item[key], item])).values()]
                Chatdispatcher({type:'SETSHOWNOW',allMapPosts:arrayUniqueByKey})
                navigation.navigate("MapScreen")
              // if(type=="within"){
              //     allMapPosts.splice(0, 0, post);
              //     Chatdispatcher({type:'SETSHOWNOW',allMapPosts:allMapPosts})
              //     navigation.navigate("MapScreen")
              // }else{
              //     allMapPosts.splice(0, 0, post);
              //     Chatdispatcher({type:'SETSHOWNOW',allMapPosts:allMapPosts})
              //     navigation.navigate("MapScreen")
              // }
                 
            }
            const [sortBys,setSortBy] = useState(true)
              const [sortByString,setSortByString] = useState('Distance')
              async function setSortBys(a){
                if(a){
                  setSortBy(true)
                  setSortByString('Distance')
                }else{
                  setSortBy(false)
                  setSortByString('Time')
                }
           
              }

              async function sortNow(){
                if(isConnected){
                // alert('Sorting')
                setFinalDistance(sortedDistance)
                refRBsheettt.current.close()
                setOffsetWithin(2)
                setOffsetBeyond(2)
                setDataSourceWithin([])
                setDataSourceBeyond([])
                getDataWithinOnRefresh()
                getDataBeyondOnRefresh()
                
                // Chatdispatcher({type:"SETSORTBY",distance:sortedDistance,sortBy:sortByString,sortApplied:true})
              
                // setTimeout(() => {
                //   Chatdispatcher({type:'SETSORTCHANGED',sortApplied:false})
                // }, 1000);

              }else{
                Snackbar.show({
                  text: I18n.t('Check your internet'),
                  duration: Snackbar.LENGTH_LONG
                });
              }
              }

            async function deleteSpaark(i,type){
              if(global.type == 'within'){
                    if(token!=null){
                      await axios
                      .delete(GLOBAL.BASE_URL+`${dataSourceWithin[Number(global.postcurrent[0])].featureName}/post/${dataSourceWithin[Number(global.postcurrent[0])]._id}`, {
                        headers: {
                          Authorization:
                          token
                        },
                      })
                      .then(async (resp) => {
                        const newDataSourceWithin = dataSourceWithin.filter((item) => item._id !== dataSourceWithin[Number(global.postcurrent[0])]._id);
                        setDataSourceWithin([...newDataSourceWithin])
                        deleteMyPost.current.close();
                        Snackbar.show({
                          text: I18n.t('Spaark Deleted Succesfully'),
                          duration: Snackbar.LENGTH_LONG
                        });
                      });
                    }
              }else{
                if(token!=null){
                  await axios
                  .delete(GLOBAL.BASE_URL+`${dataSourceBeyond[Number(global.postcurrent[0])].featureName}/post/${dataSourceBeyond[Number(global.postcurrent[0])]._id}`, {
                    headers: {
                      Authorization:
                      token
                    },
                  })
                  .then(async (resp) => {
                    const newDataSourceBeyond = dataSourceBeyond.filter((item) => item._id !== dataSourceBeyond[Number(global.postcurrent[0])]._id);
                    setDataSourceBeyond([...newDataSourceBeyond])
                    deleteMyPost.current.close();
                    Snackbar.show({
                      text: I18n.t('Spaark Deleted Succesfully'),
                      duration: Snackbar.LENGTH_LONG
                    });
                  });
                }
              }
            }



              async function captureViewShot(post) {

                const imageUri = await viewShotRef.current.capture();

                await Share.share({
                  title: `${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
                  Connect to your local area wherever you go.`,
                  url: imageUri
                });
                // setExtraThings(true)
              }


                async function handleOutgoingCall (call,navigation,item){
                        var canposts = await canPost()
                      if(canposts){
                              navigation.navigate('OutGoingCallScreen',{aid:call,name:'Saikiran',profilePic:'https://wallpaperaccess.com/full/2213426.jpg'})
                      }else{
                        Login.current.open()
                      }

                }
                

           
                async function clickedChat(l) {
                  var canposts = await canPost()
                  var jid = await AsyncStorage.getItem('jid_main');
                  if(l.jid == jid){
                    alert('This is your Post')
                  }else{
                    if(canposts){
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
                          connection:[l.featureName],
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
                            connection:[l.featureName],
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

           
           
           
           
           



              function onCall(l) {
                if (String(userToken).length > 24) {
                  // navigation.navigate('ChatSpecificScreenFinal',{name:l.uservisibility.name,profilePic:l.uservisibility.profilePic,jid:l.jid_main})
                  // return (<LoginToAccessScreen></LoginToAccessScreen>)
                } else {
                  Login.current.open();
                }
              }

              async function 
              
              reportUser(post) {
                if (global.type == 'within') {
                  var post = dataSourceWithin[Number(global.postcurrent[0])]
                } else {
                  var post = dataSourceBeyond[Number(global.postcurrent[0])]
                }

                console.log(post)
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
                      GLOBAL.TOKEN._W
                    },
                  }
                ).then((resp) => {
                  showSnackReport(resp.data.message)
                }).catch((err) => {
                  console.log(err)
                  showSnackReport('You have already reported this content')
                })
                // showSnackReport('You have already reported this content')
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

              async function blockUser() {
                showSnackBlock()
              }

              function onLogin(phone) {
                console.log("phoness", phone)
                Login.current.close();
                navigation.navigate('VerifyOtpScreen', { phone: phone })
              }
              // var onEndReachedCalledDuringMomentum = true;
            //   const onEndReached = ({ distanceFromEnd }) => {
            //     console.log('distanceFromEnd',distanceFromEnd)
            //     if(!onEndReachedCalledDuringMomentum){
            //         alert('Called again')
            //         onEndReachedCalledDuringMomentum = true;
            //     }
            // }
              const renderFooterWithin = () => {
                return (
                  //Footer View with Load More button
                  <>
{
  showLoadMoreWithin?
                  <View style={styles.footer}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={getDataWithin}
                      //On Click of button calling getData function to load more data
                      style={styles.loadMoreBtn}>
                      <Text style={styles.btnText}>{I18n.t("Load More")}</Text>
                      {loading ? (
                        <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
                      ) : null}
                    </TouchableOpacity>
                  </View>
                    :<>
                    <View style={{justifyContent:'center',backgroundColor:'#f2f2f2'}}>
                    {/* <Text style={{textAlign:'center'}}>{I18n.t("No Spaarks within")}</Text> */}
                  </View>
                    </>
                    }

                  
                  </>
                );
              };

              const [showLoadMoreWithin,setLoadMoreWithin] = useState(true)
              const [showLoadMoreBeyond,setLoadMoreBeyond] = useState(true)
              const [showLoadMoreExplore,setLoadMoreExplore] = useState(true)

              async function clickAction(){
                // console.log(Userpreferences[1])
                getDataForPill(Userpreferences[1].category,Userpreferences[1].subCategory)
              }

              const renderPostCard = ({ item, index }) =>{
                return(
                  <PostCard item={item}
                  flatListWithin={flatListWithin}
                   index={index}
                    banners={banners}
                     navigation={navigation}
                     parentClick ={clickAction}
                  bookmarked={item.bookmarked}
                  filterContent={true}
                  pendingRatings={[]}
                  pendingWorks={[]}
                  showBanner={true}
                  />
                )
              }
              const renderFooterBeyond = () => {
                return (


<>
{
  showLoadMoreBeyond?
                  <View style={styles.footer}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={getDataBeyond}
                      //On Click of button calling getData function to load more data
                      style={styles.loadMoreBtn}>
                      <Text style={styles.btnText}>{I18n.t("Load More")}</Text>
                      {loading ? (
                        <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
                      ) : null}
                    </TouchableOpacity>
                  </View>
                    :<>
                    <View style={{justifyContent:'center',backgroundColor:'#f2f2f2'}}>
                    <Text style={{textAlign:'center'}}>No Spaarks beyond</Text>
                  </View>
                    </>
                    }

</>
                );
              };

              const renderFooterExplore = () => {
                return (


<>
{
  showLoadMoreExplore?
                  <View style={styles.footer}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={getDataExplore}
                      //On Click of button calling getData function to {I18n.t("Load More")} data
                      style={styles.loadMoreBtn}>
                      <Text style={styles.btnText}>{I18n.t("Load More")}</Text>
                      {loading ? (
                        <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
                      ) : null}
                    </TouchableOpacity>
                  </View>
                    :<>
                    <View style={{justifyContent:'center',backgroundColor:'#f2f2f2'}}>
                    <Text style={{textAlign:'center'}}>{I18n.t("No Spaarks to explore")}</Text>
                  </View>
                    </>
                    }

</>
                );
              };
              // const renderFooterExplore = () => {
              //   return (
              //     //Footer View with {I18n.t("Load More")} button
              //     <View style={styles.footer}>
              //       {/* {
              //       dataSourceBeyond.length>0? */}
              //       <TouchableOpacity
              //         activeOpacity={0.9}
              //         onPress={()=>getDataBeyond(offsetBeyond)}
              //         //On Click of button calling getData function to {I18n.t("Load More")} data
              //         style={styles.loadMoreBtn}>
              //         <Text style={styles.btnText}>{I18n.t("Load More")}</Text>
              //         {loading ? (
              //           <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              //         ) : null}
              //       </TouchableOpacity>
              //       {/* :<Text style={{textAlign:'center'}}>No Spaarks to Explore</Text>
              //       } */}
              //     </View>
              //   );
              // };


              
              async function openDots(i, type) {

                var userIdd = await AsyncStorage.getItem('userId');
                // alert(canposts)
                if(token!=null){
                  if(type == 'within'){
                    if(userIdd == dataSourceWithin[i].userId){
                      global.postcurrent[0] = String(i);
                      global.type = type;
                      deleteMyPost.current.open()
                    }else{
                      global.postcurrent[0] = String(i);
                      global.type = type;
                      console.log(global.postcurrent[0])
                      refRBSheet.current.open()
                    }
                  }else{
                    if(userIdd == dataSourceBeyond[i].userId){
                      global.postcurrent[0] = String(i);
                      global.type = type;
                      deleteMyPost.current.open()
                    }else{
                      global.postcurrent[0] = String(i);
                      global.type = type;
                      console.log(global.postcurrent[0])
                      refRBSheet.current.open()
                    }
                  }
                 
                    
                  
   
                }else{
                  Login.current.open()
                }

              
                
              }

              const showPendingWorks = (item) => {
                return (
                  <View>
                    <Dialog.Container>
                      <Dialog.Title>{item}</Dialog.Title>
                      <Dialog.Description>
                        Do you want to delete this account? You cannot undo this action.
                      </Dialog.Description>
                      <Dialog.Button label="Cancel" />
                      <Dialog.Button label="Delete" />
                    </Dialog.Container>
                  </View>
                );
              }

              const ItemViewBeyond = ({ item, index }) => {
                return (


                  indexes.includes(index) ?
                   <View style={{margin:0}}>
                 {
                   banners[index/4 - 1]?
                   <Image source={{ uri: banners[index/4 - 1] }} style={{ height: 170, width: Dimensions.get('window').width,resizeMode: 'contain' }}></Image>
                   :<></>
                 }
                  
                     
                  </View>:

                    item.featureName == "market" ? (
                      indexes.includes(index) ?
                      <Image source={{ uri: "https://static-content.spaarksweb.com/images/images/market/m2.png" }} style={{ height: 170, width: 360, margin: 10, resizeMode: 'contain' }}></Image> :
                      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 1.0, result: 'data-uri' }}>
              
                        <Card style={styles.eachCard}>
                          {
                            !extraThings &&
                            <Image source={require('../assets/icons/download.png')} style={{ height: 50, width: 400 }}></Image>
                          }
                          <View>

                          {
                            item.isProvider && item.reviews && item.reviews[0].posts.length - 1 > 1?
                            <View>
                              <Text style={{fontSize:14,padding:10,fontWeight:'300'}}>View <Text style={{fontWeight:'bold'}}>{item.isProvider && item.reviews && item.reviews[0].posts.length - 1}</Text> More spaarks 
                              {
                                item.subCategory?
                                <>
                                {" "}in <Text style={{fontWeight:'bold',color:'#6FA4E9'}} onPress={()=>navigation.navigate("SellerProfile", {
                                  userId: item.userId,
                                  post: item,
                                })}>{item.subCategory}</Text> 
                                </>
                                :  
<></>
                              }{" "}from {item.uservisibility.name}</Text>
                              <View
                              style={{
                                marginTop: 5,
                                marginLeft: 0,
                                marginRight: 0,
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                              }}
                            />
                            </View>
                            
                            :
                            <></>
                          }

                            





                            <View style={{ flexDirection: "row", marginBottom: 20 }}>
                              <View
                                style={{ flex: 3, paddingLeft: 20, paddingTop: 20 }}
                              >
                                <View style={{ flexDirection: "column" }}>
                                  <View style={{ flex: 2 }}>
                                    <Image
                                      source={{ uri: item.uservisibility.profilePic }}
                                      style={{
                                        height: 55,
                                        width: 55,
                                        paddingLeft: 20,
                                        borderRadius: 30,
                                      }}
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
                                  {item.uservisibility.name.substr(0, 15)}
                                </Text>
                                <Text style={{ marginTop: 5 }}>{moment(item.createdAt).fromNow()}</Text>
                                <View style={{ flexDirection: "row" }}>
                                  {item.isProvider == true ? (
                                    <>
                                      <View style={{ flex: 0 }}>
                                        <Text
                                          style={{
                                            marginTop: 5,
                                            fontSize: 15,
                                            fontWeight: "bold",
                                            color: "#6FA4E9",
                                          }}
                                        >

                                       
                                        </Text>
                                      </View>
                                      
                                    </>
                                  ) : (
                                    <View style={{ flexDirection: 'row' }}>
                                      {
                                        item.tags != undefined || item.tags.length > 0 ?
                                          item.tags.map((list, i) =>
                                            <Chip
                                              style={{
                                                alignSelf: 'flex-start',
                                                backgroundColor: list.color,
                                              }}
                                            >
                                              <Text
                                                style={{
                                                  color: "#fff",
                                                  marginTop: 0,
                                                  fontSize: 10,
                                                }}
                                              >
                                                {list.name}
                                              </Text>
                                            </Chip>
                                          ) : <></>

                                      }
                                    </View>

                                  )}
                                </View>
                              </View>
                              <View style={{ marginRight: 10 }}>
                                <TouchableOpacity
                                  onPress={() => {
                                    return openDots(index, 'beyond');
                                  }}
                                >
                                  <Image
                                    source={require("../assets/icons/dots.png")}
                                    style={{
                                      height: 23,
                                      width: 8,
                                      paddingLeft: 20,
                                      marginTop: 10,
                                    }}
                                  />
                                </TouchableOpacity>

                              </View>
                            </View>
                            {/* Profile Tag and content */}
                            <View
                              style={{
                                paddingLeft: 10,
                                marginBottom: 0,
                                flexDirection: "column",
                              }}
                            >
                              {item.isProvider == true ? (
                                <>
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate("SellerProfile", {
                                        userId: item.userId,
                                        post: item,
                                      })
                                    }
                                    style={{ backgroundColor: "#fff" }}
                                  >
                                       <View
                              style={{
                                marginTop: 5,
                                marginLeft: 0,
                                marginRight: 0,
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                              }}
                            />
                                   <View style={{ flex: 9,flexDirection:'row' }}>
                                      
                                      <View style={{flex:2,paddingTop:5}}>
                                      {
                                         item.tags != undefined ?
                                           item.tags.map((list, i) =>
                                             <Chip
                                               style={{
                                                 alignSelf: 'flex-start',
                                                 backgroundColor: list.color,
                                               }}
                                             >
                                               <Text
                                                 style={{
                                                   color: "#fff",
                                                   marginTop: 0,
                                                   fontSize: 10,
                                                 }}
                                               >
                                                 {list.name}
                                               </Text>
                                             </Chip>
                                           ) : <></>
 
                                       }
                                      </View>
                                      <View style={{flex:1,marginTop:8}}>
                                        <Text style={{color:'#f2f2f2',fontWeight:'bold'}}>|</Text>
                                      </View>
                                      <View style={{flex:2}}>

                                       <Text
                                         style={{ fontSize: 13,marginTop:0, color: "#6FA4E9" }}
                                       >
                                    <Image source={require('../assets/marketProfile.png')} style={{height:15,width:15,marginTop:10}}/> View Seller Profile
                                       </Text>
                                       </View>
                                       
                                     </View>
                                     <View
                              style={{
                                marginTop: 5,
                                marginLeft: 0,
                                marginRight: 0,
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                              }}
                            />
                                  </TouchableOpacity>
                                </>
                              ) : (
                                <Text></Text>
                              )}
                              <View style={{ flex: 2 }}>

                                <Paragraph style={{ fontSize: 15 }}>

                                  <View style={{ flex: 2 }}>
                                    <Hyperlink linkDefault={ true } linkStyle={{color:'#6FA4E9'}}>
                                    <Text style={{ fontSize: 15, paddingTop: 10 }} numberOfLines={5}>
                                      {item.content}
                                    </Text>
                                    </Hyperlink>
                                    {item.content.length > 100 ? (
                                      <TouchableOpacity
                                        onPress={() =>
                                          navigation.navigate("PostSpecificScreensFeed", {
                                            post: item,
                                            naviga:'Market'
                                          })
                                        }
                                        style={{ backgroundColor: "#fff" }}
                                      >
                                        <Text style={{ color: "#6FA4E9" }}>
                                          View more.
                          </Text>
                                      </TouchableOpacity>
                                    ) : (
                                      <></>
                                    )}
                                  </View>
                                </Paragraph>
                          <RNUrlPreview text={item.content}/>
                              </View>
                            </View>
                          </View>
                          {

item.photo.length > 0?

  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>

    {
      item.video.length>0?
      <FlatList
      data={[item.video, ...item.photo]}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, i }) => (
        <View style={{ marginRight: 10 }}>
          {
            String(item).substr(String(item).length - 3) == 'mp4'?

            <Video source={{uri: String(item)}}   // Can be a URL or a local file.
            ref={(ref) => {
              player = ref
            }}          
            paused={true}          
            controls={true}
            style={{height:480,width:Dimensions.get('window').width}}
            />
            :
            <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceBeyond[index].photos }) }}>
            <Image source={{ uri: item }} cache="force-cache" style={{
width:Dimensions.get('window').width,
              height: 480,
              resizeMode: "cover",
            }}></Image>
          </TouchableOpacity>
          }
          
        </View>
      )}
    />

    :
    <FlatList
    data={[...item.photo]}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    renderItem={({ item, i }) => (
      <View style={{ marginRight: 10 }}>
        {
          String(item).substr(String(item).length - 3) == 'mp4'?

          <Video source={{uri: String(item)}}   // Can be a URL or a local file.
          ref={(ref) => {
            player = ref
          }}          
          paused={true}          
          controls={true}
          style={{height:480,width:Dimensions.get('window').width}}
          />
          :
          <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceBeyond[index].photos }) }}>
          <Image source={{ uri: item }} cache="force-cache" style={{
            width:Dimensions.get('window').width,
            height: 480,
            resizeMode: "cover",
          }}></Image>
        </TouchableOpacity>
        }
        
      </View>
    )}
  />

    }
  


  </View>
  :item.video.length>0?
  <View style={{ marginRight: 10 }}>

    <Video source={{uri: item.video[0]}}   // Can be a URL or a local file.
    ref={(ref) => {
      player = ref
    }}          
    paused={true}          
    controls={true}
    style={{height:480,width:Dimensions.get('window').width}}
    />
    
</View>
:<></>

}
                          <View style={{ backgroundColor: "#fff", height: "auto" }}>
                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                              <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: item,
                                      naviga:'Market'
                                    })
                                    // navigation.navigate('ViewImages')
                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  <Text style={{ color: "#6FA4E9", paddingLeft: 10,fontSize:12 }}>
                                    {item.subposts.length} Comments
                                 </Text>
                                </TouchableOpacity>
                              </View>

                              <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: item,
                                      naviga:'All'
                                    })
                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  {
                                    item.viewedUsers.length > 1000 ?
                                      <Text style={{ color: "#6FA4E9", paddingLeft: 40,fontSize:12,alignItems:'flex-end' }}>{(item.viewedUsers.length / 1000).toFixed(1)}k Views</Text> :
                                      <Text style={{ color: "#6FA4E9", paddingLeft: 40,fontSize:12}}>{item.viewedUsers.length} Views</Text>
                                  }
                                </TouchableOpacity>
                              </View>

                              <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", { post: item })
                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  <Text style={{ color: "#6FA4E9", paddingLeft: 50,fontSize:12}}>{item.isProvider && item.reviews && item.reviews[0].reviews.length} Reviews</Text>
                                </TouchableOpacity>
                              </View>
                            </View>

                            <View
                              style={{
                                marginTop: 5,
                                marginLeft: 0,
                                marginRight: 0,
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                              }}
                            />

<View
                              style={{ flex: 0, flexDirection: "row", magin: 0 }}
                            >
                              {
                                item.uservisibility.phoneCall?
                                <TouchableOpacity onPress={() => { handleOutgoingCall(item.aid, navigation,item) }}>
                                <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.27_PM_ct6k3r.png' }}
                                  style={styles.chats}
                                ></Image>
                              </TouchableOpacity>
                              :
                              <TouchableOpacity onPress={() => { refRBSheets.current.open() }}>
                              <Image
                                source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.33_PM_zwwisk.png' }}
                                style={styles.chats}
                              ></Image>
                            </TouchableOpacity>
                              }
                              {
                                item.uservisibility.chat?
                                <TouchableOpacity onPress={() => clickedChat(item)}>
                                <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.22_PM_qyit1s.png' }}
                                  style={styles.chats}
                                ></Image>
                              </TouchableOpacity>
                              :
                              <TouchableOpacity onPress={() => refRBSheetss.current.open()}>
                              <Image
                                source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.39_PM_upsvxi.png' }}
                                style={styles.chats}
                              ></Image>
                              </TouchableOpacity>
                              }
                              
                              <View style={{ flexDirection: 'column' }}>
                              

{
  item.uservisibility.location?
  <>
  
{
  String(item.distance) != 'undefined'?
item.distance && item.distance.toFixed(2) < 1000 ?
    <>
      <Image
      source={{ uri: 'https://res.cloudinary.com/spaarks/image/upload/v1624444708/Screenshot_2021-06-23_at_4.06.45_PM_iddjxf.png' }}
      style={styles.chats} onPress={() =>
        selectedPostMap(item,'beyond')
      }
    ></Image>
    <Text style={{fontSize: 14,marginTop:10, color:'#6FA4E9' }}>{item.distance.toFixed(0)} m</Text> 
    </>:
    // item.distance && item.distance.toFixed(2) > 1000?
    <><Image
    source={{ uri: 'https://res.cloudinary.com/spaarks/image/upload/v1624444708/Screenshot_2021-06-23_at_4.06.45_PM_iddjxf.png' }}
    style={styles.chats} onPress={() =>
      selectedPostMap(item,'beyond')
    }
  ></Image>
    <Text style={{fontSize: 14,marginTop:10, color:'#6FA4E9' }}>{(item.distance / 1000).toFixed(1)} Km </Text>
    </>
    :<></>

}

</>
:
<>

</>
}

                                {/* item.uservisibility.location?
                                <TouchableOpacity
                                        onPress={() =>
                                          selectedPostMap(item,'beyond')
                                        }
                                        style={{ backgroundColor: "#fff" }}
                                      >
                                        <Image
                                          source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620143423/Screenshot_2021-05-04_at_9.20.06_PM_i7ruwc.png' }}
                                          style={styles.chats}
                                        ></Image>
                                        {
                                          item.distance.toFixed(2) < 1000 ?
                                            <Text style={{ position: 'absolute', top: 55, left: 24, fontSize: 12, fontWeight: 'bold' }}>{item.distance.toFixed(0)}m</Text> :
                                            <Text style={{ position: 'absolute', top: 55, left: 24, fontSize: 12, fontWeight: 'bold' }}>{(item.distance / 1000).toFixed(1)} Km</Text>
                                        }
                                      </TouchableOpacity>
                                      :
                                      <TouchableOpacity
                                      onPress={() =>
                                        refRBSheetss.current.open()
                                      }
                                      style={{ backgroundColor: "#fff" }}
                                    >
                                      <Image
                                        source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622132401/Screenshot_2021-05-27_at_9.49.43_PM_uww5sm.png' }}
                                        style={styles.chats}
                                      ></Image>
                                    
                                    </TouchableOpacity>
                              } */}
                                      

                              </View>
                              <TouchableOpacity onPress={() => WhatsAppShare(item)}>
                              <View style={{flexDirection:'row'}}>
                              <Image
                                source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png' }}
                                style={styles.chats}
                              ></Image>
                                                         {
                                  item.myshares.length>0 ?
                                    <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 12, fontWeight: 'bold',color:'#6FA4E9' }}>{item.myshares[0].shares}</Text> :
                                    <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 12, fontWeight: 'bold',color:'#6FA4E9' }}>0</Text>
                                }
                                </View>
                              </TouchableOpacity>
                              <View style={{ flexDirection: 'column' }}>
                              <TouchableOpacity
                                onPress={() => onLike(index, 'beyond')}
                              >
                                
                                {
                                  item.Iliked == true?
                                  <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.17_PM_gudcen.png' }}
                                  style={{ height: 25,width: 25,margin: 23,}}
                                ></Image>
                                  :
                                  <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044952/Screenshot_2021-05-26_at_9.31.09_PM_qsntda.png' }}
                                  style={{ height: 25,width: 25,margin: 23,}}
                                ></Image>
                                }
                             
                                    <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>{item.likes && item.likes.length}</Text> 
                              </TouchableOpacity>

                              </View>
                            </View>
                          </View>



                        </Card>

                      </ViewShot>
                    
                   
                   ) : item.featureName == "showtime" ? (
                      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 1.0, result: 'data-uri' }}>
                        <Card style={styles.eachCard}>
                          {
                            !extraThings &&
                            <Image source={require('../assets/icons/download.png')} style={{ height: 50, width: 400 }}></Image>
                          }
                          <View>
                            <View style={{ flexDirection: "row", marginBottom: 20 }}>
                              <View
                                style={{ flex: 3, paddingLeft: 20, paddingTop: 20 }}
                              >
                                <View style={{ flexDirection: "column" }}>
                                  <View style={{ flex: 2 }}>
                                    <Image
                                      cache="force-cache"
                                      source={{ uri: item.uservisibility.profilePic }}
                                      style={{
                                        height: 55,
                                        width: 55,
                                        paddingLeft: 20,
                                        borderRadius: 30,
                                      }}
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
                                  {item.uservisibility.name.substr(0, 15)}
                                </Text>
                                <Text style={{ marginTop: 5 }}>
                                  {moment(item.createdAt).fromNow()}
                                </Text>
                              </View>
                              <View style={{ marginRight: 10 }}>
                                <TouchableOpacity
                                  onPress={() => {
                                    return openDots(index, 'beyond');
                                  }}
                                >
                                  <Image
                                    cache="force-cache"
                                    source={require("../assets/icons/dots.png")}
                                    style={{
                                      height: 23,
                                      width: 8,
                                      paddingLeft: 20,
                                      marginTop: 10,
                                    }}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                            {/* Profile Tag and content */}
                            <View
                              style={{
                                paddingLeft: 10,
                                marginBottom: 0,
                                flexDirection: "column",
                              }}
                            >

                              <View style={{ flex: 2 }}>
                                <Paragraph style={{ fontSize: 15 }}>
                                <TouchableOpacity
                                        onPress={() =>
                                          navigation.navigate("PostSpecificScreensFeed", {
                                            post: item,
                                          })
                                        }
                                        style={{ backgroundColor: "#fff" }}
                                      >
                                  <View style={{ flex: 2 }}>
                                    <Hyperlink linkDefault={ true } linkStyle={{color:'#6FA4E9'}}>
                                    <Text style={{ fontSize: 15, paddingTop: 10 }} numberOfLines={5}>
                                      {item.content}
                                    </Text>
                                    </Hyperlink>
                                    {item.content.length > 100 ? (
                                      <Text style={{ color: "#6FA4E9" }}>
                                        View more.
                                      </Text>
                                    ) : (
                                      <></>
                                    )}
                                  </View>
                                  </TouchableOpacity>
                                </Paragraph>
                                  <RNUrlPreview text={item.content}/>
                              </View>
                            </View>
                          </View>
                          {

item.photo.length > 0?

  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>

    {
      item.video.length>0?
      <FlatList
      data={[item.video, ...item.photo]}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, i }) => (
        <View style={{ marginRight: 10 }}>
          {
            String(item).substr(String(item).length - 3) == 'mp4'?

            <Video source={{uri: String(item)}}   // Can be a URL or a local file.
            ref={(ref) => {
              player = ref
            }}          
            paused={true}          
            controls={true}
            style={{height:480,width:Dimensions.get('window').width}}
            />
            :
            <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceBeyond[index].photos }) }}>
            <Image source={{ uri: item }} cache="force-cache" style={{
    width:Dimensions.get('window').width,
              height: 480,
              resizeMode: "cover",
            }}></Image>
          </TouchableOpacity>
          }
          
        </View>
      )}
    />

    :
    <FlatList
    data={[...item.photo]}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    renderItem={({ item, i }) => (
      <View style={{ marginRight: 10 }}>
        {
          String(item).substr(String(item).length - 3) == 'mp4'?

          <Video source={{uri: String(item)}}   // Can be a URL or a local file.
          ref={(ref) => {
            player = ref
          }}          
          paused={true}          
          controls={true}
          style={{height:480,width:Dimensions.get('window').width}}
          />
          :
          <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceBeyond[index].photos }) }}>
          <Image source={{ uri: item }} cache="force-cache" style={{
width:Dimensions.get('window').width,
            height: 480,
            resizeMode: "cover",
          }}></Image>
        </TouchableOpacity>
        }
        
      </View>
    )}
  />

    }
  


  </View>
  :item.video.length>0?
  <View style={{ marginRight: 10 }}>

    <Video source={{uri: item.video[0]}}   // Can be a URL or a local file.
    ref={(ref) => {
      player = ref
    }}          
    paused={true}          
    controls={true}
    style={{height:480,width:Dimensions.get('window').width}}
    />
    
</View>
:<></>

}
                          <View style={{ backgroundColor: "#fff", height: "auto" }}>
                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                              <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: item,
                                      naviga:'All'
                                    })
                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  <Text style={{ color: "#6FA4E9", paddingLeft: 10,fontSize:12 }}>
                                    {item.subposts.length} Comments
                            </Text>
                                </TouchableOpacity>
                              </View>

                              <View style={{ flex: 0 }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: item,
                                      naviga:'All'
                                    })
                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  {
                                    item.viewedUsers.length > 1000 ?
                                      <Text style={{ color: '#6FA4E9' ,fontSize:12 }}>{(item.viewedUsers.length / 1000).toFixed(1)}k Views</Text> :
                                      <Text style={{ color: '#6FA4E9',fontSize:12  }}>{item.viewedUsers.length} Views</Text>
                                  }
                                </TouchableOpacity>
                              </View>
                            </View>

                            <View
                              style={{
                                marginTop: 5,
                                marginLeft: 0,
                                marginRight: 0,
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                              }}
                            />

<View
                              style={{ flex: 0, flexDirection: "row", magin: 0 }}
                            >
                              {
                                item.uservisibility.phoneCall?
                                <TouchableOpacity onPress={() => { handleOutgoingCall(item.aid, navigation,item) }}>
                                <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.27_PM_ct6k3r.png' }}
                                  style={styles.chats}
                                ></Image>
                              </TouchableOpacity>
                              :
                              <TouchableOpacity onPress={() => { refRBSheets.current.open() }}>
                              <Image
                                source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.33_PM_zwwisk.png' }}
                                style={styles.chats}
                              ></Image>
                            </TouchableOpacity>
                              }
                              {
                                item.uservisibility.chat?
                                <TouchableOpacity onPress={() => clickedChat(item)}>
                                <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.22_PM_qyit1s.png' }}
                                  style={styles.chats}
                                ></Image>
                              </TouchableOpacity>
                              :
                              <TouchableOpacity onPress={() => refRBSheetss.current.open()}>
                              <Image
                                source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.39_PM_upsvxi.png' }}
                                style={styles.chats}
                              ></Image>
                              </TouchableOpacity>
                              }
                              
                              <View style={{ flexDirection: 'column' }}>
                              {/* {
                                item.uservisibility.location?
                                <TouchableOpacity
                                        onPress={() =>
                                          selectedPostMap(item,'beyond')
                                        }
                                        style={{ backgroundColor: "#fff" }}
                                      >
                                        <Image
                                          source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620143423/Screenshot_2021-05-04_at_9.20.06_PM_i7ruwc.png' }}
                                          style={styles.chats}
                                        ></Image>
                                        {
                                          item.distance.toFixed(2) < 1000 ?
                                            <Text style={{ position: 'absolute', top: 55, left: 24, fontSize: 12, fontWeight: 'bold' }}>{item.distance.toFixed(0)}m</Text> :
                                            <Text style={{ position: 'absolute', top: 55, left: 24, fontSize: 12, fontWeight: 'bold' }}>{(item.distance / 1000).toFixed(1)} Km</Text>
                                        }
                                      </TouchableOpacity>
                                      :
                                      <TouchableOpacity
                                      onPress={() =>
                                        refRBSheetss.current.open()
                                      }
                                      style={{ backgroundColor: "#fff" }}
                                    >
                                      <Image
                                        source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622132401/Screenshot_2021-05-27_at_9.49.43_PM_uww5sm.png' }}
                                        style={styles.chats}
                                      ></Image>
                                      
                                    </TouchableOpacity>
                              } */}
                                                            

{
  item.uservisibility.location?
  <>
  
{
  String(item.distance) != 'undefined'?
item.distance && item.distance.toFixed(2) < 1000 ?
    <>
      <Image
      source={{ uri: 'https://res.cloudinary.com/spaarks/image/upload/v1624444708/Screenshot_2021-06-23_at_4.06.45_PM_iddjxf.png' }}
      style={styles.chats} onPress={() =>
        selectedPostMap(item,'beyond')
      }
    ></Image>
    <Text style={{fontSize: 14,marginTop:10, color:'#6FA4E9' }}>{item.distance.toFixed(0)} m</Text> 
    </>:
    // item.distance && item.distance.toFixed(2) > 1000?
    <><Image
    source={{ uri: 'https://res.cloudinary.com/spaarks/image/upload/v1624444708/Screenshot_2021-06-23_at_4.06.45_PM_iddjxf.png' }}
    style={styles.chats} onPress={() =>
      selectedPostMap(item,'beyond')
    }
  ></Image>
    <Text style={{fontSize: 14,marginTop:10, color:'#6FA4E9' }}>{(item.distance / 1000).toFixed(1)} Km </Text>
    </>
    :<></>

}

</>
:
<>

</>
}
                                      

                              </View>
                              <TouchableOpacity onPress={() => WhatsAppShare(item)}>
                              <View style={{flexDirection:'row'}}>
                              <Image
                                source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png' }}
                                style={styles.chats}
                              ></Image>
                                                         {
                                  item.myshares.length>0 ?
                                    <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 12, fontWeight: 'bold',color:'#6FA4E9' }}>{item.myshares[0].shares}</Text> :
                                    <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 12, fontWeight: 'bold',color:'#6FA4E9' }}>0</Text>
                                }
                                </View>
                              </TouchableOpacity>
                              <View style={{ flexDirection: 'column' }}>
                              <TouchableOpacity
                                onPress={() => onLike(index, 'beyond')}
                              >
                                
                                {
                                  item.Iliked == true?
                                  <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.17_PM_gudcen.png' }}
                                  style={{ height: 25,width: 25,margin: 23,}}
                                ></Image>
                                  :
                                  <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044952/Screenshot_2021-05-26_at_9.31.09_PM_qsntda.png' }}
                                  style={{ height: 25,width: 25,margin: 23,}}
                                ></Image>
                                }
                             
                                    <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>{item.likes.length}</Text> 
                              </TouchableOpacity>

                              </View>
                            </View>
                          </View>
                        </Card>
                      </ViewShot>
                    ) : item.featureName == "greet" ? (
                      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 1.0, result: 'data-uri' }}>
                        <Card style={styles.eachCard}>
                          {
                            !extraThings &&
                            <Image source={require('../assets/icons/download.png')} cache="force-cache" style={{ height: 50, width: 400 }}></Image>
                          }
                          <View>
                            <View style={{ flexDirection: "row", marginBottom: 20 }}>
                              <View
                                style={{ flex: 3, paddingLeft: 20, paddingTop: 20 }}
                              >
                                <View style={{ flexDirection: "column" }}>
                                  <View style={{ flex: 2 }}>
                                    <Image
                                      cache="force-cache"
                                      source={{ uri: item.uservisibility.profilePic }}
                                      style={{
                                        height: 55,
                                        width: 55,
                                        paddingLeft: 20,
                                        borderRadius: 30,
                                      }}
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
                                  {item.uservisibility.name.substr(0, 15)}
                                </Text>
                                <Text style={{ marginTop: 5 }}>
                                  {moment(item.createdAt).fromNow()}
                                </Text>
                              </View>
                              <View style={{ marginRight: 10 }}>
                                <TouchableOpacity
                                  onPress={() => {
                                    return openDots(index, 'beyond');
                                  }}
                                >
                                  <Image
                                    cache="force-cache"
                                    source={require("../assets/icons/dots.png")}
                                    style={{
                                      height: 23,
                                      width: 8,
                                      paddingLeft: 20,
                                      marginTop: 10,
                                    }}
                                  />
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
                                  <Hyperlink linkDefault={ true } linkStyle={{color:'#6FA4E9'}}>
                                  <Text numberOfLines={5}>
                                    {item.content}
                                  </Text>
                                  </Hyperlink>

                                </Paragraph>
                                          <RNUrlPreview text={item.content}/>
                                {item.content.length > 200 ? (
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate("PostSpecificScreensFeed", {
                                        post: item,
                                      })
                                    }
                                    style={{ backgroundColor: "#fff" }}
                                  >
                                    <Text style={{ color: "blue" }}>View more.</Text>
                                  </TouchableOpacity>
                                ) : (
                                  <Text></Text>
                                )}
                              </View>
                            </View>
                          </View>
                          {

item.photo.length > 0?

  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>

    {
      item.video.length>0?
      <FlatList
      data={[item.video, ...item.photo]}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, i }) => (
        <View style={{ marginRight: 10 }}>
          {
            String(item).substr(String(item).length - 3) == 'mp4'?

            <Video source={{uri: String(item)}}   // Can be a URL or a local file.
            ref={(ref) => {
              player = ref
            }}          
            paused={true}          
            controls={true}
            style={{height:480,width:Dimensions.get('window').width}}
            />
            :
            <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceBeyond[index].photos }) }}>
            <Image source={{ uri: item }} cache="force-cache" style={{
      width:Dimensions.get('window').width,
              height: 480,
              resizeMode: "cover",
            }}></Image>
          </TouchableOpacity>
          }
          
        </View>
      )}
    />

    :
    <FlatList
    data={[...item.photo]}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    renderItem={({ item, i }) => (
      <View style={{ marginRight: 10 }}>
        {
          String(item).substr(String(item).length - 3) == 'mp4'?

          <Video source={{uri: String(item)}}   // Can be a URL or a local file.
          ref={(ref) => {
            player = ref
          }}          
          paused={true}          
          controls={true}
          style={{height:480,width:Dimensions.get('window').width}}
          />
          :
          <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceBeyond[index].photos }) }}>
          <Image source={{ uri: item }} cache="force-cache" style={{
width:Dimensions.get('window').width,
            height: 480,
            resizeMode: "cover",
          }}></Image>
        </TouchableOpacity>
        }
        
      </View>
    )}
  />

    }
  


  </View>
  :item.video.length>0?
  <View style={{ marginRight: 10 }}>

    <Video source={{uri: item.video[0]}}   // Can be a URL or a local file.
    ref={(ref) => {
      player = ref
    }}          
    paused={true}          
    controls={true}
    style={{height:480,width:Dimensions.get('window').width}}
    />
    
</View>
:<></>

}
                          <View style={{ backgroundColor: "#fff", height: "auto" }}>
                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                              <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: item,
                                      naviga:'All'
                                    })
                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  <Text
                                    style={{
                                      color: "#6FA4E9",
                                      paddingLeft: 10,
                                      textAlign: "center",
                                    }}
                                  >
                                    {
                                      item.viewedUsers.length > 1000 ?
                                        <Text style={{ color: '#6FA4E9' }}>{(item.viewedUsers.length / 1000).toFixed(1)}k Views</Text> :
                                        <Text style={{ color: '#6FA4E9' }}>{item.viewedUsers.length} Views</Text>
                                    }
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                            <View
                              style={{
                                marginTop: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                                flex: 5,
                              }}
                            />
                            <View
                              style={{
                                flex: 0,
                                flexDirection: "row",
                                justifyContent: 'center',
                                magin: 0,
                              }}
                            >
                              <View style={{ flex: 0 }}>

                                {
                                  item.requested ?
                                    <TouchableOpacity
                                      onPress={() =>
                                        navigation.navigate("SendChatRequest", {
                                          name: item.uservisibility.name.substr(0, 15),
                                          profilePic: item.uservisibility.profilePic,
                                          jid: item.jid_main,
                                          post: item
                                        })
                                      }
                                    >
                                      <Image
                                        source={require("../assets/bottomCard/request_sent.png")}
                                        cache="force-cache"
                                        style={{
                                          height: 40,
                                          width: 40,
                                          margin: 5,
                                          marginLeft: 20
                                        }}
                                      ></Image>
                                      <Text style={{ marginBottom: 5, color: '#323F4B' }}>{I18n.t("Chat Request Sent")}</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity
                                      onPress={() =>
                                        navigation.navigate("SendChatRequest", {
                                          name: item.uservisibility.name.substr(0, 15),
                                          profilePic: item.uservisibility.profilePic,
                                          jid: item.jid_main,
                                          post: item
                                        })
                                      }
                                    >
                                      <Image
                                        source={require("../assets/bottomCard/request_chat.png")}
                                        cache="force-cache"
                                        style={{
                                          height: 40,
                                          width: 40,
                                          margin: 5,
                                          marginLeft: 20
                                        }}
                                      ></Image>
                                      <Text style={{ marginBottom: 5, color: '#323F4B' }}>{I18n.t("Request to Chat")}</Text>
                                    </TouchableOpacity>

                                }
                              </View>




                            </View>
                          </View>
                        </Card>
                      </ViewShot>
                    ) : (
                      <></>
                    )
                )
              }


              const ItemViewWithin = ({ item, index }) => {
                return (
                  indexes.includes(index) ?
              
                    index == 4 && pendingWorks.length>0?
                    <>
                    <Carousel
                                  ref={(c) => { _carousel = c; }}
                                  data={pendingWorks}
                                  renderItem={_renderItemPending}
                                  sliderWidth={400}
                                  itemWidth={400}
                                />
                    </>
                      :index == 8 && pendingRatings.length>0?
                    <>
                    <Carousel
                                  ref={(c) => { _carousel = c; }}
                                  data={pendingRatings}
                                  renderItem={_renderItemRating}
                                  sliderWidth={400}
                                  itemWidth={400}
                                />
                    </>

                  
                  :<View style={{margin:0}}>
                  <Image source={{ uri: banners[index] }} style={{ height: 170, width: Dimensions.get('window').width,resizeMode: 'contain' }}></Image>
                  
                  </View>
                   :


                    item.featureName == "market" ? (
                      indexes.includes(index) ?
                      <Image source={{ uri: "https://static-content.spaarksweb.com/images/images/market/m2.png" }} style={{ height: 170, width: 360, margin: 10, resizeMode: 'contain' }}></Image> :
                      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 1.0, result: 'data-uri' }}>
              
                        <Card style={styles.eachCard}>
                          {
                            !extraThings &&
                            <Image source={require('../assets/icons/download.png')} style={{ height: 50, width: 400 }}></Image>
                          }
                          <View>

                          {
                            item.isProvider && item.reviews && item.reviews[0].posts.length - 1 > 1?
                            <View>
                              <Text style={{fontSize:14,padding:10,fontWeight:'300'}}>View <Text style={{fontWeight:'bold'}}>{item.isProvider && item.reviews && item.reviews[0].posts.length - 1}</Text> More spaarks 
                              {
                                item.subCategory?
                                <>
                                {" "}in <Text style={{fontWeight:'bold',color:'#6FA4E9'}} onPress={()=>navigation.navigate("SellerProfile", {
                                  userId: item.userId,
                                  post: item,
                                })}>{item.subCategory}</Text> 
                                </>
                                :  
<></>
                              }{" "}from {item.uservisibility.name}</Text>
                              <View
                              style={{
                                marginTop: 5,
                                marginLeft: 0,
                                marginRight: 0,
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                              }}
                            />
                            </View>
                            
                            :
                            <></>
                          }
                            <View style={{ flexDirection: "row", marginBottom: 20 }}>
                              <View
                                style={{ flex: 3, paddingLeft: 20, paddingTop: 20 }}
                              >
                                <View style={{ flexDirection: "column" }}>
                                  <View style={{ flex: 2 }}>
                                    <Image
                                      source={{ uri: item.uservisibility.profilePic }}
                                      style={{
                                        height: 55,
                                        width: 55,
                                        paddingLeft: 20,
                                        borderRadius: 30,
                                      }}
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
                                  {item.uservisibility.name.substr(0, 15)}
                                </Text>
                                <Text style={{ marginTop: 5 }}>{moment(item.createdAt).fromNow()}</Text>
                                <View style={{ flexDirection: "row" }}>
                                  {item.isProvider == true ? (
                                    <>
                                      <View style={{ flex: 0 }}>
                                        <Text
                                          style={{
                                            marginTop: 5,
                                            fontSize: 15,
                                            fontWeight: "bold",
                                            color: "#6FA4E9",
                                          }}
                                        >

                                        </Text>
                                      </View>
                                      <View style={{ flex: 8,flexDirection:'row' }}>
                                        {/* <Star score={item.reviews && item.reviews[0].rating} style={{width: 400,
                                          height: 90,
                                          marginBottom: 20,}} /> */}
                                          <Text
                                          style={{
                                            marginTop: 5,
                                            fontSize: 10,
                                            fontWeight: "300",
                                            color: "#6FA4E9",
                                          }}
                                        >
                                          ({item.reviews && item.reviews[0].count})
                                        </Text>
                                      </View>
                                    </>
                                  ) : (
                                    <View style={{ flexDirection: 'row' }}>
                                      {
                                        item.tags != undefined || item.tags.length > 0 ?
                                          item.tags.map((list, i) =>
                                            <Chip
                                              style={{
                                                alignSelf: 'flex-start',
                                                backgroundColor: list.color,
                                              }}
                                            >
                                              <Text
                                                style={{
                                                  color: "#fff",
                                                  marginTop: 0,
                                                  fontSize: 10,
                                                }}
                                              >
                                                {list.name}
                                              </Text>
                                            </Chip>
                                          ) : <></>

                                      }
                                    </View>

                                  )}
                                </View>
                              </View>
                              <View style={{ marginRight: 10 }}>
                                <TouchableOpacity
                                  onPress={() => {
                                    return openDots(index, 'within');
                                  }}
                                >
                                  <Image
                                    source={require("../assets/icons/dots.png")}
                                    style={{
                                      height: 23,
                                      width: 8,
                                      paddingLeft: 20,
                                      marginTop: 10,
                                    }}
                                  />
                                </TouchableOpacity>

                              </View>
                            </View>
                            {/* Profile Tag and content */}
                            <View
                              style={{
                                paddingLeft: 10,
                                marginBottom: 0,
                                flexDirection: "column",
                              }}
                            >
                              {item.isProvider == true ? (
                                <>
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate("SellerProfile", {
                                        userId: item.userId,
                                        post: item,
                                      })
                                    }
                                    style={{ backgroundColor: "#fff" }}
                                  >
                                       <View
                              style={{
                                marginTop: 5,
                                marginLeft: 0,
                                marginRight: 0,
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                              }}
                            />
                                   <View style={{ flex: 9,flexDirection:'row' }}>
                                      
                                      <View style={{flex:2,paddingTop:5}}>
                                      {
                                         item.tags != undefined ?
                                           item.tags.map((list, i) =>
                                             <Chip
                                               style={{
                                                 alignSelf: 'flex-start',
                                                 backgroundColor: list.color,
                                               }}
                                             >
                                               <Text
                                                 style={{
                                                   color: "#fff",
                                                   marginTop: 0,
                                                   fontSize: 10,
                                                 }}
                                               >
                                                 {list.name}
                                               </Text>
                                             </Chip>
                                           ) : <></>
 
                                       }
                                      </View>
                                      <View style={{flex:1,marginTop:8}}>
                                        <Text style={{color:'#f2f2f2',fontWeight:'bold'}}>|</Text>
                                      </View>
                                      <View style={{flex:2}}>

                                       <Text
                                         style={{ fontSize: 13,marginTop:0, color: "#6FA4E9" }}
                                       >
                                    <Image source={require('../assets/marketProfile.png')} style={{height:15,width:15,marginTop:10}}/> View Seller Profile
                                       </Text>
                                       </View>
                                       
                                     </View>
                                     <View
                              style={{
                                marginTop: 5,
                                marginLeft: 0,
                                marginRight: 0,
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                              }}
                            />
                                  </TouchableOpacity>
                                </>
                              ) : (
                                <Text></Text>
                              )}
                              <View style={{ flex: 2 }}>

                                <Paragraph style={{ fontSize: 15 }}>

                                  <View style={{ flex: 2 }}>
                                    <Hyperlink linkDefault={ true } linkStyle={{color:'#6FA4E9'}}>
                                    <Text style={{ fontSize: 15, paddingTop: 10 }} numberOfLines={5}>
                                      {item.content}
                                    </Text>
                                    </Hyperlink>
                                    {item.content.length > 100 ? (
                                      <TouchableOpacity
                                        onPress={() =>
                                          navigation.navigate("PostSpecificScreensFeed", {
                                            post: item,
                                            naviga:'Market'
                                          })
                                        }
                                        style={{ backgroundColor: "#fff" }}
                                      >
                                        <Text style={{ color: "#6FA4E9" }}>
                                          View more.
                          </Text>
                                      </TouchableOpacity>
                                    ) : (
                                      <></>
                                    )}
                                  </View>
                                </Paragraph>
                          <RNUrlPreview text={item.content}/>
                              </View>
                            </View>
                          </View>
                          {

item.photo.length > 0?

  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>

    {
      item.video.length>0?
      <FlatList
      data={[item.video, ...item.photo]}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, i }) => (
        <View style={{ marginRight: 10 }}>
          {
            String(item).substr(String(item).length - 3) == 'mp4'?

            <Video source={{uri: String(item)}}   // Can be a URL or a local file.
            ref={(ref) => {
              player = ref
            }}          
            paused={true}          
            controls={true}
            style={{height:480,width:Dimensions.get('window').width}}
            />
            :
            <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceWithin[index].photos }) }}>
            <Image source={{ uri: item }} cache="force-cache" style={{
width:Dimensions.get('window').width,
              height: 480,
              resizeMode: "cover",
            }}></Image>
          </TouchableOpacity>
          }
          
        </View>
      )}
    />

    :
    <FlatList
    data={[...item.photo]}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    renderItem={({ item, i }) => (
      <View style={{ marginRight: 10 }}>
        {
          String(item).substr(String(item).length - 3) == 'mp4'?

          <Video source={{uri: String(item)}}   // Can be a URL or a local file.
          ref={(ref) => {
            player = ref
          }}          
          paused={true}          
          controls={true}
          style={{height:480,width:Dimensions.get('window').width}}
          />
          :
          <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceWithin[index].photos }) }}>
          <Image source={{ uri: item }} cache="force-cache" style={{
 width:Dimensions.get('window').width,
            height: 480,
            resizeMode: "cover",
          }}></Image>
        </TouchableOpacity>
        }
        
      </View>
    )}
  />

    }
  


  </View>
  :item.video.length>0?
  <View style={{ marginRight: 10 }}>

    <Video source={{uri: item.video[0]}}   // Can be a URL or a local file.
    ref={(ref) => {
      player = ref
    }}          
    paused={true}          
    controls={true}
    style={{height:480,width:Dimensions.get('window').width}}
    />
    
</View>
:<></>

}
                          <View style={{ backgroundColor: "#fff", height: "auto" }}>
                          <View style={{ flexDirection: "row", marginTop: 20 }}>
                              <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: item,
                                      naviga:'Market'
                                    })
                                    // navigation.navigate('ViewImages')
                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  <Text style={{ color: "#6FA4E9", paddingLeft: 10,fontSize:12 }}>
                                    {item.subposts.length} Comments
                                 </Text>
                                </TouchableOpacity>
                              </View>

                              <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: item,
                                      naviga:'All'
                                    })
                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  {
                                    item.viewedUsers.length > 1000 ?
                                      <Text style={{ color: "#6FA4E9", paddingLeft: 40,fontSize:12,alignItems:'flex-end' }}>{(item.viewedUsers.length / 1000).toFixed(1)}k Views</Text> :
                                      <Text style={{ color: "#6FA4E9", paddingLeft: 40,fontSize:12}}>{item.viewedUsers.length} Views</Text>
                                  }
                                </TouchableOpacity>
                              </View>

                              <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", { post: item })
                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  <Text style={{ color: "#6FA4E9", paddingLeft: 50,fontSize:12}}>{item.isProvider && item.reviews && item.reviews[0].reviews.length} Reviews</Text>
                                </TouchableOpacity>
                              </View>
                            </View>

                            <View
                              style={{
                                marginTop: 5,
                                marginLeft: 0,
                                marginRight: 0,
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                              }}
                            />

                            <View
                              style={{ flex: 0, flexDirection: "row", magin: 0 }}
                            >
                              {
                                item.uservisibility.phoneCall?
                                <TouchableOpacity onPress={() => { handleOutgoingCall(item.aid, navigation,item) }}>
                                <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.27_PM_ct6k3r.png' }}
                                  style={styles.chats}
                                ></Image>
                              </TouchableOpacity>
                              :
                              <TouchableOpacity onPress={() => { refRBSheets.current.open() }}>
                              <Image
                                source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.33_PM_zwwisk.png' }}
                                style={styles.chats}
                              ></Image>
                            </TouchableOpacity>
                              }
                              {
                                item.uservisibility.chat?
                                <TouchableOpacity onPress={() => clickedChat(item)}>
                                <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.22_PM_qyit1s.png' }}
                                  style={styles.chats}
                                ></Image>
                              </TouchableOpacity>
                              :
                              <TouchableOpacity onPress={() => refRBSheetss.current.open()}>
                              <Image
                                source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.39_PM_upsvxi.png' }}
                                style={styles.chats}
                              ></Image>
                              </TouchableOpacity>
                              }
                              
                              <View style={{ flexDirection: 'column' }}>
                              {/* {
                                item.uservisibility.location?
                                <TouchableOpacity
                                        onPress={() =>
                                          selectedPostMap(item,'within')
                                        }
                                        style={{ backgroundColor: "#fff" }}
                                      >
                                        <Image
                                          source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620143423/Screenshot_2021-05-04_at_9.20.06_PM_i7ruwc.png' }}
                                          style={styles.chats}
                                        ></Image>
                                        {
                                          item.distance.toFixed(2) < 1000 ?
                                            <Text style={{ position: 'absolute', top: 55, left: 24, fontSize: 12, fontWeight: 'bold' }}>{item.distance.toFixed(0)}m</Text> :
                                            <Text style={{ position: 'absolute', top: 55, left: 24, fontSize: 12, fontWeight: 'bold' }}>{(item.distance / 1000).toFixed(1)} Km</Text>
                                        }
                                      </TouchableOpacity>
                                      :
                                      <TouchableOpacity
                                      onPress={() =>
                                        refRBSheetss.current.open()
                                      }
                                      style={{ backgroundColor: "#fff" }}
                                    >
                                      <Image
                                        source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622132401/Screenshot_2021-05-27_at_9.49.43_PM_uww5sm.png' }}
                                        style={styles.chats}
                                      ></Image>
                                      
                                    </TouchableOpacity>
                              }
                                       */}

                                                                     

{
  item.uservisibility.location?
  <>
  
{
  String(item.distance) != 'undefined'?
item.distance && item.distance.toFixed(2) < 1000 ?
    <>
      <Image
      source={{ uri: 'https://res.cloudinary.com/spaarks/image/upload/v1624444708/Screenshot_2021-06-23_at_4.06.45_PM_iddjxf.png' }}
      style={styles.chats} onPress={() =>
        selectedPostMap(item,'within')
      }
    ></Image>
    <Text style={{fontSize: 14,marginTop:10, color:'#6FA4E9' }}>{item.distance.toFixed(0)} m</Text> 
    </>:
    // item.distance && item.distance.toFixed(2) > 1000?
    <><Image
    source={{ uri: 'https://res.cloudinary.com/spaarks/image/upload/v1624444708/Screenshot_2021-06-23_at_4.06.45_PM_iddjxf.png' }}
    style={styles.chats} onPress={() =>
      selectedPostMap(item,'within')
    }
  ></Image>
    <Text style={{fontSize: 14,marginTop:10, color:'#6FA4E9' }}>{(item.distance / 1000).toFixed(1)} Km </Text>
    </>
    :<></>

}

</>
:
<>

</>
}

                              </View>
                              <TouchableOpacity onPress={() => WhatsAppShare(item)}>
                              <View style={{flexDirection:'row'}}>
                              <Image
                                source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png' }}
                                style={styles.chats}
                              ></Image>
                                                         {
                                  item.myshares.length>0 ?
                                    <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 12, fontWeight: 'bold',color:'#6FA4E9' }}>{item.myshares[0].shares}</Text> :
                                    <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 12, fontWeight: 'bold',color:'#6FA4E9' }}>0</Text>
                                }
                                </View>
                              </TouchableOpacity>
                              <View style={{ flexDirection: 'column' }}>
                              <TouchableOpacity
                                onPress={() => onLike(index, 'within')}
                              >
                                
                                {
                                  item.Iliked == true?
                                  <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.17_PM_gudcen.png' }}
                                  style={{ height: 25,width: 25,margin: 23,}}
                                ></Image>
                                  :
                                  <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044952/Screenshot_2021-05-26_at_9.31.09_PM_qsntda.png' }}
                                  style={{ height: 25,width: 25,margin: 23,}}
                                ></Image>
                                }
                             
                                    <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>{item.likes.length}</Text> 
                              </TouchableOpacity>

                              </View>
                            </View>
                          </View>



                        </Card>

                      </ViewShot>
                    
                   ) : item.featureName == "showtime" ? (
                      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 1.0, result: 'data-uri' }}>
                        <Card style={styles.eachCard}>
                          {
                            !extraThings &&
                            <Image source={require('../assets/icons/download.png')} style={{ height: 50, width: 400 }}></Image>
                          }
                          <View>
                            <View style={{ flexDirection: "row", marginBottom: 20 }}>
                              <View
                                style={{ flex: 3, paddingLeft: 20, paddingTop: 20 }}
                              >
                                <View style={{ flexDirection: "column" }}>
                                  <View style={{ flex: 2 }}>
                                    <Image
                                      cache="force-cache"
                                      source={{ uri: item.uservisibility.profilePic }}
                                      style={{
                                        height: 55,
                                        width: 55,
                                        paddingLeft: 20,
                                        borderRadius: 30,
                                      }}
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
                                  {item.uservisibility.name.substr(0, 15)}
                                </Text>
                                <Text style={{ marginTop: 5 }}>
                                  {moment(item.createdAt).fromNow()}
                                </Text>
                              </View>
                              <View style={{ marginRight: 10 }}>
                                <TouchableOpacity
                                  onPress={() => {
                                    return openDots(index, 'within');
                                  }}
                                >
                                  <Image
                                    cache="force-cache"
                                    source={require("../assets/icons/dots.png")}
                                    style={{
                                      height: 23,
                                      width: 8,
                                      paddingLeft: 20,
                                      marginTop: 10,
                                    }}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                            {/* Profile Tag and content */}
                            <View
                              style={{
                                paddingLeft: 10,
                                marginBottom: 0,
                                flexDirection: "column",
                              }}
                            >

                              <View style={{ flex: 2 }}>
                                <Paragraph style={{ fontSize: 15 }}>
                                
                                  <View style={{ flex: 2 }}>
                                    <Hyperlink linkDefault={ true } linkStyle={{color:'#6FA4E9'}}>
                                    <Text style={{ fontSize: 15, paddingTop: 10 }} numberOfLines={5}>
                                      {item.content}
                                    </Text>
                                    </Hyperlink>
                                    {item.content.length > 100 ? (
                                      <TouchableOpacity
                                      onPress={() =>
                                        navigation.navigate("PostSpecificScreensFeed", {
                                          post: item,
                                        })
                                      }
                                      style={{ backgroundColor: "#fff" }}
                                    >
                                      <Text style={{ color: "#6FA4E9" }}>
                                        View more.
                                      </Text>
                                                </TouchableOpacity>
                                    ) : (
                                      <></>
                                    )}
                                  </View>
                        
                                </Paragraph>
                                                <RNUrlPreview text={item.content}/>
                              </View>
                            </View>
                          </View>
                          {

item.photo.length > 0?

  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>

    {
      item.video.length>0?
      <FlatList
      data={[item.video, ...item.photo]}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, i }) => (
        <View style={{ marginRight: 10 }}>
          {
            String(item).substr(String(item).length - 3) == 'mp4'?

            <Video source={{uri: String(item)}}   // Can be a URL or a local file.
            ref={(ref) => {
              player = ref
            }}          
            paused={true}          
            controls={true}
            style={{height:480,width:Dimensions.get('window').width}}
            />
            :
            <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceWithin[index].photos }) }}>
            <Image source={{ uri: item }} cache="force-cache" style={{
  width:Dimensions.get('window').width,
              height: 480,
              resizeMode: "cover",
            }}></Image>
          </TouchableOpacity>
          }
          
        </View>
      )}
    />

    :
    <FlatList
    data={[...item.photo]}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    renderItem={({ item, i }) => (
      <View style={{ marginRight: 10 }}>
        {
          String(item).substr(String(item).length - 3) == 'mp4'?

          <Video source={{uri: String(item)}}   // Can be a URL or a local file.
          ref={(ref) => {
            player = ref
          }}          
          paused={true}          
          controls={true}
          style={{height:480,width:Dimensions.get('window').width}}
          />
          :
          <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceWithin[index].photos }) }}>
          <Image source={{ uri: item }} cache="force-cache" style={{
       width:Dimensions.get('window').width,
            height: 480,
            resizeMode: "cover",
          }}></Image>
        </TouchableOpacity>
        }
        
      </View>
    )}
  />

    }
  


  </View>
  :item.video.length>0?
  <View style={{ marginRight: 10 }}>

    <Video source={{uri: item.video[0]}}   // Can be a URL or a local file.
    ref={(ref) => {
      player = ref
    }}          
    paused={true}          
    controls={true}
    style={{height:480,width:Dimensions.get('window').width}}
    />
    
</View>
:<></>

}
                          <View style={{ backgroundColor: "#fff", height: "auto" }}>
                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                              <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: item,
                                      naviga:'All'
                                    })
                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  <Text style={{ color: "#6FA4E9", paddingLeft: 10 }}>
                                    {item.subposts.length} Comments
                            </Text>
                                </TouchableOpacity>
                              </View>

                              <View style={{ flex: 0 }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: item,
                                      naviga:'All'
                                    })
                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  {
                                    item.viewedUsers.length > 1000 ?
                                      <Text style={{ color: '#6FA4E9' }}>{(item.viewedUsers.length / 1000).toFixed(1)}k Views</Text> :
                                      <Text style={{ color: '#6FA4E9' }}>{item.viewedUsers.length} Views</Text>
                                  }
                                </TouchableOpacity>
                              </View>
                            </View>

                            <View
                              style={{
                                marginTop: 5,
                                marginLeft: 0,
                                marginRight: 0,
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                              }}
                            />
                             <View
                              style={{ flex: 0, flexDirection: "row", magin: 0 }}
                            >
                              {
                                item.uservisibility.phoneCall?
                                <TouchableOpacity onPress={() => { handleOutgoingCall(item.aid, navigation,item) }}>
                                <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.27_PM_ct6k3r.png' }}
                                  style={styles.chats}
                                ></Image>
                              </TouchableOpacity>
                              :
                              <TouchableOpacity onPress={() => { refRBSheets.current.open() }}>
                              <Image
                                source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.33_PM_zwwisk.png' }}
                                style={styles.chats}
                              ></Image>
                            </TouchableOpacity>
                              }
                              {
                                item.uservisibility.chat?
                                <TouchableOpacity onPress={() => clickedChat(item)}>
                                <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.22_PM_qyit1s.png' }}
                                  style={styles.chats}
                                ></Image>
                              </TouchableOpacity>
                              :
                              <TouchableOpacity onPress={() => refRBSheetss.current.open()}>
                              <Image
                                source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.39_PM_upsvxi.png' }}
                                style={styles.chats}
                              ></Image>
                              </TouchableOpacity>
                              }
                              
                              <View style={{ flexDirection: 'column' }}>
                              {/* {
                                item.uservisibility.location?
                                <TouchableOpacity
                                        onPress={() =>
                                          selectedPostMap(item,'within')
                                        }
                                        style={{ backgroundColor: "#fff" }}
                                      >
                                        <Image
                                          source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620143423/Screenshot_2021-05-04_at_9.20.06_PM_i7ruwc.png' }}
                                          style={styles.chats}
                                        ></Image>
                                        {
                                          item.distance.toFixed(2) < 1000 ?
                                            <Text style={{ position: 'absolute', top: 55, left: 24, fontSize: 12, fontWeight: 'bold' }}>{item.distance.toFixed(0)}m</Text> :
                                            <Text style={{ position: 'absolute', top: 55, left: 24, fontSize: 12, fontWeight: 'bold' }}>{(item.distance / 1000).toFixed(1)} Km</Text>
                                        }
                                      </TouchableOpacity>
                                      :
                                      <TouchableOpacity
                                      onPress={() =>
                                        refRBSheetss.current.open()
                                      }
                                      style={{ backgroundColor: "#fff" }}
                                    >
                                      <Image
                                        source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622132401/Screenshot_2021-05-27_at_9.49.43_PM_uww5sm.png' }}
                                        style={styles.chats}
                                      ></Image>
                                      
                                    </TouchableOpacity>
                              } */}

                                                            

{
  item.uservisibility.location?
  <>
  
{
  String(item.distance) != 'undefined'?
item.distance && item.distance.toFixed(2) < 1000 ?
    <>
      <Image
      source={{ uri: 'https://res.cloudinary.com/spaarks/image/upload/v1624444708/Screenshot_2021-06-23_at_4.06.45_PM_iddjxf.png' }}
      style={styles.chats} onPress={() =>
        selectedPostMap(item,'within')
      }
    ></Image>
    <Text style={{fontSize: 14,marginTop:10, color:'#6FA4E9' }}>{item.distance.toFixed(0)} m</Text> 
    </>:
    // item.distance && item.distance.toFixed(2) > 1000?
    <><Image
    source={{ uri: 'https://res.cloudinary.com/spaarks/image/upload/v1624444708/Screenshot_2021-06-23_at_4.06.45_PM_iddjxf.png' }}
    style={styles.chats} onPress={() =>
      selectedPostMap(item,'within')
    }
  ></Image>
    <Text style={{fontSize: 14,marginTop:10, color:'#6FA4E9' }}>{(item.distance / 1000).toFixed(1)} Km </Text>
    </>
    :<></>

}

</>
:
<>

</>
}
                                      

                              </View>
                              <TouchableOpacity onPress={() => WhatsAppShare(item)}>
                              <View style={{flexDirection:'row'}}>
                              <Image
                                source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png' }}
                                style={styles.chats}
                              ></Image>
                                                         {
                                  item.myshares.length>0 ?
                                    <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 12, fontWeight: 'bold',color:'#6FA4E9' }}>{item.myshares[0].shares}</Text> :
                                    <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 12, fontWeight: 'bold',color:'#6FA4E9' }}>0</Text>
                                }
                                </View>
                              </TouchableOpacity>
                              <View style={{ flexDirection: 'column' }}>
                              <TouchableOpacity
                                onPress={() => onLike(index, 'within')}
                              >
                                
                                {
                                  item.Iliked == true?
                                  <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.17_PM_gudcen.png' }}
                                  style={{ height: 25,width: 25,margin: 23,}}
                                ></Image>
                                  :
                                  <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044952/Screenshot_2021-05-26_at_9.31.09_PM_qsntda.png' }}
                                  style={{ height: 25,width: 25,margin: 23,}}
                                ></Image>
                                }
                             
                                    <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 10, fontWeight: 'bold',color:'#6FA4E9' }}>{item.likes.length}</Text> 
                              </TouchableOpacity>

                              </View>
                            </View>
                            
                          </View>
                                </Card>
                              </ViewShot>
                    ) : item.featureName == "greet" ? (
                      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 1.0, result: 'data-uri' }}>
                        <Card style={styles.eachCard}>
                          {
                            !extraThings &&
                            <Image source={require('../assets/icons/download.png')} cache="force-cache" style={{ height: 50, width: 400 }}></Image>
                          }
                          <View>
                            <View style={{ flexDirection: "row", marginBottom: 20 }}>
                              <View
                                style={{ flex: 3, paddingLeft: 20, paddingTop: 20 }}
                              >
                                <View style={{ flexDirection: "column" }}>
                                  <View style={{ flex: 2 }}>
                                    <Image
                                      cache="force-cache"
                                      source={{ uri: item.uservisibility.profilePic }}
                                      style={{
                                        height: 55,
                                        width: 55,
                                        paddingLeft: 20,
                                        borderRadius: 30,
                                      }}
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
                                  {item.uservisibility.name.substr(0, 15)}
                                </Text>
                                <Text style={{ marginTop: 5 }}>
                                  {moment(item.createdAt).fromNow()}
                                </Text>
                              </View>
                              <View style={{ marginRight: 10 }}>
                                <TouchableOpacity
                                  onPress={() => {
                                    return openDots(index, 'within');
                                  }}
                                >
                                  <Image
                                    cache="force-cache"
                                    source={require("../assets/icons/dots.png")}
                                    style={{
                                      height: 23,
                                      width: 8,
                                      paddingLeft: 20,
                                      marginTop: 10,
                                    }}
                                  />
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
                                  <Hyperlink linkDefault={ true } linkStyle={{color:'#6FA4E9'}}>
                                  <Text numberOfLines={5}>
                                    {item.content}
                                  </Text>
                            </Hyperlink>
                                </Paragraph>
                                                <RNUrlPreview text={item.content}/>
                                {item.content.length > 200 ? (
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate("PostSpecificScreensFeed", {
                                        post: item,
                                      })
                                    }
                                    style={{ backgroundColor: "#fff" }}
                                  >
                                    <Text style={{ color: "blue" }}>View more.</Text>
                                  </TouchableOpacity>
                                ) : (
                                  <Text></Text>
                                )}
                              </View>
                            </View>
                          </View>
                          {

item.photo.length > 0?

  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>

    {
      item.video.length>0?
      <FlatList
      data={[item.video, ...item.photo]}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, i }) => (
        <View style={{ marginRight: 10 }}>
          {
            String(item).substr(String(item).length - 3) == 'mp4'?

            <Video source={{uri: String(item)}}   // Can be a URL or a local file.
            ref={(ref) => {
              player = ref
            }}          
            paused={true}          
            controls={true}
            style={{height:480,width:Dimensions.get('window').width}}
            />
            :
            <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceWithin[index].photos }) }}>
            <Image source={{ uri: item }} cache="force-cache" style={{
             width:Dimensions.get('window').width,
              height: 480,
              resizeMode: "cover",
            }}></Image>
          </TouchableOpacity>
          }
          
        </View>
      )}
    />

    :
    <FlatList
    data={[...item.photo]}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    renderItem={({ item, i }) => (
      <View style={{ marginRight: 10 }}>
        {
          String(item).substr(String(item).length - 3) == 'mp4'?

          <Video source={{uri: String(item)}}   // Can be a URL or a local file.
          ref={(ref) => {
            player = ref
          }}          
          paused={true}          
          controls={true}
          style={{height:480,width:Dimensions.get('window').width}}
          />
          :
          <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceWithin[index].photos }) }}>
          <Image source={{ uri: item }} cache="force-cache" style={{
           width:Dimensions.get('window').width,
            height: 480,
            resizeMode: "cover",
          }}></Image>
        </TouchableOpacity>
        }
        
      </View>
    )}
  />

    }
  


  </View>
  :item.video.length>0?
  <View style={{ marginRight: 10 }}>

    <Video source={{uri: item.video[0]}}   // Can be a URL or a local file.
    ref={(ref) => {
      player = ref
    }}          
    paused={true}          
    controls={true}
    style={{height:480,width:Dimensions.get('window').width}}
    />
    
</View>
:<></>

}
                          <View style={{ backgroundColor: "#fff", height: "auto" }}>
                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                              <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: item,
                                      naviga:'All'
                                    })
                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  <Text
                                    style={{
                                      color: "#6FA4E9",
                                      paddingLeft: 10,
                                      textAlign: "center",
                                    }}
                                  >
                                    {
                                      item.viewedUsers.length > 1000 ?
                                        <Text style={{ color: '#6FA4E9' }}>{(item.viewedUsers.length / 1000).toFixed(1)}k Views</Text> :
                                        <Text style={{ color: '#6FA4E9' }}>{item.viewedUsers.length} Views</Text>
                                    }
                                  </Text>
                                </TouchableOpacity>
                              </View>
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
                                justifyContent: 'center',
                                magin: 0,
                              }}
                            >
                              <View style={{ flex: 0 }}>

                                {
                                  item.requested ?
                                    <TouchableOpacity
                                      onPress={() =>
                                        navigation.navigate("SendChatRequest", {
                                          name: item.uservisibility.name.substr(0, 15),
                                          profilePic: item.uservisibility.profilePic,
                                          jid: item.jid_main,
                                          post: item
                                        })
                                      }
                                    >
                                      <Image
                                        source={require("../assets/bottomCard/request_sent.png")}
                                        cache="force-cache"
                                        style={{
                                          height: 40,
                                          width: 40,
                                          margin: 5,
                                          marginLeft: 20
                                        }}
                                      ></Image>
                                      <Text style={{ marginBottom: 5, color: '#323F4B' }}>Chat Request Sent</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity
                                      onPress={() =>
                                        navigation.navigate("SendChatRequest", {
                                          name: item.uservisibility.name.substr(0, 15),
                                          profilePic: item.uservisibility.profilePic,
                                          jid: item.jid_main,
                                          post: item
                                        })
                                      }
                                    >
                                      <Image
                                        source={require("../assets/bottomCard/request_chat.png")}
                                        cache="force-cache"
                                        style={{
                                          height: 40,
                                          width: 40,
                                          margin: 5,
                                          marginLeft: 20
                                        }}
                                      ></Image>
                                      <Text style={{ marginBottom: 5, color: '#323F4B' }}>Request to Chat</Text>
                                    </TouchableOpacity>

                                }
                              </View>




                            </View>
                          </View>
                        </Card>
                      </ViewShot>
                    ) : (
                      <></>
                    )
                )
              }

            async function showPendingRatingDialog(item,navigation){
                  navigation.showModal({
                    component: {
                      name: 'AskRatingScreen'
                    }
                  });
            }
          //   const [onEndReachedCalledDuringMomentum ,setOnEndReachedCalledDuringMomentum]  = useState(true)
          //   const onEndReachedWithin = ({ distanceFromEnd }) => {
          //     console.log('distanceFromEnd',distanceFromEnd)
          //     if(onEndReachedCalledDuringMomentum){
  
          //       getDataWithin(offsetWithin)
          //         setOnEndReachedCalledDuringMomentum(true)
          //     }
          // }
              _renderItemPending =({item}) =>{
                return (
                                  <View style={{flexDirection:'row',backgroundColor:'#fff',padding:10,margin:10,height:150 }}>
                          <View>
                          <Image source={{ uri: item.uid.profilePic }} style={{ height: 50, width: 50,marginTop:10,borderRadius:30}} />
                          </View>
                          <View style={{backgroundColor:'#fff',height:80,margin:5,marginTop:0,padding:10,textAlign:'center'}}> 
                            <Text style={{color:'#A1A4B2',fontWeight:'bold'}}>Collect Review</Text>
                                              <Text style={{fontWeight:'bold'}}>Did you complete  your work with {item.uid.name}?</Text>
                                              <Text style={{fontWeight:'bold',marginTop:10}}>{item.category} - {item.subCategory}</Text>
                                              <View style={{flexDirection:'row'}}>

                                                  <View style={{borderWidth:2,borderColor:'#6FA4E9',borderRadius:10,margin:10}}>
                                                    <Text style={{color:'#6FA4E9',padding:10}}>Ignore</Text>
                                                  </View>

                                      <View style={{borderWidth:2,borderColor:'#6FA4E9',borderRadius:10,margin:10}}>
                                                    <Text style={{color:'#6FA4E9',padding:10}}>Not yet</Text>
                                                  </View>

                                                  <View style={{backgroundColor:'#6FA4E9',borderRadius:10,margin:10}}>
                                                      <Text style={{color:'#fff',padding:10}}>Completed</Text>
                                                  </View>

                                              </View>
                          </View>
                          </View>
                )
              }

              _renderItemRating =({item}) =>{
                return (
                              <TouchableOpacity opacity={1} onPress={()=>{showPendingRatingDialog(item,navigation)}}>
                                <View style={{flexDirection:'row',backgroundColor:'#fff',padding:10,margin:10,height:150 }}>

                        <View>
                        <Image source={{ uri: item.uid.profilePic }} style={{ height: 50, width: 50,marginTop:10,borderRadius:30}} />
                        </View>
                        <View style={{backgroundColor:'#fff',height:80,margin:5,marginTop:0,padding:10,textAlign:'center'}}> 
                          <Text style={{color:'#A1A4B2',fontWeight:'bold'}}>Rate Service Provider/Seller</Text>
                                            <Text style={{fontWeight:'bold'}}>{item.uid.name}</Text>
                                          
                                            <Chip
                                                          style={{
                                                            alignSelf: 'flex-start',
                                                            backgroundColor: '#F30E5C',
                                                          }}
                                                        >
                                                          <Text
                                                            style={{
                                                              color: "#fff",
                                                              marginTop: 0,
                                                              fontSize: 10,
                                                            }}
                                                          >
                                                        {item.subCategory}
                                                          </Text>
                                                        </Chip>
                                            <View style={{flexDirection:'row'}}>

                                          <Image source={require('../assets/rating_image.png')} style={{height:30,width:150}}/>
                                            </View>
                        </View>
                        </View>
                        </TouchableOpacity>
                )
              }


              const submitRating = () =>{
              }

              const showDialog = () => {
                setVisible(true);
              };

              const handleCancel = () => {
                setVisible(false);
              };

              const handleDelete = () => {
                // The user has pressed the "Delete" button, so here you can do your own logic.
                // ...Your logic
                setVisible(false);
              };
              const [visible, setVisible] = useState(true);

           

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

              const getItem = (item) => {
                //Function for click on an item
                alert('Id : ' + item.id + ' Title : ' + item.title);
              };
                       const onRefresh = React.useCallback(async () => {
                              getDataWithin(1)
                              getDataBeyond(1)
                          wait(2000).then(() => setRefreshing(false));
                        }, []);
              const [refreshing, setRefreshing] = React.useState(false);
              return (
                <SafeAreaView>
                          <ScrollView ref={ref}
                       refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                      }
                      // scrollEventThrottle={16}
                      // onScroll={()=>alert('Hii')}

                  >
                    <View style={{ backgroundColor: "#f2f2f2" }}>
                      {/* <View style={{ backgroundColor: "#f2f2f2" }}>
                        <Chip
                          mode={"outlined"}
                          style={{
                            margin: 2,
                            marginBottom: 0,
                            padding: 0,
                            borderRadius: 30,

                          }}
                          onPress={() => navigation.navigate("SearchScreen")}
                        >
                          <View
                            style={{ flexDirection: "row", justifyContent: "center" }}
                          >
                            <View style={{ flex: 0 }}>
                              <Image
                                source={require("../assets/icons/filter.png")}
                                style={{ height: 40, width: 50 }}
                              ></Image>
                            </View>

                            <View style={{ flex: 0 }}>
                              <Text
                                style={{
                                  color: "#8f9090",
                                  fontSize: 15,
                                  marginLeft: 40,
                                  marginTop: 12,
                                }}
                              >
                                Looking for something
                                </Text>
                            </View>

                          
                          </View>
                        </Chip>
                      </View> */}
                      {
                        Userpreferences.length>0?
                        <View style={{backgroundColor:'#fff',flexDirection:'row',paddingTop:10}}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('SearchScreen',{getDataForPill:getDataForPill})}}>
  
                              <View style={{ flex: 0, marginLeft: 10, marginTop: 7 }}>
                                <Image
                                  source={require("../assets/icons/search.png")}
                                  style={{ height: 30, width: 30 }}
                                ></Image>
                              </View>
                              </TouchableOpacity>
                              <View style={{flex:10}}>
                                      <FlatList
                                          data={_.uniqBy(Userpreferences, function (e) {
                                            return e.subCategory;
                                          })}
                                          horizontal={true}
                                          showsHorizontalScrollIndicator={false}
                                          renderItem={({ item }) =>( 
                                            <>
                                            {
                                              item.subCategory?
                                              <TouchableOpacity onPress={()=>getDataForPill(item.category,item.subCategory)}>
                                                         
                                              <View style={{ margin: 3, marginBottom: 10,backgroundColor:selectedPreferences == item.subCategory?'#6FA4E9':'#f2f2f2',borderRadius:20,borderColor:'#D7D7D7',borderWidth:1 }}>
                                              <Text style={styles.chipTexts,{color:selectedPreferences == item.subCategory?'#fff':'#000',padding:8}}>{I18n.t(item.subCategory)}</Text>
                                              </View>
                                                                {/* <Chip mode={"outlined"} style={{ margin: 3, marginBottom: 10,backgroundColor:selectedPreferences == item.subCategory?'#6FA4E9':'#f2f2f2' }}>
                                                                  <Text style={styles.chipTexts,{color:selectedPreferences == item.subCategory?'#fff':'#000'}}>{item.subCategory}</Text>
                                                                </Chip> */}
                                                                 {/* <Chip mode={"outlined"} style={{ margin: 3, marginBottom: 10,backgroundColor:'#f2f2f2' }}>
                                                                   <Text style={styles.chipTexts,{color:'#000'}}>{item.subCategory}</Text>
                                                                 </Chip> */}
                                                     
  
                                                          </TouchableOpacity>
                                                          :<></>
                                            }
                                                            
                                                          </>
                                          )}/>
                              </View>
                              </View>
                              :
                              <></>
                      }
                    
                      <RBSheet
                        ref={refRBSheet}
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
                                    style={{ height: 26, width: 26 }}
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
                                    onPress={() => { reportUser(Number(global.postcurrent[0])) }}
                                  >
                                    Report Spaark
                                </Text>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      flex: 70,
                                      paddingLeft: 40,
                                    }}
                                  >
                                    Please report if you find this content inappropriate
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
                              <View style={{ flexDirection: "row", marginTop: 20 }} onPress={() => { blockUser(currentPost) }}>
                                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                                  <Image
                                    cache="force-cache"
                                    source={require("../assets/icons/bottomsheet/2.png")}
                                    style={{ height: 26, width: 26 }}
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
                                    <Text style={{ color: '#000' }}>Block</Text>
                                  </Text>

                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      flex: 70,
                                      paddingLeft: 40,
                                    }}
                                  >
                                    If you dont want to receive updates from Nonname
                                </Text>
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
                                  <Image source={require('../assets/icons/login_continue.png')} style={{ height: 150, width: 150, }}></Image>

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



                      <RBSheet
                        ref={refRBsheettt}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        height={350}
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
                        <View style={{ backgroundColor: "#fff", height:330 }}>
                         
                          <Text style={{marginLeft: 20, fontWeight:'500', fontSize: 20, paddingBottom: 14 }}>{I18n.t("Filter Spaarks by")}  
                          <Text style={{color:'#6FA4E9'}}> {sortedDistance.toFixed(0)}Km 
                          </Text></Text>
                         
                          <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', alignItems:'center', paddingRight: 10, paddingLeft: 10}}>
                         <View style={{ flex: 1,justifyContent: 'center',marginTop:10}}>


{/* <Slider
    style={{width: 350, height: 30}}
    minimumValue={1}
    // value={sortedDistance}
    onValueChange={setsortedDistance}
    maximumValue={5}
    minimumTrackTintColor="#6FA4E9"
    maximumTrackTintColor="#9597A1"
    step='1'
  /> */}

                        
</View>

               </View>
               <View style={{marginTop:10}}>
               <View style={{ flexDirection:'row',justifyContent:'space-between', alignItems:'center', fontSize: 10,paddingRight: 9, paddingLeft: 9,margin:10}}>
                          <Text>1km</Text>
                            <Text>2km</Text>
                            <Text>3km</Text>
                            <Text>4km</Text>
                            <Text>5km</Text>

                          </View>
               <View
                            style={{
                              borderBottomColor: '#C0C0C0',
                              borderBottomWidth: 1,
                              width: 370, 
                              marginLeft: 10,
                              marginRight: 10,
                            }}
                          />

                         </View>
                 

<View>

<View style={{flexDirection:'column',padding:10}}>
  <View style={{flexDirection:'row'}}>
            <View style={{flex:4}} >
          <Text style={{fontWeight:'500',fontSize:16, left: 15}}>{I18n.t("Nearest Spaarks")}</Text>
          <Text style={{fontSize:14,color:'#A1A4B2', left: 15, top:6, fontWeight:'400'}}>{I18n.t("Spaarks are sorted by distance from you")}</Text>
          </View>
          <View style={{flex:1}}>
            <TouchableOpacity onPress={()=>setSortBys(1)}>
              {
                sortBys?
                <Image source={require('../assets/checked.png')} style={{height:40,width:40}}/>:
                <Image source={require('../assets/unchecked.png')} style={{height:40,width:40}}/>
              }
          
         
          </TouchableOpacity>
           </View>
  </View>

 {/* <View
                            style={{
                              borderBottomColor: '#C0C0C0',
                              borderBottomWidth: 1,
                              width: 370, 
                              marginLeft: 10,
                              marginRight: 10,
                              margin:10
                            }}
                          /> */}
                           <View
                            style={{
                              borderBottomColor: '#C0C0C0',
                              borderBottomWidth: 1,
                              width: 370, 
                              marginLeft: 10,
                              marginRight: 10,
                              margin: 10
                            }}
                          />
  <View style={{flexDirection:'row'}}>
            <View style={{flex:4}} >
          <Text style={{fontWeight:'500',fontSize:16, left: 15}}>{I18n.t("Latest Spaarks")}</Text>
          <Text style={{fontSize:14,color:'#A1A4B2', left: 15, top: 6, fontWeight:'400'}}>{I18n.t("Spaarks are sorted by time of posting")}</Text>
          </View>
          <View style={{flex:1}}>
          <TouchableOpacity onPress={()=>setSortBys(0)}>
          {
                sortBys?
                <Image source={require('../assets/unchecked.png')} style={{height:40,width:40}}/>:
                <Image source={require('../assets/checked.png')} style={{height:40,width:40}}/>
              }
              </TouchableOpacity>
          </View>
  </View>
</View>

                                   

                                 
</View>


                         <View style={{ justifyContent:'center', alignItems:'center'}}>
                          <TouchableOpacity onPress={()=>sortNow()}>
                          <Button
                                    mode="contained"
                                    color="#6FA4E9"
                                    style={{
                                      height: 40,
                                      width: 300,
                                      margin: 10,
                                      marginTop: 10,
                                     
                                      marginBottom: 20
                                    }}
                                   
                                  >
                                  <Text style={{color:'#fff'}}>{I18n.t("SORT")}</Text>
                                </Button>  
                                </TouchableOpacity>
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
                    </View>
                 
                                  <View style={{ backgroundColor: '#f2f2f2',flexDirection:'row'}}>
   
                      <View style={{ flexDirection:'row'}}> 
                      <SpaarksHeading within={true} showing={sortedDistance} setFinalDistance={setFinalDistance} setOffsetWithin={setOffsetWithin} setOffsetExplore={setOffsetExplore} setOffsetBeyond={setOffsetBeyond} setDataSourceExplore={setDataSourceExplore} setDataSourceWithin={setDataSourceWithin} setDataSourceBeyond={setDataSourceBeyond} featureName={"market"} getDataWithin={getDataWithin} getDataBeyond={getDataBeyond} getDataExplore={getDataExplore} setSortByString={setSortByString} setsortedDistance={setsortedDistance} getDataBeyondSort={getDataBeyondSort} getDataWithinSort={getDataWithinSort} getDataExploreSort={getDataExploreSort}/>
                     
                        </View>
                      
                      
{
  Userpreferences.length == 0?
  <View style={{ flex: 0, marginLeft: 10, marginTop: 0, left: Dimensions.get('window').width / 2 - 80 }}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('SearchScreen',{getDataForPill:getDataForPill})}}>
                      <Image
    source={require("../assets/search-bg.png")}
    style={{ height: 30, width: 30 }}
    onPress={()=>{alert('search')}}
  ></Image>
  </TouchableOpacity>
</View>
:
<></>
}


                    </View>       
                    <View style={{ backgroundColor: "#f2f2f2" }}>
                      {/* <FlatList
                        data={dataSourceWithin}
                        keyExtractor={(item, index) => index.toString()}
                        enableEmptySections={true}
                        // onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false)}}
                        // onEndReachedThreshold={0.3}
                        // onEndReached={onEndReachedWithin} 
                       
                        
                        
                        ListFooterComponent={renderFooterWithin}

                      /> */}
                      {
                        dataSourceWithin.length != 0?
                        <FlatList
                        ref={(ref) => flatListWithin = ref}
                        data={dataSourceWithin}
                        keyExtractor={(item, index) => index.toString()}
                        enableEmptySections={true}
                        renderItem={renderPostCard}
                        ListFooterComponent={renderFooterWithin}

                      />
                      :
                      <>
<View style={{justifyContent:'center',backgroundColor:'#f2f2f2'}}>
                    <Text style={{textAlign:'center'}}>{I18n.t("No Spaarks within")}</Text>
                  </View>
                      </>
                      }
                        
                    </View>
                   <View style={{ backgroundColor: '#f2f2f2', padding: 10 }}>
                      {/* <TouchableOpacity onPress={() => { handleConnect(5001, 5001) }}> */}
                      {/* <SpaarksHeading within={false} setFinalDistance={setFinalDistance} setOffsetWithin={setOffsetWithin} setOffsetExplore={setOffsetExplore} setOffsetBeyond={setOffsetBeyond} setDataSourceExplore={setDataSourceExplore} setDataSourceWithin={setDataSourceWithin} setDataSourceBeyond={setDataSourceBeyond} featureName={"market"} getDataWithin={getDataWithin} getDataBeyond={getDataBeyond} getDataExplore={getDataExplore} setSortByString={setSortByString} setsortedDistance={setsortedDistance} getDataBeyondSort={getDataBeyondSort} getDataWithinSort={getDataWithinSort} getDataExploreSort={getDataExploreSort}/> */}
                      <View>
<Text style={{ fontWeight: "bold", margin: 0,fontSize:16 }}> {'  '}{I18n.t('Spaarks')} beyond <Text style={{color:'#6FA4E9'}}>{sortedDistance.toFixed(0)}Km</Text></Text>
      </View>
                      {/* <Text style={{ fontWeight: "bold", margin: 0,fontSize:16 }}>
                          {'  '}{I18n.t('Spaarks')} within <Text style={{color:'#6FA4E9'}}>{sortedDistance.toFixed(0)}Km</Text>
                        </Text> */}
                         {/* <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold", margin: 0, fontSize: 16, padding: 10 }}>{'  '}{I18n.t('Spaarks')} beyond <Text style={{ color: '#6FA4E9' }}>{finalDistance.toFixed(0)}Km</Text></Text>
              </View> */}
                      {/* </TouchableOpacity> */}
                    </View>
                      <View style={{ backgroundColor: "#f2f2f2" }}>
                      {/* <FlatList
                        data={dataSourceBeyond}
                        keyExtractor={(item, index) => index.toString()}
                        enableEmptySections={true}
                        // onEndReachedThreshold={0.1}
                        // onEndReached={getDataBeyond} 
                        renderItem={ItemViewBeyond}
                        ListFooterComponent={renderFooterBeyond}

                      /> */}

                  <FlatList
                        data={dataSourceBeyond}
                        keyExtractor={(item, index) => index.toString()}
                        enableEmptySections={true}
                        renderItem={renderPostCard}
                        ListFooterComponent={renderFooterBeyond}

                      />
                    </View>
           {
             global.category != 'All'?
<>
             <View style={{ backgroundColor: '#f2f2f2', padding: 10 }}>
             <TouchableOpacity onPress={() => { handleConnect(5001, 5001) }}>
             <View>
           <Text style={{ fontWeight: "bold", margin: 0,fontSize:16,padding:10 }}>Explore more </Text>
                 </View>
             </TouchableOpacity>
           </View>
             <View style={{ backgroundColor: "#f2f2f2" }}>


         <FlatList
               data={dataSourceExplore}
               keyExtractor={(item, index) => index.toString()}
               enableEmptySections={true}
               renderItem={renderPostCard}
               ListFooterComponent={renderFooterExplore}

             />
           </View>
           </>
             :<></>
           }


                  </ScrollView>

                </SafeAreaView>
              );
};


const styles = StyleSheet.create({
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
    marginTop: 6
  },
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

    backgroundColor: "#f2f2f2",
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
    backgroundColor: '#000',
    justifyContent: 'center',
    marginTop: 140,
    width: 360,
    height: 250,
    resizeMode: "contain"
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#6FA4E9',
    fontSize: 15,
    textAlign: 'center',
  },



});


const mapStatetoProps = (state) => {
  // const { }=state
  
  return {
    chat_roster_main: state.chatss.chat_roster_main,
    allMapPosts:state.chatss.allMapPosts,
    Userpreferences:state.chatss.preferences,
    selectedPreference:state.chatss.selectedPreference,
    categorySearched:state.chatss.category,
    subCategorySearched:state.chatss.subCategory,
    token:state.chatss.token,
    sortApplied:state.chatss.sortApplied,
    distance:state.chatss.distance,
    sortBy:state.chatss.sortBy,
  };
};
export default connect(mapStatetoProps)(MarketScreen);
