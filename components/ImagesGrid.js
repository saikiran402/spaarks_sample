import React from 'react';

import { Text, Header } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

import { MaterialIcons } from '@expo/vector-icons';
import { View,TouchableOpacity,ActivityIndicator} from 'react-native';
import { Image } from 'react-native-elements';
import { Dimensions } from 'react-native';
import { Thumbnail } from 'react-native-thumbnail-video';
import ImageOverlay from "react-native-image-overlay";
import I18n from 'i18n-js';



const ImagesGrid = ({ images,overlay, navigation, video,photos,content,name,profilePic,time,post }) => {
const place=[require('../assets/placeholders/1.jpg')]

const ImagePlaceHolder = () =>{
    return(
        <Image source={place[0]} style={{height:'100%',width:'100%'}}/>
    )
}
    async function playVideo() {
        // alert('Hi')
        navigation.navigate('VideoPlayer', { video: video[0] })
    }
    return (
        // <Header style={{backgroundColor:"#63CDFF"}}
        // leftComponent={ <AntDesign name="bars" size={24} color="black" />}
        // centerComponent={{ text: 'Spaarks', style: { color: '#fff',fontSize:30 } }}
        // rightComponent={{ icon: 'home', color: '#fff' }}
        <>
            {
                images.length == 4 ?
                    <>
                        {
                            video.length > 0 ?
                                <>
                                    {/* <Image key={Math.random()}  PlaceholderContent={<ActivityIndicator />}source={{ uri: images[0] }} style={{ height: 250, width: Dimensions.get('window').width }} /> */}
                                    <View>
                                    {
                                        overlay[0].showOverlay?
                                        <>
                                                                                         <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:0 }) }}>

                                        <View style={{position:'absolute',zIndex:1,top:10,left:10,zIndex:1,top:20,left:10,justifyContent:'center',alignItems:'center'}}>
                                                        
                                        <Image key={2}  PlaceholderContent={<ActivityIndicator />}source={{uri:'https://lolfilter.com/files/thumbnails/455062882178828.png'}} style={{height:30,width:30,justifyContent:'center'}}/>
                                        <Text style={{color:'#fff',fontSize:16,textAlign:'center',padding:0,top:25,left:-5}}>This photo contains sensitive content which some people may find offensive or disturbing</Text>
                                        </View>
                                        <Image key={"1sss"} blurRadius={15} PlaceholderContent={<ActivityIndicator />}source={{ uri: images[0] }} style={{ height: 250, width: Dimensions.get('window').width }} />
                                       </TouchableOpacity>
                                        </>
                                        :
                                        <>
                                                                                         <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:0 }) }}>

                                        <Image key={"1sss"} PlaceholderContent={<ActivityIndicator />}source={{ uri: images[0] }} style={{ height: 250, width: Dimensions.get('window').width }} />
                                    </TouchableOpacity>
                                        </>
                                    }


                                    </View>
                                    <View style={{ flexDirection: 'row', padding: 0 }}>

                                        {
                                            images.slice(1, 3).map((list, i) =>
                                                <>
                                                         <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:i+1 }) }}>

                                                    {
                                                        i == 1 ?
                                                            <View style={{ paddingTop: 3, paddingRight: 3 }}>
                                                           


                                                           
                                                                <ImageOverlay source={{ uri: list }} cache={"force-cache"} containerStyle={{ height: 125, width: Dimensions.get('window').width / 3 }} title={"+1"} />
                                                                {/* <Image  PlaceholderContent={<ActivityIndicator />}source={{ uri: list }} cache={"force-cache"}  /> */}
                                                            </View>
                                                            :
                                                            <View style={{ paddingTop: 3, paddingRight: 3 }}>
                                                               {
                                                            overlay[i+1].showOverlay?
                                                            <>
                                                            <View style={{position:'absolute',zIndex:1,top:10,left:10,zIndex:1,top:0,left:10,justifyContent:'center',alignItems:'center'}}>
                                                             <Image key={i}  PlaceholderContent={<ActivityIndicator />}source={{uri:'https://lolfilter.com/files/thumbnails/455062882178828.png'}} style={{height:30,width:30,justifyContent:'center',marginTop:10}}/>
                                                             <Text style={{color:'#fff',fontSize:10,textAlign:'center',padding:0,top:25,left:-5}}>This photo contains sensitive content which some people may find offensive or disturbing</Text>
                                                             </View>
                                                             <Image key={i}  PlaceholderContent={<ActivityIndicator />}source={{ uri: list }} blurRadius={15} cache={"force-cache"} style={{ height: 125, width: Dimensions.get('window').width / 3 }} />
                                                             
                                                            </>
                                                            :
                                                            <Image key={i}  PlaceholderContent={<ActivityIndicator />}source={{ uri: list }} cache={"force-cache"} style={{ height: 125, width: Dimensions.get('window').width / 3 }} />

                                                    }
                                                               
                                                            </View>
                                                    }
</TouchableOpacity>

                                                </>
                                            )
                                        }
                                        {/* <TouchableOpacity onPress={()=>playVideo(navigation)}> */}
                                        <TouchableOpacity onPress={playVideo}>
                                    <View style={{ paddingLeft: 0, paddingBottom: 3,paddingTop:3 }}>
        
                                          <Image key={"3sss"} PlaceholderContent={<ActivityIndicator />}source={{uri:'https://www.pngkit.com/png/full/267-2678423_bacteria-video-thumbnail-default.png'}} style={{ height: 125, width: Dimensions.get('window').width / 3}}  />
                                 </View>
                                    </TouchableOpacity>
                                        {/* </TouchableOpacity> */}

                                    </View>
                                </>
                                :
                                <>
                                <View>
                                    {
                                        overlay[0].showOverlay?
                                        <>
                                                                                         <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:0 }) }}>

                                        <View style={{position:'absolute',zIndex:1,top:10,left:10,zIndex:1,top:20,left:10,justifyContent:'center',alignItems:'center'}}>
                                                        
                                        <Image key={2}  PlaceholderContent={<ActivityIndicator />}source={{uri:'https://lolfilter.com/files/thumbnails/455062882178828.png'}} style={{height:30,width:30,justifyContent:'center'}}/>
                                        <Text style={{color:'#fff',fontSize:16,textAlign:'center',padding:0,top:25,left:-5}}>This photo contains sensitive content which some people may find offensive or disturbing</Text>
                                        </View>
                                        <Image key={"4sss"} blurRadius={15} PlaceholderContent={<ActivityIndicator />}source={{ uri: images[0] }} style={{ height: 250, width: Dimensions.get('window').width }} />
                                      </TouchableOpacity>
                                        </>
                                        :
                                        <>
                                                 <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:0 }) }}>

                                        <Image key={"4sss"} PlaceholderContent={<ActivityIndicator />}source={{ uri: images[0] }} style={{ height: 250, width: Dimensions.get('window').width }} />
                                  </TouchableOpacity>
                                   </>
                                    }


                                    </View>
                                    <View style={{ flexDirection: 'row', padding: 0 }}>

                                        {
                                            images.slice(1).map((list, i) =>
                                            <>
         <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:i+1 }) }}>

                                                <View style={{ paddingTop: 3, paddingRight: 3 }}>
                                                    {
                                                            overlay[i+1].showOverlay?
                                                            <>
                                                            <View style={{position:'absolute',zIndex:1,top:10,left:10,zIndex:1,top:0,left:10,justifyContent:'center',alignItems:'center'}}>
                                                             <Image key={i}  PlaceholderContent={<ActivityIndicator />}source={{uri:'https://lolfilter.com/files/thumbnails/455062882178828.png'}} style={{height:30,width:30,marginTop:10}}/>
                                                             <Text style={{color:'#fff',fontSize:10,textAlign:'center',padding:0,top:25,left:-5}}>This photo contains sensitive content which some people may find offensive or disturbing</Text>
                                                             </View>
                                                             <Image key={i}  PlaceholderContent={<ActivityIndicator />}source={{ uri: list }} blurRadius={15} cache={"force-cache"} style={{ height: 125, width: Dimensions.get('window').width / 3 }} />
                                                             
                                                            </>
                                                            :
                                                            <Image key={i}  PlaceholderContent={<ActivityIndicator />}source={{ uri: list }} cache={"force-cache"} style={{ height: 125, width: Dimensions.get('window').width / 3 }} />

                                                    }
                                                   
                                                </View>
                                                </TouchableOpacity>
                                                </>
                                            )
                                        }
                                    </View>
                                </>

                        }


                    </>
                    :
                    images.length == 3 ?
                        <>
                            {
                                video.length > 0 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ paddingBottom:5,flexDirection:'column' }}>
                                            <View>
                                            {
                                                    overlay[0].showOverlay?
                                                   <>
                                                                                                                                                                                                        <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:0 }) }}>

                                                    <View style={{position:'absolute',zIndex:1,top:10,left:10,zIndex:1,top:20,left:10}}>
                                                        
                                                                <Image key={2}  PlaceholderContent={<ActivityIndicator />}source={{uri:'https://lolfilter.com/files/thumbnails/455062882178828.png'}} style={{height:30,width:30,justifyContent:'center',left:75}}/>
                                                                <Text style={{color:'#fff',fontSize:10,textAlign:'center',padding:0,top:25,left:-5}}>This photo contains sensitive content which some people may find offensive or disturbing</Text>
                                                                </View>
                                                    <Image key={"11sss"}  PlaceholderContent={<ActivityIndicator />}source={{ uri: images[0] }} blurRadius={15} style={{ height: 125, width: Dimensions.get('window').width / 2 }} />
                                                   </TouchableOpacity>
                                                    </>
                                                    :
                                                    <>
                                                                                                                                                                                                         <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:0 }) }}>

                                                    <Image key={"11sss"}  PlaceholderContent={<ActivityIndicator />}source={{ uri: images[0] }} style={{ height: 125, width: Dimensions.get('window').width / 2 }} />
                                           </TouchableOpacity>
                                            </>
                                            }
                                            </View>
                                            
                                            <View style={{paddingTop:3}}>
                                            {
                                                    overlay[1].showOverlay?
                                                    <>
                                                                                                                                                                                                         <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:1 }) }}>

                                                     <View style={{position:'absolute',zIndex:1,top:10,left:10,zIndex:1,top:20,left:10}}>
                                                        
                                                        <Image key={2}  PlaceholderContent={<ActivityIndicator />}source={{uri:'https://lolfilter.com/files/thumbnails/455062882178828.png'}} style={{height:30,width:30,justifyContent:'center',left:75}}/>
                                                        <Text style={{color:'#fff',fontSize:10,textAlign:'center',padding:0,top:25,left:-5}}>This photo contains sensitive content which some people may find offensive or disturbing</Text>
                                                        </View>
                                                    <Image key={"12sss"}  PlaceholderContent={<ActivityIndicator />}source={{ uri: images[1] }} blurRadius={15} style={{ height: 125, width: Dimensions.get('window').width / 2 }} />
                                                   </TouchableOpacity>
                                                    </>
                                                    :
                                                    <>
                                                                                                                                                                                                         <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:1 }) }}>

                                                    <Image key={"12sss"}  PlaceholderContent={<ActivityIndicator />}source={{ uri: images[1] }} style={{ height: 125, width: Dimensions.get('window').width / 2 }} />
                                         </TouchableOpacity>
                                           </>
                                            }
                                            </View>
                                           
                                        </View>
                                        <View>
                                            <View style={{ flexDirection: 'column' }}>

                                                {
                                                    images.slice(1,2).map((list, i) =>
                                                    <>
                                                    {/* <Text>{i}</Text> */}
                                                    {
                                                             i == 0 ?
                                                             <View style={{paddingLeft:3,paddingBottom:3}}>
                                                             {
                                                                     overlay[2].showOverlay?
                                                                     <>
                                                                      <View style={{position:'absolute',zIndex:1,top:10,left:10,zIndex:1,top:20,left:10}}>
                                                        
                                                        <Image key={2}  PlaceholderContent={<ActivityIndicator />}source={{uri:'https://lolfilter.com/files/thumbnails/455062882178828.png'}} style={{height:30,width:30,justifyContent:'center',left:75}}/>
                                                        <Text style={{color:'#fff',fontSize:10,textAlign:'center',padding:0,top:25,left:-5}}>This photo contains sensitive content which some people may find offensive or disturbing</Text>
                                                        </View>
                                                                     <Image key={"13sss"}  PlaceholderContent={<ActivityIndicator />}source={{ uri: images[2] }} blurRadius={15} style={{ height: 125, width: Dimensions.get('window').width / 2 }} />
                                                                     
                                                                     </>:
                                                                     <Image key={"13sss"}  PlaceholderContent={<ActivityIndicator />}source={{ uri: images[2] }} style={{ height: 125, width: Dimensions.get('window').width / 2 }} />
                                                             }
                                                             </View>

                                                             :
                                                             <View style={{ paddingLeft: 3, paddingBottom: 3 }}>
                                                             
                                                             {
                                                                overlay[2].showOverlay?
                                                               <>
                                                               <View style={{position:'absolute',zIndex:1,top:10,left:10,zIndex:1,top:20,left:10}}>
                                                                <Image key={2}  PlaceholderContent={<ActivityIndicator />}source={{uri:'https://lolfilter.com/files/thumbnails/455062882178828.png'}} style={{height:30,width:30,justifyContent:'center',left:75}}/>
                                                                <Text style={{color:'#fff',fontSize:10,textAlign:'center',padding:0,top:25,left:-5}}>This photo contains sensitive content which some people may find offensive or disturbing</Text>
                                                                </View>
                                                                
                                                                <Image key={i} PlaceholderContent={<ActivityIndicator />}source={{ uri: list }} blurRadius={15} cache={"force-cache"} style={{ height: 125, width: Dimensions.get('window').width / 2 }} />
                                                               </>
                                                                :
                                                                <>
                                                            
                                                            <Image key={i} PlaceholderContent={<ActivityIndicator />}source={{ uri: list }} cache={"force-cache"} style={{ height: 125, width: Dimensions.get('window').width / 2 }} />
                                                                </>
                                                            }
                                                            
                                                         </View>


                                                    }
                                                       
                                                    </>
                                                    )
                                                }
                                            </View>
                                            <TouchableOpacity onPress={playVideo}>
                                    <View style={{ paddingLeft: 3, paddingBottom: 0,paddingTop:0 }}>
        
                                          <Image key={"15sss"} PlaceholderContent={<ActivityIndicator />}source={{uri:'https://www.pngkit.com/png/full/267-2678423_bacteria-video-thumbnail-default.png'}} style={{ height: 125, width: Dimensions.get('window').width/2}}  />
                                 </View>
                                    </TouchableOpacity>
                                        </View>
                                      

                                    </View>
                                    :
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{  paddingRight:3 }}>
                                        
{
                                                            overlay[0].showOverlay?
                                                            <>
                                                                                                                                                     <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:0 }) }}>

                                                           <View style={{position:'absolute',zIndex:1,top:10,left:10,zIndex:1,top:20,left:10}}>
                                                             <Image key={0} PlaceholderContent={<ActivityIndicator />}source={{uri:'https://lolfilter.com/files/thumbnails/455062882178828.png'}} style={{height:35,width:35,justifyContent:'center',left:75,marginTop:50}}/>
                                                             <Text style={{color:'#fff',fontSize:10,textAlign:'center',padding:0,top:25,left:-5}}>This photo contains sensitive content which some people may find offensive or disturbing</Text>
                                                             </View>
                                                             <Image key={"0sss"} PlaceholderContent={<ActivityIndicator />}source={{ uri: images[0] }} blurRadius={15} style={{ height: 250, width: Dimensions.get('window').width / 2 }} />
                                                             </TouchableOpacity>
                                                            </>
                                                            :
                                                            <>
                                                                                                                                                     <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:0 }) }}>

                                                            <Image key={"0sss"} PlaceholderContent={<ActivityIndicator />}source={{ uri: images[0] }} style={{ height: 255, width: Dimensions.get('window').width / 2,top:3,paddingRight:3 }} />
</TouchableOpacity>
</>
                                                    }
                                           
                                        </View>
                                        <View style={{flexDirection:'column'}}>
                                         {
                                                images.slice(1).map((list, i) =>
                                                <View style={{ paddingTop: 3 }}>
                                                    
                                                    {
                                                            overlay[i].showOverlay?
                                                            <>
                                                                                                                                                                                                                 <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:i+1 }) }}>

                                                            <View style={{position:'absolute',zIndex:1,top:10,left:10,zIndex:1,top:20,left:1,paddingLeft:3}}>
                                                             <Image key={i} PlaceholderContent={<ActivityIndicator />}source={{uri:'https://lolfilter.com/files/thumbnails/455062882178828.png'}} style={{height:30,width:30,justifyContent:'center',left:75}}/>
                                                             <Text style={{color:'#fff',fontSize:10,textAlign:'center',padding:0,top:25,left:-5}}>This photo contains sensitive content which some people may find offensive or disturbing</Text>
                                                             </View>
                                                             <Image key={i} PlaceholderContent={<ActivityIndicator />}source={{ uri: list }} blurRadius={15} cache={"force-cache"} style={{ height: 125, width: Dimensions.get('window').width / 2 }} />
                                                             </TouchableOpacity>
                                                            </>
                                                            :
                                                            <>
                                                                                                                                                                                                                 <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:i+1 }) }}>

                                                            <Image key={i} PlaceholderContent={<ActivityIndicator />}source={{ uri: list }} cache={"force-cache"} style={{ height: 125, width: Dimensions.get('window').width / 2 }} />
</TouchableOpacity>
</>
                                                    }
                                               
                                               
                                            </View>
                                                )
                                         }
                                     
                                    
                                     </View>

                                    </View>
                            }

                        </>
                        :
                        images.length == 2 ?
                            <>
                            {
                                video.length > 0 ?
                                <View style={{ flexDirection: 'row' }}>
                                    {
                                        <>
                                     <View style={{flexDirection:'column'}}>
                                         {
                                                images.map((list, i) =>
                                                <View style={{ paddingTop: 3 }}>
                                                    
                                                    {
                                                            overlay[i].showOverlay?
                                                            <>
                                                                                                                                                                                                                 <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:i+1 }) }}>

                                                            <View style={{position:'absolute',zIndex:1,top:10,left:10,zIndex:1,top:20,left:10}}>
                                                             <Image key={i} PlaceholderContent={<ActivityIndicator />}source={{uri:'https://lolfilter.com/files/thumbnails/455062882178828.png'}} style={{height:30,width:30,justifyContent:'center',left:75}}/>
                                                             <Text style={{color:'#fff',fontSize:10,textAlign:'center',padding:0,top:25,left:-5}}>This photo contains sensitive content which some people may find offensive or disturbing</Text>
                                                             </View>
                                                             <Image key={i} PlaceholderContent={<ActivityIndicator />}source={{ uri: list }} blurRadius={15} cache={"force-cache"} style={{ height: 125, width: Dimensions.get('window').width / 2 }} />
                                                             </TouchableOpacity>
                                                            </>
                                                            :
                                                            <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:i+1 }) }}>

                                                            <Image key={i} PlaceholderContent={<ActivityIndicator />}source={{ uri: list }} cache={"force-cache"} style={{ height: 125, width: Dimensions.get('window').width / 2 }} />
</TouchableOpacity>
                                                    }
                                               
                                               
                                            </View>
                                                )
                                         }
                                     
                                    
                                     </View>
                                           
                                     <TouchableOpacity onPress={playVideo}>
                                    <View style={{ paddingLeft: 2, paddingBottom: 3,paddingTop:3 }}>
        
                                          <Image  PlaceholderContent={<ActivityIndicator />}source={{uri:'https://www.pngkit.com/png/full/267-2678423_bacteria-video-thumbnail-default.png'}}style={{ height: 250, width: Dimensions.get('window').width / 2}}  />
                                 </View>
                                    </TouchableOpacity>
                                     </>   
                                    }

                                </View>
                                :
                                <View style={{ flexDirection: 'row' }}>
                                    {
                                        images.map((list, i) =>
                                            <View style={{ paddingRight: 3 }}>
                                                      {
                                                            overlay[i].showOverlay?
                                                            <>
                                                                                                                                                                                                                 <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:i }) }}>

                                                            <View style={{position:'absolute',zIndex:1,top:10,left:10,zIndex:1,top:20,left:10}}>
                                                             <Image key={i} PlaceholderContent={<ActivityIndicator />}source={{uri:'https://lolfilter.com/files/thumbnails/455062882178828.png'}} style={{height:35,width:35,justifyContent:'center',left:75,marginTop:50}}/>
                                                             <Text style={{color:'#fff',fontSize:10,textAlign:'center',padding:0,top:25,left:-5}}>This photo contains sensitive content which some people may find offensive or disturbing</Text>
                                                             </View>
                                                             <Image key={i} PlaceholderContent={<ActivityIndicator />}source={{ uri: list }} blurRadius={15} cache={"force-cache"} style={{ height: 250, width: Dimensions.get('window').width / 2 }} />
                                                             </TouchableOpacity>
                                                            </>
                                                            :
                                                            <>
                                                                                                                                                                                                                 <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: post.photos, content: post.content, name: post.uservisibility.name, profilePic: post.uservisibility.profilePic, time: post.createdAt, post: post, showHeader: true,index:i }) }}>

                                                            <Image key={i} PlaceholderContent={<ActivityIndicator />}source={{ uri: list }} cache={"force-cache"} style={{ height: 250, width: Dimensions.get('window').width / 2 }} />
                                                        </TouchableOpacity>
                                                        </>
                                                    }
                                                
                                            </View>
                                        )
                                    }

                                </View>
                            }
                            </>
                            :
                            images.length == 1 ?
                                <>
                                {
                                     video.length > 0 ?
                                     <View style={{ flexDirection: 'row' }}>

                                        {
                                            images.map((list, i) =>
                                                <View style={{ paddingRight: 3 }}>
                                                   {
                                                            overlay[i].showOverlay?
                                                            <>
                                                            
                                                            <View style={{position:'absolute',zIndex:1,top:0,left:10,zIndex:1,top:0,left:10}}>
                                                             <Image key={i} PlaceholderContent={<ActivityIndicator />}source={{uri:'https://lolfilter.com/files/thumbnails/455062882178828.png'}} style={{height:30,width:30,justifyContent:'center',left:75}}/>
                                                             <Text style={{color:'#fff',fontSize:10,textAlign:'center',padding:0,top:25,left:-5}}>This photo contains sensitive content which some people may find offensive or disturbing</Text>
                                                             </View>
                                                             <Image key={i} PlaceholderContent={<ActivityIndicator />}source={{ uri: list }} blurRadius={15} cache={"force-cache"} style={{ height: 250, width: Dimensions.get('window').width/2 }} />
                                                             
                                                            </>
                                                            :
                                                            <>
                                                            {/* <Text>Hiii</Text> */}
                                                            <Image key={i} PlaceholderContent={<ActivityIndicator />}source={{ uri: list }} cache={"force-cache"} style={{ height: 250, width: Dimensions.get('window').width/2 }} />
</>
                                                    }
                                                   
                                                </View>
                                            )
                                        }
                                        <TouchableOpacity onPress={playVideo}>
                                    <View style={{ paddingLeft: 2, paddingBottom: 0,paddingTop:0 }}>

                                          <Image key={"8sss"} PlaceholderContent={<ActivityIndicator />}source={{uri:'https://www.pngkit.com/png/full/267-2678423_bacteria-video-thumbnail-default.png'}}style={{ height: 250, width: Dimensions.get('window').width/2,resizeMode:'cover'}}  />
                                 </View>
                                    </TouchableOpacity>

                                    </View>
                                   
                                   :
                                    <View style={{ flexDirection: 'row' }}>

                                        {
                                            // images.map((list, i) =>
                                                <View style={{ paddingRight: 3 }}>
                                                      {/* {
                                                            overlay[0].showOverlay?
                                                            <>
                                                            <View style={{position:'absolute',zIndex:1,top:50,left:10,zIndex:1,top:20,left:10,justifyContent:'center',alignItems:'center'}}>
                                                             <Image key={"1w2e12"} PlaceholderContent={<ActivityIndicator />}source={{uri:'https://lolfilter.com/files/thumbnails/455062882178828.png'}} style={{height:50,width:50,justifyContent:'center',alignItems:'center',marginTop:100}}/>
                                                             <Text style={{color:'#fff',fontSize:15,textAlign:'center',padding:10}}>This photo contains sensitive content which some people may find offensive or disturbing</Text>
                                                             </View>
                                                             <Image key={"1w2e34"} PlaceholderContent={<ActivityIndicator />}source={{ uri: images[0] }} blurRadius={15} cache={"force-cache"} style={{ height: 350, width: Dimensions.get('window').width }} />
                                                             
                                                            </>
                                                            :
                                                            <Image key={"1w2euhuhu"} PlaceholderContent={<ActivityIndicator />}source={{ uri: images[0] }} cache={"force-cache"} style={{ height: 350, width: Dimensions.get('window').width }} />

                                                    } */}
                                                                                                                <Image key={"1w2euhuhu"} PlaceholderContent={<ActivityIndicator />}source={{ uri: images[0] }} cache={"force-cache"} style={{ height: 350, width: Dimensions.get('window').width }} />

                                                    
                                                </View>
                                            // )
                                        }

                                    </View>
                                }
                                    
                                </>
                                :
                                images.length == 0 && video.length > 0 ?
                                <View style={{ flexDirection: 'row',flex:1 }}>
                                    <TouchableOpacity onPress={playVideo}>
                                    <View style={{ paddingLeft: 2, paddingBottom: 3,marginTTop:-20 }}>
                                          <Image key={"9sss"} PlaceholderContent={<ActivityIndicator />}source={{uri:'https://www.pngkit.com/png/full/267-2678423_bacteria-video-thumbnail-default.png'}}style={{ height: 250, width: Dimensions.get('window').width,resizeMode:'center'}}  />
                                 </View>
                                    </TouchableOpacity>
                                
                            </View>
                                :
                                <></>
            }


        </>
    )

}


export default ImagesGrid;