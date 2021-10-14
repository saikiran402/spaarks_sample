import React, { Component, useState, useEffect, useRef } from "react";
import {
  View,
  ActionSheetIOS,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Animated,
  ScrollView,
  FlatList,
  Pressable,
  Linking,
  Platform,
  Dimensions,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { TextInput } from 'react-native-paper';
import RNLocation from 'react-native-location';
import Video from 'react-native-video';
import { Thumbnail } from 'react-native-thumbnail-video';
import I18n from '../src/i18n';
import moment from "moment";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar
} from "react-native-paper";
const GLOBAL = require('../Globals');
// import RadioButtonRN from "radio-buttons-react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import Textarea from "react-native-textarea";
import Constants from "expo-constants";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Switch } from "react-native-paper";
// import { Slider } from 'react-native-elements';
import Slider from "@react-native-community/slider";
import ImagePicker from "react-native-customized-image-picker";
import axios from "axios";
// import { Dimensions } from "react-native";
// import { Video } from "expo-av";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import AsyncStorage from "@react-native-community/async-storage";
// export default function NewInfoStepperScreen({ navigation, route }) {
  const windowHeight = Dimensions.get('window').height;

const NewPollStepperScreen = ({
  navigation,
  route,
  chat_roster_main,
  chat_roster_anonymous,
  messagess,
}) => {
  var radio_props = [
    { label: "ON", value: true },
    { label: "OFF", value: false },
  ];
  const video = React.useRef(null);
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [text4, setText4] = useState("");

    const [questionsSize, setQuestionsSize] = useState([1,2]);
  // const [video, setVideo] = useState([]);
  // const [isCallOn, setIsSwitchOn] = useState(true);
  const [isChatOn, setIsChatOn] = useState(true);
  const [isCallOn, setIsCallOn] = useState(true);
  const [isNormalCallOn, setIsNormalCallOn] = useState(true);
  const [isMapOn, setIsMapOn] = useState(true);
  const [distanceSlider, setDistanceSlider] = useState(5);


  async function addQuestion(){
      if(questionsSize.length == 2){

         var a = [1,2,3]
        //   a.push(3)
          setQuestionsSize(a)
      }else{
     
        var a = [1,2,3,4]
        setQuestionsSize(a)
      }
  }

  async function removeOption(indexToRemove){
      var a = [];
      var i=1;
      questionsSize.forEach(list=>{
          console.log('hbhbh',i,indexToRemove)
          if(indexToRemove == 3){
            setText3(text4)
            setText4("")
          }
          if(i != indexToRemove){
            console.log('inside',i,indexToRemove)
            a.push(list)
          }
          i++;
      })
      setQuestionsSize(a)
  }
  function updateText(a) {
    setContent(a);
  }

  // const onSubmitSteps = async () => {
  //   // console.log('Image',image);
  //   // console.log('content',content);
  //   // console.log('images',images);
  //   // console.log('video',video);
  //   // console.log('isCallOn',isCallOn);
  //   // console.log('isChatOn',isChatOn);
  //   // console.log('isMapOn',isMapOn);
  //   // console.log('distanceSlider',distanceSlider);
  //   // console.log('question',route.params.question);
  //   // console.log('category',route.params.category);
  //   // console.log('subcategory',route.params.subcategory);
  //   console.log("Market");
  //   var uservisibility = {
  //     name: "Saikiran",
  //     profilePic: "https://static-content.spaarksweb.com",
  //     gender: "Male",
  //     location: String(isMapOn),
  //     chat: String(isChatOn),
  //     phoneCall: String(isCallOn),
  //     email: "true",
  //   };
  //   const formData = new FormData();
  //   var photoes = [];
  //   if (images.length) {
  //     images.forEach((list) => {
  //       formData.append("photo", list);
  //     });
  //   }

  //   formData.append("content", content);
  //   formData.append("video", video);
  //   formData.append("uservisibility[name]", uservisibility.name);
  //   formData.append("uservisibility[profilePic]", uservisibility.profilePic);
  //   formData.append("uservisibility[gender]", uservisibility.gender);
  //   formData.append("uservisibility[location]", uservisibility.location);
  //   formData.append("uservisibility[chat]", uservisibility.chat);
  //   formData.append("uservisibility[phoneCall]", uservisibility.phoneCall);

  //   formData.append("radius", 5);
  //   formData.append("question", route.params.question);
  //   formData.append("questionNo", route.params.questionNo);
  //   formData.append("category", route.params.category);
  //   formData.append("categoryId", route.params.categoryId);
  //   formData.append("subCategoryId", route.params.subCategoryId);
  //   formData.append("subCategory", route.params.subCategory);
  //   formData.append("isProvider", "true");
  //   formData.append("locationStatic[coordinates]", 78.4437);
  //   formData.append("locationStatic[coordinates]", 17.4079);
  //   formData.append("locationStatic[type]", "Point");
  //   console.log("formData", formData);

  //   await axios
  //     .post(
  //       `${GLOBAL.BASE_URL}${route.params.featureName}/post`,
  //       formData,
  //       {
  //         // await axios.post(`http://192.168.0.254:3012/api/v2.0/${route.params.featureName}/post`,formData,{
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization:
  //           GLOBAL.TOKEN._W
  //         },
  //       }
  //     )
  //     .then((resp) => {
  //       console.log(resp.data.message);
  //       navigation.navigate("Details", {
  //         setLoading: "true",
  //         message: "Post Created Succesfully",
  //         showTag: true,
  //       });
  //     }) 
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // function detetePhoto(uri) {}

  // function setDist(s) {
  //   setDistanceSlider(s);
  // }
  
  

  const NewInfoReducer = (prevState, action) => {
    switch (action.type) {
      case "SETIMAGES":
        setImages(action.images);
        return {
          ...prevState,
          images: action.images,
          isLoading: false,
        };

      case "SETVIDEOS":
        return {
          ...prevState,
          videos: action.videos,
          isLoading: false,
        };
    }
  };

  const initialState = {
    isLoading: false,
    images: [],
    videos: [],
    content: "",
    isCallOn: true,
    isChatOn: true,
    isMapOn: true,
    distanceSlider: 5,
  };
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [longitude, setLatitude] = React.useState(null);
  // const [latitude, setLongitude] = React.useState([]);
    const [mediaP, setMediaPs] = React.useState([]);

  const [NewInfoState, dispatch] = React.useReducer(
    NewInfoReducer,
    initialState
  );

  // async function deletePhoto(photo) {
  //   var imag = NewInfoState.images.filter((item) => item.uri != photo.uri);
  //   console.log(imag);
  //   dispatch({ type: "SETIMAGES", images: imag });
  // }

  if (route.params.mediaP.length > 0) {
    // setSelectedImages(route.params.media)
    console.log(route.params.mediaP);
    // setSelectedImages(route.params.media);
  }

  // async function setSelectedImages(mediaP) {
  //   console.log("Media", media);
  //   // setImage(result);
  //   var imag = [];
  //   imag = images;
  //   media.forEach((list) => {
  //     var photo = {
  //       uri: list.uri,
  //       mimetype: "image/jpeg",
  //       name: "image.jpeg",
  //     };
  //     imag.push(photo);
  //   });
  //   setImages(imag);
  //   //
  //   // dispatch({ type: "SETIMAGES", images: imag });
  // }
    const [imagesss, setImagesss] = React.useState([]);
  // const pickImageLibrary = async () => {
  //   if (route.params.mediaV.length > 0) {
  //     var remainingP = 3 - route.params.mediaP.length;
  //   } else {
  //     var remainingP = 4 - route.params.mediaP.length;
  //   }
      

  //   // navigation.navigate("SelectImages", {
  //   //   content: content,
  //   //   question: route.params.question,
  //   //   questionNo: route.params.questionNo,
  //   //   category: route.params.category,
  //   //   categoryId: route.params.categoryId,
  //   //   subCategoryId: route.params.subCategoryId,
  //   //   subCategory: route.params.subCategory,
  //   //   from: "newInfoP",
  //   //   assetsType: ["photo"],
  //   //   mediaP: route.params.mediaP,
  //   //   mediaV: route.params.mediaV,
  //   //   maxSelections: remainingP,
  //   // });
  // };
  // const pickVideoLibrary = async () => {
  //   navigation.navigate("SelectImages", {
  //     content: content,
  //     question: route.params.question,
  //     questionNo: route.params.questionNo,
  //     category: route.params.category,
  //     categoryId: route.params.categoryId,
  //     subCategoryId: route.params.subCategoryId,
  //     subCategory: route.params.subCategory,
  //     from: "newInfoV",
  //     assetsType: ["video"],
  //     mediaP: route.params.mediaP,
  //     mediaV: route.params.mediaV,
  //     maxSelections: 1,
  //   });
  // };

  // const pickVideoCamera = async () => {
  //   // let result = await ImagePicker.launchCameraAsync({
  //   //   mediaTypes: ImagePicker.MediaTypeOptions.All,
  //   //   allowsEditing: true,
  //   //   aspect: [4, 3],
  //   //   quality: 1,
  //   // });

  //   // console.log(result);
  //   // if (!result.cancelled) {
  //   //   setImage(result);
  //   //   var photo = {
  //   //     uri: result.uri,
  //   //     mimetype: "video/mp4",
  //   //     name: "vide_ios.jpeg",
  //   //   };
  //   //   route.params.mediaV.push(result);
  //   //   var allImages = await images.push(result.uri);
  //   //   setImages(images);
  //   //   dispatch({ type: "SETIMAGES", images: images });
  //   //   console.log("asas");
  //   //   console.log("allImages", images);
  //   //   console.log("NewInfoState", NewInfoState.images);
  //   // }

  //   setTimeout(() => {}, 3000);
  // };
  const pickImageCamera = async () => {
    let result =  await  ImagePicker.openCamera({
          }).then(imagessss => {
            console.log('22222222',imagessss);

      // setImage(image);
      var photo = {
        uri: imagessss[0].path,
        mimetype: "image/jpeg",
        name: "image_ios.jpeg",
      };
      var a = [];
      a.push(photo)
      setMediaP(a)
      console.log('67897689689686ssss',a,mediaP)
      // route.params.mediaP.push(photo);
      // var allImages = await images.push(image.uri);
      // setImages(images);
      // dispatch({ type: "SETIMAGES", images: images });
      // console.log("asas");
      // console.log("allImages", images);
      // console.log("NewInfoState", NewInfoState.images);
    
          });
  };
const [imagesupload,setUpload] = useState([])
const [canselectImage,setCanSelectImage] = useState(true)
// var [imagesRemaining,setRemainienng] = useState(4)
var [imagesRemaining,setRemaining] = useState(4)

var [videoRemaining,setVideoRemaining] = useState(1)
const [canselectVideo,setCanSelectVideo] = useState(true)
const [videoupload,setUploadVideo] = useState([])
const [videoSelected,setVideoSelected] = useState(false)
const [videoUriPreview,setSelectedVideo] = useState('')

  function showImageSelection() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [I18n.t("Cancel"), I18n.t("Library"), I18n.t("Camera")],
        cancelButtonIndex: 0,
        userInterfaceStyle: "light",
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
        maxSize: imagesRemaining,

        // width: 20,
        // height: 20
      }).then(images => {
        console.log('yiuytyuytyuytyuytyuytyuy',images);
        // alert(images.length)
        var rem = imagesRemaining - images.length;
        setRemaining(rem)
        if(images.length == 4){
          setCanSelectImage(false)
        }

        // alert(images.length)
        // var imagesuploads = [...imagesupload,...images]
        // var newImag = []
        // var cou = 1;
        // imagesuploads.forEach(list=>{
        //   var photo = {
        //     uri: list.path,
        //     mimetype: "image/jpeg",
        //     name: `image-${cou}-ios.jpeg`,
        //     mediaType:list.mediaType
        //   };
        //   newImag.push(photo)
        //   cou++;
        // })
        var newUploads = [...imagesupload]
        images.forEach(list=>{
          var photo = {
            uri: list.path,
            mimetype: "image/jpeg",
            name: `image-${Math.random()}-ios.jpeg`,
            mediaType:list.mediaType
          };
          newUploads.push(photo)
        })
          
        console.log('AFTER LIB',newUploads)
        setUpload(newUploads)
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
        
        var imagesuploads = [...imagesupload]
        var newImag = []
        var cou = 1;

        images.forEach(list=>{
          var photo = {
            uri: list.path,
            mimetype: "image/jpeg",
            name: `image-${cou}-ios.jpeg`,
            mediaType:list.mediaType
          };
          imagesuploads.push(photo)
          cou++;
        })
        console.log('AFTER CAM',imagesuploads)
        setUpload(imagesuploads)
            setRemaining(imagesRemaining-1)
          });
          
        }
        else {

        }
      }
    );
  }

  async function showVideoSelection() {
    await launchImageLibrary({mediaType:'video'},(image,didCancel)=>{
      console.log('callback',image)
      if(!image.didCancel){
      var videee = [];
        var video = {
          uri: image.uri,
          mimetype: "video/mp4",
          name: "video_ios.mp4",
        };
        console.log('SELECTED')
        videee.push(video)
        setSelectedVideo(image.uri)
        console.log(image.uri)
        setVideoSelected(true)
        setUploadVideo(videee)
        setCanSelectVideo(false)
          var photo = {
            uri: image.uri,
            mimetype: "video/mp4",
            name: `ios-video.mp4`,
            mediaType:2
          };
          imagesupload.push(photo)
          // alert('Here')
          setVideoRemaining(0)
        setUpload(imagesupload)

        console.log("videouploaded")
      }
        // console.log('videoupload[0].urisssss',videoupload[0])
    })
    // await ImagePicker.openPicker({
    //   maxSize:1,
    //   isVideo:true,
    //   title:'Spaarks Media',
    //   mediaType: 2, 
    // }).then(images => {
    //   console.log('videovideovideovideovideo',images);
    //   // alert(images.length)
    //   // setUploadVideo(images)
    //   var videee = [];
    //   // var newvid = [{"height": images[0].height, "mediaType": 2, "path": images[0].coverUri, "size": images[0].size, "width": images[0].width}]
    //   // var imagesuploads = [...imagesupload,...newvid]
    //   images.forEach(list=>{
    //     var video = {
    //       uri: list.path,
    //       mimetype: "video/mp4",
    //       name: "video_ios.mp4",
    //     };
    //     console.log('SELECTED')
    //     videee.push(video)
    //   })
    
    //   // setUpload(imagesuploads)
    //   setUploadVideo(videee)
    //   // setImagesss(images)
    //   // setLongitude(images)
    // });

  }

  // function onDeleteImage(im) {
  //   var img = [];
  //   route.params.mediaP.forEach((list) => {
  //     if (list.uri == im.uri) {
  //     } else {
  //       img.push(list);
  //     }
  //   });
  //   setImages(img);
  //   route.params.mediaP = img;
  //   dispatch({ type: "SETIMAGES", images: img });
  // }

  // function onDeleteVideo(im) {
  //   var img = [];
  //   route.params.mediaV.forEach((list) => {
  //     if (list.uri == im.uri) {
  //     } else {
  //       img.push(list);
  //     }
  //   });
  //   setImages(img);
  //   route.params.mediaV = img;
  //   dispatch({ type: "SETIMAGES", images: img });
  // }

  function ImagePickerExample() {
    // useEffect(() => {
    //   (async () => {
    //     if (Platform.OS !== "web") {
    //       const {
    //         status,
    //       } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //       if (status !== "granted") {
    //         alert("Sorry, we need camera roll permissions to make this work!");
    //       }
    //     }
    //   })();
    // }, []);

    return (
      <>
        { false ? (
          <></>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, color: "#fff", justifyContent: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/icons/infoimages1.png")}
                  style={styles.chatss}
                ></Image>
                {
                imagesRemaining == 0?
                  <Text
                  onPress={()=>{alert('Max 4 Photos')}}
                  style={{
                    color: '#f2f2f2',
                    fontWeight: "bold",
                    fontSize: 14,
                    marginTop: 22,
                  }}
                >
                  {/* {imagesRemaining} */}
                  {I18n.t("Add Image")} 
                </Text>:

                <Text
                onPress={showImageSelection}
                style={{
                  color: '#74B9FF',
                  fontWeight: "bold",
                  fontSize: 14,
                  marginTop: 22,
                }}
              >
                                  {/* {imagesRemaining} */}
                {I18n.t("Add Image")}
              </Text>
                }
                
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
              </View>
            </View>
            {route.params.mediaV.length == 1 ||
            route.params.mediaP.length == 4 ? (
              <></>
            ) : (
              <View style={{ flexDirection: "row", flex: 2 }}>
                <>
                {
                  route.params.featureName != 'greet'?
                  <>
                  <Image
                  source={require("../assets/icons/infovideo.png")}
                  style={{ marginLeft: 30, height: 20, width: 30, margin: 20 }}
                ></Image>
{
  !canselectVideo?
  <Text
  onPress={()=>alert('Max 1 Video')}
  style={{
    fontWeight: "bold",
    color: "#f2f2f2",
    fontSize: 14,
    marginTop: 22,
  }}
>
  {I18n.t("Add Video")}
</Text>:
 <Text
 onPress={showVideoSelection}
 style={{
   fontWeight: "bold",
   color: "#74B9FF",
   fontSize: 14,
   marginTop: 22,
 }}
>
  {I18n.t("Add Video")}
</Text>
}

</>
                  :<></>
                }
               </>
              </View>
            )
            }
          </View>
        
        
        
        )}
      </>
    );
  }

  // const MySwitch = () => {
  //   const onToggleSwitch = () => setIsCallOn(!isCallOn);

  //   return (
  //     <Switch
  //       value={isCallOn}
  //       onValueChange={onToggleSwitch}
  //       color={"#1A73E9"}
  //     />
  //   );
  // };

  // const MyChats = () => {
  //   const onToggleSwitch = () => setIsChatOn(!isChatOn);


  //   return (
  //     <Switch
  //       value={isChatOn}
  //       onValueChange={onToggleSwitch}
  //       color={"#1A73E9"}
  //     />
  //   );
  // };

  // const MyMaps = () => {
  //   const onToggleSwitch = () => setIsMapOn(!isMapOn);

  //   return (
  //     <Switch
  //       value={isMapOn}
  //       onValueChange={onToggleSwitch}
  //       color={"#1A73E9"}
  //     />
  //   );
  // };

  // const navigationOptions = {
  //   header: null,
  // };

  // const defaultScrollViewProps = {
  //   keyboardShouldPersistTaps: "handled",
  //   contentContainerStyle: {
  //     flex: 0,
  //   },
  // };

  // const onNextStep = ({ navigator }) => {
  //   console.log("called next step");
  // };

  // const onPaymentStepComplete = () => {};

  // const onPrevStep = () => {};
var data =[
  "",
  "Write the details you want to Post",
  "I am a plumber i can offer service at any time",
  "I am a tailor i can deliver clothes within 2 days",
  "I am medical pratitioner please ping me in any emergency",
  "Book cab at low prices"
];

// async function setplace(){
//   setInterval(() => {
//     setPlaceholderData(data[Math.floor(Math.random() * 5) + 1])
//   }, 2000);

// // }
//   useEffect(() => {
//       setplace()
//   }, []);
  // const [checked, setChecked] = React.useState("first");
  // const _map = React.useRef(null);
  // const _scrollView = React.useRef(null);
  const [isNormalCalloff,setisNormalCalloff] = useState(false)

  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}
  const nextScreen = () =>{
      console.log(text1,text2,text3,text4)
      if(content == ""){
        alert('Question cant empty')
      }else if(text1 == ""){
          alert('Option 1 cant empty')
        
      }else if(text2 == ""){
        alert('Option 2 cant empty')
      }else if(questionsSize.length == 3 && text3 == ""){
        alert('Option 3 cant empty')
      }else if(questionsSize.length == 4 && text4 == ""){
        alert('Option 4 cant empty')
      }else{
        var pollOptions = []
        var  i = 1;
        questionsSize.forEach(list=>{
            if(i==1){
              var a = {
                  question:text1
              }
            } 
            if(i==2){
              var a = {
                  question:text2
              }
            } 
            if(i==3){
              var a = {
                  question:text3
              }
            } 
            if(i==4){
              var a = {
                  question:text4
              }
            } 
            pollOptions.push(a)
         i++;
        })
  
  
      console.log('pollOptions',pollOptions)
    //   navigation.navigate('NewPollStepperScreen2',{pollOptions:pollOptions,pollQuestion:content,questionNo: 9, question: I18n.t('poll'), excluding: [], featureName: 'showtime', mediaP: [], mediaV: [],images:[],video:[] })
      navigation.navigate('NewPollStepperScreen2',{pollOptions:pollOptions,pollQuestion:content,question:route.params.question,questionNo:route.params.questionNo,category:route.params.category,subCategory:route.params.subCategory,categoryId:route.params.categoryId,subCategoryId:route.params.subCategoryId,images:imagesupload,video:videoupload,featureName:route.params.featureName,isCallOn:isCallOn,isChatOn:isChatOn,content:content.trim(),isPhoneOn:!isNormalCalloff})

      }
    //   formData.append("pollPost", true);
    //   formData.append("pollQuestion", "Who is the Chief minister of Telangana ?");
  
    //   // options.forEach(list=>{
    //   //   formData.append("pollOption[question]", list);
    //   // })
    //   formData.append("pollOption", JSON.stringify(options));
    //   formData.append("expiresIn", 1);
     
    // var grant = false
    // RNLocation.requestPermission({
    //   ios: "whenInUse",
    //   android: {
    //     detail: "coarse"
    //   }
    // }).then(async (granted) => {
    //   grant = granted
    //   if(grant){
    //     if(content || imagesupload.length>0){
    //       console.log(1)
    //       if(content){
    //         console.log(2)
    //         if(content.trim().length> 0 || imagesupload.length>0){
    //           console.log(3)
    //           // alert(isNormalCalloff)
    //           await AsyncStorage.setItem('isAboutToCreate',String(true))
    //           await AsyncStorage.setItem('content',String(content))
    //           await AsyncStorage.setItem('question',String(route.params.question))
    //           await AsyncStorage.setItem('featureName',String(route.params.featureName))
    //           await AsyncStorage.setItem('questionNo',String(route.params.questionNo))
    //           await AsyncStorage.setItem('category',String(route.params.category))
    //           await AsyncStorage.setItem('subCategory',String(route.params.subCategory))
    //           await AsyncStorage.setItem('categoryId',String(route.params.categoryId))
    //           await AsyncStorage.setItem('subCategoryId',String(route.params.subCategoryId))
    //           await AsyncStorage.setItem('skippedCat',String(route.params.skippedCat))
    //           await AsyncStorage.setItem('isTag',String(route.params.isTag))
    //           await AsyncStorage.setItem('skippedSubCat',String(route.params.skippedSubCat))
              
    //           console.log('1.category',route.params.category)
    //           console.log('1.question',route.params.question)
    //           console.log('1.questionNo',route.params.questionNo)
    //           console.log('1.featureName',route.params.featureName)
    //           console.log('1.subCategory',route.params.subCategory)
    //           console.log('1.categoryId',route.params.categoryId)
    //           console.log('1.subCategoryId',route.params.subCategoryId)
    //           console.log('1.skippedCat',route.params.skippedCat)
    //           console.log('1.skippedCat',route.params.skippedCat)
    //           console.log('1.skippedSubCat',route.params.skippedSubCat)
    
    
    //           await AsyncStorage.setItem('isAboutToCreate',String(true))
    //           var a = Date.now()
    //           // var b = new Date(a.getTime() + 1*60000)
    //           // alert(a+1000)
    //           // var reminder = addMinutes(a, 60*24);
    //           await AsyncStorage.setItem('isAboutToCreateTime',String(a+60000))
    //           navigation.navigate('NewInfoStepperScreen2',{question:route.params.question,questionNo:route.params.questionNo,category:route.params.category,subCategory:route.params.subCategory,categoryId:route.params.categoryId,subCategoryId:route.params.subCategoryId,images:imagesupload,video:videoupload,featureName:route.params.featureName,isCallOn:isCallOn,isChatOn:isChatOn,content:content.trim(),isPhoneOn:!isNormalCalloff})
    //         }
    //       }else{
    //         console.log(4)
    //         if(imagesupload.length>0){
    //           console.log(5)
    //           // alert(isNormalCalloff)
    //           await AsyncStorage.setItem('isAboutToCreate',String(true))
    //           await AsyncStorage.setItem('content',"")
    //           await AsyncStorage.setItem('question',String(route.params.question))
    //           await AsyncStorage.setItem('featureName',String(route.params.featureName))
    //           await AsyncStorage.setItem('questionNo',String(route.params.questionNo))
    //           await AsyncStorage.setItem('category',String(route.params.category))
    //           await AsyncStorage.setItem('subCategory',String(route.params.subCategory))
    //           await AsyncStorage.setItem('categoryId',String(route.params.categoryId))
    //           await AsyncStorage.setItem('subCategoryId',String(route.params.subCategoryId))
    //           await AsyncStorage.setItem('skippedCat',String(route.params.skippedCat))
    //           await AsyncStorage.setItem('isTag',String(route.params.isTag))
    //           await AsyncStorage.setItem('skippedSubCat',String(route.params.skippedSubCat))
              
    //           console.log('1.category',route.params.category)
    //           console.log('1.question',route.params.question)
    //           console.log('1.questionNo',route.params.questionNo)
    //           console.log('1.featureName',route.params.featureName)
    //           console.log('1.subCategory',route.params.subCategory)
    //           console.log('1.categoryId',route.params.categoryId)
    //           console.log('1.subCategoryId',route.params.subCategoryId)
    //           console.log('1.skippedCat',route.params.skippedCat)
    //           console.log('1.skippedCat',route.params.skippedCat)
    //           console.log('1.skippedSubCat',route.params.skippedSubCat)
    
    
    //           await AsyncStorage.setItem('isAboutToCreate',String(true))
    //           var a = Date.now()
    //           // var b = new Date(a.getTime() + 1*60000)
    //           // alert(a+1000)
    //           // var reminder = addMinutes(a, 60*24);
    //           await AsyncStorage.setItem('isAboutToCreateTime',String(a+60000))
    //           navigation.navigate('NewInfoStepperScreen2',{question:route.params.question,questionNo:route.params.questionNo,category:route.params.category,subCategory:route.params.subCategory,categoryId:route.params.categoryId,subCategoryId:route.params.subCategoryId,images:imagesupload,video:videoupload,featureName:route.params.featureName,isCallOn:isCallOn,isChatOn:isChatOn,content:"",isPhoneOn:!isNormalCalloff})
    //         }
    //       }
    //     // if(content.trim().length> 0 || imagesupload.length>0){
    //     //   // alert(isNormalCalloff)
    //     //   await AsyncStorage.setItem('isAboutToCreate',String(true))
    //     //   await AsyncStorage.setItem('content',String(content))
    //     //   await AsyncStorage.setItem('question',String(route.params.question))
    //     //   await AsyncStorage.setItem('featureName',String(route.params.featureName))
    //     //   await AsyncStorage.setItem('questionNo',String(route.params.questionNo))
    //     //   await AsyncStorage.setItem('category',String(route.params.category))
    //     //   await AsyncStorage.setItem('subCategory',String(route.params.subCategory))
    //     //   await AsyncStorage.setItem('categoryId',String(route.params.categoryId))
    //     //   await AsyncStorage.setItem('subCategoryId',String(route.params.subCategoryId))
    //     //   await AsyncStorage.setItem('skippedCat',String(route.params.skippedCat))
    //     //   await AsyncStorage.setItem('isTag',String(route.params.isTag))
    //     //   await AsyncStorage.setItem('skippedSubCat',String(route.params.skippedSubCat))
          
    //     //   console.log('1.category',route.params.category)
    //     //   console.log('1.question',route.params.question)
    //     //   console.log('1.questionNo',route.params.questionNo)
    //     //   console.log('1.featureName',route.params.featureName)
    //     //   console.log('1.subCategory',route.params.subCategory)
    //     //   console.log('1.categoryId',route.params.categoryId)
    //     //   console.log('1.subCategoryId',route.params.subCategoryId)
    //     //   console.log('1.skippedCat',route.params.skippedCat)
    //     //   console.log('1.skippedCat',route.params.skippedCat)
    //     //   console.log('1.skippedSubCat',route.params.skippedSubCat)


    //     //   await AsyncStorage.setItem('isAboutToCreate',String(true))
    //     //   var a = Date.now()
    //     //   // var b = new Date(a.getTime() + 1*60000)
    //     //   // alert(a+1000)
    //     //   // var reminder = addMinutes(a, 60*24);
    //     //   await AsyncStorage.setItem('isAboutToCreateTime',String(a+60000))
    //     //   navigation.navigate('NewInfoStepperScreen2',{question:route.params.question,questionNo:route.params.questionNo,category:route.params.category,subCategory:route.params.subCategory,categoryId:route.params.categoryId,subCategoryId:route.params.subCategoryId,images:imagesupload,video:videoupload,featureName:route.params.featureName,isCallOn:isCallOn,isChatOn:isChatOn,content:content.trim(),isPhoneOn:!isNormalCalloff})
    //     // }else{
    //     //   alert(I18n.t('Please enter some content'))
    //     // }
    //   }
    //     else{
    //       alert(I18n.t('Please enter some content'))
    //     }
        
    //   }else{
    //     alert('Please allow location to continue')
    //     setTimeout(() => {
    //       Linking.openURL('app-settings:')
    //     }, 1000);
    //     // Alert.alert(
    //     //   "Please allow location to continue",
    //     //   "Spaarks Need your precise location inorder to create spaark",
    //     //   [
    //     //     {
    //     //       text: "Cancel",
    //     //       onPress: () => console.log("Cancel Pressed"),
    //     //       style: "cancel"
    //     //     },
    //     //     {
    //     //       text: "Allow",
    //     //       onPress: () => Linking.openURL('app-settings:'),
    //     //       style: "cancel"
    //     //     },
    //     //     // { text: "OK", onPress: () => console.log("OK Pressed") }
    //     //   ]
    //     // );
  
  
    //   }

    // });

  
    // console.log('Images',route.par)
    
  }
  const initialMapState = {
    categories: [
      {
        name: "Security Guard",
      },
      {
        name: "Night Duty",
      },
      {
        name: "Watch Man",
      },
    ],
    myLat: {
      coordinate: {
        latitude: 17.4193,
        longitude: 78.4485,
      },
    },
    region: {
      latitude: 17.4193,
      longitude: 78.4485,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

//  const [placeholderData,setPlaceholderData] = useState([])
 
  async function deleteImage(path,mediaType){

    if(mediaType == 1){

    }else{
      // setUploadVideo([])
      setCanSelectVideo(true)
    }
    // const newImages =  () => setUpload(imagesupload.filter((item) => item.path !== path));
    console.log(imagesupload)
    console.log('-------------')
    console.log(path)
    if(mediaType == 1){
      // const newImages =  imagesupload.filter((item) => item.uri !== path);

      var newImages = []
      // setRemaining(imagesRemaining+1)
      imagesupload.forEach(list=>{
        if(list.uri == path){

        }else{
          newImages.push(list)
        }
      })

      setRemaining(imagesRemaining+1)
      if(newImages.length < 4){
        setCanSelectImage(true)
      }
      setUpload(newImages)
    }else{
      var newImages = []
      // setRemaining(imagesRemaining+1)
      imagesupload.forEach(list=>{
        if(list.mediaType == 1){
          newImages.push(list)
        }
      })
      // const newImages =  imagesupload.filter((item) => item.path !== path);
      setUpload(newImages)
    }
 

  }
  

  async function deleteVideos(){
    setUploadVideo([])
  }


  async function setCallStatus(value){
if(!value){
  setIsCallOn(true)
  setisNormalCalloff(true)
}else{
  setisNormalCalloff(false)
}
    setIsNormalCallOn(value)
  }

  // async function deleteVide(path){
  
  //   // const newImages =  () => setUpload(imagesupload.filter((item) => item.path !== path));
  
  //   const new =  videosupload.filter((item) => item.path !== path);
  //   setUpload(newVideos)
  //   }


  // const [state, setState] = React.useState(initialMapState);
  // const [steps, setSteps] = React.useState('step');
  return (
    <>
    <View>
         {/* <View style={{ position: 'absolute',backgroundColor: '#6FA4E9', width: '100%',padding:10, bottom: 20,zIndex:1 }}> */}
   
    <ScrollView>
       
      <View style={{ flex: 1, marginTop: 5, backgroundColor: "#f2f2f2" }}>
       
     
       
        <Text
          style={{
            marginLeft: 10,
            color: "#000",
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 10,
          }}
        >
        
        {I18n.t("Add Information")}
        </Text>

        <View style={{ margin: 0 }}>
          <View
            style={{
              backgroundColor: "#fff",
              margin: 10,
              borderRadius: 10,
              borderColor: "#D7D7D7",
              borderWidth: 0.5,
            }}
          >
            {/* <ImagePickerExample></ImagePickerExample> */}
            {/* <>
        { false ? (
          <></>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 2, color: "#fff", justifyContent: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/icons/infoimages1.png")}
                  style={styles.chatss}
                ></Image>
                {
                imagesRemaining == 0?
                  <Text
                  onPress={()=>{alert('Max 4 Photos')}}
                  style={{
                    color: '#f2f2f2',
                    fontWeight: "bold",
                    fontSize: 14,
                    marginTop: 22,
                  }}
                >

                  {I18n.t("Add Image")} 
                </Text>:

                <Text
                onPress={showImageSelection}
                style={{
                  color: '#74B9FF',
                  fontWeight: "bold",
                  fontSize: 14,
                  marginTop: 22,
                }}
              >
     
                {I18n.t("Add Image")}
              </Text>
                }
                
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
              </View>
            </View>
            {route.params.mediaV.length == 1 ||
            route.params.mediaP.length == 4 ? (
              <></>
            ) : (
              <View style={{ flexDirection: "row", flex: 0,marginRight:20 }}>
                <>
                {
                  route.params.featureName != 'greet'?
                  <>
                  <Image
                  source={require("../assets/icons/infovideo.png")}
                  style={{ marginLeft: 30, height: 20, width: 30, margin: 20 }}
                ></Image>
{
  !canselectVideo?
  <Text
  onPress={()=>alert('Max 1 Video')}
  style={{
    fontWeight: "bold",
    color: "#f2f2f2",
    fontSize: 14,
    marginTop: 22,
  }}
>
  {I18n.t("Add Video")}
</Text>:
 <Text
 onPress={showVideoSelection}
 style={{
   fontWeight: "bold",
   color: "#74B9FF",
   fontSize: 14,
   marginTop: 22,
 }}
>
  {I18n.t("Add Video")}
</Text>
}

</>
                  :<></>
                }
               </>
              </View>
            )
            }
          </View>
        
        
        
        )}
      </> */}

            <View
              style={{
                flex: 10,
                paddingLeft: 10,
                paddingTop: 20,
                fontSize: 20,
              }}
            >
              <Textarea
                containerStyle={{height:100}}
                style={styles.textarea}
                // autoFocus={true}
                // clearButtonMode={true}
                // keyboardType={"twitter"}
                // blurOnSubmit={true}
                maxLength={150}
                value={content}
                onChangeText={updateText}
                placeholder={I18n.t("poll_plholder")}
                placeholderTextColor={"#c7c7c7"}
                underlineColorAndroid={"transparent"}
              />

          
      

              <View
                style={{
                  flex: 0,
                  flexDirection: "row",
                  magin: 0,
                  justifyContent: "center",
                }}
              >
                <View>



                </View>
              </View>
            </View>
         
          </View>

           <View style={{flexDirection:'row'}}>
               
               <View style={{flex:2}}>
               <Text
          style={{
            marginLeft: 10,
            color: "#000",
            fontWeight: "bold",
            fontSize: 15,
            marginTop: 10,
          }}
        >
          {I18n.t("Poll Options")}
        </Text>
               </View>
               {
                   questionsSize.length < 4 ?
                   <TouchableOpacity onPress={()=>addQuestion()}>
                   <View style={{flex:0,marginRight:10}}>
                     
                       <View style={{borderColor:'#6FA4E9',borderWidth:1,borderRadius:10,padding:5}}>
                       <Text
              style={{
                color: "#6FA4E9",
                fontWeight: "bold",
                fontSize: 15,
                marginTop: 0,
              }}
            >+ Add Option</Text>
                       </View>
    
                   </View>
                   </TouchableOpacity>
                   :
                   <></>
               }
              
               </View>   
         
        <View>
            {/* {
                    questionsSize.map((opt, index) => (
                    <>
{
    index == 2 || index == 3?
    <>
<View style={{padding:15}}>
    <TouchableOpacity onPress={()=>removeOption(index)}>
    <Text style={{flex:1,right:0}}>Remove</Text>
    </TouchableOpacity>
         
            <TextInput
      label={`Option${index+1}`}
      value={text1}
      mode={"outlined"}
      onChangeText={text => setText1(text)}
    />
            </View>
    </>
    :
    <View style={{padding:15}}>
            
            <TextInput
 label={`Option${index+1}`}
 value={text1}
 mode={"outlined"}
 onChangeText={text => setText1(text)}
    />
            </View>
}

                    </>

                ))
            } */}





            {
                questionsSize.length == 2?

                <>

<View style={{padding:15}}>
  

         
            <TextInput
      label={`Option1`}
      value={text1}
      style={{borderLeftWidth:0,borderTopLeftRadius:50,color:'#6FA4E9',outlineColor:'#000'}}
      // outlineColor="#6FA4E9"
      selectionColor="#6FA4E9"
      mode={"outlined"}
      onChangeText={text => setText1(text)}
    />
            </View>
            <View style={{padding:15}}>
         
            <TextInput
      label={`Option2`}
      value={text2}
      mode={"outlined"}
      onChangeText={text => setText2(text)}
    />
            </View>
     

                </>
                :questionsSize.length == 3?

                <>
          
<View style={{padding:15}}>
  

         
  <TextInput
label={`Option1`}
value={text1}
mode={"outlined"}
onChangeText={text => setText1(text)}
/>
  </View>
  <View style={{padding:15}}>

  <TextInput
label={`Option2`}
value={text2}
mode={"outlined"}
onChangeText={text => setText2(text)}
/>
  </View>
  <View style={{padding:15}}>
<TouchableOpacity onPress={()=>removeOption(3)}>
<Text style={{flex:1,right:0}}>Remove</Text>
</TouchableOpacity>

<KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
  <TextInput
label={`Option3`}
value={text3}
mode={"outlined"}
onChangeText={text => setText3(text)}
/>
</KeyboardAvoidingView>

  </View>

                </>
                :
                <>
        
<View style={{padding:15}}>
  

         
  <TextInput
label={`Option1`}
value={text1}
mode={"outlined"}
onChangeText={text => setText1(text)}
/>
  </View>
  <View style={{padding:15}}>

  <TextInput
label={`Option2`}
value={text2}
mode={"outlined"}
onChangeText={text => setText2(text)}
/>
  </View>
  <View style={{padding:15}}>
  <TouchableOpacity onPress={()=>removeOption(3)}>
<Text style={{flex:1,right:0}}>Remove</Text>
</TouchableOpacity>

  <TextInput
label={`Option3`}
value={text3}
mode={"outlined"}
onChangeText={text => setText3(text)}
/>
  </View>
  <View style={{padding:15}}>
  <TouchableOpacity onPress={()=>removeOption(4)}>
<Text style={{flex:1,right:0}}>Remove</Text>
</TouchableOpacity>

  <TextInput
label={`Option4`}
value={text4}
mode={"outlined"}
onChangeText={text => setText4(text)}
/>
  </View>

                </>

            }












            
            {/* <View style={{padding:15,paddingTop:0}}>
                <Text>Option 2</Text>
            <TextInput
      label="Email"
      value={texts}
      mode={"outlined"}
      onChangeText={text => setTexts(text)}
    />
            </View> */}
        </View>
        {/* {
          route.params.featureName == "greet"?
      <>
        <View
          style={{
            flexDirection: "row",
            marginTop: 0,
            borderRadius: 20,
            borderRadius: 15,
            backgroundColor:'#fff',
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
                  {I18n.t("Show my name")}
                </Text>
              </View>
  
              <View style={{ justifyContent: "flex-end" }}>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  style={{ marginLeft: 40}}
                  formHorizontal={true}
                  labelHorizontal={false}
                  borderWidth={1}
                  buttonColor={"#74B9FF"}
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
            backgroundColor:'#fff',
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
                  buttonColor={"#74B9FF"}
                  onPress={(value) => setShowMyPhoto(value)}
                />
              </View>
            </View>
          </View>
        
        </View>
        </>
        :
          <>
  <View style={{ backgroundColor: "#f2f2f2", borderRadius: 20 }}>
            <View style={{ flex: 1, backgroundColor: "#fff",margin:10,borderRadius:10 }}>

           
            <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                  borderRadius: 20,
                }}
              >
                <View style={{ flex: 2, color: "#000" }}>
                  <Image
                    source={require("../assets/bottomCard/normalcall.png")}
                    style={{ paddingLeft: 55,
                      marginTop: 10,
                      height: 65,
                      width: 67,
                      borderRadius: 20}}
                  ></Image>
                </View>
                <View style={{ flex: 7, padding: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 20,
                          marginLeft: 20,
                        }}
                      >
                       {I18n.t("Normal call")}
                      </Text>
                    </View>

                    <View>
                      <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        style={{ marginLeft: 50 }}
                        formHorizontal={true}
                        labelHorizontal={false}
                        borderWidth={1}
                        buttonColor={"#74B9FF"}
                        onPress={(value) => setCallStatus(value)}
                      />
                    </View>
                  </View>

  

                  <Text
                    style={{
                      color: "#A1A4B2",
                      fontSize: 10,
                      marginLeft: 10,
                    }}
                  >
                    {I18n.t("Allows_other_to_make_a_regular_call_to_you")}
                  </Text>
                </View>
              </View>

  
            
            </View>
            {
              isNormalCalloff?
              <View style={{ flex: 1, backgroundColor: "#fff",margin:10,borderRadius:10 }}>
              <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    borderRadius: 20,
  
                  }}
                >
                  <View style={{ flex: 2, color: "#000" }}>
                    <Image
                      source={require("../assets/bottomCard/bluecall.png")}
                      style={{ paddingLeft: 50,
                        marginTop: 10,
                        height: 68,
                        width: 68,
                        borderRadius: 20,
                      paddingLeft : 10}}
                    ></Image>
                  </View>
                  <View style={{ flex: 7, padding: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      <View>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            marginLeft: 10,
                          }}
                        >
                          {I18n.t("Spaarks call")}
                        </Text>
                      </View>
  
                      <View>
                        <RadioForm
                          radio_props={radio_props}
                          initial={0}
                          style={{ marginLeft: 50 }}
                          formHorizontal={true}
                          labelHorizontal={false}
                          borderWidth={1}
                          buttonColor={"#74B9FF"}
                          onPress={(value) => setIsCallOn(value)}
                        />
                      </View>
                    </View>
  
       
  
                    <Text
                      style={{
                        color: "#A1A4B2",
                        fontSize: 10,
                        marginLeft: 10,
                      }}
                    >
                      {I18n.t("Internet call where number is not required")}
                    </Text>
                  </View>
                </View>
              
              </View>
        :<></>  
            }
    
            <View style={{ flex: 10,backgroundColor: "#fff",margin:10,borderRadius:10,marginBottom:50  }}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 0,
                  borderRadius: 20,
                }}
              >
                <View style={{ flex: 2, color: "#000" }}>
                  <Image
                    source={require("../assets/bottomCard/chat_blue.png")}
                    style={{ paddingLeft: 50,
                      marginTop: 10,
                      height: 70,
                      width: 70,
                      borderRadius: 20}}
                  ></Image>
                </View>
                <View style={{ flex: 7, padding: 20 }}>
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 20,
                          marginLeft: 10,
                        }}
                      >
                        {I18n.t("Spaarks Chat")}
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
                        buttonColor={"#74B9FF"}
                        onPress={(value) => setIsChatOn(value)}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
       
       
       
       </View>
       

          </>
        } */}
          
       
       
        </View>
 
 
 
      </View>
    </ScrollView>
    </View>
    <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center',position: 'absolute',backgroundColor: '#6FA4E9', width: '100%',padding:10, bottom: 0,zIndex:1 }}>       
          <Text style={{color:'#fff',paddingTop:0,fontWeight:'bold',fontSize:18}}  onPress={()=>{nextScreen()}}>{I18n.t("CONTINUE TO COMPLETE")}</Text>
        {/* </View> */}
    </View>

    </>
  );
};
export default NewPollStepperScreen;
const styles = StyleSheet.create({
  Languagecard: {
    paddingLeft: 50,
    marginTop: 20,
    height: 80,
    width: 80,
    borderRadius: 20,
  },

  chats: {
    height: 60,
    width: 40,
    margin: 15,
  },
  chatss: {
    height: 25,
    width: 30,
    margin: 15,
  },

  tinyLogo: {
    flex: 0,
    height: 120,
    width: 120,
    margin: 20,
  },
  rows1: {
    flex: 0,
    flexDirection: "row",
  },
  image: {
    resizeMode: "cover",
    justifyContent: "center",
  },
  rows2: {
    flex: 0,
    flexDirection: "row",
  },
  scrollView: {},
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: "#f2f2f2",
  },

  highlight: {
    fontWeight: "700",
  },
  footer: {
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },

  buttonSelected: {
    opacity: 1,
    color: "red",
  },
  customSlide: {
    alignItems: "center",
    justifyContent: "center",
  },
  customImage: {
    width: 390,
    height: 500,
    resizeMode: "cover",
  },
  chip: {
    backgroundColor: "#FA6E5A",
    margin: 0,
    height: 25,
    width: 80,
  },
  chips: {
    backgroundColor: "#6FA4E9",
    margin: 2,
    height: 30,
    width: 100,
  },
  chipText: {
    color: "#fff",
  },
  chipTexts: {
    color: "#000",
  },
  video: {
    backgroundColor: "#000",
    justifyContent: "center",
    marginTop: 0,
    width: 360,
    height: 250,
    resizeMode: "contain",
  },
});
