import React, { Component } from 'react';

const SearchBox = ({value, onChange}) => {
    return (
        <input 
        className="form-control my-3" 
        type="text"
        name="query"
        value={value}
        onChange={e => onChange(e.currentTarget.value)} 
        placeholder="Search ..."/>
    );
}

export default SearchBox;