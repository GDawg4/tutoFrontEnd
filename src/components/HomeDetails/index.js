import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Button from '../Button';
import Book from '../Book';
import Review from "../Review";

import styles from './styles';
import * as selectors from '../../reducers';
import * as cartActions from '../../actions/cart';
import * as reviewActions from '../../actions/reviews';

// Componente con los detalles del libro seleccionado
// Se muestran los datos como titulo, precio, autor y resumen
// También libros similares, información del autor y reviews
// Por último brinda la opción de agregarlo al carrito y escribir un review
const HomeDetails = ({ navigation, selectedBook, author, hasBookInCart, addToCart, removeFromCart, allBooks, addReview, allReviews, fetchTheseReviews, ownsBook, notes, isAdding }) => {
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
                        {ownsBook ? <Button disabled={isAdding} style={[styles.cartButton, styles.add]} label='See notes' onPress={notes}/>:!hasBookInCart ? <Button style={[styles.cartButton, styles.add]} label='Add to cart' onPress={() => addToCart()}/>:
                            <Button remove={true} style={[styles.cartButton, styles.remove]} label='Remove from cart' onPress={() => removeFromCart()}/>
                        }
                    </View>
                </View>
            </View>
            <ScrollView style={styles.bottomContainer}>
                <Text style={styles.header}>Description</Text>
                <Text style={styles.parragraph}>{selectedBook.description ? selectedBook.description : "No description available for this book"}</Text>
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
                    {
                        allReviews.length === 0 
                        ? 
                            <Text style={styles.infoMessage}>No one has written about this book. Be the first!</Text>
                        :
                            allReviews.map(
                                review => <Review key={review.id} review={review}/>
                            )
                    }
                </ScrollView>
                <Text style={styles.header}>Want to share your thoughts?</Text>
                <View style={styles.buttonContainer}>
                    <Button label='Add review' onPress={() => addReview()}/>
                </View>
            </ScrollView>
        </View>
    );
};


export default connect(
    (state, { navigation }) => ({
        selectedBook: selectors.getSelectedBook(state),
        hasBookInCart: selectors.getIsBookInCart(state, selectors.getSelectedBook(state)),
        author: selectors.getAuthors(state).filter(author => author.name === selectors.getSelectedBook(state).author)[0],
        allBooks: selectors.getAllBooks(state),
        allReviews: selectors.getAllReviews(state).filter(review => review.book === selectors.getSelectedBook(state).id),
        isAdding: selectors.isAddingCart(state),
        navigation: navigation,
        ownedBooksIds: selectors.getOwnedBooks(state).map(book => book.id)
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
        isAdding: stateProps.isAdding,
        //TODO: Oportunidad para otra saga:
        ownsBook: stateProps.ownedBooksIds.includes(stateProps.selectedBook.id),
        addToCart(){
            dispatchProps.addToCart(stateProps.selectedBook)
        },
        removeFromCart(){
            dispatchProps.removeFromCart(stateProps.selectedBook)
        },
        addReview(){
            dispatchProps.addReview()
        },
        fetchTheseReviews(){
            dispatchProps.fetchTheseReviews(stateProps.selectedBook.id)
        },
        notes(){
            dispatchProps.notes()
        }
    })
)(HomeDetails);