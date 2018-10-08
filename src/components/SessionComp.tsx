import {Session} from '../model';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import * as React from 'react';
import Chip from "@material-ui/core/Chip";
import './Sessions.css'

interface Props {
    session: Session
}

interface State {

}

export default class SessionComp extends React.Component<Props, State> {

    public shouldComponentUpdate() {
        return false;
    }

    public render() {
        const session = this.props.session;
        return (<TableRow key={session.id}>
        <TableCell>{session.times || session.day}</TableCell>
        <TableCell>{session.hotel}</TableCell>
        <TableCell>
        <Chip label={ session.type} color="primary"/>
        <Chip label={ session.level} className={session.level}/>
        </TableCell>
        <TableCell><b>{session.abbr}</b> {session.title}</TableCell>
        <TableCell>{session.abstract}</TableCell>
    </TableRow>)
    }
}