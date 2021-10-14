import React, { useEffect,useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Linking,
  SafeAreaView,
} from "react-native";
import I18n from "../src/i18n"
import AsyncStorage from '@react-native-community/async-storage';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import marker from "../assets/map_marker.png";
import { AuthContext } from '../components/context';
import { Alert } from "react-native";
const GetMyLocationScreen = ({ navigation, route }) => {
  const { onBoarded } = React.useContext(AuthContext);
const [isLoggedIn,setIsLoggedIn] = useState(false)
async function setIsLoggedIns(){
  onBoardeds = await AsyncStorage.getItem('onBoarded');

  setIsLoggedIn(Boolean(onBoardeds))
}
useEffect(()=>{
setIsLoggedIns()
},[])

  async function updateLocation(token){

   await axios.post(
     GLOBAL.BASE_URL + "user/location",
     {
       latitude:data.latitude,
       longitude:data.longitude,
       place:"ios"
     },
     {
       headers: {
         "Content-Type": "application/json",
         Authorization:
         'Bearer '+token
       },
     }
   )
     .then((respo) => {
      alert('done')
  
     })
     .catch((error) => {
       console.error("update location error",error);
     });
  
     
   }
   
  async function nextClicked(){
    console.log("Location",data)
    await AsyncStorage.setItem('isLocationPermitted', String(true));
    await AsyncStorage.setItem('latitude', String(data.latitude));
    await AsyncStorage.setItem('longitude', String(data.longitude));
    await AsyncStorage.setItem('fromMockProvider', String(false));
    var token  = await AsyncStorage.getItem('token');
    // alert(onBoardeds)

    if(String(token)!="null"){
      updateLocation(token)
      navigation.popToTop()
      navigation.navigate('All')
    }else{
      onBoarded([])
    }

  }
  const initialMapState = {
    myLat: {
      coordinate: {
        latitude: 17.4193,
        longitude: 78.4485,
      },
    },
    region: {
      latitude: route.params.lat,
      longitude: route.params.lon,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const _map = React.useRef(null);
  const [state, setState] = React.useState(initialMapState);
  const [data, setData] = React.useState(null);
  const onRegionChange = (region) => {
    setData(region);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerregion}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: "#fff" }}
        >
          <Text style={{textAlign:'center'}}>
            {I18n.t("Help us with your location in")} {route.params.city}
          
          </Text>
          <Text style={{ color: "#6FA4E9",textAlign:'center' }}> {I18n.t("Change")}</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        // provider={PROVIDER_GOOGLE}
        onRegionChangeComplete={onRegionChange}
      >


        <Image style={styles.marker} source={marker} />
<View>
{
isLoggedIn?
<>
<Text style={{ backgroundColor: '#6FA4E9',color: '#fff', padding: 10,margin:10,
              top: Dimensions.get('window').height/2+50,
              textAlign:'center' }} onPress={()=>{nextClicked()}}>
                {I18n.t("Continue")}
              </Text>
</>:
<>
<Text style={{ backgroundColor: '#6FA4E9',color: '#fff', padding: 10,margin:10,
              top: Dimensions.get('window').height/2+170,
              textAlign:'center' }} onPress={()=>{nextClicked()}}>
                {I18n.t("Continue")}
              </Text>
</>
}
          
</View>

      </MapView>


    </View>
  );
};

export default GetMyLocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    height: 48,
    width: 48,
    left: '45%',
    top: '40%'
  },
  header: {
    backgroundColor: "#fff",
    marginTop: 0,
    width: "100%",
  },
  headerregion: {
    color: "#000",
    marginTop: 20,
    fontWeight: "bold",
    lineHeight: 20,
    margin: 10,
    width: "100%",
  },
});
