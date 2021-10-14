import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet,Image } from 'react-native';
import { AssetsSelector } from 'expo-images-picker'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const SelectPhotosScreen = ({navigation,route}) => {

  const onDone = (data) =>{
    console.log("Data",data)
    if(route.params.from == 'chat'){
    navigation.navigate('ChatSpecificScreen',{ 
      name: route.params.name,
      profilePic: route.params.profilePic,
      jid: route.params.jid,
      xmpp: route.params.xmpp,
      messages:route.params.messages,media:data})
    }

    if(route.params.from == 'newInfoP'){
      data.forEach(list=>{
        var photo = {
          uri: list.uri,
          mimetype: "image/jpeg",
          name: "image_ios.jpeg",
        };
        route.params.mediaP.push(photo)
      })
      
      navigation.navigate('NewInfoStepperScreen',{
        content: route.params.content,
        question:route.params.question,
        questionNo:route.params.questionNo,
        category:route.params.category,
        categoryId:route.params.categoryId,
        subCategoryId:route.params.subCategoryId,
        subCategory:route.params.subCategory,
        mediaV:route.params.mediaV,
        mediaP:route.params.mediaP,
      })
      }

      if(route.params.from == 'newInfoV'){
        var video = {
          uri: data[0].uri,
          mimetype: "video/mp4",
          name: "video_ios.jpeg",
        };
        navigation.navigate('NewInfoStepperScreen',{
          content: route.params.content,
          question:route.params.question,
          questionNo:route.params.questionNo,
          category:route.params.category,
          categoryId:route.params.categoryId,
          subCategoryId:route.params.subCategoryId,
          subCategory:route.params.subCategory,
          mediaP:route.params.mediaP,
          mediaV:video
        })
        }

    }
  
  const NothingtoShow = () =>{
    return(
      <View><Text>{I18n.t("Nothing to show")}</Text></View>
    )
  }
  const Selected = ()=>{
    return(
      <Image source={require('../assets/icons/clicked.png')} style={{height:20,width:20,position:'absolute',left:72,bottom:72}}></Image>
    )
  }
  
const VideoIcon = () =>{
  return(
    // <Image source={require('../assets/icons/newInfoVideo.png')} style={{height:20,width:20,position:'absolute',left:72,bottom:72}}></Image>
    <Text>{I18n.t("Video")}</Text>
  )
}

const getImages = async() =>{
  var options = {};
  var a  = await launchImageLibrary(options, async(response) => {
    console.log(response)
    var data = []
    data.push(response)
    if(route.params.from == 'chat'){
      navigation.navigate('ChatSpecificScreen',{ 
        name: route.params.name,
        profilePic: route.params.profilePic,
        jid: route.params.jid,
        xmpp: route.params.xmpp,
        messages:route.params.messages,media:data})
      }
});
}


    useEffect(() => {
      // setMessages(route.params.messages);
 
getImages()
      return () => {};
    }, []);

  function goBack (){
    navigation.goBack()
  }
  return(
    <></>
//     <AssetsSelector
//     options={{
//         manipulate: {
//           width: 512,
//           compress: 0.7,
//           base64: false,
//           saveTo: 'jpeg',
//         },
//         assetsType: route.params.assetsType,
//         maxSelections: route.params.maxSelections,
//         margin: 3,
//         portraitCols: 4,
//         landscapeCols: 5,
//         widgetWidth: 100,
//         videoIcon: {
//           Component: VideoIcon,
//           color: 'white',
//           size: 200,
//       },
//       selectedIcon: {
//           Component: Selected,
//           iconName: 'ios-checkmark-circle-outline',
//           size: 5,
//       },
//         widgetBgColor: '#fff',
//         selectedBgColor: '#63cdff',
//         spinnerColor: '#63cdff',
//         noAssets: {
//             Component: NothingtoShow,
//         },
//         defaultTopNavigator: {
//           continueText: 'Send',
//           buttonStyle: { top:5,color:'#fff',borderRadius:10,marginBottom:10,borderColor:'#6FA4E9',borderWidth:0},
//           textStyle: {color:'#000',fontWeight:'bold'},
//           goBackText: 'Cancel',
//           backFunction: goBack,
//           doneFunction: (data) => onDone(data),
//       }
//     }}
// />
  )
};

export default SelectPhotosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});