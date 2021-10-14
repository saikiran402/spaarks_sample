import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MyProfileScreen = () => {
    return (
      <View style={styles.container}>
        <Text>MyProfileScreen Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
