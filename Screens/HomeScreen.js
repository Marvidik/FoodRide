import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Image, TouchableOpacity } from 'react-native';
import IconComponent from '../Components/IconComponent';
import TextInputWithIcons from '../Components/TextInputWithIcons';
import CustomButton from '../Components/CustomButton';
import RestaurantCard from '../Components/RestaurantCard';
import { useSelector } from 'react-redux';
import FoodCard from '../Components/FoodCard';
import AdsCard from '../Components/AdsCard';


export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(true); // Initialize modalVisible state as true

  const responseData = useSelector(state => state.responseData);
  const { token, user } = responseData;

 
  return (
    <View style={styles.container}>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={require('../assets/ads.jpeg')} style={styles.adImage} />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <View style={styles.box2}>
        <IconComponent icon={"locate"} color={"#FF7518"} style={{ backgroundColor: "#FCAE1E", marginRight: 20 }} />
        <View style={styles.textbox}>
          <Text style={styles.text1}>Address</Text>
          <Text style={styles.text2}>21 Eberechi lane off Niger</Text>
        </View>
        <IconComponent icon={"search"} color={"#FF7518"} style={{ backgroundColor: "#FCAE1E", marginLeft: 100 }} />
      </View>
      {/* <TextInputWithIcons style={styles.textinput} placeholder={"Search........."} leftIcon={"search-outline"} /> */}
      <ScrollView contentContainerStyle={styles.scrollViewContent1} horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}>    
        <AdsCard source={require('../assets/ads.jpeg')}/>
        <AdsCard source={require('../assets/ads2.jpeg')}/>
        <AdsCard source={require('../assets/ads3.jpeg')}/>
      </ScrollView>
      <Text style={styles.text3}>Available Restaurants</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent} horizontal={false} showsVerticalScrollIndicator={false}>
        <RestaurantCard imageSource={require('../assets/chrunches.jpeg')} name={"Chrunches"} location={"Lagos"} openingHours={"11.25am - 12.00pm"} />
        <RestaurantCard imageSource={require('../assets/kilimanjaro.png')} name={"Kilimanjaro"} location={"Lagos"} openingHours={"11.25am - 12.00pm"} />
        <RestaurantCard imageSource={require('../assets/mr-biggs.png')} name={"Mr Biggs"} location={"Lagos"} openingHours={"11.25am - 12.00pm"} />
        <RestaurantCard imageSource={require('../assets/tantalizers.png')} name={"Tantalizers"} location={"Lagos"} openingHours={"11.25am - 12.00pm"} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background color
    
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:"90%"
  },
  adImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20,
    marginBottom: 20
  },
  closeButton: {
    backgroundColor: "#FF7518",
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom:10,
    width:80,
    alignItems:"center"
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
    
  },
  box2: {
    paddingLeft: 20,
    paddingTop: 35,
    flexDirection: "row"
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  textinput: {
    marginHorizontal: 20,
    height: 50,
    marginBottom: 10,
    marginTop: 25
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    margingTop: 10
  },
  rest: {
    marginHorizontal: 30
  }
});
