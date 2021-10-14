import React, { useEffect, setState, useRef, useState } from "react";
import { Tabroute, useTheme } from "@react-navigation/native";
import { Rating, AirbnbRating } from "react-native-elements";
import {
  Share,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  RefreshControl,
  Colors,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  DevSettings,
  TextInput,
  Alert,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  FlatList
} from "react-native";
import axios from "axios";
import Snackbar from 'react-native-snackbar';
import { connect, useDispatch, useReducer } from "react-redux";
const GLOBAL = require('../Globals');
import { Text } from "react-native-elements";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
} from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatSpecificScreen from "./ChatSpecificScreen";
import OnBoardingScreen from "./OnBoardingScreen";
import { Chip } from "react-native-paper";
import moment from "moment";
import I18n from '../src/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
const onShare = async (post) => {
  try {
    const result = await Share.share({
      message: `${post.content}\n\n https://www.spaarks.me/share/d7ba6325-1574-4a56-83c2-5dd21a8eb3b4 \n\n Download Spaarks app - https://cutt.ly/Spaarks-app
          Connect to your local area wherever you go.`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};
const RepliesScreen = ({ navigation, route,token }) => {
  const rating = 5;
  const initialState = {
    replies: [],
    commentContent: "",
    sendImage:
      "https://res.cloudinary.com/spaarks/image/upload/v1615462254/send_icon_xawmkn.png",
  };

  const CommentsReducer = (prevState, action) => {
    switch (action.type) {
      case "SETREPLIES":
        return {
          ...prevState,
          replies: action.replies,
          isLoading: false,
        };
      case "SETCOMMENTCONTENT":
        return {
          ...prevState,
          comments: action.comments,
          isLoading: false,
        };
      case "SETIMAGE":
        return {
          ...prevState,
          sendImage: action.image,
          isLoading: false,
        };
    }
  };
  const [replies, setReplies] = useState([]);
  const [sendImage, setImage] = useState([]);
  const [commentContent, setcommentContent] = useState("");

  function getData() {
    axios
      .get(
        "http://103.27.86.34:3005/api/v2.0/market/post/comment/" +
          route.params.comment._id
      )
      .then((resp) => {
        console.log(resp.data);

        dispatch({ type: "SETREPLIES", replies: resp.data });
        setComments(resp.data);
      });
  }

  const [CommentsState, dispatch] = React.useReducer(
    CommentsReducer,
    initialState
  );
  // var sendImage = "https://res.cloudinary.com/spaarks/image/upload/v1615462254/send_icon_xawmkn.png";
  const [spinner, setSpinner] = useState(false);
  const [spinnerText, setSpinnerText] = useState('Loading');
  const HandleFormSubmit = async () => {

      setSpinner(true)
      setSpinnerText(I18n.t('Posting Comment'))



    setImage(
      "https://res.cloudinary.com/spaarks/image/upload/v1615462212/10360-done_idwnci.gif"
    );
    dispatch({
      type: "SETIMAGE",
      image:
        "https://res.cloudinary.com/spaarks/image/upload/v1615462212/10360-done_idwnci.gif",
    });
    // sendImage = "https://res.cloudinary.com/spaarks/image/upload/v1615462212/10360-done_idwnci.gif";

    var photos = [];
    var photo = {
      uri: "image.uri",
      type: "image.type",
      name: "image",
    };
    photos.push(photo);

    await axios
      .post(
        `${GLOBAL.BASE_URL}${route.params.featureName}/post/subpost/${route.params.comment._id}/comment`,
        {
          content: commentContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
            token
          },
        }
      )
      .then((resp) => {
        setSpinner(false)

        replies.push(resp.data[resp.data.length - 1]);
        setcommentContent(replies);
        setTimeout(() => {
          KeyBoard.current.close();
          dispatch({
            type: "SETIMAGE",
            image:
              "https://res.cloudinary.com/spaarks/image/upload/v1615462254/send_icon_xawmkn.png",
          });
        }, 2000);
        //
        //   getData()
        // navigation.navigate("PostSpecificScreens", {
        //   post: route.params.post,
        // })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function createComment(value) {
    console.log(value);
    setcommentContent(value);
  }

  async function replyNow(){
    if(token!=null){
      KeyBoard.current.open()
    }else{
      Login.current.open()
    }
  }


  function onLogin() {
    // console.log("phoness",phone)
    Login.current.close();
    navigation.navigate("VerifyOtpScreen");
  }

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  useEffect(() => {
    setReplies(route.params.replies);
    // getData()
  }, []);

  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
  const refRBSheet = useRef();
  const scrollViewRef = useRef();
  const KeyBoard = useRef();
  const Login = useRef();

  const RightContent = (props) => (
    <Text style={{ marginRight: 15 }}>
      <Image></Image>
      {route.params.post.distance.toFixed(1)}m
    </Text>
  );



  async function reportUser(post){
    // var post = DashboardState.posts[Number(global.postcurrent[0])]
    // console.log('postpostpostpostpostpost',post)
    // await axios.post(
      alert('To Be Done')
      refRBSheet.current.close()
    //   `${GLOBAL.BASE_URL}${post.featureName}/report/post`,
    //   {
    //     "featureId": post._id,
    //     "reason":"Info Reported"
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization:
    //       GLOBAL.TOKEN._W
    //     },
    //   }
    // ).then((resp)=>{
    //   showSnackReport(resp.data.message)
    // }).catch((err)=>{
    //   console.log(err)
    //   showSnackReport('You have already reported this content')
    // })
    // showSnackReport('You have already reported this content')
  }



  async function showSnackBlock(){
      
    refRBSheet.current.close()
    Snackbar.show({
      text: 'Blocked Saikiran Succesfully',
      duration: Snackbar.LENGTH_LONG,
      action: {
        text: 'UNDO',
        textColor: 'white',
        onPress: () => { /* Do something. */ },
      },
    });
  }
  async function blockUser(){
    alert('To be DOne')
    // showSnackBlock()
    refRBSheet.current.close()
  }


  async function showSnackReport(reason){
    refRBSheet.current.close()
    Snackbar.show({
      text: reason,
      duration: Snackbar.LENGTH_LONG,
      // action: {
      //   text: 'UNDO',
      //   textColor: 'white',
      //   onPress: () => { /* Do something. */ },
      // },
    });
  }

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    await getData();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <KeyboardAvoidingView behavior={"padding"}>
      <View>

<ScrollView>
      <RBSheet
          ref={Login}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={380}
          borderRadius={0}
          closeDuration={100}
          customStyles={{
            draggableIcon: {
              backgroundColor: "#000",
            },
            container: {
              borderRadius: 0,
            },
          }}
        >
          <View style={{ backgroundColor: "#fff", height: 200 }}>
            <View>
              <View>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <View style={{ color: "#000", flex: 13, height: 60 }}>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        margin: 0,
                        fontWeight: "bold",
                        paddingLeft: 0,
                        textAlign: "center",
                      }}
                    >
                      {I18n.t("Login to access this feature")}
                    </Text>

                    <View
                      style={{
                        marginTop: 10,
                        marginLeft: 10,
                        marginRight: 10,
                        borderBottomColor: "#D7D7D7",
                        borderBottomWidth: 1,
                      }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 0 }}>
                  <View style={{ color: "#000", flex: 13, height: 60,justifyContent:"center", alignItems:'center', top: 30 }}>
                    {/* <Text
                      style={{
                        color: "#A1A4B2",
                        fontSize: 14,
                        flex: 70,
                        paddingLeft: 10,
                      }}
                    >
                      We will send you an{" "}
                      <Text style={{ color: "#7E818F", fontWeight: "bold" }}>
                        One Time Password
                      </Text>{" "}
                      on this mobile number.
                    </Text> */}
                    <Image
                      source={require("../assets/icons/login_continue.png")}
                      style={{ height: 150, width: 150,  }}
                    ></Image>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 0 }}>
                  <View style={{ color: "#000", flex: 13, height: 160 ,justifyContent:"center", alignItems:'center'}}>
                    {/* line */}
                    <Button
                      mode="contained"
                      color="#FA5805"
                      style={{
                        height: 40,
                        width: 230,
                        margin: 10,
                        marginTop: 90,
                        
                      }}
                      onPress={() => onLogin()}
                    >
                      {I18n.t("Login to access this feature")}
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </RBSheet>



        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={220}
          borderRadius={10}
          closeDuration={100}
          customStyles={{
            draggableIcon: {
              backgroundColor: "#000",
            },
            container: {
              borderRadius: 30
            }
          }}
        >
          <View style={{ backgroundColor: "#fff", height: 200 }}>
            <View>
              <View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                    <Image
                      source={require("../assets/icons/bottomsheet/1.png")}
                      style={{ height: 26, width: 26 }}
                    ></Image>
                  </View>
                  <View style={{ color: "#000", flex: 13, height: 60 }}>
                    
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        margin: 0,
                        fontWeight: "bold",
                        paddingLeft: 40,
                      }}
                      onPress={()=>{reportUser(route.params.post)}}
                    >
                      {I18n.t("Report")}
                    </Text>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 14,
                        flex: 70,
                        paddingLeft: 40,
                      }}
                    >
                      {I18n.t("Please report if you find this content inappropriate")}
                    </Text>
                    {/* line */}
                    <View
                      style={{
                        marginTop: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        borderBottomColor: "#C0C0C0",
                        borderBottomWidth: 1,
                      }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                    <Image
                      source={require("../assets/icons/bottomsheet/2.png")}
                      style={{ height: 26, width: 26 }}
                    ></Image>
                  </View>
                  <View style={{ color: "#000", flex: 13, height: 60 }}>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        margin: 0,
                        fontWeight: "bold",
                        paddingLeft: 40,
                      }}
                      onPress={()=>{blockUser(route.params.post)}}
                    >
                      {I18n.t("Block")}
                    </Text>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 14,
                        flex: 70,
                        paddingLeft: 40,
                      }}
                    >
                       {I18n.t("If you dont want to receive updates from Nonname")}
                    </Text>
                    {/* line */}
                  
                  </View>
                </View>
              </View>
            </View>
          </View>
        </RBSheet>
        

        <RBSheet
          ref={KeyBoard}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={120}
          borderRadius={10}
          closeDuration={100}
          customStyles={{}}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginLeft: 20, fontSize: 18 }}>Replying to @ </Text>
            <Text style={{ color: "#6FA4E9", fontSize: 20 }}>
              {route.params.comment.userId.name.substr(0,15)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", backgroundColor: "#fff" }}>
            <View style={{ flex: 5 }}>
              <TextInput
                style={{
                  height: 40,
                  width: "95%",
                  borderColor: "#D7D7D7",
                  color: "#848484",
                  borderWidth: 0.5,
                  borderRadius: 20,
                  paddingLeft: 15,
                  margin: 10,
                  fontSize: 18,
                }}
                // Adding hint in TextInput using Placeholder option.
                placeholder="Reply here"
                // Making the Under line Transparent.
                value={commentContent}
                onChangeText={createComment}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 5, marginTop: 0 }}>
              <TouchableOpacity
                onPress={HandleFormSubmit}
                style={{ backgroundColor: "#fff" }}
              >
                <Image
                  source={{ uri: CommentsState.sendImage }}
                  style={{ height: 60, width: 60 }}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

        <View
          style={{
            flex: 0,
            flexDirection: "row",
            marginTop: 5,
            margin: 10,
          }}
        >
          <View style={{ flex: 2 }}>
            <Image
              source={{ uri: route.params.comment.userId.profilePic }}
              style={{
                height: 50,
                width: 50,
                paddingLeft: 20,
                borderRadius: 30,
              }}
            ></Image>
          </View>
          <View
            style={{
              flex: 10,
              backgroundColor: "#f2f2f2",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 8 }}>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  {route.params.comment.userId.name}
                </Text>
                <Text style={{ color: "#7B8794", fontSize: 12, marginTop: 5 }}>
                  {moment(route.params.comment.createdAt).fromNow()}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                {/* <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                  <Image
                    source={require("../assets/icons/dots_grey.png")}
                    style={{
                      height: 23,
                      width: 6,
                      paddingLeft: 20,
                      marginTop: 10,
                    }}
                  />
                </TouchableOpacity> */}
              </View>
            </View>

            <Text
              style={{
                paddingTop: 5,
                fontSize: 14,
                marginTop: 10,
                color: "#0F0F10",
              }}
            >
              {route.params.comment.content}
            </Text>
            <FlatList
      data={route.params.comment.photo}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, i }) => (

        <View style={{margin:0}}>
        <Image
          source={{ uri: item }}
          style={{height:150,width:280,resizeMode:'cover'}}
        />
        </View>
      )}/>
            <TouchableOpacity onPress={() => replyNow()}>
              <Text
                style={{
                  fontWeight: "800",
                  color: "#7B8794",
                  fontSize: 12,
                  paddingTop: 10,
                }}
              >
                {I18n.t("Reply")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

     
          <View style={{ backgroundColor: "#fff" }}>
            <View style={{ margin: 0 }}>
              <Card style={styles.eachCard}>
                <View style={{ backgroundColor: "#fff" }}>
                  <View style={{ backgroundColor: "#f2f2f2", marginTop: 20}}>
                    <View style={{ backgroundColor: "#fff" }}>
                      <View>
                        <View>
                          {/* Replies start here */}
                          <FlatList
          data={replies}
          keyExtractor={(item, index) => item.subCategoryId}
          renderItem={({ item }) => (
                          
                            <View
                              style={{
                                flex: 0,
                                flexDirection: "row",
                                marginTop: 5,
                                margin: 10,
                                marginLeft: 70,
                              }}
                            >
                              <View style={{ flex: 2 }}>
                                <Image
                                  source={{ uri: item.userId.profilePic }}
                                  style={{
                                    height: 50,
                                    width: 50,
                                    paddingLeft: 20,
                                    borderRadius: 30,
                                  }}
                                ></Image>
                              </View>
                              <View
                                style={{
                                  flex: 10,
                                  backgroundColor: "#f2f2f2",
                                  padding: 10,
                                  borderRadius: 10,
                                }}
                              >
                                <View style={{ flexDirection: "row" }}>
                                  <View style={{ flex: 8 }}>
                                    <Text
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: 14,
                                      }}
                                    >
                                      {item.userId.name}
                                    </Text>
                                    <Text
                                      style={{
                                        color: "#7B8794",
                                        fontSize: 12,
                                        marginTop: 5,
                                      }}
                                    >
                                      {moment(item.createdAt).fromNow()}
                                    </Text>
                                  </View>
                                  <View style={{ flex: 1 }}>
                                    {/* <TouchableOpacity
                                      onPress={() => refRBSheet.current.open()}
                                    >
                                      <Image
                                        source={require("../assets/icons/dots_grey.png")}
                                        style={{
                                          height: 23,
                                          width: 6,
                                          paddingLeft: 20,
                                          marginTop: 10,
                                        }}
                                      />
                                    </TouchableOpacity> */}
                                  </View>
                                </View>
                                <Text
                                  style={{
                                    paddingTop: 5,
                                    fontSize: 14,
                                    marginTop: 10,
                                    color: "#0F0F10",
                                  }}
                                >
                                  {item.content}
                                </Text>


                              </View>
                            </View>
                         
                         )}/>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>
            </View>
          </View>

      
          </ScrollView>
      
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStatetoProps = (state) => {
  return {
    chat_roster_main: state.chatss.chat_roster_main,
    allMapPosts:state.chatss.allMapPosts,
    token:state.chatss.token

  };
};
export default connect(mapStatetoProps)(RepliesScreen);

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: "#dbdbdb",
    padding: 10,
  },
  chats: {
    height: 60,
    width: 40,
    margin: 15,
  },
  chatss: {
    height: 50,
    width: 60,
    margin: 20,
  },
  eachCard: {
    padding: 0,
    backgroundColor: "#fff",
    marginBottom: 0,
  },

  BottomNav: {
    flex: 0,
    flexDirection: "row",
    backgroundColor: "#63CDFF",
  },

  LoginComponent: {
    // height: 500,
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
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 16
  },
});
