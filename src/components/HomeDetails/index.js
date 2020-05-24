import React from 'react';
import { View, Button } from 'react-native';

import Book from '../Book';

const HomeDetails = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Book title = 'Test1' author='Author1' price='0.99'/>
            <Button title="TEST" onPress={() => navigation.navigate('Home')}></Button>
        </View>
    );
}

export default HomeDetails;