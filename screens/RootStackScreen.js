import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Text, Button, ScrollView, ImageBackground, SafeAreaView, View, StyleSheet, Image, StatusBar, DevSettings, TextInput, Alert } from 'react-native';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import PreferncesScreen from './PreferncesScreen';
import PreferencesScreen2 from './PreferencesScreen2';
import LanguageScreen from './LanguageScreen';
import I18n from "../src/i18n"
import DetailsScreen from './DetailsScreen';
import AskLocationScreen from './AskLocationScreen'
import GetMyLocation from "./GetMyLocationScreen";
import SelectCityScreen from "./SelectCityScreen";
import LocationInformationScreen from './LocationInformationScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator } from 'react-native-paper';

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation, route }) => {

    const [isPermitted, setIsPermitted] = useState(false)
    const initialLoginState = {
        isLoading: true,
        isLocationGiven:false
      };
    
    const loginReducer = (prevState, action) => {
        switch( action.type ) {         
            case 'SETLOCATIONSTATUS': 
            return {
              ...prevState,
              isLocationGiven: action.isLocationGiven,
              isLoading: false
            };
        }
      };
    const [locationState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    async function checkLocation() {
    //    alert(isPermitted)
       var isLocationPermitted = await AsyncStorage.getItem('isLocationPermitted');
        // alert(isLocationPermitted)
    //     setIsPermitted(Boolean(isLocationPermitted))
    //     alert(isPermitted)
    // alert(isLocationPermitted)
    dispatch({type:"SETLOCATIONSTATUS",isLocationGiven:Boolean(isLocationPermitted)})
    }
    useEffect(() => {
        checkLocation()
    }, [])

    if( locationState.isLoading) {
        return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large"/>
            <Text style={{margin:10}}>Getting Location for Better Experience...</Text>
          </View>
        );
      }else{
// alert('In'+locationState.isLocationGiven)
        return (

            <RootStack.Navigator headerMode='none'>
    
                {
                    locationState.isLocationGiven?
                    <>
                    
                     <RootStack.Screen name="SelectCityScreen" component={SelectCityScreen}
                    options={{
                        title: "Select City",
                        headerTintColor: '#6FA4E9',
                    }}
                   />
                    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
                <RootStack.Screen name="Language" component={LanguageScreen} options={{
                    title: "Change Language",
                    headerTintColor: '#6FA4E9',
                    //        headerLeft:()=>(
                    //          <Text style={{color:"#6FA4E9",fontSize:30,paddingLeft:20}}>{I("Spaarks")}</Text>
                    //        ),
                    //      headerRight: () => (
                    //        <View style={{flexDirection:'row'}}>
                    // <Image source={require('../assets/icons/t1.png')} style={styles.TopIcons}/><Image source={require('../assets/icons/t2.png')} style={styles.TopIcons}/><Image source={require('../assets/icons/t3.png')} style={styles.TopIcons}/>
                    // </View>
                    //  )
                }} />
                <RootStack.Screen name="PreferncesScreen" component={PreferncesScreen} />
                <RootStack.Screen name="PreferencesScreen2" component={PreferencesScreen2} />
                <RootStack.Screen name="AskLocationScreen" component={AskLocationScreen} />
                <RootStack.Screen name="LocationInformationScreen" component={LocationInformationScreen} />
                <RootStack.Screen name="GetMyLocation" component={GetMyLocation} options={{
                    title: "Select Location",
                    headerTintColor: '#6FA4E9',
                }} />
               
    
                <RootStack.Screen name="Home" component={DetailsScreen} options={{
                    title: "Change Language",
                    headerTintColor: '#6FA4E9',
                }} />
                    </>
                    :
                    <>
                        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
                <RootStack.Screen name="Language" component={LanguageScreen} options={{
                    title: "Change Language",
                    headerTintColor: '#6FA4E9',
                    //        headerLeft:()=>(
                    //          <Text style={{color:"#6FA4E9",fontSize:30,paddingLeft:20}}>{I("Spaarks")}</Text>
                    //        ),
                    //      headerRight: () => (
                    //        <View style={{flexDirection:'row'}}>
                    // <Image source={require('../assets/icons/t1.png')} style={styles.TopIcons}/><Image source={require('../assets/icons/t2.png')} style={styles.TopIcons}/><Image source={require('../assets/icons/t3.png')} style={styles.TopIcons}/>
                    // </View>
                    //  )
                }} />
                <RootStack.Screen name="PreferncesScreen" component={PreferncesScreen} />
                <RootStack.Screen name="PreferencesScreen2" component={PreferencesScreen2} />
                <RootStack.Screen name="LocationInformationScreen" component={LocationInformationScreen} />
                <RootStack.Screen name="AskLocationScreen" component={AskLocationScreen} />
                <RootStack.Screen name="GetMyLocation" component={GetMyLocation} options={{
                    title: "Select Location",
                    headerTintColor: '#6FA4E9',
                }} />
                <RootStack.Screen name="SelectCityScreen" component={SelectCityScreen}
                    options={{
                        title: "Select City",
                        headerTintColor: '#6FA4E9',
                    }}
                />
    
                <RootStack.Screen name="Home" component={DetailsScreen} options={{
                    title: "Change Language",
                    headerTintColor: '#6FA4E9',
                }} />
                    </>
                }
                
            </RootStack.Navigator>
        )
      }

}

export default RootStackScreen;