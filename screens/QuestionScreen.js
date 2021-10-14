import React, { useEffect, setState, useRef } from 'react';
import { TabRouter, useTheme } from '@react-navigation/native';
import { Image, Platform, TouchableOpacity, ActivityIndicator, RefreshControl, Colors, ScrollView, ImageBackground, SafeAreaView, View, StyleSheet, StatusBar, DevSettings, TextInput, Alert, TouchableHighlight, } from 'react-native';
import axios from 'axios';
import { Text } from 'react-native-elements';
import ImageSlider from 'react-native-image-slider';
import LoginSuccessModal from './LoginSuccessModal'
import AsyncStorage from '@react-native-community/async-storage';
import * as Location from 'expo-location';
const GLOBAL = require('../Globals');
import { Avatar, Button, Card, Title, Paragraph, Searchbar } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatSpecificScreen from './ChatSpecificScreen'
import OnBoardingScreen from './OnBoardingScreen'
import I18n from '../src/i18n';
import LinearGradient from 'react-native-linear-gradient'
const Stack = createStackNavigator();
import { Chip } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { connect, useDispatch, useReducer } from "react-redux";
import { canPost } from './authGuard'
import Snackbar from 'react-native-snackbar';
const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};


const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const RightContent = props => <Text>500m</Text>
const QuestionsScreen = ({ navigation,route,token,isConnected }) => {

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    await getData();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const DashboardReducer = (prevState, action) => {

    switch (action.type) {
      case 'SETPOSTS':
        return {
          ...prevState,
          posts: action.posts,
          isLoading: false
        };

      case 'UPDATELOCATION':
        return {
          ...prevState,
          latitude: action.latitude,
          longitude: action.longitude
        };

    }
  };

  const initialState = {
    isLoading: false,
    completed: 0,
    pending: 0,
    issues: 0,
    payment: 0,
    latitude: null,
    longitude: null,
    errorMsg: null,
    userToken: null,
    posts: []
  };
  const [isLoading, setIsLoading] = React.useState(true);
  const [longitude, setLatitude] = React.useState(null);
  const [latitude, setLongitude] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [quickspaarks, setQuickSpaarks] = React.useState([]);
  const [canPos, setCanPost] = React.useState(false);
  const [DashboardState, dispatch] = React.useReducer(DashboardReducer, initialState);

  // async function Scratch() {
  //   console.log("In")
  //   // navigation.navigate('ScratchCardScreen')
  //   navigation.navigate("ScratchCardScreen")
  // }
                function onLogin(phone) {
                console.log("phoness", phone)
                Login.current.close();
                navigation.navigate('VerifyOtpScreen', { phone: phone })
              }

  async function getData() {
    try {
      var canpos = await canPost()
      setCanPost(canpos);
      await axios.get(
        `${GLOBAL.BASE_URL}market/previouscategories`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
            token
          },
        }
      ).then((resp) => {
        console.log('Quick Spaarks', resp.data.data)
        setQuickSpaarks(resp.data.data)
        // setRequestsReceived(resp.data)
      })
    } catch (err) {
      console.log('--------')
      console.log('err', err)
      console.log('--------')
    }

  }

  useEffect(() => {


    getData()
    //  let { status } = await Location.requestPermissionsAsync();
    //  if (status !== 'granted') {
    //    setErrorMsg('Permission to access location was denied');
    //    return;
    //  }



    // setTimeout(async() => {
    // try{
    // let location = await Location.getCurrentPositionAsync({});
    // console.log("Location in 5",location);
    // setLatitude(location.coords.latitude)
    // setLongitude(location.coords.longitude)
    // }catch(err){
    // console.log(err)
    // }
    // }, 5000);



  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  }
  if (DashboardState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const image1 = { uri: "https://res.cloudinary.com/spaarks/image/upload/v1613973414/1_c6eigo.png" };
  const image2 = { uri: "https://res.cloudinary.com/spaarks/image/upload/v1613973414/2_xk7z2s.png" };
  const image3 = { uri: "https://res.cloudinary.com/spaarks/image/upload/v1613973414/3_rz8x8b.png" };
  const image4 = { uri: "https://res.cloudinary.com/spaarks/image/upload/v1613973415/4_s52qvz.png" };
  const { colors } = useTheme();
  const theme = useTheme();
  const images = [
    'https://placeimg.com/640/640/nature',
    'https://placeimg.com/640/640/people',
    'https://placeimg.com/640/640/animals',
    'https://placeimg.com/640/640/beer',
  ];
  const refRBSheet = useRef();
  const Login = useRef();



async function sendNext(qno){
  var canp = await canPost();
var jwt = await AsyncStorage.getItem('token')

  if(qno == 3){
        navigation.navigate('SelectCategory', { questionNo:3 , question: I18n.t('I give a Service'), excluding: [], featureName: 'market' });
  }
  if(qno == 4){
      navigation.navigate('SelectCategory', { questionNo: 4, question: I18n.t("I have Something to Sell"), featureName: 'market', excluding: [{ "categoryIndex": 4 }, { "categoryIndex": 5 }, { "categoryIndex": 8 }, { "categoryIndex": 9 }, { "categoryIndex": 11 }, { "categoryIndex": 12 }, { "categoryIndex": 14 }, { "categoryIndex": 16 }, { "categoryIndex": 17 }, { "categoryIndex": 19 }, { "categoryIndex": 20 }, { "categoryIndex": 25 }] })
  }
  if(qno == 1){
    if(isConnected){
      if(String(jwt)!="null"){
       navigation.navigate('NewInfoStepperScreen', { questionNo: 1, question: I18n.t('Post something Social'), excluding: [], featureName: 'showtime', mediaP: [], mediaV: [] })
    }else{
      Login.current.open()
    }
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
     
  }
  if(qno == 6){
      navigation.navigate('SelectCategory', { questionNo: 6, question: 'Post a job', excluding: [{ "categoryIndex": 5 }, { "categoryIndex": 17 }, { "categoryIndex": 18 }, { "categoryIndex": 19 }, { "categoryIndex": 25 }], featureName: 'market' })
  }
  if(qno == 7){
       navigation.navigate('expertiseScreen', { questionNo: 7, question: 'I want a job', excluding: [], featureName: 'market' })
  }

   if(qno == 5){
      navigation.navigate('SelectCategory', { questionNo: 5, question: I18n.t('I need a Service'), excluding: [], featureName: 'market', mediaP: [], mediaV: [] })
  }
  if(qno == 9){
    navigation.navigate('NewPollStepperScreen', { questionNo: 9, question: I18n.t('poll'), excluding: [], featureName: 'showtime', mediaP: [], mediaV: [] })
}


  if(qno == 2){
if(isConnected){
  // alert(jwt)
  if(String(jwt)!="null"){
      navigation.navigate('newInfoStepperSayHii', { questionNo: 2, question: 'Make Friends', excluding: [], featureName: 'greet', mediaP: [], mediaV: [] })
   }else{
     Login.current.open()
   }

  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
   
}
}

  return (


    <>
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
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{ backgroundColor: "#F2F2F2", height: '100%' }}>
          <View style={{ margin: 10 }}>



{
  token != null?
 <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={quickspaarks}
              renderItem={({ item }) => (
                <>
                {
                  item.category && item.subCategory ?
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
                    >{

                    
                              item.subCategoryId != undefined?
                              <Image
                              source={{uri:`https://staging-api.ososweb.com/images/category/${item.subCategoryId.toLowerCase()}.png`}}
                              style={{
                                height: 75,
                                width: 75,
                                padding: 10,
                                borderRadius: 30,
                                margin: 10,
                              }}
                              cache="force-cache"
                            ></Image>:
                            item.categoryId != undefined?
                            <Image
                            source={{uri:`https://staging-api.ososweb.com/images/category/${item.categoryId.toLowerCase()}.png`}}
                            style={{
                              height: 75,
                              width: 75,
                              padding: 10,
                              borderRadius: 30,
                              margin: 10,
                            }}
                            cache="force-cache"
                          ></Image>:
                          <Image
                        source={{uri:`https://staging-api.ososweb.com/images/category/c1.png`}}
                        style={{
                          height: 75,
                          width: 75,
                          padding: 10,
                          borderRadius: 30,
                          margin: 10,
                        }}
                        cache="force-cache"
                      ></Image>
                        }







                    </View>
                    <View style={{ flex: 15 }}>
                      <Text h5 style={{ fontWeight: "bold", margin: 5 }}>
                        {/* {item.questionNo} */}
                        {
                          item.questionNo == 3 ?
                            <><Text>{I18n.t("I give a Service")}</Text></> :
                            item.questionNo == 4 ?
                              <><Text>{I18n.t("I have Something to Sell")}</Text></> :
                              item.questionNo == 6 ?
                                <><Text>Post a Job</Text></>
                                : <></>
                        }
                      </Text>
                      <Text
                        style={{ margin: 5, color: "#7B8794", flexShrink: 1 }}
                      >
                        {I18n.t(item.category)}-{I18n.t(item.subCategory)}
                      </Text>
                      <TouchableOpacity onPress={()=>navigation.navigate("NewInfoStepperScreen", {
                          categoryId: item.categoryId,
                          subCategoryId: item.subCategoryId,
                          question: item.questionNo == 3?I18n.t('I give a Service'):item.questionNo == 4?I18n.t('I have Something to Sell'):'Post a Job',
                          category: item.category,
                          questionNo:item.questionNo,
                          subCategory: item.subCategory,
                          featureName:'market',
                          isTag:item.isTag,
                          skippedSubCat:false,
                          mediaP:[],
                          mediaV:[]
                        })}>
                      <Text
                        style={{ margin: 5, color: "#6FA4E9", fontWeight: 'bold', flexShrink: 1 }}
                      >
                        QUICK SPAARK
                      </Text>
                      </TouchableOpacity>
                      
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
                        cache="force-cache"
                      ></Image>
                    </View>
                  </View>
                </View>
:<></>
                
                }

 
</>
              )}
            />
            :<></>
}
           
            <View style={{ marginTop: 10 }}>

              {/* <TouchableOpacity onPress={() => Scratch()
              }> */}
                <Text h4 style={{ fontWeight: 'bold' }}> {I18n.t("what_do_you_want_to_do_today")}</Text>
              {/* </TouchableOpacity> */}
            </View>
          </View>
          <View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
              </View>
              <View style={{ backgroundColor: "#fff", flex: 15, margin: 5, height: 250, borderRadius: 10 }}>
                {/* <TouchableOpacity onPress={() => navigation.navigate('SelectCategory', { questionNo: 3, question: 'I give a Service', excluding: [], featureName: 'market' })
                }> */}
   <TouchableOpacity onPress={() => sendNext(3)
                }>

                  <ImageBackground source={require('../assets/que/q3.png')} style={styles.image} imageStyle={{ borderRadius: 10 }}>
                  <View style={{width: '100%',marginTop:0,backgroundColor:'#fff',  opacity: .6, marginBottom: 0,position:'absolute',zIndex:1,height:50,top:180}} >
                    <Text h5 style={{ color: "#000", fontWeight:'800', padding: 2,position:'absolute',top:0 ,fontSize : 13.2}}>{I18n.t("I give a Service")}</Text>
                    <Text h6 style={{ marginTop: 0, color: "#000", fontWeight: '500', padding: 2, marginBottom: 0,flexWrap: 'wrap',position:'absolute',top:20, textAlign: 'left',fontSize:10 }}>{I18n.t("Que_des1")}</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>


              <View style={{ backgroundColor: "#fff", flex: 15, margin: 5, height: 250, borderRadius: 10 }}>
                {/* <TouchableOpacity onPress={() => navigation.navigate('SelectCategory', { questionNo: 4, question: 'I have Something to Sell', featureName: 'market', excluding: [{ "categoryIndex": 4 }, { "categoryIndex": 5 }, { "categoryIndex": 8 }, { "categoryIndex": 9 }, { "categoryIndex": 11 }, { "categoryIndex": 12 }, { "categoryIndex": 14 }, { "categoryIndex": 16 }, { "categoryIndex": 17 }, { "categoryIndex": 19 }, { "categoryIndex": 20 }, { "categoryIndex": 25 }] })
                }> */}
                   <TouchableOpacity onPress={() => sendNext(4)}>
                  
                  <ImageBackground source={require('../assets/que/q4.png')} style={styles.image} imageStyle={{ borderRadius: 10 }}>
            

                  <View style={{width: '100%',marginTop:0,backgroundColor:'#fff',  opacity: .6, marginBottom: 0,position:'absolute',zIndex:1,height:50,top:180}} >
                    <Text h5 style={{ color: "#000", fontWeight:'800', padding: 1,position:'absolute',top:0 ,fontSize : 13.2 ,}}>{I18n.t("I have Something to Sell")}</Text>
                    <Text h6 style={{ marginTop: 0, color: "#000", fontWeight: '500', padding: 2, marginBottom: 0,flexWrap: 'wrap',position:'absolute',top:20, textAlign: 'left',fontSize:10 }}>{I18n.t("Ques_des2")}</Text>
                    </View>
                  </ImageBackground>

                </TouchableOpacity>
              </View>
      <View style={{ flex: 1 }}>
              </View>
          
          
            </View>

           
           
           
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
              </View>
        

              <View style={{ backgroundColor: "#fff", flex: 15, margin: 5, height: 250, borderRadius: 10 }}>
                {/* <TouchableOpacity onPress={() => navigation.navigate('SelectCategory', { questionNo: 6, question: 'Post a Job', excluding: [{ "categoryIndex": 5 }, { "categoryIndex": 17 }, { "categoryIndex": 18 }, { "categoryIndex": 19 }, { "categoryIndex": 25 }], featureName: 'market' })
                }> */}
                 <TouchableOpacity onPress={() => sendNext(6)}>
                  <ImageBackground source={require('../assets/que/q6.png')} style={styles.image} imageStyle={{ borderRadius: 10}}>

                    {/* <Text h5 style={{ marginTop: 180, color: "#000",  fontWeight:'800', padding: 2 }}>Post a Job</Text>
     ,fontSize : 13.2                <Text h6 style={{ marginTop: 0, color: "#000",fontWeight: '500', padding: 2, flexWrap: 'wrap', textAlign: 'left', marginBottom: 15 }}>Maid,Teacher,Cleaner,Sweeper,Mechanic,Technician,Plumber,Electrician</Text>
                     */}
                    
                    <View style={{width: '100%',marginTop:0,backgroundColor:'#fff',  opacity: .6, marginBottom: 0,position:'absolute',zIndex:1,height:50,top:180}} >
                  <Text h5 style={{color: "#000", fontWeight:'800', padding: 2,position:'absolute',top:0 ,fontSize : 13.2}}>{I18n.t("Post a Job")}</Text>
                  <Text h6 style={{ marginTop: 0, color: "#000", fontWeight: '500', padding: 2, marginBottom: 0,flexWrap: 'wrap',position:'absolute',top:20, textAlign: 'left',fontSize:10 }}>{I18n.t("Ques_des3")}</Text>
                    </View>
                 
                  </ImageBackground>
                </TouchableOpacity>
              </View>


              <View style={{ backgroundColor: "#fff", flex: 15, margin: 5, height: 250, borderRadius: 10 }}>
                {/* <TouchableOpacity onPress={() => navigation.navigate('NewInfoStepperScreen', { questionNo: 1, question: 'Announce Something', excluding: [], featureName: 'showtime', mediaP: [], mediaV: [] })
                }> */}
                 <TouchableOpacity onPress={() => sendNext(1)}>
                  <ImageBackground source={require('../assets/que/q1.png')} style={styles.image} imageStyle={{ borderRadius: 10}}>
                  <View style={{width: '100%',marginTop:0,backgroundColor:'#fff',  opacity: .6, marginBottom: 0,position:'absolute',zIndex:1,height:50,top:180}} >
                  <Text h5 style={{color: "#000", fontWeight:'800', padding: 2,position:'absolute',top:0 ,fontSize : 13.2}}>{I18n.t("Post something Social")}</Text>
                  <Text h6 style={{ marginTop: 0, color: "#000", fontWeight: '500', padding: 2, marginBottom: 0,flexWrap: 'wrap',position:'absolute',top:20, textAlign: 'left',fontSize:10 }}>{I18n.t("SocialText")}</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>




              <View style={{ flex: 1 }}>
              </View>

              
            </View>


            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
              </View>


              <View style={{ backgroundColor: "#fff", flex: 15, margin: 5, height: 250, borderRadius: 10 }}>
                {/* <TouchableOpacity onPress={() => navigation.navigate('expertiseScreen', { questionNo: 7, question: 'Want a Job', excluding: [], featureName: 'market' })
                }> */}
                  <TouchableOpacity onPress={() => sendNext(7)}>

                  <ImageBackground source={require('../assets/que/q7.png')} style={styles.image} imageStyle={{ borderRadius: 10}}>
                  <View style={{width: '100%',marginTop:0,backgroundColor:'#fff',  opacity: .6, marginBottom: 0,position:'absolute',zIndex:1,height:50,top:180}} >
                  <Text h5 style={{color: "#000", fontWeight:'800', padding: 2,position:'absolute',top:0 ,fontSize : 13.2}}>{I18n.t("I Want a Job")}</Text>
                  <Text h6 style={{ marginTop: 0, color: "#000", fontWeight: '500', padding: 2, marginBottom: 0,flexWrap: 'wrap',position:'absolute',top:20, textAlign: 'left',fontSize:10 }}>{I18n.t("Ques_des5")}</Text>
                    </View>
                   
                  </ImageBackground>
                </TouchableOpacity>
              </View>



              <View style={{ backgroundColor: "#fff", flex: 15, margin: 5, height: 250, borderRadius: 10 }}>
                {/* <TouchableOpacity onPress={() => navigation.navigate('SelectCategory', { questionNo: 5, question: 'I need a Service', excluding: [], featureName: 'market', mediaP: [], mediaV: [] })
                }> */}

                 <TouchableOpacity onPress={() => sendNext(5)}>
                  <ImageBackground source={require('../assets/que/q5.png')} style={styles.image} imageStyle={{ borderRadius: 10}}>
                  <View style={{width: '100%',marginTop:0,backgroundColor:'#fff',  opacity: .6, marginBottom: 0,position:'absolute',zIndex:1,height:50,top:180}} >
                  <Text h5 style={{color: "#000", fontWeight:'800', padding: 2,position:'absolute',top:0 ,fontSize : 13.2}}>{I18n.t("I need a Service")}</Text>
                  <Text h6 style={{ marginTop: 0, color: "#000", fontWeight: '500', padding: 2, marginBottom: 0,flexWrap: 'wrap',position:'absolute',top:20, textAlign: 'left',fontSize:10 }}>{I18n.t("Ques_des6")}</Text>
                    </View>
                    </ImageBackground>
                </TouchableOpacity>
              </View>











              <View style={{ flex: 1 }}>
              </View>
            </View>



            <View style={{ flexDirection: 'row', borderRadius: 10 }}>
              <View style={{ flex: 1 }}>
              </View>

              {/* SelectCategory */}



                
              <View style={{backgroundColor:"#fff",flex:15,margin:5,height:250,borderRadius:10}}>
      {/* <TouchableOpacity onPress={() => navigation.navigate('NewInfoStepperScreen',{questionNo:2,question:'Make Friends',excluding:[],featureName:'greet'})
      }> */}
        <TouchableOpacity onPress={() => sendNext(2)
      }>


    <ImageBackground source={require('../assets/que/q2.png')} style={styles.image} imageStyle={{ borderRadius: 10}}>
    <View style={{width: '100%',marginTop:0,backgroundColor:'#fff',  opacity: .6, marginBottom: 0,position:'absolute',zIndex:1,height:50,top:180}} >
                  <Text h5 style={{color: "#000", fontWeight:'800', padding: 2,position:'absolute',top:0 ,fontSize : 13.2}}>{I18n.t("Make Friends")}</Text>
                  <Text h6 style={{ marginTop: 0, color: "#000", fontWeight: '500', padding: 2, marginBottom: 0,flexWrap: 'wrap',position:'absolute',top:20, textAlign: 'left',fontSize:10 }}>{I18n.t("Ques_des7")}</Text>
                    </View>
   </ImageBackground>
    </TouchableOpacity>
    </View>

    <View style={{backgroundColor:"#fff",flex:15,margin:5,height:250,borderRadius:10}}>
      <TouchableOpacity onPress={() => sendNext(1)
      }>
    <ImageBackground source={require('../assets/que/q8.png')} style={styles.image} imageStyle={{ borderRadius: 10}}>
    <View style={{width: '100%',marginTop:0,backgroundColor:'#fff',  opacity: .6, marginBottom: 0,position:'absolute',zIndex:1,height:50,top:180}} >
                  <Text h5 style={{color: "#000", fontWeight:'800', padding: 2,position:'absolute',top:0 ,fontSize : 13.2}}>{I18n.t("others")}</Text>
                  <Text h6 style={{ marginTop: 0, color: "#000", fontWeight: '500', padding: 2, marginBottom: 0,flexWrap: 'wrap',position:'absolute',top:20, textAlign: 'left',fontSize:10 }}>{I18n.t("Ques_des8")}</Text>
                    </View>
    </ImageBackground>
    </TouchableOpacity>
    </View>

    














              <View style={{ flex: 1 }}>
              </View>
            </View>






            <View style={{ flexDirection: 'row', borderRadius: 10 }}>
              <View style={{ flex: 1 }}>
              </View>

              {/* SelectCategory */}



                
              {/* <View style={{backgroundColor:"#fff",width:'91%',margin:5,height:250,borderRadius:10}}>
      <TouchableOpacity onPress={() => sendNext(9)
      }>
    <ImageBackground source={require('../assets/que/q9.png')} style={styles.image} imageStyle={{ borderRadius: 10}}>
    <View style={{width: '100%',marginTop:0,backgroundColor:'#fff',  opacity: .6, marginBottom: 0,position:'absolute',zIndex:1,height:50,top:180}} >
                  <Text h5 style={{color: "#000", fontWeight:'800', padding: 2,position:'absolute',top:0 ,fontSize : 13.2}}>{I18n.t("poll")}</Text>
                  <Text h6 style={{ marginTop: 0, color: "#000", fontWeight: '500', padding: 2, marginBottom: 0,flexWrap: 'wrap',position:'absolute',top:20, textAlign: 'left',fontSize:10 }}>{I18n.t("Ques_des9")}</Text>
                    </View>
    </ImageBackground>
    </TouchableOpacity>
    </View> */}

   

    














              <View style={{ flex: 1 }}>
              </View>
            </View>







          </View>

























        </View>

        

      </ScrollView>


    </>

  );
};


const mapStatetoProps = (state) => {
  return {
    profilePic: state.chatss.profilePic,
    token: state.chatss.token,
    isConnected:state.chatss.isConnected
    
  };
};

export default connect(mapStatetoProps)(QuestionsScreen);


const styles = StyleSheet.create({
  image: {
    borderRadius: 20,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  },
  chats: {
    height: 50,
    width: 30,
    margin: 20
  },
  eachCard: {
    padding: 10,
    backgroundColor: "#fff",
    margin: 10
  },

  body: {

  },
  BottomNav: {
    flex: 0, flexDirection: 'row',
    backgroundColor: "#63CDFF"
  },

  LoginComponent: {
    height: 500,
    width: 100,
    margin: 50
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#000"
  },

  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  tinyLogo: {
    flex: 0,
    height: 120,
    width: 120,
    margin: 20
  },
  rows1: {
    flex: 0, flexDirection: 'row',

  },
  image: {
    resizeMode: "contain",
    height: 180,
    marginTop:10,
    justifyContent: "center"
  },
  rows2: {
    flex: 0, flexDirection: 'row'
  },
  scrollView: {

  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    height: 1000,
    backgroundColor: '#f2f2f2'
  },
  sectionContainercol: {
    marginTop: 32,
    paddingHorizontal: 24,
    width: 200,
    height: 100
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    padding: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: "#ffffff",
    fontWeight: '700'
  },
  sectionDescription: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: "#ffffff",
  },

  sectionDescriptions: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },





  buttonSelected: {
    opacity: 1,
    color: 'red',
  },
  customSlide: {

    alignItems: 'center',
    justifyContent: 'center',
  },
  customImage: {
    width: 390,
    height: 500,
    resizeMode: "cover"
  },



});