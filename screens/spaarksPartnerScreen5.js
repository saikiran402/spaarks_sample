import React, { useState } from 'react';
import { View, Text, Button, StyleSheet,Image,TouchableOpacity } from 'react-native';

const spaarksPartnerScreen3 = ({navigation,route}) => {
    const [verified,setVerified] = useState(true)
    // const sets = route.params.sets
    return (
      <View style={{flex:1,justifyContent:'center'}}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
          
                <Image
                source={require('../assets/icons/rejected.png')}
                style={{width:300,height:300}}
              />

          
                <>
                <Text style={{textAlign:'center',padding:20,fontWeight:'bold',paddingBottom:5}}>Your registration for Spaarks Partner program could not be completed due to following reason:</Text>
                <Text style={{textAlign:'center',padding:10,fontWeight:'bold',color:'red'}}>{route.params.reason}</Text>
                <Text style={{textAlign:'center',padding:10,fontWeight:'500'}}>You can re-apply for partnership program </Text>
                {/* <Text style={{textAlign:'center',padding:10,fontWeight:'500'}}>Once verified you can start using the Partner Program.</Text> */}
                </>
              
         
          
            </View>
            <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center',position: 'absolute',backgroundColor: '#6FA4E9', width: '100%',padding:10, bottom: 0,zIndex:1 }}>       
                <TouchableOpacity onPress={()=>navigation.navigate('spaarksPartnerScreen4',{show:true})}>
            <Text style={{color:'#fff',paddingTop:0,fontWeight:'bold',fontSize:18}} >REGISTER FOR PARTNERSHIP PROGRAM</Text>
          {/* </View> */}
          </TouchableOpacity>
      </View>
           
         
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
