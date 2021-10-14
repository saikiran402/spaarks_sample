// import React , {useState, useEffect} from 'react';
// import { ScrollView, FlatList} from 'react-native';
// import Textarea from "react-native-textarea";
// import ImagePicker from "react-native-customized-image-picker";
// import axios from 'axios';
// import AsyncStorage from "@react-native-community/async-storage";
// import moment from "moment"
// import Snackbar from 'react-native-snackbar';
// import Spinner from 'react-native-loading-spinner-overlay';
// import I18n from '../src/i18n';
// // import ImagePicker from "react-native-customized-image-picker";
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker'


// const GLOBAL = require('../Globals');



// import { View, Text, Image, Button, StyleSheet, SafeAreaView, Dimensions,ActionSheetIOS, TouchableOpacity} from 'react-native';

// const BusinessEnquiries = ({navigation,route}) => {

//   const [spinner, setSpinner]= useState(false);
//   const [spinnerText, setSpinnerText]= useState('Loading');
//     async function enquire(){
//       if(content.length>0){
//         setSpinner(true)
//         setSpinnerText('Creating Ticket ...')
//           // console.log(GLOBAL.BASE_URL+'ticket')
//           // console.log(formData)
//           var jwt = await AsyncStorage.getItem('token')
//           const formData = new FormData();
//           if (imagesupload.length) {
//             imagesupload.forEach((list) => {
//               formData.append("photo", list);
//             });
//           }
//           formData.append("content", content);
//           formData.append("type", 'business');
//           formData.append("subject", 'Business enquiry');
//           console.log('formdata',formData)
//           await axios.post(GLOBAL.BASE_URL+'ticket',
//               formData,
//               {
//                 headers: {
//                   "Content-Type": "multipart/form-data",
//                   Authorization:
//                   'Bearer '+jwt
//                 },
//               }
//             )
//             .then((resp) => {
//                 console.log("enquiry",resp.data)
//                 setSpinner(false)
//           Snackbar.show({text: "ticket created successfully",
//           duration: Snackbar.LENGTH_LONG})   
//           setContent("")
//           setUpload([])
//               getEnquiry()
//               navigation.popToTop()
//               navigation.navigate('TicketSpecificScreen', { ticket: resp.data.ticket })
  
  
//             }).catch((err)=>{
//               alert('Something went wrong')
//           });
//       }else{
//         alert('Please describe the enquire to help us understand better')
//       }
   
//     }





//     const [enquiry, setEnquiry] = useState([])

//     const getEnquiry = async () => {
//         var jwt = await AsyncStorage.getItem('token');
//         await axios.get(`${GLOBAL.BASE_URL}ticket/business`, {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization:
//                 'Bearer '+jwt
//             },
//         }).then((res) => {
//             // console.log('RESP',res.data[0].thread)
//             setEnquiry(res.data)
            
//         }

//         ).catch(err => console.log(err))

//         console.log("Tickets enquiry", enquiry)
//     }

//     useEffect(() => {
//         getEnquiry()
//     }, [])




//   // const [content, setContent] = useState("");
//   function updateText(a) {
//     setContent(a);
//   }
//   const [images, setImages] = useState([]);
//   // const [images,setImages] = useState([])
//   // const [content,setContent] = useState('')
//   const [imagesupload,setUpload] = useState([])
// const [canselectImage,setCanSelectImage] = useState(true)
// const [imagesRemaining,setRemaining] = useState(4)
 
// // const [imagesupload,setUpload] = useState([]);
// // const [canselectImage,setCanSelectImage] = useState(true)
// // const [imagesRemaining,setRemaining] = useState(4)
// // const [image, setImage] = useState(null);
// const [content, setContent] = useState("");




//   // function showImageSelection() {
//   //   ActionSheetIOS.showActionSheetWithOptions(
//   //     {
//   //       options: [I18n.t("Cancel"), I18n.t("Library"), I18n.t("Camera")],
//   //       cancelButtonIndex: 0,
//   //       userInterfaceStyle: "dark",
//   //     },
     
      
//   //     async (buttonIndex) => {
//   //       if (buttonIndex === 0) {
//   //         // cancel action
//   //       } else if (buttonIndex === 1) {
      
//   //           // var remainingP = 4 - imagesupload.length;
          
//   //         console.log("In Library");
//   //         // pickImageLibrary();
//   //          await ImagePicker.openPicker({
//   //       multiple: false,
//   //       // maxSize:remainingP,
       

//   //       // width: 20,
//   //       // height: 20
//   //     }).then(images => {
//   //       console.log('yiuytyuytyuytyuytyuytyuy',images);
//   //       // alert(images.length)
//   //       var imagesuploads = [...imagesupload,...images]
//   //       var newImag = []
//   //       var cou = 1;
//   //       imagesuploads.forEach(list=>{
//   //         var photo = {
//   //           uri: list.path,
//   //           mimetype: "image/jpeg",
//   //           name: `image-${cou}-ios.jpeg`,
//   //           mediaType:list.mediaType
//   //         };
//   //         newImag.push(photo)
//   //         cou++;
//   //       })
       
//   //       setUpload(newImag)
//   //       // setImagesss(images)
//   //       // setLongitude(images)
//   //     })
//   //       } else if(buttonIndex == 2) {
//   //         console.log("In Camera");
//   //         // pickImageCamera();
//   //         await ImagePicker.openCamera({
//   //           width: 20,
//   //           height: 20,
//   //         }).then(images => {
        
//   //       var imagesuploads = [...imagesupload,...images]
//   //       var newImag = []
//   //       var cou = 1;
//   //       imagesuploads.forEach(list=>{
//   //         var photo = {
//   //           uri: list.path,
//   //           mimetype: "image/jpeg",
//   //           name: `image-${cou}-ios.jpeg`,
//   //           mediaType:list.mediaType
//   //         };
//   //         newImag.push(photo)
//   //         cou++;
//   //       })
//   //       setUpload(newImag)
//   //         });
          
//   //       }
//   //       else {

//   //       }
//   //     }
//   //   );
//   // }
//   // function showImageSelection() {
//   //   ActionSheetIOS.showActionSheetWithOptions(
//   //     {
//   //       options: [I18n.t("Cancel"), I18n.t("Library"), I18n.t("Camera")],
//   //       cancelButtonIndex: 0,
//   //       userInterfaceStyle: "dark",
//   //     },
     
      
//   //     async (buttonIndex) => {
//   //       if (buttonIndex === 0) {
//   //         // cancel action
//   //       } else if (buttonIndex === 1) {
      
//   //           // var remainingP = 4 - imagesupload.length;
          
//   //         console.log("In Library");
//   //         // pickImageLibrary();
//   //          await ImagePicker.openPicker({
//   //       multiple: true,
//   //       // maxSize:remainingP,
//   //       maxSize: imagesRemaining,

//   //       // width: 20,
//   //       // height: 20
//   //     }).then(images => {
//   //       console.log('yiuytyuytyuytyuytyuytyuy',images);
//   //       alert(images.length)
//   //       var rem = imagesRemaining - images.length;
//   //       setRemaining(rem)
//   //       if(images.length == 4){
//   //         setCanSelectImage(false)
//   //       }

//   //       // alert(images.length)
//   //       // var imagesuploads = [...imagesupload,...images]
//   //       // var newImag = []
//   //       // var cou = 1;
//   //       // imagesuploads.forEach(list=>{
//   //       //   var photo = {
//   //       //     uri: list.path,
//   //       //     mimetype: "image/jpeg",
//   //       //     name: `image-${cou}-ios.jpeg`,
//   //       //     mediaType:list.mediaType
//   //       //   };
//   //       //   newImag.push(photo)
//   //       //   cou++;
//   //       // })
//   //       var newUploads = [...imagesupload]
//   //       images.forEach(list=>{
//   //         var photo = {
//   //           uri: list.path,
//   //           mimetype: "image/jpeg",
//   //           name: `image-${Math.random()}-ios.jpeg`,
//   //           mediaType:list.mediaType
//   //         };
//   //         newUploads.push(photo)
//   //       })
          
       
//   //       setUpload(newUploads)
//   //       // setImagesss(images)
//   //       // setLongitude(images)
//   //     })
//   //       } else if(buttonIndex == 2) {
//   //         console.log("In Camera");
//   //         // pickImageCamera();
//   //         await ImagePicker.openCamera({
//   //           width: 20,
//   //           height: 20,
//   //         }).then(images => {
        
//   //       var imagesuploads = [...imagesupload,...images]
//   //       var newImag = []
//   //       var cou = 1;
//   //       imagesuploads.forEach(list=>{
//   //         var photo = {
//   //           uri: list.path,
//   //           mimetype: "image/jpeg",
//   //           name: `image-${cou}-ios.jpeg`,
//   //           mediaType:list.mediaType
//   //         };
//   //         newImag.push(photo)
//   //         cou++;
//   //       })
//   //       setUpload(newImag)
//   //         });
          
//   //       }
//   //       else {

//   //       }
//   //     }
//   //   );
//   // }

// //   async function addImages(){
// //     //  await ImagePicker.openPicker({
// //     //   multiple: true,
// //     //   maxSize:2
// //     // }).then(images => {
// //     //   //console.log(images);
// //     // });
// //        ActionSheetIOS.showActionSheetWithOptions(
// //     {
// //       options: ["Cancel","Camera","Photo Library"],
// //       // destructiveButtonIndex: 2,
// //       cancelButtonIndex: 0,
// //       userInterfaceStyle: "light",
// //     },

// //     // ImagePicker.openCamera({
// //     //     width: 300,
// //     //     height: 400,
// //     //     cropping: true
// //     //   }).then(image => {
// //     //     console.log(image);
// //     //   });
      
    
// //     async (buttonIndex) => {
// //       if (buttonIndex === 0) {
// //         // cancel action
// //       } else if (buttonIndex === 1) {
// //             await  ImagePicker.openCamera({
// //           cropping: true,
// //                   hideCropBottomControls:false
// //         }).then(image => {
// //             setImages(image)
// //           //console.log(image);
          
// //         });
// //       }else if (buttonIndex === 2) {
// //         await ImagePicker.openPicker({
// //       multiple: true,
// //       maxSize:1,
// //       hideCropBottomControls:true
// //     }).then(images => {
// //       //console.log(images);
// //       setImages(images)
// //     });
// //       }else{

// //       }
// //     }
// //   );
// // }




// function addImages() {
//   ActionSheetIOS.showActionSheetWithOptions(
//     {
//       options: [I18n.t("Cancel"), I18n.t("Library"), I18n.t("Camera")],
//       cancelButtonIndex: 0,
//       userInterfaceStyle: "dark",
//     },
   
    
//     async (buttonIndex) => {
//       if (buttonIndex === 0) {
//         // cancel action
//       } else if (buttonIndex === 1) {
    
//           // var remainingP = 4 - imagesupload.length;
        
//         console.log("In Library");
//         // pickImageLibrary();
//          await ImagePicker.openPicker({
//       multiple: true,
//       // maxSize:remainingP,
//       maxSize: imagesRemaining,

//       // width: 20,
//       // height: 20
//     }).then(images => {
     
//       // alert(images.length)
//       var rem = imagesRemaining - images.length;
//       setRemaining(rem)
//       if(images.length == 4){
//         setCanSelectImage(false)
//       }
//       var newUploads = [...imagesupload]
//       images.forEach(list=>{
//         var photo = {
         
//           uri: list.path,
                      
//                       // mediaType:list.mediaType,
//                       type: 'image/jpg',
//                       name: "ticket-image.jpg",
          
//         };
//         newUploads.push(photo)
//       })
        
//       console.log('yiuytyuytyuytyuytyuytyuy',images);
//       setUpload(newUploads)
//       // setImagesss(images)
//       // setLongitude(images)
//     })
//       } else if(buttonIndex == 2) {
//         console.log("In Camera");
//         // pickImageCamera();
//         await ImagePicker.openCamera({
//           width: 20,
//           height: 20,
//         }).then(images => {
      
//       // var imagesuploads = [...imagesupload,...images]
//       // var newImag = []
//       // var cou = 1;
//       // imagesuploads.forEach(list=>{
//       //   var photo = {
//       //     uri: list.path,
//       //                 type: 'image/jpg',
//       //                 name: "ticket-image.jpg",
//       //   };
//       //   newImag.push(photo)
//       //   cou++;
//       // })
//       // console.log('yiuytyuytyuytyuytyuytyuy',images);
//       // setUpload(newImag)

            
//       // alert(images.length)
//       console.log('NEWUPLOLOLOLO',images)
//       var rem = imagesRemaining - images.length;
//       setRemaining(rem)
//       if(images.length == 2){
//         setCanSelectImage(false)
//       }
//       var newUploads = [...imagesupload]
//       images.forEach(list=>{
//         var photo = {
//           uri: list.path,         
//           type: 'image/jpg',
//           name: "ticket-image.jpg",
          
//         };
//         newUploads.push(photo)
//       })
        
//       console.log('NEWUPLOLOLOLO',newUploads);
//       setUpload(newUploads)
//         });
        
//       }
//       else {

//       }
//     }
//   );
// }


// // async function deleteImage(){
// //   setImages([])
// // }

// async function deleteImage(path,mediaType){
//   var newc = imagesRemaining;
//       setRemaining(newc+1)
//       // alert(imagesRemaining)
//         const newImages =  imagesupload.filter((item) => item.uri !== path);
//         setUpload(newImages)
      
  
//       }

//   const renderPreviosEnquiry = ({ item }) => {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'#f2f2f2' }}>
//          <TouchableOpacity onPress={() => { navigation.navigate('TicketSpecificScreen', { ticket: item }) }}>
         
//          {/* <TouchableOpacity onPress={() => { console.log(item.thread)}}> */}

//                 <View style={{ backgroundColor: `#fff`, padding: 15,margin:10,borderRadius:10 }}  >
//                     <View style={{ flexDirection: "row" }}  >
//                         <Text style={{ flex: 1, fontWeight: "600",fontSize:12 }}>{item.subject}</Text>
//                         <View style={{ backgroundColor: item.status == 'Open'?'#4BB543':"#FF0000", borderRadius: 10, padding: 5 }} >
//                             <Text style={{ flex: 1, color: "white" }}>{item.status}</Text>
//                         </View>
//                     </View>
//                     <Text style={{ color: "#7B8794" }}>{moment(item.createdAt).calendar()}</Text>
//                     <Text style={{ paddingTop: 5 }} numberOfLines={2}><Text style={{ fontWeight: "500" }}>{item.thread[0].isUser ? "You" : "SupportTeam"} </Text  >:  {item.thread[0].content}</Text>

//                     <View
//                         style={{
//                             marginTop: 5,
//                             marginLeft: 0,
//                             marginRight: 0,
//                             borderBottomColor: "#EAEAEA",
//                             borderBottomWidth: 0.2,
//                         }}
//                     />
//                 </View>
//             </TouchableOpacity>
//        </View>
//     )
// }



//     return (
//       <>
//       <SafeAreaView>
//           <ScrollView>
//           <Spinner
//           visible={spinner}
//           textContent={"Creating Ticket ..."}
//           textStyle={{color:'#fff'}}
//         />
//               <View style={{backgroundColor: "#f2f2f2", height: Dimensions.get('window').height, alignItems:"center"}}>
//                 <View >
           
//                     <Text style={{fontSize: 16, fontWeight: "600", top: 20, left: 0,padding:0}}>
//                     {I18n.t("Bizz_placeholder")} 
//                     </Text>
                   
//                 </View>
//             {/* Text area */}
//             <View
//               style={{
                
//                 paddingLeft: 10,
//                 paddingTop: 20,
//                 top: 30,
//                 fontSize: 30,
//                 backgroundColor: "#fff", 
//                 height: 250,
//                 width: 360,
//                 alignItems: "center",
//                 justifyContent:"center",
//                 borderRadius:15
//               }}
//             >
//               <Textarea
//                 maxLength={1000}
//                 value={content}
//                 onChangeText={updateText}
//                 placeholder= {I18n.t("Ask your queries here")} 
//                 placeholderTextColor={"#c7c7c7"}
//                 underlineColorAndroid={"transparent"}
//               />
//               <View style={{borderWidth: 0.9, borderColor: "#EAEAEA", width: 330}}/>
              
// <View style={{flexDirection :"row"}}>
//             <Image
//                   source={require("../assets/icons/infoimages.png")}
//                   style={{height: 30, width: 30, top: 17}}
//                 ></Image>
//             <Text
//                 onPress={addImages}
//                 style={{
//                   color: '#6FA4E9',
//                   fontWeight: "bold",
//                   fontSize: 16,
//                   marginTop: 22,
//                   marginLeft:15
//                 }}
//               >
//               Add Image
//               </Text>
//               </View>
          
             
              
//             </View>
         
              
            
            

//             </View>
            


//             <View style={{ backgroundColor: "#f2f2f2", position: "absolute", marginTop: 360, marginLeft: 60}}>
//              {
//                imagesupload.length>0?
//                <>
//                {/* <Text>Images Selected</Text> */}
//                </>

//                :
//                <></>
//              }
//                 <FlatList
//             data={imagesupload}

//       horizontal={true}
//       showsHorizontalScrollIndicator={false}
//       renderItem={({ item, i }) => (
//         <TouchableOpacity onPress={()=>deleteImage(item.uri)}> 
//         <View style={{margin:15}}>
//         <Image
//                     source={{ uri: item.uri }}

//           style={{height:60,width:60}}
//         />
        
//         <Image
//           source={{ uri: 'https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/38-512.png' }}
//           style={{height:20,width:20,position:'absolute',left:50,top:-5}}
//           onPress={()=>deleteImage(item.path)}
//         />
        
//         </View>
// </TouchableOpacity> 
//       )}/>
//                 </View>
                
//             <View style={{ position: "absolute", marginLeft: 270, marginTop: 350}}>
//             <TouchableOpacity  onPress={()=>{enquire()}}>

//                 <View style={{backgroundColor:'#6FA4E9',padding:10,width:100,borderRadius:20}}>
//                     <Text style={{color:'#fff',textAlign:'center'}}>{I18n.t("Submit")}</Text>
//                 </View>
//                 </TouchableOpacity>
//             </View>
//             <View style={{ backgroundColor: '#f2f2f2' }}>
//             {enquiry.length > 0 ?
//                     <>
//                         <Text style={{ fontWeight: 'bold', padding: 20, fontSize: 20, paddingBottom: 0 }}>{I18n.t("Previous enquiries")}  </Text>
//                         <FlatList data={enquiry}
//                             renderItem={renderPreviosEnquiry} />
        
//                     </>
//                     : <></>
//                 }
//            </View>
//           </ScrollView>
//       </SafeAreaView>
      
      
//       </>
//     );
// };

// export default BusinessEnquiries;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     alignItems: 'center', 
//     justifyContent: 'center'
//   },
// });



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
import moment from "moment"
const defaultScrollViewProps = {
    keyboardShouldPersistTaps: "handled",
    scrollEnabled: "false",
    showsVerticalScrollIndicator: "false",
    
  };

const BusinessEnquiries = ({ navigation, route,token,Mytickets }) => {
    const Chatdispatcher = useDispatch(chatReducers);
    const [images,setImages] = useState([])
    const [content,setContent] = useState('')
    const [imagesupload,setUpload] = useState([])
const [canselectImage,setCanSelectImage] = useState(true)
const [imagesRemaining,setRemaining] = useState(4)
const [tickets, setTickets] = useState([])

const getTickets = async () => {
  var jwt = await AsyncStorage.getItem('token')
    await axios.get(`${GLOBAL.BASE_URL}ticket/business`, {
        headers: {
            "Content-Type": "application/json",
            Authorization:
            'Bearer '+jwt
        },
    }).then((res) =>{

            setTickets(res.data)
            Chatdispatcher({type:'UPDATEMYTICKETS',Mytickets:res.data})
          
        }).catch(err => console.log(err))

    console.log("Tickets", tickets)
}

useEffect(() => {
  setSpinner(false)
  getTickets()
}, [])



const renderPreviosTickets = ({ item }) => {
  return (

      <TouchableOpacity onPress={() => { navigation.navigate('TicketSpecificScreen', { ticket: item }) }}>
      {/*  <TouchableOpacity onPress={() => { console.log("ticketsssss", item.thread) }}>  */}

          <View style={{ backgroundColor: `#fff`, padding: 15,margin:10,borderRadius:10 }}  >
              <View style={{ flexDirection: "row" }}  >
                  <Text style={{ flex: 1, fontWeight: "600",fontSize:12 }}>{I18n.t(item.subject)}</Text>
                  <View style={{ backgroundColor: item.status == 'Open'?'#4BB543':"#FF0000", borderRadius: 10, padding: 5 }} >
                      <Text style={{ flex: 1, color: "white" }}>{I18n.t(item.status)}</Text>
                  </View>
              </View>
              <Text style={{ color: "#7B8794" }}>{moment(item.createdAt).calendar()}</Text>
              <Text style={{ paddingTop: 5 }} numberOfLines={2}><Text style={{ fontWeight: "500" }}>{item.thread[0].isUser ? I18n.t("You") : I18n.t('Team spaarks')} </Text  >:  {item.thread[0].content}</Text>

              <View
                  style={{
                      marginTop: 5,
                      marginLeft: 0,
                      marginRight: 0,
                      borderBottomColor: "#EAEAEA",
                      borderBottomWidth: 0.2,
                  }}
              />
          </View>
      </TouchableOpacity>
  )
}
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
          formData.append("type", 'business');
          formData.append("subject", 'Business enquiry');
          console.log('formdata',formData)
          await axios.post(GLOBAL.BASE_URL+'ticket',
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
                alert('Something went wrong')
            })
      }else{
        alert('Please describe the issue.')
      }
      
    }

      function addImages() {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: [I18n.t("Cancel"), I18n.t("Library"), I18n.t("Camera"),],
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
                    {/* <Text style={{fontWeight:'bold'}}>{I18n.t('Subject')}  :</Text> */}
                    {/* <Text>{route.params.subject}</Text> */}
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
{I18n.t("Bizz_placeholder")} 
                    {/* {I18n.t("Please elaborate your issue")} */}
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

                        <TouchableOpacity onPress={()=>{alert('Max 4 Images')}}>
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
                <View style={{ backgroundColor: '#f2f2f2' }}>

{tickets.length > 0 ?
    <>
        <Text style={{ fontWeight: 'bold', padding: 20, fontSize: 20, paddingBottom: 0 }}> {I18n.t('Previous Enquiries')}    </Text>
        <FlatList data={tickets}
            renderItem={renderPreviosTickets} />
    </>
    : <></>
}
{/* <Text style={{ fontWeight: 'bold', padding: 20, fontSize: 20, paddingBottom: 0 }}>{I18n.t("Contact_Us")}</Text> */}
{/* <FlatList data = {ContactUs} renderItem= {renderContactUs} /> */}

</View>
            </View>
           
        </ScrollView>
    );
};

const mapStatetoProps = (state) => {
    return {
      chat_roster_main: state.chatss.chat_roster_main,
      token:state.chatss.token,
      Mytickets:state.chatss.Mytickets
  
    };
  };
  export default connect(mapStatetoProps)(BusinessEnquiries);

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
