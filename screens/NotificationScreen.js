import React, { useEffect,useState } from "react";
import { View,Dimensions,RefreshControl,  StyleSheet,ScrollView, TouchableOpacity,FlatList,ActivityIndicator } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
} from "react-native-paper";
import I18n from '../src/i18n';

import { Text, Image } from "react-native-elements";
import axios from "axios";
import moment from 'moment'
const GLOBAL = require('../Globals');
import { connect, useDispatch, useReducer } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
const NotificationScreen = ({ navigation,route,token,isConnected }) => {
  const [notifications,setNotifications] = useState([])
  const [isLoading,setLoading] = useState(true)
  async function getNotifications() {
    setLoading(true)
    if(token != null){
      await axios.get(
        GLOBAL.BASE_URL+"user/getnotifications",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
            token
          },
        }
      ).then((resp)=>{
        console.log("Noto",resp.data)
        setNotifications(resp.data)
        setLoading(false)
      }).catch((err)=>{
        setLoading(false)
      })
   
    }else{
      setLoading(false)
      setNotifications([])
    }

  }
  useEffect(() => {
    getNotifications();
    return () => {};
  }, []);

  function onLogin(phone) {
    console.log("phoness", phone)
    // Login.current.close();
    navigation.navigate('VerifyOtpScreen', { phone: phone })
  }

  
  const [refreshing, setRefreshing] = React.useState(false);
async function notificationClicked(notification){
  console.log(notification)
  console.log(notification.relation)
  var Jwt = await AsyncStorage.getItem('token')
  if(notification.title.includes("Reward Added")){
    navigation.navigate('RewardsScreen')
  } 
  if(notification.relation == 'post'){
    if(notification.title=="Spaark reported and deleted"){
alert('Spaark reported and deleted')
    }else{

    
    await axios.get(GLOBAL.BASE_URL+notification.featureName+'/post/'+notification.post).then((resp)=>{
      console.log(resp.data)
      navigation.navigate("PostSpecificScreensFeed", {
        post: resp.data,
      })
    
  }).catch((err)=>{
    alert('Post Expired / Deleted')
    console.log(err)
  })
}
        // navigation.navigate("PostSpecificScreens", {
        //   post: notification.post
        // })
      
  //  await axios.get(`${GLOBAL.BASE_URL}${notification.featureName}/post/${notification.post}`,{
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization:'Bearer '+Jwt
  //   },
  //   }).then((post)=>{
    
  //     console.log("Post---------------------------",post.data)
  //     if(post.data){
  //       navigation.navigate("PostSpecificScreens", {
  //         post: post.data
  //       })
  //     }else{
  //       console.log('NTNTNTBTBT')
  //       alert(`Spaark Doesen't exists`)
  //     }
  
  //   }).catch((err)=>{
  //     console.log('ERERERERRER')
  //     console.log(err)
  //     alert(`Spaark Doesen't exists`)
  //   })
  // console.log(GLOBAL.BASE_URL+notification.featureName+'/post/'+notification.post)
  // await axios.get(GLOBAL.BASE_URL+notification.featureName+'/post/'+notification.post).then((resp)=>{
  //     // console.log(resp)
  //     navigation.navigate("PostSpecificScreensFeed", {
  //       post: resp.data,
  //       naviga:'Market'
  //     })
  // }).catch((err)=>{
  //   console.log(err)
  // })
  }
  if(notification.relation == 'greet'){
    // alert('greet')
    navigation.navigate("GreetRequestsScreen")
  }
  if(notification.relation == 'login'){
    navigation.navigate("qrcodeScreen")
  }

  if(notification.relation == 'ticket'){
    navigation.navigate("HelpScreen")
  }
  if(notification.relation == 'Partner'){
       navigation.navigate('spaarksPartnerScreen0')
       
  }


}

async function clearAllNotification(){
    await axios.get(GLOBAL.BASE_URL+'user/deleteallnotification',{
      headers: {
        "Content-Type": "application/json",
        Authorization:
        token
      },
    }
  ).then((resp)=>{
    console.log("Noto",resp.data)
    setNotifications([])

  });
}


// if(!isConnected){
//   return(
//     <View>
//       <Text>Please Check your Internet Connection</Text>
//     </View>
//   )
// }
const onRefresh = React.useCallback(async () => {
  // setRefreshing(true);

  // console.log("In in Effect")
  // getRoster()
  // setXMPP()
  // getRoster()
  // connectXMPP()

  getData()
}, []);


const lineComponent = ()=>{
  return(
    <View
    style={{
      borderBottomColor: '#F1F1F1',
      borderBottomWidth: 1,
    }}
  />
  )
}
if(isLoading){
  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <ActivityIndicator color={"#6fa4e9"} size="large"/>
  </View>
}
  if(isConnected){
    return (
      <>
{
  isLoading?
  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  <ActivityIndicator color={"#6fa4e9"} size="large"/>
</View>
:
<View>
<View style={styles.container}>
<View>
{
  notifications.length>0?
  <TouchableOpacity onPress={()=>clearAllNotification()}>
<Text style={{alignItems:'center',textAlign:'center'}}>{I18n.t("Clear all notifications")}</Text>
</TouchableOpacity>
  :<></>
}

</View>
  {
    token!=null?
    notifications.length>0?
                  <FlatList
        data={notifications}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={()=>lineComponent()}
        renderItem={({ item }) => (

  <View style={styles.cards}>

    <TouchableOpacity onPress={()=>{notificationClicked(item)}}>
    <View
      style={{
        flexDirection: "row",
        marginTop: 0,
        margin:5,
        backgroundColor: "#fff",
        borderRadius:10,
        padding:5
      }}
    >
      <View
        style={{ flex: 2, color: "#000", marginLeft: 5, padding: 0 }}
      >
        {
        item.relation == 'greet'?
        <Image
        source={require("../assets/icons/noti_greet.png")}
        style={styles.Languagecard}
      ></Image>
      :item.title.toLowerCase().includes("accepted")?
     <Text style={{fontSize:60}}>🎉</Text>:
     item.title.toLowerCase().includes("added")?
     <Text style={{fontSize:60}}>🎉</Text>
      :item.title.toLowerCase().includes("rejected")?
      <Image
        source={require("../assets/icons/rejected_noti.png")}
        style={styles.Languagecard}
      ></Image>
       :item.relation == 'ticket'?
      <Image
      source={require("../assets/noti_ticket.png")}
      style={styles.Languagecard}
    ></Image>
      : item.relation == 'login'?
    <Image
      source={require("../assets/icons/noti_web.png")}
      style={styles.Languagecard}
    ></Image>
      : item.relation == 'post'?
          <>
{
      item.title == "New Comment"?
      <Image
      source={require("../assets/icons/noti_comment.png")}
      style={styles.Languagecard}
    ></Image>
: item.title == "Spaark Reported"?
<>

<Image
source={require("../assets/icons/noti_report.png")}
style={styles.Languagecard}
></Image>
</>
:<Image
source={require("../assets/icons/noti_report.png")}
style={styles.Languagecard}
></Image>
        }
</>



      :<></>
      }
      
      </View>
      <View style={{ flex: 5, paddingTop: 1, marginTop: 5 }}>
        <Text style={{ fontWeight: "600",fontSize:18 }}>
       {I18n.t(item.title)} 
        </Text>
        <Text h5 style={{ color: "#6FA4E9",marginTop:5 }} numberOfLines={3}>
      {
        (item.content == "You have active web login" || item.content == "Regarding the Ticket you've raised" || item.content == "Your comment has been reported" ) ? <><Text style={{ color: "#6FA4E9", }}>{I18n.t(item.content)}</Text></> : <> <Text style={{ color: "#6FA4E9", }}>{item.content}</Text> </>
      }
       {/* <Text style={{ color: "#6FA4E9", }}>{(item.content)}</Text> */}
        
        </Text>
      </View>
      <View style={{ flex:2, color: "#848484", marginTop: 10 }}>
        <Text style={{fontSize:10}}>{moment(item.createdAt).fromNow()}</Text>
      </View>
    </View>

    </TouchableOpacity>

  </View>


)}
/>


:
<Text style={{textAlign:'center',justifyContent:'center'}}>{I18n.t("n")}</Text>
:<View style={{ backgroundColor: "#fff", height: Dimensions.get('window').height }}>
<View>
<View>

<View style={{ flexDirection: "row", marginTop: 0 }}>
<View style={{ color: "#000", flex: 13, height: 60,justifyContent:"center", alignItems:'center', top: 30 }}>
  <Image source={require('../assets/icons/login_continue.png')} style={{ height: 150, width: 150, }}></Image>
</View>
</View>
<View style={{ flexDirection: "row", marginTop: 0 }}>
<View style={{ color: "#000", flex: 13, height: 160 ,justifyContent:"center", alignItems:'center'}}>


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
</View>



}
     
     </>
   );
  }else{
    return(
      <ScrollView 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{flex:1,height:Dimensions.get('window').height/2,justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../assets/offline1.png')} style={{height:300,width:300}}/>
      </View>
      </ScrollView>
    )
  }

};


const mapStatetoProps = (state) => {
  return {
    profilePic: state.chatss.profilePic,
    token: state.chatss.token,
    name:state.chatss.name,
    userId:state.chatss.userId,
    token:state.chatss.token,
    isConnected:state.chatss.isConnected
    
  };
};

export default connect(mapStatetoProps)(NotificationScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  cards: {
    padding:6,
    marginBottom:0
  },
  Languagecard: {
    paddingLeft: 10,
    height: 70,
    width: 65,
  },
  nextImage: {
    height: 40,
    width: 40,
  },
});
