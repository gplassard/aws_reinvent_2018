import {Session} from '../model';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import * as React from 'react';
import Chip from "@material-ui/core/Chip";
import './Sessions.css'
import { Star, StarBorder, Delete, DeleteOutline} from '@material-ui/icons';

interface Props {
    session: Session
    favorite: boolean
    deleted: boolean
    onFavorite: (id: string, isFavorite: boolean) => any
    onDelete: (id: string, isDeleted: boolean) => any
}

interface State {

}

export default class SessionComp extends React.Component<Props, State> {

    public shouldComponentUpdate(nextProps: Props) {
        return this.props.favorite !== nextProps.favorite || this.props.deleted !== nextProps.deleted;
    }

    private toggleFavorite = () => {
        this.props.onFavorite(this.props.session.id, !this.props.favorite);
    }

    private toggleDelete = () => {
        this.props.onDelete(this.props.session.id, !this.props.deleted);
    }

    public render() {
        const session = this.props.session;
        return (<TableRow key={session.id}>
        <TableCell>     
        {this.props.favorite ? <Star onClick={this.toggleFavorite} className="clickable"/> : <StarBorder onClick={this.toggleFavorite} className="clickable"/> }
        {this.props.deleted ? <Delete onClick={this.toggleDelete} className="clickable"/> : <DeleteOutline onClick={this.toggleDelete} className="clickable"/> }
        </TableCell>
        <TableCell>{session.times || session.day}</TableCell>
        <TableCell>{session.hotel}</TableCell>
        <TableCell>
        <Chip label={ session.type} color="primary"/>
        <Chip label={ session.level} className={session.level}/>
        </TableCell>
        <TableCell><a href={`https://www.portal.reinvent.awsevents.com/connect/search.ww?trk=typed_bookmarked#loadSearch-searchPhrase="${session.abbr}"&searchType=session`}>{session.abbr}</a> {session.title}</TableCell>
        <TableCell>{session.abstract}</TableCell>
    </TableRow>)
    }
}
