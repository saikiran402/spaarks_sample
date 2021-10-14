import React from 'react';
import { StyleSheet, View, Dimensions,Text,TouchableOpacity,Linking } from 'react-native';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = 0.00094324;
const LATITUDE_DELTA = 0.000922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const markerIDs = ['Marker1', 'Marker2'];
const timeout = 2000;
let animationTimeout;

class MarkersScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('HEHEHEHEHEHHEHEHEHEH',props)

    this.state = {
      a: {
        // 17.4080503,78.4435977
        latitude: 17.4080503,
        longitude: 78.4435977,
      },
      b: {
        latitude: props.latitude,
        longitude: props.longitude,
      },
    //   c: {
    //     latitude: LATITUDE - SPACE * 2,
    //     longitude: LONGITUDE - SPACE * 2,
    //   },
    //   d: {
    //     latitude: LATITUDE - SPACE * 3,
    //     longitude: LONGITUDE - SPACE * 3,
    //   },
    //   e: {
    //     latitude: LATITUDE - SPACE * 4,
    //     longitude: LONGITUDE - SPACE * 4,
    //   },
    };
  }

  componentDidMount() {
    animationTimeout = setTimeout(() => {
      this.focus1();
    }, timeout);
  }

  componentWillUnmount() {
    if (animationTimeout) {
      clearTimeout(animationTimeout);
    }
  }

  focusMap(markers, animated) {
    console.log(`Markers received to populate map: ${markers}`);
    this.map.fitToSuppliedMarkers(markers, animated);
  }

  focus1() {
    animationTimeout = setTimeout(() => {
      this.focusMap([markerIDs[0], markerIDs[1]], true);
      this.focus2();
    }, timeout);
  }

  focus2() {
    animationTimeout = setTimeout(() => {
      this.focusMap([markerIDs[1], markerIDs[0]], false);
      this.focus1();
      // this.focus2();
    }, timeout);
  }

//   focus3() {
//     animationTimeout = setTimeout(() => {
//       this.focusMap([markerIDs[1], markerIDs[2]], false);

//       this.focus4();
//     }, timeout);
//   }

//   focus4() {
//     animationTimeout = setTimeout(() => {
//       this.focusMap([markerIDs[0], markerIDs[3]], true);

//       this.focus1();
//     }, timeout);
//   }

  render() {
    return (
      <View style={styles.container}>
          <Text>Viewing <Text style={{color:'#6FA4E9'}}>{this.props.name}</Text>'s Spaark</Text>
        <MapView
          provider={this.props.provider}
          ref={ref => {
            this.map = ref;
          }}
          style={styles.map}
          initialRegion={{
            latitude: 17.4080503,
            longitude: 78.4435977,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          onLayout={() => { this.mark.showCallout(); }}
        >
         
          <Marker  identifier="Marker1" ref={ref => { this.mark = ref; }} pinColor={"blue"} title={"Your Location"} identifier={"Your Location"} coordinate={this.state.a} />
          {/* <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=17.3487534,78.345345`)
             } style={{ backgroundColor: "#fff" }}> */}
          <Marker identifier="Marker2" ref={ref => { this.mark = ref; }} pinColor={"red"} title={this.props.name+"'s location"} coordinate={this.state.b} />
          {/* </TouchableOpacity> */}
        </MapView>
      </View>
    );
  }
}

MarkersScreen.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MarkersScreen;