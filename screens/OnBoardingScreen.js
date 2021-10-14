import React from 'react';

import { Dimensions, View,Text } from 'react-native';
const { width, height } = Dimensions.get('window');
onBubblePress = e => {
    const { isSelected, id } = e;
  
    // Do stuff to save the set the bubble as selected
  };
  const items = ["Option 1", "Option 2", "Option 3"].map(name => ({
    text: name,
    color: "#888888",
    textColor: "#ffffff",
    isSelected: false,
    id: name
  }));
   
  const PickerProps = Platform.select({
    android: {
      radius: 5,
      fontSize: 10
    },
    ios: {
      radius: 50,
      fontSize: 16
    }
  });
  
const OnBoardingScreen = () => {
  return (
<View></View>
/* <BubbleSelect
      onSelect={bubble => console.log('Selected: ', bubble.id)}
      onDeselect={bubble => console.log('Deselected: ', bubble.id)}
      width={width}
      height={height}
    >
      <Bubble id="bubble-1" text="Bubble One" />
      <Bubble id="bubble-2" text="Bubble Two" />
      <Bubble id="bubble-3" text="Bubble Three" />
      <Bubble id="bubble-4" text="Bubble Four" />
    </BubbleSelect> */

  );
};

export default OnBoardingScreen;


