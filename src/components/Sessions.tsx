import {Session} from '../model';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as React from 'react';
import SessionComp from "./SessionComp";
import './Sessions.css'

interface Props {
    sessions: Session[]
}

interface State {

}

export default class Sessions extends React.Component<Props, State> {

    public render() {
        return (<Table className="Sessions">
            <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell>Hotel</TableCell>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell>Abstract</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {this.props.sessions.map(session => <SessionComp key={session.id} session={session}/>)}
        </TableBody>
        </Table>)
    }
}