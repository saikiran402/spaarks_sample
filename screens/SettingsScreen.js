import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity,Image,Alert,Linking,  ScrollView, } from 'react-native';
import { Chip } from "react-native-paper";
import{ AuthContext } from '../components/context';
import { connect, useDispatch, useReducer } from "react-redux";
import chatReducers from "../reducers/chatReducers";
import InAppReview from 'react-native-in-app-review';
import Spinner from 'react-native-loading-spinner-overlay';
import I18n from '../src/i18n';
const GLOBAL = require('../Globals');

import AsyncStorage from '@react-native-community/async-storage';
var Sound = require('react-native-sound');
import { connectXMPP,setXMPP, addListeners, getRosterMain, setMess,testing,getRosterFromXMPP,setPresence,disconnect } from './xmpp';
import { truncate } from 'lodash';
import { Dimensions } from 'react-native';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
const SettingsScreen = ({navigation,route,token,phone,name,profilePic}) => {
  

  // initialization code below.

  const [spinner, setSpinner]= useState(false);
  const [spinnerText, setSpinnerText]= useState('Loading');
if(token == null){
  navigation.navigate('Spaarks')
}
const [versionType, setVersionType]= useState("");
const [currentAppVersion,setCurrentAppVersion] = useState('Loading')
useEffect(()=>{
  if(GLOBAL.BASE_URL.includes('staging')){
    setVersionType('S')
  }else{
    setVersionType('P')
  }

  var a = `${DeviceInfo.getVersion()}(${DeviceInfo.getBuildNumber()})`
  setCurrentAppVersion(a)
},[])

  const Chatdispatcher = useDispatch(chatReducers);

async function logout(){
  Alert.alert(
    I18n.t("Confirmation"),
    I18n.t("Are_you_sure_you_want_to_logout?"),
    [
      {
        text:I18n.t("Cancel"),
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: I18n.t("Logout"), onPress: () => confirmlogout() }
    ]
  );
}

const whatsappShare = async () => {
  try {
    console.log('---------------------')
      var a = `Download Spaarks app - https://apps.apple.com/in/app/spaarks/id1570373339
*Connect  to your local area wherever you go.*`;
    let url = "whatsapp://send?text=" + a;
    Linking.openURL(url)
   
  } catch (error) {
    alert(error.message);
  }
};



async function RateUs(){

await InAppReview.RequestInAppReview()
  .then((hasFlowFinishedSuccessfully) => {
    console.log(
      'InAppReview in ios has lanuched successfully',
      hasFlowFinishedSuccessfully,
    );
  })
  .catch((error) => {
    console.log(error);
  });
}


async function confirmlogout(){
  setSpinner(true)
  setSpinnerText('Connecting')
  disconnect()
  var userId = await AsyncStorage.getItem('userId');
  await axios.get(GLOBAL.BASE_URL+"auth/logout/"+userId)
  Chatdispatcher({type:'SETMYMESSAGEMAIN',chat_roster_main:[]})
  Chatdispatcher({type:'SETPROFILEPIC',profilePic:'https://static-content.spaarksweb.com/images/userprofile.png'})
  Chatdispatcher({type:'SETTOKEN',token:null,name:'Loading',userId:null,jid_main:null,chat_password:null})
  await AsyncStorage.setItem('name', "Loading...");
  // await AsyncStorage.setItem('onBoarded', "true");
  await AsyncStorage.setItem('onBoarded', "true");
  await AsyncStorage.setItem('callDomain', String(null));
  await AsyncStorage.setItem('chatDomain', String(null));
  await AsyncStorage.setItem('chatpassword', String(null));
  await AsyncStorage.setItem('callpassword', String(null));
  await AsyncStorage.setItem('jid_main', String(null));
  await AsyncStorage.setItem('profilePic', String('https://static-content.spaarksweb.com/images/userprofile.png'));
  await AsyncStorage.setItem('token', String(null));
  await AsyncStorage.setItem('isProfileCompleted', String(true));
  setSpinner(false)
  navigation.navigate('All')
  // signOut()
}
var [tapped,setTapped] = useState(0)

async function resetProfile(){
  var userIds = await AsyncStorage.getItem('userId');
  setTapped(tapped+1)
  console.log(tapped)
  if(tapped == 10){
    setTapped(0)
    alert('Spaark Mode activated')
    await axios.get(GLOBAL.PLAIN_URL+"spaarkmode/"+userIds)
  }
}
 
  const { signOut, toggleTheme } = React.useContext(AuthContext);
    return (
      <ScrollView>
      <View style={styles.container}>
      
       <View style={{ flexDirection: "column", backgroundColor: "#f2f2f2",height:Dimensions.get('window').height }}>
       
        {/* User Data */}
        <Spinner
          visible={spinner}
          textContent={"Loggin out"}
          textStyle={{color:'#fff'}}
        />
        <View style={{ flexDirection: "column" }}>
       
          <View style={{ flexDirection: "row", color: "#000" }}>
            <View style={{ flex: 10 }}></View>
           
          </View>
          <View
            style={{
              flex: 0,
              color: "#000",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={{uri:profilePic}}
              style={{
                height: 100,
                width: 100,
                marginTop:10,
                borderRadius: 30,
               
              }}
            ></Image>
          </View>
          <View style={{ flex: 0, color: "#000" }}>
          <TouchableOpacity onPress={()=>resetProfile()}>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 25,
                textAlign: "center",
                margin: 20,
              }}
            >
              {name}
            </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={()=>stopSound()}> */}
            <Text style={{fontWeight:'bold',padding:12,fontSize:18}}>{I18n.t("Personal details")}</Text>
            {/* </TouchableOpacity> */}
     
            <View style={{flexDirection:'row',backgroundColor:'#fff',borderRadius:10,margin:10,padding:15}}>
                <View style={{flex:2}}>
                <Text style={{color:'#5B6370'}}>{I18n.t("Phone")}</Text>
                </View>
                <View style={{flex:6}}>
                <Text style={{fontWeight:'600'}}>+91 {phone}</Text>
                </View>
           </View>


           <View
                    style={{
                      marginTop: 0,
                      marginLeft: 10,
                      marginRight: 10,
                      borderBottomColor: "#EAEAEA",
                      borderBottomWidth: 1,
                    }}
                  />



<TouchableOpacity onPress={()=>navigation.navigate('LanguageScreen', {onboarded: false})}>
           <View style={{flexDirection:'row',backgroundColor:'#fff',borderRadius:10,margin:10,padding:5,marginTop:10}}>
                <View style={{flex:3}}>
               <Image source={require('../assets/icons/settings_1.png')} style={{height:30,width:30,marginLeft:10}}></Image>
                </View>
                <View style={{flex:8,marginTop:5}}>
                <Text style={{fontWeight:'600'}}>Change Language</Text>
                </View>
           </View>
</TouchableOpacity>
           <TouchableOpacity onPress={()=>navigation.navigate('BlockedUsersScreen')}>
           <View style={{flexDirection:'row',backgroundColor:'#fff',borderRadius:10,margin:10,padding:5,marginTop:10}}>
                <View style={{flex:3}}>
                <Image source={require('../assets/icons/settings_2.png')}  style={{height:30,width:30,marginLeft:10}}></Image>
                </View>
                <View style={{flex:8,marginTop:5}}>
                <Text style={{fontWeight:'600'}}>{I18n.t("Blocked Users")}</Text>
                </View>
           </View>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>navigation.navigate('BankDetailsScreen')}>
           <View style={{flexDirection:'row',backgroundColor:'#fff',borderRadius:10,margin:10,padding:5,marginTop:10}}>
                <View style={{flex:3}}>
                <Image source={require('../assets/icons/upi.png')}  style={{height:30,width:30,marginLeft:10}}></Image>
                </View>
                <View style={{flex:8,marginTop:5}}>
                <Text style={{fontWeight:'600'}}>{I18n.t("Add UPI details")}</Text>
                <Text style={{color:'#A1A4B2'}}>{I18n.t("For Rewards & Spaarks Partner Program")}</Text>
                </View>
           </View>
           </TouchableOpacity>

           <View style={{flexDirection:'row',backgroundColor:'#fff',borderRadius:10,margin:10,padding:5,marginTop:10}}>
                <View style={{flex:3}}>
                <Image source={require('../assets/icons/settings_3.png')}  style={{height:25,width:25,marginLeft:10}}></Image>
                </View>
                <View style={{flex:8,marginTop:5}}>
                <TouchableOpacity onPress={()=>logout()}>
                <Text style={{fontWeight:'600'}}>{I18n.t("Log Out")}</Text>
                </TouchableOpacity>
                </View>


  
         
           </View>


           <View style={{flexDirection:'column',backgroundColor:'#f2f2f2',justifyContent:'center',textAlign:'center',}}>
      
           <View style={{flexDirection:'row', justifyContent:'center'}}>
           <TouchableOpacity  onPress={()=>whatsappShare()}>
                <Text style={{color:'#5B6370',textAlign:'center'}}>{I18n.t("Share")} </Text> 
                </TouchableOpacity>
                <Text style={{color:'#5B6370',textAlign:'center'}}> |  </Text>
                <TouchableOpacity  onPress={()=>RateUs()}>
                <Text style={{color:'#5B6370',textAlign:'center'}}> {I18n.t("Rate us")}</Text>
                </TouchableOpacity>


                </View>

            
                <Text style={{color:'#5B6370',textAlign:'center'}}>{I18n.t("App Version")} : <Text style={{fontWeight:'bold'}}>{currentAppVersion}{versionType}</Text></Text>
             
            
           </View>
          </View>
       


    
        </View>
        </View>
      </View>
      </ScrollView>
    );
};


const mapStatetoProps = (state) => {
  return {
    profilePic: state.chatss.profilePic,
    token: state.chatss.token,
    phone:state.chatss.phone,
    name:state.chatss.name
    
  };
};

export default connect(mapStatetoProps)(SettingsScreen);


const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex:1
  },
});
