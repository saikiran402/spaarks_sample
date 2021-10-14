import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { View, Text, Button, StyleSheet,Dimensions,Image } from 'react-native';
import { WebView } from 'react-native-webview';
import I18n from "../src/i18n"
const GLOBAL = require('../Globals');
const GreetingsScreen = ({navigation,route }) => {
    const [images,setImages] = useState([])
    useEffect(()=>{
        axios.get(GLOBAL.PLAIN_URL+'imagesforFCM').then((resp)=>{
                console.log(resp.data)
                setImages(resp.data.photos.reverse())
        })
    },[])
    return (
      <View style={{height:'100%'}}>
          <View style={{padding:10}}>
          <Text style={{fontSize:22,fontWeight:'600'}}>{I18n.t("Hi there")} !</Text>
        <Text>{I18n.t("Checkout what all you can do with spaarks today")}</Text>
          </View>
          <FlatList
          data={images}
          renderItem={({ item, i }) => (
              <View style={{margin:20}}>
                  <Image source={{uri:item}} style={{width:'100%',height:330,borderColor:'#6FA4E9',resizeMode:'contain'}}/>
             </View>
          )}
          />


      </View>
    );
};

export default GreetingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
