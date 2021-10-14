import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import I18n from "../src/i18n"
const FullPostScreen = () => {
    return (
      <View style={styles.container}>
        <Text>{I18n.t("Settings Screen")}</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default FullPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
