import createDataContext from './createDataContext';

const feedListReducer = (state, action) => {

    //feed padrão
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

    let newState = [];

    switch (action.type) {

        case 'add_feed':

            //criacao de um ID para a identificação dos feeds
            let id = state.length+1;

            newFeed = {
                id: id,
                titulo: action.payload.titulo,
                urlFeed: action.payload.urlFeed
            }

            newState = [...state, newFeed];
            return newState;
        
        case 'delete_feed':

            //apaga o feed com o feedId correspondente
            newState = state.filter((feed) => feed.id !== action.payload)
            return newState;
    
        case 'restore_state':

            //retorna ao estado inicial dos feeds
            return defaultFeed;
    
        case 'delete_all':

            //retorna uma lista vazia
            return [];
        
        default:
            return state;
    }
};


const addFeed = dispatch => {
    return (titulo, urlFeed, callback) => {
        //comentar
        dispatch({ type: 'add_feed', payload: { titulo, urlFeed } });
    
        if(callback) {
            callback();
        }
    };
};

const deleteFeed = dispatch => {
    return (id) => {
        //chamada ao reducer delete_feed passando o parâmetro de ID do feed
        dispatch({ type: 'delete_feed', payload: id });
    };
};

const restoreState = dispatch => async () => {
    return () => {
        //chamada ao reducer restore_state
        dispatch({ type: 'restore_state' });
    }
}

const deleteAll = dispatch => {
    return () => {
        //chamada ao reducer delete_all
        dispatch({ type: 'delete_all' });
    }
}

export const { Context, Provider } = createDataContext(
    feedListReducer,
    { addFeed, deleteFeed, restoreState, deleteAll },
    [] //inicializando a lista de feeds
);
