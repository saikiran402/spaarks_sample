
import React, { useEffect, setState, useRef, useState } from "react";
import { TabRouter, useTheme } from "@react-navigation/native";
import {
  Share,
  Image,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  LogBox,
  Linking,
  FlatList,
  RefreshControl,
  Dimensions
} from "react-native";

import Slider from '@react-native-community/slider';
const GLOBAL = require('../Globals');
import Hyperlink from 'react-native-hyperlink'
import RNLocation from 'react-native-location';
import RNUrlPreview from 'react-native-url-preview';
import RNCallKeep from 'react-native-callkeep';
import axios from "axios";
import JsSIP from 'jssip'
import SpaarksHeading from "../components/SpaarksHeading"
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import ViewShot from "react-native-view-shot";
import { Rating, AirbnbRating, Divider } from "react-native-elements";
import { canPost } from './authGuard'
import { connect, useDispatch, useReducer } from "react-redux";
import { connectXMPP, addListenerssss, getRosterMain, setMess } from './xmpp';
import chatReducers from "../reducers/chatReducers";
import { callKeepSetup, handleAPNs, handleConnect } from './OutGoingCallScreen'
LogBox.ignoreAllLogs();
import Video from 'react-native-video';
import moment from "moment";
import Carousel from 'react-native-snap-carousel';
import { Text, BottomSheet, ListItem } from "react-native-elements";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { checkNotifications } from 'react-native-permissions';
import AsyncStorage from "@react-native-community/async-storage";
import PostCard from "../components/PostCard";
import { useScrollToTop } from '@react-navigation/native';


const isIOS = Platform.OS === 'ios';

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
import I18n from '../src/i18n';
import FilterComponent from '../components/FilterComponent'
const Stack = createStackNavigator();
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};




const indexes = [4, 8, 12, 16, 20, 24]
global.postcurrent = ['0'];
global.type = 'within';

const SayHiiScreen = ({ navigation, isConnected, token, chat_roster_main, allMapPosts, distance, sortBy, sortApplied }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRating, setCurrentRating] = useState([]);
  const viewShotRef = useRef();
  const refRBSheet = useRef();
  const refRBSheets = useRef();
  const refRBSheetss = useRef();
  const Login = useRef();
  const deleteMyPost = useRef();
  const [phone, setPhone] = React.useState('');
  const [loading, setLoading] = useState(true);
  const [dataSourceWithin, setDataSourceWithin] = useState([]);
  const [dataSourceBeyond, setDataSourceBeyond] = useState([]);
  const [offsetBeyond, setOffsetBeyond] = useState(1);
  const [offsetWithin, setOffsetWithin] = useState(1);
  const [pendingRatings, setPendingRatings] = useState([]);
  const [pendingWorks, setPendingWorks] = useState([]);
  const [extraThings, setExtraThings] = useState(true)
  const Chatdispatcher = useDispatch(chatReducers);
  const [currentPageBeyondLength, setCurrentPageBeyondLength] = useState(0);
  const [currentpageWithinLength, setCurrentPageWithinLength] = useState(1);
  const ref = React.useRef(null);
  const listRef = useRef(null);
  const refRBsheettt = useRef();
  const [sortBys, setSortBy] = useState(true)
  const [sortByString, setSortByString] = useState('Distance')
  const [sortedDistance, setsortedDistance] = useState(5);
  const [finalDistance, setFinalDistance] = useState(5);
  

  useScrollToTop(ref);
  async function setSortBys(a) {
    if (a) {
      setSortBy(true)
      setSortByString('Distance')
    } else {
      setSortBy(false)
      setSortByString('Time')
    }

  }

  async function sortNow() {
    if (isConnected) {
      // alert('Sorting')
      setFinalDistance(sortedDistance)
      refRBsheettt.current.close()
      setOffsetWithin(2)
      setOffsetBeyond(2)
      setDataSourceWithin([])
      setDataSourceBeyond([])
      getDataWithinOnRefresh()
      getDataBeyondOnRefresh()


    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }
  }


  const getDataWithinOnRefresh = async () => {
    if (isConnected) {
      var latitudes = await AsyncStorage.getItem('latitude');
      var longitudes = await AsyncStorage.getItem('longitude');
      var jwt = await AsyncStorage.getItem('token');
      setLoading(true);
      if (String(jwt) != "null") {
        await axios.post(
          GLOBAL.BASE_URL + "greet/post/static/within",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": "all",
            "page": 1,
            "radius": finalDistance,
            "sortBy": sortByString

          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                'Bearer ' + jwt
            },
          }
        ).then((responseJson) => {
          //Successful response from the API Call
          setOffsetWithin(2);
          if (responseJson.data.data.post.length == 0) {
            setLoadMoreWithin(false)
          }
          console.log('responseJson', responseJson.data.data.post)
          //After the response increasing the offset for the next API call.
          setDataSourceWithin([...responseJson.data.data.post]);
          setLoading(false);
        })
          .catch((error) => {
            console.error(error);
          });
      } else {
        await axios.post(
          GLOBAL.BASE_URL + "greet/post/static/within",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": "all",
            "page": 1,
            "radius": finalDistance,
            "sortBy": sortByString
          }
        ).then((responseJson) => {
          //Successful response from the API Call
          setOffsetWithin(2);
          if (responseJson.data.data.post.length == 0) {
            setLoadMoreWithin(false)
          }
          console.log('responseJson', responseJson.data.data.post)
          //After the response increasing the offset for the next API call.
          setDataSourceWithin([...responseJson.data.data.post]);
          setLoading(false);
        })
          .catch((error) => {
            console.error(error);
          });
      }

    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }

  };

  const getDataBeyondOnRefresh = async () => {

    if (isConnected) {
      var latitudes = await AsyncStorage.getItem('latitude');
      var longitudes = await AsyncStorage.getItem('longitude');
      var jwt = await AsyncStorage.getItem('token');
      if (String(jwt) != "null") {
        setLoading(true);
        await axios.post(
          GLOBAL.BASE_URL + "greet/post/static/beyond",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": 'all',
            "page": 1,
            "radius": finalDistance,
            "sortBy": sortByString
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
            //Successful response from the API Call
            setOffsetBeyond(1);
            if (responseJson.data.data.post.length == 0) {
              setLoadMoreBeyond(false)
            }
            console.log('responseJson', responseJson.data.data.post)
            //After the response increasing the offset for the next API call.
            setDataSourceBeyond([...responseJson.data.data.post]);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setLoading(true);
        await axios.post(
          GLOBAL.BASE_URL + "user/post/static/beyond",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": 'all',
            "page": offsetBeyond,
            "radius": finalDistance,
            "sortBy": sortByString
          }
        )
          .then((responseJson) => {
            //Successful response from the API Call
            setOffsetBeyond(1);
            if (responseJson.data.data.post.length == 0) {
              setLoadMoreBeyond(false)
            }
            console.log('responseJson', responseJson.data.data.post)
            //After the response increasing the offset for the next API call.
            setDataSourceBeyond([...responseJson.data.data.post]);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }

    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }

  };
 

  const getDataWithinOnRefreshSort = async (dist,type) => {
    if (isConnected) {
      var latitudes = await AsyncStorage.getItem('latitude');
      var longitudes = await AsyncStorage.getItem('longitude');
      var jwt = await AsyncStorage.getItem('token');
      setLoading(true);
      if (String(jwt) != "null") {
        // alert(sortedDistance)
        // alert(sortByString)
        await axios.post(
          GLOBAL.BASE_URL + "greet/post/static/within",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": "all",
            "page": 1,
            "radius": dist,
            "sortBy": type

          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                'Bearer ' + jwt
            },
          }
        ).then((responseJson) => {
          //Successful response from the API Call
          setOffsetWithin(2);
          if (responseJson.data.data.post.length == 0) {
            setLoadMoreWithin(false)
          }
          console.log('responseJson', responseJson.data.data.post)
          //After the response increasing the offset for the next API call.
          setDataSourceWithin([...responseJson.data.data.post]);
          setLoading(false);
        })
          .catch((error) => {
            console.error(error);
          });
      } else {
        await axios.post(
          GLOBAL.BASE_URL + "greet/post/static/within",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": "all",
            "page": 1,
            "radius": dist,
            "sortBy": type
          }
        ).then((responseJson) => {
          //Successful response from the API Call
          setOffsetWithin(2);
          if (responseJson.data.data.post.length == 0) {
            setLoadMoreWithin(false)
          }
          console.log('responseJson', responseJson.data.data.post)
          //After the response increasing the offset for the next API call.
          setDataSourceWithin([...responseJson.data.data.post]);
          setLoading(false);
        })
          .catch((error) => {
            console.error(error);
          });
      }

    } else {
      Snackbar.show({
        text: 'Check your internet connection',
        duration: Snackbar.LENGTH_LONG
      });
    }

  };

  const getDataBeyondOnRefreshSort = async (dist,type) => {

    if (isConnected) {
      var latitudes = await AsyncStorage.getItem('latitude');
      var longitudes = await AsyncStorage.getItem('longitude');
      var jwt = await AsyncStorage.getItem('token');
      if (String(jwt) != "null") {
        setLoading(true);
        await axios.post(
          GLOBAL.BASE_URL + "greet/post/static/beyond",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": 'all',
            "page": 1,
            "radius": sortedDistance,
            "sortBy": sortByString
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
            //Successful response from the API Call
            setOffsetBeyond(1);
            if (responseJson.data.data.post.length == 0) {
              setLoadMoreBeyond(false)
            }
            console.log('responseJson', responseJson.data.data.post)
            //After the response increasing the offset for the next API call.
            setDataSourceBeyond([...responseJson.data.data.post]);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setLoading(true);
        await axios.post(
          GLOBAL.BASE_URL + "greet/post/static/beyond",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": 'all',
            "page": offsetBeyond,
            "radius": dist,
            "sortBy": type
          }
        )
          .then((responseJson) => {
            //Successful response from the API Call
            setOffsetBeyond(1);
            if (responseJson.data.data.post.length == 0) {
              setLoadMoreBeyond(false)
            }
            console.log('responseJson', responseJson.data.data.post)
            //After the response increasing the offset for the next API call.
            setDataSourceBeyond([...responseJson.data.data.post]);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }

    } else {
      Snackbar.show({
        text: 'Check your internet connection',
        duration: Snackbar.LENGTH_LONG
      });
    }

  };


  if (sortApplied) {
    // Chatdispatcher({type:'SETSORTCHANGED',sortApplied:false})
    setTimeout(() => {
      // alert('Sort Changed from Market')
      setOffsetWithin(1)
      setOffsetBeyond(1)

      setDataSourceWithin([])
      setDataSourceBeyond([])

      getDataWithin(1)
      getDataBeyond(1)

    }, 1000);


  }



  const openFilter = ({}) =>{
    return(
      <FilterComponent/>
    )
  }
  // async function openFilter() {
  //   // registerCalls()
  //   // showCount()
  //   alert('open')
  //   return(
  //   <FilterComponent/>
  //   )
  //   // return(
  //   // render(
      
  //   // )
  //   // )
  //   // refRBsheettt.current.open()
  // }
  const getDataWithin = async () => {
    var latitudes = await AsyncStorage.getItem('latitude');
    var longitudes = await AsyncStorage.getItem('longitude');
    var jwt = await AsyncStorage.getItem('token');
    if (String(jwt) != "null") {
      console.log('getData');
      setLoading(true);
      // alert(offsetWithin)
      await axios.post(
        GLOBAL.BASE_URL + "greet/post/static/within",
        {
          "latitude": Number(latitudes),
          "longitude": Number(longitudes),
          "category": "all",
          "page": offsetWithin,
          "radius": sortedDistance,
          "sortBy": sortByString
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
          setBanners(responseJson.data.data.bannersNew)
          //Successful response from the API Call
          setOffsetWithin(offsetWithin + 1);
          console.log('responseJson', responseJson.data.data.post)
          //After the response increasing the offset for the next API call.
          setDataSourceWithin([...dataSourceWithin, ...responseJson.data.data.post]);
          setCurrentPageWithinLength(responseJson.data.data.post.length)
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });

    } else {
      await axios.post(
        GLOBAL.BASE_URL + "greet/post/static/within",
        {
          "latitude": Number(latitudes),
          "longitude": Number(longitudes),
          "category": "all",
          "page": offsetWithin,
          "radius": sortedDistance,
          "sortBy": sortByString
        }
      )
        .then((responseJson) => {
          //Successful response from the API Call
          setOffsetWithin(offsetWithin + 1);
          console.log('responseJson', responseJson.data.data.post)
          //After the response increasing the offset for the next API call.
          setDataSourceWithin([...dataSourceWithin, ...responseJson.data.data.post]);
          setCurrentPageWithinLength(responseJson.data.data.post.length)
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }


  };

  const getDataBeyond = async () => {
    var latitudes = await AsyncStorage.getItem('latitude');
    var longitudes = await AsyncStorage.getItem('longitude');
    console.log('getData');
    var jwt = await AsyncStorage.getItem('token');
    if (String(jwt) != "null") {
      setLoading(true);
      // alert('offsetBeyond',offsetBeyond)
      await axios.post(
        GLOBAL.BASE_URL + "greet/post/static/beyond",
        {
          "latitude": Number(latitudes),
          "longitude": Number(longitudes),
          "category": "all",
          "page": offsetBeyond,
          "radius": sortedDistance,
          "sortBy": sortByString
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
          setBanners(responseJson.data.data.bannersNew)
          // alert(responseJson.data.data.post.length)
          setCurrentPageBeyondLength(responseJson.data.data.post.length)
          //Successful response from the API Call
          setOffsetBeyond(offsetBeyond + 1);
          console.log('responseJson', responseJson.data.data.post)
          //After the response increasing the offset for the next API call.
          setDataSourceBeyond([...dataSourceBeyond, ...responseJson.data.data.post]);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });

    } else {
      await axios.post(
        GLOBAL.BASE_URL + "greet/post/static/beyond",
        {
          "latitude": Number(latitudes),
          "longitude": Number(longitudes),
          "category": "all",
          "page": offsetBeyond,
          "radius": distance,
          "sortBy": sortBy
        }
      )
        .then((responseJson) => {
          // alert(responseJson.data.data.post.length)
          setCurrentPageBeyondLength(responseJson.data.data.post.length)
          //Successful response from the API Call
          setOffsetBeyond(offsetBeyond + 1);
          console.log('responseJson', responseJson.data.data.post)
          //After the response increasing the offset for the next API call.
          setDataSourceBeyond([...dataSourceBeyond, ...responseJson.data.data.post]);
          setLoading(false);
        }).catch((error) => {
          console.error(error);
        });
    }
  };

  const renderPostCard = ({ item, index }) => {
    return (
      <PostCard
        item={item}
        index={index}
        banners={banners}
        showBanner={false}
        navigation={navigation} />
    )
  }

  const [banners, setBanners] = useState([]);
  async function getData() {
    var latitudes = await AsyncStorage.getItem('latitude');
    var longitudes = await AsyncStorage.getItem('longitude');

    try {
      var a = await axios.post(`${GLOBAL.BASE_URL}greet/post/static`, {
        "latitude": Number(latitudes),
        "longitude": Number(longitudes),
        "radius": 1000
      }, {});

      setBanners(a.data.data.bannersNew)
      var finalPosts = [];
      var total = 30;
      var remaining = 30 - a.data.data.post.slice(0, 30).length;
      if (remaining > 0) {
        finalPosts = [...a.data.data.post.slice(0, 30), ...a.data.data.postBeyond.slice(0, remaining)]
      }
      Chatdispatcher({ type: 'SETMAPPOSTSFRIENDS', friendsMapPosts: finalPosts })
      // console.log("showtime",a.data)
      // dispatch({ type: 'SETPOSTS', posts: a.data.data.post });
      // setPosts(a.data.data.post.reverse());
      // Chatdispatcher({ type: 'SETMAPPOSTSANNOUNCE',announceMapPosts:finalPosts})
      // setIsLoading(false);
    } catch (e) {
      console.log("in error", e);
    }
  }
  useEffect(() => {
    getData()
    getDataWithin()
    getDataBeyond()
  }, []);


  if (sortApplied) {

    setTimeout(() => {

      setOffsetWithin(1)
      setOffsetBeyond(1)
      setDataSourceWithin([])
      setDataSourceBeyond([])
      getDataWithin(1)
      getDataBeyond(1)
    }, 1000);


  }


  function onLogin(phone) {
    console.log("phoness", phone)
    Login.current.close();
    navigation.navigate('VerifyOtpScreen', { phone: phone })
  }

  const renderFooterWithin = () => {
    return (
      //Footer View with {I18n.t("Load More")} button
      <View style={styles.footer}>
        {
          currentpageWithinLength > 0 ?
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
            : <Text style={{ textAlign: 'center' }}>{I18n.t("No Spaarks around")}</Text>
        }
      </View>
    );
  };

  const renderFooterBeyond = () => {
    return (
      //Footer View with {I18n.t("Load More")} button
      <View style={styles.footer}>
        {
          currentPageBeyondLength >= 20 ?


            <TouchableOpacity
              activeOpacity={0.9}
              onPress={getDataBeyond}
            //On Click of button calling getData function to {I18n.t("Load More")} data
            >
              <Text style={styles.btnText}>{I18n.t("Load More")}</Text>
              {loading ? (
                <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
            : <Text style={{ textAlign: 'center' }}>{I18n.t("No Spaarks")}</Text>
        }
      </View>
    );
  };

  const ItemViewBeyond = ({ item, index }) => {
    return (


      indexes.includes(index) ?
        <View style={{ margin: 0 }}>
          {
            banners[index / 4 - 1] ?
              <Image source={{ uri: banners[index / 4 - 1] }} style={{ height: 170, width: Dimensions.get('window').width, resizeMode: 'contain' }}></Image>
              : <></>
          }


        </View> :

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

                                {
                                  item.reviews.length > 0 ?

                                    <Text>{item.reviews[0].rating}/5</Text>
                                    : <></>

                                }
                              </Text>
                            </View>
                            <View style={{ flex: 8 }}>

                              {
                                item.reviews.length > 0 ?
                                  <Rating
                                    fractions="1"
                                    ratingColor="#f2f2f2"
                                    tintColor="#fff"
                                    startingValue={item.reviews[0].rating}
                                    imageSize={22}
                                    style={{
                                      marginTop: 0,
                                      backgroundColor: "#fff",
                                      marginRight: 15,
                                    }}
                                  />
                                  : <Text>0.0/5</Text>
                              }
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
                          <View style={{ flex: 9, flexDirection: 'row' }}>

                            <View style={{ flex: 2, paddingTop: 5 }}>
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
                            <View style={{ flex: 1, marginTop: 8 }}>
                              <Text style={{ color: '#f2f2f2', fontWeight: 'bold' }}>|</Text>
                            </View>
                            <View style={{ flex: 2 }}>

                              <Text
                                style={{ fontSize: 13, marginTop: 0, color: "#6FA4E9" }}
                              >
                                <Image source={require('../assets/marketProfile.png')} style={{ height: 15, width: 15, marginTop: 10 }} /> {I18n.t("View Seller Profile")}
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
                          <Hyperlink linkDefault={true} linkStyle={{ color: '#6FA4E9' }}>
                            <Text style={{ fontSize: 15, paddingTop: 10 }} numberOfLines={5}>
                              {item.content}
                            </Text>
                          </Hyperlink>
                          {item.content.length > 100 ? (
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("PostSpecificScreensFeed", {
                                  post: item,
                                  naviga: 'Market'
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
                      <RNUrlPreview text={item.content} />
                    </View>
                  </View>
                </View>
                {

                  item.photo.length > 0 ?

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>

                      {
                        item.video.length > 0 ?
                          <FlatList
                            data={[item.video, ...item.photo]}
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
                                    <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceBeyond[index].photos }) }}>
                                      <Image source={{ uri: item }} cache="force-cache" style={{
                                        width: Dimensions.get('window').width,
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
                                    <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceBeyond[index].photos }) }}>
                                      <Image source={{ uri: item }} cache="force-cache" style={{
                                        width: Dimensions.get('window').width,
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
                    : item.video.length > 0 ?
                      <View style={{ marginRight: 10 }}>

                        <Video source={{ uri: item.video[0] }}   // Can be a URL or a local file.
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
                <View style={{ backgroundColor: "#fff", height: "auto" }}>
                  <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("PostSpecificScreensFeed", {
                            post: item,
                            naviga: 'Market'
                          })
                          // navigation.navigate('ViewImages')
                        }
                        style={{ backgroundColor: "#fff" }}
                      >
                        <Text style={{ color: "#6FA4E9", paddingLeft: 10, fontSize: 12 }}>
                          {item.subposts.length} Comments
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("PostSpecificScreensFeed", {
                            post: item,
                            naviga: 'All'
                          })
                        }
                        style={{ backgroundColor: "#fff" }}
                      >
                        {
                          item.viewedUsers.length > 1000 ?
                            <Text style={{ color: "#6FA4E9", paddingLeft: 40, fontSize: 12, alignItems: 'flex-end' }}>{(item.viewedUsers.length / 1000).toFixed(1)}k Views</Text> :
                            <Text style={{ color: "#6FA4E9", paddingLeft: 40, fontSize: 12 }}>{item.viewedUsers.length} Views</Text>
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
                        <Text style={{ color: "#6FA4E9", paddingLeft: 50, fontSize: 12 }}>{item.subposts.length} Reviews</Text>
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
                      item.uservisibility.phoneCall ?
                        <TouchableOpacity onPress={() => { handleOutgoingCall(item.aid, navigation, item) }}>
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
                      item.uservisibility.chat ?
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
                        item.uservisibility.location ?
                          <>

                            {
                              String(item.distance) != 'undefined' ?
                                item.distance && item.distance.toFixed(2) < 1000 ?
                                  <>
                                    <Image
                                      source={{ uri: 'https://res.cloudinary.com/spaarks/image/upload/v1624444708/Screenshot_2021-06-23_at_4.06.45_PM_iddjxf.png' }}
                                      style={styles.chats} onPress={() =>
                                        selectedPostMap(item, 'beyond')
                                      }
                                    ></Image>
                                    <Text style={{ fontSize: 14, marginTop: 10, color: '#6FA4E9' }}>{item.distance.toFixed(0)} m</Text>
                                  </> :
                                  // item.distance && item.distance.toFixed(2) > 1000?
                                  <><Image
                                    source={{ uri: 'https://res.cloudinary.com/spaarks/image/upload/v1624444708/Screenshot_2021-06-23_at_4.06.45_PM_iddjxf.png' }}
                                    style={styles.chats} onPress={() =>
                                      selectedPostMap(item, 'beyond')
                                    }
                                  ></Image>
                                    <Text style={{ fontSize: 14, marginTop: 10, color: '#6FA4E9' }}>{(item.distance / 1000).toFixed(1)} Km </Text>
                                  </>
                                : <></>

                            }

                          </>
                          :
                          <>

                          </>
                      }



                    </View>
                    <TouchableOpacity onPress={() => WhatsAppShare(item)}>
                      <View style={{ flexDirection: 'row' }}>
                        <Image
                          source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png' }}
                          style={styles.chats}
                        ></Image>
                        {
                          item.myshares.length > 0 ?
                            <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 12, fontWeight: 'bold', color: '#6FA4E9' }}>{item.myshares[0].shares}</Text> :
                            <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 12, fontWeight: 'bold', color: '#6FA4E9' }}>0</Text>
                        }
                      </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column' }}>
                      <TouchableOpacity
                        onPress={() => onLike(index, 'beyond')}
                      >

                        {
                          item.Iliked == true ?
                            <Image
                              source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.17_PM_gudcen.png' }}
                              style={{ height: 25, width: 25, margin: 23, }}
                            ></Image>
                            :
                            <Image
                              source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044952/Screenshot_2021-05-26_at_9.31.09_PM_qsntda.png' }}
                              style={{ height: 25, width: 25, margin: 23, }}
                            ></Image>
                        }

                        <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{item.likes.length}</Text>
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
                          <Hyperlink linkDefault={true} linkStyle={{ color: '#6FA4E9' }}>
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
                    <RNUrlPreview text={item.content} />
                  </View>
                </View>
              </View>
              {

                item.photo.length > 0 ?

                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>

                    {
                      item.video.length > 0 ?
                        <FlatList
                          data={[item.video, ...item.photo]}
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
                                  <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceBeyond[index].photos }) }}>
                                    <Image source={{ uri: item }} cache="force-cache" style={{
                                      width: Dimensions.get('window').width,
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
                                  <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceBeyond[index].photos }) }}>
                                    <Image source={{ uri: item }} cache="force-cache" style={{
                                      width: Dimensions.get('window').width,
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
                  : item.video.length > 0 ?
                    <View style={{ marginRight: 10 }}>

                      <Video source={{ uri: item.video[0] }}   // Can be a URL or a local file.
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
              <View style={{ backgroundColor: "#fff", height: "auto" }}>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("PostSpecificScreensFeed", {
                          post: item,
                          naviga: 'All'
                        })
                      }
                      style={{ backgroundColor: "#fff" }}
                    >
                      <Text style={{ color: "#6FA4E9", paddingLeft: 10, fontSize: 12 }}>
                        {item.subposts.length} Comments
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flex: 0 }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("PostSpecificScreensFeed", {
                          post: item,
                          naviga: 'All'
                        })
                      }
                      style={{ backgroundColor: "#fff" }}
                    >
                      {
                        item.viewedUsers.length > 1000 ?
                          <Text style={{ color: '#6FA4E9', fontSize: 12 }}>{(item.viewedUsers.length / 1000).toFixed(1)}k Views</Text> :
                          <Text style={{ color: '#6FA4E9', fontSize: 12 }}>{item.viewedUsers.length} Views</Text>
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
                    item.uservisibility.phoneCall ?
                      <TouchableOpacity onPress={() => { handleOutgoingCall(item.aid, navigation, item) }}>
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
                    item.uservisibility.chat ?
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
                              }
                                       */}

                    {
                      item.uservisibility.location ?
                        <>

                          {
                            String(item.distance) != 'undefined' ?
                              item.distance && item.distance.toFixed(2) < 1000 ?
                                <>
                                  <Image
                                    source={{ uri: 'https://res.cloudinary.com/spaarks/image/upload/v1624444708/Screenshot_2021-06-23_at_4.06.45_PM_iddjxf.png' }}
                                    style={styles.chats} onPress={() =>
                                      selectedPostMap(item, 'beyond')
                                    }
                                  ></Image>
                                  <Text style={{ fontSize: 14, marginTop: 10, color: '#6FA4E9' }}>{item.distance.toFixed(0)} m</Text>
                                </> :
                                // item.distance && item.distance.toFixed(2) > 1000?
                                <><Image
                                  source={{ uri: 'https://res.cloudinary.com/spaarks/image/upload/v1624444708/Screenshot_2021-06-23_at_4.06.45_PM_iddjxf.png' }}
                                  style={styles.chats} onPress={() =>
                                    selectedPostMap(item, 'beyond')
                                  }
                                ></Image>
                                  <Text style={{ fontSize: 14, marginTop: 10, color: '#6FA4E9' }}>{(item.distance / 1000).toFixed(1)} Km </Text>
                                </>
                              : <></>

                          }

                        </>
                        :
                        <>

                        </>
                    }


                  </View>
                  <TouchableOpacity onPress={() => WhatsAppShare(item)}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png' }}
                        style={styles.chats}
                      ></Image>
                      {
                        item.myshares.length > 0 ?
                          <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 12, fontWeight: 'bold', color: '#6FA4E9' }}>{item.myshares[0].shares}</Text> :
                          <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 12, fontWeight: 'bold', color: '#6FA4E9' }}>0</Text>
                      }
                    </View>
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity
                      onPress={() => onLike(index, 'beyond')}
                    >

                      {
                        item.Iliked == true ?
                          <Image
                            source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.17_PM_gudcen.png' }}
                            style={{ height: 25, width: 25, margin: 23, }}
                          ></Image>
                          :
                          <Image
                            source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044952/Screenshot_2021-05-26_at_9.31.09_PM_qsntda.png' }}
                            style={{ height: 25, width: 25, margin: 23, }}
                          ></Image>
                      }

                      <Text style={{ position: 'absolute', top: 55, left: 30, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{item.likes.length}</Text>
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
                      <Hyperlink linkDefault={true} linkStyle={{ color: '#6FA4E9' }}>
                        <Text numberOfLines={5}>
                          {item.content}
                        </Text>
                      </Hyperlink>

                    </Paragraph>
                    <RNUrlPreview text={item.content} />
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
                item.photo.length > 0 ?
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                    <FlatList
                      data={[...item.photo]}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, i }) => (
                        <View style={{ marginRight: 10 }}>
                          <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: dataSourceBeyond[index].photos }) }}>
                            <Image source={{ uri: item }} cache="force-cache" style={{
                              width: Dimensions.get('window').width,
                              height: 480,
                              resizeMode: "cover",
                            }}></Image>
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  </View>
                  : <Text></Text>
              }
              <View style={{ backgroundColor: "#fff", height: "auto" }}>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("PostSpecificScreensFeed", {
                          post: item,
                          naviga: 'All'
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

                    magin: 0,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      magin: 0,
                      height: 45
                    }}
                  >
                    <View>
                      <View
                        style={{ flexDirection: "row" }}
                      >
                        <View style={{ flex: 0 }}>

                          <TouchableOpacity onPress={() => {
                            navigation.navigate("SendChatRequest")
                          }}>
                            <Text style={{ marginTop: 5, color: '#6FA4E9', marginLeft: 0, marginTop: 10, marginRight: 20 }}>Request to Chat</Text>
                          </TouchableOpacity>


                        </View>


                        <View
                        // style={{ flexDirection: 'column',flex:0,left:Dimensions.get('window').width/2 }}
                        >
                          <View style={{ marginLeft: 20 }}>
                            <TouchableOpacity
                              onPress={() => onLike(index, 'beyond')}
                            >

                              {
                                item.Iliked == true ?
                                  <Image
                                    source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.17_PM_gudcen.png' }}
                                    style={{ height: 25, width: 25, margin: 10 }}
                                  ></Image>
                                  :
                                  <Image
                                    source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044952/Screenshot_2021-05-26_at_9.31.09_PM_qsntda.png' }}
                                    style={{ height: 25, width: 25, margin: 10 }}
                                  ></Image>
                              }
                              <Text style={{ position: 'absolute', top: 35, left: 20, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{item.likes && item.likes.length}</Text>
                            </TouchableOpacity>
                          </View>

                        </View>
                      </View>

                    </View>




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



  const onRefresh = React.useCallback(async () => {
    getDataWithin(1)
    getDataBeyond(1)
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);
  return (
    <SafeAreaView>
      {/* <View style={{position:'absolute',right:30,bottom:30,zIndex:1,backgroundColor:'#fff',padding:10,borderRadius:30}}>
      <TouchableOpacity onPress={()=>{listRef.current.scrollToOffset({ offset: 0, animated: true })}}>
          <Image  source={require('../assets/scrolltop.png')} style={{width:20,height:20}}/>
          </TouchableOpacity>
          </View> */}
      <ScrollView
        ref={ref}

        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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

                            <View style={{ flex: 0, marginLeft: 65, marginTop: 7 }}>
                              <Image
                                source={require("../assets/icons/search.png")}
                                style={{ height: 30, width: 30 }}
                              ></Image>
                            </View>
                          </View>
                        </Chip>
                      </View> */}




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
                    <View style={{ color: "#000", flex: 13, height: 60, justifyContent: "center", alignItems: 'center', top: 30 }}>
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
                        onPress={() => deleteSpaark()}
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

        </View>



        <View style={{ backgroundColor: "#f2f2f2" }}>


          <View style={{ backgroundColor: "#f2f2f2" }}>

            <TouchableOpacity>
              {/* <Text h4 style={{ fontWeight: "bold", margin: 0 }}>
                          Spaarks Beyond 5Km
                        </Text> */}
              <SpaarksHeading within={true} showing={sortedDistance}  setOffsetWithin={setOffsetWithin} setOffsetBeyond={setOffsetBeyond} setDataSourceWithin={setDataSourceWithin} setDataSourceBeyond={setDataSourceBeyond} getDataWithinOnRefresh={getDataWithinOnRefresh} getDataBeyondOnRefresh={getDataBeyondOnRefresh} featureName={"greet"} getDataWithinOnRefreshSort={getDataWithinOnRefreshSort} getDataBeyondOnRefreshSort={getDataBeyondOnRefreshSort} setsortedDistance={setsortedDistance} setSortByString={setSortByString}/>

              {/* <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold", margin: 0, fontSize: 16, padding: 10 }}>{'  '}{I18n.t('Spaarks')} within <Text style={{ color: '#6FA4E9' }}>{finalDistance.toFixed(0)}Km</Text></Text>
                <View>

                  <TouchableOpacity onPress={() => openFilter}>
                    <Image source={require('../assets/filter.png')} style={{ height: 25, width: 25, marginTop: 5 }}></Image>
                  </TouchableOpacity>
                </View>



              </View> */}

            </TouchableOpacity>
          </View>
          <FlatList
            data={dataSourceWithin}
            ref={listRef}
            keyExtractor={(item, index) => index.toString()}
            enableEmptySections={true}
            renderItem={renderPostCard}
            ListFooterComponent={renderFooterWithin}
          />
        </View>
        <View style={{ backgroundColor: "#f2f2f2" }}>
          <TouchableOpacity>
            {/* <Text h4 style={{ fontWeight: "bold", margin: 0 }}>
                          Spaarks Beyond 5Km
                        </Text> */}
            {/* <SpaarksHeading within={false}/> */}
            {/* <SpaarksHeading within={false}  setOffsetWithin={setOffsetWithin} setOffsetBeyond={setOffsetBeyond} setDataSourceWithin={setDataSourceWithin} setDataSourceBeyond={setDataSourceBeyond} getDataWithinOnRefresh={getDataWithinOnRefresh} getDataBeyondOnRefresh={getDataBeyondOnRefresh} featureName={"greet"} getDataWithinOnRefreshSort={getDataWithinOnRefreshSort} getDataBeyondOnRefreshSort={getDataBeyondOnRefreshSort} setsortedDistance={setsortedDistance} setSortByString={setSortByString}/> */}
            <View>
<Text style={{ fontWeight: "bold", margin: 0,fontSize:16 }}> {'  '}{I18n.t('Spaarks')} beyond <Text style={{color:'#6FA4E9'}}>{sortedDistance.toFixed(0)}Km</Text></Text>
      </View>
            {/* <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", margin: 0, fontSize: 16, padding: 10 }}>{'  '}{I18n.t('Spaarks')} beyond <Text style={{ color: '#6FA4E9' }}>{finalDistance.toFixed(0)}Km</Text></Text>
              <View>
              </View>



            </View> */}
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "#f2f2f2" }}>
          {/* <FlatList
                        data={dataSourceBeyond}
                        keyExtractor={(item, index) => index.toString()}
                        enableEmptySections={true}
                        renderItem={ItemViewBeyond}
                        ListFooterComponent={renderFooterBeyond}

                      /> */}
          <FlatList
            data={dataSourceBeyond}
            ref={listRef}
            keyExtractor={(item, index) => index.toString()}
            enableEmptySections={true}
            renderItem={renderPostCard}
            ListFooterComponent={renderFooterBeyond}
          />
        </View>
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
    allMapPosts: state.chatss.allMapPosts,
    token: state.chatss.token,
    sortApplied: state.chatss.sortApplied,
    distance: state.chatss.distance,
    sortBy: state.chatss.sortBy,
    isConnected: state.chatss.isConnected
  };
};
export default connect(mapStatetoProps)(SayHiiScreen);
