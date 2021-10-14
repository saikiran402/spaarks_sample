// import React, { useEffect,useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   ScrollView,
//   Animated,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   Platform,
//   Linking
// } from "react-native";
// import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
// import { connect, useDispatch, useReducer } from "react-redux";
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Fontisto from 'react-native-vector-icons/Fontisto';

// import { markers, mapDarkStyle, mapStandardStyle } from '../model/mapData';
// import StarRating from '../components/StarRating';
// import I18n from '../src/i18n';
// import { useTheme } from '@react-navigation/native';
// import AsyncStorage from '@react-native-community/async-storage';
// import chatReducers from "../reducers/chatReducers";

// const events = [];
// const friends = [];
// const all = [];
// const { width, height } = Dimensions.get("window");
// const CARD_HEIGHT = 270;
// const CARD_WIDTH = width * 0.8;
// const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

// const HomeScreen = ({ navigation, route,whatToShow, mapPosts, allMapPosts, marketMapPosts, friendsMapPosts, announceMapPosts }) => {
//   const [ lat , setLat ] = useState(null)
//   const [ lon , setLon ] = useState(null)
//   const theme = useTheme();

//   const initialMapState = {
//     markers,
//     events,
//     friends,
//     all,
//     selected:0,
//     whatToShow: whatToShow,
//     allMapPosts: allMapPosts,
//     marketMapPosts: marketMapPosts,
//     friendsMapPosts: friendsMapPosts,
//     announceMapPosts: announceMapPosts,
//     tileUrl:'https://maps.spaarksweb.com/styles/ososweb/{z}/{x}/{y}.png',
//     categories: [
//       {
//         name: 'Security Guard',
//       },
//       {
//         name: 'Night Duty',

//       },
//       {
//         name: 'Watch Man',
//       }
//     ],
//     myLat: {
//       coordinate: {
//         latitude: 17.4079,
//         longitude: 78.4437,
//       }
//     },
//     region: {
//       latitude: 17.4079,
//       longitude: 78.4437,
//       latitudeDelta: 0.04864195044303443,
//       longitudeDelta: 0.040142817690068,
//     },
//   };



//   let mapIndex = 0;
//   let mapAnimation = new Animated.Value(0);

//   const MapReducer = (prevState, action) => {

//     switch (action.type) {
//       case 'SETPOSTS':
//         return {
//           ...prevState,
//           markers: action.posts,
//           isLoading: false
//         };

//       case 'SETSELECTED':
//         return {
//           ...prevState,
//           selected: action.selected,
//           whatToShow:action.whatToShow,
//           isLoading: false
//         };

//       case 'SETCOORD':
//         return {
//           ...prevState,
//           region: action.region,
//           myLat: action.myLat
//         };

//     }
//   };
//   const [state, dispatch] = React.useReducer(MapReducer, initialMapState);
// const [isMapready, setIsMapready] = useState(false)
//   const Chatdispatcher = useDispatch(chatReducers);

//   async function getCoordinates(){
//     var latitudes = await AsyncStorage.getItem('latitude');
//     var longitudes = await AsyncStorage.getItem('longitude');
//     var region = {
//       latitude: 17.4079,
//       longitude: 78.4437,
//       latitudeDelta: 0.04864195044303443,
//       longitudeDelta: 0.040142817690068,
//     };
//     var myLat = {
//       coordinate: {
//         latitude: 17.4079,
//         longitude: 78.4437,
//       }
//     };
//     dispatch({type:'SETCOORD',region:region,myLat:myLat})
//     setIsMapready(true)
//     setLat(latitudes)
//     setLon(longitudes)
//   }

//   useEffect(() => {

//     getCoordinates()
//     mapAnimation.addListener(({ value }) => {
//       let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
//       if (index >= state.whatToShow.length) {
//         index = state.whatToShow.length - 1;
//       }
//       if (index <= 0) {
//         index = 0;
//       }

//       clearTimeout(regionTimeout);

//       const regionTimeout = setTimeout(() => {
//         if( mapIndex !== index ) {
//           mapIndex = index;
//           // const { coordinate } = state.whatToShow[index];
//           var coordinate = {
//             latitude: state.whatToShow[index].locationStatic.coordinates[1],
//             longitude: state.whatToShow[index].locationStatic.coordinates[0],
//           }
//           console.log('--------------------')
//           console.log('--------------------')
//           console.log(coordinate)
//           console.log('--------------------')
//           console.log('--------------------')
//           _map.current.animateToRegion(
//             {
//               ...coordinate,
//               latitudeDelta: state.region.latitudeDelta,
//               longitudeDelta: state.region.longitudeDelta,
//             },
//             350
//           );
//         }
//       }, 10);
//     });
//   });
//   const interpolations = state.whatToShow.map((marker, index) => {
//     const inputRange = [
//       (index - 1) * CARD_WIDTH,
//       index * CARD_WIDTH,
//       ((index + 1) * CARD_WIDTH),
//     ];

//     const scale = mapAnimation.interpolate({
//       inputRange,
//       outputRange: [1, 1.5, 1],
//       extrapolate: "clamp"
//     });

//     return { scale };
//   });
//   const onMarkerPress = (mapEventData) => {
//     const markerID = mapEventData._targetInst.return.key;

//     let x = (markerID * CARD_WIDTH) + (markerID * 20); 
//     if (Platform.OS === 'ios') {
//       x = x - SPACING_FOR_CARD_INSET;
//     }

//     _scrollView.current.scrollTo({x: x, y: 0, animated: true});
//   }

//   const _map = React.useRef(null);
//   const _scrollView = React.useRef(null);

//   async function selectedUpdat(val) {

//     if(val == 0){
//       dispatch({type:'SETSELECTED',selected:val,whatToShow:state.allMapPosts})
//     }
//     if(val == 1){
//       dispatch({type:'SETSELECTED',selected:val,whatToShow:state.marketMapPosts})
//     }
//     if(val == 2){
//       dispatch({type:'SETSELECTED',selected:val,whatToShow:state.friendsMapPosts})
//     }
//     if(val == 3){
//       dispatch({type:'SETSELECTED',selected:val,whatToShow:state.announceMapPosts})
//     }



//     // setSelected(val)


//   }
//   return (
//     <View style={styles.container}>
//            <View style={{ flexDirection: 'row', padding: 10, paddingBottom: 0 }}>

// {
//   state.selected == 0 ?
//     <View style={{ flex: 2, borderBottomColor: '#6FA4E9', borderBottomWidth: 3 }}>
//       <Text style={{ color: '#6FA4E9', padding: 10, marginLeft: 20, fontSize: 8 }} onPress={() => { selectedUpdat(0) }}>{I18n.t("All")}</Text>
//     </View>
//      :
//     <View style={{ flex: 2 }}>
//       <Text onPress={() => { selectedUpdat(0) }} style={{ color: '#9A9A9A', padding: 8, marginLeft: 20, fontSize: 8 }}>{I18n.t("All")}</Text>
//     </View>
// }
// {
//   state.selected == 1 ?
//     <View style={{ flex: 2, borderBottomColor: '#6FA4E9', borderBottomWidth: 2 }}>
//       <Text style={{ color: '#6FA4E9', padding: 8, marginLeft: 20, fontSize: 8 }} onPress={() => { selectedUpdat(1) }}>{I18n.t("Market")}</Text>
//     </View> :
//     <View style={{ flex: 2 }}>
//       <Text onPress={() => { selectedUpdat(1) }} style={{ color: '#9A9A9A', padding: 8, marginLeft: 20, fontSize: 8 }}>{I18n.t("Market")}</Text>
//     </View>
// }

// {
//   state.selected == 3 ?
//     <View style={{ flex: 2, borderBottomColor: '#6FA4E9', borderBottomWidth: 2 }}>
//       <Text style={{ color: '#6FA4E9',  padding: 8, marginLeft: 15, fontSize: 10 }} onPress={() => { selectedUpdat(3) }}>{I18n.t("Announce")}</Text>
//     </View> :
//     <View style={{ flex: 2 }}>
//       <Text onPress={() => { selectedUpdat(3) }} style={{ color: '#9A9A9A', padding: 8, marginLeft: 20, fontSize: 8 }}>{I18n.t("Announce")}</Text>
//     </View>
// }
//   {
//   state.selected == 2 ?
//     <View style={{ flex: 2, borderBottomColor: '#6FA4E9', borderBottomWidth: 2 }}>
//       <Text style={{ color: '#6FA4E9', padding: 8, marginLeft: 10, fontSize: 8 }} onPress={() => { selectedUpdat(2) }}>{I18n.t("Make Friends")}</Text>
//     </View> :
//     <View style={{ flex: 2 }}>
//       <Text onPress={() => { selectedUpdat(2) }} style={{ color: '#9A9A9A', padding: 8, marginLeft: 10, fontSize: 8 }}>{I18n.t("Make Friends")}</Text>
//     </View>
// }


// </View>
//       <MapView
//         ref={_map}
//         initialRegion={state.region}
//         style={styles.container}
//         // provider={PROVIDER_GOOGLE}
//         customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
//       >
//         {state.whatToShow.map((marker, index) => {
//           const scaleStyle = {
//             transform: [
//               {
//                 scale: interpolations[index].scale,
//               },
//             ],
//           };
//           var coordinates = {
//             latitude: marker.locationStatic.coordinates[1],
//             longitude: marker.locationStatic.coordinates[0]
//         };
//           return (

//             <>
//             <MapView.Marker key={index} coordinate={coordinates} onPress={(e)=>onMarkerPress(e)}>
//               <Animated.View style={[styles.markerWrap]}>
//                 <Animated.Image
//                   source={require('../assets/map_marker.png')}
//                   style={[styles.marker, scaleStyle]}
//                   resizeMode="cover"
//                 />
//               </Animated.View>
//             </MapView.Marker>
//               <MapView.Marker key={index + "s"} coordinate={state.myLat.coordinate}>

//               </MapView.Marker>
//               <MapView.Circle
//                 key="myCircle"
//                 center={state.myLat.coordinate}
//                 radius={5000}
//                 strokeWidth={2}
//                 strokeColor={'#448AFF'}
//                 // fillColor={"rgba(68, 138, 255, '4D')"}
//                 color="#0080FF80"


//               />
//           </>
//           );
//         })}
//       </MapView>
//       {/* <View style={styles.searchBox}>
//         <TextInput 
//           placeholder="Search here"
//           placeholderTextColor="#000"
//           autoCapitalize="none"
//           style={{flex:1,padding:0}}
//         />
//         <Ionicons name="ios-search" size={20} />
//       </View> */}
//       {/* <ScrollView
//         horizontal
//         scrollEventThrottle={1}
//         showsHorizontalScrollIndicator={false}
//         height={50}
//         style={styles.chipsScrollView}
//         contentInset={{ // iOS only
//           top:0,
//           left:0,
//           bottom:0,
//           right:20
//         }}
//         contentContainerStyle={{
//           paddingRight: Platform.OS === 'android' ? 20 : 0
//         }}
//       >
//         {state.categories.map((category, index) => (
//           <TouchableOpacity key={index} style={styles.chipsItem}>
//             {category.icon}
//             <Text>{category.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView> */}
//       <Animated.ScrollView
//         ref={_scrollView}
//         horizontal
//         pagingEnabled
//         scrollEventThrottle={1}
//         showsHorizontalScrollIndicator={false}
//         snapToInterval={CARD_WIDTH + 20}
//         snapToAlignment="center"
//         style={styles.scrollView}
//         contentInset={{
//           top: 0,
//           left: SPACING_FOR_CARD_INSET,
//           bottom: 0,
//           right: SPACING_FOR_CARD_INSET
//         }}
//         contentContainerStyle={{
//           paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
//         }}
//         onScroll={Animated.event(
//           [
//             {
//               nativeEvent: {
//                 contentOffset: {
//                   x: mapAnimation,
//                 }
//               },
//             },
//           ],
//           {useNativeDriver: true}
//         )}
//       >
//        {state.whatToShow.map((item, index) =>(
//          <View style={styles.card} key={index}>

//          <Image
//            source={{ uri: item.uservisibility.profilePic }}
//            style={styles.cardImage}
//            resizeMode="cover"

//          />

//          <View style={styles.textContent}>
//            <View style={{ flexDirection: 'row' }}>
//              <View style={{ flex: 1 }}>



//                  <Text numberOfLines={1} style={{ margin: 0, fontWeight: 'bold' }} >{item.uservisibility.name.substr(0,15)} </Text>


//              </View>
//              <View style={{ flex: 0, backgroundColor: "#f8f9fb", borderRadius: 10 }}>
//                {/* <Text style={{ margin: 0, marginBottom: 5, fontWeight: 'bold' }}> <Image source={require('../assets/icons/distance.png')} style={{ height: 15, width: 15 }}></Image> {item.distance.toFixed(2)} m  </Text> */}
//                {/* <Text style={{ margin: 0, marginBottom: 5, fontWeight: 'bold' }}> <Image source={require('../assets/icons/distance.png')} style={{ height: 15, width: 15 }}></Image> {item.distance.toFixed(2)} m  </Text> */}
//                {
//                                              item.distance && item.distance.toFixed(2) < 1000 ?
//                                              <Text style={{ margin: 0, marginBottom: 5, fontWeight: 'bold' }}> <Image source={require('../assets/icons/distance.png')} style={{ height: 15, width: 15 }}></Image> {item.distance && item.distance.toFixed(1)}m</Text> :
//    <Text style={{ margin: 0, marginBottom: 5, fontWeight: 'bold' }}> <Image source={require('../assets/icons/distance.png')} style={{ height: 15, width: 15 }}></Image> {(item.distance/1000).toFixed(1)} km  </Text>
//                                            }
//              </View>


//            </View>

//            <View style={{ flexDirection: 'row' }}>

//                <View style={{flexDirection:'row'}}>
//                {
//                item.tags != undefined && item.tags.length>0 ?
//                item.tags.map((list, i) =>

//              <View style={{borderColor:list.color,padding:5,borderRadius:10, borderWidth:1,flexWrap:'nowrap'}}>
//                <Text
//                   style={{
//                     color: list.color,
//                     marginTop: 0,
//                     fontSize: 10,
//                   }}
//                 >
//                   {list.name}
//                 </Text>
//                </View>
//                ):<></>

//               }
//                </View>


//              <TouchableOpacity onPress={() => navigation.navigate('PostSpecificScreens', { post: item })
//              } style={{ backgroundColor: "#fff" }}>

//              {
//                item.featureName == 'market' && item.reviews && item.reviews.length > 0 ?
//                <View style={{ flex: 0, backgroundColor: "#f8f9fb", borderRadius: 10 }}>
//                  <Text style={{ margin: 0, marginBottom: 5, fontWeight: 'bold' }}> <Image source={require('../assets/icons/ratings.png')} style={{ height: 15, width: 15 }}></Image> {item.reviews[0].rating}.0  </Text>
//                </View>:<></>
//                }
//              </TouchableOpacity>
//            </View>
//            <TouchableOpacity onPress={() => navigation.navigate('PostSpecificScreens', { post: item })
//              } style={{ backgroundColor: "#fff" }}>
//            <View style={{height:30}}>
//            <Text style={{ margin: 5 }} numberOfLines={1}>{item.content}</Text>
//            </View>
//    </TouchableOpacity>
//            <View
//              style={{
//                marginTop: 5,
//                marginLeft: 0,
//                marginRight: 0,
//                borderBottomColor: 'black',
//                borderBottomWidth: 0.2,
//              }}
//            />
//            {/*  */}
//            <View style={{ flexDirection: 'row', margin: 5,marginTop:10,alignSelf: 'flex-start', }}>
//              <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${item.locationStatic.coordinates[1]},${item.locationStatic.coordinates[0]}`)
//              } style={{ backgroundColor: "#fff" }}>
//                <View>

//                  <Text style={{ justifyContent: 'center', textAlign: 'center', color: '#6FA4E9', fontWeight: 'bold', marginBottom: 10, height: 15 }}><Image source={require('../assets/icons/directions.png')} style={{ height: 25, width: 25 }}></Image> {I18n.t("Show Directions")}</Text>

//                </View>
//              </TouchableOpacity>
//              {/* {

//              } */}
//              <View>
//                <Text style={{ justifyContent: 'center', textAlign: 'center', color: '#6FA4E9', fontWeight: 'bold', marginBottom: 5, height: 30, marginLeft: 70 }}>{item.myshares && item.myshares.length} {I18n.t("Shares")}</Text>
//              </View>
//            </View>


//          </View>
//        </View>


//        ))}
//       </Animated.ScrollView>
//     </View>
//   );
// };


// const mapStatetoProps = (state) => {

//   console.log("sState allMapPosts", state.chatss.allMapPosts.length);
//   console.log("sState marketMapPosts", state.chatss.marketMapPosts.length);
//   console.log("sState friendsMapPosts", state.chatss.friendsMapPosts.length);
//   console.log("sState announceMapPosts", state.chatss.announceMapPosts.length);
//   // alert("whatToShow",state.chatss.whatToShow.length)
//   return {
//     mapPosts: state.chatss.mapPosts,
//     allMapPosts: [...state.chatss.allMapPosts],
//     marketMapPosts: [...state.chatss.marketMapPosts],
//     friendsMapPosts: [...state.chatss.friendsMapPosts],
//     announceMapPosts: [...state.chatss.announceMapPosts],
//     whatToShow:[...state.chatss.whatToShow]
//   };
// };


// export default connect(mapStatetoProps)(HomeScreen);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   searchBox: {
//     position:'absolute', 
//     marginTop: Platform.OS === 'ios' ? 40 : 20, 
//     flexDirection:"row",
//     backgroundColor: '#fff',
//     width: '90%',
//     alignSelf:'center',
//     borderRadius: 5,
//     padding: 10,
//     shadowColor: '#ccc',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.5,
//     shadowRadius: 5,
//     elevation: 10,
//   },
//   chipsScrollView: {
//     position:'absolute', 
//     top:Platform.OS === 'ios' ? 90 : 80, 
//     paddingHorizontal:10
//   },
//   chipsIcon: {
//     marginRight: 5,
//   },
//   chipsItem: {
//     flexDirection:"row",
//     backgroundColor:'#fff', 
//     borderRadius:20,
//     padding:8,
//     paddingHorizontal:20, 
//     marginHorizontal:10,
//     height:35,
//     shadowColor: '#ccc',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.5,
//     shadowRadius: 5,
//     elevation: 10,
//   },
//   scrollView: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingVertical: 10,
//   },
//   endPadding: {
//     paddingRight: width - CARD_WIDTH,
//   },
//   card: {
//     // padding: 10,
//     elevation: 2,
//     backgroundColor: "#FFF",
//     borderTopLeftRadius: 5,
//     borderTopRightRadius: 5,
//     marginHorizontal: 10,
//     shadowColor: "#000",
//     shadowRadius: 5,
//     shadowOpacity: 0.3,
//     shadowOffset: { x: 2, y: -2 },
//     height: CARD_HEIGHT,
//     width: CARD_WIDTH,
//     overflow: "hidden",
//   },
//   cardImage: {
//     flex: 3,
//     width: "100%",
//     height: "100%",
//     alignSelf: "center",
//   },
//   textContent: {
//     flex: 2,
//     padding: 10,
//   },
//   cardtitle: {
//     fontSize: 12,
//     // marginTop: 5,
//     fontWeight: "bold",
//   },
//   cardDescription: {
//     fontSize: 12,
//     color: "#444",
//   },
//   markerWrap: {
//     alignItems: "center",
//     justifyContent: "center",
//     width:50,
//     height:50,
//   },
//   marker: {
//     width: 30,
//     height: 30,
//   },
//   button: {
//     alignItems: 'center',
//     marginTop: 5
//   },
//   signIn: {
//       width: '100%',
//       padding:5,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 3
//   },
//   textSign: {
//       fontSize: 14,
//       fontWeight: 'bold'
//   }
// });



import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ImageBackground,
  Linking,
  FlatList
} from "react-native";
import _ from "lodash";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import I18n from '../src/i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ModalDropdown from 'react-native-modal-dropdown';
import { markers, mapDarkStyle, mapStandardStyle } from '../model/mapData';
import StarRating from '../components/StarRating';
import { connect, useDispatch, useReducer } from "react-redux";
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import RNLocation from 'react-native-location';
import Snow from 'react-native-snow';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const GLOBAL = require('../Globals');
const HomeScreen = ({navigation,route,Userpreferences,selectedPreference,profilePic}) => {
  const theme = useTheme();

  const initialMapState = {

    markers,
    region: {
      latitude: 17.62938671242907,
      longitude: 78.4354486029795,
      latitudeDelta: 0.0004864195044303443,
      longitudeDelta: 0.00040142817690068,
    },
    categories: [
      {
        name: 'Security Guard',
      },
      {
        name: 'Night Duty',

      },
      {
        name: 'Watch Man',
      },
      {
        name: 'Security Guard',
      },
      {
        name: 'Night Duty',

      },
      {
        name: 'Watch Man',
      },
      {
        name: 'Security Guard',
      },
      {
        name: 'Night Duty',

      },
      {
        name: 'Watch Man',
      }
    ]
  };
  var da = []
  const inititalStatesMap = {

    da,
    region: {
      latitude: 17.62938671242907,
      longitude: 78.4354486029795,
      latitudeDelta: 10.14864195044303443,
      longitudeDelta: 10.140142817690068,
    },
    temperature:0,
    showEffect:'none',
    mapIcons:[],
    coordinate: {
      latitude: 17.4365,
      longitude: 78.3454,
    },
    posts: [],
    categories: [
      {
        name: 'Security Guard',
      },
      {
        name: 'Night Duty',

      },
      {
        name: 'Watch Man',
      },
      {
        name: 'Security Guard',
      },
      {
        name: 'Night Duty',

      },
      {
        name: 'Watch Man',
      }
    ],
  };


  async function sortByRadius(rad){
    setSelectedRadius(rad*1000)
    setDistance(rad)
    dispatcher({type:"SETEMPTY"})
    getMarkersData(rad)
  }



  const ChatSpecificReducer = (prevState, action) => {
    switch (action.type) {
      case "SETPOSTS":
        return {
          ...prevState,
          posts: action.posts,
          region:action.region,
          coordinate:action.coordinate
        };
        case "SETMYLOCATION":
        return {
          ...prevState,
          coordinate:action.coordinate
        };
        case "SETICONSFORMAP":
          return {
            ...prevState,
            tempetature: action.tempetature,
            mapIcons:action.mapIcons,
            showEffect:action.showEffect
          };
        case "SETEMPTY":
        return {
          ...prevState,
          posts: []
        };


    }
  };
  const [ChatState, dispatcher] = React.useReducer(
    ChatSpecificReducer,
    inititalStatesMap
  );
  const [selectedPreferences,setSelectedPreference] = useState(selectedPreference)
  const [distance, setDistance] = useState(5);
  const [showChange, setShowChange] = useState(false);
  async function getMarkersData(dist) {

    var grant = false
    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    }).then(async (granted) => {
      grant = granted
      if(grant){
        setShowChange(false)
      }else{
        setShowChange(true)
      }
    })


    // alert(dist)
    var tokenJWT = await AsyncStorage.getItem('token');
    var latitudes = await AsyncStorage.getItem('latitude');
    var longitudes = await AsyncStorage.getItem('longitude');
    console.log('---------------------->')
    console.log('latitudes',latitudes)
    console.log('longitudes',longitudes)
    console.log('Userpreferences',Userpreferences)
    console.log('---------------------->')
    console.log('---------------------->')
    var a = await axios.post(
      GLOBAL.BASE_URL + 'user/post/static/ios',
      {
        "latitude": Number(latitudes),
        "longitude": Number(longitudes),
        "radius": dist,
        "category": category,
        "subCategory":subCategory
      }
    );
    var Mdata = [];
    var i = 1;
    a.data.data.post.forEach(list => {

      var b = {
        coordinate: {
          latitude: list.locationStatic.coordinates[1],
          longitude: list.locationStatic.coordinates[0],
        },
        title: "Amazing Food Place",
        distance: list.distance,
        name: list.uservisibility.name,
        item: list,
        isPost:true,
        description: "This is the best food place",
        image: list.uservisibility.profilePic,
        rating: 4,
        reviews: 99,
      };
      console.log(i, {
        latitude: list.locationStatic.coordinates[1],
        longitude: list.locationStatic.coordinates[0],
      })
      i++;
      Mdata.push(b)
    })
    var c = {
      coordinate: {
        latitude: latitudes,
        longitude: longitudes,
      },
      title: "Amazing Food Place",
      distance: 0,
      name: "list.uservisibility.name",
      item: {},
      isPost:false,
      description: "This is the best food place",
      image: "list.uservisibility.profilePic",
      rating: 4,
      reviews: 99,
    }
    Mdata.splice(0,0,c)
    console.log('lklklklklklklkl', Mdata)
    dispatcher({ type: "SETPOSTS", posts: Mdata,
    region:{
      latitude: latitudes,
      longitude: longitudes,
      latitudeDelta: 0.00092343,
      longitudeDelta: 0.00092343
    },
    coordinate: {
      latitude: latitudes,
      longitude: longitudes,
    }
   })
    //   var aw = [
    //     {
    //       coordinate: {
    //         latitude: 18.785834,
    //         longitude: 78.406417,
    //       },
    //       title: "Amazing Food Place",
    //       description: "This is the best food place",
    //       image: Images[0].image,
    //       rating: 4,
    //       reviews: 99,
    //     },
    //     {
    //       coordinate: {
    //         latitude: 17.585834,
    //         longitude: 78.406417,
    //       },
    //       title: "Second Amazing Food Place",
    //       description: "This is the second best food place",
    //       image: Images[1].image,
    //       rating: 5,
    //       reviews: 102,
    //     },
    //     {
    //       coordinate: {
    //         latitude: 17.385834,
    //         longitude: 78.406417,
    //       },
    //       title: "Third Amazing Food Place",
    //       description: "This is the third best food place",
    //       image: Images[2].image,
    //       rating: 3,
    //       reviews: 220,
    //     },
    //     {
    //       coordinate: {
    //         latitude: 17.285834,
    //         longitude: 78.406417,
    //       },
    //       title: "Fourth Amazing Food Place",
    //       description: "This is the fourth best food place",
    //       image: Images[3].image,
    //       rating: 4,
    //       reviews: 48,
    //     },
    //     {
    //       coordinate: {
    //         latitude: 17.485834,
    //         longitude: 78.406417,
    //       },
    //       title: "Fifth Amazing Food Place",
    //       description: "This is the fifth best food place",
    //       image: Images[3].image,
    //       rating: 4,
    //       reviews: 178,
    //     },
    //     {
    //       coordinate: {
    //         latitude: 17.485834,
    //         longitude: 78.406417,
    //       },
    //       title: "Fifth Amazing Food Place",
    //       description: "This is the fifth best food place",
    //       image: Images[3].image,
    //       rating: 4,
    //       reviews: 178,
    //     },
    //     {
    //       coordinate: {
    //         latitude: 17.485834,
    //         longitude: 78.406417,
    //       },
    //       title: "Fifth Amazing Food Place",
    //       description: "This is the fifth best food place",
    //       image: Images[3].image,
    //       rating: 4,
    //       reviews: 178,
    //     },
    //     {
    //       coordinate: {
    //         latitude: 17.485834,
    //         longitude: 78.406417,
    //       },
    //       title: "Fifth Amazing Food Place",
    //       description: "This is the fifth best food place",
    //       image: Images[3].image,
    //       rating: 4,
    //       reviews: 178,
    //     },
    //     {
    //       coordinate: {
    //         latitude: 17.485834,
    //         longitude: 78.406417,
    //       },
    //       title: "Fifth Amazing Food Place",
    //       description: "This is the fifth best food place",
    //       image: Images[3].image,
    //       rating: 4,
    //       reviews: 178,
    //     }
    // ];
    //   const newState = {
    //     aw,
    //     region: {
    //       latitude: 17.62938671242907,
    //       longitude: 78.4354486029795,
    //       latitudeDelta: 0.04864195044303443,
    //       longitudeDelta: 0.040142817690068,
    //     },
    //   };
    //   // var asd
    //   setState(newState)
    // console.log('HYHYHYHYH', newState)

  }
  async function getMarkersDatas(dist,c,s) {
  console.log(dist,c,s)
    var tokenJWT = await AsyncStorage.getItem('token');
    var latitudes = await AsyncStorage.getItem('latitude');
    var longitudes = await AsyncStorage.getItem('longitude');

    var a = await axios.post(
      GLOBAL.BASE_URL + 'user/post/static/ios',
      {
        "latitude": Number(latitudes),
        "longitude": Number(longitudes),
        "radius": dist,
        "category": c,
        "subCategory":s
      }
    );
    var Mdata = [];
    var i = 1;
    a.data.data.post.forEach(list => {

      var b = {
        coordinate: {
          latitude: list.locationStatic.coordinates[1],
          longitude: list.locationStatic.coordinates[0],
        },
        title: "Amazing Food Place",
        distance: list.distance,
        name: list.uservisibility.name,
        item: list,
        description: "This is the best food place",
        image: list.uservisibility.profilePic,
        rating: 4,
        reviews: 99,
      };
      console.log(i, {
        latitude: list.locationStatic.coordinates[1],
        longitude: list.locationStatic.coordinates[0],
      })
      i++;
      Mdata.push(b)
    })
    console.log('lklklklklklklkl', Mdata)
    dispatcher({ type: "SETPOSTS", posts: Mdata,
    region:{
      latitude: latitudes,
      longitude: longitudes,
      latitudeDelta: 0.00092343,
      longitudeDelta: 0.00092343
    },
    coordinate: {
      latitude: latitudes,
      longitude: longitudes,
    }
   })
    //   var aw = [
    //     {
    //       coordinate: {
    //         latitude: 18.785834,
    //         longitude: 78.406417,
    //       },
    //       title: "Amazing Food Place",
    //       description: "This is the best food place",
    //       image: Images[0].image,
    //       rating: 4,
    //       reviews: 99,
    //     },
    //     {
    //       coordinate: {
    //         latitude: 17.585834,
    //         longitude: 78.406417,
    //       },
    //       title: "Second Amazing Food Place",
    //       description: "This is the second best food place",
    //       image: Images[1].image,
    //       rating: 5,
    //       reviews: 102,
    //     },
    //     {
    //       coordinate: {
    //         latitude: 17.385834,
    //         longitude: 78.406417,
    //       },
    //       title: "Third Amazing Food Place",
    //       description: "This is the third best food place",
    //       image: Images[2].image,
    //       rating: 3,
    //       reviews: 220,
    //     },
    //     {
    //       coordinate: {
    //         latitude: 17.285834,
    //         longitude: 78.406417,
    //       },
    //       title: "Fourth Amazing Food Place",
    //       description: "This is the fourth best food place",
    //       image: Images[3].image,
    //       rating: 4,
    //       reviews: 48,
    //     },
    //     {
    //       coordinate: {
    //         latitude: 17.485834,
    //         longitude: 78.406417,
    //       },
    //       title: "Fifth Amazing Food Place",
    //       description: "This is the fifth best food place",
    //       image: Images[3].image,
    //       rating: 4,
    //       reviews: 178,
    //     },
    //     {
    //       coordinate: {
    //         latitude: 17.485834,
    //         longitude: 78.406417,
    //       },
    //       title: "Fifth Amazing Food Place",
    //       description: "This is the fifth best food place",
    //       image: Images[3].image,
    //       rating: 4,
    //       reviews: 178,
    //     },
    //     {
    //       coordinate: {
    //         latitude: 17.485834,
    //         longitude: 78.406417,
    //       },
    //       title: "Fifth Amazing Food Place",
    //       description: "This is the fifth best food place",
    //       image: Images[3].image,
    //       rating: 4,
    //       reviews: 178,
    //     },
    //     {
    //       coordinate: {
    //         latitude: 17.485834,
    //         longitude: 78.406417,
    //       },
    //       title: "Fifth Amazing Food Place",
    //       description: "This is the fifth best food place",
    //       image: Images[3].image,
    //       rating: 4,
    //       reviews: 178,
    //     },
    //     {
    //       coordinate: {
    //         latitude: 17.485834,
    //         longitude: 78.406417,
    //       },
    //       title: "Fifth Amazing Food Place",
    //       description: "This is the fifth best food place",
    //       image: Images[3].image,
    //       rating: 4,
    //       reviews: 178,
    //     }
    // ];
    //   const newState = {
    //     aw,
    //     region: {
    //       latitude: 17.62938671242907,
    //       longitude: 78.4354486029795,
    //       latitudeDelta: 0.04864195044303443,
    //       longitudeDelta: 0.040142817690068,
    //     },
    //   };
    //   // var asd
    //   setState(newState)
    // console.log('HYHYHYHYH', newState)

  }
  const [mapDataOnMap,setMapDataHere] = useState([])
const [temperatureHere,setTemperatureHere] = useState('N/a')
  async function getMapImages(){
    var jwt  = await AsyncStorage.getItem('token');
    await axios.get(GLOBAL.BASE_URL+"user/getmap",{
      headers: {
        "Content-Type": "application/json",
        Authorization:
        'Bearer '+jwt
      },
    }).then((resp)=>{
      if(resp.data){
        dispatcher({type:"SETICONSFORMAP",temperature:resp.data[0].feelsLike,mapIcons:resp.data[0].coordinates,showEffect:resp.data[0].effectName})
        // console.log('DATA UUUU',resp.data[0].coordinates)
        setMapDataHere(resp.data[0].coordinates)
        setTemperatureHere(resp.data[0].feelsLike)
      }
      // console.log('DATA FOR MAPS',resp.data)
    }).catch((err)=>{
      console.log('ERROR IN GETTING MAP DATA',err)
    })
  }


  async function getUseEffectData(){
    getMarkersData(5)
    getMapImages()
  }
  useEffect(() => {
    // updateMyLocation()
   getUseEffectData()
  }, [])

  const [state, setState] = React.useState(initialMapState);
  const [category, setCategory] = React.useState('all');
  const [subCategory, setSubCategory] = React.useState('all');
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

async function getDataForPill(c,s){

  if(c == 'All'){
    setCategory('all')
    setSubCategory('all')
    // alert('Akk')
    getMarkersDatas(distance,'all','all')
    setSelectedPreference('All')
    // setSelectedPreference(s)
    // setCategory('All')
    // setSubCategory('All')
    // getMarkersData(5)
  }else{
    dispatcher({type:"SETEMPTY"})
    setSelectedPreference(s)
    setCategory(c)
    setSubCategory(s)
      getMarkersDatas(distance,c,s)
  }
  // alert(s)



}

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= ChatState.posts.length) {
        index = ChatState.posts.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = ChatState.posts[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: ChatState.region.latitudeDelta,
              longitudeDelta: ChatState.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });
  const _map = React.useRef(null);


  

  async function updateMyLocation(){
    alert('updated')
    await RNLocation.configure({
      distanceFilter: 5.0
    })
    await RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    }).then(async (granted) => {
      // alert('3')
        if (granted) {
          this.locationSubscription = RNLocation.subscribeToLocationUpdates(async locations => {
            await AsyncStorage.setItem('isLocationPermitted', String(true));
            await AsyncStorage.setItem('latitude', String(locations[0].latitude));
            await AsyncStorage.setItem('longitude', String(locations[0].longitude));
            await AsyncStorage.setItem('fromMockProvider', String(locations[0].fromMockProvider));
            // console.log(locations[0].latitude,locations[0].longitude)
            // updateLocation()
            var coordinate = {
              latitude: Number(locations[0].latitude),
              longitude: Number(locations[0].longitude),
            }
            _map.current.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: ChatState.region.latitudeDelta,
                longitudeDelta: ChatState.region.longitudeDelta,
              },
              350
            );
            dispatcher({type:'SETMYLOCATION',coordinate: {
              latitude: Number(locations[0].latitude),
              longitude: Number(locations[0].longitude),
            }})
            
          })
        }else{
          await AsyncStorage.setItem('isLocationPermitted', String(false));
          // navigation.navigate('SelectCityScreen',{preferences:preferencesss})
  
          console.log('Not Allowed')
        }
      })

 
  }
  async function focusMap(markers) {
    getUseEffectData()
    var lats = await AsyncStorage.getItem('latitude');
    var lons = await AsyncStorage.getItem('longitude');
    console.log('lll',lats,lons)
            // dispatcher({type:"SETEMPTY"})
            getMarkersData(5)
            // const { coordinate } = ChatState.region;
            // const  coordinate = [Number(lats),Number(lons)];
            var coordinate = {
              latitude: Number(lats),
              longitude: Number(lons),
            }
            console.log('ccc',coordinate)
            // console.log('',coordinate)
            _map.current.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: ChatState.region.latitudeDelta,
                longitudeDelta: ChatState.region.longitudeDelta,
              },
              350
            );
     
  
    // _map.current.animateToRegion(
    //   {
    //     ...coordinate,
    //     latitudeDelta: ChatState.region.latitudeDelta,
    //     longitudeDelta: ChatState.region.longitudeDelta,
    //   },
    //   350
    // );
    // _map.currentanimateToRegion(ChatState.region)
    // {"latitude": "17.40791218356753", "longitude": "78.44356139197801"}
    // var m = [...ChatState.coordinate]
    // console.log(ChatState.region)
    // console.log(`Markers received to populate map: ${ChatState.coordinate}`);
    // _map.fitToSuppliedMarkers([m], true);
  }

  const interpolations = ChatState.posts.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20);
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  }


  const _scrollView = React.useRef(null);
const [selectedRadius,setSelectedRadius] = useState(5000)
  return (
    <View style={styles.container}>
      {
           ChatState.showEffect == 'Snow'?
        <>
       <Snow  snowfall='medium' snowflakesStyle={{ color: 'blue'}}/>
        </>
        :
        <></>
      }
  
  
      {/* <View style={{position:'absolute'}}>
     <Text>Showing you nearby spaarks</Text>
     </View> */}
      <MapView
        ref={_map}
        initialRegion={ChatState.region}
        style={styles.container}
        // provider={PROVIDER_GOOGLE}
        customMapStyle={theme.dark ? mapDarkStyle : mapDarkStyle}
        // onLayout={() => { this.mark.showCallout(); }}
      >
   
        {
          ChatState.mapIcons.map((list, i) =>(
            <MapView.Marker key={'me'} coordinate={{
              latitude: list.latitude,
              longitude: list.longitude,
            }} pinColor={"green"} >
               <Image source={{uri: list.image }} style={{height:list.imageSize_h,width:list.imageSize_w}} />
               </MapView.Marker>
          ))
        }
         <MapView.Marker key={'me'} ref={ref => { this.mark = ref; }} coordinate={ChatState.coordinate} onPress={(e) => onMarkerPress(e)}  identifier="Marker1" pinColor={"blue"} title={I18n.t("Your Location")} identifier={"Your Location"} />
         <MapView.Circle center={ChatState.coordinate} radius={selectedRadius}
                          strokeWidth={0.5}
                strokeColor={'#448AFF'}
                fillColor={"#b3d9ff80"}
                color="#0080FF80"
                
 />
        {ChatState.posts.map((marker, index) => {
          if(index == 0){
          }else{
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}  identifier="Marker1" pinColor={"red"}  coordinate={marker.coordinate} />
            );
          }
    


        })}
      </MapView>
      <View style={styles.searchBox}>
        <View style={{flex:1,flexDirection:'row'}}>
        <TextInput
          placeholder={I18n.t("Showing you nearby posts")}
          placeholderTextColor="#000"
          autoCapitalize="words"
          editable={false}
          // onFocus={()=>navigation.navigate('SearchScreen')}
          style={{ flex: 1, padding: 0 }}
        />
        <View style={{ alignItems: 'center' }}>
          <View style={{ flexDirection: 'row',alignItems:'center' }}>
            {/* <Image source={require('../assets/maps.png')} style={{ height: 20, width: 20, marginLeft: 10 }} /> */}
            {/* <Text style={{ fontSize: 10, marginTop: 3 ,color:'#000',marginLeft:3}}>{distance}Km</Text> */}
            <ModalDropdown options={['1Km', '2Km','3Km','4Km','5Km']} keyboardShouldPersistTaps={"always"} textStyle={{fontSize:15,color:'#'}} defaultValue={distance+"Km"} dropdownStyle={{width:50,left:Dimensions.get('window').width-60,textAlign:'center',justifyContent:'center',alignItems:'center'}} onSelect={(val)=>sortByRadius(val+1)}/>
        
          </View>
         
          <View>
            <Text style={{ fontSize: 10,marginLeft:6,color:'#6FA4E9' }}>{I18n.t("Change")}</Text>
           
          </View>
        </View>
        </View>

       
      </View>
      <View style={{flex:0,position:'absolute',top:70,flexDirection:'row',marginLeft:10}}>
        {/* {
          !showChange?
          <View style={{position:'absolute',marginTop:50}}>
             <Text>Update Location</Text>
          </View>
         
          :
          <></>
        } */}

      </View>
      {
        Userpreferences.length>1?
        <View style={{flex:0,position:'absolute',top:70,flexDirection:'row',marginLeft:30}}>
            {/* <View
//              style={{
//     position: "absolute",
//   bottom: 240,
//   left: 0,
//   right: 0,
//   paddingVertical: 10,
// }}
>

  <Image source={{uri:'https://findicons.com/files/icons/2770/ios_7_icons/128/near_me.png'}} style={{height:30,width:30,marginTop:5,marginLeft:10}}/>
  </View> */}
        {/* <ScrollView
          horizontal={true}
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          height={40}
          style={styles.chipsScrollView}
          // contentContainerStyle={{
          //   paddingRight: Platform.OS === 'android' ? 20 : 5
          // }}
        >
          {Userpreferences.map((category, index) => (
            <TouchableOpacity key={index} style={styles.chipsItem}>
              <Text>{category.category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>  */}
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
                                                           
                                                <View style={{ margin: 3, marginBottom: 10,backgroundColor:selectedPreferences == item.subCategory?'#6FA4E9':'#fff',borderRadius:20,borderColor:'#fff',borderWidth:1 }}>
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
        :
        <></>
      }
<View>
<TouchableOpacity onPress={()=>focusMap()}>
<View style={{
    position: "absolute",
  bottom: 240,
  // left: 0,
  right: 10,
  // shadowColor:'#000000',
  // shadowRadius:3,
  // shadowColor: '#000000',
  // shadowOffset: {
  //   width: 0,
  //   height: 3
  // },
  // shadowRadius: 5,
  // shadowOpacity: 1.0,
  paddingVertical: 10,
}}>
  <Image source={require('../assets/loc.png')} style={{height:45,width:45,borderRadius:30}}/>
  </View>
  </TouchableOpacity>

  <TouchableOpacity onPress={()=>focusMap()}>
<View style={{
    position: "absolute",
  bottom: 560,
  borderRadius:20,
  padding:5,
  // left: 0,
  right: 10,
  backgroundColor:'#fff',
  // shadowColor:'#000000',
  // shadowRadius:3,
  // shadowColor: '#000000',
  // shadowOffset: {
  //   width: 0,
  //   height: 3
  // },
  // shadowRadius: 5,
  // shadowOpacity: 1.0,
  paddingVertical: 10,
}}>
  {/* <Image source={require('../assets/loc.png')} style={{height:50,width:50,borderRadius:30}}/> */}
  <Text>{Number(temperatureHere).toFixed(1)}{"°C"}</Text>
  </View>
  </TouchableOpacity>


  
{
  showChange?
  <TouchableOpacity onPress={()=>navigation.navigate('SelectCityScreen')}>
<View style={{
    position: "absolute",
  bottom: 300,
  // left: 0,
  right: 10,
  // shadowColor:'#000000',
  // shadowRadius:3,
  // shadowColor: '#000000',
  // shadowOffset: {
  //   width: 0,
  //   height: 3
  // },
  // shadowRadius: 5,
  // shadowOpacity: 1.0,
  paddingVertical: 10,
}}>
  <View>
  <Image source={require('../assets/change_loc.png')} style={{height:45,width:45,borderRadius:30,padding:5}}/>
  </View>

  </View>
  </TouchableOpacity>
  :
  <></>
}
  
 
</View>

      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {
          ChatState.posts.length>0?
        ChatState.posts.map((item, index) => (

<>

{
  item.isPost?
<>
<View style={styles.card} key={index}>
<View style={{flex:4}}>

  <View style={{flex:4,borderRadius:10,overflow: 'hidden'}}>

  <ImageBackground source={require('../assets/map_card_bg.png')} resizeMode="cover" style={{ flex: 1,
    justifyContent: "center",overflow: 'hidden'}} onPress={() => navigation.navigate('PostSpecificScreens', { post: item.item })
  }>
<Image
              source={{ uri: item.item.uservisibility.profilePic }}
              style={styles.cardImage}
              resizeMode="contain"

/>
</ImageBackground>

</View>

</View>

<View style={{flex:2,padding:10,backgroundColor:'#fff'}}>
<View style={{ flexDirection: 'row' }}>

                <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => navigation.navigate('PostSpecificScreens', { post: item.item })
                } style={{ backgroundColor: "#fff" }}>
                  <Text numberOfLines={1} style={{ margin: 0, fontWeight: 'bold' }} >{item.item.uservisibility.name} </Text>
                  </TouchableOpacity>
                </View>
           
                <View style={{ flex: 0, backgroundColor: "#f8f9fb", borderRadius: 10 }}>
                  {
                    item.item.distance && item.item.distance.toFixed(2) < 1000 ?
                      <Text style={{ margin: 0, marginBottom: 5, fontWeight: 'bold' }}> <Image source={require('../assets/icons/distance.png')} style={{ height: 15, width: 15 }}></Image> {item.item.distance && item.item.distance.toFixed(1)}m</Text> :
                      <Text style={{ margin: 0, marginBottom: 5, fontWeight: 'bold' }}> <Image source={require('../assets/icons/distance.png')} style={{ height: 15, width: 15 }}></Image> {(item.item.distance / 1000).toFixed(1)} km  </Text>
                  }
                </View>


              </View>

              <View style={{ flexDirection: 'row' }}>

                <View style={{ flexDirection: 'row' }}>
                  {
                    item.item.tags != undefined && item.item.tags.length > 0 ?
                      item.item.tags.map((list, i) =>

                        <View style={{ borderColor: list.color, padding: 5, borderRadius: 10, borderWidth: 1, flexWrap: 'nowrap' }}>
                                  <TouchableOpacity onPress={() => navigation.navigate('PostSpecificScreens', { post: item.item })
                } style={{ backgroundColor: "#fff" }}>
                          <Text
                            style={{
                              color: list.color,
                              marginTop: 0,
                              fontSize: 10,
                            }}
                          >
                            {I18n.t(list.name)}
                            {/* {list.name} */}
                          </Text>
                          </TouchableOpacity>
                        </View>
                      ) : <></>

                  }
                </View>


                <TouchableOpacity onPress={() => navigation.navigate('PostSpecificScreens', { post: item.item })
                } style={{ backgroundColor: "#fff" }}>

                  {
                    item.item.featureName == 'market' && item.item.reviews && item.item.reviews.length > 0 ?
                      <View style={{ flex: 0, backgroundColor: "#f8f9fb", borderRadius: 10 }}>
                        <Text style={{ margin: 0, marginBottom: 5, fontWeight: 'bold' }}> <Image source={require('../assets/icons/ratings.png')} style={{ height: 15, width: 15 }}></Image> {item.item.reviews[0].rating}.0  </Text>
                      </View> : <></>
                  }
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('PostSpecificScreens', { post: item.item })
              } style={{ backgroundColor: "#fff" }}>
                <View style={{ height: 30 }}>
                  <Text style={{ margin: 5 }} numberOfLines={1}>{item.item.content}</Text>
                </View>
              </TouchableOpacity>

</View>



<View style={{flex:1,marginTop:0}}>
<View
                style={{
                  marginTop: 2,
                  marginLeft: 0,
                  marginRight: 0,
                  borderBottomColor: 'black',
                  borderBottomWidth: 0.2,
                }}
              />
              {/*  */}
              <View style={{ flexDirection: 'row', margin: 5, marginTop: 5, alignSelf: 'flex-start', }}>
                <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${item.item.locationStatic.coordinates[1]},${item.item.locationStatic.coordinates[0]}`)
                } style={{ backgroundColor: "#fff" }}>
                  <View>

                    <Text style={{ justifyContent: 'center', textAlign: 'center', color: '#6FA4E9', fontWeight: 'bold', marginBottom: 10, height: 15 }}><Image source={require('../assets/icons/directions.png')} style={{ height: 25, width: 25 }}></Image> {I18n.t("Show Directions")}</Text>

                  </View>
                </TouchableOpacity>
                {/* {
               
             } */}
                <View>
                  {
                    item.item.myshares.length>0?
                    <Text style={{ justifyContent: 'center', textAlign: 'center', color: '#6FA4E9', fontWeight: 'bold', marginBottom: 5, height: 30, marginLeft: 70 }}>{item.item && item.item.myshares.length > 0 && item.item.myshares[0].shares != undefined && item.item.myshares[0].shares} {I18n.t("Shares")}</Text>

                    :
                    <Text style={{ justifyContent: 'center', textAlign: 'center', color: '#6FA4E9', fontWeight: 'bold', marginBottom: 5, height: 30, marginLeft: 70 }}>0 {I18n.t("Shares")}</Text>

                  }
                </View>
              </View>

</View>

</View>
</>
:
<>
<View style={styles.cards} key={index}>

<View style={{flex:4}}>

  <View style={{flex:1,overflow: 'hidden',flexDirection:'row'}}>
    <View>
    <Image
              source={{uri:profilePic}}
              style={{flex: 0,
                width: 80,
                borderRadius:20,
                height: 80,
                top:20,
                left:30
                }}
              // resizeMode="contain"

/>
    </View>
<View style={{flex:0,top:55,left:40}}>
<Text style={{color:'#fff'}}>|</Text>
</View>
<View style={{flex:0,top:55,left:50}}>
<Text style={{color:'#fff'}}>Explore Nearby</Text>
</View>
{/* <View style={{flex:0,top:30,left:70,height:100}}>
<Text style={{color:'#fff'}}>Explore Nearby</Text>
</View> */}
</View>

</View>

<View style={{flex:2,padding:10,backgroundColor:'#fff'}}>
  
<View style={{ flexDirection: 'row' }}>

                <View style={{ flex: 1 }}>
                {/* <TouchableOpacity onPress={() => navigation.navigate('PostSpecificScreens', { post: item.item })
                } style={{ backgroundColor: "#fff" }}> */}
                  {/* <Text numberOfLines={1} style={{ margin: 0, fontWeight: 'bold' }} >{"You are here"} </Text> */}
                  {/* </TouchableOpacity> */}
                </View>
           
                


              </View>

      
              {/* <TouchableOpacity onPress={() => navigation.navigate('PostSpecificScreens', { post: item.item })
              } style={{ backgroundColor: "#fff" }}> */}
                <View style={{ height: 70 }}>
                  {/* <Text style={{ margin: 0 }} numberOfLines={1}>{"Explore description Explore description Explore description"}</Text> */}
                  <Text style={{ margin: 0 }} numberOfLines={1}>{"Map shows where you are."}</Text>
                  <Text style={{ margin: 0 }} numberOfLines={1}>{"Swipe left and explore Spaarks near you."}</Text>
                  
<View style={{flexDirection:'row'}}>
<Text style={{ marginTop: 26}}>How Explore Works. </Text><TouchableOpacity onPress={()=>navigation.navigate('ExploreNearby')}><Text style={{ marginTop: 26,color:'#64cdff' }} numberOfLines={1}>{"Learn More."}</Text></TouchableOpacity>

</View>
                </View>
              {/* </TouchableOpacity> */}

</View>



</View>


</>
                }  
       </>
       
          // </View>

        ))
        :
        <>
        {/* <View style={{backgroundColor:'#fff',width:'100%',padding:5,marginLeft:0,justifyContent:'center',marginTop:40,marginBottom:-5}}>
          <Text style={{textAlign:'center',marginLeft:-10,justifyContent:'center'}}>No Posts found nearby in {subCategory}</Text>
        </View> */}
        </>
        }
      </Animated.ScrollView>
      <View>
        {
          ChatState.posts.length == 0?
          <View style={{backgroundColor:'#fff',width:'100%',padding:5,marginLeft:0,justifyContent:'center'}}>
          <Text style={{textAlign:'center',marginLeft:-10,justifyContent:'center'}}>No Posts found nearby in {subCategory}</Text>
        </View> 
        :
        <></>
        }
      </View>
    </View>
  );
};

const mapStatetoProps = (state) => {
  // const { }=state
  
  return {
    Userpreferences:state.chatss.preferences,
    selectedPreference:state.chatss.selectedPreference,
    token:state.chatss.token,
    profilePic:state.chatss.profilePic
  };
};
export default connect(mapStatetoProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 10 : 20,
    // flexDirection: "row",
    backgroundColor: '#fff',
    width: '95%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 18 : 80,
    paddingHorizontal: 5,
    marginLeft:-15
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 10,
    marginHorizontal: 2,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 1,
    // borderColor:'#000',borderWidth:1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 230,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cards: {
    // padding: 10,
    elevation: 1,
    backgroundColor:'#6fa4e9',
    // borderWidth:1,
    // backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 230,
    width: CARD_WIDTH ,
    overflow: "hidden",
  },
  cardImage: {
    flex: 2,
    // backgroundColor:'#6FA4E9',
    width: 120,
    borderRadius:80,
    height: 130,
    alignSelf: "center",
    // overflow: 'hidden'
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});