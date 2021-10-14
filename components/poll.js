import React , {useEffect, useState}from "react";
import { View, Text, StatusBar, Dimensions, SafeAreaView ,Image, TouchableOpacity,ActivityIndicator,StyleSheet } from "react-native";
import RNPoll, { IChoice } from "react-native-poll";
import RNAnimated from "react-native-animated-component";
const { width: ScreenWidth } = Dimensions.get("window");
import moment from "moment";
import I18n from '../src/i18n';
import axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage";
const GLOBAL = require('../Globals');


const Poll =(props)=> {

  var [options,setOptions] = useState([
    { id: 1, choice: "messi", votes: 17 },
    { id: 2, choice: "ronaldo", votes: 7 },
    { id: 3, choice: "neymar", votes: 1 },
    { id: 4, choice: "suarez", votes: 5 },
  ])


  async function voteNow(selectedChoice){
    console.log(selectedChoice)
    var jwt = await AsyncStorage.getItem('token')
    setTotvote(totVote+1)
    axios.post(GLOBAL.BASE_URL+"showtime/post/pollPost", {
      optionId: selectedChoice.id,
      postId:props.item._id
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          'Bearer ' + jwt
    }
  }).then((resp)=>{
console.log(resp)
  }).catch((err)=>{
    console.log(err)
  })
  }
  async function setPollOptions (){
   alert( props.item.Ivoted)
    var i =1;
    var newOptions = [];
    props.item.pollOptions.forEach(list=>{
      console.log(list)
      var a = { id: list._id, choice: list.option, votes: list.votes.length };
      newOptions.push(a)
      i++;
    })

    setOptions(newOptions)
  }

useEffect(()=>{
  setPollOptions()
},[])

  
  var votess = options.reduce(function(a, b){
    return a = a+b.votes;
  },0);
    const [totVote , setTotvote] = useState(props.item.votes.length)
    console.log(props.votess)

    async function renderImageLoader() {
      return (
        <ActivityIndicator />
      )
    }
  return (


    <>
      
      <SafeAreaView style={{ flex: 1, alignItems: "center" , backgroundColor:"#fff" }}>
        <View style={{margin:20 ,backgroundColor : "#fff" , borderRadius:10}}>
          <View style={{flexDirection: "row" , marginHorizontal:5 , backgroundColor:"white" , marginBottom:0}}>
          <Image
                                  source={{ uri: props.item.uservisibility.profilePic }}
                                  style={{
                                    height: 55,
                                    width: 55,
                                    paddingLeft: 0,
                                    borderRadius: 30,
                                  }}
                                  placeholderStyle={{ backgroundColor: '#fff' }}
                                  PlaceholderContent={renderImageLoader}
                                />

            {/* <View  style={{flexDirection:"column" , margin:15 , backgroundColor:"white"}}>
               <Text style={{fontSize:17 , paddingBottom:1 , paddingTop:0}}>jithu</Text>  
               <Text style={{fontSize:17 ,color:"grey" }}>two hours ago</Text>
               <Text style={{fontSize:17 , color:"grey" }}>reviews</Text>
            </View> */}
             <View
         style={{
           flex: 20,
           paddingLeft: 10,
           paddingTop: 0,
           fontSize: 20,
         }}
       >
         <TouchableOpacity onPress={() =>
           // clickAction(item)
           navigation.navigate('UserProfileDynamic', { userId: props.item.userId })
           // console.log("currenttttttttt",currentCard)
         }>
           <View style={{ flexDirection: 'row' }}>
             <Text style={{ fontWeight: "bold", fontSize: 16, color: '#6FA4E9' }}>
               {props.item.uservisibility.name.charAt(0).toUpperCase() + props.item.uservisibility.name.slice(1)}
             </Text>
             {
               props.item.isVerified ?
                 <>
                   <Image source={require('../assets/icons/account_verified.png')} style={{ height: 15, width: 15, marginTop: 3, marginLeft: 3 }} />
                 </>
                 :
                 <></>
             }
           </View>
         </TouchableOpacity>
         <Text style={{ marginTop: 0, fontSize: 10, color: '#989898' }}>
           {/* {moment(item.createdAt).fromNow()} */}
           {moment(props.item.createdAt).fromNow()}
         </Text>

         <View style={{ flexDirection: 'row' }}>
           <View style={{ position: 'absolute', top: 5 }}>
             <View style={{ flexDirection: 'row' }}>

               
                 <View>
                   <Text style={{ color: "#989898", fontSize: 10 }}>
                     <Image
                       source={require("../assets/icons/eye.png")}
                       style={{ height: 5, width: 18, marginLeft: 2, marginTop: 3 }} placeholderStyle={{ backgroundColor: '#fff' }}
                       PlaceholderContent={renderImageLoader} />
                     {props.item.viewedUsers && props.item.viewedUsers.length} {I18n.t("views")} </Text>
                 </View>

{
props.item.uservisibility.location ?

               <TouchableOpacity
                 onPress={() =>
                   selectedPostMap(props.item, 'within')
                 }


               >
                 {
                   props.item.distance && props.item.distance != undefined ?
                   props.item.distance && props.item.distance.toFixed(2) < 1000 ?
                       <View style={{ flexDirection: 'row' }}>
                         <Image
                           source={require('../assets/bottomCard/distance.png')}
                           style={styles.map} placeholderStyle={{ backgroundColor: '#fff' }}
                           PlaceholderContent={renderImageLoader}
                         ></Image>
                         <Text style={{ fontSize: 10, marginTop: 3, color: '#6FA4E9' }}>{props.item.distance.toFixed(0)} m</Text></View> :
                       <View style={{ flexDirection: 'row' }}>
                         <Image
                           source={require('../assets/bottomCard/distance.png')}
                           style={styles.map} placeholderStyle={{ backgroundColor: '#fff' }}
                           PlaceholderContent={renderImageLoader}
                         ></Image>
                         <Text style={{ fontSize: 12, marginTop: 3, color: '#6FA4E9' }}>{(props.item.distance / 1000).toFixed(1)} Km</Text></View>
                     : <></>
                 }
               </TouchableOpacity>
               :
               <></>
}
             </View>


           </View>
         </View>
       </View>
            <TouchableOpacity>
            <Image
       style={{width: 36, height: 0 , transform: [{ rotate: '90deg'}] , left:100 , marginTop:0 }}
        source={require('../assets/horizontaldots.png')}
      />
            </TouchableOpacity>
            
          </View>
          <View style={{marginHorizontal:5 , backgroundColor:"white"}}>
          <Text style={{marginTop:15,fontSize: 16 , paddingHorizontal:0}}>{props.item.pollQuestion}</Text>
          <Text style={{marginTop:0,fontSize: 12 ,color:'#D7D7D7', paddingHorizontal:0}}>{props.item.content}</Text>
          <View
            style={{
              width: ScreenWidth * 0.9, margin:0 , marginBottom :10
            }}
          >
            <RNPoll
              
              style={{paddingTop:-80,marginTop:-20 }}
              choiceTextStyle={{padding:0}}
              totalVotes={totVote}
              animationDuration={200}
              hasBeenVoted={props.item.Ivoted?true:false}
              fillBackgroundColor="#6FA4E9"
              borderRadius={30}
              choices={options}
              PollContainer={RNAnimated}
              PollItemContainer={RNAnimated }
              choiceTextStyle={{
                fontSize: 18, color:"black"
              }}
              onChoicePress={(selectedChoice) =>
                voteNow(selectedChoice)
              }
            />
            </View>
          </View>

          <View style={{flexDirection:"row" , margin:5}}>
            <View style={{flex:1}}>
            <Text style={{color:"#000" , marginLeft:0 ,fontWeight:'600', width:"46%"}}>total votes :<Text style={{color:"grey"}}>{totVote}</Text> </Text>
            <Text style={{color:"#000",fontWeight:'600',marginTop:10,fontSize:10}}>poll expires on :<Text style={{color:"grey"}}>{moment(props.item.poll_expires_on).format('LTS')}</Text> </Text>
            </View>
      
          </View>
          <View style={{ backgroundColor: "#fff", height: "auto" }}>
                        <View style={{ flexDirection: "row", marginTop: 0 }}>

                        </View>

                        <View
                          style={{
                            marginTop: 5,
                            marginLeft: 10,
                            width: '95%',
                            marginRight: 0,
                            borderBottomColor: "#f2f2f2",
                            borderBottomWidth: 1,
                          }}
                        />
                        {/* icon starts */}
                        <View
                          style={{ flex: 0, flexDirection: "row", magin: 0, justifyContent: 'center', justifyContent: 'space-between' }}

                        >
                          {/* likes */}
                          <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity
                              onPress={() => onLike(index, 'within')}
                            >

                              {
                                liked ?
                                  <Image
                                    source={require('../assets/bottomCard/liked.png')}

                                    style={{ height: 25, width: 25, margin: 23, marginTop: 7 }}
                                    PlaceholderContent={<ActivityIndicator />} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}></Image>
                                  :
                                  <Image
                                    source={require('../assets/bottomCard/disliked.png')}
                                    style={{ height: 25, width: 25, margin: 23, marginTop: 7 }}
                                    placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}></Image>
                              }

                              <Text style={{ position: 'absolute', top: 33, left: 31, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{currentCard.likes && currentCard.likes.length}</Text>


                            </TouchableOpacity>

                          </View>

                          {/* Comments */}

                          <View style={{ flexDirection: 'column' }}>
                            {
                              props.item.commentsc?
                              <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: props.item,
                                      naviga: 'Market',
                                      IncreaseCountOnComment:IncreaseCountOnComment
                                    })

                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  <Image
                                    source={require("../assets/icons/comment.png")}
                                    style={{ height: 27, width: 27, margin: 23, marginTop: 6 }}
                                    placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}
                                  />
                                  <Text style={{ position: 'absolute', top: 33, left: 32, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>
                                    {commentsCount}
                                  </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("PostSpecificScreensFeed", {
                                      post: props.item,
                                      naviga: 'Market'
                                      ,IncreaseCountOnComment:IncreaseCountOnComment
                                    })

                                  }
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  <Image
                                    source={require("../assets/icons/comment.png")}
                                    style={{ height: 27, width: 27, margin: 23, marginTop: 6 }}
                                    placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}
                                  />
                                  <Text style={{ position: 'absolute', top: 33, left: 32, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>
                                    0
                                  </Text>
                                </TouchableOpacity>
                            }

                                
                            
                          </View>


                          {/* Phone call */}
                          <View style={{ flexDirection: 'column' }}>


                            <TouchableOpacity onPress={() => { makeCalls(props.item) }}>
                              <Image

                                source={require("../assets/icons/call.png")}

                                style={{ height: 23, width: 23, margin: 23, marginTop: 9 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                PlaceholderContent={renderImageLoader}
                              ></Image>
                              <Text style={{ position: 'absolute', top: 33, left: 25, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{I18n.t("Call")}</Text>

                            </TouchableOpacity>

                          </View>


                          {/* Chat */}
                          <View style={{ flexDirection: 'column' }}>

                            {
                              props.item.uservisibility.chat ?

                                <TouchableOpacity onPress={() => clickedChat(props.item)}>
                                  <Image
                                    source={require("../assets/icons/chat.png")}

                                    style={{ height: 23, width: 23, margin: 23, marginTop: 9, marginLeft: 30 }}
                                    placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}
                                  ></Image>
                                  <Text style={{ position: 'absolute', top: 33, left: 33, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{I18n.t("Chat")}</Text>

                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => refRBSheetss.current.open()}>
                                  <Image
                                    source={require("../assets/icons/chatdisable.png")}
                                    // source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1622044953/Screenshot_2021-05-26_at_9.31.39_PM_upsvxi.png' }}
                                    style={{ height: 23, width: 23, margin: 23, marginTop: 9 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                    PlaceholderContent={renderImageLoader}
                                  ></Image>
                                  <Text style={{ position: 'absolute', top: 33, left: 23, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{I18n.t("Chat")}</Text>

                                </TouchableOpacity>

                            }

                          </View>


                          {/* WhatsApp Share */}
                          <View style={{ flexDirection: 'column' }}>

                            <TouchableOpacity onPress={() => WhatsAppShare(props.item)}>
                              <View style={{ flexDirection: 'row' }}>
                                <Image
                                  source={{ uri: 'https://res.cloudinary.com/djejqfi6y/image/upload/v1620142908/Screenshot_2021-05-04_at_9.11.05_PM_tjc2jf.png' }}
                                  style={{ height: 25, width: 25, margin: 23, marginTop: 9 }} placeholderStyle={{ backgroundColor: '#fff' }}
                                  PlaceholderContent={renderImageLoader}
                                ></Image>
                               {
                                  props.item.myshares[0] && props.item.myshares.length > 0 ?
                                    <Text style={{ position: 'absolute', top: 32, left: 30, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>{props.item.myshares && props.item.myshares[0].shares}</Text> :
                                    <Text style={{ position: 'absolute', top: 32, left: 30, fontSize: 10, fontWeight: 'bold', color: '#6FA4E9' }}>0</Text>
                                }
                              </View>
                            </TouchableOpacity>
                          </View >

                        </View>

                      </View>
        </View>
      </SafeAreaView>
    </>
 
 
 
 );
}


const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 16
  },
  centeredView: {
    flex: 1,
    // justifyContent:'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
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
    height: 30,
    width: 30,
    margin: 23,
  },
  map: {
    height: 25,
    width: 25,
    marginTop: -5

  },
  distance: {
    height: 25,
    width: 25,
    marginTop: 5
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
    elevation: 0,
    marginTop: 0,
    height: 'auto'
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
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
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
  video: {
    backgroundColor: '#000',
    justifyContent: 'center',
    marginTop: 140,
    width: 360,
    height: 250,
    resizeMode: "contain"
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#ffff',
    borderRadius: 4,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#6FA4E9',
    alignItems: 'center',
  },
  btnText: {
    color: '#6FA4E9',
    fontSize: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  imagess: {
    resizeMode: "contain",
    height: 180,
    marginTop:10,
    justifyContent: "center"
  }



});
export default Poll;