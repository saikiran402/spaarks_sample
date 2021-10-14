import { ListItem, Avatar, Alert } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { act } from "react-test-renderer";
import moment from "moment";
import I18n from '../src/i18n';

const RightContent = (props) => <Text style={{ color: "#000" }}>15:20</Text>;

import React, { useEffect, setState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  StatusBar,
  ScrollView,
  Linking
} from "react-native";

import {
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
  TextInput,
} from "react-native-paper";
import { Chip } from "react-native-paper";
const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" },
];
const ConnectWithUsScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={{ backgroundColor: "#f2f2f2", height: "600%" }}>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            borderRadius: 10,
            margin: 10,
          }}
        >
          <View style={{ flex: 10, marginTop: 8, marginLeft: 15 }}>
            <Avatar
              source={require("../assets/icons/connect/1.png")}
              size="large"
            />
          </View>

          <View style={{ flex: 30 }}>
            <TouchableOpacity
              onPress={() =>Linking.openURL('https://www.youtube.com/channel/UCwyhvpr-O2X7PzOnFH9dW2w')
              }
            >
              <View
                style={{ flexDirection: "column", marginLeft: 0, margin: 0,justifyContent:'center' }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 15,
                    fontWeight: "600",
                    marginTop: 35,
                  }}
                >
                  {I18n.t("Spaarks")}{" "}
                </Text>
                {/* <Text style={{ color: "#5B6370", marginTop: 5 }}>
                  Subscribe us for many useful videos about Spaarks.
                </Text> */}
                
              </View>
            </TouchableOpacity>
          </View>
        </View>
         <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            borderRadius: 10,
            margin: 10,
            
          }}
        >
          <View style={{ flex: 10, marginTop: 8, marginLeft: 15 }}>
            <Avatar
              source={require("../assets/icons/connect/2.png")}
              size="large"
            />
          </View>

          <View style={{ flex: 30 }}>
          <TouchableOpacity
              onPress={() =>Linking.openURL('https://twitter.com/Spaarks_Smiles/')
              }
            >
              <View
                style={{ flexDirection: "column", marginLeft: 0, margin: 0 }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 15,
                    fontWeight: "600",
                    marginTop: 14,
                    marginTop: 35,
                  }}
                >
                  {I18n.t("Twitter_string")}
                </Text>
                {/* <Text style={{ color: "#5B6370", marginTop: 5 }}>
                Follow us for interesting updates.
                </Text> */}
                
              </View>
            </TouchableOpacity>
          </View>
        </View>
    

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            borderRadius: 10,
            margin: 10,
          }}
        >
          <View style={{ flex: 10, marginTop: 8, marginLeft: 15 }}>
            <Avatar
              source={require("../assets/icons/connect/3.png")}
              size="large"
            />
          </View>
      
          <View style={{ flex: 30 }}>
          <TouchableOpacity
              onPress={() =>Linking.openURL('https://www.facebook.com/Spaarks.Smiles')
              }
            >
              <View
                style={{ flexDirection: "column", marginLeft: 0, margin: 0 }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 15,
                    fontWeight: "600",
                    marginTop: 14,
                    marginTop: 35,
                  }}
                >
                {I18n.t("Facebook_string")}{" "}
                </Text>
                {/* <Text style={{ color: "#5B6370", marginTop: 5 }}>
                Keep in touch with us for great posts.
                </Text> */}
                
              </View>
            </TouchableOpacity>
          </View>
        </View>
         <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            borderRadius: 10,
            margin: 10,
          }}
        >
          <View style={{ flex: 10, marginTop: 8, marginLeft: 15 }}>
            <Avatar
              source={require("../assets/icons/connect/4.png")}
              size="large"
            />
          </View>





          <View style={{ flex: 30 }}>
          <TouchableOpacity
              onPress={() =>Linking.openURL('https://www.instagram.com/spaarks_smiles/')
              }
            >
              <View
                style={{ flexDirection: "column", marginLeft: 0, margin: 0 }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 15,
                    fontWeight: "600",
                    marginTop: 14,
                    marginTop: 35,
                  }}
                >
               {I18n.t("Instagram_string")}
                </Text>
                {/* <Text style={{ color: "#5B6370", marginTop: 5 }}>
                We keep pictures here for your everyday use.
                </Text> */}
                
              </View>
            </TouchableOpacity>
          </View>
       
       
       
        </View>
    
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            borderRadius: 10,
            margin: 10,
          }}
        >
          <View style={{ flex: 10, marginTop: 8, marginLeft: 15 }}>
            <Avatar
              source={require("../assets/icons/connect/5.png")}
              size="large"
            />
          </View>
         
          <View style={{ flex: 30 }}>
          <TouchableOpacity
              onPress={() =>Linking.openURL('https://www.linkedin.com/company/spaarks-smiles//')
              }
            >
              <View
                style={{ flexDirection: "column", marginLeft: 0, margin: 0 }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 15,
                    fontWeight: "600",
                    marginTop: 14,
                    marginTop: 35,
                  }}
                >
                 {I18n.t("Linkedin_string")}

{" "}
                </Text>
                {/* <Text style={{ color: "#5B6370", marginTop: 5 }}>
                Be professionally linked. We keep our job postings here.
                </Text> */}
                
               
              </View>
            </TouchableOpacity>
          </View>



          
       
       
       
        </View>


        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            borderRadius: 10,
            margin: 10,
          }}
        >
          <View style={{ flex: 10, marginTop: 8, marginLeft: 15 }}>
            <Avatar
              source={require("../assets/icons/connect/6.png")}
              size="large"
            />
          </View>
         
          <View style={{ flex: 30 }}>
          <TouchableOpacity
              onPress={() =>Linking.openURL('https://sharechat.com/profile/spaarks')
              }
            >
              <View
                style={{ flexDirection: "column", marginLeft: 0, margin: 0 }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 15,
                    fontWeight: "600",
                    marginTop: 14,
                    marginTop: 35,
                  }}
                >
                 {I18n.t("Sharechat_string")}
{" "}
                </Text>
                {/* <Text style={{ color: "#5B6370", marginTop: 5 }}>
                Share and Prosper. Keep in touch here.
                </Text> */}
                
              </View>
            </TouchableOpacity>
          </View>



          
       
       
       
        </View>
        <Text style={{ color: "#5B6370", marginTop: 5,textAlign:'center' }}>
                @2021 OSOS PVT LTD
                </Text> 
    
    
      </View>
    </ScrollView>
  );
};

export default ConnectWithUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
