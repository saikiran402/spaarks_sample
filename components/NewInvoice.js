import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,

} from 'react-native';
import {Text,Header,Input,Button,Image,Dimensions,
    TouchableOpacity,
    ThemeConsumer,
} from 'react-native-elements';
import axios from 'axios';




  class newLead extends React.Component {
    state = {
        photo: null,
        invoiceId:null,
        name:null,
        amount:null
      };
      
    

      HandleFormSubmit = async ()=>{

          console.log('In Submit')
          console.log(this.state)
          let data = {
            photo: null,
            invoiceId:this.state.invoiceId,
            name:this.state.name,
            amount:this.state.amount
          }
         await axios.post('http://192.168.1.15:3000',{data}).then((response) => {
        //   alert(response.data.message);
        //      console.log(response)
            alert(`Hurray !! Invoice Added ..`);
        });

        // await axios.post('https://jsonplaceholder.typicode.com/users').then(resp=>{
        //     console.log(resp.data)
        // })
    


      };
  
    render(){
        
        const { photo } = this.state;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
<View style={styles.bgcolor}>
{/* <Text h4 style={{textAlign:'left',color:"#000",paddingTop:10,paddingLeft:15}}>New Invoice</Text> */}
<Text h4 style={{textAlign:'left',color:"#000",paddingTop:10,paddingLeft:15}}>New Invoice</Text>
          <View
  style={{
    margin:10,
    borderBottomColor: '#63CDFF',
    width:50,
    marginLeft:20,
    borderBottomWidth: 4,
  }}
/>
<ScrollView>
<View style={{padding:10}}>
        <Text style={styles.lable}>Enter Invoice Id</Text> 
<Input
  placeholder='INV 0566546'
  onChangeText={(text)=>this.setState({invoiceId:text})}
 
/>
<Text style={styles.lable}>Enter Name</Text> 
<Input
  placeholder='John Doe'
  onChangeText={(text)=>this.setState({name:text})}
  
/>
<Text style={styles.lable}>Enter Amount Received</Text> 

<Input
  placeholder='50'
  onChangeText={(text)=>this.setState({amount:text})}
   
  
/>
<Button
  title="Submit"
  type="solid"
  style={{marginBottom:0}}
  onPress={this.HandleFormSubmit}
/>
</View> 

   
</ScrollView>
</View>
      </SafeAreaView>
    </>
  );
}
};

const styles = StyleSheet.create({
    lable:{
        marginLeft:15
    },
    bgcolor:{
        backgroundColor:"#f0f0f0",
        height:900
    }
});

export default newLead;
