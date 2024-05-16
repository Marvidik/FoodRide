import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ListItem from '../Components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch,useSelector } from 'react-redux';
import store, {setResponseData} from '../Data/store';

export default function ProfileScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState(null);

  const responseData = useSelector(state => state.responseData);
  
  const { token, user } = responseData;

  

  // Function to handle image selection
  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      if (selectedImage.uri) {
        setProfileImage(selectedImage.uri);
        // Store profile image URI in AsyncStorage
        try {
          await AsyncStorage.setItem('profileImage', selectedImage.uri);
        } catch (error) {
          console.error('Error storing profile image in AsyncStorage:', error);
        }
      }
    }
  };

  // Load profile image URI from AsyncStorage on component mount
  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem('profileImage');
        if (storedImage) {
          setProfileImage(storedImage);
        }
      } catch (error) {
        console.error('Error loading profile image from AsyncStorage:', error);
      }
    };
    loadProfileImage();
  }, []);

  const handleLogout = async () => {
    // Clear user data from AsyncStorage
    try {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('profileImage');
    } catch (error) {
      console.error('Error clearing data from AsyncStorage:', error);
    }

    // Navigate to Login screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={{backgroundColor:"#FF7518",height:40}}></View>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.prof}>
        <View>
              {profileImage ? (
            <Image style={styles.image} source={{ uri: profileImage }} />
          ) : (
            <Image  style={styles.image} source={require("../assets/profile.jpeg")} />
          )}
            <TouchableOpacity style={styles.change} onPress={selectImage}>
              <Text style={styles.text}>Change Image</Text>
              <Ionicons name={"pencil"} size={20} style={styles.icon} color={"orange"} />
            </TouchableOpacity>
        </View>
        <View style={styles.user}>
        <Text style={styles.username}>Username: {user ? user.username : "Not Log in"}</Text>
        <Text style={styles.email}>Email: {user ? user.email : "Not Log in"}</Text>
        </View>
      
      </View>
     

      <ListItem info={"Current Orders"} icon={"cart-plus"} onPress={() => { navigation.navigate("Order") }} />
      <ListItem info={"Cart"} icon={"cart-plus"} onPress={() => { navigation.navigate("Cart") }} />
      <ListItem info={"Change Password"} icon={"lock"} onPress={() => { navigation.navigate("Forgottenpassword") }} />
      { user ? <ListItem info={"Logout"} icon={"sign-out"} onPress={handleLogout} /> : <ListItem info={"Login"} icon={"sign-in"} onPress={() => {
                  // Pass restaurant data to the "Food" screen
                  navigation.navigate("Login");
                }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  title: {
    alignSelf:"center",
    fontSize:32,
    paddingTop:15,
    color:"#512213",
    marginBottom:20
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginTop: 0,
    marginLeft:20
  },
  change: {
    flexDirection: "row",
    paddingTop: 5,
    marginLeft:30
  },
  text: {
    color: "#FF7518",
    fontSize: 20,
  },
  icon: {
    marginLeft: 5,
  },
  prof:{
    flexDirection:"row"
  },
  user:{
    paddingTop:30,
    paddingLeft:10
  },
  username:{
    fontSize:22,
    color:"#512213",
  },
  email:{
    color:"grey",
    fontSize:16,
  }
});
