import React from 'react';

import './button.css'

const Button = (props) => {
  return ( 
    <button 
      className="button"
      onClick={props.onNextButtonClick}>Next</button>
   );
}
 
export default Button;