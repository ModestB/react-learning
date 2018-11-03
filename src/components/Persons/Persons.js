import React from 'react';
import Person from './Person/Person';

const persons = (props) => {
    let persons = (
        <p> No persons </p>
    )

    if(props.showPersons){
        persons = props.persons.map((person, index) => {
            return (
                <Person
                    click = {() => props.clicked(index)}
                    change = {(event) => props.change(event, person.id)}
                    name={person.name} 
                    age={person.age}
                    id={person.id}
                    key={person.id}
            />)  
        })
    };

    return (
        <div className='dFlex'>
            {persons}
        </div>
        
    );
};

export default persons;