import React from 'react';
import './Person.css';

const person = (props) => {
    return (
        <div className="Person">
            <p> {props.name}</p>
            <p> {props.id} </p>
            <input type="text" onChange={props.change} value={props.name}/>
            <button  className='btn-danger' onClick={props.click}>DELETE</button>
        </div>

    );
}

export default person;