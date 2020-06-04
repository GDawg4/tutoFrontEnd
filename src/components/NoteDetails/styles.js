import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        width:'90%',
        marginLeft:'5%',
        marginTop:'5%',
    },
    header: {
        alignSelf: 'flex-start',
        color: '#428AF8',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 8,
    },
    square:{
        height:24,
        width: 24,
        opacity:0.7,
        marginLeft: '10%',
        borderWidth:2,
        borderColor:'#000000',
    },
    headerContainer:{
        display:'flex',
        flexDirection:'row'
    },
    parragraph: {
        fontSize: 18,
        marginTop: 4
    }
});

export default styles;