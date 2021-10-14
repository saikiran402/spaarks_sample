import React, { useState } from "react";

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
import OutGoingCallScreen from "./OutGoingCallScreen";
import ForwardMessageScreen from'./ForwardMessageScreen';

import IncomingCallScreen from './IncomingCallScreen';

import ExploreScreen from "./ExploreScreen";

import QuestionScreen from "./QuestionScreen";

import ChatSpecificScreen from "./ChatSpecificScreen";

import PostSpecificScreenGreet from "./PostSpecificScreenGreet";
import ViewFullScreenImagesScreen from './ViewFullScreenImagesScreen';
import ViewAllScreen from "./ViewAllScreens";
import SipScreen from "./SipScreen";
import expertiseScreen from "./expertiseScreen";
import VerifyOtpScreen from "./VerifyOtpScreen";
import SelectPhotosScreen from './SelectPhotosScreen'
import SellerProfileScreen from './SellerProfileScreen'
import { connect, useDispatch, useReducer } from "react-redux";

import ConnectionsScreen from './ConnectionsScreen';

import UserProfileDynamicScreen from './UserProfileDynamicScreen';
import AskNameScreen from './AskNameScreen';
import callLogsScreen from './callLogsScreen';
import DetailedCallLogs from './DetailedCallLogs'
const DetailsStack = createStackNavigator();

const ChatStack = ({ navigation,route }) => {
    navigation.setOptions({ tabBarVisible: false });
  
  return(
    <DetailsStack.Navigator
  
      screenOptions={{
        tabBarVisible:false,
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
          title:'',
          headerLeft: () => (
            <Text
              style={{
                color: "#6FA4E9",
                fontSize: 25,
                paddingLeft: 150,
                paddingBottom:10,
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
        initialParams={{ postId: "all",selected: {},isFromPost:false }}
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
  
  <DetailsStack.Screen
      name="CallLogsScreen"
      component={callLogsScreen}
      options={(navigation) => ({
        title: '',

        // tabBarIcon: ,
        tabBarVisible: true,
      })}
    />
  <DetailsStack.Screen
        name="DetailedCallLogs"
        component={DetailedCallLogs}
        options={({ navigation,route }) => ({
          title:route.params.title,
          // tabBarIcon: ,
          headerTintColor:'#6FA4E9',
          tabBarVisible: true,
        })}
      />
  <DetailsStack.Screen
      name="SellerProfile"
      component={SellerProfileScreen}

      
      options={({ navigation,route }) => ({
        title:I18n.t('Market Profile'),
        
        headerTintColor:'#fff',
        headerStyle: {
          backgroundColor: '#6FA4E9'
        },
//         headerLeft: () => (
//          <>

//             <Text
//             style={{
//               color: "#fff",
//               fontSize: 16,
//               paddingLeft: 0,
//               justifyContent: "center",
//             }}
            
//             onPress={()=>navigation.goBack()}
//           >
//             <Image source={require('../assets/icons/whiteback.png')} style={{height:18,width:15,marginLeft:5}}/>
              
//           </Text>
// </>
//         ),
      })}
    />
  <DetailsStack.Screen
        name="UserProfileDynamic"
        component={UserProfileDynamicScreen}
  
        options={{
          title:I18n.t("User Profile"),
          headerTintColor:'#6FA4E9',
          // headerLeft: () => (
          //   <Text
          //     style={{
          //       color: "#6FA4E9",
          //       fontSize: 22,
          //       fontWeight:'bold',
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
        name="ConnectionsScreen"
        component={ConnectionsScreen}
        options={({ navigation,route }) => ({
          title:I18n.t('Connections'),
          headerTintColor:'#6FA4E9',
          // headerLeft: () => (
          //   <Text
          //     style={{
          //       color: "#000",
          //       fontSize: 16,
          //       paddingLeft: 0,
          //       justifyContent: "center",
          //     }}
              
          //     onPress={()=>navigation.goBack()}
          //   >
          //     <Image source={require('../assets/icons/blueback.png')} style={{height:18,width:15,marginLeft:20}}/>
                
          //   </Text>
          // ),
        })}
      />
  
  
  
  <DetailsStack.Screen
        name="PostSpecificScreenGreet"
        component={PostSpecificScreenGreet}
        options={({ navigation,route }) => ({
          title:I18n.t('Post'),
          headerTintColor:'#6FA4E9',
  //         headerLeft: () => (
  //          <>
  
  //             <Text
  //             style={{
  //               color: "#000",
  //               fontSize: 16,
  //               paddingLeft: 0,
  //               justifyContent: "center",
  //             }}
              
  //             onPress={()=>navigation.goBack()}
  //           >
  //             <Image source={require('../assets/icons/blueback.png')} style={{height:18,width:15,marginLeft:20}}/>
                
  //           </Text>
  // </>
  //         ),
        })}
      />
  
  <DetailsStack.Screen
        name="OutGoingCallScreen"
        component={OutGoingCallScreen}
        options={{
          title:I18n.t("Ongoing Call"),
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
  
  <DetailsStack.Screen
        name="IncomingCallScreen"
        component={IncomingCallScreen}
        options={{
          title:I18n.t("Ongoing Call"),
          headerTintColor:'#6FA4E9',
          // headerLeft: () => (
          //   <Text
          //   style={{
          //     color: "#6FA4E9",
          //     fontSize: 25,
          //     paddingLeft: 130,
          //     justifyContent: "center",
          //   }}
          // >
          //   {I18n.t("Ongoing Call")} <Text style={{
          //     color: "#6FA4E9",
          //     fontSize: 15,
          //     paddingLeft: 10,
          //     fontStyle: 'italic'
          //   }}>Beta</Text>
          // </Text>
          // ),
        }}
      />
  
  
  
  
  <DetailsStack.Screen
        name="SelectImages"
        component={SelectPhotosScreen}
        options={{
          title:'Images',
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
          title:I18n.t('Chat'),
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
          //    {I18n.t("Spaarks")}
          //   </Text>
          // ),
        }}
      />
  
  
  <DetailsStack.Screen
          name="ViewFullScreenImagesScreen"
          component={ViewFullScreenImagesScreen}
          options={({ navigation,route }) => ({
            title:'Images',
            headerTintColor:'#6FA4E9',
            headerTintColor:'#fff',
            headerStyle: {
              backgroundColor: '#000',
              color:'#fff'
            },
    //         headerLeft: () => (
    //          <>
    // </>
    //         ),
          })}
      />
  <DetailsStack.Screen
        name="ForwardMessageScreen"
        component={ForwardMessageScreen}
        options={({ navigation,route }) => ({
          title:'Forward Message',
          headerTintColor:'#6FA4E9',
  //         headerLeft: () => (
  //          <>
  
  //             <Text
  //             style={{
  //               color: "#000",
  //               fontSize: 16,
  //               paddingLeft: 0,
  //               justifyContent: "center",
  //             }}
              
  //             onPress={()=>navigation.goBack()}
  //           >
  //             <Image source={require('../assets/icons/blueback.png')} style={{height:18,width:15,marginLeft:20}}/>
                
  //           </Text>
  // </>
  //         ),
        })}
      />
  
  
  
      <DetailsStack.Screen
        name="PostSpecifics"
        component={QuestionScreen}
        options={{
          title:I18n.t('Question'),
          tabBarLabel: '',
          headerTintColor:'#6FA4E9',
          tabBarColor: '#fff',
          headerLeft: () => (
            <></>
  
          ),
        }}
      />
  
  <DetailsStack.Screen
        name="expertiseScreen"
        component={expertiseScreen}
        options={{
          title:'',
          headerTintColor:'#6FA4E9',
          headerLeft: () => (
            <Text
              style={{
                color: "#6FA4E9",
                fontSize: 25,
                paddingLeft: 80,
                justifyContent: "center",
              }}
            >
              {I18n.t("Choose your expertise")}
            </Text>
          ),
        }}
      />
      <DetailsStack.Screen
        name="SipScreen"
        component={SipScreen}
        options={{
          title:'',
          headerTintColor:'#6FA4E9',
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
        options={({ navigation,route }) => ({
          title:route.params.title,
          headerTintColor:'#6FA4E9',
  //         headerLeft: () => (
  //          <>
  
  //             <Text
  //             style={{
  //               color: "#000",
  //               fontSize: 16,
  //               paddingLeft: 0,
  //               justifyContent: "center",
  //             }}
              
  //             onPress={()=>navigation.goBack()}
  //           >
  //             <Image source={require('../assets/icons/blueback.png')} style={{height:18,width:15,marginLeft:20}}/>
                
  //           </Text>
  // </>
  //         ),
        })}
      />
  
  
  <DetailsStack.Screen
        name="VerifyOtpScreen"
        component={VerifyOtpScreen}
        options={({ navigation,route }) => ({
          title:'Login',
          headerTintColor:'#6FA4E9',
  //         headerLeft: () => (
  //          <>
  
  //             <Text
  //             style={{
  //               color: "#000",
  //               fontSize: 16,
  //               paddingLeft: 0,
  //               justifyContent: "center",
  //             }}
              
  //             onPress={()=>navigation.goBack()}
  //           >
  //             <Image source={require('../assets/icons/blueback.png')} style={{height:18,width:15,marginLeft:20}}/>
                
  //           </Text>
  // </>
  //         ),
        })}
      />
  
  
  
    </DetailsStack.Navigator>
  
  )
      };


const mapStatetoProps = (state) => {
  return {
    profilePic: state.chatss.profilePic,
    unreadCount:state.chat.unreadCount,
    isConnected:state.chatss.isConnected,
    showOnline:state.chatss.showOnline
  };
};

export default connect(mapStatetoProps)(ChatStack);









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


