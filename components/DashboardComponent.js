import React, { useState, useEffect } from 'react';
import { Text,Button,ScrollView,ImageBackground, SafeAreaView, View,StyleSheet,Image,StatusBar, DevSettings, AsyncStorage,TextInput,Alert } from 'react-native';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import NewLead from './ScanScreen'
import NewInvoice from './NewInvoice'
import LoginComponent from './LoginComponent'
import ListData from "./ListData";
import * as Location from 'expo-location';
import HeaderDashboard from './HeaderDashboard'
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

const image1 = { uri: "https://res.cloudinary.com/spaarks/image/upload/v1613973414/1_c6eigo.png" };
const image2 = { uri: "https://res.cloudinary.com/spaarks/image/upload/v1613973414/2_xk7z2s.png" };
const image3 = { uri: "https://res.cloudinary.com/spaarks/image/upload/v1613973414/3_rz8x8b.png" };
const image4 = { uri: "https://res.cloudinary.com/spaarks/image/upload/v1613973415/4_s52qvz.png" };

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
      source={require('../assets/logo.png')}
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
export default function DashboardComponent() {
  state = {
    username: 'a',
    password: 'b',
    isLoggendin:false,
    completed:Math.floor(Math.random() * Math.floor(9)),
    pending:Math.floor(Math.random() * Math.floor(9)),
    issues:Math.floor(Math.random() * Math.floor(9)),
    invoice:Math.floor(Math.random() * Math.floor(9))

  };
 
  function LoginScreen(navigate) {
    return (
  
      <View style={styles.container}>
           
  
              <Image
        style={styles.tinyLogo}
        source={require('../assets/logo.png')}
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
      this.state.username = 'a',
      this.state.completed =Math.floor(Math.random() * Math.floor(9)),
      this.state.pending=Math.floor(Math.random() * Math.floor(9)),
      this.state.issues=Math.floor(Math.random() * Math.floor(9)),
      this.state.invoice=Math.floor(Math.random() * Math.floor(9))

    })();
  }, []);



 
function DashboardComponents(){
  this.state.isLoggendin = true
  this.state.password = 'b'
  this.state.username = 'a',
  this.state.completed =Math.floor(Math.random() * Math.floor(9)),
  this.state.pending=Math.floor(Math.random() * Math.floor(9)),
  this.state.issues=Math.floor(Math.random() * Math.floor(9)),
  this.state.invoice=Math.floor(Math.random() * Math.floor(9))
  return(
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>

    
{/* <HeaderDashboard></HeaderDashboard> */}
<ScrollView>
<View style={styles.bgcolor}>

        <View style={styles.body}>
        <Text h2 style={{textAlign:'left',color:"#000",paddingTop:10,paddingLeft:15}}>Dashboard</Text>
        <View
style={{
  margin:10,
  borderBottomColor: '#63CDFF',
  width:50,
  marginLeft:20,
  borderBottomWidth: 4,
}}
/>
<Text style={{textAlign:'left',color:"#000",paddingTop:10,paddingLeft:15}}>Today</Text>
       
       
       <View style={{justifyContent:'center',alignItems: 'center'}}>
        
          <View style={styles.rows1}>
       
       
       
       
          <ImageBackground source={image1} style={styles.image}>
          <View style={{ marginTop: 32,
  paddingHorizontal: 24,
  width:170,
  height:150,margin:10,borderRadius:20}}>
          <View style={{marginTop:30}}>
          <Text style={styles.sectionTitle}>{this.state.completed}</Text>
            <Text style={styles.sectionDescription}>
             Completed
            </Text>
            </View>
          </View>
          </ImageBackground>
          
          
          
          
          <ImageBackground source={image3} style={styles.image}>
          <View style={{ marginTop: 32,
  paddingHorizontal: 24,
  width:170,
  height:150,margin:10,borderRadius:20}}>
          <View style={{marginTop:30}}>
          <Text style={styles.sectionTitle}>{this.state.pending}</Text>
            <Text style={styles.sectionDescription}>
             Pending
            </Text>
            </View>
          </View>
          </ImageBackground>

          </View>



          </View>

          <View style={{justifyContent:'center',alignItems: 'center'}}>
          <View style={styles.rows2}>
       
          <ImageBackground source={image1} style={styles.image}>
          <View style={{ marginTop: 32,
  paddingHorizontal: 24,
  width:170,
  height:150,margin:10,borderRadius:20}}>
          <View style={{marginTop:30}}>
          <Text style={styles.sectionTitle}>{this.state.issues}</Text>
            <Text style={styles.sectionDescription}>
             Issues
            </Text>
            </View>
          </View>
          </ImageBackground>
          
             <ImageBackground source={image3} style={styles.image}>
          <View style={{ marginTop: 32,
  paddingHorizontal: 24,
  width:170,
  height:150,margin:10,borderRadius:20}}>
          <View style={{marginTop:30}}>
          <Text style={styles.sectionTitle}>{this.state.invoice}</Text>
            <Text style={styles.sectionDescription}>
             payment
            </Text>
            </View>
          </View>
          </ImageBackground>



          </View>
   </View>
          <View
style={{
  margin:10,
  borderBottomColor: '#f0f0f0',
  borderBottomWidth: 1,
}}
/>
          <View>
          <Text style={styles.sectionDescriptions}>
             Rules For BDA's
            </Text>
            <Text style={{padding:15}}>
            This is a Platform for users to connect to other users in their surroundings for a purpose. It wishes to build supportive, responsive and empowered communities. This application gives an opportunity for each user to be a producer and a consumer at the same time.
            </Text>
            
              <Text style={{padding:15}}> This is a Platform for users to connect to other users in their surroundings for a purpose. It wishes to build supportive, responsive and empowered communities. This application gives an opportunity for each user to be a producer and a consumer at the same time.
            </Text>
              <Text style={{padding:15}}> This is a Platform for users to connect to other users in their surroundings for a purpose. It wishes to build supportive, responsive and empowered communities. This application gives an opportunity for each user to be a producer and a consumer at the same time.

            </Text>
            <View>
            {/* <ListData></ListData> */}
     
            </View>
            <View>
</View>
          </View>

    
        </View>
        </View>
</ScrollView>

  

    </SafeAreaView>
  </>







  )
}
   state={
completed:Math.floor(Math.random() * Math.floor(9)),pending:Math.floor(Math.random() * Math.floor(9)),issues:Math.floor(Math.random() * Math.floor(9)),invoice:Math.floor(Math.random() * Math.floor(9))
    };
  return (

      <Tab.Navigator >
        <Tab.Screen name="Home" component={DashboardComponents}  options={{
            tabBarLabel: '',
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={
                  focused
                    ? require('../assets/bottomNav/Dashboard-1.png')
                    : require('../assets/bottomNav/Dashboard.png')
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
                  ? require('../assets/bottomNav/lead-1.png')
                  : require('../assets/bottomNav/lead.png')
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
                  ? require('../assets/bottomNav/Invoice-1.png')
                  : require('../assets/bottomNav/Invoice.png')
                }
                style={{
                  margin:15,
                  width: 32,
                  height: 32
                }}
              />
            ),
          }} />
      </Tab.Navigator>

    

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
  },
  rows1:{
    flex: 0, flexDirection: 'row',
    
  },
  image:{
    resizeMode: "cover",
    justifyContent: "center"
  },
  rows2:{
    flex: 0, flexDirection: 'row'
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    height:800
  },
  sectionContainercol:{
    marginTop: 32,
    paddingHorizontal: 24,
    width:200,
    height:100
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    padding:8,
    textAlign:'center',
    fontSize: 24,
    fontWeight: '600',
    color: "#ffffff",
    fontWeight:'700'
  },
  sectionDescription: {
    textAlign:'center',
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: "#ffffff",
  },

  sectionDescriptions:{
    textAlign:'center',
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
    bgcolor:{
        backgroundColor:"#f0f0f0",
        height:900
    }

});
