import { createStore, compose, applyMiddleware, combineReducers} from "redux"
import thunk from "redux-thunk"
import {infoReducers} from './reducers/infoReducers'

const initialState = {
    infoReducers : {
                personalInfo : localStorage.getItem('personalInfo')
                ? JSON.parse(localStorage.getItem('personalInfo'))
                : {},
                officeInfo : localStorage.getItem('officeInfo')
                ? JSON.parse(localStorage.getItem('officeInfo'))
                : {}
    }
};

const reducer = combineReducers({
    infoReducers : infoReducers
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store;
