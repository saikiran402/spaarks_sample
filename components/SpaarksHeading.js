import React, {useState, useRef} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import I18n from '../src/i18n';
import StarRating from './StarRating';
import RBSheet from "react-native-raw-bottom-sheet";
import Slider from '@react-native-community/slider';
import { connect, useDispatch, useReducer } from "react-redux";
import chatReducers from "../reducers/chatReducers";
// import FilterComponent from "./components/FilterComponent";
import {
    Avatar,
    Button,
  } from "react-native-paper";
import AsyncStorage from '@react-native-community/async-storage';



{/* <SpaarksHeading within={true} setFinalDistance={setFinalDistance} setOffsetWithin={setOffsetWithin} setOffsetBeyond={setOffsetBeyond} setDataSourceWithin={setDataSourceWithin} setDataSourceBeyond={setDataSourceBeyond} getDataWithinOnRefresh={getDataWithinOnRefresh} getDataBeyondOnRefresh={getDataBeyondOnRefresh}/> */}
const SpaarksHeading = ({within,isConnected,showing,getDataBeyondOnRefresh,setOffsetWithin,setOffsetBeyond,setOffsetExplore,getDataWithinOnRefresh,setDataSourceBeyond,setDataSourceWithin,setDataSourceExplore,featureName,getDataBeyond,getDataExplore,getDataWithin,setSortByString,setsortedDistance,getDataWithinOnRefreshSort,getDataBeyondOnRefreshSort,getDataBeyondSort,getDataWithinSort}) => {
  const refRBsheettt = useRef();
  const [sortedDistance, setsortedDistances]= useState(5); 
  const [finalDistanceP, setFinalDistanceP]= useState(showing); 
  const [sortBys,setSortBy] = useState(true)
  const [sortByString,setSortByStrings] = useState('Distance')
  async function setSortBys(a){
    if(a){
      setSortBy(true)
      setSortByStrings('Distance')
    }else{
      setSortBy(false)
      setSortByStrings('Time')
    }

  }

  async function sortNow(){
    if(isConnected){
      refRBsheettt.current.close()
      if(featureName == 'market'){
        setFinalDistanceP(sortedDistance)
        setSortByString(sortByString)
        setsortedDistance(sortedDistance)
        setOffsetWithin(1)
        setOffsetBeyond(1)
        setOffsetExplore(1)
        setDataSourceWithin([])
        setDataSourceBeyond([])
        setDataSourceExplore([])
        getDataWithinSort(1,sortedDistance,sortByString)
        getDataBeyondSort(1,sortedDistance,sortByString)
        getDataExploreSort(1,sortedDistance,sortByString)
        // getDataExplore(1)
      }else{
        

        setFinalDistanceP(sortedDistance)
        setOffsetWithin(2)
        setOffsetBeyond(2)
        setDataSourceWithin([])
        setDataSourceBeyond([])
        setSortByString(sortByString)
        setsortedDistance(sortedDistance)
        // getDataWithinOnRefresh()
        // getDataBeyondOnRefresh()
        getDataWithinOnRefreshSort(sortedDistance,sortByString)
        getDataBeyondOnRefreshSort(sortedDistance,sortByString)
      }
     

  }else{
    Snackbar.show({
      text: I18n.t('Check your internet'),
      duration: Snackbar.LENGTH_LONG
    });
  }
  }

  async function openFilter(){
    refRBsheettt.current.open()
  }
  return (
    <View>
      <RBSheet
                        ref={refRBsheettt}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        height={350}
                        borderRadius={0}
                        closeDuration={100}
                        customStyles={{
                          draggableIcon: {
                            backgroundColor: "#000",
                          },
                          container: {
                            borderRadius: 0,
                          },
                        }}
                      >
                        <View style={{ backgroundColor: "#fff", height:330 }}>
                         
                          <Text style={{marginLeft: 20, fontWeight:'500', fontSize: 20, paddingBottom: 14 }}>{I18n.t("Filter Spaarks by")}  
                          <Text style={{color:'#6FA4E9'}}> {sortedDistance.toFixed(0)}Km 
                          </Text></Text>
                         
                          <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', alignItems:'center', paddingRight: 10, paddingLeft: 10}}>
                         <View style={{ flex: 1,justifyContent: 'center',marginTop:10,marginLeft:5}}>


<Slider
    style={{width: 370, height: 30}}
    minimumValue={1}
    value={finalDistanceP}
    onValueChange={setsortedDistances}
    maximumValue={5}
    minimumTrackTintColor="#6FA4E9"
    maximumTrackTintColor="#9597A1"
    step='1'
  />

                        
</View>

               </View>
               <View style={{marginTop:0}}>
               <View style={{ flexDirection:'row',justifyContent:'space-between', alignItems:'center', fontSize: 10,paddingRight: 9, paddingLeft: 9,margin:10}}>
                          <Text>1km</Text>
                            <Text>2km</Text>
                            <Text>3km</Text>
                            <Text>4km</Text>
                            <Text>5km</Text>

                          </View>
               <View
                            style={{
                              borderBottomColor: '#C0C0C0',
                              borderBottomWidth: 1,
                              width: 370, 
                              marginLeft: 10,
                              marginRight: 10,
                            }}
                          />

                         </View>
                 

<View>

<View style={{flexDirection:'column',padding:10}}>
  <View style={{flexDirection:'row'}}>
            <View style={{flex:4}} >
          <Text style={{fontWeight:'500',fontSize:16, left: 15}}>{I18n.t("Nearest Spaarks")}</Text>
          <Text style={{fontSize:14,color:'#A1A4B2', left: 15, top:6, fontWeight:'400'}}>{I18n.t("Spaarks are sorted by distance from you")}</Text>
          </View>
          <View style={{flex:1}}>
            <TouchableOpacity onPress={()=>setSortBys(1)}>
              {
                sortBys?
                <Image source={require('../assets/checked.png')} style={{height:40,width:40}}/>:
                <Image source={require('../assets/unchecked.png')} style={{height:40,width:40}}/>
              }
          
         
          </TouchableOpacity>
           </View>
  </View>

 {/* <View
                            style={{
                              borderBottomColor: '#C0C0C0',
                              borderBottomWidth: 1,
                              width: 370, 
                              marginLeft: 10,
                              marginRight: 10,
                              margin:10
                            }}
                          /> */}
                           <View
                            style={{
                              borderBottomColor: '#C0C0C0',
                              borderBottomWidth: 1,
                              width: 370, 
                              marginLeft: 10,
                              marginRight: 10,
                              margin: 10
                            }}
                          />
  <View style={{flexDirection:'row'}}>
            <View style={{flex:4}} >
          <Text style={{fontWeight:'500',fontSize:16, left: 15}}>{I18n.t("Latest Spaarks")}</Text>
          <Text style={{fontSize:14,color:'#A1A4B2', left: 15, top: 6, fontWeight:'400'}}>{I18n.t("Spaarks are sorted by time of posting")}</Text>
          </View>
          <View style={{flex:1}}>
          <TouchableOpacity onPress={()=>setSortBys(0)}>
          {
                sortBys?
                <Image source={require('../assets/unchecked.png')} style={{height:40,width:40}}/>:
                <Image source={require('../assets/checked.png')} style={{height:40,width:40}}/>
              }
              </TouchableOpacity>
          </View>
  </View>
</View>

                                   

                                 
</View>

                         <View style={{ justifyContent:'center', alignItems:'center'}}>
                          <TouchableOpacity onPress={()=>sortNow()}>
                          <Button
                                    mode="contained"
                                    color="#6FA4E9"
                                    style={{
                                      height: 40,
                                      width: 300,
                                      margin: 10,
                                      marginTop: 10,
                                     
                                      marginBottom: 20
                                    }}
                                   
                                  >
                                  <Text style={{color:'#fff'}}>{I18n.t("SORT")}</Text>
                                </Button>  
                                </TouchableOpacity>
                                </View>                        
                        </View>


                      </RBSheet>

        {
            within?
            <View style={{flexDirection:"row"}}>
           <Text style={{ fontWeight: "bold", margin: 0,fontSize:16,padding:10 }}>{'  '}{I18n.t('Spaarks')} {I18n.t("within")} <Text style={{color:'#6FA4E9'}}>{finalDistanceP.toFixed(0)}Km </Text>{I18n.t("lopala")}</Text>
               <View>

                         <TouchableOpacity onPress={() => openFilter()}>
                          <Image source={require('../assets/filter.png')} style={{ height: 25, width: 25,marginTop:5}}></Image>
                        </TouchableOpacity>
                        </View> 
                        
                        
                        
                        </View>
            :
  <View>
<Text style={{ fontWeight: "bold", margin: 0,fontSize:16 }}> {'  '}{I18n.t('Spaarks')} {I18n.t("beyond")} <Text style={{color:'#6FA4E9'}}>{finalDistanceP.toFixed(0)}Km</Text> {I18n.t("bayata")}</Text>
      </View>
            
        }

    </View>
  );
};


const mapStatetoProps = (state) => {
    // const { }=state
    return {
      isConnected:state.chatss.isConnected
    };
  };
  
  // exports.finalXMPP = finalXMPP;
  export default connect(mapStatetoProps)(SpaarksHeading);

const styles = StyleSheet.create({
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
