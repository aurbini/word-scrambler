import React from 'react';

import './inputField.css'

const InputField = (props) => {
  return ( 
    <input 
      className={props.inputColor[props.index] ? "correct-letter-background" : ""}
      value={props.enteredValues.find(letterObject => letterObject.index === props.index - 1).value 
        ? props.enteredValues.find(letterObject => letterObject.index === props.index - 1).value 
        : ""}
      index={props.index}
      key="inputKey"
      type="text"
      name={`field-${props.index}`}
      maxLength="1"
      onChange={props.handleChange}
      autoFocus={props.focusField === props.index - 1? true : false}
    ></input>
   );
}
 
export default InputField;