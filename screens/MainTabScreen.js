import React, { useEffect, useState } from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import I18n from '../src/i18n';
import {
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  StatusBar,
  DevSettings,
  AsyncStorage,
  TextInput,
  Alert,
} from "react-native";
import SelectCityScreen from "./SelectCityScreen";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
import GreetPostSpecificScreen from "./GreetPostSpecificScreen";
import ScanQrScreen from './ScanQrScreen';
import CompleteProfileScreen from './CompleteProfileScreen';
import ImageViewScreen from './ImageViewScreen';
import OutGoingCallScreen from "./OutGoingCallScreen";
import ForwardMessageScreen from './ForwardMessageScreen';
import KnowMoreRewardsScreen from './KnowMoreRewardsScreen';
import IncomingCallScreen from './IncomingCallScreen';
import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";
import SearchScreen from "./SearchScreen";
import SearchScreenAll from "./SearchScreenAll";
import ExploreScreen from "./ExploreScreen";
import ExploreScreens from "./ExploreScreen";
import PreferncesScreen from "./PreferncesScreen";
import ApplicableCategories from "./ApplicableCategoriesScreen";
// import SpaarksTemplateActivity from "./SpaarksTemplateActivity";
import QuestionScreen from "./QuestionScreen";
import SelectCategoryScreen from "./SelectCategoryScreen";
import MarketScreen from "./MarketScreen";
import FullPostScreen from "./FullPostScreen";
import ChatSpecificScreen from "./ChatSpecificScreen";
import OnBoardingScreen from "./OnBoardingScreen";
import UserProfileScreen from "./UserProfileScreen";
import PostSpecificScreen from "./PostSpecificScreen";
import PostSpecificScreenGreet from "./PostSpecificScreenGreet";
import ViewFullScreenImagesScreen from './ViewFullScreenImagesScreen';
import NewInfoStepperScreen from "./NewInfoStepperScreen";
import NewInfoStepperScreen2 from "./NewInfoStepperScreen2";
import SelectSubCategoryScreen from "./SelectSubCategoryScreen";
import SellerProfileScreen from "./SellerProfileScreen";
import ViewAllScreen from "./ViewAllScreens";
import FaqsScreen from "./FaqsScreen";
import SipScreen from "./SipScreen";
import HelpScreen from "./HelpScreen";
import RepliesScreen from "./RepliesScreen";
import ConnectWithUsScreen from "./ConnectwithUsScreen";
import AllFeaturesScreen from './AllFeaturesScreen'
import GetMyLocation from "./GetMyLocationScreen";
import SelectCity from "./SelectCityScreen";
import ViewImages from "./ImageViewerScreen";
import expertiseScreen from "./expertiseScreen";
import VerifyOtpScreen from "./VerifyOtpScreen";
import NotificationScreen from './NotificationScreen'
import SelectPhotosScreen from './SelectPhotosScreen'
import GuidelinesScreen from './GuidelinesScreen';
import SettingsScreen from './SettingsScreen'
import qrcodeScreen from './qrcodeScreen'
import SendChatRequest from './SendChatRequest'
import BlockedUsersScreen from './BlockedUsersScreen'
import LanguageScreen from './LanguageScreen'
import WebViewScreen from './WebViewScreen'
import BankDetailsScreen from './BankDetailsScreen'
// import ScratchCardScreen from './ScratchCardScreen'
import TicketSpecificScreen from './TicketSpecificScreen'
import CreateNewTicketScreen from "./CreateNewTicketScreen";
import testPage from './testPage'
import AskRatingScreen from "./AskRatingScreen";
import { connect, useDispatch, useReducer } from "react-redux";
import GreetRequestsScreen from "./GreetRequestsScreen";
import testScreen from './testScreen';
import newInfoStepperSayHii from './newInfoStepperSayHii';
import newInfoStepperSayHii2 from './newInfoStepperSayHii2';
import RewardsScreen from './RewardsScreen';
import BookmarksScreen from "./BookmarksScreen";
import ConnectionsScreen from './ConnectionsScreen';
import spaarksPartnerScreen1 from './spaarksPartnerScreen1';
import spaarksPartnerScreen2 from './spaarksPartnerScreen2';
import spaarksPartnerScreen3 from './spaarksPartnerScreen3';
import spaarksPartnerScreen5 from './spaarksPartnerScreen5';
import spaarksPartnerDashboard from './spaarksPartnerDashboard';
import MySetsScreen from './MySetsScreen';
import QrForPartnerScreen from './QrForPartnerScreen';
import UserProfileDynamicScreen from './UserProfileDynamicScreen';
import AskNameScreen from './AskNameScreen';
import releaseNotesScreen from './releaseNotesScreen';
import BusinessEnquiries from "./BusinessEnquiries";
import spaarksPartnerScreen0 from "./spaarksPartnerScreen0";
import spaarksPartnerScreen4 from "./spaarksPartnerScreen4";
import VideoPlayer from "./VideoPlayer"
import callLogsScreen from "./callLogsScreen"
import GreetingsScreen from "./GreetingsScreen"
import DetailedCallLogs from './DetailedCallLogs'
import NewPollStepperScreen from './NewPollStepperScreen'
import NewPollStepperScreen2 from './NewPollStepperScreen2'
import MyPollsScreen from './MyPollsScreen';
import AllPollsScreen from './AllPollsScreen';
import ChatStack from './ChatStack'
import QrcodeMenuScreen from "./QrcodeMenuScreen";
import ExploreNearby from './ExploreNearby';
import LocationInformationScreen from './LocationInformationScreen';

import axios from "axios";
const GLOBAL = require('../Globals');
// import InAppReview from './InAppReview';
const Stack = createStackNavigator();
const DetailsStack = createStackNavigator();
const HomeStack = createStackNavigator();
const image1 = {
  uri:
    "https://res.cloudinary.com/spaarks/image/upload/v1613973414/1_c6eigo.png",
};

const Tab = createMaterialBottomTabNavigator();
var aw = NaN;
const getTabBarVisibility = (route) => {
  const routeName = route;

  if (routeName === "ChatSpecificScreenFinal") {
    return false;
  }
  // if (routeName === "UserProfileScreen") {
  //   return false;
  // }
  return true;
};


async function asd() {
  alert('Hiii')
}
const MainTabScreen = ({ navigation, route, profilePic,HomeGif, unreadCount, isConnected, showOnline }) => (

  <>
  {/* <View style={{backgroundColor:'#68dc6c',marginTop:35}}>
    <TouchableOpacity onPress={()=>navigation.navigate('SettingsScreen')}>
    <Text style={{textAlign:'center',color:'#fff',padding:10}}>Tap to Return to call</Text>
    </TouchableOpacity>
  </View> */}
    <Tab.Navigator
      initialRouteName="Profile"
      activeColor="#fff"
      shifting={false}

      barStyle={{ backgroundColor: '#fff' }}
      labeled={true}
      lazy={true}
      swipeEnabled={true}
    >

      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={({ route,navigation }) => ({
          tabBarLabel: <View>{navigation.isFocused()?<><Text style={{ fontSize: 12,position:'absolute',left:17,top:5,color:'#6FA4E9'}}>Explore </Text></>:<><Text style={{ fontSize: 12,position:'absolute',left:17,top:5}}>Explore </Text></>}</View>,
          tabBarColor: "#ffffff",
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 10,
            padding: 0,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/bottomicons/b1b.png")
                  : require("../assets/bottomicons/b1g.png")
              }
              style={{
                margin: 0,
                width: 32,
                height: 32,
                top: 5
              }}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Profile"
        component={DetailsStackScreen}
        options={({ route,navigation }) => ({
          tabBarVisible: false,
          tabBarLabel: <View>{navigation.isFocused()?<><Text style={{ fontSize: 12,position:'absolute',left:22,top:5,color:'#6FA4E9'}}>Home</Text></>:<><Text style={{ fontSize: 12,position:'absolute',left:22,top:5}}>Home</Text></>}</View>,
          tabBarColor: "#ffffff",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/bottomicons/b2b.png")
                  : require("../assets/bottomicons/b2g.png")
              }
              style={{
                margin: 0,
                width: 32,
                height: 32,
                top: 5

              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name={I18n.t("Notifications")}
        component={LeadStackScreen}
        options={({ route,navigation }) => ({
          tabBarLabel:  <View>{navigation.isFocused()?<><Text style={{ fontSize: 12,position:'absolute',left:22,top:4,color:'#6FA4E9'}}>Create</Text></>:<><Text style={{ fontSize: 12,position:'absolute',left:22,top:4}}>Create</Text></>}</View>,
          tabBarColor: "#ffffff",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/bottomicons/b3b.png")
                  : require("../assets/bottomicons/b3g.png")
              }
              style={{
                margin: 0,
                width: 32,
                height: 32,
                top: 5

              }}
            />
          ),
        })}
      />
        <Tab.Screen
            name={I18n.t("Explore")}
            component={ChatStack}
            // tabBarAccessibilityLabel={() => alert('hii')}
            options={({ route,navigation }) => ({
              tabBarBadge: !isNaN(unreadCount)?unreadCount.toFixed(0) == 0?false:unreadCount.toFixed(0):false,
              tabBarBadgeStyle: { backgroundColor: 'blue' },
              tabBarLabel: <View>{navigation.isFocused()?<><Text style={{ fontSize: 12,position:'absolute',left:22,top:2,color:'#6fa4e9'}}>Chats </Text></>:<><Text style={{ fontSize: 12,position:'absolute',left:22,top:2}}>Chats</Text></>}</View>,
              // tabBarColor: "#fffff",
              tabBarIcon: ({ focused, color, size }) => (
                
                  <Image
                    source={
                      focused
                        ? require("../assets/bottomicons/b4b.png")
                        : require("../assets/bottomicons/b4g.png")
                    }
                    style={{
                      margin: 0,
                      width: 32,
                      height: 32,
                      top: 5

                    }}
                  />
 
              ),
            })}
          />
      
      <Tab.Screen
        name="UserData"
        component={MyProfileData}
        options={({ route,navigation }) => ({
          tabBarLabel: <View>{navigation.isFocused()?<><Text style={{ fontSize: 12,position:'absolute',left:22,top:2,color:'#6fa4e9'}}>Profile </Text></>:<><Text style={{ fontSize: 12,position:'absolute',left:22,top:2}}>Profile</Text></>}</View>,
          tabBarColor: "#fff",
          activeTintColor: "#f2f2f2",
          tabBarOptions: {
            activeTintColor: "#f2f2f2",
          },
          tabBarIcon: ({ focused, color, size }) => (
            <View>
              <Image
                source={
                  {
                    uri:
                      focused
                        ? profilePic
                        : profilePic
                  }
                }
                style={{
                  margin: 5,
                  width: 30,
                  height: 30,
                  borderRadius: 10,
                  borderColor: '#6FA4E9',
                  borderWidth: 0.5,
                  borderRadius: 30
                }}
              />
              <Text style={{ fontSize: 9 }}></Text>
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  



  </>
);


const mapStatetoProps = (state) => {
  return {
    profilePic: state.chatss.profilePic,
    unreadCount: state.chat.unreadCount,
    isConnected: state.chatss.isConnected,
    showOnline: state.chatss.showOnline,
    HomeGif:"state.chatss.HomeGif"
  };
};

export default connect(mapStatetoProps)(MainTabScreen);
// export connect(mapStatetoProps)(DetailsStackScreen);

const HomeStackScreen = ({ navigation, route }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      initialParams={{ postId: "all", selected: {}, isFromPost: false }}
      options={{
        title: "",
        headerLeft: () => (
          <Text style={{ color: "#6FA4E9", fontSize: 25, paddingLeft: 20, paddingBottom: 10 }}>
            {I18n.t("Explore")}
          </Text>
        ),
      }}
    />




    <HomeStack.Screen
      name="AskNameScreen"
      component={AskNameScreen}
      initialParams={{ postId: "all", selected: {}, isFromPost: false }}
      options={{
        title: "Setup Profile",
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
        //     {" "}
        //   </Text>
        // ),
      }}
    />


<HomeStack.Screen
      name="ExploreNearby"
      component={ExploreNearby}
      initialParams={{ postId: "all", selected: {}, isFromPost: false }}
      options={{
        // headerShown: false,
        title: "Explore Nearby",
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
        //     {" "}
        //   </Text>
        // ),
      }}
    />

<HomeStack.Screen
      name="LocationInformationScreen"
      component={LocationInformationScreen}
      initialParams={{ postId: "all", selected: {}, isFromPost: false }}
      options={{
        headerShown: false,
        title: "Explore",
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
        //     {" "}
        //   </Text>
        // ),
      }}
    />




    <HomeStack.Screen
      name="Details"
      component={DetailsScreen}
      initialParams={{ message: "", showTag: false }}
      options={{
        headerShown: false,
        title: I18n.t("Spaarks"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
        //     {I18n.t("Spaarks")}
        //   </Text>
        // ),
      }}
    />


    <HomeStack.Screen
      name="SelectCityScreen"
      component={SelectCityScreen}
      initialParams={{ message: "", showTag: false }}
      options={{
        title: "Spaarks",
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
        //     {I18n.t("Spaarks")}
        //   </Text>
        // ),
      }}
    />


    <HomeStack.Screen
      name="GetMyLocation"
      component={GetMyLocation}
      initialParams={{ message: "", showTag: false }}
      options={{
        title: I18n.t("Spaarks"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
        //     {I18n.t("Spaarks")}
        //   </Text>
        // ),
      }}
    />






    {/* <Stack.Screen name="PostSpecifics" component={ProfileScreen} 
       options={navigation => ({
        // tabBarIcon: ,
        tabBarVisible:  false 
      })} /> */}
    {/* <HomeStack.Screen
    name="ChatSpecific"
      component={ChatSpecificScreen}
      options={(navigation) => ({

      })}
    /> */}

    {/* <HomeStack.Screen
      name="GetMyLocation"
      component={GetMyLocation}
      options={(navigation) => ({
        headerLeft: () => (
          <Text
            style={{
              color: "#6FA4E9",
              fontSize: 25,
              paddingLeft: 150,
              justifyContent: "center",
            }}
          >
            Spaarks
          </Text>
        ),
      })}
    /> */}



    <HomeStack.Screen
      name="SelectCity"
      component={SelectCity}
      options={(navigation) => ({
        title:I18n.t("Spaarks"),
        headerTintColor:'#6FA4E9',
        // I18n.t("Spaarks")
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 25,
        //       paddingLeft: 150,
        //       justifyContent: "center",
        //     }}
        //   >   {I18n.t("Spaarks")}
        //   </Text>
        // ),
      })}
    />

    <HomeStack.Screen
      name="OnBoarding"
      component={OnBoardingScreen}
      options={(navigation) => ({
        title:'',
        headerTintColor:'#6FA4E9',
        // tabBarIcon: ,
        tabBarVisible: false,
      })}
    />

    <HomeStack.Screen
      name="ChatSpecificScreenFinal"
      component={ChatSpecificScreen}
      options={{
        title:I18n.t("Spaarks"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 25,
        //       paddingLeft: 150,
        //       justifyContent: "center",
        //     }}
        //   >
        //     {I18n.t("Spaarks")}
        //   </Text>
        // ),
      }}
    />




    <HomeStack.Screen
      name="SelectImages"
      component={SelectPhotosScreen}
      options={{
        title:'',
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 25,
        //       paddingLeft: 150,
        //       justifyContent: "center",
        //     }}
        //   >
        //     {I18n.t("Spaarks")}
        //   </Text>
        // ),
      }}
    />


    <HomeStack.Screen
      name="PostSpecificScreens"
      component={PostSpecificScreen}
      options={({ navigation, route }) => ({
        title: I18n.t('Post'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />


    <HomeStack.Screen
      name="ViewFullScreenImagesScreen"
      component={ViewFullScreenImagesScreen}
      options={{
        title: 'Images',
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <></>
        // ),
      }}
    />




    <HomeStack.Screen
      name="OutGoingCallScreen"
      component={OutGoingCallScreen}
      options={{
        title: I18n.t("Ongoing Call"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 25,
        //       paddingLeft: 130,
        //       justifyContent: "center",
        //     }}
        //   >
        //     {I18n.t("Ongoing Call")} <Text style={{
        //       color: "#6FA4E9",
        //       fontSize: 15,
        //       paddingLeft: 10,
        //       fontStyle: 'italic'
        //     }}>Beta</Text>
        //   </Text>
        // ),
      }}
    />





    <HomeStack.Screen
      name="IncomingCallScreen"
      component={IncomingCallScreen}
      options={{
        title: I18n.t("Ongoing Call"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 25,
        //       paddingLeft: 130,
        //       justifyContent: "center",
        //     }}
        //   >
        //     {I18n.t("Ongoing Call")} <Text style={{
        //       color: "#6FA4E9",
        //       fontSize: 15,
        //       paddingLeft: 10,
        //       fontStyle: 'italic'
        //     }}>Beta</Text>
        //   </Text>
        // ),
      }}
    />





    <HomeStack.Screen
      name="SipScreen"
      component={SipScreen}
      options={{
        title:I18n.t("Spaarks"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 25,
        //       paddingLeft: 150,
        //       justifyContent: "center",
        //     }}
        //   >
        //     {I18n.t("Spaarks")}
        //   </Text>
        // ),
      }}
    />
    <HomeStack.Screen
      name="RepliesScreen"
      component={RepliesScreen}
      options={({ navigation, route }) => ({
        title: I18n.t('Replies'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <HomeStack.Screen
      name="ViewAll"
      component={ViewAllScreen}
      options={{
        title: 'View',
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 25,
        //       paddingLeft: 150,
        //       justifyContent: "center",
        //     }}
        //   >{I18n.t("Spaarks")}
        //   </Text>
        // ),
      }}
    />



    <HomeStack.Screen
      name="VerifyOtpScreen"
      component={VerifyOtpScreen}
      options={({ navigation, route }) => ({
        title: I18n.t('Login'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />


  </HomeStack.Navigator>
);

var a = true


  const DetailsStackScreen = ({navigation,route,token }) => {

var [uri,setURI] = useState("as")
var [showData,setShowData] = useState(true)
async function getData(){
await axios.get(
`${GLOBAL.PLAIN_URL}getlogoicon`
).then((resp) => {
  setShowData(Boolean(resp.data.showData))
  setURI(resp.data.url)
})

}
    useEffect(()=>{
      getData()
    },[])
return(


  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}
  >


    <DetailsStack.Screen
      name="S"
      component={DetailsScreen}
      initialParams={{ fetchNew: false, message: "", showTag: false }}
      // tabBarVisible={false}
      // headerShown: false,
      options={{
        headerShown: true,
        tabBarVisible: false,
        title: '',
        headerLeft: () => (
          <>
            <View style={{ flexDirection: 'row' }}>
             {
               showData?
               <Text style={{ color: "#6FA4E9", fontSize: 32, paddingLeft: 10, fontSize: 22, paddingBottom: 13 }}>
               {I18n.t("Spaarks")}
             </Text>
             :
             <></>
             }
             
             
              <Image source={{uri:uri}} style={{height:50,width:150,marginLeft:10,paddingLeft:10}}/>
            </View>

          </>
        ),
        headerRight: () => (
          <View style={{ flexDirection: "row" }}>

            <TouchableOpacity
              onPress={() => navigation.navigate("qrcodeScreen")}
              style={{ backgroundColor: "#fff" }}
            >
              <Image
                source={require("../assets/icons/t1.png")}
                style={styles.TopIcons}
              />
            </TouchableOpacity>



            <TouchableOpacity
              onPress={() => navigation.navigate("NotificationScreen")}
              style={{ backgroundColor: "#fff" }}
            >
              <Image
                source={require("../assets/icons/t3.png")}
                style={styles.TopIcons}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("CallLogsScreen")}
              style={{ backgroundColor: "#fff" }}
            >
              <Image
                source={require("../assets/icons/t2.png")}
                style={styles.TopIcons}
              />
            </TouchableOpacity>
          </View>
        ),
      }}
    />

<DetailsStack.Screen
        name="ConnectionsScreen"
        component={ConnectionsScreen}
        options={({ navigation, route }) => ({
          title: I18n.t('Connections'),
          headerTintColor:'#6FA4E9',
        })}
      />
    <DetailsStack.Screen
      name="VideoPlayer"
      component={VideoPlayer}

      options={{
        title: I18n.t("Video"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 20,
        //       textAlign: "left",
        //     }}
        //   >
        //     {I18n.t("Video")}
        //   </Text>
        // )
      }}
    />


<DetailsStack.Screen
      name="SearchScreenAll"
      component={SearchScreenAll}
      options={{
        title: I18n.t("Search"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 25,
        //       paddingLeft: 150,
        //       justifyContent: "center",
        //     }}
        //   >
        //     {I18n.t("Search")}
        //   </Text>

        // ),
      }}
    />

    <DetailsStack.Screen
      name="UserProfileDynamic"
      component={UserProfileDynamicScreen}
      options={{
        title: I18n.t("User Profile"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 20,
        //       textAlign: "left",
        //     }}
        //   >
        //     {I18n.t("User Profile")}
        //   </Text>
        // )
      }}
    />


    <DetailsStack.Screen
      name="spaarksPartnerScreen1"
      component={spaarksPartnerScreen1}



      options={{
        title: I18n.t("Spaarks Partner Program"),
        headerTintColor:'#6FA4E9'
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('Spaarks')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     {I18n.t("Spaarks Partner Program")}
        //   </Text>
        // )
      }}
    />


    <DetailsStack.Screen
      name="spaarksPartnerScreen2"
      component={spaarksPartnerScreen2}

      options={{
        title: I18n.t("Spaarks Partner Program"),
        headerTintColor:'#6FA4E9'
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('spaarksPartnerScreen1')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     {I18n.t("Register as Spaarks Partner")}
        //   </Text>
        // )
      }}
    />


    <DetailsStack.Screen
      name="spaarksPartnerScreen3"
      component={spaarksPartnerScreen3}

      options={{
        title: I18n.t("Spaarks Partner Program"),
        headerTintColor:'#6FA4E9'
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('spaarksPartnerScreen2')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     {I18n.t("Spaarks Partner Program")}
        //   </Text>
        // )
      }}
    />

    <DetailsStack.Screen
      name="spaarksPartnerScreen5"
      component={spaarksPartnerScreen5}

      options={{
        title: I18n.t("Spaarks Partner Program"),
        headerTintColor:'#6FA4E9'
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('Spaarks')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     {I18n.t("Spaarks Partner Program")}
        //   </Text>
        // )
      }}
    />


    <DetailsStack.Screen
      name="spaarksPartnerScreen4"
      component={spaarksPartnerScreen4}

      options={{
        title: I18n.t("Spaarks Partner Program"),
        headerTintColor:'#6FA4E9'
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('spaarksPartnerScreen2')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     {I18n.t("Spaarks Partner Program")}
        //   </Text>
        // )
      }}
    />




    <DetailsStack.Screen
      name="spaarksPartnerDashboard"
      component={spaarksPartnerDashboard}

      options={{
        title: I18n.t("Spaarks Partner Program"),
        headerTintColor:'#6FA4E9'
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('Spaarks')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     {I18n.t('Spaarks Partner')}
        //   </Text>
        // )
      }}
    />


    <DetailsStack.Screen
      name="MySetsScreen"
      component={MySetsScreen}

      options={({ navigation, route }) => ({
        title: 'Set'+route.params.setName,
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (

        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('spaarksPartnerDashboard')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     Set {route.params.setName}
        //   </Text>



        // ),
        headerRight: () => (
          <View style={{ justifyContent: 'center', backgroundColor: '#6FA4E9', width: 160, height: 30, margin: 14, borderRadius: 13 }}>

            <TouchableOpacity
              onPress={() => navigation.navigate('ApplicableCategories')}
            >
              <Text style={{ color: "#fff", paddingHorizontal: 10 }}>{I18n.t("Applicable Categories")}</Text>
            </TouchableOpacity>

          </View>
        )
      })}
    />

    <DetailsStack.Screen
      name="QrForPartnerScreen"
      component={QrForPartnerScreen}

      options={({ navigation, route }) => ({
        title: '',
        headerLeft: () => (
          <Text
            style={{
              color: "#6FA4E9",
              fontSize: 22,
              fontWeight: 'bold',
              paddingLeft: 10,
              textAlign: "left",
            }}
            onPress={() => navigation.navigate('MySetsScreen')}
          >
            <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
            {I18n.t("Spaarks QR")}
          </Text>
        )
      })}
    />

    <DetailsStack.Screen
      name="SpaarksTemplateActivity"
      component={GuidelinesScreen}

      options={{

        title: '',
        headerLeft: () => (
          <Text
            style={{
              color: "#6FA4E9",
              fontSize: 17,
              fontWeight: 'bold',
              paddingLeft: 10,
              textAlign: "left",
            }}
            onPress={() => navigation.navigate("QrForPartnerScreen")}
          >
            <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
            {I18n.t("Guidelines - Spaarks Templates")}
          </Text>

        )
      }}
    />
    <DetailsStack.Screen
      name="ApplicableCategories"
      component={ApplicableCategories}

      options={{

        title: 'Applicable Categories',
        headerLeft: () => (
          <Text
            style={{
              color: "#6FA4E9",
              fontSize: 22,
              fontWeight: 'bold',
              paddingLeft: 10,
              textAlign: "left",
            }}
            onPress={() => navigation.navigate("MySetsScreen")}
          >
            <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

          </Text>

        )
      }}
    />

    <DetailsStack.Screen
      name="spaarksPartnerScreen0"
      component={spaarksPartnerScreen0}
      // initialParams={{ postId: "all",selected: {},isFromPost:false }}
      options={{
        title: "",
        headerLeft: () => (
          <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
            {I18n.t("Partner")}
          </Text>
        ),
      }}
    />

    <DetailsStack.Screen
      name="RewardsScreen"
      component={RewardsScreen}
      // initialParams={{ postId: "all",selected: {},isFromPost:false }}
      options={{
        title: "",
        headerLeft: () => (
          <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
            {I18n.t("Rewards")}
          </Text>
        ),
      }}
    />
    <DetailsStack.Screen
      name="KnowMoreRewardsScreen"
      component={KnowMoreRewardsScreen}
      // initialParams={{ postId: "all",selected: {},isFromPost:false }}
      options={{
        title: "",
        headerLeft: () => (
          <>

            <Text
              style={{ color: "#6FA4E9", fontSize: 20, paddingLeft: 20 }}

              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
              {I18n.t("Rewards")}
            </Text>
          </>
        ),
      }}
    />

    <DetailsStack.Screen
      name="GreetPostSpecificScreen"
      component={GreetPostSpecificScreen}
      options={({ navigation, route }) => ({
        title: I18n.t('Post'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <DetailsStack.Screen
      name="testScreen"
      component={testScreen}
      options={{
        title: I18n.t('Chat'),
        headerShown: false,
        headerLeft: () => (
          <Text
            style={{
              color: "#6FA4E9",
              fontSize: 25,
              paddingLeft: 150,
              justifyContent: "center",
            }}
          >
            {I18n.t("Spaarks")}
          </Text>
        ),
      }}
    />


    <DetailsStack.Screen
      name="CompleteProfileScreen"
      component={CompleteProfileScreen}
      options={{
        title: '',
        headerShown: false,
        headerLeft: () => (
          <Text
            style={{
              color: "#6FA4E9",
              fontSize: 25,
              paddingLeft: 150,
              justifyContent: "center",
            }}
          >
            {I18n.t("Spaarks")}
          </Text>
        ),
      }}
    />



    <DetailsStack.Screen
      name="ImageViewScreen"
      component={ImageViewScreen}
      options={{
        title: 'Images',
        headerShown: false,
        headerLeft: () => (
          <Text
            style={{
              color: "#6FA4E9",
              fontSize: 25,
              paddingLeft: 150,
              justifyContent: "center",
            }}
          >
            {I18n.t("Spaarks")}
          </Text>
        ),
      }}
    />





    <DetailsStack.Screen
      name="ChatSpecificScreen"
      component={ChatSpecificScreen}
      options={{
        title: I18n.t('Chat'),
        headerShown: false,
        headerLeft: () => (
          <Text
            style={{
              color: "#6FA4E9",
              fontSize: 25,
              paddingLeft: 150,
              justifyContent: "center",
            }}
          >
            {I18n.t("Spaarks")}
          </Text>
        ),
      }}
    />


    <DetailsStack.Screen
      name="PostSpecificScreensFeed"
      component={PostSpecificScreen}
      options={({ navigation, route }) => ({
        title: I18n.t('Post'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <DetailsStack.Screen
      name="GreetingsScreen"
      component={GreetingsScreen}
      options={({ navigation, route }) => ({
        title: I18n.t("Explore") + " " + I18n.t('Spaarks'),
        headerLeft: () => (
          <>

            <Text
              style={{
                color: "#000",
                fontSize: 16,
                paddingLeft: 0,
                justifyContent: "center",
              }}

              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

            </Text>
          </>
        ),
      })}
    />


    <Stack.Screen
      name="qrcodeScreen"
      component={qrcodeScreen}
      initialParams={{ message: "", showTag: false }}
      options={({ navigation, route }) => ({
        title: I18n.t('QR'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.navigate('All')}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

<Stack.Screen
      name="QrcodeMenuScreen"
      component={QrcodeMenuScreen}
      initialParams={{ message: "", showTag: false }}
      options={({ navigation, route }) => ({
        title: I18n.t('QR'),
        headerTintColor:'#6FA4E9',
      })}
    />




    <Stack.Screen
      name="ScanQrScreen"
      component={ScanQrScreen}
      initialParams={{ message: "", showTag: false }}
      options={({ navigation, route }) => ({
        title: route.params.type,
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}
        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>

        //   </View>

        // ),
      })}
    />




    <Stack.Screen
      name="AskRatingScreen"
      component={AskRatingScreen}
      initialParams={{ message: "", showTag: false }}
      options={{
        title: I18n.t("Spaarks"),

        headerLeft: () => (
          <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
            {I18n.t("Rate Service Provider / Seller")}
          </Text>
        ),
      }}
    />






    <DetailsStack.Screen
      name="NotificationScreen"
      component={NotificationScreen}
      options={({ navigation, route }) => ({
        title: I18n.t('Notifications'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.navigate('All')}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />
    <DetailsStack.Screen
      name="HelpScreen"
      component={HelpScreen}
      options={({ navigation, route }) => ({
        title: I18n.t('Help'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>
        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />
    <DetailsStack.Screen
      name="TicketSpecificScreen"
      component={TicketSpecificScreen}
      options={({ navigation, route }) => ({
        title: route.params.ticket.ticketId,
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}
        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>

        //   </View>
        // ),
      })}
    />
    <DetailsStack.Screen
      name="GreetRequestsScreen"
      component={GreetRequestsScreen}
      options={(navigation) => ({
        title: '',
        // tabBarIcon: ,
        tabBarVisible: true,
      })}
    />

    <DetailsStack.Screen
      name="CallLogsScreen"
      component={callLogsScreen}
      options={(navigation) => ({
        title: 'Logs',
        headerTintColor:'#6FA4E9',
        // tabBarIcon: ,
        tabBarVisible: true,
      })}
    />

    <DetailsStack.Screen
      name="DetailedCallLogs"
      component={DetailedCallLogs}
      options={({ navigation, route }) => ({
        title: route.params.title,
        headerTintColor:'#6FA4E9',
        // tabBarIcon: ,
        tabBarVisible: true,
      })}
    />



    <DetailsStack.Screen
      name="AllFeaturesScreen"
      component={DetailsScreen}
      options={{
        headerLeft: () => (
          <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
            {I18n.t("Spaarks")}
          </Text>
        ),
        headerRight: () => (
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/icons/t1.png")}
              style={styles.TopIcons}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate("Call")}
              style={{ backgroundColor: "#fff" }}
            >
              <Image
                source={require("../assets/icons/t2.png")}
                style={styles.TopIcons}
              />
            </TouchableOpacity>

            <Image
              source={require("../assets/icons/t3.png")}
              style={styles.TopIcons}
            />
          </View>
        ),
      }}
    />


    <DetailsStack.Screen
      name="testPage"
      component={testPage}
      options={(navigation) => ({
        // tabBarIcon: ,
        tabBarVisible: false,
      })}
    />


    <DetailsStack.Screen
      name="PostSpecifics"
      component={QuestionScreen}
      options={(navigation) => ({
        title: I18n.t('Question'),
        tabBarLabel: '',
        headerTintColor:'#6FA4E9',
        tabBarColor: '#fff',
        // tabBarIcon: ,
        tabBarVisible: false,
      })}
    />
    {/* 
<DetailsStack.Screen
      name="ScratchCardScreen"
      component={ScratchCardScreen}
      options={(navigation) => ({
        // tabBarIcon: ,
        tabBarVisible: false,
      })}
    /> */}


    <DetailsStack.Screen
      name="expertiseScreen"
      component={expertiseScreen}
      options={{
        title: I18n.t("Expertise"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 25,
        //       paddingLeft: 80,
        //       justifyContent: "center",
        //     }}
        //   >
        //     {I18n.t("Choose your expertise")}
        //   </Text>
        // ),
      }}
    />



    <DetailsStack.Screen
      name="ChatSpecific"
      component={ChatSpecificScreen}
      options={(navigation) => ({
        title: '',
        // tabBarIcon: ,
        tabBarVisible: false,
      })}
    />




    <DetailsStack.Screen
      name="ForwardMessageScreen"
      component={ForwardMessageScreen}
      options={({ navigation, route }) => ({
        title: '',
        headerLeft: () => (
          <>

            <Text
              style={{
                color: "#000",
                fontSize: 16,
                paddingLeft: 0,
                justifyContent: "center",
              }}

              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

            </Text>
          </>
        ),
      })}
    />

    <DetailsStack.Screen
      name="OnBoarding"
      component={OnBoardingScreen}
      options={(navigation) => ({
        // tabBarIcon: ,
        tabBarVisible: false,
      })}
    />

    <Stack.Screen
      name="PostSpecificScreens"
      component={PostSpecificScreen}
      options={({ navigation, route }) => ({
        title: 'Post',
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <Stack.Screen
      name="ViewFullScreenImagesScreen"
      component={ViewFullScreenImagesScreen}
      options={({ navigation, route }) => ({
        title: '',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#000',
          color: '#fff'
        },
        headerLeft: () => (
          <>
          </>
        ),
      })}
    />



    <Stack.Screen
      name="OutGoingCallScreen"
      component={OutGoingCallScreen}
      options={{
        title: '',
        headerLeft: () => (
          <Text
            style={{
              color: "#6FA4E9",
              fontSize: 25,
              paddingLeft: 130,
              justifyContent: "center",
            }}
          >
            {I18n.t("Ongoing Call")} <Text style={{
              color: "#6FA4E9",
              fontSize: 15,
              paddingLeft: 10,
              fontStyle: 'italic'
            }}>Beta</Text>
          </Text>
        ),
      }}
    />

    <Stack.Screen
      name="IncomingCallScreen"
      component={IncomingCallScreen}
      options={{
        title: '',
        headerLeft: () => (
          <Text
            style={{
              color: "#6FA4E9",
              fontSize: 25,
              paddingLeft: 130,
              justifyContent: "center",
            }}
          >
            {I18n.t("Ongoing Call")} <Text style={{
              color: "#6FA4E9",
              fontSize: 15,
              paddingLeft: 10,
              fontStyle: 'italic'
            }}>Beta</Text>
          </Text>
        ),
      }}
    />




    <Stack.Screen
      name="SelectImages"
      component={SelectPhotosScreen}
      options={{
        headerLeft: () => (
          <Text
            style={{
              color: "#6FA4E9",
              fontSize: 25,
              paddingLeft: 150,
              justifyContent: "center",
            }}
          >
            {I18n.t("Spaarks")}
          </Text>
        ),
      }}
    />

    <Stack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{
        title: I18n.t("Search"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 25,
        //       paddingLeft: 150,
        //       justifyContent: "center",
        //     }}
        //   >
        //     {I18n.t("Search")}
        //   </Text>

        // ),
      }}
    />




    <Stack.Screen
      name="MapScreen"
      component={HomeScreen}
      params={{ post: [] }}
      options={{
        title: I18n.t("Spaarks"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
        //     {I18n.t("Spaarks")}
        //   </Text>
        // ),
      }}
    />

    <DetailsStack.Screen
      name="SellerProfile"
      component={SellerProfileScreen}


      options={({ navigation, route }) => ({
        title: I18n.t('Market Profile'),
        headerTintColor:'#fff',
        headerStyle: {
          backgroundColor: '#6FA4E9'
        },
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#fff",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/whiteback.png')} style={{ height: 18, width: 15, marginLeft: 5 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <DetailsStack.Screen
      name="RepliesScreen"
      component={RepliesScreen}
      options={({ navigation, route }) => ({
        title: I18n.t('Replies'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <DetailsStack.Screen
      name="SelectCategory"
      component={SelectCategoryScreen}
      options={{
        title: I18n.t('Category'),
        headerTintColor:'#6FA4E9',
        // tabBarIcon: ({ focused, color, size }) => (
        //   <View>
        //     <Image
        //       source={
        //         {
        //           uri:
        //             focused
        //               ? profilePic
        //               : profilePic
        //         }
        //       }
        //       style={{
        //         margin: 5,
        //         width: 35,
        //         height: 35,
        //         borderRadius: 10
        //       }}
        //     />
        //     <Text style={{ fontSize: 9, color: '#000' }}>{I18n.t("Profile")}</Text>
        //   </View>
        // ),
      }}
    />

    <DetailsStack.Screen
      name="SelectSubCategoryScreen"
      component={SelectSubCategoryScreen}
      params={{ categoryId: 1 }}
      options={{
        title: I18n.t('Sub Category'),
        headerTintColor:'#6FA4E9',
        // tabBarIcon: ({ focused, color, size }) => (
        //   <View >
        //     <Image
        //       source={
        //         {
        //           uri:
        //             focused
        //               ? profilePic
        //               : profilePic
        //         }
        //       }
        //       style={{
        //         margin: 5,
        //         width: 35,
        //         height: 35,
        //         borderRadius: 10
        //       }}
        //     />
        //     <Text style={{ fontSize: 9, color: '#000' }}>{I18n.t("Profile")}</Text>
        //   </View>
        // ),
      }}
    />

    <DetailsStack.Screen
      name="NewInfoStepperScreen"
      component={NewInfoStepperScreen}
      params={{ categoryId: 1, subCategory: 1 }}
      options={({ navigation, route }) => ({
        title: I18n.t('Create Spaark'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <DetailsStack.Screen
      name="NewInfoStepperScreen2"
      component={NewInfoStepperScreen2}
      options={({ navigation, route }) => ({
        title: 'One Last step',
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />


    <DetailsStack.Screen
      name="newInfoStepperSayHii"
      component={newInfoStepperSayHii}
      options={({ navigation, route }) => ({
        title: 'One Last step',
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <Stack.Screen
      name="SendChatRequest"
      component={SendChatRequest}
      initialParams={{ message: "", showTag: false }}
      options={{
        title: I18n.t("Chat Request")
      }}
    />

    <DetailsStack.Screen
      name="newInfoStepperSayHii2"
      component={newInfoStepperSayHii2}
      options={({ navigation, route }) => ({
        title: 'One Last step',
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />






    <DetailsStack.Screen
      name="Alls"
      component={DetailsScreen}
      initialParams={{ message: "", showTag: false }}
      options={{
        title: I18n.t("Spaarks"),

        headerLeft: () => (
          <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
            {I18n.t("Spaarks")}
          </Text>
        ),
      }}
    />

    <DetailsStack.Screen
      name="ViewAll"
      component={ViewAllScreen}
      options={({ navigation, route }) => ({
        title: 'All',
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <DetailsStack.Screen
      name="ViewImages"
      component={ViewImages}
      options={{
        headerLeft: () => (
          <Text
            style={{
              color: "#6FA4E9",
              fontSize: 25,
              paddingLeft: 150,
              justifyContent: "center",
            }}
          >
            {I18n.t("Spaarks")}
          </Text>
        ),
      }}
    />

    <DetailsStack.Screen
      name="VerifyOtpScreen"
      component={VerifyOtpScreen}
      options={({ navigation, route }) => ({
        title: I18n.t('Login'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />
  </DetailsStack.Navigator>




)

    };

const LeadStackScreen = ({ navigation, route }) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}
  >
    <DetailsStack.Screen
      name="Spaarks"
      component={QuestionScreen}
      options={{
        title: I18n.t('Spaarks'),
        headerTintColor:'#6FA4E9',
        tabBarLabel: '',
        tabBarColor: '#fff',
        // headerLeft: () => (
        //   <></>
        // ),
      }}
    />

<DetailsStack.Screen
      name="NewPollStepperScreen"
      component={NewPollStepperScreen}
      options={{
        title: I18n.t('poll'),
        headerTintColor:'#6FA4E9',
        tabBarLabel: '',
        tabBarColor: '#fff',
        // headerLeft: () => (
        //   <></>
        // ),
      }}
    />


<DetailsStack.Screen
      name="NewPollStepperScreen2"
      component={NewPollStepperScreen2}
      options={{
        title: "Last Step",
        headerTintColor:'#6FA4E9',
        tabBarLabel: '',
        tabBarColor: '#fff',
        // headerLeft: () => (
        //   <></>
        // ),
      }}
    />


    <DetailsStack.Screen
      name="AskNameScreen"
      component={AskNameScreen}
      initialParams={{ postId: "all", selected: {}, isFromPost: false }}
      options={{
        title: I18n.t("Setup Profile"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
        //     {" "}
        //   </Text>
        // ),
      }}
    />

    <DetailsStack.Screen
      name="ViewFullScreenImagesScreen"
      component={ViewFullScreenImagesScreen}
      options={({ navigation, route }) => ({
        title: '',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#000',
          color: '#fff'
        },
        headerLeft: () => (
          <>
          </>
        ),
      })}
    />
    {/* <DetailsStack.Screen
      name="ScratchCardScreen"
      component={ScratchCardScreen}
      options={(navigation) => ({
        // tabBarIcon: ,
        tabBarVisible: false,
      })}
    /> */}
    <Stack.Screen
      name="SelectImages"
      component={SelectPhotosScreen}
      options={{
        headerLeft: () => (
          <Text
            style={{
              color: "#6FA4E9",
              fontSize: 25,
              paddingLeft: 150,
              justifyContent: "center",
            }}
          >
            {I18n.t("Spaarks")}
          </Text>
        ),
      }}
    />
    <DetailsStack.Screen
      name="expertiseScreen"
      component={expertiseScreen}
      options={{
        title: I18n.t("Expertise"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 25,
        //       paddingLeft: 80,
        //       justifyContent: "center",
        //     }}
        //   >
        //     {I18n.t("Choose your expertise")}
        //   </Text>
        // ),
      }}
    />
    <DetailsStack.Screen
      name="SelectCategory"
      component={SelectCategoryScreen}
      options={{
        title: I18n.t('Category'),
        headerTintColor:'#6FA4E9',
        // tabBarIcon: ({ focused, color, size }) => (
        //   <View>
        //     <Image
        //       source={
        //         {
        //           uri:
        //             focused
        //               ? profilePic
        //               : profilePic
        //         }
        //       }
        //       style={{
        //         margin: 5,
        //         width: 35,
        //         height: 35,
        //         borderRadius: 10
        //       }}
        //     />
        //     <Text style={{ fontSize: 9, color: '#000' }}>{I18n("Profile")}</Text>
        //   </View>
        // ),
      }}
    />

    <DetailsStack.Screen
      name="SelectSubCategoryScreen"
      component={SelectSubCategoryScreen}
      params={{ categoryId: 1 }}
      options={{
        title: I18n.t('Sub Category'),
        headerTintColor:'#6FA4E9',
        // tabBarIcon: ({ focused, color, size }) => (
        //   <View>
        //     <Image
        //       source={
        //         {
        //           uri:
        //             focused
        //               ? profilePic
        //               : profilePic
        //         }
        //       }
        //       style={{
        //         margin: 5,
        //         width: 35,
        //         height: 35,
        //         borderRadius: 10
        //       }}
        //     />
        //     <Text style={{ fontSize: 9, color: '#000' }}>{I18n.t("Profile")}</Text>
        //   </View>
        // ),
      }}
    />

    <DetailsStack.Screen
      name="NewInfoStepperScreen"
      component={NewInfoStepperScreen}
      params={{ categoryId: 1, subCategory: 1 }}
      options={({ navigation, route }) => ({
        title: I18n.t('Create Spaark'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />
    <DetailsStack.Screen
      name="NewInfoStepperScreen2"
      component={NewInfoStepperScreen2}
      params={{ categoryId: 1, subCategory: 1 }}
      options={({ navigation, route }) => ({
        title: I18n.t('One Last step'),
        headerTintColor:'#6FA4E9',
    
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <DetailsStack.Screen
      name="SipScreen"
      component={SipScreen}
      options={{
        headerLeft: () => (
          <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
            {I18n.t("Spaarks")}
          </Text>
        ),
      }}
    />

    <DetailsStack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{
        title: I18n.t("Search"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 25,
        //       paddingLeft: 150,
        //       justifyContent: "center",
        //     }}
        //   >
        //     {I18n.t("Search")}
        //   </Text>
        // ),
      }}
    />

    <DetailsStack.Screen
      name="ViewAll"
      component={ViewAllScreen}
      options={({ navigation, route }) => ({
        title: route.params.title,
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <DetailsStack.Screen
      name="VerifyOtpScreen"
      component={VerifyOtpScreen}
      options={({ navigation, route }) => ({
        title: I18n.t('Login'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />
  </DetailsStack.Navigator>
);


const HelpStackScreen = ({ navigation, route }) => {
  const { index, routes } = navigation.dangerouslyGetState();
  navigation.setOptions({ tabBarVisible: false });
  // navigation.setOptions({tabBarVisible: false});

  return (
    <DetailsStack.Navigator
      // screenOptions={TransitionScreenOptions}

      screenOptions={{
        // tabBarVisible:false,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <DetailsStack.Screen
        name="Chats"
        component={ExploreScreen}

        options={{
          title: '',
          headerLeft: () => (
            <Text
              style={{
                color: "#6FA4E9",
                fontSize: 25,
                paddingLeft: 150,
                paddingBottom: 10,
                justifyContent: "center",
              }}
            >
              {I18n.t("Spaarks")}
            </Text>
          ),
        }}
      />


      <DetailsStack.Screen
        name="AskNameScreen"
        component={AskNameScreen}
        initialParams={{ postId: "all", selected: {}, isFromPost: false }}
        options={{
          title: "Setup Profile",
          headerLeft: () => (
            <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
              {" "}
            </Text>
          ),
        }}
      />

      <DetailsStack.Screen
        name="SellerProfile"
        component={SellerProfileScreen}


        options={({ navigation, route }) => ({
          title: I18n.t('Market Profile'),
          headerTintColor:'#fff',
          
          headerStyle: {
            backgroundColor: '#6FA4E9'
          },
          // headerLeft: () => (
          //   <>

          //     <Text
          //       style={{
          //         color: "#fff",
          //         fontSize: 16,
          //         paddingLeft: 0,
          //         justifyContent: "center",
          //       }}

          //       onPress={() => navigation.goBack()}
          //     >
          //       <Image source={require('../assets/icons/whiteback.png')} style={{ height: 18, width: 15, marginLeft: 5 }} />

          //     </Text>
          //   </>
          // ),
        })}
      />
      <DetailsStack.Screen
        name="DetailedCallLogs"
        component={DetailedCallLogs}
        options={({ navigation, route }) => ({
          title: route.params.title,
          headerTintColor:'#6FA4E9',
          // tabBarIcon: ,
          tabBarVisible: true,
        })}
      />





      <DetailsStack.Screen
        name="UserProfileDynamic"
        component={UserProfileDynamicScreen}

        options={{
          title: I18n.t("User Profile"),
          headerTintColor:'#6FA4E9',
          // headerLeft: () => (
          //   <Text
          //     style={{
          //       color: "#6FA4E9",
          //       fontSize: 22,
          //       fontWeight: 'bold',
          //       paddingLeft: 20,
          //       textAlign: "left",
          //     }}
          //   >
          //     {I18n.t("User Profile")}
          //   </Text>
          // )
        }}
      />
      {/* <DetailsStack.Screen
        name="ConnectionsScreen"
        component={ConnectionsScreen}
        options={({ navigation, route }) => ({
          title: I18n.t('Connections'),
          headerTintColor:'#6FA4E9',
        })}
      /> */}



      <Stack.Screen
        name="PostSpecificScreenGreet"
        component={PostSpecificScreenGreet}
        options={({ navigation, route }) => ({
          title: I18n.t('Post'),
          headerLeft: () => (
            <>

              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  paddingLeft: 0,
                  justifyContent: "center",
                }}

                onPress={() => navigation.goBack()}
              >
                <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

              </Text>
            </>
          ),
        })}
      />

      <Stack.Screen
        name="OutGoingCallScreen"
        component={OutGoingCallScreen}
        options={{
          title: I18n.t("Ongoing Call"),
          headerTintColor:'#6FA4E9',
          // headerLeft: () => (
          //   <Text
          //     style={{
          //       color: "#6FA4E9",
          //       fontSize: 25,
          //       paddingLeft: 130,
          //       justifyContent: "center",
          //     }}
          //   >
          //     {I18n.t("Ongoing Call")}
          //   </Text>
          // ),
        }}
      />

      <Stack.Screen
        name="IncomingCallScreen"
        component={IncomingCallScreen}
        options={{
          title: I18n.t("Ongoing Call"),
          headerTintColor:'#6FA4E9',
          // headerLeft: () => (
          //   <Text
          //     style={{
          //       color: "#6FA4E9",
          //       fontSize: 25,
          //       paddingLeft: 130,
          //       justifyContent: "center",
          //     }}
          //   >
          //     {I18n.t("Ongoing Call")} <Text style={{
          //       color: "#6FA4E9",
          //       fontSize: 15,
          //       paddingLeft: 10,
          //       fontStyle: 'italic'
          //     }}>Beta</Text>
          //   </Text>
          // ),
        }}
      />




      <Stack.Screen
        name="SelectImages"
        component={SelectPhotosScreen}
        options={{
          title:I18n.t("Spaarks"),
          headerTintColor:'#6FA4E9',
          // headerLeft: () => (
          //   <Text
          //     style={{
          //       color: "#6FA4E9",
          //       fontSize: 25,
          //       paddingLeft: 150,
          //       justifyContent: "center",
          //     }}
          //   >
          //     {I18n.t("Spaarks")}
          //   </Text>
          // ),
        }}
      />

      <DetailsStack.Screen
        name="ChatSpecificScreen"
        component={ChatSpecificScreen}
        options={{
          title: I18n.t('Chat'),
          headerTintColor:'#6FA4E9',
          headerShown: false,
          // headerLeft: () => (
          //   <Text
          //     style={{
          //       color: "#6FA4E9",
          //       fontSize: 25,
          //       paddingLeft: 150,
          //       justifyContent: "center",
          //     }}
          //   >
          //     {I18n.t("Spaarks")}
          //   </Text>
          // ),
        }}
      />


      <DetailsStack.Screen
        name="ViewFullScreenImagesScreen"
        component={ViewFullScreenImagesScreen}
        options={({ navigation, route }) => ({
          title: 'Image',
          headerTintColor:'#6FA4E9',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#000',
            color: '#fff'
          },
          headerLeft: () => (
            <>
            </>
          ),
        })}
      />
      <DetailsStack.Screen
        name="ForwardMessageScreen"
        component={ForwardMessageScreen}
        options={({ navigation, route }) => ({
          title: 'Forward Message',
          headerTintColor:'#6FA4E9',
          // headerLeft: () => (
          //   <>

          //     <Text
          //       style={{
          //         color: "#000",
          //         fontSize: 16,
          //         paddingLeft: 0,
          //         justifyContent: "center",
          //       }}

          //       onPress={() => navigation.goBack()}
          //     >
          //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

          //     </Text>
          //   </>
          // ),
        })}
      />



      <DetailsStack.Screen
        name="PostSpecifics"
        component={QuestionScreen}
        options={{
          title: I18n.t('Question'),
          tabBarLabel: '',
          headerTintColor:'#6FA4E9',
          tabBarColor: '#fff',
          // headerLeft: () => (
          //   <></>

          // ),
        }}
      />

      <DetailsStack.Screen
        name="expertiseScreen"
        component={expertiseScreen}
        options={{
          title: I18n.t("Expertise"),
          headerTintColor:'#6FA4E9',
          // headerLeft: () => (
          //   <Text
          //     style={{
          //       color: "#6FA4E9",
          //       fontSize: 25,
          //       paddingLeft: 80,
          //       justifyContent: "center",
          //     }}
          //   >
          //     {I18n.t("Choose your expertise")}
          //   </Text>
          // ),
        }}
      />
      <DetailsStack.Screen
        name="SipScreen"
        component={SipScreen}
        options={{
          headerLeft: () => (
            <Text
              style={{
                color: "#6FA4E9",
                fontSize: 25,
                paddingLeft: 150,
                justifyContent: "center",
              }}
            >
              {I18n.t("Spaarks")}
            </Text>
          ),
        }}
      />

      <DetailsStack.Screen
        name="ViewAll"
        component={ViewAllScreen}
        options={({ navigation, route }) => ({
          title: route.params.title,
          headerTintColor:'#6FA4E9',
          // headerLeft: () => (
          //   <>

          //     <Text
          //       style={{
          //         color: "#000",
          //         fontSize: 16,
          //         paddingLeft: 0,
          //         justifyContent: "center",
          //       }}

          //       onPress={() => navigation.goBack()}
          //     >
          //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

          //     </Text>
          //   </>
          // ),
        })}
      />


      <DetailsStack.Screen
        name="VerifyOtpScreen"
        component={VerifyOtpScreen}
        options={({ navigation, route }) => ({
          title: 'Login',
          headerTintColor:'#6FA4E9',
          // headerLeft: () => (
          //   <>

          //     <Text
          //       style={{
          //         color: "#000",
          //         fontSize: 16,
          //         paddingLeft: 0,
          //         justifyContent: "center",
          //       }}

          //       onPress={() => navigation.goBack()}
          //     >
          //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

          //     </Text>
          //   </>
          // ),
        })}
      />



    </DetailsStack.Navigator>

  )
};

const MyProfileData = ({ navigation }) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}
  >
    <DetailsStack.Screen
      name="Spaarks"
      component={UserProfileScreen}

      options={{
        title: I18n.t('Profile'),
        headerTintColor: '#6FA4E9',
        // headerStyle: {
        //   backgroundColor: '#fff',
        //   color: '#fff'
        // },

      }}
    />





    <DetailsStack.Screen
      name="AskNameScreen"
      component={AskNameScreen}
      initialParams={{ postId: "all", selected: {}, isFromPost: false }}
      options={{
        title: I18n.t("Setup Profile"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
        //     {" "}
        //   </Text>
        // ),
      }}
    />


<DetailsStack.Screen
      name="SelectCityScreen"
      component={SelectCityScreen}
      initialParams={{ message: "", showTag: false }}
      options={{
        title: "",

        headerLeft: () => (
          <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
            {I18n.t("Spaarks")}
          </Text>
        ),
      }}
    />
    <DetailsStack.Screen
      name="ReleaseNotesScreen"
      component={releaseNotesScreen}
      initialParams={{ postId: "all", selected: {}, isFromPost: false }}
      options={{
        title: I18n.t("What's New"),
        headerTintColor:'#6FA4E9'
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      }}
    />



    <DetailsStack.Screen
      name="PreferncesScreen"
      component={PreferncesScreen}

      options={{

        title: I18n.t('Choose Your Interests'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   // <Text
        //   //   style={{
        //   //     color: "#6FA4E9",
        //   //     fontSize: 22,
        //   //     fontWeight:'bold',
        //   //     paddingLeft: 20,
        //   //     textAlign: "left",
        //   //   }}
        //   // >
        //   //  preferences
        //   // </Text>
        //   <></>
        // )
      }}
    />



    {/* <DetailsStack.Screen
      name="SpaarksTemplateActivity"
      component={GuidelinesScreen}

      options={{
       
             title: '',
        headerLeft: () => (
          <Text
          style={{
            color: "#6FA4E9",
            fontSize: 17,
            fontWeight:'bold',
            paddingLeft: 10,
            textAlign: "left",
          }}
          onPress={()=>navigation.navigate("QrForPartnerScreen")}
        >
           <Image source={require('../assets/icons/blueback.png')} style={{height:18,width:15,marginLeft:20}}/>
           {I18n.t("Guidelines - Spaarks Templates")}
        </Text>
         
        )
      }}
    /> */}


    <DetailsStack.Screen
      name="BookmarksScreen"
      component={BookmarksScreen}

      options={{
        title: 'Bookmarks',
        headerTintColor:'#6FA4E9'
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 60,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('Spaarks')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     {I18n.t('Bookmarks')}
        //   </Text>
        // )
      }}
    />


<DetailsStack.Screen
      name="MyPollsScreen"
      component={MyPollsScreen}

      options={{
        title: 'Poll',
        headerTintColor:'#6FA4E9'
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 60,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('Spaarks')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     {I18n.t('Bookmarks')}
        //   </Text>
        // )
      }}
    />

<DetailsStack.Screen
      name="AllPollsScreen"
      component={AllPollsScreen}

      options={{
        title: 'My Polls',
        headerTintColor:'#6FA4E9'
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 60,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('Spaarks')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     {I18n.t('Bookmarks')}
        //   </Text>
        // )
      }}
    />





    <DetailsStack.Screen
      name="GuidelinesScreen"
      component={GuidelinesScreen}

      options={{
        title: 'Guideline - Spaarks Templates',
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 20,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('Spaarks')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     Guideline - Spaarks Templates
        //   </Text>
        // )
      }}
    />


    <DetailsStack.Screen
      name="RewardsScreen"
      component={RewardsScreen}

      options={{
        title: I18n.t("Spaarks Rewards"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('Spaarks')}



        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     {I18n.t("Spaarks Rewards")}
        //   </Text>
        // ),
        headerRight: () => (
          <View style={{ flexDirection: "row" }}>

            <TouchableOpacity
              // onPress={() => navigation.navigate("qrcodeScreen")}
              onPress={()=>navigation.navigate('ScanQrScreen',{type:I18n.t('Referral'),option:3,finalType:'Referral'})
            }
              style={{ backgroundColor: "#fff" }}
            >
              <Image
                source={require("../assets/icons/t1.png")}
                style={{
                  height: 30,
                  width: 30,
                  margin: 4, marginRight: 10
                }}
              />
            </TouchableOpacity>
          </View>
        ),
      }}
    />



    <DetailsStack.Screen
      name="spaarksPartnerScreen1"
      component={spaarksPartnerScreen1}



      options={{
        title: I18n.t("Spaarks Partner Program"),
        headerTintColor:'#6FA4E9'
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('Spaarks')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     {I18n.t("Spaarks Partner Program")}
        //   </Text>
        // )
      }}
    />


    <DetailsStack.Screen
      name="spaarksPartnerScreen2"
      component={spaarksPartnerScreen2}

      options={{
        title: I18n.t("Spaarks Partner Program"),
        headerTintColor:'#6FA4E9'
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('spaarksPartnerScreen1')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     {I18n.t("Register as Spaarks Partner")}
        //   </Text>
        // )
      }}
    />


    <DetailsStack.Screen
      name="spaarksPartnerScreen3"
      component={spaarksPartnerScreen3}

      options={{
        title: I18n.t("Spaarks Partner Program"),
        headerTintColor:'#6FA4E9'
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('spaarksPartnerScreen2')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     {I18n.t("Spaarks Partner Program")}
        //   </Text>
        // )
      }}
    />


    <DetailsStack.Screen
      name="spaarksPartnerDashboard"
      component={spaarksPartnerDashboard}

      options={{
        title: I18n.t("Spaarks Partner Program"),
        headerTintColor:'#6FA4E9'
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('Spaarks')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     {I18n.t('Spaarks Partner')}
        //   </Text>
        // )
      }}
    />


    <DetailsStack.Screen
      name="MySetsScreen"
      component={MySetsScreen}

      options={({ navigation, route }) => ({
        title: 'Set'+route.params.setName,
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('spaarksPartnerDashboard')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     Set {route.params.setName}
        //   </Text>
        // ),
        headerRight: () => (
          <View style={{ justifyContent: 'center', backgroundColor: '#6FA4E9', width: 160, height: 30, margin: 14, borderRadius: 13 }}>

            <TouchableOpacity
              onPress={() => navigation.navigate('ApplicableCategories')}
            >
              <Text style={{ color: "#fff", paddingHorizontal: 10 }}>{I18n.t("Applicable Categories")}</Text>
            </TouchableOpacity>

          </View>
        )
      })}
    />


    <DetailsStack.Screen
      name="QrForPartnerScreen"
      component={QrForPartnerScreen}

      options={({ navigation, route }) => ({
        title: I18n.t("Spaarks QR"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate('MySetsScreen')}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     {I18n.t("Spaarks QR")}
        //   </Text>
        // )
      })}
    />


    <DetailsStack.Screen
      name="SpaarksTemplateActivity"
      component={GuidelinesScreen}
      options={{

        title: I18n.t("Guidelines - Spaarks Templates"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 17,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate("QrForPartnerScreen")}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />
        //     {I18n.t("Guidelines - Spaarks Templates")}
        //   </Text>

        // )
      }}
    />


    <DetailsStack.Screen
      name="ApplicableCategories"
      component={ApplicableCategories}

      options={{

        title: 'Applicable Categories',
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 22,
        //       fontWeight: 'bold',
        //       paddingLeft: 10,
        //       textAlign: "left",
        //     }}
        //     onPress={() => navigation.navigate("MySetsScreen")}
        //   >
        //     <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //   </Text>

        // )
      }}
    />




    <DetailsStack.Screen
      name="PostSpecificScreenProfile"
      component={PostSpecificScreen}
      options={({ navigation, route }) => ({
        title: I18n.t('Post'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <Stack.Screen
      name="PostSpecificScreens"
      component={PostSpecificScreen}
      options={({ navigation, route }) => ({
        title: I18n.t('Post'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 10 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <Stack.Screen
      name="ViewFullScreenImagesScreen"
      component={ViewFullScreenImagesScreen}
      options={({ navigation, route }) => ({
        title: 'Spaarks',
        headerTintColor:'#6FA4E9',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#000',
          color: '#fff'
        },
        // headerLeft: () => (
        //   <>
        //   </>
        // ),
      })}
    />




    <Stack.Screen
      name="OutGoingCallScreen"
      component={OutGoingCallScreen}
      options={{
        title: I18n.t("Ongoing Call"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 25,
        //       paddingLeft: 130,
        //       justifyContent: "center",
        //     }}
        //   >
        //     {I18n.t("Ongoing Call")} <Text style={{
        //       color: "#6FA4E9",
        //       fontSize: 15,
        //       paddingLeft: 10,
        //       fontStyle: 'italic'
        //     }}>Beta</Text>
        //   </Text>
        // ),
      }}
    />


    <Stack.Screen
      name="IncomingCallScreen"
      component={IncomingCallScreen}
      options={{
        title: I18n.t("Ongoing Call"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text
        //     style={{
        //       color: "#6FA4E9",
        //       fontSize: 25,
        //       paddingLeft: 130,
        //       justifyContent: "center",
        //     }}
        //   >
        //     {I18n.t("Ongoing Call")} <Text style={{
        //       color: "#6FA4E9",
        //       fontSize: 15,
        //       paddingLeft: 10,
        //       fontStyle: 'italic'
        //     }}>Beta</Text>
        //   </Text>
        // ),
      }}
    />



    <DetailsStack.Screen
      name="SipScreen"
      component={SipScreen}
      options={{
        title:I18n.t("Spaarks"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
        //     {I18n.t("Spaarks")}
        //   </Text>
        // ),
      }}
    />


    <DetailsStack.Screen
      name="TicketSpecificScreen"
      component={TicketSpecificScreen}
      options={({ navigation, route }) => ({
        title: route.params.ticket.ticketId,
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}
        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>

        //   </View>
        // ),
      })}
    />


    <DetailsStack.Screen
      name="CreateNewTicketScreen"
      component={CreateNewTicketScreen}
      options={{
        title: I18n.t('Contact_Us'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
        //     {I18n.t('Contact_Us')}
        //   </Text>
        // ),
      }}
    />




    <DetailsStack.Screen
      name="SettingsScreen"
      component={SettingsScreen}
      options={({ navigation, route }) => ({
        title: I18n.t("Settings"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>
        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />


    <DetailsStack.Screen
      name="BlockedUsersScreen"
      component={BlockedUsersScreen}
      options={({ navigation, route }) => ({
        title: I18n.t("Blocked Users"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>
        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}
        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <DetailsStack.Screen
      name="BankDetailsScreen"
      component={BankDetailsScreen}
      options={({ navigation,route }) => ({
        title:I18n.t("UPI Details"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>
        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}
        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <DetailsStack.Screen
      name="LanguageScreen"
      component={LanguageScreen}
      options={({ navigation, route }) => ({
        title: "Change Language",
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>
        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />


    <DetailsStack.Screen
      name="WebViewScreen"
      component={WebViewScreen}
      options={({ navigation, route }) => ({
        title: I18n.t("Terms & Policies"),
        headerTintColor:'#6FA4E9',
        // title:"",
        // headerLeft: () => (
        //   <>
        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />












    <DetailsStack.Screen
      name="SellerProfile"
      component={SellerProfileScreen}

      options={({ navigation, route }) => ({
        title: I18n.t('Market Profile'),
        headerTintColor:'#fff',
        headerStyle: {
          backgroundColor: '#6FA4E9'
        },
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#fff",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/whiteback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />




    <DetailsStack.Screen
      name="ViewAll"
      component={ViewAllScreen}
      options={({ navigation, route }) => ({
        title: route.params.title,
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <DetailsStack.Screen
      name="FaqsScreen"
      component={FaqsScreen}
      options={({ navigation, route }) => ({
        title: "FAQ's",
        headerTintColor:'#6FA4E9'
        // headerLeft: () => (
        //   <>
        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <DetailsStack.Screen
      name="HelpScreen"
      component={HelpScreen}
      options={({ navigation, route }) => ({
        title: I18n.t("Help"),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>
        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <DetailsStack.Screen
      name="BusinessEnquiries"
      component={BusinessEnquiries}
      options={({ navigation, route }) => ({
        title: I18n.t('Business Enquiries'),
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>
        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />


    <DetailsStack.Screen
      name="ConnectWithUsScreen"
      component={ConnectWithUsScreen}
      options={({ navigation, route }) => ({
        title: I18n.t("Connect With Us"),
        headerTintColor:'#6FA4E9'
        // headerLeft: () => (
        //   <>
        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />

    <DetailsStack.Screen
      name="VerifyOtpScreen"
      component={VerifyOtpScreen}
      tabBarVisible={false}
      options={({ navigation, route }) => ({

        title: 'Login',
        headerTintColor:'#6FA4E9',
        // headerLeft: () => (
        //   <>

        //     <Text
        //       style={{
        //         color: "#000",
        //         fontSize: 16,
        //         paddingLeft: 0,
        //         justifyContent: "center",
        //       }}

        //       onPress={() => navigation.goBack()}
        //     >
        //       <Image source={require('../assets/icons/blueback.png')} style={{ height: 18, width: 15, marginLeft: 20 }} />

        //     </Text>
        //   </>
        // ),
      })}
    />
  </DetailsStack.Navigator>

);


const FullPostStack = ({ navigation }) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}
  >
    <DetailsStack.Screen
      name="PostSpecific"
      component={FullPostScreen}
      options={{
        title:'Post',
        headerTintColor:'#6FA4E9',
        // headerLeft: () => <Image></Image>,
      }}
    />
  </DetailsStack.Navigator>
);

const styles = StyleSheet.create({
  image: {
    marginLeft: 15,
  },
  bgcolor: {
    backgroundColor: "#f0f0f0",
    height: 900,
  },
  TopIcons: {
    height: 23,
    width: 23,
    margin: 10,
  },
});


