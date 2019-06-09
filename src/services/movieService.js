import http from './httpService';
import {apiUrl} from '../config.json';


const apiEndPoint = apiUrl + '/movies';

function movieUrl(id){
    return `${apiEndPoint}/${id}`;
}
export function getMovies() {
    return http.get(apiEndPoint);
}

export function saveMovie(movie) {
    if(movie._id){
        const body = {...movie}
        return http.put(movieUrl(movie._id), body);
    }

    return http.post (apiEndPoint, movie);
}

export function getMovie(id) {
    return http.get(movieUrl(id));
}
  
export function deleteMovie(id) {
    http.delete(movieUrl(id));
}