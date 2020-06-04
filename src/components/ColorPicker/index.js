import React from 'react';
import { Slider, View, StyleSheet } from 'react-native';

import styles from './styles';

// Componente para elegir el color en las notas
const ColorPicker = props => {
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
            />
        </View>
    )
}

export default ColorPicker;