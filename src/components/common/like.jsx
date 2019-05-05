import React, { Component } from 'react';

const Like = props => {
    let clasess = "fa fa-heart";
    if(!props.liked)
        clasess += "-o"

    return ( <i onClick={props.onClick}
        style={{cursor: "pointer"}} className={clasess} aria-hidden="true"></i> );
}
 
export default Like;