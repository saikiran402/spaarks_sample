


import React,{useRef,useEffect} from 'react';
import { View, Text, Button, StyleSheet,Dimensions,TouchableOpacity,Image } from 'react-native';
import { WebView } from 'react-native-webview';
import RBSheet from "react-native-raw-bottom-sheet";
import Slider from '@react-native-community/slider';
import I18n from '../src/i18n';
const FilterComponent = ({navigation,route }) => {
    const refRBsheettt = useRef();
    useEffect(()=>{
        alert('Inside')
        refRBsheettt.current.open()
    },[])

    const [sortBys, setSortBy] = useState(true)
    const [sortByString, setSortByString] = useState('Distance')
    const [sortedDistance, setsortedDistance] = useState(5);
    const [finalDistance, setFinalDistance] = useState(5);
    async function setSortBys(a) {
        if (a) {
          setSortBy(true)
          setSortByString('Distance')
        } else {
          setSortBy(false)
          setSortByString('Time')
        }
    
      }
    
      async function sortNow() {
        if (isConnected) {
          // alert('Sorting')
          setFinalDistance(sortedDistance)
          refRBsheettt.current.close()
          setOffsetWithin(2)
          setOffsetBeyond(2)
          setDataSourceWithin([])
          setDataSourceBeyond([])
          getDataWithinOnRefresh()
          getDataBeyondOnRefresh()
    
    
        } else {
          Snackbar.show({
            text: I18n.t('Check your internet'),
            duration: Snackbar.LENGTH_LONG
          });
        }
      }
    return (
      <View>
       <RBSheet
ref={refRBsheettt}
closeOnDragDown={true}
closeOnPressMask={true}
height={350}
borderRadius={0}
closeDuration={100}
customStyles={{
  draggableIcon: {
    backgroundColor: "#000",
  },
  container: {
    borderRadius: 0,
  },
}}
>
<View style={{ backgroundColor: "#fff", height: 330 }}>

  <Text style={{ marginLeft: 20, fontWeight: '500', fontSize: 20, paddingBottom: 14 }}>{I18n.t("Filter Spaarks by")}
    <Text style={{ color: '#6FA4E9' }}> {sortedDistance.toFixed(0)}Km
    </Text></Text>

  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingRight: 0, paddingLeft: 10 }}>
    <View style={{ flex: 1, justifyContent: 'center', marginTop: 10 }}>


      <Slider
        style={{ width: 350, height: 30 }}
        minimumValue={1}
        value={sortedDistance}
        onValueChange={setsortedDistance}
        maximumValue={5}
        minimumTrackTintColor="#6FA4E9"
        maximumTrackTintColor="#9597A1"
        step='1'
      />


    </View>

  </View>
  <View style={{ marginTop: 0 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, paddingRight: 9, paddingLeft: 9, margin: 10 }}>
      <Text>1km</Text>
      <Text>2km</Text>
      <Text>3km</Text>
      <Text>4km</Text>
      <Text>5km</Text>

    </View>
    <View
      style={{
        borderBottomColor: '#C0C0C0',
        borderBottomWidth: 1,
        width: 370,
        marginLeft: 10,
        marginRight: 10,
      }}
    />

  </View>
  <View>

    <View style={{ flexDirection: 'column', padding: 10 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 4 }} >
          <Text style={{ fontWeight: '500', fontSize: 16, left: 15 }}>{I18n.t("Nearest Spaarks")}</Text>
          <Text style={{ fontSize: 14, color: '#A1A4B2', left: 15, top: 6, fontWeight: '400' }}>{I18n.t("Spaarks are sorted by distance from you")}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => setSortBys(1)}>
            {
              sortBys ?
                <Image source={require('../assets/checked.png')} style={{ height: 40, width: 40 }} /> :
                <Image source={require('../assets/unchecked.png')} style={{ height: 40, width: 40 }} />
            }


          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: '#C0C0C0',
          borderBottomWidth: 1,
          width: 370,
          marginLeft: 10,
          marginRight: 10,
          margin: 10
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 4 }} >
          <Text style={{ fontWeight: '500', fontSize: 16, left: 15 }}>{I18n.t("Latest Spaarks")}</Text>
          <Text style={{ fontSize: 14, color: '#A1A4B2', left: 15, top: 6, fontWeight: '400' }}>{I18n.t("Spaarks are sorted by time of posting")}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => setSortBys(0)}>
            {
              sortBys ?
                <Image source={require('../assets/unchecked.png')} style={{ height: 40, width: 40 }} /> :
                <Image source={require('../assets/checked.png')} style={{ height: 40, width: 40 }} />
            }
          </TouchableOpacity>
        </View>
      </View>
    </View>




  </View>

  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <TouchableOpacity onPress={() => sortNow()}>
      <Button
        mode="contained"
        color="#6FA4E9"
        style={{
          height: 40,
          width: 300,
          margin: 10,
          marginTop: 10,

          marginBottom: 20
        }}

      >
        <Text style={{ color: '#fff' }}>{I18n.t("SORT")}</Text>
      </Button>
    </TouchableOpacity>
  </View>
</View>


</RBSheet>
        </View>
    );
};

export default FilterComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
