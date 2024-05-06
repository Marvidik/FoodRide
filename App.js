import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
import { Provider } from 'react-redux';
import store from './Data/store';

import FlashMessage from "react-native-flash-message";
import { Ionicons } from '@expo/vector-icons'; 


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Main" component={HomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Food" component={FoodScreen} />
    </Stack.Navigator>
  );
};

// Define Bottom Tab Navigator
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "#FF7518",
      tabBarInactiveTintColor: "#512213",
        tabBarItemStyle: {
          backgroundColor: '#fff', // Background color of the tab bar
          borderTopWidth: 1, // Optional: Add border on top of the tab bar
          borderTopColor: '#FCAE1E',
         
        },
        labelStyle: {
          fontSize: 12, // Font size of the tab labels
          marginBottom: 5, // Optional: Adjust the label position
        },
        tabBarItemStyle: {
          "justifyContent": "center"
        },
      }}
    >
      <Tab.Screen 
        name="Main" 
        component={MainStackNavigator} 
        options={{
          tabBarLabel: 'rest',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{
          tabBarLabel: 'Cart',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Order" 
        component={OrderScreen} 
        options={{
          tabBarLabel: 'Order',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
         
        }}
      />
    </Tab.Navigator>
  );
};





export default function App() {
  
  


 
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Forgottenpassword" component={ForgotPasswordScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Changepassword" component={ChangePasswordScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Otp" component={OTPScreen} />
        <Stack.Screen options={{ headerShown: false }} name="changesuccess" component={SuccessScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
      <StatusBar style="auto" />
    </View>
    <FlashMessage position="top" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
