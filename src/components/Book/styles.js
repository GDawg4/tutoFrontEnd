import {StyleSheet} from "react-native";

const width = 50;
const styles = StyleSheet.create({
    bookContainer:{
        backgroundColor:'#E6E8E6',
        height: 300,
        width:`${width}%`,
        justifyContent:'center',
        alignContent:'center',
        marginLeft: `${50-width/2}%`,
        borderRadius:50
    }
})

export default styles