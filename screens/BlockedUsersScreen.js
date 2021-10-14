import React,{useEffect,useState} from "react";
import { View, Text, Button, StyleSheet, Image,FlatList } from "react-native";
import axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import I18n from "../src/i18n";
import { TouchableOpacity } from "react-native";
import {sendMessage} from './xmpp'
import chatReducersactual from "../reducers/chatReducersactual";
const GLOBAL = require('../Globals');
import Spinner from 'react-native-loading-spinner-overlay';
import { connect, useDispatch, useReducer } from "react-redux";
const BlockedUsersScreen = ({chat_roster_main,navigation}) => {

  const ActualChatdispatcher = useDispatch(chatReducersactual);
  var colors = ["#4E5567", "#6CB28E", "#FA6E5A"];
  const [blocked, setBlockedUsers] = useState([])
  const [showSpinner, setShowSpinner] = useState(false)

  async function unblockUsers(item){
    setShowSpinner(true)
    console.log(item)
    try{
      console.log(item)
      var jwt = await AsyncStorage.getItem('token')
      var a = await AsyncStorage.getItem('jid_main');
      await axios
       .get(
       `${GLOBAL.BASE_URL}user/unblock/${item.userId}`, {
         headers: {
           Authorization:
           'Bearer '+jwt
         },
       })
       .then(async (resp) => {
        // ActualChatdispatcher({type:'SETINPUT',jid:item.userId+"@chat.spaarksweb.com"})
        chat_roster_main.forEach(list => {
          if (list.jid == item.jid_main) {
            list.blocked = false;
            list.message = `Click to send Message`
          }
        })
        ActualChatdispatcher({
          type: "SETMYMESSAGEMAIN",
          chat_roster_main: chat_roster_main,
        });
        const message = 
        [{
            type: "unblock",
            content: a
        }];
        sendMessage(message, item.jid_main);
        getBlocked()
           console.log("unblocked?",resp.data)
           
       });
    }catch(err){
      console.log("Error",err)
      getBlocked()
    }
  
  }



    async function getBlocked(){
      setShowSpinner(false)
      var jwt = await AsyncStorage.getItem('token')
       await axios
        .get(`${GLOBAL.BASE_URL}user/block`, {
          headers: {
            Authorization:
            'Bearer '+jwt
          },
        })
        .then(async (resp) => {
            console.log("Blocked Data",resp.data)
            setBlockedUsers(resp.data)
        });
    }

    useEffect(() => {
        getBlocked()
        // unblockUsers()
       
    }, [])

  return (
    <View style={styles.container}>
        <Spinner
        visible={showSpinner}
        textContent={'Unblocking'}
        textStyle={styles.spinnerTextStyle}
      />
        {
            blocked.length>0?<></>:<Text style={{textAlign:'center',justifyContent:'center',flex:0,marginTop:50}}>{I18n.t("No Blocked Users")}</Text>
        }
<FlatList
data={blocked}
renderItem={({ item }) => (

    <View
    style={{
      flexDirection: "row",
      backgroundColor: "#fff",
      borderRadius: 10,
      margin: 10,
    }}
  >
    <View style={{ flex: 10, padding: 5, justifyContent:'center',alignContent:'center' }}>
      <Image
        source={{uri : item.profilePic}}
        style={{ height: 80, width: 80, borderRadius: 30 }}
      ></Image>
      <View
        style={{
          position: "absolute",

          top: 70,
          borderColor: '#6FA4E9',
          borderWidth:1,
          left: 20,
          borderRadius: 20,
          backgroundColor:'#fff'
        }}
      >
        <Text style={{ color: '#6FA4E9', padding: 5, fontSize: 10 }}>
          {
          item.featureName == "greet" || item.featureName == "Greet"?
          <Text>{I18n.t("Friends")}</Text>:
          item.featureName == "showtime" || item.featureName == "Showtime"?
          <Text>{I18n.t("Announce")}</Text>:
          item.featureName == "market" || item.featureName == "Market"?
          <Text>{I18n.t("Market")}</Text>:
          <Text>{item.featureName}</Text>
          }
        </Text>
      </View>
    </View>

    <View style={{ flex: 30 }}>
      <View style={{ flexDirection: "column" }}>
        <Text
          style={{
            color: "#000",
            fontSize: 18,
            fontWeight: "bold",
            margin: 4,
            marginLeft: 10,
            marginTop: 20,
          }}
        >
          {item.name}
        </Text>
        <Text style={{ color: "#848484", margin: 0, marginLeft: 10 }}>
          <>
            <Text>Blocked {moment(item.blockedAt).fromNow()}</Text>
          </>
        </Text>
      </View>
    </View>
    <View style={{ flex: 8 }}>
    <TouchableOpacity
            
            onPress={() => {
                                   unblockUsers(item)
                                  }}
            >
      <Text
        style={{
          marginTop: 40,
          marginRight: 5,
          fontSize: 12,
          color: "#6FA4E9",
        }}
      >
        {I18n.t("Unblock")}
      </Text>
      </TouchableOpacity>
    </View>
  </View>


)}/>


     

   
   
    </View>
  );
};


const mapStatetoProps = (state) => {
  return {
    chat_roster_main: state.chat.chat_roster_main
  };
};
export default connect(mapStatetoProps)(BlockedUsersScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 16
  },
});
