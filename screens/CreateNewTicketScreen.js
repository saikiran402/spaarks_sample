import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text, Button, StyleSheet, Image, ActionSheetIOS,FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import Textarea from "react-native-textarea";
import I18n from '../src/i18n';
import { Chip } from 'react-native-paper';
import { connect, useDispatch, useReducer } from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';
const GLOBAL = require('../Globals');
import chatReducers from "../reducers/chatReducers";
import ImagePicker from "react-native-customized-image-picker";
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const defaultScrollViewProps = {
    keyboardShouldPersistTaps: "handled",
    scrollEnabled: "false",
    showsVerticalScrollIndicator: "false",
    
  };
// function ImagePickerExample({ route, navigation }) {
//     useEffect(() => {
//         (async () => {
//             if (Platform.OS !== "web") {
//                 const {
//                     status,
//                 } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//                 if (status !== "granted") {
//                     alert("Sorry, we need camera roll permissions to make this work!");
//                 }
//             }
//         })();
//     }, []);

//     return (
//         <>
//             {route.params.mediaP.length == 4 ||
//                 (route.params.mediaP.length == 3 && route.params.mediaV.length == 1) ? (
//                 <></>
//             ) : (
//                 <View style={{ flexDirection: "row" }}>
//                     <View style={{ flex: 1, color: "#fff", justifyContent: "center" }}>
//                         <View style={{ flexDirection: "row" }}>
//                             <Image
//                                 source={require("../assets/icons/infoimages.png")}
//                                 style={styles.chatss}
//                             ></Image>
//                             <Text
//                                 onPress={showImageSelection}
//                                 style={{
//                                     color: "#6FA4E9",
//                                     fontWeight: "bold",
//                                     fontSize: 14,
//                                     marginTop: 22,
//                                 }}
//                             >
//                                 Add Image
//                 </Text>
//                             {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
//                         </View>
//                     </View>
//                     {route.params.mediaV.length == 1 ||
//                         route.params.mediaP.length == 4 ? (
//                         <></>
//                     ) : (
//                         <View style={{ flexDirection: "row", flex: 2 }}>
//                             <Image
//                                 source={require("../assets/icons/infovideo.png")}
//                                 style={{ marginLeft: 30, height: 20, width: 30, margin: 20 }}
//                             ></Image>

//                             <Text
//                                 onPress={showVideoSelection}
//                                 style={{
//                                     fontWeight: "bold",
//                                     color: "#44BE4A",
//                                     fontSize: 14,
//                                     marginTop: 22,
//                                 }}
//                             >
//                                 Add Video
//                 </Text>
//                         </View>
//                     )}
//                 </View>
//             )}
//         </>

//         //   <TouchableOpacity onPress={pickImage} style={{backgroundColor:"#fff"}}>
//         //   <View style={{flexDirection:'column'}}>
//         //                                                 <Image source={require('../assets/icons/infoimages.png')} style={styles.chatss}></Image>
//         //                                                 <Text style={{color:"#6FA4E9",fontWeight:"bold"}}>
//         //                                                     Add Images
//         //                                                 </Text>
//         //    </View>
//         //    </TouchableOpacity>
//     );
// }

// const DismissKeyboardHOC = (Comp) => {
//     return ({ children, ...props }) => (
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//         <Comp {...props}>
//           {children}
//         </Comp>
//       </TouchableWithoutFeedback>
//     );
//   };
//   const DismissKeyboardView = DismissKeyboardHOC(View)
const CreateNewTicketScreen = ({ navigation, route,token,Mytickets }) => {
    const Chatdispatcher = useDispatch(chatReducers);
    const [images,setImages] = useState([])
    const [content,setContent] = useState('')
    const [imagesupload,setUpload] = useState([])
const [canselectImage,setCanSelectImage] = useState(true)
const [imagesRemaining,setRemaining] = useState(4)


async function deleteImage(path,mediaType){
var newc = imagesRemaining;
    setRemaining(newc+1)
    // alert(imagesRemaining)
      const newImages =  imagesupload.filter((item) => item.uri !== path);
      setUpload(newImages)
    

    }
    const [spinner, setSpinner]= useState(false);
    const [spinnerText, setSpinnerText]= useState('Loading');
    async function createTicket(){
      var jwt = await AsyncStorage.getItem('token')
      if(content.length>0){
        setSpinner(true)
        setSpinnerText('Creating Ticket ...')
          const formData = new FormData();
  
        console.log('photossphotossphotossphotoss',imagesupload)
        if (imagesupload.length) {
          imagesupload.forEach((list) => {
            formData.append("photo", list);
          });
        }
          formData.append("content", content);
          formData.append("subject", route.params.subject);
          formData.append("type", 'help');
          console.log('formDataformDataformDataformData',formData._parts[0])
          await axios.post(GLOBAL.BASE_URL+'ticket/',
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization:
                  'Bearer '+jwt
                },
              }
            )
            .then((resp) => {
                console.log('CREATEDEEEEE',resp.data.thread)
                var a = [resp.data.ticket,...Mytickets]
              Chatdispatcher({type:'UPDATEMYTICKETS',Mytickets:a})
              navigation.popToTop()
              navigation.navigate('TicketSpecificScreen', { ticket: resp.data.ticket })
  
            }).catch((err)=>{
              console.log(err)
              setSpinner(false)
              alert(I18n.t('Something went wrong'))
            })
      }else{
        alert(I18n.t('Please describe the issue'))
     
      }
      
    }

      function addImages() {
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
            maxSize: imagesRemaining,
    
            // width: 20,
            // height: 20
          }).then(images => {
           
            // alert(images.length)
            var rem = imagesRemaining - images.length;
            setRemaining(rem)
            if(images.length == 4){
              setCanSelectImage(false)
            }
            var newUploads = [...imagesupload]
            images.forEach(list=>{
              var photo = {
               
                uri: list.path,
                            
                            // mediaType:list.mediaType,
                            type: 'image/jpg',
                            name: "ticket-image.jpg",
                
              };
              newUploads.push(photo)
            })
              
            console.log('yiuytyuytyuytyuytyuytyuy',images);
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
            
            // var imagesuploads = [...imagesupload,...images]
            // var newImag = []
            // var cou = 1;
            // imagesuploads.forEach(list=>{
            //   var photo = {
            //     uri: list.path,
            //                 type: 'image/jpg',
            //                 name: "ticket-image.jpg",
            //   };
            //   newImag.push(photo)
            //   cou++;
            // })
            // console.log('yiuytyuytyuytyuytyuytyuy',images);
            // setUpload(newImag)

                  
            // alert(images.length)
            console.log('NEWUPLOLOLOLO',images)
            var rem = imagesRemaining - images.length;
            setRemaining(rem)
            if(images.length == 2){
              setCanSelectImage(false)
            }
            var newUploads = [...imagesupload]
            images.forEach(list=>{
              var photo = {
                uri: list.path,         
                type: 'image/jpg',
                name: "ticket-image.jpg",
                
              };
              newUploads.push(photo)
            })
              
            console.log('NEWUPLOLOLOLO',newUploads);
            setUpload(newUploads)
              });
              
            }
            else {
    
            }
          }
        );
      }


    return (
        <ScrollView>
             <Spinner
          visible={spinner}
          textContent={"Creating Ticket ..."}
          textStyle={{color:'#fff'}}
        />
            <View style={{ backgroundColor: '#fff', height: 1000 }} >
                <View style={{ padding: 15,backgroundColor:'#fff' }}>
                    <Text style={{fontWeight:'bold'}}>{I18n.t('Subject')}  :</Text>
                    <Text>{I18n.t(route.params.subject)}</Text>
                    <Text
                        style={{
                            marginLeft: 0,
                            color: "#000",
                            fontWeight: "bold",
                            fontSize: 20,
                            marginTop: 10,
                            marginBottom:20
                        }}
                    >

                    {I18n.t("Please elaborate your issue")}
      </Text>

                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={{flex: 1}}> */}
                    {/* <DismissKeyboardView> */}
        {/* <TextInput keyboardType='numeric'/> */}
        {/* <TouchableWithoutFeedback onPress={ () => { DismissKeyboard() } }> */}

        <Textarea
                        
                        maxLength={1000}
                        value={content}
                        onChangeText={setContent}
                     
                        placeholder={
                            I18n.t("Start typing here")
                        }
                        style={{backgroundColor:'#f2f2f2',height:200,borderRadius:10,padding:10,marginTop:10}}
                        placeholderTextColor={"#c7c7c7"}
                        underlineColorAndroid={"transparent"}
                        scrollViewProps={defaultScrollViewProps}

                        // onSubmitEditing={Keyboard.dismiss}
                    />
                    
                    <View
                      style={{
                        marginTop: 0.5,
                        marginLeft: 0,
                        marginRight: 0,
                        borderBottomColor: "#EAEAEA",
                        borderBottomWidth: 0.2,
                      }}
                    />
                    {
                        imagesRemaining == 0?

                        <TouchableOpacity onPress={()=>{alert(I18n.t('Max 4 Images'))}}>
                        <View style={{ flexDirection: "row",backgroundColor:'#fff' }}  >
                        
                            <Image
                               source={require("../assets/icons/infoimages1.png")}
                                style={{ marginLeft: 120, height: 25, width: 30, margin: 9 }}
                            ></Image>
                            <Text style={{fontWeight:'bold',marginTop:12,fontSize:16,color:"#f2f2f2"}}>{I18n.t("Add Image")}</Text>
                        </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=>{addImages()}}>
                        <View style={{ flexDirection: "row",backgroundColor:'#fff' }}  >
                        
                            <Image
                               source={require("../assets/icons/infoimages1.png")}
                                style={{ marginLeft: 120, height: 25, width: 30, margin: 9 }}
                            ></Image>
                            <Text style={{fontWeight:'bold',marginTop:12,fontSize:16,color:"#6FA4E9"}}>{I18n.t("Add Image")}</Text>
                        </View>
                        </TouchableOpacity>
                    }
                  
                </View>
                <View>
                <FlatList
      data={imagesupload}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, i }) => (
        <TouchableOpacity onPress={()=>deleteImage(item.uri)}> 
        <View style={{margin:15}}>
        <Image
          source={{ uri: item.uri }}
          style={{height:70,width:70}}
        />
        {/* <TouchableOpacity onPress={()=>deleteImage(item.path)}> */}
        <Image
          source={{ uri: 'https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/38-512.png' }}
          style={{height:20,width:20,position:'absolute',left:60,top:-5}}
          onPress={()=>deleteImage(item.path)}
        />
        {/* </TouchableOpacity> */}
        </View>
</TouchableOpacity> 
      )}/>
                </View>
                <View style={{justifyContent:'center',textAlign:'center',marginLeft:120}}>
                <Chip mode={'outlined'} style={{paddingTop: 10, marginLeft : 110,  backgroundColor: '#6FA4E9', justifyContent:'center',textAlign:'center', marginTop: 15, marginBottom: 10, width: 150 }}>
                    <View  >
                        <TouchableOpacity onPress={() => { createTicket() }}>
                            <Text style={{ color: '#fff', textAlign: "center" }}>{I18n.t("Submit")}</Text>
                        </TouchableOpacity>
                    </View>
                </Chip>
                </View>
            </View>
        </ScrollView>
    );
};

const mapStatetoProps = (state) => {
    return {
      chat_roster_main: state.chatss.chat_roster_main,
      allMapPosts:state.chatss.allMapPosts,
      token:state.chatss.token,
      Mytickets:state.chatss.Mytickets
  
    };
  };
  export default connect(mapStatetoProps)(CreateNewTicketScreen);

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
        margin: 15,
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
