import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './Screens/SplashScreen';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import ChangePasswordScreen from './Screens/ChangePasswordScreen';
import SuccessScreen from './Screens/SuccessScreen';
import OTPScreen from './Screens/OTPScreen';
import HomeScreen from './Screens/HomeScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
