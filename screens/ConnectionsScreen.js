import React from 'react';
import { View, Text, Button, StyleSheet,FlatList,Alert,Image,TouchableOpacity } from 'react-native';
import { connect, useDispatch, useReducer } from "react-redux";
import moment from 'moment';
import _ from "lodash";
import I18n from 'i18n-js';
const GLOBAL = require('../Globals');
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
const ConnectionsScreen = ({navigation,route,chat_roster_main}) => {
  var colors = ["#4E5567", "#6CB28E", "#FA6E5A"];
  async function MakeCall(call){
    if(call){
      Alert.alert(
        I18n.t("Confirmation"),
      I18n.t("Are you sure you want to call ")+call.name,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Call", onPress: () => confirmCall(call) }
        ]
      );
      
    }
    
  }
  async function confirmCall(call){
    // alert('Calling')
    // console.log(call)
    var jwt = await AsyncStorage.getItem('token')
    await axios.post(GLOBAL.BASE_URL+`user/addtologs/logs/${call.aid}/${call.userId}`,{
      "name":call.name,
      "profilePic":call.profilePic
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
        'Bearer '+jwt
      },
    }).then((resp)=>{
        alert('Success')
      console.log(resp.data);
      // getData()
      navigation.navigate('OutGoingCallScreen',{aid:call.aid,name:call.name,profilePic:call.profilePic})
    }).catch((err)=>{
        console.log(err)
        alert('You cannot call this user at this moment')
    })
  
  }
    return (
      <View style={{backgroundColor:'#f2f2f2'}}>
                    {
                      chat_roster_main.length>0?
                      <FlatList    
                      data={chat_roster_main}  
      
                      keyExtractor={(item, index) => item._id}
                      renderItem={({ item }) => (
                  <>
                  <View>

   
                  <View
                      style={{
                        flexDirection: "column",
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        margin: 10,
                      }}
                    >
{
  item.amIAnonymous?
                   <View style={{width:'100%',height:15,backgroundColor:'#6FA4E9',borderTopLeftRadius:10,borderTopRightRadius:10}}>
                   <Text style={{color:'#fff',textAlign:'center'}}>{I18n.t("You are Anonymous to this user")}</Text>
                  </View>
                  :<></>
}

<View style={{flexDirection:'row'}}>
                      <View style={{ flex: 10, padding: 5 }}>
                     
                        <Image
                          source={{ uri: item.profilePic }}
                          style={{ height: 80, width: 80, borderRadius: 30 }}
                        ></Image>
                  
                        <View
                          style={{
                            position: "absolute",
                            top: 70,
                            borderWidth:1,
                            backgroundColor:'#fff',
                            borderColor: "#6FA4E9",
                            left: 15,
                            borderRadius: 20,
                          }}
                        >
                          <Text style={{ color: "#6FA4E9", padding: 5, fontSize: 10 }}>
                            {/* Market + */}
                            {I18n.t(item.connection[0])}
                            {
                              item.connection.length>1?
                              <Text> +</Text>
                              :
                              <></>
                            }
                          </Text>
                        </View>
                      </View>
      
                      <View style={{ flex: 20 }}>

                          <View style={{ flexDirection: "column" }}>
                            <Text
                              style={{
                                color: "#000",
                                fontSize: 18,
                                fontWeight: "500",
                                margin: 4,
                                marginLeft: 10,
                                marginTop: 20,
                              }}
                            >
                              {item.name}
                            </Text>
                            <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                        onPress={() =>
  
                          navigation.navigate('UserProfileDynamic', { userId: item.userId, })
                        
                        }
                          
                          >
                            <Text style={{fontSize:12,color:'#6FA4E9',paddingLeft:10}}>{I18n.t("User Profile")} |</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                  onPress={() =>
  
                    navigation.navigate("SellerProfile", {
                      userId: item.userId,
                      post: item,
                    })
                  
                  }
                          >
                            <Text style={{fontSize:12,color:'#6FA4E9',paddingLeft:5}}>{I18n.t("Market Profile")}</Text>
                            </TouchableOpacity>
                            </View>
                           
                          </View>
                        
                      </View>
      
                      <View style={{ flex: 8,flexDirection:'row',marginTop:20 }}>
                      <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("ChatSpecificScreen", {
                              name: item.name,
                              item:item,
                              profilePic: item.profilePic,
                              jid: item.jid,
                              xmpp: xmpp,
                              connection:_.uniq(item.connection),
                              messages: item.messages,
                              media: []
                            })
                          }
                        >
                      <Image source={require('../assets/bottomCard/cce.png')} style={{height:30,width:30}}/>
                      </TouchableOpacity>
                    {
                      item.contactMe && !item.amIAnonymous?
                     <>
                     <TouchableOpacity onPress={()=>MakeCall(item)}>
                      <Image source={require('../assets/bottomCard/ccae.png')} style={{height:30,width:30}}/>
                      </TouchableOpacity>
                      </>
                      :
<>
<TouchableOpacity onPress={()=>alert('You cannot call this user')}>
                      <Image source={require('../assets/bottomCard/ccad.png')} style={{height:30,width:30}}/>
                      </TouchableOpacity>
                  </>
                    }
                    
         
                      </View>
                    </View>
      
</View>
                    </View>
                  </>
      
                      )}/>
                      :
                      <><View style={{backgroundColor:'#fff',padding:30}}>
                          <Text style={{textAlign:'center'}}>{I18n.t("You don't have any connections yet")}!</Text>
                          </View></>
                  }
      </View>
    );
};



const mapStatetoProps = (state) => {
  // const { }=state
  console.log("ChatsState", state.chat_roster_main);
  return {
      chat_roster_main: state.chatss.chat_roster_main,
      chat_roster_anonymous: state.chatss.chat_roster_anonymous,
      messages: state.chatss.messages,
      chatLoading: state.chatss.chatLoading,
      token: state.chatss.token
  };
};
export default connect(mapStatetoProps)(ConnectionsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
