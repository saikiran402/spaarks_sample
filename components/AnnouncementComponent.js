import React from 'react';

import {Text,Header} from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

const AnnouncementComponent = () => {
return(
  // <Header style={{backgroundColor:"#63CDFF"}}
  // leftComponent={ <AntDesign name="bars" size={24} color="black" />}
  // centerComponent={{ text: 'Spaarks', style: { color: '#fff',fontSize:30 } }}
  // rightComponent={{ icon: 'home', color: '#fff' }}
  <View style={{backgroundColor:"fff"}}>
    <Text h3 style={{color:"#63CDFF",textAlign:'center',marginTop:40}}>Spaarks</Text>
  </View>
  

)

}


export default AnnouncementComponent;