import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import todo from "../reducers/reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

let store = createStore(
  todo,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;
