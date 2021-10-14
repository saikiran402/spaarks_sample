import React from 'react';
import { View, Text, Button, StyleSheet,Dimensions,FlatList,TouchableOpacity,ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';
import Snackbar from 'react-native-snackbar';
import I18n from '../src/i18n';
import { connect, useDispatch, useReducer } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
const QuestionsScreen = ({navigation,route,isConnected }) => {

  async function sendNext(qno){

    // var canp = await canPost();
  var jwt = await AsyncStorage.getItem('token')
    if(qno == 3){
          navigation.navigate('SelectCategory', { questionNo:3 , question: I18n.t('I give a Service'), excluding: [], featureName: 'market' });
    }
    if(qno == 4){
        navigation.navigate('SelectCategory', { questionNo: 4, question: I18n.t("I have Something to Sell"), featureName: 'market', excluding: [{ "categoryIndex": 4 }, { "categoryIndex": 5 }, { "categoryIndex": 8 }, { "categoryIndex": 9 }, { "categoryIndex": 11 }, { "categoryIndex": 12 }, { "categoryIndex": 14 }, { "categoryIndex": 16 }, { "categoryIndex": 17 }, { "categoryIndex": 19 }, { "categoryIndex": 20 }, { "categoryIndex": 25 }] })
    }
    if(qno == 1){
      if(isConnected){
        if(String(jwt)!="null"){
         navigation.navigate('NewInfoStepperScreen', { questionNo: 1, question: I18n.t('Announce something'), excluding: [], featureName: 'showtime', mediaP: [], mediaV: [] })
      }else{
        Login.current.open()
      }
    }else{
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }
       
    }
    if(qno == 6){
        navigation.navigate('SelectCategory', { questionNo: 6, question: 'Post a job', excluding: [{ "categoryIndex": 5 }, { "categoryIndex": 17 }, { "categoryIndex": 18 }, { "categoryIndex": 19 }, { "categoryIndex": 25 }], featureName: 'market' })
    }
    if(qno == 7){
         navigation.navigate('expertiseScreen', { questionNo: 7, question: 'I want a job', excluding: [], featureName: 'market' })
    }
  
     if(qno == 5){
        navigation.navigate('SelectCategory', { questionNo: 5, question: I18n.t('I need a Service'), excluding: [], featureName: 'market', mediaP: [], mediaV: [] })
    }
  
  
    if(qno == 2){
  if(isConnected){
    if(String(jwt)!="null"){
        navigation.navigate('newInfoStepperSayHii', { questionNo: 2, question: 'Make Friends', excluding: [], featureName: 'greet', mediaP: [], mediaV: [] })
     }else{
       Login.current.open()
     }
  
    }else{
      Snackbar.show({
        text:I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }
     
  }
  }
    return (
      <View>
                 <View style={{ marginTop: 0 }}>

<Text h6 style={{ fontWeight: 'bold' }}> {I18n.t("what_do_you_want_to_do_today")}</Text>

</View>
<FlatList
horizontal
showsHorizontalScrollIndicator={false}
data={[{image:require('../assets/que/q1.png'),name:'Announce Something',desc:'Ques_des4'},
{image:require('../assets/que/q2.png'),name:"Make Friends",desc:'Ques_des7'},
{image:require('../assets/que/q3.png'),name:'I give a Service',desc:'Ques_des1'},
{image:require('../assets/que/q4.png'),name:'I have Something to Sell',desc:'Ques_des2'},
{image:require('../assets/que/q5.png'),name:'I need a Service',desc:'Ques_des6'},
{image:require('../assets/que/q6.png'),name:'Post a Job',desc:'Ques_des3'},
{image:require('../assets/que/q7.png'),name:'I Want a Job',desc:'Ques_des5'}]}
renderItem={({ item,index }) => (
  <>
<TouchableOpacity onPress={()=>sendNext(index+1)}>
<View style={{margin:10,width:180,backgroundColor:'#fff',borderRadius:20}}>
<ImageBackground source={item.image} style={{   resizeMode: "contain",
      height: 180,
      marginTop:10,
      justifyContent: "center"}} imageStyle={{ borderRadius: 10 }}>
<View style={{width: '100%',marginTop:0,backgroundColor:'#fff',  opacity: .6, marginBottom: 0,height:50,top:67}} >
                    <Text h5 style={{ color: "#000", fontWeight:'800', padding: 2,fontSize : 13.2}}>{I18n.t(item.name)}</Text>
                    <Text h6 style={{ marginTop: 0, color: "#000", fontWeight: '500', padding: 2, marginBottom: 0,flexWrap: 'wrap',position:'absolute',top:20, textAlign: 'left',fontSize:10 }}>{I18n.t(item.desc)}</Text>
                    </View>
</ImageBackground>
</View>
</TouchableOpacity>
</>
)}
/>
        </View>
    );
};


const mapStatetoProps = (state) => {
  return {
    profilePic: state.chatss.profilePic,
    token: state.chatss.token,
    isConnected:state.chatss.isConnected
    
  };
};

export default connect(mapStatetoProps)(QuestionsScreen);

const styles = StyleSheet.create({
 

    image: {
      borderRadius: 20,
      resizeMode: "center",
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000a0"
    },
    chats: {
      height: 50,
      width: 30,
      margin: 20
    },
    eachCard: {
      padding: 10,
      backgroundColor: "#fff",
      margin: 10
    },
  
    body: {
  
    },
    BottomNav: {
      flex: 0, flexDirection: 'row',
      backgroundColor: "#63CDFF"
    },
  
    LoginComponent: {
      height: 500,
      width: 100,
      margin: 50
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#000"
    },
  
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
    tinyLogo: {
      flex: 0,
      height: 120,
      width: 120,
      margin: 20
    },
    rows1: {
      flex: 0, flexDirection: 'row',
  
    },
    image: {
      resizeMode: "center",
      height: 180,
      marginTop:10,
      justifyContent: "center"
    },
    rows2: {
      flex: 0, flexDirection: 'row'
    },
    scrollView: {
  
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      height: 1000,
      backgroundColor: '#f2f2f2'
    },
    sectionContainercol: {
      marginTop: 32,
      paddingHorizontal: 24,
      width: 200,
      height: 100
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      padding: 8,
      textAlign: 'center',
      fontSize: 24,
      fontWeight: '600',
      color: "#ffffff",
      fontWeight: '700'
    },
    sectionDescription: {
      textAlign: 'center',
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: "#ffffff",
    },
  
    sectionDescriptions: {
      textAlign: 'center',
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400'
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  
  
  
  
  
    buttonSelected: {
      opacity: 1,
      color: 'red',
    },
    customSlide: {
  
      alignItems: 'center',
      justifyContent: 'center',
    },
    customImage: {
      width: 390,
      height: 500,
      resizeMode: "cover"
    },
  
  
  

});



