import React, {Component, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
import ImageView from 'react-native-image-view';

const {width} = Dimensions.get('window');

const img = [[
  {
    source: {
      uri:
        'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-forest-in-fog-russian-nature-forest-mist-dmitry-ilyshev.jpg',
    },
    id: '1',
  },
  {
    source: {
      uri:
        'https://i.pinimg.com/564x/a5/1b/63/a51b63c13c7c41fa333b302fc7938f06.jpg',
    },
    id: '2',
  },
  {
    source: {
      uri:
        'https://guidetoiceland.imgix.net/4935/x/0/top-10-beautiful-waterfalls-of-iceland-8?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-2.1.1&w=883&s=1fb8e5e1906e1d18fc6b08108a9dde8d',
    },
    id: '3',
  },
  {
    source: {
      uri:
        'https://images.pexels.com/photos/7793766/pexels-photo-7793766.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    id: '4',
  },
  {
    source: {
      uri:
        'https://images.pexels.com/photos/5885133/pexels-photo-5885133.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    id: '5',
  },
]];

var data = [{"_id": "60bd8ff00312ab44b48a7d01", "height": "770", "showOverlay": false, "url": "https://staging-static-content.ososweb.com/image/post/20215/user-60950ab710373f02d469a89b-1623035888304-78-37.jpeg", "width": "470"},
{"_id": "60bd8ff00312ab44b45a7d01", "height": "770", "showOverlay": false, "url": "https://staging-static-content.ososweb.com/image/post/20215/user-60950ab710373f02d469a89b-1623035888304-78-37.jpeg", "width": "470"}]

export default function ImageViewScreen({navigation,route}) {
  const [finalImages, setFinalImages] = useState();


  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const images = img || [];
  renderImage = (item) =>{
    return(
      <TouchableOpacity
      key={item.id}
      onPress={() => {
        setImageIndex(index);
        setIsImageViewVisible(true);
      }}>
      <Image
        style={{width, height: 200}}
        source={item.source}
        resizeMode="cover"
      />
    </TouchableOpacity>
    )
  }

  async function onCloseNavigate(){
    setIsImageViewVisible({isImageViewVisible: false})
    navigation.goBack()
  }
  var imagesFormat = [];
  async function setImages(){
    var i = 0;
    data.forEach(list=>{
      var newImage  = {
        source: {
          uri:
            list.url,
        },
        id: i,
      };
      imagesFormat.push(newImage)
      i++;
    })
    console.log('NewDATA',imagesFormat)
    setFinalImages(imagesFormat)
    setImageIndex(0);
    setIsImageViewVisible(true);
  }

  useEffect(()=>{
    setImages()
  },[])
  return (
    <View style={styles.container}>
      <View>
        {/* {images.map((image, index) => (
          <TouchableOpacity
            key={image.ids}
            onPress={() => {
              setImageIndex(index);
              setIsImageViewVisible(true);
            }}>
            <Image
              style={{width, height: 200}}
              source={image.source}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))} */}
        {/* <FlatList
        data={images}
        horizontal
        renderItem={ ({ item, index }) => (
          <TouchableOpacity
          key={item.id}
          onPress={() => {
            setImageIndex(index);
            setIsImageViewVisible(true);
          }}>
          <Image
            style={{width, height: Dimensions.get('window').height}}
            source={item.source}
            resizeMode="cover"
          />
        </TouchableOpacity>

        )}
        /> */}

      </View>
      <ImageView
        glideAlways
        images={finalImages}
        imageIndex={imageIndex}
        animationType="fade"
        isVisible={isImageViewVisible}
        onClose={() => 
          onCloseNavigate()}
        onImageChange={index => {
          console.log(index);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    height: 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
