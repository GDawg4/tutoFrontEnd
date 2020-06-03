import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Button from '../Button';
import Book from '../Book';
import Review from "../Review";

import * as selectors from '../../reducers';
import * as cartActions from '../../actions/cart';
import * as reviewActions from '../../actions/reviews';

const HomeDetails = ({ navigation, selectedBook, author, hasBookInCart, addToCart, removeFromCart, allBooks, addReview, allReviews, addAnalysis, fetchTheseReviews, ownsBook, notes }) => {
    useEffect(fetchTheseReviews, [])

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image source={{uri: selectedBook.cover_pic}} style={styles.bookImage}/>
                <View style={styles.bookInfo}>
                    <Text style={styles.title}>{selectedBook.title}</Text>
                    <Text style={styles.author}>{selectedBook.author}</Text>
                    <Text style={styles.price}>{`Q${selectedBook.price}`}</Text>
                    <View style={styles.middleContainer}>
                        {ownsBook ? <Button style={[styles.cartButton, styles.add]} label='See notes' onPress={notes}/>:!hasBookInCart ? <Button style={[styles.cartButton, styles.add]} label='Add to cart' onPress={() => addToCart()}/>:
                            <Button remove={true} style={[styles.cartButton, styles.remove]} label='Remove from cart' onPress={() => removeFromCart()}/>
                        }
                    </View>
                </View>
            </View>
            <ScrollView style={styles.bottomContainer}>
                <Text style={styles.header}>Description</Text>
                <Text style={styles.parragraph}>Harry Potter crece en la casa de sus tíos, los Dursley, quienes le ocultan su verdadera historia familiar; al cumplir Harry once años de edad, empiezan a llegarle cartas de remitente desconocido, que van aumentando en número a medida que sus tíos no dejan que las abra. Las mismas traen la noticia de que el niño ha sido admitido en el Colegio Hogwarts de Magia y Hechicería, ya que, al igual que sus padres, tiene poderes mágicos. {'\n\n'}Se descubre entonces que los Potter no murieron en un accidente de coche como se le había dicho a Harry, sino que habían sido asesinados en la noche de Halloween por un hechicero tenebroso conocido como lord Voldemort, quien había aterrorizado a la comunidad mágica británica años atrás. Sin embargo, algo ocurrió esa noche: Voldemort consiguió matar al matrimonio Potter pero no pudo asesinar al bebé, perdió su cuerpo y le dejó al niño una cicatriz permanente en forma de rayo en su frente. {'\n\n'}Rubeus Hagrid aparece para llevarse a Harry una noche, cuando los Dursley intentan impedir que parta rumbo al colegio. Más tarde, el hombre ayuda a Harry a comprar sus materiales escolares en el callejón Diagon y allí éste descubre que es famoso entre los magos por haber sobrevivido al intento de homicidio. Posteriormente, el muchacho toma el tren que lo lleva a Hogwarts y allí conoce a Ron Weasley, un chico pelirrojo hijo de magos, y a Hermione Granger, una jovencita de origen muggle con altas aspiraciones académicas. Los tres se hacen amigos y más tarde, durante su año escolar, se ven envueltos en una serie de episodios relacionados con un objeto escondido en las profundidades del edificio: la piedra filosofal, un artefacto con el poder de transmutar los metales en oro y producir el elixir de la vida eterna. Diferentes hechos les hacen suponer que uno de sus profesores, Severus Snape, desea conseguir la piedra para entregársela a Voldemort, con quien el docente estaría confabulado. </Text>
                <Text style={styles.header}>About the author</Text>
                <Text style={styles.parragraph}>{author.bio}</Text>
                <Text style={styles.header}>Others by this author</Text>
                <ScrollView horizontal={true} style={styles.horizontalScroll}>
                    {
                        allBooks.filter(book => book.author === selectedBook.author).length === 0
                            ?
                            <Text style={styles.infoMessage}>This author does not have more books</Text>
                            :
                            allBooks.filter(book => book.author === selectedBook.author && book.title !== selectedBook.title).map(book =>
                                <Book key={book.id} book={book} navigation={navigation} />
                            )
                    }
                </ScrollView>
                <Text style={styles.header}>Check out these reviews</Text>
                <ScrollView horizontal={true} style={styles.horizontalScroll}>
                    {allReviews.length === 0 ? <Text>No one has written about this book. Be the first one</Text>:
                    allReviews.map(review => <Review key={review.id} review={review}/>)}
                </ScrollView>
                <View>
                    <Text style={styles.header}>Want to share your thoughts?</Text>
                    <Button label='Add review' onPress={() => addReview()}/>
                    <Button label='Add analysis' onPress={() => addAnalysis()}/>
                </View>
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
        marginBottom: 8,
        marginTop: 16
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
    },
    notes:{
        color:'yellow'
    },
    horizontalScroll: {
        paddingLeft: 16,
        flex: 1,
        flexWrap: 'wrap'
    },
})

export default connect(
    (state, { navigation }) => ({
        selectedBook: selectors.getSelectedBook(state),
        hasBookInCart: selectors.getIsBookInCart(state, selectors.getSelectedBook(state)),
        author: selectors.getAuthors(state).filter(author => author.name === selectors.getSelectedBook(state).author)[0],
        allBooks: selectors.getAllBooks(state),
        allReviews: selectors.getAllReviews(state),
        navigation: navigation,
    }),
    (dispatch, { navigation }) => ({
        addToCart(selectedBook){
            dispatch(cartActions.addItemToCart(selectedBook))
        },
        removeFromCart(selectedBook){
            dispatch(cartActions.removeItemFromCart(selectedBook))
        },
        addReview(){
            navigation.navigate('WriteReview')
        },
        addAnalysis(){
            navigation.navigate('WriteAnalysis')
        },
        fetchTheseReviews(book){
            dispatch(reviewActions.startFetchingReviewForBook(book))
        },
        notes(){
            navigation.navigate('Notes')
        }
    }),
    (stateProps, dispatchProps) => ({
        navigation: stateProps.navigation,
        selectedBook: stateProps.selectedBook,
        hasBookInCart: stateProps.hasBookInCart,
        author: stateProps.author,
        back: dispatchProps.back,
        allBooks: stateProps.allBooks,
        allReviews: stateProps.allReviews,
        //TODO: Oportunidad para otra saga:
        ownsBook:false,
        addToCart(){
            dispatchProps.addToCart(stateProps.selectedBook)
        },
        removeFromCart(){
            dispatchProps.removeFromCart(stateProps.selectedBook)
        },
        addReview(){
            dispatchProps.addReview()
        },
        addAnalysis(){
            dispatchProps.addAnalysis()
        },
        fetchTheseReviews(){
            dispatchProps.fetchTheseReviews(stateProps.selectedBook.id)
        },
        notes(){
            dispatchProps.notes()
        }
    })
)(HomeDetails);