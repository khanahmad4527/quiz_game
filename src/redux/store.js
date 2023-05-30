import { legacy_createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk))
);

//export const store = legacy_createStore(reducer, applyMiddleware(thunk));
