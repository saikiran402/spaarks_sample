import React, { useState , useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { View, Button, StyleSheet,TouchableOpacity,FlatList,DevSettings } from 'react-native';
import axios from "axios";
const GLOBAL = require('../Globals');
import RNLocation from 'react-native-location';
import { AuthContext } from '../components/context';
import {Text,Image} from 'react-native-elements';
import HeaderScreen from '../components/HeaderDashboard';
import chatReducers from "../reducers/chatReducers";
import { connect, useDispatch, useReducer } from "react-redux";
import I18n from '../src/i18n';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';
import { ActivityIndicator} from 'react-native-paper';
const LanguageScreen = ({navigation,route,languages}) => {



async function getLocationDatas(navigation){
  if(route.params.onboarded){
    await RNLocation.configure({
      distanceFilter: 5.0
    })
    await RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    }).then(async(granted) => {
        if (granted) {

          dispatch({type:"SETISLOADING",loading:true})
          this.locationSubscription = RNLocation.subscribeToLocationUpdates(async locations => {
            // await AsyncStorage.setItem('language',String(language))
            // setLocation(JSON.stringify(locations))
            await AsyncStorage.setItem('isLocationPermitted', String(true));
            await AsyncStorage.setItem('latitude', String(locations[0].latitude));
            await AsyncStorage.setItem('longitude', String(locations[0].longitude));
            await AsyncStorage.setItem('fromMockProvider', String(locations[0].fromMockProvider));
            dispatch({type:"SETISLOADING",loading:false})
            onBoarded([],'en')
          })
        }else{
          alert('Not Allowed')
          await AsyncStorage.setItem('isLocationPermitted', String(false));
          // navigation.popToTop()
          navigation.navigate('SelectCityScreen',{preferences:[]})

        }
      })
  }
  // alert('locations')
 

}

const initialLoginState = {
  isLoading: false
};

const loginReducer = (prevState, action) => {
  switch( action.type ) {         
      case 'SETISLOADING': 
      return {
        ...prevState,
        // isLocationGiven: action.isLocationGiven,
        isLoading: action.loading
      };
  }
};
const [locationState, dispatch] = React.useReducer(loginReducer, initialLoginState);


  const [lcode , setLcode] = useState("")
  const { onBoarded,changeLanguage } = React.useContext(AuthContext);
const Languages = [{
    name:'English',
    code:'en',
    selected:false
},
{
    name:'हिंदी',
    code:'hi',
    selected:false
},
{
  name:'తెలుగు',
  code:'te',
  selected:false
} , 
{
  name:"ଓଡିଆ",
  code:"or",
  selected:false,
}

]
async function dothisonLanguageChange(language){
  await AsyncStorage.setItem('language',String(language))
  Chatdispatcher({type:'SETLANGUAGE',language:language})

  RNRestart.Restart();
}

const Chatdispatcher = useDispatch(chatReducers);
async function submitLanguage(language){
if(language != 'or'){
  setLcode(language)

  I18n.locale = language;
    console.log(language)
    await AsyncStorage.setItem('language',language)
    // getLocationDatas(navigation)
    var jwt = await AsyncStorage.getItem('token');
    if (String(jwt) != "null") {
    console.log(`${GLOBAL.BASE_URL}user/updatelanguage`)
    
    await axios.post(
      `${GLOBAL.BASE_URL}user/updatelanguage`,
      {
       from: "ios",
       language: language
  
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
          'Bearer '+jwt
        },
      }
    ).then((resp) => {
      console.log("succesfully updated language")
     
    }).catch((err) => {
      console.log("langauge update error",err)
     
      
    })
  }

    if(route.params.onboarded){
      navigation.navigate('LocationInformationScreen',{onboarded:route.params.onboarded})
      // getLocationDatas(navigation,language)

    }else{
      dothisonLanguageChange(language)
    }

  }else{
    alert('Currently not available')
  }
    // :changeLanguage()

    // navigation.navigate('SelectCityScreen',{preferences:preferencesss})

}


useEffect( async () => {
 
  var currlan = await AsyncStorage.getItem("language")
  console.log("laaaaaagggggggggggggg",currlan);
  setLcode(currlan)
},[])

if( locationState.isLoading) {
  return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size="large"/>
      <Text style={{margin:10}}>Getting Location for Better Experience...</Text>
    </View>
  );
}else{

  return (
    <SafeAreaView>
  <View >
    {
      route.params.onboarded?
  
<View style={{color:'#000',flex:0, flexDirection:'row'}}>
<Image source={require("../assets/icons/blueback.png")}
                            style={{ height: 28, width: 28, top: 13}}

/>

<Text style={{ color: "#6FA4E9", fontSize: 30,marginTop:10, left: 120 ,textAlign:"center"}}>
        Spaarks
      </Text>
</View>
:
<></>
    }
      <View style={styles.container}>
   

<View style={{marginTop:20}}>

</View>
<Text style={{fontWeight:'bold',padding:10,textAlign:'center',fontSize:15}}>Choose a language to continue</Text>
      <FlatList
    data={Languages}
    renderItem={({ item, index, separators }) => (
        <View style={{margin:10}}>
        <TouchableOpacity onPress={() => submitLanguage(item.code)
  }>
<View style={{flexDirection:'row',backgroundColor:"#fff",borderRadius:5}}>
<View style={{flex:5,paddingTop:10,height:50,justifyContent:'center',alignItems:'center'}}>
  {/* {
      (lcode === item.code)?
<Image source={require('../assets/icons/clicked.png')}  style={{height:25,width:25, marginLeft:350}}></Image>
:<></>
  } */}
{
  item.code == 'or'?
  <>

  <Text h4 style={{fontWeight:'700',position:'absolute',left:150,color:'#D7D7D7'}}>{item.name}</Text>
  <Text style={{textAlign:"center",position:'absolute',left:210,color:'#D7D7D7'}}>( Comming Soon )</Text>

  </>
:
<Text h4 style={{fontWeight:'700',textAlign:"center",position:'absolute',left:150,}}>{item.name}</Text>
}

</View>

</View>
</TouchableOpacity>
</View>
    )}
    keyExtractor={(item) => item.id}
  />



{/* <TouchableOpacity onPress={() => submitLanguage('hi')
  }>
<View style={{flexDirection:'row',marginTop:20,backgroundColor:"#fff"}}>
 <View style={{flex:2,color:"#000"}}>
 <Image source={require('../assets/icons/hindi.png')} style={styles.Languagecard}></Image>
</View>
<View style={{flex:5,paddingTop:1}}>
<Text h4 style={{fontWeight:'700'}}>Hindi</Text>
<Text h5 style={{color:'blue'}}>Select</Text>
</View>
<View style={{flex:1,color:"#000"}}>
 <Image source={require('../assets/icons/nextIcon.png')} style={styles.nextImage}></Image>
</View>
</View>
</TouchableOpacity>
*/}




      </View>
   
  </View>
 
 
 
  </SafeAreaView>
);
}

   
};


const mapStatetoProps = (state) => {
  // const { }=state
  return {
    language: state.chatss.language
    
  };
};

// exports.finalXMPP = finalXMPP;
export default connect(mapStatetoProps)(LanguageScreen);

const styles = StyleSheet.create({
  container: {

height:'100%',

backgroundColor:"#f2f2f2"

  },
  cards:{
      margin:20,
      height:40,
      marginTop:20

  },
  Languagecard:{
      paddingLeft:50,
      height:60,
      width:60
  },
  nextImage:{
    height:40,
    width:40
  }
});
