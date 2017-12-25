import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

require("dotenv").config()

global.MapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
