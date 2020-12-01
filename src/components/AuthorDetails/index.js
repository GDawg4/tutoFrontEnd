import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Text, View, Image, ScrollView, ImageBackground} from 'react-native';


import styles from './styles';
import * as selectors from '../../reducers';
import * as authorActions from '../../actions/authors';
import {SafeAreaView} from "react-navigation";
import cit from "../../assets/CIT.jpg";


// Pantalla donde se muestran los detalles del autor.
// Nombre, biografía y los libors escritos por el/ella
const AuthorDetails = ({ selectedAuthor, authorBooks, onLoad, navigation }) => {
    useEffect(onLoad, [])

    return(
        <SafeAreaView style={styles.mainContainer}>
            <ImageBackground
                source={cit}
                blurRadius={3}
                style={{ flex: 1, justifyContent: 'center' }}
            >
                <View style={styles.detailsContainer}>

                    <View style={styles.topContainer}>

                        <Image source={require('../../assets/default_pp.png')} style={styles.authorPic}/>

                        <View style={styles.authorInfo}>
                            <Text style={styles.name}>{selectedAuthor ? selectedAuthor.name : ''}</Text>
                            <Text style={styles.name}>{selectedAuthor ? selectedAuthor.lastname : ''}</Text>
                        </View>
                        <View style={styles.middleContainer}>
                            {
                                selectedAuthor.type === 'tutor' ?
                                    <Text>
                                        Usted es tutor
                                    </Text>:
                                    <Text>
                                        No tiene tutorías asignadas, favor dirigirse a la autoridad correspondiente para solicitarlas
                                    </Text>

                            }
                            {/*<WeekScheduler/>*/}
                        </View>
                    </View>

                </View>
            </ImageBackground>

            {/*<View style={styles.middleContainer}>*/}
            {/*    <Text style={styles.header}>Books by the Author</Text>*/}
            {/*    /!*<ScrollView horizontal={true} style={styles.horizontalScroll}>*!/*/}
            {/*    /!*    {authorBooks.map(book => <Book key={book.id} urlComplete={false} book={book} navigation={navigation}/>)}*!/*/}
            {/*    /!*</ScrollView>*!/*/}
            {/*</View>*/}

        </SafeAreaView>
    )};

export default connect(
    state => ({
        authorBooks: selectors.getAuthorBooks(state),
    }),
    dispatch => ({
        onLoad(){
            dispatch(authorActions.startFetchingAuthorBooks())
        }
    })
)(AuthorDetails);