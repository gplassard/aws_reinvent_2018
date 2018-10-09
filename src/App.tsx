import * as React from 'react';
import './App.css';
import SessionFilters from './components/SessionFilters';
import Sessions from './components/Sessions';
import { Filters, Session } from './model';

class App extends React.Component<{sessions: Session[]}, {filteredSessions: Session[], favorites: {[id: string]: boolean}}> {

  constructor(props: any) {
    super(props);
    this.state = {
      filteredSessions: this.props.sessions,
      favorites: JSON.parse(localStorage.getItem('favorites') || '{}')
    };
  }

  
  private onToggleFavorite = (id: string, isFavorite: boolean) => {
    this.setState(prev => {
        prev.favorites[id] = isFavorite;
        localStorage.setItem('favorites', JSON.stringify(prev.favorites));
        return prev;
    })
  }

  private onFilterChange = (filters: Filters) => {

    const filteredSessions = this.props.sessions.filter(session => {
      if (filters.days && filters.days.length && filters.days.indexOf(session.day) < 0) {
        return false;
      }
      if (filters.types && filters.hotels.length && filters.hotels.indexOf(session.hotel) < 0) {
        return false;
      }
      if (filters.types && filters.types.length && filters.types.indexOf(session.type) < 0) {
        return false;
      }
      if (filters.levels && filters.levels.length && filters.levels.indexOf(session.level) < 0) {
        return false;
      }
      if (filters.title && filters.title.length && !session.title.toLowerCase().includes(filters.title)) {
        return false;
      }
      if (filters.favorites && !this.state.favorites[session.id]) {
        return false;
      }
      return true;
    })

    this.setState({filteredSessions});
  }

  public render() {
    return (
      <React.Fragment>
          <SessionFilters sessions={this.props.sessions} onFiltersChange={this.onFilterChange} count={this.state.filteredSessions.length}/>
          <Sessions sessions={this.state.filteredSessions} favorites={this.state.favorites} onFavorite={this.onToggleFavorite}/>
      </React.Fragment>
    );
  }
}

export default App;
