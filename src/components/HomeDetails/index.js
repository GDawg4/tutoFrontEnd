import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Button from '../Button';

import * as selectors from '../../reducers';
import * as cartActions from '../../actions/cart';

const HomeDetails = ({ navigation, selectedBook, author, hasBookInCart, addToCart, removeFromCart }) => {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image source={{uri: selectedBook.cover_pic}} style={styles.bookImage}/>
                <View style={styles.bookInfo}>
                    <Text style={styles.title}>{selectedBook.title}</Text>
                    <Text style={styles.author}>{author.name}</Text>
                    <Text style={styles.price}>{`Q${selectedBook.price}`}</Text>
                    <View style={styles.middleContainer}>
                        {!hasBookInCart ? <Button style={[styles.cartButton, styles.add]} label='Add to cart' onPress={() => addToCart()}/>:
                            <Button remove={true} style={[styles.cartButton, styles.remove]} label='Remove from cart' onPress={() => removeFromCart()}/>
                        }
                    </View>
                </View>
            </View>
            <ScrollView style={styles.bottomContainer}>
                <Text style={styles.header}>Description</Text>
                <Text style={styles.parragraph}>Harry Potter crece en la casa de sus tíos, los Dursley, quienes le ocultan su verdadera historia familiar; al cumplir Harry once años de edad, empiezan a llegarle cartas de remitente desconocido, que van aumentando en número a medida que sus tíos no dejan que las abra. Las mismas traen la noticia de que el niño ha sido admitido en el Colegio Hogwarts de Magia y Hechicería, ya que, al igual que sus padres, tiene poderes mágicos. {'\n\n'}Se descubre entonces que los Potter no murieron en un accidente de coche como se le había dicho a Harry, sino que habían sido asesinados en la noche de Halloween por un hechicero tenebroso conocido como lord Voldemort, quien había aterrorizado a la comunidad mágica británica años atrás. Sin embargo, algo ocurrió esa noche: Voldemort consiguió matar al matrimonio Potter pero no pudo asesinar al bebé, perdió su cuerpo y le dejó al niño una cicatriz permanente en forma de rayo en su frente. {'\n\n'}Rubeus Hagrid aparece para llevarse a Harry una noche, cuando los Dursley intentan impedir que parta rumbo al colegio. Más tarde, el hombre ayuda a Harry a comprar sus materiales escolares en el callejón Diagon y allí éste descubre que es famoso entre los magos por haber sobrevivido al intento de homicidio. Posteriormente, el muchacho toma el tren que lo lleva a Hogwarts y allí conoce a Ron Weasley, un chico pelirrojo hijo de magos, y a Hermione Granger, una jovencita de origen muggle con altas aspiraciones académicas. Los tres se hacen amigos y más tarde, durante su año escolar, se ven envueltos en una serie de episodios relacionados con un objeto escondido en las profundidades del edificio: la piedra filosofal, un artefacto con el poder de transmutar los metales en oro y producir el elixir de la vida eterna. Diferentes hechos les hacen suponer que uno de sus profesores, Severus Snape, desea conseguir la piedra para entregársela a Voldemort, con quien el docente estaría confabulado. </Text>
                <Text style={styles.header}>About the author</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#FFFFFF'
    },
    topContainer: {
        paddingTop: 16,
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '95%'
    },
    middleContainer:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '80%'
    },
    bottomContainer:{
        flex: 4,
        marginTop: 32,
        width: '90%'
    },
    similiarBooks: {
        marginTop: 32,
        width: '100%'
    },
    header: {
        alignSelf: 'flex-start',
        color: '#428AF8',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 8
    },
    bookImage: {
        height: 200,
        width: 150,
        justifyContent: 'center',
        borderRadius: 8,
        resizeMode: 'stretch'
    },
    author: {
        fontSize: 14,
        marginBottom: 4
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4
    },
    price: {
        fontSize: 12,
        marginBottom: 24
    },
    parragraph: {
        fontSize: 14,
        textAlign: 'justify',
        marginBottom: 16
    },
    bookInfo: {
        paddingLeft: 16,
        width: '60%',
        justifyContent: 'flex-start',
        paddingTop: 32
    },
    remove: {
        color: 'red'
    },
    add: {
        color: '#428AF8'
    }
})

export default connect(
    state => ({
        selectedBook: selectors.getSelectedBook(state),
        hasBookInCart: selectors.getIsBookInCart(state, selectors.getSelectedBook(state)),
        author: selectors.getAuthor(state, selectors.getSelectedBook(state).author) !== undefined ? selectors.getAuthor(state, selectors.getSelectedBook(state).author) : {name: 'N/A'},
    }),
    dispatch => ({
        addToCart(selectedBook){
            dispatch(cartActions.addItemToCart(selectedBook, 1))
        },
        removeFromCart(selectedBook){
            dispatch(cartActions.removeItemFromCart(selectedBook))
        },
    }),
    (stateProps, dispatchProps) => ({
        selectedBook: stateProps.selectedBook,
        hasBookInCart: stateProps.hasBookInCart,
        author: stateProps.author,
        back: dispatchProps.back,
        addToCart(){
            dispatchProps.addToCart(stateProps.selectedBook)
        },
        removeFromCart(){
            dispatchProps.removeFromCart(stateProps.selectedBook)
        }
    })
)(HomeDetails);