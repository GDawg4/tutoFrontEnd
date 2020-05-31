import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import Tag from '../Tag';


const TagList = ({ allTags, navigation }) => (
    <ScrollView horizontal={true} style={styles.horizontalScroll}>
        {allTags.map(tag => <Tag key={tag} info={tag} navigation={navigation}/>)}
    </ScrollView>
);

const styles = StyleSheet.create({
    horizontalScroll: {
        paddingLeft: 16,
        marginBottom: 16
    }
});

export default TagList;