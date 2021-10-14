import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import { View,FlatList,Image, Text, Button, StyleSheet,TouchableOpacity,TextInput } from 'react-native';
import { Divider,SearchBar } from 'react-native-elements';
import axios from 'axios';

const list = [
    {
      name: 'Mumbai',
      image: require('../assets/cities/mumbai.png'),
      lat: '19.0760',
      lon:'72.8777',
      index:1
    },
    {
      name: 'NCR',
      image: require('../assets/cities/ncr.png'),
      lat: '28.6600',
      lon:'77.2300',
      index:2
    },
    {
      name: 'Bengaluru',
      image: require('../assets/cities/bangaluru.png'),
      lat: '12.9699',
      lon:'77.5980',
      index:3
    },
    {
      name: 'Hyderabad',
      image: require('../assets/cities/hyderabad.png'),
      lat: '17.3850',
      lon:'78.4867',
      index:4
    },
    {
      name: 'Ahmedabad',
      image: require('../assets/cities/ahmedabad.png'),
      lat: '23.0225',
      lon:'72.5714',
      index:5
    },
    {
      name: 'Chandigarh',
      image: require('../assets/cities/chandighar.png'),
      lat: '30.7333',
      lon:'76.7794',
      index:6
    },
    {
      name: 'Chennai',
      image: require('../assets/cities/chennai.png'),
      lat: '13.0825',
      lon:'80.2750',
      index:7
    },
    // {
    //   name: 'Pune',
    //   image: require('../assets/cities/pune.png'),
    //   lat: '18.5196',
    //   lon:'73.8553',
    //   index:8
    // },
    {
        name: 'Kolkata',
        image: require('../assets/cities/kolkata.png'),
        lat: '22.5726',
        lon:'88.3639',
        index:8
      },
      // {
      //   name: 'Kochi',
      //   image: require('../assets/cities/kolkata.png'),
      //   lat: '9.9312',
      //   lon:'76.2673',
      //   index:8
      // }
  ]

  const othercities =[{"city":"Delhi","latitude":"28.66","longitude":"77.23"},{"city":"Mumbai (or) Bombay","latitude":"18.9667","longitude":"72.8333"},{"city":"Kolkata (or) Calcutta","latitude":"22.5411","longitude":"88.3378"},{"city":"Bangalore (or) Bengaluru","latitude":"12.9699","longitude":"77.598"},{"city":"Chennai (or) Madras","latitude":"13.0825","longitude":"80.275"},{"city":"Hyderabad","latitude":"17.3667","longitude":"78.4667"},{"city":"Pune","latitude":"18.5196","longitude":"73.8553"},{"city":"Ahmadabad (or) Ahmedabad","latitude":"23.03","longitude":"72.58"},{"city":"Sūrat","latitude":"21.17","longitude":"72.83"},{"city":"Lucknow","latitude":"26.847","longitude":"80.947"},{"city":"Jaipur","latitude":"26.9167","longitude":"75.8667"},{"city":"Cawnpore(or) Kanpur","latitude":"26.4725","longitude":"80.3311"},{"city":"Mirzāpur","latitude":"25.15","longitude":"82.58"},{"city":"Nāgpur","latitude":"21.1539","longitude":"79.0831"},{"city":"Ghāziābād","latitude":"28.6667","longitude":"77.4167"},{"city":"Indore","latitude":"22.7206","longitude":"75.8472"},{"city":"Vadodara","latitude":"22.3","longitude":"73.2"},{"city":"Vishākhapatnam (or) Vizag","latitude":"17.7333","longitude":"83.3167"},{"city":"Bhopāl","latitude":"23.25","longitude":"77.4167"},{"city":"Chinchvad (or) Chinchwad","latitude":"18.6278","longitude":"73.8131"},{"city":"Patna","latitude":"25.61","longitude":"85.1414"},{"city":"Ludhiāna","latitude":"30.9083","longitude":"75.8486"},{"city":"Āgra","latitude":"27.18","longitude":"78.02"},{"city":"Kalyān","latitude":"19.2502","longitude":"73.1602"},{"city":"Madurai","latitude":"9.9197","longitude":"78.1194"},{"city":"Jamshedpur","latitude":"22.8","longitude":"86.1833"},{"city":"Nāsik (or) Nashik","latitude":"20","longitude":"73.7833"},{"city":"Farīdābād","latitude":"28.4333","longitude":"77.3167"},{"city":"Aurangābād","latitude":"19.88","longitude":"75.32"},{"city":"Rājkot","latitude":"22.2969","longitude":"70.7984"},{"city":"Meerut","latitude":"28.99","longitude":"77.7"},{"city":"Jabalpur","latitude":"23.1667","longitude":"79.9333"},{"city":"Thāne","latitude":"19.18","longitude":"72.9633"},{"city":"Dhanbād","latitude":"23.7928","longitude":"86.435"},{"city":"Allahābād","latitude":"25.455","longitude":"81.84"},{"city":"Vārānasi","latitude":"25.3189","longitude":"83.0128"},{"city":"Srīnagar","latitude":"34.0911","longitude":"74.8061"},{"city":"Amritsar","latitude":"31.6167","longitude":"74.85"},{"city":"Alīgarh","latitude":"27.88","longitude":"78.08"},{"city":"Bhiwandi","latitude":"19.3","longitude":"73.0667"},{"city":"Gwalior","latitude":"26.215","longitude":"78.1931"},{"city":"Bhilai","latitude":"21.2167","longitude":"81.4333"},{"city":"Hāora","latitude":"22.59","longitude":"88.31"},{"city":"Rānchi","latitude":"23.3556","longitude":"85.3347"},{"city":"Bezwāda","latitude":"16.5167","longitude":"80.6167"},{"city":"Chandīgarh","latitude":"30.7353","longitude":"76.7911"},{"city":"Mysore","latitude":"12.3086","longitude":"76.6531"},{"city":"Raipur","latitude":"21.2379","longitude":"81.6337"},{"city":"Kota","latitude":"25.18","longitude":"75.83"},{"city":"Bareilly","latitude":"28.364","longitude":"79.415"},{"city":"Jodhpur","latitude":"26.2918","longitude":"73.0168"},{"city":"Coimbatore","latitude":"11","longitude":"76.9667"},{"city":"Dispur","latitude":"26.15","longitude":"91.77"},{"city":"Guwāhāti","latitude":"26.1667","longitude":"91.7667"},{"city":"Solāpur","latitude":"17.6833","longitude":"75.9167"},{"city":"Trichinopoly","latitude":"10.8269","longitude":"78.6928"},{"city":"Hubli","latitude":"15.36","longitude":"75.125"},{"city":"Jalandhar","latitude":"31.3256","longitude":"75.5792"},{"city":"Bhubaneshwar (or) Bhubaneswar","latitude":"20.2644","longitude":"85.8281"},{"city":"Bhayandar","latitude":"19.3","longitude":"72.85"},{"city":"Morādābād","latitude":"28.8418","longitude":"78.7568"},{"city":"Kolhāpur","latitude":"16.7","longitude":"74.2333"},{"city":"Thiruvananthapuram","latitude":"8.5","longitude":"76.8997"},{"city":"Sahāranpur","latitude":"29.964","longitude":"77.546"},{"city":"Warangal","latitude":"17.9756","longitude":"79.6011"},{"city":"Salem","latitude":"11.65","longitude":"78.1667"},{"city":"Mālegaon","latitude":"20.55","longitude":"74.55"},{"city":"Kochi","latitude":"9.9667","longitude":"76.2833"},{"city":"Gorakhpur","latitude":"26.7611","longitude":"83.3667"},{"city":"Shimoga","latitude":"13.9304","longitude":"75.56"},{"city":"Tiruppūr","latitude":"11.1075","longitude":"77.3398"},{"city":"Guntūr","latitude":"16.3","longitude":"80.45"},{"city":"Raurkela","latitude":"22.2492","longitude":"84.8828"},{"city":"Mangalore","latitude":"12.8703","longitude":"74.8806"},{"city":"Nānded","latitude":"19.15","longitude":"77.3333"},{"city":"Cuttack","latitude":"20.45","longitude":"85.8667"},{"city":"Chānda (or) Chandrapur","latitude":"19.95","longitude":"79.3"},{"city":"Dehra Dūn","latitude":"30.318","longitude":"78.029"},{"city":"Durgāpur","latitude":"23.55","longitude":"87.32"},{"city":"Āsansol","latitude":"23.6833","longitude":"86.9667"},{"city":"Bhāvnagar","latitude":"21.765","longitude":"72.1369"},{"city":"Amrāvati","latitude":"20.9333","longitude":"77.75"},{"city":"Nellore","latitude":"14.4333","longitude":"79.9667"},{"city":"Ajmer","latitude":"26.468","longitude":"74.639"},{"city":"Tinnevelly","latitude":"8.7289","longitude":"77.7081"},{"city":"Bīkaner","latitude":"28.0181","longitude":"73.3169"},{"city":"Agartala","latitude":"23.8333","longitude":"91.2667"},{"city":"Ujjain","latitude":"23.1828","longitude":"75.7772"},{"city":"Jhānsi","latitude":"25.4486","longitude":"78.5696"},{"city":"Ulhāsnagar","latitude":"19.2167","longitude":"73.15"},{"city":"Davangere","latitude":"14.4667","longitude":"75.9167"},{"city":"Jammu","latitude":"32.7333","longitude":"74.85"},{"city":"Belgaum","latitude":"15.8667","longitude":"74.5"},{"city":"Gulbarga","latitude":"17.3333","longitude":"76.8333"},{"city":"Jāmnagar","latitude":"22.47","longitude":"70.07"},{"city":"Dhūlia","latitude":"20.9","longitude":"74.7833"},{"city":"Gaya","latitude":"24.75","longitude":"85.0167"},{"city":"Jalgaon","latitude":"21.0167","longitude":"75.5667"},{"city":"Kurnool","latitude":"15.8222","longitude":"78.035"},{"city":"Udaipur","latitude":"24.5833","longitude":"73.6833"},{"city":"Bellary","latitude":"15.15","longitude":"76.915"},{"city":"Sāngli","latitude":"16.8667","longitude":"74.5667"},{"city":"Tuticorin","latitude":"8.7833","longitude":"78.1333"},{"city":"Calicut","latitude":"11.25","longitude":"75.7667"},{"city":"Akola","latitude":"20.7333","longitude":"77"},{"city":"Bhāgalpur","latitude":"25.25","longitude":"87.0167"},{"city":"Sīkar","latitude":"27.6119","longitude":"75.1397"},{"city":"Tumkūr","latitude":"13.33","longitude":"77.1"},{"city":"Quilon","latitude":"8.8853","longitude":"76.5864"},{"city":"Muzaffarnagar","latitude":"29.4708","longitude":"77.7033"},{"city":"Bhīlwāra","latitude":"25.35","longitude":"74.6333"},{"city":"Nizāmābād","latitude":"18.6704","longitude":"78.1"},{"city":"Bhātpāra","latitude":"22.8667","longitude":"88.4167"},{"city":"Kākināda","latitude":"16.9333","longitude":"82.2167"},{"city":"Parbhani","latitude":"19.2704","longitude":"76.76"},{"city":"Pānihāti","latitude":"22.69","longitude":"88.37"},{"city":"Lātūr","latitude":"18.4004","longitude":"76.57"},{"city":"Rohtak","latitude":"28.9","longitude":"76.5667"},{"city":"Rājapālaiyam","latitude":"9.4204","longitude":"77.58"},{"city":"Ahmadnagar","latitude":"19.0833","longitude":"74.7333"},{"city":"Cuddapah","latitude":"14.4667","longitude":"78.8167"},{"city":"Rājahmundry","latitude":"16.9833","longitude":"81.7833"},{"city":"Alwar","latitude":"27.5667","longitude":"76.6167"},{"city":"Muzaffarpur","latitude":"26.12","longitude":"85.3833"},{"city":"Bilāspur","latitude":"22.15","longitude":"82.0167"},{"city":"Mathura","latitude":"27.4833","longitude":"77.6833"},{"city":"Kāmārhāti","latitude":"22.67","longitude":"88.37"},
  {"city":"Patiāla","latitude":"30.3204","longitude":"76.385"},{"city":"Saugor","latitude":"23.8504","longitude":"78.75"},{"city":"Bijāpur (or) Vijayapura","latitude":"16.8244","longitude":"75.7154"},{"city":"Brahmapur (or) Berhampur","latitude":"19.32","longitude":"84.8"},{"city":"Shāhjānpur","latitude":"27.8804","longitude":"79.905"},{"city":"Trichūr  (or) Thrissur","latitude":"10.52","longitude":"76.21"},{"city":"Barddhamān","latitude":"23.25","longitude":"87.85"},{"city":"Kulti","latitude":"23.73","longitude":"86.85"},{"city":"Sambalpur","latitude":"21.4704","longitude":"83.9701"},{"city":"Purnea","latitude":"25.78","longitude":"87.47"},{"city":"Hisar","latitude":"29.1489","longitude":"75.7367"},{"city":"Fīrozābād","latitude":"27.15","longitude":"78.3949"},{"city":"Bīdar","latitude":"17.9229","longitude":"77.5175"},{"city":"Rāmpur","latitude":"28.8154","longitude":"79.025"},{"city":"Shiliguri","latitude":"26.72","longitude":"88.42"},{"city":"Bāli","latitude":"22.65","longitude":"88.34"},{"city":"Pānīpat","latitude":"29.4004","longitude":"76.97"},{"city":"Karīmnagar","latitude":"18.4333","longitude":"79.15"},{"city":"Bhuj","latitude":"23.2504","longitude":"69.81"},{"city":"Ichalkaranji","latitude":"16.7","longitude":"74.47"},{"city":"Tirupati","latitude":"13.65","longitude":"79.42"},{"city":"Hospet","latitude":"15.2667","longitude":"76.4"},{"city":"Āīzawl","latitude":"23.7104","longitude":"92.72"},{"city":"Sannai","latitude":"24.16","longitude":"80.83"},{"city":"Bārāsat","latitude":"22.2333","longitude":"88.45"},{"city":"Ratlām","latitude":"23.3167","longitude":"75.0667"},{"city":"Handwāra","latitude":"34.4","longitude":"74.28"},{"city":"Drug","latitude":"21.19","longitude":"81.28"},{"city":"Imphāl","latitude":"24.82","longitude":"93.95"},{"city":"Anantapur (or) Anantapuram","latitude":"14.6833","longitude":"77.6"},{"city":"Etāwah","latitude":"26.7855","longitude":"79.015"},{"city":"Rāichūr","latitude":"16.2104","longitude":"77.355"},{"city":"Ongole","latitude":"15.5","longitude":"80.05"},{"city":"Bharatpur","latitude":"27.2172","longitude":"77.49"},{"city":"Begusarai","latitude":"25.42","longitude":"86.13"},{"city":"Sonīpat","latitude":"28.9958","longitude":"77.0114"},{"city":"Rāmgundam","latitude":"18.8","longitude":"79.45"},{"city":"Hāpur","latitude":"28.7437","longitude":"77.7628"},{"city":"Uluberiya","latitude":"22.47","longitude":"88.11"},{"city":"Porbandar","latitude":"21.6425","longitude":"69.6047"},{"city":"Pāli","latitude":"25.7725","longitude":"73.3233"},{"city":"Vizianagaram","latitude":"18.1167","longitude":"83.4167"},{"city":"Puducherry(or) Pondicherry","latitude":"11.93","longitude":"79.83"},{"city":"Karnāl","latitude":"29.6804","longitude":"76.97"},{"city":"Nāgercoil","latitude":"8.17","longitude":"77.43"},{"city":"Tanjore","latitude":"10.8","longitude":"79.15"},{"city":"Sambhal","latitude":"28.58","longitude":"78.55"},{"city":"Shimla","latitude":"31.1033","longitude":"77.1722"},{"city":"Ghāndīnagar","latitude":"23.22","longitude":"72.68"},{"city":"Shillong","latitude":"25.5744","longitude":"91.8789"},{"city":"New Delhi","latitude":"28.7","longitude":"77.2"},{"city":"Port Blair","latitude":"11.6667","longitude":"92.75"},{"city":"Gangtok","latitude":"27.33","longitude":"88.62"},{"city":"Kohīma","latitude":"25.6667","longitude":"94.1194"},{"city":"Itānagar","latitude":"27.1","longitude":"93.62"},{"city":"Panaji","latitude":"15.48","longitude":"73.83"},{"city":"Damān","latitude":"20.417","longitude":"72.85"},{"city":"Kavaratti","latitude":"10.5626","longitude":"72.6369"},{"city":"Panchkula","latitude":"30.6915","longitude":"76.8537"},{"city":"Kagaznāgār","latitude":"19.3316","longitude":"79.4661"},{"city":"Adoni","latitude":"15.6319","longitude":"77.2759"},{"city":"Alappuzha","latitude":"9.4981","longitude":"76.3388"},{"city":"Ambala","latitude":"30.3752","longitude":"76.7821"},{"city":"Ambattur","latitude":"13.1143","longitude":"80.1548"},{"city":"Amroha","latitude":"28.9052","longitude":"78.4673"},{"city":"Anand","latitude":"22.5645","longitude":"72.9289"},{"city":"Arrah","latitude":"25.5541","longitude":"84.666584.6665"},{"city":"Avadi","latitude":"13.1067","longitude":"80.097"},{"city":"Bahraich","latitude":"27.5705","longitude":"81.5977"},{"city":"Ballia","latitude":"25.8307","longitude":"84.1857"},{"city":"Bally","latitude":"22.6497","longitude":"88.3386"},{"city":"Baranagar or Baranagore","latitude":"22.6437","longitude":"88.3777"},{"city":"Bathinda","latitude":"30.211","longitude":"74.9455"},{"city":"Bettiah","latitude":"26.8026","longitude":"84.5201"},{"city":"Bhalswa Jahangir Pur","latitude":"28.735","longitude":"77.1636"},{"city":"Bhimavaram","latitude":"16.5449","longitude":"81.5212"},{"city":"Bhind","latitude":"26.5638","longitude":"78.7861"},{"city":"Bhiwani","latitude":"28.7752","longitude":"75.9928"},{"city":"Bhusawal","latitude":"21.0418","longitude":"75.7876"},{"city":"Bidhannagar","latitude":"22.5797","longitude":"88.4143"},{"city":"Bihar Sharif","latitude":"25.205","longitude":"85.5174"},{"city":"Bokaro","latitude":"23.6693","longitude":"86.1511"},{"city":"Bongaigaon","latitude":"26.503","longitude":"90.5536"},{"city":"Bulandshahr","latitude":"28.407","longitude":"77.8498"},{"city":"Burhanpur","latitude":"21.3145","longitude":"76.218"},{"city":"Buxar","latitude":"25.5647","longitude":"83.9777"},{"city":"Chapra","latitude":"25.7811","longitude":"84.7543"},{"city":"Chittoor","latitude":"13.2172","longitude":"79.1003"},{"city":"Danapur","latitude":"25.6241","longitude":"85.0414"},{"city":"Darbhanga","latitude":"26.1542","longitude":"85.8918"},{"city":"Dehri","latitude":"24.9061","longitude":"84.1912"},{"city":"Deoghar","latitude":"24.4852","longitude":"86.6948"},{"city":"Dewas","latitude":"22.9676","longitude":"76.0534"},{"city":"Dharmavaram","latitude":"14.4125","longitude":"77.7201"},{"city":"Dhule","latitude":"20.9042","longitude":"74.7749"},{"city":"Dibrugarh","latitude":"27.4728","longitude":"94.912"},{"city":"Dindigul","latitude":"10.3624","longitude":"77.9695"},
  {"city":"Erode","latitude":"11.341","longitude":"77.7172"},{"city":"Farrukhabad","latitude":"27.3826","longitude":"79.584"},{"city":"Fatehpur","latitude":"25.921","longitude":"80.7996"},{"city":"Gandhidham","latitude":"23.0753","longitude":"70.1337"},{"city":"Giridih","latitude":"24.1913","longitude":"86.2996"},{"city":"Gopalpur","latitude":"19.2647","longitude":"84.862"},{"city":"Gudivada","latitude":"16.4344","longitude":"80.9931"},{"city":"Guna","latitude":"24.6324","longitude":"77.3002"},{"city":"Guntakal","latitude":"15.1661","longitude":"77.377"},{"city":"Hajipur","latitude":"25.6924","longitude":"85.2083"},{"city":"Haridwar","latitude":"29.9457","longitude":"78.1642"},{"city":"Hazaribagh","latitude":"23.9925","longitude":"85.3637"},{"city":"Hindupur","latitude":"13.8223","longitude":"77.5009"},{"city":"Hosur","latitude":"12.7409","longitude":"77.8253"},{"city":"Howrah","latitude":"22.5958","longitude":"88.2636"},{"city":"Hubli–Dharwad","latitude":"15.3647","longitude":"75.124"},{"city":"Jalna","latitude":"19.8347","longitude":"75.8816"},{"city":"Jamalpur","latitude":"25.318","longitude":"86.4934"},{"city":"Jaunpur","latitude":"25.7464","longitude":"82.6837"},{"city":"Jehanabad","latitude":"25.2133","longitude":"84.9853"},{"city":"Jorhat","latitude":"26.7509","longitude":"94.2037"},{"city":"Junagadh","latitude":"21.5222","longitude":"70.4579"},{"city":"Kadapa","latitude":"14.4673","longitude":"78.8242"},{"city":"Kalyan-Dombivli","latitude":"19.2403","longitude":"73.1305"},{"city":"Karaikudi","latitude":"10.0763","longitude":"78.7803"},{"city":"Karawal Nagar","latitude":"28.7301","longitude":"77.2723"},{"city":"Katihar","latitude":"25.5541","longitude":"87.5591"},{"city":"Katni","latitude":"23.8343","longitude":"80.3894"},{"city":"Kavali","latitude":"14.9132","longitude":"79.993"},{"city":"Khandwa","latitude":"21.8314","longitude":"76.3498"},{"city":"Kharagpur","latitude":"22.346","longitude":"87.232"},{"city":"Khora-Ghaziabad\"","latitude":"28.7539","longitude":"77.3999"},{"city":"Kirari Suleman Nagar","latitude":"28.6968","longitude":"77.0644"},{"city":"Kishanganj","latitude":"26.0982","longitude":"87.945"},{"city":"Kollam","latitude":"8.8932","longitude":"76.6141"},{"city":"Kottayam","latitude":"9.5916","longitude":"76.5222"},{"city":"Kozhikode","latitude":"11.2588","longitude":"75.7804"},{"city":"Kumbakonam","latitude":"10.9602","longitude":"79.3845"},{"city":"Loni","latitude":"28.7334","longitude":"77.2986"},{"city":"Machilipatnam","latitude":"16.1809","longitude":"81.1303"},{"city":"Madanapalle","latitude":"13.556","longitude":"78.501"},{"city":"Madhyamgram","latitude":"22.6924","longitude":"88.4653"},{"city":"Mahbubnagar","latitude":"16.7488","longitude":"78.0035"},{"city":"Maheshtala","latitude":"22.5056","longitude":"88.25"},{"city":"Malda","latitude":"25.0108","longitude":"88.1411"},{"city":"Mango","latitude":"22.8384","longitude":"86.2294"},{"city":"Mau","latitude":"25.9463","longitude":"83.561"},{"city":"Medininagar","latitude":"24.0465","longitude":"84.0768"},{"city":"Daltonganj","latitude":"24.0465","longitude":"84.0768"},{"city":"Mehsana","latitude":"23.588","longitude":"72.3693"},{"city":"Mira-Bhayandar","latitude":"19.2952","longitude":"72.8544"},{"city":"Miryalaguda","latitude":"16.8739","longitude":"79.5662"},{"city":"Morbi","latitude":"22.8252","longitude":"70.8491"},{"city":"Morena","latitude":"26.4947","longitude":"77.994"},{"city":"Motihari","latitude":"26.6438","longitude":"84.904"},{"city":"Munger","latitude":"25.3708","longitude":"86.4734"},{"city":"Nadiad","latitude":"22.6916","longitude":"72.8634"},{"city":"Nagaon","latitude":"26.348","longitude":"92.6838"},{"city":"Naihati","latitude":"22.8895","longitude":"88.422"},{"city":"Nandyal","latitude":"15.4777","longitude":"78.4873"},{"city":"Nangloi Jat","latitude":"28.682","longitude":"77.0676"},{"city":"Narasaraopet","latitude":"16.2359","longitude":"80.0496"},{"city":"Nashik","latitude":"19.9975","longitude":"73.7898"},{"city":"Noida","latitude":"28.5355","longitude":"77.391"},{"city":"North Dumdum","latitude":"22.6626","longitude":"88.409"},{"city":"Orai","latitude":"25.9875","longitude":"79.4489"},{"city":"Pallavaram","latitude":"12.9675","longitude":"80.1491"},{"city":"Panvel","latitude":"18.9894","longitude":"73.1175"},{"city":"Phagwara","latitude":"31.2232","longitude":"75.767"},{"city":"Phusro","latitude":"23.7623","longitude":"86.0021"},{"city":"Pimpri-Chinchwad","latitude":"18.6298","longitude":"73.7997"},{"city":"Proddatur","latitude":"14.7526","longitude":"78.5541"},{"city":"Pudukkottai","latitude":"10.3833","longitude":"78.8001"},{"city":"Purnia","latitude":"25.7771","longitude":"87.4753"},{"city":"Raebareli","latitude":"26.2145","longitude":"81.2528"},{"city":"Raiganj","latitude":"25.6329","longitude":"88.1319"},{"city":"Raipur","latitude":"21.2514","longitude":"81.6296"},{"city":"Rajpur Sonarpur","latitude":"22.4473","longitude":"88.392"},{"city":"Ramgarh","latitude":"23.6363","longitude":"85.5124"},{"city":"Raurkela Industrial Township","latitude":"22.1993","longitude":"84.862"},{"city":"Rewa","latitude":"24.5362","longitude":"81.3037"},{"city":"Sagar","latitude":"23.8388","longitude":"78.7378"},{"city":"Saharsa","latitude":"25.8774","longitude":"86.5928"},{"city":"Satara","latitude":"17.6805","longitude":"74.0183"},{"city":"Satna","latitude":"24.6005","longitude":"80.8322"},{"city":"Secunderabad","latitude":"17.4399","longitude":"78.4983"},{"city":"Serampore","latitude":"22.7505","longitude":"88.3406"},{"city":"Shivpuri","latitude":"25.432","longitude":"77.6644"},{"city":"Silchar","latitude":"24.8333","longitude":"92.7789"},{"city":"Singrauli","latitude":"24.1992","longitude":"82.6645"},{"city":"Sirsa","latitude":"29.5321","longitude":"75.0318"},{"city":"Siwan","latitude":"26.2243","longitude":"84.36"},{"city":"South Dumdum","latitude":"22.6089","longitude":"88.3983"},{"city":"Sri Ganganagar","latitude":"29.9094","longitude":"73.88"},
  {"city":"Srikakulam","latitude":"18.2949","longitude":"83.8938"},{"city":"SultanPur Majra","latitude":"28.6959","longitude":"77.0805"},{"city":"Surendranagar Dudhrej","latitude":"22.7251","longitude":"71.637"},{"city":"Suryapet","latitude":"17.1314","longitude":"79.6336"},{"city":"Tadepalligudem","latitude":"16.8073","longitude":"81.5316"},{"city":"Tadipatri","latitude":"14.9091","longitude":"78.0092"},{"city":"Tenali","latitude":"16.2379","longitude":"80.6444"},{"city":"Tezpur","latitude":"26.6528","longitude":"92.7926"},{"city":"Thanjavur","latitude":"10.787","longitude":"79.1378"},{"city":"Thoothukudi","latitude":"8.7642","longitude":"78.1348"},{"city":"Tinsukia","latitude":"27.4886","longitude":"95.3558"},{"city":"Tirunelveli","latitude":"8.7139","longitude":"77.7567"},{"city":"Tiruvottiyur","latitude":"13.1643","longitude":"80.3001"},{"city":"Udupi","latitude":"13.3409","longitude":"74.7421"},{"city":"Unnao","latitude":"26.5393","longitude":"80.4878"},{"city":"Uzhavarkarai","latitude":"11.9394","longitude":"79.7733"},{"city":"Marie Oulgaret","latitude":"11.9394","longitude":"79.7733"},{"city":"Vasai-Virar","latitude":"19.3919","longitude":"72.8397"},{"city":"Vasco Da Gama","latitude":"15.3982","longitude":"73.8113"},{"city":"Vellore","latitude":"12.9165","longitude":"79.1325"},{"city":"Berhampore (or) Baharampur or Berhampur","latitude":"24.0983","longitude":"88.2684"},{"city":"Gulbarga (or) Kalaburagi","latitude":"17.3297","longitude":"76.8343"},{"city":"Chinsurah (or) Chuchura","latitude":"22.9012","longitude":"88.3899"},{"city":"Eluru (or) Ellore","latitude":"16.7107","longitude":"81.0952"},{"city":"Gurgaon (or) Gurugram","latitude":"28.4595","longitude":"77.0266"},{"city":"Khammam (or) Khammamett","latitude":"17.2473","longitude":"80.1514"},{"city":"Navi Mumbai (or) New Bombay","latitude":"19.033","longitude":"73.0297"},{"city":"Sasaram (or) Sahasram","latitude":"24.9539","longitude":"84.0143"},{"city":"Tiruchirappalli (or) Tiruchi (or) Trichy","latitude":"10.7905","longitude":"78.7047"},{"city":"Bokaro Steel City","latitude":"23.6693","longitude":"86.1511"},{"city":"Goa","latitude":"15.2993","longitude":"74.124"},{"city":"Hamirpur","latitude":"31.6862","longitude":"76.5213"},{"city":"Kannur","latitude":"11.8745","longitude":"75.3704"},{"city":"Malappuram","latitude":"11.051","longitude":"76.0711"},{"city":"Palakkad","latitude":"10.7867","longitude":"76.6548"},{"city":"Perinthalmanna","latitude":"10.976","longitude":"76.2254"},{"city":"Purulia","latitude":"23.3322","longitude":"86.3616"},{"city":"Tirur","latitude":"10.9167","longitude":"75.9245"},{"city":"Tiruvannamalai","latitude":"12.4918","longitude":"79.1097"},{"city":"Vijayawada (or) Bezawada","latitude":"16.5062","longitude":"80.648"},{"city":"Yamunanagar","latitude":"30.129","longitude":"77.2674"},{"city":"Amaravati","latitude":"20.932","longitude":"77.7523"},{"city":"Aurangabad","latitude":"19.8762","longitude":"75.3433"}]
  
  const SelectCityScreen = ({navigation,route}) => {
  const [search,setSearch] = React.useState(null)
  function updateSearch(search){
    console.log(search)
    setSearch(search)
  }

  var placeholders = ['Mumbai','Bangalore','Delhi','Srikakulam','Pune','Vizag','Kerala']
  // setInterval(() => {

  //   setPlaceholder(placeholders[Math.floor(Math.random() * 6)])
  // }, 5000);
  const [results, setResults] = React.useState([]);
  const [placeholder, setPlaceholder] = React.useState('Mumbai');


  async function callAxios(name){


if(name.length == 0){
  setResults([])
}

    await axios.get("http://103.27.86.34:3005/searchlocation/" + name).then((resp) => {
      console.log(resp.data);
      setResults([])
      setResults(resp.data.results);
    });


  }
    return (
      <SafeAreaView>

         <View style={styles.searchBox}>
        <View style={{ flex: 0, marginLeft: 12, marginTop: 7 }}>
          <Image
            source={require("../assets/icons/search.png")}
            style={{ height: 30, width: 30 }}
          ></Image>
        </View>
        <TextInput
          placeholder={"Search for your city "}
          placeholderTextColor="#D7D7D7"
          autoCapitalize="none"
          style={{ flex: 10, paddingLeft: 5 }}
          onChangeText={callAxios}
        />
      </View>


{


results.length>0?
<View style={{ marginTop: 70, backgroundColor: "#f2f2f2" }}>
<ScrollView>
{
       results.length>0?
<Text style={{backgroundColor:'#f2f2f2',padding:10}}>Search results</Text>:<></>
}

       <FlatList
         data={results}
         keyExtractor={(item, index) => item._id}
         renderItem={({ item }) => (
           <View
             style={{
               padding: 5,
               width: 380,
               backgroundColor: "#f2f2f2",
             }}
           >
     
             <View
               style={{
                 backgroundColor: "#fff",
                 borderRadius: 10,
                 padding: 20,
                 flex: 1,
               }}
             >
               <View style={{ flexDirection: "row" }}>
                  
                 <View style={{ flex: 10 }}>
                 <TouchableOpacity onPress={()=>{navigation.navigate('GetMyLocation',{city:item.city,lat:item.latitude,lon:item.longitude,preferences:[]})}}>

               
                 <Text style={{ fontSize: 18 }}>{item.city}</Text>
                  </TouchableOpacity>
                 </View>
               
                 <View style={{ flex: 1 }}>
                   <Image
                     source={require("../assets/icons/searchResult.png")}
                     style={{ height: 35, width: 35 }}
                     // onPress={navigation.navigate('All',{category:item.category,subCategory:item.subCategoryFinal,categoryId:item.categoryId,isTag:item.isTag,subCategoryPreview:item.subCategory})}
                   ></Image>
                 </View>
                 {/* </TouchableOpacity> */}
               </View>
             </View>
           </View>
         )}
       />
       
</ScrollView>

     </View>
:

<ScrollView>
<View style={styles.container}>
<Text style={{fontWeight:'bold',fontSize:18,marginTop:100,textAlign:'center'}}>Please select your city to get started</Text>

             <Text style={{fontSize:14,textAlign:'center'}}>Popular cities</Text>
    <FlatList style={{margin:5}}
  numColumns={3}                  // set number of columns 
  columnWrapperStyle={styles.row}  // space them out evenly
  data={list}
  keyExtractor={(item, index) => item.index }
  renderItem={({ item }) =>( 
    <TouchableOpacity onPress={() => navigation.navigate('GetMyLocation',{city:item.name,lat:item.lat,lon:item.lon,preferences:[]})
  } style={{backgroundColor:"#fff"}}><View style={{marginLeft:25}}>
   <Image source={item.image} style={{height:95,width:95}}></Image>
    <Text style={{textAlign:'center',fontWeight:'bold'}}>{item.name}</Text>
  </View>
  </TouchableOpacity>
  
  )}/>  


  {/* <Divider style={{ backgroundColor: '#000' }} /> */}
  <Text style={{fontSize:14,textAlign:'center',fontWeight:'bold'}}>Other cities</Text>
  <FlatList
data={othercities}
renderItem={({ item }) =>( 
  <TouchableOpacity onPress={()=>{navigation.navigate('GetMyLocation',{city:item.city,lat:item.latitude,lon:item.longitude,preferences:[]})}}>
<View style={{padding:8}}>
<Text style={{textAlign:'left',padding:15}}>{item.city}</Text>
</View>
</TouchableOpacity>
)}

/>
</View>
</ScrollView>



}
     


     
   
   
   
      </SafeAreaView>
    );
};

export default SelectCityScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginLeft:0
  },
  searchBox: {
    flex:1,
    top:0,
    zIndex:1,
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 50 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 35,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});
