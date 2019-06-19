import * as React from 'react';
import * as _ from "lodash";
import './App.css';
import SessionFilters from './components/SessionFilters';
import Sessions from './components/Sessions';
import SchedulerComponent from './components/SchedulerComponent';
import { Filters, Session, DEFAULT_FILTERS } from './model';

interface State {
  filteredSessions: Session[];
  favoritesSessions: Session[];
  favorites: {[id: string]: boolean};
  deleted: {[id: string]: boolean};
}

class App extends React.Component<{sessions: Session[]}, State> {

  constructor(props: any) {
    super(props);
    const favorites: {[id: string]: boolean} = JSON.parse(localStorage.getItem('favorites') || '{}');
    this.state = {
      filteredSessions: this.props.sessions,
      favoritesSessions: this.props.sessions.filter(s => favorites[s.id]),
      favorites,
      deleted: JSON.parse(localStorage.getItem('deleted') || '{}')
    };
  }

  public componentWillMount() {
    this.onFilterChange(DEFAULT_FILTERS);
  }

  
  private onToggleFavorite = (id: string, isFavorite: boolean) => {
    this.setState(prev => {
        const favorites = prev.favorites;
        favorites[id] = isFavorite;
        localStorage.setItem('favorites', JSON.stringify(favorites));
        const favoritesSessions = this.props.sessions.filter(s => prev.favorites[s.id]);
        return {favorites, favoritesSessions};
    })
  }

  private onToggleDelete = (id: string, isDelete: boolean) => {
    this.setState(prev => {
        prev.deleted[id] = isDelete;
        localStorage.setItem('deleted', JSON.stringify(prev.deleted));
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
      if (!filters.deletes && this.state.deleted[session.id]) {
        return false;
      }
      return true;
    })

    this.setState({filteredSessions});
  }

  public render() {
    return (
      <React.Fragment>
          <SchedulerComponent 
            sessions={this.props.sessions.slice(0,10)}    // FIXME
            hotels={_.uniq(this.props.sessions.map(s => s.hotel).sort())} /> 
          <SessionFilters sessions={this.props.sessions} onFiltersChange={this.onFilterChange} count={this.state.filteredSessions.length}/>
          <Sessions sessions={this.state.filteredSessions} 
          favorites={this.state.favorites} onFavorite={this.onToggleFavorite}
          deleted={this.state.deleted} onDelete={this.onToggleDelete}
          />
      </React.Fragment>
    );
  }
}

export default App;
