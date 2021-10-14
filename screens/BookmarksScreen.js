
import React,{useEffect, useRef,useState}from "react";
import {
  View,
  Dimensions,
  Share,
  Linking,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Avatar,
  Chip,
  Card,
  Title,
  Paragraph,
  Searchbar,
  ActivityIndicator,
} from "react-native-paper";
import PostCard from "../components/PostCard";
import Hyperlink from 'react-native-hyperlink';
import RNUrlPreview from 'react-native-url-preview';
import Snackbar from 'react-native-snackbar';
import Dialog from "react-native-dialog";
import { Rating, AirbnbRating, Divider } from "react-native-elements";
import axios from "axios";
import moment from 'moment';
import I18n from '../src/i18n';
import { connect, useDispatch, useReducer } from "react-redux";
import chatReducers from "../reducers/chatReducers";
import postsReducers from "../reducers/postsReducers";
import Highlighter from 'react-native-highlight-words';
const GLOBAL = require('../Globals');
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ViewShot from "react-native-view-shot";
import RBSheet from "react-native-raw-bottom-sheet";
import Video from 'react-native-video';




const BookmarksScreen = ({ navigation, item, userId }) => {

  const refRBSheet = useRef();
  const refRBSheets = useRef();
  const refRBSheetss = useRef();
  const Login = useRef();
  const [posts, setPosts] = React.useState([]);
  const [profiles, setProfile] = React.useState([]);
  const [bookmark, setBookmark]=useState([])
  const [isLoading, setLoading]=useState(true)

  async function getData(){
    var token  = await  AsyncStorage.getItem('token');
    console.log(GLOBAL.BASE_URL+"user/bookmarks/phone")
    await axios.get(GLOBAL.BASE_URL+"user/bookmarks/phone",{
      headers: {
        "Content-Type": "application/json",
        Authorization:
        'Bearer '+token
      },
    }).then((resp) => {
      console.log('Bookmarkedssssskkkkkk',resp.data.users);
      // setResults([])
      // setResults(resp.data.categories);
      setPosts(resp.data.data.post);
      setProfile(resp.data.users);
      setLoading(false)
    });
  }
  const renderPostCard = ({ item, index }) =>{
    return(
      <>
      <PostCard 
      item={item}
      bookmarked={true} 
      index={index} 
      banners={[]} 
      from={"Bookmark"}
      getDataforBookmarks={getData}
      navigation={navigation}/>
      </>
    )
  }


  async function removeBookmark(item){
   console.log("yo",item)
      
  var jwt = await AsyncStorage.getItem('token');
  await axios.post(
    GLOBAL.BASE_URL + "user/removebookmark/user",
    {
      userId: item._id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
        'Bearer '+jwt
      },
    }
  )
    .then((responseJson) => {
     
      console.log('removes profile bookmrk successfully', responseJson.data)
      // setBookmark(true)
      // alert("done")
      getData()

    })
    .catch((error) => {
      console.error(error);
    });

    
  }
  



  useEffect(()=>{
      getData()
  },[])




if(isLoading){
  return(
    <ActivityIndicator/>
  )
}

function SpaarksResults() {
  return (
    <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'#f2f2f2' }}>


{
   posts.length>0?



<FlatList
                        data={posts}
                        // keyExtractor={(item, index) => item.index}
                        keyExtractor={item => item.id}
                        renderItem={renderPostCard}
                      />
              
                          :
                          <View style={{justifyContent:"center", alignItems:"center"}}>
                        <Image source={require('../assets/icons/bigbookmark.png')} style={{height:120,width:120, marginTop: 10}}/>
                            
                          <Text style={{textAlign:'center',justifyContent:'center',fontSize:18, color:'#9A9A9A'}}>{I18n.t("You don't have any bookmarks yet")}</Text>
                          </View>
              }
                
    </View>
  );
}


function ProfileResults() {
  return (
    <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'#f2f2f2' }}>
{
  profiles.length>0?
    <FlatList
        data={profiles}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
         

          <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            borderRadius: 10,
            margin: 10,
            marginBottom:0
          }}
        >
         
          <View style={{ flex: 10, padding: 5 }}>

            <Image
              source={{ uri: item.profilePic }}
              style={{ height: 80, width: 80, borderRadius: 30 }}
              cache="force-cache"
            ></Image>
          </View>
          
          <View style={{ flex: 30 }}>
          <TouchableOpacity      onPress={() => {navigation.navigate("SellerProfile", {
      userId: item._id,
      bookmark:true
      
    })}}>
              <View style={{ flexDirection: "column",padding:8,paddingTop:0 }}>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 18,
                    fontWeight: "bold",
                    margin: 4,
                    marginLeft: 10,
                    marginTop: 20,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{ color: "#6FA4E9", margin: 0, marginLeft: 10, fontWeight: '400' }}
                >
                  {I18n.t("Services offered")}{" - "}
           <Text style={{  fontWeight: 'bold'}}>{item.serviceOfferings}</Text>
                    
             
                </Text>
              </View>
              </TouchableOpacity>
            
          </View>

          <View style={{ flex: 6,flexDirection:'row' }}>
            {/* <View>
           <Text style={{right:10, top: 30, color: '#6FA4E9', fontWeight: 'bold', fontSize: 20}}>{item.serviceOfferings}</Text>
            </View> */}
            <View>
            <TouchableOpacity  onPress={()=>{removeBookmark(item)}}>

            <Image 
                  source={require("../assets/marketprofilebookmark.png")} 
                  style={{height:35, width: 13, top: 30}}/>
                  </TouchableOpacity>
              </View>
      
            
          </View>
        </View>




        )}
      />    
    :  <View style={{justifyContent:"center", alignItems:"center"}}>

<Image source={require('../assets/icons/bigbookmark.png')} style={{height:120,width:120, marginTop: 10}}/>
    
  <Text style={{textAlign:'center',justifyContent:'center',fontSize:18, color:'#9A9A9A'}}>{I18n.t("You don't have any bookmarks yet")}</Text>
  </View>
}
  </View>
  );
}




  const Tab = createMaterialTopTabNavigator();
  return (
 
 
  <View style={styles.container}>
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
                            borderRadius: 30,
                          },
                        }}
                      >
                        <View style={{ backgroundColor: "#fff", height: 200 }}>
                          <View>
                            <View>
                              <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                                  <Image
                                    cache="force-cache"
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
                                    onPress={() => { reportUser(Number(global.postcurrent[0])) }}
                                  >
                                    Report Spaark
                                </Text>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      flex: 70,
                                      paddingLeft: 40,
                                    }}
                                  >
                                    Please report if you find this content inappropriate
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
                              <View style={{ flexDirection: "row", marginTop: 20 }} onPress={() => { blockUser(currentPost) }}>
                                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                                  <Image
                                    cache="force-cache"
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
                                  >
                                    <Text style={{ color: '#000' }}>Block</Text>
                                  </Text>

                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      flex: 70,
                                      paddingLeft: 40,
                                    }}
                                  >
                                    If you dont want to receive updates from Nonname
                                </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>


                      </RBSheet>
                      {/* Login to access */}
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
                                <View style={{ color: "#000", flex: 13, height: 60, justifyContent:"center", alignItems:'center', top: 30}}>
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
                                  <Image source={require('../assets/icons/login_continue.png')} style={{ height: 150, width: 150 }}></Image>

                                </View>
                              </View>
                              <View style={{ flexDirection: "row", marginTop: 0 }}>
                                <View style={{ color: "#000", flex: 13, height: 160,justifyContent:"center", alignItems:'center' }}>


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
                      {/* Spaarks Call disabled */}
                      <RBSheet
                        ref={refRBSheets}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        height={170}
                        borderRadius={10}
                        closeDuration={100}
                        customStyles={{
                          draggableIcon: {
                            backgroundColor: "#000",
                          },
                          container: {
                            borderRadius: 30,
                          },
                        }}
                      >
                        <View style={{ backgroundColor: "#fff", height: 200 }}>
                          <View>
                            <View>
                              <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                                  <Image
                                    source={require("../assets/bottomCard/call_message.png")}
                                    style={{ height: 100, width: 100 }}
                                  ></Image>
                                </View>
                                <View
                                  style={{
                                    color: "#000",
                                    flex: 13,
                                    height: 80,
                                    paddingLeft: 45,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 16,
                                      margin: 0,
                                      fontWeight: "bold",
                                      paddingLeft: 40,
                                    }}
                                  >
                                    Owner of this Spaark disabled Call option.
                                </Text>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 8,
                                      flex: 70,
                                      paddingLeft: 40,
                                    }}
                                  >
                                    Note : You can also disable call
                                </Text>
                                  {/* line */}
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 0,
                                      flex: 60,
                                      paddingLeft: 40,
                                    }}
                                  >
                                    while posting a spaark.
                                </Text>
                                </View>
                                <View style={{ flex: 3 }}></View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </RBSheet>
                      {/* Spaarks Chat disabled */}
                      <RBSheet
                        ref={refRBSheetss}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        height={170}
                        borderRadius={10}
                        closeDuration={100}
                        customStyles={{
                          draggableIcon: {
                            backgroundColor: "#000",
                          },
                          container: {
                            borderRadius: 30,
                          },
                        }}
                      >
                        <View style={{ backgroundColor: "#fff", height: 200 }}>
                          <View>
                            <View>
                              <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                                  <Image
                                    source={require("../assets/bottomCard/chat_message.png")}
                                    style={{ height: 100, width: 100 }}
                                  ></Image>
                                </View>
                                <View
                                  style={{
                                    color: "#000",
                                    flex: 13,
                                    height: 80,
                                    paddingLeft: 45,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 16,
                                      margin: 0,
                                      fontWeight: "bold",
                                      paddingLeft: 40,
                                    }}
                                  >
                                    Owner of this Spaark disabled Chat option.
                                </Text>
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 8,
                                      flex: 70,
                                      paddingLeft: 40,
                                    }}
                                  >
                                    Note : You can also disable chat
                                </Text>
                                  {/* line */}
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontSize: 14,
                                      marginTop: 0,
                                      flex: 60,
                                      paddingLeft: 40,
                                    }}
                                  >
                                    while posting a spaark
                                </Text>
                                </View>
                                <View style={{ flex: 3 }}></View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </RBSheet>

              <Tab.Navigator screenOptions={{
        
        headerStyle: {
          backgroundColor: '#fff',
          },
          headerTintColor: '#6FA4E9',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}
      tabBarOptions={{
        labelStyle: { fontSize: 9 },
        allowFontScaling:true,
        activeTintColor:'#6FA4E9',
        inactiveTintColor:'#9A9A9A',
        indicatorStyle:{backgroundColor:'#6FA4E9',height:3}
      }}>
                     {/* <Tab.Screen name="Results" component={SearchResults} /> */}
            <Tab.Screen name={I18n.t('Spaarks')}  component={SpaarksResults} />
       
            <Tab.Screen name= {I18n.t("Market Profile")}  component={ProfileResults} />
          </Tab.Navigator>
        
          </View>

  
    
  );
};




export default BookmarksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 10 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 35,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chats: {
    height: 30,
    width: 30,
    margin: 23,
  },
  chatss: {
    height: 30,
    width: 30,
    margin: 32,
  },
  eachCard: {
    padding: 0,
    backgroundColor: "#fff",
    marginBottom: 10,
    marginTop:6
  },
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
  bgimage: {
    resizeMode: "repeat",
    justifyContent: "center",
  },
  rows2: {
    flex: 0,
    flexDirection: "row",
  },
  scrollView: {},
 
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
    backgroundColor:'#000',
    justifyContent:'center',
    marginTop:140,
    width: 360,
    height: 250,
    resizeMode: "contain"
  }
});
