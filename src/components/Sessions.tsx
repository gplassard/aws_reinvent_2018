import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as React from 'react';

interface Session {
    id: string;
    abbr: string;
    title: string;
    abstract: string;
    type: string;
    day: string;
    hotel: string;
}

interface Props {
    sessions: Session[]
}

interface State {

}

export default class Sessions extends React.Component<Props, State> {

    public render() {
        return (<Table>
            <TableHead>
          <TableRow>
            <TableCell>Jour</TableCell>
            <TableCell >Hôtel</TableCell>
            <TableCell >Type</TableCell>
            <TableCell >Titre</TableCell>
            <TableCell >Résumé</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {this.props.sessions.map(session => {
                return <TableRow key={session.id}>
                    <TableCell>{session.day}</TableCell>
                    <TableCell>{session.hotel}</TableCell>
                    <TableCell>{session.type}</TableCell>
                    <TableCell>{session.abbr}{session.title}</TableCell>
                    <TableCell>{session.abstract}</TableCell>
                </TableRow>
            })}
        </TableBody>
            
        </Table>)
    }

}