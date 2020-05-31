import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import * as tagActions from '../../actions/tags';
import * as utils from '../../resources/utils';


const Tag = ({ vertical = false, info, handleOnPress }) => (
    <TouchableOpacity onPress={() => handleOnPress()}>
        <View style={[styles.tagcontainer, vertical ? styles.verticalTag : null]} >
            <Text style={styles.title}>{info}</Text>
        </View>
    </TouchableOpacity>
    
)

const styles = StyleSheet.create({
    tagcontainer: {
        width: 175,
        height: 125,
        borderRadius: 16,
        backgroundColor: utils.getRandomColor(),
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
    },
    verticalTag: {
        marginBottom: 16
    },
    title: {
        fontSize: 18,
        color: '#FFFFFF'
    }
})

export default connect(
    undefined,
    (dispatch, { navigation, info }) => ({
        handleOnPress(){
            dispatch(tagActions.selectTag(info))
            navigation.navigate('TagPage')
        }
    })
)(Tag);