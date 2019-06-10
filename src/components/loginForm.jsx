import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import {login} from '../services/authService';

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

    doSubmit = async () => {
        //here we will call the server
        try{
            console.log('submit');
            const {data} = this.state;
            const {data : jwt} = await login(data.username, data.password);
            localStorage.setItem("token", jwt);
            this.props.history.push('/');
        }
        catch(ex){
            if(ex.response && ex.response.status === 400){
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({errors});
            }
        }
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