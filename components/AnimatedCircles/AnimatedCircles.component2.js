import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useGravityAnimation } from "./useGravityAnimation.hook";
import { Circle } from "./Circle.component";
var randomHexColor = require('random-hex-color')
const S = StyleSheet.create({
  flex: { flex: 1 },
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    margin:0
  }
});

export function AnimatedCircles() {
  const [viewDimensions, setViewDimensions] = useState(undefined);
  const handleLayout = useCallback(event => {
    const { width, height } = event.nativeEvent.layout;
    setViewDimensions({ width, height });
  }, []);

  const isCanvasReady = viewDimensions !== undefined;

  return (
    <View style={S.flex} onLayout={handleLayout}>
      {isCanvasReady && (
        <AnimatedCirclesInner
          dimensions={viewDimensions}
        ></AnimatedCirclesInner>
      )}
    </View>
  );
}
const names = ['Driver','Car wash','Dance Teacher','Maid/Cook','Gym Coach','Ditecian','Vet','AutoKickshaw','Car Hire','Beauty Parlour']
export function AnimatedCirclesInner({ dimensions }) {
  const circles = useGravityAnimation(dimensions);

  return (
    <View style={S.wrap}>
      {circles.map((p, index) => {
        return <Circle key={index} translateX={p.x} translateY={p.y} Color={randomHexColor()} nameInside={names[index]} count={index} />;
      })}
      
    </View>
  );
}
