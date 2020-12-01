import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, clearFields } from 'redux-form';
import {Text, View, ScrollView, RefreshControl, Linking} from 'react-native';

import lowerCase from 'lodash/lowerCase';

import SearchBox from '../SearchBox';
import Tag from '../Tag';
import Book from '../Book';
import AuthorList from '../AuthorList';
import PublisherList from '../PublisherList';
import Course from '../Course'

import styles from './styles';
import * as selectors from '../../reducers';
import * as bookActions from '../../actions/books';
import * as authorActions from '../../actions/authors';
import * as tagActions from '../../actions/tags';
import * as publisherActions from '../../actions/publishers';
import * as courseActions from '../../actions/courses'
import * as tutorActions from '../../actions/tutors'
import TutorList from "../TutorList";
import Tutor from "../Tutor";
import Button from "../Button";

// compoonente de búsqueda
// muestra los resultados de libros, autores y editoriales
const Search = ({ navigation, filter, allTags, allTutors, allPubs, handlePress, isFetching, onLoad, allCourses, ownInfo, seeState }) => {
    useEffect(onLoad, [])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Búsqueda</Text>
            <Field
                name={'search'}
                component={SearchBox}
                placeholder={'Buscar tutorías'}
                returnKeyType='done'
                autoCapitalize='words'
                handlePress={handlePress}
            />
            <ScrollView 
                style={styles.middleContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={() => onLoad()}
                        tintColor='#078b45'
                    />
                }
            >
                {
                    filter === undefined ? 
                        <View style={styles.innerContainer}>
                            <Text style={styles.headerTwo}>Explorar</Text>
                            <View style={styles.tagsContainer}>
                                {
                                    allTags.map(genre => 
                                        <Tag key={genre.id} info={genre} vertical={true} navigation={navigation}/>
                                    )
                                }
                            </View>
                        </View> 
                        : 
                        <View style={styles.innerContainer}>
                            <Text style={styles.headerTwo}>Materias</Text>
                            <ScrollView horizontal={true} style={styles.booksContainer}>
                                {
                                    allCourses.filter(course => lowerCase(course.name).includes(lowerCase(filter))).length === 0
                                    ?
                                    <Text style={styles.infoMessage}>No hay resultados</Text>
                                    : 
                                    allCourses.filter(course => lowerCase(course.name).includes(lowerCase(filter))).map(course =>
                                        <Course key={course.code} course={course} navigation={navigation}/>
                                    )
                                }
                            </ScrollView>
                            <Text style={styles.headerTwo}>Tutores</Text>
                            {/*<TutorList tutors={allTutors} filter={filter} navigation={navigation}/>*/}
                            <ScrollView horizontal={true} style={styles.booksContainer}>
                                {
                                    allTutors.filter(
                                        tutor =>
                                            (
                                                lowerCase(tutor.user.name).includes(lowerCase(filter)) ||
                                                lowerCase(tutor.user.lastname).includes(lowerCase(filter))
                                            ) &&
                                            (
                                                lowerCase(tutor.user.name) !== lowerCase(ownInfo.name) ||
                                                lowerCase(tutor.user.lastname) !== lowerCase(ownInfo.lastname)
                                            )
                                    ).length === 0 ?
                                        <Text style={styles.infoMessage}>No hay resultados</Text>
                                        :
                                        // allTutors.filter(course => lowerCase(course.name).includes(lowerCase(filter))).map(course =>
                                        //     <Tutor key={course.code} course={course} navigation={navigation}/>
                                        // )
                                    allTutors.filter(
                                        tutor =>
                                            (
                                                lowerCase(tutor.user.name).includes(lowerCase(filter)) ||
                                                lowerCase(tutor.user.lastname).includes(lowerCase(filter))
                                            ) &&
                                            (
                                                lowerCase(tutor.user.name) !== lowerCase(ownInfo.name) ||
                                                lowerCase(tutor.user.lastname) !== lowerCase(ownInfo.lastname)
                                            )
                                    ).map(tutor => <Tutor key = {tutor.id} info={tutor} navigation = {navigation}/>)
                                }
                            </ScrollView>

                        </View>
                }
                <Button onPress={()=> Linking.openURL('https://noticias.uvg.edu.gt')}
                        label={'   Noticias UVG   '}
                        color="#078b45"/>
            </ScrollView>
        </View>
    );
};


const selector = formValueSelector('search');

export default reduxForm({
    form: 'search',
})
(connect(
    state => ({
        filter: selector(state, 'search'),
        allTags: selectors.getTags(state),
        allBooks: selectors.getAllBooks(state),
        allAuthors: selectors.getAuthors(state),
        allPubs: selectors.getPublishers(state),
        isFetching: selectors.getIsFetchingBooks(state),
        allCourses:selectors.getAllCourses(state),
        allTutors:selectors.getAllTutors(state),
        ownInfo:selectors.getInfo(state),
        seeState(){
            console.log(state)
        }
    }),
    dispatch => ({
        handlePress(){
            dispatch(clearFields('search', true, false, ['search']))
        },
        onLoad(){
            /*dispatch(authorActions.startFetchingAuthor())
            dispatch(bookActions.startFetchingBook())
            dispatch(tagActions.startFetchingTags())
            dispatch(publisherActions.startFetchingPublisher())*/
            dispatch(tutorActions.startFetchingTutor());
            dispatch(courseActions.startFetchingCourse());
            console.log('yay')
        }
    }),
)(Search))