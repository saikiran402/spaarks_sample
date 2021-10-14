import React, { Component, useState, useEffect } from "react";
import {
  View,
  ActionSheetIOS,
  Text,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  Animated,
} from "react-native";
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
import Textarea from "react-native-textarea";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Switch } from "react-native-paper";
// import { Slider } from 'react-native-elements';
import Slider from "@react-native-community/slider";
import axios from "axios";

export default function NewInfoStepperScreen({ navigation, route }) {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState([]);
  const [isCallOn, setIsSwitchOn] = useState(true);
  const [isChatOn, setIsChatOn] = useState(true);
  const [isMapOn, setIsMapOn] = useState(true);
  const [distanceSlider, setDistanceSlider] = useState(5);

  function updateText(a) {
    setContent(a);
  }
  const onSubmitSteps = async () => {
    // console.log('Image',image);
    // console.log('content',content);
    // console.log('images',images);
    // console.log('video',video);
    // console.log('isCallOn',isCallOn);
    // console.log('isChatOn',isChatOn);
    // console.log('isMapOn',isMapOn);
    // console.log('distanceSlider',distanceSlider);
    // console.log('question',route.params.question);
    // console.log('category',route.params.category);
    // console.log('subcategory',route.params.subcategory);
    console.log("Market");
    var uservisibility = {
      name: "Saikiran",
      profilePic: "https://static-content.spaarksweb.com",
      gender: "Male",
      location: String(isMapOn),
      chat: String(isChatOn),
      phoneCall: String(isCallOn),
      email: "true",
    };
    const formData = new FormData();
    var photoes = [];
    if (images.length) {
      images.forEach((list) => {
        formData.append("photo", list);
      });
    }

    formData.append("content", content);
    formData.append("video", video);
    formData.append("uservisibility[name]", uservisibility.name);
    formData.append("uservisibility[profilePic]", uservisibility.profilePic);
    formData.append("uservisibility[gender]", uservisibility.gender);
    formData.append("uservisibility[location]", uservisibility.location);
    formData.append("uservisibility[chat]", uservisibility.chat);
    formData.append("uservisibility[phoneCall]", uservisibility.phoneCall);

    formData.append("radius", 5);
    formData.append("question", route.params.question);
    formData.append("questionNo", route.params.questionNo);
    formData.append("category", route.params.category);
    formData.append("categoryId", route.params.categoryId);
    formData.append("subCategoryId", route.params.subCategoryId);
    formData.append("subCategory", route.params.subCategory);
    formData.append("isProvider", "true");
    formData.append("locationStatic[coordinates]", 78.4437);
    formData.append("locationStatic[coordinates]", 17.4079);
    formData.append("locationStatic[type]", "Point");
    console.log("formData", formData);

    await axios
      .post(
        `http://103.27.86.34:3005/api/v2.0/${route.params.featureName}/post`,
        formData,
        {
          // await axios.post(`http://192.168.0.254:3012/api/v2.0/${route.params.featureName}/post`,formData,{
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTUzOTBmZTAxNjdjNjJiOWI0MDNjMyIsImlhdCI6MTYxNDA4NDc1OSwiZXhwIjoxNjIxODYwNzU5fQ.byNoqAijxjl5h8rQfnUYzkwJgBh6ZDhiFcVBMoAXmSQ",
          },
        }
      )
      .then((resp) => {
        console.log(resp.data.message);
        navigation.navigate("Details", {
          setLoading: "true",
          message: "Post Created Succesfully",
          showTag: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function detetePhoto(uri) {}

  function setDist(s) {
    setDistanceSlider(s);
  }

  const NewInfoReducer = (prevState, action) => {
    switch (action.type) {
      case "SETIMAGES":
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
  const [isLoading, setIsLoading] = React.useState(true);
  const [longitude, setLatitude] = React.useState(null);
  const [latitude, setLongitude] = React.useState(null);

  const [NewInfoState, dispatch] = React.useReducer(
    NewInfoReducer,
    initialState
  );

  const pickImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      // aspect: [4, 3],
      allowsMultipleSelection: true,
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImage(result);
      var photo = {
        uri: result.uri,
        mimetype: "image/jpeg",
        name: "image.jpeg",
      };
      var imag = [];
      imag = images;
      imag.push(photo);
      setImages(imag);
      dispatch({ type: "SETIMAGES", images: imag });
      console.log("asas");
      console.log("allImages", imag);
      console.log("NewInfoState", NewInfoState.images);
    }

    setTimeout(() => {}, 3000);
  };

  const pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImage(result);

      var allImages = await images.push(result.uri);
      setImages(images);
      dispatch({ type: "SETIMAGES", images: images });
      console.log("asas");
      console.log("allImages", images);
      console.log("NewInfoState", NewInfoState.images);
    }

    setTimeout(() => {}, 3000);
  };

  function showImageSelection() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [I18n.t("Cancel"), I18n.t("Library"), I18n.t("Camera")],
        // destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          console.log("In Library");
          pickImageLibrary();
        } else {
          console.log("In Camera");
          pickImageCamera();
        }
      }
    );
  }

  function onDeleteImage() {
    img = [];
    NewInfoState.images.forEach((list) => {
      if (list.uri == im.uri) {
      } else {
        img.push(list);
      }
    });
    dispatch({ type: "SETIMAGES", images: img });
  }

  function ImagePickerExample() {
    useEffect(() => {
      (async () => {
        if (Platform.OS !== "web") {
          const {
            status,
          } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          }
        }
      })();
    }, []);

    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, color: "#fff", justifyContent: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/icons/infoimages.png")}
              style={styles.chatss}
            ></Image>
            <Text
              onPress={showImageSelection}
              style={{
                color: "#6FA4E9",
                fontWeight: "bold",
                fontSize: 14,
                marginTop: 22,
              }}
            >
              Add Image
            </Text>
            {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 2 }}>
          <Image
            source={require("../assets/icons/infovideo.png")}
            style={{ marginLeft: 30, height: 20, width: 30, margin: 20 }}
          ></Image>
          <Text
            style={{
              fontWeight: "bold",
              color: "#44BE4A",
              fontSize: 14,
              marginTop: 22,
            }}
          >
            Add Video
          </Text>
        </View>
      </View>
      //   <TouchableOpacity onPress={pickImage} style={{backgroundColor:"#fff"}}>
      //   <View style={{flexDirection:'column'}}>
      //                                                 <Image source={require('../assets/icons/infoimages.png')} style={styles.chatss}></Image>
      //                                                 <Text style={{color:"#6FA4E9",fontWeight:"bold"}}>
      //                                                     Add Images
      //                                                 </Text>
      //    </View>
      //    </TouchableOpacity>
    );
  }

  const MySwitch = () => {
    const onToggleSwitch = () => setIsSwitchOn(!isCallOn);

    return (
      <Switch
        value={isCallOn}
        onValueChange={onToggleSwitch}
        color={"#1A73E9"}
      />
    );
  };

  const MyChats = () => {
    const onToggleSwitch = () => setIsChatOn(!isChatOn);

    return (
      <Switch
        value={isChatOn}
        onValueChange={onToggleSwitch}
        color={"#1A73E9"}
      />
    );
  };

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

  const navigationOptions = {
    header: null,
  };

  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: "handled",
    contentContainerStyle: {
      flex: 0,
    },
  };

  const onNextStep = ({ navigator }) => {
    console.log("called next step");
  };

  const onPaymentStepComplete = () => {};

  const onPrevStep = () => {};

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
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

  const [state, setState] = React.useState(initialMapState);
  // const [steps, setSteps] = React.useState('step');
  return (
    <View style={{ flex: 1, marginTop: 5, backgroundColor: "#f2f2f2" }}>
      <ProgressSteps>
        {/* Content & Images */}
{
       steps == 'step1'?
     <>
          <Text
            style={{ marginLeft: 10, color: "#a1a4b2", fontWeight: "bold" }}
          >
            {route.params.question}
            {!route.params.skippedCat ? (
              route.params.featureName == "market" ? (
                route.params.isTag == true ? (
                  <Text
                    style={{
                      marginLeft: 10,
                      color: "#a1a4b2",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    > {route.params.category}
                  </Text>
                ) : (
                  <Text
                    style={{
                      marginLeft: 10,
                      color: "#a1a4b2",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    > {route.params.category} > {route.params.subCategory}
                  </Text>
                )
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
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
            Add Information
          </Text>

          <View style={{ margin: 0 }}>
            <View
              style={{
                backgroundColor: "#fff",
                height: "100%",
                margin: 10,
                borderRadius: 10,
                borderColor: "#D7D7D7",
                borderWidth: 0.5,
              }}
            >
              <ImagePickerExample></ImagePickerExample>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={{
                      uri:
                        "https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70",
                    }}
                    style={{
                      height: 70,
                      width: 70,
                      borderRadius: 50,
                      margin: 10,
                    }}
                  ></Image>
                </View>

                <View
                  style={{
                    flex: 10,
                    paddingLeft: 70,
                    paddingTop: 20,
                    fontSize: 20,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Erica</Text>
                  <Text style={{ marginTop: 5 }}>Feb 25, 2020</Text>
                </View>
              </View>

              <View
                style={{
                  flex: 10,
                  paddingLeft: 10,
                  paddingTop: 20,
                  fontSize: 20,
                }}
              >
                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  maxLength={1000}
                  value={content}
                  onChangeText={updateText}
                  placeholder={
                    "Eg. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra feugiat eu porttitor amet tellus semper. Tempus duis consectetur dapibus blandit. "
                  }
                  placeholderTextColor={"#c7c7c7"}
                  underlineColorAndroid={"transparent"}
                />

                <View
                  style={{
                    marginTop: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    borderBottomColor: "#A1A4B2",
                    borderBottomWidth: 0.5,
                    flex: 0,
                  }}
                />

                <View
                  style={{
                    flex: 0,
                    flexDirection: "row",
                    magin: 0,
                    justifyContent: "left",
                  }}
                >
                  <View style={{ flex: 5 }}>
                    <View style={{ flex: 0, flexDirection: "column" }}>
                      {/* <TouchableOpacity onPress={pickImage()} style={{backgroundColor:"#fff"}}> */}
                      {/* <View style={{flexDirection:'column'}}>
                                                    <Image source={require('../assets/icons/infoimages.png')} style={styles.chatss}></Image>
                                                    <Text style={{color:"#6FA4E9",fontWeight:"bold"}}>
                                                        Add Images
                                                    </Text>
                                </View> */}
                      {/* </TouchableOpacity> */}
                    </View>
                  </View>

                  <View>
                    {NewInfoState.images &&
                      NewInfoState.images.map((l, i) => (
                        <>
                          <Text>Delete</Text>
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
                        </>
                      ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
</>:<></>

}

        {/* Connection Icons */}
        <ProgressStep
          label="Permissions"
          onNext={onPaymentStepComplete}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}
        >
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#f2f2f2",
              margin: 0,
              height: 1000,
            }}
          >
            <View style={{ flexDirection: "column", backgroundColor: "#fff" }}>
              <View style={{ flex: 0 }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    borderRadius: 20,
                  }}
                >
                  <View style={{ flex: 2, color: "#000" }}>
                    <Image
                      source={require("../assets/bottomCard/call_message.png")}
                      style={styles.Languagecard}
                    ></Image>
                  </View>
                  <View style={{ flex: 3, padding: 20 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                      Spaarks Call
                    </Text>
                    <Text h5 style={{ color: "#6FA4E9", fontSize: 16 }}>
                      Turned ON
                    </Text>
                    <Text h5 style={{ color: "#A1A4B2", fontSize: 16 }}>
                      Note : About how Spaarks Call Works
                    </Text>
                  </View>
                  <View style={{ flex: 1, marginTop: 20, color: "#000" }}>
                    <MySwitch></MySwitch>
                  </View>
                </View>
              </View>
              <View>
                <Image
                  source={{
                    uri:
                      "https://via.placeholder.com/200X156.png?text=About+how+Spaarks+Call+Works",
                  }}
                  style={{ height: 80, width: 350, margin: 10 }}
                ></Image>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                margin: 10,
                borderRadius: 10,
                backgroundColor: "#fff",
              }}
            >
              <View style={{ flex: 2, color: "#000" }}>
                <Image
                  source={require("../assets/bottomCard/chat_blue.png")}
                  style={styles.Languagecard}
                ></Image>
              </View>
              <View style={{ flex: 3, padding: 20 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Spaarks Chat
                </Text>
                <Text h5 style={{ color: "#6FA4E9", fontSize: 16 }}>
                  Turned ON
                </Text>
              </View>
              <View style={{ flex: 1, marginTop: 20, color: "#000" }}>
                <MyChats></MyChats>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                margin: 5,
                borderRadius: 20,
                backgroundColor: "#fff",
              }}
            >
              <View style={{ flex: 2, color: "#000" }}>
                <Image
                  source={require("../assets/bottomCard/map_green.png")}
                  style={styles.Languagecard}
                ></Image>
              </View>
              <View style={{ flex: 3, padding: 20 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Show me on Map
                </Text>
                <Text h5 style={{ color: "#6FA4E9", fontSize: 16 }}>
                  Turned ON
                </Text>
              </View>
              <View style={{ flex: 1, marginTop: 20, color: "#000" }}>
                <MyMaps></MyMaps>
              </View>
            </View>
          </View>
        </ProgressStep>

        {/* Map Selection */}
        <ProgressStep
          label="Visibility"
          onNext={onNextStep}
          onPrevious={onPrevStep}
          onSubmit={onSubmitSteps}
          scrollViewProps={defaultScrollViewProps}
        >
          <SafeAreaView>
            <Text
              style={{
                color: "#131313",
                fontWeight: "bold",
                marginLeft: 20,
                fontSize: 20,
              }}
            >
              Spaark Visibility
            </Text>
            <View
              style={{
                height: 260,
                margin: 20,
                marginTop: 2,
                backgroundColor: "#fff",
              }}
            >
              <View
                style={{ height: 200, margin: 10, backgroundColor: "#f2f2f2" }}
              >
                <MapView
                  style={{ height: "100%" }}
                  region={initialMapState.region}
                  onRegionChange={initialMapState.onRegionChange}
                  mapType={Platform.OS == "ios" ? "none" : "standard"}
                ></MapView>
                <Text>
                  Dana makes the best pizza in Tel Aviv! Great value for money,
                  only downside is the.
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: "#131313",
                fontWeight: "bold",
                marginLeft: 20,
                fontSize: 20,
              }}
            >
              Manage Spaark Visibility
            </Text>
            <View
              style={{
                height: 200,
                margin: 20,
                marginTop: 4,
                backgroundColor: "#fff",
              }}
            >
              {/* <Slider
    value={distanceSlider}
    onValueChange={(value) => setDistanceSlider(value )}
    style={{paddingLeft:80}}
  /> */}
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 5 }}>
                  <Text
                    style={{ fontSize: 16, padding: 10, fontWeight: "400" }}
                  >
                    Distance
                  </Text>
                </View>
                <View style={{ flex: 1, padding: 10 }}>
                  <Text style={{ color: "#6FA4E9", fontWeight: "bold" }}>
                    {distanceSlider.toFixed(0)} Km
                  </Text>
                </View>
              </View>

              <Slider
                style={{
                  width: 300,
                  height: 40,
                  marginLeft: 30,
                  marginTop: 10,
                }}
                minimumValue={1}
                value={distanceSlider}
                onValueChange={setDist}
                maximumValue={5}
                minimumTrackTintColor="#6FA4E9"
                maximumTrackTintColor="#9597A1"
              />
            </View>
          </SafeAreaView>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container: {
    height: "100%",

    backgroundColor: "#f2f2f2",
  },
  cards: {
    margin: 20,
    height: 40,
  },
  Languagecard: {
    paddingLeft: 50,
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  nextImage: {
    height: 40,
    width: 40,
  },
  container: {
    flex: 1,
    padding: 20,
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
    height: 1000,
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
});
