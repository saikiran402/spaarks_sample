import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import I18n from '../src/i18n';
import { SafeAreaView } from 'react-native';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/spaarklogoss.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
            <Text style = {{color:"#6FA4E9", fontSize:40, fontWeight:'bold',marginTop:15}}>{I18n.t("Spaarks")}</Text>
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
           
            {/* <Text style={{
                color: '#6FA4E9', fontSize:16,margin:20
            }}>{I18n.t("SplashScreenVar")}</Text> */}

<Text style={[styles.titles, {
                color: '#6FA4E9',
            }]}>{I18n.t("SplashScreenVar")}</Text>


<Text style={[styles.title, {
                color: '#6FA4E9', fontSize:25,margin:10,paddingLeft:15
            }]}>{I18n.t("Connect_to_your_local_area")}</Text>
            <View style={styles.button}>
             <TouchableOpacity onPress={()=>navigation.navigate('Language', {onboarded: true})}>
                    <View style={{backgroundColor:'#6FA4E9',borderRadius:5,marginTop:15}}><Text style={{color:  '#fff',textAlign:"center", padding:10,width:350,height:40,fontWeight:'bold',fontSize:18,}}>{I18n.t("Next")} </Text></View>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
  
  
  
  );
};

export default SplashScreen;

const height= Dimensions.get("screen").height/5;
const height_logo = height;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff'
  },
  header: {
      flex: 1,
      alignItems: 'center',
      margin:30
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30
  },
  logo: {
      width: height_logo,
      height: height_logo,
      marginTop:100
  },
  title: {
      position:'absolute',
      bottom:220,
      color: '#05375a',
      fontSize: 25,
      fontWeight: 'bold'
  },

  titles: {
    position:'absolute',
    bottom:150,
    color: '#05375a',
    fontSize: 18,
    margin:10,paddingLeft:15
},
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
     
    position:'absolute',
        bottom:80,
        left:20,
        right:20
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold',
      textAlign:'center',
      justifyContent:'center'
  }
});

