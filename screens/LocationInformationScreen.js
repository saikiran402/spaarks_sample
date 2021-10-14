import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Button, StyleSheet, Dimensions,ImageBackground,Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RNLocation from 'react-native-location';
import { ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../components/context';
import I18n from '../src/i18n';
const LocationInformationScreen = ({ navigation, route }) => {

    const { onBoarded,changeLanguage } = React.useContext(AuthContext);
    const initialLoginState = {
        isLoading: false
      };
      
      const loginReducer = (prevState, action) => {
        switch( action.type ) {         
            case 'SETISLOADING': 
            return {
              ...prevState,
              // isLocationGiven: action.isLocationGiven,
              isLoading: action.loading
            };
        }
      };
      const [locationState, dispatch] = React.useReducer(loginReducer, initialLoginState);
      
    async function askLocation(navigation){
        if(route.params.onboarded){
            await RNLocation.configure({
                distanceFilter: 5.0
              })
          await RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
              detail: "coarse"
            }
          }).then(async(granted) => {
              if (granted) {
                  // alert('1')
                dispatch({type:"SETISLOADING",loading:true})
                await RNLocation.subscribeToLocationUpdates(async (locations) => {
                  await AsyncStorage.setItem('isLocationPermitted', String(true));
                  await AsyncStorage.setItem('latitude', String(locations[0].latitude));
                  await AsyncStorage.setItem('longitude', String(locations[0].longitude));
                  await AsyncStorage.setItem('fromMockProvider', String(locations[0].fromMockProvider));
                  dispatch({type:"SETISLOADING",loading:false})
                  onBoarded([],'en')
                })
              }else{
                // alert('Not Allowed')
                await AsyncStorage.setItem('isLocationPermitted', String(false));
                // navigation.popToTop()
                navigation.navigate('SelectCityScreen',{preferences:[]})
      
              }
            })
        }
        // alert('locations')
       
      
      }



      if( locationState.isLoading) {
        return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large"/>
            <Text style={{margin:10}}>Getting Location for Better Experience...</Text>
          </View>
        );
      }else{
    return (
        <View>
            <ScrollView>
            <ImageBackground source={{uri:'https://images.freecreatives.com/wp-content/uploads/2016/02/Free-Cool-Blue-Gradient-Background.jpg'}} resizeMode="cover" style={{height:Dimensions.get('window').height}}>
            <View style={{ flex: 1 }}>
                <View>
                   
                    <View style={{height:150,marginTop:60,padding:10,flexDirection:'row'}}>
                    <View style={{flex:3}}>
                    <Text style={{padding:10,paddingBottom:0,color:'#fff',fontSize:35,paddingBottom:10}}>{I18n.t("Spaarks")}</Text>
                                                <Text style={{padding:10,paddingTop:0,color:'#fff',fontSize:35}}>{I18n.t("Location")}</Text>
                        </View>
                        <View style={{flex:1,marginTop:20,flexDirection:'row'}}>
                            <View>
                            <Image source={require('../assets/change_loc.png')} style={{height:60,width:60,borderRadius:10}}/>
                            </View>
                            {/* <View>
                            <Image source={require('../assets/logo.png')} style={{height:60,width:60,borderRadius:10}}/>
                            </View> */}
                      
                        </View>
                                               

                    </View>
                    <View style={{height:700,marginTop:0}}>
                        <Text style={{padding:20,color:'#fff',fontSize:18}}>{I18n.t("Turning on location services will allow Spaarks to connect you to your local area")}.{I18n.t("You will be able to see")}:</Text>
                       
                       <View style={{flexDirection:'row',marginLeft:50,marginTop:20}}>
                            <View>
                                <Image source={require('../assets/que/q4.png')} style={{height:60,width:60,borderRadius:10}}/>
                            </View>
                            <View>
                            <Text style={{padding:10,color:'#fff',fontWeight:'300',fontSize:18}}>{I18n.t("Sellers near you")}</Text>
                            </View>
                       </View>

                       <View style={{flexDirection:'row',marginLeft:50,marginTop:20}}>
                            <View>
                                <Image source={require('../assets/que/q6.png')} style={{height:60,width:60,borderRadius:10}}/>
                            </View>
                            <View>
                            <Text style={{padding:10,color:'#fff',fontWeight:'300',fontSize:18}}>{I18n.t("Jobs near you")}.</Text>
                            </View>
                       </View>

                       <View style={{flexDirection:'row',marginLeft:50,marginTop:20}}>
                            <View>
                                <Image source={require("../assets/categories_images/group_event.png")} style={{height:60,width:60,borderRadius:10}}/>
                            </View>
                            <View>
                            <Text style={{padding:10,paddingBottom:0,color:'#fff',fontWeight:'300',fontSize:18}}>{I18n.t("Events happening")} </Text>
                            <Text style={{padding:10,paddingTop:0,color:'#fff',fontWeight:'300',fontSize:18}}>{I18n.t("around you")}.</Text>
                            
                            </View>
                       </View>
                       {/* <View style={{flexDirection:'row',marginLeft:50,marginTop:20}}>
                            <View>
                                <Image source={require('../assets/logo.png')} style={{height:50,width:50,borderRadius:10}}/>
                            </View>
                            <View>
                            <Text style={{padding:10,color:'#fff',fontWeight:'bold'}}>You will also be able to:</Text>
                            </View>
                       </View>


                       <View style={{flexDirection:'row',marginLeft:50,marginTop:20}}>
                            <View>
                                <Image source={require('../assets/logo.png')} style={{height:50,width:50,borderRadius:10}}/>
                            </View>
                            <View>
                            <Text style={{padding:10,color:'#fff',fontWeight:'bold'}}>Post information around your local area.</Text>
                            </View>
                       </View> */}
  <View style={{flexDirection:'row',marginLeft:0,marginTop:20}}>
                      
                            <View>
                            <Text style={{padding:10,paddingBottom:0,color:'#fff',fontWeight:'300',fontSize:18}}>{I18n.t("You will also be able to")}:</Text>
                            <Text style={{padding:10,paddingTop:0,color:'#fff',fontWeight:'300',fontSize:18}}>{I18n.t("Post information around your local area")}.</Text>
                            </View>
                       </View>

                       
                    </View>
                 

                </View>
               
            </View>
            </ImageBackground>
            </ScrollView>
            <TouchableOpacity onPress={()=>askLocation()}>
            <View style={{ position: 'absolute', bottom: 0, width: '90%', backgroundColor: '#fff', padding: 10, margin: 15,borderRadius:10 }}>
                    <Text style={{ color: '#6FA4E9', paddign: 10, textAlign: 'center' }}>{I18n.t("Next")}</Text>
            </View>
            </TouchableOpacity>
            <View style={{ position: 'absolute', bottom: 70,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                   <Text style={{color:'#fff',fontWeight:'300',textAlign:'center',marginLeft:50,fontSize:16}}>{I18n.t("You can change this later in settings app")}</Text>
                   </View>
</View>

    );

                    }
};

export default LocationInformationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
