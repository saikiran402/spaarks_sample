import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PostSpecificOnClickScreen = ({navigation,route}) => {
    return (
     <View style={styles.container}>
         <Text>Hiii</Text>
     </View>
    );
};

export default PostSpecificOnClickScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
