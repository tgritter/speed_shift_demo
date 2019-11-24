import React, { Component } from 'react';
import {format_fields, format_value} from '../helpers/helpers'

class Input extends Component {

    render() {
        const { field, value, onChange, type, error } = this.props;
        return (
            <div>
                <div className="inputContainer">
                    <input 
                        className="input" 
                        type={type}
                        placeholder={format_fields(field)} 
                        maxLength="50" 
                        value={format_value(field, value)}
                        onChange={onChange}
                        onFocus={field == 'date_hired' ? (e) => e.target.type = 'date' : null}
                        onBlur={field == 'date_hired' ? (e) => e.target.type = 'text' : null}
                    />
                </div>  
                {error ? <div className="error">Enter valid input</div> : <div className="no_error">Invalid input</div>}
            </div> 
        );
    }
}

export default Input;