import React,{useRef,useState}from "react";
import {
  View,
  Dimensions,
  Share,
  Linking,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import I18n from '../src/i18n';

import {
  Avatar,
  Chip,
  Card,
  Title,
  Paragraph,
  Searchbar,
} from "react-native-paper";
import PostCard from "../components/PostCard";
import Hyperlink from 'react-native-hyperlink';
import RNUrlPreview from 'react-native-url-preview';
import Snackbar from 'react-native-snackbar';
import Dialog from "react-native-dialog";
import { Rating, AirbnbRating, Divider } from "react-native-elements";
import axios from "axios";
import moment, { ISO_8601 } from 'moment';
import { connect, useDispatch, useReducer } from "react-redux";
import chatReducers from "../reducers/chatReducers";
import postsReducers from "../reducers/postsReducers";
import Highlighter from 'react-native-highlight-words';
const GLOBAL = require('../Globals');
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ViewShot from "react-native-view-shot";
import RBSheet from "react-native-raw-bottom-sheet";
import Video from 'react-native-video';


const SelectCategoryScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const onChangeSearch = (query) => setSearchQuery(query);

    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ backgroundColor: "#F2F2F2", height: "100%" }}>
        <View style={{ margin: 10 }}>
          <View>
            <Text h4 style={{ fontWeight: "bold", paddingTop: 10 }}>
              {" "}
              Find A Job
            </Text>
            <Text style={{ paddingTop: 10, fontSize: 20, color: "#A1A4B2" }}>
              {" "}
              choose a service which suits you best:
            </Text>
          </View>

          <View>
            {/* Mail Row for Looper */}
            <View
              style={{ flexDirection: "row", borderRadius: 10, marginTop: 10 }}
            >
              {/* 1st Image */}
              <Card style={{ marginLeft: 0 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>

              {/* 2nd Image */}
              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>
              {/* 3rd Image */}
              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>
            </View>

            {/* just for show */}
            <View
              style={{ flexDirection: "row", borderRadius: 10, marginTop: 10 }}
            >
              <Card style={{ marginLeft: 0 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>

              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>

              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>
            </View>

            {/* just for show */}
            <View
              style={{ flexDirection: "row", borderRadius: 10, marginTop: 10 }}
            >
              <Card style={{ marginLeft: 0 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>

              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>

              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>
            </View>

            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                margin: 10,
                marginTop: 20,
              }}
            >
              Top Rated Job Works
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  marginTop: 0,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  marginLeft: 10,
                }}
              >
                <View
                  style={{ flexDirection: "row", width: 310, borderRadius: 8 }}
                >
                  <View
                    style={{
                      flex: 8,
                      backgroundColor: "#fff",
                      borderRadius: 8,
                    }}
                  >
                    <Image
                      source={require("../assets/hs1.png")}
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
                    <Text h5 style={{ fontWeight: "bold", margin: 10 }}>
                      Sub Category 1
                    </Text>
                    <Text
                      style={{ margin: 10, color: "#7B8794", flexShrink: 1 }}
                    >
                      Maid, Teacher, Driver, Cook,Watchman, etc.
                    </Text>
                  </View>
                  <View style={{ flex: 3 }}>
                    <Image
                      source={require("../assets/icons/nextIcon.png")}
                      style={{
                        height: 15,
                        width: 15,
                        padding: 10,
                        borderRadius: 30,
                        margin: 10,
                      }}
                    ></Image>
                  </View>
                </View>
              </View>

              {/* Remove just for show */}
              <View
                style={{
                  marginTop: 0,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  marginLeft: 10,
                }}
              >
                <View
                  style={{ flexDirection: "row", width: 310, borderRadius: 8 }}
                >
                  <View
                    style={{
                      flex: 8,
                      backgroundColor: "#fff",
                      borderRadius: 8,
                    }}
                  >
                    <Image
                      source={require("../assets/hs1.png")}
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
                    <Text h5 style={{ fontWeight: "bold", margin: 10 }}>
                      Sub Category 1
                    </Text>
                    <Text
                      style={{ margin: 10, color: "#7B8794", flexShrink: 1 }}
                    >
                      Maid, Teacher, Driver, Cook,Watchman, etc.
                    </Text>
                  </View>
                  <View style={{ flex: 3 }}>
                    <Image
                      source={require("../assets/icons/nextIcon.png")}
                      style={{
                        height: 15,
                        width: 15,
                        padding: 10,
                        borderRadius: 30,
                        margin: 10,
                      }}
                    ></Image>
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* just for show */}
            {/* Mail Row for Looper */}
            <View
              style={{ flexDirection: "row", borderRadius: 10, marginTop: 10 }}
            >
              {/* 1st Image */}
              <Card style={{ marginLeft: 0 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>

              {/* 2nd Image */}
              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>
              {/* 3rd Image */}
              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>
            </View>

            {/* just for show */}
            <View
              style={{ flexDirection: "row", borderRadius: 10, marginTop: 10 }}
            >
              <Card style={{ marginLeft: 0 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>

              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>

              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>
            </View>

            {/* just for show */}
            <View
              style={{ flexDirection: "row", borderRadius: 10, marginTop: 10 }}
            >
              <Card style={{ marginLeft: 0 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>

              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>

              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>
            </View>

            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                margin: 10,
                marginTop: 20,
              }}
            >
              Top Rated Job Works
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  marginTop: 0,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  marginLeft: 10,
                }}
              >
                <View
                  style={{ flexDirection: "row", width: 310, borderRadius: 8 }}
                >
                  <View
                    style={{
                      flex: 8,
                      backgroundColor: "#fff",
                      borderRadius: 8,
                    }}
                  >
                    <Image
                      source={require("../assets/hs1.png")}
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
                    <Text h5 style={{ fontWeight: "bold", margin: 10 }}>
                      Sub Category 1
                    </Text>
                    <Text
                      style={{ margin: 10, color: "#7B8794", flexShrink: 1 }}
                    >
                      Maid, Teacher, Driver, Cook,Watchman, etc.
                    </Text>
                  </View>
                  <View style={{ flex: 3 }}>
                    <Image
                      source={require("../assets/icons/nextIcon.png")}
                      style={{
                        height: 15,
                        width: 15,
                        padding: 10,
                        borderRadius: 30,
                        margin: 10,
                      }}
                    ></Image>
                  </View>
                </View>
              </View>

              {/* Remove just for show */}
              <View
                style={{
                  marginTop: 0,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  marginLeft: 10,
                }}
              >
                <View
                  style={{ flexDirection: "row", width: 310, borderRadius: 8 }}
                >
                  <View
                    style={{
                      flex: 8,
                      backgroundColor: "#fff",
                      borderRadius: 8,
                    }}
                  >
                    <Image
                      source={require("../assets/hs1.png")}
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
                    <Text h5 style={{ fontWeight: "bold", margin: 10 }}>
                      Sub Category 1
                    </Text>
                    <Text
                      style={{ margin: 10, color: "#7B8794", flexShrink: 1 }}
                    >
                      Maid, Teacher, Driver, Cook,Watchman, etc.
                    </Text>
                  </View>
                  <View style={{ flex: 3 }}>
                    <Image
                      source={require("../assets/icons/nextIcon.png")}
                      style={{
                        height: 15,
                        width: 15,
                        padding: 10,
                        borderRadius: 30,
                        margin: 10,
                      }}
                    ></Image>
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* Mail Row for Looper */}
            <View
              style={{ flexDirection: "row", borderRadius: 10, marginTop: 10 }}
            >
              {/* 1st Image */}
              <Card style={{ marginLeft: 0 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>

              {/* 2nd Image */}
              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>
              {/* 3rd Image */}
              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>
            </View>

            {/* just for show */}
            <View
              style={{ flexDirection: "row", borderRadius: 10, marginTop: 10 }}
            >
              <Card style={{ marginLeft: 0 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>

              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>

              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>
            </View>

            {/* just for show */}
            <View
              style={{ flexDirection: "row", borderRadius: 10, marginTop: 10 }}
            >
              <Card style={{ marginLeft: 0 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>

              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>

              <Card style={{ marginLeft: 5 }}>
                <View style={{ margin: 10 }}>
                  <Card.Cover
                    source={require("../assets/art.png")}
                    style={{ height: 80, width: 100, borderRadius: 5 }}
                  />
                </View>
                <Card.Content>
                  <Title style={{ textAlign: "center" }}>Arts</Title>
                </Card.Content>
              </Card>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const SearchScreen = ({ navigation,Userpreferences,isConnected,route }) => {

  // if(route.params.isFromPost){
  //   route.params.isFromPost = false
  //   alert('From Post')
  //   setTimeout(() => {
  //     callAxios(route.params.content)

  //   }, 1000);
    
  // }
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const onChangeSearch = (query) => setSearchQuery(query);

    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const initialState = {
    results: [],
  };
  const [results, setResults] = React.useState([]);
  const [posts, setPosts] = React.useState([]);
  const [profiles, setProfile] = React.useState([]);
  const [offerings, setOfferings] = React.useState([]);
  
  const [searchQuery, setSearchQuery] = React.useState(null);
  const [c1, setc1] = React.useState(0);
    const [c2, setc2] = React.useState(0);
      const [c3, setc3] = React.useState(0);

  const renderPostCard = ({ item, index }) =>{
    return(
      <>
      <PostCard 
      item={item} 
      index={index} 
      key={index}
      banners={[]} 
      navigation={navigation}/>
      </>
    )
  }

         const viewShotRef = useRef();
              const refRBSheet = useRef();
              const refRBSheets = useRef();
              const refRBSheetss = useRef();
              const Login = useRef();

  async function callAxios(name) {
    // alert(name)
  
    if(isConnected){
    console.log(name);
    console.log(GLOBAL.PLAIN_URL+"user/search/"+name)
    setc1(0)
    setc2(0)
    setc3(0)
    setSearchQuery(name)
    if(String(name).length == 0 || String(name).length == 1 || String(name).length == 2){
      // setResults([])
      // setProfile([]);
      // setOfferings([]);
      // setPosts([]);
    }else{
      var jwt = await AsyncStorage.getItem('token')
      if(String(jwt)!="null"){
      await axios.get(GLOBAL.BASE_URL+"user/search/"+name,{
        headers: {
          "Content-Type": "application/json",
          Authorization:
            'Bearer ' + jwt
        },
      }).then((resp) => {
        //console.log(resp.data);
        setc1(resp.data.categories.length)
        setc2(resp.data.posts.length)
        setc3(resp.data.profiles.length+resp.data.serviceOfferings.length)
        setResults([])
        // setResults(resp.data.categories.slice(0, 5));

        setResults(resp.data.categories);
        // setPosts(resp.data.posts.slice(0, 5));
        setPosts(resp.data.posts);
        // setProfile(resp.data.profiles.slice(0, 5));
        setProfile(resp.data.profiles);

        // setOfferings(resp.data.serviceOfferings.slice(0, 5));
        setOfferings(resp.data.serviceOfferings);

      });
    }else{
      await axios.get(GLOBAL.PLAIN_URL+"search/"+name).then((resp) => {
        //console.log(resp.data);
        setc1(resp.data.categories.length)
        setc2(resp.data.posts.length)
        setc3(resp.data.profiles.length+resp.data.serviceOfferings.length)
        setResults([])
        setResults(resp.data.categories);
        setPosts(resp.data.posts);
        setProfile(resp.data.profiles);
        setOfferings(resp.data.serviceOfferings);
      });
    }
    }
   
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
  }



     async function reportUser(post) {
                if (global.type == 'within') {
                  var post = dataSourceWithin[Number(global.postcurrent[0])]
                } else {
                  var post = dataSourceBeyond[Number(global.postcurrent[0])]
                }

                //console.log(post)
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
                      GLOBAL.TOKEN._
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
                //console.log("phoness", phone)
                Login.current.close();
                navigation.navigate('VerifyOtpScreen', { phone: phone })
              }
                 async function handleOutgoingCall (call,navigation){
                        navigation.navigate('OutGoingCallScreen',{aid:call,name:'Saikiran',profilePic:'https://wallpaperaccess.com/full/2213426.jpg'})
                }

                  async function clickedChat(l) {

                        var found = false;
                        // //console.log("userToken", String(userToken).length);
                      var userToken =   await AsyncStorage.getItem('token');

                        if (String(userToken).length > 24) {
                          chat_roster_main.forEach(list=>{
                            //console.log('sdsdsd',list.jid,l.jid)
                            if(list.jid == l.jid){
                                found = true;
                            }
                          })

                          if(found){
                            navigation.navigate("ChatSpecificScreen", {
                              name: l.uservisibility.name.substr(0, 15),
                              profilePic: l.uservisibility.profilePic,
                              jid: l.jid_main,
                            });
                          }else{
                            alert('Sorry')
                          }
                      
                          // return (<LoginToAccessScreen></LoginToAccessScreen>)
                        } else {
                          Login.current.open();
                        }


                  }

                 function openDots(i, type) {
                //console.log(i)
                global.postcurrent[0] = String(i);
                global.type = type;
                //console.log(global.postcurrent[0])
                refRBSheet.current.open()
              }

        

      




  const PostsDispatcher = useDispatch(chatReducers);
  async function  clickedSearch(item,Userpreferences){
    //console.log(item,Userpreferences);
    const newPre = {
      category:item.category,
      subCategory:item.subCategoryFinal,
      selected:true,
      fromSearch:true
    };
    const newPre1 = {
      category:'All',
      subCategory:'All',
      selected:false,
      fromSearch:true
    }
    if(Userpreferences && Userpreferences.length>0){
      Userpreferences.shift();
      Userpreferences.splice(0,0,newPre1)
      Userpreferences.splice(1,0,newPre)
      PostsDispatcher({type:'SETPREFERENCES',preferences:Userpreferences})
      PostsDispatcher({type:'SETSELECTEDPREFERENCE',selectedPreference:item.subCategoryFinal,category:item.category,subCategory:item.subCategoryFinal})
      await AsyncStorage.setItem('prefernces', JSON.stringify(Userpreferences));
      route.params.getDataForPill(item.category,item.subCategoryFinal)
      navigation.navigate('Market')
    }else{
      var Userpreferences = [];
      Userpreferences.push(newPre1)
      Userpreferences.push(newPre);
      PostsDispatcher({type:'SETPREFERENCES',preferences:Userpreferences})
      PostsDispatcher({type:'SETSELECTEDPREFERENCE',selectedPreference:item.subCategoryFinal,category:item.category,subCategory:item.subCategoryFinal})
      await AsyncStorage.setItem('prefernces', JSON.stringify(Userpreferences));

      navigation.navigate('Market')
    }
  
  }

  // This is to send Job and Want Work as Search preference
  async function  clickedPredefined(category,subCategory,Userpreferences){
    //console.log(item,Userpreferences);
    if(isConnected){
    const newPre = {
      category:category,
      subCategory:subCategory,
      selected:true,
      fromSearch:true
    };
    const newPre1 = {
      category:'All',
      subCategory:'All',
      selected:false,
      fromSearch:true
    }
    console.log('okokokokoko',Userpreferences,Userpreferences.length)
    if(Userpreferences && Userpreferences.length>0){
      Userpreferences.shift();
      Userpreferences.splice(0,0,newPre1)
      Userpreferences.splice(1,0,newPre)
      PostsDispatcher({type:'SETPREFERENCES',preferences:Userpreferences})
      PostsDispatcher({type:'SETSELECTEDPREFERENCE',selectedPreference:subCategory,category:category,subCategory:subCategory})
      await AsyncStorage.setItem('prefernces', JSON.stringify(Userpreferences));
      navigation.navigate('Market')
    }else{
      var Userpreferences = [];
      Userpreferences.push(newPre1)
      Userpreferences.push(newPre);
      PostsDispatcher({type:'SETPREFERENCES',preferences:Userpreferences})
      PostsDispatcher({type:'SETSELECTEDPREFERENCE',selectedPreference:subCategory,category:category,subCategory:subCategory})
      await AsyncStorage.setItem('prefernces', JSON.stringify(Userpreferences));
      navigation.navigate('Market')
    }

  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
  
  }



  async function clickedProfile(user,type){
    console.log(user)
    if(type == 'profile'){
    
    navigation.navigate("UserProfileDynamic", {
      userId: user._id,
      post: [],
    })
    }else{
    
    navigation.navigate("SellerProfile", {
      userId: user.userId._id,
      post: [],
    })
    }
  }

  const [extraThings,setExtraThings] = useState(true)
function SpaarksResults() {
  return (
    <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'#f2f2f2' }}>
    {
        posts.length>0?
<Text style={{backgroundColor:'#f2f2f2',padding:10}}>Searching in Spaarks around</Text>:<></>
}

{
   posts.length>0?

<FlatList
                        data={posts}
                        // keyExtractor={(item, index) => item.index}
                        keyExtractor={item => item.id}

                        renderItem={renderPostCard}
                      />
              
                          :<Text style={{textAlign:'center',justifyContent:'center'}}>{I18n.t("No Spaarks around")}</Text>
              }
                  
    </View>
  );
}

function SearchResults() {
  return (
    <View style={{ flex: 1, justifyContent: 'center',textAlign:'center' }}>
      {
        results.length == 0 && searchQuery.length > 3  ?
        <Text style={{backgroundColor:'#fff',padding:80,justifyContent:'center',textAlign:'center'}}>{I18n.t("No Search Results found")}</Text>:<></>
      }
                {
                  results.length>0?
          <Text style={{backgroundColor:'#f2f2f2',padding:10}}>{I18n.t("Searching in categories")}</Text>:<></>
          }
         <FlatList
          data={results}
          keyExtractor={(item, index) => index + Math.random()}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 5,
                width: Dimensions.get('window').width,
                backgroundColor: "#f2f2f2",
              }}
            >
      
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  padding: 20,
                  flex: 1,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                   
                  <View style={{ flex: 10 }}>




               {
                 item.isTag?
                 item.preview == item.subCategoryFinal?
                 <TouchableOpacity onPress={()=> clickedSearch(item,Userpreferences)}>
                
                 <Text style={{ fontSize: 18 }}>{item.preview}</Text>
                  </TouchableOpacity>
                 :
                  <TouchableOpacity onPress={()=> clickedSearch(item,Userpreferences)}>
                                  
                  <Text style={{ fontSize: 18 }}>{item.preview} in {item.category}</Text>
                                  </TouchableOpacity>

                :item.preview == item.subCategoryFinal?
                <TouchableOpacity onPress={()=> clickedSearch(item,Userpreferences)}>
                
                <Text style={{ fontSize: 18 }}>{item.preview} in {item.category}</Text>
                 </TouchableOpacity>
                 :
                 <TouchableOpacity onPress={()=> clickedSearch(item,Userpreferences)}>
                
                <Text style={{ fontSize: 18 }}>{item.preview} {item.subCategory}, {item.category}</Text>
                 </TouchableOpacity>

               }


                  </View>
                
                  <View style={{ flex: 1 }}>
                    <Image
                      source={require("../assets/icons/searchResult.png")}
                      style={{ height: 35, width: 35 }}
                                         ></Image>
                  </View>

                </View>
              </View>
            </View>
          )}
        />

    </View>
  );
}

function ProfileResults() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
    {
      offerings.concat(profiles).length == 0 && searchQuery > 3  ?
      <Text style={{backgroundColor:'#fff',padding:10}}>{I18n.t("No Search Results found")}</Text>:<></>
    }
        {
              offerings.concat(profiles).length>0?
        <Text style={{backgroundColor:'#f2f2f2',padding:10}}>{I18n.t("Searching in Seller Profiles")}</Text>:<></>
        }
        {
              offerings.concat(profiles).length>0?
       <FlatList
        data={offerings.concat(profiles)}
        keyExtractor={(item, index) => item._id}
        renderItem={({ item }) => (
          <>
          {
            item.subCategory?
            <View
            style={{
              padding: 5,
              width: 380,
              backgroundColor: "#f2f2f2",
            }}
          >
    
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 20,
                flex: 1,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                 
                <View style={{ flex: 10 }}>
                <TouchableOpacity onPress={()=> clickedProfile(item,'offerings')}>
              
                <Text style={{ fontSize: 18 }}>{item.userId.name}</Text>
                <Text style={{ fontSize: 14,color:'#6FA4E9' }}>{item.subCategory}</Text>
                 </TouchableOpacity>
                </View>
              
                <View style={{ flex: 1 }}>
                <Image
                       source={{uri:item.userId.profilePic}}
                       style={{ height: 35, width: 35,borderRadius:10 }}
                                          ></Image>
                </View>

              </View>
            </View>
          </View>
            :
            <View
            style={{
              padding: 5,
              width: Dimensions.get('window').width,
              backgroundColor: "#f2f2f2",
            }}
          >
    
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 20,
                flex: 1,
              }}
            >
              <View style={{ flexDirection: "row" }}>
              <Image
                       source={{uri:item.profilePic}}
                       style={{ height: 40, width: 40,borderRadius:10 }}
                                          ></Image>
                <View style={{ flex: 10 }}>
               
                <TouchableOpacity onPress={()=> clickedProfile(item,'profile')}>
              
                <Text style={{ fontSize: 18,marginTop:5,marginLeft:10 }}>{item.name}</Text>
                 </TouchableOpacity>
                </View>
              
                {/* <View style={{ flex: 1 }}>
                <Image
                       source={{uri:item.profilePic}}
                       style={{ height: 35, width: 35,borderRadius:10 }}
                                          ></Image>
                </View> */}

              </View>
            </View>
          </View>
          }
      
          </>
        )}
      />
      :
     
        <Text style={{backgroundColor:'#fff',padding:80,justifyContent:'center',textAlign:'center'}}>{I18n.t("No Search Results found")}</Text>
      
        }

  </View>
  );
}




  const Tab = createMaterialTopTabNavigator();
  return (
 
 
  <View style={styles.container}>
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
<View style={{
    marginTop: Platform.OS === "ios" ? 10 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 35,
    padding: 0,
    margin:20,
    marginBottom:10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
}}>
        <View style={{ flex: 0, marginLeft: 12, marginTop: 7 }}>
          <Image
            source={require("../assets/icons/search.png")}
            style={{ height: 30, width: 30 }}
          ></Image>
        </View>
        <TextInput
          placeholder={I18n.t("Looking for something")}
          placeholderTextColor="#000"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
          style={{ flex: 10, paddingLeft: 5 }}
          onChangeText={callAxios}
          clearButtonMode={"while-editing"}
          // onSubmitEditing={callAxios}
          // keyboardType={"twitter"}
        />
      </View>
<View style={{flexDirection:'row',marginLeft:10,marginTop:0}}>
<TouchableOpacity onPress={()=>clickedPredefined('Job','Job',Userpreferences)}>
                                                       <Chip mode={"outlined"} style={{ margin: 3, marginBottom: 10,backgroundColor:'#f2f2f2' }}>
                                                         <Text style={styles.chipTexts,{color:'#000'}}>{I18n.t("Job")}</Text>
                                                       </Chip>
                                                 </TouchableOpacity>
                                                 <TouchableOpacity onPress={()=>clickedPredefined('Work','Work',Userpreferences)}>
                                                       <Chip mode={"outlined"} style={{ margin: 3, marginBottom: 10,backgroundColor:'#f2f2f2' }}>
                                                         <Text style={styles.chipTexts,{color:'#000'}}>{I18n.t("Want work")}</Text>
                                                       </Chip>
                                                 </TouchableOpacity>
                                                
</View>
      {    

        searchQuery?
              <Tab.Navigator 
              screenOptions={{
        
                headerStyle: {
                  backgroundColor: '#fff',
                  },
                  headerTintColor: '#6FA4E9',
                  headerTitleStyle: {
                  fontWeight: 'bold'
                  }
              }}
              tabBarOptions={{
                labelStyle: { fontSize: 9 },
                allowFontScaling:true,
                activeTintColor:'#6FA4E9',
                inactiveTintColor:'#9A9A9A',
                indicatorStyle:{backgroundColor:'#6FA4E9',height:3}
              }}
              >
                     <Tab.Screen name={I18n.t("Categories")+" ("+c1+")"} component={SearchResults} />
            <Tab.Screen name={I18n.t("Spaarks")+" ("+c2+")"} component={SpaarksResults} />
       
            <Tab.Screen name={I18n.t("Profile")+" ("+c3+")"} component={ProfileResults} />
          </Tab.Navigator>
          :
          isConnected?
          <View style={{justifyContent:'center'}}>
            
            <Image source={require('../assets/icons/dog_search.png')} style={{height:200,width:200,justifyContent:'center',textAlign:'center',marginLeft:100}}></Image>
            <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20}}>
              {I18n.t("I'm ready to search")}
            </Text>
            <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20}}>
            {I18n.t("just start typing")}
            </Text>
            </View>
            :
            <>
             <View style={{flex:1,height:Dimensions.get('window').height/2,justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../assets/offline2.png')} style={{height:300,width:300}}/>
      </View></>

      }
          </View>

  
    // <View style={styles.container}>
      /* <View style={styles.searchBox}>
        <View style={{ flex: 0, marginLeft: 12, marginTop: 7 }}>
          <Image
            source={require("../assets/icons/search.png")}
            style={{ height: 30, width: 30 }}
          ></Image>
        </View>
        <TextInput
          placeholder="Looking for something"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 10, paddingLeft: 5 }}
          onChangeText={callAxios}
        />
      </View> */
/*       
      <View style={{ marginTop: 90, backgroundColor: "#fff" }}>

      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator> */



 /* <ScrollView>
 {
        results.length>0?
<Text style={{backgroundColor:'#f2f2f2',padding:10}}>Searching in categories</Text>:<></>
}

        <FlatList
          data={results}
          keyExtractor={(item, index) => item.subCategoryId}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 5,
                width: 380,
                backgroundColor: "#f2f2f2",
              }}
            >
      
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  padding: 20,
                  flex: 1,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                   
                  <View style={{ flex: 10 }}>
                  <TouchableOpacity onPress={()=> clickedSearch(item)}>
                
                  <Text style={{ fontSize: 18 }}>{item.preview} in {item.category}</Text>
                   </TouchableOpacity>
                  </View>
                
                  <View style={{ flex: 1 }}>
                    <Image
                      source={require("../assets/icons/searchResult.png")}
                      style={{ height: 35, width: 35 }}
                                         ></Image>
                  </View>

                </View>
              </View>
            </View>
          )}
        />



{
        posts.length>0?
<Text style={{backgroundColor:'#f2f2f2',padding:10}}>Searching in Spaarks around</Text>:<></>
}

        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 5,
                width: 380,
                backgroundColor: "#f2f2f2",
              }}
            >
      <TouchableOpacity onPress={()=>{navigation.navigate("PostSpecificScreens", {
                                post: item,
                              })}}>

              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  padding: 20,
                  flex: 1,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 10 }}>
                    <Text style={{ fontSize: 20,color:'#89929C' }}>{item.uservisibility.name}</Text>
                    {
                      item.content.length>200?
                      <Text style={{ fontSize: 16,color:'#000' }}>{item.content.toLowerCase().search(searchQuery.toLowerCase())>10?<>...{
                        

                        <Highlighter
  highlightStyle={{backgroundColor: 'yellow'}}
  searchWords={[searchQuery]}
  textToHighlight={item.content.slice(item.content.toLowerCase().search(searchQuery.toLowerCase())-10,item.content.toLowerCase().search(searchQuery.toLowerCase())+30)}
/>
                        
                        
                        
                        } </>:<></>}...</Text>
                      :
                      <Highlighter
  highlightStyle={{backgroundColor: 'yellow'}}
  searchWords={[searchQuery]}
  textToHighlight={item.content}
/>
    
                    }
           
                  </View>

                  <View style={{ flex: 1 }}>
                    <Image
                      source={require("../assets/icons/searchResult.png")}
                      style={{ height: 35, width: 35 }}
                    ></Image>
                  </View>
                </View>
              </View>
              </TouchableOpacity>

            </View>
          )}
        />
        
 </ScrollView> */

      /* </View>
    </View> */
  );
};



const mapStatetoProps = (state) => {
  // const { }=state
  // //console.log("sState", state.posts.preferences);
  // global.Chatdispatcher = state.chatss.chat_roster_main
  return {
    Userpreferences:state.chatss.preferences,
    isConnected:state.chatss.isConnected
  };
};
export default connect(mapStatetoProps)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 10 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 35,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
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
    marginTop:6
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
    backgroundColor:'#000',
    justifyContent:'center',
    marginTop:140,
    width: 360,
    height: 250,
    resizeMode: "contain"
  }
});
