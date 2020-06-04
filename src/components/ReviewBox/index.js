import React from 'react';
import { TextInput, View } from 'react-native';

import styles from './styles';

// componente que recibe el input de las reviews
const ReviewBox = props => {
    const { input, meta, handlePress, ...inputProps } = props;

    return (
        <View style={styles.inputContainer}>
            <TextInput
                {...inputProps}
                selectionColor={'#428AF8'}
                placeholderTextColor={'#BEBEBE'}
                autoCapitalize={'sentences'}
                onChangeText={input.onChange}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                value={input.value}
                style={styles.input}
                multiline = {true}
            />
        </View>
    );
}


export default ReviewBox;