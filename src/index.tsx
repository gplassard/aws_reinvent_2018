import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import * as sessions from "./sessions.json";

ReactDOM.render(
  <App sessions={sessions}/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
