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
const GLOBAL = require('../Globals');
import Slider from '@react-native-community/slider';
import I18n from '../src/i18n';
import Hyperlink from 'react-native-hyperlink'
import RNLocation from 'react-native-location';
import RNUrlPreview from 'react-native-url-preview';
import RNCallKeep from 'react-native-callkeep';
import axios from "axios";
import SpaarksHeading from "../components/SpaarksHeading"
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
import Video from 'react-native-video';
import moment from "moment";
import Carousel from 'react-native-snap-carousel';
import { Text, BottomSheet, ListItem } from "react-native-elements";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { checkNotifications } from 'react-native-permissions';
import AsyncStorage from "@react-native-community/async-storage";
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
import PostCard from "../components/PostCard";
import { useScrollToTop } from '@react-navigation/native';

const Stack = createStackNavigator();
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};




const indexes = [4, 8, 12, 16, 20, 24]
global.postcurrent = ['0'];
global.type = 'within';

const EventsScreen = ({ navigation, isConnected, token, chat_roster_main, allMapPosts, distance, sortBy, sortApplied }) => {
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
  const [currentPageBeyondLength, setCurrentPageBeyondLength] = useState(20);
  const [extraThings, setExtraThings] = useState(true)
  const Chatdispatcher = useDispatch(chatReducers);
  const ref = React.useRef(null);
  const listRef = useRef(null);
  const refRBsheettt = useRef();
  const [sortBys, setSortBy] = useState(true)
  const [sortByString, setSortByString] = useState('Distance')

  useScrollToTop(ref);


  async function getLinkingURI() {

    const url = await Linking.getInitialURL();
    console.log('------------------------------------------------s')
    console.log('url', url.substr(15, url.length))
    console.log('Detected', dataSourceWithin)
    console.log('------------------------------------------------')
  }
  const [showLoadMoreWithin, setLoadMoreWithin] = useState(true)
  const [showLoadMoreBeyond, setLoadMoreBeyond] = useState(true)


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


  async function sortNow() {
    if (isConnected) {
      // alert('Sorting')
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
          GLOBAL.BASE_URL + "showtime/post/static/within",
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
          GLOBAL.BASE_URL + "showtime/post/static/within",
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
          GLOBAL.BASE_URL + "showtime/post/static/beyond",
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
          GLOBAL.BASE_URL + "showtime/post/static/beyond",
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

  const getDataWithinOnRefresh = async () => {
    if (isConnected) {
      var latitudes = await AsyncStorage.getItem('latitude');
      var longitudes = await AsyncStorage.getItem('longitude');
      var jwt = await AsyncStorage.getItem('token');
      setLoading(true);
      if (String(jwt) != "null") {
        await axios.post(
          GLOBAL.BASE_URL + "showtime/post/static/within",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": "all",
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
          GLOBAL.BASE_URL + "showtime/post/static/within",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": "all",
            "page": 1,
            "radius": sortedDistance,
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
          GLOBAL.BASE_URL + "showtime/post/static/beyond",
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
          GLOBAL.BASE_URL + "showtime/post/static/beyond",
          {
            "latitude": Number(latitudes),
            "longitude": Number(longitudes),
            "category": 'all',
            "page": offsetBeyond,
            "radius": distance,
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

  async function openFilter() {
    // registerCalls()
    // showCount()
    refRBsheettt.current.open()
  }
  const getDataWithin = async () => {
    var latitudes = await AsyncStorage.getItem('latitude');
    var longitudes = await AsyncStorage.getItem('longitude');
    var jwt = await AsyncStorage.getItem('token');
    if (String(jwt) != "null") {
      console.log('getData');
      setLoading(true);
      // alert(offsetWithin)
      await axios.post(
        GLOBAL.BASE_URL + "showtime/post/static/within",
        {
          "latitude": Number(latitudes),
          "longitude": Number(longitudes),
          "category": "all",
          "page": offsetWithin,
          "radius": distance,
          "sortBy": sortBy
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              'Bearer ' + jwt
          },
        }
      )
        .then(async (responseJson) => {

          await axios.post(
            GLOBAL.BASE_URL + "showtime/post/static/within",
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
                  'Bearer ' + jwt
              },
            }
          )
            .then(async (responseJson) => {
              if (responseJson.data.data.post.length == 0) {
                setLoadMoreWithin(false)
              }
            });
            setBanners(responseJson.data.data.bannersNew)
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

    } else {
      await axios.post(
        GLOBAL.BASE_URL + "showtime/post/static/within",
        {
          "latitude": Number(latitudes),
          "longitude": Number(longitudes),
          "category": "all",
          "page": offsetWithin,
          "radius": distance,
          "sortBy": sortBy
        }
      )
        .then(async (responseJson) => {
          await axios.post(
            GLOBAL.BASE_URL + "showtime/post/static/within",
            {
              "latitude": Number(latitudes),
              "longitude": Number(longitudes),
              "category": "all",
              "page": offsetWithin
            }
          )
            .then(async (responseJson) => {
              if (responseJson.data.data.post.length == 0) {
                setLoadMoreWithin(false)
              }
            });

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
        GLOBAL.BASE_URL + "showtime/post/static/beyond",
        {
          "latitude": Number(latitudes),
          "longitude": Number(longitudes),
          "category": "all",
          "page": offsetBeyond,
          "radius": distance,
          "sortBy": sortBy
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              'Bearer ' + jwt
          },
        }
      )
        .then(async (responseJson) => {
          setBanners(responseJson.data.data.bannersNew)
          await axios.post(
            GLOBAL.BASE_URL + "showtime/post/static/within",
            {
              "latitude": Number(latitudes),
              "longitude": Number(longitudes),
              "category": "all",
              "page": offsetBeyond + 1
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  'Bearer ' + jwt
              },
            }
          )
            .then(async (responseJson) => {
              if (responseJson.data.data.post.length == 0) {
                setLoadMoreBeyond(false)
              }
            });
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
        GLOBAL.BASE_URL + "showtime/post/static/beyond",
        {
          "latitude": Number(latitudes),
          "longitude": Number(longitudes),
          "category": "all",
          "page": offsetBeyond,
          "radius": distance,
          "sortBy": sortBy
        }
      )
        .then(async (responseJson) => {
          await axios.post(
            GLOBAL.BASE_URL + "showtime/post/static/within",
            {
              "latitude": Number(latitudes),
              "longitude": Number(longitudes),
              "category": "all",
              "page": offsetBeyond + 1
            }
          )
            .then(async (responseJson) => {
              if (responseJson.data.data.post.length == 0) {
                setLoadMoreBeyond(false)
              }
            });
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




  const [banners, setBanners] = useState([]);

  const [sortedDistance, setsortedDistance] = useState(5);
  const [finalDistance, setFinalDistance] = useState(5);
  useEffect(() => {

    getDataWithin()
    getDataBeyond()
  }, []);











  function onLogin(phone) {
    console.log("phoness", phone)
    Login.current.close();
    navigation.navigate('VerifyOtpScreen', { phone: phone })
  }

  const renderFooterWithin = () => {
    return (
      <>

        {
          showLoadMoreWithin ?
            <View style={styles.footer}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={getDataWithin}
                //On Click of button calling getData function to {I18n.t("Load More")} data
                style={styles.loadMoreBtn}>
                <Text style={styles.btnText}>{I18n.t("Load More")}</Text>
                {loading ? (
                  <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
                ) : null}
              </TouchableOpacity>
            </View>
            : <>
              <View style={{ justifyContent: 'center', backgroundColor: '#f2f2f2' }}>
                <Text style={{ textAlign: 'center' }}>{I18n.t("No Spaarks within")}</Text>
              </View>
            </>
        }
      </>
    );
  };
  async function setSortBys(a) {
    if (a) {
      setSortBy(true)
      setSortByString('Distance')
    } else {
      setSortBy(false)
      setSortByString('Time')
    }

  }

  const renderPostCard = ({ item, index }) => {
    return (
      <PostCard item={item}
        index={index}
        banners={banners}
        navigation={navigation}
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
          showLoadMoreBeyond ?
            <View style={styles.footer}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={getDataBeyond}
                //On Click of button calling getData function to {I18n.t("Load More")} data
                style={styles.loadMoreBtn}>
                <Text style={styles.btnText}>{I18n.t("Load More")}</Text>
                {loading ? (
                  <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
                ) : null}
              </TouchableOpacity>
            </View>
            : <>
              <View style={{ justifyContent: 'center', backgroundColor: '#f2f2f2' }}>
                <Text style={{ textAlign: 'center' }}>{I18n.t ("No Spaarks beyond")}</Text>
              </View>
            </>
        }

      </>
    );
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

          {/* Sort Now */}
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
            <View style={{ backgroundColor: "#fff", height: 330 }}>

              <Text style={{ marginLeft: 20, fontWeight: '500', fontSize: 20, paddingBottom: 14 }}>{I18n.t("Filter Spaarks by")}
                <Text style={{ color: '#6FA4E9' }}> {sortedDistance.toFixed(0)}Km
                </Text></Text>

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingRight: 0, paddingLeft: 10 }}>
                <View style={{ flex: 1, justifyContent: 'center', marginTop: 10 }}>


                  <Slider
                    style={{ width: 350, height: 30 }}
                    minimumValue={1}
                    // value={sortedDistance}
                    onValueChange={setsortedDistance}
                    maximumValue={5}
                    minimumTrackTintColor="#6FA4E9"
                    maximumTrackTintColor="#9597A1"
                    step='1'
                  />


                </View>

              </View>
              <View style={{ marginTop: 0 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, paddingRight: 9, paddingLeft: 9, margin: 10 }}>
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

                <View style={{ flexDirection: 'column', padding: 10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 4 }} >
                      <Text style={{ fontWeight: '500', fontSize: 16, left: 15 }}>{I18n.t("Nearest Spaarks")}</Text>
                      <Text style={{ fontSize: 14, color: '#A1A4B2', left: 15, top: 6, fontWeight: '400' }}>{I18n.t("Spaarks are sorted by distance from you")}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity onPress={() => setSortBys(1)}>
                        {
                          sortBys ?
                            <Image source={require('../assets/checked.png')} style={{ height: 40, width: 40 }} /> :
                            <Image source={require('../assets/unchecked.png')} style={{ height: 40, width: 40 }} />
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
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 4 }} >
                      <Text style={{ fontWeight: '500', fontSize: 16, left: 15 }}>{I18n.t("Latest Spaarks")}</Text>
                      <Text style={{ fontSize: 14, color: '#A1A4B2', left: 15, top: 6, fontWeight: '400' }}>{I18n.t("Spaarks are sorted by time of posting")}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity onPress={() => setSortBys(0)}>
                        {
                          sortBys ?
                            <Image source={require('../assets/unchecked.png')} style={{ height: 40, width: 40 }} /> :
                            <Image source={require('../assets/checked.png')} style={{ height: 40, width: 40 }} />
                        }
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>




              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => sortNow()}>
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
                    <Text style={{ color: '#fff' }}>{I18n.t("SORT")}</Text>
                  </Button>
                </TouchableOpacity>
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
        <View style={{ backgroundColor: "#f2f2f2" }}>
          <View style={{ backgroundColor: "#f2f2f2" }}>
            {/* <FlatList
                        data={dataSourceWithin}
                        keyExtractor={(item, index) => index.toString()}
                        enableEmptySections={true}
                        renderItem={ItemViewWithin}
                        ListFooterComponent={renderFooterWithin}

                      /> */}
            <View style={{ backgroundColor: "#f2f2f2" }}>
              <TouchableOpacity>
                {/* <Text h4 style={{ fontWeight: "bold", margin: 0 }}>
                          Spaarks Beyond 5Km
                        </Text> */}
                {/* <SpaarksHeading within={true}/> */}
                <SpaarksHeading within={true} showing={sortedDistance}  setOffsetWithin={setOffsetWithin} setOffsetBeyond={setOffsetBeyond} setDataSourceWithin={setDataSourceWithin} setDataSourceBeyond={setDataSourceBeyond} getDataWithinOnRefresh={getDataWithinOnRefresh} getDataBeyondOnRefresh={getDataBeyondOnRefresh} featureName={"showtime"} getDataWithinOnRefreshSort={getDataWithinOnRefreshSort} getDataBeyondOnRefreshSort={getDataBeyondOnRefreshSort} setsortedDistance={setsortedDistance} setSortByString={setSortByString}/>
                {/* <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold", margin: 0, fontSize: 16, padding: 10 }}>{'  '}{I18n.t('Spaarks')} within <Text style={{ color: '#6FA4E9' }}>{finalDistance.toFixed(0)}Km</Text></Text>
                  <View>

                    <TouchableOpacity onPress={() => openFilter()}>
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
              <SpaarksHeading within={false} showing={sortedDistance}/>
             
              {/* <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold", margin: 0, fontSize: 16, padding: 10 }}>{'  '}{I18n.t('Spaarks')} beyond <Text style={{ color: '#6FA4E9' }}>{finalDistance.toFixed(0)}Km</Text></Text>
              </View> */}
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: "#f2f2f2" }}>
            {/* <FlatList
                        data={dataSourceBeyond}
                        keyExtractor={(item, index) => index.toString()}
                        enableEmptySections={true}
                        // onEndReached={getDataBeyond}
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
export default connect(mapStatetoProps)(EventsScreen);
