import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore , applyMiddleware,compose} from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import fbConfig from './config/fbconfig';
import {getFirestore, reduxFirestore} from 'redux-firestore';
import { reactReduxFirebase, getFirebase} from 'react-redux-firebase';

const store = createStore(rootReducer , 
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase , getFirestore})),
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig)
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
