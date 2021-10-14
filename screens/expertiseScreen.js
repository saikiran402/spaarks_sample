import React, { useState } from 'react';
import { View, Text,TouchableOpacity, Button, StyleSheet,Image } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import { SafeAreaView } from 'react-native';
import { Dimensions } from 'react-native';
import I18n from '../src/i18n';
import { ScrollView } from 'react-native-gesture-handler';
const expertiseScreen = ({navigation,route}) => {
    const data = [
        {
          label: 'I have experience and I can offer a specific Service.',
          value:true
         },
         {
          label: 'I have no specific skill or experience. I am looking for any type of work.',
          value:false
         }
        ];
    const [checked, setChecked] = React.useState(false);

    function clickedButton(){
        if(selected == 1){
            console.log("Innn")
            console.log("hi")
            // navigation.navigate("SelectCategory", {
            //     question: route.params.question,
            //     questionNo:route.params.questionNo,
            //     featureName:'market'
            // })
            navigation.navigate('SelectCategory', { questionNo: 5, question: I18n.t('I need a Service'), excluding: [], featureName: 'market', mediaP: [], mediaV: [] })
        }else{
            console.log("Innnsss",checked.value)
            

            navigation.navigate("NewInfoStepperScreen", {
                question: route.params.question,
                featureName:'market',
                category:"",
                questionNo:route.params.questionNo,
                subCatergory:"",
                isTag:true,
                categoryId: route.params.categoryId,
                subCategoryId: route.params.subCategoryId,
                skippedCat:true,
                skippedSubCat:true,
                mediaP:[],
                mediaV:[]
            })
        }
    }

    const [selected,setSelected] = useState(1)
              {/* <RadioButtonRN
  data={data}
  boxStyle={{height:230}}
  selectedBtn={(e) => setChecked(e)}
/> */}
    return (
        <SafeAreaView>
              <View style={{position:'absolute',zIndex:1,bottom:0,width:'100%'}}>
              <TouchableOpacity onPress={clickedButton}>
       <View style={{backgroundColor:'#6FA4E9',width:'100%',alignItems:'center'}}>
        <Text style={{color:'#fff',padding:10}}>{I18n.t("Next")}</Text>

       </View>
       </TouchableOpacity>
              </View>
            <ScrollView>
           
      <View style={{backgroundColor:'#f2f2f2',height:Dimensions.get('window').height}}>

          <View>

<Text style={{padding:20,paddingBottom:0}}>{I18n.t("Choose your Expertise")}</Text>


<View>
    <View>
        <TouchableOpacity onPress={()=>setSelected(1)}>
        <View style={{backgroundColor:'#fff',borderRadius:20,padding:20,margin:20,borderWidth:selected == 1?5:5,borderColor:selected == 1?'#6FA4E9':'#fff'}}>
            <Text style={{fontWeight:'bold',fontSize:18}}>{I18n.t("I have a skill")}</Text>
            <Image source={require('../assets/1_expert.png')} style={{height:170,width:'100%'}}/>
        </View>
        </TouchableOpacity>
        
    </View>
    <View>
    <TouchableOpacity onPress={()=>setSelected(2)}>
        <View style={{backgroundColor:'#fff',borderRadius:20,padding:20,margin:20,borderWidth:selected == 2?5:5,borderColor:selected == 2?'#6FA4E9':'#fff'}}>
            <Text style={{fontWeight:'bold',fontSize:18}}>{I18n.t("I am looking for any type of work")}.</Text>
            <Image source={require('../assets/2_expert.png')} style={{height:150,width:'100%'}}/>
        </View>
        </TouchableOpacity>
    </View>
    <View>

    </View>
</View>



         
          </View>
    
          
      </View>
    
       </ScrollView>
      </SafeAreaView>
    );
};

export default expertiseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:"#fff",
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
