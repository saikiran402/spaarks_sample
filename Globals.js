
import AsyncStorage from "@react-native-community/async-storage";

async function getToken(){
  return await AsyncStorage.getItem('token')
}
async function getJid(){
  var a =  await AsyncStorage.getItem('jid_main');
  return a.substr(0,24);
}

async function getChatPassword(){
  return await AsyncStorage.getItem('chatpassword')
}

module.exports = {
    STORE_KEY: 'a56z0fzrNpl^2',
    // BASE_URL: 'https://staging-api.ososweb.com/api/v2.0/',
    OFFLINE_IMAGES:['../assets/offline1.png','../assets/offline2.png'],
    BASE_URL: 'https://api.spaarksweb.com/api/v2.0/',
    // TOKEN:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTRlN2I0NmU4ZDk2N2RkNWZjNWZmZiIsImlzR3Vlc3QiOmZhbHNlLCJpYXQiOjE2MjAzNzEzODAsImV4cCI6MTYyODE0NzM4MH0.9bW-4cxVRTfjOkSnwxhETUaXrNCT7L504P9Fr9KaRrc',
    TOKEN: getToken(),
    JID_MAIN: getJid(),
    CHAT_PASSWORD: getChatPassword(),
    // PLAIN_URL: 'https://staging-api.ososweb.com/',
    PLAIN_URL: 'https://api.spaarksweb.com/',
    COLOR: {
      ORANGE: '#C50',
      DARKBLUE: '#0F3274',
      LIGHTBLUE: '#6EA8DA',
      DARKGRAY: '#999',
    },
  };

 

  module.getToken = getToken;
  module.getChatPassword = getChatPassword;
  module.getJid = getJid;