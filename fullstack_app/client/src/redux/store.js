import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';
import userReducer from './reducers/userReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
	data: dataReducer,
	UI: uiReducer,
	user: userReducer
});

const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware)));

export default store;
