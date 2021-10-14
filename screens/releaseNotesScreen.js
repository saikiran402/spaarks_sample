import React from 'react';

import { Dimensions, View,Text , Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');

const releaseNotesScreen = () => {
  return (
    <ScrollView>
<View>
    <View style={{flexDirection:'row'}}>
    <Text style={{margin:10,fontSize:18,fontWeight:'bold'}}>Release Notes 🎉 - October 2021</Text>
    </View>
    <View style={{marginLeft:10,flexDirection:'row'}}>
        <Text style={{fontWeight:'bold',fontSize:22,color:'#6FA4E9'}}>1.1.0</Text>
    </View>
    <View style={{marginLeft:10,flexDirection:'row',marginTop:20}}>
    <Text>
    Spaarks is a local social network to connect with people in your local area. Make connections for business marketing👨‍💼 , friendships💕 , post local jobs💼 , find work✍ , search services nearby🔍 , do public announcements📢 .

The information you post is called a SPAARK. Easy and free to use.
You can set the distance in the feed till 5 km and check all spaarks near you, or set it to latest spaarks first.
    </Text>
    </View>
    <View style={{marginLeft:10,flexDirection:'row',marginTop:10}}>
    <Text>

    Explore near you through these Spaarks features:

    </Text>
    </View>
    <View style={{marginLeft:10,flexDirection:'column',marginTop:10}}>

<Text style={{fontWeight:'bold'}}>Market📊</Text>
<Text>Do you have a local business; you sell something; or give a Service? Promote your business locally. Do hyperlocal marketing. Upload pictures🖼 videos🎞 of your products. Share offers🎁  regularly to engage your customers.
Select a service, post a Spaark and build your Market Profile💻 automatically. Collect Ratings & Reviews⭐ from your Customers directly by scanning QR Code. 📱
If you provide Service then build your reputation by your Market Profile. Share Market Profile directly on WhatsApp📩.

By Facebook Marketplace, you can only buy or sell products. Google Ads, and Facebook Ads are complicated and expensive. If you are Freelancer or Professional Service Provider - Spaarks can find clients nearby and do marketing locally of your Service free of cost.

</Text> 

    </View>
    <View style={{marginLeft:10,flexDirection:'column',marginTop:10}}>
    
    <Text style={{fontWeight:'bold'}}>Make Friends🧡 </Text>
    <Text>Connect with strangers near your location. Meet new people. Be anonymous and post a Spaark. Chat Anonymously. Local dating at new places. Share your story with strangers. Make online friends. Keep your privacy. Connect with only accepted requests. Say hi to your crush. No fear of rejection. Send message for a person where you felt there was a spark.
Hesitant to create profiles on dating apps like Tinder, Bumble, Hinge? Keep your privacy on Spaarks and meet new people.

    </Text>
    </View> 
    <View style={{marginLeft:10,flexDirection:'column',marginTop:10}}>

    <Text style={{fontWeight:'bold'}}>Announce Something📢 </Text>
    <Text>Announce anything in your local area. It can be an event, or public announcement, notice, news, exhibition, trade fair, local bazar, mandi, weekly market, jagrata, protests, sports events. Like👍, comment💬 and share⤴ with others directly by WhatsApp. Get more views.


</Text>
    </View>
    <View style={{marginLeft:10,flexDirection:'column',marginTop:10}}>

    <Text style={{fontWeight:'bold'}}>Post a Job💼 </Text>
    <Text> Need salesman for your shop? Assistant for office? Looking for Receptionist? Post Jobs in your local area and let people directly contact you. Free of cost. Enable Spaarks Call or Normal Call. Enable Spaarks Chat.

</Text>
    </View>
    <View style={{marginLeft:10,flexDirection:'column',marginTop:10}}>
    
    <Text style={{fontWeight:'bold'}}>Want a Job🔎  </Text>
    <Text> You do not have any expertise yet? Looking for any kind of work? Then post a Spaark in Want a Job and get Want Work tag. Upload about yourself. Write in detail. Share with others on WhatsApp.


    </Text>
    </View>
    <View style={{marginLeft:10,flexDirection:'column',marginTop:10}}>

    <Text style={{fontWeight:'bold'}}>Need a Service👨‍🔧 </Text>
    <Text> Not able to find right Service Provider? Google near me, or Just Dial has limited options? New in the area? Not sure of choices near you? Post a Spaark and let Service Providers contact you. 

    
    </Text>
    </View>
    <View style={{marginLeft:10,flexDirection:'column',marginTop:10}}>
    <Text style={{fontWeight:'bold'}}>Other use</Text>
    <Text>You have an emergency, health issue, feel unsafe, lost something or found something or any other problem? Let neighbourhood know. Get help locally
    </Text>
    </View>
    {/* <View style={{marginLeft:20,flexDirection:'row',marginTop:10}}>
    <Text>10. Above post card message </Text>
    </View>
    <View style={{marginLeft:20,flexDirection:'row',marginTop:10}}>
    <Text>11. View user profile form post</Text>
    </View>
    <View style={{marginLeft:20,flexDirection:'row',marginTop:10}}>
    <Text>12. Capturing bank details  UPI</Text>
    </View>
    <View style={{marginLeft:20,flexDirection:'row',marginTop:10}}>
    <Text>13. Capturing device details</Text>
    </View> */}


{/* <View >
        <Button
          title="pollscreen"
          onPress={() => alert('Button Clicked!')}
        />
      </View> */}

</View>
</ScrollView>
  );
};

export default releaseNotesScreen;


