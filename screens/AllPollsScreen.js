import React, { useEffect,useState } from 'react';
import { View, Text, Button, StyleSheet,Dimensions,TouchableOpacity,FlatList } from 'react-native';
import I18n from '../src/i18n';
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
const GLOBAL = require('../Globals');
import moment from "moment";
const AllPollsScreen = ({navigation,route }) => {
    const [mypolls,setMyPolls] = useState([])
async function getData(){
            var tokenJWT = await AsyncStorage.getItem('token');
            await axios.get(GLOBAL.BASE_URL+"user/pollPosts/myPolls",
        {
            headers: {
                "Content-Type": "application/json",
                Authorization:
                'Bearer '+tokenJWT
            }
            }
        ).then((resp) => {

        console.log(resp.data.posts)
        setMyPolls(resp.data.posts)
        }).catch((err)=>{
            console.log('ERROR',err)
        })
}

    useEffect(()=>{
        getData()
    },[])
    const renderPreviosTickets = ({ item,index }) => {
        return (

            <TouchableOpacity onPress={() => { navigation.navigate('MyPollsScreen',{question:`${item.pollQuestion}`,pollOptions:item.pollOptions})}}>
                <View style={{ backgroundColor: `#fff`, padding: 15,margin:10,borderRadius:10,marginBottom:0 }}  >
                    <View style={{ flexDirection: "row" }}  >
                        <Text style={{ flex: 1, fontWeight: "600",fontSize:14 }}>Q{index+1} . {item.pollQuestion}</Text>
                        <View style={{ backgroundColor: item.condition == 'Ongoing'?'#4BB543':"#FF0000", borderRadius: 20, padding: 5,height:10,width:10 }} >
                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    {
                        item.condition == 'Ongoing'?
                        <Text>
                        {
                            Math.max.apply(Math, item.pollOptions.map(function(o) { return o.votePercentage; })) == 0? "No Votes yet":
                            <Text style={{ paddingTop: 0 }} numberOfLines={2}>{String(item.pollOptions.reduce(function(prev, current) {
                                return (current.votePercentage < prev.votePercentage ) ? prev.option : current.option
                            }))} - <Text style={{fontWeight:'bold'}}>{Math.max.apply(Math, item.pollOptions.map(function(o) { return o.votePercentage; }))}%</Text></Text>
                        }
                 </Text>
                 :
                 <></>
                    }
                    </View>
                    <View
                        style={{
                            margin:2,
                            borderBottomColor: "#EAEAEA",
                            borderBottomWidth: 0.2,
                        }}
                    />
                    {
                        item.condition == 'Ongoing'?
                        <Text style={{ paddingTop: 0,fontSize:12 }} numberOfLines={2}>{moment(item.poll_expires_on).fromNow().includes('ago')?'Expired':'Expires '+moment(item.poll_expires_on).fromNow()}</Text>
                        :
                        <Text style={{ paddingTop: 0,fontSize:12 }} numberOfLines={2}>Expired</Text>

                    }
                 
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView>
        <View style={{ backgroundColor: '#f2f2f2',height:Dimensions.get('window').height }}>

            {[1,2].length > 0 ?
                <>
                    <Text style={{ fontWeight: 'bold', padding: 20, fontSize: 20, paddingBottom: 0 }}>{I18n.t('My Polls')}</Text>
                    <FlatList data={mypolls}
                        renderItem={renderPreviosTickets} />
                </>
                : <></>
            }
           
            {/* <FlatList data = {ContactUs} renderItem= {renderContactUs} /> */}

        </View>
    </ScrollView> 
    );
};

export default AllPollsScreen;

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
