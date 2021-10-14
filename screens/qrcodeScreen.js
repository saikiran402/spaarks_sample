import React,{useState,useEffect,useRef} from "react";
import { View, Text,  StyleSheet, Alert, Image,RefreshControl,Linking,TouchableOpacity,ActivityIndicator } from "react-native";
import { ScrollView } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Dimensions } from "react-native";
import I18n from '../src/i18n';
import Clipboard from '@react-native-community/clipboard';

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
  Chip,
} from "react-native-paper";
import Snackbar from 'react-native-snackbar';
import RBSheet from "react-native-raw-bottom-sheet";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import QRCode from 'react-native-qrcode-generator';
import { connect, useDispatch, useReducer } from "react-redux";
import axios from "axios";
import moment from 'moment';
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
const GLOBAL = require('../Globals');
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';


import QrcodeMenuScreen from './QrcodeMenuScreen'
const Tab = createMaterialTopTabNavigator();


const qrcodeScreen = ({navigation, route,token,profilePic,name,userId,isConnected}) => {
  const [showSessions,setSessions]  = useState([])
  const [isLoggedIn,setisLoggedIn]  = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);
  async function getData(){




   




    setQrdata(JSON.stringify({
      userId:userId,
      time:Date.now()
    }))
    var jwt = await AsyncStorage.getItem('token');
    if(String(jwt) != "null"){
      setisLoggedIn(true)
    await axios.get(GLOBAL.BASE_URL+'user/getActiveSessions',{
      headers: {
        "Content-Type": "application/json",
        Authorization:
        'Bearer '+jwt
      },
    }
  ).then((resp)=>{
    console.log("Dsdsdsdsdsdsds",resp.data)
    setSessions(resp.data)
      // navigation.navigate('Web Login')
    // setLoading(false)
  }).catch((err)=>{
      console.log('ERROR',err)
  })
}else{
  setisLoggedIn(false)
}
  }

  async function deleteBrowser(loginId){
    
    var jwt = await AsyncStorage.getItem('token');
    console.log(GLOBAL.BASE_URL+'user/web/remove/'+loginId)
    await axios.get(GLOBAL.BASE_URL+'user/web/remove/'+loginId,{
      
      headers: {
        "Content-Type": "application/json",
        Authorization:
        'Bearer '+jwt
      },
    }
  ).then((resp)=>{
    Snackbar.show({
      text: 'Loggedout Succesfully',
      duration: Snackbar.LENGTH_LONG,
      // action: {
      //   text: 'UNDO',
      //   textColor: 'white',
      //   onPress: () => { /* Do something. */ },
      // },
    });
    getData()
    
  }).catch((err)=>{
      console.log('ERROR',err)
  })



  }
  const [qrdata,setQrdata] = useState(JSON.stringify({
    id:userId,
    time:Date.now()
  }))
 
  useEffect(()=>{
    getData()
  },[])

  const onRefresh = React.useCallback(async () => {
    // setRefreshing(true);
  
    // console.log("In in Effect")
    // getRoster()
    // setXMPP()
    // getRoster()
    // connectXMPP()
  
    getData()
  }, []);
  const [hasPermission, setHasPermission] = useState("granted");
  async function clickedLink(){
    Clipboard.setString('https://www.spaarksweb.com')
    // alert('Message copied')
    Snackbar.show({
      text: I18n.t('Link copied to clipboard'),
      duration: Snackbar.LENGTH_LONG,
    });
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  onSuccess = e => {
   console.log(e.data)
  };


  async function logoutAll(){
    var jwt = await AsyncStorage.getItem('token')
    await axios.get(GLOBAL.BASE_URL+"user/web/logout/all",{
      headers: {
        "Content-Type": "application/json",
        Authorization:
        'Bearer '+jwt
      },
    }
  ).then((resp)=>{
    getData()
  }).catch((err)=>{
    console.log(err)
  })
  }
  function WebLogin(){

    if(isConnected){
      return(
        <>
        {
          isLoggedIn?
          <View style={{backgroundColor:'#f2f2f2',flex:1,height:Dimensions.get('window').height}}>
          {
              showSessions.length>0?
              <>
              <FlatList 
              data={showSessions}
              keyExtractor={(item, index) => item._id}
                      renderItem={({ item }) => (
      
                        <View
                        style={{
                          backgroundColor: "#fff",
                          flexDirection: "row",
                          width: "90%",
                          marginTop: 10,
                          borderRadius: 10,
                          marginLeft:22,
                          padding: 10,
                        }}
                      >
                        <View style={{ flex: 0 }}>
                          {
                            item.browser == 'Apple'?
                            <Image
                            source={{uri:'https://cdn.dribbble.com/users/1161517/screenshots/7896076/apple-logo-animation.gif'}}
                            style={{ height: 65, width: 65 }}
                          ></Image>:
                          item.browser.includes('Firefox')?
                          <Image
                            source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/1200px-Firefox_logo%2C_2019.svg.png'}}
                            style={{ height: 45, width: 45,padding:10 }}
                          ></Image>
                          :
                          item.browser.includes('Google')?
                          <Image
                          source={{uri:'https://www.gizmochina.com/wp-content/uploads/2021/03/Google-Chrome-Logo-Featured.jpg'}}
                          style={{ height: 65, width: 65 }}
                        ></Image>:
                        <Image
                        source={{uri:'https://cdn0.iconfinder.com/data/icons/business-and-finance-colored-3/64/business-and-finance-colored-3-11-512.png'}}
                        style={{ height: 65, width: 65 }}
                      ></Image>
                          // https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/1200px-Firefox_logo%2C_2019.svg.png
                          }
                          
                        </View>
                        <View style={{ flexDirection: "column", marginTop: 10, flex: 3,marginLeft:10 }}>
                          <Text>{item.os} - {item.browser == 'Apple'?"Safari":item.browser}</Text>
                          <Text>{moment(item.loggedInAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                        </View>
                        <View style={{ flex: 0 }}>
                          <TouchableOpacity  onPress={()=>deleteBrowser(item._id)}>
                          <Image
                            source={require("../assets/icons/deleted_browser.png")}
                            style={{ height: 65, width: 65 }}
                          ></Image>
                          </TouchableOpacity>
                        </View>
                      </View>
                                    
  
                      )}
              />
              {
                showSessions.length == 2?
               <TouchableOpacity onPress={()=>logoutAll()}>
               <View style={{padding:10,justifyContent:'center',backgroundColor:'#6FA4E9',margin:10}}>
                  <Text style={{textAlign:'center',color:'#fff'}}>Logout of all devices</Text>
                  </View>
                  </TouchableOpacity>
                  :
                  <></>
              }

            <View style={{justifyContent:'center'}}>
              <Text style={{textAlign:'center',marginTop:10}}>{I18n.t("Maximum of 2 web logins are allowed at a time")}</Text>
              <Text style={{textAlign:'center',fontWeight:'300',marginTop:10,padding:10}}>{I18n.t("Logout from anyone device to continue using Spaarks Web")}</Text>
            </View>
              </>
              :
              <Text style={{alignItems:'center',textAlign:'center',marginTop:20,marginBottom:40,fontWeight:'100'}}>{I18n.t("No Active web sessions active")}</Text>
          }
        

  
    
        </View>
       
       :
       <View style={{ backgroundColor: "#fff", height: 200 }}>
                            <View>
                              <View>
                                
                                <View style={{ flexDirection: "row", marginTop: 0 }}>
                                  <View style={{ color: "#000", flex: 13, height: 60,justifyContent:"center", alignItems:'center', top:30 }}>
                                    <Image source={require('../assets/icons/login_continue.png')} style={{ height: 150, width: 150, }}placeholderStyle={{backgroundColor:'#fff'}}
                        PlaceholderContent={renderImageLoader}></Image>
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
  
  
        }
        
        
        </>
      )
    }else{
      return(
        <ScrollView 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{flex:1,height:Dimensions.get('window').height/2,justifyContent:'center',alignItems:'center'}}>
          <Image source={require('../assets/offline2.png')} style={{height:300,width:300}}/>
        </View>
        </ScrollView>
      )
    }
 
  }
  const Login = useRef();
  async function scanNow(count){
    if(isConnected){
    var jwt = await AsyncStorage.getItem('token')
    if(String(jwt)!="null"){
      if(count == 1){
        navigation.navigate('ScanQrScreen',{type:I18n.t('Web Login'),option:1,getData:getData,finalType:'Web Login'})
      }
      if(count ==3){
        navigation.navigate('ScanQrScreen',{type:I18n.t('Referral'),option:3,finalType:'Referral'})
      }
      if(count == 4){
        navigation.navigate('ScanQrScreen',{type:'Give rating',option:4,finalType:'Give rating'})
      }
    }else{
      Login.current.open();
    }
  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }

  }
  async function renderImageLoader(){
    return(
      <ActivityIndicator />
    )
  }
  
  function onLogin(phone) {
    console.log("phoness", phone)
    Login.current.close();
    navigation.navigate('VerifyOtpScreen', { phone: phone })
  }
  function ScanQr(){
    return(
      <ScrollView>
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
                                <View style={{ color: "#000", flex: 13, height: 60,justifyContent:"center", alignItems:'center', top:30 }}>
                                  <Image source={require('../assets/icons/login_continue.png')} style={{ height: 150, width: 150, }}placeholderStyle={{backgroundColor:'#fff'}}
                      PlaceholderContent={renderImageLoader}></Image>
                                </View>
                              </View>
                              <View style={{ flexDirection: "row", marginTop: 0 }}>
                                <View style={{ color: "#000", flex: 13, height: 160 ,justifyContent:"center", alignItems:'center'}}>


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
      <View style={{backgroundColor:'#f2f2f2'}}>
        <View style={{width: 350, marginTop:0 }}>
        <View style={{width:Dimensions.get('window').width,zIndex:1,top:20,flex:1,justifyContent:'center',alignItems:'center'}}>
          {/* <TouchableOpacity onPress={()=>clickedLink()}>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 0,marginLeft:0,color:'#fff',textAlign:'center',position:'absolute' }} >
              Go to{' '} https://spaarksweb.com on
              your computer and scan the QR code.
          </Text>
          </TouchableOpacity> */}
          <Image source={require('../assets/icons/scanQr.png')}/>
        
          </View>
          {/* <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <View style={{backgroundColor:'#6FA4E9',borderRadius:10,padding:10,margin:10,marginLeft:50}}>
              <Text style={{color:'#fff'}}>Scan Refferal QR</Text>
            </View>
            <View style={{backgroundColor:'#6FA4E9',borderRadius:10,padding:10,margin:10}}>
              <Text style={{color:'#fff'}}>Scan Friend QR</Text>
            </View>
          </View> */}

               <View style={{alignItems:'center',justifyContent:'center',marginTop:50}}>
           
              <Text style={{color:'#000',fontWeight:'bold', textAlign:'center',marginLeft:30}}>{I18n.t("Spaarks QR")}</Text>
              <Text style={{color:'#000', textAlign:'center',marginLeft:30}}>{I18n.t("Select from any of the options below")} </Text>

              
          </View>


          <View style={{marginTop:20,backgroundColor:'#fff',borderRadius:20}}>
            <TouchableOpacity onPress={()=>scanNow(1)}>
            <View style={{flexDirection:'row',backgroundColor:'#fff',width:Dimensions.get('window').width,padding:10}}>
                <View style={{flex:1,marginLeft:10}}>
                 <Image source={require('../assets/icons/login_1.png')} style={styles.eachImage}/>
                </View>
                <View style={{flex:3}}>
                  <Text style={{fontWeight:'bold'}}>{I18n.t("Web Login")}</Text>
                  <Text style={{color:'#323F4B',marginTop:8}}>{I18n.t("QrcoodepageStr1")} </Text>
                </View>
            </View>
            </TouchableOpacity>
            {/* <View
                    style={{
                      marginTop: 0,
                      marginLeft: 43,
                      marginRight: 0,
                      borderBottomColor: "#EAEAEA",
                      borderBottomWidth: 1,
                    }}
                  />
                              <TouchableOpacity onPress={()=>navigation.navigate('ScanQrScreen',{type:'Add Friend',option:2})}>
                <View style={{flexDirection:'row',backgroundColor:'#fff',width:Dimensions.get('window').width,padding:10}}>
                <View style={{flex:1,marginLeft:10}}>
                 <Image source={require('../assets/icons/login_2.png')} style={styles.eachImage}/>
                </View>
                <View style={{flex:3}}>
                  <Text style={{fontWeight:'bold'}}>Add Friend</Text>
                  <Text style={{color:'#323F4B',marginTop:8}}>Scan ‘My QR’ of your friend to add him in your Chat list.</Text>
                </View>
            </View>
            </TouchableOpacity> */}
           
            <View
                    style={{
                      marginTop: 0,
                      marginLeft: 43,
                      marginRight: 0,
                      borderBottomColor: "#EAEAEA",
                      borderBottomWidth: 1,
                    }}
                  />
                              <TouchableOpacity onPress={()=>scanNow(4)}>

<View style={{flexDirection:'row',backgroundColor:'#fff',width:Dimensions.get('window').width,padding:10}}>
                <View style={{flex:1,marginLeft:10}}>
                 <Image source={require('../assets/icons/login_4.png')} style={styles.eachImage}/>
                </View>
                <View style={{flex:3}}>
                  <Text style={{fontWeight:'bold'}}>{I18n.t("Rate Sellers & Service Providers")}</Text>
                  <Text style={{color:'#323F4B',marginTop:8}}>{I18n.t("QrcodepageStr3")}</Text>
                </View>
            </View>
            </TouchableOpacity>
            <View
                    style={{
                      marginTop: 0,
                      marginLeft: 43,
                      marginRight: 0,
                      borderBottomColor: "#EAEAEA",
                      borderBottomWidth: 1,
                    }}
                  />
            <TouchableOpacity onPress={()=>scanNow(3)}>
                <View style={{flexDirection:'row',backgroundColor:'#fff',width:Dimensions.get('window').width,padding:10}}>
                <View style={{flex:1,marginLeft:10}}>
                 <Image source={require('../assets/icons/login_3.png')} style={styles.eachImage}/>
                </View>
                <View style={{flex:3}}>
                  <Text style={{fontWeight:'bold'}}>{I18n.t("Referral")}</Text>
                  <Text style={{color:'#323F4B',marginTop:8}}>{I18n.t("qrcode_new")}</Text>
                </View>
            </View>
            </TouchableOpacity>
          
          </View>      
          {/* <QRCodeScanner
          onRead={onSuccess}
          reactivate={true}
          reactivateTimeout={5000}
          // flashMode={RNCamera.Constants.FlashMode.torch}
          topContent={
            <Text style={styles.centerText}>
              <Text style={styles.textBold}> Go to{' '} https://spaarksweb.com on
              your computer and scan the QR code.</Text> 
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
          }
        /> */}
        </View>
      
      </View>
      </ScrollView>
    
    
    )
  }

  setTimeout(async () => {
    var userIdsss = await AsyncStorage.getItem('userId')
    qrdatas = {
      id:userIdsss,
      time:Date.now()
    }
    setQrdata(JSON.stringify(qrdatas))
  }, 20000);

  var [timer,setTimer] = useState(5)

  // setInterval(() => {
  //   if(timer == 1){
  //     setTimer(0)
  //     setTimer(5)
  //   }else{
  //     setTimer(timer--)
  //   }
   
  // }, 2000);
  function myQR(){
    // var userIds = userId;
   
    if(isConnected){
    return(
      <>
      {
        isLoggedIn?
      <View style={{backgroundColor:'#f2f2f2',justifyContent:'center',flex:1, 
      alignItems: 'center', 
      justifyContent: 'center',paddingBottom:40}}>
         <Image source={{uri:profilePic}} style={{height:90,width:90,borderRadius:30}}/>   
        <Text style={{fontWeight:'bold',fontSize:20,marginBottom:10}}>{name && name}</Text>
        {/* <Text>{JSON.stringify(qrdata)}</Text> */}
        <View>
          
        </View>
        <QRCode
            value={qrdata}
            size={190}
            bgColor='black'
            style={{padding:0}}
            fgColor='white'/>  
            <Text style={{padding:10}}>{I18n.t("Qr Code Refreshes for every 20s")}</Text>
  {/* <Image source={require('../assets/5s.gif')} style={{height:50,width:50,borderRadius:30}}/> */}
  <View style={{justifyContent:'center'}}>
            <Text style={{textAlign:'center',marginTop:60}}>{I18n.t("This QR code can be used for claiming Rewards and in Partnership program")}</Text>
           
          </View>
      </View>
  :
  <View style={{ backgroundColor: "#fff", height: 200 }}>
  <View>
    <View>
      
      <View style={{ flexDirection: "row", marginTop: 0 }}>
        <View style={{ color: "#000", flex: 13, height: 60,justifyContent:"center", alignItems:'center', top:30 }}>
          <Image source={require('../assets/icons/login_continue.png')} style={{ height: 150, width: 150,  }}placeholderStyle={{backgroundColor:'#fff'}}
PlaceholderContent={renderImageLoader}></Image>
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


  }
  </>
    )
}else{
  return(
    <ScrollView 
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >
    <View style={{flex:1,height:Dimensions.get('window').height/2,justifyContent:'center',alignItems:'center'}}>
      <Image source={require('../assets/offline2.png')} style={{height:300,width:300}}/>
    </View>
    </ScrollView>
  )
}
  }


    return (
      <Tab.Navigator   screenOptions={{
        
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
      }}> 
        <Tab.Screen  name={I18n.t("Scan QR")} component={ScanQr} />
        <Tab.Screen name={I18n.t("Web Login")} component={WebLogin} />
        <Tab.Screen name={I18n.t("My QR")} component={myQR} profilePic='https://static-content.spaarksweb.com/images/userprofile.png' />
      </Tab.Navigator>
    );
};



const mapStatetoProps = (state) => {
  // const { }=state
  
  return {
    profilePic: state.chatss.profilePic,
    token: state.chatss.token,
    name:state.chatss.name,
    userId:state.chatss.userId,
    isConnected:state.chatss.isConnected
  };
};
export default connect(mapStatetoProps)(qrcodeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  eachImage:{
    height:70,width:70
  }
});
