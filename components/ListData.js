import React,{useEffect, useState} from 'react';

import {Text,Header,ListItem, Avatar,Colors} from 'react-native-elements';

import axios from 'axios';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,

} from 'react-native';
import HeaderDashboard from './HeaderDashboard';
// class ListData extends React.Component {
  export default ListData = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(({ data }) => {
        console.log("defaultApp -> data", data.data)
        setData(data.data)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
   state = {
     users : [
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        }
      ]
    }



return(

  <SafeAreaView>
    <HeaderDashboard></HeaderDashboard>

  <View style={styles.container}>
  <ScrollView>
    <View>
    {
      this.state.users.map((l, i) => (
        <ListItem key={i} bottomDivider>
          <Avatar source={{uri: l.avatar_url}} />
          <ListItem.Content>
            <ListItem.Title>{l.name}</ListItem.Title>
            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))
    }
  </View>
  </ScrollView>
  </View>

  </SafeAreaView>
)


}
const styles = StyleSheet.create({

  container: {
    height:800,
    width:"auto",
    backgroundColor:"#ffffff"
  }

});

