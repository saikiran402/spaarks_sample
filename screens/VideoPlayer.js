
import React, { useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";
import Video from 'react-native-video';


const VideoPlayer = ({navigation,route}) => {


  return (
    <SafeAreaView style={{flex:1}}>
     <View>
     <Video source={{uri: route.params.video}}   // Can be a URL or a local file.
ref={(ref) => {
player = ref
}}          
paused={false}          
controls={true}
fullscreen
style={{height:650,width:Dimensions.get('window').width}}
/>
     </View>
    </SafeAreaView>
  );
}


export default VideoPlayer;
const styles = StyleSheet.create({

});