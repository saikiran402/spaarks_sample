import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    Linking
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import I18n from "../src/i18n"
import { useTheme } from 'react-native-paper';

import { AuthContext } from '../components/context';

import Users from '../model/users';
import axios from 'axios';
const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {


        if( val.trim().length >= 10 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

const loginHandle = async(phone, password) => {
// Axios post Request
let data = {
    phone:phone,
    password:password,
    registrationToken:''
}
var a =await axios.post('https://bda.ososweb.com/api/sign/signin',data).then((resp)=>{
    if(resp.data.found){
        Alert.alert('Hurray!', 'Phone or password is correct.', [
            {text: 'Okay'}
        ]);
        let foundUser = {
          userToken : resp.data.token,
          phone : resp.data.userr.phone,
          username : resp.data.userr.name
        }
        signIn(foundUser);
  
    }else{
       
    }
}, (error) => {
    //console.log(error);
    Alert.alert('In Correct', 'Phone or password are Incorrect.', [
        {text: 'Okay'}
    ]);
    return;
  });

        // const foundUser = Users.filter( item => {
        //     return userName == item.username && password == item.password;
        // } );

        // if ( data.username.length == 0 || data.password.length == 0 ) {
        //     Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
        //         {text: 'Okay'}
        //     ]);
        //     return;
        // }

        // if ( foundUser.length == 0 ) {
        //     Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        //         {text: 'Okay'}
        //     ]);
        //     return;
        // }
        // signIn(foundUser);
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>{I18n.t("Welcome")}!</Text>
            <Text style={styles.text_helper}>{("Please enter the credentials sent to mail")}</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Mobile Number</Text>
            <View style={styles.action}>
                
                <TextInput 
                    placeholder="+91"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    {/* <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    /> */}
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{I18n.t("Phone must be 10 Digits")}.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>{I18n.t("Password")}</Text>
            <View style={styles.action}>
               
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                {/* <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity> */}
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{I18n.t("Password must be 8 characters long")}.</Text>
            </Animatable.View>
            }
            

            <TouchableOpacity>
                <Text style={{color: '#63cdff', marginTop:15}}>{I18n.t("Forgot password")}?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                {/* <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {loginHandle( data.username, data.password )}}
                >
               
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
            
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => {loginHandle( data.username, data.password )}}
                    style={[styles.signIn, {
                        borderColor: '#63cdff',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#63cdff'
                    }]}>{I18n.t("Sign In")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                {/* <Text style={{color: '#009387', marginTop:15}}>Want to join Spaarks ?</Text> */}
                <Text style={{color: '#63cdff', marginTop:15}} onPress={()=>{Linking.openURL('mailto:info@spaarksweb.com')}}>{I18n.t("Want to join Spaarks")} ?</Text>
            </TouchableOpacity>
                {/* <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign Up</Text>
                </TouchableOpacity> */}
            </View>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#63cdff'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_helper: {
        color: '#fff',
        fontWeight: 'bold',
        paddingTop:5,
        fontSize: 15
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
