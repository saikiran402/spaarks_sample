import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet,Image,TouchableOpacity,ImageBackground,Alert,ScrollView } from 'react-native';
import { TabRouter } from 'react-navigation';
import moment from 'moment'
import { Rating, AirbnbRating, Divider } from "react-native-elements";
import Dialog from "react-native-dialog";
import JsSIP from 'jssip'
import uuid from 'react-native-uuid';
import RNCallKeep from 'react-native-callkeep';
import VoipPushNotification from 'react-native-voip-push-notification';
import {hangupCall,hangupCallIncomingCall} from './OutGoingCallScreen'
import I18n from "i18n-js";
import { Dimensions } from "react-native";
const IncomingCallScreen = ({navigation,route}) => {




async function hangUpByMe(){
        // if(route.params.gsession){
        //     route.params.gsession.terminate(
        //       {
        //         'status_code'   : 486,
        //         'reason_phrase' : 'Busy Here'
        //       }); 
        //   }
    
    navigation.popToTop()
    hangupCallIncomingCall(route.params.gsession)
    clearInterval(tim)
    setStatus(0)
//   setVisible(true);
}

    const [show, setShow] = useState(1);

    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState(1);
    var [dt, setDt] = useState(0);
    var [tim, settim] = useState(0);

    useEffect(()=>{
        setStatus(2)
        let secTimer = setInterval( () => {
            // var [dt, setDt] = useState(0);
            setDt(dt++)
            setShow(0)
        },1000)
        settim(secTimer)
        return () => clearInterval(secTimer);
    },[])



    const [isMuted,setIsMuted] = useState(true)
    const muteCall = () =>{
      if(isMuted){
       setIsMuted(false)
       global.session.mute({audio:true,video:false})
      }else{
       setIsMuted(true)
       global.session.unmute({audio:true,video:false})
      }
     //  alert('Not Implemented yet')
   
     // playSound()
     // muteCall? setMute(false):setMute(true)
     // RNCallKeep.setMutedCall(currentCallId, true)
     RNCallKeep.setMutedCall('11edc52b-2918-4d71-9058-f7285e29d894', true);
     // RNCallKeep.setMutedCall('UUID', true);
   
     // RNCallKeep.setOnHold('11edc52b-2918-4d71-9058-f7285e29d894', true)
     // RNCallKeep.setMutedCall(uuid, true);
   }


   const speakerCall = () =>{
   alert('Coming Soon')
 }


   




    function convertTime(sec) {
        var hours = Math.floor(sec/3600);
        (hours >= 1) ? sec = sec - (hours*3600) : hours = '00';
        var min = Math.floor(sec/60);
        (min >= 1) ? sec = sec - (min*60) : min = '00';
        (sec < 1) ? sec='00' : void 0;
    
        (min.toString().length == 1) ? min = '0'+min : void 0;    
        (sec.toString().length == 1) ? sec = '0'+sec : void 0;    
        if(hours == '00'){
            return min+':'+sec;
        }else{
            return hours+':'+min+':'+sec;
        }
        
    }


    async function handleCancel (){
        setVisible(false);
        navigation.popToTop()
      };
    
      async function handleSubmitRating(){
          // The user has pressed the "Delete" button, so here you can do your own logic.
          // ...Your logic
          setVisible(false);
          navigation.popToTop()
        };
    return (
        <ScrollView>


        <View>

        <Dialog.Container visible={visible}>
                <Dialog.Title>{I18n.t("Please rate your call Experience")}</Dialog.Title>
                <Dialog.Description>
                    <Text>{I18n.t("This helps us serve you better")}</Text>
                </Dialog.Description>
                <Dialog.Description>
            <Ratings/>
                </Dialog.Description>
                <Dialog.Button label="Later" onPress={()=>handleCancel()} />
        <Dialog.Button label="Submit" onPress={()=>handleSubmitRating()} />
              </Dialog.Container>
        
        
              {
                  show?<Text style={{textAlign:'center',marginTop:10,fontWeight:'200'}}>{status?'Connecting':'Connected'}</Text>:
                  <Text style={{textAlign:'center',marginTop:10,fontWeight:'200'}}>{status?'Connected':'Call Ended'}</Text>
              }
              
        
        
        
                             <ImageBackground source={{uri:'https://res.cloudinary.com/djejqfi6y/image/upload/v1619806483/ripples_q8stui.gif'}} style={{
            height:300,width:350,marginLeft:25}}>
                             <Image source={{uri:route.params.profilePic}} style={{height:100,width:100,borderRadius:80,marginLeft:125,marginTop:100}}></Image>
                             </ImageBackground>
                                                  <Text style={{textAlign:'center',marginTop:0,fontWeight:'bold',fontSize:30}}>{route.params.name}</Text>
                             <Text style={{textAlign:'center',fontWeight:'200',marginTop:20,fontSize:20}}>
                                 
                                 {
                                //  dt>60?
                                //  <View style={{flexDirection:'row'}}>
                                //  <Text>{dt/60}</Text><Text>{dt}</Text>
                                //  </View>:
                                 <Text>{convertTime(dt)}</Text>
                              
                             }</Text>
                             <View
          style={{
            borderBottomColor: '#C7C7CD',
            borderBottomWidth: 1,
            margin:30
          }}
        />
        <View style={{flexDirection:'row'}}>
        <View style={{flex:1}}>
            </View>
        <View style={{flex:1}}>
        <TouchableOpacity onPress={()=>{muteCall()}}>
  {
    !isMuted?
    <Image source={require('../assets/unmute.png')} style={{height:60,width:60}}></Image>
    :
    <Image source={require('../assets/mute.png')} style={{height:60,width:60}}></Image>
  }
<Text style={{color:'#908F9D',marginTop:10,marginLeft:10}}>Mute</Text>

</TouchableOpacity>
        </View>
        <View style={{flex:1}}>
            </View>
            <View style={{flex:1}}>
            <TouchableOpacity onPress={()=>{speakerCall()}}>
            <Image source={require('../assets/speaker.png')} style={{height:60,width:60}}></Image>
<Text style={{color:'#908F9D',marginTop:10,marginLeft:10}}>Speaker</Text>

</TouchableOpacity>
            </View>
            <View style={{flex:1}}>
            </View>
        
            </View>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>hangUpByMe()}>
                <View style={{flex:1,justifyContent:'center',textAlign:'center'}}>
            <Image source={require('../assets/call-btn-1.png')}  style={{top:30,left:Dimensions.get('window').width/2-40,position:'absolute'}}/>
                </View>		
                </TouchableOpacity>
                </View>		
        
        
                             </View>
                             </ScrollView>             
    );
};


const Ratings =  () =>{
    return(
        <View style={{textAlign:'center',justifyContent:'center',marginLeft:60}}>
<AirbnbRating
  count={5}
  reviews={["Terrible", "Bad","OK", "Good","Very Good",]}
  defaultRating={5}
  size={30}
/>
</View>
    )
}


export default IncomingCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
