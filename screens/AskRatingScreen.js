import React from 'react';
import { View, Text, Button, StyleSheet,TextInput } from 'react-native';
import I18n from '../src/i18n';
const AskRatingScreen = ({navigation,route}) => {


    submitRating = () =>{
        
    }
    return (
      <View>

 <View >
          <View>
          <Text style={{color:'#A1A4B2',fontWeight:'bold'}}>{I18n.t("Rate Service Provider/Seller")}</Text>
          <View
  style={{
    borderBottomColor: '#A1A4B2',
    borderBottomWidth: 1,
    marginBottom:10
  }}
/>
            <Image source={{uri:route.params.rating.uid.profilePic}} style={{height:70,width:70,borderRadius:30}}/>
             {/* <Chip
                                  style={{
                                    alignSelf: 'center',
                                    backgroundColor: '#F30E5C',
                                  }}
                                >
                                  
                                </Chip> */}
                                <Text style={{fontWeight:'bold'}}>
                                {route.params.rating.uid.name}
                                </Text>
                                <View  style={{
                                    alignSelf: 'center',
                                    backgroundColor: '#F30E5C',
                                    borderRadius:10,padding:10,
                                    marginTop:5
                                  }}>
                                  <Text
                                    style={{
                                      color: "#fff",
                                      marginTop: 0,
                                      fontSize: 10,
                                    }}
                                  >
                                    {route.params.rating.subCategory}
                                  </Text>
                                </View>
              <TextInput
                          style={{
                            height: 80,
                            width: 250,
                            borderColor: "#D7D7D7",
                            color: "#848484",
                            borderWidth: 0.5,
                            borderRadius: 20,
                            padding: 10,
                            margin: 10,
                            fontSize: 18,
                          }}
                          // Adding hint in TextInput using Placeholder option.
                          placeholder="Write Review"
                          // Making the Under line Transparent.
           
                          onChangeText={submitRating}
                          underlineColorAndroid="transparent"
                        />
          </View>
        </View>
       
      </View>
    );
};

export default AskRatingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});



     