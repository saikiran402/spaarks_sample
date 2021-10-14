import React from "react";
import { AnimatedCircles } from "../components/AnimatedCircles/AnimatedCircles.component2";
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import {Text} from 'react-native-elements';
import HeaderScreen from '../components/HeaderDashboard';
export default function PreferncesScreen2() {
  return (
    <View >
    <HeaderScreen></HeaderScreen>
<View style={styles.background}>

   

    <AnimatedCircles />
    <View style={{margin:20}}>
    <Text h3 style={{fontWeight:'700'}}>Find the right</Text>
    <Text h4></Text>
    <Text h4>Service for you to fit</Text>
    <Text h4></Text>
    <Text h5 style={{}}>Choose a service which suits you better</Text>
    
    </View>
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
    height:'100%',
    margin:0,
},
backgrounds:{
    height:'100%',
    margin:10,
    marginBottom:20
}

});