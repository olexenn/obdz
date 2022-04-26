import { composeWithDevTools } from "@redux-devtools/extension/";
import { combineReducers, compose, createStore } from "redux";
import reducers from "./reducers";

const rootReducer = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
