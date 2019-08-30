import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./Reducer";
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger'

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = createLogger({
  level: 'info',
})

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(thunk, logger))
);

export default store;