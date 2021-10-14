import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ScratchView from 'react-native-scratch'

const ScratchCardScreen = ({navigation,route}) => {

    const ComponentA = () =>{
        return(
            <View></View>
        )
    }
    const ComponentB = () =>{
        return(
            <View></View>
        )
    }
    onImageLoadFinished = ({ id, success }) => {
       console.log("onImageLoadFinished")
        // Do something
    }
 
     onScratchProgressChanged = ({ value, id }) => {
        // Do domething like showing the progress to the user
        console.log("onScratchProgressChanged")
    }
 
     onScratchDone = ({ isScratchDone, id }) => {
        console.log("onScratchDone")
        // Do something
    }
 
    const onScratchTouchStateChanged = ({ id, touchState }) => {
        // Example: change a state value to stop a containing
        // FlatList from scrolling while scratching
        this.setState({ scrollEnabled: !touchState });
    }
    return (
     <View>
           <ComponentA/>
            <ComponentB/> 
       <ScratchView
                id={1} // ScratchView id (Optional)
                brushSize={10} // Default is 10% of the smallest dimension (width/height)
                threshold={70} // Report full scratch after 70 percentage, change as you see fit. Default is 50
                fadeOut={false} // Disable the fade out animation when scratch is done. Default is true
                placeholderColor="#AAAAAA" // Scratch color while image is loading (or while image not present)
                imageUrl="http://yourUrlToImage.jpg" // A url to your image (Optional)
                resourceName="your_image" // An image resource name (without the extension like '.png/jpg etc') in the native bundle of the app (drawble for Android, Images.xcassets in iOS) (Optional)
                resizeMode="cover|contain|stretch" // Resize the image to fit or fill the scratch view. Default is stretch
                onImageLoadFinished={this.onImageLoadFinished} // Event to indicate that the image has done loading
                onTouchStateChanged={this.onTouchStateChangedMethod} // Touch event (to stop a containing FlatList for example)
                onScratchProgressChanged={this.onScratchProgressChanged} // Scratch progress event while scratching
                onScratchDone={this.onScratchDone} // Scratch is done event
            />
     </View>
    );
};

export default ScratchCardScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
