import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import moment from "moment";
import axios from 'axios';
import I18n from '../src/i18n';
import { Tooltip } from 'react-native-elements';
import { connect, useDispatch, useReducer } from "react-redux";
import chatReducers from "../reducers/chatReducers";
const GLOBAL = require('../Globals');

const MySetsScreen = ({navigation,route,partnershipSets}) => {
  const Chatdispatcher = useDispatch(chatReducers);

    var a = [1,2,3,4,5]
    const [canClaim,setCanClaim] = useState(false)
    const [emptySetss,setEmptySets] = useState([])
    // const setName = route.params.setName
    const setId = route.params.setId
    const setArray = route.params.mysets;
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
            // console.log('PARTNERDATAPARTNERDATAPARTNERDATAPARTNERDATAPARTNERDATAsswwwwwwwwwweeesasasas', res.data.message.partner)
            // setSets(res.data.message.partner)
            // setIsbankVerified(res.data.message.isbankVerified)
            Chatdispatcher({type:'UPDATEPARTNERPROGRAM',partnershipSets:res.data.message.partner})
            // navigation.navigate('spaarksPartnerScreen3')
           
          })
     }
    async function deleteIncorrectDetails(){
      // setFilledSets([])
      for(i=0;i<incorrectSets;i++){
        setEmptySets([...emptySetss,'hi'])
      }

     
      var tokenJWT = await AsyncStorage.getItem('token');
      await axios.post(
          GLOBAL.BASE_URL+"user/removerejected",
          {
            setId:route.params.setId
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
            getSets()
            console.log('response', res.data)
          })
          .catch((error) => {
            console.error(error);
          });


          setShowDelete(false)
    
     
  }



  async function addCount(){
     var np = partnershipSets;
     console.log(partnershipSets)
     np[0].sets.push({
       userId:{name:'Santosh',profilePic:'https://static-content.spaarksweb.com/images/userprofile.png'},
       time:Date.now(),
       status:'pending'
     })
    Chatdispatcher({type:'UPDATEPARTNERPROGRAM',partnershipSets:[...np]})
  }
  const [showDelete,setShowDelete] = useState(false)
  const [filledSets,setFilledSets] = useState([])
  const [isLoading,setisLoading] = useState(true)
  const [incorrectSets,setIncorrectSets] = useState(0)

    async function setsets(){
      console.log("partnershipSetspartnershipSetspartnershipSetspartnershipSets",partnershipSets[0].sets)
      console.log('CURRENTSET',partnershipSets[route.params.setName-1].sets.length)
      var emptySets = [];
      var deference = 5 - partnershipSets[route.params.setName-1].sets.length;
      for(var i=0;i< deference;i++){
        emptySets.push('1')
      }
      console.log("ES",emptySets)
      setFilledSets(partnershipSets[route.params.setName-1].sets)
      setEmptySets(emptySets)
      var count  = 0;
      partnershipSets[route.params.setName-1].sets.forEach(list=>{
        if(list.status == 'Rejected'){
          count++;
          setShowDelete(true)
        }
      })
      setIncorrectSets(count)
      setisLoading(false)
      
    }



    useEffect(()=>{
      setsets()
    },[5])

    if(isLoading){
      return (
        <View style={{flex:1,justifyContent:'center'}}>
      <ActivityIndicator size="large" />
        </View>
      )
    }

    return (
      <View style={{height:Dimensions.get('window').height,flex:1,backgroundColor:'#f2f2f2'}}>
          
          
          {
          partnershipSets[route.params.setName-1].sets.map((m, j) => (
                <View style={{backgroundColor:'#fff',margin:10,borderRadius:10,padding:10,justifyContent:'center',alignItems:'center'}}>
                     <View style={{ flexDirection: "row"}}>
                    <View style={{flex:1}}>
                      <Image source={{uri:m.userId.profilePic}} style={{height:60,width:60, borderRadius: 25}}/>
                    </View>
                    <View style={{flex:4}}> 
                    <View style={{flexDirection:'row'}}>
                      
                      <View style={{flex:2}}>
                            <View>
                            <Text style= {{marginTop:10,fontWeight:'bold',fontSize:20}}>{m.userId.name.substr(0,17)}</Text>
                            <Text style= {{padding:0,fontSize:12,marginTop:10,color:'#848484'}}>{I18n.t("Referred on")} {moment(m.time).format('ll')}</Text>
                            </View>
                     </View>
                     

                     <View style={{flex:1}}>
                      <View style={{justifyContent:'center',marginLeft:0}}>                        
                        {
                          m.status === "pending" ?
                          // <Text style= {{fontSize:14,marginTop:15,color:'#8B99AF',fontWeight: 'bold'}}>{""}{I18n.t("Processing")}</Text>:
                          <View style= {{alignItems:'center', marginLeft: 0,flex:0}}>
                            {/* <ActivityIndicator/> */}
                          <Image source={{uri:"https://img.icons8.com/pastel-glyph/2x/clock--v2.png"}} style={{height:25,width:25,marginTop:13}}/>
                          <Text style= {{fontSize:14,marginTop:10,color:'#8B99AF',fontWeight: 'bold'}}>{I18n.t("Processing")}</Text>
                          </View>  
                              :
                          m.status === "Verified" ?
                          <View style= {{alignItems:'center', marginLeft: 0,flex:0}}>
                          <Image source={require('../assets/icons/verified.png')} style={{height:25,width:25,marginTop:13}}/>
                          <Text style= {{fontSize:14,marginTop:10,color:'#6FA4E9',fontWeight: 'bold'}}>{I18n.t("Verified")}</Text>
                          </View>      
                          :
                          <View style= {{alignItems:'center'}}>
                            <View style={{flexDirection:'row'}}>

                          <Image source={require('../assets/icons/incorrectdetails.png')} style={{height:20,width:25,marginTop:13}}/>
                          {/* <Text style= {{fontSize:14,marginTop:10,color:'#F57979', fontWeight: 'bold',fontStyle: 'italic',marginTop:12}}>i</Text> */}
                          </View>
                          <View style={{flexDirection:'row'}}>

                          <Tooltip backgroundColor={"#F57979"} containerStyle={{color:'#fff'}}  width ={350} popover={<Text>{m.remarks}</Text>}>
                          <Text style= {{fontSize:14,marginTop:10,color:'#F57979', fontWeight: 'bold'}}>{I18n.t("Incorrect details")} <Text style= {{fontSize:14,marginTop:10,color:'#F57979', fontWeight: 'bold',fontStyle: 'italic',marginTop:0}}>{" "}i</Text></Text>
                          
</Tooltip>
                         
                         

                          </View>
                          </View>
                        }
  
              
                        </View>
                        </View>
                     
                     
                     
                     </View>
                    </View>

                  </View>
                 
              </View>
             
          ))
        }
           {
             Array(5-partnershipSets[route.params.setName-1].sets.length).fill(Math.random()).map((m, j) => (
          // emptySetss.map((m, j) => (
                <View style={{backgroundColor:'#fff',margin:10,borderRadius:10,padding:10,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={()=>navigation.navigate('QrForPartnerScreen',{setId:route.params.setId})}>
                  {/* <TouchableOpacity onPress={()=>addCount()}> */}
                    <Image source={require('../assets/icons/add_business.png')} style={{height:50,width:50}}/>
                  </TouchableOpacity>
                  <Text style={{color:'#6FA4E9'}}>{I18n.t("Add Business")}</Text>
                </View>
          ))
        }
 <View style={{justifyContent:'center'}}>
            <Text style={{padding:10,color:'#000',textAlign:'center'}}>{partnershipSets[route.params.setName-1].display}
            </Text>
          </View>

        {
          showDelete?
          <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center',position: 'absolute',backgroundColor: '#6FA4E9', width: '100%',padding:10, bottom: 0,zIndex:1 }}>       
         <TouchableOpacity onPress={()=>deleteIncorrectDetails()}>
           <Text style={{color:'#fff',paddingTop:0,fontWeight:'bold',fontSize:18}} >{I18n.t("DELETE INCORRECT DETAILS")}</Text>
         </TouchableOpacity>
       </View>:
       <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center',position: 'absolute',backgroundColor:'#6FA4E9', width: '100%', bottom: 0,zIndex:1 }}>     
<TouchableOpacity onPress={()=>    navigation.navigate('spaarksPartnerScreen4', {show: false})
}>
 {/* <View style={{position:'absolute',bottom:0,backgroundColor:'#6FA4E9',width:'100%',alignItems:'center',zIndex:1}}> */}
       
       {/* <Text style={{color:'#fff',textAlign:'center',marginTop:5,padding:5}}>{I18n.t("Know more. How does Spaarks Partner Program work?")}</Text> */}
       <Text style={{color:'#fff',textAlign:'center',marginTop:5,padding:5}}>{I18n.t("Know more How does Spaarks Partner Program work")}</Text>

     </TouchableOpacity>
     </View>
        }

{/* canClaim? */}
        {/* <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center',position: 'absolute',backgroundColor: '#6FA4E9', width: '100%',padding:10, bottom: 0,zIndex:1 }}>       
         <TouchableOpacity onPress={()=>navigation.navigate('spaarksPartnerScreen2')}>
           <Text style={{color:'#fff',paddingTop:0,fontWeight:'bold',fontSize:18}} >CLAIM REWARD</Text>
         </TouchableOpacity>
       </View>:
       <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center',position: 'absolute',backgroundColor: '#CACACA', width: '100%',padding:10, bottom: 0,zIndex:1 }}>       
         <TouchableOpacity onPress={()=>alert('complete all 5 to claim reward')}>
           <Text style={{color:'#fff',paddingTop:0,fontWeight:'bold',fontSize:18}} >CLAIM REWARD</Text>
         </TouchableOpacity>
       </View> */}
       

      </View>
    );
};



const mapStatetoProps = (state) => {
  return {
    token: state.chatss.token,
    partnershipSets:state.chatss.partnershipSets
    
  };
};

export default connect(mapStatetoProps)(MySetsScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
  },
});
