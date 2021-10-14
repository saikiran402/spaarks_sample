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
// const { signIn } = React.useContext(AuthContext);
import { Avatar, Card, Title, Paragraph, Searchbar } from "react-native-paper";
import { ScrollView } from "react-native";
// 
var randomHexColor = require('random-hex-color')
import RNLocation from 'react-native-location';
import { Dimensions } from "react-native";
import Snackbar from "react-native-snackbar";
import axios from "axios";
const GLOBAL = require('../Globals');
LogBox.ignoreAllLogs();
export default function PreferncesScreen({navigation,route}) {
  const { onBoarded } = React.useContext(AuthContext);
  var state = {
    counter:0,
    showNext:false
  }
  const [selectedforserver,setSelectedForServer] = useState([])
  const [location,setLocation] = useState(null)
  async function askLocations(preferencesss){
    console.log("In ")
    RNLocation.configure({
      distanceFilter: 5.0
    })

    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    }).then(granted => {
        if (granted) {
          console.log("Allowed")
          onBoarded(preferencesss)
          this.locationSubscription = RNLocation.subscribeToLocationUpdates(async locations => {
            
            setLocation(JSON.stringify(locations))
            await AsyncStorage.setItem('latitude', String(locations.latitude));
            await AsyncStorage.setItem('longitude', String(locations.longitude));
            await AsyncStorage.setItem('fromMockProvider', String(locations.fromMockProvider));
            onBoarded(preferencesss)
            /* Example preferencesss returned
            {
              speed: -1,
              longitude: -0.1337,
              latitude: 51.50998,
              accuracy: 5,
              heading: -1,
              altitude: 0,
              altitudeAccuracy: -1
              floor: 0
              timestamp: 1446007304457.029,
              fromMockProvider: false
            }
            */
          })
        }else{
          console.log('Not Allowed')
          navigation.navigate('SelectCityScreen',{preferences:preferencesss})
        }
      })
  }

async function setSelected(){
  var sel = await AsyncStorage.getItem('updatedpref')
  var newsel = JSON.parse(sel);
  var a = PreferencesState.list
  console.log('newsel',newsel)
  a.forEach(list=>{
    newsel.forEach(pre=>{
      if(String(list._id) == String(pre._id)){
        list.clicked = true;
      }
    })
   
  })
  setCount(newsel.length)
  dispatch({ type: "SETCOUNT", count: newsel.length,list:a,selected:newsel });
}


  useEffect(()=>{
    setSelected()
  },[])

 function AnimatedCircles() {

  const [viewDimensions, setViewDimensions] = useState(undefined);
  
  const handleLayout = useCallback(event => {
    const { width, height } = event.nativeEvent.layout;
    setViewDimensions({ width, height });
  }, []);

  const isCanvasReady = viewDimensions !== undefined;

  return (
    <View style={styles.flex} onLayout={handleLayout}>
      {isCanvasReady && (
        <AnimatedCirclesInner
          dimensions={viewDimensions}
        ></AnimatedCirclesInner>
      )}
    </View>
  );
}
const names = ['Painter','Plumber','Post a Job','Announce','Carpenter','Electrician','Music Band','Key Maker','Tution','Restaurant']
 

 function AnimatedCirclesInner({ dimensions }) {
  const [preferences, setPreferences] = useState([]);

  const [showNext, setNextVisibility] = useState(false);
 
  

  function getNames(a){
    console.log(state.counter,"4444",a,preferences)
      state.counter++;
      setPreferences("1")
     var pre = [];
     pre = preferences;
     if(!pre.includes(a)){
      pre.push(a);
     }
     
     console.log(pre)
      // dispatch({ type: "SETPREFERENCES", preferences: a });
      setPreferences(pre);

      
    if(state.counter==3){
      dispatch({ type: "SETNEXTVISIBILITY", show: true });


      
      // setNextVisibility(true)
     // alert("aypoindi roiiii")
      setNextVisibility(true)
      state.showNext = true
    }
    }
  const circles = useGravityAnimation(dimensions);

  return (
    <View style={styles.wrap}>
      {/* {circles.map((p, index) => {
        return (
        
<TouchableOpacity key={index} onPress={() =>  getNames(names[index])}>
        <Circle key={index} translateX={p.x} translateY={p.y} Color="#6FA4E9" nameInside={names[index]} count={index} />
      
        </TouchableOpacity>
      
      )
    })
  } */}


      
    </View>
  );
}



// export const Circle = ({translateX, translateY,Color,nameInside,count,navigation }) => {
//   if(count==0){
//     state.counter = 0;
//   }
//   function getName(a){
//   console.log(state.counter)
//     state.counter++;
//   if(state.counter==3){
//     state.showNext = true
//   }
//   }
//     return (
//       <View style={{marginRight:200}}>
  
//   <TouchableOpacity onPress={() =>  getName(nameInside)
//         }>
//           <View >
//       <Animated.View
//         style={{
//           transform: [{ translateX }, { translateY }],
//           position: "absolute",
//           width: circleDiameter,
//           height: circleDiameter,
//           borderRadius: circleRadius,
//           backgroundColor: Color
//         }}
//       ><Text h3 style={{paddingLeft:40,paddingTop:70 ,color:"#fff",fontSize:20}}>{nameInside}</Text></Animated.View>
//       </View>
//         </TouchableOpacity>
//       </View>
      
//     );
//   };


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
 list:[{tags:[],isTag:true,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941a7",categoryId:"C5",category:I18n.t('Donate'),image:require("../assets/categories_images/c5.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941ac",categoryId:"C1",category:I18n.t('Arts'),image:require("../assets/categories_images/c1.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b1",categoryId:"C4",category:I18n.t('Daily Services'),image:require("../assets/categories_images/c4.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b6",categoryId:"C9",category:I18n.t('Fitness'),image:require("../assets/categories_images/c9.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941bb",categoryId:"C8",category:I18n.t('Fashion'),image:require("../assets/categories_images/c8.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941c0",categoryId:"P2",category:I18n.t('People'),image:require("../assets/categories_images/people.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941a9",categoryId:"C012",category:I18n.t('Health'),image:require("../assets/categories_images/c012.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941af",categoryId:"C016",category:I18n.t('Medical Care'),image:require("../assets/categories_images/c016.png"),"__v":0},{tags:[],isTag:true,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b4",categoryId:"C020",category:I18n.t('Resell'),image:require("../assets/categories_images/c020.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b9",categoryId:"C024",category:I18n.t('Worker'),image:require("../assets/categories_images/c024.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941be",categoryId:"C023",category:I18n.t('Travel & Transport'),image:require("../assets/categories_images/c023.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941d2",categoryId:"P6",category:I18n.t('Local News'),image:require("../assets/categories_images/local_news.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941ab",categoryId:"C022",category:I18n.t('Store'),image:require("../assets/categories_images/c022.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b0",categoryId:"C021",category:I18n.t('Stall'),image:require("../assets/categories_images/c021.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b5",categoryId:"C3",category:I18n.t('Consultant'),image:require("../assets/categories_images/c3.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941ba",categoryId:"C2",category:I18n.t('Beauty'),image:require("../assets/categories_images/c2.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941bf",categoryId:"P1",category:I18n.t("Make Friends") ,image:require("../assets/categories_images/makefriends.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941d3",categoryId:"P7",category:I18n.t('Jobs'),image:require("../assets/categories_images/job.png"),"__v":0},{tags:[],isTag:true,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941a8",categoryId:"C7",category:I18n.t('Agri Malls'),image:require("../assets/categories_images/c7.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941ae",categoryId:"C011",category:I18n.t('Freelancer'),image:require("../assets/categories_images/c011.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b3",categoryId:"C015",category:I18n.t('Lifestyle'),image:require("../assets/categories_images/c015.png"),"__v":0},{tags:[],isTag:true,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b8",categoryId:"C019",category:I18n.t('Repair'),image:require("../assets/categories_images/c019.png"),"__v":0},{tags:[],isTag:true,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941bd",categoryId:"C018",category:I18n.t('Rent/Lease'),image:require("../assets/categories_images/c018.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941d1",categoryId:"P5",category:I18n.t('Announce'),image:require("../assets/categories_images/announce.png"),"__v":0},{tags:[],isTag:true,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941aa",categoryId:"C017",category:I18n.t('Real Estate'),image:require("../assets/categories_images/c017.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941ad",categoryId:"C6",category:I18n.t('Education'),image:require("../assets/categories_images/c6.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b2",categoryId:"C010",category:I18n.t('Food'),image:require("../assets/categories_images/c010.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941b7",categoryId:"C014",category:I18n.t('IT & Hardware'),image:require("../assets/categories_images/c014.png"),"__v":0},{tags:[],isTag:true,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941bc",categoryId:"C013",category:I18n.t('Horoscope'),image:require("../assets/categories_images/c013.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941c1",categoryId:"P3",category:I18n.t("Find Date"),image:require("../assets/categories_images/date.png"),"__v":0},{tags:[],isTag:false,clicked:false,fromSearch:false,_id:"6062b89aa1c92a56e91941d0",categoryId:"P4",category:I18n.t('Events'),image:require("../assets/categories_images/group_event.png"),"__v":0}].reverse()
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
    console.log(b)
    var jwt = await AsyncStorage.getItem('token');
    console.log(jwt)
    var sendingToServer = []
    a.forEach(list=>{
      sendingToServer.push({
        category:list.category,
        categoryId:list.categoryId,
        isTag:list.isTag
      })
    })
    await axios.post(GLOBAL.BASE_URL+"user/updatepreferences",{
      preferences:sendingToServer
    },{
      headers: {
        "Content-Type": "application/json",
        Authorization:
          'Bearer ' + jwt
      },
    }
    ).then(async(resp) => {
      await AsyncStorage.setItem('updatedpref',b)
      Snackbar.show({
        text:I18n.t("succesfully updated"),
      })
      //  alert('Token Sent')
    }).catch(err => {
      console.log('ikikikikikikikikikikiki')
      console.log(err)
    })
   
   
    // onBoarded(b)
  }

   navigation.goBack()
}


function clicked(w){
  
  var sel = PreferencesState.selected;
  // sel.forEach(sele=>{
  //   if(sele == w){
  //     return;
  //   }
  // })
  console.log("uuuu")
  var cou = count;


  var a = PreferencesState.list;
  console.log("Selected",sel)
  a.forEach(last=>{

    if(last._id == w){
      if(last.clicked){
        last.clicked = false
        cou--;
      }else{
        last.clicked = true
        sel.push(String(w))
        cou++;
      }
     
      // if(last.clicked){
      //   last.clicked = false
      //   var sel = sel.filter(v => v !== String(w))
      // }else{
       
      // }
      
      // if(sel.includes(w)){
        
      // }else{
        
      // }
    }
  })
  setCount(cou);
  dispatch({ type: "SETCOUNT", count: cou,list:a,selected:sel });
}
const isFirst = false;




  return (

    <View>
  
<View style={styles.background}>

  <View style={{position:'absolute',bottom:0,left:0,right:0,zIndex:1,backgroundColor:PreferencesState.count>0?'#6FA4E9':'#CBD1DE',borderRadius:10,width:'100%'}}>
  {

!PreferencesState.showNext ?
 <TouchableOpacity onPress={() => onNext()
      }>

    <Text style={{color:  '#fff',textAlign:"center",padding:10,width:350,height:40,fontWeight:'bold',fontSize:16,marginTop:7}}>{I18n.t("Save")} {PreferencesState.count == 0?<></>:<>(</>}{PreferencesState.count == 0?<></>:(PreferencesState.count)}{PreferencesState.count == 0?<></>:<>)</>}</Text>
 
    </TouchableOpacity> 
   :<></>

  }
</View>

<ScrollView>

<View>

<View style={{   marginBottom:200,justifyContent:'center',alignItems:'center'}}>
            <FlatList
              style={{ width: Dimensions.get('window').width-10}}
              numColumns={3} // set number of columns
              columnWrapperStyle={styles.row} // space them out evenly
              //   data={_.xorBy(list,route.params.excluding,'categoryIndex')}
              data={PreferencesState.list.sort((a,b)=>a.category.localeCompare(b.category))}
              keyExtractor={(item, index) => item._id}
              renderItem={({ item }) => (
                <>
                <View style={{margin:2}}>
                 <TouchableOpacity
                      onPress={() => clicked(item._id)
                      }
                    >
                       {/* <ImageBackground source={item.image} style={{ height: 120, width: 115, borderRadius: 10,opacity: 1 }} imageStyle={{ opacity: 1,borderRadius:10}}>
                      <Card style={{ marginLeft: 0 }}>
                        <View style={{ margin: 0,borderRadius: 10 }}>

                          { item.clicked?<Image source={require('../assets/icons/clicked.png')}  style={{height:25,width:25,position:'absolute',top:0,left:90}}></Image>:<></>
              }
              <Text style={{position:'absolute',color:'#fff',top:104,fontWeight:'bold',textAlign:'center',  backgroundColor: "rgba(0, 0, 0, 0.5)",width:115,borderRadius: 10}}>{item.category}</Text>
                        
                        </View>
                       
                      </Card>
                      </ImageBackground> */}
                         <Card style={{width:(Dimensions.get('window').width-26)/3,margin:1 }}>
                        {/* <Card style={{ marginLeft: 0 }}> */}
                        <View style={{ margin: 8,justifyContent:'center',alignItems:'center' }}>
                        { item.clicked?<Image source={require('../assets/icons/clicked.png')}  style={{height:25,width:25,position:'absolute',top:0,left:90,zIndex:1}}></Image>:<></>
              }
                          <Card.Cover
                            source={item.image}
                            cache="force-cache"
                            style={{ height: 90, width: 100, borderRadius: 5,backgroundColor:'#fff', top: 10 }}
                          />
                          {/* <Image source={item.image} ></Image> */}
                        </View>
                        <Card.Content style={{height:40}}>
                        {
                             item.category == 'Travel & Transport'?
                             <>
                             <View style={{justifyContent:'center'}}>
                             <Text style={{textAlign:'center',fontWeight:'bold'}}>Travel & </Text>
                             <Text style={{textAlign:'center',fontWeight:'bold'}}>Transport</Text>

                             </View>
                            
                             </>
                             :item.category == 'IT & Hardware' || item.category == 'आईटी और हार्डवेयर '?
                             <>
 <View style={{justifyContent:'center'}}>
   {
     item.category == 'आईटी और हार्डवेयर '?
    <>

<Text style={{textAlign:'center',fontWeight:'bold',marginTop:7}}>आईटी और </Text>
                             <Text style={{textAlign:'center',fontWeight:'bold'}}>हार्डवेयर</Text>
    </>
     :
     <>
     <Text style={{textAlign:'center',fontWeight:'bold',marginTop:7}}>IT & </Text>
     <Text style={{textAlign:'center',fontWeight:'bold'}}>Hardware</Text>
     </>
   }

                             </View>
                             </>
                             :
                             <>
                             <Text style={{textAlign:'center',fontWeight:'bold',marginTop:10}}>
                             {item.category}
                             </Text>
                             </>
                           }
                        </Card.Content>
                      </Card>
                    </TouchableOpacity>
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