import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKGROUND_FETCH_TASK = 'background-fetch';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    // Fetch new data here and handle notifications
    const response = await fetch('https://foodride.viziddecors.com/last-notification/');
    const data = await response.json();
    const storedLastNotificationId = await AsyncStorage.getItem('lastNotificationId');
    
    if (storedLastNotificationId !== data.id.toString()) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: data.title,
          body: data.message,
          data: { id: data.id },
        },
        trigger: null,
      });
      await AsyncStorage.setItem('lastNotificationId', data.id.toString());
    }

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Error fetching notification:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

const registerBackgroundFetchAsync = async () => {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 5, // 5 minutes
    stopOnTerminate: false, // android only
    startOnBoot: true, // android only
  });
};

export { registerBackgroundFetchAsync };
