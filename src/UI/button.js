import React from 'react';

import './button.css'

const Button = (props) => {
  return ( 
    <Button 
      onClick={props.onNextButtonClick}>Next</Button>
   );
}
 
export default Button;