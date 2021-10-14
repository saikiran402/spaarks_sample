import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import I18n from '../src/i18n';
import { View, Text,  StyleSheet,TextInput,Dimensions,DevSettings } from 'react-native';
import {
    Avatar,
    Button,
    Card,
    Title,
    Paragraph,
    Searchbar
  } from "react-native-paper";
  import RNRestart from 'react-native-restart';
  import chatReducers from "../reducers/chatReducers";
import { connect, useDispatch, useReducer } from "react-redux";
const AskNameScreen = ({navigation,route}) => {
  // This is a change
  // I also have a change
    const Chatdispatcher = useDispatch(chatReducers);
const [name,updateNames] = useState('');
const GLOBAL = require('../Globals');
async function updateName(){
var tokens = await AsyncStorage.getItem('token');
  if(name.length<3){
    alert('Min 3 characters')
  }else if(name == "anonymous" || name == "Anonymous"){
      alert('You cannot name yourself anonymous')
  }else if(name.match("[0-9]+")){
    alert('You cannot have all numbers in your name')
  }else if(name.length>20){
    alert('Max 20 characters long')
  }else {
// alert('all good')
   await axios.post(GLOBAL.BASE_URL+'user/updateprofile',{
      name:name
    },{
      headers: {
        "Content-Type": "application/json",
        Authorization:
        'Bearer '+tokens
      },
    }).then(async (resp)=>{
        // alert('Success')
      await AsyncStorage.setItem('name', String(name));
      await AsyncStorage.setItem('isProfileCompleted', String(true));
      Chatdispatcher({type:'SETTOKEN',token:tokens})
      Chatdispatcher({type:'SETMYNAME',name:name})
      // alert('Reloading')
      // DevSettings.reload()
      RNRestart.Restart();
      

    })
  }

}
    return (
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
          {I18n.t("Continue")}
        </Button>
      </View>
    </View>
  </View>
</View>
</View>
      </View>
    );
};

export default AskNameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});



     

