import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium from 'radium';

class App extends Component {
  generateRandomKey = () => {
    const LETTERS = ['a', 'b', 'c','d','e'];
    const NUMBER = Math.floor((Math.random() * 100) + 1);

    return NUMBER + LETTERS[Math.floor((Math.random() * 4)+1)];
  }

  state = {
    persons: [
      {name:'Modestas', age:25, id: this.generateRandomKey()},
      {name:'Tadas', age:55, id: this.generateRandomKey()}
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
       {name: this.state.newPersonName , age : 0, id: this.generateRandomKey()}
    );
    this.setState({
      persons : persons
    });
  }

  updateNewPersonsNameHandler = (event) => {
    this.setState({newPersonName: event.target.value})
  }

  nameChangeHandler = (event, id) => {
    const PERSON_INDEX = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const PERSON = {...this.state.persons[PERSON_INDEX]};
    PERSON.name = event.target.value;
    
    const PERSONS = [...this.state.persons]
    PERSONS[PERSON_INDEX] = PERSON;

    this.setState({
      persons: PERSONS
    })
  };

  render() {
    let persons = (
      <p> No persons </p>
    )
    let btnStyle = 'btn-show';
    let btnText = 'Show Persons';

    // USING RADIUM
    let style = {
      ':hover': {
        backgroundColor: 'darkgreen'
      }
    }
      
    if(this.state.showPersons){
      persons = (
        <div className="d-flex">
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

      btnStyle = 'btn-hide';
      btnText = 'Hide Persons';
      
      // USING RADIUM
      style[':hover'] = {
        backgroundColor: 'salmon'
      }
    };

    

    

    return (
      <section> 
        <div className="App">
          <form>
            <input
              onChange={this.updateNewPersonsNameHandler}
              className='p-10' 
              type='text' id='name' 
              placeholder={this.state.newPersonName} 
            />
          </form>

          <button className='' onClick={this.addPersonHandler}>Add Person</button>
          <button style={style} className={btnStyle} onClick={this.showPersonsHandler}>{btnText}</button>
          {persons}
        </div>
      </section>
    );
  }
}

export default Radium(App);
