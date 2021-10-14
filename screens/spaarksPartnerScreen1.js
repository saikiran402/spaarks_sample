import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { connect, useDispatch, useReducer } from "react-redux";
const GLOBAL = require('../Globals');
import I18n from 'i18n-js';

const spaarksPartnerScreen1 = ({navigation,route, isActive}) => {
  const [active, setActive] = useState(true)
  async function onPartnerScreen(){
    // if(isConnected){
    var tokenJWT = await AsyncStorage.getItem('token');
       await axios.get(
     GLOBAL.BASE_URL+`user/ispartner`,
     {
         headers: {
           "Content-Type": "application/json",
           Authorization:
           'Bearer '+tokenJWT
         },
       }
   ).then((resp) => {
     // setReferals(resp.data.message.userReferenced)
     // dispatch({type:'SETCARDS',data:resp.data.message.userReferenced})
     console.log('THIS IS THE RESPONSE LOOK HERE', resp.data.programActive)
    setActive(resp.data.programActive)

   })
  // }else{
  //   Snackbar.show({
  //     text: I18n.t('Check your internet'),
  //     duration: Snackbar.LENGTH_LONG
  //   });
  // }
 }
useEffect(() => {
    onPartnerScreen()
  }, []);
  // console.log("what is this", route.params.isActive)
    return (
      <View style={{height:Dimensions.get('window').height,flex:1}}>
          <View>
              <Text style={{padding:30,color:'#A1A4B2'}}>{I18n.t("sppI")}
            </Text>
          </View>
          <View>
              <Text style={{padding:30,color:'#A1A4B2'}}>{I18n.t("sppII")}</Text>
          </View>

          <View>
              <Text style={{padding:30,color:'#A1A4B2'}}>{I18n.t("sppIII")}{active?"active":"inactive"}.</Text>
          </View>
          {/* <View style={{backgroundColor:'#6FA4E9',padding:10,width:'100%',margin:10,justifyContent:'center',position:'absolute',bottom:0}}>
              <Text style={{color:'#fff',textAlign:'center'}}>REGISTER AS SPAARKS PARTNER</Text>
          </View> */}
         {
           active?
           <View style={{ flexDirection: 'column',justifyContent:'center',alignItems:'center',position: 'absolute',backgroundColor: '#6FA4E9', width: '100%',padding:10, bottom: 0,zIndex:1}}>       
              <TouchableOpacity onPress={()=>navigation.navigate('spaarksPartnerScreen2')}>
          <Text style={{color:'#fff',fontWeight:'bold',fontSize:18 , padding: 10, fontSize: 10}} >{I18n.t("REGISTER AS SPAARKS PARTNER")}</Text>
        
       
        </TouchableOpacity>

      
    </View>
    :
    <View style={{ flexDirection: 'column',justifyContent:'center',alignItems:'center',position: 'absolute',backgroundColor: '#f2f2f2', width: '100%',padding:10, bottom: 0,zIndex:1}}>       
              <TouchableOpacity onPress={()=>alert('Partnership program is currently not active. we will notify you once we are ready')}>
          <Text style={{color:'grey',fontWeight:'bold',fontSize:18 , padding: 10, fontSize: 10}} >{I18n.t("REGISTER AS SPAARKS PARTNER")}</Text>
        
     
        </TouchableOpacity>

      
    </View>
         }
              
    
    
</View>
    
    );
};

export default spaarksPartnerScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
  },
});
