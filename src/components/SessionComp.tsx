import {Session} from '../model';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import * as React from 'react';
import Chip from "@material-ui/core/Chip";
import './Sessions.css'
import { Star, StarBorder } from '@material-ui/icons';

interface Props {
    session: Session
    favorite: boolean
    onFavorite: (id: string, isFavorite: boolean) => any
}

interface State {

}

export default class SessionComp extends React.Component<Props, State> {

    public shouldComponentUpdate(nextProps: Props) {
        return this.props.favorite !== nextProps.favorite;
    }

    private toggleFavorite = () => {
        this.props.onFavorite(this.props.session.id, !this.props.favorite);
    }

    public render() {
        const session = this.props.session;
        return (<TableRow key={session.id}>
        <TableCell onClick={this.toggleFavorite} className="clickable">     
        {this.props.favorite ? <Star/> : <StarBorder  /> }
        </TableCell>
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
