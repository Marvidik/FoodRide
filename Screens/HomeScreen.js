import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import IconComponent from '../Components/IconComponent';
import TextInputWithIcons from '../Components/TextInputWithIcons';
import CustomButton from '../Components/CustomButton';
import RestaurantCard from '../Components/RestaurantCard'; // Import RestaurantCard component

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <IconComponent icon={"menu-outline"} color={"black"} />
        <IconComponent icon={"notifications-outline"} color={"black"} />
      </View>
      <View style={styles.box2}>
        <IconComponent icon={"locate"} color={"#FF7518"} style={{ backgroundColor: "#FCAE1E", marginRight: 20 }} />
        <View style={styles.textbox}>
          <Text style={styles.text1}>Current Location</Text>
          <Text style={styles.text2}>21 Eberechi lane off Niger</Text>
        </View>
      </View>
      <TextInputWithIcons style={styles.textinput} placeholder={"Search........."} leftIcon={"search-outline"} />
      <Text style={styles.text3}>Available Restaurants</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent} horizontal={false} showsVerticalScrollIndicator={false}>
        
          <RestaurantCard imageSource={require('../assets/chrunches.jpeg')} name={"Chrunches"} location={"Lagos"} openingHours={"11.25am - 12.00pm"}/>

          <RestaurantCard imageSource={require('../assets/kilimanjaro.png')} name={"Kilimanjaro"} location={"Lagos"} openingHours={"11.25am - 12.00pm"}/>


          <RestaurantCard imageSource={require('../assets/mr-biggs.png')} name={"Mr Biggs"} location={"Lagos"} openingHours={"11.25am - 12.00pm"}/>
          <RestaurantCard imageSource={require('../assets/tantalizers.png')} name={"Tantalizers"} location={"Lagos"} openingHours={"11.25am - 12.00pm"}/>


      
          
           
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    flex:1
  },
  box1: {
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    
  },
  box2: {
    paddingLeft: 20,
    paddingTop: 35,
    flexDirection: "row"
  },
  box3: {
    backgroundColor: "#FCAE1E",
    height: 200,
    marginHorizontal: 20,
    borderRadius: 20
  },
  textbox: {
    alignSelf: "center"
  },
  text1: {
    fontSize: 18,
    color: "grey"
  },
  text2: {
    fontSize: 18,
    color: "black",
    fontWeight: "600"
  },
  text3: {
    fontSize: 20,
    color: "grey",
    fontWeight: "700",
    paddingLeft: 20,
    paddingTop: 20
  },
  textinput: {
    marginHorizontal: 20,
    height: 50,
    marginBottom: 10,
    marginTop: 25
  },
  scrollViewContent: {
    paddingHorizontal: 20
  },
  rest:{
    marginHorizontal:30
  }
});
