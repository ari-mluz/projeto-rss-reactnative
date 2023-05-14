import React from 'react';
import { View, Text, StyleSheet, Button, Image, Linking, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Context as FeedListContext } from '../context/FeedListContext'
import { Context as FeedContext } from '../context/FeedContext'
import { useContext, useEffect } from 'react';


const ShowFeedScreen = ({ route, navigation }) => {
    const feedListContext = useContext(FeedListContext);
    const feedID = route.params.id;
    const feed = feedListContext.state.find((feed) => feed.id === feedID);
    const { state, fetchItems } = useContext(FeedContext);
    
    //executa a função 'fetchItems' ao carregar o componente
    useEffect(() => {
        fetchItems(feed.urlFeed);
    }, []);
    
    //abre o link no navegador ao ser chamada
    const abrirLink = (link) => {
        Linking.openURL(link);
    }

    return (
        <>
            <FlatList
                data={state}
                keyExtractor={(feed) => feed.link}
                renderItem={({ item }) => {
                    
                    return (
                        //chama a função abrir link ao clicar na notícia
                        <TouchableOpacity onPress={() => abrirLink(item.link)}>
                            <View style={styles.row}>
                                <Text style={styles.titulo}>{item.titulo}</Text>
                                <Text style={styles.dataPublicacao}>{item.dataPublicacao}</Text>
                                <Text style={styles.descricao}>{item.conteudo}</Text>
                                { //verifica se existe imagem e, caso não exista, exibe uma imagem padrão
                                    item.imagem != null && item.imagem != "" ? <Image style={styles.image} source={{uri: item.imagem}} /> :  <Image style={styles.image} source={{uri: 'https://placehold.co/400'}} /> 
                                }
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </>
    );
};

//altere os estilos como desejar para melhorar o layout
const styles = StyleSheet.create({
    row: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    titulo: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    image: {
        //pode alterar largura e altura como desejar
        width: 100,
        height: 100,
        borderRadius: 4,
        margin: 5
    },
    descricao: {
        maxHeight: 45,
        overflow: 'hidden',
        fontSize: 8
    },
    dataPublicacao: {
        fontSize: 10,
        fontStyle: 'italic'
    },
    icon: {
        fontSize: 24
    }
});

export default ShowFeedScreen;