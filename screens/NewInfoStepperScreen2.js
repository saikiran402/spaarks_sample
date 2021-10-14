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
} from "react-native";
import { connect, useDispatch, useReducer } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
  TouchableOpacity,
} from "react-native-paper";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import Snackbar from 'react-native-snackbar';

import Textarea from "react-native-textarea";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import MapView, { PROVIDER_GOOGLE,UrlTile } from "react-native-maps";
import { Switch } from "react-native-paper";
// import { Slider } from 'react-native-elements';
import Slider from "@react-native-community/slider";
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
// import { Video } from "expo-av";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import chatReducers from "../reducers/chatReducers";
const GLOBAL = require('../Globals');
// export default function NewInfoStepperScreen({ navigation, route }) {

  import I18n from '../src/i18n';

const NewInfoStepperScreen2 = ({
  navigation,
  route,
  chat_roster_main,
  chat_roster_anonymous,
  messagess,
}) => {

  const Chatdispatcher = useDispatch(chatReducers);
  const showText = [
    I18n.t("newinfo1"),
    I18n.t("Move spaark wherever I go")
  ]
  var radio_props = [
    { label: I18n.t("YES"), value: true },
    { label: I18n.t("NO"), value: false },
  ];

  var pin_props = [
    { label: I18n.t("Pin Spaark at this location"), value: 0 },
    { label:  I18n.t("Move spaark wherever I go"), value: 1 },
  ]
  // const video = React.useRef(null);
  // const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [completed,setCompleted] = useState(false)
  // const [video, setVideo] = useState([]);

  const [isMapOn, setIsMapOn] = useState(true);
  const [distanceSlider, setDistanceSlider] = useState(5);

  function updateText(a) {
    setContent(a);
  }

  async function onSubmitSteps (){
    await AsyncStorage.setItem('isAboutToCreate',String(false))
    setPosting(true)
    // console.log('Image',route.params.image);
    console.log('content',route.params.content);
    console.log('images',route.params.images);
    console.log('video',route.params.video);
    console.log('featureName',route.params.featureName);
    // console.log('isChatOn',isChatOn);
    console.log('isCallOn',route.params.isCallOn);
    console.log('isChatOn',route.params.isChatOn);
    console.log('isMapOn',isMapOn);
    console.log('distanceSlider',distanceSlider);
    console.log('question',route.params.question);
    console.log('category',route.params.category);
    console.log('subcategory',route.params.subCategory);
    console.log('questionNo',route.params.questionNo);
    console.log('categoryId',route.params.categoryId);
    console.log('subcategoryId',route.params.subCategoryId);

    // console.log("Market");
    var uservisibility = {
      name: "Saikiran",
      profilePic: "https://static-content.spaarksweb.com",
      gender: "Male",
      location: String(isMapOn),
      chat: String(route.params.isChatOn),
      phoneCall: String(route.params.isCallOn),
      email: "true",
      canCallMobile:route.params.isPhoneOn
    };
    const formData = new FormData();
    var photoes = [];
    if (route.params.images.length) {
      route.params.images.forEach((list) => {
        console.log(list)
        if(list.mediaType == 1){
          formData.append("photo", list);
        }

      });
    }
    if (route.params.video.length) {
      console.log('VIDEO')
      route.params.video.forEach((list) => {
          formData.append("video", list);
      });
    }
    var latitudes = await AsyncStorage.getItem('latitude');
    var longitudes = await AsyncStorage.getItem('longitude');
    formData.append("content", route.params.content);
    // formData.append("video", route.params.video);
    formData.append("uservisibility[name]", uservisibility.name);
    formData.append("uservisibility[profilePic]", uservisibility.profilePic);
    formData.append("uservisibility[gender]", uservisibility.gender);
    formData.append("uservisibility[location]", uservisibility.location);
    formData.append("uservisibility[chat]", uservisibility.chat);
    formData.append("uservisibility[phoneCall]", uservisibility.phoneCall);
    formData.append("uservisibility[canCallMobile]", uservisibility.isPhoneOn);




var options = [{
  question:"KCR"
},
{
  question:"CBN"
},
{
  question:"JAGAN"
},
{
  question:"PAWAN KALYAN"
}]
    // Related Polls
   
    if(pinChecked){
      formData.append("dynamicLocation", true);
    }else{
      formData.append("dynamicLocation", false);
    }
    formData.append("radius", 5);
    formData.append("question", route.params.question);
    formData.append("questionNo", route.params.questionNo);
    formData.append("category", route.params.category);
    formData.append("categoryId", route.params.categoryId);
    formData.append("subCategoryId", route.params.subCategoryId);
    formData.append("subCategory", route.params.subCategory);
    formData.append("isProvider", "true");
    formData.append("locationStatic[coordinates]", Number(longitudes));
    formData.append("locationStatic[coordinates]", Number(latitudes));
    formData.append("locationStatic[type]", "Point");
    console.log("formData", formData);
    console.log('VIDEO_FORM',formData._parts[0])
    // navigation.navigate("Market", {
    //   setLoading: "true",
    //   message: "Post Created Succesfully",
    //   showTag: true,
    // });

    var jwt = await AsyncStorage.getItem('token');
    await axios
      .post(
        `${GLOBAL.BASE_URL}${route.params.featureName}/post`,
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
        console.log(resp.data);
        setCompleted(true)
    
        Chatdispatcher({type:'REFRESHAFTERPOSTING',refreshAfterPost:true})
        Snackbar.show({text: I18n.t("Spaark created successfully"),
        duration: Snackbar.LENGTH_LONG})
          navigation.navigate("All", {
            setLoading: "true",
            message: "Post Created Succesfully",
            showTag: true,
          });

        
        // navigation.push('Details');
        // navigation.push("S");
        // navigation.popToTop('All)
        // navigation.jumpTo('All')
      })
      .catch((error) => {
        console.error(error.response.data);
        alert(error.response.data.message)
       });
  };

  if(completed){
    navigation.popToTop()
  }

  const [posting,setPosting] = useState(false)
  function detetePhoto(uri) {}

  function setDist(s) {
    setDistanceSlider(s);
  }

  // const NewInfoReducer = (prevState, action) => {
  //   switch (action.type) {
  //     case "SETIMAGES":
  //       setImages(action.images);
  //       return {
  //         ...prevState,
  //         images: action.images,
  //         isLoading: false,
  //       };

  //     case "SETVIDEOS":
  //       return {
  //         ...prevState,
  //         videos: action.videos,
  //         isLoading: false,
  //       };
  //   }
  // };

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
  // const [latitude, setLongitude] = React.useState(null);

  // const [NewInfoState, dispatch] = React.useReducer(
  //   NewInfoReducer,
  //   initialState
  // );

  const MyMaps = () => {
    const onToggleSwitch = () => setIsMapOn(!isMapOn);

    return (
      <Switch
        value={isMapOn}
        onValueChange={onToggleSwitch}
        color={"#1A73E9"}
      />
    );
  };

  const myLatLon = {
      myLat: {
        coordinate: {
          latitude: 17.87687,
          longitude: 78.98689698
        }
      }
  };
  // const _map = React.useRef(null);
  // const _scrollView = React.useRef(null);
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
    // tileUrl:'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
    tileUrl:'https://maps.spaarksweb.com/styles/ososweb/{z}/{x}/{y}.png'
  };
  const [checked, setChecked] = useState("first");
  const [pinChecked, setPinChecked] = useState(0);

  
  const [state, setState] = useState(initialMapState);
  // const [steps, setSteps] = React.useState('step');
  return (
    <SafeAreaView style={{ backgroundColor: "#f2f2f2" }}>
      <ScrollView>
      <Text
        style={{
          marginLeft: 20,
          color: "#a1a4b2",
          fontWeight: "bold",
          marginTop: 15,
        }}
      >
        {route.params.question}

      </Text>

      <Text
        style={{
          color: "#131313",
          fontWeight: "bold",
          marginLeft: 20,
          fontSize: 20,
        }}
      >
        {I18n.t("Select map options")}
      </Text>
      <View
        style={{
          flex: 0,
          backgroundColor: "#fff",
          margin: 10,
          marginTop:0,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 0,
            borderRadius: 20,
            
            borderWidth:1,borderColor:'#D7D7D7',
            borderRadius:10,
          }}
        > 
          <View style={{ flex: 2, color: "#000" }}>
            <Image
              source={require("../assets/map2.png")}
              style={styles.Languagecard}
            ></Image>
          </View>
          <View style={{ flex: 7, padding: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    marginLeft: 10,
                    marginTop:18
                  }}
                >
                  { I18n.t("Show me on Map")}
                </Text>
              </View>

              <View style={{ justifyContent: "" }}>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  wrapStyle={{ marginLeft: 45 }}
                  formHorizontal={true}
                  labelHorizontal={false}
                  borderWidth={1}
                  buttonColor={"#6FA4E9"}
                  onPress={(value) => setIsMapOn(value)}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          height: 260,
          margin: 10,
          marginTop: 2,
          marginTop:0,
          borderWidth:1,
          borderColor:'#D7D7D7',
          borderRadius:10,
          borderTopLeftRadius:0,
          borderTopRightRadius:0,
          backgroundColor: "#fff",
        }}
      >
        <View style={{ height: 200, margin: 0, backgroundColor: "#f2f2f2" }}>
          <MapView
            style={{ height: "100%" }}
            region={initialMapState.region}
            onRegionChange={initialMapState.onRegionChange}
          >
                  <UrlTile
                    urlTemplate="https://maps.spaarksweb.com/styles/ososweb/?raster#{z}/{x}/{y}.png"
                    maximumZ={19}
                    flipY={false}
                />

                    <MapView.Marker key="s" coordinate={state.myLa}></MapView.Marker>
                    <MapView.Circle
                     key="myCircle"
                     center={state.myLat}
                     radius={5000}
                     strokeWidth={2}
                     strokeColor={'#448AFF'}
                     color="#0080FF80"
     
     
                   />
                  </MapView>
                          {/* <MapView
          region={initialMapState.region}
          onRegionChange={initialMapState.onRegionChange}
          style={{ height: "100%" }}
        >

        </MapView> */}
                  <Text style={{padding:10}}>
                    {
                      showText[pinChecked]
                    }
                            </Text>
        </View>
        
      </View>
   
      <View
      style={{
        flex: 0,
        backgroundColor: "#fff",
        margin: 10,
        marginTop:0,
        borderRadius: 10,

      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: 0,
          borderRadius: 20,
          borderWidth:1,borderColor:'#D7D7D7',
          borderRadius:10,
        }}
      >
       
        <View style={{ flex: 7, padding: 20, }}>
          <View style={{ flexDirection: "row" }}>
           

            <View style={{ justifyContent: "flex-end", }}>
              <RadioForm
                radio_props={pin_props}
                initial={0}
                formHorizontal={true}
                labelHorizontal={false}
                borderWidth={2}
                labelStyle={{fontSize:12}}
                buttonColor={"#6FA4E9"}
                onPress={(value) => setPinChecked(value)}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  




  {
    posting?
    <View style={{backgroundColor:'#A9A9A9',justifyContent:'center',textAlign:'center',margin:10,marginTop:0}} >
    <Text style={{color:'#fff',padding:10,justifyContent:'center',textAlign:'center'}}>Creating Spaark...</Text>
  </View>:
   <View style={{backgroundColor:'#6FA4E9',justifyContent:'center',textAlign:'center',margin:10,marginTop:0}} >
   <Text style={{color:'#fff',padding:10,justifyContent:'center',textAlign:'center'}} onPress={()=>{onSubmitSteps()}}>{ I18n.t("Post Spaark")}</Text>
 </View>
  }
     
      </ScrollView>
    </SafeAreaView>
  );
};



export default NewInfoStepperScreen2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container: {
    backgroundColor: "#f2f2f2",
    flex: 1,
  },
  cards: {
    margin: 20,
    height: 40,
  },
  Languagecard: {
    paddingLeft: 50,
    height: 80,
    width: 80,
    margin:15,
    borderRadius: 20,
  },
  nextImage: {
    height: 40,
    width: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textareaContainer: {
    height: 220,
    padding: 5,
    backgroundColor: "#fff",
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 220,
    fontSize: 14,
    color: "#333",
  },
  searchBox: {
    position: "relative",
    marginTop: Platform.OS === "ios" ? 5 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    alignSelf: "center",
    borderColor: "#d7d7d7",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  chats: {
    height: 60,
    width: 40,
    margin: 15,
  },
  chatss: {
    height: 25,
    width: 30,
    margin: 20,
  },
  eachCard: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },

  body: {},
  BottomNav: {
    flex: 0,
    flexDirection: "row",
    backgroundColor: "#63CDFF",
  },

  LoginComponent: {
    height: 500,
    width: 100,
    margin: 50,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },

  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
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
  sectionContainercol: {
    marginTop: 32,
    paddingHorizontal: 24,
    width: 200,
    height: 100,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    padding: 8,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    fontWeight: "700",
  },
  sectionDescription: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: "#ffffff",
  },

  sectionDescriptions: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
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
