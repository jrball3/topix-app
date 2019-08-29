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

// const next = store.dispatch
// store.dispatch = function dispatchAndLog(action) {
//   console.log('dispatching', action(store.dispatch, store.getState))
//   let result = next(action)
//   console.log('next state', store.getState())
//   return result
// }

// Logger with default options



export default store;