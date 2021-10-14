import * as React from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from 'react-native/Libraries/NewAppScreen';


function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center',backgroundColor:"#63CDFF", alignItems: 'center' }}>
      <Text style={{ backgroundColor:"#C047D8"}}>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center',backgroundColor:"#63CDFF", alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home"  component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );

}

class BottomNavigationBar extends React.Component {

  render(){

  return (
    <NavigationContainer >
      <MyTabs />
    </NavigationContainer>
  );

}

}
const styles = StyleSheet.create({
  BottomNavBar:{
    backgroundColor:"#63CDFF"
  }

});

export default BottomNavigationBar;