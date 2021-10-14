import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image,  Dimensions } from 'react-native';
// import PostCardforGuidelines from "../components/PostCardforGuidelines";
const GLOBAL = require('../Globals');
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { ScrollView } from 'react-native';
import PostCardforGuidelines from '../components/PostCardforGuidelines';

import I18n from "../src/i18n"

const GuidelinesScreen = ({navigation,route}) => {
    var total=[];
    const [posts, setPosts] = useState([])
    const [eligibility, setEligible] = useState(false)
    async function getData(){
        var token  = await  AsyncStorage.getItem('token');
        console.log(GLOBAL.BASE_URL+"user/rewardtemplatesposts")
        await axios.get(GLOBAL.BASE_URL+"user/rewardtemplatesposts",{
          headers: {
            "Content-Type": "application/json",
            Authorization:
            'Bearer '+token
          },
        }).then((resp) => {
          console.log('templatesssss',resp.data);
        //   resp.data.map((list, i) =>
        //     total=[...list[i]._id.eligibleTemp, ...list[i]._id.nonEligibletemp]
        //   )
        setPosts(resp.data)
       
          
        });

           
           

    
        //   <FlatList
        //   data={posts.map((list, i)=> [...list[i]._id.eligibleTemp, ...list[i]._id.nonEligibletemp])}
        //   horizontal={true}
        //   keyExtractor={(item, index) => item.index}
        //   renderItem={renderPostCard}
        // />
        
      }
    
      useEffect(()=>{
          getData()
      },[])
    
    const renderPostCard = ({ item, index }) =>{
        return(
          <PostCard 
          item={item} 
          index={index} 
          banners={[]} 
          showBanner={false}
          navigation={navigation}
          />
          
        )
      }
    return (
     <>
     <ScrollView>
         <View style={{backgroundColor:'#f2f2f2'}}>
     <View style={{padding: 20,}}>
         <Text style={{fontSize: 15, fontWeight: "500"}}>
             {I18n.t("Sample Spaark eligible for Partner Program verification")}.
         </Text>
         <View style={{padding: 10, }}>
            <Text style={{color: "#808080", marginTop: 15,fontWeight: "400"}}>{I18n.t("The Spaark should have a picture of the business")}.
            </Text>
            <Text style={{marginTop: 15, color: "#808080"}}>{I18n.t("The Spaark should be having meaningful content according to their business category")}.
            </Text>
         </View>



  


     </View>
    
     {

posts.map((list, i) =>
<View style={{width:Dimensions.get('window').width, paddingLeft:20 }}>
{/* <Text>{list._id.category}</Text> */}


<FlatList
horizontal
showsHorizontalScrollIndicator={false}
style={{padding:0}}
ItemSeparatorComponent={
  () => <View style={{ width: 20, backgroundColor: '#f2f2f2' }}/>
}
data={[...list._id.eligibleTemp,...list._id.nonEligibletemp]}
renderItem={({ item,i }) => (
  
<>
<View style={{width:Dimensions.get('window').width-80 }}>
{
  item.eligible?
  <View style={{flexDirection:"row", padding: 15, paddingLeft: -15,paddingTop:0}}>

  <Text style={{color: "green", fontWeight:"bold"}}>{I18n.t("Eligible for Partner Program verification")} </Text>
  <Image source={require('../assets/check.png')} style={{height:15, width:15, }}
  />
  </View>:
  <View style={{flexDirection:"row", paddingBottom: 15, paddingTop:1}}>

  <Text style={{color: "red", fontWeight:"bold", fontSize: 12}}> {I18n.t("Not Eligible for Partner Program verification")} </Text>
  <Image source={require('../assets/close.png')} style={{height:15, width:15, }}
  />
  </View>
  
}


<PostCardforGuidelines
item={item} 
index={i} 
// banners={[]} 
// showBanner={false}
// navigation={navigation} 
/>
</View>
</>

)}

/>
<View style={{margin:15}}>
  </View>
</View>
)
}</View>
     </ScrollView>
     </>
    );
};

export default GuidelinesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
