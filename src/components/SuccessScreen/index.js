import {Platform, SafeAreaView, StatusBar, Text, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {Link} from "react-router-native";
import React from "react";

const SuccessScreen = (icon_name, icon_size, icon_color, initial_text, href_link, href_text) => {
    return (
        <SafeAreaView style={{
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            flex: 1,
        }}>
            <View style={{
                flex: 1,
            }}>
                <View style={{
                    flex: 1
                }}/>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}/>
                    <View style={{alignItems: 'center', flex: 3}}>
                        <AntDesign
                            name={icon_name}
                            size={icon_size}
                            color={icon_color}
                            style={{marginBottom: 64}}
                        />
                        <Text>{initial_text}</Text>
                        <Link to={href_link}>
                            <Text style={{color: '#078B45'}}>
                                {href_text}
                            </Text>
                        </Link>
                    </View>
                    <View style={{flex: 1}}/>

                </View>
                <View style={{flex: 1}}/>
            </View>
        </SafeAreaView>
    )
}


export default SuccessScreen