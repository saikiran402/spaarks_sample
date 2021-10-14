import React,{useState,useCallback, useEffect} from "react";
import { View, StyleSheet,SafeAreaView,TouchableOpacity,Button,Animated,FlatList,Image,ImageBackground,LogBox } from 'react-native';
import {Text} from 'react-native-elements';
import { useGravityAnimation } from "../components/AnimatedCircles/useGravityAnimation.hook";
import { Circle } from "../components/AnimatedCircles/Circle.component";
import AsyncStorage from '@react-native-community/async-storage';
import HeaderScreen from '../components/HeaderDashboard';
import { AuthContext } from '../components/context';
export const circleDiameter = 150;
import I18n from '../src/i18n';
const circleRadius = circleDiameter / 2;

import { Avatar, Card, Title, Paragraph, Searchbar } from "react-native-paper";
import { ScrollView } from "react-native";
// 
var randomHexColor = require('random-hex-color')
import RNLocation from 'react-native-location';
import { Dimensions } from "react-native";
import Snackbar from "react-native-snackbar";
LogBox.ignoreAllLogs();
export default function ApplicableCategories({navigation,route}) {
  const { onBoarded } = React.useContext(AuthContext);
  var state = {
    counter:0,
    showNext:false
  }

  var applicable = [
      {
    name:I18n.t('General Store'),
      image: require("../assets/categories_images/c48.png"),
    },
    {
        name:I18n.t('Gym'),
        image: require("../assets/categories_images/c49.png"),
        },
        {
            name:I18n.t("Salon"),
            image: require("../assets/categories_images/c0153.png")
        }, {
            name:I18n.t("Institute"),
            image: require("../assets/categories_images/c63.png"),
        }, {
            name:I18n.t("Bakery") ,
            image: require("../assets/categories_images/c0101.png"),
      },{
          name: I18n.t("Cafe/Parlour") , 
          image: require("../assets/categories_images/c0102.png"),
      }, {
          name: I18n.t("Tailor") ,
          image: require("../assets/categories_images/c417.png"),
      } , {
          name : I18n.t("Coaching Centre") , 
          image: require("../assets/categories_images/c62.png"),
      } , {
          name : I18n.t("Dhaba") , 
          image: require("../assets/categories_images/c0104.png"),
      } ,{
          name: I18n.t("Restaurant"),
          image: require("../assets/categories_images/c01012.png"),
      } ,{
          name: I18n.t("Sweet Shop") ,
          image: require("../assets/categories_images/c01014.png"),
      } , {
          name : I18n.t("Clinic") , 
        image: require("../assets/categories_images/c0121.png"),
      } , {
          name: I18n.t("Electricals"),
          image: require("../assets/categories_images/c0143.png"),
      } ,{
          name : I18n.t("Printing") , 
        image: require("../assets/categories_images/c0147.png"),
      } , {
          name: I18n.t("Medical Store"),
          image: require("../assets/categories_images/c0164.png"),
      } , {
          name : I18n.t("Kitchenware") ,
          image: require("../assets/categories_images/c0218.png"),
      } , {
          name : I18n.t("Mechanic") , 
          image: require("../assets/categories_images/c0219.png"),
      } , {
          name:I18n.t("Cab/Taxi"),
          image:require("../assets/categories_images/c0232.png")
          
      } , {
          name : I18n.t("Autorickshaw"),
          image:require("../assets/categories_images/c0231.png")

      } , {
          name: I18n.t("Packers & Movers"), 
          image:require("../assets/categories_images/c0234.png")
      }
        
  ]






const names = ['Painter','Plumber','Post a Job','Announce','Carpenter','Electrician','Music Band','Key Maker','Tution','Restaurant']

const PreferencesReducer = (prevState, action) => {
  switch (action.type) {
    case "SETNEXTVISIBILITY":
      return {
        ...prevState,
        showNext: action.show,
        isLoading: false,
      };

      case "SETPREFERENCES":
      return {
        ...prevState,
        preferences: action.preferences,
        isLoading: false,
      };
      case "SETCOUNT":
      return {
        ...prevState,
        count: action.count,
        isLoading: false,
        list:action.list,
        selected:action.selected
      };
     
  }
};


const initialState = {
  isLoading: true,
 preferences:[],
 showNext:false,
 count:0,
 selected:[],
 list:[{tags:[],isTag:true,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941a7",categoryId:"C5",category:I18n.t('Donate'),image:require("../assets/categories_images/c5.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941ac",categoryId:"C1",category:I18n.t('Arts'),image:require("../assets/categories_images/c1.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b1",categoryId:"C4",category:I18n.t('Daily Services'),image:require("../assets/categories_images/c4.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b6",categoryId:"C9",category:I18n.t('Fitness'),image:require("../assets/categories_images/c9.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941bb",categoryId:"C8",category:I18n.t('Fashion'),image:require("../assets/categories_images/c8.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941c0",categoryId:"P2",category:I18n.t('People'),image:require("../assets/categories_images/people.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941a9",categoryId:"C012",category:I18n.t('Health'),image:require("../assets/categories_images/c012.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941af",categoryId:"C016",category:I18n.t('Medical Care'),image:require("../assets/categories_images/c016.png"),"__v":0},{tags:[],isTag:true,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b4",categoryId:"C020",category:I18n.t('Resell'),image:require("../assets/categories_images/c020.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b9",categoryId:"C024",category:I18n.t('Worker'),image:require("../assets/categories_images/c024.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941be",categoryId:"C023",category:I18n.t('Travel & Transport'),image:require("../assets/categories_images/c023.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941d2",categoryId:"P6",category:I18n.t('Local News'),image:require("../assets/categories_images/p6.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941ab",categoryId:"C022",category:I18n.t('Store'),image:require("../assets/categories_images/c022.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b0",categoryId:"C021",category:I18n.t('Stall'),image:require("../assets/categories_images/c021.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b5",categoryId:"C3",category:I18n.t('Consultant'),image:require("../assets/categories_images/c3.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941ba",categoryId:"C2",category:I18n.t('Beauty'),image:require("../assets/categories_images/c2.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941bf",categoryId:"P1",category:I18n.t("Make Friends") ,image:require("../assets/categories_images/makefriends.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941d3",categoryId:"P7",category:I18n.t('Jobs'),image:require("../assets/categories_images/job.png"),"__v":0},{tags:[],isTag:true,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941a8",categoryId:"C7",category:I18n.t('Agri Malls'),image:require("../assets/categories_images/c7.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941ae",categoryId:"C011",category:I18n.t('Freelancer'),image:require("../assets/categories_images/c011.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b3",categoryId:"C015",category:I18n.t('Lifestyle'),image:require("../assets/categories_images/c015.png"),"__v":0},{tags:[],isTag:true,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b8",categoryId:"C019",category:I18n.t('Repair'),image:require("../assets/categories_images/c019.png"),"__v":0},{tags:[],isTag:true,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941bd",categoryId:"C018",category:I18n.t('Rent/Lease'),image:require("../assets/categories_images/c018.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941d1",categoryId:"P5",category:I18n.t('Announce'),image:require("../assets/categories_images/announce.png"),"__v":0},{tags:[],isTag:true,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941aa",categoryId:"C017",category:I18n.t('Real Estate'),image:require("../assets/categories_images/c017.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941ad",categoryId:"C6",category:I18n.t('Education'),image:require("../assets/categories_images/c6.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b2",categoryId:"C010",category:I18n.t('Food'),image:require("../assets/categories_images/c010.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b7",categoryId:"C014",category:I18n.t('IT & Hardware'),image:require("../assets/categories_images/c014.png"),"__v":0},{tags:[],isTag:true,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941bc",categoryId:"C013",category:I18n.t('Horoscope'),image:require("../assets/categories_images/c013.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941c1",categoryId:"P3",category:I18n.t("Find Date"),image:require("../assets/categories_images/date.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941d0",categoryId:"P4",category:I18n.t('Events'),image:require("../assets/categories_images/p4.png"),"__v":0}].reverse()
};
const [PreferencesState, dispatch] = React.useReducer(
  PreferencesReducer,
  initialState
);


  const [showNext, setNextVisibility] = React.useState(false);
  const [count, setCount] = React.useState(0);
  // const { onBoarded } = React.useContext(AuthContext);

async function onNext(){
  if(count>0){
    var a = PreferencesState.list.filter(each => each.clicked == true);
    var b = JSON.stringify(a)
    await AsyncStorage.setItem('updatedpref',b)
    // onBoarded(b)
  }
  Snackbar.show({
    text:I18n.t("succesfully updated"),
  })

}



  return (

    <View>
  
<View style={styles.background}>

  
<ScrollView>

<View>

<View style={{   marginBottom:200,justifyContent:'center',alignItems:'center' , paddingRight: 5}}>
            <FlatList
              style={{ width: Dimensions.get('window').width-10}}
              numColumns={3} // set number of columns
              columnWrapperStyle={styles.row} // space them out evenly
              //   data={_.xorBy(list,route.params.excluding,'categoryIndex')}
              data={applicable}
              keyExtractor={(item, index) => item._id}
              renderItem={({ item }) => (
                <>
                <View style={{margin:2}}>
                
                       {/* <ImageBackground source={item.image} style={{ height: 120, width: 115, borderRadius: 10,opacity: 1 }} imageStyle={{ opacity: 1,borderRadius:10}}>
                      <Card style={{ marginLeft: 0 }}>
                        <View style={{ margin: 0,borderRadius: 10 }}>

                          { item.clicked?<Image source={require('../assets/icons/clicked.png')}  style={{height:25,width:25,position:'absolute',top:0,left:90}}></Image>:<></>
              }
              <Text style={{position:'absolute',color:'#fff',top:104,fontWeight:'bold',textAlign:'center',  backgroundColor: "rgba(0, 0, 0, 0.5)",width:115,borderRadius: 10}}>{item.category}</Text>
                        
                        </View>
                       
                      </Card>
                      </ImageBackground> */}
                         <Card style={{width:(Dimensions.get('window').width-25)/3,margin:1 }}>
                        {/* <Card style={{ marginLeft: 0 }}> */}
                        <View style={{ margin: 8,justifyContent:'center',alignItems:'center' }}>
                        
                          <Card.Cover
                            source={item.image}
                            cache="force-cache"
                            style={{ height: 80, width: 100, borderRadius: 5,backgroundColor:'#fff', top: 10 }}
                          />
                          {/* <Image source={item.image} ></Image> */}
                        </View>
                        <Card.Content style={{height:50}}>
                          {
                            item.name == 'Packers & Movers'?
                            <>
   <Title style={{ textAlign: "center", fontSize: 10, top: 10, fontWeight: 'bold' }}>
                          Packers & Movers
                          </Title>
                       
                            </>:
                            <>
                               <Title style={{ textAlign: "center", fontSize: 10, top: 10, fontWeight: 'bold' }}>
                            {item.name}
                          </Title>
                            </>
                          }
                       
                        </Card.Content>
                      </Card>
                  
                    </View>
                </>

              )}
            />
</View>
</View>
</ScrollView>       
              
  </View>
  </View>

 
  );
}

const styles = StyleSheet.create({
cards:{

    height:40,
    height:'100%'
},
background:{
    margin:0,
    backgroundColor:'#f2f2f2',
 
},
backgrounds:{
    margin:10,
    marginBottom:20
},
flex: { flex: 1 },
wrap: {
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  margin:0
}
});