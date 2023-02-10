import {createStore} from 'redux';
import { mainstreetApp } from './reducer';

const store = createStore(mainstreetApp);

export default store;
