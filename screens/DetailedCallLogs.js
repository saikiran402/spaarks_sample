import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import React, { useEffect,useRef } from 'react';
import { View, Text, StyleSheet,Dimensions,TouchableOpacity,Image,Alert,LogBox,ScrollView,RefreshControl,FlatList } from 'react-native';
const GLOBAL = require('../Globals');
import RBSheet from "react-native-raw-bottom-sheet";
import I18n from '../src/i18n';
import moment from 'moment'
LogBox.ignoreAllLogs();
import {
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
  TextInput,
} from "react-native-paper";
const DetailedCallLogs = ({navigation,route }) => {

    const refe = React.useRef(null);
    const [isLoading, setLoading] = React.useState(true);
    const [callLogs, setCallLogs] = React.useState([]);
  
  
    const [canpos, setCanPost] = React.useState(false);
    const [grouped,setGrouped] = React.useState({})
    const Login = useRef();

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

  const isToday = (currentDates) =>{
    const today = new Date()
    const currentDate = new Date(currentDates)
  
    console.log('DAAAAAA',currentDate.getDate() == today.getDate() &&
    currentDate.getMonth() == today.getMonth() &&
    currentDate.getFullYear() == today.getFullYear())
    
    if(currentDate.getDate() == today.getDate() &&
    currentDate.getMonth() == today.getMonth() &&
    currentDate.getFullYear() == today.getFullYear()){
      return true;
    }else{
      return false;
    }
  
  }
  
  const isYesterday = (currentDates) =>{
    const today = new Date()
    const lastMessageData = new Date(currentDates)
  
    console.log('DAAAAAA',lastMessageData.getDate() == today.getDate()-1 &&
    lastMessageData.getMonth() == today.getMonth() &&
    lastMessageData.getFullYear() == today.getFullYear())
    
    if(lastMessageData.getDate() == today.getDate()-1 &&
    lastMessageData.getMonth() == today.getMonth() &&
    lastMessageData.getFullYear() == today.getFullYear()){
      return true;
    }else{
      return false;
    }
  
  }
async function confirmCall(call){
    // alert('Calling')
    var jwt = await AsyncStorage.getItem('token')
    await axios.post(GLOBAL.BASE_URL+`user/addtologs/logs/${call.aid}/${call.uid._id}`,{
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
        // alert('Success')
      console.log(resp.data);
      // getData()
      navigation.navigate('OutGoingCallScreen',{aid:call.aid,name:call.name,profilePic:call.profilePic})
    }).catch((err)=>{
        console.log(err)
        alert('You cannot call this user at this moment')
    })
  
  }
  
  const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };
    async function getData(){
        var token = await AsyncStorage.getItem("token");
  await axios.get(
      `${GLOBAL.BASE_URL}user/mylogs/${route.params.aid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
          'Bearer '+token
        },
      }
    ).then((resp) => {
      console.log('Call Logs', resp.data)
    //   console.log('UNIQUECALLSsss', groupBy(resp.data, 'aid'))

    //   setGrouped(groupBy(resp.data, 'aid'))
      setCallLogs(resp.data)
    })

    }
    useEffect(()=>{
        getData()
    },[])


    const onRefresh = React.useCallback(async () => {
        // setRefreshing(true);
      
        // console.log("In in Effect")
        // getRoster()
        // setXMPP()
        // getRoster()
        // connectXMPP()
      
        getData()
      }, []);
      
      const [refreshing, setRefreshing] = React.useState(false);
    return (
        <>
        
                   
                        
                    <ScrollView 
                      refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                      }
                      ref={refe}
                    >
    
                    <RBSheet
                                            ref={Login}
                                            closeOnDragDown={true}
                                            closeOnPressMask={true}
                                            height={380}
                                            borderRadius={0}
                                            closeDuration={100}
                                            customStyles={{
                                              draggableIcon: {
                                                backgroundColor: "#000",
                                              },
                                              container: {
                                                borderRadius: 0,
                                              },
                                            }}
                                          >
                                            <View style={{ backgroundColor: "#fff", height: 200 }}>
                                              <View>
                                                <View>
                                                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                                                    <View style={{ color: "#000", flex: 13, height: 60 }}>
                                                      <Text
                                                        style={{
                                                          color: "#000",
                                                          fontSize: 16,
                                                          margin: 0,
                                                          fontWeight: "bold",
                                                          paddingLeft: 0,
                                                          textAlign: "center",
                                                        }}
                                                      >
                                                        {I18n.t("Login to access this feature")}
                                                    </Text>
    
                                                      <View
                                                        style={{
                                                          marginTop: 10,
                                                          marginLeft: 10,
                                                          marginRight: 10,
                                                          borderBottomColor: "#D7D7D7",
                                                          borderBottomWidth: 1,
                                                        }}
                                                      />
                                                    </View>
                                                  </View>
                                                  <View style={{ flexDirection: "row", marginTop: 0 }}>
                                                    <View style={{ color: "#000", flex: 13, height: 60,justifyContent:"center", alignItems:'center', top: 30 }}>
                                                      {/* <Text
                                                      style={{
                                                        color: "#A1A4B2",
                                                        fontSize: 14,
                                                        flex: 70,
                                                        paddingLeft: 10,
                                                      }}
                                                    >
                                                      We will send you an{" "}
                                                      <Text style={{ color: "#7E818F", fontWeight: "bold" }}>
                                                        One Time Password
                                                      </Text>{" "}
                                                      on this mobile number.
                                                    </Text> */}
                                                      <Image source={require('../assets/icons/login_continue.png')} style={{ height: 150, width: 150 }}></Image>
    
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
    
    
                                          </RBSheet>
                        <View style={{ backgroundColor: "#f2f2f2", height: Dimensions.get('window').height }}>
                        {
                            token != null?
                            callLogs.length == 0?
                            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center",  }}>
                          <Image
                            source={require("../assets/icons/calls_screen.png")}
                            style={{ height: 80, width: 80, position:'absolute',top:(Dimensions.get('window').height/2)-190 }}
                          ></Image>
                          <Text style={{ color: "#ACB2BE", fontSize: 20, textAlign: "center",position:'absolute',top:(Dimensions.get('window').height/2)-100 }}>
                            {I18n.t("You_haven't_made_any_calls_yet")}
                          </Text>
                          </View>
                          :
                          <View>

                            <FlatList ref={refe}
                    //   data={[...new Map(callLogs.map(item =>
                    //     [item['aid'], item])).values()]}
                      data={callLogs}
                      renderItem={({ item }) => (
               
               <>
          
                   <>
                   {
                     item.name != "" ?
                     <TouchableOpacity
                     onPress={() =>{MakeCall(item)}
                   }
                   >
                   <View
                               style={{
                                 flexDirection: "row",
                                 backgroundColor: "#fff",
                                 borderRadius: 10,
                                 margin: 5,
                               }}
                             >
                               <View style={{ flex: 10, padding: 5 }}>

                                 <Image
                                   source={{ uri: item.profilePic }}
                                   style={{ height: 80, width: 80, borderRadius: 30 }}
                                   cache="force-cache"
                                 ></Image>
                               </View>

                               <View style={{ flex: 30 }}>
                                
                                   <View style={{ flexDirection: "column",padding:8,paddingTop:0 }}>
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
                                     <TouchableOpacity onPress={()=>navigation.navigate('DetailedCallLogs',{title:item.uid.name+"'s call Logs"})}> 
                                     <Text
                                       style={{ color: "#848484", margin: 0, marginLeft: 10 }}
                                     >
                                       
                                         <>
                                           <Text>{I18n.t(item.status)}</Text>
                                           {/* <Text>Click to see logs</Text> */}
                                           
                                           {/* <Text style={{marginTop:10}}>{" "}x ({grouped[item.aid].length})</Text> */}
                                         </>
                                 
                                     </Text>
                                     </TouchableOpacity>
                                   </View>
                         
                               </View>

                               <View style={{ flex: 8,flexDirection:'column' }}>
                                 <View>
                                 <Text
                                   style={{
                                     marginTop: 20,
                                     marginRight: 5,
                                     fontSize: 12,
                                     color: "#848484",
                                   }}
                                 >
                             
                                     {/* {moment(item.createdAt).format("LT")} */}
                                     {
 isToday(item.createdAt)?
 moment(item.createdAt).locale("en").format('LT')
 :isYesterday(item.createdAt)?
 <>
 {
   <Text>
{
  I18n.t("Yesterday")
}{
  moment(item.createdAt).format('LT')
}
   </Text>

 }

</>
 :<>{moment(item.createdAt).locale("en").format('DD/M/YY')}</>

                       }

                                 </Text>
                                 </View>
                                 <View>
                                   {
                                     item.status == 'Incoming'?
                                     <View style={{flexDirection:'row'}}>
                                     <Image source={require('../assets/incoming.png')} style={{height:30,width:30}}></Image>
                                    
                                     </View>
                                     
                                     :<View style={{flexDirection:'row'}}><Image source={require('../assets/outgoing.png')} style={{height:30,width:30}}></Image>
                                     {/* <Text style={{marginTop:10}}>({grouped[item.aid].length})</Text> */}
                                     </View>
                                   }
                                   </View>
                           
                                 
                               </View>
                             </View>
                             </TouchableOpacity>
                   :<></>}
                   </>
                  
               
         </>



                      )}/>
                      
                          
                        
                            </View>
                          
    
                            :
    
                        <View style={{ backgroundColor: "#fff", height: Dimensions.get('window').height }}>
                                              <View>
                                                <View>
    
                                                  <View style={{ flexDirection: "row", marginTop: 0 }}>
                                                    <View style={{ color: "#000", flex: 13, height: 60 ,justifyContent:"center", alignItems:'center', top: 30}}>
                                                      <Image source={require('../assets/icons/login_continue.png')} style={{ height: 150, width: 150 }}></Image>
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
                      
    
                        </ScrollView>
                    
        </>
     
     )
};

export default DetailedCallLogs;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
