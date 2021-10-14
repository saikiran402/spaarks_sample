import React from "react";
import Animated from "react-native-reanimated";
import { View,Text, StyleSheet,TouchableOpacity } from 'react-native';
export const circleDiameter = 150;
const circleRadius = circleDiameter / 2;
var state = {
  counter:0,
  showNext:false
}
export const Circle = ({translateX, translateY,Color,nameInside,count,navigation }) => {
if(count==0){
  state.counter = 0;
}
function getName(a){
  console.log("In component")
console.log(state.counter)
  state.counter++;
if(state.counter==3){
  state.showNext = true
}
}
  return (
    <View style={{marginRight:200}}>

        <View >
    <Animated.View
      style={{
        transform: [{ translateX }, { translateY }],
        position: "absolute",
        width: circleDiameter,
        height: circleDiameter,
        borderRadius: circleRadius,
        backgroundColor: Color
      }}
    ><Text h3 style={{paddingLeft:40,paddingTop:70 ,color:"#fff",fontSize:20,fontWeight:"bold"}}>{nameInside}</Text></Animated.View>
    </View>

    </View>
    
  );
};
