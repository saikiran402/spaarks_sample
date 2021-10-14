import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet,Alert,Linking, TouchableOpacity, Image, Pressable, KeyboardAvoidingView,Keyboard ,TouchableWithoutFeedback} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import Snackbar from 'react-native-snackbar';
import { ScrollView } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { connect, useDispatch, useReducer } from "react-redux";
const GLOBAL = require('../Globals');
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import { Rating, AirbnbRating, Divider } from "react-native-elements";
import Textarea from "react-native-textarea";
import { Dimensions } from 'react-native';
import I18n from '../src/i18n';
import { checkPermission } from 'react-native-location';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

const ScanQrScreen = ({ navigation, route, token, isConnected }) => {

  const [content, setContent] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [currentRating, setCurrentRating] = useState(null)
  const [hasPermission, setHasPermission] = useState("granted");



  async function checkPermission(){
    requestMultiple([PERMISSIONS.IOS.CAMERA]).then((statuses) => {
      console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
      if(statuses[PERMISSIONS.IOS.CAMERA] == 'blocked'){
        Alert.alert(
          "Can not use camera",
        "Please allow Spaarks to access your camera in 'Settings > Privacy > Camera",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Settings", onPress: () => Linking.openURL('app-settings:') }
          ]
        );
      }
      // console.log('FaceID', statuses[PERMISSIONS.IOS.FACE_ID]);
    });
  }
  useEffect(()=>{
    checkPermission()
  },[])

  function updateText(a) {
    setContent(a);
  }

  const [rating, setRating] = useState(1)
  async function ratingCompleted(value) {
    // alert(value)
    setRating(value)
  }
  async function submitRating() {
    if (isConnected) {
      console.log(GLOBAL.BASE_URL + "market/giveratings")
      var jwt = await AsyncStorage.getItem('token');
      console.log({
        "rating": rating,
        "content": content,
        "id": currentRating.ratingId,
        "ratingId": currentRating._id
      })
      await axios.post(
        GLOBAL.BASE_URL + "market/giveratings",
        {
          "rating": rating,
          "content": content,
          "id": currentRating.id,
          // "id": currentRating._id, 
          // "userId":currentRating.uid._id
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              'Bearer ' + jwt
          },
        }
      )
        .then((responseJson) => {
          setModalVisible(false)
          console.log('ratingggggg', responseJson.data)
          // var pendingRatingsnew  = pendingRatings.filter((rating)=> {return rating._id != currentRating._id})
          // setCurrentPendingWorks(pendingRatingsnew)
          // setBookmark(true)
        })
        .catch((error) => {
          console.error(error);
        });

    } else {
      Snackbar.show({
        text: I18n.t('Check your internet'),
        duration: Snackbar.LENGTH_LONG
      });
    }

  }
  async function clickedLink() {
    Clipboard.setString('https://www.spaarksweb.com')
    // alert('Message copied')
    Snackbar.show({
      text: I18n.t('Link copied to clipboard'),
      duration: Snackbar.LENGTH_LONG,
    });
  }

  if (hasPermission === null) {
    return <Text>{I18n.t("Requesting for camera permission")}</Text>;
  }
  if (hasPermission === false) {
    return <Text>{I18n.t("No access to camera")}</Text>;
  }


  onSuccess = async (e) => {
    console.log(e.data)
    console.log(route.params)
    if (route.params.finalType == 'Referral') {
      var jwt = await AsyncStorage.getItem('token');
      if (String(jwt) != "null") {
        console.log(e.data)
        if(e.data.includes("id")){
        var a = JSON.parse(e.data);
    
        var uid = a.id
        var time = a.time
        console.log(uid, time)
        await axios.post(GLOBAL.BASE_URL + 'user/scanreferencer', {
          uid: uid,
          time: time
        },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                'Bearer ' + jwt
            },
          }
        ).then((resp) => {
          alert(resp.data.message)
          console.log("Noto", resp.data)

          navigation.navigate('RewardsScreen')
          // setLoading(false)
        }).catch((err) => {
          if(err.response.data.message == "Please Update your UPI Details to continue"){
            alert("Please Update your UPI Details to continue.\n  User Profile -> Settings -> Add UPI")
          }else{
            alert(err.response.data.message)
          }
      
          console.log('ERROR', err)
        })
      }else{

        alert("Please Scan a valid Spaarks Qr code")
      }
      } else {
        alert(I18n.t('Please try again later'))
      }
    }

    if (route.params.finalType == 'Web Login') {
      var jwt = await AsyncStorage.getItem('token');
      if (String(jwt) != "null") {
        // alert(e.data)
        await axios.get(GLOBAL.BASE_URL + 'user/web/login/' + e.data, {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              'Bearer ' + jwt
          },
        }
        ).then((resp) => {
          console.log("Noto", resp.data)
          route.params.getData()
          navigation.navigate('Web Login')
          // setLoading(false)
        }).catch((err) => {
          console.log(err)
          alert(err.response.data.message)
          // alert(err.response.data.message)
          //  console.log('ERROR',err)
        })
      } else {

        alert(I18n.t('Please try again later'))
      }
    }

    if (route.params.finalType == 'Give rating') {
      var jwt = await AsyncStorage.getItem('token');
      if (String(jwt) != "null") {
        // alert(e.data)
        console.log(e.data.type)
        // if(e.data.type == undefined){
        //   alert('Web')
        // }else{
        // alert('phone')
        // }
        await axios.post(GLOBAL.BASE_URL + 'market/getratingdetails', {
          id: e.data
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              'Bearer ' + jwt
          },
        }
        ).then((resp) => {

          setCurrentRating(resp.data)
          setModalVisible(true)
          console.log("Noto", resp.data)
          //  navigation.navigate('Web Login')
          // setLoading(false)
        }).catch((err) => {
          alert(err.response.data.message)
          console.log('ERROR', err)
        })
      } else {
        alert(I18n.t('Please try again later'))
      }
    }





  };
  const Ratings = () => {
    return (
      <View style={{ textAlign: 'center', justifyContent: 'center', marginLeft: 60 }}>
        <AirbnbRating
          count={5}
          onFinishRating={ratingCompleted}
          // reviews={["Terrible", "Bad","OK", "Good","Very Good",]}
          defaultRating={5}
          size={16}

        />
      </View>
    )
  }



  return (
    <View style={styles.container}>



      {
        currentRating != null ?

          <View>

            <Modal isVisible={modalVisible} style={{ height: 50, marginTop: 50 }} onBackdropPress={() => setModalVisible(false)} onRequestClose={() => {
              setModalVisible(false);
            }}>
                     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={{
                    textAlign: "center", color: "#A1A4B2"
                  }}>Rate service provider/ seller</Text>

                  <View style={{ borderColor: "#D7D7D7", borderWidth: 0.4, width: 300, margin: 10 }} />
                  <Image
                    source={{ uri: currentRating.uid.profilePic }}
                    style={{
                      height: 80,
                      width: 80,
                      marginLeft: 0,
                      borderRadius: 40,
                    }}
                  ></Image>
                  <Text style={{ fontWeight: "700", marginTop: 10, fontSize: 15 }}>
                    {currentRating.uid.name}
                  </Text>
                  <View style={{ borderColor: "#F30E5C", borderWidth: 1, borderRadius: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 11, color: "#F30E5C", padding: 5 }}>
                      {currentRating.subCategory}
                    </Text>
                  </View>
                  <View style={{ right: 0 }}>
                    <AirbnbRating
                      count={5}
                      onFinishRating={ratingCompleted}
                      defaultRating={5}
                    />
                  </View>
           
                  <KeyboardAvoidingView
                    // behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ backgroundColor: '#f2f2f2', width: 300, height: 110 }}
                  >
                   
                    <View style={{ backgroundColor: '#f2f2f2', width: '100%', height: 110 }}>
                      <Textarea
                        maxLength={250}
                        value={content}
                        onChangeText={updateText}
                        placeholder={"Write a review"}
                        placeholderTextColor={"#c7c7c7"}
                        underlineColorAndroid={"transparent"}
                        returnKeyType={"send"}

                      />
                    </View>
          
                  </KeyboardAvoidingView>
         
                  <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: "row", padding: 15 }}>
                      <Pressable
                        style={{
                          borderRadius: 10,
                          padding: 10,
                          elevation: 2, backgroundColor: "#2196F3", marginTop: 0
                        }}
                        onPress={() => submitRating()}
                      >
                        <Text style={styles.textStyle}>{I18n.t("SUBMIT")}</Text>
                      </Pressable>
                      <Pressable
                        style={{
                          borderRadius: 10,
                          padding: 10,
                          elevation: 2
                        }}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={{
                          color: "#9B9B9B",
                          fontWeight: "bold",
                          textAlign: "center"
                        }}>{I18n.t("LATER")}</Text>
                      </Pressable>
                    </View>
                    {currentRating.count > 3 ?
                      <Pressable
                        style={{
                          borderRadius: 10,

                          elevation: 2, paddingHorizontal: 25,
                        }}
                        onPress={() => ignoreRating()}
                      >
                        <Text style={{
                          color: "#2196F3",
                          fontWeight: "bold",
                          textAlign: "center"
                        }}>{I18n.t("IGNORE")}</Text>
                      </Pressable>
                      :
                      <></>
                    }
                  </View>
                </View>
              </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
          :
          <></>
      }








      {/* <Text style={{ position: 'absolute', top: 30, zIndex: 1, color: '#fff', fontWeight: '500', fontSize: 15 }}>
        Make Sure Your QR is in the frame
        
      </Text> */}
      <View style={{position:"absolute",top:50,zIndex:1}}>
        <View>
          <Text style={{ color: '#fff', fontWeight: '500', fontSize: 15,marginTop:10,marginLeft:12}}>{I18n.t("Make sure your QR is in the frame")}</Text>
          {/* <View style={{height:250,width:250,borderColor:'#6FA4E9',borderWidth:2,marginTop:50,borderRadius:40,marginLeft:10}}>

          </View> */}
        </View>
      </View>
      <QRCodeScanner
        // showMarker={true}
        cameraStyle={{ height: 650 }}
        // markerStyle={{color:'#6FA4E9',borderColor:'#6FA4E9'}}
        onRead={onSuccess}
        reactivate={true}
        reactivateTimeout={5000}
        flashMode={RNCamera.Constants.FlashMode.auto}
      />
{
  route.params.finalType == 'Referral'?

      <View style={{ height: 200, backgroundColor: '#fff', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <View>
          
          <Text style={{ padding: 20,paddingBottom:5, fontWeight: '700' }}>{I18n.t("Steps for Earining Rewards")}</Text>
          <Text style={{ padding: 20, paddingTop: 0, fontWeight: '500' }}>{I18n.t("Earn a scratch card each user you reffer")}</Text>
          </View>
         
       
          <View style={{ flex: 1, marginLeft: 20,marginTop:10 }}>
            
            <Image source={require('../assets/scratchcard.png')} style={{ height: 55, width: 50,borderRadius:0 }} />
            <Text style={{fontSize:5,marginLeft:5}}>{I18n.t("Scratch card")}</Text>
          </View>
        </View>
        <View>
          <View style={{borderBottomColor:"#f2f2f2",borderBottomWidth:1,marginLeft:10,marginRight:10}}/>
        </View>
        <View style={{flexDirection:'row',marginTop:15}}>
          <View style={{flex:1,marginLeft:50,borderRadius:30}}>
            <View style={{width:40}}>
            
            <Image source={require("../assets/bottomicons/b3b.png")} style={{ height: 35, width: 35 }} />
            {/* <Text style={{width:30,color:'#fff',padding:10,marginLeft:5}}>1</Text> */}
            </View>
            <Text style={{marginLeft:-30,fontSize:12}}>{I18n.t("Ask user to post a")} </Text>
            <Text style={{fontSize:12}}>{I18n.t("spaark")}</Text>
        
          </View>
          <View style={{flex:1,borderRadius:30,marginLeft:20,}}>
            <View style={{width:40,marginLeft:10}}>
            {/* <Text style={{width:30,color:'#fff',padding:10,marginLeft:5}}>2</Text> */}
            
            <Image source={require("../assets/icons/t1.png")} style={{ height: 35, width: 35 }} />
            </View>
            <Text style={{marginLeft:-10,fontSize:12}}>{I18n.t("Ask the user to show QR Code")}</Text>
          </View>
          <View style={{flex:1,borderRadius:30,marginLeft:20,}}>
            <View style={{width:40,marginLeft:15}}>
            {/* <Text style={{width:30,color:'#fff',padding:10,marginLeft:5}}>3</Text> */}
            <Image source={require('../assets/icons/login_3.png')} style={{ height: 35, width: 35 }} />
            </View>
            <Text style={{fontSize:12}}>{I18n.t("Scratch card")}</Text>
            <Text style={{fontSize:12}}>{I18n.t("and earn money")}</Text>
          </View>
        </View>
        <View>
          <Text style={{fontSize:6,position:'absolute',right:0,top:30,right:10}}>* {I18n.t("T&C Apply")}</Text>
        </View>
      </View>

:route.params.finalType == 'Web Login'?
<View style={{ height: 200, backgroundColor: '#fff', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
<View style={{ flexDirection: 'row' }}>
  <View>
  
  <Text style={{ padding: 20,paddingBottom:5, fontWeight: '700' }}>{I18n.t("Steps to use spaarks web")}</Text>
  <Text style={{ padding: 20, paddingTop: 0, fontWeight: '500' }}>spaarksweb.com</Text>
  </View>
 

  <View style={{ flex: 1, marginLeft: 70,marginTop:10 }}>
    
    <Image source={require('../assets/icons/login_1.png')} style={{ height: 60, width: 60,borderRadius:0 }} />
    {/* <Text style={{fontSize:5,marginLeft:5}}>Web login</Text> */}
  </View>
</View>
<View>
  <View style={{borderBottomColor:"#f2f2f2",borderBottomWidth:1,marginLeft:10,marginRight:10}}/>
</View>
<View style={{flexDirection:'row',marginTop:15}}>
  <View style={{flex:1,marginLeft:50,borderRadius:30}}>
    <View style={{width:40}}>
    
    <Image source={{uri:'https://cdn2.iconfinder.com/data/icons/basic-thin-line-color/21/18-512.png'}} style={{ height: 35, width: 35 }} />
    {/* <Text style={{width:30,color:'#fff',padding:10,marginLeft:5}}>1</Text> */}
    </View>
    <Text style={{marginLeft:0,fontSize:12}}>{I18n.t("Go to")} </Text>
    <Text style={{fontSize:12,marginLeft:-25}}>spaarksweb.com</Text>

  </View>
  <View style={{flex:1,borderRadius:30,marginLeft:20,}}>
    <View style={{width:40,marginLeft:15}}>
    {/* <Text style={{width:30,color:'#fff',padding:10,marginLeft:5}}>2</Text> */}
    
    <Image source={require("../assets/login_with.png")} style={{ height: 35, width: 95,resizeMode:'center',marginLeft:-25 }} />
    </View>
    <Text style={{marginLeft:25,fontSize:12}}>{I18n.t("Click")}</Text>
    <Text style={{marginLeft:3,fontSize:12}}>{I18n.t("login with QR")}</Text>
  </View>
  <View style={{flex:1,borderRadius:30,marginLeft:20,}}>
    <View style={{width:40,marginLeft:15}}>
    {/* <Text style={{width:30,color:'#fff',padding:10,marginLeft:5}}>3</Text> */}
    <Image source={require('../assets/logo.png')} style={{ height: 40, width: 40,resizeMode:'cover' }} />
    </View>
    <Text style={{marginLeft:15,fontSize:12}}>{I18n.t("Bigger")} </Text>
    <Text style={{marginLeft:2,fontSize:12}}>{I18n.t("Experience")}</Text>
  </View>
</View>
<View>
  {/* <Text style={{fontSize:6,position:'absolute',right:0,top:30,right:10}}>* T&C Apply</Text> */}
</View>
</View>

:<></>
}
    </View>
  );
};


const mapStatetoProps = (state) => {
  // const { }=state

  return {
    profilePic: state.chatss.profilePic,
    token: state.chatss.token,
    name: state.chatss.name,
    userId: state.chatss.userId,
    isConnected: state.chatss.isConnected
  };
};
export default connect(mapStatetoProps)(ScanQrScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', textAlign: 'center', justifyContent: 'center', alignItems: 'center'
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    zIndex: 1,
    height: 50,
    padding: 32,
    color: '#fff'
  },
  textBold: {
    fontWeight: '500',
    color: '#fff',
    zIndex: 1,

  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  centeredView: {
    flex: 1,
    // justifyContent:'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
