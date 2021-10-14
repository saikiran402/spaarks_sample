import React, { useEffect,setState,useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
const refRBSheet = useRef();
const LoginToAccessScreen = () => {
    return (
      <View>
        <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height = {320}
        borderRadius={10}
        closeDuration={100}
        customStyles={{
          draggableIcon: {
            backgroundColor: "#000",
          },
          container:{
            borderRadius:30
          }
        }}
      >
<View style={{backgroundColor:"#fff",height:200}}>
    <View>
      <View >
        <View style={{flexDirection:'row',marginTop:20}}>
                <View style={{color:"#000",flex:1,marginLeft:20,}}>
                    <Image source={require('../assets/icons/bottomsheet/1.png')} style={{height:26,width:26}} ></Image>
                 </View>
                <View style={{color:"#000",flex:13,height:60}}>
                  <Text  style={{color:"#000",fontSize:16,margin:0, fontWeight:'bold',paddingLeft:40}}>Report Spaark</Text>
                  <Text style={{color:"#000",fontSize:14, flex:70,paddingLeft:40}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                  {/* line */}
                  <View
                  style={{
                    marginTop:0,
                    marginLeft:0,
                    marginRight:0,
                    borderBottomColor: '#C0C0C0',
                    borderBottomWidth: 1,
                  }}
                />
                </View>
         </View>
         <View style={{flexDirection:'row',marginTop:20}}>
                <View style={{color:"#000",flex:1,marginLeft:20,}}>
                    <Image source={require('../assets/icons/bottomsheet/2.png')} style={{height:26,width:26}} ></Image>
                 </View>
                <View style={{color:"#000",flex:13,height:60}}>
                  <Text  style={{color:"#000",fontSize:16,margin:0, fontWeight:'bold',paddingLeft:40}}>Block Tarkesh</Text>
                  <Text style={{color:"#000",fontSize:14, flex:70,paddingLeft:40}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                  {/* line */}
                  <View
                  style={{
                    marginTop:0,
                    marginLeft:0,
                    marginRight:0,
                    borderBottomColor: '#C0C0C0',
                    borderBottomWidth: 1,
                  }}
                />
                </View>
         </View>
         <View style={{flexDirection:'row',marginTop:20}}>
                <View style={{color:"#000",flex:1,marginLeft:20,}}>
                    <Image source={require('../assets/icons/bottomsheet/3.png')} style={{height:26,width:26}} ></Image>
                 </View>
                <View style={{color:"#000",flex:13,height:60}}>
                  <Text  style={{color:"#000",fontSize:16,margin:0, fontWeight:'bold',paddingLeft:40}}>Subscribe to Tarkesh</Text>
                  <Text style={{color:"#000",fontSize:14, flex:70,paddingLeft:40}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                  {/* line */}
                  
                </View>
         </View>
      </View>
    </View>

</View>
</RBSheet>

    
      </View>
    );

};

export default LoginToAccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
