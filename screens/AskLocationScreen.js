import React,{useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import RNLocation from 'react-native-location';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../components/context';
import I18n from '../src/i18n';
const AskLocationScreen = ({navigation,route}) => {
  const { onBoarded } = React.useContext(AuthContext);
  RNLocation.configure({
    distanceFilter: 5.0
  })
  const [location,setLocation] = useState(null)
  RNLocation.requestPermission({
    ios: "whenInUse",
    android: {
      detail: "coarse"
    }
  }).then(granted => {
      if (granted) {

        console.log("Allowed")
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(async locations => {
          
          setLocation(JSON.stringify(locations))
          await AsyncStorage.setItem('latitude', String(locations.latitude));
          await AsyncStorage.setItem('longitude', String(locations.longitude));
          await AsyncStorage.setItem('fromMockProvider', String(locations.fromMockProvider));
          onBoarded(route.params.preferences)
          /* Example location returned
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
        navigation.navigate('SelectCityScreen',{preferences:route.params.preferences})
      }
    })
    return (
     <View style={styles.container}>
       <Text>{I18n.t("Spaarks connects you to your local area wherever you go")}</Text>
       <Text style={{fontWeight:'bold',marginTop:20}}>{I18n.t("Fetching posts in your neighbourhood for better experience")}</Text>
     </View>
    );
};

export default AskLocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});


// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const AskLocationScreen = ({navigation,route}) => {
//     return (
//       <View style={styles.container}>
//         <Text>Hii</Text>
//       </View>
//     );
// };

// export default AskLocationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     alignItems: 'center', 
//     justifyContent: 'center'
//   },
// });
