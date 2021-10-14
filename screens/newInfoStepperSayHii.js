import React, { Component, useState, useEffect, useRef } from "react";
import {
  View,
  ActionSheetIOS,
  Text,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  Animated,
  ScrollView,
  FlatList,
  Pressable,
  Linking,
  Dimensions,
  Alert
} from "react-native";
import moment from "moment";
import RNLocation from 'react-native-location';
import Video from 'react-native-video';
import { Thumbnail } from 'react-native-thumbnail-video';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
  TouchableOpacity,
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
import I18n from "../src/i18n";
import ImagePicker from "react-native-customized-image-picker";
import axios from "axios";
import { connect, useDispatch, useReducer } from "react-redux";
// import { Dimensions } from "react-native";
// import { Video } from "expo-av";

// export default function NewInfoStepperScreen({ navigation, route }) {
  const windowHeight = Dimensions.get('window').height;

const newInfoStepperSayHii = ({
  navigation,
  route,
  name,
  profilePic
}) => {
  var radio_props = [
    { label: "YES", value: true },
    { label: "NO", value: false },
  ];
  const video = React.useRef(null);
  const [image, setImage] = useState(null);
  const [content, setContents] = useState("");
  const [images, setImages] = useState([]);
  const [contnt, setContent] = useState(null);
  // const [video, setVideo] = useState([]);
  // const [isCallOn, setIsSwitchOn] = useState(true);
  const [isChatOn, setIsChatOn] = useState(true);
  const [isCallOn, setIsCallOn] = useState(true);


  const [isNameOn, setIsNameOn] = useState(true);
  const [isPicOn, setIsPicOn] = useState(true);


  const [isMapOn, setIsMapOn] = useState(true);
  const [distanceSlider, setDistanceSlider] = useState(5);

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
const [videoupload,setUploadVideo] = useState([])
  function showImageSelection() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [I18n.t("Cancel"), I18n.t("Library"), I18n.t("Camera")],
        // destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
      },
      // async (buttonIndex) => {
      //   if (buttonIndex === 0) {
      //     // cancel action
      //   } else if (buttonIndex === 1) {
      //         await  ImagePicker.openCamera({
      //           multiple: false,
      //           hideCropBottomControls:false
      //         }).then(images => {
      //           setImages(images)
      //         });
      //   }else if (buttonIndex === 2) {
      //         await ImagePicker.openPicker({
      //           multiple: true,
      //           maxSize:2,
      //           hideCropBottomControls:true
      // }).then(images => {
      //   //console.log(images);
      //   setImages(images)
      // });
      //   }else{

      //   }
      // }
      
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
      
            var remainingP = 4 - imagesupload.length;
          
          console.log("In Library");
          // pickImageLibrary();
           await ImagePicker.openPicker({
        multiple: true,
        maxSize:remainingP,
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

  async function showVideoSelection() {
    await ImagePicker.openPicker({
      maxSize:1,
      isVideo:true,
      title:'Spaarks Media'
    }).then(images => {
      console.log('videovideovideovideovideo',images);
      // alert(images.length)
      // setUploadVideo(images)
      var newvid = [{"height": images[0].height, "mediaType": 2, "path": images[0].coverUri, "size": images[0].size, "width": images[0].width}]
      var imagesuploads = [...imagesupload,...newvid]
      setUpload(imagesuploads)
      setUploadVideo(images)
      // setImagesss(images)
      // setLongitude(images)
    });
    // ActionSheetIOS.showActionSheetWithOptions(
    //   {
    //     options: [I18n.t("Cancel"), I18n.t("Library"), I18n.t("Camera")],
    //     // destructiveButtonIndex: 2,
    //     cancelButtonIndex: 0,
    //     userInterfaceStyle: "dark",
    //   },
    //   (buttonIndex) => {
    //     if (buttonIndex === 0) {
    //       // cancel action
    //     } else if (buttonIndex === 1) {
    //       console.log("In Library");

    //       pickVideoLibrary();
    //     } else {
    //       console.log("In Camera");
    //       pickVideoCamera();
    //     }
    //   }
    // );
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
        {route.params.mediaP.length == 4 ||
        (route.params.mediaP.length == 3 && route.params.mediaV.length == 1) ? (
          <></>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, color: "#fff", justifyContent: "center" }}>
            <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/icons/infoimages.png")}
                  style={styles.chatss}
                ></Image>
                {
                  imagesupload.length == 1?
                  <Text
                  onPress={()=>{alert('Max 1 Photo')}}
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
                  color: '#6FA4E9',
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
  videoupload.length>0?
  <Text
  onPress={()=>alert('Max 1 Video')}
  style={{
    fontWeight: "bold",
    color: "#f2f2f2",
    fontSize: 14,
    marginTop: 22,
  }}
>
  Add Video
</Text>:
 <Text
 onPress={showVideoSelection}
 style={{
   fontWeight: "bold",
   color: "#44BE4A",
   fontSize: 14,
   marginTop: 22,
 }}
>
  Add Video
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
  const nextScreen = () =>{
    console.log('Innn')
    var grant = false
    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    }).then(granted => {
      grant = granted
      if(grant){
        if(contnt){
          if(contnt.trim().length> 0 || imagesupload.length>0){
          navigation.navigate('newInfoStepperSayHii2',{question:route.params.question,questionNo:route.params.questionNo,category:null,subCategory:null,categoryId:null,subCategoryId:null,images:imagesupload,video:[],featureName:route.params.featureName,isPicOn:isPicOn,isNameOn:isNameOn,content:contnt})
        }else{
          alert(I18n.t('Please enter some content'))
        }
      }else{
        alert(I18n.t('Please enter some content'))
      }
        
      }else{
        alert('Please allow location to continue')
        setTimeout(() => {
          Linking.openURL('app-settings:')
        }, 1000);
        // Alert.alert(
        //   "Please allow location to continue",
        //   "Spaarks Need your precise location inorder to create spaark",
        //   [
        //     {
        //       text: "Cancel",
        //       onPress: () => console.log("Cancel Pressed"),
        //       style: "cancel"
        //     },
        //     {
        //       text: "Allow",
        //       onPress: () => Linking.openURL('app-settings:'),
        //       style: "cancel"
        //     },
        //     // { text: "OK", onPress: () => console.log("OK Pressed") }
        //   ]
        // );
  
  
      }

    });

  
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

  const [showName, setShowName] = useState(true);
  const [showProfilePic, setShowProfilePic] = useState(null);
  const [showPhoto, setShowMyPhoto] = useState(true);
//  const [placeholderData,setPlaceholderData] = useState([])
 
  async function deleteImage(path){
    
    // const newImages =  () => setUpload(imagesupload.filter((item) => item.path !== path));
  
    const newImages =  imagesupload.filter((item) => item.path !== path);
    setUpload(newImages)
    }


  // const [state, setState] = React.useState(initialMapState);
  // const [steps, setSteps] = React.useState('step');
  return (
    <>
    <View>
         {/* <View style={{ position: 'absolute',backgroundColor: '#6FA4E9', width: '100%',padding:10, bottom: 20,zIndex:1 }}> */}
   
    <ScrollView>
       
      <View style={{ flex: 1, marginTop: 0, backgroundColor: "#f2f2f2" }}>
       
        <Text
          style={{
            marginLeft: 10,
            color: "#a1a4b2",
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          {I18n.t(route.params.question)}
        </Text>
       
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
            {
                 <>
                 {route.params.mediaP.length == 4 ||
                 (route.params.mediaP.length == 3 && route.params.mediaV.length == 1) ? (
                   <></>
                 ) : (
                   <View style={{ flexDirection: "row" }}>
                     <View style={{ flex: 1, color: "#fff", justifyContent: "center" }}>
                     <View style={{ flexDirection: "row" }}>
                         <Image
                           source={require("../assets/icons/infoimages.png")}
                           style={styles.chatss}
                         ></Image>
                         {
                           imagesupload.length == 1?
                           <Text
                           onPress={()=>{alert('Max 1 Photo')}}
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
                           color: '#6FA4E9',
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
           videoupload.length>0?
           <Text
           onPress={()=>alert('Max 1 Video')}
           style={{
             fontWeight: "bold",
             color: "#f2f2f2",
             fontSize: 14,
             marginTop: 22,
           }}
         >
           Add Video
         </Text>:
          <Text
          onPress={showVideoSelection}
          style={{
            fontWeight: "bold",
            color: "#44BE4A",
            fontSize: 14,
            marginTop: 22,
          }}
         >
           Add Video
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
         
         
         
         
            }

            <View
              style={{
                flex: 10,
                paddingLeft: 10,
                paddingTop: 0,
                fontSize: 20,
              }}
            >
                  <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            {
              isPicOn?
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
              isNameOn?
            <Text style={{ fontWeight: "bold" }}>{name}</Text>
            :            <Text style={{ fontWeight: "bold" }}>{I18n.t("Anonymous")}</Text>
            }
            <Text style={{ marginTop: 5 }}>{moment(Date.now()).format('L')}</Text>
          </View>
        </View>
        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.textarea}
          maxLength={250}
          value={contnt}
          autoFocus={true}
          onChangeText={updateText}
          placeholder={
            I18n.t("createspark_plholder")
          }
          placeholderTextColor={"#c7c7c7"}
          underlineColorAndroid={"transparent"}
        />
 
              {/* <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                maxLength={1000}
                value={content}
                onChangeText={updateText}
                placeholder={"Write the details you want to Post"}
                placeholderTextColor={"#c7c7c7"}
                underlineColorAndroid={"transparent"}
              /> */}

              {/* <View
                style={{
                  marginTop: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  borderBottomColor: "#A1A4B2",
                  borderBottomWidth: 0.5,
                  flex: 0,
                }}
              /> */}
            
              {
             route.params.mediaP.length>0 || route.params.mediaV.length>0?
              <Text style={{ padding: 10 }}>{I18n.t("Media Uploaded")}</Text>
              :<></>
           }

              <View
                style={{
                  flex: 0,
                  flexDirection: "row",
                  magin: 0,
                  justifyContent: "center",
                }}
              >
                <View>
                  {/* {route.params.mediaV.map((l, i) => (
                    <>
                      <View
                        style={{
                          marginTop: 5,
                          marginLeft: 0,
                          marginRight: 65,
                          borderBottomColor: "black",
                          borderBottomWidth: 0.5,
                        }}
                      />
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          marginRight: 70,
                        }}
                      >
                        <Image
                          source={require("../assets/icons/delete_request.png")}
                          style={{ height: 20, width: 20, position: "r" }}
                        ></Image>
                        <Text
                          onPress={() => onDeleteVideo(l)}
                          style={{ marginTop: 2 }}
                        >
                          Delete
                        </Text>
                      </View>
                    </>
                  ))} */}
                  {/* {mediaP.map((l, i) => (
                    <>


                      <Image
                        source={{ uri: l.uri }}
                        key={i}
                        style={{
                          width: 350,
                          height: 350,
                          margin: 5,
                          marginRight: 55,
                        }}
                      />
                      <View
                        style={{
                          flexDirection: "row",
                          marginRight: 70,
                        }}
                      >
                        <Image
                          source={require("../assets/icons/delete_request.png")}
                          style={{ height: 20, width: 20, position: "r" }}
                        ></Image>
                        <Text
                          onPress={() => onDeleteImage(l)}
                          style={{ marginTop: 2 }}
                        >
                          Delete
                        </Text>
                      </View>
                    </>
                  ))} */}

                           
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
        <Pressable onPress={()=>deleteImage(item.path)}>
        <Image
          source={{ uri: 'https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/38-512.png' }}
          style={{height:15,width:15,position:'absolute',left:50,top:-5}}
        />
        </Pressable>
      
        </View>

        </View>

        </>
      )}/>
      


      {/* {
        videoupload.length>0?
<Video source={{uri: videoupload[0].path}}   // Can be a URL or a local file.
        ref={(ref) => {
          player = ref
        }}         
        controls={true}                             // Store reference
        style={{
          height:200,width:200}} />

        :<Video source={{uri: "http://techslides.com/demos/sample-videos/small.mp4"}}   // Can be a URL or a local file.
        ref={(ref) => {
          player = ref
        }}                                      // Store reference
        style={{
       height:200,width:350}}
       controls={true} />
      } */}


                </View>
              </View>
            </View>
          </View>
          {/* <TouchableOpacity onPress={()=>{nextScreen}}> */}
          {/* <View style={{ backgroundColor: "#6FA4E9",width:'90%', justifyContent:'center',textAlign:'center',left:20,top:540,zIndex:1,position:'absolute'}}>
             
                <Text
                onPress={()=>{nextScreen()}}
                  style={{ color: "#fff", textAlign: "center", padding: 10 }}
                >
                  CONTINUE TO COMPLETE
                </Text>
         
              </View> */}
              {/* </TouchableOpacity> */}

              
          <Text
          style={{
            marginLeft: 10,
            color: "#000",
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 10,
          }}
        >
          {I18n.t("Connection Permissions")}
        </Text>
        {
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
                  {I18n.t("Show my Name")}
                </Text>
              </View>
  
              <View style={{ justifyContent: "flex-end" }}>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  style={{ marginLeft: 60 }}
                  formHorizontal={true}
                  labelHorizontal={false}
                  borderWidth={1}
                  buttonColor={"#6FA4E9"}
                  onPress={(value) => setIsNameOn(value)}
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
                  style={{ marginLeft: 55 }}
                  formHorizontal={true}
                  labelHorizontal={false}
                  borderWidth={1}
                  buttonColor={"#6FA4E9"}
                  onPress={(value) => setIsPicOn(value)}
                />
              </View>
            </View>
          </View>
        
        </View>
        </>
        :
          <>

       

          </>
        }
          
       
       
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


const mapStatetoProps = (state) => {
  return {
    profilePic: state.chatss.profilePic,
    token: state.chatss.token,
    name:state.chatss.name
    
  };
};

export default connect(mapStatetoProps)(newInfoStepperSayHii);
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
    height: 20,
    width: 25,
    margin: 20,
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
