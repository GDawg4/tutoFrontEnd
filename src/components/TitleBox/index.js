import React from 'react';
import { TextInput, View } from 'react-native';

import styles from './styles';

const TitleBox = props =>{
    const { input, meta, handlePress, ...inputProps } = props;

    return(
        <View style={styles.inputContainer}>
            <TextInput
                {...inputProps}
                selectionColor={'#428AF8'}
                placeholderTextColor={'#BEBEBE'}
                autoCapitalize={'none'}
                onChangeText={input.onChange}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                value={input.value}
                style={styles.input}
            />
        </View>
    )
}


export default TitleBox
