import React, { Component } from 'react';
import Input from './common/input';
import Joi from 'joi-browser';

class LoginForm extends Component {

    state = {
        //we should inialize the property of state object once using form using empty string or some value not null or undefined
        account: { username: "", password: ""},
        errors: {}
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    }

    validate = () => {
        const options = {abortEarly: false};
        const {error} = Joi.validate(this.state.account, this.schema, options);
        if(!error)  
            return null;

        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;

        return errors;    
    }

    validateProperty = ({name, value}) => {
        const obj = {[name]:  value};
        const schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema)

        return error ? error.details[0].message : null;  
    }

    // handleChange = e => {
    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if(errorMessage)
            errors[input.name] = errorMessage;
        else
            delete errors[input.name];

        const account = {...this.state.account};
        account[input.name] = input.value;
        this.setState({account, errors});
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if(errors) return ;

        //here we will call the server
        console.log('submit');
    }

    render() { 
        const {account, errors} = this.state
        return ( <div>
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                       <Input name="username"
                        label="Username" 
                        value={account.username} 
                        onChange={this.handleChange}
                        error={errors.username}/>
                       <Input name="password" 
                       label="Password" 
                       value={account.password} 
                       onChange={this.handleChange}
                       error={errors.password}/> 
                        <button 
                        disabled={this.validate()} className="btn btn-primary">Submit</button>
                    </form>
                </div> );
    }
}
 
export default LoginForm;