import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet,Image,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HeaderDashboard from './HeaderDashboard';
import DashboardComponent from './DashboardComponent';
import * as FaceDetector from 'expo-face-detector';
export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  
  onLogin() {
 
    const { username, password } = this.state;
    if(username=='a' && password =='b'){
      Alert.alert('Credentials', `${username} + ${password}`);
      navigation.navigate('Home')
    }
    // navigation.navigate('DashboardComponent')

    
  }

  render() {
    return (

      <View style={styles.container}>
           

              <Image
        style={styles.tinyLogo}
        source={require('../assets/logo.png')}
      />
 
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
    

<Button
       title={'Login'}
  type="solid"
  style={{marginBottom:0}}
  onPress={this.onLogin.bind(this)}
/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop:250,
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  tinyLogo:{
    flex: 0,
    height:120,
    width:120,
    margin:20
  }
});
