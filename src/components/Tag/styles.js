import { StyleSheet } from 'react-native';

import * as utils from '../../resources/utils';

const styles = StyleSheet.create({
    tagcontainer: {
        width: 150,
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
});

export default styles;