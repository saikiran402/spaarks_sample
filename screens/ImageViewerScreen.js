import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Modal } from "react-native";
// import ImageViewer from "react-native-image-zoom-viewer";
const images = [
  {
    url: "https://placeimg.com/640/640/nature",
  },
  {
    url: "https://placeimg.com/640/640/people",
  },
  {
    url: "https://placeimg.com/640/640/beer",
  },
  {
    url: "https://placeimg.com/640/640/animals",
  },
  {
    url: "https://placeimg.com/640/640/people",
  },
  {
    url: "https://placeimg.com/640/640/animals",
  },

  {
    url: "https://placeimg.com/640/640/beer",
  },
];
const ImageViewerScreen = ({navigation}) => {

    function close(){
        console.log("In Close")
        navigation.goBack();
    }
  return (
    <View style={styles.container}>
      <Modal visible={true} transparent={false}>
        {/* <ImageViewer imageUrls={images} onSwipeDown={close} enableSwipeDown={true} onCancel={close} /> */}
      </Modal>
    </View>
  );
};

export default ImageViewerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
