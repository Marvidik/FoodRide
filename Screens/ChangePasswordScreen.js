import { View, Text, Image, StyleSheet, KeyboardAvoidingView, ScrollView,Platform } from 'react-native';
import React from 'react';
import TextInputWithIcons from '../Components/TextInputWithIcons';
import CustomButton from '../Components/CustomButton';

export default function ChangePasswordScreen() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.content}>
        <Image style={styles.image} source={require('../assets/logosmall.jpeg')} />
        <Text style={styles.text1}>Change Password</Text>
        <Text style={styles.text3}>At least 8 characters with uppercase </Text>
        <Text style={styles.text2}>and a character</Text>

        <TextInputWithIcons style={styles.textinput} placeholder={"New Password"} />
        <TextInputWithIcons style={styles.textinput} placeholder={"Confirm Password"} />
       
    

        <CustomButton style={styles.but} title={"Submit"} />
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
  )
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:20
    },
    content: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      height: 150,
      width: 200,
      alignSelf: "center",
      marginBottom: 20,
    },
    text1: {
      fontSize: 28,
      color: "#FF7518",
    },
    text2: {
      fontSize: 18,
      color: "grey",
      marginBottom: 30,
      paddingHorizontal:30
    },
    text3: {
        fontSize: 18,
        color: "grey",
        paddingHorizontal:30
      },
    textinput: {
      marginHorizontal: 20,
      height: 50,
      marginBottom: 10,
    },
    but: {
      marginTop:20,
      height: 50,
      marginBottom: 50,
      width:370
    },
  });
  



