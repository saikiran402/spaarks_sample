import React,{useEffect,useState} from 'react';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { View, Text, Button, StyleSheet,FlatList,ImageBackground,Image } from 'react-native';
const GLOBAL = require('../Globals');
import axios from 'axios';
import I18n from 'i18n-js';
import { connect, useDispatch, useReducer } from "react-redux";
import chatReducers from "../reducers/chatReducers";
import AsyncStorage from '@react-native-community/async-storage';
const spaarksPartnerDashboard = ({navigation,route,partnershipSets}) => {
  const Chatdispatcher = useDispatch(chatReducers);
  // const setArray = route.params.setArray
    const initialState = {
        data : [
             {
             'id':1,
             isOpened:false
         },
         {
             'id':2,
             isOpened:false
         }
     ]
       };
       const [mysets,setSets] = useState([])
       const [isBankVerified,setIsbankVerified] = useState(false)
 async function getSets(){
  var tokenJWT = await AsyncStorage.getItem('token');
  await axios.get(
      GLOBAL.BASE_URL+"user/mysets",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
          'Bearer '+tokenJWT
        },
      }
    )
      .then((res) => {
        
        // console.log('responseDATATATATs', res.data.message.partner[0].sets)
        console.log('PARTNERDATAPARTNERDATAPARTNERDATAPARTNERDATAPARTNERDATAsswwwwwwwwwweeesasasas', res.data.message.partner)
        setSets(res.data.message.partner)
        setIsbankVerified(res.data.message.isbankVerified)
        Chatdispatcher({type:'UPDATEPARTNERPROGRAM',partnershipSets:res.data.message.partner})
        // navigation.navigate('spaarksPartnerScreen3')
       
      })
 }

       useEffect(()=>{
        getSets()
       },[])
       const CardsReducers = (prevState, action) => {
         switch (action.type) {
           case "SETCARDS":
             return {
               ...prevState,
               data: action.data,
             };   
         }
       };

       const [CardsState, dispatch] = React.useReducer(
         CardsReducers,
         initialState
       );
 
       async function updateMyBankDetails(){
        navigation.popToTop();
        navigation.navigate("BankDetailsScreen")
      }

      async function sendToScan(item,index){
        if(isBankVerified){
          navigation.navigate('MySetsScreen',{setName:index+1,setId:item._id,mysets:item.sets})
        }else{
          alert('Please add your UPI details to continue')
        }
       
      }
    return (
      <View style={{height:Dimensions.get('window').height,flex:1}}>
        <View>
{
             isBankVerified?
             <></>
             :
             <><View style={{flexDirection: 'row', top: 10,borderWidth:0.8,borderColor:'#D7D7D7',margin:10,padding:10 }}>
              {/* <Image source={require('../assets/updateBank.png')} style={{padding:10,height:220,left:90,width:220,marginTop:80}}></Image> */}
              <Image source={require('../assets/icons/upi.png')} style={{height:50,width:50}}></Image>
                <View style={{textAlign:'center', flex: 3}}>
               <Text style={{textAlign:'center'}}>{I18n.t("Add UPI details")}
                 </Text>
                 {/* <Text style={{textAlign:'center'}}> the rewards you earned. </Text> */}
                 </View>
               <TouchableOpacity  onPress={()=>updateMyBankDetails()}>
                <View style={{borderColor:'#6FA4E9',padding:10,width:70,borderRadius:10,borderWidth:1,borderColor:'#6FA4E9'}}>
                    <Text style={{color:'#6FA4E9',textAlign:'center', fontWeight:'bold',borderColor:'#6FA4E9'}}>{I18n.t("Add")}</Text>
                </View>
                </TouchableOpacity>
                
               </View>
</>
               
           }
</View>
         <Text style={{fontWeight:'bold',padding:10,fontSize:18}}>{I18n.t("Earn by completing a set")}</Text>
         <FlatList
              style={{ margin: 5 }}
              numColumns={2} // set number of columns
              columnWrapperStyle={styles.row} // space them out evenly
              //   data={_.xorBy(list,route.params.excluding,'categoryIndex')}
              data={partnershipSets}
              keyExtractor={(item, index) => item._id}
              renderItem={({ item,index }) => (
                <View>

                        <View>
                            <TouchableOpacity onPress={()=>sendToScan(item,index)}>
                        <ImageBackground source={require('../assets/icons/sets.png')} style={{width:168,height:168,margin:10}} >
<View style={{position: 'absolute',flexDirection:'row', top: 0, left: 0, right: 0, bottom: 0,padding:10}}>
<Text style={{color:'#fff',fontSize:22,fontWeight:'bold'}}>Set {index+1}</Text>
                            <Text style={{color:'#fff',fontSize:30,fontWeight:'bold',marginLeft:45}}>{item.sets.length}/5</Text>

                    
</View>
</ImageBackground>
</TouchableOpacity>
</View>
                    </View>

              )}/>
<View style={{position:'absolute',top:Dimensions.get('window').height-100}}>
  <Text>Test</Text>
</View>
<View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center',position: 'absolute',backgroundColor:'#6FA4E9', width: '100%', bottom: 0,zIndex:1 }}>     
<TouchableOpacity onPress={()=>    navigation.navigate('spaarksPartnerScreen4', {show: false})
}>
 {/* <View style={{position:'absolute',bottom:0,backgroundColor:'#6FA4E9',width:'100%',alignItems:'center',zIndex:1}}> */}
       
       <Text style={{color:'#fff',textAlign:'center',marginTop:5,padding:5}}>{I18n.t("Know more How does Spaarks Partner Program work")}</Text>
    
     </TouchableOpacity>
     </View>
      </View>
    );
};


const mapStatetoProps = (state) => {
  return {
    token: state.chatss.token,
    partnershipSets:state.chatss.partnershipSets
    
  };
};

export default connect(mapStatetoProps)(spaarksPartnerDashboard);


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
  },
});
