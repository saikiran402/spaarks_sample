import React,{useEffect, useState} from "react";
import { View, Text, StyleSheet,TextInput,TouchableOpacity,Alert } from "react-native";
const GLOBAL = require('../Globals');
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar
} from "react-native-paper";
import I18n from "../src/i18n";
import { callKeepSetup,  handleConnect } from './OutGoingCallScreen'
import { connectXMPP,setXMPP, addListeners, getRosterMain, setMess,testing,getRosterFromXMPP,setPresence } from './xmpp';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import RNLocation from 'react-native-location';
import AsyncStorage from "@react-native-community/async-storage";
import OtpComponent from "../components/OtpComponent";

import chatReducers from "../reducers/chatReducers";
import { connect, useDispatch, useReducer } from "react-redux";
import  axios  from "axios";
import { Dimensions } from "react-native";
const CompleteProfileScreen = ({ navigation, route,token,chat_roster_main }) => {

  const Chatdispatcher = useDispatch(chatReducers);
const [name,updateNames] = useState('')
  
async function updateName(){
    var jwt = await AsyncStorage.getItem('token');
    axios.post(GLOBAL.BASE_URL+'user/updateprofile',{
      name:name
    },{
      headers: {
        "Content-Type": "application/json",
        Authorization:
        "Bearer "+jwt
      },
    }).then(async (resp)=>{
      await AsyncStorage.setItem('name', String(name));
      await AsyncStorage.setItem('isProfileCompleted', String(true));
      Chatdispatcher({type:'SETMYNAME',name:name})

    })
  }
  return (

        <View style={styles.container}>
      
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
                    {I18n.t("Contine")}
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
    

            
            
          
      
      </View>

  );
};




const mapStatetoProps = (state) => {
  // const { }=state
  
  return {
    token: state.chatss.token,
    chat_roster_main:state.chatss.chat_roster_main
  };
};
export default connect(mapStatetoProps)(CompleteProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
    paddingTop:0,
    backgroundColor: "#f2f2f2",
    padding: 8,
  },
  borderStyleBase: {
    width: 30,
    height: 45
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
