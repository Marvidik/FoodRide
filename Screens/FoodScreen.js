import { View, Text,StyleSheet,Image,ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import JunksCard from '../Components/JunksCard';
import FoodCard from '../Components/FoodCard';



export default function FoodScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.ibox}>
            <View style={styles.box1}>
                <Image style={styles.image} source={require("../assets/kilimanjaro.png")}/>
            </View>
            <View style={styles.names}>
                <Text style={styles.text1}>kilimanjaro</Text>
                <Text style={styles.text2}>Open</Text>
            </View>
        </View>
        <View style={styles.names2}>
            <Text style={styles.text3}>21 china road futo</Text>
            <Text style={styles.text3}>$800 for delivery</Text>
        </View>
        <View style={styles.rating}>
            <Ionicons name={"star-sharp"} size={28} style={styles.icon} color={"#FF7518"} />
            <Text style={styles.text4}>5.0</Text>
            <Text style={styles.text5}>100+  ratings</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollView1}>
        <Text style={styles.text6}>Junks and Proteins</Text>

        <ScrollView horizontal contentContainerStyle={styles.scrollView} showsHorizontalScrollIndicator={false}>
      <JunksCard
        name="Burger"
        source={require("../assets/burgs (1).jpg")}
        category="Junks"
        price={34}
        availability={true}
        
      />
      <JunksCard
        name="Burger"
        source={require("../assets/burgs (2).jpg")}
        category="Junks"
        price={34}
        availability={true}
    
      />
      <JunksCard
        name="Burger"
        source={require("../assets/burgs (3).jpg")}
        category="Junks"
        price={34}
        availability={true}
    
      />
      <JunksCard
        name="Burger"
        source={require("../assets/burgs (4).jpg")}
        category="Junks"
        price={34}
        availability={true}
       
      />
      <JunksCard
        name="Burger"
        source={require("../assets/burgs (5).jpg")}
        category="Junks"
        price={34}
        availability={true}
        
      />
    </ScrollView>

    <Text style={styles.text6}>Foods</Text>

    
      <FoodCard
        name="Pizza"
        image={require("../assets/menu (1).jpg")}
        rating={4.5}
        category="Italian"
        availability={true}
        price={10.99}
      
      />
      <FoodCard
        name="Sushi"
        image={require("../assets/menu (1).jpg")}
        rating={4.8}
        category="Japanese"
        availability={true}
        price={15.99}
      
      />
      <FoodCard
        name="Burger"
        image={require("../assets/menu (1).jpg")}
        rating={4.7}
        category="American"
        availability={true}
        price={8.99}
       
      />
      <FoodCard
        name="Taco"
        image={require("../assets/menu (1).jpg")}
        rating={4.6}
        category="Mexican"
        availability={true}
        price={7.99}
       
      />
      <FoodCard
        name="Pad Thai"
        image={require("../assets/menu (1).jpg")}
        rating={4.4}
        category="Thai"
        availability={true}
        price={11.99}
        
      />
    </ScrollView>
    
      
    </View>
  )
}




const styles = StyleSheet.create({
    container:{
        paddingTop:44,
        flex:1
    },
    box1:{
        marginLeft:20,
        backgroundColor:'#FFFFFF',
        elevation:10,
        marginTop:10,
        borderRadius:10,
        width:120,
    },
    image:{
        width:100,
        height:100,
        alignSelf:"center"
    },
    names:{
        paddingLeft:20,
        paddingTop:15
    },
    text1:{
        fontSize:28,
        fontWeight:"700",
        color:"#512213"
    },
    text2:{
        color:"#FF7518",
        fontSize:20
    },
    text3:{
        color:"grey",
        fontSize:18
    },
    text4:{
        color:"black",
        fontSize:18,
        paddingLeft:5
    },
    text5:{
        color:"grey",
        fontSize:18,
        paddingLeft:10
    },
    text6:{
        paddingLeft:20,
        paddingTop:20,
        fontSize:24,
        color:"#512213"
    },
    ibox:{
        flexDirection:"row",
        marginTop:30
    },
    names2:{
        paddingLeft:20,
        paddingTop:20
    },
    rating:{
        paddingTop:10,
        paddingLeft:20,
        flexDirection:"row",
        alignItems:"center"
    },
    scrollView: {
        padding: 10,
        
      },
})