import React, {useState, useContext} from "react";
import {View, TextInput, Button } from "react-native";
import { Context } from "../context/FeedListContext";

const FeedForm = ({navegacao}) => {

     //states iniciais para armazenar o título e a URL do feed
    const [titulo, setTitulo] = useState('');
    const [url, setUrl] = useState('');

    //obtém a função 'addFeed' do contexto FeedListContext
    const {addFeed} = useContext(Context);

    //atualiza o estado 'titulo' com o valor fornecido
    const handleSetTitulo = (titulo) => {
        setTitulo(titulo);
    };

    //atualiza o estado 'url' com o valor fornecido
    const handleSetUrl = (url) => {
        setUrl(url);
    };

    //adiciona um novo feed usando a função 'addFeed' e navega para a tela
    const handleAdicionar = () => {
        addFeed(titulo, url, () => navegacao.navigate('Index') );
    };

    return (
        //view que contém os elementos de entrada de título e url e o botão de adicionar
        <View>
            <TextInput
                value={titulo}   
                placeholder="Título do Feed"
                onChangeText={handleSetTitulo}
            />
            <TextInput
                value={url}
                placeholder="URL"
                onChangeText={handleSetUrl}
            />
            <Button
                title="Adicionar"
                onPress={handleAdicionar}
            />
        </View>


    );
}

export default FeedForm;