import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

import styles from './styles';
import * as selectors from '../../reducers';

// componente que permite leer un pdf dentro de la aplicación
// recibe como parámetro del uri donde se encuentra alojado el documento
const ReadBook = ({ source }) => {    
    const [loading, changeLoading] = useState(true)

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: Platform.OS === 'ios' ? `http://192.168.1.8:8000${source}` : `http://mozilla.github.io/pdf.js/web/viewer.html?file=http://192.168.1.8:8000${source}`}}
                onLoad={() => changeLoading(false)}
            />
            {
                loading && (
                    <ActivityIndicator 
                        style={styles.spinner}
                        size='large'
                        color='#428AF8'
                    />
                )
            }
        </View>
    )
};

export default connect(
    state => ({
        source: selectors.getReadingBook(state)
    })
)(ReadBook);