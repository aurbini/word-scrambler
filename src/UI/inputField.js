import React from 'react';

import './inputField.css'
import { searchThroughArrayOfObjects } from '../utils.js'

const InputField = (props) => {

  return ( 
    <input 
      className={`input-field 
        ${searchThroughArrayOfObjects(props.enteredValues, props.index , 'inputColor') === 'green'
        ? "correct-letter-background" : "" } `}      
      value={searchThroughArrayOfObjects(props.enteredValues, props.index, 'value')}
      index={props.index}
      key="inputKey"
      type="text"
      name={`field-${props.index}`}
      maxLength="1"
      onChange={props.handleChange}
      autoFocus={props.enteredValues.find(letterObject => props.index === 1 & letterObject.value === "") ? true : false}
      ></input>
   );
}
 
export default InputField;