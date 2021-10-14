import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Button, StyleSheet, Dimensions,ImageBackground,Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RNLocation from 'react-native-location';
import { ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../components/context';
import I18n from '../src/i18n';
const ExploreNearby = ({ navigation, route }) => {

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
            <ImageBackground source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAADRCAMAAAAquaQNAAAAA1BMVEX///+nxBvIAAAAR0lEQVR4nO3BMQEAAADCoPVP7WULoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuxZIAAeHuCGgAAAAASUVORK5CYII='}} resizeMode="cover" style={{height:Dimensions.get('window').height}}>
            <View style={{ flex: 1 }}>
                <View>
                   {/* <Text style={{position:'absolute',top:50,left:15,color:'#000'}}>{"Back"}</Text> */}
                   <View style={{padding:5,marginTop:0}}>
                        {/* <Text style={{color:'#000',padding:10,paddingLeft:5,color:'#63cdff',fontSize:16,fontWeight:'bold'}}>Explore Nearby</Text> */}
                        {/* <Text style={{color:'#000',padding:10,paddingLeft:5}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text> */}
                            <Image source={require('../assets/mapgif.gif')} style={{height:290,width:'100%',borderRadius:10}}/>
                        {/* <Text style={{color:'#000',padding:10,paddingLeft:5}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text> */}
                        </View>
                    <View style={{padding:5,marginTop:0}}>
                        <Text style={{color:'#000',padding:10,paddingLeft:5,textAlign:'center',color:'#63cdff',fontSize:16,fontWeight:'bold'}}>How Explore Works</Text>
                        <Text style={{color:'#000',padding:10,paddingLeft:5}}>For your spaark to be visible on the map, enable option below while creating a new spaark.
Useful for Sellers, Service givers, event location etc.</Text>
                            <Image source={require('../assets/mymap.png')} style={{height:90,width:'100%',borderRadius:10}}/>
                            </View>

                            


                </View>
               
            </View>
            </ImageBackground>
            </ScrollView>
            <TouchableOpacity onPress={()=>askLocation()}>
            <View style={{ position: 'absolute', bottom: 0, width: '90%', backgroundColor: '#63cdff', padding: 10, margin: 0,borderRadius:0,width:'100%' }}>
                    <Text style={{ color: '#fff', paddign: 10, textAlign: 'center' }}>{"Take me back to explore"}</Text>
            </View>
            </TouchableOpacity>
            <View style={{ position: 'absolute', bottom: 70,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                   {/* <Text style={{color:'#fff',fontWeight:'300',textAlign:'center',marginLeft:50,fontSize:16}}>{I18n.t("You can change this later in settings app")}</Text> */}
                   </View>
</View>

    );

                    }
};

export default ExploreNearby;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
