import React from 'react';

const cockPit = (props) => {
    let btnStyle = 'btnGreen';
    let btnText = 'Show Persons';
  
    if(props.showPersons){
        btnText = 'Hide Persons';
        btnStyle = 'btnRed';
      
    };


    return (
        <div>
            <h1>Persons</h1>
            <form>
                <input
                    onChange={props.onChange}
                    className='p-10' 
                    type='text' id='name' 
                    placeholder={props.placeHolder} 
                />
            </form>
        
            <button className='' onClick={props.clickAdd}>Add Person</button>
            <button className= {btnStyle} onClick={props.clickShow}>{btnText}</button>
        </div>
    )
}

export default cockPit;
