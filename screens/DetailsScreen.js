import React,{ useEffect,setState,useRef, useState }  from 'react';
import { View,Text,Image, StyleSheet,TouchableOpacity, Dimensions,RefreshControl, StatusBar,ScrollView,TextInput,SafeAreaView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph,Searchbar} from 'react-native-paper';
import axios from 'axios';
import MarketScreen from './MarketScreen';
import SayHiiScreen from './SayHiiScreen';
import EventsScreen from './EventsScreen';
import AllFeaturesScreen from './AllFeaturesScreen';
import GreetRequestsScreen from './GreetRequestsScreen';
import NotificationScreen from './NotificationScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import OutGoingCallScreen from './OutGoingCallScreen';
import AsyncStorage from "@react-native-community/async-storage";
import chatReducers from "../reducers/chatReducers";
import { connect, useDispatch, useReducer } from "react-redux";
import { NetworkConsumer } from 'react-native-offline';
import OfflineNotice from '../components/OfflineNotice'
const Stack = createStackNavigator();
function AllScreen({navigation,route}) {
  return (
    <AllFeaturesScreen setLoading="false" isNew="false" message={route.params.message} preferencess={route.params.preferences} navigation={navigation} jid_main={route.params.jid_main} chat_password={route.params.chat_password}></AllFeaturesScreen>
  );
}



function MarketScreens({navigation,route}) {                     
  return (
    <MarketScreen navigation={navigation}></MarketScreen>
  );
}


function SayHiiScreens({navigation,route}) {
  return (
    <SayHiiScreen navigation={navigation}></SayHiiScreen>
  );
}

function AnnounceScreen({navigation,route}) {
  return (
    <EventsScreen navigation={navigation}></EventsScreen>
  );
}
function GreetRequestScreen({navigation,route}) {
  return (
    <GreetRequestsScreen navigation={navigation}></GreetRequestsScreen>
  );
}

function ProfileScreen() {
  return (
    <View>
      <Text>
        Huhuhuuuu
      </Text>
    </View>
  );
}

function ChatSpecificScreen() {
  return (
    <View>
      <Text>
        Huhuhuuuu
      </Text>
    </View>
  );
}


async function getJid(){
  var a =  await AsyncStorage.getItem('jid_main');
  return a.substr(0,24);
}

async function getChatPassword(){
  return await AsyncStorage.getItem('chatpassword')
}
import I18n from '../src/i18n';

const Tab = createMaterialTopTabNavigator();

 function DetailsScreen({navigation,route,language,askName,asd}) {
  const [name,updateNames] = useState('');
   const [shouldaskName,setshouldaskName] = useState(true)
  async function setLanguage(){
     var lan =  await AsyncStorage.getItem('language')
     var name =  await AsyncStorage.getItem('name');
if(name == ""){
  setshouldaskName(true)
}else{
  setshouldaskName(false)
}
    //  if(name){

    // }else{
     
    // }

  I18n.locale =   lan;
  }

useEffect(()=>{
  setLanguage()
},[])
  return (
    <SafeAreaView style={{flex:1}}>
<>
{
  shouldaskName?
  <>
        <View>

<View style={{ backgroundColor: "#fff", height: 200,borderRadius:20,marginTop:20 }}>
<View>
  <View>
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      <View style={{ color: "#000", flex: 13, height: 30 }}>
       
      </View>
    </View>
    <View style={{ flexDirection: "row", marginTop: 0 }}>
      <View style={{ color: "#000", flex: 13, height: 60 }}>
        <Text
          style={{
            color: "#A1A4B2",
            fontSize: 14,
            flex: 70,
            paddingLeft: 10,
          }}
        >
          <Text style={{ color: "#7E818F", fontWeight: "bold" }}>
            {I18n.t("Setup your profile")}
          </Text>
        </Text>
        {/* line */}
      </View>
    </View>
    <View style={{ flexDirection: "row", marginTop: 0 }}>
      <View style={{ color: "#000", flex: 13, height: 160 }}>
        <TextInput
          label="Name"
          mode="flat"
          placeholder="Name / Business Namer"
          value={name}
          maxLength={20}
          onChangeText={updateNames}
          // onContentSizeChange={setPhone}
          // ref={(input) => { phones = input; }}
          style={{
            backgroundColor: "#f2f2f2",
            height: 40,
            margin: 10,
            paddingLeft: 10,
            marginTop: 0,

          }}
        />
     
        {/* line */}
        <Button
          mode="contained"
          color="#6FA4E9"
          style={{
            height: 40,
            alignItems:'center',
              marginLeft:90,
            width: Dimensions.get('window').width/2
          }}
          onPress={() => updateName()}
        >
          {I18n.t("CONTINUE")}
        </Button>
      </View>
    </View>
  </View>
</View>
</View>
      </View>
  </>
  :
  <>
        {/* <OfflineNotice /> */}
   <Tab.Navigator   
   lazy
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
        labelStyle: { fontSize: 11 },
        allowFontScaling:true,
        activeTintColor:'#6FA4E9',
        inactiveTintColor:'#9A9A9A',
        indicatorStyle:{backgroundColor:'#6FA4E9',height:3}
      }}>
        
        <Tab.Screen name="All" component={AllScreen} initialParams={{ setLoading: false,message:route.params.message,showTag:route.params.showTag,preferences:[{category:'Plumber'},{category:'Electrician'}]}}  options={{
        title:I18n.t('All'),
        headerLeft: () => (
          <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
            Spaarks
          </Text>
        )}}/>
        <Tab.Screen name="Market" component={MarketScreens} options={{
        title:I18n.t('Market'),
        labelStyle: { fontSize: 8 },
         headerLeft: () => (
          <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
            Spaarks
          </Text>
        )}}/>
       
        <Tab.Screen name="Announce" component={AnnounceScreen} options={{
        title:I18n.t('Social'), headerLeft: () => (
          <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
            Spaarks
          </Text>
        )}} />
         <Tab.Screen name="Make Friends" component={SayHiiScreen} options={{
        title:I18n.t('Make Friends'), headerLeft: () => (
          <Text style={{ color: "#6FA4E9", fontSize: 30, paddingLeft: 20 }}>
            Spaarks
          </Text>
        )}} />
    
    
      </Tab.Navigator>

</>
}
     
</>
</SafeAreaView>
  );
}



const mapStatetoProps = (state) => {
  // const { }=state
  return {
    language: state.chatss.language,
    askName:state.chatss.askName
  };
};

// exports.finalXMPP = finalXMPP;
export default connect(mapStatetoProps)(DetailsScreen);
