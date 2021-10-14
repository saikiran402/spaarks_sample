import React, { PureComponent } from 'react';
import { View, Text,  Dimensions, StyleSheet } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
const { width } = Dimensions.get('window');
import chatReducers from "../reducers/chatReducers";
import { connect, useDispatch, useReducer } from "react-redux";
import Snackbar from 'react-native-snackbar';
import I18n from 'i18n-js';
function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

// class OfflineNotice extends PureComponent {
//   state = {
//     isConnected: true
//   };

//   componentDidMount() {
//     NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
//   }

//   componentWillUnmount() {
//     NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
//   }

//   handleConnectivityChange = isConnected => {
//       this.setState({ isConnected });
//   };

//   render() {
//     if (!this.state.isConnected) {
//       return <MiniOfflineSign />;
//     }
//     return null;
//   }
// }
const OfflineNotice = ({ navigation, route,token,chat_roster_main }) => {
  const Chatdispatcher = useDispatch(chatReducers);
const unsubscribe = NetInfo.addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
  if(!state.isConnected){
    // Snackbar.show({
    //   text: I18n.t('Check your internet'),
    //   duration: Snackbar.LENGTH_LONG,
    // });
  }
  Chatdispatcher({type:'NETWORKSTATUS',isConnected:state.isConnected,showOnline:true})
  setTimeout(() => {
    Chatdispatcher({type:'NETWORKSTATUS',isConnected:state.isConnected,showOnline:false})
  }, 5000);
});


return(
  <View></View>
)

};

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30
  },
  offlineText: { color: '#fff' }
});

export default OfflineNotice;