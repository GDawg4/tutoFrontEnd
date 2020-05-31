import React, { useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Book from '../Book';
import Button from '../Button';

import * as selectors from '../../reducers';
import * as bookActions from '../../actions/books';
import * as authorActions from '../../actions/authors';
import * as tagActions from '../../actions/tags';

const TagPage = ({ selectedTag }) => (
    <View style={styles.container}>
        <Text>{selectedTag}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default connect(
    state => ({
        selectedTag: selectors.selectedTag(state)
    }),
    undefined
)(TagPage);