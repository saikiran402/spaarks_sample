/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
// PushNotificationIOS.addEventListener('notification', onRemoteNotification);

// const onRemoteNotification = (notification) => {
//   alert('Hey')
//   const isClicked = notification.getData().userInteraction === 1;

//   if (isClicked) {
//     // Navigate user to another screen
//   } else {
//     // Do something else with push notification
//   }
// };

AppRegistry.registerComponent(appName, () => App);
