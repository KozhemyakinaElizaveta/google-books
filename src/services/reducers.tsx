import { CLEAR_PARAMS, 
        CLEAR_SEARCH, 
        RESULTS_ERROR, 
        SEARCH_PARAMETERS, 
        SEARCH_REQUEST, 
        SEARCH_SUCCESS, 
        TActions, 
        TSearchResult,
        NO_BOOK,
        BOOK,
        CLEAR_RESULTS,
        TSelectBookAction, } from "./actions";


type TInitialState = {
    results: Array<TSearchResult>;
    totalItems: number;
    fetchSearchRequest: boolean;
    fetchSearchError: boolean;
    query: string;
    filter: string;
    sort: string;
}

const initialState: TInitialState = {
    results: [],
    totalItems: 0,
    fetchSearchRequest: false,
    fetchSearchError: false,
    query: '',
    filter: '',
    sort: 'relevance',
};

type TInitialStateBook = {
    book: any | null;
}

export const detailsInitialState: TInitialStateBook = {
    book: null
};

export const searchReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SEARCH_REQUEST: {
        return {
            ...state,
            fetchSearchRequest: true,
        };
        }
    
        case SEARCH_SUCCESS: {
        return {
            ...state,
            fetchSearchRequest: false,
            fetchSearchError: false,
            results: state.results.concat(action.results),
            totalItems: action.totalItems,
        };
        }

        case SEARCH_PARAMETERS: {
            return {
                ...state,
                query: action.query,
                filter: action.filter,
                sort: action.sort
            };
            }
    
        case RESULTS_ERROR: {
        return {
            ...state,
            fetchSearchRequest: false,
            fetchSearchError: true,
            results: [],
            totalItems: 0,
        };
        }
    
        case CLEAR_SEARCH: {
        return {
            ...state,
            query: '',
            results: [],
            totalItems: 0,
        };
        }

        case CLEAR_RESULTS: {
            return {
                ...state,
                results: [],
                totalItems: 0,
            };
        }

        case CLEAR_PARAMS: {
            return {
                ...state,
                filter: '',
                sort: 'relevance',
            };
        }

        default: {
        return state;
        }
    }
};

export const bookDetailsReducer = (state = detailsInitialState, action: TSelectBookAction | undefined): TInitialStateBook => {
    switch (action?.type) {
        case BOOK: {
            return {
            ...state,
            book: action.book,
            };
        }
        case NO_BOOK: {
            return {
            ...state,
            book: null,
            };
        }
        default: {
            return state;
        }
    }
};