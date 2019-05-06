import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import Paginate from '../utils/paginate';

class Movies extends Component {
    state = { 
        movies: getMovies(),
        currentPage: 1,
        pageSize: 4
     };

     hanleDelete = (movie) => {
        const movies = this.state.movies.filter( m => m._id !== movie._id);
        this.setState({movies})
     }

     handleLike = (movie) =>
     {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index]  = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
     }

     handlePageChanged = page =>{
         this.setState({currentPage : page});
     }

    render() {
        const {length : count} = this.state.movies; 
        const {pageSize, currentPage, movies: allMovies} = this.state;

        const movies = Paginate(allMovies, currentPage, pageSize);

        if(count === 0) return <p>There are no movies in the database</p>
        return( 
        <React.Fragment>
        <p>Showing {count} movies in the database</p>
        <table className="table">
            <thead>
                <tr> 
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {movies.map(movie =>(
                <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)}/></td>
                    <td><button className="btn btn-danger btn-sm" onClick={ () =>this.hanleDelete(movie)}>Delete</button></td>
                </tr>
                ))}
            </tbody>
        </table>
        <Pagination
         itemsCount={count}
          pageSize={pageSize}
          currentPage= {currentPage}
           onPageChanged={this.handlePageChanged}/>
        </React.Fragment>)
    }
}
 
export default Movies;