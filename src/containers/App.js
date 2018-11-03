import React, { Component } from 'react';
import classes  from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit.js';
const SHORT_ID = require('shortid');

class App extends Component {
  state = {
    persons: [
      {name:'Modestas', age:25, id: SHORT_ID.generate()},
      {name:'Tadas', age:55, id: SHORT_ID.generate()}
    ],
    showPersons: false,
    newPersonName: 'new Person'
  };

  showPersonsHandler = () => {
    const show = this.state.showPersons;
    this.setState({showPersons : !show});
  }

  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons;
    persons.splice(personIndex, 1);
    this.setState({
      persons : persons
    });
  };

  addPersonHandler = () => {
    const persons = this.state.persons;
    persons.push(
       {name: this.state.newPersonName , age : 0, id: SHORT_ID.generate()}
    );
    this.setState({
      persons : persons
    });
  }

  updateNewPersonsNameHandler = (event) => {
    this.setState({newPersonName: event.target.value})
  }

  nameChangeHandler = (event, id) => {
    const person_index = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {...this.state.persons[person_index]};
    person.name = event.target.value;
    
    const PERSONS = [...this.state.persons]
    PERSONS[person_index] = person;

    this.setState({
      persons: PERSONS
    })
  };

  render() {
    return (
      <section> 
        <div className={classes.App}>
          <Cockpit 
            onChange={this.updateNewPersonsNameHandler}
            placeHolder = {this.state.newPersonName}
            clickAdd = {this.addPersonHandler}
            clickShow = {this.showPersonsHandler}
            showPersons = {this.state.showPersons}>
          </Cockpit>
            
          <Persons 
            persons = {this.state.persons} 
            clicked = {this.deletePersonHandler} 
            change = {this.nameChangeHandler}
            showPersons = {this.state.showPersons}>
          </Persons> 
          
        </div>
      </section>
    );
  }
}

export default App;
