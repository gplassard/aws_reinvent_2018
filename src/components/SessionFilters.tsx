import * as React from 'react';
import {Filters, Session} from '../model';
import Chip from "@material-ui/core/Chip";
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
            filters: {
                days: [],
                hotels: [],
                types: [],
                title: null,
                description: null
            }
        }
    }

    private onFilterChange = (property: string) => (values: {label: string, value: string}[]) => {
        this.setState(prev => {
            prev.filters[property] = values.map(v => v.value);
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
          <Chip label={ this.props.count + ' sessions'} color="primary"/>
          </div>)
    }

}

export default withStyles({})(SessionFilters);