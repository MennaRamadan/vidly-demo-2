import React, { Component } from 'react';
import Like from './common/like';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';

class MoviesTable extends Component {

    columns = [
        {path: 'title', label: 'Title'},
        {path: 'genera.name', label: 'Genera'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {key:'like'},
        {key:'delete'}
    ];

    render() { 
        const {movies , onDelete, onLike,sortColumn,onSort} = this.props;

            return   <table className="table">
                        <TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort}/>
                        <TableBody data={movies} columns={this.columns}/>
                        {/* <tbody>
                            {movies.map(movie =>(
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><Like liked={movie.liked} onClick={() => onLike(movie)}/></td>
                                <td><button className="btn btn-danger btn-sm" onClick={ () => onDelete(movie)}>Delete</button></td>
                            </tr>
                            ))}
                        </tbody> */}
                    </table>;
    }
}

export default MoviesTable;

 