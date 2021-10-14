import React from 'react';
import { Dimensions } from 'react-native';
import { View, Text, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import I18n from 'i18n-js';
const KnowMoreRewardsScreen = ({navigation,route}) => {
    return (
      <>
      <ScrollView>
      <View>
        <Text style={{fontSize: 20, fontWeight: "bold", color:"#6FA4E9", padding:20}}>{I18n.t("How to earn Rewards")}</Text>
        <Text style={{fontSize: 15, color:"#000", marginTop: 30,left: 25 }}>1. {I18n.t("Ask a selleter to register in Spaarks")}.</Text>

        <Text style={{fontSize: 15, color:"#000", marginTop: 15,left: 25 }}>2. {I18n.t("Make the sellter post a Spaark about the service/product")}.</Text>
        <View style={{ justifyContent:"center", alignItems:"center", marginTop: 20}}>
        <Image source={require('../assets/steps/Group7607.png')} style={{height:170,width:220,resizeMode:'contain'}}placeholderStyle={{backgroundColor:'#fff'}}
                     />
        </View>
        <Text style={{fontSize: 15, color:"#000", marginTop: 15,left: 25 }}>3. {I18n.t("Spaark should have correct text and image")}</Text>
        <View style={{ justifyContent:"center", alignItems:"center", marginTop: 20}}>
        <Image source={require('../assets/steps/Group7639.png')} style={{height:200,width:150,resizeMode:'contain'}}placeholderStyle={{backgroundColor:'#fff'}}
                     />
        </View>
        <Text style={{fontSize: 15, color:"#000", marginTop: 15,left: 25 }}>4. {I18n.t("Add your UPI details in the Rewards section")}.</Text>
        <View style={{ justifyContent:"center", alignItems:"center", marginTop: 20}}>
        <Image source={require('../assets/steps/Group7638.png')} style={{height:170,width:220,resizeMode:'contain'}}placeholderStyle={{backgroundColor:'#fff'}}
                     />
        </View>
        <Text style={{fontSize: 15, color:"#000", marginTop: 15,left: 25 }}>5. {I18n.t("Scan seller's QR and get the scratch card")}.</Text>
        <View style={{ justifyContent:"center", alignItems:"center", marginTop: 20}}>
        <Image source={require('../assets/steps/Group7614.png')} style={{height:170,width:220,resizeMode:'contain'}}placeholderStyle={{backgroundColor:'#fff'}}
                     />
        </View>
        <Text style={{fontSize: 15, color:"#000", marginTop: 15,left: 25 }}>6. {I18n.t("Scratch the card to get your rewards")}.</Text>
        <View style={{ justifyContent:"center", alignItems:"center", marginTop: 20}}>
        <Image source={require('../assets/steps/Group7636.png')} style={{height:170,width:220,resizeMode:'contain'}}placeholderStyle={{backgroundColor:'#fff'}}
                     />
        </View>

        
      </View>
     
      </ScrollView>
      
      <TouchableOpacity onPress={()=>navigation.navigate('qrcodeScreen')}>
        <View style={{justifyContent:"center", alignItems:"center", marginTop: 20,}}>
 <View style={{position:'absolute',bottom:0,backgroundColor:'#6FA4E9',  width: 350, borderRadius:5, height: 40, justifyContent:"center",alignItems:'center',zIndex:1}}>
       <Text style={{color:'#fff',textAlign:'center',marginTop:5, fontWeight: "bold"}}>{I18n.t("START")}</Text>
     </View>
     </View>
     </TouchableOpacity>
      </>
    );
};

export default KnowMoreRewardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
