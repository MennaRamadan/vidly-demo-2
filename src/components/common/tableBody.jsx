import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
    render() { 
        const {data, columns} = this.props;

        return ( <tbody>
                {data.map(item =>  
                <tr key={data._id}>
                   {columns.map(column => <td>{_.get(item, column.path)}</td>)} 
                </tr>)}
            </tbody> );
    }
}
 
export default TableBody;