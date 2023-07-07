// import { createStore, createStore } from "redux";

import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
// import thunk from "redux-thunk";
import rootReducer from "../reducers";

// Note: this API requires redux@>=3.1.0
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
