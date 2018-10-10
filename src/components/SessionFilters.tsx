import * as React from 'react';
import {Filters, Session, DEFAULT_FILTERS} from '../model';
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from 'react-select';
import * as _ from "lodash";
import "./SessionFilters.css"
import { withStyles } from '@material-ui/core/styles';

interface Props {
    sessions: Session[]
    count: number;
    onFiltersChange: (f:Filters) => any
}

interface State {
    filters: Filters
}

class SessionFilters extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            filters: DEFAULT_FILTERS
        }
    }

    private onFilterChange = (property: string) => (values: {label: string, value: string}[]) => {
        this.setState(prev => {
            prev.filters[property] = values.map(v => v.value);
            this.props.onFiltersChange(this.state.filters);
            return prev;
        })
    }

    private onTitleChange = (e: any) => {
        const value = e.target.value;
        this.setState(prev => {
            prev.filters.title = value.toLowerCase();
            this.props.onFiltersChange(this.state.filters);
            return prev;
        })
    }

    private onFavoritesChange = (e: any) => {
        const value = e.target.checked;
        this.setState(prev => {
            prev.filters.favorites = value;
            this.props.onFiltersChange(this.state.filters);
            return prev;
        })
    }
    
    private onDeleteChange = (e: any) => {
        const value = e.target.checked;
        this.setState(prev => {
            prev.filters.deletes = value;
            this.props.onFiltersChange(this.state.filters);
            return prev;
        })
    }

    public render() {
        return (  
        <div className="SessionFilters">
        <Select
            placeholder="Choose a day"
            isMulti={true}
            onChange={this.onFilterChange('days')}
            options={_.uniq(this.props.sessions.map(s => s.day)).map(s => ({label: s, value: s})) }
          />
          <Select
            placeholder="Choose a hotel"
            isMulti={true}
            onChange={this.onFilterChange('hotels')}
            options={_.uniq(this.props.sessions.map(s => s.hotel)).map(s => ({label: s, value: s})) }
          />
          <Select
            placeholder="Choose a session type"
            isMulti={true}
            onChange={this.onFilterChange('types')}
            options={_.uniq(this.props.sessions.map(s => s.type)).map(s => ({label: s, value: s})) }
          />
        <Select
            placeholder="Choose a session level"
            isMulti={true}
            onChange={this.onFilterChange('levels')}
            options={_.uniq(this.props.sessions.map(s => s.level)).map(s => ({label: s, value: s})) }
          />
        <TextField
          className="textField"
          label="Filter by title"
          placeholder="DynamoDB"
          margin="normal"
          onChange={this.onTitleChange}
        />
         <FormControlLabel
            className="switchField"
            control= {
            <Switch
              onChange={this.onFavoritesChange}
            />
         } label="Favorites"/>
        <FormControlLabel
            className="switchField"
            control= {
            <Switch
              onChange={this.onDeleteChange}
            />
         } label="Deleted"/>
          <Chip label={ this.props.count + ' sessions'} color="primary"/>
          </div>)
    }

}

export default withStyles({})(SessionFilters);