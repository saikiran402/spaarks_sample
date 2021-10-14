import React, { useState } from 'react';
import { View, Text, Button, StyleSheet,Image,TouchableOpacity } from 'react-native';
import I18n from 'i18n-js';
const spaarksPartnerScreen3 = ({navigation,route}) => {
    const [verified,setVerified] = useState(true)
    // const sets = route.params.sets
    return (
      <View style={{flex:1,justifyContent:'center'}}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
              {
                  verified?
                  <Image
                  source={require('../assets/icons/partner_verified.png')}
                  style={{width:300,height:300}}
                />
                :
                <Image
                source={require('../assets/icons/partner_waiting.png')}
                style={{width:300,height:300}}
              />
              }
             {
                route.params.isVerified?
                <>
                <Text style={{textAlign:'center',padding:20,fontWeight:'bold'}}>{I18n.t("You are now verified")}</Text>
                <Text style={{textAlign:'center',padding:10,fontWeight:'500'}}>{I18n.t("You can start using the Spaarks Partner Program now")}</Text>
                </>
                :
                <>
                <Text style={{textAlign:'center',padding:20,fontWeight:'bold'}}>{I18n.t("You are successfully registered for spaarks partner program")}</Text>
                <Text style={{textAlign:'center',padding:10,fontWeight:'500'}}>{I18n.t("Please wait while we're verifying your registration details")}</Text>
                <Text style={{textAlign:'center',padding:10,fontWeight:'500'}}>{I18n.t("Once verified you can start using the Partner Program")}</Text>
                </>
              }
         
          
            </View>
            {
                route.params.isVerified?
                <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center',position: 'absolute',backgroundColor: '#6FA4E9', width: '100%',padding:10, bottom: 0,zIndex:1 }}>       
                <TouchableOpacity onPress={()=>navigation.navigate('spaarksPartnerDashboard')}>
            <Text style={{color:'#fff',paddingTop:0,fontWeight:'bold',fontSize:18}} >{I18n.t("START PARTNER PROGRAM")}</Text>
          {/* </View> */}
          </TouchableOpacity>
      </View>
      :
      <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center',position: 'absolute',backgroundColor: '#CACACA', width: '100%',padding:10, bottom: 0,zIndex:1 }}>       
      <TouchableOpacity onPress={()=>alert(I18n.t('You are not verified yet'))}>
  <Text style={{color:'#fff',paddingTop:0,fontWeight:'bold',fontSize:18}} >{I18n.t("START PARTNER PROGRAM")}</Text>
{/* </View> */}
</TouchableOpacity>
</View>
            }
           
         
      </View>
    );
};

export default spaarksPartnerScreen3;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
