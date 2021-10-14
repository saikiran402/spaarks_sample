import React from 'react';
import { View, Text, Button, StyleSheet,Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
const WebViewScreen = ({navigation,route }) => {
    return (
      <View style={{height: Dimensions.get('window').height}}>
        <View style={{position:'absolute',top:0,left:20,backgroundColor:'#fff'}}>
          {/* <Text style={{color:'#000'}}>Invite People</Text> */}
          <Text style={{color:'#000'}}>Copy Invite link to clipboard</Text>
        </View>
        {/* <View style={{position:'absolute',top:0,left:0}}> */}
        <WebView source={{ uri: route.params.url }}/>
        {/* </View> */}
       
        </View>
    );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
