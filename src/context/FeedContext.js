import createDataContext from './createDataContext';
import { XMLParser } from 'fast-xml-parser';
import rssfeed from '../api/rssfeed';

const defaultFeed = [
    {
        titulo: 'G1 - Todas as notícias',
        urlFeed: 'https://g1.globo.com/rss/g1/',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        titulo: 'G1 - Brasil',
        urlFeed: 'https://g1.globo.com/rss/g1/brasil/',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        titulo: 'G1 - Tecnologia e Games',
        urlFeed: 'https://g1.globo.com/rss/g1/tecnologia/',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        titulo: 'Jovem Nerd',
        urlFeed: 'http://jovemnerd.com.br/rss',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    }
];

const feedReducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'fetch_items':
            return action.payload;

        case 'add_item':
            let id = state.length+1;

            newFeed = {
                id: id,
                titulo: action.payload.titulo,
                urlFeed: action.payload.urlFeed
            }

            newState = [...state, newFeed];
            return newState;

        case 'delete_item':
            newState = state.filter((feed) => feed.id !== action.payload)
            return newState;

        case 'restore_state':
            return defaultFeed;

        case 'delete_all':
            return [];

        default:
            return state;
    }
};

const addItem = dispatch => {
    return (titulo, urlFeed, callback) => {
        dispatch({ type: 'add_feed', payload: { titulo, urlFeed } });
    
        if(callback) {
            callback();
        }
        
    };
};

const deleteItem = dispatch => {
    return (id) => {
        
        dispatch({ type: 'delete_feed', payload: id });
    };
};

const fetchItems = dispatch => async (feedURL) => {
    const parser = new XMLParser();
    const fetch = rssfeed(feedURL);
    const response = await fetch.get();
    const data = response.data;
    let feed = await parser.parse(response.data);
    
    let feedList = [];//todos as notícias do feed

    for(let i = 0; i < feed.rss.channel.item.length; i++ ){
        let item = feed.rss.channel.item[i];
        if (item.description !== undefined) {
            descricao = item.description.replace(/<[^>]+>/g, '');
        
            // expressão regular para extrair o link da imagem na description
            var regex = /<img src="([^"]+)"/;
            var match = regex.exec(item.description);

            if (match && match.length > 1) {
            var link = match[1];
                image = link;
            } else {
                image = null;
            }
        }
        else {
            descricao = "";
            image = null;
        }

        //montagem do objeto da notícia
        let itemTratado = {
            id: i+1,
            titulo: item.title,
            conteudo: descricao,
            link: item.link,
            dataPublicacao: item.pubDate,
            imagem: image
            
        }
        //adição do objeto na lista de notícias
        feedList.push(itemTratado);
    }
    dispatch({ type: 'fetch_items', payload: feedList });

};

const restoreState = dispatch => async () => {
    return () => {
        dispatch({ type: 'restore_state' });
    }
}


const deleteAll = dispatch => {
    return () => {
        dispatch({ type: 'delete_all' });
    }
}

export const { Context, Provider } = createDataContext(
    feedReducer,
    { addItem, deleteItem, fetchItems, restoreState, deleteAll },
    []
);