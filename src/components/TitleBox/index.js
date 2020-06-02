import React from 'react'
import {StyleSheet, TextInput, View} from 'react-native'

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

const styles = StyleSheet.create({
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
        borderRadius: 8,
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#BEBEBE',
        paddingLeft: '5%',
        marginBottom: 10
    },
    searchIcon: {
        paddingHorizontal: 10,
    },
    clearIcon: {
        paddingHorizontal: 10,
    },
});

export default TitleBox
