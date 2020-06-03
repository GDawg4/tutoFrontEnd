import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Button from '../Button';

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

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 500,
        marginBottom: 16,
        paddingLeft: 0,
        paddingRight: 16,
        paddingTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
        width: '100%'
    },
    inputContainer: {
        width: '90%',
        overflow:'scroll',
        height: 250,
        borderRadius: 8,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#BEBEBE',
        paddingLeft: '5%',
        marginBottom: 10
    },
});

export default ReviewBox;