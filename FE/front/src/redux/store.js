import {createStore} from 'redux';
import { mainstreetApp } from './reducers';

const store = createStore(mainstreetApp);

export default store;
