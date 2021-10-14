import React, { useState,useEffect,useRef } from "react";
import { View, Text, Button, StyleSheet, Image,ScrollView,Platform,Alert,ActionSheetIOS,FlatList,Pressable } from "react-native";
import Textarea from "react-native-textarea";
import moment from 'moment';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
// import { Constants, Permissions } from 'expo';
import ImagePicker from "react-native-customized-image-picker";
import {request,check,PERMISSIONS,requestMultiple} from 'react-native-permissions';
import { connect, useDispatch, useReducer } from "react-redux";
import chatReducers from "../reducers/chatReducers";
import I18n from "../src/i18n"
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { TouchableOpacity } from "react-native";
const GLOBAL = require('../Globals');
const SendChatRequest = ({navigation,route,allPosts,profilePic,name}) => {
  var radio_props = [
    { label: "YES", value: true },
    { label: "NO", value: false },
  ];

  const [contnt, setContent] = useState(null);
  const [showName, setShowName] = useState(true);
  const [showPhoto, setShowMyPhoto] = useState(true);
const [imagesupload,setUpload] = useState([])

async function deleteImage(path,mediaType){
  if(mediaType == 1){

  }else{
    // setUploadVideo([])
  }
  // const newImages =  () => setUpload(imagesupload.filter((item) => item.path !== path));
  console.log(imagesupload)
  console.log('-------------')
  console.log(path)
  if(mediaType == 1){
    const newImages =  imagesupload.filter((item) => item.uri !== path);
    setUpload(newImages)
  }else{
    const newImages =  imagesupload.filter((item) => item.path !== path);
    setUpload(newImages)
  }


  }
  // const [showName, setShowMyName] = useState(true);
  // PERMISSIONS.IOS.CAMERA;
  const pickImageLibrary = async () => {
    // if (route.params.mediaV.length > 0) {
    //   var remainingP = 3 - route.params.mediaP.length;
    // } else {
    //   var remainingP = 4 - route.params.mediaP.length;
    // }

    navigation.navigate("SelectImages", {
      content: 'hiiii',
      questionNo: '2',
      from: "greetRequest",
      assetsType: ["photo"],
      mediaP: [],
      mediaV: 0,
      maxSelections: 1,
    });
  };

  
  useEffect(() => {
    (async () => {
      console.log("Innnnnnnnn")
      // request(PERMISSIONS.PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
      //   console.log("Got Access")
      //   // …
      // });
      // request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
      //   console.log('Results',result)
      //   // …
      // });
      // request(PERMISSIONS.IOS.MEDIA_LIBRARY).then((result) => {
      //   console.log('Results',result)
      //   // …
      // });
      // check(PERMISSIONS.IOS.CAMERA).then((result) => {
      //   switch (result) {
      //     case 'unavailable':
      //       console.log('This feature is not available (on this device / in this context)');
      //       request(PERMISSIONS.IOS.CAMERA).then((result) => {
      //         console.log('Results',result)
      //         // …
      //       });
      //       break;
      //     case 'denied':
      //       console.log('The permission has not been requested / is denied but requestable');
      //       request(PERMISSIONS.IOS.CAMERA).then((result) => {
      //         console.log('Results',result)
      //         // …
      //       });
      //       break;
      //     case 'limited':
      //       console.log('The permission is limited: some actions are possible');
      //       break;
      //     case 'granted':
      //       console.log('cam The permission is granted');
      //       break;
      //     case 'blocked':
      //       console.log('The permission is denied and not requestable anymore');
      //       break;
      //   }
      // })
      // .catch((error) => {
      //   // …
      //   console.log('Err',error)
      // });
      requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]).then((statuses) => {
        console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
        console.log('PHOTO_LIBRARY', statuses[PERMISSIONS.IOS.PHOTO_LIBRARY]);
        // console.log('MEDIA_LIBRARY', statuses[PERMISSIONS.IOS.MEDIA_LIBRARY]);
      });

      // check(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
      //   switch (result) {
      //     case 'unavailable':
      //       console.log('photo This feature is not available (on this device / in this context)');
      //       request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
      //         console.log('Results',result)
      //         // …
      //       });
      //       break;
      //     case 'denied':
      //       console.log('photo The permission has not been requested / is denied but requestable');
      //       request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
      //         console.log('Results',result)
      //         // …
      //       });
      //       break;
      //     case 'limited':
      //       console.log(' photo The permission is limited: some actions are possible');
      //       break;
      //     case 'granted':
      //       console.log('photo The permission is granted');
      //       break;
      //     case 'blocked':
      //       console.log('photo The permission is denied and not requestable anymore');
      //       break;
      //   }
      // })
      // .catch((error) => {
      //   // …
      //   console.log('Err',error)
      // });

      // check(PERMISSIONS.IOS.MEDIA_LIBRARY).then((result) => {
      //   switch (result) {
      //     case 'unavailable':
      //       console.log('MEDIA_LIBRARY This feature is not available (on this device / in this context)');
      //       break;
      //     case 'denied':
      //       console.log('MEDIA_LIBRARY The permission has not been requested / is denied but requestable');
      //       request(PERMISSIONS.IOS.MEDIA_LIBRARY).then((result) => {
      //         console.log('Results',result)
      //         // …
      //       });
      //       break;
      //     case 'limited':
      //       console.log('MEDIA_LIBRARY The permission is limited: some actions are possible');
      //       break;
      //     case 'granted':
      //       console.log('MEDIA_LIBRARY The permission is granted');
      //       break;
      //     case 'blocked':
      //       console.log('MEDIA_LIBRARY The permission is denied and not requestable anymore');
      //       break;
      //   }
      // })
      // .catch((error) => {
      //   // …
      //   console.log('Err',error)
      // });
    
      if (Platform.OS !== "web") {
        // Permissions.askAsync(Permissions.CAMERA)

        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
          console.log("Not granted")
          Alert("Sorry, we need camera roll permissions to make this work!");
        }else{
          console.log("Granted")
        }
      }
    })();
  }, []);


  const Chatdispatchers = useDispatch(chatReducers);
async function sendRequest(){
  var uservisibility = {
    name: showName,
    profilePic: showPhoto
  };


  // var newImag = []
  // var cou = 1;
  // showPhoto.forEach(list=>{
  //   var photo = {
  //     uri: list.path,
  //     mimetype: "image/jpeg",
  //     name: `image-${cou}-ios.jpeg`,
  //     mediaType:list.mediaType
  //   };
  //   newImag.push(photo)
  //   cou++;
  // })
 
  // setUpload(newImag)
  const formData = new FormData();
  console.log(imagesupload)
  var photoes = [];
  if (imagesupload.length) {
    imagesupload.forEach((list) => {
      formData.append("photo", list);
    });
  }



  var latitudes = await AsyncStorage.getItem('latitude');
  var longitudes = await AsyncStorage.getItem('longitude');
  formData.append("content", contnt);
  // formData.append("video", route.params.video);
  formData.append("uservisibility[name]", uservisibility.name);
  formData.append("uservisibility[profilePic]", uservisibility.profilePic);
  console.log("formData", formData);
  // navigation.navigate("Market", {
  //   setLoading: "true",
  //   message: "Post Created Succesfully",
  //   showTag: true,
  // });
  console.log(`${GLOBAL.BASE_URL}greet/greetRequest/${route.params.post._id}`)
  var jwt = await AsyncStorage.getItem('token');
  await axios
    .post(
      `${GLOBAL.BASE_URL}greet/greetRequest/${route.params.post._id}`,
      formData,
      {
        // await axios.post(`http://192.168.0.254:3012/api/v2.0/${route.params.featureName}/post`,formData,{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
          'Bearer '+jwt
        },
      }
    )
    .then((resp) => {
      console.log('GREET',resp.data)
      alert('Requested Succesfully')
      navigation.popToTop()
    });
}
var textinput = useRef();

  // function showImageSelection() {
  //   ActionSheetIOS.showActionSheetWithOptions(
  //     {
  //       options: [I18n.t("Cancel"), I18n.t("Library"), I18n.t("Camera")],
  //       // destructiveButtonIndex: 2,
  //       cancelButtonIndex: 0,
  //       userInterfaceStyle: "dark",
  //     },
  //     (buttonIndex) => {
  //       if (buttonIndex === 0) {
  //         // cancel action
  //       } else if (buttonIndex === 1) {
  //         console.log("In Library");

  //         pickImageLibrary();
  //       } else {
  //         console.log("In Camera");
  //         pickImageCamera();
  //       }
  //     }
  //   );
  // }



  function showImageSelection() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [I18n.t("Cancel"), I18n.t("Library"), I18n.t("Camera")],
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
      },
     
      
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
      
            // var remainingP = 4 - imagesupload.length;
          
          console.log("In Library");
          // pickImageLibrary();
           await ImagePicker.openPicker({
        multiple: true,
        // maxSize:remainingP,
        maxSize: 1,

        // width: 20,
        // height: 20
      }).then(images => {
        console.log('yiuytyuytyuytyuytyuytyuy',images);
        // alert(images.length)
        var imagesuploads = [...imagesupload,...images]
        var newImag = []
        var cou = 1;
        imagesuploads.forEach(list=>{
          var photo = {
            uri: list.path,
            mimetype: "image/jpeg",
            name: `image-${cou}-ios.jpeg`,
            mediaType:list.mediaType
          };
          newImag.push(photo)
          cou++;
        })
       
        setUpload(newImag)
        // setImagesss(images)
        // setLongitude(images)
      })
        } else if(buttonIndex == 2) {
          console.log("In Camera");
          // pickImageCamera();
          await ImagePicker.openCamera({
            width: 20,
            height: 20,
          }).then(images => {
        console.log('HBHBHBH',images)
        var imagesuploads = [...imagesupload,...images]
        var newImag = []
        var cou = 1;
        imagesuploads.forEach(list=>{
          var photo = {
            uri: list.path,
            mimetype: "image/jpeg",
            name: `image-${cou}-ios.jpeg`,
          };
          newImag.push(photo)
          cou++;
        })
       
        setUpload(newImag)
          });
          
        }
        else {

        }
      }
    );
  }





  return (

      <ScrollView>
    <View style={styles.container}>
      {/* <Text style={{fontWeight:'bold',padding:12,fontSize:18}}>SendChatRequest</Text> */}
      <View
        style={{
          margin: 15,
          padding: 10,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: "#D7D7D7",
        }}
      >
        {/* <TouchableOpacity onPress={()=>textinput.focus()}> */}
        <View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            {
              showPhoto?
            <Image
              source={{
                uri:
                profilePic,
              }}
              style={{
                height: 70,
                width: 70,
                borderRadius: 50,
                margin: 10,
              }}
            ></Image>
            : <Image
            source={require('../assets/anonymous.png')}
            style={{
              height: 70,
              width: 70,
              borderRadius: 50,
              margin: 10,
            }}
          ></Image>
                }
          </View>

          <View
            style={{
              flex: 10,
              paddingLeft: 70,
              paddingTop: 20,
              fontSize: 20,
            }}
          >
            {
              showName?
            <Text style={{ fontWeight: "bold" }}>{name}</Text>
            :            <Text style={{ fontWeight: "bold" }}>{I18n.t("Anonymous")}</Text>
            }
            <Text style={{ marginTop: 5 }}>{moment(Date.now()).format('L')}</Text>
          </View>
        </View>
        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.textarea}
          ref={ref => {
            textinput = ref;
          }}
          maxLength={250}
          value={contnt}
          onChangeText={setContent}
          placeholder={
            "Write your Message here"
          }
          placeholderTextColor={"#c7c7c7"}
          underlineColorAndroid={"transparent"}
        />
                      </View>   
                      {/* </TouchableOpacity> */}
                         <FlatList
      data={imagesupload}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, i }) => (
        <>
     
        <View style={{margin:15}}>
        <Image
          source={{ uri: item.uri }}
          style={{height:60,width:60}}
        />
        <View>
        {/* <TouchableOpacity onPress={()=>deleteImage(item.path)}>  */}
        {/* <TouchableOpacity> */}
        
          
          <Pressable onPress={()=>deleteImage(item.mediaType == 1?item.uri:item.path,item.mediaType)}>

        

        <Image
          source={{ uri: 'https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/38-512.png' }}
          style={{height:15,width:15,position:'absolute',left:50,top:-5}}
        />
        </Pressable>
      
        </View>

        </View>

        </>
      )}/>
        <View
          style={{
            marginTop: 5,
            marginLeft: 0,
            marginRight: 0,
            borderBottomColor: "#EAEAEA",
            borderBottomWidth: 0.6,
          }}
        />

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {
          imagesupload.length == 1?
          <>
           <Image
            source={require("../assets/icons/infoimages.png")}
            style={{ height: 20, width: 20, marginTop: 15, marginRight: 5 }}
          ></Image>
          <Text
            onPress={()=>alert('Maximum 1 Image')}
            style={{
              color: "#f2f2f2",
              fontWeight: "bold",
              fontSize: 14,
              marginTop: 18,
            }}
          >
        {I18n.t("Add Image")}
          </Text>
          </>
          :
          <>
          <Image
          source={require("../assets/icons/infoimages.png")}
          style={{ height: 20, width: 20, marginTop: 15, marginRight: 5 }}
        ></Image>
        <Text
          onPress={showImageSelection}
          style={{
            color: "#6FA4E9",
            fontWeight: "bold",
            fontSize: 14,
            marginTop: 18,
          }}
        >
      {I18n.t("Add Image")}
        </Text>
        </>
        }
        
         



        </View>
      </View>
      <Text
        style={{ fontWeight: "bold", padding: 15, fontSize: 14, paddingTop: 0 }}
      >
        {I18n.t("Connection Permissions")}
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 0,
          borderRadius: 20,
          borderRadius: 15,
          borderWidth: 1,
          margin: 10,
          borderColor: "#D7D7D7",
        }}
      >
        <View style={{ flex: 2, color: "#000" }}>
          <Image
            source={require("../assets/icons/name_visibility.png")}
            style={{
              marginLeft: 10,
              marginTop: 10,
              height: 60,
              width: 60,
              borderRadius: 20,
            }}
          ></Image>
        </View>
        <View style={{ flex: 7, padding: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginLeft: 0,
                  marginTop: 10,
                }}
              >
                {I18n.t("Show my Name")}
              </Text>
            </View>

            <View style={{ justifyContent: "flex-end" }}>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                style={{ marginLeft: 40 }}
                formHorizontal={true}
                labelHorizontal={false}
                borderWidth={1}
                buttonColor={"#6FA4E9"}
                onPress={(value) => setShowName(value)}
              />
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 0,
          borderRadius: 20,
          borderRadius: 15,
          borderWidth: 1,
          margin: 10,
          borderColor: "#D7D7D7",
        }}
      >
        <View style={{ flex: 2, color: "#000" }}>
          <Image
            source={{
              uri:
              profilePic,
            }}
            style={{
              marginLeft: 10,
              marginTop: 10,
              height: 60,
              width: 60,
              padding:10,
              borderRadius: 20,
            }}
          ></Image>
        </View>
        <View style={{ flex: 7, padding: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginLeft: 0,
                  marginTop: 10,
                }}
              >
                {I18n.t("Show profile pic")}
              </Text>
            </View>

            <View style={{ justifyContent: "flex-end" }}>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                style={{ marginLeft: 40 }}
                formHorizontal={true}
                labelHorizontal={false}
                borderWidth={1}
                buttonColor={"#6FA4E9"}
                onPress={(value) => setShowMyPhoto(value)}
              />
            </View>
          </View>
        </View>
      
      </View>
      <View>
         <Text style={{padding:10,fontWeight:'bold',textAlign:'center'}}>{I18n.t("The way of connection you choose now, will always remain same with this user")}.</Text>
       </View>
      <View style={{backgroundColor:'#6FA4E9',padding:10,margin:10,justifyContent:'center'}}>
            <Text style={{color:'#fff',textAlign:'center'}} onPress={()=>{sendRequest()}}>{I18n.t("Send Request")}</Text>
        </View>
    </View>
    </ScrollView>
  );
};

const mapStatetoProps = (state) => {
  return {
    allPosts:state.chatss.allPosts,
    profilePic:state.chatss.profilePic,
    name:state.chatss.name
  };
};
export default connect(mapStatetoProps)(SendChatRequest);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
