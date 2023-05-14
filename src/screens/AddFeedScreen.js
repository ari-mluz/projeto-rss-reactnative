import React from 'react';
import { Text, StyleSheet } from 'react-native';
import FeedForm from '../components/FeedForm';

const AddFeedScreen = ({ navigation }) => {
    return (
        //renderiza o componente FeedForm com a propriedade 'navegacao' com o valor de 'navigation'
        <FeedForm navegacao={navigation}/>
    );
};

const styles = StyleSheet.create({});

export default AddFeedScreen;