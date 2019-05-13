import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

     getPageData = () => {
        const {pageSize, currentPage, sortColumn, selectedGenre, movies: allMovies} = this.state;

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const movies = Paginate(sorted, currentPage, pageSize);

        return {totalCount: filtered.length , movies};
     }

    render() {
        const {length : count} = this.state.movies; 
        const {pageSize, currentPage, sortColumn} = this.state;

        const {totalCount, movies} = this.getPageData();

        if(count === 0) return <p>There are no movies in the database</p>
        return( 
        <div className="row">
            <div className="col-3">
                <ListGroup items={this.state.geners}
                    selectedItem= {this.state.selectedGenre}
                    onItemSelect={this.handleGenraSelect}/>
            </div>
            <div className="col">
                    <Link className="btn btn-primary mb-2" to="/movies/new">New Movie</Link>
                    <p>Showing {totalCount} movies in the database</p>
                    <MoviesTable 
                        movies={movies}
                        sortColumn = {sortColumn}
                        onDelete={this.hanleDelete}
                        onLike={this.handleLike} 
                        onSort={this.handleSort}/>
                    <Pagination
                    itemsCount={totalCount}
                    pageSize={pageSize}
                    currentPage= {currentPage}
                    onPageChanged={this.handlePageChanged}/> 
            </div>
        </div>)
    }
}
 
export default Movies;