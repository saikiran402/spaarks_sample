import React,{useEffect, useState} from "react";
import { View, Text, StyleSheet,TextInput,TouchableOpacity,Alert,DevSettings } from "react-native";
const GLOBAL = require('../Globals');
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar
} from "react-native-paper";
import DeviceInfo from 'react-native-device-info';
import { callKeepSetup,  handleConnect } from './OutGoingCallScreen'
import { connectXMPP,setXMPP, addListeners, getRosterMain, setMess,testing,getRosterFromXMPP,setPresence,setXMPPs } from './xmpp';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import RNLocation from 'react-native-location';
import AsyncStorage from "@react-native-community/async-storage";
import OtpComponent from "../components/OtpComponent";
import RNRestart from 'react-native-restart';
import chatReducers from "../reducers/chatReducers";
import { connect, useDispatch, useReducer } from "react-redux";
import I18n from '../src/i18n';
import  axios  from "axios";
import { Dimensions } from "react-native";
const VerifyOtpScreen = ({ navigation, route,token,chat_roster_main }) => {

  const Chatdispatcher = useDispatch(chatReducers);
async function getAllKeys(){
// alert('1')
  RNLocation.configure({
    distanceFilter: 5.0
  })
  // alert('2')
  RNLocation.requestPermission({
    ios: "whenInUse",
    android: {
      detail: "coarse"
    } 
  }).then(granted => {
    // alert('3')
      if (granted) {
        console.log("Allowed")
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(async locations => {
          console.log("Hiii",locations)
          // setLocation(JSON.stringify(locations))
          await AsyncStorage.setItem('latitude', String(locations[0].latitude));
          await AsyncStorage.setItem('longitude', String(locations[0].longitude));
          await AsyncStorage.setItem('fromMockProvider', String(locations[0].fromMockProvider));
          // onBoarded(preferencesss)
          /* Example preferencesss returned
          {
            speed: -1,
            longitude: -0.1337,
            latitude: 51.50998,
            accuracy: 5,
            heading: -1,
            altitude: 0,
            altitudeAccuracy: -1
            floor: 0
            timestamp: 1446007304457.029,
            fromMockProvider: false
          }
          */
        })
      }else{
        // alert('4')
        console.log('Not Allowed')
        // navigation.navigate('SelectCityScreen',{preferences:preferencesss})
      }
    })


  AsyncStorage.getAllKeys()
  .then((keys)=> AsyncStorage.multiGet(keys)
                  .then((data) => console.log(data)));

}







async function phoneDetails(token){
  await axios.post(
    `${GLOBAL.BASE_URL}user/getphonedata`,
    {
     currentAppVersion: `${DeviceInfo.getVersion()}(${DeviceInfo.getBuildNumber()})`,
     phoneModel: DeviceInfo.getModel(),
     phone_resolution: await DeviceInfo.getCarrier(),
     os_flavour: `${DeviceInfo.getSystemName()}(${DeviceInfo.getSystemVersion()})`,
     android_version:DeviceInfo.getVersion()

    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
        'Bearer '+token
      },
    }
  ).then((resp)=>{
    console.log(resp.data)
  }).catch((err)=>{
    console.log("phone details error",err)
   
  })
  
}


  useEffect(() => {
    getAllKeys()
    // startTimer()
},[]);



  const [otp, setOtp] = React.useState(null);
  const [encodedOtp, setEncodedOtp] = React.useState(null);
  const [stage, otpSent] = React.useState('step1');
  const [phone, setPhone] = React.useState('');
  async function getOtp(otp) {
    console.log(otp);
    setOtp(otp);
    var regT = await AsyncStorage.getItem('apn');
    if(String(otp).length == 6){
      console.log(GLOBAL.BASE_URL+'auth/verifyOTP')
      await axios.post(GLOBAL.BASE_URL+'auth/verifyOTP',
      {
       "phone":"+91"+phone,
       "guestUserId":'Huhuuuuuu',
       "encodedOtp":encodedOtp,
       "cOtp":otp,
       "registrationToken":regT,
       "device":"iOS"
      },
       {}).then(async (resp)=>{
        navigation.navigate("All", {
          setLoading: "true",
          message: "Post Created Succesfully",
          showTag: true,
        });
        //  console.log(resp.data)
         await AsyncStorage.setItem('callDomain', String(resp.data.callDomain));
         await AsyncStorage.setItem('chatDomain', String(resp.data.chatDomain));
         await AsyncStorage.setItem('chatpassword', String(resp.data.chatpassword));
         await AsyncStorage.setItem('callpassword', String(resp.data.callpassword));
         await AsyncStorage.setItem('jid_main', String(resp.data.jid_main));
         await AsyncStorage.setItem('userId', String(resp.data.jid_main.substr(0,24)));
         await AsyncStorage.setItem('profilePic', String(resp.data.profilePic));
         await AsyncStorage.setItem('token', String(resp.data.token));
         await AsyncStorage.setItem('isProfileCompleted', String(resp.data.isProfileCompleted));
         await AsyncStorage.setItem('androLanguage', String(resp.data.androLanguage));
         await AsyncStorage.setItem('aid', String(resp.data.aid));
         await AsyncStorage.setItem('name', String(resp.data.name));
         await AsyncStorage.setItem('phone', String(phone));
         await AsyncStorage.setItem('isPartner', String(resp.data.isPartner));
         await AsyncStorage.setItem('shouldLogout', String(false));
        //  phoneDetails(resp.data.token)
         RNRestart.Restart();
        //  DevSettings.reload()
         if(resp.data.isProfileCompleted){ 
          Chatdispatcher({type:'UPDATEALLAFTERLOGIN',token:'Bearer '+resp.data.token,profilePic:resp.data.profilePic,phone:phone,name:resp.data.name})
        }else{
          Chatdispatcher({type:'SETASKNAME',askName:true})
          RNRestart.Restart();
          // DevSettings.reload()
        }
         setTimeout(() => {
          getRosterFromXMPP(Chatdispatcher,resp.data.token)
         }, 2000);
         setTimeout(() => {
          callforXMPP(String(resp.data.aid),String(resp.data.callpassword),String(resp.data.jid_main),String(resp.data.chatpassword))
         }, 20000);
        
     }, (error) => {
         console.log(error);
         console.log(error.data);
            alert('Please Enter a valid OTP')
         return;
       });

    }
  }

  async function callforXMPP(callid,callp,jid_main,chat_password){
    alert('connecting chat and call')
    setXMPPs(jid_main,chat_password)
    handleConnect(callid, callp)
    connectXMPP(chat_roster_main,null)
    handleConnect(callid, callp)
    setTimeout(() => {
      if(jid_main != "null"){
        setPresence(jid_main)
      }
    }, 2000);

  }

  const [resend,setShowResend] = useState(false)
  function updatePhone(phones){
    console.log(phones)
    setPhone(phones)
  }



 async function onLogin(){
    console.log("phone","+91"+phone)
    if(phone.length>9 && phone.length < 11){
      setShowResend(false)
      startTime()
      // alert(GLOBAL.BASE_URL)
      console.log(GLOBAL.BASE_URL+'auth/sendOTP')
      otpSent('step2')
     await axios.post(GLOBAL.BASE_URL+'auth/sendOTP',
     {
      "phone":"+91"+phone,
      "guestUserId":'Huhuuuuuu'
     },
      {}).then((resp)=>{
        console.log(resp.data)
        if(resp.data.Status == 'Error'){
          if(resp.data.Details == 'Invalid Phone Number - Length Mismatch(Expected: 10)'){
            alert('Please enter valid Phone Numbers')
          }
          
        return;
        } else{
          setEncodedOtp(resp.data.Details)
          otpSent('step2')
        }
       
    }).catch((err)=>{
      console.log("phonenoerr",err)
        alert('This account has been suspended. Please try again with a different number')
    })
      
    }else{
      alert('Please enter valid Phone Number')
    }
  }
  var [couter,setCounter] = useState(20)
  var [resetCounter,setResetCounter] = useState(0)
  var [intervalIn,setIntervalInstance] = useState(null)
  async function startTime(){
    var a  = setInterval(() => {
      decreaseTime()
    }, 1000);
    setIntervalInstance(a)
  }

  async function resendOTP(){
    if(resetCounter < 2){
      var a = resetCounter+1;
    setResetCounter(a);
    console.log('in')
    await axios.post(GLOBAL.BASE_URL+'auth/sendOTP',
     {
      "phone":"+91"+phone,
      "guestUserId":'Huhuuuuuu'
     },
      {}).then((respo)=>{
        setEncodedOtp(respo.data.Details)
        setCounter(20);
        clearInterval(intervalIn)
        startTime()
        setShowResend(false)
      }).catch((errr)=>{
        console.log(errr)
          alert('Sorry, could not send OTP')
      })
    }
        else{
          otpSent('step1')
          alert('Too many resend otp request please try again later ')
        }
  }
  // console.log(resend)
  async function decreaseTime(){
    if(couter == 0){
      clearInterval(intervalIn)
      setCounter(20);
      setShowResend(true)
    }else{  
      setCounter(couter--);
    }

  }

  function wrongPhone(){
    clearInterval(intervalIn)
    setCounter(20);
    setShowResend(false)
    otpSent('step1')
    setPhone('')
  }
  const [name,updateNames] = useState('')
  const [tokens,setToken] = useState(null)

  async function updateName(){
    
      // name.length>3 && name.length < 21?
      // <></> :
      // name != "anonymous" || name != "Anonymous"?
      // <></> :
      // (!name.matches("[0-9]+")) ? 
      // <></> : 
      // alert('please enter a valid name more than 3 characters long, less than 20 characters, atleast one alphabet. Name cannot be anonymous or Anonymous.')
   
   
   
    if(name.length<3){
      alert('Min 3 characters')
    }else if(name == "anonymous" || name == "Anonymous"){
        alert('You cannot name yourself anonymous')
    }else if(name.match("[0-9]+")){
      alert('You cannot have all numbers in your name')
    }else{
      // alert('All good')
      axios.post(GLOBAL.BASE_URL+'user/updateprofile',{
        name:name
      },{
        headers: {
          "Content-Type": "application/json",
          Authorization:
          tokens
        },
      }).then(async (resp)=>{
        await AsyncStorage.setItem('name', String(name));
        await AsyncStorage.setItem('isProfileCompleted', String(true));
        Chatdispatcher({type:'SETTOKEN',token:tokens})
        Chatdispatcher({type:'SETMYNAME',name:name})
  
        
  
      })
    }
  
  }
  async function redirect(){
    navigation.navigate('Home')
  }
  return (
  <>
  {
    token == null?
        <View style={styles.container}>
        {stage == 'step2' ? (
          <>
            <View style={{ padding: 20, paddingBottom: 0, paddingLeft: 40 }}>
              <Text style={{ fontWeight: "bold", fontSize: 24 }}>Enter</Text>
              <Text style={{ fontSize: 20 }}>OTP sent to +91 {phone}</Text>
            </View>
            <OTPInputView
      style={{width: '90%', height: 100,marginLeft:25}}
      pinCount={6}
      // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
      // onCodeChanged = {code => { this.setState({code})}}
      autoFocusOnLoad
      codeInputFieldStyle={styles.underlineStyleBase}
      codeInputHighlightStyle={styles.underlineStyleHighLighted}
      onCodeFilled = {(code) => {
        getOtp(code)
      }}
  />
            {/* <OtpComponent getOtp={(otp) => getOtp(otp)} /> */}
            {/* <TextInput value={1} textContentType="oneTimeCode"/> */}
            {/* <OTPInputView pinCount={6} /> */}
          
            <View style={{flexDirection:'row',position:'absolute',top:180,left:45}}>

                {
                          resend?
                       <TouchableOpacity onPress={()=>resendOTP()}>
                       <Text style={{color:"#6FA4E9"}}>Resend OTP</Text>     
                       </TouchableOpacity>
                       :
                    <>
                     <TouchableOpacity onPress={()=>startTime()}>
                       <Text style={{color:"#f2f2f2"}}>Resend OTP</Text>
                       <Text style={{color:"#f2f2f2",textAlign:'center'}}>-{couter}- </Text>    
                       </TouchableOpacity>
                       </> 

        }

              
       
  
  <TouchableOpacity
                              onPress={() => wrongPhone()}
                            >
  <Text style={{marginLeft:80,color:"#6FA4E9"}}>Wrong Mobile Number?</Text>
  </TouchableOpacity>
  </View>
    
          </>
        )  :stage == 'step1' ? 
          <View style={{ backgroundColor: "#fff", height: 200 }}>
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
                    {I18n.t("We will send you an")}{" "}
                    <Text style={{ color: "#7E818F", fontWeight: "bold" }}>
                      One Time Password
                    </Text>{" "}
                    {I18n.t("on_this_mobile_number")}
                  </Text>
                  {/* line */}
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: 0 }}>
                <View style={{ color: "#000", flex: 13, height: 160 }}>
                  <TextInput
                    label="Phone number"
                    mode="flat"
                    keyboardType={"phone-pad"}
                    placeholder={I18n.t("Enter Mobile Number")}
                    value={phone}
                    onChangeText={updatePhone}
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
                  <Text
                    style={{
                      color: "#7E818F",
                      fontSize: 15,
                      flex: 20,
                      paddingLeft: 10,
                    }}
                  >
                    {I18n.t("We never share your mobile number with anyone")}
                  </Text>
                  {/* line */}
                  <Button
                    mode="contained"
                    color="#FA5805"
                    style={{
                      height: 40,
                      width: 120,
                      margin: 10,
                      marginLeft: 235,
                    }}
                    onPress={() => onLogin(phone)}
                  >
                    {I18n.t("SEND OTP")}
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
    
       : <>
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
                      Setup your profile
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
                    maxLength= "20"
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
                    CONTINUE
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
    

    

            
            
            </>
            
            
            }
      </View>
      :
      <Text onPress={redirect()}>Take me to feed</Text>
  }

    </>
  );
};




const mapStatetoProps = (state) => {
  // const { }=state
  return {
    token: state.chatss.token,
    chat_roster_main:state.chatss.chat_roster_main
  };
};
export default connect(mapStatetoProps)(VerifyOtpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "#fff",
    padding: 8,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
 
  borderStyleHighLighted: {
    borderColor: "#6FA4E9",

  },
 
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
 
  underlineStyleHighLighted: {
    borderColor: "#6FA4E9",
  }
});
