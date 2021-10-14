import React, { useEffect,useState } from 'react';
import { View, Text, Button, StyleSheet,Dimensions } from 'react-native';
// import {
//     LineChart,
//     BarChart,
//     PieChart,
//     ProgressChart,
//     ContributionGraph,
//     StackedBarChart
//   } from "react-native-chart-kit";
// import { ScrollView } from 'react-native-gesture-handler';
// import MapView, { Marker, ProviderPropType,Circle } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = 0.00094324;
const LATITUDE_DELTA = 0.2000922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const markerIDs = ['Marker1', 'Marker2'];
const timeout = 2000;
const screenWidth = Dimensions.get("window").width;
const MyPollsScreen = ({navigation,route }) => {
const [chartData,setChartData] = useState([])
async function constructData(){
  console.log(route.params.pollOptions)
  var da  = [];
  route.params.pollOptions.forEach(list=>{
    var a = {
      name: list.option,
      votes: list.votePercentage,
      // color: "rgba(131, 167, 234, 1)",
      color:'#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    };
    da.push(a)
  })

  setChartData(da)
}
  useEffect(()=>{
    constructData()
  },[])
    let state = {
        a: {
          // 17.4080503,78.4435977
          latitude: 17.4080503,
          longitude: 78.4435977,
        },
        b: {
            latitude: 17.4080503,
            longitude: 78.4435977,
        }
    };
    const chartConfig = {
        backgroundGradientFrom: "#6FA4E9",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(111, 164, 233, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    const data = [
        {
          name: "A",
          population: 21500000,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "B",
          population: 2800000,
          color: "blue",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "C",
          population: 527612,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "D",
          population: 8538000,
          color: "green",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }
      ];
    return (
        <ScrollView>
      <View style={{height: Dimensions.get('window').height}}>
        <View style={{position:'absolute',top:10,left:10,backgroundColor:'#fff'}}>
          <Text style={{color:'#cd 000',fontSize:18,fontWeight:'600'}}>{route.params.question}</Text>         
           {/* <Text style={{color:'#cd 000',fontSize:14,fontWeight:'400',marginTop:10}}>Poll Stats</Text> */}
        </View>  



<View style={{margin:10,marginRight:50,flex:1}}>
<View style={{margin:10,marginTop:50}}>
<Text style={{textAlign:'center'}}>Votes By color</Text>
{/* <PieChart
  data={chartData}
  width={screenWidth}
  height={250}
  chartConfig={chartConfig}
  accessor={"votes"}
  backgroundColor={"transparent"}
  center={[5, 0]}
//   absolute
/> */}
</View>

{/* <View>
    <Text style={{textAlign:'center'}}>Representation by Calender</Text>
<ContributionGraph
  values={commitsData}
  endDate={new Date("2021-10-14")}
  numDays={105}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
/>
</View> */}
<View>
<Text style={{textAlign:'center'}}>Representation of Votes on Map ( Approx )</Text>
    <View style={{flex:1}}>
{/* 
    <MapView
        //   provider={this.props.provider}
          ref={ref => {
           map = ref;
          }}
          style={styles.map}
          initialRegion={{
            latitude: 17.4080503,
            longitude: 78.4435977,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        //   onLayout={() => { this.mark.showCallout(); }}
        >
            <Circle center={{
        latitude: 17.4080503,
        longitude: 78.4435977,
      }} radius={5000} 
      strokeWidth={0.5}
                strokeColor={'#448AFF'}
                fillColor={"#b3d9ff80"}
                color="#0080FF80"
      />
        </MapView> */}
    </View>

</View>
</View>
        </View>
        </ScrollView>
    );
};

export default MyPollsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height:250,
    width:Dimensions.get('window').width
  },
});
