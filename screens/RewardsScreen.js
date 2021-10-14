import React, { useState,useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Button, StyleSheet,FlatList,Image,ImageBackground,Dimensions} from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import ConfettiCannon from 'react-native-confetti-cannon';
import { connect, useDispatch, useReducer } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import moment from 'moment';
import ReactNativeBiometrics from 'react-native-biometrics'
import I18n from '../src/i18n';
const GLOBAL = require('../Globals');
import { BlurView } from "@react-native-community/blur";
import { ScrollView } from 'react-native';
const RewardsScreen = ({navigation,route}) => {
  const [isAuthenticated,setisAuthenticated] = useState(false)
    const initialState = {
       data : [],
    isbankVerified:true 
      };


      async function isUserAuthenticated(){
      //   setisAuthenticated(true)
      // getReferal()
      setisAuthenticated(true)
      getReferal()
//         ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
//   .then((resultObject) => {
//     const { success } = resultObject
// //  alert(success)
//     if (success) {
//       setisAuthenticated(true)
//       getReferal()
//       console.log('successful biometrics provided')
//     } else {
//       navigation.goBack()
//       setisAuthenticated(false)
//       console.log('user cancelled biometric prompt')
//     }
//   })
//   .catch(() => {
//     console.log('biometrics failed')
//   })
//         if (biometryType === ReactNativeBiometrics.FaceID) {
//           //do something face id specific
//         console.log(biometryType)
//           getReferal()

//         }
      }
      useEffect(()=>{
        isUserAuthenticated()
      },[])
      const CardsReducers = (prevState, action) => {
        switch (action.type) {
          case "SETCARDS":
            return {
              ...prevState,
              data: action.data,
              isbankVerified:action.isbankVerified
            };   
        }
      };
      const [CardsState, dispatch] = React.useReducer(
        CardsReducers,
        initialState
      );



var explosion;
handleSomeKindOfEvent = () => {
    explosion && explosion.start();
};

async function renderCard(item){
    return (
        <View>
            <Text>{item.id}</Text>
        </View>
    )
}


const [referals, setReferals] = useState(false);
const [isbankVerifieds, setIsbankVerified] = useState(true);
const [totalEarned, setTotalEarned] = useState(0);

async function getReferal() {
    try {
        var tokenJWT = await AsyncStorage.getItem('token');
        await axios.get(
        GLOBAL.BASE_URL+`user/myreferals`,
        {
            headers: {
              "Content-Type": "application/json",
              Authorization:
              'Bearer '+tokenJWT
            },
          }
      ).then((resp) => {
        console.log(resp.data)
        
        setIsbankVerified(resp.data.message.isbankVerified)
        // setReferals(resp.data.message.userReferenced)
        dispatch({type:'SETCARDS',data:resp.data.message.userReferenced,isbankVerified:resp.data.message.isbankVerified})
        console.log('THIS IS THE RESPONSE LOOK HERE',resp.data.message.userReferenced)
        calculateEarned(resp.data.message.userReferenced)

      })
    } catch (err) {
      console.log(err)
    }

}

async function calculateEarned(cards){
    setTimeout(() => {
        var earned = 0;
        cards.forEach(list=>{
            if(list.scrached){
                earned = earned +list.amount;
            }
        })
        setTotalEarned(earned)
    }, 2000);

}

async function updateMyBankDetails(){
  navigation.popToTop();
  navigation.navigate("BankDetailsScreen")
}

const [showScratchCard,setShowScratchCard] = useState(false)
// const [cardsData,setCardsData] = useState(data)

const [isScratched,setIsScratched] = useState(false)
const [currentCard,setCurrentCard] = useState(null)

const [final,setFinal] = useState([null])

async function clickedOut(){
    setIsScratched(false)
    setShowScratchCard(false)
}

async function setAbouttoScratch(item){
  if( CardsState.isbankVerified){
    setCurrentCard(item)
    setShowScratchCard(true)
  }else{
    alert('Please add your Bank details to claim')
  }

}

async function clickedScratch(){
  var jwt = await AsyncStorage.getItem('token');
    await axios.post(
        GLOBAL.BASE_URL+"user/scratched",
        {
            rewardId: currentCard._id
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              'Bearer ' + jwt
          },
        })
        .then((res) => {
          
          console.log('responseJsonssssssss', res.data.message)
         
        })
        .catch((error) => {
          console.error(error);
        });
    var a = CardsState.data;
    a.forEach(list=>{
        if(list._id == currentCard._id){
            list.scrached = true;
        }
    })

    // getReferal()
    setIsScratched(true)
    dispatch({type:'SETCARDS',data:a})
    // clickedOut()
    handleSomeKindOfEvent()
    calculateEarned(a)
}


  return (
        <>
        <View>
         
{
         isbankVerifieds?
        <></>:
         <><View style={{flexDirection: 'row', top: 10,borderWidth:0.8,borderColor:'#D7D7D7',margin:10,padding:10 }}>
          {/* <Image source={require('../assets/updateBank.png')} style={{padding:10,height:220,left:90,width:220,marginTop:80}}></Image> */}
          <Image source={require('../assets/icons/upi.png')} style={{height:50,width:50}}></Image>
            <View style={{textAlign:'center', flex: 3}}>
           <Text style={{textAlign:'center'}}>Add your UPI details to cash in
             </Text><Text style={{textAlign:'center'}}> the rewards you earned. </Text>
             </View>
           <TouchableOpacity  onPress={()=>updateMyBankDetails()}>
            <View style={{borderColor:'#6FA4E9',padding:10,width:70,borderRadius:10,borderWidth:1,borderColor:'#6FA4E9'}}>
                <Text style={{color:'#6FA4E9',textAlign:'center', fontWeight:'bold',borderColor:'#6FA4E9'}}>Add</Text>
            </View>
            </TouchableOpacity>
            
           </View>
</>
            
       }
</View>
        <ScrollView>
         {/* {
        !isAuthenticated?
        <BlurView
        style={styles.absolute}
        // viewRef={this.state.viewRef}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />

       :
       <></>
      } */}
    <View style={{height:Dimensions.get('window').height}}>
 
  <ConfettiCannon
    count={300}
    // colors={["#"]}
    origin={{x: 1, y: 50,z:-1}}
    autoStart={false}
    fadeOut={true}
    ref={ref => (explosion = ref)}
  />  

     <Dialog 
visible={showScratchCard} 
title="Earned"
titleStyle={{color:'#000',fontWeight:'bold'}}
overlayStyle={{color:'#fff'}}
dialogStyle={{height:0,marginBottom:350}}
onTouchOutside={() => clickedOut()} >


<View style={{height:500,left:0}}>

{
isScratched?

<ImageBackground source={require('../assets/exposed.png')} style={{width:290,height:300,borderRadius:50}}>

<View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,alignItems: 'center',padding:10}}>

<Text style={{color:'#A1A4B2'}}>For Refering</Text>
                         <Text style={{color:'#6FA4E9',fontWeight:'bold'}}>{currentCard.name}</Text>
<View style={{justifyContent:'center',textAlign:'center',marginTop:30}}>
<Text style={{color:'#6FA4E9',fontWeight:'600',textAlign:'center',fontSize:40}}>Earned</Text>
                         <Text style={{color:'#6FA4E9',fontSize:70,fontWeight:'800',textAlign:'center'}}>₹{currentCard.amount}</Text>
                         <Text style={{color:'#A1A4B2'}}>CONGRATULATIONS</Text>
</View>
                  
</View>
</ImageBackground> 
:
<>
<TouchableOpacity onPress={()=>clickedScratch()}>
 {/* <Text></Text>
<Image source={require('../assets/scratchcard.png')} style={{width:290,height:300}}  /> */}
 <ImageBackground source={require('../assets/scratchcard.png')} style={{width:290,height:300,borderRadius:50}}>
<View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,alignItems: 'center',padding:10}}>

<Text style={{color:'#fff'}}>Tap to show Reward</Text>
                         {/* <Text style={{color:'#6FA4E9',fontWeight:'bold'}}>Jyothi</Text> */}

                  
</View>
</ImageBackground> 
</TouchableOpacity>
</>
}


</View>

</Dialog>



     <View style={{flexDirection:'row'}}>
     {/* <Image source={require('../assets/scratchcard.gif')} style={{height:170,width:170,position:'absolute',top:150,left:120}}/> */}

     <Text style={{textAlign:'left',flex:1,marginLeft:10,fontSize:18, top: 10,padding:10}}>{I18n.t("Rewards Earned")}</Text>
    {totalEarned != undefined?
     <Text style={{textAlign:'right',marginRight:20,color:'#6FA4E9',fontSize:24,fontWeight:'bold', top: 10}}>₹{totalEarned}</Text>
    :
    <Text style={{textAlign:'right',marginRight:20,color:'#6FA4E9',fontSize:24,fontWeight:'bold', top: 10}}>₹0</Text>
      }
     </View>
     {
       CardsState.data.length>0?
       <>
       <View>
              


       <FlatList
       style={{ margin: 5,marginLeft:0 }}
       numColumns={2} // set number of columns
      //  columnWrapperStyle={styles.row} // space them out evenly
       //   data={_.xorBy(list,route.params.excluding,'categoryIndex')}
       data={CardsState.data}
       keyExtractor={(item, index) => item._id}
       renderItem={({ item }) => (
         <View style={{margin:-5,marginTop:0, marginBottom: 7}}>
             {
                 item.scrached == true ?
                 <View>
                 <ImageBackground source={require('../assets/scratched.png')} style={{width:190,height:200}}>
<View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,alignItems: 'center',padding:10}}>
<Text style={{color:'#A1A4B2'}}>Referred</Text>
                     <Text style={{color:'#6FA4E9',fontWeight:'bold'}}>{item.name}</Text>
<View style={{justifyContent:'center',textAlign:'center',marginTop:30}}>
<Text style={{color:'#6FA4E9',fontWeight:'600',textAlign:'center'}}>Earned</Text>
                     <Text style={{color:'#6FA4E9',fontSize:30,fontWeight:'800',textAlign:'center'}}>₹{item.amount}</Text>
</View>
             
</View>
</ImageBackground>
</View>
:item.expired == true ?
<View>
{/* <TouchableOpacity onPress={()=>setAbouttoScratch(item)}> */}
<Image source={require('../assets/scratchcardexpired.png')} style={{width:190,height:200}} />
{/* </TouchableOpacity> */}

</View>


:
                 <View>
                     <TouchableOpacity onPress={()=>setAbouttoScratch(item)}>
                     <Image source={require('../assets/scratchcard.png')} style={{width:190,height:200}} />
                     </TouchableOpacity>
                 
                 </View>
             }
          {item.scrached?<><View></View></>:
          <>
          {
            item.failureReason != "NA"?
            <Text style={{justifyContent:'center',textAlign:'center',padding:10}}>{item.failureReason}</Text>
:
<Text style={{justifyContent:'center',textAlign:'center',padding:10}}>Expires on {moment(item.expiresAt).format("MMM Do YY")}</Text>

          }
             {/* <Text style={{justifyContent:'center',textAlign:'center',padding:10}}>Expires on {moment(item.expiresAt).format("MMM Do YY")}</Text>
             <Text style={{justifyContent:'center',textAlign:'center',padding:10}}>{item.failureReason}</Text> */}
</>
             }
             </View>

       )}/>
             </View>
</>
       :
       <>
       <View style={{justifyContent:'center'}}>
       <Text style={{fontSize:16,top:160,textAlign:'center',padding:10,fontWeight:'100',color:'grey'}}>{I18n.t("No Rewards yet")}</Text>

       <Text style={{fontSize:16,top:150,textAlign:'center',padding:10,fontWeight:'100',color:'grey'}}>{I18n.t("Start earning rewards")}</Text>
       </View>
       </>
     }
  


 </View>

 </ScrollView>
 
 <TouchableOpacity onPress={()=>navigation.navigate('KnowMoreRewardsScreen')}>
 <View style={{position:'absolute',bottom:0,backgroundColor:'#6FA4E9',width:'100%',alignItems:'center',zIndex:1}}>
       <Text style={{color:'#fff',textAlign:'center',marginTop:5,padding:5}}>{I18n.t("Know more How to earn rewards")}?</Text>
     </View>
     </TouchableOpacity>
</>
);

   
};

export default RewardsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center'
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
