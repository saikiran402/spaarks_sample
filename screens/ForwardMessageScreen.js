import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { View, Text, Button, StyleSheet,TouchableOpacity,Image,FlatList } from 'react-native';
import chatReducers from "../reducers/chatReducers";
import { connect, useDispatch, useReducer } from "react-redux";
var colors = ["#4E5567", "#6CB28E", "#FA6E5A"];
import moment from "moment";
import { ScrollView,Dimensions } from 'react-native';
import I18n from 'i18n-js';
import { sendMessage } from './xmpp';
import { CONSTANTS } from 'react-native-callkeep';
const ForwardMessageScreen = ({navigation,route,chat_roster_main}) => {
  // var selected = [];
  const [selected,setSelected] = useState(null);
  const [finalMain,setFinalMain] = useState(0);
  const [finall,setFinall] = useState([]);
  const [mains,setMains] = useState([])

  async function setMain(){
    console.log('------>>>><<<<<<',route.params.pressed_message)
    var mainss = [];
    var i=0;
    chat_roster_main.forEach(list=>{
      var newList = {
          name:list.name,
          profilePic:list.profilePic,
          messageId:i,
          selected:'0',
          jid:list.jid
      };
      mainss.push(newList)
      i++;
    })
    setMains(mainss)
  }

  useEffect(()=>{
      setMain()
  },[])

  async function setForwardSelected(i){
    console.log(i)
    // console.log('in',i)
    // var newSele = selected
    // var newSelec;
    // if(selected.includes(i)){
    //  newSelec = newSele.filter(function(item) {
    //     return item !== i
    // })
    // setSelected(newSelec)
    // setMains(main)
    // console.log(newSelec)
    // }else{
    //   var newS = selected;
    //   newS.push(i)
    //   console.log(newS)
    //   setSelected(newS)
    //   setMains(main)
    // }
if(mains[i].selected == '1'){
  setSelected(i)
  mains[i].selected = '0';
  setMains(mains)
  var finalMain = await mains.filter((item)=>{
    return item.selected == '1';
  })
  setFinalMain(finalMain.length)
  setFinall(finalMain)
}else{
  setSelected(i)
  mains[i].selected = '1';
  setMains(mains)
  var finalMain = await mains.filter((item)=>{
    return item.selected == '1';
  })
  setFinalMain(finalMain.length)
  setFinall(finalMain)
}
  }
  const dispatch = useDispatch(chatReducers);

  async function sendMessages(navigation){
    finall.forEach(list=>{
      chat_roster_mains = chat_roster_main.filter(
        (item) => item.jid !== list.jid
      );
      var unique = Date.now()*1000;
      var this_chat = chat_roster_main.find((item) => item.jid == list.jid);
      var unique = Date.now()*1000;
      console.log('-----------q',this_chat)
      if(route.params.pressed_message.messageType == 'image'){
        this_chat.messages.splice(0, 0, {
          content: route.params.pressed_message.content,
          image: route.params.pressed_message.content,
          messageType:route.params.pressed_message.messageType,
          messageId:unique,
          createdAt: Date.now(),
          _id: Date.now(),
          unique: unique,
          type: "chat",
          user: {
            _id: 2,
          },
        });
        this_chat.updatedAt = Date.now();
        this_chat.message = 'IMAGE';
      }
      if(route.params.pressed_message.messageType == 'chat'){
        this_chat.messages.splice(0, 0, {
          content: route.params.pressed_message.content,
          text: route.params.pressed_message.content,
          messageType:route.params.pressed_message.messageType,
          messageId:unique,
          createdAt: Date.now(),
          _id: Date.now(),
          unique: unique,
          type: "chat",
          user: {
            _id: 2,
          },
        });
        this_chat.updatedAt = Date.now();
        this_chat.message = route.params.pressed_message.content;
      }
      if(route.params.pressed_message.messageType == 'video'){
        this_chat.messages.splice(0, 0, {
          content: route.params.pressed_message.content,
          video: route.params.pressed_message.content,
          messageType:route.params.pressed_message.messageType,
          messageId:unique,
          createdAt: Date.now(),
          _id: Date.now(),
          unique: unique,
          type: "chat",
          user: {
            _id: 2,
          },
        });
        this_chat.updatedAt = Date.now();
        this_chat.message = 'VIDEO';
      }
      if(route.params.pressed_message.messageType == 'file'){
        this_chat.messages.splice(0, 0, {
          content: route.params.pressed_message.content,
          document: route.params.pressed_message.content,
          text: route.params.pressed_message.content,
          messageType:route.params.pressed_message.messageType,
          messageId:unique,
          createdAt: Date.now(),
          _id: Date.now(),
          unique: unique,
          type: "chat",
          user: {
            _id: 2,
          },
        });
        this_chat.updatedAt = Date.now();
        this_chat.message = 'DOCUMENT';
      }

    
      chat_roster_mains.splice(0, 0, this_chat);
      dispatch({
        type: "SETMYMESSAGEMAIN",
        chat_roster_main: chat_roster_mains,
      });
      const message = [{
        type: route.params.pressed_message.messageType,
        content: route.params.pressed_message.content,
        unique: unique
      }];
      console.log("In asd");
      sendMessage(message, list.jid);
    })
    
    console.log(finalMain)
    console.log(route.params.pressed_message.content)
    if(finall.length == 1){
      navigation.navigate("ChatSpecificScreen", {
        name: finall[0].name,
        profilePic: finall[0].profilePic,
        jid: finall[0].jid,
      });
    }else{
      navigation.goBack()
    }

  }

    return (
        <SafeAreaView>
            <View style={{ flex: 1, backgroundColor:finalMain == 0?'#f2f2f2':'#6FA4E9',width:'100%',zIndex:1,top:610}}>
    <View style={{ position: 'absolute', left: 0, right: 0, backgroundColor: finalMain == 0?'#CBD1DE':'#6FA4E9', width: '100%' }}>
        <View style={{ flexDirection: 'row' }}>
         
            <View style={{ flexDirection: 'column',justifyContent:'center',textAlign:'center' }}>
              {
                finalMain == 0?
                <Text style={{color:'#fff',textAlign:'center',marginLeft:150,fontWeight:'bold',fontSize:18}} onPress={()=>alert(I18n.t('Please select receipients to forward'))}>Forward({finalMain})</Text>
                :
                <Text style={{color:'#fff',textAlign:'center',marginLeft:150,fontWeight:'bold',fontSize:18}} onPress={()=>sendMessages(navigation)}>Forward({finalMain})</Text>
              }
                
            </View>
      
            <View style={{borderRadius:20,flex:5,height:20,margin:20,width:10,marginLeft:190}}>

            </View>
         
        </View>
    </View>
</View>
<ScrollView>


    <View>
        {/* <View>
            <Text style={{fontWeight:'bold',padding:20,fontSize:20}}>Forward Message</Text>
        </View> */}
        {/* <View>
            <Text style={{fontWeight:'bold',padding:15,fontSize:12,color:'#9A9A9A'}}>You chatted with these users using your name visible to them</Text>
        </View> */}
      

        <View style={{backgroundColor:'#f2f2f2',marginBottom:50}}>
            {/* {chat_roster_main.map((l, i) => ( */}
                                <FlatList
                                data={mains}
                                keyExtractor={(item) => item.messageId}
                                renderItem={({ item,index }) => (
             
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor:'#fff',
                  borderRadius: 10,
                  margin: 10,
                }}
              >
                <View style={{ flex: 10, padding: 5 }}>

                  <Image
                    source={{ uri: item.profilePic }}
                    style={{ height: 80, width: 80, borderRadius: 30 }}
                  ></Image>
            
                  {/* <View
                    style={{
                      position: "absolute",
                      top: 70,
                      backgroundColor: colors[Math.random() < 0.5 ? 1 : 2],
                      left: 15,
                      borderRadius: 20,
                    }}
                  >
                    <Text style={{ color: "#fff", padding: 5, fontSize: 10 }}>
                      {String(item.connection)}
                    </Text>
                  </View> */}
                </View>

                <View style={{ flex: 30 }}>
                  <TouchableOpacity
                    onPress={() =>
                      setForwardSelected(index)
                    }
                  >
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
                    
                    </View>
          {
                      item.selected == '1'?
                      <View>
                          <Image source={require('../assets/selected_forward.png')} style={{height:30,width:30,marginLeft:200}}></Image>
                      </View>:
                        <View>
                        <Image source={require('../assets/unselected_forward.png')} style={{height:30,width:30,marginLeft:200}}></Image>
                    </View>
          }
                  
                  </TouchableOpacity>
                </View>

              </View>


            )}/>

            {/* <View style={{padding:10,backgroundColor:'#6FA4E9',margin:0,position:'absolute',top:'65%',zIndex:1,width:Dimensions.get('window').width}}>
              <Text style={{color:'#fff',textAlign:'center',justifyContent:'center'}}>Forward</Text>
            </View> */}

          </View>
          












    </View>

    </ScrollView>
          
    
    </SafeAreaView>
    );
};



const mapStatetoProps = (state) => {
  // const { }=state
  
  return {
    chat_roster_main: state.chatss.chat_roster_main
  };
};
export default connect(mapStatetoProps)(ForwardMessageScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
