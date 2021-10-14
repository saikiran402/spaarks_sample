import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image,Dimensions,FlatList } from 'react-native';
import { Chip } from "react-native-paper";
import axios from "axios";
import {
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
  TextInput,
} from "react-native-paper";
import moment from 'moment';
import I18n from '../src/i18n';

import { callKeepSetup, handleConnect,hangupCallIncomingCall } from './OutGoingCallScreen'

import { connect, useDispatch, useReducer } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
const GLOBAL = require('../Globals');
const GreetRequestsScreen = ({navigation,route,token}) => {
  const [requestSent,setRequestSent] = useState([])
  const [requestReceived,setRequestReceived] = useState([])
  function onLogin(phone) {
    console.log("phoness", phone)
    // Login.current.close();
    navigation.navigate('VerifyOtpScreen', { phone: phone })
  }

  async function registerCalls(){
    
    if(token!=null){
      var callpassword = await AsyncStorage.getItem('callpassword');
      var callid = await AsyncStorage.getItem('aid');
      handleConnect(callid, callpassword)
    }

}
async function getData(){
  // registerCalls()
  // alert('Fetching again')
  var token = await AsyncStorage.getItem('token');
  if(String(token) != "null"){
    await axios.get(
      `${GLOBAL.BASE_URL}greet/getPendingRequestByPost`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
          'Bearer '+token
        },
      }
    ).then((resp) => {
      // console.log('greet Requests received', resp.data)
      setRequestReceived(resp.data)
    })
  }

  if(String(token) != "null"){
  await axios.get(
    `${GLOBAL.BASE_URL}greet/getSentRequestByPost`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
        'Bearer '+token
      },
    }
  ).then((resp) => {
    // console.log('greet Requests sentasasasssssass', resp.data.data)
    setRequestSent(resp.data.data)
  })
}
}
useEffect(() => {
  // alert("Im Refreshed")
  getData()
},[])

    return (
     
<View style={{ backgroundColor: "#f2f2f2", height: "100%" }}>
    
    {

        token != null?
        <View style={{ flexDirection: "column"}}>
        <View>
          <Text
            style={{
              fontWeight: "500",
              margin: 20,
              marginBottom: 5,
              fontSize: 16,
            }}
          >
            {I18n.t("Requests Received")}
          </Text>

          {/* <Text onPress={()=>getData()}>Refresh</Text> */}
         
        </View>

        <View
          style={{ 
            backgroundColor: "#f2f2f2",
            margin: 15,
            marginTop: 0,
            borderRadius: 10,
            justifyContent:'center'
          }}
        >

          <View 
          // style={{ flexDirection: "row" }}
          >

{
  requestReceived.filter((eachRequ)=>{return eachRequ.greetRequest.length>0}).length>0?
<>
<Text
           style={{
             fontWeight:'200',
            marginLeft: 20,
            marginBottom: 5,
            fontSize: 12,
          }}
          >{I18n.t("List of your Spaarks for which you recieved requests")} </Text>
             <FlatList
             data={requestReceived}
             renderItem={({ item, i }) => (
               <>
               {
                 item.greetRequest.filter((eachRequest)=>{return eachRequest.status == "Pending"}).length>0?
                 <>
                 <View style={{flexDirection:'row',  backgroundColor: "#ffffff" }}>
                 <View style={{ margin: 10}}>
               <Image
                 source={{uri:item.uservisibility.profilePic}}
                 style={{
                   height: 80,
                   width: 80,
                   marginLeft: 0,
                   borderRadius: 10,
                 }}
               ></Image>
             </View>
             <TouchableOpacity onPress={()=>
                  navigation.navigate("PostSpecificScreenGreet", {
                   post: item,
                   request:item.greetRequest[0],
                   received:true
                 })
         }>
         <View style={{ flex: 1, paddingTop: 10 }}>
           <Text style={{ color: "#000" }}>{item.uservisibility.name}<Text style={{fontSize:10,color:'#7B8794'}}>{" "}{moment(item.createdAt).format('L')}</Text></Text>
           <View>
             {
             item.content?
           <Text>
             {item.content}
           </Text>:
           <Text style={{fontSize:12,color:'#7B8794', left: 5,top:5}}>
             {I18n.t("No content")}
           </Text>
           }

                   <Image source={require('../assets/rightarrow.png')} style={{ height:25, width: 25, marginLeft: 210}}></Image>
                 </View>
               </View>
               </TouchableOpacity>
               </View> 
               <View
               style={{
                 marginTop: 5,
                 marginLeft: 8,
                 marginRight: 8,
                 borderBottomColor: "#EAEAEA",
                 borderBottomWidth: 0.2,
               }}
             />
             </>
             :<></>
               }
             
                 
              </>
   
                  )}
             />
 </>
 :

 <View style={{backgroundColor:'#f2f2f2',justifyContent:'center',alignItems:'center'}}><Text>{I18n.t("No Requests")}</Text></View>       
}

 
 {
   requestReceived.filter((eachRequ)=>{return eachRequ.greetRequest.length>0}).length>2?
 <TouchableOpacity
  onPress={() =>
    navigation.navigate("ViewAll", { viewType: "sayhii_received",title:'Requests Received',requestReceived:requestReceived.splice(2, requestReceived.length) })
  }
  style={{ backgroundColor: "#fff" }}

> 

  <Text
    style={{ textAlign: "center", fontWeight: "bold", margin: 10 }}
  >
    {I18n.t("View All")}
</Text>
</TouchableOpacity>
:
<></>
 
}
 


         
          </View>

          {/* {
  requestReceived.length>2?
  
:
<></>

          }
 */}


        </View>









        <View>
          <Text
            style={{
              fontWeight: "500",
              margin: 20,
              marginBottom: 5,
              marginTop: 0,
              fontSize: 16,
            }}
          >
            {I18n.t("Requests Sent")}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            margin: 15,
            marginTop: 0,
            borderRadius: 10,
          }}
        >
          {
            requestSent.length>0?
            <FlatList
            data={requestSent}
            renderItem={({ item, i }) => (
              <>
              <View style={{ flexDirection: "row" }}>
                
              <View style={{ margin: 10 }}>
                <Image
                  source={{uri:item.post.uservisibility.profilePic}}
                  style={{
                    height: 80,
                    width: 80,
                    marginLeft: 0,
                    borderRadius: 10,
                  }}
                ></Image>
              </View>
              <TouchableOpacity onPress={()=>
                         navigation.navigate("PostSpecificScreenGreet", {
                          post: item.post,
                          request:item,
                          received:false
                        })
                }>
              <View style={{ flex: 1, paddingTop: 10 }}>
                <Text style={{ color: "#000" }}>{item.post.uservisibility.name}{" "}<Text style={{fontSize:10,color:"#7B8794"}}>{moment(item.post.createdAt).format('L')}</Text></Text>
                {/* <Text style={{marginTop:5}}>
                  {item.post.content}
                </Text> */}
                 <View>
                  <Text style={{marginTop:5}}>
                    {item.post.content}
                  </Text>
                    <Image source={require('../assets/rightarrow.png')} style={{ height: 15, width: 15, marginLeft: 210,marginTop:0}}></Image>
                  </View>
              </View>
              </TouchableOpacity>

            </View>
                <View
                style={{
                  marginTop: 5,
                  marginLeft: 8,
                  marginRight: 8,
                  borderBottomColor: "#EAEAEA",
                  borderBottomWidth: 0.2,
                }}
              />
              </>
  
            )}
            />
            :<View style={{backgroundColor:'#f2f2f2',justifyContent:'center',alignItems:'center'}}><Text>{I18n.t("No Requests")}</Text></View>
          }
   
      
          {
            requestSent.length>2?
            <TouchableOpacity
            onPress={() =>
              navigation.navigate("ViewAll", { viewType: "sayhii_sent" })
            }
            style={{ backgroundColor: "#fff" }}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "bold", margin: 10 }}
            >
              {I18n.t("View All")}
            </Text>
          </TouchableOpacity>
          :<></>
          }
         
        </View>
      </View>
 
 
 :
 <View style={{ backgroundColor: "#fff", height: Dimensions.get('window').height  }}>
 <View>
   <View>

     <View style={{ flexDirection: "row", marginTop: 0 }}>
       <View style={{ color: "#000", flex: 13, height: 60,justifyContent:"center", alignItems:'center' , top: 30}}>
         <Image source={require('../assets/icons/login_continue.png')} style={{ height: 150, width: 150, }}></Image>
       </View>
     </View>
     <View style={{ flexDirection: "row", marginTop: 0 }}>
       <View style={{ color: "#000", flex: 13, height: 160,justifyContent:"center", alignItems:'center' }}>


         {/* line */}
         <Button
           mode="contained"
           color="#FA5805"
           style={{
             height: 40,
             width: 230,
             margin: 10,
             marginTop: 90,
            
           }}
           onPress={() => onLogin()}
         >
           {I18n.t("Login to access this feature")}
       </Button>
       </View>
     </View>
   </View>
 </View>
</View>


    }
    
 
    </View>
    );
};

const mapStatetoProps = (state) => {
  // const { }=state
  // console.log("ChatsState", state.chat_roster_main);
  return {
      chat_roster_main: state.chatss.chat_roster_main,
      chat_roster_anonymous: state.chatss.chat_roster_anonymous,
      messages: state.chatss.messages,
      chatLoading: state.chatss.chatLoading,
      token: state.chatss.token
  };
};
export default connect(mapStatetoProps)(GreetRequestsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});

