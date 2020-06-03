import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const ReadBook = ({ source }) => {    
    const [loading, changeLoading] = useState(true)

    return (
        <View style={styles.container}>
            <WebView
                source={require("../../assets/test.pdf")}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    spinner: {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0, 
        top: 0
    }
})

export default connect(
    state => ({
        bookLoading: state
    })
)(ReadBook);