import React,{useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, Image,TextInput , Platform , TouchableOpacity ,KeyboardAvoidingView  } from 'react-native';

import I18n from '../src/i18n';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import Snackbar from 'react-native-snackbar';
const GLOBAL = require('../Globals');



const BankDetailsScreen = ({navigation,route}) => {
    const [upi,setUpi] = useState('');
    const [enabledShift , setEnabledShift] = useState(false)
    async function getBankDetails(){
        var token  = await  AsyncStorage.getItem('token');
        console.log(GLOBAL.BASE_URL+"user/getmybankdetails") 
        await axios.get(GLOBAL.BASE_URL+"user/getmybankdetails",{
          headers: {
            "Content-Type": "application/json",
            Authorization:
            'Bearer '+token
          },
        }).then((resp) => {
          console.log('bankdetailss',resp.data);
          setUpi(resp.data.upiId)
          
        });
      }
    
      useEffect(()=>{
          getBankDetails()
      },[])


      async function updateMyBankDetails(){
        if(upi.includes("@")){
          var token  = await  AsyncStorage.getItem('token');
          console.log(GLOBAL.BASE_URL+"user/updatemybankdetails") 
  
          await axios.post(
            GLOBAL.BASE_URL+'user/updatemybankdetails',
            {
              "upiId": upi,
              "accno": "",
              "ifsc": ""
                    },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization:
                'Bearer '+token
              },
            }
          ).then((resp)=>{
              console.log('bankdetailss',resp.data);
              alert(I18n.t('UPI Details Saved Succesfully'))
              Snackbar.show({
                text: I18n.t('UPI Details Saved Succesfully'),
                duration: Snackbar.LENGTH_LONG
              });
              // setUpi()
          }).catch((err)=>{
            console.log(err)
          })
        }else{
alert('Invalid UPI Details')
        }
       
     
      }
    



    return (  
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 160 : 0}
      style={styles.container}
    >
     <View  >
         <Image source={require('../assets/updateBank.png')} style={{padding:10,height:220,left:90,width:220,marginTop:10}}></Image>
        <View style={{padding:10,marginTop:-18}}>
            <Text style={{textAlign:'center'}}>{I18n.t("Add your")} <Text style={{fontWeight:'bold'}}>{I18n.t("UPI details")}</Text> {I18n.t("to cash in the rewards you earned")}. </Text>
            <Text style={{textAlign:'center'}}>{I18n.t("in the rewards you earned")}. </Text>
        </View>
        <View>
            <Text style={{fontWeight:'bold',color:'#6FA4E9',marginLeft:15}}>{I18n.t("UPI ID")}</Text>
        <TextInput
                    // label="Phone number"
                    mode="flat"
                    placeholder="xxxx@handler"
                    value={upi}
                    onChangeText={setUpi}
                    onFocus={()=>setEnabledShift(true)}
                    // onContentSizeChange={setPhone}
                    // ref={(input) => { phones = input; }}
                    style={{
                      backgroundColor: "#f2f2f2",
                      borderRadius:10,
                      height: 40,
                      margin: 10,
                      paddingLeft: 10,
                      marginTop: 0,
                    }}
                  />
        </View>
        <View style={{flexDirection:'row'}}>
            <View style={{flex:6}}>

            </View>
            <View style={{flex:1,marginRight:25}}>
              
                <TouchableOpacity  onPress={()=>updateMyBankDetails()}>
                <View style={{backgroundColor:'#6FA4E9',padding:10,width:70,borderRadius:10}}>
                    <Text style={{color:'#fff',textAlign:'center'}}>{I18n.t("Save")}</Text>
                </View>
                </TouchableOpacity>
            </View>
            
        </View>
     </View>
      </KeyboardAvoidingView>
    );
};

export default BankDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
