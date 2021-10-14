import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  ActionSheetIOS,
  Button,
  InputText,
  LogBox,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  NativeAppEventEmitter,
  DeviceEventEmitter,
  NativeModules,
  NativeEventEmitter,
  Platform,
  Alert
} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import Clipboard from '@react-native-community/clipboard';
import { updateChat } from './AllFeaturesScreen';
import PushNotification from "react-native-push-notification";
import Snackbar from 'react-native-snackbar';
import Video from 'react-native-video';
import moment from "moment";
import {
  Bubble,
  GiftedChat,
  Send,
  Composer,
  Actions,
  ActionsProps,
} from "react-native-gifted-chat";
import DocumentPicker from 'react-native-document-picker';
import SoundRecorder from 'react-native-sound-recorder';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const GLOBAL = require('../Globals');
import { connect, useDispatch, useReducer } from "react-redux";

import ImagePicker from "react-native-customized-image-picker";
import chatReducers from "../reducers/chatReducers";
import chatReducersactual from "../reducers/chatReducersactual";
import { sendMessage, connectXMPP } from "./xmpp";
import { finalXMPP } from './AllFeaturesScreen'
import axios from "axios";
import _ from "lodash";
import AsyncStorage from "@react-native-community/async-storage";
import RBSheet from "react-native-raw-bottom-sheet";
import { Dimensions } from "react-native";
import OpenFile from 'react-native-doc-viewer';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
var colors = ["#4E5567", "#6CB28E", "#FA6E5A"];
import Dialog from "react-native-dialog";
import I18n from '../src/i18n';
import { callKeepSetup, handleConnect,hangupCallIncomingCall } from './OutGoingCallScreen'



const ChatScreen = ({
  navigation,
  route,
  chat_roster_main,
  chat_roster_anonymous,
  messagess,
  token,
  unreadCount

}) => {
  var SavePath = Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;

  eventEmitter = new NativeEventEmitter(NativeModules.RNReactNativeDocViewer);


  const [spinner, setSpinner] = useState(false);
  const [spinnerText, setSpinnerText] = useState('Uploading Images');

  eventEmitter.addListener('DoneButtonEvent', (data) => {
    /*
    *Done Button Clicked
    * return truez
    */
    console.log(data.close);
    // this.setState({donebuttonclicked: data.close});
  })

  eventEmitter.addListener(
    'RNDownloaderProgress',
    (Event) => {
      console.log("Progress - Download " + Event.progress + " %")
      // this.setState({progress: Event.progress + " %"});
    }

  );

  const Chatdispatcher = useDispatch(chatReducers);
  const ActualChatdispatcher = useDispatch(chatReducersactual);


  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [dynHeight , setDynHeight] = useState(300)
  const [visible , setVisible] = useState(false);
  const [aliasName , setAliasName] = useState("")




  const [documents, setDocuments] = useState([]);
  const [video, setVideo] = useState([]);
  var this_chat = chat_roster_main.find((item) => item.jid == route.params.jid);
  if (this_chat) {
    var this_messages = this_chat.messages;
  } else {
    this_chat = {
      _id: route.params.item._id,
      aid: route.params.item.aid,
      blocked: route.params.item.blocked,
      blockedMe: route.params.item.blockedMe,
      canResume: route.params.item.canResume,
      chatExit: route.params.item.chatExit,
      chatExitMe: route.params.item.chatExitMe,
      clearChat: route.params.item.clearChat,
      contactMe: route.params.item.contactMe,
      connection: route.params.item.connection,
      jid: route.params.item.jid,
      name: route.params.item.name,
      messages: route.params.item.messages,
      message: route.params.item.message,
      offline_count: route.params.item.offline_count,
      profilePic: route.params.item.profilePic,
      userId: route.params.item.userId,
      updatedAt: Date.now(),
    }
    var this_messages = [];
  }

  
 

  async function clickedDocument(doc) {
    console.log(doc.text.substr(doc.text.lastIndexOf("/") + 14, doc.text.length))
    //     console.log(doc,RNFS.DocumentDirectoryPath)
    const url = doc.text;

    // // Feel free to change main path according to your requirements.
    // // IMPORTANT: A file extension is always required on iOS.
    // // You might encounter issues if the file extension isn't included
    // // or if the extension doesn't match the mime type of the file.
    // const localFile = `${RNFS.DocumentDirectoryPath}/${doc.text.substr(doc.text.lastIndexOf("/")+14,doc.text.length)}`;

    // const options = {
    //   fromUrl: url,
    //   toFile: localFile
    // };
    // RNFS.downloadFile(options).promise
    // .then(() => FileViewer.open(localFile))
    // .then(() => {
    //     // success
    // })
    // .catch(error => {
    //     // error
    // });

    const localFile = `${RNFS.DocumentDirectoryPath}/${doc.text.substr(doc.text.lastIndexOf("/") + 14, doc.text.length)}`;

    const options = {
      fromUrl: url,
      toFile: localFile
    };
    RNFS.downloadFile(options).promise
      .then(() => FileViewer.open(localFile))
      .then(() => {
        // success
      })
      .catch(error => {
        // error
      });
    // if(Platform.OS === 'ios'){
    //   //IOS
    //   OpenFile.openDoc([{
    //     url:doc,
    //     fileNameOptional:doc
    //   }], (error, url) => {
    //      if (error) {
    //        console.error(error);
    //      } else {
    //        console.log(url)
    //      }
    //    })
    // }else{
    //   //Android
    //   OpenFile.openDoc([{
    //     url:"http://mail.hartl-haus.at/uploads/tx_hhhouses/htf13_classic153s(3_giebel_haus).jpg", // Local "file://" + filepath
    //     fileName:"sample",
    //     cache:false,
    //     fileType:"jpg"
    //   }], (error, url) => {
    //      if (error) {
    //        console.error(error);
    //      } else {
    //        console.log(url)
    //      }
    //    })
    // }
  }

  const refRBSheet = useRef();
  const chatOptions = useRef()


  function renderChatEmpty() {
    return (
     
      <View
        style={{
          flex: 1,
          alignSelf: "center",
          justifyContent: "center",
          transform: [{ scaleY: -1 }],
        }}
      >
         <TouchableOpacity onPress={() =>   navigation.navigate('UserProfileDynamic',{userId:route.params.jid.substr(0,24)})}>

        <Image
          source={{ uri: this_chat.profilePic }}
          style={{
            height: 60,
            width: 60,
            marginLeft: Dimensions.get('window').width/5,
            marginBottom: 10,
            borderRadius:30
          }}
        ></Image>
        <Text style={{ color: "#000" }}>
          {I18n.t("Start your first conversation with")}
        </Text>
        <Text style={{ color: "#6FA4E9", textAlign: 'center' }}>{this_chat.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  //   if(route.params.media.length>0){

  // //  console.log("In ChatSpecificAfterMedia",route.params.media)
  //  var imag = [];
  //  route.params.media.map(list=>{
  //    if(list.mediaType == 'video'){
  //     //  console.log("video")
  //   var video = {
  //     uri: list.uri,
  //     mimetype: "video/mp4",
  //     name: "video-ios.mp4",
  //   };
  //   imag.push(video);
  //    }else{
  //   var photo = {
  //     uri: list.uri,
  //     mimetype: "image/jpeg",
  //     name: "image-ios.jpeg",
  //   };
  //   imag.push(photo);
  //     // console.log("photo")
  //    }
  //  })
  //   // var photo = {
  //   //   uri: result.uri,
  //   //   mimetype: "image/jpeg",
  //   //   name: "image-ios.jpeg",
  //   // };
  //   // var imag = [];
  //   // imag.push(photo);
  //   const formData = new FormData();
  //   if (imag.length) {
  //     imag.forEach((list) => {
  //       formData.append("photo", list);
  //     });
  //   }
  //   axios
  //     .post(
  //       `${GLOBAL.BASE_URL}user/uploadChatMedia`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization:
  //           token
  //         },
  //       }
  //     )
  //     .then((resp) => {
  //       // console.log(resp.data.message);

  //       //send message to other and update in state
  //       chat_roster_main = chat_roster_main.filter(
  //         (item) => item.jid !== route.params.jid
  //       );
  //       var messagesFromLib = []
  //       resp.data.message.forEach(list=>{
  //         if(list.substr(list.length-3) == 'mp4'){
  //           this_chat.messages.splice(0, 0, {
  //             content: list,
  //             video: list,
  //             messageType:'video',
  //             messageId:Date.now()*1000,
  //             createdAt: Date.now(),
  //             _id: Date.now(),
  //             unique: Date.now(),
  //             type: "video",
  //             user: {
  //               _id: 2,
  //               name:'Spaarks',
  //               profilePic:''
  //             },
  //           });
  //           this_chat.message = "VIDEO";
  //           var newMes = {
  //             type: "video",
  //             content: list,
  //             unique: Date.now(),
  //           }
  //           messagesFromLib.push(newMes)
  //         }
  //         if(list.substr(list.length-3) == 'peg'){
  //           this_chat.messages.splice(0, 0, {
  //             content: list,
  //             image: list,
  //             createdAt: Date.now(),
  //             _id: Date.now(),
  //             unique: Date.now(),
  //             type: "imahe",
  //             user: {
  //               _id: 2,
  //             },
  //           });
  //           this_chat.message = "IMAGE";
  //           var newMes = {
  //             type: "image",
  //             content: list,
  //             unique: Date.now(),
  //           }
  //           messagesFromLib.push(newMes)
  //         }

  //         this_chat.updatedAt = Date.now();

  //       })

  //       chat_roster_main.splice(0, 0, this_chat);
  //       dispatch({
  //         type: "SETMYMESSAGEMAIN",
  //         chat_roster_main: chat_roster_main,
  //       });
  //       // const message = {
  //       //   type: "image",
  //       //   content: resp.data.message[0],
  //       //   unique: Date.now(),
  //       // };
  //       // console.log("In asd");
  //       // sendMessage(messagesFromLib, route.params.jid);
  //       connectXMPP(2,messagesFromLib,route.params.jid)
  //       route.params.media = [];
  //       // navigation.navigate('Details',{setLoading:"true",message:"Post Created Succesfully",showTag:true})
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   }
  const pickImageLibrary = async () => {
  
    var jwt = await AsyncStorage.getItem('token')
    var imag = [];
    var sent = 0;
    await ImagePicker.openPicker({
      multiple: true,
      maxSize: 10,
      hideCropBottomControls: true
    }).then(async (images) => {
      imag = images;
      // alert(images.length)
      setImages(images)

      // setTimeout(() => {

        if (images.length > 0) {
          images.forEach(async (list) => {
            var photo = {
              uri: list.path,
              mimetype: "image/jpeg",
              name: `image-ios-${Date.now()}-${Math.random()}.jpeg`,
            };
          //   imag.push(photo);
          // })

          const formData = new FormData();
          // if (imag.length) {
          //   imag.forEach((list) => {
              console.log('0000000000', photo)
              formData.append("photo", photo);
          //   });
          // }
          console.log('SENDINGTOSERVER', formData)
          await axios
            .post(
              `${GLOBAL.BASE_URL}user/uploadChatMedia`,
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
              var localDate  = Date.now()
              var finalUnique = localDate * 1000;
             
              console.log('FROMSERVERAFTERUPLOAD', resp.data);
              resp.data.message.forEach((photoE) => {
                chat_roster_main = chat_roster_main.filter(
                  (item) => item.jid !== route.params.jid
                );
                this_chat.photos.push({url:photoE})
                this_chat.messages.splice(0, 0, {
                  content: photoE,
                  image: photoE,
                  messageType: 'image',
                  messageId: finalUnique,
                  createdAt: localDate,
                  _id: localDate,
                  unique: finalUnique,
                  type: "chat",
                  user: {
                    _id: 2,
                  },
                });
                this_chat.updatedAt = localDate;
                this_chat.message = "IMAGE";
                chat_roster_main.splice(0, 0, this_chat);
                dispatch({
                  type: "SETMYMESSAGEMAIN",
                  chat_roster_main: chat_roster_main,
                });
                const message = {
                  type: "image",
                  content: photoE,
                  unique: finalUnique,
                };
                console.log("In asd");
                console.log('WHATISSENT', message, route.params.jid)
                var mes = [];
                mes.push(message)
                sendMessage(mes, route.params.jid);
              })
              //send message to other and update in state

              // navigation.navigate('Details',{setLoading:"true",message:"Post Created Succesfully",showTag:true})
            })
            .catch((err) => {
              console.log(err);
            });
          // imag.push(photo);
          // setImages(imag);
          // // dispatch({ type: "SETIMAGES", images: imag });
          // console.log("asas");
          // console.log("allImages", imag);
          // console.log("NewInfoState", NewInfoState.images);
          sent++;
        })

        }

      
        

      // }, 1000);

    });
    var imagesTimer =  setInterval(() => {
      if(imag.length == sent){
        setSpinner(false)
        return () => clearInterval(imagesTimer);
      }
    }, 2000);

  };


  const pickVideoLibrary = async () => {
    var imag = [];
    var jwt = await AsyncStorage.getItem('token')
    await launchImageLibrary({mediaType:'video',selectionLimit:0},(images)=>{
      if(!images.didCancel){
      console.log('callback',images)
        // var video = {
        //   uri: images.uri,
        //   mimetype: "video/mp4",
        //   name: "video_ios.mp4",
        // };

        // setImages(images)

        setTimeout(() => {

            // images.forEach(list => {
            //   var photo = {
            //     uri: list.uri,
            //     mimetype: "video/mp4",
            //     name: "video-ios.jpeg",
            //   };
            //   imag.push(photo);
            // })
        //     var video = {
        //   uri: images.uri,
        //   mimetype: "video/mp4",
        //   name: "video_ios.mp4",
        // };
        //     imag.push(video);
            const formData = new FormData();
                formData.append("video", {
                  uri: images.uri,
                  mimetype: "video/mp4",
                  // name: "video_ios.mp4",
                  name: `image-video-${Date.now()}-${Math.random()}.mp4`,
                });
            console.log('SENDINGTOSERVER', formData._parts[0])
            axios
              .post(
                `${GLOBAL.BASE_URL}user/uploadChatMedia`,
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
                // alert('SUCCESS')
                var localDate  = Date.now()
                var finalUnique = localDate * 1000;
                console.log('FROMSERVERAFTERUPLOAD', resp.data);
                resp.data.message.forEach((photoE) => {
                  chat_roster_main = chat_roster_main.filter(
                    (item) => item.jid !== route.params.jid
                  );
                  this_chat.messages.splice(0, 0, {
                    content: photoE,
                    video: photoE,
                    messageType: 'video',
                    messageId: finalUnique,
                    createdAt: localDate,
                    _id: localDate,
                    unique: finalUnique,
                    type: "chat",
                    user: {
                      _id: 2,
                    },
                  });
                  this_chat.updatedAt = localDate;
                  this_chat.message = "VIDEO";
                  chat_roster_main.splice(0, 0, this_chat);
                  dispatch({
                    type: "SETMYMESSAGEMAIN",
                    chat_roster_main: chat_roster_main,
                  });
                  const message = {
                    type: "video",
                    content: photoE,
                    unique: finalUnique,
                  };
                  console.log("In asd");
                  console.log('WHATISSENT', message, route.params.jid)
                  var mes = [];
                  mes.push(message)
                  sendMessage(mes, route.params.jid);
                })
                //send message to other and update in state
  
                // navigation.navigate('Details',{setLoading:"true",message:"Post Created Succesfully",showTag:true})
              })
              .catch((err) => {
                alert('Something Went Wrong')
                console.log(err);
              });
            // imag.push(photo);
            // setImages(imag);
            // // dispatch({ type: "SETIMAGES", images: imag });
            // console.log("asas");
            // console.log("allImages", imag);
            // console.log("NewInfoState", NewInfoState.images);
          
        }, 1000);
      }
        // console.log('videoupload[0].urisssss',videoupload[0])
    })
    
    
    // var imag = [];
    // await ImagePicker.openPicker({
    //   multiple: true,
    //   isVideo:true,
    //   maxSize: 10,
    //   hideCropBottomControls: true
    // }).then(images => {
    //   setImages(images)

    //   setTimeout(() => {

    //     if (images.length > 0) {
    //       images.forEach(list => {
    //         var photo = {
    //           uri: list.path,
    //           mimetype: "image/jpeg",
    //           name: "image-ios.jpeg",
    //         };
    //         imag.push(photo);
    //       })

    //       const formData = new FormData();
    //       if (imag.length) {
    //         imag.forEach((list) => {
    //           console.log('0000000000', list)
    //           formData.append("photo", list);
    //         });
    //       }
    //       console.log('SENDINGTOSERVER', formData)
    //       axios
    //         .post(
    //           `${GLOBAL.BASE_URL}user/uploadChatMedia`,
    //           formData,
    //           {
    //             headers: {
    //               "Content-Type": "multipart/form-data",
    //               Authorization:
    //                 token
    //             },
    //           }
    //         )
    //         .then((resp) => {
    //           console.log('FROMSERVERAFTERUPLOAD', resp.data);
    //           resp.data.message.forEach((photoE) => {
    //             chat_roster_main = chat_roster_main.filter(
    //               (item) => item.jid !== route.params.jid
    //             );
    //             this_chat.messages.splice(0, 0, {
    //               content: photoE,
    //               image: photoE,
    //               messageType: 'image',
    //               messageId: Date.now() * 1000,
    //               createdAt: Date.now(),
    //               _id: Date.now(),
    //               unique: Date.now(),
    //               type: "chat",
    //               user: {
    //                 _id: 2,
    //               },
    //             });
    //             this_chat.updatedAt = Date.now();
    //             this_chat.message = "IMAGE";
    //             chat_roster_main.splice(0, 0, this_chat);
    //             dispatch({
    //               type: "SETMYMESSAGEMAIN",
    //               chat_roster_main: chat_roster_main,
    //             });
    //             const message = {
    //               type: "image",
    //               content: photoE,
    //               unique: Date.now() * 1000,
    //             };
    //             console.log("In asd");
    //             console.log('WHATISSENT', message, route.params.jid)
    //             var mes = [];
    //             mes.push(message)
    //             sendMessage(mes, route.params.jid);
    //           })
    //           //send message to other and update in state

    //           // navigation.navigate('Details',{setLoading:"true",message:"Post Created Succesfully",showTag:true})
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //       // imag.push(photo);
    //       // setImages(imag);
    //       // // dispatch({ type: "SETIMAGES", images: imag });
    //       // console.log("asas");
    //       // console.log("allImages", imag);
    //       // console.log("NewInfoState", NewInfoState.images);
    //     }
    //   }, 1000);
    // });


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
          // console.log("In Library");
          pickImageLibrary();
        } else {
          // console.log("In Camera");
          pickImageCamera();
        }
      }
    );
  }
  const pickImageCamera = async () => {

    var imag = [];
    await ImagePicker.openCamera({
      cropping: false,
      hideCropBottomControls: false
    }).then(images => {
      console.log(images);
      setImages(images)
      setLoading(true)
      setTimeout(() => {

        if (images.length > 0) {
          images.forEach(list => {
            var photo = {
              uri: list.path,
              mimetype: "image/jpeg",
              // name: "image-ios.jpeg",
              name: `image-ios-${Date.now()}-${Math.random()}.jpeg`,
            };
            imag.push(photo);
          })

          const formData = new FormData();
          if (imag.length) {
            imag.forEach((list) => {
              formData.append("photo", list);
            });
          }
          console.log('SENDINGTOSERVER', formData)
          axios
            .post(
              `${GLOBAL.BASE_URL}user/uploadChatMedia`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization:
                    token
                },
              }
            )
            .then((resp) => {
              var localDate  = Date.now()
              var finalUnique = localDate * 1000;
              console.log('FROMSERVERAFTERUPLOAD', resp.data);
              //send message to other and update in state
              chat_roster_main = chat_roster_main.filter(
                (item) => item.jid !== route.params.jid
              );
              this_chat.messages.splice(0, 0, {
                content: resp.data.message[0],
                image: resp.data.message[0],
                messageType: 'image',
                messageId: finalUnique,
                createdAt: localDate,
                _id: localDate,
                unique: finalUnique,
                type: "chat",
                user: {
                  _id: 2,
                },
              });
              this_chat.updatedAt = localDate;
              this_chat.message = "IMAGE";
              chat_roster_main.splice(0, 0, this_chat);
              dispatch({
                type: "SETMYMESSAGEMAIN",
                chat_roster_main: chat_roster_main,
              });
              const message = {
                type: "image",
                content: resp.data.message[0],
                unique: finalUnique,
              };
              console.log("In asd");
              console.log('WHATISSENT', message, route.params.jid)
              var mes = [];
              mes.push(message)
              sendMessage(mes, route.params.jid);
              // navigation.navigate('Details',{setLoading:"true",message:"Post Created Succesfully",showTag:true})
            })
            .catch((err) => {
              console.log(err);
            });
          // imag.push(photo);
          // setImages(imag);
          // // dispatch({ type: "SETIMAGES", images: imag });
          // console.log("asas");
          // console.log("allImages", imag);
          // console.log("NewInfoState", NewInfoState.images);
        }
        setLoading(false)
      }, 1000);
    });


    // let result = await ImagePicker.launchCameraAsync({
    //   // mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });




  };

  function renderChatFooter(props) {
    return (
      <>
        <TouchableOpacity onPress={console.log("HIII")}>
          <Image
            source={require("../assets/icons/Plus.png")}
            style={{ height: 25, width: 25, bottom: 10, left: 10 }}
          ></Image>
          <Text>Hiiiii</Text>
        </TouchableOpacity>
      </>
    );
  }

  function setItemsRemove(len) {
    // console.log("len", len);
    if (len.length == 0) {
      dispatcher({ type: "SETVISIBILITY", showItems: true });
    } else {
      dispatcher({ type: "SETVISIBILITY", showItems: false });
    }
  }

  function renderMessageAudio() {
    console.log("In Audioooo");
  }


  async function showDocuments() {
    var imag = []
    const results = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.images,DocumentPicker.types.plainText,DocumentPicker.types.pdf,DocumentPicker.types.csv,DocumentPicker.types.doc,DocumentPicker.types.docx,DocumentPicker.types.ppt,DocumentPicker.types.pptx,DocumentPicker.types.xls,DocumentPicker.types.xlsx],
    });
    console.log('SHOWDOCUMENTSSELECTED', results)
    setDocuments(results)
    setTimeout(() => {
      // alert(results.length)
      if (results.length > 0) {
        results.forEach(list => {
          var document = {
            uri: list.uri,
            mimetype: list.type,
            name: list.name,
          };
          imag.push(document);
        })
        console.log('SENDINGDOCUMENTS', imag)
        const formData = new FormData();
        if (imag.length) {
          imag.forEach((list) => {
            formData.append("photo", list);
          });
        }
        console.log('SENDINGTOSERVER', formData)
        axios
          .post(
            `${GLOBAL.BASE_URL}user/uploadChatMedia`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization:
                  token
              },
            }
          )
          .then((resp) => {
            var localDate  = Date.now()
            var finalUnique = localDate * 1000;
           
            console.log('FROMSERVERAFTERUPLOAD', resp.data);
            //send message to other and update in state
            chat_roster_main = chat_roster_main.filter(
              (item) => item.jid !== route.params.jid
            );
            this_chat.messages.splice(0, 0, {
              content: resp.data.message[0],
              document: resp.data.message[0],
              messageType: 'file',
              messageId: finalUnique,
              text: resp.data.message[0],
              createdAt: localDate,
              _id: localDate,
              unique: finalUnique,
              type: "chat",
              user: {
                _id: 2,
              },
            });
            this_chat.updatedAt = localDate;
            this_chat.message = "DOCUMENT";
            chat_roster_main.splice(0, 0, this_chat);
            dispatch({
              type: "SETMYMESSAGEMAIN",
              chat_roster_main: chat_roster_main,
            });
            const message = {
              type: "file",
              content: resp.data.message[0],
              unique: finalUnique,
            };
            console.log("In asd");
            console.log('WHATISSENT', message, route.params.jid)
            var mes = [];
            mes.push(message)
            sendMessage(mes, route.params.jid);
            // navigation.navigate('Details',{setLoading:"true",message:"Post Created Succesfully",showTag:true})
          })
          .catch((err) => {
            console.log(err);
          });
        // imag.push(photo);
        // setImages(imag);
        // // dispatch({ type: "SETIMAGES", images: imag });
        // console.log("asas");
        // console.log("allImages", imag);
        // console.log("NewInfoState", NewInfoState.images);
      }
    }, 2000);

  }


  async function showAudio() {
    const results = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.audio],
    });
    // console.log(results)
  }

  async function startRecording() {
    SoundRecorder.start(SoundRecorder.PATH_CACHE + '/test.mp4')
      .then(function () {
        // console.log('started recording');
        refRBSheet.current.open()

      });

  }


  async function stopRecording() {

    SoundRecorder.stop()
      .then(function (result) {
        // console.log('stopped recording, audio file saved at: ' + result.path);
        refRBSheet.current.close()
      });

  }




const quickReplies=[
  {
    _id: 1,
    text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
    createdAt: new Date(),
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: true,
      values: [
        {
          title: '😋 Yes',
          value: 'yes',
        },
        {
          title: '📷 Yes, let me show you with a picture!',
          value: 'yes_picture',
        },
        {
          title: '😞 Nope. What?',
          value: 'no',
        },
      ],
    },
    user: {
      _id: 2,
      name: 'React Native',
    },
  },
  {
    _id: 2,
    text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
    createdAt: new Date(),
    quickReplies: {
      type: 'checkbox', // or 'radio',
      values: [
        {
          title: 'Yes',
          value: 'yes',
        },
        {
          title: 'Yes, let me show you with a picture!',
          value: 'yes_picture',
        },
        {
          title: 'Nope. What?',
          value: 'no',
        },
      ],
    },
    user: {
      _id: 2,
      name: 'React Native',
    },
  }

]


  function cancel() { }
  function renderActions(props) {
    return (
      <>
        {
          this_chat.blocked || this_chat.chatExit || this_chat.chatExitMe || this_chat.blockedMe  ?
            <></> :
            <>
              <Actions
                {...props}
                style={{ justifyContent: "left" }}
                options={{
                  [I18n.t("Cancel")]: cancel,
                  [I18n.t("Camera")]: pickImageCamera,
                  [I18n.t("Photo Library")]: pickImageLibrary,
                  [I18n.t("Video Library")]: pickVideoLibrary,
                  [I18n.t("Document")]: showDocuments,
                  // ["Audio"]: showAudio,
                }}
                icon={() => (
                  this_chat.blocked || this_chat.chatExit || this_chat.chatExitMe || this_chat.blockedMe ?
                    <></>
                    :
                    <Image
                      source={require("../assets/icons/Plus.png")}
                      style={{ height: 25, width: 25, bottom: 10, left: 5, top: 2 }}
                      // onPress={console.log("huhuuu")}
                    ></Image>
                )}
                onSend={(args) => console.log(args)}
              />
              {/* <Actions
                {...props}
                style={{ justifyContent: "left" }}
                options={{
                  [I18n.t("Cancel")]: cancel,
                  [I18n.t("Record Audio")+"..."]: startRecording,
                }}
                icon={() => (
                  this_chat.blocked || this_chat.exit || this_chat.exitMe || this_chat.blockedMe ?
                    <></>
                    :
                    <Image
                      source={{ uri: 'https://cdn0.iconfinder.com/data/icons/android-application-solid/32/Voice_Recorder-512.png' }}
                      style={{ height: 25, width: 25, bottom: 10, left: 5, top: 2 }}
                    ></Image>
                )}
                onSend={(args) => console.log(args)}
              /> */}
            </>

        }


 

      </>
    );
  }



  _.uniq(this_messages, "unique");

  const inititalStates = {
    messages: [],
    showItems: true,
    messages_chat: [],
    chatExit: this_chat.chatExit,
    chatExitMe: this_chat.chatExitMe,
    block: this_chat.block,
    
    
  };




  const [messages, setMessages] = useState([]);
  const [showItems, setShowItems] = useState(true);
  useEffect(() => {
    PushNotification.removeAllDeliveredNotifications();
    // setMessages(route.params.messages);
    // console.log(route.params)

    console.log(route.params)
    setUnreadToZero()
    // route.params.connections.()
    return () => { };
  }, []);

  const ChatSpecificReducer = (prevState, action) => {
    switch (action.type) {
      case "SETVISIBILITY":
        return {
          ...prevState,
          showItems: action.showItems,
        };

        case "SETSHOWEDIT":
          return {
            ...prevState,
            showEdit: action.showEdit,
          };

      case "UPDATEMESSAGES":
        return {
          ...prevState,
          messages_chat: action.messages_chat,
        };
      case "UPDATEINPUT":
        return {
          ...prevState,
          chatExit: action.chatExit,
          chatExitMe: action.chatExitMe,
          block: action.block,
          blockedMe:action.blockedMe
        };
    }
  };

  const [ChatState, dispatcher] = React.useReducer(
    ChatSpecificReducer,
    inititalStates
  );

  const dispatch = useDispatch(ActualChatdispatcher);


  async function getMessagesafterLastMessage(){
    var userIID = await AsyncStorage.getItem('jid_main');
      console.log('last message',this_messages[0])
      await axios
      .post(
        `http://103.27.86.24:3005/getmessagesbytime/${userIID.substr(0,24)}/${route.params.jid.substr(0,24)}`,{
          from:String(moment(this_messages[0].unique).local().format('YYYY-MM-DD HH:mm:ss')),
          to:String(moment(Date.now()).local().format('YYYY-MM-DD HH:mm:ss')),
        }
      )
      .then((resp) => {
        console.log('FTFTFTFTFTFTF',resp.data.data)
if(resp.data.data.length>0){
        resp.data.data.forEach((list)=>{
          var message = JSON.parse(list.txt);
          // this_chat.messages.splice(0, 0, {
          //   content: messages[0].text,
          //   text: messages[0].text,
          //   messageType: 'chat',
          //   messageId: unique,
          //   createdAt: messages[0].createdAt,
          //   _id: Date.now(),
          //   unique: unique,
          //   type: "chat",
          //   user: {
          //     _id: 2,
          //   },
          // });
          if (message.type == "chat") {
            if(list.xml.includes(`from='${route.params.jid.substr(0,24)}`)){
              var mymes = {
                content: message.content,
                text: message.content,
                createdAt: list.created_at,
                messageType:message.type,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                type: "chat",
                user: {
                  _id: 1,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = message.content;
            }else{
              var mymes = {
                content: message.content,
                text: message.content,
                messageType:message.type,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                type: "chat",
                user: {
                  _id: 2,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = message.content;
            }
  
          }
          if (message.type == "image") {
            if(list.xml.includes(`from='${route.params.jid.substr(0,24)}`)){
              var mymes = {
                content: message.content,
                image: message.content,
                messageType:message.type,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                // sent: true,
                // received: true,
                type: "chat",
                user: {
                  _id: 1,
                  name: eachuser.name,
                  avatar: eachuser.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = 'IMAGE';
              var newImage = {
                url:message.content
              };
              this_chat.photos.push(newImage)
            }else{
              var mymes = {
                content: message.content,
                image: message.content,
                messageType:message.type,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                // sent: true,
                // received: true,
                type: "chat",
                user: {
                  _id: 2,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = 'IMAGE';
              var newImage = {
              url:message.content
              };
            this_chat.photos.push(newImage)
            }
          }
          if (message.type == "video") {
  
            if(list.xml.includes(`from='${route.params.jid.substr(0,24)}`)){
              var mymes = {
                content: message.content,
                video: message.content,
                messageType:message.type,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                // sent: true,
                // received: true,
                type: "chat",
                user: {
                  _id: 1,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = 'VIDEO';
            }else{
              var mymes = {
                content: message.content,
                video: message.content,
                messageType:message.type,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                // sent: true,
                // received: true,
                type: "chat",
                user: {
                  _id: 2,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = 'VIDEO';
            }
          }
           if (message.type == "file") {
  
            if(list.xml.includes(`from='${route.params.jid.substr(0,24)}`)){
              var mymes = {
                content: message.content,
                document: message.content,
                messageType:message.type,
                text: message.content,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                // sent: true,
                // received: true,
                type: "chat",
                user: {
                  _id: 1,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = 'DOCUMENT';
            }else{
              var mymes = {
                content: message.content,
                document: message.content,
                messageType:message.type,
                text: message.content,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                // sent: true,
                // received: true,
                type: "chat",
                user: {
                  _id: 2,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = 'DOCUMENT';
            }
          }
          if (message.type == "deleteforboths") {
  
            if(list.xml.includes(`from='${route.params.jid.substr(0,24)}`)){
              var mymes = {
                content: message.content,
                messageType:message.type,
                delete: message.content,
                text: message.content,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                // sent: true,
                // received: true,
                type: "chat",
                user: {
                  _id: 1,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = 'This message is deleted';
            }else{
              var mymes = {
                content: message.content,
                messageType:message.type,
                delete: message.content,
                text: message.content,
                createdAt: list.created_at,
                _id: Date.now()* Math.random(),
                unique: message.unique,
                messageId: message.unique,
                // sent: true,
                // received: true,
                type: "chat",
                user: {
                  _id: 2,
                  name: route.params.name,
                  avatar: route.params.profilePic,
                },
              };
              this_chat.messages.splice(0, 0, mymes);
              this_chat.message = 'This message is deleted';
            }
          }
        })

        this_chat.updatedAt = Date.now();
        this_chat.message = message[0].text;
        this_chat.name = route.params.name;

        dispatcher({ type: 'UPDATEMESSAGES', messages_chat: this_chat.messages })
      }
        // dispatch({
        //   type: "SETMYMESSAGEMAIN",
        //   chat_roster_main: chat_roster_main,
        // });
  
  
      }).catch((err)=>{
        console.log(err)
      })
  }

  async function editName() {
    alert(ChatState.showEdit)
    if(ChatState.showEdit){
      dispatcher({
        type: "SETSHOWEDIT",
        showEdit: false,
      });
    }else{
      dispatcher({
        type: "SETSHOWEDIT",
        showEdit: true,
      });
    }
    alert(ChatState.showEdit)
  // setVisible(true);
}
  const videos = React.useRef(null);
  // route.params.xmpp.on("stanza", async (stanza) => {
  //   console.log("In stanzas old", stanza);
  //   console.log(
  //     "In stanzas from",
  //     stanza.attrs.from
  //   ); // from
  //   console.log(
  //     "In stanzas to",
  //     stanza.attrs.to
  //   ); // to
  //   console.log(
  //     "In stanzas Message",
  //     stanza.children[2].children[0]
  //   );

  // if(chat_roster_main.length>0){
  //   chat_roster_main.forEach(list=>{
  //     if(list.jid == stanza.attrs.from.substr(0,44)){
  //       list.messages.splice(0, 0,{
  //         content:JSON.parse(stanza.children[2].children[0]).content,
  //         text:JSON.parse(stanza.children[2].children[0]).content,
  //         createdAt:JSON.parse(stanza.children[2].children[0]).unique,
  //         _id:Date.now() * Math.random(),
  //         unique:JSON.parse(stanza.children[2].children[0]).unique,
  //         type:'chat',
  //         user:{
  //           "_id": 1,
  //         }
  //       })
  //       list.updatedAt = Date.now();
  //     }
  //   })
  //   dispatch({type:'SETMYMESSAGEMAIN',chat_roster_main:chat_roster_main})
  // }
  //   // if (
  //   //   stanza.children[0].children[0].children[0].attrs.from != "undefined" ||
  //   //   stanza.children[0].children[0].children[0].attrs.from != undefined
  //   // ) {
  //   //   // var me = {
  //   //   //   from:stanza.children[0].children[0].children[0].attrs.from,
  //   //   //   to:stanza.children[0].children[0].children[0].attrs.to,
  //   //   //   type:stanza.children[0].children[0].children[0].attrs.type,
  //   //   //   message:JSON.parse(stanza.children[0].children[0].children[0].children[2].children[0])
  //   //   // }
  //   //   // if(stanza.attrs.from == '601529574c91aa34f9b04b61@chat.spaarksweb.com' && stanza.attrs.to.substr(0,44) == '601529574c91aa34f9b04b61@chat.spaarksweb.com'){
  //   //   //     console.log("Carbon Copy")
  //   //   // }else{
  //   //   var newm = {
  //   //     from: stanza.attrs.from,
  //   //     to: stanza.attrs.to,
  //   //     content: JSON.parse(
  //   //       stanza.children[2].children[0]
  //   //     ).content,
  //   //     text: JSON.parse(
  //   //       stanza.children[2].children[0]
  //   //     ).content,
  //   //     createdAt: JSON.parse(
  //   //       stanza.children[2].children[0]
  //   //     ).unique,
  //   //     _id: Date.now()* Math.random(),
  //   //     unique: JSON.parse(
  //   //       stanza.children[2].children[0]
  //   //     ).unique,
  //   //     type: JSON.parse(
  //   //       stanza.children[2].children[0]
  //   //     ).type,
  //   //     user: {
  //   //       _id: 1,
  //   //     },
  //   //   };
  //   //   messss.push(newm);
  //   //   console.log("messss", messss);
  //   //   dispatch({ type: "SETMAMMESSAGES", messages: messss });
  //   //   // }
  //   // }

  //   //    if(stanza.children[0].children[0].children[0].attrs.from != 'undefined' || stanza.children[0].children[0].children[0].attrs.from != undefined){
  //   //      console.log("Inside not undefined",stanza.children[0].children[0].children[0].attrs.from)
  //   //    if(stanza.children[0].children[0].children[0].attrs.type =='chat'){
  //   //     console.log("Inside chat",stanza.children[0].children[0].children[0].attrs.type)
  //   //     if(stanza.children[0].children[0].children[0].attrs.from.substr(0,44) == '60152a454c91aa34f9b04b65@chat.spaarksweb.com'){
  //   //       console.log("chat_roster_main",chat_roster_main)
  //   //       console.log("Inside my messages mam",stanza.children[0].children[0].children[0].attrs.from.substr(0,44))
  //   //       var messages = JSON.parse(stanza.children[0].children[0].children[0].children[2].children[0])
  //   //       var this_chat = chat_roster_main.find(item => item.jid == stanza.children[0].children[0].children[0].attrs.to.substr(0,44));
  //   //       chat_roster_main = chat_roster_main.filter((item) => item.jid !== stanza.children[0].children[0].children[0].attrs.to.substr(0,24));
  //   //       this_chat.messages.splice(0, 0,{
  //   //         content:messages.content,
  //   //         text:messages.content,
  //   //         createdAt:messages.unique,
  //   //         _id:Date.now(),
  //   //         unique:messages.unique,
  //   //         type:'chat',
  //   //         user:{
  //   //           "_id": 2,
  //   //         }
  //   //       })
  //   //       this_chat.updatedAt = messages.unique;
  //   //       // console.log("Deleted",chat_roster_main)
  //   //       chat_roster_main.splice(0, 0,this_chat)
  //   //       dispatch({type:'SETMYMESSAGEMAIN',chat_roster_main:chat_roster_main})
  //   //     }else{
  //   //       console.log("chat_roster_main_else",chat_roster_main)
  //   //       console.log("Inside other messages mam",stanza.children[0].children[0].children[0].attrs.from.substr(0,44))
  //   //       var messages = JSON.parse(stanza.children[0].children[0].children[0].children[2].children[0])
  //   //       // var this_chat = chat_roster_main.find(item => String(item.jid) == String(stanza.children[0].children[0].children[0].attrs.from.substr(0,44)));
  //   //       // chat_roster_main = chat_roster_main.filter((item) => item.jid !== stanza.children[0].children[0].children[0].attrs.from.substr(0,24));
  //   //       // console.log("this_chat",this_chat)
  //   //       chat_roster_main[0].messages.splice(0, 0,{
  //   //         content:messages.content,
  //   //         text:messages.content,
  //   //         createdAt:messages.unique,
  //   //         _id:Date.now(),
  //   //         unique:messages.unique,
  //   //         type:'chat',
  //   //         user:{
  //   //           "_id": 1,
  //   //         }
  //   //       })
  //   //       chat_roster_main[0].updatedAt = messages.unique;
  //   //       // console.log("Deleted",chat_roster_main)
  //   //       // chat_roster_main.splice(0, 0,this_chat)
  //   //       dispatch({type:'SETMYMESSAGEMAIN',chat_roster_main:chat_roster_main})
  //   //     }

  //   //   }
  //   //   // if(stanza.children[0].children[0].children[0].attrs.from != 'undefined' || stanza.children[0].children[0].children[0].attrs.from != undefined){
  //   //   //   var msg = JSON.parse(stanza.children[0].children[0].children[0].children[2].children[0])

  //   //   //   dispatch({type:"SETMAINMESSAGE",from:stanza.children[0].children[0].children[0].attrs.from,message_type:msg.type,content:msg.content})
  //   //   // }

  //   //   // console.log("Datas",stanza.children[2].children[0])
  //   //   // var rec = JSON.parse(stanza.children[2].children[0]);
  //   //                         // var receivedMessage =  {
  //   //                         //           _id: Math.random(),
  //   //                         //           text: rec.content,
  //   //                         //           // text: "Received",
  //   //                         //           createdAt: new Date(),
  //   //                         //           user: {
  //   //                         //             _id: 2,
  //   //                         //             name: 'React Native',
  //   //                         //             avatar: 'https://placeimg.com/140/140/any',
  //   //                         //           },
  //   //                         // }
  //   // // console.log("Messages",receivedMessage);
  //   //   }
  // });

  // xmpp.on("stanza", async (stanza) => {
  //   console.log("In stanzas")
  //   console.log(stanza)
  //   var rec = JSON.parse(stanza.children[2].children[0])
  //                       var receivedMessage =  {
  //                                 _id: Math.random(),
  //                                 text: rec.content,
  //                                 // text: "Received",
  //                                 createdAt: new Date(),
  //                                 user: {
  //                                   _id: 2,
  //                                   name: 'React Native',
  //                                   avatar: 'https://placeimg.com/140/140/any',
  //                                 },
  //                           }

  //                           setMessages((previousMessages) =>
  //                           GiftedChat.append(previousMessages, receivedMessage));
  // // var arr = []
  // // arr.push(receivedMessage)
  // //                           setMessages(arr)
  // });

  // async function getRoster(){
  //  var rosterList = await axios.post('http://103.27.86.34:3005/api/v2.0/user/chatRoster',{
  //     "mjid":1,
  //     "data":[]
  //   },{
  //     headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTUyOTU3NGM5MWFhMzRmOWIwNGI2MSIsImlhdCI6MTYxMzAyMTA1MSwiZXhwIjoxNjIwNzk3MDUxfQ.0DAt-DZsKJKwU_xKhM7HG9z77rZaceMrAca2-zmwkRI'
  // }})

  // console.log(rosterList.data)
  // }

  // useEffect( async () => {
  //     // getRoster()
  //     setMessages([
  //       {
  //         _id: 2,
  //         text: 'Hi',
  //         createdAt: new Date(),
  //         user: {
  //           _id: 1,
  //           name: 'React Native',
  //           avatar: 'https://placeimg.com/140/140/any',
  //         },
  //       },
  //       {
  //         _id: 4,
  //         text:'hello',
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: 'React Native',
  //           avatar: route.params.profilePic,
  //         },

  //       },
  //       {
  //         _id: 1,
  //         text:'8008551266',
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: 'React Native',
  //           avatar: route.params.profilePic,
  //         },

  //       }
  //     ]);
  // });

  function sdf() {
    // xmpp.start().catch(console.error);
    // xmpp.on("online", (address) => {
    //   console.log("online", address.toString());
    // });
    // addListeners()
  }

  // function asd(){
  //   const message = {type:"chat",content:"Hello",unique:"345678"};
  //   console.log("In asd");
  //   var mess = JSON.stringify(message)
  //   var q = xmpp.send(xml("message", { to: "601529574c91aa34f9b04b61@chat.spaarksweb.com", type: "chat" }, xml("body",{}, mess))).catch(console.error);
  //   console.log("q",q)
  // }

  // function stopXMPP(){
  //   // xmpp.stop().catch(console.error);
  // }

  // function  getOld(){
  //   try{

  //   // const response =  iqCaller.request(
  //   //   xml("field", { var: "FORM_TYPE", type: "hidden" },xml("value",{}, "urn:xmpp:mam:2"),xml("field", { var: "with"},xml("value",{}, "601529574c91aa34f9b04b61@chat.spaarksweb.com"),xml("field", { var: "before", type: "hidden" },xml("value",{}, Date.now())))),
  //   //   30 * 1000, // 30 seconds timeout - default
  //   // );
  //   // const foo = response.getChild("foo", "foo:bar");
  //   // console.log("Im in old Messages")
  //   const {iqCaller} = xmpp
  //   const response =  iqCaller.request(
  //     xml("iq", { type: "set" },xml("query","urn:xmpp:mam:2",xml("field", { var: "FORM_TYPE", type: "hidden" },xml("value",{}, "urn:xmpp:mam:2")),xml("field", { var: "with"},xml("value",{}, route.params.jid)),xml("field", { var: "before", type: "hidden" },xml("value",{}, Date.now())))),
  //     30 * 1000, // 30 seconds timeout - default
  //   );
  //   const foo = response.getChild("query", "urn:xmpp:mam:2");
  //   console.log("foo",foo);
  //   //var q =   xmpp.send(xml("field", { var: "FORM_TYPE", type: "hidden" },xml("value",{}, "urn:xmpp:mam:2"),xml("field", { var: "with"},xml("value",{}, "601529574c91aa34f9b04b61@chat.spaarksweb.com"),xml("field", { var: "before", type: "hidden" },xml("value",{}, Date.now()))))).catch(console.error);
  // console.log("Response",response);
  // // console.log("Response",response.children.children.children.children);
  //   }catch(err){

  //   }
  // }

  async function setUnreadToZero() {
    // alert(route.params.isOtherAnonymous)
    if(route.params.name === "Anonymous" || route.params.isOtherAnonymous) {
      setDynHeight(350)
    }
    // route.params.seSETUNREADCOUNTtUnread()
    // route.params.setUnreadStatus()
    console.log('this_messagesthis_messagesthis_messages', this_messages)
    // this_chat.photos = 
    Chatdispatcher({type:'SETUNREADCOUNT',unreadCount:unreadCount - route.params.unreadSubtract/3})
    // This is to Set unread count to 0 // Taking lot of time Need to Optimize it 
    chat_roster_main.forEach(list=>{
      if(list.jid == route.params.jid){
        // list.unread = 0;
        // alert('In')
        // setMessages(list.messages)
        // var messages = list.messages;
        // messages.splice(0,0,{
        //   _id: 4,
        //   text: 'quickreply',
        //   createdAt: new Date(Date.UTC(2016, 5, 14, 17, 20, 0)),
        //   user: {
        //     _id: 2,
        //     name: 'React Native',
        //     avatar: 'https://placeimg.com/140/140/any',
        //   },
        //   quickReplies: {
        //     keepIt: true,
        //     values: [
        //       {
        //         title: 'Hi',
        //         value: 'yes',
        //       },
        //       {
        //         title: 'I Just say your spaark regarding',
        //         value: 'I Just say your spaark regarding',
        //       },
        //       {
        //         title: 'can i call you',
        //         value: 'can i call you',
        //       },
        //     ],
        //   },
        // })
        dispatcher({ type: 'UPDATEMESSAGES', messages_chat: list.messages })

      }
    })
    // updateChat(chat_roster_main)
    // dispatch({
    //   type: "SETMYMESSAGEMAIN",
    //   chat_roster_main: chat_roster_main,
    // });
  }

  async function sendNotification(message, name, profilePic, jid) {
    var myjid = await AsyncStorage.getItem('jid_main');
    var jwt = await AsyncStorage.getItem('token');
    await axios.post(GLOBAL.BASE_URL + 'user/sendfcm', {
      jid: jid,
      msg: JSON.stringify(message),
      name: name,
      profilePic: profilePic,
      myjid: myjid,
      connection: "",
      aid: "",
      userId: "",
      canReply: 'true',
      username: ""

    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          'Bearer '+jwt
      },
    }
    ).then((resp) => {
    }).catch(err => {
      console.log(err)
    })
  }

  const onSend = useCallback(
  async  (messages = []) => {
      // SETMAINMESSAGE
      console.log("////////,,,,,",messages)
      // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      console.log('MESS',route.params.messages)
      console.log('PARAMS',route.params)
      var unique = Date.now() * 1000;

    //   dispatch({ type: 'SETMAINMESSAGE',
    //   is
    //   messagess:route.params.messages,
    //    from: route.params.jid,
    //    message:messages[0].text,
    //   _id: route.params.item._id,
    //   aid: route.params.item.aid,
    //   blocked: route.params.item.blocked,
    //   blockedMe: route.params.item.blockedMe,
    //   canResume: route.params.item.canResume,
    //   chatExit: route.params.item.chatExit,
    //   chatExitMe: route.params.item.chatExitMe,
    //   clearChat: route.params.item.clearChat,
    //   connection: route.params.item.connection,
    //   contactMe: route.params.item.contactMe,
    //   jid: route.params.item.jid,
    //   name: route.params.item.name,
    //   offline_count: route.params.item.offline_count,
    //   profilePic: route.params.item.profilePic,
    //   userId: route.params.item.userId,
    //   unread:0,
    //   amIAnonymous:route.params.item.amIAnonymous
    //  })
      // var unique = Date.now() * 1000;
      // this_chat.messages.splice(0, 0, {
      //   content: messages[0].text,
      //   text: messages[0].text,
      //   messageType: 'chat',
      //   messageId: unique,
      //   createdAt: messages[0].createdAt,
      //   _id: Date.now(),
      //   unique: unique,
      //   type: "chat",
      //   user: {
      //     _id: 2,
      //   },
      // });
      if(route.params.setLastMessag || route.params.setLastMessageTime || route.params.setLastMessageTime || route.params.unreadNewCount){
        route.params.setLastMessage(messages[0].text)
        route.params.setLastMessageTime(messages[0].createdAt)
        route.params.unreadNewCount(0)
      }
      // alert(chat_roster_main.length)
      // dispatcher({ type: 'UPDATEMESSAGES', messages_chat: this_chat.messages })
      chat_roster_main = chat_roster_main.filter(
        (item) => item.jid !== route.params.jid
      );
      mychatroster = chat_roster_main.filter(
        (item) => item.jid != route.params.jid
      );
      // alert('N-',mychatroster.length)
      // if(mychatroster.length){
      //   // alert('New One')
      // }
      // if(chat_roster_main.length>0){
        // alert(chat_roster_main.length)
      // }
      var unique = Date.now() * 1000;
      if(this_chat.messages.length == 0){
        this_chat.messages.push({
          content: `Click to send Message`,
          text: `Click to send Message`,
          messageType: 'huhuuu',
          createdAt: Date.now(),
          _id: Date.now() * Math.random(),
          unique: Date.now() * Math.random(),
          messageId: Date.now() * Math.random(),
          type: "chat",
          user: {
            _id: 2,
            name: route.params.name,
            avatar: route.params.profilePic
          }
      })
      this_chat.messages.splice(0, 0, {
        content: messages[0].text,
        text: messages[0].text,
        messageType: 'chat',
        messageId: unique,
        createdAt: messages[0].createdAt,
        _id: Date.now(),
        unique: unique,
        type: "chat",
        user: {
          _id: 2,
        },
      });
      var tok = await AsyncStorage.getItem('token')
      console.log('ijhguhjik',{
        mjid: 1,
        jid: this_chat.jid,
        featureName: route.params.connection[0],
        name: this_chat.name,
        profilePic: this_chat.profilePic
      })
      console.log(tok)
        await axios.post(GLOBAL.BASE_URL + 'user/addtoroster',
        {
          mjid: 1,
          jid: this_chat.jid,
          featureName: route.params.connection[0],
          name: this_chat.name,
          profilePic: this_chat.profilePic
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' + tok
          },
        }).then((resp) => {
alert('Added')
        }).catch((err)=>{
          alert('Something went wrong connecting user')
        })
     


      }else{
        this_chat.messages.splice(0, 0, {
          content: messages[0].text,
          text: messages[0].text,
          messageType: 'chat',
          messageId: unique,
          createdAt: messages[0].createdAt,
          _id: Date.now(),
          unique: unique,
          type: "chat",
          user: {
            _id: 2,
          },
        });
      }
      
      this_chat.updatedAt = Date.now();
      this_chat.message = messages[0].text;
      // alert(route.params.name)
      this_chat.name = route.params.name;
      console.log('FDFDFDFDFDFDFDFD',this_chat)
      chat_roster_main.splice(0, 0, this_chat);
  
      const message = [{
        type: "chat",
        content: messages[0].text,
        unique: unique
      }];
      sendMessage(message, route.params.jid);
      var mes = {
        type: "chat",
        content: messages[0].text,
        unique: unique
      };
      dispatcher({ type: 'UPDATEMESSAGES', messages_chat: this_chat.messages })
      dispatch({
        type: "SETMYMESSAGEMAIN",
        chat_roster_main: chat_roster_main,
      });

      
      sendNotification(mes, this_chat.name, this_chat.profilePic, route.params.jid)
    },
    ["asd"]
  );


  const sendImageMessage = () => {
    sendMessage(message, route.params.jid);
  }

  // function renderInputToolbar() {
  //   return (
  //     <View style={{ flexDirection: "row" }}>
  //       <Image
  //         source={require("../assets/icons/Plus.png")}
  //         style={{ height: 25, width: 25 }}
  //       ></Image>
  //       <TextInput
  //         style={{ borderWidth: 1 }}
  //         // onChangeText={onChangeNumber}
  //         value={1}
  //         placeholder="useless placeholder"
  //       // keyboardType="numeric"
  //       />
  //       <Image
  //         source={require("../assets/icons/smiley.png")}
  //         style={{ height: 25, width: 25 }}
  //       ></Image>

  //       <Image
  //         source={require("../assets/icons/camera.png")}
  //         style={{ height: 25, width: 25 }}
  //       ></Image>
  //     </View>
  //   );
  // }

  function renderAccessory() {
    return (
      <View style={{marginTop:-50}}>
        <TouchableOpacity onPress={console.log("second line")} >
          <Text>Secondline</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderSend = (props) => {
    // dispatcher({type:'SETVISIBILITY',showItems:false})
    return (
      <Send {...props}>
        <View style={{ padding: 10 }}>
          <Image
            source={require("../assets/icons/send_icon.png")}
            style={{ height: 30, width: 30, top: 5 }}
          ></Image>
        </View>
      </Send>
    );
  };

  // const renderBubble = (props) => {
  //   return (
  //     <Bubble
  //       {...props}
  //       wrapperStyle={{
  //         right: {
  //           backgroundColor: "#2e64e5",
  //         },
  //       }}
  //       textStyle={{
  //         right: {
  //           color: "#fff",
  //         },
  //       }}
  //     />
  //   );
  // };


  const lessThanOneHourAgo = (date) => {
    const HOUR = 1000 * 15 * 60;
    const fifteen = Date.now() - HOUR;

    return date > fifteen;
  }


  async function deleteMessageForBoth(pressed_message) {
    console.log('pressed_message', pressed_message)
    var a = await AsyncStorage.getItem('jid_main');
    console.log('jid', route.params.jid)
    console.log('chatroster', chat_roster_main[0].jid)
    axios.post(`http://103.27.86.24:3005/deleteforeveryone`, {
      timestamp: pressed_message.unique
    }, {}).then((resp) => {
      var i = 0;
      var setted = false
      // chat_roster_main = chat_roster_main.filter(
      //   (item) => item.jid !== route.params.jid
      // );
      var isLatest = false;
      if (ChatState.messages_chat[0].messageId == pressed_message.unique && setted == false) {
        // alert('In 1')
        i = 0;
        ChatState.messages_chat[0].text = 'This message is deleted';
        ChatState.messages_chat[0].content = 'This message is deleted';
        ChatState.messages_chat[0].messageType = 'deleteforboths';

      } else {
        // alert('In 2')
        ChatState.messages_chat.forEach(list => {
          if (list.messageId == pressed_message.unique) {
            list.text = 'This message is deleted';
            list.content = 'This message is deleted';
            list.messageType = 'deleteforboths';
          }
        })
        i++;
      }
      setTimeout(() => {
        dispatcher({ type: 'UPDATEMESSAGES', messages_chat: [...ChatState.messages_chat] })
      }, 2000);




      // alert(i)
      if (i == 0) {
        isLatest = true;
        chat_roster_main.forEach(list => {
          if (list.jid == route.params.jid) {
            list.messages = this_chat.messages;
            list.message = 'This message is deleted';
          }
        })
      }
      chat_roster_main.forEach(list => {
        if (list.jid == route.params.jid) {
          list.messages = this_chat.messages;
        }
      })

      // dispatcher({type:'UPDATEMESSAGES',messages_chat:this_chat.messages})
      dispatch({
        type: "SETMYMESSAGEMAIN",
        chat_roster_main: chat_roster_main,
      });
      const message = [{
        type: "deleteforboth",
        content: "This message is deleted",
        myjid: a,
        otherjid: route.params.jid,
        unique: pressed_message.unique
      }];
      console.log("In asd");
      // console.log("Unique timestamp",Date.now()*1000);
      sendMessage(message, route.params.jid);
      navigation.goBack()
    })
  }

  async function deleteMessagForMe(pressed_message) {
    var myjid = await AsyncStorage.getItem('jid_main');
    console.log('pasasassa', pressed_message, myjid)
    await axios.post(`http://103.27.86.24:3005/deleteformes`, {
      content: JSON.stringify(pressed_message.content),
      jid: this_chat.jid
    }, {}).then((resp) => {
      var mess = []
      this_chat.messages.forEach(list => {
        if (list.messageId != pressed_message.messageId) {
          mess.push(list)
        }
      })
      this_chat.messages = mess;
      chat_roster_main.forEach(list => {
        if (list.jid == route.params.jid) {
          list.messages = this_chat.messages;
        }
      })

      dispatcher({ type: 'UPDATEMESSAGES', messages_chat: this_chat.messages })
      dispatch({
        type: "SETMYMESSAGEMAIN",
        chat_roster_main: chat_roster_main,
      });

    });
  }

  const onLongPress = (context, pressed_message) => {
    console.log('UUUUUUUT', pressed_message)
    if (pressed_message.messageType == 'deleteforboths') {
      //  alert('WHat')
    } else {
      if (pressed_message.user._id == 2) {
        if (lessThanOneHourAgo(pressed_message.createdAt)) {
          ActionSheetIOS.showActionSheetWithOptions(
            {
              options: ["Cancel", "Copy Message", "Forward Message", "Delete For Me", "Delete For Both"],
              // destructiveButtonIndex: 2,
              cancelButtonIndex: 0,
              userInterfaceStyle: "light",
            },
            (buttonIndex) => {
              if (buttonIndex === 0) {
                // cancel action
              } else if (buttonIndex === 1) {
                Clipboard.setString(pressed_message.content)
                // alert('Message copied')
                Snackbar.show({
                  text: I18n.t('Message copied to clipboard'),
                  duration: Snackbar.LENGTH_LONG,
                });
              } else if (buttonIndex === 2) {
                console.log('BothBothBothsssss', pressed_message)
                navigation.navigate('ForwardMessageScreen', { pressed_message: pressed_message })
              } else if (buttonIndex === 3) {
                deleteMessagForMe(pressed_message)
              } else if (buttonIndex === 4) {

                console.log('BothBothBoth', pressed_message)
                // axios post with timestamp 
                // pressed_message.unique

                deleteMessageForBoth(pressed_message)


                //ToDO Delete Message for Both
              } else {

              }
            }
          );
        } else {
          ActionSheetIOS.showActionSheetWithOptions(
            {
              options: ["Cancel", "Copy Message", "Forward Message", "Delete For Me"],
              // destructiveButtonIndex: 2,
              cancelButtonIndex: 0,
              userInterfaceStyle: "light",
            },
            (buttonIndex) => {
              if (buttonIndex === 0) {
                // cancel action
              } else if (buttonIndex === 1) {
                Clipboard.setString(pressed_message.content)
                Snackbar.show({
                  text: I18n.t('Message copied to clipboard'),
                  duration: Snackbar.LENGTH_LONG,
                });
              } else if (buttonIndex === 2) {
                console.log('BothBothBothsssss', pressed_message)
                navigation.navigate('ForwardMessageScreen', { pressed_message: pressed_message })
              } else if (buttonIndex === 3) {
                deleteMessagForMe(pressed_message)
              } else {

              }
            }
          );
        }

      } else {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ["Cancel", "Copy Message", "Forward Message", "Delete For Me"],
            // destructiveButtonIndex: 2,
            cancelButtonIndex: 0,
            userInterfaceStyle: "light",
          },
          (buttonIndex) => {
            if (buttonIndex === 0) {
              // cancel action
            } else if (buttonIndex === 1) {
              Clipboard.setString(pressed_message.content)
              Snackbar.show({
                text: I18n.t('Message copied to clipboard'),
                duration: Snackbar.LENGTH_LONG,
              });
            } else if (buttonIndex === 2) {
              navigation.navigate('ForwardMessageScreen', { pressed_message: pressed_message })
            } else if (buttonIndex === 3) {
              deleteMessagForMe(pressed_message)
            } else {

            }
          }
        );
      }
    }
  }

  const onPressPhoneNumber = (number) => {
    Linking.openURL(`tel:${number}`);
  };



  const onPressHashtag = (number) => { };
  const scrollToBottomComponent = () => {
    return (
      // <FontAwesome name='angle-double-down' size={22} color='#333' />
      <Image
        source={require("../assets/scroll.png")}
        style={{ height: 20, width: 20 }}
      ></Image>
    );
  };

  function renderComposer(props) {
    return (

      this_chat.blocked || this_chat.chatExitMe || this_chat.blockedMe  ?
        <>
          <View style={{ backgroundColor: '#fff', padding: 10, width: Dimensions.get('window').width, zIndex: 1 }}><Text style={{ color: '#000', textAlign: 'center' }}>Chat cant be replied anymore</Text></View>
        </>
        :
        this_chat.chatExit ?
          <TouchableOpacity onPress={() => resumeChat()}>
            <View style={{ backgroundColor: '#fff', padding: 10, width: Dimensions.get('window').width, zIndex: 1 }}>

              <Text style={{ color: '#000', textAlign: 'center' }}>{I18n.t("Tap here to resume chat")}</Text>

            </View>
          </TouchableOpacity>
          :
          <>
          <Composer {...props} placeholder={I18n.t("Type Your Message Here")}></Composer>
          </>


    );
  }


  function renderMessageImage(props) {
    return (
      <View>
        {/* <Text>{props.currentMessage.messageType}</Text> */}
        {

           props.currentMessage.messageType == 'deleteforboths' ?
           <>
           {
              props.currentMessage.user._id == 2 && !props.currentMessage.image?

              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/icons/deleted_message.png')} style={{ height: 15, width: 15, margin: 7 }} />
                <Text style={{ padding: 10, color: '#fff', fontStyle: 'italic' }}>{I18n.t("This message has been deleted")}</Text>
              </View>
              :
              <>
{
 !props.currentMessage.image?
 <View style={{ flexDirection: 'row' }}>
                  <Image source={require('../assets/icons/deleted_chat.png')} style={{ height: 15, width: 15, margin: 7 }} />
                  <Text style={{ padding: 10, color: '#000', fontStyle: 'italic' }}>{I18n.t("This message has been deleted")}</Text>
                </View>
                :
                <></>
}
                
              </>
           }
           </>
           :
           <>
           {
             props.currentMessage.messageType == 'image'?
             <>
             <TouchableOpacity activeOpacity={1}
           onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: this_chat.photos, showHeader: false,index:this_chat.photos.findIndex(x => x.url === String(props.currentMessage.image)) }) }}>
           <>
           {/* <Text>{this_chat.photos.findIndex(x => x.url === String(props.currentMessage.image))}-{props.currentMessage.image}</Text> */}
           <Image source={{ uri: props.currentMessage.image }} cache="force-cache" style={styles.image}></Image>
         </>
         </TouchableOpacity>
             </>
             : props.currentMessage.messageType == 'video'?

             <>
             {/* <Text>{String(props.currentMessage.content)}</Text> */}
                 <Video source={{
                    uri: props.currentMessage.content,
                  }}  // Can be a URL or a local file.
                  ref={videos}         
      paused={true}          
      controls={true}
      fullscreen={true}
      resizeMode="cover"  

      style={{height:200,width:Dimensions.get('window').width/2}}
      />
             </>:
             <></>
           }
           
         </>
        }
       
      </View>
    )
  }
  function onVideo(props) {
    return (
      <View>

         {
           props.currentMessage.messageType == 'deleteforboths' ?
           <>
            {
              props.currentMessage.user._id == 2?

              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/icons/deleted_message.png')} style={{ height: 15, width: 15, margin: 7 }} />
                <Text style={{ padding: 10, color: '#fff', fontStyle: 'italic' }}>{I18n.t("This message has been deleted")}</Text>
              </View>
              :
              <>

 <View style={{ flexDirection: 'row' }}>
                  <Image source={require('../assets/icons/deleted_chat.png')} style={{ height: 15, width: 15, margin: 7 }} />
                  <Text style={{ padding: 10, color: '#000', fontStyle: 'italic' }}>{I18n.t("This message has been deleted")}</Text>
                </View>

                
              </>
           }
           </>
           :
           <>
           <Video   source={{
                    uri: props.currentMessage.video,
                  }}  // Can be a URL or a local file.
                  ref={videos}         
      paused={true}          
      controls={true}
      fullscreen={true}
      resizeMode="cover"  

      style={{height:200,width:Dimensions.get('window').width/2}}
      />
           </>
         }
           
         


      </View>
    )
  }


  


const renderQuickReplySend = () =>{
  return(
    <View>
      <Text>Hii</Text>
    </View>
  )
}

const quickReplyStyle = () =>{
  return(
    <View>
      <Text>Hii</Text>
    </View>
  )
}


  const renderMessageText = (props) => {
    return (
      <View>
        {
          props.currentMessage.messageType == 'file' ?
            <>
              <TouchableOpacity onPress={() => clickedDocument(props.currentMessage)}>
                <View style={{ flexDirection: 'row' }}>

                  {
                    props.currentMessage.user._id == 2 ?
                      <>
                        {
                          props.currentMessage.text ?
                            <View style={{ backgroundColor: '#1567E3', flexDirection: 'row', margin: 10, padding: 10, borderRadius: 10 }}>
                              <Image source={require('../assets/icons/document_white.png')} style={{ height: 20, width: 20, margin: 10 }} />
                              <Text style={{ padding: 10, color: '#fff' }}>{props.currentMessage.text.substr(props.currentMessage.text.lastIndexOf("/")+1, props.currentMessage.text.length)}</Text>
                            </View> :
                            <Text>{I18n.t("This message is taking time to load")}</Text>
                        }

                      </>
                      :
                      <>
                        {
                          props.currentMessage.text ?
                            <View style={{ backgroundColor: '#B8C2C9', flexDirection: 'row', margin: 10, padding: 10, borderRadius: 10 }}>
                              <Image source={require('../assets/icons/document_grey.png')} style={{ height: 20, width: 20, margin: 10 }} />
                              <Text style={{ padding: 10, color: '#000' }}>{props.currentMessage.text.substr(props.currentMessage.text.lastIndexOf("/") + 1, props.currentMessage.text.length)}</Text>
                            </View>
                            :
                            <Text>{I18n.t("This message is taking time to load")}</Text>
                        }

                      </>
                  }

                </View>
              </TouchableOpacity>
            </>
            :
            props.currentMessage.messageType == 'deleteforboths' ?
              props.currentMessage.user._id == 2 ?

                <View style={{ flexDirection: 'row' }}>
                  <Image source={require('../assets/icons/deleted_message.png')} style={{ height: 15, width: 15, margin: 7 }} />
                  <Text style={{ padding: 10, color: '#fff', fontStyle: 'italic' }}>{I18n.t("This message has been deleted")}</Text>
                </View>
                :
                <>

                  <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../assets/icons/deleted_chat.png')} style={{ height: 15, width: 15, margin: 7 }} />
                    <Text style={{ padding: 10, color: '#000', fontStyle: 'italic' }}>{I18n.t("This message has been deleted")}</Text>
                  </View>
                </>

              :
              props.currentMessage.messageType == 'chat' ?
                props.currentMessage.user._id == 2 ?

                  <TextInput multiline={true} selectTextOnFocus={false} dataDetectorTypes={'all'} editable={false}  style={{ padding: 10, color: '#fff' }}>{props.currentMessage.content}</TextInput>
                  :
                  <TextInput multiline={true} selectTextOnFocus={false} dataDetectorTypes={'all'} editable={false} style={{ padding: 10, color: '#000' }}>{props.currentMessage.content}</TextInput>
             
                : <></>
        }

      </View>
    )
  }



  // async function exitChat(){
  //   var a =  await AsyncStorage.getItem('jid_main');
  //   chat_roster_main.forEach(list=>{
  //     if(list.jid == route.params.jid){
  //       list.message = 'Chat Exited';
  //       list.exit = true;
  //     }
  //   })
  //   updateChat(chat_roster_main);
  //   dispatcher({type:'UPDATEINPUT',exit:true,exitMe:ChatState.exitMe,block:ChatState.block})

  //   // UPDATEINPUT
  //   dispatch({
  //     type: "SETMYMESSAGEMAIN",
  //     chat_roster_main: chat_roster_main,
  //   });
  //   const message = [
  //     {
  //       type:"exit",
  //       content:a
  //     }];
  //   sendMessage(message, route.params.jid);
  //   chatOptions.current.close()
  // }

  async function NotifyServerResume(){
    var jwt = await AsyncStorage.getItem('token');
      await axios.post(
        `${GLOBAL.BASE_URL}user/resumeChat`,
        {
          jid:route.params.jid,
          mjid:1    
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
            'Bearer '+jwt
          },
        }
      ).then((resp) => {
        console.log("blockerror",resp.data)
      }).catch((err) => {
        console.log("blockerror",err)
      })
  }
  async function NotifyServerEnd(){
    var jwt = await AsyncStorage.getItem('token');
      await axios.post(
        `${GLOBAL.BASE_URL}user/endChat`,
        {
          jid:route.params.jid,
          mjid:1    
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
            'Bearer '+jwt
          },
        }
      ).then((resp) => {
        console.log("blockerror",resp.data)
      }).catch((err) => {
        console.log("blockerror",err)
      })
  }

  const exitChat = useCallback(
    async (messages = []) => {
      var a = await AsyncStorage.getItem('jid_main');
      chat_roster_main.forEach(list => {
        if (list.jid == route.params.jid) {
          list.message = 'Chat Exited';
          list.chatExit = true;
        }
      })
      // updateChat(chat_roster_main);
      dispatcher({ type: 'UPDATEINPUT', chatExit: true, chatExitMe: ChatState.chatExitMe, block: ChatState.block, blockedMe:ChatState.blockedMe })
      // UPDATEINPUT
      dispatch({
        type: "SETMYMESSAGEMAIN",
        chat_roster_main: chat_roster_main,
      });
      const message = [
        {
          type: "exit",
          content: a
        }];
      sendMessage(message, route.params.jid);
      NotifyServerEnd(route.params.jid)
      chatOptions.current.close()
    },
    ["asd"]
  );

  const blockUser = useCallback(
    async (messages = []) => {
      var a = await AsyncStorage.getItem('jid_main');
      chat_roster_main.forEach(list => {
        if (list.jid == route.params.jid) {
          list.message = 'Chat cant be replied anymore';
          list.blocked = true;
        }
      })
      var jwt = await AsyncStorage.getItem('token');
      await axios.post(
        `${GLOBAL.BASE_URL}user/blockuser/post`,
        {
          userId:route.params.jid.substr(0,24),
          jid:route.params.jid,
          mjid:1,
          featureName: 'chat'
          // postId: currentPost._id
    
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
            'Bearer '+jwt
          },
        }
      ).then((resp) => {
        console.log("succesfully blocked")
        console.log("blockuserdata", resp.data)
      //  showBlockReason(resp.data.message)
      }).catch((err) => {
        console.log("blockerror",err)
      //  showBlockReason('You have already blocked this user')
        
      })
      // updateChat(chat_roster_main);
      dispatcher({ type: 'UPDATEINPUT', chatExit: ChatState.chatExit, chatExitMe: ChatState.chatExitMe, block: true,blockedMe: ChatState.blockedMe })
      // UPDATEINPUT
      dispatch({
        type: "SETMYMESSAGEMAIN",
        chat_roster_main: chat_roster_main,
      });
      const message = [
        {
          type: "block",
          content: a
        }];
      sendMessage(message, route.params.jid);
      chatOptions.current.close()
    },
    ["asd"]
  );


  
// async function makeCall(call){
//   var jwt = await AsyncStorage.getItem('token')
//   await axios.post(GLOBAL.BASE_URL+`user/addtologs/logs/${this_chat.aid}/${this_chat.userId}`,{
//     "name":route.params.name,
//     "profilePic":route.params.profilePic
//   },
//   {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:
//       'Bearer '+jwt
//     },
//   }).then((resp)=>{
//       // alert('Success')
//     console.log(resp.data);
//     // getData()
//     navigation.navigate('OutGoingCallScreen', { aid: this_chat.aid, name: route.params.name, profilePic: route.params.profilePic })
//   }).catch((err)=>{
//       console.log(err)
//       alert('You cannot call this user at this moment')
//   })
 
// }
async function registerCalls(){
    
  if(token!=null){
    var callpassword = await AsyncStorage.getItem('callpassword');
    var callid = await AsyncStorage.getItem('aid');
    handleConnect(callid, callpassword)
  }

}
async function makeCall(call){

  if(call){
    registerCalls()
    Alert.alert(
      I18n.t("Confirmation"),
    I18n.t("Are you sure you want to call "),
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Call", onPress: () => confirmCall(call) }
      ]
    );
    
  }
  
} 
// async function confirmCall(call){
//   alert('ok')
// }
async function confirmCall(call){
  // alert('Calling')
  console.log(call.userId,call.profilePic,call.name,call.aid)
  var jwt = await AsyncStorage.getItem('token')
  await axios.post(GLOBAL.BASE_URL+`user/addtologs/logs/${call.aid}/${call.userId}`,{
    "name":call.name,
    "profilePic":call.profilePic
  },
  {
    headers: {
      "Content-Type": "application/json",
      Authorization:
      'Bearer '+jwt
    },
  }).then((resp)=>{
      // alert('Success')
    console.log(resp.data);
    // getData()
    navigation.navigate('OutGoingCallScreen',{aid:call.aid,name:call.name,profilePic:call.profilePic})
  }).catch((err)=>{
      console.log(err)
      alert('You cannot call this user at this moment')
  })

}

  async function resumeChat() {
    var a = await AsyncStorage.getItem('jid_main');
    chat_roster_main.forEach(list => {
      if (list.jid == route.params.jid) {
        list.message = 'Click to send nessage';
        list.chatExit = false;
      }
    })
    updateChat(chat_roster_main);
    dispatcher({ type: 'UPDATEINPUT', chatExit: false, chatExitMe: ChatState.chatExitMe, block: ChatState.block,blockedMe:ChatState.blockedMe })
    dispatch({
      type: "SETMYMESSAGEMAIN",
      chat_roster_main: chat_roster_main,
    });
    const message = [
      {
        type: "resume",
        content: a
      }];
      NotifyServerResume()
    sendMessage(message, route.params.jid);
    navigation.goBack()
    alert(I18n.t('Chat Resumed you can click chat to send message'))
    // chatOptions.current.close()

  }


  async function clearChat() {
    //console.log(token)
    var jwt = await AsyncStorage.getItem('token');
    console.log(Date.now())
    chatOptions.current.close()
    await axios.post(GLOBAL.BASE_URL + 'user/clearChat', {
      time: Date.now(),
      mjid: 1,
      jid: this_chat.jid
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+jwt
      }
    }).then((resp) => {
      navigation.goBack()
      if(route.params.setLastMessag || route.params.setLastMessageTime || route.params.setLastMessageTime || route.params.unreadNewCount){
        route.params.setLastMessage('Click to send Message...')
        route.params.setLastMessageTime(Date.now())
        route.params.unreadNewCount(0)
      }
      // dispatcher({ type: 'UPDATEMESSAGES', messages_chat: [] })
      chat_roster_main.forEach(list => {
        if (list.jid == route.params.jid) {
          list.messages = [{
            content: `Chat Cleared at ${Date.now()}`,
            text: `Chat Cleared at ${Date.now()}`,
            createdAt: list.created_at,
            messageType: 'clear',
            system:true,
            _id: Date.now() * Math.random(),
            unique: Date.now() * Math.random(),
            messageId: Date.now() * Math.random(),
            type: "chat",
            user: {
              _id: 2
            },
          }];
          list.message = 'Click to send message'
        }
      })
      dispatcher({
        type: 'UPDATEMESSAGES', messages_chat: [{
          content: `Chat Cleared at ${Date.now()}`,
          text: `Chat Cleared at ${Date.now()}`,
          createdAt: list.created_at,
          messageType: 'clear',
          _id: Date.now() * Math.random(),
          unique: Date.now() * Math.random(),
          messageId: Date.now() * Math.random(),
          type: "chat",
          user: {
            _id: 2
          },
        }]
      })
      // dispatch
      dispatch({
        type: "SETMYMESSAGEMAIN",
        chat_roster_main: [...chat_roster_main],
      });

    }).catch((err) => {
      console.log(err.data)
      alert(I18n.t('Chat Cleared'))
    })

  }


  async function setShow(){

   chatOptions.current.close()
   setVisible(true)

  }

  // const [state, dispatch] = React.useReducer(
  //   chatReducers
  // );

  // const MessagesReducer = (prevState, action) => {
  //   switch (action.type) {
  //     case "SETSENDMESSAGE":
  //       return {
  //         messages: action.messages,
  //         isLoading: false,
  //       };
  //   }
  // };
  // const [CurrentUserMessages, dispatch] = React.useReducer(
  //   MessagesReducer,
  //   MessageState
  // );
  // function updateSend(messages){

  //   // console.log("Message",messages)

  //   // var curr = MessageState.messages;
  //   // // // curr.push(messages[0])
  //   // // // curr.splice(0, 0,messages[0])

  //   // console.log("aaaaa",messages[0])
  //   // console.log("bbbbb",curr.unshift(messages[0]))
  //   // console.log('ccccc',curr)
  //   // curr.unshift(messages[0])
  //   route.params.messages.unshift(messages[0])
  //   dispatch({type:'SETSENDMESSAGE',messages:route.params.messages})
  // }

  // renderBubble(props) { return ( <Bubble {...props} 
  //   wrapperStyle={{
  //       left: {
  //         backgroundColor: 'white',
  //       },
  //       right: {
  //         backgroundColor: '#ECEFF1'
  //       }
  //     }} />


  const renderBubble = (props) => {
    return (
      <Bubble {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#DDE4E9',
          },
          right: {
            backgroundColor: '#6FA4E9'
          }
        }} />
    )
  };

  async function takeMeBack(){
    if(route.params.unreadNewCount){
      route.params.unreadNewCount(0)
    }

    navigation.goBack()
  }
  

  const updateAlias = (a) => {

    setAliasName(a)
  }

  async function clickSave() {
    if(aliasName.length > 3){
    console.log(aliasName);
    console.log(GLOBAL.BASE_URL+'user/add/aliasname/name')
    console.log(route.params.jid, aliasName)
    var jwt = await AsyncStorage.getItem("token");
    await axios.post(GLOBAL.BASE_URL+'user/add/aliasname/name' , {
      jid: route.params.jid,
      name : aliasName
    },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ jwt
      }
    }).then((resp)=>{
      console.log(resp.data)
      console.log("nickname updated");
      route.params.name  = aliasName;
      route.params.setName(aliasName)
      // dispatch({
      //   type: "UPDATEALIASNAME",
      //   jid: route.params.jid,
      //   name:aliasName
      // });
      alert('Updated Name to:'+aliasName)
      // Chatdispatcher({type:'UPDATENICKNAME',nickName:aliasName})
    }).catch((err) => {
      console.log("EError",err)
     
      
    })
    setVisible(false);
  }else{
    alert("Name Can not be less than 3 characters")
  }
  }

  LogBox.ignoreAllLogs();

  if (Loading) {
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  }
  return (

    


    <>
 <Spinner
        visible={spinner}
        textContent={spinnerText}
        textStyle={styles.spinnerTextStyle}
      />



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
          backgroundColor: '#000',
          container: {
            borderRadius: 30,
            backgroundColor: '#000',
          },
        }}
      >
        <View style={{ backgroundColor: "#000", height: 200 }}>
          <Button title="Send Recording" onPress={() => { stopRecording() }}></Button>
          <Image
            cache="force-cache"
            source={{ uri: 'https://i.pinimg.com/originals/6b/a1/74/6ba174bf48e9b6dc8d8bd19d13c9caa9.gif' }}
            style={{ height: 180, width: '100%' }}
            resizeMode="cover"
          ></Image>

        </View>


      </RBSheet>

      <RBSheet
        ref={chatOptions}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={dynHeight}
        borderRadius={10}
        closeDuration={100}
        customStyles={{
          draggableIcon: {
            backgroundColor: "#fff",
          },
          backgroundColor: '#fff',
          container: {
            borderRadius: 30,
            backgroundColor: '#fff',
          },
        }}
      >
        <View style={{ backgroundColor: "#fff" }}>
          <View>
            <View>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                  <Image
                    source={require("../assets/icons/deleted_chat.png")}
                    style={{ height: 20, width: 20, marginLeft: 20, marginTop: 10 }}
                  ></Image>
                </View>

                <View style={{ color: "#000", flex: 13, height: 60 }}>
                  <TouchableOpacity
                    onPress={() => blockUser()}
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
                      {I18n.t("Block")}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 12,
                      flex: 70,

                      paddingLeft: 40,
                    }}
                  >
                    {I18n.t("User will not be able to chat or see each other Spaarks")}
                  </Text>
                  {/* line */}
                  <View
                    style={{
                      marginTop: 0,
                      marginLeft: 43,
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
                    source={require("../assets/icons/clear_chat.png")}
                    style={{ height: 20, width: 20, marginLeft: 20, marginTop: 10 }}
                  ></Image>
                </View>
                <View style={{ color: "#000", flex: 13, height: 60 }}>
                  <TouchableOpacity
                    onPress={() => clearChat()}
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
                      {I18n.t("Clear Chat")}
                    </Text>
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: "#000",
                      fontSize: 12,
                      flex: 70,
                      paddingLeft: 40,
                    }}
                  >
                    {I18n.t("This clears entire chat with user")}
                  </Text>
                  {/* line */}
                  <View
                    style={{
                      marginTop: 0,
                      marginLeft: 43,
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
                    source={require("../assets/icons/exit_chat.png")}
                    style={{ height: 20, width: 20, marginLeft: 20, marginTop: 10 }}
                  ></Image>
                </View>

                <View style={{ color: "#000", flex: 13, height: 60 }}>
                  <TouchableOpacity
                    onPress={() => exitChat()}
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
                      {I18n.t("Exit Chat")}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 12,
                      flex: 70,
                      paddingLeft: 40,
                    }}
                  >
                    {I18n.t("This will not allow the other user to chat with you You can still see other Spaarks")}
                  </Text>
                  {/* line */}
                  {(route.params.name === "Anonynous" || route.params.isOtherAnonymous || route.params.name === "anonymous") ? <View
                    style={{
                      marginTop: 0,
                      marginLeft: 43,
                      marginRight: 0,
                      borderBottomColor: "#C0C0C0",
                      borderBottomWidth: 1,
                    }}
                  /> : <></>}
                  
                </View>
              </View>
                    

                  {
                    (route.params.name === "Anonymous" || route.params.isOtherAnonymous || route.params.name === "anonymous") ?   <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <View style={{ color: "#000", flex: 1, marginLeft: 20 }}>
                     <Image
                       source={require("../assets/icons/pro4.png")}
                       style={{ height: 50, width: 50 }}
                     ></Image>
                   </View> 
   
                    <View style={{ color: "#000", flex: 13, height: 60 }}>
                   <TouchableOpacity onPress={()=>setShow()}>
                     <Text
                       style={{
                         color: "#000",
                         fontSize: 16,
                         margin: 0,
                         fontWeight: "bold",
                         paddingLeft: 40,
                       }}
                     >
                       {I18n.t("Edit Name")}
                     </Text>
                     </TouchableOpacity>
                     <Text
                       style={{
                         color: "#000",
                         fontSize: 12,
                         flex: 70,
                         paddingLeft: 40,
                       }}
                     >
                      Add a nick name to this user
                     </Text>
                   </View> 
   
                 </View> : <></>
   
                  }

            






            </View>
          </View>
        </View>





      </RBSheet>

         
   {/* {dialogRender()} */}
{
  visible?
  <View style={{ marginTop: 35 }}>
    {/* <View style={{textAlignHorizontal : "center" , marginLeft : 140}}>
      <Text style={{fontWeight:"bold" , }}> {route.params.name}</Text>
    </View> */}
 
  <View
    style={{ flex: 0, flexDirection: "row", backgroundColor: "#fff", borderBottomColor: '#000', padding :-10 }}
  >
    <View style={{ flex: 5 }}></View>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={{ flex: 29, marginTop: 10 }}>
        <Image
          source={require("../assets/icons/back.png")}
          style={{ marginTop: 18, marginLeft: 15 }}
        ></Image>
      </View>
    </TouchableOpacity>
    <View style={{ flex: 80  , padding : 30}}>
  <TextInput placeholder={"Enter Alias Name for "+ route.params.name}  
  value={aliasName}
  onChangeText={updateAlias} 
  />

    </View>
    <View style={{padding: 30 }}>
      <TouchableOpacity onPress={()=>clickSave()} >
      <Text style={{color: "#6FA4E9",fontWeight:'600' }}>SAVE</Text>
      </TouchableOpacity>

    </View>


  </View>
</View>


  :
  <View style={{ marginTop: 35 }}>
 
  <View
    style={{ flex: 0, flexDirection: "row", backgroundColor: "#fff", borderBottomColor: '#000' }}
  >
    <View style={{ flex: 5 }}></View>
    <TouchableOpacity onPress={() => takeMeBack()}>
      <View style={{ flex: 29, marginTop: 10,flexDirection:'row' }}>
      {/* <Image source={require('../assets/rightarrow.png')} style={{ height: 15, width: 15, marginLeft: 210,marginTop:0}}></Image> */}
        <Image
          source={require("../assets/rightarrow.png")}
          style={{ marginTop: 18, marginLeft: 10,height: 25, width: 15, transform: [{ rotate: '180deg'}]}}
        ></Image>
          <View  
        // style={{backgroundColor:'red',padding:2,borderRadius:10}}
        >
          {
            (unreadCount/3).toFixed(0)>0?
            <Text style={{color:'#6FA4E9',marginTop:20,marginLeft:5,fontSize:16}}>{unreadCount.toFixed(0)}</Text>
            :
            <></>
          }
       
        </View>
      </View>
    </TouchableOpacity>
    <View style={{ flex: 80 }}>
      {/* <TouchableOpacity onPress={() => sdf()}> */}

      <Image
        source={{
          uri: route.params.profilePic,
        }}
        style={{
          height: 40,
          width: 40,
          borderRadius: 30,
          marginLeft: 35,
          marginTop: 25,
          margin: 10,
        }}
      ></Image>

    </View>

    <View
      style={{ flex: 300, marginLeft: 5, marginTop: 12, marginLeft: 20, height: 30 }}
    >
      <TouchableOpacity onPress={() =>   navigation.navigate('UserProfileDynamic',{userId:route.params.jid.substr(0,24)})}>
      <Text
        style={{ paddingTop: 10, color: "black", fontWeight: "bold" }}
      >
        {" "}
        {route.params.name}
      </Text>
      
</TouchableOpacity>
      {/* <TouchableOpacity onPress={() => getOld()}> */}

      <View style={{ flexDirection: "row" }}>
        <View style={{flex:1,flexDirection:'row'}}>
        {
                     route.params.connection.length && route.params.connection.length > 0 ?



                    
  route.params.connection.length && route.params.connection[0].charAt(0).toUpperCase() + route.params.connection[0].slice(1) == "Market" || route.params.connection[0].charAt(0).toUpperCase() + route.params.connection[0].slice(1) == "Friends" || route.params.connection[0].charAt(0).toUpperCase() + route.params.connection[0].slice(1) == "Announce" ?
           
          <View style={{
              borderWidth: 1,
              backgroundColor: '#fff',
              borderColor: "#6FA4E9", padding: 5, borderRadius: 10, height: 25
            }}>
              <Text
                style={{
                  color: "#6FA4E9",
                  marginTop: 0,
                  fontSize: 10,
                }}
              >
                {I18n.t(route.params.connection[0])}
              </Text>
            </View>
            
            :
            <></>
:
<></>



        }
        {
           route.params.connection.length && route.params.connection.length > 1 ?
        route.params.connection[1] == "Market" || route.params.connection[1] == "Friends" || route.params.connection[1] == "Announce" ?
            <> 
            <View style={{
                borderWidth: 1,
                backgroundColor: '#fff',
                borderColor: "#6FA4E9", padding: 5, borderRadius: 10, height: 25
              }}>
                <Text
                  style={{
                    color: "#6FA4E9",
                    marginTop: 0,
                    fontSize: 10,
                  }}
                >
            {I18n.t(route.params.connection[1])}
                </Text>
              </View>
              </>
              :
              <></>
            :
            <></>
        }

        {
           route.params.connection.length && route.params.connection.length > 2 ?
         route.params.connection[2] == "Market" || route.params.connection[2] == "Friends" || route.params.connection[2] == "Announce" ?
              <View style={{
                borderWidth: 1,
                backgroundColor: '#fff',
                borderColor: "#6FA4E9", padding: 5, borderRadius: 10, height: 25
              }}>
                <Text
                  style={{
                    color: "#6FA4E9",
                    marginTop: 0,
                    fontSize: 10,
                  }}
                >
                  {I18n.t(route.params.connection[2])}
                </Text>
              </View>
              :
              <></>
            :
            <></>
        }
        </View>
        {
this_chat.contactMe && !this_chat.amIAnonymous?
<View style={{flex:0,marginBottom:10}}>
<TouchableOpacity onPress={() => makeCall(this_chat)}>
  <View style={{padding:5}}>
  <Image source={require('../assets/icons/call_chat.png')} style={{ height: 40, width: 40,  left: 50,position:'absolute',top:-10 }} onPress={() => makeCall(this_chat)}/>

  </View>
</TouchableOpacity>

</View>


:
<></>
        }
   
        <View style={{flex:1}}>
          <TouchableOpacity onPress={() =>{ chatOptions.current.open()}}>
            <Image source={require("../assets/icons/horizontaldots.png")} style={{
              height: 40,
              resizeMode: "contain",
              width: 30,
              position:'absolute',
              transform: [{ rotate: "90deg" }],
              left: 90,
              top:-10
            }} />
          </TouchableOpacity>
        </View>
      </View>



    </View>
  </View>
</View>


}

   


      {/* <ImageBackground source={{uri:'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'}} style={{flex:1}}> */}
      <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
      

 <GiftedChat
          messages={[...new Map(ChatState.messages_chat.slice(0,-1).map(item =>
          // messages={[...new Map(ChatState.messages_chat.map(item =>
            [item['unique'], item])).values()]}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 2,
          }}
        
          // timeFormat="LT"
          renderBubble={renderBubble}

          // renderTicks={true}
          // renderUsernameOnMessage={true}
          isLoadingEarlier={true}
          renderMessageVideo={onVideo}
          renderChatEmpty={renderChatEmpty}
          renderComposer={renderComposer}
          renderMessageImage={renderMessageImage}
          onLongPress={onLongPress}
          renderMessageText={renderMessageText}
          // renderQuickReplySend={renderQuickReplySend}
          quickReplyStyle={quickReplyStyle}
          // renderChatFooter={renderChatFooter}
          // renderInputToolbar={renderInputToolbar}
          // renderUsernameOnMessage={false}
          // renderInputToolbar={
          //   this_chat.exitMe ||
          //   this_chat.exit ||
          //   this_chat.blocked ||
          //   this_chat.blockedMe
          //     ? () => null
          //     : undefined
          // }
          renderSend={renderSend}
          // scrollToBottom
          // textInputStyle={{ width: 10, marginLeft: 0,height:10 }}
          // maxComposerWidth={10}
          renderActions={renderActions}
          // textInputProps={{ width: 10 }}
          onInputTextChanged={setItemsRemove}
          // renderMessageAudio={renderMessageAudio}
          // textInputStyle={{ color: "#000", width: 10 }}
          // minComposerHeight={30}
          bottomOffset={40}     
          renderQuickReplySend={renderAccessory}
          scrollToBottomComponent={scrollToBottomComponent}

        /> 
      </View>
      {/* </ImageBackground> */}

    </>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 16
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  video: {
    backgroundColor: '#000',
    justifyContent: 'center',
    marginTop: 0,
    width: 190,
    height: 170,
    resizeMode: "contain"
  },
  image: {
    backgroundColor: '#000',
    justifyContent: 'center',
    width: 260,
    height: 450,
    resizeMode: "contain",
    borderColor: '#f2f2f2',
    borderWidth: 2,
    borderRadius: 10,
    borderTopRightRadius: 0,
    // resizeMode: "contain"
  }
});

const mapStatetoProps = (state) => {
  return {
    chat_roster_main: state.chat.chat_roster_main,
    chat_roster_anonymous: state.chat.chat_roster_anonymous,
    messagess: state.chatss.messages,
    token: state.chatss.token,
    nickName:state.chatss.nickName,
    unreadCount:state.chat.unreadCount
  };
};
export default connect(mapStatetoProps)(ChatScreen);
