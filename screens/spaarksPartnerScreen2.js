import React, { useState } from 'react';
import { View, Text, Button, StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { connect, useDispatch, useReducer } from "react-redux";
import I18n from 'i18n-js';

const GLOBAL = require('../Globals');

const spaarksPartnerScreen2 = ({navigation,route,names}) => {
    const [name,setName] = useState(names)
    const [age,setAge] = useState('')
    const [mail,setMail] = useState('')
    const [years,setYears] = useState(true)
    const [india,setIndia] = useState(true)
    const [terms,setTerms] = useState(true)
  //   const [agemail, setAgeMail] = useState('')

  //   async function setAgeMail(item){
  //     setAge(item.age)
  //     setMail(item.mail)
  // }

    async function RegisterPartner(){
      var tokenJWT = await AsyncStorage.getItem('token');
      await axios.post(
          GLOBAL.BASE_URL+"user/registerpartner",
          {
            age:age,
            email:mail
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
              'Bearer '+tokenJWT
            },
          }
        )
          .then((res) => {
            
            console.log('response', res.data.message)
            navigation.popToTop()
            navigation.navigate('spaarksPartnerScreen3',{isVerified:false})
           
          })
          .catch((error) => {
            console.error(error);
          });
    
     
  }



    return (
      <View style={{flex:1}}>
  <View style={{margin:20}}>
  <TextInput
                    // label="Phone number"
                    mode="flat"
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    editable={false}
                    // textContentType={name}


                    // onContentSizeChange={setPhone}
                    // ref={(input) => { phones = input; }}
                    style={{
                      backgroundColor: "#f2f2f2",
                      height: 40,
                      margin: 10,
                      paddingLeft: 10,
                      marginTop: 0,
                      borderRadius:10
                    }}
                  />
                    <TextInput
                    label="Phone number"
                    mode="flat"
                    placeholder={I18n.t("Enter age")}
                    placeholderTextColor="#808080"
                    value={age}
                    onChangeText={setAge}
                    // textContentType={telephoneNumber}                   
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
                    <TextInput
                    // label="Phone number"
                    mode="flat"
                    placeholder={I18n.t("Enter email")}
                    placeholderTextColor="#808080"
                    value={mail}
                    onChangeText={setMail}
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
<CheckBox
    style={{flex: 0, padding: 10}}
    onClick={()=>{
      setYears(!years)
    }}
    checkedCheckBoxColor="#6FA4E9"
    uncheckedCheckBoxColor="6FA4E9"
    isChecked={years}
    rightText={I18n.t("I am above 18 years of age")}
/>
<CheckBox
    style={{flex: 0, padding: 10}}
    onClick={()=>{
      setIndia(!india)
    }}
    checkedCheckBoxColor="#6FA4E9"
    uncheckedCheckBoxColor="6FA4E9"
    isChecked={india}
    rightText={I18n.t("I am a resident of India")}
/>
<CheckBox
    style={{flex: 0, padding: 10}}
    onClick={()=>{
      setTerms(!terms)
    }}
    checkedCheckBoxColor="#6FA4E9"
    uncheckedCheckBoxColor="6FA4E9"
    isChecked={terms}
    rightText={I18n.t("I accept all Terms & Guidelines")}
/>
  </View>
  <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center',position: 'absolute',backgroundColor: years && india && terms?'#6FA4E9':'#CACACA', width: '100%',padding:10, bottom: 0,zIndex:1 }}>       

              <TouchableOpacity onPress={()=>(years && india && terms) ?RegisterPartner():alert('Please fill all the fields')}>
          <Text style={{color:'#fff',paddingTop:0,fontWeight:'bold',fontSize:18}} >{I18n.t("REGISTER NOW")}</Text>
        </TouchableOpacity>
    </View>
      </View>
    );
};

const mapStatetoProps = (state) => {
  // const { }=state
  return {
    
    names:state.chatss.name,

  };
};


export default connect(mapStatetoProps)(spaarksPartnerScreen2);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
});
