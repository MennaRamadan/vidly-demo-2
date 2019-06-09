import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
// import {getGenres} from '../services/fakeGenreService';
// import {getMovie, saveMovie} from '../services/fakeMovieService';
import {getGenres} from '../services/genreService';
import {getMovie, saveMovie} from '../services/movieService';

class MovieForm extends Form {
    state = { 
        data : {title: "", genreId: "", numberInStock: "", dailyRentalRate: ""},
        geners: [],
        errors: {}
     }

     schema = {
         _id: Joi.string(),
         title: Joi.string().required().label("Title"),
         genreId: Joi.string().required().label("Genre"),
         numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
         dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate")
     }

     async populateGenres(){
        const {data: geners} = await getGenres();
        this.setState({geners});
     }

     async populateMovie(){
        try{
            const movieId = this.props.match.params.id;
            if(movieId === "new") return;
            const {data: movie} = await getMovie(movieId);
            this.setState({data: this.mapToViewModel(movie)});
        }
        catch(ex){
            if(ex.response && ex.response.status === 404)
                 this.props.history.replace("/not-found");
        }
     }

    async componentDidMount(){
        await this.populateGenres()
        await this.populateMovie();
    }

     mapToViewModel(movie){
         return{
             _id: movie._id,
             title: movie.title,
             genreId: movie.genre._id,
             numberInStock: movie.genre.numberInStock,
             dailyRentalRate: movie.genre.dailyRentalRate
         }
     }

      doSubmit = async () => {
        //here we will call the server
        await saveMovie(this.state.data);
        this.props.history.push('/movies');

        // console.log("Submit from movie form");
    }

    render() { 
        return (
            <div> 
                <h1>Movie Form </h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.geners)}
                    {this.renderInput("numberInStock","Number In Stock", "number")}
                    {this.renderInput("dailyRentalRate", "Rate", "number")}
                    {this.renderButton("Save")}
                </form>
            </div>  
                );
    }
}
 
export default MovieForm;