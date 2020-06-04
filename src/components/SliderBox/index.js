import React from 'react';
import { Slider, View, StyleSheet } from 'react-native';

import styles from './styles';

// componente slider custom
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
};


export default SliderBox;