import React from 'react';
import { View, Text,Image, Button, StyleSheet,TouchableOpacity,ScrollView } from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import I18n from '../src/i18n';

import { Chip } from 'react-native-paper';
const dataArray = [
    { title: "First Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
  ];
const FaqsScreen = ({navigation}) => {
    return (
        <ScrollView>
        <View style={{backgroundColor:'#f2f2f2',height:'200%'}}>
            <View style={{margin:20,marginTop:10,padding:10,backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}> {I18n.t("What is the concept of this application?")}</Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("Connect_to_people_in your_local_area")}</Text>
                    </CollapseBody>
        </Collapse>
        
    </View>

    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}>{I18n.t("What is a Spaark?")}</Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("A_Spaark_is_the_information_posted_by_a_user")}</Text>
                    </CollapseBody>
        </Collapse>
        
    </View>
    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}>{I18n.t("What are the features in the application?")}</Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}> {I18n.t("Third_dropdown")}</Text>
                    </CollapseBody>
        </Collapse>
        
    </View>
    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}> {I18n.t("Why does the application take my location permissions?")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}> {I18n.t("Fourth_dropdown")} </Text>
                    </CollapseBody>
        </Collapse>
        
    </View>

    {/* <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}> {I18n.t("What is the importance of radius shown on the map?")} </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}> {I18n.t("Fifth_dropdown")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View> */}


    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}> {I18n.t("Am I visible to others on the map when I log into the app?")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}> {I18n.t("Sixth_dropdown")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>


    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}> {I18n.t("Will other user's location be visible to me?")} </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("Seventh_dropdown")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>

    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}> {I18n.t("What if I want my Spaark to be visible for more distance?")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}> {I18n.t("Eight_dropdown")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>


    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}> {I18n.t("If I am a Seller, then how do I collect reviews for my service from buyers?")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("Ninth_dropdown")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>




    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}>{I18n.t("How can I give review to a Seller?")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("Tenth_dropdown")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>


    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}>{I18n.t("Can I edit my Spaark?")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("Eleventh_dropdown")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>



    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}>{I18n.t("How is a Spaark or a Content taken down?")} </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("Twelth_dropdown")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>



    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}> {I18n.t("How does an account get suspended?")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("Thirteenth_dropdown")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>


    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}>{I18n.t("What is the maximum video size allowed to upload?")}   </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("Fourteenth_dropdown")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>

    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}>{I18n.t("Will_I_be_able_to_receive_calls_when_I_have_logged_out")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}> {I18n.t("Fifteenth_dropdown")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>



    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}>{I18n.t("Can I recover a deleted chat?")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}> {I18n.t("Sixteenth_dropdwon")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>

    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}>{I18n.t("What happens when I exit a chat?")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("Seventeenth_dropdown")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>


    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}>{I18n.t("what_will_be")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("Eighteenth_dropdown")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>



    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}>{I18n.t("19_ques")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("19_answ")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>

    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}>{I18n.t("20_ques")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("20_answ")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>


    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}>{I18n.t("21_ques")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("21_answ")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>


    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}>{I18n.t("22_ques")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("22_answ")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>


    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}>{I18n.t("23_ques")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("23_answ")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>
    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}>{I18n.t("24_ques")}  </Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Text style={{paddingTop:10}}>{I18n.t("24_answ")} </Text>
                    </CollapseBody>
        </Collapse>    
    </View>


    <View style={{margin:20,marginTop:0,padding:10, backgroundColor:'#fff',borderRadius:15}}>
        <Collapse style={{padding:10}}>
                    <CollapseHeader>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'600',marginTop:12}}> {I18n.t("Couldn't find your query ?")}</Text>
                        </View> 
                        <View style={{flex:0}}>
                        <Image source={require('../assets/icons/down_arrow.png')} style={{height:35,width:35}}></Image>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={{backgroundColor:'#'}}>
                    <Chip mode={'outlined'} style={{ paddingTop : 10 ,  backgroundColor: '#6FA4E9', marginTop: 15, marginBottom: 10, marginLeft: 70, textAlign: 'center', justifyContent: 'center', width: 150 }}>
                            <View   >
                            <TouchableOpacity onPress={() => { navigation.navigate('HelpScreen') }}>
                                    <Text style={{ color: '#fff' }}>{I18n.t("Contact_Us")} </Text>
                                </TouchableOpacity>
                                </View>
                            </Chip>
                    </CollapseBody>
        </Collapse>    
    </View>



    


  </View>
    </ScrollView>
    );
};

export default FaqsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
