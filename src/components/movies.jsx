import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreService';
import Pagination from './common/pagination';
import Paginate from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
    state = { 
        movies: [],
        geners: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: {path: 'title', order: 'asc'}
     };

     //this will call after rendering in the dom
     componentDidMount(){
        const geners = [{name: 'All Geners' }, ...getGenres()];
        this.setState({movies: getMovies() , geners})
     }

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

     handleGenraSelect = genre => {
         this.setState({selectedGenre: genre, currentPage: 1});
     }

     handleSort = sortColumn => {
         this.setState({ sortColumn})
     }

    render() {
        const {length : count} = this.state.movies; 
        const {pageSize, currentPage, sortColumn, selectedGenre, movies: allMovies} = this.state;

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const movies = Paginate(sorted, currentPage, pageSize);
        // const movies = Paginate(filtered, currentPage, pageSize); 

        if(count === 0) return <p>There are no movies in the database</p>
        return( 
        <div className="row">
            <div className="col-3">
                <ListGroup items={this.state.geners}
                    selectedItem= {this.state.selectedGenre}
                    onItemSelect={this.handleGenraSelect}/>
            </div>
            <div className="col">
                    <p>Showing {filtered.length} movies in the database</p>
                    <MoviesTable 
                        movies={movies}
                        sortColumn = {sortColumn}
                        onDelete={this.hanleDelete}
                        onLike={this.handleLike} 
                        onSort={this.handleSort}/>
                    <Pagination
                    itemsCount={filtered.length}
                    pageSize={pageSize}
                    currentPage= {currentPage}
                    onPageChanged={this.handlePageChanged}/> 
            </div>
        </div>)
    }
}
 
export default Movies;