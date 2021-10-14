import {createStore,combineReducers} from 'redux';

import chatReducers from './reducers/chatReducers';
import callReducers from './reducers/callReducers';
import chatReducersactual from './reducers/chatReducersactual';
const cReducer = combineReducers({
    chatss: chatReducers,
    calls: callReducers,
    chat:chatReducersactual
})

const configureStore = () => createStore(cReducer);

export default configureStore;