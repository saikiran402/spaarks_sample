import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
const  configure = (onNotification) => {
    PushNotification.configure({
      onNotification: onNotification,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      popInitialNotification: true,
    });
  }

    //Appears right away 
  const localNotification = () => {
      alert('hii')
      PushNotificationIOS.addNotificationRequest({
        id:String(Date.now),
      title: "Local Notification", 
      message: "My Notification Message", 
      playSound: false, 
      soundName: 'default', 
      actions: '["Yes", "No"]'
    });
  }

    //Appears after a specified time. App does not have to be open.
  const scheduleNotification = () => {
    PushNotificationIOS.localNotificationSchedule({
      date: new Date(Date.now() + (30 * 1000)), //30 seconds
      title: "Scheduled Notification", 
      message: "My Notification Message",
      playSound: true, 
      soundName: 'default', 
    });
  }

  const checkPermission = (cbk) => {
    return PushNotificationIOS.checkPermissions(cbk);
  }

  const cancelNotif = () => {
    PushNotificationIOS.cancelLocalNotifications({id: ''+this.lastId});
  }

  const cancelAll = () => {
    PushNotificationIOS.cancelAllLocalNotifications();
  }
  const NotificationService = () => {
        //onNotificaitn is a function passed in that is to be called when a
        //notification is to be emitted.
    //   constructor(onNotification) {
    //     this.configure(onNotification);
    //     this.lastId = 0;
    //   }

  
    }

    export default NotificationService;
    exports.localNotification = localNotification;
    exports.configure = configure;
    exports.scheduleNotification = scheduleNotification;
    exports.checkPermission = checkPermission;
    exports.cancelNotif = cancelNotif;
    exports.cancelAll = cancelAll;

