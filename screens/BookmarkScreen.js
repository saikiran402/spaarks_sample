import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const BookmarkScreen = ({navigation,route}) => {
    return (
      <WebView source={{ uri: route.params.url }} />
    );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
