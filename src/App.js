import React, { Component } from 'react';
import  classes  from './App.module.css';
import Person from './Person/Person';
const SHORT_ID = require('shortid');

class App extends Component {
  
  
  generateRandomKey = () => {
    const LETTERS = ['a', 'b', 'c','d','e'];
    const NUMBER = Math.floor((Math.random() * 100) + 1);

    return NUMBER + LETTERS[Math.floor((Math.random() * 4)+1)];
  }

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
    let persons = (
      <p> No persons </p>
    )
    let btnStyle = classes.btnGreen;
    let btnText = 'Show Persons';
  
    if(this.state.showPersons){
      persons = (
        <div className={classes.dFlex}>
          {this.state.persons.map((person, index) => {
            return (<Person
              click = {() => this.deletePersonHandler(index)}
              change = {(event) => this.nameChangeHandler(event, person.id)}
              name={person.name} 
              age={person.age}
              id={person.id}
              key={person.id}
            />)  
          })}    
        </div>  
      )   

      btnStyle = classes.btnRed;
      btnText = 'Hide Persons';
    };

    
    return (
      <section> 
        <div className={classes.App}>
          <form>
            <input
              onChange={this.updateNewPersonsNameHandler}
              className='p-10' 
              type='text' id='name' 
              placeholder={this.state.newPersonName} 
            />
          </form>

          <button className='' onClick={this.addPersonHandler}>Add Person</button>
          <button className={btnStyle} onClick={this.showPersonsHandler}>{btnText}</button>
          {persons}
        </div>
      </section>
    );
  }
}

export default App;
