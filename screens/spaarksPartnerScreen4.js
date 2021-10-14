import React, {useState} from 'react'; 
import { Dimensions } from 'react-native';
import { View, Text, Button, StyleSheet , TouchableOpacity,Image , ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const GLOBAL = require('../Globals');
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import I18n from 'i18n-js';


const spaarksPartnerScreen4 = ({navigation,route}) => {
  const [showButton, setShowButton] = useState(true)
  async function onPartnerScreen(){
    // navigation.navigate('spaarksPartnerScreen4')
    // if(isConnected){
    var tokenJWT = await AsyncStorage.getItem('token');
       await axios.get(
     GLOBAL.BASE_URL+`user/ispartner`,
     {
         headers: {
           "Content-Type": "application/json",
           Authorization:
           'Bearer '+tokenJWT
         },
       }
   ).then((resp) => {
     console.log("alllllllll"  , resp.data)
     // setReferals(resp.data.message.userReferenced)
     // dispatch({type:'SETCARDS',data:resp.data.message.userReferenced})
     console.log('THIS IS THE RESPONSE LOOK HERE')
     if(resp.data.programActive){
     if(resp.data.isApplied && resp.data.isPartner){
       //Dashboard
      //  refRBSheet.current.close()
      //  setShowButton(false)
       navigation.navigate('spaarksPartnerDashboard')

     }else if(resp.data.isApplied && !resp.data.isPartner){
       //waiting to be verified
      //  refRBSheet.current.close()
      // setShowButton(true)
       navigation.navigate('spaarksPartnerScreen3',{isVerified:resp.data.isPartner, sets: resp.data.sets})

     }else if(!resp.data.isApplied && !resp.data.isPartner && resp.data.partnerStatus == 'Rejected'){
       //notapplied not verified
      //  refRBSheet.current.close()
       navigation.navigate('spaarksPartnerScreen1',{isActive:resp.data.programActive})

     }else{
      navigation.navigate('spaarksPartnerScreen1',{isActive:resp.data.programActive})
     }
    //  refRBSheet.current.close()
    //  navigation.navigate('spaarksPartnerScreen1')
    }else{
      alert('Spaarks Partnership program is currently inactive')
    }

   })
  // }else{
  //   Snackbar.show({
  //     text: I18n.t('Check your internet'),
  //     duration: Snackbar.LENGTH_LONG
  //   });
  // }
 }
     
    return (
        <SafeAreaView> 
             <ScrollView>
    <View style={{flex:1 , margin : 25,marginTop:0}}>
        <View style={styles.elements}>
        <Text>{I18n.t("Spp1")}</Text>
         <Image source={require('../assets/pp1.png')} style={{height:150,width:200 , marginLeft:50  }}/>
        </View>
         <View style={styles.elements}>
         <Text>{I18n.t("Spp2")}</Text>
         </View>
       <View>
       <Text style={styles.elements}>{I18n.t("Spp3")}</Text>
         <Image source={require('../assets/pp2.png')} style={{height:150,width:200 , marginLeft:50, marginTop :10}}/>
       </View>
         <View style={styles.elements}>
         <Text>{I18n.t("Spp4")}</Text>
         <Image source={require('../assets/pp3.png')} style={{height:150,width:200 , marginLeft:50  }}/>
         </View>
         <View style={styles.elements}>
         <Text>{I18n.t("Spp5")}</Text>
         <Image source={require('../assets/pp4.png')} style={{height:150,width:200 , marginLeft:50  }}/>
         </View>
         <View style={styles.elements}>
         <Text>{I18n.t("Spp6")}</Text>
         <Image source={require('../assets/pp5.png')} style={{height:150,width:200 , marginLeft:50  }}/>

         </View>
         </View>
        </ScrollView>
       { route.params.show? <View style={{justifyContent:'center',alignItems:'center',position: 'absolute',backgroundColor: '#6FA4E9', width: '100%',padding:10, bottom: 0,zIndex:1, marginBottom :0 }}> 
        <TouchableOpacity
                    onPress={() => onPartnerScreen()}
                  >
                <Text style={{color : "#fff"}}> {I18n.t("REGISTER NOW")}</Text>
            </TouchableOpacity>
        </View>:<></>}
        </SafeAreaView>
       
      
    
    );
};

export default spaarksPartnerScreen4;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
  }, 
  elements: {
      paddingVertical:5
  }
});
