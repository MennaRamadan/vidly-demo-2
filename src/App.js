import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import './App.css';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';



function App() {
  return (
    <React.Fragment>
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
          <Redirect from="/" exact to="/movies"/>
          <Redirect to="/notFound"/>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
