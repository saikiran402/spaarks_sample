import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { connect, useDispatch, useReducer } from "react-redux";
const GLOBAL = require('../Globals');
import I18n from 'i18n-js';
import Snackbar from 'react-native-snackbar';
const spaarksPartnerScreen0 = ({navigation,route,isConnected}) => {
    async function onPartnerScreen(){
        if(isConnected){
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
     console.log("alllllllll"  , resp.data)
     // setReferals(resp.data.message.userReferenced)
     // dispatch({type:'SETCARDS',data:resp.data.message.userReferenced})
     console.log('THIS IS THE RESPONSE LOOK HERE')
     if(resp.data.programActive){
     if(resp.data.isApplied && resp.data.isPartner){
       //Dashboard

      navigation.popToTop()
       navigation.navigate('spaarksPartnerDashboard')

     }else if(resp.data.isApplied && !resp.data.isPartner){
       //waiting to be verified

       navigation.popToTop()
       navigation.navigate('spaarksPartnerScreen3', {show: true,reason:resp.data.partnerRemarks})

     }else if(!resp.data.isApplied && !resp.data.isPartner && resp.data.partnerStatus == 'Rejected'){
      //Applied and rejected

        navigation.popToTop()
        navigation.navigate('spaarksPartnerScreen5', {show: true})

    }else if(!resp.data.isApplied && !resp.data.isPartner){
       //notapplied not verified

       navigation.popToTop()
       navigation.navigate('spaarksPartnerScreen4', {show: true})

     }
    //  refRBSheet.current.close()
    //  navigation.navigate('spaarksPartnerScreen1')
    }else{
      alert('Spaarks Partnership program is currently inactive')
    }

   })
      }else{
        Snackbar.show({
          text: I18n.t('Check your internet'),
          duration: Snackbar.LENGTH_LONG
        });
      }
     }
    useEffect(() => {
        onPartnerScreen()
      }, []);
    return (
      <View>

      </View>
    );
};


const mapStatetoProps = (state) => {
    // const { }=state
    return {
      
      names:state.chatss.name,
      isConnected:state.chatss.isConnected
  
    };
  };
  
  
  export default connect(mapStatetoProps)(spaarksPartnerScreen0);



const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
