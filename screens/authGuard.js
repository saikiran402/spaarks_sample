import React, { useEffect, setState, useRef,useState } from "react";
import axios from "axios";
import { connect, useDispatch, useReducer } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

async function checkLoggedIn(){
    var onBoarded = await AsyncStorage.getItem('onBoarded');
    var userTokenGuest = await AsyncStorage.getItem('userTokenGuest');
    var userTokenMain = await AsyncStorage.getItem('userToken');
    var isGuest = await AsyncStorage.getItem('isGuest');
    var preferences = await AsyncStorage.getItem('prefernces');
    var result = {
        onBoarded:onBoarded,
        userTokenGuest:userTokenGuest,
        userTokenMain:userTokenMain,
        isGuest:isGuest,
        preferences:preferences
    }
    return result;
}


async function canPost(){
    console.log('Innnn')
    var userTokenGuest = await AsyncStorage.getItem('userTokenGuest');
    var userTokenMain = await AsyncStorage.getItem('token');
    console.log("Token Before Comparision",String(userTokenMain))
    if(String(userTokenMain).length > 5){
        console.log('true')
        return true;
    }else{
        console.log('false')
        return false
    }
}






exports.connectXMPP = checkLoggedIn;
exports.canPost = canPost;