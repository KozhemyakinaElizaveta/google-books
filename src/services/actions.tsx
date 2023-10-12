import { searchBooks } from "../utils/books-api";
import { AppDispatch, AppThunk } from "./store";

export const SEARCH_REQUEST = "SEARCH_REQUEST";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const RESULTS_ERROR = "RESULTS_ERROR";
export const SEARCH_PARAMETERS = "SEARCH_PARAMETERS";
export const CLEAR_PARAMS = "CLEAR_PARAMS";
export const CLEAR_RESULTS = "CLEAR_RESULTS";
export const BOOK = "BOOK";
export const NO_BOOK = "NO_BOOK";
export const START = "START";

export type TSearchResult = {
    volumeInfo: any,
    id: string,
    saleInfo: any,
}

export interface IRequest {
    readonly type: typeof SEARCH_REQUEST;
}

export interface ISuccess {
    readonly type: typeof SEARCH_SUCCESS;
    results: Array<TSearchResult>;
    totalItems: number;
}

export interface IStart{
    readonly type: typeof START;
    isLoad: boolean;
    start: number;
}

export interface IClearSearch {
    readonly type: typeof CLEAR_SEARCH;
}

export interface IClearParams {
    readonly type: typeof CLEAR_PARAMS;
}

export interface IErrorResults {
    readonly type: typeof RESULTS_ERROR;
}

export interface IParams {
    readonly type: typeof SEARCH_PARAMETERS;
    query: string;
    filter: string;
    sort: string;
}

export interface ICurrentBook {
    readonly type: typeof BOOK;
    readonly book: any;
}

export interface INoBook {
    readonly type: typeof NO_BOOK;
}

export interface INoResults {
    readonly type: typeof CLEAR_RESULTS;
}

export type TSelectBookAction =
    | ICurrentBook
    | INoBook;

export type TActions =
    | IClearSearch
    | IRequest
    | ISuccess
    | IErrorResults
    | IParams
    | IClearParams
    | IStart
    | INoResults;

export const getSearch: AppThunk = (options) => (dispatch: AppDispatch) => {
    dispatch({ type: SEARCH_REQUEST });

    searchBooks(options)
        .then((res) => {
            dispatch({
                type: SEARCH_SUCCESS,
                results: res.data.items,
                totalItems: res.data.totalItems
            });
        })
        .catch(() => dispatch(resultsError()));
}

const resultsError = (): IErrorResults => ({
    type: RESULTS_ERROR,
});

export function selectBook(book: any): ICurrentBook {
    return {
        type: BOOK,
        book: book,
    };
}

export function deleteBook(): INoBook {
    return {
        type: NO_BOOK,
    };
}

// export function deleteResults(): ISuccess {
//     return {
//         type: SEARCH_SUCCESS,
//         results: [],
//         totalItems: 0,
//     };
// }

export function getStart(index: number, loadMore: boolean ): IStart {
    return {
        type: START,
        start: index,
        isLoad: loadMore
    };
}
