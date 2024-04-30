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
import FoodScreen from './Screens/FoodScreen';
import CartScreen from './Screens/CartScreen';
import OrderScreen from './Screens/OrderScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AddressScreen from './Screens/AddressScreen';
import AddressChangeScreen from './Screens/AddressChangeScreen';
import ConfirmScreen from './Screens/ConfirmScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <ConfirmScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
