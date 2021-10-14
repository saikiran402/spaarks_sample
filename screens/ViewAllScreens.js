import React, { useEffect, useState, setState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  Pressable,
  StatusBar,
  Modal,
  ScrollView,FlatList
} from "react-native";
import moment from 'moment';


import { Rating, Divider } from "react-native-elements";
import { Chip } from "react-native-paper";
const list = [
    {
      name: 'Amy Farha',
      avatar_url: '../assets/profilepic.png',
      subtitle: 'Vice President',
      index:1
    },
    {
      name: 'Chris Jackson',
      avatar_url: '../assets/profilepic.png',
      subtitle: 'Vice Chairman',
      index:2
    },
    {
      name: 'Amy Farha',
      avatar_url: '../assets/profilepic.png',
      subtitle: 'Vice President',
      index:3
    },
    {
      name: 'Chris Jackson',
      avatar_url: '../assets/profilepic.png',
      subtitle: 'Vice Chairman',
      index:4
    },
    {
      name: 'Amy Farha',
      avatar_url: '../assets/profilepic.png',
      subtitle: 'Vice President',
      index:5
    },
    {
      name: 'Chris Jackson',
      avatar_url: '../assets/profilepic.png',
      subtitle: 'Vice Chairman',
      index:6
    },
    {
      name: 'Amy Farha',
      avatar_url: '../assets/profilepic.png',
      subtitle: 'Vice President',
      index:7
    },
    {
      name: 'Chris Jackson',
      avatar_url: '../assets/profilepic.png',
      subtitle: 'Vice Chairman',
      index:8
    },
    {
        name: 'Amy Farha',
        avatar_url: '../assets/profilepic.png',
        subtitle: 'Vice President',
        index:9
      },
      {
        name: 'Chris Jackson',
        avatar_url: '../assets/profilepic.png',
        subtitle: 'Vice Chairman',
        index:10
      },
      {
        name: 'Amy Farha',
        avatar_url: '../assets/profilepic.png',
        subtitle: 'Vice President',
        index:11
      },
      {
        name: 'Chris Jackson',
        avatar_url: '../assets/profilepic.png',
        subtitle: 'Vice Chairman',
        index:12
      },
      {
        name: 'Chris Jackson',
        avatar_url: '../assets/profilepic.png',
        subtitle: 'Vice Chairman',
        index:13
      },
      {
        name: 'Amy Farha',
        avatar_url: '../assets/profilepic.png',
        subtitle: 'Vice President',
        index:14
      },
      {
        name: 'Chris Jackson',
        avatar_url: '../assets/profilepic.png',
        subtitle: 'Vice Chairman',
        index:15
      },
      {
        name: 'Amy Farha',
        avatar_url: '../assets/profilepic.png',
        subtitle: 'Vice President',
        index:16
      },
      {
        name: 'Chris Jackson',
        avatar_url: '../assets/profilepic.png',
        subtitle: 'Vice Chairman',
        index:17
      },
      {
        name: 'Chris Jackson',
        avatar_url: '../assets/profilepic.png',
        subtitle: 'Vice Chairman',
        index:18
      },
      {
        name: 'Amy Farha',
        avatar_url: '../assets/profilepic.png',
        subtitle: 'Vice President',
        index:19
      },
      {
        name: 'Chris Jackson',
        avatar_url: '../assets/profilepic.png',
        subtitle: 'Vice Chairman',
        index:20
      },
      {
        name: 'Chris Jackson',
        avatar_url: '../assets/profilepic.png',
        subtitle: 'Vice Chairman',
        index:21
      }
  
  ]
const ViewAllScreens = ({navigation,route}) => {

  const [modalVisible, setModalVisible] = useState(false);

  async function chatRequestDetails(){
    setModalVisible(true)
   
  }
  return (
      


    <View style={styles.container}>
<ScrollView>
<Modal
      animationType="slide"
      transparent={true} 
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Chat Request Details</Text>
          <View
                              style={{
                                marginTop: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                borderBottomColor: "black",
                                borderBottomWidth: 0.5,
                                
                              }}
                            />


          <View style={{ justifyContent:'center',alignItems:'center'}}>
                 
            {/* <Image  source={{ uri: route.params.post.uservisibility.profilePic }}
                  style={{height: 90, width: 90}}/> */}
            {/* <Text style={{fontWeight:'bold', fontSize: 18, top: 20}}>{route.params.post.uservisibility.name}</Text> */}
            <Text style={{color:'grey', top: 20}}>
            Based upon your submission of status of your work for the seeker, we would be approaching seeker for the rating of your work .
            </Text>
          </View>
          <Pressable
            style={[styles.button, styles.acceptFriend]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>ACCEPT FRIEND REQUEST</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyleClose}>IGNORE FRIEND REQUEST</Text>
          </Pressable>
         
        </View>
      </View>
    </Modal>
      <View style={{ backgroundColor: "#fff", height: "100%" }}>
        <View style={{ flexDirection: "column" }}>
{
  route.params.viewType == 'sayhii_received'? <>
                  <View>
                            {/* <Text
                            style={{
                                fontWeight: "bold",
                                margin: 20,
                                marginBottom: 5,
                                fontSize: 20,
                            }}
                            >
                            Requests Received
                            </Text> */}
                        </View>
                        {
    route.params.requestReceived.length>0?
<>
             <FlatList
             data={route.params.requestReceived.slice(0,2)}
             renderItem={({ item, i }) => (
               <>
               <View style={{flexDirection:'row',  backgroundColor: "#ffffff" }}>
         <View style={{ margin: 10}}>
      <Image
        source={{uri:item.uservisibility.profilePic}}
        style={{
          height: 80,
          width: 80,
          marginLeft: 0,
          borderRadius: 10,
        }}
      ></Image>
    </View>
             <TouchableOpacity>
                <View style={{ flex: 1, paddingTop: 10 }}>
                  <Text style={{ color: "#000" }}>{item.uservisibility.name}<Text style={{fontSize:10,color:'#7B8794'}}>{" "}{moment(item.createdAt).format('L')}</Text></Text>
                  <View>
                    {
                    item.content?
                  <Text>
                    {item.content}
                  </Text>:
                  <Text style={{fontSize:12,color:'#7B8794', left: 5,top:5}}>
                    No content
                  </Text>
             }

                    <Image source={require('../assets/rightarrow.png')} style={{ height: 25, width: 25, marginLeft: 210}}></Image>
                  </View>
                </View>
                </TouchableOpacity>
                </View> 
                <View
                style={{
                  marginTop: 5,
                  marginLeft: 8,
                  marginRight: 8,
                  borderBottomColor: "#EAEAEA",
                  borderBottomWidth: 0.2,
                }}
              />
               </>
   
             )}
             />
 </>
 :

 <View style={{backgroundColor:'#f2f2f2',justifyContent:'center',alignItems:'center'}}><Text>No Request</Text></View>       
}


  </>:route.params.viewType == 'sayhii_sent'?<>
      

<View
                            style={{
                            backgroundColor: "#fff",
                            margin: 15,
                            marginTop: 0,
                            borderRadius: 10,
                            }}
                        >
                            <View style={{ flexDirection: "row" }}>
                            <View style={{ margin: 10 }}>
                                <Image
                                source={require("../assets/chat.png")}
                                style={{
                                    height: 80,
                                    width: 80,
                                    marginLeft: 0,
                                    borderRadius: 10,
                                }}
                                ></Image>
                            </View>
                            <View style={{ flex: 1, paddingTop: 10 }}>
                                <Text style={{ color: "#7B8794" }}>24 Dec 2020</Text>
                                <Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                </Text>
                                <View style={{ flexDirection: "row", paddingTop: 5 }}>
                                <Chip
                                    style={{
                                    height: 25,
                                    width: 72,
                                    marginLeft: 5,
                                    backgroundColor: "#FF7575",
                                    }}
                                >
                                    <Text style={{ color: "#fff", marginTop: 0, fontSize: 12 }}>
                                    Pending
                                    </Text>
                                </Chip>
                                <View>
                                    <Image
                                    source={require("../assets/icons/delete_request.png")}
                                    style={{
                                        height: 23,
                                        width: 23,
                                        marginLeft: 10,
                                        borderRadius: 10,
                                    }}
                                    ></Image>
                                </View>
                                <Text
                                    style={{
                                    textAlign: "center",
                                    padding: 5,
                                    color: "#323F4B",
                                    }}
                                >
                                    Delete Request
                                </Text>
                                </View>
                            </View>
                            </View>


                        </View>
                
  
  </>:route.params.viewType == 'viewall_images'?<>
  <View>
          <View style={{flexDirection:'column'}}>
              <View>
                {/* <Text style={{fontSize:20,fontWeight:'bold',padding:15}}>{route.params.title}</Text> */}
              </View>
              <View style={{backgroundColor:"#fff",}}>
              <FlatList style={{margin:5}}
        numColumns={4}                  // set number of columns 
        columnWrapperStyle={styles.row}  // space them out evenly
        data={route.params.photos}
        keyExtractor={(item, index) => item.index }
        renderItem={({ item,index }) =>(  <View>
           <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ViewFullScreenImagesScreen', { photos: route.params.photos, showHeader: false,index:index }) }}>
          <Image source={{uri:item.url}} style={{height:90,width:90,margin:3,borderRadius:10}}></Image>
          </TouchableOpacity>
        </View>)}/>  
    

           </View>
          </View>
        </View>



  </>:route.params.viewType == 'viewall_reviews'?<>


  <View>
              {/* <Text style={{ fontSize: 20, fontWeight: "bold", padding: 15 }}>
                Ratings & Reviews
              </Text> */}
            </View>

     
                   <FlatList
                   data={route.params.reviews}
                   keyExtractor={(item, index) => item.subCategoryId}
                   renderItem={({ item }) => (
              <View
                style={{
                  marginTop: 1,
                  backgroundColor: "#fff",
                  marginLeft: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: 310,
                    borderRadius: 8,
                  }}
                >
                  <View
                    style={{
                      flex: 8,
                      backgroundColor: "#fff",
                      borderRadius: 8,
                    }}
                  >
                    <Image
                      source={{ uri: item.profilePic }}
                      style={{
                        height: 100,
                        width: 100,
                        padding: 10,
                        borderRadius: 10,
                        margin: 10,
                      }}
                    ></Image>
                  </View>
                  <View style={{ flex: 15, marginLeft: 20,marginTop:10 }}>
                    <Text
                      h5
                      style={{ fontWeight: "bold", color: "#000",marginLeft:8 }}
                    >
                      {item.name}
                    </Text>
                  
                    <View style={{ flexDirection: "row" }}>
                      <View style={{flexDirection:'row',padding:5}}>
                      <Text style={{ fontWeight: "bold",marginTop:5,marginRight:10 }}>
                        {" "}
                        {item.rating}/5
                      </Text>
                        <Rating
                          fractions="1"
                          ratingColor="#fff"
                          tintColor="#fff"
                          readonly
                          startingValue={item.rating}
                          imageSize={22}
                          style={{
                            marginTop: 0,
                            backgroundColor: "#fff",
                    
                            marginLeft: 0,
                          }}
                        />
                      </View>
                    </View>
                    <Text
                      style={{
                        margin: 10,
                        marginTop: 0,
                        color: "#7B8794",
                        flexShrink: 1,
                      }}
                    >
                      {item.content}
                    </Text>
                  </View>
                </View>
                <Divider style={{ backgroundColor: "#C4C4C4" }} />
              </View>
          
          
          
          )}/>






  </>:


<>


                
                
      
            
   
</>
} 
  


        </View>
      </View>
   
      </ScrollView>
    </View>
    


  );
};

export default ViewAllScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    height: 400,
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
    borderRadius: 7,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    top:45
  },
  acceptFriend: {
    backgroundColor: "#2196F3",
    top:40
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textStyleClose: {
    color: "grey",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color:'grey',
    fontWeight:'bold',
    fontSize: 22,
  }
});
