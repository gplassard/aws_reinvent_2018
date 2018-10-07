import * as React from 'react';
import './App.css';
import Sessions from './components/Sessions';
import * as sessions from "./sessions.json";

class App extends React.Component {
  public render() {
    return (
          <Sessions sessions={sessions}/>
    );
  }
}

export default App;
