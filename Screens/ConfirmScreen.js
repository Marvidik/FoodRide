import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { Ionicons,FontAwesome } from '@expo/vector-icons';
import CustomButton from '../Components/CustomButton';

export default function ConfirmScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.box}>
            <FontAwesome name="check-circle" size={200} color="#FF7518" style={styles.icon} />
        </View>
      
      <CustomButton title={"Done"} style={styles.but}/>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        paddingTop:44,
        alignItems:"center",
        justifyContent:"center",
        flex:1
    },
    but:{
        width:300,
        marginTop:60,
        height:50
    },
    icon:{
        alignSelf:"center"
    },
    box:{
        height:200,
        width:200,
        
    }
})