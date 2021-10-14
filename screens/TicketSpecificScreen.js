import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat,Composer } from 'react-native-gifted-chat'
import { View, Text, Button, StyleSheet,ScrollView,Image } from 'react-native';
import axios from 'axios'
const GLOBAL = require('../Globals');
import { connect, useDispatch, useReducer } from "react-redux";
import { TouchableOpacity } from 'react-native';
import I18n from '../src/i18n';
const TicketSpecificScreen = ({navigation,route,token}) => {
    const [messagesss, setMessages] = useState([]);
    const inititalStates = {
      messages: [],
      showItems: true,
      messages_chat:[]
    };
  
    function renderComposer(props) {
      return (
  
        route.params.ticket.status == 'Open'?
            <Composer {...props} placeholder={I18n.t("Type Your Message Here")}></Composer>
            :
            <><View style={{justifyContent:'center',alignContent:'center',textAlign:'center'}}><Text style={{textAlign:'center',justifyContent:'center',padding:5}}>{I18n.t("You can no longer reply to this thread if you have any queries please raise another Ticket")}</Text></View></>
  
  
      );
    }

    const TicketSpecificReducer = (prevState, action) => {
      switch (action.type) {
        case "SETVISIBILITY":
          return {
            ...prevState,
            showItems: action.showItems,
          };
  
        case "UPDATEMESSAGES":
            return {
              ...prevState,
              messages_chat: action.messages_chat,
            };
        case "UPDATEINPUT":
              return {
                ...prevState,
                exit:action.exit,
                exitMe:action.exitMe,
                block:action.block
              };            
      }
    };
  
    const [TicketState, dispatcher] = React.useReducer(
      TicketSpecificReducer,
      inititalStates
    );
    async function getTickedThread(){
      await axios.get(GLOBAL.BASE_URL+'ticket/getticket/'+route.params.ticket.ticketId,{
        headers: {
          "Content-Type": "application/json",
          Authorization:
          token
        }
      }).then((resp)=>{
        console.log("ticketspecific",resp.data.thread[0].photo)
        var messagesPrevious = []
       
        resp.data.thread.forEach(list=>{
            if(list.isUser){
              if(list.content.includes('assigned to the TCK')){
                var a = {
                  _id: 1,
                  text: list.content,
                  createdAt: new Date(),
                  system:true,
                  user: {
                    _id: 1,
                    name: 'Team Spaarks',
                    avatar: 'https://www.pngitem.com/pimgs/m/521-5213418_vector-free-download-svg-support-sales-support-icon.png',
                  },
                };
              }else{
                var a = {
                  _id: 1,
                  text: list.content,
                  createdAt: new Date(),
                  user: {
                    _id: 1,
                    name: 'Team Spaarks',
                    avatar: 'https://www.pngitem.com/pimgs/m/521-5213418_vector-free-download-svg-support-sales-support-icon.png',
                  },
                };
              }
                
            }else{
              if(list.content.includes('closed')){
                var a = {
                  _id: 1,
                  text: list.content,
                  createdAt: new Date(),
                  system: true,
                  user: {
                    _id: 2,
                    name: 'Team Spaarks',
                    avatar: 'https://www.pngitem.com/pimgs/m/521-5213418_vector-free-download-svg-support-sales-support-icon.png',
                  },
                };
              }else  if(list.content.includes('assigned to the TCK')){

                var a = {
                  _id: 1,
                  text: list.content,
                  createdAt: new Date(),
                  system: true,
                  user: {
                    _id: 2,
                    name: 'Team Spaarks',
                    avatar: 'https://www.pngitem.com/pimgs/m/521-5213418_vector-free-download-svg-support-sales-support-icon.png',
                  },
                };
              }else{
                var a = {
                  _id: 1,
                  text: list.content,
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'Team Spaarks',
                    avatar: 'https://www.pngitem.com/pimgs/m/521-5213418_vector-free-download-svg-support-sales-support-icon.png',
                  },
                };
              }
               
            }
           
              messagesPrevious.push(a)
 
              console.log(a);
        })
        if(resp.data.thread.length == 1){
          var b = {
            _id: 1,
            text: 'We have received your Request our concern team will get back to you shortly. Thanks Happy Spaarking !! ',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Team Spaarks',
              avatar: 'https://www.pngitem.com/pimgs/m/521-5213418_vector-free-download-svg-support-sales-support-icon.png',
            },
          }
          messagesPrevious.push(b)
        }
        dispatcher({type:'UPDATEMESSAGES',messages_chat:messagesPrevious.reverse()})
        // setMessages(messagesPrevious)
      })
    }


const renderSystemMessage = (props) =>{
  return (
    <View>


<>
<View style={{backgroundColor:'#E1E1E1',margin:15,padding:0,borderRadius:10}}>
                          <Text style={{padding:5,color:'#4C4C4C',textAlign:'center',fontSize:10}}>{props.currentMessage.text}</Text>

</View>
</>
</View>
  )

}

    const renderMessageText = (props) =>{
      return (
        <View>
          {
                      props.currentMessage.user._id == 2?

<>
<View style={{backgroundColor:'#E1E1E1',flexDirection:'row',margin:10,padding:10,borderRadius:10}}>
                                <Text style={{padding:10,color:'#4C4C4C'}}>{props.currentMessage.text} <Text style={{fontWeight:'bold'}}>Team Spaarks</Text></Text>

</View>
</>
                      :
                     
<>
<View style={{backgroundColor:'#6FA4E9',flexDirection:'row',margin:0,borderRadius:10}}>
                               
                                <Text style={{padding:10,color:'#fff'}}>{props.currentMessage.text}</Text>
</View>
</>
          }

          </View>
      )
    };

    const [imageForAttachments,setImageForAttachmenst] = useState([])

    async function setAttachments(){
      var a = []
      route.params.ticket.thread[0].photo.forEach(list=>{
        var p = {
          url:list
        };
        a.push(p)
      })
      setImageForAttachmenst(a)

    }

    useEffect(() => {
        console.log(route.params.ticket.statu)
        getTickedThread()
        setAttachments()
      
      }, [])



//       async function renderComposer(props){
//         return (
// <Composer {...props} placeholder="Type Your Message Here"></Composer>
//         );
//       }

    const onSend = useCallback((messages = []) => {
        console.log(messages)
        var a = {
            _id: Math.random(),
            text: messages[0].text,
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          }; 
   
          var aaa =TicketState.messages_chat;
          aaa.splice(0, 0, a)
        // previousMessages.append(a)
        // dispatcher({type:'UPDATEMESSAGES',messages_chat:[]})
        // dispatcher({type:'UPDATEMESSAGES',messages_chat:messagesss})
        // setMessages(messagesss)
        axios.put(`${GLOBAL.BASE_URL}ticket`,{
          content : messages[0].text,
          photo : [],
          ticketId : route.params.ticket.ticketId
        },{
          headers: {
            "Content-Type": "application/json",
            Authorization:
            token
          }
          
        }).then((res) => {
          getTickedThread()
        }).catch( err => console.log(err)   )




       
      }, [])
    return (
     <View style={styles.container}>
 <View style={{width:'100%'}}>
     <View style={{flexDirection:'row'}}>

<View style={{backgroundColor:'#fff',padding:10,width:'100%',flexDirection:'row'}}>
  <View style={{flex:1}}>
  <Text style={{fontWeight:'bold'}}>{I18n.t(route.params.ticket.subject)}</Text>
  </View>
  {imageForAttachments.length ?
  <View style={{flex:0}}>
    
  <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: imageForAttachments }) }}>
 

   
  

<Text style={{color:"#6FA4E9"}}>View attachment</Text>
</TouchableOpacity>


</View>
:<></>}

     {/* <Text style={{fontWeight:'bold',color:'#7B8794'}}>{route.params.ticket.ticketId}</Text> */}
</View>
     </View>
    
 </View>
         <GiftedChat
      messages={TicketState.messages_chat}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      style={{backgroundColor:'#f2f2f2'}}
      renderMessageText={renderMessageText}
      renderComposer={renderComposer}
      renderSystemMessage={renderSystemMessage}
      // renderComposer={renderComposer}
    />
     </View>
    
    );
};

const mapStatetoProps = (state) => {
  return {
    profilePic: state.chatss.profilePic,
    token: state.chatss.token,
    phone:state.chatss.phone,
    name:state.chatss.name
    
  };
};

export default connect(mapStatetoProps)(TicketSpecificScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:'#f2f2f2'
  },
});
