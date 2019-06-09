import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';


function App() {
  return (
    <React.Fragment>
      <ToastContainer/>
      <NavBar/>
      <main className="container">
        {/* <Movies/>       */}
        <Switch>
          <Route path="/movies/:id" component={MovieForm}/>
          <Route path="/movies" component={Movies}/>
          <Route path="/customers" component={Customers}/>
          <Route path="/rentals" component={Rentals}/>
          <Route path="/notfound" component={NotFound}/>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm}/>
          <Redirect from="/" exact to="/movies"/>
          <Redirect to="/notFound"/>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
