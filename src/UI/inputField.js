import React from 'react';

import './inputField.css'

const InputField = (props) => {
  return ( 
    <input 
      className={props.inputColor[props.index] ? "correct-letter-background" : ""}
      value={props.enteredValues[props.index - 1]}
      index={props.index}
      key="inputKey"
      type="text"
      name={`field-${props.index}`}
      maxLength="1"
      onChange={props.handleChange}
      autoFocus={props.inputColor[props.index - 1] || props.focusField === props.index - 1 ? true : false}
      ></input>
   );
}
 
export default InputField;