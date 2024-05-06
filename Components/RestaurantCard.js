import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RestaurantCard = ({ name, location, imageSource, openingHours,onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={typeof imageSource === 'string' ? { uri: imageSource } : imageSource}
        style={styles.image}
      />
      <View style={styles.down}>
        <View style={styles.details}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.location}>{location}</Text>
            <Text style={styles.hours}>{openingHours}</Text>
        </View>
        <View>
            <Ionicons name={"bicycle"} size={45} style={styles.icon} color={ "#FF7518"} />
        </View>
      </View>
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    width: '48%',
    aspectRatio: 1,
    marginBottom: 10,
    elevation: 3, // Add shadow effect
    alignSelf:"center",
    marginTop:20
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignSelf:"center",
    width:"95%"
  },
  details: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingLeft:5,
    color: "#FF7518",
    fontWeight:"700"
  },
  location: {
    fontSize: 14,
    marginBottom: 5,
    color: '#777',
    paddingLeft:5
  },
  hours: {
    fontSize: 14,
    color: '#777',
    paddingLeft:5
  },
  down:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  icon:{
    paddingRight:20,
    alignSelf:"center"
  }
});

export default RestaurantCard;
