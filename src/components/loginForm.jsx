import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {

    state = {
        //we should inialize the property of state object once using form using empty string or some value not null or undefined
        data: { username: "", password: ""},
        errors: {}
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    }

    doSubmit = () => {
        //here we will call the server
        console.log('submit');
    }

    render() { 
        return ( <div>
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("username", "Username")}
                        {this.renderInput("password", "Password", "password")}
                        {this.renderButton("Login")}
                    </form>
                </div> );
    }
}
 
export default LoginForm;