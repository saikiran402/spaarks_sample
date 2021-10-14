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


const QrcodeMenuScreen = ({navigation, route,token,profilePic,name,userId,isConnected}) => {

    const Login = useRef();

    async function renderImageLoader(){
        return(
          <ActivityIndicator />
        )
      }

      async function scanNow(count){
        if(isConnected){
        var jwt = await AsyncStorage.getItem('token')
        if(String(jwt)!="null"){
          if(count == 1){
            navigation.navigate('ScanQrScreen',{type:I18n.t('Web Login'),option:1,getData:getData})
          }
          if(count ==3){
            navigation.navigate('ScanQrScreen',{type:I18n.t('Referral'),option:3})
          }
          if(count == 4){
            navigation.navigate('ScanQrScreen',{type:'Give rating',option:4})
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
                    <Text style={{color:'#323F4B',marginTop:8}}>{I18n.t("QrcodepageStr2")}</Text>
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
  export default connect(mapStatetoProps)(QrcodeMenuScreen);
  
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
  