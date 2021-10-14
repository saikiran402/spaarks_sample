import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import axios from "axios"
import { Chip } from 'react-native-paper';
import { RESULTS } from 'react-native-permissions';
import I18n from '../src/i18n';

import moment from "moment"
const GLOBAL = require('../Globals');
import chatReducers from "../reducers/chatReducers";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect, useDispatch, useReducer } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
const dataArray = [
    { title: "First Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];

const ContactUs = [
    {
    contactReason : "Payment Related issue ?"
   
    }, 
    {
     contactReason : "Do you require any assistance?",
    InfoToResolve : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis mi sed tincidunt elementum ornare ut arcu, pharetra. Ac risus, ultricies venenatis hendrerit velit auctor urna"
        },
        {
            contactReason :"Are you facing any problem with application?",
            InfoToResolve : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis mi sed tincidunt elementum ornare ut arcu, pharetra. Ac risus, ultricies venenatis hendrerit velit auctor urna"
            },
            {
                contactReason : "Others",
                InfoToResolve : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis mi sed tincidunt elementum ornare ut arcu, pharetra. Ac risus, ultricies venenatis hendrerit velit auctor urna"
                }
    
]
const HelpScreen = ({ navigation, route,token,Mytickets }) => {
    const Chatdispatcher = useDispatch(chatReducers);
    const [tickets, setTickets] = useState([])

    const getTickets = async () => {
        var jwt = await AsyncStorage.getItem('token')
        await axios.get(`${GLOBAL.BASE_URL}ticket/help`, {
            headers: {
                "Content-Type": "application/json",
                Authorization:
                'Bearer '+jwt
            },
        }).then((res) =>{
 
                setTickets(res.data)
                Chatdispatcher({type:'UPDATEMYTICKETS',Mytickets:res.data})
              
            }).catch(err => console.log(err))

        console.log("Tickets", tickets)
    }

    useEffect(() => {
        getTickets()
    }, [])



    const renderPreviosTickets = ({ item }) => {
        return (

            <TouchableOpacity onPress={() => { navigation.navigate('TicketSpecificScreen', { ticket: item }) }}>
            {/*  <TouchableOpacity onPress={() => { console.log("ticketsssss", item.thread) }}>  */}

                <View style={{ backgroundColor: `#fff`, padding: 10,margin:5,borderRadius:10 }}  >
                    <View style={{ flexDirection: "row" }}  >
                        <Text style={{ flex: 1, fontWeight: "600",fontSize:12 }}>{I18n.t(item.subject)}</Text>
                        <View style={{ backgroundColor: item.status == 'Open'?'#4BB543':"#FF0000", borderRadius: 10, padding: 5 }} >
                            <Text style={{ flex: 1, color: "white" }}>{I18n.t(item.status)}</Text>
                        </View>
                    </View>
                    <Text style={{ color: "#7B8794" }}>{moment(item.createdAt).calendar()}</Text>
                    <Text style={{ paddingTop: 5 }} numberOfLines={2}><Text style={{ fontWeight: "500" }}>{item.thread[0].isUser ? I18n.t("You") : I18n.t('Team spaarks')} </Text  >:  {item.thread[0].content}</Text>

                    <View
                        style={{
                            marginTop: 5,
                            marginLeft: 0,
                            marginRight: 0,
                            borderBottomColor: "#EAEAEA",
                            borderBottomWidth: 0.2,
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    const renderContactUs = ({item}) => {
        return ( <>
           
           <View style={{ margin: 10, marginTop: 0, padding: 15, backgroundColor: '#fff', borderRadius: 15 }}>
                    
                           
                            <TouchableOpacity onPress={() => { navigation.navigate('CreateNewTicketScreen',{subject:item.contactReason}) }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: '500', marginTop: 9 }}>{I18n.t(item.contactReason)}</Text>
                                </View>
                                <View style={{ flex: 0 }}>
                                    <Image source={require('../assets/icons/down_arrow.png')} style={{ height: 35, width: 35 ,transform : [{rotate : "270deg" }]}}></Image>
                                </View>
                            </View>
                                </TouchableOpacity>
                               
                        
                </View>

                </>
        )
    }
    return (
        <ScrollView>
            <View style={{ backgroundColor: '#f2f2f2' }}>

                {tickets.length > 0 ?
                    <>
                        <Text style={{ fontWeight: 'bold', padding: 20, fontSize: 20, paddingBottom: 0 }}> {I18n.t('Previous Tickets')}    </Text>
                        <FlatList data={[...Mytickets]}
                            renderItem={renderPreviosTickets} />
                    </>
                    : <></>
                }
                <Text style={{ fontWeight: 'bold', padding: 20, fontSize: 20, paddingBottom: 0 }}>{I18n.t("Contact_Us")}</Text>
                <FlatList data = {ContactUs} renderItem= {renderContactUs} />

            </View>
        </ScrollView> 
    );
};



const mapStatetoProps = (state) => {
    // const { }=state
    
    return {
      chat_roster_main: state.chatss.chat_roster_main,
          allMapPosts:state.chatss.allMapPosts,
          token:state.chatss.token,
          Mytickets:state.chatss.Mytickets
    };
  };
  export default connect(mapStatetoProps)(HelpScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
