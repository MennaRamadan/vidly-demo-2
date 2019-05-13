// import React, { Component } from 'react';

// const MovieForm = ({match, history}) => {
//     return ( <div> 
//         <h1>Movie Form {match.params.id}</h1>
//         <button className="btn btn-primary" onClick={() => history.push("/movies")}>save</button>
//             </div>);
// }
 
// export default MovieForm;

import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import {getGenres} from '../services/fakeGenreService';
import {getMovie, saveMovie} from '../services/fakeMovieService';

class MovieForm extends Form {
    state = { 
        data : {title: "", genreId: "", numberInStock: "", dailyRentalRate: ""},
        geners: [],
        error: {}
     }

     schema = {
         _id: Joi.string(),
         title: Joi.string().required().label("Title"),
         genreId: Joi.string().required().label("Genre"),
         numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
         dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate")
     }

    //  componentDidMount(){
    //     const genres = getGenres();
    //     this.setState({genres});

    //     const movieId = this.props.match.params.id;
    //     if(movieId === "new") return;

    //     const movie = getMovie(movieId);
    //     if(!movie) return this.props.history.replace("/not-found");

    //     this.setState({data: this.mapToViewModel(movie)});
    //  }

    //  mapToViewModel(movie){
    //      return{
    //          _id: movie._id,
    //          title: movie.title,
    //          genreId: movie.genre._id,
    //          numberInStock: movie.genre.numberInStock,
    //          dailyRentalRate: movie.genre.dailyRentalRate
    //      }
    //  }

     doSubmit = () => {
        //here we will call the server
        // saveMovie(this.state.data);
        // this.props.history.push('/movies');

        console.log("Submit from movie form")
    }

    render() { 
        return (
            <div> 
                <h1>Movie Form </h1>
                <form onSubmit={this.handleSubmit}>
                    {/* {this.renderInput("title", "Title")};
                    {this.renderSelect("genreId", "Genre", this.state.geners)};
                    {this.renderInput("numberInStock","Number In Stock", "number")};
                    {this.renderInput("dailyRentalRate", "Rate", "number")}; */}
                    {this.renderButton("Save")}
                </form>
            </div>  
                );
    }
}
 
export default MovieForm;