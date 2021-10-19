import React from 'react';

import './winModal.css';

const winModal = React.memo(props => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="win-modal">
        <h2>You won!</h2>
      </div>
    </React.Fragment>
  );
});

export default winModal;