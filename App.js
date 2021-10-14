import React, { useEffect } from 'react';
import { View, ActivityIndicator,Linking,Text } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import configureStore from './store'
const store = configureStore();
import { 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';
import RNLocation from 'react-native-location';
import { NetworkProvider } from 'react-native-offline';
import { connect, useDispatch, useReducer } from "react-redux";
import chatReducers from "./reducers/chatReducers";
import OfflineNotice from './components/OfflineNotice';
import { callKeepSetup, handleConnect,handleAPNs } from './screens/OutGoingCallScreen'
import locationReducers from "./reducers/locationReducers";
import { DrawerContent } from './screens/DrawerContent';
import MainTabScreen from './screens/MainTabScreen';
import AskNameScreen from './screens/AskNameScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import { AuthContext } from './components/context';
import axios from "axios";
import {confirmlogoutApp } from './screens/xmpp';
import RootStackScreen from './screens/RootStackScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { client, xml } from '@xmpp/client';
import DeviceInfo from 'react-native-device-info';
const GLOBAL = require('./Globals');
// import { connectXMPP,addListenerssss } from "./screens/xmpp";
import debug  from '@xmpp/debug';
const Drawer = createDrawerNavigator();

import I18n from './src/i18n';
I18n.locale = "en";
// console.log('CHATCHATCHATCHATCHATCHAT',GLOBAL.JID_MAIN)
// console.log('PWDPWDPWDPWDPWDPWD',GLOBAL.JID_MAIN)

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

const App = ({chat_roster_main,navigation}) => {

 

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [isGuest, setGuest] = React.useState(false);
  const [onBoardedd, setOnBoardedd] = React.useState(false);
  // const locationDispatcher = useDispatch(locationReducers)
  const initialLoginState = {
    isLoading: true,
    phone: null,
    username: null,
    userToken: null,
    onBoarded: false,
    isGuest:true,
    preferences:[],
    isDown:false
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          username: action.username,
          isLoading: false,
          onBoarded: action.onBoarded,
          shouldAskName:action.shouldAskName
        };
        case 'SERVICE_DOWN': 
        return {
          ...prevState,
          isDown: action.isDown,
          isLoading: true
        };
      case 'LOGIN': 
        return {
          ...prevState,
          phone: action.id,
          userToken: action.token,
          username:action.username,
          isLoading: false,
          onBoarded: false,
          isGuest:true
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          phone: null,
          userToken: null,
          username: null,
          isLoading: false,
          onBoarded: "false",
          isGuest:true
        };
      case 'REGISTER': 
        return {
          ...prevState,
          phone: action.id,
          userToken: action.token,
          isLoading: false,
          onBoarded: false,

        };
        case 'ONBOARDING': 
        // console.log('ONBOARDING')
        return {
          ...prevState,
          onBoarded: "true",
          isGuest:true,
          preferences:action.prefernces
        };
        case 'LANGUAGE': 
        // console.log('LANGUAGE')
        return {
        };

        
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);


  // onBoarded = await AsyncStorage.getItem('onBoarded');
  const authContext = React.useMemo(() => ({
    changeLanguage: async() => {
      // alert('Changing Language')
      dispatch({ type: 'ONBOARDING', prefernces: preferences, isGuest: true,onBoarded:"true" });
    },
     onBoarded: async(preferences,language) => {
       var to = null;
    try {
      PushNotification.configure({

        // (optional) Called when Token is generated (iOS and Android)
        onRegister: async function (token) {
  
          // alert(token.token)
         
          global.apnToken = token;
          await AsyncStorage.setItem('iosToken', token.token)
          to = token.token;
          // sendRegistrationToken()
        },

  
        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
          console.error(err.message, err);
        },
 
        requestPermissions: true,
      });

      var lang = await AsyncStorage.getItem('language');
      var a = `${DeviceInfo.getVersion()}(${DeviceInfo.getBuildNumber()})`
      await AsyncStorage.setItem('onBoarded', String("true"));
      await AsyncStorage.setItem('isGuest', String("true"));
      await AsyncStorage.setItem('prefernces', JSON.stringify([]));
      await axios.post(GLOBAL.BASE_URL + 'auth/registerguest', {
        registrationToken: to,
        version:a,
        type:'iOS',
        language:lang,
        preferences:[]
      }).then((resp) => {
        //  alert('Token Sent')
      }).catch(err => {
        // alert('Token Stopped')
        // console.log('ikikikikikikikikikikiki')
        console.log(err)
      })
    } catch(e) {
      console.log(e);
    }

    // console.log('user token: ', userToken);
    setGuest(true)
    setOnBoardedd(true)
    dispatch({ type: 'ONBOARDING', prefernces: preferences, isGuest: true,onBoarded:"true" });
  },
    signIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(foundUser.userToken);
      const phone = foundUser.phone;
      const username = foundUser.username;
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('onBoarded', true);
        await AsyncStorage.setItem('username', username);

      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: phone, token: userToken });
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        // Chatdispatcher({type:'SETPROFILEPIC',profilePic:'https://static-content.spaarksweb.com/images/userprofile.png'})
        //  await AsyncStorage.setItem('userToken');
         await AsyncStorage.setItem('onBoarded', "true");
         await AsyncStorage.setItem('callDomain', String(null));
         await AsyncStorage.setItem('chatDomain', String(null));
         await AsyncStorage.setItem('chatpassword', String(null));
         await AsyncStorage.setItem('callpassword', String(null));
         await AsyncStorage.setItem('jid_main', String(null));
         await AsyncStorage.setItem('profilePic', String('https://static-content.spaarksweb.com/images/userprofile.png'));
         await AsyncStorage.setItem('token', String(null));
         await AsyncStorage.setItem('isProfileCompleted', String(false));
         var userTokenMain = await AsyncStorage.getItem('token');
        //  console.log('userTokenMain',userTokenMain)
        //  dispatch({ type: 'LOGOUT' });
      } catch(e) {
        console.log(e);
      }

    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);



async function getLocationDatas(){
  // alert('locations')
  var onBoardeds = await AsyncStorage.getItem('onBoarded');
  // alert(onBoardeds)
  if(Boolean(onBoardeds)){

    // alert('Ask From App')
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
            console.log(locations[0].latitude,locations[0].longitude)
            updateLocation()

          })
        }else{
          await AsyncStorage.setItem('isLocationPermitted', String(false));
          navigation.navigate('SelectCityScreen',{preferences:preferencesss})
  
          console.log('Not Allowed')
        }
      })
  }
 
}

async function updateLocation(){

  var latitudes = await AsyncStorage.getItem('latitude');
  var longitudes = await AsyncStorage.getItem('longitude');
 var jwt = await AsyncStorage.getItem('token');
 if (String(jwt) != "null") {
 await axios.post(
   GLOBAL.BASE_URL + "user/location",
   {
     latitude:latitudes,
     longitude:longitudes,
     place:"ios"
   },
   {
     headers: {
       "Content-Type": "application/json",
       Authorization:
       'Bearer '+jwt
     },
   }
 )
   .then((respo) => {
      // alert('location refreshed')

   })
   .catch((error) => {
    if (error.response.status == 401) {

      confirmlogoutApp()
    }
     console.error("update location error",error);
   });

  }
 }
 


async function getLinkingURI(){
   const url = await Linking.getInitialURL();
  //  console.log('------------------------------------------------')
  //     console.log('url',url)
  //     console.log('------------------------------------------------')
}



async function initializeCalls(navigation){
  tok = await AsyncStorage.getItem('userToken');
  // console.log('INITIALIZING CALLS')
  if(tok!="null"){
    // console.log('INITIALIZING CALLS INSIDE')
    callKeepSetup(navigation)
    handleAPNs()
    var callpassword = await AsyncStorage.getItem('callpassword');
    var callid = await AsyncStorage.getItem('aid');
    handleConnect(callid, callpassword)
    console.log('CONNECTEDYGYGYGYGYGYGYGYGYGYGYGY')
  }
}

  useEffect(() => {
    getLinkingURI()
    getLocationDatas()
    initializeCalls(navigation)
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      onBoarded = false
     var  tok = false
      var gue = false
      var pref = [];
      var shownames = null
      try {
        // console.log("tooo",await AsyncStorage.getItem('onBoarded'))
         onBoarded = await AsyncStorage.getItem('onBoarded');
         getLocationDatas()
         tok = await AsyncStorage.getItem('userToken');
         gue = await AsyncStorage.getItem('isGuest');
         pref = await AsyncStorage.getItem('prefernces');
        //  console.log("onBoarded",onBoarded)
        //  console.log("Guest",gue)
        //  console.log("Token",tok)
        //  console.log("Preferences",pref)

          var lan =  await AsyncStorage.getItem('language')
       
           I18n.locale =   lan;
  
        userToken = await AsyncStorage.getItem('userToken');
                // userToken = null;
        username = await AsyncStorage.getItem('username');
        shownames = await AsyncStorage.getItem('name');
        // alert(shownames)
        // console.log('kjnknknknknk',shownames)
        if(onBoarded){
          updateLocation()
        }
        if (String(userToken) != "null") {
       
        await axios.get(
          GLOBAL.BASE_URL + "user/getprofilepic",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                'Bearer ' + userToken
            },
          }
        ).then((resp) => {
          
          if(shownames != 'undefined' ){
   
            // navigation.navigate('AskNameScreen')
            dispatch({ type: 'RETRIEVE_TOKEN',shouldAskName:"false", token: userToken,onBoarded:onBoarded,preferences:pref });
          }else{

            dispatch({ type: 'RETRIEVE_TOKEN',shouldAskName:"true", token: userToken,onBoarded:false,preferences:pref });
          }
        }).catch((err)=>{
          if (err.response.status == 401) {
            confirmlogoutApp()
          }
          // if(err.response.status == 502){
          //   dispatch({ type: 'SERVICE_DOWN',isDown:true});
            
          // }
        });
      }else{
        if(shownames != 'undefined'){
          console.log('userToken',userToken)
          // navigation.navigate('AskNameScreen')
          dispatch({ type: 'RETRIEVE_TOKEN',shouldAskName:"false", token: String(userToken),onBoarded:onBoarded,preferences:pref });
        }else{
          console.log('userToken',userToken)
          dispatch({ type: 'RETRIEVE_TOKEN',shouldAskName:"true", token: String(userToken),onBoarded:false,preferences:pref });
        }
      }

      // if(shownames != 'undefined' ){
      //   // navigation.navigate('AskNameScreen')
      //   dispatch({ type: 'RETRIEVE_TOKEN',shouldAskName:"false", token: userToken,onBoarded:onBoarded,preferences:pref });
      // }else{
      //   dispatch({ type: 'RETRIEVE_TOKEN',shouldAskName:"true", token: userToken,onBoarded:false,preferences:pref });
      // }
     
        // Chatdispatcher({type:'SETPREFERENCES',preferences:JSON.parse(pref)})
      } catch(e) {
        console.log(e);
      }
     
      // console.log('user token: ', userToken);
      
     
      // connectXMPP()
      // addListenerssss()
    }, 2000);
  }, []);

  if( loginState.isLoading) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
//  const prefix = 'spaarks://';
 const prefixes = ['https://spaarksweb.com/','spaarks://'];
 const linking = {
  prefixes: ['https://www.spaarksweb.com','https://www.spaarks.me','spaarks://']
};
  return (

    <Provider store={store}>
            <OfflineNotice />
      <NetworkProvider pingOnlyIfOffline={true}>

    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme} linking={linking}>
      {
      loginState.shouldAskName == "true"?
       <AskNameScreen/>
      :loginState.onBoarded == "true" ? (
        <MainTabScreen navigation={navigation}/>
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    </AuthContext.Provider>
    </NetworkProvider>
    </Provider>

  );
}

const mapStatetoProps = (state) => {
  // const { }=state
  // console.log("xmppStates", state);
  return {
    chat_roster_main: state.chatss.chat_roster_main,
    chat_roster_anonymous: state.chatss.chat_roster_anonymous,
    messages: state.chatss.messages,
    chatLoading: state.chatss.chatLoading,
  };
};

// connect(mapStatetoProps)(connectXMPP);
export default App;










