import { ActionCreator, applyMiddleware, combineReducers, compose } from "redux";
import { store } from "..";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TActions, TSelectBookAction } from "./actions";
import { bookDetailsReducer, searchReducer } from "./reducers";

export const rootReducer = combineReducers({
    searchReducer,
    bookDetailsReducer
});

type TAppActions = | TActions | TSelectBookAction

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
export const enhancer = composeEnhancers(
    applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, TAppActions>;
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, RootState, any, TAppActions>
>;

export const getSearchResults = (store: RootState) => store.searchReducer;
export const getBookInfo = (store: RootState) => store.bookDetailsReducer;
