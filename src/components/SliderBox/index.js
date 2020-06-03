import React from 'react';
import { Slider, View, StyleSheet } from 'react-native';

const SliderBox = props => {
    const { input, meta, handlePress, ...inputProps } = props;
    return (
        <View style={styles.inputContainer}>
            <Slider
                style={styles.slider}
                value={inputProps.value}
                step={inputProps.step}
                minimumValue={inputProps.min}
                maximumValue={inputProps.max}
                onValueChange={input.onChange}
                minimumTrackTintColor={'green'}
                maximumTrackTintColor={'red'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    slider:{
        width: '90%'
    },
    input: {
        flex: 1,
        height: 40,
        marginBottom: 16,
        paddingLeft: 0,
        paddingRight: 10,
        paddingTop: 16,
    },
    inputContainer: {
        width: '90%',
        height: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchIcon: {
        paddingHorizontal: 10,
    },
    clearIcon: {
        paddingHorizontal: 10,
    },
});

export default SliderBox;