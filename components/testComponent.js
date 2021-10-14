import React, { useState, useEffect } from 'react';
import { Text,Button, View,StyleSheet,Image, DevSettings, AsyncStorage,TextInput,Alert } from 'react-native';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardComponent from './components/DashboardComponent'
import NewLead from './components/ScanScreen'
import NewInvoice from './components/NewInvoice'
import LoginComponent from './components/LoginComponent'
import ListData from "./components/ListData";
import * as Location from 'expo-location';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();
const MyTheme = {
  dark: false,
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#63cdff',
    backgroundColor:"#1C2031"
  }
};
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Comming Soon!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();
function LoginScreen(navigate) {
  return (

    <View style={styles.container}>
         

            <Image
      style={styles.tinyLogo}
      source={require('./assets/logo.png')}
    />

      <TextInput
       
        onChangeText={(username) => this.setState({ username:username })}
        placeholder={'Username'}
        style={styles.input}
      />
      <TextInput
        onChangeText={(password) => this.setState({ password:password })}
        placeholder={'Password'}
        secureTextEntry={true}
        style={styles.input}
      />
      
  

<Button
     title={'Login'}
type="solid"
style={{marginBottom:0}}
onPress={this.onLogin}
/>
    </View>
  );
}



  
function onLogin(navigation) {
 
  const { username, password } = this.state;
  console.log(username,password)
  if(username=='a' && password =='b'){
    Alert.alert('Credentials', `${username} + ${password}`);
    navigation.navigate('Home')
  }
  // navigation.navigate('DashboardComponent')

  
}
export default function App() {
  state = {
    username: 'a',
    password: 'b',
    isLoggendin:false
  };
  function LoginScreen(navigate) {
    return (
  
      <View style={styles.container}>
           
  
              <Image
        style={styles.tinyLogo}
        source={require('./assets/logo.png')}
      />
  
        <TextInput
         
         
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
         
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
    
  
  <Button
       title={'Login'}
  type="solid"
  style={{marginBottom:0}}
  onPress={onLogin}
  />
      </View>
    );
  }

  

//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
    //   let { status } = await Location.requestPermissionsAsync();
    //   if (status !== 'granted') {
    //     setErrorMsg('Permission to access location was denied');
    //     return;
    //   }

    //   let location = await Location.getCurrentPositionAsync({});
    //   console.log("Coordinates",location)
    //   setLocation(location);
      this.state.isLoggendin = true
      this.state.password = 'b'
      this.state.username = 'a'
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

 

  
  return (
    this.state.isLoggendin?
    <NavigationContainer theme={MyTheme} style={styles.BottomNav}>
      <Tab.Navigator >
        <Tab.Screen name="Home" component={DashboardComponent}  options={{
            tabBarLabel: '',
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={
                  focused
                    ? require('./assets/bottomNav/Dashboard-1.png')
                    : require('./assets/bottomNav/Dashboard.png')
                }
                style={{
                  margin:15,
                  width: 36,
                  height: 32
                }}
              />
            ),
          }} />
        <Tab.Screen name=" Lead" component={NewLead} options={{
            tabBarLabel: '',
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={
                  focused
                  ? require('./assets/bottomNav/lead-1.png')
                  : require('./assets/bottomNav/lead.png')
                }
                style={{
                  margin:15,
                  width: 24,
                  height: 31
                }}
              />
            ),
          }}  />
        <Tab.Screen name=" Invoice" component={NewInvoice} options={{
            tabBarLabel: '',
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={
                  focused
                  ? require('./assets/bottomNav/Invoice-1.png')
                  : require('./assets/bottomNav/Invoice.png')
                }
                style={{
                  margin:15,
                  width: 32,
                  height: 32
                }}
              />
            ),
          }} />
      </Tab.Navigator></NavigationContainer>:
          <NavigationContainer theme={MyTheme} style={styles.BottomNav}>
        <Stack.Navigator initialRouteName="Spaarks">
        <Stack.Screen name="Spaarks" component={LoginScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
      </NavigationContainer>
    

  );
}



const styles = StyleSheet.create({
  BottomNav:{
    flex: 0, flexDirection: 'row',
    backgroundColor:"#63CDFF"
  },

  LoginComponent:{
    height:500,
    width:100,
    margin:50
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop:250,
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  tinyLogo:{
    flex: 0,
    height:120,
    width:120,
    margin:20
  }

});