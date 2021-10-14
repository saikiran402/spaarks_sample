import React, { useState } from 'react';
import { TouchableOpacity , SafeAreaView , Pressable } from 'react-native';
import { Dimensions } from 'react-native';
import { View, Text, Button, StyleSheet,Image,ScrollView } from 'react-native';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import QRCodeScanner from 'react-native-qrcode-scanner';
import Clipboard from '@react-native-community/clipboard';
import Snackbar from 'react-native-snackbar';
import I18n from '../src/i18n';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { connect, useDispatch, useReducer } from "react-redux";
import chatReducers from "../reducers/chatReducers";
const GLOBAL = require('../Globals');
const QrForPartnerScreen = ({navigation,route}) => {
  const Chatdispatcher = useDispatch(chatReducers);
    const [hasPermission, setHasPermission] = useState("granted");
    async function clickedLink(){
        Clipboard.setString('https://www.spaarksweb.com')
        // alert('Message copied')
        Snackbar.show({
          text: I18n.t('Link copied to clipboard'),
          duration: Snackbar.LENGTH_LONG,
        });
      }
      
      console.log(route.params.setId)
      if (hasPermission === null) {
        return <Text>{I18n.t("Requesting for camera permission")}</Text>;
      }
      if (hasPermission === false) {
        return <Text>{I18n.t("No access to camera")}</Text>;
      }

      async function getSets(){
        var tokenJWT = await AsyncStorage.getItem('token');
        await axios.get(
            GLOBAL.BASE_URL+"user/mysets",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization:
                'Bearer '+tokenJWT
              },
            }
          )
            .then((res) => {
              
              // console.log('responseDATATATATs', res.data.message.partner[0].sets)
              // console.log('PARTNERDATAPARTNERDATAPARTNERDATAPARTNERDATAPARTNERDATAsswwwwwwwwwweeesasasas', res.data.message.partner)
              // setSets(res.data.message.partner)
              // setIsbankVerified(res.data.message.isbankVerified)
              Chatdispatcher({type:'UPDATEPARTNERPROGRAM',partnershipSets:res.data.message.partner})
              // navigation.navigate('spaarksPartnerScreen3')
             
            })
       }
      
      onSuccess = async (e) => {
       console.log(e.data)
       var a = JSON.parse(e.data);
       var uid = a.id
           var time = a.time
           console.log(uid,time)
       var tokenJWT = await AsyncStorage.getItem('token');
       console.log(GLOBAL.BASE_URL+"user/scanreferencer")
       await axios.post(
           GLOBAL.BASE_URL+"user/scanreferencer",
           {
             uid: uid,
             time:time,
             partnerId: route.params.setId
           },
           {
             headers: {
               "Content-Type": "application/json",
               Authorization:
               'Bearer '+tokenJWT
             },
           }
         )
           .then((res) => {
            getSets()
             console.log('responseIJIJIJI', res.data.message)
             navigation.navigate('MySetsScreen')
            
           })
           .catch((error) => {
            getSets()
            console.error(error.response.data);
            alert(error.response.data.message)

           });
      
      };


    var a = [1,2,3,4,5]
    const [canClaim,setCanClaim] = useState(false)
    return (
        <ScrollView>
        <View style={{flex:1}}>
        <View>

    <QRCodeScanner
      // showMarker={true}
      cameraStyle={{height:400,width:Dimensions.get('window').width,marginHorizontal : 0 , bottom:50}}
      // markerStyle={{color:'#6FA4E9',borderColor:'#6FA4E9'}}
      onRead={onSuccess}
      reactivate={true}
      reactivateTimeout={5000}
      flashMode={RNCamera.Constants.FlashMode.auto}
    />
    </View>

    <View style={{position:'relative',top:-95,paddingHorizontal :15}}>
      <Text style={{padding:10,color:'#000',fontWeight:'bold'}}>{I18n.t("Terms for Spaarks Partner Program")} </Text>
      <Text style={{padding:10,color:'#A1A4B2'}}>{I18n.t("partner_1l")}</Text>
      <Text style={{padding:10,color:'#A1A4B2'}}>{I18n.t("partner_2l")}</Text>
      <Text style={{padding:10,color:'#A1A4B2'}}>{I18n.t("partner_3l")} <Text onPress={()=>navigation.navigate("ApplicableCategories")} style={{color:"#6FA4E9"}}>{I18n.t("Business categories")} .</Text> </Text> 
      <Text style={{padding:10,color:'#A1A4B2'}}>{I18n.t("partner_4l")} <Text onPress={()=>navigation.navigate("SpaarksTemplateActivity")} style={{color:"#6FA4E9"}}>{I18n.t("Spaark Templates")}</Text> </Text>
      <Text style={{padding:10,color:'#A1A4B2'}}>{I18n.t("partner_5l")}</Text>
      <Text style={{padding:10,color:'#A1A4B2'}}>{I18n.t("partner_6l")}</Text>
    </View>
        </View>
</ScrollView>
        );
};

export default QrForPartnerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
  },
});
