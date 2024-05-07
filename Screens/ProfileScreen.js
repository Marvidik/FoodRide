import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Import Expo's ImagePicker
import ListItem from '../Components/ListItem';

export default function ProfileScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState(require("../assets/profile.jpeg"));

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
  
    console.log("ImagePicker result:", result);
  
    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      if (selectedImage.uri) {
        setProfileImage({ uri: selectedImage.uri });
        console.log("Profile image updated:", selectedImage.uri);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Image style={styles.image} source={profileImage} />
      <TouchableOpacity style={styles.change} onPress={selectImage}>
        <Text style={styles.text}>Change Image</Text>
        <Ionicons name={"pencil"} size={20} style={styles.icon} color={"orange"} />
      </TouchableOpacity>

      <ListItem info={"Current Orders"} icon={"cart-plus"} onPress={() => { navigation.navigate("Order") }} />
      <ListItem info={"Cart"} icon={"cart-plus"} onPress={() => { navigation.navigate("Cart") }} />
      <ListItem info={"Logout"} icon={"sign-out"} onPress={() => { navigation.navigate("Login") }} />

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    alignSelf: "center",
    color: "grey",
    paddingTop: 15
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginTop: 30,
  },
  change: {
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: 5,
  },
  text: {
    color: "#FF7518",
    fontSize: 20,
  },
  content: {
    height: 50
  }
});
