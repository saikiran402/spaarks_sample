
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  ActionSheetIOS
} from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
import ImageView from 'react-native-image-view';
import moment from "moment";
import { Paragraph } from 'react-native-paper';
import CameraRoll from "@react-native-community/cameraroll";
import I18n from '../src/i18n';


const {width} = Dimensions.get('window');



export default function ViewFullScreenImagesScreen({navigation,route}) {
  var data = route.params.photos;

  const [finalImages, setFinalImages] = useState();
// console.log('TESTTESTTESTTESTTESTTEST',route.params.photos)
// console.log('TESTTESTTESTTESTTESTTEST',route.params.name)
// console.log('NAMENAMENAMENAMENAME',route.params.name)
// console.log('TimeTime',moment(route.params.time).fromNow())
// console.log('currentCarrrrd',route.params.post.subposts)

async function savePicture(tag) {
  // if (Platform.OS === "android" && !(await hasAndroidPermission())) {
  //   return;
  // }
  // console.log(finalImages[0])
  await CameraRoll.save(finalImages[0].source.uri)
  alert('Image Saved')
};
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(route.params.index?route.params.index:0);
  const [more, setMore] = useState(false);
  // const images = img || [];
  renderImage = (item) =>{
    return(
      <TouchableOpacity
      key={item.id}
      onPress={() => {
        setImageIndex(index);
        setIsImageViewVisible(true);
      }}>
      <Image
        style={{width, height: 200}}
        source={item.source}
        resizeMode="cover"
      />
    </TouchableOpacity>
    )
  }
async function clickAction(){
  console.log(route.params.post.userId)
  navigation.goBack()
  navigation.navigate('UserProfileDynamic',{userId:route.params.post.userId})

}
  async function onCloseNavigate(){
    setIsImageViewVisible({isImageViewVisible: false})
    navigation.goBack()
  }
  var imagesFormat = [];
  async function setImages(){
    console.log('IMAGESSSSS',route.params.photos)
    var i = 0;
    data.forEach(list=>{
      var newImage  = {
        source: {
          uri:
            list.url,
        },
        id: i,
      };
      imagesFormat.push(newImage)
      i++;
    })
    // console.log('NewDATAUIUIUIUIUI',route.params.post)
    setFinalImages(imagesFormat)
    if(route.params.index){
      setImageIndex(route.params.index);
    }else{
      setImageIndex(0);
    }
  
    setIsImageViewVisible(true);
  }

  useEffect(()=>{
    setImages()
  },[])


  async function clickedDots(){
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Save Photo"],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light'
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          savePicture()
        }
      }
    );
  }


async function showPost(){
  navigation.goBack()
  navigation.navigate("PostSpecificScreensFeed", {
    post: route.params.post,
    naviga:'Market'
  })
}

  return (
    <View style={styles.container}>
      <View>
        {/* {images.map((image, index) => (
          <TouchableOpacity
            key={image.ids}
            onPress={() => {
              setImageIndex(index);
              setIsImageViewVisible(true);
            }}>
            <Image
              style={{width, height: 200}}
              source={image.source}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))} */}
        {/* <FlatList
        data={images}
        horizontal
        renderItem={ ({ item, index }) => (
          <TouchableOpacity
          key={item.id}
          onPress={() => {
            setImageIndex(index);
            setIsImageViewVisible(true);
          }}>
          <Image
            style={{width, height: Dimensions.get('window').height}}
            source={item.source}
            resizeMode="cover"
          />
        </TouchableOpacity>

        )}
        /> */}

      </View>
      <ImageView
        glideAlways
        images={finalImages}
        imageIndex={imageIndex>0?imageIndex:0}
        animationType="fade"
        backgroundColor="#000"
        isVisible={isImageViewVisible}
        renderFooter={(currentImage) => (
        <>
        {
          route.params.showHeader?
          <View style={{bottom:Dimensions.get('window').height-100,position:'absolute'}}>
          <View style={{width: '100%',marginTop:0,backgroundColor:'#000',  opacity: .8,flexDirection:'row', marginBottom: 0,position:'absolute',zIndex:1,height:180,top:-150,width:Dimensions.get('window').width}} >
          <Image source={{ uri: route.params.profilePic }} style={{ height: 30, width: 30,top:120, left: 30,borderRadius:15}}/>
                    <View style={{flexDirection:'column',marginLeft:10}}>
                    <TouchableOpacity onPress={()=>clickAction()}>
                    <Text style={{color:'#fff', fontWeight:'700', left: 25, top: 120,textDecorationLine: 'underline' }}>
                    {route.params.name}
                    </Text>
                    </TouchableOpacity>
                    <Text style={{color:'#fff', fontWeight:'300',left: 25, top: 120 }}>
                    {moment(route.params.time).format('L')}
                    </Text>
                    <TouchableOpacity onPress={()=> clickedDots()}>
                    <Image  source={require("../assets/threedots.png")} style={{height:22,width:15, position:"absolute", top: 90, left: Dimensions.get('window').width-120, }}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={require('../assets/closebtn.png')} style={{height:20,width:20,position:"absolute", top: 90, left: Dimensions.get('window').width-80,}}/>
                    </TouchableOpacity>
                    </View>
                   
          </View>
          
          <View style={{width: '100%',marginTop:0,backgroundColor:'#000',  opacity: 0.8,flexDirection:'row', marginBottom: 0,position:'absolute',zIndex:1,height:1000,top:Dimensions.get('window').height-260,width:Dimensions.get('window').width}} >
          <View style={{marginLeft:10,marginTop:10}}>
                
            {
            
            route.params.content.length>50?
            <Text style={{color:'#fff', fontWeight:'500'}}>
            {route.params.content.substr(0,50)}....
            </Text>
            :
          
            <>
           
           </>
            
            }
          
          {
            route.params.content.length>50 ?
            <Text style={{color:'#fff', fontWeight:'500'}}>
                  <TouchableOpacity
                          onPress={() =>
                           showPost()
                           
                          }
                          style={{}}
                        >
                <Text style={{color:'#fff', fontWeight:'500',}}>{I18n.t("Show more")}</Text>
              </TouchableOpacity>
            </Text>
            :
          <></>
          }
          <View style={{borderColor: "#D7D7D7", borderWidth:0.4,  width:Dimensions.get('window').width, position: "absolute", top: 80}}/>
          
          <View style={{flexDirection:"row", position: "absolute", top: 90}}>
                {/* Comments */}
                        
              <View style={{ flexDirection: 'column' }}>
                        {
                          route.params.post.subposts? 
                       
                          <TouchableOpacity
                          onPress={() =>
                           showPost()
                           
                          }
                          style={{}}
                        >
                        <Image 
                              source={require("../assets/icons/comment1.png")}
                            style={{ height: 25,width: 25,margin: 23,marginTop:6}}
                           
                              />
                        <Text style={{ position: 'absolute', top: 30, left: 33, fontSize: 10, fontWeight: 'bold',color:'#fff' }}>
                          {route.params.post.subposts.length}
                       </Text>
                      </TouchableOpacity>
                        :
                        <TouchableOpacity
                          onPress={() =>
                           showPost()
                           
                          }
                          style={{ }}
                        >
                         
                        <Text style={{ color: "#6FA4E9", paddingLeft: 10,fontSize:12 }}>
                          {route.params.post.subposts.length} 
                       </Text>
          
                      </TouchableOpacity>
                        }
                        </View>
          
          
                {/* Phone call */}
              <View style={{flexDirection: 'column'}}>
                

                <TouchableOpacity
                  onPress={() =>
                    showPost()
                    
                  }
                  style={{  }}
                >
                  <Image
                    
                      source={require("../assets/icons/call1.png")}
                  
                      style={{ height: 25,width: 25,margin: 23,marginTop:6, marginLeft:50}}
                  ></Image>
                    <Text style={{ position: 'absolute', top: 30, left: 52, fontSize: 10, fontWeight: 'bold',color:'#fff' }}>Call</Text> 

                </TouchableOpacity>
                
              </View>
                

                {/* Chat */}
              <View style={{flexDirection: 'column', justifyContent:'space-between'}}>

                {
                  route.params.post.subposts.chat?
                  
                  <TouchableOpacity
                  onPress={() =>
                    showPost()
                    
                  }
                  style={{ }}
                >
                  <Image
                    source={require("../assets/icons/chat1.png")}

                    style={{ height: 25,width: 25,margin: 23,marginTop:6, marginLeft: 50}}
                  
                  ></Image>
                  <Text style={{ position: 'absolute', top: 30, left: 45, fontSize: 10, fontWeight: 'bold',color:'#fff' }}>Chat</Text> 

                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={() =>
                    showPost()
                    
                  }
                  style={{ backgroundColor:'#000' }}
                >
                <Image
                      source={require("../assets/icons/chatdisable1.png")}
                      // source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.39_PM_upsvxi.png' }}
                      style={{ height: 25,width: 25,margin: 23,marginTop:6, marginLeft:50}}
                ></Image>
                    <Text style={{ position: 'absolute', top: 30, left: 48, fontSize: 10, fontWeight: 'bold',color:'#fff' }}>Chat</Text> 

                </TouchableOpacity>
                  
                }

                </View>
                
            
                {/* WhatsApp Share */}
              <View style={{flexDirection: 'column'}}>
          
                     <TouchableOpacity
                          onPress={() =>
                           showPost()
                           
                          }
                          style={{  }}
                        >
                        <View style={{flexDirection:'row'}}>
                       
                         <Image
                              source={require("../assets/icons/whatsapp1.png")}
                              // source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.39_PM_upsvxi.png' }}
                              style={{ height: 25,width: 25,margin: 23,marginTop:6, marginLeft:50}}
                        ></Image>
                             {
                          route.params.post.subposts.myshares && route.params.post.subposts.myshares.length>0 ?
                           <Text style={{ position: 'absolute', top: 30, left: 60, fontSize: 10, fontWeight: 'bold',color:'#fff' }}>{route.params.post.subposts.myshares[0].shares}</Text> :
                           <Text style={{ position: 'absolute', top: 30, left: 60, fontSize: 10, fontWeight: 'bold',color:'#fff' }}>0</Text>
                          }
                          </View>
                        </TouchableOpacity>
                     </View >
                       
          
              </View>
          
          </View>    
          </View>
          
                   </View>
    :
    <></>          
        }
           
       </>  
         )}
        onClose={() =>  
          onCloseNavigate()}
        onImageChange={index => {
          console.log(index);
        }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    height: 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});




// import React, { useState } from "react";
// import {
//   Alert,
//   Platform,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import get from "lodash/get";
// import memoize from "lodash/memoize";



// export default function App() {
//   const [currentImageIndex, setImageIndex] = useState(0);
//   const [images, setImages] = useState(architecture);
//   const [isVisible, setIsVisible] = useState(false);

//   const onSelect = (images, index) => {
//     setImageIndex(index);
//     setImages(images);
//     setIsVisible(true);
//   };

//   const onRequestClose = () => setIsVisible(false);
//   const getImageSource = memoize((images): ImageSource[] =>
//     images.map((image) =>
//       typeof image.original === "number"
//         ? image.original
//         : { uri: image.original as string }
//     )
//   );
//   const onLongPress = (image) => {
//     Alert.alert("Long Pressed", image.uri);
//   };

//   return (
//     <SafeAreaView style={styles.root}>
//       <ImageList
//         images={travel.map((image) => image.thumbnail)}
//         onPress={(index) => onSelect(travel, index)}
//         shift={0.25}
//       />
//       <ImageList
//         images={architecture.map((image) => image.thumbnail)}
//         onPress={(index) => onSelect(architecture, index)}
//         shift={0.75}
//       />
//       <View style={styles.about}>
//         <Text style={styles.name}>[ react-native-image-viewing ]</Text>
//       </View>
//       <ImageViewing
//         images={getImageSource(images)}
//         imageIndex={currentImageIndex}
//         presentationStyle="overFullScreen"
//         visible={isVisible}
//         onRequestClose={onRequestClose}
//         onLongPress={onLongPress}
//         HeaderComponent={
//           images === travel
//             ? ({ imageIndex }) => {
//                 const title = get(images, `${imageIndex}.title`);
//                 return (
//                   <ImageHeader title={title} onRequestClose={onRequestClose} />
//                 );
//               }
//             : undefined
//         }
//         FooterComponent={({ imageIndex }) => (
//           <ImageFooter imageIndex={imageIndex} imagesCount={images.length} />
//         )}
//       />
//       <ImageList
//         images={food.map((image) => image.thumbnail)}
//         onPress={(index) => onSelect(food, index)}
//         shift={0.5}
//       />
//       <ImageList
//         images={city.map((image) => image.thumbnail)}
//         onPress={(index) => onSelect(city, index)}
//         shift={0.75}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: "#000",
//     ...Platform.select({
//       android: { paddingTop: StatusBar.currentHeight },
//       default: null,
//     }),
//   },
//   about: {
//     flex: 1,
//     marginTop: -12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   name: {
//     textAlign: "center",
//     fontSize: 24,
//     fontWeight: "200",
//     color: "#FFFFFFEE",
//   },
// });