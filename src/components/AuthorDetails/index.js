import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Text, View, Image, ScrollView, ImageBackground} from 'react-native';


import styles from './styles';
import * as selectors from '../../reducers';
import * as authorActions from '../../actions/authors';
import {SafeAreaView} from "react-navigation";
import cit from "../../assets/CIT.jpg";
import Button from "../Button";
import {Alert} from "react-native";


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
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image source={require('../../assets/default_pp.png')} style={styles.authorPic}/>
                    <View style={styles.authorInfo}>
                        <Text style={styles.name}>{selectedAuthor ? selectedAuthor.name : ''}</Text>
                        <Text style={styles.name}>{selectedAuthor ? selectedAuthor.lastname : ''}</Text>
                    </View>
                </View>
                <View style={styles.detailsContainer}>

                    <View style={styles.topContainer}>



                        <View style={styles.middleContainer}>

                            {
                                selectedAuthor.type === 'tutor' ?
                                    <View style={{alignItems: 'center', width: '100%'}}>
                                        <View style={{backgroundColor: "#3a3b3a", width: '100%'}}>
                                            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: "#FFF", padding: 3}}>
                                                Usted es tutor
                                            </Text>
                                        </View>
                                        <View style={{marginTop: 30}}>
                                            <Button
                                                color="#078b45"
                                                label={'   Cambiar Contraseña   '}
                                                onPress={() => {
                                                    Alert.alert('Atención',
                                                        '¿Desea cambiar la contraseña?',
                                                        [
                                                            {
                                                                text: 'Cancelar',
                                                                style: 'cancel'
                                                            },
                                                            {
                                                                text: 'Confirmar',
                                                                style: 'confirm'
                                                            }
                                                        ], {cancelable: true})
                                                }}
                                            />
                                        </View>
                                        <View style={{marginTop: 30}}>
                                            <Button
                                                color="#078b45"
                                                label={'   Cambiar Horarios   '}
                                                onPress={() => {
                                                    Alert.alert('Atención',
                                                        '¿Desea cambiar sus horarios?',
                                                        [
                                                            {
                                                                text: 'Cancelar',
                                                                style: 'cancel'
                                                            },
                                                            {
                                                                text: 'Cambiar',
                                                                style: 'confirm'
                                                            }
                                                        ], {cancelable: true})
                                                }}
                                            />
                                        </View>
                                    </View>:
                                    <View style={{alignItems: 'center', width: '100%'}}>
                                        <View style={{backgroundColor: "#3a3b3a", width: '100%'}}>
                                            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: "#FFF", padding: 3}}>
                                                Usted no es tutor
                                            </Text>
                                        </View>
                                        <View style={{marginTop: 30}}>
                                            <Button
                                                color="#078b45"
                                                label={'   Cambiar Contraseña   '}
                                                onPress={() => {
                                                    Alert.alert('Atención',
                                                        '¿Desea cambiar la contraseña?',
                                                        [
                                                            {
                                                                text: 'Cancelar',
                                                                style: 'cancel'
                                                            },
                                                            {
                                                                text: 'Confirmar',
                                                                style: 'confirm'
                                                            }
                                                        ], {cancelable: true})
                                                }}

                                            />
                                        </View>
                                        <View style={{marginTop: 30}}>
                                            <Button
                                                color="#078b45"
                                                label={'   Solicitar Ser Tutor   '}
                                                onPress={() => {
                                                    Alert.alert('Atención',
                                                        'Para ser tutor usted debe tener un promedio en el curso respectivo mayor o igual a 85 puntos',
                                                        [
                                                            {
                                                                text: 'Cancelar',
                                                                style: 'cancel'
                                                            },
                                                            {
                                                                text: 'Confirmar',
                                                                style: 'confirm'
                                                            }
                                                        ], {cancelable: true})
                                                }}
                                            />
                                        </View>
                                    </View>

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