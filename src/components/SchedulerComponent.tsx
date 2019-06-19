import * as React from 'react';
import * as _ from 'lodash';
import 'react-big-scheduler/lib/css/style.css'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { Session } from 'src/model';
// tslint:disable-next-line: no-var-requires
const Scheduler = require('react-big-scheduler').default;
// tslint:disable-next-line: no-var-requires
const {SchedulerData, ViewTypes} = require('react-big-scheduler');
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as moment from 'moment'

interface Props {
    sessions: Session[]
    hotels: string[]
}

interface State {
    schedulerData: any
}

class SchedulerComponent extends React.Component<Props, State> {
    constructor(props: any){
        super(props);
        const schedulerData = new SchedulerData('2018-11-30', ViewTypes.Week);
        schedulerData.localeMoment.locale('fr');
        this.state = {
            schedulerData
        }
    }
    
    private nextClick = (schedulerData: any) => {
        schedulerData.next();
        this.setState({
            schedulerData
        })
    }
    private prevClick = (schedulerData: any) => {
        schedulerData.prev();
        this.setState({
            schedulerData
        })
    }
    private onSelectDate = (schedulerData: any, date: any) => {
        schedulerData.setDate(date);
        this.setState({
           schedulerData
        })
    }
    private onViewChange = (schedulerData: any, view: any) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        this.setState({
            schedulerData
        })
    }

    public render() {
        const {schedulerData} = this.state;
        const resources = this.props.hotels.map(h => ({id: h, name: h}));
        schedulerData.setResources(resources);
        
        const events = _.sortBy(this.props.sessions.map(s => ({
            start: s.start,
            end: moment(s.start).add(1, 'hour').format(),
            resourceId: s.hotel,
            title: s.abbr + " " + s.title,
            id: s.id
        })), event => event.start);
        schedulerData.setEvents(events);

        return (<ExpansionPanel >
            <ExpansionPanelSummary>Agenda</ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Scheduler schedulerData={schedulerData}
            nextClick={this.nextClick}
            prevClick={this.prevClick}
            onSelectDate={this.onSelectDate}
            onViewChange={this.onViewChange}/>
            </ExpansionPanelDetails>
        </ExpansionPanel>)
    }
}

export default DragDropContext(HTML5Backend)(SchedulerComponent);