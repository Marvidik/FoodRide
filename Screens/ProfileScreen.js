import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ListItem from '../Components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState(null);

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
      <Text style={styles.title}>Profile</Text>
      {profileImage && <Image style={styles.image} source={{ uri: profileImage }} />}
      <TouchableOpacity style={styles.change} onPress={selectImage}>
        <Text style={styles.text}>Change Image</Text>
        <Ionicons name={"pencil"} size={20} style={styles.icon} color={"orange"} />
      </TouchableOpacity>

      <ListItem info={"Current Orders"} icon={"cart-plus"} onPress={() => { navigation.navigate("Order") }} />
      <ListItem info={"Cart"} icon={"cart-plus"} onPress={() => { navigation.navigate("Cart") }} />
      <ListItem info={"Logout"} icon={"sign-out"} onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:64,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "grey",
    paddingBottom: 5, // Adjusted from paddingTop to paddingBottom
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginTop: 15, // Reduced from 30
  },
  change: {
    flexDirection: "row",
    paddingTop: 5,
  },
  text: {
    color: "#FF7518",
    fontSize: 20,
  },
  icon: {
    marginLeft: 5,
  },
});
